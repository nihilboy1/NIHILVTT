// src/entities/character/model/hooks/useCharacterSheetForm.ts

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from 'use-debounce';
import { characterSchema, type CharacterSchema } from '../schemas/character.schema';

export interface UseCharacterSheetFormProps {
  initialCharacterData: CharacterSchema | null;
  onSave: (updatedData: Partial<CharacterSchema>) => void;
}

// 1. Adicionamos o novo estado 'error'
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export function useCharacterSheetForm({
  initialCharacterData,
  onSave,
}: UseCharacterSheetFormProps) {
  
  const form = useForm<CharacterSchema>({
    resolver: zodResolver(characterSchema),
    defaultValues: initialCharacterData || undefined,
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    if (initialCharacterData) {
      form.reset(initialCharacterData);
      setSaveStatus('idle');
    }
  }, [initialCharacterData, form.reset]);
  
  // 2. A lógica de auto-save agora valida os dados ANTES de salvar
  const debouncedSave = useDebouncedCallback((data: CharacterSchema) => {
    // Usamos 'safeParse' que não lança erro, mas retorna um objeto com o resultado
    const result = characterSchema.safeParse(data);

    if (result.success) {
      // SUCESSO: Os dados são válidos!
      setSaveStatus('saving');
      onSave(result.data); // Enviamos os dados validados
      setTimeout(() => setSaveStatus('success'), 500);
    } else {
      // FALHA: Os dados são inválidos!
      console.error("Validação falhou antes de salvar:", result.error.flatten());
      setSaveStatus('error'); // Acionamos o estado de erro
    }
  }, 1500);

  const watchedFields = form.watch();

  useEffect(() => {
    if (form.formState.isDirty) {
      debouncedSave(watchedFields);
    }
  }, [watchedFields, form.formState.isDirty, debouncedSave]);

  // 3. O status de "sucesso" ou "erro" agora são temporários
  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      const timer = setTimeout(() => {
        setSaveStatus('idle');
      }, 2500); // Mostra a mensagem por 2.5 segundos
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const processSubmit: SubmitHandler<CharacterSchema> = (validatedData) => {
    onSave(validatedData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(processSubmit),
    saveStatus,
  };
}