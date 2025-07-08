import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SidebarTab } from "@/shared/api/types";
import { DiceIcon } from "@/shared/ui/Icons"; // Importe um ícone de exemplo
import { TabButton } from "@/shared/ui/TabButton";

describe("TabButton", () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    tab: SidebarTab.CHAT, // Usar o valor do enum diretamente
    label: "Chat",
    icon: <DiceIcon />,
    isActive: false,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test("deve renderizar o botão com o label e ícone corretos", () => {
    render(<TabButton {...defaultProps} />);
    expect(screen.getByRole("tab", { name: "Chat" })).toBeInTheDocument();
    expect(screen.getByText("Chat")).toBeInTheDocument();
    expect(screen.getByTestId("dice-icon")).toBeInTheDocument(); // Assumindo que DiceIcon tem data-testid="dice-icon"
  });

  test("deve ter os atributos ARIA corretos", () => {
    render(<TabButton {...defaultProps} />);
    const button = screen.getByRole("tab", { name: "Chat" });
    expect(button).toHaveAttribute("role", "tab");
    expect(button).toHaveAttribute(
      "id",
      `tab-${SidebarTab.CHAT.toLowerCase()}`
    );
    expect(button).toHaveAttribute(
      "aria-controls",
      `tabpanel-${SidebarTab.CHAT.toLowerCase()}`
    );
  });

  // Estado Ativo (isActive={true})
  test("deve aplicar classes de estilo para o estado ativo", () => {
    render(<TabButton {...defaultProps} isActive={true} />);
    const button = screen.getByRole("tab", { name: "Chat" });
    expect(button).toHaveClass("border-accent-primary");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  // Estado Inativo (isActive={false})
  test("deve aplicar classes de estilo para o estado inativo", () => {
    render(<TabButton {...defaultProps} isActive={false} />);
    const button = screen.getByRole("tab", { name: "Chat" });
    expect(button).toHaveClass("bg-surface-0");
    expect(button).toHaveClass("hover:bg-surface-3");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  // Interação de Clique
  test("deve chamar a função onClick quando clicado", () => {
    render(<TabButton {...defaultProps} />);
    const button = screen.getByRole("tab", { name: "Chat" });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // Propriedades do Ícone
  test("deve clonar o elemento do ícone com as classes corretas", () => {
    // Para testar isso, precisamos de um ícone que possamos inspecionar
    // Vamos criar um mock simples para o ícone que aceita className
    const MockIcon = ({ className }: { className?: string }) => (
      <svg data-testid="mock-icon" className={className} />
    );
    render(<TabButton {...defaultProps} icon={<MockIcon />} />);
    const iconElement = screen.getByTestId("mock-icon");
    expect(iconElement).toHaveClass("w-5");
    expect(iconElement).toHaveClass("h-5");
    expect(iconElement).toHaveClass("mb-1");
  });
});
