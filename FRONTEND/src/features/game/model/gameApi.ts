import axios from 'axios';

import {
  createGameSchema,
  gameJoinRequestSchema,
  gameSchema,
  type CreateGameInput,
  type Game,
  type GameJoinRequest,
} from '@/entities/game/model/schemas/game.schema';
import { authApi } from '@/features/auth/model/authSlice';

const gameApi = authApi;

type BackendErrorPayload = {
  message?: string;
  fieldErrors?: Record<string, string>;
};

export type GameApiError = {
  formError: string;
  fieldErrors: Record<string, string>;
};

function parseApiError(error: unknown, fallback: string): GameApiError {
  if (!axios.isAxiosError(error)) {
    return { formError: fallback, fieldErrors: {} };
  }

  const payload = error.response?.data as BackendErrorPayload | undefined;
  return {
    formError: payload?.message || fallback,
    fieldErrors: payload?.fieldErrors ?? {},
  };
}

export async function fetchActiveGames(): Promise<Game[]> {
  try {
    const response = await gameApi.get<unknown[]>('/games/active');
    return response.data.map((item) => gameSchema.parse(item));
  } catch (error) {
    throw parseApiError(error, 'Falha ao carregar jogos ativos.');
  }
}

export async function createGame(input: CreateGameInput): Promise<Game> {
  const payload = createGameSchema.parse(input);
  try {
    const response = await gameApi.post<unknown>('/games', payload);
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao criar jogo.');
  }
}

export async function uploadGameCover(gameId: number, file: File): Promise<Game> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await gameApi.post<unknown>(`/games/${gameId}/cover`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao enviar capa do jogo.');
  }
}

export async function fetchGameById(gameId: number): Promise<Game> {
  try {
    const response = await gameApi.get<unknown>(`/games/${gameId}`);
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao carregar jogo.');
  }
}

export async function deleteGameById(gameId: number): Promise<void> {
  try {
    await gameApi.delete(`/games/${gameId}`);
  } catch (error) {
    throw parseApiError(error, 'Falha ao excluir jogo.');
  }
}

export async function submitJoinRequestByCode(joinCode: string): Promise<GameJoinRequest> {
  try {
    const response = await gameApi.post<unknown>('/games/join-requests', {
      joinCode: joinCode.trim().toUpperCase(),
    });
    return gameJoinRequestSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao solicitar acesso ao jogo.');
  }
}

export async function joinGameById(gameId: number): Promise<Game> {
  try {
    const response = await gameApi.post<unknown>(`/games/${gameId}/join`);
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao entrar no jogo.');
  }
}

export async function fetchMyJoinRequests(): Promise<GameJoinRequest[]> {
  try {
    const response = await gameApi.get<unknown[]>('/games/join-requests/me');
    return response.data.map((item) => gameJoinRequestSchema.parse(item));
  } catch (error) {
    throw parseApiError(error, 'Falha ao carregar suas solicitações.');
  }
}

export async function fetchOwnedPendingJoinRequests(): Promise<GameJoinRequest[]> {
  try {
    const response = await gameApi.get<unknown[]>('/games/join-requests/pending-owned');
    return response.data.map((item) => gameJoinRequestSchema.parse(item));
  } catch (error) {
    throw parseApiError(error, 'Falha ao carregar solicitações pendentes.');
  }
}

export async function approveJoinRequest(gameId: number, requestId: number): Promise<GameJoinRequest> {
  try {
    const response = await gameApi.post<unknown>(`/games/${gameId}/join-requests/${requestId}/approve`);
    return gameJoinRequestSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao aprovar solicitação.');
  }
}

export async function rejectJoinRequest(gameId: number, requestId: number): Promise<GameJoinRequest> {
  try {
    const response = await gameApi.post<unknown>(`/games/${gameId}/join-requests/${requestId}/reject`);
    return gameJoinRequestSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao rejeitar solicitação.');
  }
}

export async function leaveGameById(gameId: number): Promise<Game> {
  try {
    const response = await gameApi.post<unknown>(`/games/${gameId}/leave`);
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao sair do jogo.');
  }
}

export async function revokeGameMemberAccess(gameId: number, memberUserId: number): Promise<Game> {
  try {
    const response = await gameApi.post<unknown>(`/games/${gameId}/members/${memberUserId}/revoke`);
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao retirar permissão do jogador.');
  }
}

export async function updateGameNickname(gameId: number, nickname: string): Promise<Game> {
  try {
    const response = await gameApi.patch<unknown>(`/games/${gameId}/nickname`, {
      nickname: nickname.trim(),
    });
    return gameSchema.parse(response.data);
  } catch (error) {
    throw parseApiError(error, 'Falha ao salvar nickname do jogo.');
  }
}
