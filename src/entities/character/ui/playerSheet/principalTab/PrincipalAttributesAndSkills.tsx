import { type PlayerCharacter } from "../../../../../shared/api/types";
import { usePlayerSheet } from "../../../model/contexts/CharacterSheetContext"; // Renomeado
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
        (
          prev: NonNullable<PlayerCharacter["proficiencies"]>["savingThrows"]
        ) => ({
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
        (attrName: keyof NonNullable<PlayerCharacter["attributes"]>) => {
          // Adicionado tipagem para attrName
          const attrValue = attributes[attrName];

          const savingThrowSkill: {
            key: keyof NonNullable<PlayerCharacter["proficiencies"]>["savingThrows"];
            label: string;
            parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
            isSavingThrow: true;
          } = {
            key: attrName, // A chave para salvaguardas é o próprio nome do atributo
            label: "Salvaguarda",
            parentAttribute: attrName,
            isSavingThrow: true,
          };

          const parentAttributeSkills = [
            savingThrowSkill,
            ...(SKILLS_CONFIG.filter(
              (skill) => skill.parentAttribute === attrName
            ) as Array<{
              key: keyof NonNullable<PlayerCharacter["proficiencies"]>["skills"];
              label: string;
              parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
            }>).map(
              (skill) => ({ ...skill, isSavingThrow: false })
            ),
          ];

          return (
            <div
              key={String(attrName)} // Adicionado String()
              className="flex flex-col space-y-2 p-3 rounded bg-surface-1"
            >
              <AttributeBlock
                attrName={attrName}
                attrValue={attrValue}
                onAttributeChange={handleAttributeChange}
                // characterName removido, pois AttributeBlock o obtém do contexto
              />
              {parentAttributeSkills.length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                  {parentAttributeSkills.map((skillInfo) => {
                    const isSavingThrow = !!skillInfo.isSavingThrow;
                    const skillKey = isSavingThrow
                      ? (attrName as keyof NonNullable<
                          PlayerCharacter["proficiencies"]
                        >["savingThrows"]) // Usar attrName diretamente para salvaguardas
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

                    // totalBonus, proficiencyBonusValue e modifier não são mais passados,
                    // pois SkillProficiencyItem os calcula internamente.

                    return (
                      <SkillProficiencyItem
                        key={skillInfo.key}
                        skillInfo={skillInfo}
                        isProficient={isProficient}
                        onProficiencyChange={handleProficiencyChange}
                        // totalBonus, attrName, characterName removidos
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
