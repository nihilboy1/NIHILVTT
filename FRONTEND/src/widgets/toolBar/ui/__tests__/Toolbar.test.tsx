import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { type BoardSettingsState } from '@/features/boardSettings/model/store';
import { type ChatState } from '@/features/chat/model/store'; // Importar a interface e o hook do store Zustand
import { UIState } from '@/features/layoutControls/model/store'; // Importar a interface do store Zustand
import { RulerPlacementMode, SidebarTab, Tool } from '@/shared/api/types'; // Corrigido
import { DEFAULTS, GRID_CONFIG } from '@/shared/config/constants';
import { Toolbar } from '@/widgets/toolBar/ui/Toolbar';

// Mock the actual hook modules and their return values
const mockUseUIStore = jest.fn(); // Alterado para mockar useUIStore
const mockUseBoardSettingsStore = jest.fn();
const mockUseChatStore = jest.fn(); // Alterado para mockar useChatStore

jest.mock('@/features/layoutControls/model/store', () => ({
  useUIStore: () => mockUseUIStore(), // Alterado para mockar useUIStore
}));
jest.mock('@/features/boardSettings/model/store', () => ({
  useBoardSettingsStore: () => mockUseBoardSettingsStore(),
}));
jest.mock('@/features/chat/model/store', () => ({
  useChatStore: () => mockUseChatStore(), // Alterado para mockar useChatStore
}));
jest.mock('@/features/boardRuler/ui/RulerPopover', () => ({
  // Corrigido
  RulerPopover: jest.fn(() => null), // Mock RulerPopover to return null
}));
jest.mock('@/features/diceRolling/ui/DiceRollPopover', () => ({
  // Corrigido
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
    visualCellSize: GRID_CONFIG.CELL_SIZE,
    lineColor: '#788475',
    metersPerSquare: GRID_CONFIG.DEFAULT_METERS_PER_SQUARE,
  },
  pageSettings: DEFAULTS.PAGE_SETTINGS,
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
  handleChatInput: jest.fn(),
  clearMessages: jest.fn(),
  processChatCommand: jest.fn(), // Adicionado para satisfazer a interface ChatState
};

const renderToolbar = (
  uiState: Partial<UIState> = {},
  boardSettingsState: Partial<BoardSettingsState> = {},
  chatState: Partial<ChatState> = {},
) => {
  mockUseUIStore.mockReturnValue({
    ...defaultMockUIState,
    ...uiState,
  });
  mockUseBoardSettingsStore.mockReturnValue({
    ...defaultMockBoardSettingsState,
    ...boardSettingsState,
  });
  mockUseChatStore.mockReturnValue({
    ...defaultMockChatState,
    ...chatState,
  });

  return render(<Toolbar />);
};

describe('Toolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mocks before each test
    mockUseUIStore.mockClear(); // Alterado para mockUseUIStore
    mockUseBoardSettingsStore.mockClear();
    mockUseChatStore.mockClear(); // Alterado para mockUseChatStore
  });

  test('deve renderizar os botões de ferramenta corretos', () => {
    renderToolbar();
    expect(screen.getByLabelText('Ferramenta de Seleção')).toBeInTheDocument();
    expect(screen.getByLabelText('Mover Mapa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ferramenta de Régua' })).toBeInTheDocument();
  });

  test('deve mudar a ferramenta selecionada ao clicar no botão "Selecionar"', () => {
    renderToolbar();
    const selectButton = screen.getByLabelText('Ferramenta de Seleção');
    fireEvent.click(selectButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.SELECT); // Use enum
  });

  test('deve mudar a ferramenta selecionada ao clicar no botão "Mover Mapa"', () => {
    renderToolbar();
    const panButton = screen.getByLabelText('Mover Mapa');
    fireEvent.click(panButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.PAN); // Use enum
  });

  test('deve abrir o popover da régua ao clicar no botão "Medir Distância"', async () => {
    const { RulerPopover } = jest.requireMock('../shared/ui/RulerPopover');
    renderToolbar();
    const rulerButton = screen.getByRole('button', {
      name: 'Ferramenta de Régua',
    });
    fireEvent.click(rulerButton);
    expect(defaultMockUIState.setActiveTool).toHaveBeenCalledWith(Tool.RULER); // Use enum
    expect(RulerPopover).toHaveBeenCalled();
  });

  test('deve aplicar a classe "active" ao botão da ferramenta selecionada', () => {
    const customUIContext = { ...defaultMockUIState, activeTool: Tool.PAN }; // Use enum
    renderToolbar(customUIContext);
    const panButton = screen.getByLabelText('Mover Mapa');
    expect(panButton).toHaveClass('bg-accent-primary'); // Assumindo que 'bg-accent-primary' é a classe de ativo
  });

  test('deve aplicar a classe "active" ao botão de régua quando a ferramenta de régua está ativa', () => {
    const customUIContext = { ...defaultMockUIState, activeTool: Tool.RULER }; // Use enum
    renderToolbar(customUIContext);
    const rulerButton = screen.getByRole('button', {
      name: 'Ferramenta de Régua',
    });
    expect(rulerButton).toHaveClass('bg-accent-primary'); // Assumindo que 'bg-theme-input-bg' é a classe de ativo
  });
});
