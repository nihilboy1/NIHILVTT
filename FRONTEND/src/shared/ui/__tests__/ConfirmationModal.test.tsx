import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { ConfirmationModal } from "../ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    isOpen: true,
    title: "Confirmar Ação",
    content: "Tem certeza que deseja prosseguir?", // Renamed from message to content
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar o modal com título e mensagem corretos", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(
      screen.getByRole("dialog", { name: "Confirmar Ação" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Tem certeza que deseja prosseguir?")
    ).toBeInTheDocument(); // Still checking for the message text
  });

  test("não deve renderizar o modal quando isOpen é false", () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("deve chamar onConfirm quando o botão de confirmar é clicado", () => {
    render(<ConfirmationModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  test("deve chamar onCancel quando o botão de cancelar é clicado", () => {
    render(<ConfirmationModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test("deve renderizar com textos de botão personalizados", () => {
    render(
      <ConfirmationModal {...defaultProps} confirmText="Sim" cancelText="Não" />
    );
    expect(screen.getByRole("button", { name: "Sim" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Não" })).toBeInTheDocument();
  });

  test("deve fechar o modal ao pressionar Escape", () => {
    render(<ConfirmationModal {...defaultProps} />);
    const overlay = document.querySelector('div[role="button"][tabindex="-1"]');
    expect(overlay).not.toBeNull();
    fireEvent.keyDown(overlay as Element, { key: "Escape" });
    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
