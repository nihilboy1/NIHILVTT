import { useEffect } from 'react';
import { CharacterOption, getFeatById } from '../../../schemas/characterBuilderSchema';
import { ProcessedEffect } from '../../../types/effectTypes';
import { cn } from '@/shared/lib/utils/cn';
import { characterCardVariants, selectionBadgeVariants } from '@/features/characterBuilder/styles';
import { Badge } from '../../ui/Badge';
import { useEffectsProcessor } from '@/features/characterBuilder/model/hooks/useEffectsProcessor';
import { EffectSection } from '../OriginOptionCard/components/EffectSection';
import { AbilityScoreControls } from '../OriginOptionCard/EffectControls/AbilityScoreControls';
import { FeatControls } from '../OriginOptionCard/EffectControls/FeatControls';
import { ProficiencyControlsFeat } from './EffectControls/ProficiencyControlsFeat.tsx';

type FeatOptionCardProps = {
  option: CharacterOption;
  isSelected: boolean;
  onSelect: () => void;
  onEffectsProcessed?: (areAllSelected: boolean) => void;
};

/**
 * Card para seleção de talentos de personagem
 * Baseado no OriginOptionCard, mas adaptado para talentos
 */
export function FeatOptionCard({
  option,
  isSelected,
  onSelect,
  onEffectsProcessed,
}: FeatOptionCardProps) {
  const { name, description, id } = option;
  const { processFeatEffects, areAllEffectsSelected } = useEffectsProcessor();

  // Busca dados do talento e processa efeitos
  const featData = getFeatById(id);
  const processedEffects = featData ? processFeatEffects(featData) : [];
  const allEffectsSelected = featData ? areAllEffectsSelected(processedEffects) : true;

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
          <ProficiencyControlsFeat
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

      case 'passive_providesSpellKnowledge':
      case 'passive_providesBonus':
      case 'passive_providesVision':
      case 'passive_modifyUserHP':
        // Efeitos que não requerem controles de usuário - apenas exibem informação
        return (
          <div className="bg-transparent">
            <div className="text-text-secondary text-sm">
              {effect.description || `Efeito ${effect.type} aplicado automaticamente.`}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={`feat-card-${id}`}
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
        <h3 className="text-text-primary font-medium transition-colors">{name}</h3>
        <div className="flex items-center gap-2">
          {isSelected && (
            <Badge className={cn(selectionBadgeVariants({ variant: 'selected' }))}>
              Selecionado
            </Badge>
          )}
        </div>
      </div>
      <p className="text-text-secondary mb-5 text-sm transition-colors">{description}</p>

      {/* Seção de efeitos (apenas quando selecionado) */}
      {isSelected && featData && (
        <div className="border-surface-2 mb-6 border-t pt-6">
          <div className="mb-4">
            <h4 className="text-text-primary text-lg">Benefícios de {name}</h4>
          </div>

          <div className="space-y-4">
            {processedEffects.map((effect) => {
              return (
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
                  {/* Sempre renderiza controles para proficiências, mesmo sem escolha */}
                  {(effect.requiresChoice || effect.type === 'passive_grantProficiency') &&
                    renderEffectControls(effect)}
                </EffectSection>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
