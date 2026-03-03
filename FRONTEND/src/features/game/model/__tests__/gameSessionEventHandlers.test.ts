import type { GameSessionEvent } from '@/features/game/model/gameSessionApi';

const addCharacterFromSession = jest.fn();
const removeCharacterFromSession = jest.fn();
const updateCharacterHp = jest.fn();
const addTokenFromSession = jest.fn();
const removeTokenFromSession = jest.fn();
const removeTokensByCharacterIdFromSession = jest.fn();
const updateTokenPosition = jest.fn();
const addIncomingMessage = jest.fn();
const clearAllMessages = jest.fn();

jest.mock('@/entities/character/model/store', () => ({
  useCharactersStore: {
    getState: () => ({
      addCharacterFromSession,
      removeCharacterFromSession,
      updateCharacterHp,
    }),
  },
}));

jest.mock('@/entities/token/model/store/tokenStore', () => ({
  useTokenStore: {
    getState: () => ({
      addTokenFromSession,
      removeTokenFromSession,
      removeTokensByCharacterIdFromSession,
      updateTokenPosition,
    }),
  },
}));

jest.mock('@/features/chat/model/store', () => ({
  useChatStore: {
    getState: () => ({
      addIncomingMessage,
      clearAllMessages,
    }),
  },
}));

import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';

function createEvent(type: string, payload: Record<string, unknown>, actorUserId: number | null = 1): GameSessionEvent {
  return {
    eventId: 'evt-1',
    gameId: 1,
    serverVersion: 1,
    type,
    actorUserId,
    payload,
    createdAt: new Date().toISOString(),
  };
}

describe('applyGameSessionEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('aplica TOKEN_CREATED com character no payload e sincroniza ficha + token', () => {
    const runtimeCharacter = { id: 'char-1', name: 'Goblin' };
    const token = {
      id: 'token-1',
      characterId: 'char-1',
      sceneId: 'scene-1',
      position: { x: 3, y: 4 },
    };

    applyGameSessionEvent(
      createEvent('TOKEN_CREATED', {
        character: runtimeCharacter,
        token,
      }),
    );

    expect(addCharacterFromSession).toHaveBeenCalledWith(runtimeCharacter);
    expect(addTokenFromSession).toHaveBeenCalledWith(token);
  });

  it('aplica TOKEN_REMOVED com removedCharacterId e remove token + ficha clone', () => {
    applyGameSessionEvent(
      createEvent('TOKEN_REMOVED', {
        tokenId: 'token-1',
        removedCharacterId: 'char-1',
      }),
    );

    expect(removeTokenFromSession).toHaveBeenCalledWith('token-1');
    expect(removeCharacterFromSession).toHaveBeenCalledWith('char-1');
  });

  it('aplica CHARACTER_HP_UPDATED e sincroniza currentHp e tempHp', () => {
    applyGameSessionEvent(
      createEvent('CHARACTER_HP_UPDATED', {
        characterId: 'char-1',
        currentHp: 3,
        tempHp: 2,
      }),
    );

    expect(updateCharacterHp).toHaveBeenCalledWith('char-1', 3, 2);
  });

  it('preenche senderUserId a partir de actorUserId em CHAT_MESSAGE_CREATED', () => {
    applyGameSessionEvent(
      createEvent(
        'CHAT_MESSAGE_CREATED',
        {
          message: {
            id: 'msg-1',
            sender: 'Sistema',
            text: 'Teste',
            timestamp: '2026-03-01T12:00:00.000Z',
            isDiceRoll: false,
          },
        },
        42,
      ),
    );

    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'msg-1',
        senderUserId: 42,
        isDiceRoll: false,
        timestamp: expect.any(Date),
      }),
    );
  });

  it('falha explicitamente quando TOKEN_CREATED vier com payload inválido', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      applyGameSessionEvent(
        createEvent('TOKEN_CREATED', {
          token: {
            id: 'token-1',
            characterId: 'char-1',
            sceneId: 'scene-1',
          },
        }),
      ),
    ).toThrow('Violação de contrato realtime em TOKEN_CREATED: payload inválido.');

    expect(errorSpy).toHaveBeenCalled();
  });
});
