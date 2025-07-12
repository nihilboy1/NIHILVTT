// src/entities/character/ui/playerSheet/principalTab/SkillProficiencyItem.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import {
  type DiceFormula,
  type RollCategory,
} from "../../../../../shared/api/types";
import {
  type PlayerCharacterSchema,
  type ProficiencyPath,
} from "../../../model/schemas/character.schema";

interface SkillProficiencyItemProps {
  skillLabel: string;
  name: ProficiencyPath;
  parentAttributeName: `attributes.${keyof PlayerCharacterSchema["attributes"]}`;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillLabel,
  name,
  parentAttributeName,
}) => {
  const { register, watch } = useFormContext<PlayerCharacterSchema>();

  const isProficient = watch(name);
  const attributeValue = watch(parentAttributeName);
  const characterName = watch("name");
  const proficiencyBonusFromForm = watch("proficiencyBonus"); // Obter o bônus de proficiência do formulário

  const proficiencyBonus = proficiencyBonusFromForm ?? 0; // Usar 0 como fallback se for undefined
  const attributeModifier = attributeValue
    ? Math.floor((attributeValue - 10) / 2)
    : 0;
  const totalBonus = isProficient
    ? attributeModifier + proficiencyBonus
    : attributeModifier;

  const { rollDice } = useDiceRoller();

  const handleRoll = () => {
    const isSavingThrow = name.includes("savingThrows");
    let rollName = skillLabel;

    if (isSavingThrow) {
      // Extract the attribute name from "Salva-guarda de [AttributeName]"
      const match = skillLabel.match(/Salva-guarda de (.+)/);
      if (match && match[1]) {
        rollName = match[1]; // Use only "Força", "Destreza", etc.
      }
    }

    const category: RollCategory = isSavingThrow ? "Saving Throw" : "Skill";
    const formula: DiceFormula = `1d20${
      totalBonus >= 0 ? "+" : ""
    }${totalBonus}`;
    rollDice(formula, rollName, category, characterName);
  };

  const checkboxId = `skill-prof-${name}`;
  // This function is no longer needed for the rollName, but might be used for display.
  // Keeping it for now, but it might be removed if not used for display.
  function limparSalvaguarda(label: string): string {
    return label.replace(/Salva-guarda de [A-ZÁ-Ú][a-zá-ú]+/, "Salvaguarda");
  }

  return (
    <div
      key={name}
      className="flex items-center gap-x-1 w-fit"
      aria-label="box da skill de um atributo e seu checkbox"
    >
      <label
        htmlFor={checkboxId}
        className="flex items-center gap-x-1 cursor-pointer"
      >
        <input
          type="checkbox"
          id={checkboxId}
          {...register(name)}
          className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1 flex-shrink-0"
        />
        <span className="text-xs font-bold text-accent-primary w-max-[0.375rem] text-right flex-shrink-0">
          {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
        </span>
      </label>
      <span
        className="text-xs font-medium text-accent-primary cursor-pointer hover:bg-surface-2 transition-colors duration-200 rounded-md p-1 flex-grow"
        onClick={handleRoll}
      >
        {limparSalvaguarda(skillLabel)}
      </span>
    </div>
  );
};
