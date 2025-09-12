import { ProcessedEffect } from '../../../../types/effectTypes';
import { getFeatById } from '../../../../schemas/characterBuilderSchema';
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

  // Função helper para obter o nome do talento
  const getFeatName = (featId: string): string => {
    const feat = getFeatById(featId);
    if (feat) {
      return Array.isArray(feat.name) ? feat.name[0] : feat.name;
    }
    return featId; // Fallback para o ID se não encontrar
  };

  if (selection.mode === 'specific') {
    const featName = getFeatName(selection.feats[0]);
    return <p className="text-text-secondary text-sm">Talento: {featName}</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-text-secondary text-sm">
        Escolha {selection.count} {selection.count === 1 ? 'talento' : 'talentos'} da categoria de
        talentos disponíveis
      </p>
      {Array.isArray(selection.feats) && selection.feats.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selection.feats.map((feat: string) => {
            const featName = getFeatName(feat);
            return (
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
                {featName}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
