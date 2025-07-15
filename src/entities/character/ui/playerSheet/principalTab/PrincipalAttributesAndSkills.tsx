
import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";
import { DiceFormula, RollCategory } from "@/shared/api/types";
import { getProficiencyBonusFromLevel } from "@/entities/character/lib/utils/characterUtils";

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
} as const;

type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

interface PrincipalAttributesAndSkillsProps {
  className?: string;
  characterName: string;
  level: number;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  proficiencies: {
    savingThrows: Record<string, boolean>;
    skills: Record<string, boolean>;
  };
  onRollDice: (formula: DiceFormula, rollName: string, category: RollCategory, characterName: string) => void;
  onAttributeChange: (attributeName: AttributeName, value: number) => void;
  onToggleProficiency: (proficiencyPath: string, isProficient: boolean) => void;
}

export function PrincipalAttributesAndSkills({
  className,
  characterName,
  level,
  attributes,
  proficiencies,
  onRollDice,
  onAttributeChange,
  onToggleProficiency,
}: PrincipalAttributesAndSkillsProps) {
  const proficiencyBonus = getProficiencyBonusFromLevel(level);

  const handleSkillRoll = (formula: DiceFormula, rollName: string, category: RollCategory) => {
    onRollDice(formula, rollName, category, characterName);
  };

  return (
    <div className={`flex flex-col space-y-2 rounded-md ${className}`}>
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {
        const { label, skills } = ATTRIBUTES_CONFIG[attrName];

        const attrValue = attributes[attrName];
        const attributeModifier = attrValue ? Math.floor((attrValue - 10) / 2) : 0;

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
              name={`attributes.${attrName}`}
              label={label}
              value={attrValue}
              modifier={attributeModifier}
              onRoll={handleAttributeRoll}
              onChange={(value) => onAttributeChange(attrName, value)}
            />

            <div className="mt-1.5 space-y-0.5">
              {allSkills.map((skillInfo) => {
                const fieldName = skillInfo.isSavingThrow
                  ? `proficiencies.savingThrows.${skillInfo.key}`
                  : `proficiencies.skills.${skillInfo.key}`;

                const isProficient = skillInfo.isSavingThrow
                  ? proficiencies.savingThrows[skillInfo.key]
                  : proficiencies.skills[skillInfo.key];

                const totalBonus = isProficient
                  ? attributeModifier + proficiencyBonus
                  : attributeModifier;

                return (
                  <SkillProficiencyItem
                    key={skillInfo.key}
                    skillLabel={skillInfo.label}
                    name={fieldName}
                    isProficient={isProficient}
                    totalBonus={totalBonus}
                    characterName={characterName}
                    onRoll={handleSkillRoll}
                    onToggleProficiency={onToggleProficiency}
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
