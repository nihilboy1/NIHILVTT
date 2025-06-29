import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toolbar } from "../components/layout/Toolbar";
import { Tool, SidebarTab, RulerPlacementMode } from "../shared/types";
import {
  GRID_CELL_SIZE,
  DEFAULT_METERS_PER_SQUARE,
  DEFAULT_PAGE_SETTINGS,
} from "../constants";
import { type UIState } from "../hooks/useUIState";
import { type BoardSettingsState } from "../hooks/useBoardSettingsState";
import { type ChatState } from "../hooks/useChatState";
import { UIContext } from "../contexts/UIContext";
import { BoardSettingsContext } from "../contexts/BoardSettingsContext";
import { ChatContext } from "../contexts/ChatContext";

// Import the actual hooks to be mocked
import { useUIState } from "../hooks/useUIState";
import { useBoardSettingsState } from "../hooks/useBoardSettingsState";
import { useChatState } from "../hooks/useChatState";

// Mock the actual hook modules
jest.mock("../hooks/useUIState");
jest.mock("../hooks/useBoardSettingsState");
jest.mock("../hooks/useChatState");
jest.mock("../components/ui/RulerPopover", () => ({
  RulerPopover: jest.fn(() => null), // Mock RulerPopover to return null
}));
jest.mock("../components/ui/DiceRollPopover", () => ({
  DiceRollPopover: jest.fn(() => null), // Mock DiceRollPopover to return null
}));

// Valores padrão para os mocks dos hooks
const defaultMockUIState: UIState = {
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

const defaultMockBoardSettingsState: BoardSettingsState = {
  gridSettings: {
    visualCellSize: GRID_CELL_SIZE,
    lineColor: "#788475",
    metersPerSquare: DEFAULT_METERS_PER_SQUARE,
  },
  pageSettings: DEFAULT_PAGE_SETTINGS,
  rulerPlacementMode: RulerPlacementMode.SNAP_TO_CENTER,
  rulerPersists: false,
  updateGridSettings: jest.fn(),
  updatePageSettings: jest.fn(),
  setRulerPlacementMode: jest.fn(),
  setRulerPersists: jest.fn(),
};

const defaultMockChatState: ChatState = {
  messages: [],
  sendMessage: jest.fn(),
  rollAndSendMessage: jest.fn(),
  clearMessages: jest.fn(), // Adicionado para satisfazer a interface ChatState
};

const renderToolbar = (
  uiState: Partial<typeof defaultMockUIState> = {},
  boardSettingsState: Partial<typeof defaultMockBoardSettingsState> = {},
  chatState: Partial<typeof defaultMockChatState> = {}
) => {
  (useUIState as jest.Mock).mockReturnValue({
    ...defaultMockUIState,
    ...uiState,
  });
  (useBoardSettingsState as jest.Mock).mockReturnValue({
    ...defaultMockBoardSettingsState,
    ...boardSettingsState,
  });
  (useChatState as jest.Mock).mockReturnValue({
    ...defaultMockChatState,
    ...chatState,
  });

  return render(
    <UIContext.Provider value={{ ...defaultMockUIState, ...uiState }}>
      <BoardSettingsContext.Provider
        value={{ ...defaultMockBoardSettingsState, ...boardSettingsState }}
      >
        <ChatContext.Provider value={{ ...defaultMockChatState, ...chatState }}>
          <Toolbar />
        </ChatContext.Provider>
      </BoardSettingsContext.Provider>
    </UIContext.Provider>
  );
};

describe("Toolbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mocks before each test
    (useUIState as jest.Mock).mockClear();
    (useBoardSettingsState as jest.Mock).mockClear();
    (useChatState as jest.Mock).mockClear();
  });

  test("deve renderizar os botões de ferramenta corretos", () => {
    renderToolbar();
    expect(screen.getByLabelText("Ferramenta de Seleção")).toBeInTheDocument();
    expect(screen.getByLabelText("Mover Mapa")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ferramenta de Régua" })
    ).toBeInTheDocument();
  });

  test('deve mudar a ferramenta selecionada ao clicar no botão "Selecionar"', () => {
    renderToolbar();
    const selectButton = screen.getByLabelText("Ferramenta de Seleção");
    fireEvent.click(selectButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.SELECT); // Use enum
  });

  test('deve mudar a ferramenta selecionada ao clicar no botão "Mover Mapa"', () => {
    renderToolbar();
    const panButton = screen.getByLabelText("Mover Mapa");
    fireEvent.click(panButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.PAN); // Use enum
  });

  test('deve abrir o popover da régua ao clicar no botão "Medir Distância"', async () => {
    const { RulerPopover } = jest.requireMock("../components/ui/RulerPopover");
    renderToolbar();
    const rulerButton = screen.getByRole("button", {
      name: "Ferramenta de Régua",
    });
    fireEvent.click(rulerButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.RULER); // Use enum
    expect(RulerPopover).toHaveBeenCalled();
  });

  test('deve aplicar a classe "active" ao botão da ferramenta selecionada', () => {
    const customUIContext = { ...defaultMockUIState, activeTool: Tool.PAN }; // Use enum
    renderToolbar(customUIContext);
    const panButton = screen.getByLabelText("Mover Mapa");
    expect(panButton).toHaveClass("bg-accent-primary"); // Assumindo que 'bg-accent-primary' é a classe de ativo
  });

  test('deve aplicar a classe "active" ao botão de régua quando a ferramenta de régua está ativa', () => {
    const customUIContext = { ...defaultMockUIState, activeTool: Tool.RULER }; // Use enum
    renderToolbar(customUIContext);
    const rulerButton = screen.getByRole("button", {
      name: "Ferramenta de Régua",
    });
    expect(rulerButton).toHaveClass("bg-accent-primary"); // Assumindo que 'bg-theme-input-bg' é a classe de ativo
  });
});
