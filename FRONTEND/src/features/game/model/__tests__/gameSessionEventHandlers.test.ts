import type { GameSessionEvent } from '@/features/game/model/gameSessionApi';
import {
  applyGameSessionEvent,
  resetAppliedGameSessionEventIds,
} from '@/features/game/model/gameSessionEventHandlers';

const addCharacterFromSession = jest.fn();
const removeCharacterFromSession = jest.fn();
const updateCharacterHp = jest.fn();
const addTokenFromSession = jest.fn();
const removeTokenFromSession = jest.fn();
const removeTokensByCharacterIdFromSession = jest.fn();
const updateTokenPosition = jest.fn();
const addIncomingMessage = jest.fn();
const clearAllMessages = jest.fn();
const setCombatState = jest.fn();
const mockCharacters: Array<{ id: string; name: string }> = [];
const mockTokens: Array<{ id: string; characterId: string }> = [];

jest.mock('@/entities/character/model/store', () => ({
  useCharactersStore: {
    getState: () => ({
      characters: mockCharacters,
      addCharacterFromSession,
      removeCharacterFromSession,
      updateCharacterHp,
    }),
  },
}));

jest.mock('@/entities/token/model/store/tokenStore', () => ({
  useTokenStore: {
    getState: () => ({
      tokensOnBoard: mockTokens,
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

jest.mock('@/features/combat/model/store', () => ({
  useCombatStore: {
    getState: () => ({
      setCombatState,
      clearCombatState: jest.fn(),
    }),
  },
}));

let eventSequence = 0;

function createEvent(
  type: string,
  payload: Record<string, unknown>,
  actorUserId: number | null = 1,
): GameSessionEvent {
  eventSequence += 1;
  return {
    eventId: `evt-${eventSequence}`,
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
    resetAppliedGameSessionEventIds();
    eventSequence = 0;
    mockCharacters.length = 0;
    mockTokens.length = 0;
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

  it('aplica TOKEN_CREATED com character nulo e sincroniza apenas o token', () => {
    const token = {
      id: 'token-2',
      characterId: 'char-2',
      sceneId: 'scene-1',
      position: { x: 5, y: 6 },
    };

    applyGameSessionEvent(
      createEvent('TOKEN_CREATED', {
        character: null,
        token,
      }),
    );

    expect(addCharacterFromSession).not.toHaveBeenCalled();
    expect(addTokenFromSession).toHaveBeenCalledWith(token);
  });

  it('aplica CHARACTER_CREATED para payload de Player', () => {
    const runtimeCharacter = {
      id: 'char-player-1',
      type: 'Player',
      name: 'Heroi',
    };

    applyGameSessionEvent(
      createEvent('CHARACTER_CREATED', {
        character: runtimeCharacter,
      }),
    );

    expect(addCharacterFromSession).toHaveBeenCalledWith(runtimeCharacter);
  });

  it('aplica CHARACTER_CREATED para payload de NPC', () => {
    const runtimeCharacter = {
      id: 'char-npc-1',
      type: 'NPC',
      monsterId: 'monster-commoner',
      hitPoints: {
        current: 4,
        temporary: 0,
      },
    };

    applyGameSessionEvent(
      createEvent('CHARACTER_CREATED', {
        character: runtimeCharacter,
      }),
    );

    expect(addCharacterFromSession).toHaveBeenCalledWith(runtimeCharacter);
  });

  it('aplica TOKEN_REMOVED com removedCharacterId e remove token + ficha clone', () => {
    applyGameSessionEvent(
      createEvent('TOKEN_REMOVED', {
        tokenId: 'token-1',
        removedCharacterId: 'char-1',
        combatChanged: false,
        combat: null,
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

    expect(updateCharacterHp).toHaveBeenCalledWith('char-1', 3, 2, {
      deadConditionApplied: false,
      deadConditionRemoved: false,
    });
  });

  it('aplica TOKENS_REMOVED e sincroniza todos os tokens removidos em um único evento', () => {
    applyGameSessionEvent(
      createEvent('TOKENS_REMOVED', {
        tokenIds: ['token-1', 'token-2'],
        removedCharacterIds: ['char-1'],
        combatChanged: true,
        combat: null,
      }),
    );

    expect(removeTokenFromSession).toHaveBeenCalledWith('token-1');
    expect(removeTokenFromSession).toHaveBeenCalledWith('token-2');
    expect(removeCharacterFromSession).toHaveBeenCalledWith('char-1');
    expect(setCombatState).toHaveBeenCalledWith(null);
  });

  it('aplica COMBAT_STARTED e sincroniza o combatState completo', () => {
    const combat = {
      active: true,
      mode: 'teams' as const,
      round: 1,
      turnIndex: 0,
      participants: [
        {
          tokenId: 'token-1',
          characterId: 'char-1',
          initiativeRoll: 12,
          initiativeTotal: 14,
          dexterityScore: 14,
          movementBudgetCells: 6,
          status: 'active' as const,
          teamId: 'team-1',
        },
      ],
      turnResources: {
        actionAvailable: true,
        bonusActionAvailable: true,
        remainingMovementCells: 6,
        totalMovementCells: 6,
      },
    };

    applyGameSessionEvent(
      createEvent('COMBAT_STARTED', {
        combat,
      }),
    );

    expect(setCombatState).toHaveBeenCalledWith(combat);
  });

  it('aplica COMBAT_TURN_ADVANCED e sincroniza o novo estado de turno', () => {
    const combat = {
      active: true,
      mode: 'teams' as const,
      round: 2,
      turnIndex: 1,
      participants: [
        {
          tokenId: 'token-1',
          characterId: 'char-1',
          initiativeRoll: 12,
          initiativeTotal: 14,
          dexterityScore: 14,
          movementBudgetCells: 6,
          status: 'active' as const,
          teamId: 'team-1',
        },
        {
          tokenId: 'token-2',
          characterId: 'char-2',
          initiativeRoll: 9,
          initiativeTotal: 10,
          dexterityScore: 12,
          movementBudgetCells: 6,
          status: 'active' as const,
          teamId: 'team-2',
        },
      ],
      turnResources: {
        actionAvailable: false,
        bonusActionAvailable: true,
        remainingMovementCells: 2,
        totalMovementCells: 6,
      },
    };

    applyGameSessionEvent(
      createEvent('COMBAT_TURN_ADVANCED', {
        combat,
      }),
    );

    expect(setCombatState).toHaveBeenCalledWith(combat);
  });

  it('falha explicitamente quando TOKENS_REMOVED vier com payload inválido', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      applyGameSessionEvent(
        createEvent('TOKENS_REMOVED', {
          tokenIds: ['token-1', 2],
          removedCharacterIds: [],
          combatChanged: false,
          combat: null,
        }),
      ),
    ).toThrow('Violação de contrato realtime em TOKENS_REMOVED: payload inválido.');

    expect(errorSpy).toHaveBeenCalled();
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

  it('gera mensagem de ataque com dano condicional e condicoes aplicadas explicitos', () => {
    mockCharacters.push(
      { id: 'char-attacker', name: 'Cabra Gigante' },
      { id: 'char-target', name: 'Aventureiro' },
    );
    mockTokens.push(
      { id: 'token-attacker', characterId: 'char-attacker' },
      { id: 'token-target', characterId: 'char-target' },
    );

    applyGameSessionEvent(
      createEvent('ATTACK_RESOLVED', {
        attackerTokenId: 'token-attacker',
        targetTokenId: 'token-target',
        targetCharacterId: 'char-target',
        attackId: 'act-attack',
        attackName: 'Investida',
        attackDamageType: 'bludgeoning',
        attackRollMode: 'advantage',
        attackRolls: [4, 15],
        attackRoll: 15,
        attackTotal: 20,
        targetArmorClass: 12,
        hit: true,
        damageTotal: 8,
        conditionalDamageTotal: 3,
        conditionalDamageBreakdown: [{ damageType: 'bludgeoning', damage: 3 }],
        damageApplied: 8,
        remainingCurrentHp: 2,
        remainingTempHp: 0,
        attackerMovedMeters: 6,
        appliedConditions: ['prone'],
        deadConditionApplied: false,
        combat: null,
      }),
    );

    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Dano condicional: +3 (movimento no turno: 6.0m)'),
      }),
    );
    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Condições aplicadas: prone'),
      }),
    );
    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Detalhe dano condicional: bludgeoning +3'),
      }),
    );
    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Rolagem de ataque: vantagem (d20: 4, 15; escolhido: 15)'),
      }),
    );
    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Tática de Matilha: ATIVADA (vantagem aplicada)'),
      }),
    );
  });

  it('gera mensagem de ataque com dano apos defesas explicito', () => {
    mockCharacters.push(
      { id: 'char-attacker', name: 'Aventureiro' },
      { id: 'char-target', name: 'Arbusto Desperto' },
    );
    mockTokens.push(
      { id: 'token-attacker', characterId: 'char-attacker' },
      { id: 'token-target', characterId: 'char-target' },
    );

    applyGameSessionEvent(
      createEvent('ATTACK_RESOLVED', {
        attackerTokenId: 'token-attacker',
        targetTokenId: 'token-target',
        targetCharacterId: 'char-target',
        attackId: 'manual-attack',
        attackName: 'Ataque de Teste',
        attackDamageType: 'piercing',
        attackRollMode: 'normal',
        attackRolls: [18],
        attackRoll: 18,
        attackTotal: 22,
        targetArmorClass: 9,
        hit: true,
        damageTotal: 8,
        damageAfterDefenses: 4,
        conditionalDamageTotal: 0,
        conditionalDamageBreakdown: [],
        damageApplied: 4,
        remainingCurrentHp: 6,
        remainingTempHp: 0,
        attackerMovedMeters: 0,
        appliedConditions: [],
        deadConditionApplied: false,
        combat: null,
      }),
    );

    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Dano aplicado: 4 (rolado: 8; após defesas: 4)'),
      }),
    );
    expect(addIncomingMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        sender: 'Sistema',
        text: expect.stringContaining('Tática de Matilha: não ativada'),
      }),
    );
  });
});
