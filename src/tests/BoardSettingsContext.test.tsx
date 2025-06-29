import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importar para toHaveTextContent
import { BoardSettingsProvider, useBoardSettings } from '../contexts/BoardSettingsContext';
import { useBoardSettingsState } from '../hooks/useBoardSettingsState';

// Mock the useBoardSettingsState hook
jest.mock('../hooks/useBoardSettingsState', () => ({
  useBoardSettingsState: jest.fn(),
}));

const mockBoardSettingsState = {
  gridSettings: {
    visualCellSize: 50,
    lineColor: '#000000',
    metersPerSquare: 1.5,
  },
  pageSettings: {
    widthInUnits: 30,
    heightInUnits: 30,
    backgroundColor: '#FFFFFF',
  },
  rulerPlacementMode: 'SNAP_TO_CENTER',
  rulerPersists: false,
  updateGridSettings: jest.fn(),
  updatePageSettings: jest.fn(),
  setRulerPlacementMode: jest.fn(),
  setRulerPersists: jest.fn(),
};

describe('BoardSettingsContext', () => {
  beforeEach(() => {
    // Reset mock before each test
    (useBoardSettingsState as jest.Mock).mockReturnValue(mockBoardSettingsState);
  });

  test('useBoardSettings deve lançar um erro se não for usado dentro de um BoardSettingsProvider', () => {
    const TestComponent = () => {
      useBoardSettings();
      return null;
    };

    // Suprimir o erro do console para este teste específico
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow('useBoardSettings must be used within a BoardSettingsProvider');

    consoleErrorSpy.mockRestore(); // Restaurar o console.error
  });

  test('BoardSettingsProvider deve fornecer o estado do useBoardSettingsState', () => {
    const TestComponent = () => {
      const context = useBoardSettings();
      return (
        <div>
          <span data-testid="visualCellSize">{context.gridSettings.visualCellSize}</span>
          <span data-testid="lineColor">{context.gridSettings.lineColor}</span>
          <span data-testid="widthInUnits">{context.pageSettings.widthInUnits}</span>
        </div>
      );
    };

    render(
      <BoardSettingsProvider>
        <TestComponent />
      </BoardSettingsProvider>
    );

    expect(screen.getByTestId('visualCellSize')).toHaveTextContent('50');
    expect(screen.getByTestId('lineColor')).toHaveTextContent('#000000');
    expect(screen.getByTestId('widthInUnits')).toHaveTextContent('30');
  });

  test('as funções do contexto devem ser chamáveis', () => {
    const TestComponent = () => {
      const { updateGridSettings, updatePageSettings, setRulerPlacementMode, setRulerPersists } = useBoardSettings();
      return (
        <div>
          <button onClick={() => updateGridSettings({ visualCellSize: 100 })}>Update Grid</button>
          <button onClick={() => updatePageSettings({ widthInUnits: 50 })}>Update Page</button>
          <button onClick={() => setRulerPlacementMode('FREE_PLACEMENT')}>Set Mode</button>
          <button onClick={() => setRulerPersists(true)}>Set Persist</button>
        </div>
      );
    };

    render(
      <BoardSettingsProvider>
        <TestComponent />
      </BoardSettingsProvider>
    );

    fireEvent.click(screen.getByText('Update Grid'));
    expect(mockBoardSettingsState.updateGridSettings).toHaveBeenCalledWith({ visualCellSize: 100 });

    fireEvent.click(screen.getByText('Update Page'));
    expect(mockBoardSettingsState.updatePageSettings).toHaveBeenCalledWith({ widthInUnits: 50 });

    fireEvent.click(screen.getByText('Set Mode'));
    expect(mockBoardSettingsState.setRulerPlacementMode).toHaveBeenCalledWith('FREE_PLACEMENT');

    fireEvent.click(screen.getByText('Set Persist'));
    expect(mockBoardSettingsState.setRulerPersists).toHaveBeenCalledWith(true);
  });
});
