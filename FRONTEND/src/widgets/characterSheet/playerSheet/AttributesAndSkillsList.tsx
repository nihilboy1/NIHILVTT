import { useFormContext, Path } from "react-hook-form";

import { ATTRIBUTES_CONFIG } from "@/entities/character/constants";
import { getModifier } from "@/entities/character/lib/utils/characterUtils";
import { PlayerCharacter } from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";

import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";

type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

interface AttributesAndSkillsListProps {
  className?: string;
  onRollDice: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    characterName: string
  ) => void;
}

export function AttributesAndSkillsList({
  className,
  onRollDice,
}: AttributesAndSkillsListProps) {
  const { watch } = useFormContext<PlayerCharacter>();

  const characterName = watch("name");

  const handleSkillRoll = (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory
  ) => {
    onRollDice(formula, rollName, category, characterName);
  };

  return (
    <div className={`flex flex-col space-y-2 rounded-md ${className}`}>
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {
        const { label, skills } = ATTRIBUTES_CONFIG[attrName];

        const attrValue = watch(`attributes.${attrName}`);
        const attributeModifier = getModifier(attrValue);

        const handleAttributeRoll = () => {
          const formula: DiceFormula = `1d20${
            attributeModifier >= 0 ? "+" : ""
          }${attributeModifier}`;
          onRollDice(formula, label, "Attribute", characterName);
        };

        const savingThrowInfo = {
          key: attrName,
          label: `Salva-guarda de ${label}`,
          isSavingThrow: true,
        };

        const allSkills = [
          savingThrowInfo,
          ...skills.map((s) => ({ ...s, isSavingThrow: false })),
        ];

        return (
          <div
            key={attrName}
            className="flex flex-col space-y-2 p-3 rounded bg-surface-1 w-[14rem]"
            aria-label="bloco de atributo externo"
          >
            <AttributeBlock
              name={`attributes.${attrName}` as Path<PlayerCharacter>}
              label={label}
              modifier={attributeModifier}
              onRoll={handleAttributeRoll}
            />

            <div className="mt-1.5 space-y-0.5">
              {allSkills.map((skillInfo) => {
                const fieldName = skillInfo.isSavingThrow
                  ? `proficiencies.savingThrows.${skillInfo.key}`
                  : `proficiencies.skills.${skillInfo.key}`;

                return (
                  <SkillProficiencyItem
                    key={skillInfo.key}
                    skillLabel={skillInfo.label}
                    name={fieldName as Path<PlayerCharacter>}
                    characterName={characterName}
                    onRoll={handleSkillRoll}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
