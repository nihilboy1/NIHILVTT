export type Step = 'species' | 'origin' | 'feat' | 'class' | 'attributes' | 'personal-info';

export interface StepData {
  id: Step;
  name: string;
  title: string;
}

export const STEPS: StepData[] = [
  { id: 'species', name: 'Espécie', title: 'Escolha sua Espécie' },
  { id: 'origin', name: 'Origem', title: 'Escolha sua Origem' },
  { id: 'feat', name: 'Talentos', title: 'Configure seus Talentos' },
  { id: 'class', name: 'Classe', title: 'Escolha sua Classe' },
  { id: 'attributes', name: 'Atributos', title: 'Distribua seus Pontos de Atributo' },
  { id: 'personal-info', name: 'Informações Pessoais', title: 'Defina Detalhes do Personagem' },
];

export interface Selection {
  species?: string;
  origin?: string;
  feat?: Record<string, any>; // Pode conter múltiplos talentos e suas escolhas
  class?: string;
  attributes?:
    | Record<string, number>
    | import('@/shared/constants/characterData/attributes').Attributes;
  'personal-info'?: {
    name: string;
    tokenUrl?: string;
    splashartUrl?: string;
    lore?: string;
  };
}
