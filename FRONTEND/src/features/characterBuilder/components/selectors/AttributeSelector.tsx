import { ATTRIBUTE_COST } from '@/shared/constants/characterData/attributes';
import { MinimizeIcon, PlusCircleIcon } from '@/shared/ui/Icons';
import { cn } from '@/shared/lib/utils/cn';
import { attributeSectionVariants, controlButtonVariants } from '../../styles';

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

  const canDecrease = safeValue > 8 && !isDisabled;
  const canIncrease = safeValue < 15 && !isDisabled;

  return (
    <div className={cn(attributeSectionVariants())}>
      <div className="mb-2 flex items-center justify-between">
        {/* Informações do atributo */}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-text-primary text-lg font-medium">{name}</h3>
            <span className="bg-surface-2 text-text-secondary rounded px-1.5 py-0.5 text-xs font-bold">
              {abbr}
            </span>
          </div>
          <p className="text-text-secondary text-xs">Custo: {cost} pontos</p>
        </div>

        {/* Valor e modificador */}
        <div className="flex flex-col items-center">
          <div className="bg-accent-secondary text-text-primary flex h-11 w-11 items-center justify-center rounded-md text-xl font-bold">
            {safeValue}
          </div>
          <div className="text-accent-primary mt-0.5 text-sm font-medium">{modifierDisplay}</div>
        </div>
      </div>

      {/* Controles abaixo do valor */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleDecrease}
          disabled={!canDecrease}
          className={cn(
            controlButtonVariants({
              state: canDecrease ? 'enabled' : 'disabled',
            }),
          )}
        >
          <MinimizeIcon size={14} />
        </button>

        <button
          onClick={handleIncrease}
          disabled={!canIncrease}
          className={cn(
            controlButtonVariants({
              state: canIncrease ? 'enabled' : 'disabled',
            }),
          )}
        >
          <PlusCircleIcon size={14} />
        </button>
      </div>
    </div>
  );
}
