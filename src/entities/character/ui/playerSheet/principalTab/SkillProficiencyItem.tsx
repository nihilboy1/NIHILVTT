import React from "react";
import { useDiceRoller } from "../../../../../features/diceRolling/model/hooks/useDiceRoller";
import { DiceFormula, PlayerCharacter, RollCategory } from "../../../../../shared/api/types";
import { ATTRIBUTE_LABELS } from "../../../../../shared/config/sheetDefaults";

interface SkillProficiencyItemProps {
  skillInfo: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
    isSavingThrow?: boolean;
  };
  isProficient: boolean;
  totalBonus: number;
  onProficiencyChange: (
    skillKey: string,
    isSavingThrow: boolean,
    checked: boolean
  ) => void;
  attrName: keyof NonNullable<PlayerCharacter["attributes"]>;
  characterName: string;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillInfo,
  isProficient,
  totalBonus,
  onProficiencyChange,
  attrName,
  characterName,
}) => {
  const { rollDice } = useDiceRoller();

  const handleRoll = () => {
    const rollName = skillInfo.isSavingThrow
      ? ATTRIBUTE_LABELS[skillInfo.parentAttribute]
      : skillInfo.label;

    const category: RollCategory = skillInfo.isSavingThrow ? "Saving Throw" : "Skill";

    let formula: DiceFormula;
    if (totalBonus === 0) {
      formula = "1d20";
    } else {
      formula = `1d20${totalBonus >= 0 ? "+" : ""}${totalBonus}`;
    }

    rollDice(formula, rollName, category, characterName);
  };

  const checkboxId = `skill-prof-${String(skillInfo.key)}-${String(attrName)}`;

  return (
    <div key={skillInfo.key} className="flex items-center gap-x-1">
      <label
        htmlFor={checkboxId}
        className="flex items-center gap-x-1 cursor-pointer"
      >
        <input
          type="checkbox"
          id={checkboxId}
          checked={isProficient}
          onChange={(e) => {
            // Não precisa de stopPropagation aqui, pois o label já está associado
            onProficiencyChange(
              skillInfo.key,
              !!skillInfo.isSavingThrow,
              e.target.checked
            );
          }}
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
        {skillInfo.label}
      </span>
    </div>
  );
};
