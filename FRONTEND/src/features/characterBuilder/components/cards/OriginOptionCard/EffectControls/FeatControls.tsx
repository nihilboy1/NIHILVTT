import { ProcessedEffect } from '../../../../types/effectTypes';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '../../../ui/Button';
import { selectionButtonVariants } from '@/features/characterBuilder/styles';

interface FeatControlsProps {
  effect: ProcessedEffect & {
    selection: {
      mode: 'specific' | 'choose';
      feats: string[];
      count?: number;
    };
    selected?: string;
  };
}

/**
 * Controles para seleção de talentos (feats)
 * Extraído do OriginOptionCard para melhor organização
 */
export function FeatControls({ effect }: FeatControlsProps) {
  const { selection, selected } = effect;

  if (selection.mode === 'specific') {
    return <p className="text-text-secondary text-sm">Talento: {selection.feats[0]}</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-text-secondary text-sm">
        Escolha {selection.count} {selection.count === 1 ? 'talento' : 'talentos'} da categoria de
        talentos disponíveis
      </p>
      {Array.isArray(selection.feats) && selection.feats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selection.feats.map((feat: string) => (
            <Button
              key={feat}
              variant={selected === feat ? 'default' : 'outline'}
              size="sm"
              onClick={() => effect.onSelect && effect.onSelect(feat)}
              className={cn(
                selectionButtonVariants({
                  state: selected === feat ? 'selected' : 'available',
                }),
              )}
            >
              {feat}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
