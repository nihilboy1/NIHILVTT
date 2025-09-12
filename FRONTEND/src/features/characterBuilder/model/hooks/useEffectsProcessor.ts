import { useState, useCallback } from 'react';
import {
  processOriginEffects as processOriginEffectsUtil,
  processFeatEffects as processFeatEffectsUtil,
  areAllEffectsSelected as checkEffectsSelected,
  getTotalAllowedPoints,
} from '@/utils/effectProcessor';
import { OriginType, FeatType } from '@nihilvtt/datamodeling/domain';
import { PHB2024ORIGINS, PHB2024FEATS } from '@nihilvtt/datamodeling/data';
import { EffectChoices, ProcessedEffect } from '../../types/effectTypes';

export function useEffectsProcessor() {
  // Estado para armazenar as escolhas do usuário para os efeitos
  const [effectChoices, setEffectChoices] = useState<EffectChoices>({});

  // Função genérica para pré-processar efeitos automáticos
  const preProcessEffects = useCallback(
    (entity: { id: string; effects: any[] }, entityPrefix: string) => {
      const updatedEffectChoices = { ...effectChoices };

      entity.effects.forEach((effect, index) => {
        const effectId = `${entity.id}-${entityPrefix}-effect-${index}`;

        // Verifica se este efeito já foi processado
        if (updatedEffectChoices[effectId]) {
          return;
        }

        // Para efeitos de proficiência, verifica se há escolha real
        if (effect.type === 'passive_grantProficiency') {
          // Conversão segura para acessar as propriedades
          const profEffect = effect as unknown as {
            type: string;
            proficiencies?: string[];
            choose?: { count: number | 'all'; from: string[] };
            on?: string;
          };

          // Caso 1: Proficiências fixas diretamente especificadas no efeito
          if (profEffect.proficiencies && Array.isArray(profEffect.proficiencies)) {
            updatedEffectChoices[effectId] = [...profEffect.proficiencies];
          }
          // Caso 2: Verifica se há escolha real em 'choose'
          else if (profEffect.choose && Array.isArray(profEffect.choose.from)) {
            const { count, from } = profEffect.choose;

            // Se count === 'all' ou count === from.length, não há escolha real
            if (count === 'all' || (typeof count === 'number' && count >= from.length)) {
              // Automaticamente seleciona todas as opções disponíveis
              updatedEffectChoices[effectId] = [...from];
            }
            // Se count < from.length, há escolha real - deixa para o usuário decidir
            // Não pré-seleciona nada neste caso
          }
        }
      });

      return updatedEffectChoices;
    },
    [effectChoices],
  );

  // Função genérica para adicionar onSelect aos efeitos processados
  const addSelectHandlers = useCallback((processedEffects: any[]): ProcessedEffect[] => {
    return processedEffects.map((effect) => ({
      ...effect,
      onSelect: (choice: any) => {
        // Para efeitos de atributos, valida a distribuição de pontos antes de atualizar
        if (effect.type === 'passive_modifyAbilityScore') {
          const totalPoints = getTotalAllowedPoints(effect);

          // Se a nova escolha excede os pontos disponíveis, valida conforme regras de atributos
          if (Array.isArray(choice) && choice.length > totalPoints) {
            // Não permite mais pontos que o disponível
            return;
          }
        }

        setEffectChoices((prev) => ({ ...prev, [effect.id]: choice }));
      },
    })) as ProcessedEffect[];
  }, []);

  // Função para processar os efeitos de uma origem
  const processOriginEffects = useCallback(
    (origin: OriginType): ProcessedEffect[] => {
      const updatedEffectChoices = preProcessEffects(origin, 'origin');

      // Se houver novas escolhas automáticas, atualiza o estado
      if (Object.keys(updatedEffectChoices).length > Object.keys(effectChoices).length) {
        setEffectChoices(updatedEffectChoices);
      }

      // Usa a função base do effectProcessor.ts para processar os efeitos
      const processedEffects = processOriginEffectsUtil(origin, updatedEffectChoices);

      // Adiciona a função onSelect a cada efeito
      return addSelectHandlers(processedEffects);
    },
    [effectChoices, preProcessEffects, addSelectHandlers],
  );

  // Função para processar os efeitos de um talento
  const processFeatEffects = useCallback(
    (feat: FeatType): ProcessedEffect[] => {
      const updatedEffectChoices = preProcessEffects(feat, 'feat');

      // Se houver novas escolhas automáticas, atualiza o estado
      if (Object.keys(updatedEffectChoices).length > Object.keys(effectChoices).length) {
        setEffectChoices(updatedEffectChoices);
      }

      // Usa a função base do effectProcessor.ts para processar os efeitos
      const processedEffects = processFeatEffectsUtil(feat, updatedEffectChoices);

      // Adiciona a função onSelect a cada efeito
      return addSelectHandlers(processedEffects);
    },
    [effectChoices, preProcessEffects, addSelectHandlers],
  );

  // Verifica se todos os efeitos que requerem escolha foram selecionados
  const areAllEffectsSelected = useCallback((processedEffects: ProcessedEffect[]) => {
    // Usa a função base do effectProcessor.ts
    return checkEffectsSelected(processedEffects);
  }, []);

  // Reinicia as escolhas de efeitos
  const resetEffectChoices = useCallback(() => {
    setEffectChoices({});
  }, []);

  // Distribuição de pontos para efeitos de atributos
  const distributeAbilityPoints = useCallback(
    (effectId: string, attribute: string, points: number = 1) => {
      // Obtém a distribuição atual
      const currentDistribution = [...((effectChoices[effectId] as string[]) || [])];

      // Busca o efeito correspondente para obter o total de pontos permitidos
      const origin = PHB2024ORIGINS.find((o) =>
        o.effects.some(
          (_effect: any, index: number) => `${o.id}-origin-effect-${index}` === effectId,
        ),
      );
      const feat = PHB2024FEATS.find((f) =>
        f.effects.some(
          (_effect: any, index: number) => `${f.id}-feat-effect-${index}` === effectId,
        ),
      );

      const entity = origin || feat;
      if (!entity) return;

      const effectIndex = parseInt(effectId.split('-effect-')[1] || '0');
      const effect = entity.effects[effectIndex];

      if (!effect || effect.type !== 'passive_modifyAbilityScore') return;

      // Obter o total permitido
      const choice = effect.choices[0];
      const totalAllowedPoints = typeof choice.pick.amount === 'number' ? choice.pick.amount : 3;

      // Verificar se ainda pode adicionar mais pontos
      if (currentDistribution.length >= totalAllowedPoints) {
        return; // Já atingiu o limite total
      }

      // Calcular quantos pontos já foram adicionados para este atributo
      const attributeCount = currentDistribution.filter((attr) => attr === attribute).length;
      const maxPerAttribute = 3; // Máximo de pontos por atributo (default)

      // Verificar se atingiu o limite por atributo
      if (attributeCount >= maxPerAttribute) {
        return; // Já atingiu o limite por atributo
      }

      // Adiciona o atributo selecionado N vezes conforme pontos
      // mas respeitando o limite total e o limite por atributo
      for (
        let i = 0;
        i < points &&
        currentDistribution.length < totalAllowedPoints &&
        attributeCount + i < maxPerAttribute;
        i++
      ) {
        currentDistribution.push(attribute);
      }

      // Atualiza a distribuição
      setEffectChoices((prev) => ({ ...prev, [effectId]: currentDistribution }));
    },
    [effectChoices],
  );

  // Remove pontos de um atributo
  const removeAbilityPoints = useCallback(
    (effectId: string, attribute: string, points: number = 1) => {
      const currentDistribution = [...((effectChoices[effectId] as string[]) || [])];

      // Remove N ocorrências do atributo
      for (let i = 0; i < points; i++) {
        const index = currentDistribution.lastIndexOf(attribute);
        if (index !== -1) {
          currentDistribution.splice(index, 1);
        }
      }

      setEffectChoices((prev) => ({ ...prev, [effectId]: currentDistribution }));
    },
    [effectChoices],
  );

  // Contagem de pontos por atributo
  const getAttributePointCount = useCallback(
    (effectId: string, attribute: string) => {
      const distribution = (effectChoices[effectId] as string[]) || [];
      return distribution.filter((attr: string) => attr === attribute).length;
    },
    [effectChoices],
  );

  // Adiciona proficiência selecionada
  const chooseProficiency = useCallback(
    (effectId: string, proficiency: string) => {
      // Obtém as escolhas atuais para este efeito
      const currentProficiencies = (effectChoices[effectId] as string[]) || [];

      // Adiciona a nova proficiência à lista se ela ainda não estiver presente
      if (!currentProficiencies.includes(proficiency)) {
        const updatedProficiencies = [...currentProficiencies, proficiency];

        // Atualiza as escolhas
        setEffectChoices((prev) => ({
          ...prev,
          [effectId]: updatedProficiencies,
        }));
      }
    },
    [effectChoices],
  );

  // Remove proficiência selecionada
  const removeProficiency = useCallback(
    (effectId: string, proficiency: string) => {
      // Obtém as escolhas atuais para este efeito
      const currentProficiencies = (effectChoices[effectId] as string[]) || [];

      // Remove a proficiência da lista
      const updatedProficiencies = currentProficiencies.filter((p) => p !== proficiency);

      // Atualiza as escolhas
      setEffectChoices((prev) => ({
        ...prev,
        [effectId]: updatedProficiencies,
      }));
    },
    [effectChoices],
  );

  // Verifica se já selecionou o número correto de proficiências para um efeito
  const areAllProficienciesSelected = useCallback(
    (effectId: string, totalRequired: number) => {
      const selectedProficiencies = (effectChoices[effectId] as string[]) || [];
      return selectedProficiencies.length >= totalRequired;
    },
    [effectChoices],
  );

  // Retorna o objeto com todas as funções e estados
  return {
    processOriginEffects,
    processFeatEffects,
    effectChoices,
    setEffectChoices,
    areAllEffectsSelected,
    resetEffectChoices,
    distributeAbilityPoints,
    removeAbilityPoints,
    getAttributePointCount,
    chooseProficiency,
    removeProficiency,
    areAllProficienciesSelected,
    selectedChoices: effectChoices,
  };
}
