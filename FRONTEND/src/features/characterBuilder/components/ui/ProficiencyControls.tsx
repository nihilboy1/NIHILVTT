import React from 'react';
import { ProcessedEffect } from '../../types/effectTypes';
import { Badge } from './Badge';
import { getSkillNameTranslation } from '../../lib/translationHelpers';
import { cn } from '@/shared/lib/utils/cn';
import { proficiencyTagVariants, selectionButtonVariants } from '../../styles';
import { useEffectsProcessor } from '../../model/hooks/useEffectsProcessor';

interface ProficiencyControlsProps {
  effect: ProcessedEffect & {
    proficiencyType?: string;
    choose?: {
      from: string[];
      count: number | 'all';
    };
    on?: string;
    proficiencies?: string[];
  };
}

export const ProficiencyControls: React.FC<ProficiencyControlsProps> = ({ effect }) => {
  const { chooseProficiency, removeProficiency, selectedChoices } = useEffectsProcessor();

  // Verifica se é uma proficiência em iniciativa (caso especial)
  if (effect.proficiencyType === 'skill' && effect.on === 'initiative') {
    return (
      <div className="mt-2">
        <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
          Proficiência em Iniciativa
        </Badge>
        <p className="mt-1 text-sm text-gray-600">
          Você recebe proficiência em testes de iniciativa.
        </p>
      </div>
    );
  }

  // Se temos proficiências concedidas automaticamente (sem escolha)
  if (effect.proficiencies && (!effect.choose || effect.choose.count === 'all')) {
    return (
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium">Proficiências concedidas automaticamente:</div>
        <div className="flex flex-wrap gap-2">
          {effect.proficiencies.map((prof) => (
            <Badge key={prof} className={cn(proficiencyTagVariants({ state: 'granted' }))}>
              {getSkillNameTranslation(prof)}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Estas proficiências são aplicadas automaticamente ao seu personagem.
        </p>
      </div>
    );
  }

  // Se é uma escolha de proficiências
  if (effect.choose && effect.choose.from) {
    const { from, count } = effect.choose;
    const maxSelections = typeof count === 'number' ? count : from.length;

    // Obtém as escolhas já selecionadas para este efeito
    const selectedProficiencies = (selectedChoices[effect.id] as string[]) || [];
    const remainingSelections = maxSelections - selectedProficiencies.length;

    return (
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium">
          Escolha {maxSelections} proficiência{maxSelections > 1 ? 's' : ''}:
          {remainingSelections > 0 ? (
            <span className="ml-2 text-blue-600">
              ({remainingSelections} restante{remainingSelections > 1 ? 's' : ''})
            </span>
          ) : (
            <span className="ml-2 text-green-600">(Todas selecionadas)</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {from.map((prof) => {
            const isSelected = selectedProficiencies.includes(prof);

            return (
              <button
                key={prof}
                onClick={() => {
                  if (isSelected) {
                    removeProficiency(effect.id, prof);
                  } else if (remainingSelections > 0) {
                    chooseProficiency(effect.id, prof);
                  }
                }}
                className={cn(
                  selectionButtonVariants({
                    state: isSelected
                      ? 'selected'
                      : remainingSelections > 0
                        ? 'available'
                        : 'disabled',
                  }),
                )}
                disabled={!isSelected && remainingSelections === 0}
              >
                {getSkillNameTranslation(prof)}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
