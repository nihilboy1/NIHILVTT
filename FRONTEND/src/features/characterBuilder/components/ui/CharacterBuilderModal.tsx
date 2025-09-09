import { FormProvider } from 'react-hook-form';

import { Modal } from '@/shared/ui/Modal';
import { useCharacterBuilder } from '../../model/hooks/useCharacterBuilder';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';



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
    formMethods,
  } = useCharacterBuilder();

  const handleNextWithCompletion = async () => {
    const isLastStep = await handleNext();
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
      <FormProvider {...formMethods}>
        <div className="bg-surface-1 flex h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)] overflow-hidden">
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
      </FormProvider>
    </Modal>
  );
}
