import { cn } from '@/shared/lib/utils/cn';
import { proficiencyTagVariants } from '@/features/characterBuilder/styles';

interface ProficiencyTagProps {
  name: string;
  state?: 'granted' | 'selected' | 'available';
}

/**
 * Componente reutilizável para exibir tags de proficiência com estilo verde
 * As tags usam o estilo 'granted' por padrão para ter o visual verde similar ao badge "Selecionado"
 */
export function ProficiencyTag({ name, state = 'granted' }: ProficiencyTagProps) {
  // Define a classe de cor do ícone baseada no estado
  const iconColorClass = state === 'available' ? 'text-text-secondary' : 'text-surface-0';

  return (
    <span className={cn(proficiencyTagVariants({ state }))}>
      <span className={cn('mr-2 text-xs font-bold', iconColorClass)}>✓</span>
      {name}
    </span>
  );
}
