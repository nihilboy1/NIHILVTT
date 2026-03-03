import { forwardRef, InputHTMLAttributes } from 'react';

import eyeClosedIcon from '@/shared/assets/eye-closed.svg';
import eyeIcon from '@/shared/assets/eye.svg';

import { cn } from '@/shared/lib/utils/cn';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  visible: boolean;
  onToggleVisibility: () => void;
  tooltipShowText?: string;
  tooltipHideText?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      visible,
      onToggleVisibility,
      className,
      tooltipShowText = 'Mostrar senha',
      tooltipHideText = 'Ocultar senha',
      ...inputProps
    },
    ref,
  ) => {
    const tooltipText = visible ? tooltipHideText : tooltipShowText;

    return (
      <div className="relative">
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn('w-full pr-16', className)}
          {...inputProps}
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="group absolute inset-y-0 right-2 my-auto flex h-6 w-6 items-center justify-center rounded-sm hover:bg-surface-2/30 focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:outline-none"
          aria-label={tooltipText}
        >
          <img
            src={visible ? eyeClosedIcon : eyeIcon}
            alt=""
            className="h-4 w-4 opacity-80"
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-sm bg-surface-3 px-2 py-1 text-[10px] whitespace-nowrap text-text-primary opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
            {tooltipText}
          </span>
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';