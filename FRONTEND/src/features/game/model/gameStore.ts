import { create } from 'zustand';

import type {
  CreateGameInput,
  Game,
  GameJoinRequest,
} from '@/entities/game/model/schemas/game.schema';

import {
  approveJoinRequest,
  createGame,
  fetchActiveGames,
  fetchGameById,
  fetchMyJoinRequests,
  fetchOwnedPendingJoinRequests,
  joinGameById,
  leaveGameById,
  deleteGameById as deleteGameApiById,
  uploadGameCover as uploadGameCoverApi,
  rejectJoinRequest,
  revokeGameMemberAccess,
  submitJoinRequestByCode,
  updateGameNickname,
  type GameApiError,
} from './gameApi';

type GameState = {
  games: Game[];
  currentGame: Game | null;
  myJoinRequests: GameJoinRequest[];
  ownedPendingJoinRequests: GameJoinRequest[];
  isLoadingGames: boolean;
  isCreatingGame: boolean;
  isSubmittingJoinRequest: boolean;
  isJoiningGame: boolean;
  isLeavingGame: boolean;
  isDeletingGame: boolean;
  isUploadingGameCover: boolean;
  isUpdatingNickname: boolean;
  isLoadingJoinRequests: boolean;
  isReviewingJoinRequest: boolean;
  isLoadingCurrentGame: boolean;
  isRevokingMemberAccess: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  fetchActiveGames: () => Promise<void>;
  createGame: (input: CreateGameInput) => Promise<Game | null>;
  submitJoinRequest: (joinCode: string) => Promise<GameJoinRequest | null>;
  fetchJoinRequests: () => Promise<void>;
  approveJoinRequest: (gameId: number, requestId: number) => Promise<GameJoinRequest | null>;
  rejectJoinRequest: (gameId: number, requestId: number) => Promise<GameJoinRequest | null>;
  joinGameById: (gameId: number) => Promise<Game | null>;
  loadCurrentGameById: (gameId: number) => Promise<Game | null>;
  leaveGameById: (gameId: number) => Promise<Game | null>;
  deleteGameById: (gameId: number) => Promise<boolean>;
  uploadGameCover: (gameId: number, file: File) => Promise<Game | null>;
  updateNicknameForGame: (gameId: number, nickname: string) => Promise<Game | null>;
  revokeMemberAccess: (gameId: number, memberUserId: number) => Promise<Game | null>;
  applyMemberRevokedEvent: (gameId: number, memberUserId: number) => void;
  removeMyJoinRequestsForGame: (gameId: number) => void;
  removeGameFromList: (gameId: number) => void;
  setCurrentGame: (game: Game | null) => void;
  clearError: () => void;
};

function readError(error: unknown, fallback: string): GameApiError {
  if (
    typeof error === 'object' &&
    error !== null &&
    'formError' in error &&
    'fieldErrors' in error
  ) {
    const apiError = error as GameApiError;
    return {
      formError: apiError.formError || fallback,
      fieldErrors: apiError.fieldErrors || {},
    };
  }
  return { formError: fallback, fieldErrors: {} };
}

