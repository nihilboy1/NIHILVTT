import { useState, useEffect } from 'react';
import { FormField } from './FormField';
import { ImagePreview } from './ImagePreview';
import { inputVariants } from '../styles/inputVariants';
import { useImageValidation } from '../hooks/useImageValidation';
import { cn } from '../lib/utils/cn';

interface ImageUrlFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  previewSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ImageUrlField({
  value,
  onChange,
  error: externalError,
  required = false,
  placeholder = 'Cole a URL da imagem do personagem...',
  className,
  disabled = false,
  previewSize = 'xl',
}: ImageUrlFieldProps) {
  const [localValue, setLocalValue] = useState(value);
  const { isValidating, isValid, error: validationError, validateImageUrl } = useImageValidation();

  // Sync with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Validate URL when it changes
  useEffect(() => {
    if (localValue && localValue.trim()) {
      validateImageUrl(localValue);
    }
  }, [localValue, validateImageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleImageLoad = () => {
    // Image loaded successfully - validation hook will handle state
  };

  const handleImageError = () => {
    // Image failed to load - validation hook will handle state
  };

  // Determine the overall error state
  const finalError = externalError || validationError;

  // Determine preview state
  const getPreviewState = () => {
    if (isValidating) return 'loading';
    if (finalError) return 'invalid';
    if (isValid && localValue) return 'valid';
    return 'default';
  };

  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Imagem do Personagem"
        error={finalError}
        required={required}
        htmlFor="character-image-url"
        helpText={!finalError ? 'Cole a URL de uma imagem para seu personagem' : undefined}
      >
        <input
          id="character-image-url"
          type="url"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            inputVariants({
              variant: finalError ? 'error' : 'default',
              size: 'md',
            }),
          )}
        />
      </FormField>

      {/* Preview da imagem */}
      <div className="flex justify-center">
        <ImagePreview
          src={localValue && !finalError ? localValue : undefined}
          alt="Preview do personagem"
          state={getPreviewState()}
          size={previewSize}
          shape="square"
          onLoad={handleImageLoad}
          onError={handleImageError}
          placeholder={
            <div className="text-center">
              <svg className="mx-auto mb-2 h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-xs">Preview da imagem</div>
            </div>
          }
        />
      </div>
    </div>
  );
}
