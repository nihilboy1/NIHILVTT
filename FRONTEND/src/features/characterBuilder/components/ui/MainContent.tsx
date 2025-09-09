import { useState, useRef, useMemo } from 'react';
import { DEFAULT_ATTRIBUTES } from '@/shared/constants/characterData/attributes';
import { CLASSES } from '@/shared/constants/characterData/classes';
import { CustomScrollbar } from '@/shared/ui/CustomScrollbar';
import { cn } from '@/shared/lib/utils/cn';
import { Selection, Step, STEPS } from '../../constants/steps';
import { PHB2024ORIGINS, PHB2024SPECIES } from '@nihilvtt/datamodeling/data';
import {
  CharacterOption,
  specieToCharacterOption,
  originToCharacterOption,
} from '../../schemas/characterBuilderSchema';
import { animateScroll as scroll } from 'react-scroll';

import { CardsContainer } from './CardsContainer';
import { Button } from './Button';
import { AttributesPointBuySection } from '../selectors/AttributesPointBuySection';
import { PersonalInfoSection } from '../forms/PersonalInfoSection';
import { navigationButtonVariants } from '../../styles';

interface MainContentProps {
  currentStep: Step;
  selections: Selection;
  onSelect: (step: Step, id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function MainContent({
  currentStep,
  selections,
  onSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: MainContentProps) {
  const currentStepData = STEPS.find((step) => step.id === currentStep)!;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Função helper para realizar scroll suave para o topo
  const scrollToTop = (delay = 50) => {
    setTimeout(() => {
      scroll.scrollToTop({
        containerId: 'scroll-container',
        duration: 300,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }, delay);
  };

  // Usamos os dados locais para origens
  let options: CharacterOption[] = [];
  switch (currentStep) {
    case 'species':
      // Usamos a função de conversão de espécies para CharacterOption
      options = PHB2024SPECIES.map(specieToCharacterOption);
      break;
    case 'origin':
      // Usamos a função de conversão de origens para CharacterOption
      options = PHB2024ORIGINS.map(originToCharacterOption);
      break;
    case 'class':
      options = CLASSES;
      break;
    case 'attributes':
      // Não precisamos de options para este caso
      break;
    case 'personal-info':
      // Não precisamos de options para este caso
      break;
  }

  const selectedId = selections[currentStep];
  // Converte o selectedId para um formato adequado para o CardsContainer
  const processedSelectedId = useMemo(() => {
    if (typeof selectedId === 'string') {
      return selectedId;
    }
    return null;
  }, [selectedId]);
  const [allEffectsSelected, setAllEffectsSelected] = useState(true);

  // Este efeito foi removido na versão simplificada

  return (
    <CustomScrollbar
      ref={scrollContainerRef}
      className="bg-surface-1 h-full flex-1 border-l"
      id="scroll-container"
    >
      <div className="mx-auto max-w-4xl space-y-8 p-8 pb-20">
        {/* Header com título e descrição */}
        <div className="mb-12 py-4">
          <h2 className="iceberg-regular text-text-primary mb-2 text-3xl">
            {currentStepData.title}
          </h2>
          <p className="text-text-secondary text-lg">
            {currentStep === 'attributes'
              ? 'Distribua seus pontos entre os atributos usando o sistema de Point Buy.'
              : 'Selecione uma das opções abaixo para continuar.'}
          </p>
        </div>

        {currentStep === 'attributes' ? (
          <div className="bg-surface-1 rounded-lg p-2">
            <AttributesPointBuySection
              attributes={
                (selections.attributes ||
                  DEFAULT_ATTRIBUTES) as import('@/shared/constants/characterData/attributes').Attributes
              }
              onAttributesChange={(attrs) => {
                // Convertemos para string JSON antes de passar para onSelect
                onSelect('attributes', JSON.stringify(attrs));
              }}
            />
          </div>
        ) : currentStep === 'personal-info' ? (
          <div className="bg-surface-1 rounded-lg p-6">
            <PersonalInfoSection />
          </div>
        ) : (
          <CardsContainer
            options={options}
            selectedId={processedSelectedId}
            currentStep={currentStep}
            onSelect={onSelect}
            scrollToTop={scrollToTop}
            onEffectsProcessed={setAllEffectsSelected}
          />
        )}

        <div className="flex justify-between pt-8">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className={cn(
              navigationButtonVariants({
                variant: 'secondary',
                state: canGoPrevious ? 'enabled' : 'disabled',
              }),
            )}
          >
            Anterior
          </Button>

          <Button
            onClick={onNext}
            disabled={
              !canGoNext || (currentStep === 'origin' && !!selectedId && !allEffectsSelected)
            }
            className={cn(
              navigationButtonVariants({
                variant:
                  canGoNext && (currentStep !== 'origin' || !selectedId || allEffectsSelected)
                    ? 'primary'
                    : 'disabled',
                state:
                  canGoNext && (currentStep !== 'origin' || !selectedId || allEffectsSelected)
                    ? 'enabled'
                    : 'disabled',
              }),
            )}
          >
            {currentStep === 'personal-info' ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </CustomScrollbar>
  );
}
