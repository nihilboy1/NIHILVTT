import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from '../Modal';

describe('Modal accessibility', () => {
  test('fecha no Escape', () => {
    const onClose = jest.fn();

    render(
      <Modal isOpen onClose={onClose} title="Teste Modal" onConfirm={jest.fn()}>
        <input aria-label="Campo de teste" />
      </Modal>,
    );

    const overlay = document.querySelector('div[role="button"][tabindex="-1"]');
    expect(overlay).not.toBeNull();

    fireEvent.keyDown(overlay as Element, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
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
