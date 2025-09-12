import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Attributes } from '@/shared/constants/characterData/attributes';
import { DEFAULT_ATTRIBUTES } from '@/shared/constants/characterData/attributes';

import { Step, STEPS } from '../../constants/steps';
import {
  CharacterBuilderFormData,
  characterBuilderSchema,
} from '../../schemas/characterBuilderSchema';

export function useCharacterBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('species');

  // Configuramos o React Hook Form com o resolver do Zod
  const methods = useForm<CharacterBuilderFormData>({
    resolver: zodResolver(characterBuilderSchema),
    mode: 'onChange',
    defaultValues: {
      species: '',
      origin: '',
      feat: {},
      class: '',
      attributes: DEFAULT_ATTRIBUTES as unknown as Record<string, number>,
      'personal-info': {
        name: '',
        lore: '',
        tokenUrl: '',
        splashartUrl: '',
      },
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  // Obtém todas as seleções atuais do formulário
  const selections = getValues();

  // Verifica se o passo atual é válido de acordo com os requisitos específicos
  const isCurrentStepValid = () => {
    // Verifica se existem erros no passo atual
    if (currentStep in errors && errors[currentStep as keyof typeof errors]) {
      return false;
    }

    if (currentStep === 'species' || currentStep === 'origin' || currentStep === 'class') {
      // Para espécie, origem e classe, deve haver uma seleção válida
      const value = getValues()[currentStep];
      return !!value && value.length > 0;
    }

    if (currentStep === 'feat') {
      // Para talentos, validamos se todas as escolhas obrigatórias foram feitas
      // Por enquanto, permitimos que seja válido mesmo vazio (implementação futura)
      return true;
    }

    if (currentStep === 'attributes') {
      // Para atributos, todos os pontos devem ser distribuídos (exatamente 27 pontos)
      const attrs = getValues().attributes;
      if (!attrs) return false;

      // Calculando o custo total dos atributos
      const points = Object.values(attrs).reduce((total, value) => {
        const cost =
          {
            8: 0,
            9: 1,
            10: 2,
            11: 3,
            12: 4,
            13: 5,
            14: 7,
            15: 9,
          }[value] || 0;
        return total + cost;
      }, 0);

      return points === 27; // Deve usar exatamente todos os pontos
    }

    if (currentStep === 'personal-info') {
      // Para informações pessoais, deve ter pelo menos um nome
      return !!getValues()['personal-info']?.name && getValues()['personal-info']?.name.length > 0;
    }

    return false;
  };

  const handleSelect = (
    step: Step,
    value:
      | string
      | Attributes
      | { name: string; tokenUrl?: string; splashartUrl?: string; lore: string }
      | Record<string, any>,
  ) => {
    // Evita validação desnecessária se o valor for igual ao anterior
    const currentValue = step in getValues() ? getValues()[step as keyof CharacterBuilderFormData] : undefined;

    // Tenta fazer o parse se o valor for uma string e o step for 'attributes'
    let parsedValue = value;
    if (step === 'attributes' && typeof value === 'string') {
      try {
        parsedValue = JSON.parse(value);
      } catch (e) {
        console.error('Erro ao fazer parse dos atributos:', e);
        return;
      }
    }

    // Verificação de igualdade para evitar atualizações desnecessárias
    if (
      (typeof parsedValue === 'string' && parsedValue === currentValue) ||
      (typeof parsedValue === 'object' &&
        JSON.stringify(parsedValue) === JSON.stringify(currentValue))
    ) {
      return;
    }

    if (step === 'attributes') {
      // Garantimos que temos um objeto de atributos válido
      const attributeValue = typeof parsedValue === 'string' ? DEFAULT_ATTRIBUTES : parsedValue;

      setValue(step, attributeValue as unknown as Record<string, number>, {
        shouldValidate: false, // Desativamos validação imediata para evitar loops
        shouldDirty: true,
      });

      // Validamos após um breve atraso para evitar loops
      setTimeout(() => {
        trigger(step).catch(() => {
          // Ignoramos erros de validação aqui
        });
      }, 100);
    } else if (step === 'feat') {
      // Para talentos, tratamos como um objeto de seleções
      setValue(step, value as Record<string, any>, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (step === 'personal-info') {
      setValue(
        step,
        value as { name: string; tokenUrl?: string; splashartUrl?: string; lore: string },
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    } else {
      setValue(step, value as string, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const getCurrentStepIndex = () => {
    return STEPS.findIndex((step) => step.id === currentStep);
  };

  const handleNext = async () => {
    // Validar o passo atual antes de avançar
    // Para steps que existem no schema, fazemos a validação
    const validSteps: Array<keyof CharacterBuilderFormData> = ['species', 'origin', 'feat', 'class', 'attributes', 'personal-info'];
    const isValidStep = validSteps.includes(currentStep as keyof CharacterBuilderFormData);
    
    let isValid = true;
    if (isValidStep) {
      isValid = await trigger(currentStep as keyof CharacterBuilderFormData);
    } else {
      // Para steps customizados, usamos nossa validação customizada
      isValid = isCurrentStepValid();
    }

    if (isValid) {
      const currentIndex = getCurrentStepIndex();
      if (currentIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentIndex + 1].id);
      }
      return currentIndex === STEPS.length - 1;
    }

    return false;
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const handleFinish = handleSubmit((data) => {
    // Aqui você pode fazer algo com os dados finais do formulário
    console.log('Character data completo:', data);
    return data;
  });

  const canGoNext = isCurrentStepValid();
  const canGoPrevious = getCurrentStepIndex() > 0;

  return {
    currentStep,
    selections,
    formMethods: methods,
    handleSelect,
    handleStepChange,
    handleNext,
    handlePrevious,
    handleFinish,
    canGoNext,
    canGoPrevious,
    errors,
  };
}
