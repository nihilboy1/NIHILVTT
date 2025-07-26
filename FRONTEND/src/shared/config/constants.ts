import { PageSettings } from '../api/types';

export const GRID_CONFIG = {
  CELL_SIZE: 50,
  LINE_COLOR: '#000',
  DEFAULT_METERS_PER_SQUARE: 1.5,
} as const;

export const ZOOM_CONFIG = {
  INITIAL: 1.0,
  MIN: 0.1,
  MAX: 3.0,
  SENSITIVITY: 0.001,
} as const;

export const THEME_COLORS = {
  PAGE_BACKGROUND: '#FFFFFF',
  GRID_LINE: '#CCCCCC',
} as const;

export const DEFAULTS = {
  PLAYER_NAME: 'Jogador',
  TOKEN_SIZE: '1x1',
  PAGE_SETTINGS: {
    widthInUnits: 30,
    heightInUnits: 30,
    backgroundColor: THEME_COLORS.PAGE_BACKGROUND,
  } as PageSettings,
} as const;

export const MOTION_TIMING = {
  DURATION_FAST: 0.1,
  DURATION_DEFAULT: 0.5,
  STAGGER_DEFAULT: 0.15,
} as const;