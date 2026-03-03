import { useState } from 'react';

import { UseFormRegister, FieldValues, FieldError, Path } from 'react-hook-form';

import { cn } from '@/shared/lib/utils/cn';

import { PasswordInput } from './PasswordInput';

interface FormInputProps<TFieldValues extends FieldValues> {
  label: string;
  id: Path<TFieldValues>;
  type: string;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  disabled?: boolean;
}

export function FormInput<TFieldValues extends FieldValues>({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  disabled,
}: FormInputProps<TFieldValues>) {
  const errorId = `${id}-error`;
  const isPassword = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const fieldRegistration = register(id);

  return (
    <div>
      <label htmlFor={id} className="text-text-secondary mb-1 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {isPassword ? (
          <PasswordInput
            ref={fieldRegistration.ref}
            visible={isPasswordVisible}
            onToggleVisibility={() => setIsPasswordVisible((prev) => !prev)}
            id={id}
            name={fieldRegistration.name}
            onChange={fieldRegistration.onChange}
            onBlur={fieldRegistration.onBlur}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'bg-text-primary border-surface-3 focus:ring-accent-secondary text-surface-0 placeholder-surface-2 rounded-sm border p-2 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-feedback-negative focus:ring-feedback-negative',
            )}
          />
        ) : (
          <input
            type={type}
            id={id}
            {...fieldRegistration}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'bg-text-primary border-surface-3 focus:ring-accent-secondary text-surface-0 placeholder-surface-2 w-full rounded-sm border p-2 transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-feedback-negative focus:ring-feedback-negative',
            )}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="text-feedback-negative mt-1 text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
}
