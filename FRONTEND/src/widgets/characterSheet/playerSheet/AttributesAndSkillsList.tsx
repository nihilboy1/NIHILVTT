import { useMemo } from "react";

import { usePlayerCharacter } from "@/entities/character/lib/hooks/usePlayerCharacter";
import { ATTRIBUTES_CONFIG } from "@/entities/character/constants";
import { useCharactersStore } from "@/entities/character/model/store";
import { buildPlayerCharacterSkillsViewModel } from "@/entities/character/model/view-models/playerCharacterSkillsViewModel";
import { PlayerCharacter } from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";

import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";

type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

type DefaultAttributes = PlayerCharacter["attributes"];
type DefaultProficiencies = PlayerCharacter["proficiencies"];

const DEFAULT_ATTRIBUTES: DefaultAttributes = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

const DEFAULT_PROFICIENCIES: DefaultProficiencies = {
  savingThrows: {
    strength: "none",
    dexterity: "none",
    constitution: "none",
    intelligence: "none",
    wisdom: "none",
    charisma: "none",
  },
  skills: {
    acrobatics: "none",
    animalHandling: "none",
    arcana: "none",
    athletics: "none",
    deception: "none",
    history: "none",
    insight: "none",
    intimidation: "none",
    investigation: "none",
    medicine: "none",
    nature: "none",
    perception: "none",
    performance: "none",
    persuasion: "none",
    religion: "none",
    sleightOfHand: "none",
    stealth: "none",
    survival: "none",
  },
};

interface AttributesAndSkillsListProps {
  characterId: string;
  className?: string;
  onRollDice: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    characterName: string
  ) => void;
}

export function AttributesAndSkillsList({
  characterId,
  className,
  onRollDice,
}: AttributesAndSkillsListProps) {
  const character = usePlayerCharacter(characterId);
  const runtimeCharacter = useCharactersStore(
    (state) => state.runtimeCharactersById[characterId] ?? null
  );

  const characterName = runtimeCharacter?.name ?? character?.name ?? "";
  const level = runtimeCharacter?.progression.currentLevel ?? character?.level ?? 1;
  const attributes = runtimeCharacter?.attributes.base ?? character?.attributes ?? DEFAULT_ATTRIBUTES;
  const proficiencies = character?.proficiencies ?? DEFAULT_PROFICIENCIES;

  const skillsViewModel = useMemo(
    () =>
      buildPlayerCharacterSkillsViewModel({
        level,
        attributes,
        proficiencies,
      }),
    [level, attributes, proficiencies]
  );

  const handleSkillRoll = (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory
  ) => {
    onRollDice(formula, rollName, category, characterName);
  };

  return (
    <div className={`grid grid-cols-1 gap-2 md:grid-cols-3 ${className}`}>
      <div className="md:col-span-3 rounded-lg bg-surface-0/22 px-3 py-1.5 text-[0.66rem] font-medium tracking-[0.04em] text-text-secondary">
        Atributos e proficiências são definidos pela construção, progressão e efeitos ativos.
      </div>
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {
        const { label, skills } = ATTRIBUTES_CONFIG[attrName];
        const attributeValue = skillsViewModel.attributeValues[attrName];
        const attributeModifier = skillsViewModel.attributeModifiers[attrName];

        const handleAttributeRoll = () => {
          const formula: DiceFormula = `1d20${
            attributeModifier >= 0 ? "+" : ""
          }${attributeModifier}`;
          onRollDice(formula, label, "Attribute", characterName);
        };

        return (
          <div
            key={attrName}
            className="flex w-full flex-col gap-1.5 rounded-xl bg-surface-1/55 px-2 py-2"
            aria-label="bloco de atributo externo"
          >
            <AttributeBlock
              value={attributeValue}
              label={label}
              modifier={attributeModifier}
              onRoll={handleAttributeRoll}
            />

            <div className="space-y-0.5 px-0.5">
              <SkillProficiencyItem
                key={`${attrName}-save`}
                skillLabel={`Salva-guarda de ${label}`}
                isSavingThrow
                proficiencyLevel={skillsViewModel.savingThrowBonuses[attrName].proficiencyLevel}
                totalBonus={skillsViewModel.savingThrowBonuses[attrName].totalBonus}
                characterName={characterName}
                onRoll={handleSkillRoll}
              />
              {skills.map((skillInfo) => {
                const skillBonus = skillsViewModel.skillBonuses[skillInfo.key];

                return (
                  <SkillProficiencyItem
                    key={skillInfo.key}
                    skillLabel={skillInfo.label}
                    isSavingThrow={false}
                    proficiencyLevel={skillBonus.proficiencyLevel}
                    totalBonus={skillBonus.totalBonus}
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
