import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DiceRollPopover } from './DiceRollPopover';

describe('DiceRollPopover', () => {
  const mockOnClose = jest.fn();
  const mockOnRoll = jest.fn();
  
  // Define contains as a Jest mock function from the start
  const mockContains = jest.fn(() => false);

  const mockTargetRef = {
    current: {
      getBoundingClientRect: () => ({
        top: 50,
        right: 100,
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
      contains: mockContains,
    } as unknown as HTMLButtonElement,
  };

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onRoll: mockOnRoll,
    targetRef: mockTargetRef,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Resetar o mock de contains para cada teste
    mockContains.mockImplementation(() => false);
  });

  // Renderização Condicional
  test('não deve renderizar o popover quando isOpen é false', () => {
    render(<DiceRollPopover {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog', { name: 'Opções de Rolagem de Dados' })).not.toBeInTheDocument();
  });

  test('deve renderizar o popover e os botões de dados quando isOpen é true', () => {
    render(<DiceRollPopover {...defaultProps} />);
    const popover = screen.getByRole('dialog', { name: 'Opções de Rolagem de Dados' });
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute('aria-label', 'Opções de Rolagem de Dados');

    const diceOptions = ["1D2", "1D4", "1D6", "1D8", "1D10", "1D12", "1D20", "1D100"];
    diceOptions.forEach(notation => {
      expect(screen.getByRole('button', { name: notation })).toBeInTheDocument();
    });
  });

  // Posicionamento do Popover
  test('deve posicionar o popover corretamente', () => {
    render(<DiceRollPopover {...defaultProps} />);
    const popover = screen.getByRole('dialog', { name: 'Opções de Rolagem de Dados' });
    // top: rect.top (50)
    // left: rect.right (100) + 8 = 108
    expect(popover).toHaveStyle('top: 50px');
    expect(popover).toHaveStyle('left: 108px');
  });

  // Interação de Clique nos Botões de Dados
  test('deve chamar onRoll e onClose ao clicar em um botão de dado', () => {
    render(<DiceRollPopover {...defaultProps} />);
    const d6Button = screen.getByRole('button', { name: '1D6' });
    fireEvent.click(d6Button);

    expect(mockOnRoll).toHaveBeenCalledTimes(1);
    expect(mockOnRoll).toHaveBeenCalledWith('1D6');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Comportamento de Fechamento (Click Outside)
  test('deve chamar onClose ao clicar fora do popover e do targetRef', () => {
    render(<DiceRollPopover {...defaultProps} />);
    // Simula um clique no body, garantindo que nem o popover nem o targetRef o contenham
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('não deve chamar onClose ao clicar dentro do popover', () => {
    render(<DiceRollPopover {...defaultProps} />);
    const d4Button = screen.getByRole('button', { name: '1D4' });
    // Simula um clique dentro do popover (no botão)
    fireEvent.mouseDown(d4Button);
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose é chamado pelo onClick do botão, não pelo click outside
  });

  test('não deve chamar onClose ao clicar no targetRef', () => {
    render(<DiceRollPopover {...defaultProps} />);
    // Simula um clique no body, e faz o mock de contains retornar true para o targetRef
    mockContains.mockReturnValue(true); // Usa o mockContains diretamente
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // Limpeza de Event Listeners (testado indiretamente)
  test('o event listener de mousedown deve ser removido ao desmontar o componente', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = render(<DiceRollPopover {...defaultProps} />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});
