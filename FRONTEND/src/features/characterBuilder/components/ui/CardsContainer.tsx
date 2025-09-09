import { CharacterOption } from '../../schemas/characterBuilderSchema';
import { Step } from '../../constants/steps';
import { OptionCard } from '../cards/OptionCard';
import { OriginOptionCard } from '../cards/OriginOptionCard/OriginOptionCard';

interface CardsContainerProps {
  options: CharacterOption[];
  selectedId: string | Record<string, number> | any | null;
  currentStep: Step;
  onSelect: (step: Step, id: string) => void;
  scrollToTop: (delay?: number) => void;
  onEffectsProcessed?: (allSelected: boolean) => void;
}

export function CardsContainer({
  options,
  selectedId,
  currentStep,
  onSelect,
  scrollToTop,
  onEffectsProcessed,
}: CardsContainerProps) {
  const handleSelect = (optionId: string) => {
    // Seleciona a opção
    onSelect(currentStep, optionId);

    // Rola suavemente para o topo após um breve atraso
    setTimeout(() => {
      scrollToTop(200);
    }, 20);
  };

  // Decide qual componente renderizar baseado no step atual
  const renderCard = (option: CharacterOption, isSelected: boolean) => {
    if (currentStep === 'origin') {
      return (
        <OriginOptionCard
          key={option.id}
          option={option}
          isSelected={isSelected}
          onSelect={() => handleSelect(option.id)}
          onEffectsProcessed={onEffectsProcessed}
        />
      );
    } else {
      return (
        <OptionCard
          key={option.id}
          option={option}
          isSelected={isSelected}
          onSelect={() => handleSelect(option.id)}
        />
      );
    }
  };

  // Verifica se há uma seleção ativa
  const hasSelection = !!selectedId;

  // Define rótulo adequado baseado no tipo de step
  const getOtherOptionsLabel = () => {
    switch (currentStep) {
      case 'origin':
        return 'Outras origens';
      case 'species':
        return 'Outras espécies';
      case 'class':
        return 'Outras classes';
      default:
        return 'Outras opções';
    }
  };

  return (
    <div className="mt-8">
      {/* Container para a opção selecionada - agora para qualquer tipo de step */}
      {hasSelection && (
        <div className="mb-10">
          {options
            .filter((option) => selectedId === option.id)
            .map((option) => renderCard(option, true))}
        </div>
      )}

      {/* Container para as opções não selecionadas */}
      {hasSelection && (
        <div>
          {/* Título para as opções não selecionadas */}
          <h3 className="text-text-secondary mb-6 text-xl font-medium">{getOtherOptionsLabel()}</h3>

          {/* Grid para as opções não selecionadas */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {options
              .filter((option) => option.id !== selectedId)
              .map((option) => renderCard(option, false))}
          </div>
        </div>
      )}

      {/* Se não houver seleção, mostra todos os cards em grid */}
      {!hasSelection && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => renderCard(option, false))}
        </div>
      )}
    </div>
  );
}
