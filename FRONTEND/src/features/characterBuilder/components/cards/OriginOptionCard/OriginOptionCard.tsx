import { useEffect } from 'react';
import { CharacterOption, getOriginById } from '../../../schemas/characterBuilderSchema';
import { ProcessedEffect } from '../../../types/effectTypes';
import { cn } from '@/shared/lib/utils/cn';
import {
  characterCardVariants,
  selectionBadgeVariants,
  warningAlertVariants,
} from '@/features/characterBuilder/styles';
import { Badge } from '../../ui/Badge';
import { useEffectsProcessor } from '@/features/characterBuilder/model/hooks/useEffectsProcessor';
import { EffectSection } from './components/EffectSection';
import { AbilityScoreControls } from './EffectControls/AbilityScoreControls';
import { FeatControls } from './EffectControls/FeatControls';
import { ProficiencyControlsOrigin } from './EffectControls/ProficiencyControlsOrigin';

type OriginOptionCardProps = {
  option: CharacterOption;
  isSelected: boolean;
  onSelect: () => void;
  onEffectsProcessed?: (areAllSelected: boolean) => void;
};

/**
 * Card para seleção de origens de personagem
 * Refatorado para melhor separação de responsabilidades
 */
export function OriginOptionCard({
  option,
  isSelected,
  onSelect,
  onEffectsProcessed,
}: OriginOptionCardProps) {
  const { name, description, id } = option;
  const { processOriginEffects, areAllEffectsSelected } = useEffectsProcessor();

  // Busca dados da origem e processa efeitos
  const originData = getOriginById(id);
  const processedEffects = originData ? processOriginEffects(originData) : [];
  const allEffectsSelected = originData ? areAllEffectsSelected(processedEffects) : true;

  // Notifica componente pai sobre status dos efeitos
  useEffect(() => {
    if (isSelected && onEffectsProcessed) {
      onEffectsProcessed(allEffectsSelected);
    }
  }, [isSelected, allEffectsSelected, onEffectsProcessed]);

  /**
   * Renderiza controles específicos baseado no tipo de efeito
   */
  const renderEffectControls = (effect: ProcessedEffect) => {
    switch (effect.type) {
      case 'passive_modifyAbilityScore':
        if ('choices' in effect && Array.isArray(effect.choices)) {
          return (
            <AbilityScoreControls
              effect={
                effect as ProcessedEffect & {
                  choices: Array<{
                    operation: 'add' | 'set';
                    pick: {
                      amount: 'any' | number;
                      from: Array<string>;
                    };
                    value: number;
                  }>;
                }
              }
            />
          );
        }
        return null;

      case 'passive_providesFeat':
        if ('selection' in effect) {
          return (
            <FeatControls
              effect={
                effect as ProcessedEffect & {
                  selection: {
                    mode: 'specific' | 'choose';
                    feats: string[];
                    count?: number;
                  };
                  selected?: string;
                }
              }
            />
          );
        }
        return null;

      case 'passive_grantProficiency':
        return (
          <ProficiencyControlsOrigin
            effect={
              effect as ProcessedEffect & {
                proficiencyType: string;
                choose?: {
                  from: string[];
                  count: number | 'all';
                };
                on?: string;
                proficiencies?: string[];
                selected?: string | string[];
              }
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={`origin-card-${id}`}
      className={cn(
        characterCardVariants({
          state: isSelected ? 'selected' : 'default',
          hover: isSelected ? 'none' : 'scale',
        }),
        // Remove cursor pointer quando selecionado
        isSelected && 'cursor-default',
      )}
      onClick={() => !isSelected && onSelect()}
    >
      {/* Header do card - mesmo layout que OptionCard */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-text-primary font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          {isSelected && (
            <Badge className={cn(selectionBadgeVariants({ variant: 'selected' }))}>
              Selecionado
            </Badge>
          )}
        </div>
      </div>
      <p className="text-text-secondary mb-5 text-sm">{description}</p>

      {/* Seção de efeitos (apenas quando selecionado) */}
      {isSelected && originData && (
        <div className="border-surface-2 mb-6 border-t pt-6">
          <div className="mb-4">
            <h4 className="text-text-primary text-lg">Efeitos de {name}</h4>
          </div>

          <div className="space-y-4">
            {processedEffects.map((effect) => (
              <EffectSection
                key={effect.id}
                title={effect.name}
                description={effect.description}
                isSelected={
                  effect.selected && Array.isArray(effect.selected) && effect.selected.length > 0
                }
                requiresChoice={effect.requiresChoice}
                type="effect"
              >
                {effect.requiresChoice && renderEffectControls(effect)}
              </EffectSection>
            ))}

            {/* Alerta quando nem todos os efeitos estão selecionados */}
            {!allEffectsSelected && (
              <div className={cn(warningAlertVariants({ type: 'error' }))}>
                <p className="text-surface-1 text-sm font-bold">
                  Por favor, selecione todas as opções necessárias antes de continuar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
