import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 bg-surface-2 text-text-primary',
  {
    variants: {
      variant: {
        default: 'border-surface-3 focus:border-accent-primary focus:ring-accent-primary/20',
        error:
          'border-feedback-negative focus:border-feedback-negative focus:ring-feedback-negative/20',
        success:
          'border-feedback-positive focus:border-feedback-positive focus:ring-feedback-positive/20',
        disabled: 'border-surface-3 bg-surface-1 text-text-secondary cursor-not-allowed',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export const textareaVariants = cva(
  'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 resize-vertical bg-surface-2 text-text-primary',
  {
    variants: {
      variant: {
        default: 'border-surface-3 focus:border-accent-primary focus:ring-accent-primary/20',
        error:
          'border-feedback-negative focus:border-feedback-negative focus:ring-feedback-negative/20',
        success:
          'border-feedback-positive focus:border-feedback-positive focus:ring-feedback-positive/20',
        disabled: 'border-surface-3 bg-surface-1 text-text-secondary cursor-not-allowed',
      },
      size: {
        sm: 'px-3 py-2 text-sm min-h-[80px]',
        md: 'px-4 py-3 text-base min-h-[100px]',
        lg: 'px-5 py-4 text-lg min-h-[120px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);
