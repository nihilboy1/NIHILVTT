import { z } from 'zod';

import { Message } from '@/shared/api/types';
import { useChatStore } from '@/features/chat/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useCharactersStore } from '@/entities/character/model/store';
import { useCombatStore } from '@/features/combat/model/store';

import { GameSessionEvent } from './gameSessionApi';

const rollPartSchema = z.union([
  z.object({
    dice: z
      .string()
      .regex(/^d\d+$/)
      .transform((value) => value as `d${number}`),
    result: z.number(),
  }),
  z.number(),
]);

const diceRollDetailsSchema = z.object({
  rollName: z.string(),
  category: z.enum(['Attack', 'Damage', 'Attribute', 'Skill', 'Saving Throw', 'Generic']),
  parts: z.array(rollPartSchema),
  finalResult: z.number(),
  naturalRollResult: z.number().optional(),
});

const chatTextMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(),
  text: z.string(),
  timestamp: z.string(),
  isDiceRoll: z.literal(false),
});

const chatDiceMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(),
  text: z.string(),
  timestamp: z.string(),
  isDiceRoll: z.literal(true),
  diceRollDetails: diceRollDetailsSchema,
});

const chatMessagePayloadSchema = z.object({
  message: z.union([chatTextMessageSchema, chatDiceMessageSchema]),
});

const tokenMovedPayloadSchema = z.object({
  tokenId: z.string().min(1),
  position: z.object({
    x: z.number().int().nonnegative(),
    y: z.number().int().nonnegative(),
  }),
  combatChanged: z.boolean(),
  combat: z.lazy(() => combatStateSchema).nullable(),
});

const characterHpUpdatedPayloadSchema = z.object({
  characterId: z.string().min(1),
  currentHp: z.number().int().nonnegative(),
  tempHp: z.number().int().nonnegative(),
});

const tokenSchema = z.object({
  id: z.string().min(1),
  characterId: z.string().min(1),
  sceneId: z.string().min(1),
  position: z.object({
    x: z.number().int().nonnegative(),
    y: z.number().int().nonnegative(),
  }),
});

const tokenCreatedPayloadSchema = z.object({
  token: tokenSchema,
  character: z.unknown().nullable(),
});

const combatParticipantSchema = z.object({
  tokenId: z.string().min(1),
  characterId: z.string().min(1),
  initiativeRoll: z.number().int(),
  initiativeTotal: z.number().int(),
  dexterityScore: z.number().int(),
  movementBudgetCells: z.number().int().min(1),
  status: z.literal('active'),
});

const combatTurnResourcesSchema = z.object({
  actionAvailable: z.boolean(),
  bonusActionAvailable: z.boolean(),
  remainingMovementCells: z.number().int().min(0),
  totalMovementCells: z.number().int().min(1),
});

const combatStateSchema = z.object({
  active: z.literal(true),
  round: z.number().int().min(1),
  turnIndex: z.number().int().min(0),
  participants: z.array(combatParticipantSchema),
  turnResources: combatTurnResourcesSchema,
});

const attackResolvedPayloadSchema = z.object({
  attackerTokenId: z.string().min(1),
  targetTokenId: z.string().min(1),
  targetCharacterId: z.string().min(1),
  attackId: z.string().min(1),
  attackName: z.string().min(1),
  attackRoll: z.number().int().min(1).max(20),
  attackTotal: z.number().int(),
  targetArmorClass: z.number().int().nonnegative(),
  hit: z.boolean(),
  damageTotal: z.number().int().nonnegative(),
  damageApplied: z.number().int().nonnegative(),
  remainingCurrentHp: z.number().int().nonnegative(),
  remainingTempHp: z.number().int().nonnegative(),
  combat: combatStateSchema,
});

const tokenRemovedPayloadSchema = z.object({
  tokenId: z.string().min(1),
  removedCharacterId: z.string().min(1).nullable(),
  combatChanged: z.boolean(),
  combat: combatStateSchema.nullable(),
});

const tokensRemovedPayloadSchema = z.object({
  tokenIds: z.array(z.string().min(1)).min(1),
  removedCharacterIds: z.array(z.string().min(1)),
  combatChanged: z.boolean(),
  combat: combatStateSchema.nullable(),
});

const characterCreatedPayloadSchema = z.object({
  character: z.unknown(),
});

const characterRemovedPayloadSchema = z.object({
  characterId: z.string().min(1),
  removedTokenIds: z.array(z.string().min(1)),
  combatChanged: z.boolean(),
  combat: combatStateSchema.nullable(),
});

const combatPayloadSchema = z.object({
  combat: combatStateSchema.nullable(),
});

function requireEventPayload<T>(
  event: GameSessionEvent,
  schema: z.ZodType<T>,
  context: string,
): T {
  const parsed = schema.safeParse(event.payload);
  if (!parsed.success) {
    const formattedError = JSON.stringify(z.treeifyError(parsed.error), null, 2);
    console.error(`Violação de contrato realtime em ${context}. Event recebido:`, event);
    console.error(`Detalhes da validação em ${context}:`, formattedError);
    throw new Error(`Violação de contrato realtime em ${context}: payload inválido.`);
  }

  return parsed.data;
}

