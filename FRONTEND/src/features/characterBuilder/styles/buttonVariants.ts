import { cva } from 'class-variance-authority';

/**
 * Variantes para botões de controle (aumentar/diminuir)
 * Substitui lógica condicional complexa de estilos
 */
export const controlButtonVariants = cva(
  'flex h-8 flex-1 items-center justify-center rounded-md border-none text-sm font-bold outline-none transition-colors',
  {
    variants: {
      state: {
        enabled: 'bg-accent-primary text-text-primary cursor-pointer hover:bg-accent-primary/90',
        disabled: 'bg-surface-2 text-text-secondary cursor-not-allowed',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: {
      state: 'enabled',
      size: 'md',
    },
  },
);

/**
 * Variantes para botões de seleção de opções
 */
export const selectionButtonVariants = cva(
  'rounded-md px-3 py-1 text-sm transition-colors border',
  {
    variants: {
      state: {
        selected:
          'bg-accent-primary text-text-primary border-accent-primary hover:bg-accent-primary/90',
        available: 'bg-transparent text-text-secondary border-surface-2 hover:bg-surface-2',
        disabled: 'cursor-not-allowed bg-surface-1 text-text-secondary border-surface-2 opacity-50',
      },
    },
    defaultVariants: {
      state: 'available',
    },
  },
);

/**
 * Variantes para botões de navegação (Anterior/Próximo)
 */
export const navigationButtonVariants = cva('px-6 py-2 rounded-md font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-accent-primary text-text-primary hover:bg-accent-primary/90',
      secondary: 'border-surface-2 text-text-primary border hover:bg-surface-2',
      disabled: 'bg-surface-2 text-text-secondary cursor-not-allowed',
    },
    state: {
      enabled: '',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    variant: 'primary',
    state: 'enabled',
  },
});
