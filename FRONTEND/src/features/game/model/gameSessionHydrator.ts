import { z } from 'zod';

import { useCharactersStore } from '@/entities/character/model/store';
import { useSelectedTokenStore } from '@/entities/token/model/store/selectedTokenStore';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useChatStore } from '@/features/chat/model/store';
import { useAttackFeedbackStore } from '@/features/combat/model/attackFeedbackStore';
import { useCombatStore } from '@/features/combat/model/store';
import type { CombatState } from '@/shared/api/types';

import { type GameSessionSnapshot } from './gameSessionApi';
import { resetAppliedGameSessionEventIds } from './gameSessionEventHandlers';

const tokenSchema = z.object({
  id: z.string().min(1),
  characterId: z.string().min(1),
  sceneId: z.string().min(1),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

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

const textMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable()
    .optional(),
  text: z.string(),
  timestamp: z.string().datetime().or(z.date()),
  isDiceRoll: z.literal(false),
});

const diceMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullable()
    .optional(),
  text: z.string(),
  timestamp: z.string().datetime().or(z.date()),
  isDiceRoll: z.literal(true),
  diceRollDetails: diceRollDetailsSchema,
});

const messageSchema = z.union([textMessageSchema, diceMessageSchema]);

const combatParticipantSchema = z.object({
  tokenId: z.string().min(1),
  characterId: z.string().min(1),
  initiativeRoll: z.number().int(),
  initiativeTotal: z.number().int(),
  dexterityScore: z.number().int(),
  movementBudgetCells: z.number().int().min(0),
  status: z.string().trim().min(1),
  teamId: z.string().trim().min(1).nullable(),
});

const combatTurnResourcesSchema = z.object({
  actionAvailable: z.boolean(),
  bonusActionAvailable: z.boolean(),
  remainingMovementCells: z.number().int().min(0),
  totalMovementCells: z.number().int().min(1),
});

const combatStateSchema = z.object({
  active: z.literal(true),
  mode: z.enum(['freeForAll', 'teams']),
  round: z.number().int().min(1),
  turnIndex: z.number().int().min(0),
  participants: z.array(combatParticipantSchema),
  turnResources: combatTurnResourcesSchema,
});

export function resetGameSessionClientState(): void {
  resetAppliedGameSessionEventIds();
  useSelectedTokenStore.getState().setSelectedTokenId(null);
  useTokenStore.getState().resetTokens();
  useCharactersStore.getState().replaceCharacters([]);
  useChatStore.getState().clearMessages();
  useCombatStore.getState().clearCombatState();
  useAttackFeedbackStore.getState().clearAllFeedback();
}

function parseSnapshotTokens(entries: unknown[]) {
  return entries.map((entry, index) => {
    const parsed = tokenSchema.safeParse(entry);
    if (!parsed.success) {
      const formattedError = JSON.stringify(z.treeifyError(parsed.error), null, 2);
      console.error('Violação de contrato de sessão em hydrateGameSessionSnapshot.tokens.', {
        index,
        entry,
        validation: formattedError,
      });
      throw new Error(
        'Violação de contrato de sessão em hydrateGameSessionSnapshot.tokens: token inválido.',
      );
    }

    return parsed.data;
  });
}

function parseSnapshotMessages(entries: unknown[]) {
  return entries.map((entry, index) => {
    const parsed = messageSchema.safeParse(entry);
    if (!parsed.success) {
      const formattedError = JSON.stringify(z.treeifyError(parsed.error), null, 2);
      console.error('Violação de contrato de sessão em hydrateGameSessionSnapshot.messages.', {
        index,
        entry,
        validation: formattedError,
      });
      throw new Error(
        'Violação de contrato de sessão em hydrateGameSessionSnapshot.messages: mensagem inválida.',
      );
    }

    return {
      ...parsed.data,
      timestamp:
        parsed.data.timestamp instanceof Date
          ? parsed.data.timestamp
          : new Date(parsed.data.timestamp),
    };
  });
}

function parseSnapshotCombat(entry: unknown): CombatState | null {
  if (entry == null) {
    return null;
  }

  const parsed = combatStateSchema.safeParse(entry);
  if (!parsed.success) {
    const formattedError = JSON.stringify(z.treeifyError(parsed.error), null, 2);
    console.error('Violação de contrato de sessão em hydrateGameSessionSnapshot.combat.', {
      entry,
      validation: formattedError,
    });
    throw new Error(
      'Violação de contrato de sessão em hydrateGameSessionSnapshot.combat: combate inválido.',
    );
  }

  return parsed.data as CombatState;
}

export function hydrateGameSessionSnapshot(snapshot: GameSessionSnapshot): void {
  resetAppliedGameSessionEventIds();
  const rawCharacters = snapshot.state.characters;
  const parsedTokens = parseSnapshotTokens(snapshot.state.tokens);
  const parsedMessages = parseSnapshotMessages(snapshot.state.messages);
  const parsedCombat = parseSnapshotCombat(snapshot.state.combat);

  useCharactersStore.getState().replaceCharacters(rawCharacters);
  useTokenStore.getState().replaceTokens(parsedTokens);
  useChatStore.getState().replaceMessages(parsedMessages);
  useCombatStore.getState().setCombatState(parsedCombat);
  useAttackFeedbackStore.getState().clearAllFeedback();
  useSelectedTokenStore.getState().setSelectedTokenId(null);
}
