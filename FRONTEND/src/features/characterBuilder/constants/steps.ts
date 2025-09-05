export type Step = 'species' | 'background' | 'class' | 'attributes';

export interface StepData {
  id: Step;
  name: string;
  title: string;
}

export const STEPS: StepData[] = [
  { id: 'species', name: 'Espécie', title: 'Escolha sua Espécie' },
  { id: 'background', name: 'Background', title: 'Escolha seu Background' },
  { id: 'class', name: 'Classe', title: 'Escolha sua Classe' },
  { id: 'attributes', name: 'Atributos', title: 'Distribua seus Pontos de Atributo' },
];

export interface Selection {
  species?: string;
  background?: string;
  class?: string;
  attributes?: import('@/shared/constants/characterData/attributes').Attributes;
}
