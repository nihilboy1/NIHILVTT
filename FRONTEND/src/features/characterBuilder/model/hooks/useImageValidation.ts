import { useState, useCallback } from 'react';

export type ImageValidationStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseImageValidationReturn {
  status: ImageValidationStatus;
  showPreview: boolean;
  validateUrl: (url?: string) => void;
  togglePreview: () => void;
  setStatus: (status: ImageValidationStatus) => void;
}

/**
 * Hook para validação e controle de preview de imagens
 * Substitui lógica duplicada nos componentes de formulário
 */
export function useImageValidation(initialUrl?: string): UseImageValidationReturn {
  const [status, setStatus] = useState<ImageValidationStatus>(initialUrl ? 'loading' : 'idle');
  const [showPreview, setShowPreview] = useState(!!initialUrl);

  const isValidUrl = useCallback((url?: string): boolean => {
    return Boolean(url && (url.startsWith('http://') || url.startsWith('https://')));
  }, []);

  const validateUrl = useCallback(
    (url?: string) => {
      if (isValidUrl(url)) {
        setShowPreview(true);
        setStatus('loading');
      } else {
        setShowPreview(false);
        setStatus('error');
      }
    },
    [isValidUrl],
  );

  const togglePreview = useCallback(() => {
    setShowPreview((prev) => !prev);
  }, []);

  return {
    status,
    showPreview,
    validateUrl,
    togglePreview,
    setStatus,
  };
}
