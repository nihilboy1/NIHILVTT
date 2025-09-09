import { OriginType } from '@nihilvtt/datamodeling/domain';
import { EffectChoices } from '../features/characterBuilder/types/effectTypes';

// Interface ampliada para o efeito de uma origem, com tipagem genérica
interface OriginEffect {
  type: string;
  name: string;
  description?: string;
  [key: string]: any; // Para acessar outras propriedades de maneira segura
}

// Criamos um tipo interno para os efeitos processados sem a propriedade onSelect
// Isso evita problemas de tipagem quando usamos essa função em diferentes contextos
type ProcessedEffectBase = {
  id: string;
  type: string;
  name: string;
  description?: string;
  requiresChoice: boolean;
  selected: any;
  [key: string]: any;
};

/**
 * Processa os efeitos de uma origem e retorna os efeitos processados
 * @param origin - Origem a ser processada
 * @param effectChoices - Escolhas atuais dos efeitos
 * @returns Array de efeitos processados
 */
export function processOriginEffects(
  origin: OriginType,
  effectChoices: EffectChoices,
): ProcessedEffectBase[] {
  return origin.effects.map((effect: OriginEffect, index) => {
    const effectId = `${origin.id}-effect-${index}`;

    // Base comum para todos os efeitos processados
    const baseProcessedEffect = {
      id: effectId,
      type: effect.type,
      name: effect.name,
    };

    switch (effect.type) {
      case 'passive_modifyAbilityScore':
        // Efeito que modifica os atributos
        return {
          ...baseProcessedEffect,
          requiresChoice: true, // Usuário precisa escolher quais atributos melhorar
          choices: (effect as any).choices,
          maxScore: (effect as any).maxScore,
          description: effect.description,
          selected: effectChoices[effectId] || [],
        } as ProcessedEffectBase;

      case 'passive_providesFeat':
        // Efeito que fornece um talento
        return {
          ...baseProcessedEffect,
          requiresChoice: (effect as any).selection?.mode !== 'specific', // Só requer escolha se não for específico
          selection: (effect as any).selection,
          description: effect.description,
          selected:
            effectChoices[effectId] ||
            ((effect as any).selection?.mode === 'specific'
              ? (effect as any).selection.feats[0]
              : null),
        } as ProcessedEffectBase;

      case 'passive_grantProficiency':
        // Efeito que concede proficiência
        // Usamos o typecast para acessar as propriedades de forma segura
        const profEffect = effect as any;

        // Verifica se este é um efeito de uma origem (baseado no ID do efeito)
        const isOriginEffect =
          effectId.includes('-effect-') && effectId.split('-effect-')[0].length > 0;

        if (profEffect.on === 'initiative') {
          return {
            ...baseProcessedEffect,
            requiresChoice: false,
            description: effect.description,
            proficiencyType: profEffect.on,
            selected: null,
          } as ProcessedEffectBase;
        } else if (profEffect.proficiencies && Array.isArray(profEffect.proficiencies)) {
          // Caso de proficiências fixas diretamente definidas (sem escolha)
          return {
            ...baseProcessedEffect,
            requiresChoice: false, // Não requer escolha do usuário
            description: effect.description,
            proficiencyType: profEffect.on || 'skill',
            proficiencies: profEffect.proficiencies,
            selected: effectChoices[effectId] || profEffect.proficiencies,
          } as ProcessedEffectBase;
        } else {
          // Se já temos escolhas pré-selecionadas (comum em origens)
          const hasPreSelectedChoices =
            effectChoices[effectId] &&
            Array.isArray(effectChoices[effectId]) &&
            effectChoices[effectId].length > 0;

          // Para origens, NUNCA requer escolha do usuário, mesmo com "choose"
          // Verificamos se é um efeito de origem e já tem escolhas pré-selecionadas
          const isChoiceRequired =
            !isOriginEffect && // Se não é origem
            !hasPreSelectedChoices && // Se não tem escolhas pré-selecionadas
            profEffect.choose && // Se tem opção de escolha
            profEffect.choose.count !== 'all' && // Se não é 'all'
            profEffect.choose.count > 0; // Se requer escolher algo

          return {
            ...baseProcessedEffect,
            // Para origens, NUNCA requer escolha do usuário
            requiresChoice: isChoiceRequired,
            description: effect.description,
            proficiencyType: profEffect.on || 'skill',
            choose: profEffect.choose,
            // Usa as escolhas pré-selecionadas se disponíveis
            selected: effectChoices[effectId] || [],
            // Indica que é um efeito de origem para referência posterior
            isOriginEffect: isOriginEffect,
          } as ProcessedEffectBase;
        }

      default:
        // Para outros tipos de efeito que possam ser adicionados no futuro
        return {
          ...baseProcessedEffect,
          requiresChoice: false,
          description: effect.description,
          selected: null,
        } as ProcessedEffectBase;
    }
  });
}

