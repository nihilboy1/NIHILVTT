import { renderHook, act } from '@testing-library/react';
import { useTokensState } from './useTokensState';
import { TokenType, type Token, type PlayerToken, type MonsterNPCToken, type ObjectToken } from '../types';
import { DEFAULT_TOKEN_DATA } from '../constants/sheetDefaults';

// Mock para generateUniqueId para garantir IDs previsíveis nos testes
jest.mock('../utils/id/idUtils', () => ({
  generateUniqueId: jest.fn(() => 'mock-id-' + Math.random().toString(36).substring(7)),
}));

describe('useTokensState', () => {
  beforeEach(() => {
    // Resetar o mock antes de cada teste
    (require('../utils/id/idUtils').generateUniqueId as jest.Mock).mockClear();
    let counter = 0;
    (require('../utils/id/idUtils').generateUniqueId as jest.Mock).mockImplementation(() => `mock-id-${counter++}`);
  });

  it('deve inicializar com um token padrão e nenhuma instância', () => {
    const { result } = renderHook(() => useTokensState());
    expect(result.current.tokens.length).toBe(1);
    expect(result.current.tokens[0].name).toBe('Aventureiro Padrão');
    expect(result.current.gridInstances).toEqual([]);
    expect(result.current.gridInstanceCounts.size).toBe(0);
  });

  it('deve adicionar um token do tipo PLAYER', () => {
    const { result } = renderHook(() => useTokensState());
    act(() => {
      result.current.addToken({
        name: 'Novo Jogador',
        type: TokenType.PLAYER,
        image: 'player.png',
        size: '1x1',
        currentHp: 20,
        maxHp: 20,
        notes: 'Notas do jogador',
        inspiration: false,
      } as Omit<PlayerToken, 'id'>); // Adicionar cast para PlayerToken
    });
    expect(result.current.tokens.length).toBe(2);
    const newToken = result.current.tokens[1] as PlayerToken;
    expect(newToken.name).toBe('Novo Jogador');
    expect(newToken.type).toBe(TokenType.PLAYER);
    expect(newToken.inspiration).toBe(false);
    expect(newToken.id).toBe('mock-id-1');
  });

  it('deve adicionar um token do tipo MONSTER_NPC', () => {
    const { result } = renderHook(() => useTokensState());
    act(() => {
      result.current.addToken({
        name: 'Goblin',
        type: TokenType.MONSTER_NPC,
        image: 'goblin.png',
        size: '1x1',
        currentHp: 10,
        maxHp: 10,
        notes: 'Um goblin',
        challengeRating: 0.25,
      } as Omit<MonsterNPCToken, 'id'>); // Adicionar cast para MonsterNPCToken
    });
    expect(result.current.tokens.length).toBe(2);
    const newToken = result.current.tokens[1] as MonsterNPCToken;
    expect(newToken.name).toBe('Goblin');
    expect(newToken.type).toBe(TokenType.MONSTER_NPC);
    expect(newToken.challengeRating).toBe(0.25);
    expect(newToken.id).toBe('mock-id-1');
  });

  it('deve adicionar um token do tipo OBJECT', () => {
    const { result } = renderHook(() => useTokensState());
    act(() => {
      result.current.addToken({
        name: 'Baú',
        type: TokenType.OBJECT,
        image: 'chest.png',
        size: '1x1',
        currentHp: 0,
        maxHp: 0,
        notes: 'Um baú de madeira',
        isInteractive: true,
      } as Omit<ObjectToken, 'id'>); // Adicionar cast para ObjectToken
    });
    expect(result.current.tokens.length).toBe(2);
    const newToken = result.current.tokens[1] as ObjectToken;
    expect(newToken.name).toBe('Baú');
    expect(newToken.type).toBe(TokenType.OBJECT);
    expect(newToken.isInteractive).toBe(true);
    expect(newToken.id).toBe('mock-id-1');
  });

  it('deve deletar um token e suas instâncias', () => {
    const { result } = renderHook(() => useTokensState());
    const initialTokenId = result.current.tokens[0].id;
    act(() => {
      result.current.addGridInstance(initialTokenId, 0, 0);
    });
    expect(result.current.tokens.length).toBe(1);
    expect(result.current.gridInstances.length).toBe(1);

    act(() => {
      result.current.deleteToken(initialTokenId);
    });
    expect(result.current.tokens.length).toBe(0);
    expect(result.current.gridInstances.length).toBe(0);
  });

  it('deve duplicar um token', () => {
    const { result } = renderHook(() => useTokensState());
    const originalToken = result.current.tokens[0];
    let duplicatedToken: Token | null = null;

    act(() => {
      duplicatedToken = result.current.duplicateToken(originalToken.id);
    });

    expect(result.current.tokens.length).toBe(2);
    expect(duplicatedToken).not.toBeNull();
    expect(duplicatedToken!.id).not.toBe(originalToken.id);
    expect(duplicatedToken!.name).toBe(`${originalToken.name} (Cópia)`);
    expect(duplicatedToken!.type).toBe(originalToken.type);
    expect(result.current.tokens).toContainEqual(expect.objectContaining({ id: duplicatedToken!.id }));
  });

  it('deve atualizar um token existente', () => {
    const { result } = renderHook(() => useTokensState());
    const tokenId = result.current.tokens[0].id;

    act(() => {
      result.current.updateToken(tokenId, { name: 'Updated Name', currentHp: 75 });
    });

    const updatedToken = result.current.tokens.find(t => t.id === tokenId);
    expect(updatedToken?.name).toBe('Updated Name');
    expect(updatedToken?.currentHp).toBe(75);
    expect(updatedToken?.maxHp).toBe(DEFAULT_TOKEN_DATA.maxHp); // Outras props devem permanecer
  });

  it('deve adicionar uma instância de grade', () => {
    const { result } = renderHook(() => useTokensState());
    const tokenId = result.current.tokens[0].id;
    let newInstanceId: string = '';

    act(() => {
      newInstanceId = result.current.addGridInstance(tokenId, 10, 15).instanceId;
    });

    expect(result.current.gridInstances.length).toBe(1);
    expect(result.current.gridInstances[0].tokenInfoId).toBe(tokenId);
    expect(result.current.gridInstances[0].gridX).toBe(10);
    expect(result.current.gridInstances[0].gridY).toBe(15);
    expect(result.current.gridInstances[0].instanceId).toBe(newInstanceId);
    expect(result.current.gridInstanceCounts.get(tokenId)).toBe(1);
  });

  it('deve remover uma instância de grade', () => {
    const { result } = renderHook(() => useTokensState());
    const tokenId = result.current.tokens[0].id;
    let instanceId: string = '';

    act(() => {
      instanceId = result.current.addGridInstance(tokenId, 0, 0).instanceId;
    });
    expect(result.current.gridInstances.length).toBe(1);

    act(() => {
      result.current.removeGridInstance(instanceId);
    });
    expect(result.current.gridInstances.length).toBe(0);
    expect(result.current.gridInstanceCounts.has(tokenId)).toBe(false);
  });

  it('deve remover o token associado se for uma cópia e a última instância for removida', () => {
    const { result } = renderHook(() => useTokensState());
    const originalToken = result.current.tokens[0];
    let duplicatedToken: Token | null = null;
    let instanceId: string = '';

    act(() => {
      duplicatedToken = result.current.duplicateToken(originalToken.id);
      if (duplicatedToken) {
        instanceId = result.current.addGridInstance(duplicatedToken.id, 0, 0).instanceId;
      }
    });
    expect(result.current.tokens.length).toBe(2);
    expect(result.current.gridInstances.length).toBe(1);
    expect(result.current.gridInstanceCounts.get(duplicatedToken!.id)).toBe(1);

    act(() => {
      result.current.removeGridInstance(instanceId);
    });
    expect(result.current.tokens.length).toBe(1); // A cópia deve ter sido removida
    expect(result.current.tokens).not.toContainEqual(expect.objectContaining({ id: duplicatedToken!.id }));
    expect(result.current.gridInstances.length).toBe(0);
    expect(result.current.gridInstanceCounts.has(duplicatedToken!.id)).toBe(false);
  });

  it('não deve remover o token associado se não for uma cópia e a última instância for removida', () => {
    const { result } = renderHook(() => useTokensState());
    const originalToken = result.current.tokens[0];
    let instanceId: string = '';

    act(() => {
      instanceId = result.current.addGridInstance(originalToken.id, 0, 0).instanceId;
    });
    expect(result.current.tokens.length).toBe(1);
    expect(result.current.gridInstances.length).toBe(1);

    act(() => {
      result.current.removeGridInstance(instanceId);
    });
    expect(result.current.tokens.length).toBe(1); // O token original não deve ser removido
    expect(result.current.tokens).toContainEqual(expect.objectContaining({ id: originalToken.id }));
    expect(result.current.gridInstances.length).toBe(0);
  });

  it('deve atualizar a posição de uma instância de grade', () => {
    const { result } = renderHook(() => useTokensState());
    const tokenId = result.current.tokens[0].id;
    let instanceId: string = '';

    act(() => {
      instanceId = result.current.addGridInstance(tokenId, 0, 0).instanceId;
    });
    expect(result.current.gridInstances[0].gridX).toBe(0);
    expect(result.current.gridInstances[0].gridY).toBe(0);

    act(() => {
      result.current.updateGridInstancePosition(instanceId, 5, 5);
    });
    expect(result.current.gridInstances[0].gridX).toBe(5);
    expect(result.current.gridInstances[0].gridY).toBe(5);
  });

  it('deve tornar uma instância de grade independente', () => {
    const { result } = renderHook(() => useTokensState());
    const originalToken = result.current.tokens[0];
    let instanceId: string = '';
    let independentToken: Token | null = null;

    act(() => {
      instanceId = result.current.addGridInstance(originalToken.id, 0, 0).instanceId;
    });
    expect(result.current.tokens.length).toBe(1);
    expect(result.current.gridInstances[0].tokenInfoId).toBe(originalToken.id);

    act(() => {
      independentToken = result.current.makeGridInstanceIndependent(instanceId);
    });

    expect(result.current.tokens.length).toBe(2); // Um novo token deve ter sido criado
    expect(independentToken).not.toBeNull();
    expect(independentToken!.id).not.toBe(originalToken.id);
    expect(independentToken!.name).toBe(`${originalToken.name} (Cópia)`);
    expect(result.current.gridInstances[0].tokenInfoId).toBe(independentToken!.id); // A instância deve apontar para o novo token
  });
});
