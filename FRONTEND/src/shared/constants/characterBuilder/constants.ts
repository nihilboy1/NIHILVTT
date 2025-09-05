import { Attributes, AttributeInfo, CharacterOption, Step } from './types';

// Valores padrão para os atributos (todos começam em 8)
export const DEFAULT_ATTRIBUTES: Attributes = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

// Passos do construtor de personagem
export const STEPS: { id: Step; name: string; title: string }[] = [
  { id: 'species', name: 'Espécie', title: 'Escolha sua Espécie' },
  { id: 'background', name: 'Background', title: 'Escolha seu Background' },
  { id: 'class', name: 'Classe', title: 'Escolha sua Classe' },
  { id: 'attributes', name: 'Atributos', title: 'Distribua seus Pontos de Atributo' },
];

// Lista de espécies disponíveis
export const SPECIES: CharacterOption[] = [
  {
    id: 'human',
    name: 'Humano',
    description: 'Versátil e adaptável, com bônus em todas as áreas.',
  },
  {
    id: 'elf',
    name: 'Elfo',
    description: 'Gracioso e sábio, com afinidade mágica natural.',
  },
  {
    id: 'dwarf',
    name: 'Anão',
    description: 'Resistente e forte, especialista em artesanato.',
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Pequeno mas corajoso, com sorte natural.',
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Feroz e poderoso, especialista em combate.',
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Descendente infernal com poderes únicos.',
  },
];

// Lista de backgrounds disponíveis
export const BACKGROUNDS: CharacterOption[] = [
  {
    id: 'noble',
    name: 'Nobre',
    description: 'Nasceu em berço de ouro, com conexões políticas.',
  },
  {
    id: 'soldier',
    name: 'Soldado',
    description: 'Veterano de guerra com treinamento militar.',
  },
  {
    id: 'criminal',
    name: 'Criminoso',
    description: 'Viveu nas ruas, especialista em atividades ilícitas.',
  },
  {
    id: 'scholar',
    name: 'Erudito',
    description: 'Dedicou a vida aos estudos e conhecimento.',
  },
  {
    id: 'merchant',
    name: 'Comerciante',
    description: 'Experiente em negócios e relações sociais.',
  },
  {
    id: 'hermit',
    name: 'Eremita',
    description: 'Isolado da sociedade, com sabedoria única.',
  },
];

// Lista de classes disponíveis
export const CLASSES: CharacterOption[] = [
  {
    id: 'warrior',
    name: 'Guerreiro',
    description: 'Especialista em combate corpo a corpo e defesa.',
  },
  {
    id: 'mage',
    name: 'Mago',
    description: 'Manipulador das artes arcanas e magias poderosas.',
  },
  {
    id: 'rogue',
    name: 'Ladino',
    description: 'Mestre da furtividade e ataques precisos.',
  },
  {
    id: 'cleric',
    name: 'Clérigo',
    description: 'Curandeiro divino com poderes sagrados.',
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    description: 'Explorador especializado em combate à distância.',
  },
  {
    id: 'bard',
    name: 'Bardo',
    description: 'Artista versátil com magias de apoio.',
  },
];

// Lista de atributos
export const ATTRIBUTES: AttributeInfo[] = [
  { id: 'strength', name: 'Força', abbr: 'FOR' },
  { id: 'dexterity', name: 'Destreza', abbr: 'DES' },
  { id: 'constitution', name: 'Constituição', abbr: 'CON' },
  { id: 'intelligence', name: 'Inteligência', abbr: 'INT' },
  { id: 'wisdom', name: 'Sabedoria', abbr: 'SAB' },
  { id: 'charisma', name: 'Carisma', abbr: 'CAR' },
];

// Tabela de custo do Point Buy
export const ATTRIBUTE_COST = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};
