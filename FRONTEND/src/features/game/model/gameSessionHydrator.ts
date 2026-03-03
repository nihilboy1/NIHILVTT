import { z } from 'zod';

import { useCharactersStore } from '@/entities/character/model/store';
import { useSelectedTokenStore } from '@/entities/token/model/store/selectedTokenStore';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useChatStore } from '@/features/chat/model/store';
import { useCombatStore } from '@/features/combat/model/store';
import type { CombatState } from '@/shared/api/types';

import { type GameSessionSnapshot } from './gameSessionApi';

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
  senderColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(),
  text: z.string(),
  timestamp: z.string().datetime().or(z.date()),
  isDiceRoll: z.literal(false),
});

const diceMessageSchema = z.object({
  id: z.string().min(1),
  sender: z.string().min(1),
  senderUserId: z.number().int().positive().nullable().optional(),
  senderColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(),
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
  status: z.literal('active'),
});

const combatStateSchema = z.object({
  active: z.literal(true),
  round: z.number().int().min(1),
  turnIndex: z.number().int().min(0),
  participants: z.array(combatParticipantSchema),
});

export function resetGameSessionClientState(): void {
  useSelectedTokenStore.getState().setSelectedTokenId(null);
  useTokenStore.getState().resetTokens();
  useCharactersStore.getState().replaceCharacters([]);
  useChatStore.getState().clearMessages();
  useCombatStore.getState().clearCombatState();
}

export function hydrateGameSessionSnapshot(snapshot: GameSessionSnapshot): void {
  const rawCharacters = snapshot.state.characters ?? [];

  const rawTokens = snapshot.state.tokens ?? [];
  const parsedTokens = rawTokens
    .map((entry) => tokenSchema.safeParse(entry))
    .filter((result): result is z.ZodSafeParseSuccess<z.infer<typeof tokenSchema>> => result.success)
    .map((result) => result.data);

  const rawMessages = snapshot.state.messages ?? [];
  const parsedMessages = rawMessages
    .map((entry) => messageSchema.safeParse(entry))
    .filter((result): result is z.ZodSafeParseSuccess<z.infer<typeof messageSchema>> => result.success)
    .map((result) => ({
      ...result.data,
      timestamp: result.data.timestamp instanceof Date ? result.data.timestamp : new Date(result.data.timestamp),
    }));

  const parsedCombat = combatStateSchema.safeParse(snapshot.state.combat);

  useCharactersStore.getState().replaceCharacters(rawCharacters);
  useTokenStore.getState().replaceTokens(parsedTokens);
  useChatStore.getState().replaceMessages(parsedMessages);
  useCombatStore.getState().setCombatState(parsedCombat.success ? (parsedCombat.data as CombatState) : null);
  useSelectedTokenStore.getState().setSelectedTokenId(null);
}
