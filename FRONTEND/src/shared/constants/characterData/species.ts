export interface Species {
  id: string;
  name: string;
  description: string;
}

export const SPECIES: Species[] = [
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
