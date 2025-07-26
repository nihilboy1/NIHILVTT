import { useFormContext, Path } from "react-hook-form";
import { z } from "zod";

import {
  getModifier,
  getProficiencyBonusFromLevel,
} from "@/entities/character/lib/utils/characterUtils";
import {
  PlayerCharacter,
  ProficiencyLevelEnum,
} from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";

interface SkillProficiencyItemProps {
  skillLabel: string;
  name: Path<PlayerCharacter>;
  characterName: string;
  onRoll: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    characterName: string
  ) => void;
}

export function SkillProficiencyItem({
  skillLabel,
  name,
  characterName,
  onRoll,
}:SkillProficiencyItemProps)  {
  const { watch, setValue } = useFormContext<PlayerCharacter>();
  const proficiencyLevel = watch(name) as z.infer<typeof ProficiencyLevelEnum>;
  const level = watch("level");
  const proficiencyBonus = getProficiencyBonusFromLevel(level);

  let attributeName: keyof PlayerCharacter["attributes"] | undefined;
  if (name.startsWith("proficiencies.savingThrows.")) {
    attributeName = name.split(".")[2] as keyof PlayerCharacter["attributes"];
  } else if (name.startsWith("proficiencies.skills.")) {
    const skillKey = name.split(".")[2];

    switch (skillKey) {
      case "athletics":
        attributeName = "strength";
        break;
      case "acrobatics":
      case "sleightOfHand":
      case "stealth":
        attributeName = "dexterity";
        break;
      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        attributeName = "intelligence";
        break;
      case "animalHandling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        attributeName = "wisdom";
        break;
      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        attributeName = "charisma";
        break;
      default:
        attributeName = undefined;
    }
  }

  const attributeValue = attributeName
    ? watch(`attributes.${attributeName}`)
    : 0;
  const attributeModifier = getModifier(attributeValue);

  let totalBonus = attributeModifier;
  if (proficiencyLevel === "proficient") {
    totalBonus += proficiencyBonus;
  } else if (proficiencyLevel === "expertise") {
    totalBonus += proficiencyBonus * 2;
  }

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

  const handleProficiencyClick = () => {
    let nextLevel: z.infer<typeof ProficiencyLevelEnum>;
    if (proficiencyLevel === "none") {
      nextLevel = "proficient";
    } else if (proficiencyLevel === "proficient") {
      nextLevel = "expertise";
    } else {
      nextLevel = "none";
    }
    setValue(name, nextLevel, { shouldDirty: true });
  };

  const getProficiencyIndicator = () => {
    switch (proficiencyLevel) {
      case "proficient":
        return (
          <div
            title="Proficiente"
            className="h-3.5 w-3.5 rounded-full bg-accent-secondary flex-shrink-0"
          />
        );
      case "expertise":
        return (
          <div
            title="Especialista"
            className="border h-3.5 w-3.5 rounded-full bg-accent-primary flex-shrink-0 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center text-[0.5rem] text-surface-1 font-bold"></div>
          </div>
        );
      case "none":
      default:
        return (
          <div
            title="Não Proficiente"
            className="h-3.5 w-3.5 rounded-full border border-surface-2 flex-shrink-0"
          />
        );
    }
  };

  function limparSalvaguarda(label: string): string {
    return label.replace(/Salva-guarda de [A-ZÁ-Ú][a-zá-ú]+/, "Salvaguarda");
  }

  return (
    <div
      key={name}
      className="flex items-center gap-x-1 w-fit"
      aria-label="box da skill de um atributo e seu checkbox"
    >
      <button
        type="button"
        onClick={handleProficiencyClick}
        className="flex items-center gap-x-1 cursor-pointer"
        aria-label={`Toggle proficiency for ${skillLabel}`}
      >
        {getProficiencyIndicator()}
        <span className="text-xs font-bold text-accent-primary w-max-[0.375rem] text-right flex-shrink-0">
          {Number.isNaN(totalBonus)
            ? 0
            : totalBonus >= 0
            ? `+${totalBonus}`
            : totalBonus}
        </span>
      </button>
      <span
        className="text-xs font-medium text-accent-primary cursor-pointer hover:bg-surface-2 transition-colors duration-200 rounded-md p-1 flex-grow"
        onClick={handleRoll}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleRoll();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {limparSalvaguarda(skillLabel)}
      </span>
    </div>
  );
};
