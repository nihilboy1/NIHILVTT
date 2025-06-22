export interface DiceRollDetails {
  notation: string;
  rolls: number[];
  modifierOperator?: "+" | "-";
  modifierValue?: number;
  finalResult: number;
}

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
  TOKENS: "TOKENS",
} as const;
export type SidebarTab = (typeof SidebarTab)[keyof typeof SidebarTab];

export const TokenType = {
  PLAYER: "Player",
  MONSTER_NPC: "Monster/NPC",
  OBJECT: "Object",
} as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType];

// Interface base com campos comuns a todos os tokens
export interface BaseToken {
  id: string;
  name: string;
  type: TokenType; // O discriminador
  color: string;
  size: string;
  currentHp?: number;
  maxHp?: number;
  notes?: string;
}

// Interface para Tokens de Jogador
export interface PlayerToken extends BaseToken {
  type: typeof TokenType.PLAYER; // Garante que este é um token de jogador
  species?: string;
  charClass?: string;
  subclass?: string;
  level?: number;
  background?: string;
  xp?: number;
  inspiration?: boolean;
  armorClass?: number;
  shieldEquipped?: boolean;
  tempHp?: number;
  hitDiceUsed?: number;
  hitDiceMax?: number;
  deathSavesSuccesses?: number;
  deathSavesFailures?: number;

  // Campos D&D 5.5
  attributes?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficiencyBonus?: number;
  initiative?: number;
  speed?: number; // Este campo é para a velocidade de deslocamento principal
  passivePerception?: number;

  proficiencies?: {
    savingThrows: {
      strength: boolean;
      dexterity: boolean;
      constitution: boolean;
      intelligence: boolean;
      wisdom: boolean;
      charisma: boolean;
    };
    skills: {
      acrobatics: boolean; // Dex
      animalHandling: boolean; // Wis
      arcana: boolean; // Int
      athletics: boolean; // Str
      deception: boolean; // Cha
      history: boolean; // Int
      insight: boolean; // Wis
      intimidation: boolean; // Cha
      investigation: boolean; // Int
      medicine: boolean; // Wis
      nature: boolean; // Int
      perception: boolean; // Wis
      performance: boolean; // Cha
      persuasion: boolean; // Cha
      religion: boolean; // Int
      sleightOfHand: boolean; // Dex
      stealth: boolean; // Dex
      survival: boolean; // Wis
    };
  };

  attacks?: Attack[];
  equipment?: EquipmentItem[];
  featuresAndTraits?: FeatureOrTrait[];
}

// Interface para Tokens de Monstro/NPC
export interface MonsterNPCToken extends BaseToken {
  type: typeof TokenType.MONSTER_NPC; // Garante que este é um token de monstro/NPC
  challengeRating?: number;
}

// Interface para Tokens de Objeto
export interface ObjectToken extends BaseToken {
  type: typeof TokenType.OBJECT; // Garante que este é um token de objeto
  isInteractive?: boolean;
}

// A união discriminada principal
export type Token = PlayerToken | MonsterNPCToken | ObjectToken;

// Interfaces auxiliares para D&D 5.5
export interface Attack {
  id: string; // ID único para o ataque
  name: string;
  attackBonus?: string; // Ex: "+5" ou "Str+Prof"
  damage?: string; // Ex: "1d8+3 slashing"
  notes?: string;
}

export interface EquipmentItem {
  id: string; // ID único para o item
  name: string;
  quantity: number;
  description?: string;
  weight?: number;
  equipped?: boolean; // Para itens como armaduras, escudos, armas
}

export interface FeatureOrTrait {
  id: string; // ID único para a característica/talento
  name: string;
  description: string;
  source?: string; // Ex: "Classe", "Espécie", "Talento", "Antecedente"
  uses?: {
    current: number;
    max: number;
    per?: "short rest" | "long rest" | "day" | string; // string para usos customizados
  };
}

export interface GridInstance {
  instanceId: string; // Unique ID for this specific instance on the board
  tokenInfoId: string; // Foreign key to TokenInfo.id
  gridX: number; // Grid X coordinate of this instance
  gridY: number; // Grid Y coordinate of this instance
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
  instanceId: string | null; // Changed from tokenId to instanceId
  anchorPoint: Point | null;
}

// For tracking the token *instance* being dragged and its visual position
export interface DraggingVisuals {
  // Renamed from DraggingTokenVisuals
  instanceId: string | null; // ID of the GridInstance being dragged
  visualSVGPoint: Point | null; // Its current visual SVG position during drag
}

export interface MarqueeSelectionState {
  isActive: boolean;
  startPoint: Point | null; // SVG coordinates
  currentPoint: Point | null; // SVG coordinates
}
