import { FormProvider } from 'react-hook-form';

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
        <div
          className="flex h-full overflow-hidden"
          style={{
            backgroundColor: 'var(--color-surface-1)',
            height: 'calc(100vh - 5rem)' /* Altura ajustada para considerar o título do modal */,
            maxHeight: 'calc(100vh - 5rem)',
          }}
        >
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
