import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import '@testing-library/jest-dom';
import HPControlModal from './HPControlModal';
import useDismissable from '../../hooks/useDismissable';
import { calculateNewHP } from '../../utils/hpUtils';
import { TokenType } from '../../types'; // Importar TokenType

// Mock do hook useDismissable
jest.mock('../../hooks/useDismissable');
const mockUseDismissable = useDismissable as jest.MockedFunction<typeof useDismissable>;

// Mock da função calculateNewHP
jest.mock('../../utils/hpUtils');
const mockCalculateNewHP = calculateNewHP as jest.MockedFunction<typeof calculateNewHP>;

describe('HPControlModal', () => {
  const mockOnClose = jest.fn();
  const mockOnHPChange = jest.fn();
  const mockOnRemoveFromBoard = jest.fn();
  const mockOnMakeIndependent = jest.fn();

  const defaultTokenInfo = {
    id: 'token-1',
    name: 'Hero',
    type: TokenType.PLAYER, // Usar o enum
    color: '#000',
    size: 'medium',
    currentHp: 50,
    maxHp: 100,
    ac: 15,
    initiative: 10,
    speed: 30,
    tokenImageUrl: '',
    sheet: {
      basicInfo: {
        name: 'Hero',
        description: '',
        tokenType: 'player',
        size: 'medium',
        alignment: 'neutral',
        creatureType: 'humanoid',
        challengeRating: '1',
        armorClass: 15,
        hitPoints: 100,
        speed: 30,
        senses: '',
        languages: '',
        proficiencies: '',
        resistances: '',
        vulnerabilities: '',
        immunities: '',
      },
      attributesAndSkills: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        skills: [],
      },
      attacksAndFeatures: {
        attacks: [],
        features: [],
      },
    },
  };

  const defaultProps = {
    instanceId: 'instance-1',
    tokenInfo: defaultTokenInfo,
    anchorPoint: { x: 100, y: 100 },
    isOpen: true,
    onClose: mockOnClose,
    onHPChange: mockOnHPChange,
    onRemoveFromBoard: mockOnRemoveFromBoard,
    onMakeIndependent: mockOnMakeIndependent,
  };

  let dismissCallback: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    dismissCallback = jest.fn(); // Inicializa como um mock function
    // Garante que o mock de useDismissable não chame onClose por padrão
    mockUseDismissable.mockImplementation((_ref, isOpen, callback) => {
      if (isOpen) {
        // Quando o hook é chamado e o modal está aberto, armazena a callback real
        // para que possamos chamá-la manualmente no teste.
        dismissCallback.mockImplementation(callback);
      }
    });
    // Mock padrão para calculateNewHP para retornar o valor parseado
    mockCalculateNewHP.mockImplementation((inputValue, currentHP, maxHP) => {
      const trimmedInput = inputValue.trim();
      let newCalculatedHP: number;

      if (trimmedInput.startsWith('+') || trimmedInput.startsWith('-')) {
        const isPositive = trimmedInput.startsWith('+');
        const valueStr = trimmedInput.substring(1);
        const value = parseInt(valueStr, 10);

        if (!isNaN(value) && value >= 0) {
          newCalculatedHP = isPositive ? currentHP + value : currentHP - value;
        } else {
          return null;
        }
      } else {
        const value = parseInt(trimmedInput, 10);
        if (!isNaN(value)) {
          newCalculatedHP = value;
        } else {
          return null;
        }
      }
      return Math.max(0, Math.min(newCalculatedHP, maxHP));
    });
  });

  // Renderização Inicial
  test('deve renderizar o modal quando isOpen é true e dados são válidos', () => {
    render(<HPControlModal {...defaultProps} />);
    expect(screen.getByRole('dialog', { name: 'Controle de Vida' })).toBeInTheDocument();
    expect(screen.getByLabelText('Vida Atual')).toHaveValue('50');
    expect(screen.getByTestId('max-hp-display')).toHaveTextContent('100'); // Usar data-testid
    expect(screen.getByTitle('Tornar Token Independente')).toBeInTheDocument();
    expect(screen.getByTitle('Remover do Tabuleiro')).toBeInTheDocument();
  });

  test('deve focar no input de HP quando o modal abre', async () => {
    render(<HPControlModal {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByLabelText('Vida Atual')).toHaveFocus();
    });
  });

  test('não deve renderizar o modal quando isOpen é false', () => {
    render(<HPControlModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('não deve renderizar o modal se instanceId for nulo', () => {
    render(<HPControlModal {...defaultProps} instanceId={null} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('deve chamar onClose se tokenInfo for nulo e modal estiver aberto', () => {
    render(<HPControlModal {...defaultProps} tokenInfo={null} />);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Interação com Input de HP
  test('deve atualizar o HP ao digitar um valor válido e pressionar Enter', async () => {
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: '60' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('60', 50, 100);
    expect(mockOnHPChange).toHaveBeenCalledWith(60);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('60');
  });

  test('deve atualizar o HP ao digitar um valor com operador de soma e pressionar Enter', async () => {
    mockCalculateNewHP.mockReturnValue(55); // currentHP (50) + 5
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: '+5' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('+5', 50, 100);
    expect(mockOnHPChange).toHaveBeenCalledWith(55);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('55');
  });

  test('deve atualizar o HP ao digitar um valor com operador de subtração e pressionar Enter', async () => {
    mockCalculateNewHP.mockReturnValue(45); // currentHP (50) - 5
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: '-5' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('-5', 50, 100);
    expect(mockOnHPChange).toHaveBeenCalledWith(45);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('45');
  });

  test('deve limitar o HP ao maxHP ao digitar um valor muito alto', async () => {
    mockCalculateNewHP.mockReturnValue(100); // Limita a 100
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: '200' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('200', 50, 100);
    expect(mockOnHPChange).toHaveBeenCalledWith(100);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('100');
  });

  test('deve limitar o HP a 0 ao digitar um valor muito baixo', async () => {
    mockCalculateNewHP.mockReturnValue(0); // Limita a 0
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: '-100' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('-100', 50, 100);
    expect(mockOnHPChange).toHaveBeenCalledWith(0);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('0');
  });

  test('não deve chamar onHPChange e deve reverter o input para HP atual se a entrada for inválida', async () => {
    mockCalculateNewHP.mockReturnValue(null); // Simula entrada inválida
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    fireEvent.change(hpInput, { target: { value: 'abc' } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Enter' });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith('abc', 50, 100);
    expect(mockOnHPChange).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue('50'); // Reverte para o HP atual
  });

  test('deve chamar onClose ao pressionar Escape no input', async () => {
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: 'Escape' });
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnHPChange).not.toHaveBeenCalled(); // Não deve salvar ao pressionar Escape
  });

  test('deve chamar handleSubmit no blur do input, mas não onClose', async () => {
    const user = userEvent.setup();
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');

    // Use userEvent to interact
    await user.clear(hpInput);
    await user.type(hpInput, '55');
    
    // Simulate blur, e.g., by tabbing away
    await user.tab(); 

    // Wrap assertions in waitFor
    await waitFor(() => {
      expect(mockCalculateNewHP).toHaveBeenCalledWith('55', 50, 100); // Ensure calculateNewHP is called correctly
      expect(mockOnHPChange).toHaveBeenCalledWith(55);
    });
    // Assert that onClose was not called, outside waitFor as it's an immediate check post-blur
    expect(mockOnClose).not.toHaveBeenCalled(); 
  });

  // Interação com Botões
  test('deve chamar onRemoveFromBoard quando o botão de remover é clicado', () => {
    render(<HPControlModal {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Remover do Tabuleiro'));
    expect(mockOnRemoveFromBoard).toHaveBeenCalledWith('instance-1');
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose é tratado pelo componente pai
  });

  test('deve chamar onMakeIndependent quando o botão de tornar independente é clicado', () => {
    render(<HPControlModal {...defaultProps} />);
    fireEvent.click(screen.getByTitle('Tornar Token Independente'));
    expect(mockOnMakeIndependent).toHaveBeenCalledWith('instance-1');
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose é tratado pelo componente pai
  });

  // Comportamento de Fechamento (Dismiss)
  test('deve chamar handleCloseAndSave quando useDismissable é acionado', async () => {
    render(<HPControlModal {...defaultProps} />);
    // Simula o acionamento do dismiss
    act(() => {
      dismissCallback(); // Chama a callback armazenada
    });

    // Aguarda a próxima atualização do DOM para garantir que os efeitos foram processados
    await waitFor(() => {
      expect(mockCalculateNewHP).toHaveBeenCalledTimes(1); // Chamado por handleSubmit
      expect(mockOnHPChange).toHaveBeenCalledTimes(1); // Chamado por handleSubmit
      expect(mockOnClose).toHaveBeenCalledTimes(1); // Chamado por handleCloseAndSave
    });
  });

  // Sincronização de HP
  test('deve sincronizar o input com tokenInfo.currentHp quando tokenInfo muda e modal está aberto', () => {
    const { rerender } = render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText('Vida Atual');
    expect(hpInput).toHaveValue('50');

    const updatedTokenInfo = { ...defaultTokenInfo, currentHp: 75 };
    rerender(<HPControlModal {...defaultProps} tokenInfo={updatedTokenInfo} />);

    expect(hpInput).toHaveValue('75');
  });
});
