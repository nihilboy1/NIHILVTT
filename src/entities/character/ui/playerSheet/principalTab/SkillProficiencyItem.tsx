// src/entities/character/ui/playerSheet/principalTab/SkillProficiencyItem.tsx

import React from "react";
import { useFormContext } from 'react-hook-form';
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import { type DiceFormula, type RollCategory } from "../../../../../shared/api/types";
import { type PlayerCharacterSchema, type ProficiencyPath } from "../../../model/schemas/character.schema";

interface SkillProficiencyItemProps {
  skillLabel: string;
  name: ProficiencyPath;
  parentAttributeName: `attributes.${keyof PlayerCharacterSchema['attributes']}`;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillLabel,
  name,
  parentAttributeName,
}) => {
  const { register, watch } = useFormContext<PlayerCharacterSchema>();

  const isProficient = watch(name);
  const attributeValue = watch(parentAttributeName);
  const level = watch('level');
  const characterName = watch('name');

  const proficiencyBonus = level ? Math.floor((level - 1) / 4) + 2 : 2;
  const attributeModifier = attributeValue ? Math.floor((attributeValue - 10) / 2) : 0;
  const totalBonus = isProficient
    ? attributeModifier + proficiencyBonus
    : attributeModifier;

  const { rollDice } = useDiceRoller();

  const handleRoll = () => {
    const isSavingThrow = name.includes('savingThrows');
    // CORREÇÃO: Usamos diretamente a prop 'skillLabel', que já vem formatada do pai.
    const rollName = skillLabel;
    const category: RollCategory = isSavingThrow ? "Saving Throw" : "Skill";
    const formula: DiceFormula = `1d20${totalBonus >= 0 ? "+" : ""}${totalBonus}`;
    rollDice(formula, rollName, category, characterName);
  };

  const checkboxId = `skill-prof-${name}`;

  return (
    <div key={name} className="flex items-center gap-x-1">
      <label htmlFor={checkboxId} className="flex items-center gap-x-1 cursor-pointer">
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
        {skillLabel}
      </span>
    </div>
  );
};