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

// SpellKnowledgeEffect corresponde ao PassiveProvidesSpellKnowledgeEffectSchema do datamodeling
export type SpellKnowledgeEffect = Extract<EffectType, { type: 'passive_providesSpellKnowledge' }>;

// BonusEffect corresponde ao PassiveProvidesBonusEffectSchema do datamodeling
export type BonusEffect = Extract<EffectType, { type: 'passive_providesBonus' }>;

// VisionEffect corresponde ao PassiveProvidesVisionEffectSchema do datamodeling
export type VisionEffect = Extract<EffectType, { type: 'passive_providesVision' }>;

// ModifyUserHPEffect corresponde ao PassiveModifyUserHPEffectSchema do datamodeling
export type ModifyUserHPEffect = Extract<EffectType, { type: 'passive_modifyUserHP' }>;

// Define o tipo de efeito que pode ser usado em uma origem ou talento
export type EntityEffect =
  | AbilityScoreEffect
  | FeatEffect
  | ProficiencyEffect
  | SpellKnowledgeEffect
  | BonusEffect
  | VisionEffect
  | ModifyUserHPEffect;

// Manter o alias para compatibilidade com o código existente
export type OriginEffect = EntityEffect;

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
export const isAbilityScoreEffect = (effect: EntityEffect): effect is AbilityScoreEffect =>
  effect.type === 'passive_modifyAbilityScore';

export const isFeatEffect = (effect: EntityEffect): effect is FeatEffect =>
  effect.type === 'passive_providesFeat';

export const isProficiencyEffect = (effect: EntityEffect): effect is ProficiencyEffect =>
  effect.type === 'passive_grantProficiency';

export const isSpellKnowledgeEffect = (effect: EntityEffect): effect is SpellKnowledgeEffect =>
  effect.type === 'passive_providesSpellKnowledge';

export const isBonusEffect = (effect: EntityEffect): effect is BonusEffect =>
  effect.type === 'passive_providesBonus';

export const isVisionEffect = (effect: EntityEffect): effect is VisionEffect =>
  effect.type === 'passive_providesVision';

export const isModifyUserHPEffect = (effect: EntityEffect): effect is ModifyUserHPEffect =>
  effect.type === 'passive_modifyUserHP';
