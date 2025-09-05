import { DEFAULT_ATTRIBUTES } from '@/shared/constants/characterData/attributes';
import { BACKGROUNDS } from '@/shared/constants/characterData/backgrounds';
import { CLASSES } from '@/shared/constants/characterData/classes';
import { SPECIES } from '@/shared/constants/characterData/species';
import { BuilderButton } from '@/shared/ui/BuilderButton';

import { Selection, Step, STEPS } from '../../constants/steps';

import { AttributesPointBuySection } from './AttributesPointBuySection';
import { OptionCard } from './OptionCard';

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

  let options;
  switch (currentStep) {
    case 'species':
      options = SPECIES;
      break;
    case 'background':
      options = BACKGROUNDS;
      break;
    case 'class':
      options = CLASSES;
      break;
    case 'attributes':
      // Não precisamos de options para este caso
      break;
  }

  const selectedId = selections[currentStep];

  return (
    <div className="hide-scrollbar bg-surface-1 mb-5 h-fit flex-1 overflow-y-auto border-l p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2
            className="iceberg-regular text-primary text-3xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {currentStepData.title}
          </h2>
          <p className="text-secondary text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {currentStep === 'attributes'
              ? 'Distribua seus pontos entre os atributos usando o sistema de Point Buy.'
              : 'Selecione uma das opções abaixo para continuar.'}
          </p>
        </div>

        {currentStep === 'attributes' ? (
          <div className="bg-surface-1 rounded-lg p-2">
            <AttributesPointBuySection
              attributes={selections.attributes || DEFAULT_ATTRIBUTES}
              onAttributesChange={(attrs) => onSelect('attributes', JSON.stringify(attrs))}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {options?.map((option) => (
              <OptionCard
                key={option.id}
                id={option.id}
                name={option.name}
                description={option.description}
                isSelected={selectedId === option.id}
                onSelect={() => onSelect(currentStep, option.id)}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between pt-8">
          <BuilderButton
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="px-6"
            style={{
              borderColor: 'var(--color-surface-2)',
              color: canGoPrevious ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            Anterior
          </BuilderButton>

          <BuilderButton
            onClick={onNext}
            disabled={!canGoNext}
            className="px-6"
            style={{
              backgroundColor: canGoNext ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
              color: canGoNext ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {currentStep === 'attributes' ? 'Finalizar' : 'Próximo'}
          </BuilderButton>
        </div>
      </div>
    </div>
  );
}
