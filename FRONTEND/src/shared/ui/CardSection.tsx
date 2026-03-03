import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type CardSectionVariant = 'default' | 'danger';

type CardSectionProps = {
  children: ReactNode;
  className?: string;
  variant?: CardSectionVariant;
};

const variantClasses: Record<CardSectionVariant, string> = {
  default: 'border-surface-2 bg-surface-0/60',
  danger: 'border-feedback-negative bg-feedback-negative/10',
};

export function CardSection({
  children,
  className,
  variant = 'default',
}: CardSectionProps) {
  return (
    <section className={cn('rounded-lg border p-6', variantClasses[variant], className)}>
      {children}
    </section>
  );
}
