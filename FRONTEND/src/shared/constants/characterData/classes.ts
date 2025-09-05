export interface CharacterClass {
  id: string;
  name: string;
  description: string;
}

export const CLASSES: CharacterClass[] = [
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
