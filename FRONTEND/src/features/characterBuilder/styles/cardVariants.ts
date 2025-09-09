import { cva } from 'class-variance-authority';

/**
 * Variantes para cards do Character Builder
 * Substitui estilos inline repetitivos com sistema consistente
 */
export const characterCardVariants = cva(
  'rounded-lg border transition-all duration-200 flex flex-col',
  {
    variants: {
      state: {
        default: 'bg-surface-1 hover:bg-surface-2 border-surface-2 cursor-pointer',
        selected: 'bg-accent-primary border-accent-primary shadow-accent-primary/20 shadow-lg',
        disabled: 'bg-surface-1 border-surface-2 opacity-50 cursor-not-allowed',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hover: {
        scale: 'hover:scale-[1.02]',
        none: '',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
      hover: 'scale',
    },
  },
);

/**
 * Variantes para containers de opções/efeitos internos
 */
export const effectCardVariants = cva('rounded-lg border p-4 transition-all cursor-default', {
  variants: {
    type: {
      effect: 'bg-surface-1 border-surface-2',
      info: 'border-surface-2 bg-surface-1 bg-opacity-50 animate-fadeIn',
      warning: 'bg-feedback-warning bg-opacity-20 border-feedback-warning',
      success: 'bg-feedback-positive bg-opacity-20 border-feedback-positive',
      error: 'border-feedback-negative bg-opacity-10',
    },
  },
  defaultVariants: {
    type: 'effect',
  },
});

/**
 * Variante específica para avisos importantes (não segue o padrão de efeitos)
 */
export const warningAlertVariants = cva('rounded-md border p-3 mt-4', {
  variants: {
    type: {
      error: 'border-feedback-negative w-fit bg-feedback-negative',
      warning: 'border-feedback-warning bg-feedback-warning bg-opacity-10',
      info: 'border-accent-primary bg-accent-primary bg-opacity-10',
    },
  },
  defaultVariants: {
    type: 'error',
  },
});

/**
 * Variantes para seções de atributos
 */
export const attributeSectionVariants = cva('border rounded-lg p-3', {
  variants: {
    state: {
      default: 'border-surface-2 bg-surface-1',
      maxed: 'bg-feedback-warning bg-opacity-20 border-feedback-warning',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});
