import React from "react";
import { PlayerCharacter } from "../../../../shared/api/types";

interface SkillProficiencyItemProps {
  skillInfo: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
    isSavingThrow?: boolean; // Adicionado como opcional
  };
  isProficient: boolean;
  totalBonus: number;
  onProficiencyChange: (
    skillKey: string,
    isSavingThrow: boolean,
    checked: boolean
  ) => void;
  attrName: keyof NonNullable<PlayerCharacter["attributes"]>;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillInfo,
  isProficient,
  totalBonus,
  onProficiencyChange,
  attrName,
}) => {
  return (
    <div key={skillInfo.key} className="flex items-center gap-x-1">
      <input
        type="checkbox"
        id={`skill-prof-${String(skillInfo.key)}-${String(attrName)}`}
        checked={isProficient}
        onChange={(e) =>
          onProficiencyChange(
            skillInfo.key,
            !!skillInfo.isSavingThrow,
            e.target.checked
          )
        }
        className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1 flex-shrink-0"
      />
      <label
        htmlFor={`skill-prof-${String(skillInfo.key)}-${String(attrName)}`}
        className="text-xs font-bold text-accent-primary w-max-[0.375rem] text-right flex-shrink-0"
      >
        {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
      </label>
      <label
        htmlFor={`skill-prof-${String(skillInfo.key)}-${String(attrName)}`}
        className="text-xs font-medium text-accent-primary cursor-pointer flex-grow"
      >
        {skillInfo.label}
      </label>
    </div>
  );
};
