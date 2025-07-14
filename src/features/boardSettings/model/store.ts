import { create } from "zustand";
import {
  type GridSettings,
  type PageSettings,
  RulerPlacementMode,
} from "../../../shared/api/types";
import {
  DEFAULT_METERS_PER_SQUARE,
  DEFAULT_PAGE_SETTINGS,
  GRID_CELL_SIZE,
} from "../../../shared/config/constants";

export interface BoardSettingsState {
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  rulerPlacementMode: RulerPlacementMode;
  rulerPersists: boolean;
  updateGridSettings: (newSettings: Partial<GridSettings>) => void;
  updatePageSettings: (newSettings: Partial<PageSettings>) => void;
  setRulerPlacementMode: (mode: RulerPlacementMode) => void;
  setRulerPersists: (persists: boolean) => void;
}

export const useBoardSettingsStore = create<BoardSettingsState>((set) => ({
  gridSettings: {
    visualCellSize: GRID_CELL_SIZE,
    lineColor: "#788475", // Corresponds to 'grid-line' in Tailwind config
    metersPerSquare: DEFAULT_METERS_PER_SQUARE,
  },
  pageSettings: DEFAULT_PAGE_SETTINGS,
  rulerPlacementMode: RulerPlacementMode.SNAP_TO_CENTER,
  rulerPersists: false,

  updateGridSettings: (newSettings) =>
    set((state) => ({
      gridSettings: { ...state.gridSettings, ...newSettings },
    })),
  updatePageSettings: (newSettings) =>
    set((state) => ({
      pageSettings: { ...state.pageSettings, ...newSettings },
    })),
  setRulerPlacementMode: (mode) => set({ rulerPlacementMode: mode }),
  setRulerPersists: (persists) => set({ rulerPersists: persists }),
}));
