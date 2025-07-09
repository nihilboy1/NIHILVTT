import { Toolbar } from "@/widgets/toolBar/ui/Toolbar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChatContext } from "@/features/chat/model/contexts/ChatContext"; // Corrigido
import { BoardSettingsContext } from "@/features/boardSettings/contexts/BoardSettingsContext"; // Corrigido
import { type BoardSettingsState } from "@/features/boardSettings/hooks/useBoardSettingsState"; // Corrigido
import { type ChatState } from "@/features/chat/model/hooks/useChatState"; // Corrigido
import { RulerPlacementMode, SidebarTab, Tool } from "@/shared/api/types"; // Corrigido
import {
  DEFAULT_METERS_PER_SQUARE,
  DEFAULT_PAGE_SETTINGS,
  GRID_CELL_SIZE,
} from "@/shared/config/constants"; // Corrigido

import { UIContext } from "@/features/layoutControls/model/contexts/UIProvider"; // Corrigido
import { UIState } from "@/features/layoutControls/model/hooks/useUIState"; // Corrigido

// Mock the actual hook modules and their return values
const mockUseUIState = jest.fn();
const mockUseBoardSettingsState = jest.fn();
const mockUseChatState = jest.fn();

jest.mock("@/app/providers/useUIState", () => ({ // Corrigido
  useUIState: () => mockUseUIState(),
}));
jest.mock("@/features/boardSettings/hooks/useBoardSettingsState", () => ({ // Corrigido
  useBoardSettingsState: () => mockUseBoardSettingsState(),
}));
jest.mock("@/features/chat/model/hooks/useChatState", () => ({ // Corrigido
  useChatState: () => mockUseChatState(),
}));
jest.mock("@/features/boardRuler/ui/RulerPopover", () => ({ // Corrigido
  RulerPopover: jest.fn(() => null), // Mock RulerPopover to return null
}));
jest.mock("@/features/diceRolling/ui/DiceRollPopover", () => ({ // Corrigido
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
  uiState: Partial<UIState> = {},
  boardSettingsState: Partial<BoardSettingsState> = {},
  chatState: Partial<ChatState> = {}
) => {
  mockUseUIState.mockReturnValue({
    ...defaultMockUIState,
    ...uiState,
  });
  mockUseBoardSettingsState.mockReturnValue({
    ...defaultMockBoardSettingsState,
    ...boardSettingsState,
  });
  mockUseChatState.mockReturnValue({
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
    mockUseUIState.mockClear();
    mockUseBoardSettingsState.mockClear();
    mockUseChatState.mockClear();
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
    const { RulerPopover } = jest.requireMock("../shared/ui/RulerPopover");
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
