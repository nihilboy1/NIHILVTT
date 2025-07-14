export type RollCategory =
  | "Attack"
  | "Damage"
  | "Attribute"
  | "Skill"
  | "Saving Throw"
  | "Generic";

export interface Roll {
  dice: `d${number}`;
  result: number;
}

export interface DiceRollDetails {
  rollName: string; // Ex: "Força", "Acrobacia", "Espada Longa"
  category: RollCategory; // A categoria da rolagem
  parts: (Roll | number)[];
  finalResult: number;
  naturalRollResult?: number; // Adicionado para armazenar o resultado natural do dado principal (ex: d20)
}

export type DiceFormula = string | number;

interface BaseMessage {
  id: string;
  sender: string;
  timestamp: Date;
  text: string;
}

export interface TextMessage extends BaseMessage {
  isDiceRoll: false;
}

export interface DiceRollMessage extends BaseMessage {
  isDiceRoll: true;
  diceRollDetails: DiceRollDetails;
}

export type Message = TextMessage | DiceRollMessage;

export const Tool = {
  SELECT: "SELECT",
  PAN: "PAN",
  RULER: "RULER",
  DICE: "DICE", // Adicionado para o botão de dados
} as const;
export type Tool = (typeof Tool)[keyof typeof Tool];

export const SidebarTab = {
  CHAT: "CHAT",
  CHARACTERS: "CHARACTERS",
} as const;
export type SidebarTab = (typeof SidebarTab)[keyof typeof SidebarTab];


export interface Token {
  id: string; // ID único para esta instância específica no tabuleiro (tokenId/instanceId)
  characterId: string; // Chave estrangeira para Character.id
  sceneId: string; // Em qual mapa ele está
  position: Point; // Coordenadas X, Y no grid
  currentHp?: number; // Pode ser diferente do HP da ficha do personagem
}

export interface GridSettings {
  visualCellSize: number;
  lineColor: string;
  metersPerSquare: number;
}

export interface PageSettings {
  widthInUnits: number;
  heightInUnits: number;
  backgroundColor: string;
}

export const RulerPlacementMode = {
  SNAP_TO_CENTER: "SNAP_TO_CENTER",
  FREE_PLACEMENT: "FREE_PLACEMENT",
} as const;
export type RulerPlacementMode =
  (typeof RulerPlacementMode)[keyof typeof RulerPlacementMode];

export interface Point {
  x: number;
  y: number;
}

export interface RulerPointData {
  point: Point;
  cumulativeDistanceMeters: number;
}

export interface RulerPathState {
  isActive: boolean;
  points: RulerPointData[];
  liveEndPoint: Point | null;
}

export interface HPControlModalState {
  tokenId: string | null; // Referência ao ID do Token no tabuleiro
  anchorPoint: Point | null;
}

// Para rastrear a instância do token sendo arrastada e sua posição visual
export interface DraggingVisuals {
  tokenId: string | null; // ID do Token sendo arrastado
  visualSVGPoint: Point | null; // Sua posição visual SVG atual durante o arrasto
}

export interface MarqueeSelectionState {
  isActive: boolean;
  startPoint: Point | null; // SVG coordinates
  currentPoint: Point | null; // SVG coordinates
}
