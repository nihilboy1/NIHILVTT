import { ATTRIBUTE_COST } from '@/shared/constants/characterData/attributes';
import { MinimizeIcon, PlusCircleIcon } from '@/shared/ui/Icons';

export interface AttributeSelectorProps {
  name: string;
  abbr: string;
  value: number;
  onChange: (value: number) => void;
  isDisabled?: boolean;
}

export function AttributeSelector({
  name,
  abbr,
  value,
  onChange,
  isDisabled = false,
}: AttributeSelectorProps) {
  // Garantir que value é um número válido
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 8;

  const handleIncrease = () => {
    if (safeValue < 15 && !isDisabled) {
      onChange(safeValue + 1);
    }
  };

  const handleDecrease = () => {
    if (safeValue > 8 && !isDisabled) {
      onChange(safeValue - 1);
    }
  };

  const cost = ATTRIBUTE_COST[safeValue as keyof typeof ATTRIBUTE_COST] || 0;

  // Calcular o modificador
  const modifier = Math.floor((safeValue - 10) / 2);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div
      className="rounded-lg p-3"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-surface-2)',
        borderWidth: '1px',
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        {/* Informações do atributo */}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {name}
            </h3>
            <span
              className="rounded px-1.5 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {abbr}
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            Custo: {cost} pontos
          </p>
        </div>

        {/* Valor e modificador */}
        <div className="flex flex-col items-center">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-md text-xl font-bold"
            style={{
              backgroundColor: 'var(--color-accent-secondary)',
              color: 'var(--color-text-primary)',
            }}
          >
            {safeValue}
          </div>
          <div
            className="mt-0.5 text-sm font-medium"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            {modifierDisplay}
          </div>
        </div>
      </div>

      {/* Controles abaixo do valor */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleDecrease}
          disabled={safeValue <= 8 || isDisabled}
          className="flex h-8 flex-1 items-center justify-center rounded-md text-sm font-bold"
          style={{
            backgroundColor:
              safeValue > 8 && !isDisabled
                ? 'var(--color-accent-primary)'
                : 'var(--color-surface-2)',
            color:
              safeValue > 8 && !isDisabled
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
            cursor: safeValue > 8 && !isDisabled ? 'pointer' : 'not-allowed',
            border: 'none',
            outline: 'none',
          }}
        >
          <MinimizeIcon size={14} />
        </button>

        <button
          onClick={handleIncrease}
          disabled={safeValue >= 15 || isDisabled}
          className="flex h-8 flex-1 items-center justify-center rounded-md text-sm font-bold"
          style={{
            backgroundColor:
              safeValue < 15 && !isDisabled
                ? 'var(--color-accent-primary)'
                : 'var(--color-surface-2)',
            color:
              safeValue < 15 && !isDisabled
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
            cursor: safeValue < 15 && !isDisabled ? 'pointer' : 'not-allowed',
            border: 'none',
            outline: 'none',
          }}
        >
          <PlusCircleIcon size={14} />
        </button>
      </div>
    </div>
  );
}
