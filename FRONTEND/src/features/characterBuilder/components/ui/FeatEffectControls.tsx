import { cn } from '@/shared/lib/utils/cn';

import { useCharacterBuilderEffectsProcessor } from '../../model/context/effectsProcessorContext';
import { getFeatById } from '../../schemas/characterBuilderSchema';
import { proficiencyTagVariants } from '../../styles';
import { ProcessedEffect } from '../../types/effectTypes';

import { Badge } from './Badge';

interface FeatEffectControlsProps {
  effect: ProcessedEffect & {
    selection?: {
      mode: 'specific' | 'choose';
      feats: string[];
    };
  };
}

export function FeatEffectControls({ effect }: FeatEffectControlsProps) {
  const { chooseFeat, removeFeat, selectedChoices } = useCharacterBuilderEffectsProcessor();

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
              <div
                key={featId}
                className="border-feedback-positive/50 bg-feedback-positive/10 rounded-lg border p-3"
              >
                <div className="mb-2 flex items-start gap-2">
                  <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
                    {featName}
                  </Badge>
                </div>
                <p className="text-text-secondary mb-2 text-sm">{feat.description}</p>

                {/* Mostra traits do talento */}
                {feat.traits && feat.traits.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-text-secondary text-xs font-medium">Benefícios:</div>
                    {feat.traits.map((trait, index) => (
                      <div key={index} className="border-surface-3 bg-surface-0 rounded border p-2">
                        <div className="text-text-primary text-xs font-medium">{trait.name}</div>
                        <div className="text-text-secondary mt-1 text-xs">{trait.description}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Mostra efeitos do talento */}
                {feat.effects && feat.effects.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="text-text-secondary text-xs font-medium">Efeitos:</div>
                    {feat.effects.map((featEffect, index) => (
                      <div key={index} className="border-info/50 bg-info/10 rounded border p-2">
                        <div className="text-info text-xs font-medium">
                          {featEffect.name || `Efeito ${index + 1}`}
                        </div>
                        {featEffect.description && (
                          <div className="text-info mt-1 text-xs">{featEffect.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-text-secondary mt-2 text-xs">
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
            <span className="text-info ml-2">
              ({remainingSelections} restante{remainingSelections > 1 ? 's' : ''})
            </span>
          ) : (
            <span className="text-feedback-positive ml-2">(Selecionado)</span>
          )}
        </div>

        <div className="space-y-2">
          {feats.map((featId) => {
            const feat = getFeatById(featId);
            if (!feat) return null;

            const isSelected = selectedFeats.includes(featId);
            const featName = Array.isArray(feat.name) ? feat.name[0] : feat.name;

            return (
              <button
                key={featId}
                type="button"
                className={cn(
                  'cursor-pointer rounded-lg border p-3 transition-colors',
                  isSelected
                    ? 'border-accent-secondary bg-accent-secondary/15'
                    : remainingSelections > 0
                      ? 'border-surface-3 bg-surface-0 hover:border-accent-secondary/60 hover:bg-accent-secondary/10'
                      : 'border-surface-3 bg-surface-1/70 cursor-not-allowed opacity-50',
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
                    <div className="text-text-primary font-medium">{featName}</div>
                    <div className="text-text-secondary text-sm">{feat.description}</div>
                  </div>
                  {isSelected && (
                    <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
                      Selecionado
                    </Badge>
                  )}
                </div>

                {/* Preview dos benefícios principais */}
                {feat.traits && feat.traits.length > 0 && (
                  <div className="text-text-secondary text-xs">
                    <strong>Benefícios:</strong> {feat.traits[0].name}
                    {feat.traits.length > 1 && ` (+${feat.traits.length - 1} outros)`}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
