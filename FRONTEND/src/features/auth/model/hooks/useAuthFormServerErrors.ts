import { useEffect } from 'react';

import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { AuthErrorState } from '../authErrors';

type UseAuthFormServerErrorsParams<TFieldValues extends FieldValues> = {
  authError: AuthErrorState | null;
  setError: UseFormSetError<TFieldValues>;
  allowedFields: Array<Path<TFieldValues>>;
};

export function useAuthFormServerErrors<TFieldValues extends FieldValues>({
  authError,
  setError,
  allowedFields,
}: UseAuthFormServerErrorsParams<TFieldValues>) {
  useEffect(() => {
    if (!authError) return;

    Object.entries(authError.fieldErrors).forEach(([field, message]) => {
      if (allowedFields.includes(field as Path<TFieldValues>)) {
        setError(field as Path<TFieldValues>, { type: 'server', message });
      }
    });
  }, [authError, setError, allowedFields]);
}
