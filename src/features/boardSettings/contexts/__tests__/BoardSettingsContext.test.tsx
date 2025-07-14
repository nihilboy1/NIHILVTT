import { act, renderHook } from "@testing-library/react";
import { useBoardSettingsStore } from "../../model/store";
import { RulerPlacementMode } from "@/shared/api/types";

describe("useBoardSettingsStore (Context-like behavior)", () => {
  // Reset the store to its initial state before each test
  beforeEach(() => {
    // This is a common pattern with Zustand to reset the store for testing
    // You might need to adjust this based on how your useBoardSettingsStore is implemented
    // For example, if it has a `reset` method or if you can re-initialize it.
    // For now, we'll assume a fresh hook render is enough for isolation.
  });

  it("deve inicializar o estado com valores padrão", () => {
    const { result } = renderHook(() => useBoardSettingsStore());

    expect(result.current.gridSettings.visualCellSize).toBe(50);
    expect(result.current.gridSettings.lineColor).toBe("#788475");
    expect(result.current.gridSettings.metersPerSquare).toBe(1.5);
    expect(result.current.pageSettings.widthInUnits).toBe(30);
    expect(result.current.pageSettings.heightInUnits).toBe(30);
    expect(result.current.pageSettings.backgroundColor).toBe("#FFFFFF");
    expect(result.current.rulerPlacementMode).toBe(RulerPlacementMode.SNAP_TO_CENTER);
    expect(result.current.rulerPersists).toBe(false);
  });

  it("deve atualizar as configurações da grade com updateGridSettings", () => {
    const { result } = renderHook(() => useBoardSettingsStore());

    act(() => {
      result.current.updateGridSettings({
        visualCellSize: 100,
        lineColor: "#FF0000",
      });
    });

    expect(result.current.gridSettings.visualCellSize).toBe(100);
    expect(result.current.gridSettings.lineColor).toBe("#FF0000");
    expect(result.current.gridSettings.metersPerSquare).toBe(1.5);
  });

  it("deve atualizar as configurações da página com updatePageSettings", () => {
    const { result } = renderHook(() => useBoardSettingsStore());

    act(() => {
      result.current.updatePageSettings({
        widthInUnits: 50,
        backgroundColor: "#0000FF",
      });
    });

    expect(result.current.pageSettings.widthInUnits).toBe(50);
    expect(result.current.pageSettings.heightInUnits).toBe(30);
    expect(result.current.pageSettings.backgroundColor).toBe("#0000FF");
  });

  it("deve definir o modo de posicionamento da régua com setRulerPlacementMode", () => {
    const { result } = renderHook(() => useBoardSettingsStore());

    act(() => {
      result.current.setRulerPlacementMode(RulerPlacementMode.FREE_PLACEMENT);
    });

    expect(result.current.rulerPlacementMode).toBe(RulerPlacementMode.FREE_PLACEMENT);
  });

  it("deve definir a persistência da régua com setRulerPersists", () => {
    const { result } = renderHook(() => useBoardSettingsStore());

    act(() => {
      result.current.setRulerPersists(true);
    });

    expect(result.current.rulerPersists).toBe(true);
  });
});
