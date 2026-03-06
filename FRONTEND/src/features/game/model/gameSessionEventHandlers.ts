import { z } from 'zod';

import { useCharactersStore } from '@/entities/character/model/store';
import { parseTokenSize } from '@/entities/token/model/utils/tokenUtils';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import {
  computeMovementRange,
  reconstructPathToCell,
} from '@/features/combat/model/movement/movementPathfinding';
import { useBoardSettingsStore } from '@/features/boardSettings/model/store';
import { useChatStore } from '@/features/chat/model/store';
import { useAttackFeedbackStore } from '@/features/combat/model/attackFeedbackStore';
import { useCombatStore } from '@/features/combat/model/store';
import { Message } from '@/shared/api/types';

import { GameSessionEvent } from './gameSessionApi';

const APPLIED_EVENT_IDS_MAX_SIZE = 2000;
const TOKEN_MOVE_ANIMATION_STEP_MS = 55;
const appliedEventIds = new Set<string>();
const appliedEventIdQueue: string[] = [];
const tokenMoveAnimationTimeoutsByTokenId = new Map<string, number[]>();

function clearTokenMoveAnimation(tokenId: string): void {
  const timeoutIds = tokenMoveAnimationTimeoutsByTokenId.get(tokenId);
  if (!timeoutIds || timeoutIds.length === 0) {
    return;
  }

  timeoutIds.forEach((timeoutId) => {
    window.clearTimeout(timeoutId);
  });
  tokenMoveAnimationTimeoutsByTokenId.delete(tokenId);
}

function buildFallbackChebyshevPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  const path = [{ x: start.x, y: start.y }];
  let currentX = start.x;
  let currentY = start.y;

  while (currentX !== end.x || currentY !== end.y) {
    if (currentX < end.x) {
      currentX += 1;
    } else if (currentX > end.x) {
      currentX -= 1;
    }

    if (currentY < end.y) {
      currentY += 1;
    } else if (currentY > end.y) {
      currentY -= 1;
    }

    path.push({ x: currentX, y: currentY });
  }

  return path;
}

function animateTokenMoveFromRealtime(
  tokenId: string,
  destination: { x: number; y: number },
): void {
  const tokenStoreState = useTokenStore.getState();
  const token = tokenStoreState.tokensOnBoard.find((entry) => entry.id === tokenId);
  if (!token) {
    return;
  }

  const startPosition = token.position;
  if (startPosition.x === destination.x && startPosition.y === destination.y) {
    return;
  }

  const characters = useCharactersStore.getState().characters;
  const pageSettings = useBoardSettingsStore.getState().pageSettings;

  const tokenSizesById: Record<string, [number, number]> = {};
  tokenStoreState.tokensOnBoard.forEach((entry) => {
    const character = characters.find((characterEntry) => characterEntry.id === entry.characterId);
    tokenSizesById[entry.id] = parseTokenSize(character?.size);
  });

  const movingCharacter = characters.find((entry) => entry.id === token.characterId);
  const movingSize = parseTokenSize(movingCharacter?.size);
  const fullBoardBudget = pageSettings.widthInUnits * pageSettings.heightInUnits;
  const movementRange = computeMovementRange({
    startCell: startPosition,
    tokenSizeInCells: movingSize,
    movementBudgetCells: fullBoardBudget,
    pageSettings,
    collisionMap: {
      blockedCells: [],
      blockedEdges: [],
    },
    tokensOnBoard: tokenStoreState.tokensOnBoard,
    tokenSizesById,
    movingTokenId: tokenId,
  });

  const computedPath = reconstructPathToCell(
    movementRange.previousByCell,
    startPosition,
    destination,
  );
  const path =
    computedPath.length > 0 ? computedPath : buildFallbackChebyshevPath(startPosition, destination);
  if (path.length <= 1) {
    useTokenStore.getState().updateTokenPosition(tokenId, destination);
    return;
  }

  clearTokenMoveAnimation(tokenId);

  const timeoutIds: number[] = [];
  for (let index = 1; index < path.length; index += 1) {
    const step = path[index];
    if (!step) {
      continue;
    }

    const timeoutId = window.setTimeout(() => {
      useTokenStore.getState().updateTokenPosition(tokenId, step);
      if (index === path.length - 1) {
        tokenMoveAnimationTimeoutsByTokenId.delete(tokenId);
      }
    }, TOKEN_MOVE_ANIMATION_STEP_MS * index);
    timeoutIds.push(timeoutId);
  }

  if (timeoutIds.length > 0) {
    tokenMoveAnimationTimeoutsByTokenId.set(tokenId, timeoutIds);
  }
}

function rememberAppliedEventId(eventId: string): void {
  if (appliedEventIds.has(eventId)) {
    return;
  }
  appliedEventIds.add(eventId);
  appliedEventIdQueue.push(eventId);

  if (appliedEventIdQueue.length <= APPLIED_EVENT_IDS_MAX_SIZE) {
    return;
  }

  const overflowCount = appliedEventIdQueue.length - APPLIED_EVENT_IDS_MAX_SIZE;
  for (let index = 0; index < overflowCount; index += 1) {
    const staleEventId = appliedEventIdQueue.shift();
    if (!staleEventId) {
      break;
    }
    appliedEventIds.delete(staleEventId);
  }
}

