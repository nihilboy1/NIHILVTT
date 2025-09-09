import { forwardRef } from 'react';
import { FormField } from './FormField';
import { inputVariants } from '../styles/inputVariants';
import { cn } from '../lib/utils/cn';

interface CharacterNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CharacterNameField = forwardRef<HTMLInputElement, CharacterNameFieldProps>(
  (
    {
      value,
      onChange,
      error,
      required = true,
      placeholder = 'Digite o nome do personagem...',
      className,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <FormField
        label="Nome do Personagem"
        error={error}
        required={required}
        htmlFor="character-name"
        className={className}
      >
        <input
          {...props}
          ref={ref}
          id="character-name"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            inputVariants({
              variant: error ? 'error' : 'default',
              size: 'md',
            }),
          )}
        />
      </FormField>
    );
  },
);

CharacterNameField.displayName = 'CharacterNameField';
