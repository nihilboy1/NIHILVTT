import { DEFAULT_ATTRIBUTES } from '@/shared/constants/characterData/attributes';
import { CLASSES } from '@/shared/constants/characterData/classes';
import { BuilderButton } from '@/shared/ui/BuilderButton';
import { CustomScrollbar } from '@/shared/ui/CustomScrollbar';
import { Selection, Step, STEPS } from '../../constants/steps';
import { PHB2024ORIGINS, PHB2024SPECIES } from '@nihilvtt/datamodeling';

import { AttributesPointBuySection } from './AttributesPointBuySection';
import { OptionCard } from './OptionCard';
import { PersonalInfoSection } from './PersonalInfoSection';

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

  // Usamos os dados locais para origens
  let options: any[] = [];
  switch (currentStep) {
    case 'species':
      // Usamos as espécies do PHB2024SPECIES diretamente
      options = PHB2024SPECIES.map((specie) => ({
        id: specie.id,
        name: Array.isArray(specie.name) ? specie.name[0] : specie.name,
        description: specie.description,
        source: specie.source,
      }));
      break;
    case 'origin':
      // Usamos as origens do PHB2024ORIGINS diretamente
      options = PHB2024ORIGINS.map((origin) => ({
        id: origin.id,
        name: Array.isArray(origin.name) ? origin.name[0] : origin.name,
        description: origin.description,
        source: origin.source,
      }));
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

  return (
    <CustomScrollbar className="bg-surface-1 h-full flex-1 border-l">
      <div className="mx-auto max-w-4xl space-y-8 p-8 pb-20">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {options?.map((option) => (
              <OptionCard
                key={option.id}
                id={option.id}
                name={option.name}
                description={option.description}
                source={option.source}
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
            {currentStep === 'personal-info' ? 'Finalizar' : 'Próximo'}
          </BuilderButton>
        </div>
      </div>
    </CustomScrollbar>
  );
}
