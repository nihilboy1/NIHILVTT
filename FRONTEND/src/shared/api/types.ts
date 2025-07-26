export type RollCategory = 'Attack' | 'Damage' | 'Attribute' | 'Skill' | 'Saving Throw' | 'Generic';

export interface Roll {
  dice: `d${number}`;
  result: number;
}

export interface DiceRollDetails {
  rollName: string;
  category: RollCategory;
  parts: (Roll | number)[];
  finalResult: number;
  naturalRollResult?: number;
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
  SELECT: 'SELECT',
  PAN: 'PAN',
  RULER: 'RULER',
  DICE: 'DICE',
} as const;
export type Tool = (typeof Tool)[keyof typeof Tool];

export const SidebarTab = {
  CHAT: 'CHAT',
  CHARACTERS: 'CHARACTERS',
} as const;
export type SidebarTab = (typeof SidebarTab)[keyof typeof SidebarTab];

export interface Token {
  id: string;
  characterId: string;
  sceneId: string;
  position: Point;
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
  SNAP_TO_CENTER: 'SNAP_TO_CENTER',
  FREE_PLACEMENT: 'FREE_PLACEMENT',
} as const;
export type RulerPlacementMode = (typeof RulerPlacementMode)[keyof typeof RulerPlacementMode];

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
  tokenId: string | null;
  anchorPoint: Point | null;
}

export interface DraggingVisuals {
  tokenId: string | null;
  visualSVGPoint: Point | null;
}

export interface MarqueeSelectionState {
  isActive: boolean;
  startPoint: Point | null;
  currentPoint: Point | null;
}
