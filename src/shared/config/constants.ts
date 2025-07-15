import { PageSettings } from "../api/types";

export const GRID_CELL_SIZE = 50; // Tamanho visual padrão de uma célula da grade em pixels com zoom 1.0
export const INITIAL_ZOOM_LEVEL = 1.0;
export const MIN_ZOOM_LEVEL = 0.1;
export const MAX_ZOOM_LEVEL = 3.0; // Atualizado de 5.0
export const ZOOM_SENSITIVITY = 0.001;
export const DEFAULT_PLAYER_NAME = "Jogador"; // Traduzido
export const DEFAULT_METERS_PER_SQUARE = 1.5;

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  widthInUnits: 30, // ex: 30 células de largura
  heightInUnits: 30, // ex: 30 células de altura (alterado de 20 para tornar quadrado)
  backgroundColor: "#FFFFFF", // Padrão para um fundo de página branco
};
export const DEFAULT_TOKEN_SIZE = "1x1";
export const GRID_LINE_COLOR = "#000";



