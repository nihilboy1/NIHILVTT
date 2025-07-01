import React from "react";
import { useDiceRoller } from "../../../../../features/diceRolling/model/hooks/useDiceRoller";
import { DiceFormula, PlayerCharacter } from "../../../../../shared/api/types";
import { ATTRIBUTE_LABELS } from "../../../../../shared/config/sheetDefaults";
import { cn } from "../../../../../shared/lib/utils/cn";

interface AttributeBlockProps {
  attrName: keyof NonNullable<PlayerCharacter["attributes"]>;
  attrValue: number;
  onAttributeChange: (
    attrName: keyof NonNullable<PlayerCharacter["attributes"]>,
    value: number | ""
  ) => void;
  characterName: string;
}

export const AttributeBlock: React.FC<AttributeBlockProps> = ({
  attrName,
  attrValue,
  onAttributeChange,
  characterName,
}) => {
  const attrLabel = ATTRIBUTE_LABELS[attrName as keyof typeof ATTRIBUTE_LABELS];
  const modifier = Math.floor((attrValue - 10) / 2);
  const { rollDice } = useDiceRoller();

  const handleRoll = () => {
    let formula: DiceFormula;
    if (modifier === 0) {
      formula = "1d20";
    } else {
      formula = `1d20${modifier >= 0 ? "+" : ""}${modifier}`;
    }
    rollDice(formula, attrLabel, "Attribute", characterName);
  };

  return (
    <div
      className="flex justify-between w-[10rem] cursor-pointer hover:bg-surface-2 transition-colors duration-200 rounded-md p-1" // Adicionar estilos de cursor e hover
      onClick={handleRoll} // Adicionar onClick
    >
      <div className="flex flex-col ">
        <label
          htmlFor={`attr-${String(attrName)}`}
          className={cn(
            "cursor-pointer block text-xs font-bold mb-0.5",
            "text-xs uppercase"
          )}
        >
          {attrLabel}
        </label>
        <input
          id={`attr-${String(attrName)}`}
          type="number"
          value={attrValue}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              onAttributeChange(attrName, Math.max(1, Math.min(30, value)));
            } else if (e.target.value === "") {
              onAttributeChange(attrName, "");
            }
          }}
          className={cn(
            "hide-arrows w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "text-center hide-number-spinners w-12 text-lg font-semibold p-0"
          )}
          onClick={(e) => e.stopPropagation()} // Impedir que o clique no input propague para o div pai
        />
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="block text-2xl font-bold p-1 border rounded w-full text-center ">
          {modifier >= 0 ? `+${modifier}` : modifier}
        </span>
      </div>
    </div>
  );
};