export function applyGameSessionEvent(event: GameSessionEvent): void {
  if (event.type === 'TOKEN_CREATED') {
    const parsed = requireEventPayload(event, tokenCreatedPayloadSchema, 'TOKEN_CREATED');
    if (parsed.character !== null) {
      useCharactersStore.getState().addCharacterFromSession(parsed.character);
    }
    useTokenStore.getState().addTokenFromSession(parsed.token);
    return;
  }

  if (event.type === 'TOKEN_REMOVED') {
    const parsed = requireEventPayload(event, tokenRemovedPayloadSchema, 'TOKEN_REMOVED');
    useTokenStore.getState().removeTokenFromSession(parsed.tokenId);
    if (parsed.removedCharacterId) {
      useCharactersStore.getState().removeCharacterFromSession(parsed.removedCharacterId);
    }
    if (parsed.combatChanged) {
      useCombatStore.getState().setCombatState(parsed.combat);
    }
    return;
  }

  if (event.type === 'TOKENS_REMOVED') {
    const parsed = requireEventPayload(event, tokensRemovedPayloadSchema, 'TOKENS_REMOVED');
    parsed.tokenIds.forEach((tokenId) => {
      useTokenStore.getState().removeTokenFromSession(tokenId);
    });
    if (parsed.removedCharacterIds.length > 0) {
      parsed.removedCharacterIds.forEach((characterId) => {
        useCharactersStore.getState().removeCharacterFromSession(characterId);
      });
    }
    if (parsed.combatChanged) {
      useCombatStore.getState().setCombatState(parsed.combat);
    }
    return;
  }

  if (event.type === 'CHARACTER_HP_UPDATED') {
    const parsed = requireEventPayload(event, characterHpUpdatedPayloadSchema, 'CHARACTER_HP_UPDATED');
    useCharactersStore.getState().updateCharacterHp(parsed.characterId, parsed.currentHp, parsed.tempHp);
    return;
  }

  if (event.type === 'ATTACK_RESOLVED') {
    const parsed = requireEventPayload(event, attackResolvedPayloadSchema, 'ATTACK_RESOLVED');

    useCharactersStore
      .getState()
      .updateCharacterHp(parsed.targetCharacterId, parsed.remainingCurrentHp, parsed.remainingTempHp);
    useCombatStore.getState().setCombatState(parsed.combat);

    const summary = parsed.hit
      ? `${parsed.attackName}: ${parsed.attackTotal} vs CA ${parsed.targetArmorClass} -> acerto, ${parsed.damageApplied} dano.`
      : `${parsed.attackName}: ${parsed.attackTotal} vs CA ${parsed.targetArmorClass} -> erro.`;

    const message: Message = {
      id: event.eventId,
      sender: 'Sistema',
      timestamp: new Date(event.createdAt),
      text: summary,
      isDiceRoll: false,
    };

    useChatStore.getState().addIncomingMessage(message);
    return;
  }

  if (
    event.type === 'CHARACTER_CREATED' ||
    event.type === 'CHARACTER_CONTROL_UPDATED' ||
    event.type === 'CHARACTER_EQUIPMENT_UPDATED' ||
    event.type === 'CHARACTER_INVENTORY_UPDATED'
  ) {
    const parsed = requireEventPayload(
      event,
      characterCreatedPayloadSchema,
      event.type,
    );

    useCharactersStore.getState().addCharacterFromSession(parsed.character);
    return;
  }

  if (event.type === 'CHARACTER_REMOVED') {
    const parsed = requireEventPayload(event, characterRemovedPayloadSchema, 'CHARACTER_REMOVED');

    useCharactersStore.getState().removeCharacterFromSession(parsed.characterId);
    if (parsed.removedTokenIds.length > 0) {
      parsed.removedTokenIds.forEach((tokenId) => {
        useTokenStore.getState().removeTokenFromSession(tokenId);
      });
      if (parsed.combatChanged) {
        useCombatStore.getState().setCombatState(parsed.combat);
      }
      return;
    }
    useTokenStore.getState().removeTokensByCharacterIdFromSession(parsed.characterId);
    if (parsed.combatChanged) {
      useCombatStore.getState().setCombatState(parsed.combat);
    }
    return;
  }

  if (event.type === 'COMBAT_STARTED' || event.type === 'COMBAT_TURN_ADVANCED') {
    const parsed = requireEventPayload(event, combatPayloadSchema, event.type);
    useCombatStore.getState().setCombatState(parsed.combat);
    return;
  }

  if (event.type === 'COMBAT_ENDED') {
    requireEventPayload(event, combatPayloadSchema, 'COMBAT_ENDED');
    useCombatStore.getState().clearCombatState();
    return;
  }

  if (event.type === 'TOKEN_MOVED') {
    const parsed = requireEventPayload(event, tokenMovedPayloadSchema, 'TOKEN_MOVED');
    useTokenStore.getState().updateTokenPosition(parsed.tokenId, parsed.position);
    if (parsed.combatChanged) {
      useCombatStore.getState().setCombatState(parsed.combat);
    }
    return;
  }

  if (event.type === 'CHAT_HISTORY_CLEARED') {
    useChatStore.getState().clearAllMessages();
    return;
  }

  if (event.type === 'CHAT_MESSAGE_CREATED' || event.type === 'DICE_ROLLED') {
    const parsed = requireEventPayload(event, chatMessagePayloadSchema, event.type);

    const message: Message = {
      ...parsed.message,
      senderUserId: parsed.message.senderUserId ?? event.actorUserId ?? null,
      timestamp: new Date(parsed.message.timestamp),
    };

    useChatStore.getState().addIncomingMessage(message);
  }
}
