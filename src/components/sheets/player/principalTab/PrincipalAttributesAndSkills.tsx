import { usePlayerSheet } from "../../../../contexts/PlayerSheetContext";
import { type PlayerToken } from "../../../../shared/types";
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
    attrName: keyof NonNullable<PlayerToken["attributes"]>,
    value: number | ""
  ) => {
    setAttributes((prev: NonNullable<PlayerToken["attributes"]>) => ({
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
        (prev: NonNullable<PlayerToken["proficiencies"]>["savingThrows"]) => ({
          ...prev,
          [skillKey as keyof typeof prev]: checked,
        })
      );
    } else {
      setSkillProficiencies(
        (prev: NonNullable<PlayerToken["proficiencies"]>["skills"]) => ({
          ...prev,
          [skillKey as keyof typeof prev]: checked,
        })
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2 rounded-md">
      {(Object.keys(attributes) as Array<keyof typeof attributes>).map(
        (attrName) => {
          const attrValue = attributes[attrName];
          const modifier = Math.floor((attrValue - 10) / 2);

          const savingThrowSkill = {
            key: `${attrName}SavingThrow`,
            label: "Salvaguarda",
            parentAttribute: attrName,
            isSavingThrow: true,
          };

          const parentAttributeSkills = [
            savingThrowSkill,
            ...SKILLS_CONFIG.filter(
              (skill) => skill.parentAttribute === attrName
            ).map((skill) => ({ ...skill, isSavingThrow: false })), // Adiciona isSavingThrow: false para as perícias
          ];

          return (
            <div
              key={attrName}
              className="flex flex-col space-y-2 p-3 rounded bg-surface-1"
            >
              <AttributeBlock
                attrName={attrName}
                attrValue={attrValue}
                onAttributeChange={handleAttributeChange}
              />
              {parentAttributeSkills.length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                  {parentAttributeSkills.map((skillInfo) => {
                    const isSavingThrow = !!skillInfo.isSavingThrow;
                    const skillKey = isSavingThrow
                      ? (attrName as keyof NonNullable<
                          PlayerToken["proficiencies"]
                        >["savingThrows"])
                      : (skillInfo.key as keyof NonNullable<
                          PlayerToken["proficiencies"]
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
                        attrName={attrName}
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
