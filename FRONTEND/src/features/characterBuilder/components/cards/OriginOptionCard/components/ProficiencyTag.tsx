import { FaCheck } from 'react-icons/fa';
import { cn } from '@/shared/lib/utils/cn';
import { proficiencyTagVariants } from '@/features/characterBuilder/styles';

interface ProficiencyTagProps {
  name: string;
  state?: 'granted' | 'selected' | 'available';
}

/**
 * Componente reutilizável para exibir tags de proficiência
 * Substitui o componente inline ProficiencyTag do OriginOptionCard
 */
export function ProficiencyTag({ name, state = 'granted' }: ProficiencyTagProps) {
  return (
    <span className={cn(proficiencyTagVariants({ state }))}>
      <FaCheck className="mr-2 text-xs" />
      {name}
    </span>
  );
}
