import { EffectType } from '@nihilvtt/datamodeling/shared';

// Utilizando os tipos do datamodeling
// O EffectType é uma união discriminada de todos os tipos de efeito definidos no pacote datamodeling
// Vamos extrair os tipos específicos que precisamos para nosso sistema

// Tipos específicos extraídos de EffectType
// AbilityScoreEffect corresponde ao ModifyAbilityScoreEffectSchema do datamodeling
export type AbilityScoreEffect = Extract<EffectType, { type: 'passive_modifyAbilityScore' }>;

// FeatEffect corresponde ao PassiveProvidesFeatEffectSchema do datamodeling
export type FeatEffect = Extract<EffectType, { type: 'passive_providesFeat' }>;

// ProficiencyEffect corresponde ao PassiveProvidesProficiencyEffectSchema do datamodeling
export type ProficiencyEffect = Extract<EffectType, { type: 'passive_grantProficiency' }>;

// Define o tipo de efeito que pode ser usado em uma origem
export type OriginEffect = AbilityScoreEffect | FeatEffect | ProficiencyEffect;

// Tipos para as escolhas do usuário
export type AbilityScoreChoice = Record<string, number>;
export type FeatChoice = string;
export type ProficiencyChoice = string[];

export type EffectChoice = AbilityScoreChoice | FeatChoice | ProficiencyChoice;

export interface ProcessedEffect {
  id: string;
  type: string;
  name: string;
  description?: string;
  requiresChoice: boolean;
  selected: any;
  onSelect: (choice: any) => void;
  [key: string]: any; // Propriedades adicionais específicas para cada tipo
}

export interface EffectChoices {
  [effectId: string]: EffectChoice;
}

// Função auxiliar para verificar o tipo de um efeito
// Estas funções permanecem inalteradas pois a verificação de tipo continua a mesma
// mas agora usando os tipos corretos do datamodeling
export const isAbilityScoreEffect = (effect: OriginEffect): effect is AbilityScoreEffect =>
  effect.type === 'passive_modifyAbilityScore';

export const isFeatEffect = (effect: OriginEffect): effect is FeatEffect =>
  effect.type === 'passive_providesFeat';

export const isProficiencyEffect = (effect: OriginEffect): effect is ProficiencyEffect =>
  effect.type === 'passive_grantProficiency';
