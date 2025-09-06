import { useState, useEffect, useRef } from 'react';

import {
  Attributes,
  ATTRIBUTE_COST,
  DEFAULT_ATTRIBUTES,
} from '@/shared/constants/characterData/attributes';

export function usePointBuy(
  initialAttributes: Attributes,
  onChange: (attributes: Attributes) => void,
) {
  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);
  const [remainingPoints, setRemainingPoints] = useState(27);

  // Referência para controlar mudanças internas vs. externas
  const isInternalChange = useRef(false);
  const lastAttributesRef = useRef<Attributes>(initialAttributes);

  // Quando o initialAttributes muda de fora, atualizamos o estado apenas se não for devido à mudança interna
  useEffect(() => {
    if (
      !isInternalChange.current &&
      JSON.stringify(initialAttributes) !== JSON.stringify(lastAttributesRef.current)
    ) {
      setAttributes(initialAttributes);
      lastAttributesRef.current = initialAttributes;

      // Atualizamos também os pontos restantes
      const usedPoints = calculateUsedPoints(initialAttributes);
      setRemainingPoints(27 - usedPoints);
    }
  }, [initialAttributes]);

  // Calcula os pontos gastos baseado nos atributos atuais
  const calculateUsedPoints = (attrs: Attributes) => {
    return Object.values(attrs).reduce((total, value) => {
      // Garantimos que o valor é um número válido
      if (typeof value !== 'number' || isNaN(value)) {
        return total;
      }
      // Restringimos os valores entre 8 e 15 para segurança
      const safeValue = Math.max(8, Math.min(15, value));
      return total + (ATTRIBUTE_COST[safeValue as keyof typeof ATTRIBUTE_COST] || 0);
    }, 0);
  };

  // Handler para alteração de atributo
  const handleAttributeChange = (attributeId: keyof Attributes, newValue: number) => {
    // Garantir que o valor é um número válido
    if (typeof newValue !== 'number' || isNaN(newValue)) {
      console.error('Valor inválido para atributo:', newValue);
      return;
    }

    // Restringir aos limites válidos (8-15)
    const validNewValue = Math.max(8, Math.min(15, newValue));

    // Verifica se o valor já é o mesmo para evitar atualizações desnecessárias
    if (attributes[attributeId] === validNewValue) {
      return;
    }

    // Primeiro verifica se a mudança é possível com os pontos disponíveis
    const oldValue = attributes[attributeId];
    const safeOldValue = typeof oldValue === 'number' && !isNaN(oldValue) ? oldValue : 8;
    const oldCost = ATTRIBUTE_COST[safeOldValue as keyof typeof ATTRIBUTE_COST] || 0;
    const newCost = ATTRIBUTE_COST[validNewValue as keyof typeof ATTRIBUTE_COST] || 0;
    const pointDifference = newCost - oldCost;

    // Se aumentar o atributo, verifica se há pontos suficientes
    if (validNewValue > safeOldValue && pointDifference > remainingPoints) {
      return; // Não há pontos suficientes para essa alteração
    }

    // Marcamos que é uma mudança interna
    isInternalChange.current = true;

    // Atualiza os atributos
    const newAttributes: Attributes = {
      strength: attributes.strength,
      dexterity: attributes.dexterity,
      constitution: attributes.constitution,
      intelligence: attributes.intelligence,
      wisdom: attributes.wisdom,
      charisma: attributes.charisma,
      [attributeId]: validNewValue,
    };

    setAttributes(newAttributes);
    lastAttributesRef.current = newAttributes;

    // Atualiza os pontos restantes
    const usedPoints = calculateUsedPoints(newAttributes);
    setRemainingPoints(27 - usedPoints);

    // Notifica o componente pai
    onChange(newAttributes);

    // Reseta a flag após a atualização
    setTimeout(() => {
      isInternalChange.current = false;
    }, 0);
  };

  // Limpa a seleção voltando para os valores padrão
  const handleReset = () => {
    // Marcamos que é uma mudança interna
    isInternalChange.current = true;

    // Reseta os atributos
    setAttributes(DEFAULT_ATTRIBUTES);
    lastAttributesRef.current = DEFAULT_ATTRIBUTES;

    // Reseta os pontos restantes
    setRemainingPoints(27);

    // Notifica o componente pai
    onChange(DEFAULT_ATTRIBUTES);

    // Reseta a flag após a atualização
    setTimeout(() => {
      isInternalChange.current = false;
    }, 0);
  };

  return {
    attributes,
    remainingPoints,
    handleAttributeChange,
    handleReset,
  };
}
