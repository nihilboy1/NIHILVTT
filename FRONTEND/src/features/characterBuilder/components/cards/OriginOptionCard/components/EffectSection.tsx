import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';
import { effectCardVariants } from '@/features/characterBuilder/styles';
import { Badge } from '../../../ui/Badge';

interface EffectSectionProps {
  title: string;
  description?: string;
  isSelected?: boolean;
  requiresChoice?: boolean;
  children: ReactNode;
  type?: 'effect' | 'info' | 'warning' | 'success' | 'error';
}

/**
 * Container padronizado para seções de efeitos
 * Substitui a estrutura repetitiva dos efeitos no OriginOptionCard
 */
export function EffectSection({
  title,
  description,
  isSelected,
  requiresChoice,
  children,
  type = 'effect',
}: EffectSectionProps) {
  return (
    <div className={cn(effectCardVariants({ type }), 'cursor-default')}>
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-text-primary font-medium">{title}</h4>
        {requiresChoice && isSelected && <Badge variant="secondary">Selecionado</Badge>}
      </div>

      {description && <p className="text-text-secondary mb-3 text-sm">{description}</p>}

      {children && <div className="space-y-2">{children}</div>}
    </div>
  );
}
