// src/entities/character/ui/playerSheet/principalTab/SkillProficiencyItem.tsx

import { useFormContext, Path } from 'react-hook-form';
import {
  type DiceFormula,
  type RollCategory,
} from "../../../../../shared/api/types";
import { PlayerCharacter } from '../../../model/schemas/character.schema';
import { getModifier, getProficiencyBonusFromLevel } from "@/entities/character/lib/utils/characterUtils";

interface SkillProficiencyItemProps {
  skillLabel: string;
  name: Path<PlayerCharacter>;
  characterName: string;
  onRoll: (formula: DiceFormula, rollName: string, category: RollCategory, characterName: string) => void;
}

export const SkillProficiencyItem: React.FC<SkillProficiencyItemProps> = ({
  skillLabel,
  name,
  characterName,
  onRoll,
}) => {
  const { register, watch } = useFormContext<PlayerCharacter>();
  const isProficient = watch(name);
  const level = watch('level');
  const proficiencyBonus = getProficiencyBonusFromLevel(level);

  // Determine the attribute associated with the skill/saving throw
  let attributeName: keyof PlayerCharacter['attributes'] | undefined;
  if (name.startsWith('proficiencies.savingThrows.')) {
    attributeName = name.split('.')[2] as keyof PlayerCharacter['attributes'];
  } else if (name.startsWith('proficiencies.skills.')) {
    const skillKey = name.split('.')[2];
    // This mapping needs to be consistent with ATTRIBUTES_CONFIG in PrincipalAttributesAndSkills.tsx
    // For simplicity, I'll hardcode a few common ones or assume a direct mapping if possible.
    // A more robust solution would involve importing ATTRIBUTES_CONFIG or a similar mapping.
    switch (skillKey) {
      case 'athletics': attributeName = 'strength'; break;
      case 'acrobatics':
      case 'sleightOfHand':
      case 'stealth': attributeName = 'dexterity'; break;
      case 'arcana':
      case 'history':
      case 'investigation':
      case 'nature':
      case 'religion': attributeName = 'intelligence'; break;
      case 'animalHandling':
      case 'insight':
      case 'medicine':
      case 'perception':
      case 'survival': attributeName = 'wisdom'; break;
      case 'deception':
      case 'intimidation':
      case 'performance':
      case 'persuasion': attributeName = 'charisma'; break;
      default: attributeName = undefined;
    }
  }

  const attributeValue = attributeName ? watch(`attributes.${attributeName}`) : 0;
  const attributeModifier = getModifier(attributeValue);

  const totalBonus = isProficient
    ? attributeModifier + proficiencyBonus
    : attributeModifier;
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
