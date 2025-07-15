
import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";
import { Character, ProficiencyPath } from "../../../model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";
import { useFormContext } from "react-hook-form";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";

const ATTRIBUTES_CONFIG = {
  strength: {
    label: "Força",
    skills: [{ key: "athletics", label: "Atletismo" }],
  },
  dexterity: {
    label: "Destreza",
    skills: [
      { key: "acrobatics", label: "Acrobacia" },
      { key: "sleightOfHand", label: "Prestidigitação" },
      { key: "stealth", label: "Furtividade" },
    ],
  },
  constitution: { label: "Constituição", skills: [] },
  intelligence: {
    label: "Inteligência",
    skills: [
      { key: "arcana", label: "Arcanismo" },
      { key: "history", label: "História" },
      { key: "investigation", label: "Investigação" },
      { key: "nature", label: "Natureza" },
      { key: "religion", label: "Religião" },
    ],
  },
  wisdom: {
    label: "Sabedoria",
    skills: [
      { key: "animalHandling", label: "Adestrar Animais" },
      { key: "insight", label: "Intuição" },
      { key: "medicine", label: "Medicina" },
      { key: "perception", label: "Percepção" },
      { key: "survival", label: "Sobrevivência" },
    ],
  },
  charisma: {
    label: "Carisma",
    skills: [
      { key: "deception", label: "Enganação" },
      { key: "intimidation", label: "Intimidação" },
      { key: "performance", label: "Atuação" },
      { key: "persuasion", label: "Persuasão" },
    ],
  },
} as const; // 'as const' ajuda o TypeScript a inferir os tipos mais estritos possíveis

// Definimos um tipo para as chaves do nosso objeto de configuração
type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

interface PrincipalAttributesAndSkillsProps {
  className?: string;
}

export function PrincipalAttributesAndSkills({
  className,
}: PrincipalAttributesAndSkillsProps) {
  const { watch } = useFormContext<Character>();
  const { rollDice } = useDiceRollingStore();
  const characterName = watch("name");

  const handleSkillRoll = (formula: DiceFormula, rollName: string, category: RollCategory) => {
    rollDice(formula, rollName, category, characterName);
  };

  return (
    <div className={`flex flex-col space-y-2 rounded-md ${className}`}>
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {
        const { label, skills } = ATTRIBUTES_CONFIG[attrName];

        const attrValue = watch(`attributes.${attrName}`);
        const modifier = attrValue ? Math.floor((attrValue - 10) / 2) : 0;

        const handleAttributeRoll = () => {
          const formula: DiceFormula = `1d20${
            modifier >= 0 ? "+" : ""
          }${modifier}`;
          rollDice(formula, label, "Attribute", characterName);
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
              name={`attributes.${attrName}`}
              label={label}
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
                    name={fieldName as ProficiencyPath}
                    parentAttributeName={`attributes.${attrName}`}
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