export const useGameStore = create<GameState>((set) => ({
  games: [],
  currentGame: null,
  myJoinRequests: [],
  ownedPendingJoinRequests: [],
  isLoadingGames: false,
  isCreatingGame: false,
  isSubmittingJoinRequest: false,
  isJoiningGame: false,
  isLeavingGame: false,
  isDeletingGame: false,
  isUploadingGameCover: false,
  isUpdatingNickname: false,
  isLoadingJoinRequests: false,
  isReviewingJoinRequest: false,
  isLoadingCurrentGame: false,
  isRevokingMemberAccess: false,
  error: null,
  fieldErrors: {},

  fetchActiveGames: async () => {
    set({ isLoadingGames: true, error: null });
    try {
      const games = await fetchActiveGames();
      set({ games });
    } catch (error) {
      const parsed = readError(error, 'Falha ao carregar jogos ativos.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
    } finally {
      set({ isLoadingGames: false });
    }
  },

  createGame: async (input) => {
    set({ isCreatingGame: true, error: null, fieldErrors: {} });
    try {
      const created = await createGame(input);
      set((state) => ({ games: [created, ...state.games] }));
      return created;
    } catch (error) {
      const parsed = readError(error, 'Falha ao criar jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isCreatingGame: false });
    }
  },

  submitJoinRequest: async (joinCode) => {
    set({ isSubmittingJoinRequest: true, error: null, fieldErrors: {} });
    try {
      const request = await submitJoinRequestByCode(joinCode);
      set((state) => ({
        myJoinRequests: [request, ...state.myJoinRequests.filter((item) => item.id !== request.id)],
      }));
      return request;
    } catch (error) {
      const parsed = readError(error, 'Falha ao solicitar acesso ao jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isSubmittingJoinRequest: false });
    }
  },

  fetchJoinRequests: async () => {
    set({ isLoadingJoinRequests: true, error: null });
    try {
      const [myJoinRequests, ownedPendingJoinRequests] = await Promise.all([
        fetchMyJoinRequests(),
        fetchOwnedPendingJoinRequests(),
      ]);
      set({ myJoinRequests, ownedPendingJoinRequests });
    } catch (error) {
      const parsed = readError(error, 'Falha ao carregar solicitações.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
    } finally {
      set({ isLoadingJoinRequests: false });
    }
  },

  approveJoinRequest: async (gameId, requestId) => {
    set({ isReviewingJoinRequest: true, error: null, fieldErrors: {} });
    try {
      const reviewed = await approveJoinRequest(gameId, requestId);
      set((state) => ({
        ownedPendingJoinRequests: state.ownedPendingJoinRequests.filter((item) => item.id !== requestId),
        games: state.games.map((item) => (item.id === reviewed.game.id ? reviewed.game : item)),
      }));
      return reviewed;
    } catch (error) {
      const parsed = readError(error, 'Falha ao aprovar solicitação.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isReviewingJoinRequest: false });
    }
  },

  rejectJoinRequest: async (gameId, requestId) => {
    set({ isReviewingJoinRequest: true, error: null, fieldErrors: {} });
    try {
      const reviewed = await rejectJoinRequest(gameId, requestId);
      set((state) => ({
        ownedPendingJoinRequests: state.ownedPendingJoinRequests.filter((item) => item.id !== requestId),
      }));
      return reviewed;
    } catch (error) {
      const parsed = readError(error, 'Falha ao rejeitar solicitação.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isReviewingJoinRequest: false });
    }
  },

  joinGameById: async (gameId) => {
    set({ isJoiningGame: true, error: null, fieldErrors: {} });
    try {
      const game = await joinGameById(gameId);
      set((state) => ({
        currentGame: game,
        games: state.games.some((item) => item.id === game.id)
          ? state.games.map((item) => (item.id === game.id ? game : item))
          : [game, ...state.games],
      }));
      return game;
    } catch (error) {
      const parsed = readError(error, 'Falha ao entrar no jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isJoiningGame: false });
    }
  },

  loadCurrentGameById: async (gameId) => {
    set({ isLoadingCurrentGame: true, error: null, fieldErrors: {} });
    try {
      const game = await fetchGameById(gameId);
      set({ currentGame: game });
      return game;
    } catch (error) {
      const parsed = readError(error, 'Falha ao carregar jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors, currentGame: null });
      return null;
    } finally {
      set({ isLoadingCurrentGame: false });
    }
  },

  leaveGameById: async (gameId) => {
    set({ isLeavingGame: true, error: null, fieldErrors: {} });
    try {
      const game = await leaveGameById(gameId);
      set((state) => ({
        currentGame: null,
        games: state.games.map((item) => (item.id === game.id ? game : item)),
      }));
      return game;
    } catch (error) {
      const parsed = readError(error, 'Falha ao sair do jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isLeavingGame: false });
    }
  },

  deleteGameById: async (gameId) => {
    set({ isDeletingGame: true, error: null, fieldErrors: {} });
    try {
      await deleteGameApiById(gameId);
      set((state) => ({
        currentGame: state.currentGame?.id === gameId ? null : state.currentGame,
        games: state.games.filter((game) => game.id !== gameId),
        myJoinRequests: state.myJoinRequests.filter((request) => request.game.id !== gameId),
        ownedPendingJoinRequests: state.ownedPendingJoinRequests.filter((request) => request.game.id !== gameId),
      }));
      return true;
    } catch (error) {
      const parsed = readError(error, 'Falha ao excluir jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return false;
    } finally {
      set({ isDeletingGame: false });
    }
  },

  uploadGameCover: async (gameId, file) => {
    set({ isUploadingGameCover: true, error: null, fieldErrors: {} });
    try {
      const updated = await uploadGameCoverApi(gameId, file);
      set((state) => ({
        currentGame: state.currentGame?.id === updated.id ? updated : state.currentGame,
        games: state.games.map((item) => (item.id === updated.id ? updated : item)),
      }));
      return updated;
    } catch (error) {
      const parsed = readError(error, 'Falha ao enviar capa do jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isUploadingGameCover: false });
    }
  },

  updateNicknameForGame: async (gameId, nickname) => {
    set({ isUpdatingNickname: true, error: null, fieldErrors: {} });
    try {
      const updated = await updateGameNickname(gameId, nickname);
      set((state) => ({
        currentGame: state.currentGame?.id === updated.id ? updated : state.currentGame,
        games: state.games.map((item) => (item.id === updated.id ? updated : item)),
      }));
      return updated;
    } catch (error) {
      const parsed = readError(error, 'Falha ao salvar nickname do jogo.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isUpdatingNickname: false });
    }
  },

  revokeMemberAccess: async (gameId, memberUserId) => {
    set({ isRevokingMemberAccess: true, error: null, fieldErrors: {} });
    try {
      const updated = await revokeGameMemberAccess(gameId, memberUserId);
      set((state) => ({
        currentGame: state.currentGame?.id === updated.id ? updated : state.currentGame,
        games: state.games.map((item) => (item.id === updated.id ? updated : item)),
        myJoinRequests: state.myJoinRequests.filter((request) => request.game.id !== gameId),
      }));
      return updated;
    } catch (error) {
      const parsed = readError(error, 'Falha ao retirar permissão do jogador.');
      set({ error: parsed.formError, fieldErrors: parsed.fieldErrors });
      return null;
    } finally {
      set({ isRevokingMemberAccess: false });
    }
  },

  applyMemberRevokedEvent: (gameId, memberUserId) => {
    set((state) => {
      const updateGame = (game: Game): Game => {
        if (game.id !== gameId) {
          return game;
        }
        const players = game.players.filter((player) => player.id !== memberUserId);
        return {
          ...game,
          players,
          currentPlayers: players.length,
        };
      };

      return {
        currentGame: state.currentGame ? updateGame(state.currentGame) : null,
        games: state.games.map(updateGame),
      };
    });
  },

  removeMyJoinRequestsForGame: (gameId) => {
    set((state) => ({
      myJoinRequests: state.myJoinRequests.filter((request) => request.game.id !== gameId),
    }));
  },

  removeGameFromList: (gameId) => {
    set((state) => ({
      games: state.games.filter((game) => game.id !== gameId),
    }));
  },

  setCurrentGame: (game) => set({ currentGame: game }),

  clearError: () => set({ error: null, fieldErrors: {} }),
}));
