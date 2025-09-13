import { OriginType, FeatType } from '@nihilvtt/datamodeling/domain';
import { EffectChoices } from '../features/characterBuilder/types/effectTypes';

interface EntityEffect {
  type: string;
  name: string;
  description?: string;
  [key: string]: any;
}

type ProcessedEffectBase = {
  id: string;
  type: string;
  name: string;
  description?: string;
  requiresChoice: boolean;
  selected: any;
  [key: string]: any;
};


function processEntityEffects(
  entity: { id: string; effects: EntityEffect[] },
  effectChoices: EffectChoices,
  entityPrefix: string,
): ProcessedEffectBase[] {
  return entity.effects.map((effect: EntityEffect, index) => {
    const effectId = `${entity.id}-${entityPrefix}-effect-${index}`;

    const baseProcessedEffect = {
      id: effectId,
      type: effect.type,
      name: effect.name,
    };

    switch (effect.type) {
      case 'passive_modifyAbilityScore':
        return {
          ...baseProcessedEffect,
          requiresChoice: true,
          choices: (effect as any).choices,
          maxScore: (effect as any).maxScore,
          description: effect.description,
          selected: effectChoices[effectId] || [],
        } as ProcessedEffectBase;

      case 'passive_providesFeat':
        return {
          ...baseProcessedEffect,
          requiresChoice: (effect as any).selection?.mode !== 'specific',
          selection: (effect as any).selection,
          description: effect.description,
          selected:
            effectChoices[effectId] ||
            ((effect as any).selection?.mode === 'specific'
              ? (effect as any).selection.feats[0]
              : null),
        } as ProcessedEffectBase;

      case 'passive_grantProficiency':
        const profEffect = effect as any;

        const isOriginEffect =
          effectId.includes('-origin-effect-') && effectId.split('-origin-effect-')[0].length > 0;

        if (profEffect.on === 'initiative') {
          return {
            ...baseProcessedEffect,
            requiresChoice: false,
            description: effect.description,
            proficiencyType: profEffect.on,
            selected: null,
          } as ProcessedEffectBase;
        } else if (profEffect.proficiencies && Array.isArray(profEffect.proficiencies)) {
          return {
            ...baseProcessedEffect,
            requiresChoice: false,
            description: effect.description,
            proficiencyType: profEffect.on || 'skill',
            proficiencies: profEffect.proficiencies,
            selected: effectChoices[effectId] || profEffect.proficiencies,
          } as ProcessedEffectBase;
        } else {
          const hasPreSelectedChoices =
            effectChoices[effectId] &&
            Array.isArray(effectChoices[effectId]) &&
            effectChoices[effectId].length > 0;

          const isChoiceRequired =
            !isOriginEffect &&
            !hasPreSelectedChoices &&
            profEffect.choose &&
            profEffect.choose.count !== 'all' &&
            profEffect.choose.count > 0;

          return {
            ...baseProcessedEffect,

            requiresChoice: isChoiceRequired,
            description: effect.description,
            proficiencyType: profEffect.on || 'skill',
            choose: profEffect.choose,

            selected: effectChoices[effectId] || [],

            isOriginEffect: isOriginEffect,
          } as ProcessedEffectBase;
        }

      default:
        return {
          ...baseProcessedEffect,
          requiresChoice: false,
          description: effect.description,
          selected: null,
        } as ProcessedEffectBase;
    }
  });
}


export function processOriginEffects(
  origin: OriginType,
  effectChoices: EffectChoices,
): ProcessedEffectBase[] {
  return processEntityEffects(origin, effectChoices, 'origin');
}


export function processFeatEffects(
  feat: FeatType,
  effectChoices: EffectChoices,
): ProcessedEffectBase[] {
  return processEntityEffects(feat, effectChoices, 'feat');
}


export function areAllEffectsSelected(processedEffects: ProcessedEffectBase[]): boolean {
  return processedEffects
    .filter((effect) => effect.requiresChoice)
    .every((effect) => {
      if (effect.type === 'passive_grantProficiency') {
        const profEffect = effect as any;

        if (
          (profEffect.proficiencies && Array.isArray(profEffect.proficiencies)) ||
          (profEffect.choose && profEffect.choose.count === 'all')
        ) {
          return true;
        }
      }

      if (Array.isArray(effect.selected)) {
        if (effect.type === 'passive_modifyAbilityScore') {
          const totalPoints = getTotalAllowedPoints(effect);
          const distributedPoints = getDistributedPoints(effect.selected);
          return distributedPoints === totalPoints;
        }

        if (effect.type === 'passive_grantProficiency') {
          const profEffect = effect as any;
          if (profEffect.choose) {
            const requiredCount =
              typeof profEffect.choose.count === 'number' ? profEffect.choose.count : 0;
            return effect.selected.length >= requiredCount;
          }
        }

        return effect.selected.length > 0;
      }
      return effect.selected != null;
    });
}


export function getTotalAllowedPoints(effect: ProcessedEffectBase): number {
  const effectAny = effect as any;
  if (effect.type !== 'passive_modifyAbilityScore' || !effectAny.choices) {
    return 0;
  }

  const firstChoice = effectAny.choices[0];
  if (!firstChoice || !firstChoice.pick) {
    return 0;
  }

  return typeof firstChoice.pick.amount === 'number' ? firstChoice.pick.amount : 3;
}


export function getDistributedPoints(selected: string[]): number {
  if (!selected) return 0;
  return selected.length;
}


export function isValidDistribution(
  selected: string[],
  totalPoints: number,
  maxPerAttribute: number = 3,
): boolean {
  if (!selected) return false;

  const counts: Record<string, number> = {};
  selected.forEach((attr) => {
    counts[attr] = (counts[attr] || 0) + 1;
  });

  return (
    selected.length <= totalPoints &&
    Object.values(counts).every((count) => count <= maxPerAttribute)
  );
}
