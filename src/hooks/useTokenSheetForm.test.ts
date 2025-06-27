import { renderHook, act } from '@testing-library/react';
import { useTokenSheetForm } from './useTokenSheetForm';
import { TokenType } from '../types';
import { DEFAULT_TOKEN_HP, DEFAULT_TOKEN_SIZE } from '../constants';
import { DEFAULT_TOKEN_IMAGE } from '../constants/sheetDefaults';

// Mock para a classe Image, para evitar erros de ambiente de teste
const mockImage = {
  onload: jest.fn(),
  onerror: jest.fn(),
  src: '',
  width: 0,
  height: 0,
};
Object.defineProperty(global, 'Image', {
  writable: true,
  value: jest.fn(() => mockImage),
});

describe('useTokenSheetForm', () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockImage.onload = jest.fn();
    mockImage.onerror = jest.fn();
    mockImage.src = '';
    mockImage.width = 0;
    mockImage.height = 0;
  });

  it('deve inicializar com valores padrão quando initialTokenData é nulo', () => {
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: null, onSave: mockOnSave }));

    expect(result.current.editingTokenName).toBe('');
    expect(result.current.editingTokenImage).toBe(DEFAULT_TOKEN_IMAGE);
    expect(result.current.editingTokenSize).toBe(DEFAULT_TOKEN_SIZE);
    expect(result.current.editingTokenType).toBeNull();
    expect(result.current.editingCurrentHp).toBe(String(DEFAULT_TOKEN_HP));
    expect(result.current.editingMaxHp).toBe(String(DEFAULT_TOKEN_HP));
    expect(result.current.editingTokenNotes).toBe('');
    expect(result.current.editingInspiration).toBe(false);
    expect(result.current.hasTokenSheetChanged).toBe(false);
  });

  it('deve inicializar com os dados do token fornecidos', () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: 'http://example.com/image.png',
      size: '2x2',
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Some notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    expect(result.current.editingTokenName).toBe('Test Token');
    expect(result.current.editingTokenImage).toBe('http://example.com/image.png');
    expect(result.current.editingTokenSize).toBe('2x2');
    expect(result.current.editingTokenType).toBe(TokenType.MONSTER_NPC);
    expect(result.current.editingCurrentHp).toBe('50');
    expect(result.current.editingMaxHp).toBe('100');
    expect(result.current.editingTokenNotes).toBe('Some notes');
    expect(result.current.editingInspiration).toBe(false); // Monster/NPC não tem inspiração
    expect(result.current.hasTokenSheetChanged).toBe(false);
  });

  it('deve inicializar inspiration corretamente para PlayerToken', () => {
    const playerToken = {
      id: 'player1',
      name: 'Player One',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.PLAYER,
      currentHp: 20,
      maxHp: 20,
      notes: '',
      inspiration: true,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: playerToken, onSave: mockOnSave }));
    expect(result.current.editingInspiration).toBe(true);

    const playerTokenNoInspiration = { ...playerToken, inspiration: false };
    const { result: result2 } = renderHook(() => useTokenSheetForm({ initialTokenData: playerTokenNoInspiration, onSave: mockOnSave }));
    expect(result2.current.editingInspiration).toBe(false);
  });

  it('deve atualizar hasTokenSheetChanged quando os campos são alterados', () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Some notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    expect(result.current.hasTokenSheetChanged).toBe(false);

    act(() => {
      result.current.setEditingTokenName('New Name');
    });
    expect(result.current.hasTokenSheetChanged).toBe(true);

    act(() => {
      result.current.setEditingTokenName('Test Token'); // Volta ao original
    });
    expect(result.current.hasTokenSheetChanged).toBe(false);

    act(() => {
      result.current.setEditingCurrentHp('40');
    });
    expect(result.current.hasTokenSheetChanged).toBe(true);
  });

  it('deve chamar onSave com os dados atualizados para um token existente', async () => {
    const initialToken = {
      id: '123',
      name: 'Old Name',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenName('New Name');
      result.current.setEditingCurrentHp('45');
      result.current.setEditingTokenNotes('New notes');
    });

    await act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'New Name',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 45,
      maxHp: 100,
      notes: 'New notes',
    });
  });

  it('deve chamar onSave com os dados para um novo token (initialTokenData nulo)', async () => {
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: null, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenName('New Token');
      result.current.setEditingTokenType(TokenType.PLAYER);
      result.current.setEditingCurrentHp('10');
      result.current.setEditingMaxHp('10');
    });

    await act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'New Token',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.PLAYER,
      currentHp: 10,
      maxHp: 10,
      notes: '',
      inspiration: false, // Padrão para novo PlayerToken
    });
  });

  it('não deve chamar onSave se o nome do token estiver vazio', async () => {
    const initialToken = {
      id: '123',
      name: 'Old Name',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenName('');
    });

    // Mock alert para evitar que ele apareça durante o teste
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('O nome do token não pode estar vazio.');
    alertMock.mockRestore();
  });

  it('não deve chamar onSave se initialTokenData for nulo e editingTokenType for nulo', async () => {
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: null, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenName('New Token');
      // editingTokenType permanece nulo
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Erro: O tipo do token deve ser selecionado.');
    alertMock.mockRestore();
  });

  it('não deve chamar onSave com valores de HP inválidos', async () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Teste: maxHp <= 0
    act(() => { result.current.setEditingMaxHp('0'); });
    await act(async () => { await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent); });
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Valores de HP inválidos. Vida Máxima deve ser > 0 e Vida Atual entre 0 e Vida Máxima.');
    alertMock.mockClear();

    // Teste: currentHp < 0
    act(() => { result.current.setEditingMaxHp('100'); result.current.setEditingCurrentHp('-10'); });
    await act(async () => { await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent); });
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Valores de HP inválidos. Vida Máxima deve ser > 0 e Vida Atual entre 0 e Vida Máxima.');
    alertMock.mockClear();

    // Teste: currentHp > maxHp
    act(() => { result.current.setEditingMaxHp('50'); result.current.setEditingCurrentHp('60'); });
    await act(async () => { await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent); });
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Valores de HP inválidos. Vida Máxima deve ser > 0 e Vida Atual entre 0 e Vida Máxima.');
    alertMock.mockRestore();
  });

  it('deve validar o tamanho da imagem e chamar onSave se for válido', async () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: 'http://example.com/valid-image.png',
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenImage('http://example.com/valid-image.png');
    });

    // Simula o carregamento bem-sucedido da imagem com dimensões válidas
    mockImage.width = 100;
    mockImage.height = 100;

    const promise = act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    // Dispara o onload da imagem
    mockImage.onload();
    await promise;

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      image: 'http://example.com/valid-image.png',
    }));
  });

  it('não deve chamar onSave se a imagem for muito grande', async () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: 'http://example.com/large-image.png',
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenImage('http://example.com/large-image.png');
    });

    mockImage.width = 600; // Maior que MAX_IMAGE_DIMENSION (500)
    mockImage.height = 600;

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const promise = act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    // Dispara o onload da imagem
    mockImage.onload();
    await promise;

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('A imagem é muito grande.'));
    alertMock.mockRestore();
  });

  it('não deve chamar onSave se a imagem não puder ser carregada', async () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: 'http://example.com/invalid-image.png',
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenImage('http://example.com/invalid-image.png');
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const promise = act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    // Dispara o onerror da imagem
    mockImage.onerror();
    await promise;

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Não foi possível carregar a imagem.'));
    alertMock.mockRestore();
  });

  it('deve usar DEFAULT_TOKEN_IMAGE se a imagem for uma string vazia', async () => {
    const initialToken = {
      id: '123',
      name: 'Test Token',
      image: 'http://example.com/image.png',
      size: DEFAULT_TOKEN_SIZE,
      type: TokenType.MONSTER_NPC,
      currentHp: 50,
      maxHp: 100,
      notes: 'Old notes',
      challengeRating: 5,
    };
    const { result } = renderHook(() => useTokenSheetForm({ initialTokenData: initialToken, onSave: mockOnSave }));

    act(() => {
      result.current.setEditingTokenImage('');
    });

    await act(async () => {
      await result.current.handleSave({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      image: DEFAULT_TOKEN_IMAGE,
    }));
  });
});
