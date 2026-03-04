import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockUseDismissable = jest.fn();

jest.mock('@/shared/lib/hooks/useDismissable', () => ({
  useDismissable: (...args: unknown[]) => mockUseDismissable(...args),
}));

import { Modal } from '../Modal';

describe('Modal accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registra o fechamento externo via useDismissable', () => {
    const onClose = jest.fn();

    render(
      <Modal isOpen onClose={onClose} title="Teste Modal" onConfirm={jest.fn()}>
        <input aria-label="Campo de teste" />
      </Modal>,
    );

    expect(mockUseDismissable).toHaveBeenCalledWith(
      expect.objectContaining({ current: expect.any(HTMLDivElement) }),
      true,
      onClose,
    );
  });

  test('mantém o foco preso com Tab e Shift+Tab', () => {
    render(
      <Modal isOpen onClose={jest.fn()} title="Teste Modal" onConfirm={jest.fn()}>
        <input aria-label="Campo de teste" />
      </Modal>,
    );

    const overlay = document.querySelector('div[role="button"][tabindex="-1"]') as Element;
    const closeButton = screen.getByRole('button', { name: /fechar modal/i });
    const confirmButton = screen.getByRole('button', { name: /confirmar/i });

    confirmButton.focus();
    fireEvent.keyDown(overlay, { key: 'Tab' });
    expect(closeButton).toHaveFocus();

    closeButton.focus();
    fireEvent.keyDown(overlay, { key: 'Tab', shiftKey: true });
    expect(confirmButton).toHaveFocus();
  });

  test('restaura foco para o elemento anterior ao fechar', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <>
        <button type="button">Abrir modal</button>
        <Modal isOpen={false} onClose={onClose} title="Teste Modal" onConfirm={jest.fn()}>
          <input aria-label="Campo de teste" />
        </Modal>
      </>,
    );

    const trigger = screen.getByRole('button', { name: /abrir modal/i });
    trigger.focus();

    rerender(
      <>
        <button type="button">Abrir modal</button>
        <Modal isOpen onClose={onClose} title="Teste Modal" onConfirm={jest.fn()}>
          <input aria-label="Campo de teste" />
        </Modal>
      </>,
    );

    rerender(
      <>
        <button type="button">Abrir modal</button>
        <Modal isOpen={false} onClose={onClose} title="Teste Modal" onConfirm={jest.fn()}>
          <input aria-label="Campo de teste" />
        </Modal>
      </>,
    );

    expect(screen.getByRole('button', { name: /abrir modal/i })).toHaveFocus();
  });
});
