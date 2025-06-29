import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OptionsPopover } from '../components/ui/OptionsPopover';

// Mock para getBoundingClientRect e contains
const mockGetBoundingClientRect = jest.fn(() => ({
  top: 100,
  right: 200,
  left: 100,
  bottom: 150,
  width: 100,
  height: 50,
  x: 100,
  y: 100,
  toJSON: () => ({}),
}));

const mockContains = jest.fn(() => false);

// Mock para window.innerHeight e window.innerWidth
const originalWindowInnerHeight = window.innerHeight;
const originalWindowInnerWidth = window.innerWidth;

describe('OptionsPopover', () => {
  const mockOnClose = jest.fn();
  const mockTargetRef = {
    current: {
      getBoundingClientRect: mockGetBoundingClientRect,
      contains: mockContains,
    } as unknown as HTMLElement,
  };

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    targetRef: mockTargetRef,
    children: (
      <>
        <button>Option 1</button>
        <button>Option 2</button>
      </>
    ),
  };

  beforeAll(() => {
    // Mock offsetHeight e offsetWidth para o popoverRef
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 150 });
  });

  afterAll(() => {
    // Restaurar os valores originais
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 0 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
    window.innerHeight = originalWindowInnerHeight;
    window.innerWidth = originalWindowInnerWidth;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockContains.mockImplementation(() => false); // Reset mock for each test
    // Resetar window dimensions para valores padrão de teste
    window.innerHeight = 600;
    window.innerWidth = 800;
  });

  // 1. Renderização Condicional
  test('não deve renderizar o popover quando isOpen é false e opacidade é 0', () => {
    render(<OptionsPopover {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  test('deve renderizar o popover e seus filhos quando isOpen é true', async () => {
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    expect(popover).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
    expect(popover).toHaveAttribute('aria-orientation', 'vertical');
    await waitFor(() => expect(popover).toHaveStyle('opacity: 1'));
  });

  // 2. Posicionamento Dinâmico
  test('deve posicionar o popover abaixo do target por padrão', async () => {
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    // targetRect.bottom (150) + 8 = 158
    // targetRect.left (100)
    await waitFor(() => {
      expect(popover).toHaveStyle('top: 158px');
      expect(popover).toHaveStyle('left: 100px');
    });
  });

  test('deve posicionar o popover acima do target se não houver espaço abaixo', async () => {
    // Simula target perto da parte inferior da tela
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 500, right: 200, left: 100, bottom: 550, width: 100, height: 50, x: 100, y: 500, toJSON: () => ({}),
    });
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    // targetRect.top (500) - popoverHeight (100) - 8 = 392
    await waitFor(() => {
      expect(popover).toHaveStyle('top: 392px');
    });
  });

  test('deve alinhar o popover à direita do target se não houver espaço à direita', async () => {
    // Simula target perto da borda direita da tela
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 100, right: 750, left: 650, bottom: 150, width: 100, height: 50, x: 650, y: 100, toJSON: () => ({}),
    });
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    // targetRect.right (750) - popoverWidth (150) = 600
    await waitFor(() => {
      expect(popover).toHaveStyle('left: 600px');
    });
  });

  test('deve garantir que o popover não saia do topo da tela', async () => {
    // Simula target muito perto do topo, e popover tentando ir para cima
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 10, right: 200, left: 100, bottom: 60, width: 100, height: 50, x: 100, y: 10, toJSON: () => ({}),
    });
    // Força o popover a tentar ir para cima (simulando falta de espaço abaixo)
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 100 }); // Tela muito pequena
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    // topPosition becomes -98, then clamped to 0
    await waitFor(() => {
      expect(popover).toHaveStyle('top: 0px');
    });
  });

  test('deve garantir que o popover não saia da base da tela', async () => {
    // Simula target perto da base, e popover tentando ir para baixo
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 500, right: 200, left: 100, bottom: 550, width: 100, height: 50, x: 100, y: 500, toJSON: () => ({}),
    });
    // Força o popover a tentar ir para baixo (simulando espaço abaixo)
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 560 }); // Tela pequena, popover de 100px
    render(<OptionsPopover {...defaultProps} />);
    const popover = screen.getByRole('menu');
    // topPosition becomes 392. 392 + 100 = 492. 492 is not > 560. So it stays at 392.
    await waitFor(() => {
      expect(popover).toHaveStyle('top: 392px');
    });
  });

  // 3. Comportamento de Fechamento (Click Outside e Escape Key)
  test('deve chamar onClose ao clicar fora do popover e do targetRef', () => {
    render(<OptionsPopover {...defaultProps} />);
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('não deve chamar onClose ao clicar dentro do popover', () => {
    render(<OptionsPopover {...defaultProps} />);
    const option1Button = screen.getByRole('button', { name: 'Option 1' });
    fireEvent.mouseDown(option1Button);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('não deve chamar onClose ao clicar no targetRef', () => {
    render(<OptionsPopover {...defaultProps} />);
    mockContains.mockReturnValue(true); // Simula clique no targetRef
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('deve chamar onClose ao pressionar a tecla Escape', () => {
    render(<OptionsPopover {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('não deve chamar onClose ao pressionar outra tecla', () => {
    render(<OptionsPopover {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // 4. Limpeza de Event Listeners
  test('os event listeners devem ser removidos ao desmontar o componente', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = render(<OptionsPopover {...defaultProps} />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
