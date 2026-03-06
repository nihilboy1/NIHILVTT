import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import { CharacterOption } from '../../schemas/characterBuilderSchema';
import { characterCardVariants, selectionBadgeVariants } from '../../styles';
import { Badge } from '../ui/Badge';

type OptionCardProps = {
  option: CharacterOption;
  isSelected: boolean;
  onSelect: () => void;
  isReordering?: boolean;
  transitionDelay?: number;
};

export const OptionCard = forwardRef<HTMLDivElement, OptionCardProps>(
  ({ option, isSelected, onSelect, isReordering = false, transitionDelay = 0 }, ref) => {
    const { name, description, id } = option;

    return (
      <div
        ref={ref}
        id={`option-card-${id}`}
        role="button"
        tabIndex={0}
        className={cn(
          characterCardVariants({
            state: isSelected ? 'selected' : 'default',
            hover: 'scale',
          }),
          // Styles específicos para reordenação
          isReordering && 'scale-95 opacity-60',
          !isReordering && 'scale-100 opacity-100',
        )}
        onClick={onSelect}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect();
          }
        }}
        style={{
          transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${transitionDelay}ms`,
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-text-primary font-medium">{name}</h3>
          {isSelected && (
            <Badge className={cn(selectionBadgeVariants({ variant: 'selected' }))}>
              Selecionado
            </Badge>
          )}
        </div>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    );
  },
);

// Adicionando displayName para depuração
OptionCard.displayName = 'OptionCard';
