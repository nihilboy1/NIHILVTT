import { type PageSettings, TokenType } from './types'; // Adicionado TokenType

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
  backgroundColor: '#FFFFFF', // Padrão para um fundo de página branco
};

export const DEFAULT_TOKEN_COLOR = '#875cad'; // Previously THEME_COLORS.ACCENT_PRIMARY; Corresponds to 'accent-primary' in Tailwind config
export const DEFAULT_TOKEN_SIZE = "1x1";
export const DEFAULT_TOKEN_HP = 10;
export const DEFAULT_TOKEN_IMAGE = "/defaultToken.png"; // Caminho para a imagem padrão do token

// Cor da linha da grade, correspondente a 'grid-line' no tailwind.config.ts
export const GRID_LINE_COLOR = '#000';

// Padrões para Personagens Jogadores (PJ)
export const DEFAULT_PLAYER_LEVEL = 1;
// export const DEFAULT_PLAYER_XP = 0; // Removido - XP não é mais usado
export const DEFAULT_PLAYER_INSPIRATION = false;

// Mapeamento para tradução dos tipos de token (Movido de ChatSidebar.tsx)
export const tokenTypeTranslations: Record<TokenType, string> = {
  [TokenType.PLAYER]: "Jogador",
  [TokenType.MONSTER_NPC]: "Monstro/NPC",
  [TokenType.OBJECT]: "Objeto",
};

// O array TOKEN_TYPES não é usado diretamente para exibição na UI, os valores do enum são mapeados no TokensPanel
// Esta constante pode ser usada para gerar opções em selects se necessário.
export const TOKEN_TYPES_OPTIONS = Object.values(TokenType).map(type => ({
  value: type,
  label: tokenTypeTranslations[type]
}));