/**
 * Verifica se todos os efeitos que requerem escolha foram selecionados
 * @param processedEffects - Efeitos processados a serem verificados
 * @returns true se todos os efeitos estão selecionados, false caso contrário
 */
export function areAllEffectsSelected(processedEffects: ProcessedEffectBase[]): boolean {
  return processedEffects
    .filter((effect) => effect.requiresChoice)
    .every((effect) => {
      // Proficiências fixas sempre são consideradas como selecionadas
      if (effect.type === 'passive_grantProficiency') {
        const profEffect = effect as any;
        // Se tem proficiências fixas definidas ou escolha com count === 'all'
        if (
          (profEffect.proficiencies && Array.isArray(profEffect.proficiencies)) ||
          (profEffect.choose && profEffect.choose.count === 'all')
        ) {
          return true;
        }
      }

      if (Array.isArray(effect.selected)) {
        // Para efeitos que requerem seleção múltipla
        if (effect.type === 'passive_modifyAbilityScore') {
          // Verificação especial para modificação de atributos
          // Precisamos verificar se todos os pontos foram distribuídos
          const totalPoints = getTotalAllowedPoints(effect);
          const distributedPoints = getDistributedPoints(effect.selected);
          return distributedPoints === totalPoints;
        }

        // Para outros efeitos com seleção múltipla, verifica se há pelo menos uma escolha
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

/**
 * Obtém o total de pontos permitidos para distribuição em um efeito de atributo
 * @param effect - Efeito processado de modificação de atributo
 * @returns Total de pontos permitidos
 */
export function getTotalAllowedPoints(effect: ProcessedEffectBase): number {
  const effectAny = effect as any;
  if (effect.type !== 'passive_modifyAbilityScore' || !effectAny.choices) {
    return 0;
  }

  // Assume que o primeiro choice contém a quantidade de pontos
  const firstChoice = effectAny.choices[0];
  if (!firstChoice || !firstChoice.pick) {
    return 0;
  }

  return typeof firstChoice.pick.amount === 'number' ? firstChoice.pick.amount : 3; // Padrão é 3 pontos
}

/**
 * Calcula a quantidade total de pontos já distribuídos
 * @param selected - Array de seleções no formato [atributo1, atributo1, atributo2] (pode ter repetições)
 * @returns Total de pontos distribuídos
 */
export function getDistributedPoints(selected: string[]): number {
  if (!selected) return 0;
  return selected.length;
}

/**
 * Verifica se a distribuição de pontos é válida
 * @param selected - Array de atributos selecionados
 * @param totalPoints - Total de pontos disponíveis
 * @param maxPerAttribute - Máximo de pontos por atributo
 * @returns true se a distribuição é válida, false caso contrário
 */
export function isValidDistribution(
  selected: string[],
  totalPoints: number,
  maxPerAttribute: number = 3,
): boolean {
  if (!selected) return false;

  // Conta a ocorrência de cada atributo
  const counts: Record<string, number> = {};
  selected.forEach((attr) => {
    counts[attr] = (counts[attr] || 0) + 1;
  });

  // Verifica se algum atributo excede o máximo permitido
  return (
    selected.length <= totalPoints && // Não excede o total de pontos
    Object.values(counts).every((count) => count <= maxPerAttribute) // Não excede o máximo por atributo
  );
}
