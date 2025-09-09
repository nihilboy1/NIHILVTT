import { useEffect, useState } from 'react';
import { ProcessedEffect } from '../../../../types/effectTypes';
import { PlusCircleIcon, MinimizeIcon } from '@/shared/ui/Icons';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '../../../ui/Button';
import { controlButtonVariants, statusIndicatorVariants } from '@/features/characterBuilder/styles';
import { useEffectsProcessor } from '@/features/characterBuilder/model/hooks/useEffectsProcessor';

interface AbilityScoreControlsProps {
  effect: ProcessedEffect & {
    choices: Array<{
      operation: 'add' | 'set';
      pick: {
        amount: 'any' | number;
        from: Array<string>;
      };
      value: number;
    }>;
  };
}

/**
 * Controles para distribuição de pontos de atributo
 * Extraído do OriginOptionCard para melhor separação de responsabilidades
 */
export function AbilityScoreControls({ effect }: AbilityScoreControlsProps) {
  const { distributeAbilityPoints, removeAbilityPoints, getAttributePointCount, effectChoices } =
    useEffectsProcessor();
  const [, forceUpdate] = useState({});

  const abilityNames: Record<string, string> = {
    strength: 'Força',
    dexterity: 'Destreza',
    constitution: 'Constituição',
    intelligence: 'Inteligência',
    wisdom: 'Sabedoria',
    charisma: 'Carisma',
  };

  const choice = effect.choices[0];
  const { pick, operation, value } = choice;
  const { from, amount } = pick;
  const totalPoints = typeof amount === 'number' ? amount : 3;

  const selectedChoices = effectChoices[effect.id];
  const totalDistributedPoints = Array.isArray(selectedChoices) ? selectedChoices.length : 0;

  const getPointsForAttribute = (ability: string) => {
    return getAttributePointCount(effect.id, ability);
  };

  const canAddMorePoints = totalDistributedPoints < totalPoints;

  const handleAddPoint = (ability: string) => {
    if (canAddMorePoints) {
      distributeAbilityPoints(effect.id, ability, 1);
      forceUpdate({});
    }
  };

  const handleRemovePoint = (ability: string) => {
    if (getPointsForAttribute(ability) > 0) {
      removeAbilityPoints(effect.id, ability, 1);
      forceUpdate({});
    }
  };

  useEffect(() => {
    forceUpdate({});
  }, [effectChoices]);

  return (
    <>
      <p className="text-text-secondary text-sm">
        {operation === 'add' ? 'Adicione' : 'Substitua'} {totalPoints}{' '}
        {totalPoints === 1 ? 'ponto' : 'pontos'} em {value} {value === 1 ? 'atributo' : 'atributos'}{' '}
        ({totalDistributedPoints}/{totalPoints} pontos distribuídos):
      </p>

      <div className="space-y-3">
        {from.map((ability: string) => {
          const pointsForThisAttribute = getPointsForAttribute(ability);
          const hasPoints = pointsForThisAttribute > 0;
          const maxPerAttribute = 3;
          const isMaxed = pointsForThisAttribute >= maxPerAttribute;

          return (
            <div
              key={ability}
              className={cn(
                'flex items-center justify-between rounded-md p-2',
                isMaxed ? 'bg-feedback-warning bg-opacity-20' : 'bg-surface-1',
              )}
            >
              <span className="text-text-primary font-medium">
                {abilityNames[ability] || ability}
                {hasPoints && (
                  <span
                    className={cn(
                      'ml-2',
                      isMaxed ? 'text-feedback-warning' : 'text-accent-primary',
                    )}
                  >
                    (+{pointsForThisAttribute})
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasPoints}
                  onClick={() => handleRemovePoint(ability)}
                  className={cn(
                    controlButtonVariants({
                      state: hasPoints ? 'enabled' : 'disabled',
                      size: 'sm',
                    }),
                  )}
                  aria-label={`Remover ponto de ${abilityNames[ability]}`}
                >
                  <MinimizeIcon size={1.2} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!canAddMorePoints || isMaxed}
                  onClick={() => handleAddPoint(ability)}
                  className={cn(
                    controlButtonVariants({
                      state: canAddMorePoints && !isMaxed ? 'enabled' : 'disabled',
                      size: 'sm',
                    }),
                  )}
                  aria-label={`Adicionar ponto em ${abilityNames[ability]}`}
                >
                  <PlusCircleIcon size={1.2} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status indicators usando variantes */}
      {totalDistributedPoints === totalPoints && (
        <div
          className={cn(
            statusIndicatorVariants({
              status: 'complete',
              size: 'sm',
            }),
            'mt-2 w-fit',
          )}
        >
          <p className="text-surface-1 text-sm">Todos os pontos foram distribuídos!</p>
        </div>
      )}

      {totalDistributedPoints < totalPoints && totalDistributedPoints > 0 && (
        <div
          className={cn(
            statusIndicatorVariants({
              status: 'warning',
              size: 'sm',
            }),
            'mt-2',
          )}
        >
          <p className="text-feedback-warning text-sm">
            Você ainda tem {totalPoints - totalDistributedPoints} pontos para distribuir.
          </p>
        </div>
      )}
    </>
  );
}
