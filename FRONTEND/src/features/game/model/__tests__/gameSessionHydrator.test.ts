import type { GameSessionSnapshot } from '@/features/game/model/gameSessionApi';

const replaceCharacters = jest.fn();
const replaceTokens = jest.fn();
const replaceMessages = jest.fn();
const setCombatState = jest.fn();
const clearCombatState = jest.fn();
const setSelectedTokenId = jest.fn();
const resetTokens = jest.fn();
const clearMessages = jest.fn();

jest.mock('@/entities/character/model/store', () => ({
  useCharactersStore: {
    getState: () => ({
      replaceCharacters,
    }),
  },
}));

jest.mock('@/entities/token/model/store/tokenStore', () => ({
  useTokenStore: {
    getState: () => ({
      replaceTokens,
      resetTokens,
    }),
  },
}));

jest.mock('@/features/chat/model/store', () => ({
  useChatStore: {
    getState: () => ({
      replaceMessages,
      clearMessages,
    }),
  },
}));

jest.mock('@/features/combat/model/store', () => ({
  useCombatStore: {
    getState: () => ({
      setCombatState,
      clearCombatState,
    }),
  },
}));

jest.mock('@/entities/token/model/store/selectedTokenStore', () => ({
  useSelectedTokenStore: {
    getState: () => ({
      setSelectedTokenId,
    }),
  },
}));

import {
  hydrateGameSessionSnapshot,
  resetGameSessionClientState,
} from '@/features/game/model/gameSessionHydrator';

describe('gameSessionHydrator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hydrates a snapshot containing a valid Player character', () => {
    const snapshot: GameSessionSnapshot = {
      gameId: 1,
      serverVersion: 1,
      state: {
        characters: [
          {
            id: '11111111-1111-4111-8111-111111111111',
            type: 'Player',
          },
        ],
        tokens: [],
        messages: [],
      },
      recentEvents: [],
    };

    expect(() => hydrateGameSessionSnapshot(snapshot)).not.toThrow();
    expect(replaceCharacters).toHaveBeenCalledWith(snapshot.state.characters);
    expect(setSelectedTokenId).toHaveBeenCalledWith(null);
  });

  it('hydrates a snapshot containing a valid NPC character', () => {
    const snapshot: GameSessionSnapshot = {
      gameId: 1,
      serverVersion: 1,
      state: {
        characters: [
          {
            id: '22222222-2222-4222-8222-222222222222',
            type: 'NPC',
            monsterId: 'monster-commoner',
          },
        ],
        tokens: [],
        messages: [],
      },
      recentEvents: [],
    };

    expect(() => hydrateGameSessionSnapshot(snapshot)).not.toThrow();
    expect(replaceCharacters).toHaveBeenCalledWith(snapshot.state.characters);
    expect(setSelectedTokenId).toHaveBeenCalledWith(null);
  });

  it('hydrates a complete snapshot with Player, NPC, tokens, messages and combat', () => {
    const timestamp = '2026-03-03T12:00:00.000Z';
    const snapshot: GameSessionSnapshot = {
      gameId: 1,
      serverVersion: 7,
      state: {
        characters: [
          {
            id: '11111111-1111-4111-8111-111111111111',
            type: 'Player',
          },
          {
            id: '22222222-2222-4222-8222-222222222222',
            type: 'NPC',
            monsterId: 'monster-commoner',
          },
        ],
        tokens: [
          {
            id: 'token-1',
            characterId: '11111111-1111-4111-8111-111111111111',
            sceneId: 'default-scene',
            position: { x: 2, y: 3 },
          },
          {
            id: 'token-2',
            characterId: '22222222-2222-4222-8222-222222222222',
            sceneId: 'default-scene',
            position: { x: 5, y: 6 },
          },
        ],
        messages: [
          {
            id: 'msg-1',
            sender: 'Sistema',
            text: 'Combate iniciado',
            timestamp,
            isDiceRoll: false,
          },
        ],
        combat: {
          active: true,
          round: 1,
          turnIndex: 0,
          participants: [
            {
              tokenId: 'token-1',
              characterId: '11111111-1111-4111-8111-111111111111',
              initiativeRoll: 12,
              initiativeTotal: 14,
              dexterityScore: 14,
              movementBudgetCells: 6,
              status: 'active',
            },
            {
              tokenId: 'token-2',
              characterId: '22222222-2222-4222-8222-222222222222',
              initiativeRoll: 8,
              initiativeTotal: 8,
              dexterityScore: 10,
              movementBudgetCells: 6,
              status: 'active',
            },
          ],
          turnResources: {
            actionAvailable: true,
            bonusActionAvailable: true,
            remainingMovementCells: 6,
            totalMovementCells: 6,
          },
        },
      },
      recentEvents: [],
    };

    hydrateGameSessionSnapshot(snapshot);

    expect(replaceCharacters).toHaveBeenCalledWith(snapshot.state.characters);
    expect(replaceTokens).toHaveBeenCalledWith(snapshot.state.tokens);
    expect(replaceMessages).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 'msg-1',
        sender: 'Sistema',
        text: 'Combate iniciado',
        isDiceRoll: false,
        timestamp: new Date(timestamp),
      }),
    ]);
    expect(setCombatState).toHaveBeenCalledWith(snapshot.state.combat);
    expect(setSelectedTokenId).toHaveBeenCalledWith(null);
  });

  it('fails fast when the character contract boundary rejects the snapshot payload', () => {
    replaceCharacters.mockImplementationOnce(() => {
      throw new Error('Violação de contrato de sessão em replaceCharacters[0]: runtime de personagem inválido.');
    });

    const snapshot: GameSessionSnapshot = {
      gameId: 1,
      serverVersion: 1,
      state: {
        characters: [
          {
            id: 'invalid-character',
            type: 'Player',
          },
        ],
        tokens: [
          {
            id: 'token-1',
            characterId: 'invalid-character',
            sceneId: 'default-scene',
            position: { x: 2, y: 3 },
          },
        ],
        messages: [],
      },
      recentEvents: [],
    };

    expect(() => hydrateGameSessionSnapshot(snapshot)).toThrow(
      'Violação de contrato de sessão em replaceCharacters[0]: runtime de personagem inválido.',
    );
    expect(replaceCharacters).toHaveBeenCalledWith(snapshot.state.characters);
    expect(replaceTokens).not.toHaveBeenCalled();
    expect(replaceMessages).not.toHaveBeenCalled();
    expect(setCombatState).not.toHaveBeenCalled();
  });

  it('fails fast when the snapshot contract is bypassed and required arrays are absent', () => {
    const invalidSnapshot = {
      gameId: 1,
      serverVersion: 1,
      state: {
        characters: [],
        messages: [],
      },
      recentEvents: [],
    } as unknown as GameSessionSnapshot;

    expect(() => hydrateGameSessionSnapshot(invalidSnapshot)).toThrow();
    expect(replaceCharacters).not.toHaveBeenCalled();
    expect(replaceTokens).not.toHaveBeenCalled();
    expect(replaceMessages).not.toHaveBeenCalled();
  });

  it('reset clears the session state stores explicitly', () => {
    resetGameSessionClientState();

    expect(setSelectedTokenId).toHaveBeenCalledWith(null);
    expect(resetTokens).toHaveBeenCalled();
    expect(replaceCharacters).toHaveBeenCalledWith([]);
    expect(clearMessages).toHaveBeenCalled();
    expect(clearCombatState).toHaveBeenCalled();
  });
});
