import { renderHook, act } from '@testing-library/react';
import { useBoardSettingsState } from './useBoardSettingsState';

describe('useBoardSettingsState', () => {
  it('deve inicializar o estado com valores padrão', () => {
    const { result } = renderHook(() => useBoardSettingsState());

    expect(result.current.gridSettings.visualCellSize).toBe(50); // GRID_CELL_SIZE
    expect(result.current.gridSettings.lineColor).toBe('#788475');
    expect(result.current.gridSettings.metersPerSquare).toBe(1.5); // DEFAULT_METERS_PER_SQUARE
    expect(result.current.pageSettings.widthInUnits).toBe(30);
    expect(result.current.pageSettings.heightInUnits).toBe(30);
    expect(result.current.pageSettings.backgroundColor).toBe('#FFFFFF');
    expect(result.current.rulerPlacementMode).toBe('SNAP_TO_CENTER');
    expect(result.current.rulerPersists).toBe(false);
  });

  it('deve atualizar as configurações da grade com updateGridSettings', () => {
    const { result } = renderHook(() => useBoardSettingsState());

    act(() => {
      result.current.updateGridSettings({ visualCellSize: 100, lineColor: '#FF0000' });
    });

    expect(result.current.gridSettings.visualCellSize).toBe(100);
    expect(result.current.gridSettings.lineColor).toBe('#FF0000');
    expect(result.current.gridSettings.metersPerSquare).toBe(1.5); // Deve permanecer o mesmo
  });

  it('deve atualizar as configurações da página com updatePageSettings', () => {
    const { result } = renderHook(() => useBoardSettingsState());

    act(() => {
      result.current.updatePageSettings({ widthInUnits: 50, backgroundColor: '#0000FF' });
    });

    expect(result.current.pageSettings.widthInUnits).toBe(50);
    expect(result.current.pageSettings.heightInUnits).toBe(30); // Deve permanecer o mesmo
    expect(result.current.pageSettings.backgroundColor).toBe('#0000FF');
  });

  it('deve definir o modo de posicionamento da régua com setRulerPlacementMode', () => {
    const { result } = renderHook(() => useBoardSettingsState());

    act(() => {
      result.current.setRulerPlacementMode('FREE_PLACEMENT');
    });

    expect(result.current.rulerPlacementMode).toBe('FREE_PLACEMENT');
  });

  it('deve definir a persistência da régua com setRulerPersists', () => {
    const { result } = renderHook(() => useBoardSettingsState());

    act(() => {
      result.current.setRulerPersists(true);
    });

    expect(result.current.rulerPersists).toBe(true);
  });
});
