// src/entities/character/ui/playerSheet/principalTab/AttributeBlock.tsx

import { useFormContext } from "react-hook-form";
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import { type DiceFormula } from "../../../../../shared/api/types";
import { cn } from "../../../../../shared/lib/utils/cn";
import { type PlayerCharacterSchema } from "../../../model/schemas/character.schema";

// 1. A interface de props agora também recebe o `label`
interface AttributeBlockProps {
  name: `attributes.${keyof PlayerCharacterSchema["attributes"]}`;
  label: string;
}

export const AttributeBlock: React.FC<AttributeBlockProps> = ({
  name,
  label,
}) => {
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
      className=" flex  items-end cursor-pointer hover:bg-surface-2 transition-colors duration-200 rounded-md p-1 gap-2 w-fit"
      onClick={handleRoll}
    >
      <div className="flex flex-col ">
        <label
          htmlFor={name}
          className={cn(
            "cursor-pointer block text-xs font-bold mb-0.5",
            "text-xs uppercase"
          )}
        >
          {/* 3. E usamos a prop 'label' aqui */}
          {label}
        </label>
        <input
          id={name}
          type="text" // Changed to text to gain full control over input
          {...register(name, {
            valueAsNumber: true,
          })}
          className={cn(
            "text-center hide-arrows w-12 text-lg font-semibold p-0",
            "w-[6rem] p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary h-10"
          )}
          onKeyDown={(e) => {
            const { key, ctrlKey, metaKey, altKey } = e;
            const isModifierKey = ctrlKey || metaKey || altKey;
            const isNavigationOrEditKey = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "Tab",
              "Home",
              "End",
            ].includes(key);

            // Allow modifier and navigation/edit keys
            if (isModifierKey || isNavigationOrEditKey) {
              return;
            }

            const inputElement = e.target as HTMLInputElement;
            const currentValue = inputElement.value;
            const selectionStart = inputElement.selectionStart || 0;
            const selectionEnd = inputElement.selectionEnd || 0;

            // Predict the new value after the key press
            const predictedValue =
              currentValue.substring(0, selectionStart) +
              key +
              currentValue.substring(selectionEnd);

            // Allow empty string as a valid intermediate state
            if (predictedValue === "") {
              return;
            }

            // Prevent non-digit characters
            if (!/^\d$/.test(key)) {
              e.preventDefault();
              return;
            }

            // Convert to number for range validation
            const numValue = Number(predictedValue);

            // Prevent input if the resulting value is not a valid number or outside the range 1 to 30
            if (isNaN(numValue) || numValue < 1 || numValue > 30) {
              e.preventDefault();
            }
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="flex justify-center items-center text-2xl font-bold p-1 border rounded text-center h-10 pb-2 w-[4rem]">
          {modifier >= 0 ? `+${modifier}` : modifier}
        </span>
      </div>
    </div>
  );
};
