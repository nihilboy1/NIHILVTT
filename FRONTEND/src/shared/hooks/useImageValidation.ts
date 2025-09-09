import { useState, useCallback } from 'react';

interface UseImageValidationReturn {
  isValidating: boolean;
  isValid: boolean;
  error: string | null;
  validateImageUrl: (url: string) => Promise<boolean>;
}

export function useImageValidation(): UseImageValidationReturn {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImageUrl = useCallback(async (url: string): Promise<boolean> => {
    if (!url || !url.trim()) {
      setIsValid(false);
      setError(null);
      setIsValidating(false);
      return false;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setIsValid(false);
      setError('URL inválida');
      setIsValidating(false);
      return false;
    }

    setIsValidating(true);
    setError(null);

    return new Promise((resolve) => {
      const img = new Image();

      const timeout = setTimeout(() => {
        setIsValidating(false);
        setIsValid(false);
        setError('Tempo limite excedido ao carregar a imagem');
        resolve(false);
      }, 10000); // 10 seconds timeout

      img.onload = () => {
        clearTimeout(timeout);
        setIsValidating(false);
        setIsValid(true);
        setError(null);
        resolve(true);
      };

      img.onerror = () => {
        clearTimeout(timeout);
        setIsValidating(false);
        setIsValid(false);
        setError('Não foi possível carregar a imagem. Verifique se a URL é válida.');
        resolve(false);
      };

      img.src = url;
    });
  }, []);

  return {
    isValidating,
    isValid,
    error,
    validateImageUrl,
  };
}
