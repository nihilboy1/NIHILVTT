import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type StatusAlertTone = 'error' | 'success';

type StatusAlertProps = {
  children: ReactNode;
  tone: StatusAlertTone;
  className?: string;
};

const toneClasses: Record<StatusAlertTone, string> = {
  error: 'border-feedback-negative bg-feedback-negative/10 text-feedback-negative',
  success: 'border-feedback-positive bg-feedback-positive/10 text-feedback-positive',
};

export function StatusAlert({ children, tone, className }: StatusAlertProps) {
  const role = tone === 'error' ? 'alert' : 'status';
  const ariaLive = tone === 'error' ? 'assertive' : 'polite';

  return (
    <div
      role={role}
      aria-live={ariaLive}
      className={cn('rounded-md border px-4 py-3 text-sm', toneClasses[tone], className)}
    >
      {children}
    </div>
  );
}
