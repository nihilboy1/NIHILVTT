import { useState } from 'react';

import { Attributes } from '@/shared/constants/characterData/attributes';

import { Selection, Step, STEPS } from '../../constants/steps';

export function useCharacterBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('species');
  const [selections, setSelections] = useState<Selection>({});

  const handleSelect = (step: Step, value: string) => {
    if (step === 'attributes') {
      try {
        const attributes = JSON.parse(value) as Attributes;
        setSelections((prev) => ({ ...prev, [step]: attributes }));
      } catch (e) {
        console.error('Erro ao processar atributos:', e);
      }
    } else {
      setSelections((prev) => ({ ...prev, [step]: value }));
    }
  };

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const getCurrentStepIndex = () => {
    return STEPS.findIndex((step) => step.id === currentStep);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
    return currentIndex === STEPS.length - 1;
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const canGoNext =
    currentStep === 'attributes' ? !!selections.attributes : !!selections[currentStep];
  const canGoPrevious = getCurrentStepIndex() > 0;

  return {
    currentStep,
    selections,
    handleSelect,
    handleStepChange,
    handleNext,
    handlePrevious,
    canGoNext,
    canGoPrevious,
  };
}
