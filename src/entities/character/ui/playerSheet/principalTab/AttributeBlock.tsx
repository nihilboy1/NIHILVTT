// src/entities/character/ui/playerSheet/principalTab/AttributeBlock.tsx

import { useFormContext } from 'react-hook-form';
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import { type DiceFormula } from "../../../../../shared/api/types";
import { cn } from "../../../../../shared/lib/utils/cn";
import { type PlayerCharacterSchema } from '../../../model/schemas/character.schema';

// 1. A interface de props agora também recebe o `label`
interface AttributeBlockProps {
  name: `attributes.${keyof PlayerCharacterSchema['attributes']}`;
  label: string;
}

export const AttributeBlock: React.FC<AttributeBlockProps> = ({ name, label }) => {
  const { register, watch } = useFormContext<PlayerCharacterSchema>();

  const attrValue = watch(name);
  const characterName = watch("name");

  const modifier = attrValue ? Math.floor((attrValue - 10) / 2) : 0;
  
  // 2. A constante 'attrLabel' foi removida. Usamos a prop 'label' diretamente.
  // const attrLabel = ATTRIBUTE_LABELS[name.split('.')[1] as keyof typeof ATTRIBUTE_LABELS]; // LINHA REMOVIDA

  const { rollDice } = useDiceRoller();

  const handleRoll = () => {
    const formula: DiceFormula = `1d20${modifier >= 0 ? "+" : ""}${modifier}`;
    // Usamos a prop 'label' aqui
    rollDice(formula, label, "Attribute", characterName);
  };

  return (
    <div
      className="flex justify-between w-[10rem] cursor-pointer hover:bg-surface-2 transition-colors duration-200 rounded-md p-1"
      onClick={handleRoll}
    >
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className={cn("cursor-pointer block text-xs font-bold mb-0.5", "text-xs uppercase")}
        >
          {/* 3. E usamos a prop 'label' aqui */}
          {label}
        </label>
        <input
          id={name}
          type="number"
          {...register(name, {
            valueAsNumber: true,
            min: 1,
            max: 30,
          })}
          className={cn(
            "text-center hide-number-spinners w-12 text-lg font-semibold p-0",
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          )}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="block text-2xl font-bold p-1 border rounded w-full text-center">
          {modifier >= 0 ? `+${modifier}` : modifier}
        </span>
      </div>
    </div>
  );
};