// src/entities/character/model/hooks/useCharacterSheetForm.ts

import { useEffect, useState } from 'react'; // Adicione useState
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from 'use-debounce';
import { characterSchema, type CharacterSchema } from '../schemas/character.schema';

export interface UseCharacterSheetFormProps {
  initialCharacterData: CharacterSchema | null;
  onSave: (updatedData: Partial<CharacterSchema>) => void;
}

// 1. Definimos os possíveis status de salvamento
export type SaveStatus = 'idle' | 'saving' | 'success';

export function useCharacterSheetForm({
  initialCharacterData,
  onSave,
}: UseCharacterSheetFormProps) {
  
  const form = useForm<CharacterSchema>({
    resolver: zodResolver(characterSchema),
    defaultValues: initialCharacterData || undefined,
  });

  // 2. Criamos o novo estado para controlar o status
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    if (initialCharacterData) {
      form.reset(initialCharacterData);
      // Quando resetamos, consideramos o estado como 'salvo'
      setSaveStatus('idle');
    }
  }, [initialCharacterData, form.reset]);
  
  // 3. Modificamos a função de auto-save
  const debouncedSave = useDebouncedCallback((data: Partial<CharacterSchema>) => {
    setSaveStatus('saving'); // <-- Muda o status para "salvando"
    onSave(data);
    
    // Como o onSave é "dispare e esqueça", vamos simular que o salvamento
    // foi um sucesso logo em seguida. É um padrão de UI comum e eficaz.
    setTimeout(() => setSaveStatus('success'), 500);

  }, 1000); 

  const watchedFields = form.watch();

  useEffect(() => {
    // Quando o usuário digita e o formulário fica "sujo", nós chamamos o save.
    // O status visual de "não salvo" virá do próprio `isDirty`.
    if (form.formState.isDirty) {
      debouncedSave(watchedFields);
    }
  }, [watchedFields, form.formState.isDirty, debouncedSave]);

  // 4. Adicionamos um efeito para o status de "sucesso" ser temporário
  useEffect(() => {
    if (saveStatus === 'success') {
      const timer = setTimeout(() => {
        // Após 2 segundos, o status volta para 'idle' (parado/salvo)
        setSaveStatus('idle');
      }, 2000);
      return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
    }
  }, [saveStatus]);

  const processSubmit: SubmitHandler<CharacterSchema> = (validatedData) => {
    onSave(validatedData);
  };

  // 5. Retornamos o novo status junto com o resto
  return {
    form,
    handleSubmit: form.handleSubmit(processSubmit),
    saveStatus, // <-- Exportamos o status para a UI
  };
}