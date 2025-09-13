import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { type Character, characterSchema } from '../schemas/character.schema';
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

  useEffect(() => {
    if (initialCharacterData) {
      form.reset(initialCharacterData);
      setSaveStatus('idle');
    }
  }, [initialCharacterData, form]);

  const debouncedSave = useDebouncedCallback(async (data: Character) => {
    const isValid = await form.trigger();

    if (isValid) {
      setSaveStatus('saving');
      onSave(data);
      setTimeout(() => setSaveStatus('success'), 500);
    } else {
      setSaveStatus('error');
    }
  }, 500);

  const watchedFields = form.watch();

  useEffect(() => {
    if (form.formState.isDirty) {
      debouncedSave(watchedFields);
    }
  }, [watchedFields, form.formState.isDirty, debouncedSave]);

  useEffect(() => {
    if (saveStatus === 'success' || saveStatus === 'error') {
      const timer = setTimeout(() => {
        setSaveStatus('idle');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  const processSubmit: SubmitHandler<Character> = (validatedData) => {
    console.log('useCharacterSheetForm: Manual submit data:', validatedData);
    onSave(validatedData);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(processSubmit),
    saveStatus,
  };
}
