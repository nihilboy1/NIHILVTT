import axios from 'axios';
import { z } from 'zod';
import { DamageTypeEnum } from '@nihilvtt/datamodeling/primitives';

import { authApi } from '@/features/auth/model/authSlice';
import type { CombatDamageType } from '@/shared/api/types';

const sessionApi = authApi;

type BackendErrorPayload = {
  message?: string;
};

export type GameSessionApiError = {
  formError: string;
};

const gameSessionEventSchema = z.object({
  eventId: z.string(),
  gameId: z.number().int().positive(),
  serverVersion: z.number().int().nonnegative(),
  type: z.string(),
  actorUserId: z.number().int().positive().nullable(),
  payload: z.record(z.string(), z.unknown()),
  createdAt: z.string(),
});

const gameSessionSnapshotSchema = z.object({
  gameId: z.number().int().positive(),
  serverVersion: z.number().int().nonnegative(),
  state: z
    .object({
      characters: z.array(z.unknown()),
      tokens: z.array(z.unknown()),
      messages: z.array(z.unknown()),
      combat: z.object({}).passthrough().nullable(),
    })
    .passthrough(),
  recentEvents: z.array(z.unknown()),
  generatedAt: z.string().optional(),
});

export type GameSessionEvent = z.infer<typeof gameSessionEventSchema>;
export type GameSessionSnapshot = z.infer<typeof gameSessionSnapshotSchema>;

export function parseGameSessionSnapshotPayload(payload: unknown): GameSessionSnapshot {
  return gameSessionSnapshotSchema.parse(payload);
}

function parseApiError(error: unknown, fallback: string): GameSessionApiError {
  if (!axios.isAxiosError(error)) {
    return { formError: fallback };
  }

  const payload = error.response?.data as BackendErrorPayload | undefined;
  return {
    formError: payload?.message || fallback,
  };
}

export async function fetchGameSessionSnapshot(gameId: number): Promise<GameSessionSnapshot> {
  try {
    const response = await sessionApi.get<unknown>(`/games/${gameId}/session-state`);
    return parseGameSessionSnapshotPayload(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao carregar estado da sessão.');
  }
}

export async function sendGameChatMessage(gameId: number, text: string): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/chat-messages`, {
      text,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao enviar mensagem no chat.');
  }
}

export async function sendGameDiceRoll(
  gameId: number,
  formula: string,
  rollName: string,
  category: string,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/dice-rolls`, {
      formula,
      rollName,
      category,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao enviar rolagem de dados.');
  }
}

export async function clearGameChatHistory(gameId: number): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/chat/clear`);
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao limpar histórico do chat.');
  }
}

export async function sendGameMoveToken(
  gameId: number,
  tokenId: string,
  x: number,
  y: number,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/tokens/move`, {
      tokenId,
      x,
      y,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao mover token.');
  }
}

export async function sendGameResolveAttack(
  gameId: number,
  attackerTokenId: string,
  targetTokenId: string,
  attackId: string,
  attackName: string,
  attackBonus: number,
  damageFormula: string,
  attackDamageType: CombatDamageType,
): Promise<GameSessionEvent> {
  const parsedAttackDamageType = DamageTypeEnum.safeParse(attackDamageType);
  if (!parsedAttackDamageType.success) {
    throw { formError: 'Tipo de dano inválido.' } as GameSessionApiError;
  }

  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/combat/attacks`, {
      attackerTokenId,
      targetTokenId,
      attackId,
      attackName,
      attackBonus,
      damageFormula,
      attackDamageType: parsedAttackDamageType.data,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao resolver ataque.');
  }
}

export async function sendGameStartCombat(
  gameId: number,
  tokenIds: string[],
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/combat/start`, {
      tokenIds,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao iniciar combate.');
  }
}

export async function sendGameAdvanceCombatTurn(gameId: number): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/combat/next-turn`);
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao avançar turno do combate.');
  }
}

export async function sendGameEndCombat(gameId: number): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/combat/end`);
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao encerrar combate.');
  }
}

export async function sendGameCharacterHpUpdate(
  gameId: number,
  characterId: string,
  mode: 'damage' | 'heal',
  amount: number,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/characters/hp`, {
      characterId,
      mode,
      amount,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao atualizar HP do personagem.');
  }
}

export async function sendGameCharacterTempHpUpdate(
  gameId: number,
  characterId: string,
  amount: number,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/characters/temp-hp`, {
      characterId,
      amount,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao atualizar HP temporário do personagem.');
  }
}

export async function sendGameUpdateCharacterEquipment(
  gameId: number,
  characterId: string,
  slot: 'bodyArmorItemId' | 'shieldItemId' | 'mainHandWeaponId' | 'offHandWeaponId',
  itemId: string | null,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/characters/equipment`,
      {
        characterId,
        slot,
        itemId,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao atualizar equipamento do personagem.');
  }
}

export async function sendGameUpdateCharacterController(
  gameId: number,
  characterId: string,
  controlledByUserId: number | null,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/characters/controller`,
      {
        characterId,
        controlledByUserId,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao atualizar controlador do personagem.');
  }
}

export async function sendGameAddCharacterInventoryItem(
  gameId: number,
  characterId: string,
  itemId: string,
  quantity = 1,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/characters/inventory/add`,
      {
        characterId,
        itemId,
        quantity,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao adicionar item ao inventário do personagem.');
  }
}

export async function sendGameCreateToken(
  gameId: number,
  characterId: string,
  sceneId: string,
  x: number,
  y: number,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/tokens`, {
      characterId,
      sceneId,
      x,
      y,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao criar token.');
  }
}

export async function sendGameRemoveToken(
  gameId: number,
  tokenId: string,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/tokens/remove`, {
      tokenId,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao remover token.');
  }
}

export async function sendGameRemoveTokens(
  gameId: number,
  tokenIds: string[],
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/tokens/remove-batch`,
      {
        tokenIds,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao remover tokens.');
  }
}

export async function sendGameCreateCharacter(
  gameId: number,
  character: Record<string, unknown>,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/characters`, {
      character,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao criar personagem.');
  }
}

export async function sendGameSpawnMonster(
  gameId: number,
  monsterId: string,
  options?: {
    nameOverride?: string | null;
    sceneId?: string;
    x?: number;
    y?: number;
  },
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/monsters`, {
      monsterId,
      nameOverride: options?.nameOverride?.trim() ? options.nameOverride.trim() : null,
      sceneId: options?.sceneId ?? null,
      x: options?.x ?? null,
      y: options?.y ?? null,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao instanciar monstro.');
  }
}

export async function sendGameDuplicateCharacter(
  gameId: number,
  characterId: string,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/characters/duplicate`,
      {
        characterId,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao duplicar personagem.');
  }
}

export async function sendGameDuplicateCharacterWithToken(
  gameId: number,
  characterId: string,
  sceneId: string,
  x: number,
  y: number,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(
      `/games/${gameId}/session/characters/duplicate-with-token`,
      {
        characterId,
        sceneId,
        x,
        y,
      },
    );
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao duplicar personagem com token.');
  }
}

export async function sendGameRemoveCharacter(
  gameId: number,
  characterId: string,
): Promise<GameSessionEvent> {
  try {
    const response = await sessionApi.post<unknown>(`/games/${gameId}/session/characters/remove`, {
      characterId,
    });
    return gameSessionEventSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao remover personagem.');
  }
}
