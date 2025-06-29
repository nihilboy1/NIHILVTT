import { usePlayerSheet } from "../../../../contexts/CharacterSheetContext"; // Renomeado
import { type PlayerCharacter } from "../../../../shared/api/types";
import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";

export function PrincipalAttributesAndSkills() {
  const {
    attributes,
    setAttributes,
    savingThrowProficiencies,
    setSavingThrowProficiencies,
    skillProficiencies,
    setSkillProficiencies,
    SKILLS_CONFIG,
    proficiencyBonus,
  } = usePlayerSheet();

  const handleAttributeChange = (
    attrName: keyof NonNullable<PlayerCharacter["attributes"]>,
    value: number | ""
  ) => {
    setAttributes((prev: NonNullable<PlayerCharacter["attributes"]>) => ({
      ...prev,
      [attrName]: value === "" ? 10 : Math.max(1, Math.min(30, value)),
    }));
  };

  const handleProficiencyChange = (
    skillKey: string,
    isSavingThrow: boolean,
    checked: boolean
  ) => {
    if (isSavingThrow) {
      setSavingThrowProficiencies(
        (prev: NonNullable<PlayerCharacter["proficiencies"]>["savingThrows"]) => ({
          ...prev,
          [skillKey as keyof typeof prev]: checked,
        })
      );
    } else {
      setSkillProficiencies(
        (prev: NonNullable<PlayerCharacter["proficiencies"]>["skills"]) => ({
          ...prev,
          [skillKey as keyof typeof prev]: checked,
        })
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 rounded-md">
      {(Object.keys(attributes) as Array<keyof typeof attributes>).map(
        (attrName: keyof NonNullable<PlayerCharacter["attributes"]>) => { // Adicionado tipagem para attrName
          const attrValue = attributes[attrName];
          const modifier = Math.floor((attrValue - 10) / 2);

          const savingThrowSkill = {
            key: String(`${attrName}SavingThrow`), // Adicionado String()
            label: "Salvaguarda",
            parentAttribute: attrName,
            isSavingThrow: true,
          };

          const parentAttributeSkills = [
            savingThrowSkill,
            ...SKILLS_CONFIG.filter(
              (skill: { parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]> }) => skill.parentAttribute === attrName // Adicionado tipagem para skill
            ).map((skill: { key: string; label: string; parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]> }) => ({ ...skill, isSavingThrow: false })), // Adicionado tipagem para skill
          ];

          return (
            <div
              key={String(attrName)} // Adicionado String()
              className="flex flex-col space-y-2 p-3 rounded bg-surface-1"
            >
              <AttributeBlock
                attrName={attrName as keyof NonNullable<PlayerCharacter["attributes"]>} // Adicionado tipagem
                attrValue={attrValue}
                onAttributeChange={handleAttributeChange}
              />
              {parentAttributeSkills.length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                  {parentAttributeSkills.map((skillInfo) => {
                    const isSavingThrow = !!skillInfo.isSavingThrow;
                    const skillKey = isSavingThrow
                      ? (attrName as keyof NonNullable<
                          PlayerCharacter["proficiencies"]
                        >["savingThrows"])
                      : (skillInfo.key as keyof NonNullable<
                          PlayerCharacter["proficiencies"]
                        >["skills"]);

                    const isProficient = isSavingThrow
                      ? savingThrowProficiencies[
                          skillKey as keyof typeof savingThrowProficiencies
                        ]
                      : skillProficiencies[
                          skillKey as keyof typeof skillProficiencies
                        ];

                    const proficiencyBonusValue = isProficient
                      ? proficiencyBonus
                      : 0;
                    const totalBonus = modifier + proficiencyBonusValue;

                    return (
                      <SkillProficiencyItem
                        key={skillInfo.key}
                        skillInfo={skillInfo}
                        isProficient={isProficient}
                        totalBonus={totalBonus}
                        onProficiencyChange={handleProficiencyChange}
                        attrName={attrName as keyof NonNullable<PlayerCharacter["attributes"]>} // Adicionado tipagem
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
