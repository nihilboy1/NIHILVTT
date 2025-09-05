import { useState, useEffect } from 'react';

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

  // Calcula os pontos gastos baseado nos atributos atuais
  const calculateUsedPoints = (attrs: Attributes) => {
    return Object.values(attrs).reduce(
      (total, value) => total + ATTRIBUTE_COST[value as keyof typeof ATTRIBUTE_COST],
      0,
    );
  };

  // Atualiza os pontos restantes quando os atributos mudam
  useEffect(() => {
    const usedPoints = calculateUsedPoints(attributes);
    setRemainingPoints(27 - usedPoints);
    onChange(attributes);
  }, [attributes, onChange]);

  // Handler para alteração de atributo
  const handleAttributeChange = (attributeId: keyof Attributes, newValue: number) => {
    // Primeiro verifica se a mudança é possível com os pontos disponíveis
    const oldValue = attributes[attributeId];
    const oldCost = ATTRIBUTE_COST[oldValue as keyof typeof ATTRIBUTE_COST];
    const newCost = ATTRIBUTE_COST[newValue as keyof typeof ATTRIBUTE_COST];
    const pointDifference = newCost - oldCost;

    // Se aumentar o atributo, verifica se há pontos suficientes
    if (newValue > oldValue && pointDifference > remainingPoints) {
      return; // Não há pontos suficientes para essa alteração
    }

    setAttributes((prev) => ({
      ...prev,
      [attributeId]: newValue,
    }));
  };

  // Limpa a seleção voltando para os valores padrão
  const handleReset = () => {
    setAttributes(DEFAULT_ATTRIBUTES);
  };

  return {
    attributes,
    remainingPoints,
    handleAttributeChange,
    handleReset,
  };
}
