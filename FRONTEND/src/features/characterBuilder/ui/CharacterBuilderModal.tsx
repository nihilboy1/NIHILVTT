import { Modal } from '@/shared/ui/Modal';

import { useCharacterBuilder } from '../model/hooks/useCharacterBuilder';

import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';

interface CharacterBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function CharacterBuilderModal({
  isOpen,
  onClose,
  zIndex = 100,
}: CharacterBuilderModalProps) {
  const {
    currentStep,
    selections,
    handleSelect,
    handleStepChange,
    handleNext,
    handlePrevious,
    canGoNext,
    canGoPrevious,
  } = useCharacterBuilder();

  const handleNextWithCompletion = () => {
    const isLastStep = handleNext();
    if (isLastStep && canGoNext) {
      // Finalizar - todas as seleções estão completas
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      fullscreen={true}
      onClose={onClose}
      title="Construtor de Personagem"
      zIndex={zIndex}
      modalClassName="w-[100vw] h-[100vh] p-0"
      hideFooter={true}
    >
      <div className="flex h-screen" style={{ backgroundColor: 'var(--color-surface-1)' }}>
        <Sidebar
          currentStep={currentStep}
          selections={selections}
          onStepChange={handleStepChange}
        />
        <MainContent
          currentStep={currentStep}
          selections={selections}
          onSelect={handleSelect}
          onNext={handleNextWithCompletion}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
      </div>
    </Modal>
  );
}
