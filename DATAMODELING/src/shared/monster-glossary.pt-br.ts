const MONSTER_TERM_LABELS_PT_BR: Record<string, string> = {
  // Alignment
  lawfulGood: "Leal e bom",
  neutralGood: "Neutro e bom",
  chaoticGood: "Caotico e bom",
  lawfulNeutral: "Leal e neutro",
  trueNeutral: "Neutro verdadeiro",
  chaoticNeutral: "Caotico e neutro",
  lawfulEvil: "Leal e maligno",
  neutralEvil: "Neutro e maligno",
  chaoticEvil: "Caotico e maligno",
  unaligned: "Sem alinhamento",

  // Creature types
  aberration: "Aberracao",
  beast: "Besta",
  celestial: "Celestial",
  construct: "Constructo",
  dragon: "Dragao",
  elemental: "Elemental",
  fey: "Feerico",
  fiend: "Corruptor",
  giant: "Gigante",
  humanoid: "Humanoide",
  monstrosity: "Monstruosidade",
  ooze: "Gosma",
  plant: "Planta",
  undead: "Morto-vivo",

  // Environments
  acheron: "Aqueronte",
  any: "Qualquer",
  arctic: "Artico",
  coast: "Costa",
  desert: "Deserto",
  feywild: "Agrestia das Fadas",
  forest: "Floresta",
  grassland: "Pradaria",
  hill: "Colina",
  mountain: "Montanha",
  planar: "Planar",
  swamp: "Pantano",
  underdark: "Subterraneo profundo",
  underwater: "Subaquatico",
  urban: "Urbano",

  // Languages
  common: "Comum",
  elvish: "Elfico",
  gnoll: "Gnoll",
  goblin: "Goblin",
  infernal: "Infernal",
  modron: "Modron",
  primordial: "Primordial",
  sahuagin: "Sahuagin",
  sylvan: "Silvestre",
  telepathy: "Telepatia",
  worg: "Worg",

  // Senses and movement
  passive: "Percepcao passiva",
  darkvision: "Visao no escuro",
  blindsight: "Percepcao as cegas",
  tremorsense: "Percepcao por tremores",
  truesight: "Visao verdadeira",
  walk: "Deslocamento",
  climb: "Escalada",
  fly: "Voo",
  swim: "Natacao",
  burrow: "Escavacao",

  // Damage types
  acid: "Acido",
  bludgeoning: "Concussao",
  cold: "Frio",
  fire: "Fogo",
  force: "Forca",
  lightning: "Relampago",
  necrotic: "Necrotico",
  piercing: "Perfurante",
  poison: "Veneno",
  psychic: "Psiquico",
  radiant: "Radiante",
  slashing: "Cortante",
  thunder: "Trovao",

  // Conditions
  blinded: "Cego",
  charmed: "Enfeiticado",
  deafened: "Surdo",
  exhausted: "Exausto",
  frightened: "Amedrontado",
  grappled: "Agarrado",
  incapacitated: "Incapacitado",
  invisible: "Invisivel",
  paralyzed: "Paralisado",
  paralysed: "Paralisado",
  petrified: "Petrificado",
  poisoned: "Envenenado",
  prone: "Caido",
  restrained: "Contido",
  stunned: "Atordoado",
  unconscious: "Inconsciente",
};

function normalizeTerm(value: string): string {
  return value.replace(/\s+/g, "").trim();
}

export function getMonsterTermLabelPtBr(value: string): string | undefined {
  const raw = value.trim();
  if (raw.length === 0) {
    return undefined;
  }

  const direct = MONSTER_TERM_LABELS_PT_BR[raw];
  if (direct) {
    return direct;
  }

  const normalized = normalizeTerm(raw);
  const normalizedDirect = MONSTER_TERM_LABELS_PT_BR[normalized];
  if (normalizedDirect) {
    return normalizedDirect;
  }

  const lower = raw.toLowerCase();
  return MONSTER_TERM_LABELS_PT_BR[lower];
}

export const MONSTER_TERM_LABELS_PT_BR_CANONICAL = MONSTER_TERM_LABELS_PT_BR;
