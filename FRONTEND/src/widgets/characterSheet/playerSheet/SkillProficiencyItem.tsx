import { ProficiencyLevel } from "@/entities/character/model/view-models/playerCharacterSkillsViewModel";
import { DiceFormula, RollCategory } from "@/shared/api/types";

interface SkillProficiencyItemProps {
  skillLabel: string;
  isSavingThrow: boolean;
  proficiencyLevel: ProficiencyLevel;
  totalBonus: number;
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
  isSavingThrow,
  proficiencyLevel,
  totalBonus,
  characterName,
  onRoll,
}: SkillProficiencyItemProps) {
  const handleRoll = () => {
    let rollName = skillLabel;

    if (isSavingThrow) {
      const match = skillLabel.match(/Salva-guarda de (.+)/);
      if (match?.[1]) {
        rollName = match[1];
      }
    }

    const category: RollCategory = isSavingThrow ? "Saving Throw" : "Skill";
    const formula: DiceFormula = `1d20${totalBonus >= 0 ? "+" : ""}${totalBonus}`;
    onRoll(formula, rollName, category, characterName);
  };

  const getProficiencyIndicator = () => {
    switch (proficiencyLevel) {
      case "proficient":
        return (
          <div
            title="Proficiente"
            className="h-3 w-3 flex-shrink-0 rounded-full bg-accent-secondary"
          />
        );
      case "expertise":
        return (
          <div
            title="Especialista"
            className="h-3 w-3 flex-shrink-0 rounded-full bg-accent-primary ring-1 ring-accent-secondary/60"
          />
        );
      case "none":
      default:
        return (
          <div
            title="Não Proficiente"
            className="h-3 w-3 flex-shrink-0 rounded-full border border-surface-2/70"
          />
        );
    }
  };

  const displayLabel = isSavingThrow ? "Salvaguarda" : skillLabel;
  const displayBonus = Number.isNaN(totalBonus)
    ? 0
    : totalBonus >= 0
      ? `+${totalBonus}`
      : totalBonus;

  return (
    <div
      className="flex w-full items-center gap-x-2 rounded-md px-0.5 py-0.5"
      aria-label="box da skill de um atributo e seu checkbox"
    >
      <div
        className="flex items-center gap-x-1"
        aria-label={`Proficiência de ${skillLabel}`}
        title="Proficiência definida pela ficha"
      >
        {getProficiencyIndicator()}
        <span className="w-7 flex-shrink-0 text-right text-[0.72rem] font-bold text-accent-secondary">
          {displayBonus}
        </span>
      </div>
      <span
        className="flex-grow cursor-pointer rounded-md px-1 py-0.5 text-[0.72rem] font-medium text-text-primary transition-colors duration-200 hover:bg-surface-0/35"
        onClick={handleRoll}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleRoll();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {displayLabel}
      </span>
    </div>
  );
}
