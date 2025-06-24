import { renderHook, act, fireEvent } from '@testing-library/react'; // Import renderHook and fireEvent from @testing-library/react
import useDismissable from './useDismissable';

describe('useDismissable', () => {
  let mockOnDismiss: jest.Mock;
  let mockRef: React.RefObject<HTMLDivElement>;

  // Use global spies for add/remove event listeners
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeAll(() => {
    // Spy on the original methods
    addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
  });

  beforeEach(() => {
    mockOnDismiss = jest.fn();
    mockRef = { current: document.createElement('div') };
    document.body.appendChild(mockRef.current as HTMLDivElement); // Adiciona o elemento ao DOM
    addEventListenerSpy.mockClear(); // Clear calls before each test
    removeEventListenerSpy.mockClear(); // Clear calls before each test
  });

  afterEach(() => {
    document.body.removeChild(mockRef.current as HTMLDivElement); // Remove o elemento do DOM
  });

  afterAll(() => {
    // Restore original implementations after all tests in this describe block
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('não deve chamar onDismiss quando isOpen é false', () => {
    renderHook(() => useDismissable(mockRef, false, mockOnDismiss));
    act(() => {
      fireEvent.mouseDown(document.body);
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });

  test('deve chamar onDismiss ao clicar fora do elemento quando isOpen é true', () => {
    renderHook(() => useDismissable(mockRef, true, mockOnDismiss));
    act(() => {
      fireEvent.mouseDown(document.body); // Simula um clique fora do elemento
    });
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  test('não deve chamar onDismiss ao clicar dentro do elemento quando isOpen é true', () => {
    renderHook(() => useDismissable(mockRef, true, mockOnDismiss));
    act(() => {
      fireEvent.mouseDown(mockRef.current as HTMLDivElement); // Simula um clique dentro do elemento
    });
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });

  test('deve chamar onDismiss ao pressionar a tecla Escape quando isOpen é true', () => {
    renderHook(() => useDismissable(mockRef, true, mockOnDismiss));
    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' }); // Simula pressionar Escape
    });
    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });

  test('não deve chamar onDismiss ao pressionar outra tecla que não seja Escape', () => {
    renderHook(() => useDismissable(mockRef, true, mockOnDismiss));
    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' }); // Simula pressionar Enter
    });
    expect(mockOnDismiss).not.toHaveBeenCalled();
  });

  test('deve remover event listeners ao desmontar o componente', () => {
    const { unmount } = renderHook(() => useDismissable(mockRef, true, mockOnDismiss));

    // Expect listeners to be added
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

    unmount();

    // Expect listeners to be removed
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });
});
