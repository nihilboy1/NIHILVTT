export interface Background {
  id: string;
  name: string;
  description: string;
}

export const BACKGROUNDS: Background[] = [
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
