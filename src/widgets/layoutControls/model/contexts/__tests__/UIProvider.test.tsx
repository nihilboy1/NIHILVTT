import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SidebarTab, Tool } from "../../../../../shared/api/types";
import { useUIState } from "../../hooks/useUIState";
import { UIProvider, useUI } from "../UIProvider";

// Mock the useUIState hook
jest.mock("../app/providers/useUIState", () => ({
  useUIState: jest.fn(),
}));

const mockUIState = {
  activeTool: Tool.SELECT,
  setActiveTool: jest.fn(),
  activeSidebarTab: SidebarTab.CHAT,
  setActiveSidebarTab: jest.fn(),
  isToolbarVisible: true,
  setIsToolbarVisible: jest.fn(),
  isRightSidebarVisible: true,
  setIsRightSidebarVisible: jest.fn(),
  activePopover: null,
  setActivePopover: jest.fn(),
};

describe("UIContext", () => {
  beforeEach(() => {
    // Reset mock before each test
    (useUIState as jest.Mock).mockReturnValue(mockUIState);
  });

  test("useUI deve lançar um erro se não for usado dentro de um UIProvider", () => {
    const TestComponent = () => {
      useUI();
      return null;
    };

    // Suprimir o erro do console para este teste específico
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useUI must be used within a UIProvider"
    );

    consoleErrorSpy.mockRestore(); // Restaurar o console.error
  });

  test("UIProvider deve fornecer o estado do useUIState", () => {
    const TestComponent = () => {
      const context = useUI();
      return (
        <div>
          <span data-testid="active-tool">{context.activeTool}</span>
          <span data-testid="active-sidebar-tab">
            {context.activeSidebarTab}
          </span>
          <span data-testid="is-toolbar-visible">
            {context.isToolbarVisible.toString()}
          </span>
        </div>
      );
    };

    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    expect(screen.getByTestId("active-tool")).toHaveTextContent(Tool.SELECT);
    expect(screen.getByTestId("active-sidebar-tab")).toHaveTextContent(
      SidebarTab.CHAT
    );
    expect(screen.getByTestId("is-toolbar-visible")).toHaveTextContent("true");
  });

  test("as funções do contexto devem ser chamáveis", () => {
    const TestComponent = () => {
      const {
        setActiveTool,
        setActiveSidebarTab,
        setIsToolbarVisible,
        setIsRightSidebarVisible,
        setActivePopover,
      } = useUI();
      return (
        <div>
          <button onClick={() => setActiveTool(Tool.PAN)}>Set Tool</button>
          <button onClick={() => setActiveSidebarTab(SidebarTab.TOKENS)}>
            Set Tab
          </button>
          <button onClick={() => setIsToolbarVisible(false)}>
            Hide Toolbar
          </button>
          <button onClick={() => setIsRightSidebarVisible(false)}>
            Hide Sidebar
          </button>
          <button onClick={() => setActivePopover("ruler")}>Set Popover</button>
        </div>
      );
    };

    render(
      <UIProvider>
        <TestComponent />
      </UIProvider>
    );

    fireEvent.click(screen.getByText("Set Tool"));
    expect(mockUIState.setActiveTool).toHaveBeenCalledWith(Tool.PAN);

    fireEvent.click(screen.getByText("Set Tab"));
    expect(mockUIState.setActiveSidebarTab).toHaveBeenCalledWith(
      SidebarTab.TOKENS
    );

    fireEvent.click(screen.getByText("Hide Toolbar"));
    expect(mockUIState.setIsToolbarVisible).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByText("Hide Sidebar"));
    expect(mockUIState.setIsRightSidebarVisible).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByText("Set Popover"));
    expect(mockUIState.setActivePopover).toHaveBeenCalledWith("ruler");
  });
});
