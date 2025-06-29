import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RulerPlacementMode } from "../shared/api/types";
import { RulerPopover } from "../shared/ui/RulerPopover";

describe("RulerPopover", () => {
  const mockOnClose = jest.fn();
  const mockOnSetMode = jest.fn();
  const mockOnToggleRulerPersistPath = jest.fn();

  // Mock para targetRef
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
    currentMode: RulerPlacementMode.SNAP_TO_CENTER,
    onSetMode: mockOnSetMode,
    rulerPersistsPath: false,
    onToggleRulerPersistPath: mockOnToggleRulerPersistPath,
    targetRef: mockTargetRef,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockContains.mockImplementation(() => false); // Reset mock for each test
  });

  // 1. Renderização Condicional e Inicial
  test("não deve renderizar o popover quando isOpen é false", () => {
    render(<RulerPopover {...defaultProps} isOpen={false} />);
    expect(
      screen.queryByRole("dialog", {
        name: "Opções de Posicionamento da Régua",
      })
    ).not.toBeInTheDocument();
  });

  test("deve renderizar o popover e botões quando isOpen é true e modo SNAP_TO_CENTER", () => {
    render(
      <RulerPopover
        {...defaultProps}
        currentMode={RulerPlacementMode.SNAP_TO_CENTER}
      />
    );
    const popover = screen.getByRole("dialog", {
      name: "Opções de Posicionamento da Régua",
    });
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute(
      "aria-label",
      "Opções de Posicionamento da Régua"
    );

    const snapToCenterButton = screen.getByRole("option", {
      name: "Fixar no Centro da Grade",
    });
    const freePlacementButton = screen.getByRole("option", {
      name: "Posicionamento Livre",
    });
    const persistCheckbox = screen.getByLabelText("Manter marcação ao soltar");

    expect(snapToCenterButton).toBeInTheDocument();
    expect(snapToCenterButton).toHaveClass("bg-accent-primary");
    expect(snapToCenterButton).toHaveAttribute("aria-pressed", "true");
    expect(snapToCenterButton).toHaveAttribute("aria-selected", "true");

    expect(freePlacementButton).toBeInTheDocument();
    expect(freePlacementButton).toHaveClass("hover:bg-accent-secondary");
    expect(freePlacementButton).toHaveAttribute("aria-pressed", "false");
    expect(freePlacementButton).toHaveAttribute("aria-selected", "false");

    expect(persistCheckbox).toBeInTheDocument();
    expect(persistCheckbox).not.toBeChecked();
  });

  test("deve renderizar o popover e botões quando isOpen é true e modo FREE_PLACEMENT", () => {
    render(
      <RulerPopover
        {...defaultProps}
        currentMode={RulerPlacementMode.FREE_PLACEMENT}
      />
    );
    const snapToCenterButton = screen.getByRole("option", {
      name: "Fixar no Centro da Grade",
    });
    const freePlacementButton = screen.getByRole("option", {
      name: "Posicionamento Livre",
    });

    expect(snapToCenterButton).toHaveClass("hover:bg-accent-secondary");
    expect(snapToCenterButton).toHaveAttribute("aria-pressed", "false");
    expect(snapToCenterButton).toHaveAttribute("aria-selected", "false");

    expect(freePlacementButton).toHaveClass("bg-accent-primary");
    expect(freePlacementButton).toHaveAttribute("aria-pressed", "true");
    expect(freePlacementButton).toHaveAttribute("aria-selected", "true");
  });

  // 2. Posicionamento do Popover
  test("deve posicionar o popover corretamente", () => {
    render(<RulerPopover {...defaultProps} />);
    const popover = screen.getByRole("dialog", {
      name: "Opções de Posicionamento da Régua",
    });
    expect(popover).toHaveStyle("top: 50px");
    expect(popover).toHaveStyle("left: 108px"); // rect.right (100) + 8
  });

  // 3. Interação com Botões de Modo
  test("deve chamar onSetMode com SNAP_TO_CENTER e onClose ao clicar no botão", () => {
    render(<RulerPopover {...defaultProps} />);
    const snapToCenterButton = screen.getByRole("option", {
      name: "Fixar no Centro da Grade",
    });
    fireEvent.click(snapToCenterButton);

    expect(mockOnSetMode).toHaveBeenCalledTimes(1);
    expect(mockOnSetMode).toHaveBeenCalledWith(
      RulerPlacementMode.SNAP_TO_CENTER
    );
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onSetMode com FREE_PLACEMENT e onClose ao clicar no botão", () => {
    render(<RulerPopover {...defaultProps} />);
    const freePlacementButton = screen.getByRole("option", {
      name: "Posicionamento Livre",
    });
    fireEvent.click(freePlacementButton);

    expect(mockOnSetMode).toHaveBeenCalledTimes(1);
    expect(mockOnSetMode).toHaveBeenCalledWith(
      RulerPlacementMode.FREE_PLACEMENT
    );
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // 4. Interação com Checkbox "Manter marcação ao soltar"
  test("deve chamar onToggleRulerPersistPath ao clicar no checkbox", () => {
    render(<RulerPopover {...defaultProps} />);
    const persistCheckbox = screen.getByLabelText("Manter marcação ao soltar");
    fireEvent.click(persistCheckbox);

    expect(mockOnToggleRulerPersistPath).toHaveBeenCalledTimes(1);
  });

  // 5. Comportamento de Fechamento (Click Outside)
  test("deve chamar onClose ao clicar fora do popover e do targetRef", () => {
    render(<RulerPopover {...defaultProps} />);
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("não deve chamar onClose ao clicar dentro do popover (em área não interativa)", () => {
    render(<RulerPopover {...defaultProps} />);
    const popover = screen.getByRole("dialog", {
      name: "Opções de Posicionamento da Régua",
    });
    // Simula um clique no div principal do popover, que não tem onClick próprio
    fireEvent.mouseDown(popover);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("não deve chamar onClose ao clicar no targetRef", () => {
    render(<RulerPopover {...defaultProps} />);
    mockContains.mockReturnValue(true); // Simulate click on targetRef
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // 6. Limpeza de Event Listeners
  test("o event listener de mousedown deve ser removido ao desmontar o componente", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<RulerPopover {...defaultProps} />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });
});
