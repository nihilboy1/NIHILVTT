import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils/cn';

const formSectionVariants = cva('rounded-lg border bg-surface-1', {
  variants: {
    variant: {
      default: 'border-surface-3 shadow-sm',
      elevated: 'border-surface-3 shadow-md',
      outlined: 'border-surface-3 shadow-none',
      ghost: 'border-transparent shadow-none bg-transparent',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    spacing: {
      tight: 'space-y-3',
      normal: 'space-y-4',
      relaxed: 'space-y-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    spacing: 'normal',
  },
});

const sectionHeaderVariants = cva('flex items-center justify-between mb-4', {
  variants: {
    size: {
      sm: 'mb-3',
      md: 'mb-4',
      lg: 'mb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const sectionTitleVariants = cva('font-semibold text-text-primary', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface FormSectionProps extends VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  titleSize?: VariantProps<typeof sectionTitleVariants>['size'];
}

export function FormSection({
  title,
  description,
  headerAction,
  variant,
  padding,
  spacing,
  className,
  children,
  titleSize,
}: FormSectionProps) {
  const hasHeader = title || description || headerAction;

  return (
    <section className={cn(formSectionVariants({ variant, padding, spacing }), className)}>
      {hasHeader && (
        <header className={sectionHeaderVariants({ size: titleSize })}>
          <div>
            {title && <h3 className={sectionTitleVariants({ size: titleSize })}>{title}</h3>}
            {description && <p className="text-text-secondary mt-1 text-sm">{description}</p>}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </header>
      )}

      <div>{children}</div>
    </section>
  );
}
