import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';

const formFieldVariants = cva('space-y-2', {
  variants: {
    variant: {
      default: '',
      inline: 'flex items-center space-y-0 space-x-3',
      compact: 'space-y-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const labelVariants = cva('font-medium text-sm', {
  variants: {
    state: {
      default: 'text-text-primary',
      error: 'text-feedback-negative',
      success: 'text-feedback-positive',
    },
    required: {
      true: "after:content-['*'] after:text-feedback-negative after:ml-1",
      false: '',
    },
  },
  defaultVariants: {
    state: 'default',
    required: false,
  },
});

const helpTextVariants = cva('text-xs', {
  variants: {
    state: {
      default: 'text-text-secondary',
      error: 'text-feedback-negative',
      success: 'text-feedback-positive',
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

interface FormFieldProps extends VariantProps<typeof formFieldVariants> {
  label?: string;
  helpText?: string;
  error?: string | null;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

export function FormField({
  label,
  helpText,
  error,
  required = false,
  variant,
  className,
  children,
  htmlFor,
}: FormFieldProps) {
  const state = error ? 'error' : 'default';

  return (
    <div className={cn(formFieldVariants({ variant }), className)}>
      {label && (
        <label htmlFor={htmlFor} className={labelVariants({ state, required })}>
          {label}
        </label>
      )}

      {children}

      {(helpText || error) && (
        <div className={helpTextVariants({ state })}>{error || helpText}</div>
      )}
    </div>
  );
}