export function resetAppliedGameSessionEventIds(): void {
  appliedEventIds.clear();
  appliedEventIdQueue.length = 0;
  tokenMoveAnimationTimeoutsByTokenId.forEach((timeoutIds, tokenId) => {
    void tokenId;
    timeoutIds.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
  });
  tokenMoveAnimationTimeoutsByTokenId.clear();
}

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
  senderColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable()
    .optional(),
  text: z.string(),
  timestamp: z.string(),
  isDiceRoll: z.literal(false),
});

const chatDiceMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable()
    .optional(),
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
  character: z.object({}).passthrough().nullable(),
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
  character: z.object({}).passthrough(),
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

function requireEventPayload<T>(event: GameSessionEvent, schema: z.ZodType<T>, context: string): T {
  const parsed = schema.safeParse(event.payload);
  if (!parsed.success) {
    const formattedError = JSON.stringify(z.treeifyError(parsed.error), null, 2);
    console.error(`Violação de contrato realtime em ${context}. Event recebido:`, event);
    console.error(`Detalhes da validação em ${context}:`, formattedError);
    throw new Error(`Violação de contrato realtime em ${context}: payload inválido.`);
  }

  return parsed.data;
}

function resolveTokenDisplayName(tokenId: string): string {
  const token = useTokenStore.getState().tokensOnBoard.find((entry) => entry.id === tokenId);
  if (!token) {
    return `Token ${tokenId}`;
  }

  const character = useCharactersStore
    .getState()
    .characters.find((entry) => entry.id === token.characterId);
  return character?.name ?? `Token ${tokenId}`;
}

export function applyGameSessionEvent(event: GameSessionEvent): void {
  if (appliedEventIds.has(event.eventId)) {
    return;
  }
  rememberAppliedEventId(event.eventId);

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
    useAttackFeedbackStore.getState().clearFeedbackForToken(parsed.tokenId);
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
      useAttackFeedbackStore.getState().clearFeedbackForToken(tokenId);
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
    const parsed = requireEventPayload(
      event,
      characterHpUpdatedPayloadSchema,
      'CHARACTER_HP_UPDATED',
    );
    useCharactersStore
      .getState()
      .updateCharacterHp(parsed.characterId, parsed.currentHp, parsed.tempHp);
    return;
  }

  if (event.type === 'ATTACK_RESOLVED') {
    const parsed = requireEventPayload(event, attackResolvedPayloadSchema, 'ATTACK_RESOLVED');

    useCharactersStore
      .getState()
      .updateCharacterHp(
        parsed.targetCharacterId,
        parsed.remainingCurrentHp,
        parsed.remainingTempHp,
      );
    useCombatStore.getState().setCombatState(parsed.combat);
    useAttackFeedbackStore.getState().pushFeedback({
      id: event.eventId,
      tokenId: parsed.targetTokenId,
      hit: parsed.hit,
      attackTotal: parsed.attackTotal,
      targetArmorClass: parsed.targetArmorClass,
      damageApplied: parsed.damageApplied,
    });

    const attackerName = resolveTokenDisplayName(parsed.attackerTokenId);
    const targetName = resolveTokenDisplayName(parsed.targetTokenId);
    const hitStatus = parsed.hit ? 'ACERTO' : 'ERRO';
    const remainingHpSummary =
      parsed.remainingTempHp > 0
        ? `${parsed.remainingCurrentHp} HP + ${parsed.remainingTempHp} THP`
        : `${parsed.remainingCurrentHp} HP`;
    const compactSummary = parsed.hit
      ? `${attackerName} usou ${parsed.attackName} em ${targetName}: ${parsed.attackTotal} vs CA ${parsed.targetArmorClass} -> ACERTO, ${parsed.damageApplied} dano`
      : `${attackerName} usou ${parsed.attackName} em ${targetName}: ${parsed.attackTotal} vs CA ${parsed.targetArmorClass} -> ERRO`;
    const summary = [
      compactSummary,
      '---',
      `Ataque: ${parsed.attackName}`,
      `Atacante: ${attackerName}`,
      `Alvo(s): ${targetName}`,
      `Resultado: ${parsed.attackTotal} vs CA ${parsed.targetArmorClass} -> ${hitStatus}`,
      parsed.hit
        ? `Dano aplicado: ${parsed.damageApplied} (rolado: ${parsed.damageTotal})`
        : 'Dano aplicado: 0',
      `HP do alvo: ${remainingHpSummary}`,
    ].join('\n');

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
    const parsed = requireEventPayload(event, characterCreatedPayloadSchema, event.type);

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
    animateTokenMoveFromRealtime(parsed.tokenId, parsed.position);
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
