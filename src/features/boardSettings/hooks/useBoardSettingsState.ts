import { useCallback, useState } from "react";
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

export const useBoardSettingsState = (): BoardSettingsState => {
  const [gridSettings, setGridSettingsState] = useState<GridSettings>({
    visualCellSize: GRID_CELL_SIZE,
    lineColor: "#788475", // Corresponds to 'grid-line' in Tailwind config
    metersPerSquare: DEFAULT_METERS_PER_SQUARE,
  });
  const [pageSettings, setPageSettingsState] = useState<PageSettings>(
    DEFAULT_PAGE_SETTINGS
  );
  const [rulerPlacementMode, setRulerPlacementModeState] =
    useState<RulerPlacementMode>(RulerPlacementMode.SNAP_TO_CENTER);
  const [rulerPersists, setRulerPersistsState] = useState<boolean>(false);

  const updateGridSettings = useCallback(
    (newSettings: Partial<GridSettings>) => {
      setGridSettingsState((prev) => ({ ...prev, ...newSettings }));
    },
    []
  );

  const updatePageSettings = useCallback(
    (newSettings: Partial<PageSettings>) => {
      setPageSettingsState((prev) => ({ ...prev, ...newSettings }));
    },
    []
  );

  const setRulerPlacementMode = useCallback((mode: RulerPlacementMode) => {
    setRulerPlacementModeState(mode);
  }, []);

  const setRulerPersists = useCallback((persists: boolean) => {
    setRulerPersistsState(persists);
  }, []);

  return {
    gridSettings,
    pageSettings,
    rulerPlacementMode,
    rulerPersists,
    updateGridSettings,
    updatePageSettings,
    setRulerPlacementMode,
    setRulerPersists,
  };
};
