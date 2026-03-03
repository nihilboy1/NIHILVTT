import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

const neutralButtonClass =
  'bg-surface-2 text-text-primary border-surface-2 hover:bg-surface-3 hover:border-text-primary';

const variantClasses: Record<AppButtonVariant, string> = {
  primary:
    'bg-accent-secondary text-text-primary border-accent-secondary hover:bg-accent-primary hover:border-text-primary',
  secondary: neutralButtonClass,
  danger:
    'bg-feedback-negative text-text-primary border-feedback-negative hover:bg-feedback-negative-hover hover:border-text-primary',
  ghost: neutralButtonClass,
};

export function AppButton({
  variant = 'primary',
  fullWidth,
  className,
  type = 'button',
  isLoading = false,
  loadingText,
  disabled,
  children,
  ...props
}: AppButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
