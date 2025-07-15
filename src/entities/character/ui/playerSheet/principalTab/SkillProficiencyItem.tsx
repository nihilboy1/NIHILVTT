// src/entities/character/ui/playerSheet/principalTab/SkillProficiencyItem.tsx

import React from "react";
import {
  type DiceFormula,
  type RollCategory,
} from "../../../../../shared/api/types";

interface SkillProficiencyItemProps {
  skillLabel: string;
  name: string;
  isProficient: boolean;
  totalBonus: number;
  characterName: string;
  onRoll: (formula: DiceFormula, rollName: string, category: RollCategory, characterName: string) => void;
  onToggleProficiency: (name: string, isProficient: boolean) => void;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillLabel,
  name,
  isProficient,
  totalBonus,
  characterName,
  onRoll,
  onToggleProficiency,
}) => {
  const handleRoll = () => {
    const isSavingThrow = name.includes("savingThrows");
    let rollName = skillLabel;

    if (isSavingThrow) {
      const match = skillLabel.match(/Salva-guarda de (.+)/);
      if (match && match[1]) {
        rollName = match[1];
      }
    }

    const category: RollCategory = isSavingThrow ? "Saving Throw" : "Skill";
    const formula: DiceFormula = `1d20${
      totalBonus >= 0 ? "+" : ""
    }${totalBonus}`;
    onRoll(formula, rollName, category, characterName);
  };

  const checkboxId = `skill-prof-${name}`;

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
          checked={isProficient}
          onChange={(e) => onToggleProficiency(name, e.target.checked)}
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
