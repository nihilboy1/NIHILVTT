import { cva } from 'class-variance-authority';

/**
 * Variantes para indicadores de status (pontos restantes, progresso, etc.)
 */
export const statusIndicatorVariants = cva(
  'inline-flex items-center gap-2 rounded-sm px-4 py-2 font-medium text-surface-0',
  {
    variants: {
      status: {
        excess: 'bg-feedback-negative',
        complete: 'bg-feedback-positive',
        remaining: 'bg-accent-primary',
        warning: 'bg-feedback-warning',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      status: 'remaining',
      size: 'md',
    },
  },
);

/**
 * Variantes para badges de seleção
 */
export const selectionBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        selected: 'bg-feedback-positive text-surface-1',
        points: 'bg-accent-primary text-surface-1',
        default: 'bg-surface-2 text-text-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Variantes para tags de proficiência
 */
export const proficiencyTagVariants = cva(
  'flex cursor-default items-center rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition-all',
  {
    variants: {
      state: {
        granted: 'bg-feedback-positive text-surface-0 hover:scale-105 hover:shadow-md',
        selected: 'bg-feedback-positive text-surface-0',
        available: 'bg-surface-2 text-text-secondary',
      },
    },
    defaultVariants: {
      state: 'granted',
    },
  },
);
