import { useState, useCallback } from 'react';
import {
  processOriginEffects as processEffects,
  areAllEffectsSelected as checkEffectsSelected,
  getTotalAllowedPoints,
} from '@/utils/effectProcessor';
import { OriginType } from '@nihilvtt/datamodeling/domain';
import { PHB2024ORIGINS } from '@nihilvtt/datamodeling/data';
import { EffectChoices, ProcessedEffect } from '../../types/effectTypes';

export function useEffectsProcessor() {
  // Estado para armazenar as escolhas do usuário para os efeitos
  const [effectChoices, setEffectChoices] = useState<EffectChoices>({});

  // Função para processar os efeitos de uma origem
  const processOriginEffects = useCallback(
    (origin: OriginType): ProcessedEffect[] => {
      // Pré-processa os efeitos de proficiência fixa, adicionando-os ao effectChoices
      const updatedEffectChoices = { ...effectChoices };

      // Proficiências fixas para cada origem
      const fixedOriginProficiencies: Record<string, string[]> = {
        // Adicione aqui as proficiências fixas para cada origem
        acolyte: ['insight', 'religion'],
        charlatan: ['deception', 'sleightOfHand'],
        criminal: ['deception', 'stealth'],
        entertainer: ['acrobatics', 'performance'],
        folkhero: ['animalHandling', 'survival'],
        gladiator: ['acrobatics', 'performance'],
        guildartisan: ['insight', 'persuasion'],
        hermit: ['medicine', 'religion'],
        knight: ['history', 'persuasion'],
        noble: ['history', 'persuasion'],
        outlander: ['athletics', 'survival'],
        pirate: ['athletics', 'perception'],
        sage: ['arcana', 'history'],
        sailor: ['athletics', 'perception'],
        soldier: ['athletics', 'intimidation'],
        urchin: ['sleightOfHand', 'stealth'],
        // Adicione outras origens conforme necessário
      };

      origin.effects.forEach((effect, index) => {
        const effectId = `${origin.id}-effect-${index}`;

        // Para origens, SEMPRE tratar proficiências como fixas, sem necessidade de escolha
        // Este é um componente especial para origens, então vamos pré-selecionar as proficiências automaticamente
        if (effect.type === 'passive_grantProficiency') {
          // Conversão segura para acessar as propriedades
          const profEffect = effect as unknown as {
            type: string;
            proficiencies?: string[];
            choose?: { count: number | 'all'; from: string[] };
            on?: string;
          };

          // Caso 1: Se temos proficiências fixas pré-definidas para esta origem específica
          if (fixedOriginProficiencies[origin.id] && !updatedEffectChoices[effectId]) {
            updatedEffectChoices[effectId] = [...fixedOriginProficiencies[origin.id]];
          }
          // Caso 2: Proficiências fixas diretamente especificadas no efeito
          else if (
            profEffect.proficiencies &&
            Array.isArray(profEffect.proficiencies) &&
            !updatedEffectChoices[effectId]
          ) {
            updatedEffectChoices[effectId] = [...profEffect.proficiencies];
          }
          // Caso 3: Proficiências 'choose' - em origens, sempre vamos pré-selecionar
          else if (
            profEffect.choose &&
            Array.isArray(profEffect.choose.from) &&
            !updatedEffectChoices[effectId]
          ) {
            if (profEffect.choose.count === 'all') {
              // Seleciona todas
              updatedEffectChoices[effectId] = [...profEffect.choose.from];
            } else if (typeof profEffect.choose.count === 'number') {
              // Seleciona as primeiras N proficiências da lista (pré-seleção automática)
              updatedEffectChoices[effectId] = [
                ...profEffect.choose.from.slice(0, profEffect.choose.count),
              ];
            }
          }
        }
      });

      // Se houver novas escolhas automáticas, atualiza o estado
      if (Object.keys(updatedEffectChoices).length > Object.keys(effectChoices).length) {
        setEffectChoices(updatedEffectChoices);
      }

      // Usa a função base do effectProcessor.ts para processar os efeitos
      const processedEffects = processEffects(origin, updatedEffectChoices);

      // Adiciona a função onSelect a cada efeito
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
    },
    [effectChoices],
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
        o.effects.some((_effect: any, index: number) => `${o.id}-effect-${index}` === effectId),
      );

      if (!origin) return;

      const effectIndex = parseInt(effectId.split('-').pop() || '0');
      const effect = origin.effects[effectIndex];

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
