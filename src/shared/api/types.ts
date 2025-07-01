export type RollCategory = "Attack" | "Damage" | "Attribute" | "Skill" | "Saving Throw" | "Generic";

export interface Roll {
  dice: `d${number}`;
  result: number;
}

export interface DiceRollDetails {
  rollName: string; // Ex: "Força", "Acrobacia", "Espada Longa"
  category: RollCategory; // A categoria da rolagem
  parts: (Roll | number)[];
  finalResult: number;
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
  TOKENS: "TOKENS",
} as const;
export type SidebarTab = (typeof SidebarTab)[keyof typeof SidebarTab];

export const CharacterType = {
  PLAYER: "Player",
  MONSTER_NPC: "Monster/NPC",
  OBJECT: "Object",
} as const;
export type CharacterType = (typeof CharacterType)[keyof typeof CharacterType];

// Interface base com campos comuns a todos os personagens
export interface BaseCharacter {
  id: string;
  name: string;
  type: CharacterType; // O discriminador
  image: string;
  size: string;
  notes?: string;
}

// Interface base para qualquer criatura de D&D 5.5 (Jogador ou Monstro/NPC)
export interface BaseDndCharacter extends BaseCharacter {
  // Campos D&D 5.5
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficiencyBonus: number; // Calculado a partir do nível (Player) ou CR (Monster/NPC)

  proficiencies: {
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

  combatStats: {
    maxHp: number;
    currentHp: number;
    tempHp?: number;
    armorClass: number;
    speed: number; // Este campo é para a velocidade de deslocamento principal
    initiative?: number; // Sugerido para ser derivado
    passivePerception?: number; // Sugerido para ser derivado
    shieldEquipped?: boolean;
  };

  actions?: Action[];
  attacks?: Attack[];
  equipment?: EquipmentItem[];
  featuresAndTraits?: FeatureOrTrait[];
}

// Interface para Personagens de Jogador
export interface PlayerCharacter extends BaseDndCharacter {
  type: typeof CharacterType.PLAYER; // Garante que este é um personagem de jogador
  species?: string;
  charClass?: string;
  subclass?: string;
  level: number;
  background?: string;
  xp?: number;
  inspiration?: boolean;
  hitDiceUsed?: number;
  hitDiceMax?: number;
  deathSavesSuccesses?: number;
  deathSavesFailures?: number;
  hitDiceEntries?: HitDiceEntry[];
}

// Interface para Personagens de Monstro/NPC
export interface MonsterNPCCharacter extends BaseDndCharacter {
  type: typeof CharacterType.MONSTER_NPC; // Garante que este é um personagem de monstro/NPC
  challengeRating: number;
}

// Interface para Personagens de Objeto
export interface ObjectCharacter extends BaseCharacter {
  type: typeof CharacterType.OBJECT; // Garante que este é um personagem de objeto
  isInteractive?: boolean;
}

// A união discriminada principal para Personagens
export type Character = PlayerCharacter | MonsterNPCCharacter | ObjectCharacter;

// Interfaces auxiliares para D&D 5.5
export interface Action {
  id: string;
  name: string;
  bonus?: DiceFormula;
  damage?: DiceFormula;
  notes?: string;
}

export interface Attack {
  id: string;
  name: string;
  attackBonus?: DiceFormula;
  damage?: DiceFormula;
}

export interface EquipmentItem {
  id: string; // ID único para o item
  name: string;
  quantity: number;
  description?: string;
  weight?: number;
  equipped?: boolean; // Para itens como armaduras, escudos, armas
}

export interface HitDiceEntry {
  id: string;
  type: "d4" | "d6" | "d8" | "d10" | "d12" | "d20";
  quantity: number;
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

// Representação visual e física de um Character no grid de uma Scene específica
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
