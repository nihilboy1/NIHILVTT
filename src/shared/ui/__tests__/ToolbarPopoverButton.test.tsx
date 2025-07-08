import "@testing-library/jest-dom"; // Adicionado para estender matchers
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react"; // Manter React para o mock do useRef
import { Tool } from "@/shared/api/types";
import { ToolbarPopoverButton } from "@/shared/ui/ToolbarPopoverButton";

// Mock do PopoverComponent para verificar sua renderização e props
const MockPopoverComponent = ({
  isOpen,
  onClose,
  targetRef,
  ...props
}: any) => {
  if (!isOpen) return null;
  return (
    <div data-testid="mock-popover">
      Mock Popover
      <button onClick={onClose}>Close Popover</button>
      <span data-testid="popover-props">{JSON.stringify(props)}</span>
      <span data-testid="target-ref-present">
        {targetRef ? "true" : "false"}
      </span>
    </div>
  );
};

describe("ToolbarPopoverButton", () => {
  const defaultProps = {
    label: "Dice Tool",
    icon: <span>🎲</span>,
    isActive: false,
    popoverComponent: MockPopoverComponent,
    popoverProps: { someProp: "value" },
    activeTool: Tool.SELECT,
    setActiveTool: jest.fn(),
    toolType: Tool.DICE,
    activePopover: null as "ruler" | "dice" | null,
    setActivePopover: jest.fn(),
    popoverName: "dice" as "ruler" | "dice",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mockar o useRef para que buttonRef.current não seja nulo no teste
    // Isso é necessário porque o `buttonRef.current` é usado na renderização condicional do Popover
    // e o `render` do Testing Library não anexa o ref ao DOM real em todos os casos de teste.
    jest
      .spyOn(React, "useRef")
      .mockReturnValue({ current: document.createElement("button") });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("deve renderizar o ToolbarButton com as props corretas", () => {
    render(<ToolbarPopoverButton {...defaultProps} />);
    const button = screen.getByRole("button", { name: "Dice Tool" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("title", "Dice Tool");
    expect(button).toHaveAttribute("aria-label", "Dice Tool");
    expect(screen.getByText("🎲")).toBeInTheDocument();
  });

  test("deve chamar setActiveTool e setActivePopover ao clicar no botão", () => {
    render(<ToolbarPopoverButton {...defaultProps} />);
    const button = screen.getByRole("button", { name: "Dice Tool" });
    fireEvent.click(button);

    expect(defaultProps.setActiveTool).toHaveBeenCalledTimes(1);
    expect(defaultProps.setActiveTool).toHaveBeenCalledWith(Tool.DICE);
    expect(defaultProps.setActivePopover).toHaveBeenCalledTimes(1);
    const setActivePopoverArg = defaultProps.setActivePopover.mock.calls[0][0];
    expect(typeof setActivePopoverArg).toBe("function");
    expect(setActivePopoverArg(null)).toBe("dice");
  });

  test("deve renderizar o PopoverComponent quando activePopover corresponde a popoverName", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover="dice" />);
    expect(screen.getByTestId("mock-popover")).toBeInTheDocument();
    expect(screen.getByText("Mock Popover")).toBeInTheDocument();
    expect(screen.getByTestId("popover-props")).toHaveTextContent(
      JSON.stringify({ someProp: "value" })
    );
    expect(screen.getByTestId("target-ref-present")).toHaveTextContent("true");
  });

  test("não deve renderizar o PopoverComponent quando activePopover não corresponde a popoverName", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover="ruler" />);
    expect(screen.queryByTestId("mock-popover")).not.toBeInTheDocument();
  });

  test("não deve renderizar o PopoverComponent quando activePopover é null", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover={null} />);
    expect(screen.queryByTestId("mock-popover")).not.toBeInTheDocument();
  });

  test("deve fechar o popover quando onClose é chamado pelo PopoverComponent", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover="dice" />);
    const closeButton = screen.getByText("Close Popover");
    fireEvent.click(closeButton);
    expect(defaultProps.setActivePopover).toHaveBeenCalledTimes(1);
    expect(defaultProps.setActivePopover).toHaveBeenCalledWith(null);
  });

  test("deve alternar o popover ao clicar novamente no botão", () => {
    const { rerender } = render(
      <ToolbarPopoverButton {...defaultProps} activePopover={null} />
    );
    const button = screen.getByRole("button", { name: "Dice Tool" });

    // Primeiro clique: abre o popover
    fireEvent.click(button);
    expect(defaultProps.setActivePopover).toHaveBeenCalledTimes(1);
    const firstCallArg = defaultProps.setActivePopover.mock.calls[0][0];
    expect(typeof firstCallArg).toBe("function");
    expect(firstCallArg(null)).toBe("dice");
    defaultProps.setActivePopover.mockClear(); // Limpa o mock para o próximo clique

    // Simula o estado do popover sendo aberto
    rerender(<ToolbarPopoverButton {...defaultProps} activePopover="dice" />);
    expect(screen.getByTestId("mock-popover")).toBeInTheDocument();

    // Segundo clique: fecha o popover
    fireEvent.click(button);
    expect(defaultProps.setActivePopover).toHaveBeenCalledTimes(1);
    const secondCallArg = defaultProps.setActivePopover.mock.calls[0][0];
    expect(typeof secondCallArg).toBe("function");
    expect(secondCallArg("dice")).toBe(null);
  });

  test("ToolbarButton deve ter isToggled true quando activePopover corresponde a popoverName", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover="dice" />);
    const button = screen.getByRole("button", { name: "Dice Tool" });
    expect(button).toHaveClass("bg-accent-secondary"); // Classe de isToggled
  });

  test("ToolbarButton deve ter isToggled false quando activePopover não corresponde a popoverName", () => {
    render(<ToolbarPopoverButton {...defaultProps} activePopover="ruler" />);
    const button = screen.getByRole("button", { name: "Dice Tool" });
    expect(button).not.toHaveClass("bg-accent-secondary");
  });
});
