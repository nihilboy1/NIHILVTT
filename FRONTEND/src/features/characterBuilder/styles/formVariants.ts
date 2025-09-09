import { cva } from 'class-variance-authority';

/**
 * Variantes para inputs de formulário
 */
export const inputVariants = cva('w-full rounded-md border px-4 py-2 transition-colors', {
  variants: {
    variant: {
      default: 'bg-surface-2 text-text-primary border-surface-3',
      error: 'bg-surface-2 text-text-primary border-feedback-negative',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

/**
 * Variantes para containers de preview de imagem
 */
export const imagePreviewVariants = cva(
  'relative flex-shrink-0 overflow-hidden rounded-md border-2 border-dashed transition-all',
  {
    variants: {
      size: {
        token: 'h-32 w-32',
        splashart: 'h-[11.5rem] w-32',
      },
      state: {
        empty: 'border-surface-3 bg-surface-2',
        loading: 'border-accent-primary bg-surface-2',
        success: 'border-feedback-positive bg-surface-2',
        error: 'border-feedback-negative bg-surface-2',
      },
    },
    defaultVariants: {
      size: 'token',
      state: 'empty',
    },
  },
);

/**
 * Variantes para seções de formulário
 */
export const formSectionVariants = cva('space-y-4', {
  variants: {
    spacing: {
      tight: 'space-y-2',
      normal: 'space-y-4',
      loose: 'space-y-6',
    },
  },
  defaultVariants: {
    spacing: 'normal',
  },
});
