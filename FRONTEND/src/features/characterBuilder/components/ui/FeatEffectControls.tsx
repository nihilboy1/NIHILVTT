import React from 'react';
import { ProcessedEffect } from '../../types/effectTypes';
import { Badge } from './Badge';
import { cn } from '@/shared/lib/utils/cn';
import { proficiencyTagVariants } from '../../styles';
import { useEffectsProcessor } from '../../model/hooks/useEffectsProcessor';
import { getFeatById } from '../../schemas/characterBuilderSchema';

interface FeatEffectControlsProps {
  effect: ProcessedEffect & {
    selection?: {
      mode: 'specific' | 'choose';
      feats: string[];
    };
  };
}

export const FeatEffectControls: React.FC<FeatEffectControlsProps> = ({ effect }) => {
  const { chooseFeat, removeFeat, selectedChoices } = useEffectsProcessor();

  // Se é um talento específico (automaticamente concedido)
  if (effect.selection?.mode === 'specific') {
    return (
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium">Talento concedido automaticamente:</div>
        <div className="space-y-3">
          {effect.selection.feats.map((featId) => {
            const feat = getFeatById(featId);
            if (!feat) return null;

            const featName = Array.isArray(feat.name) ? feat.name[0] : feat.name;

            return (
              <div key={featId} className="rounded-lg border border-green-200 bg-green-50 p-3">
                <div className="mb-2 flex items-start gap-2">
                  <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
                    {featName}
                  </Badge>
                </div>
                <p className="mb-2 text-sm text-gray-700">{feat.description}</p>

                {/* Mostra traits do talento */}
                {feat.traits && feat.traits.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-600">Benefícios:</div>
                    {feat.traits.map((trait, index) => (
                      <div key={index} className="rounded border border-gray-200 bg-white p-2">
                        <div className="text-xs font-medium text-gray-800">{trait.name}</div>
                        <div className="mt-1 text-xs text-gray-600">{trait.description}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mostra efeitos do talento */}
                {feat.effects && feat.effects.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs font-medium text-gray-600">Efeitos:</div>
                    {feat.effects.map((featEffect, index) => (
                      <div key={index} className="rounded border border-blue-200 bg-blue-50 p-2">
                        <div className="text-xs font-medium text-blue-800">
                          {featEffect.name || `Efeito ${index + 1}`}
                        </div>
                        {featEffect.description && (
                          <div className="mt-1 text-xs text-blue-600">{featEffect.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-gray-600">
          Este talento é aplicado automaticamente ao seu personagem.
        </p>
      </div>
    );
  }

  // Se é uma escolha de talentos
  if (effect.selection?.mode === 'choose') {
    const { feats } = effect.selection;
    const maxSelections = 1; // Normalmente 1 talento por escolha

    // Obtém as escolhas já selecionadas para este efeito
    const selectedFeats = (selectedChoices[effect.id] as string[]) || [];
    const remainingSelections = maxSelections - selectedFeats.length;

    return (
      <div className="mt-2">
        <div className="mb-2 text-sm font-medium">
          Escolha {maxSelections} talento{maxSelections > 1 ? 's' : ''}:
          {remainingSelections > 0 ? (
            <span className="ml-2 text-blue-600">
              ({remainingSelections} restante{remainingSelections > 1 ? 's' : ''})
            </span>
          ) : (
            <span className="ml-2 text-green-600">(Selecionado)</span>
          )}
        </div>

        <div className="space-y-2">
          {feats.map((featId) => {
            const feat = getFeatById(featId);
            if (!feat) return null;

            const isSelected = selectedFeats.includes(featId);
            const featName = Array.isArray(feat.name) ? feat.name[0] : feat.name;

            return (
              <div
                key={featId}
                className={cn(
                  'cursor-pointer rounded-lg border p-3 transition-colors',
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : remainingSelections > 0
                      ? 'hover:bg-blue-25 border-gray-200 bg-white hover:border-blue-300'
                      : 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50',
                )}
                onClick={() => {
                  if (isSelected) {
                    removeFeat(effect.id, featId);
                  } else if (remainingSelections > 0) {
                    chooseFeat(effect.id, featId);
                  }
                }}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-gray-800">{featName}</div>
                    <div className="text-sm text-gray-600">{feat.description}</div>
                  </div>
                  {isSelected && (
                    <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
                      Selecionado
                    </Badge>
                  )}
                </div>

                {/* Preview dos benefícios principais */}
                {feat.traits && feat.traits.length > 0 && (
                  <div className="text-xs text-gray-600">
                    <strong>Benefícios:</strong> {feat.traits[0].name}
                    {feat.traits.length > 1 && ` (+${feat.traits.length - 1} outros)`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
