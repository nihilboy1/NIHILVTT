import { BuilderBadge } from '@/shared/ui/BuilderBadge';
import { BuilderCard } from '@/shared/ui/BuilderCard';

export interface OptionCardProps {
  id: string;
  name: string;
  description: string;
  source?: string; // Fonte opcional (mostrado apenas quando disponível)
  isSelected: boolean;
  onSelect: () => void;
}

export function OptionCard({ name, description, source, isSelected, onSelect }: OptionCardProps) {
  return (
    <BuilderCard
      className={`cursor-pointer p-6 transition-all duration-200 hover:scale-[1.02] ${
        isSelected
          ? 'bg-accent border-accent-primary shadow-accent-primary/20 shadow-lg'
          : 'bg-surface-1 hover:bg-surface-2 border-surface-2'
      }`}
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-surface-1)',
        borderColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {name}
        </h3>
        {isSelected && (
          <BuilderBadge
            className="bg-positive text-surface-0"
            style={{
              backgroundColor: 'var(--color-feedback-positive)',
              color: 'var(--color-surface-1)',
            }}
          >
            Selecionado
          </BuilderBadge>
        )}
      </div>
      <p className="text-secondary text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>
      {source && (
        <div className="mt-3 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          <span className="font-medium">Fonte: </span>
          {source}
        </div>
      )}
    </BuilderCard>
  );
}
