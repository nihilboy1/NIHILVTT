import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from 'use-debounce';
import { type Character, characterSchema } from '../schemas/character.schema';

// A importação de 'getProficiencyBonusFromLevel' não é mais necessária neste arquivo.

export interface UseCharacterSheetFormProps {
  initialCharacterData: Character | null;
  onSave: (updatedData: Partial<Character>) => void;
}

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export function useCharacterSheetForm({
  initialCharacterData,
  onSave,
}: UseCharacterSheetFormProps) {
  
  const form = useForm<Character>({
    resolver: zodResolver(characterSchema),
    defaultValues: initialCharacterData || undefined,
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  // Efeito para resetar o formulário quando o personagem inicial muda.
  useEffect(() => {
    if (initialCharacterData) {
      form.reset(initialCharacterData);
      setSaveStatus('idle');
    }
  }, [initialCharacterData, form]);
  
  // O useEffect que calculava e sincronizava o 'proficiencyBonus' foi completamente removido.
  // A responsabilidade de calcular dados derivados agora pertence aos componentes que os consomem.

  // Lógica de auto-save com debounce e validação.
  const debouncedSave = useDebouncedCallback((data: Character) => {
    const result = characterSchema.safeParse(data);

    if (result.success) {
      setSaveStatus('saving');
      console.log("useCharacterSheetForm: Saving data:", result.data); // Added log
      onSave(result.data);
      setTimeout(() => setSaveStatus('success'), 500);
    } else {
      console.error("Validação do Zod falhou antes de salvar:", result.error.flatten());
      setSaveStatus('error');
    }
  }, 500);

  // Observa todas as mudanças no formulário para acionar o auto-save.
  const watchedFields = form.watch();

  useEffect(() => {
    if (form.formState.isDirty) {
      debouncedSave(watchedFields);
    }
  }, [watchedFields, form.formState.isDirty, debouncedSave]);

  // Efeito para resetar a mensagem de status ('Salvo!' ou 'Erro!') para 'idle' após um tempo.
  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      const timer = setTimeout(() => {
        setSaveStatus('idle');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Handler para submissão manual, caso necessário.
  const processSubmit: SubmitHandler<Character> = (validatedData) => {
    console.log("useCharacterSheetForm: Manual submit data:", validatedData); // Added log
    onSave(validatedData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(processSubmit),
    saveStatus,
  };
}
