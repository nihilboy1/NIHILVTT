import { usePlayerSheet } from "../../../../contexts/PlayerSheetContext";
import { ATTRIBUTE_LABELS } from "../../../../constants/sheetDefaults";
import { cn } from "../../../../utils/cn";
import { type PlayerToken } from "../../../../types"; // Importar PlayerToken para tipagem interna

export function PlayerAttributesAndSkills() {
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

  return (
    <div className="flex flex-col space-y-2 rounded-md">
      {(Object.keys(attributes) as Array<keyof typeof attributes>).map(
        (attrName) => {
          const attrLabel =
            ATTRIBUTE_LABELS[attrName as keyof typeof ATTRIBUTE_LABELS];
          const modifier = Math.floor((attributes[attrName] - 10) / 2);

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
            ),
          ];

          return (
            <div
              key={attrName}
              className="flex flex-col space-y-2 p-3 rounded bg-surface-1"
            >
              <div className="flex justify-between w-[10rem]">
                <div className="flex flex-col ">
                  <label
                    htmlFor={`attr-${attrName}`}
                    className={cn(
                      "block text-xs font-bold mb-0.5",
                      "text-xs uppercase"
                    )}
                  >
                    {attrLabel}
                  </label>
                  <input
                    id={`attr-${attrName}`}
                    type="number"
                    value={attributes[attrName]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value)) {
                        setAttributes(
                          (prev: NonNullable<PlayerToken["attributes"]>) => ({
                            ...prev,
                            [attrName]: Math.max(1, Math.min(30, value)),
                          })
                        );
                      } else if (e.target.value === "") {
                        setAttributes(
                          (prev: NonNullable<PlayerToken["attributes"]>) => ({
                            ...prev,
                            [attrName]: 10,
                          })
                        );
                      }
                    }}
                    className={cn(
                      "hide-arrows w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                      "text-center hide-number-spinners w-12 text-lg font-semibold p-0"
                    )}
                  />
                </div>
                <div id="modificador" className="flex items-center justify-center w-14">
                  <span className="block text-2xl font-bold p-1 border  rounded w-full text-center ">
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </span>
                </div>
              </div>
              {parentAttributeSkills.length > 0 && (
                <div className="mt-1.5  space-y-0.5">
                  {parentAttributeSkills.map((skillInfo) => {
                    const isSavingThrow = (skillInfo as any).isSavingThrow;
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
                        <div
                          key={skillInfo.key}
                          className="flex items-center gap-x-1"
                        >
                        <input
                          type="checkbox"
                          id={`skill-prof-${String(skillInfo.key)}-${String(
                            attrName
                          )}`}
                          checked={isProficient}
                          onChange={(e) => {
                            if (isSavingThrow) {
                              setSavingThrowProficiencies(
                                (
                                  prev: NonNullable<
                                    PlayerToken["proficiencies"]
                                  >["savingThrows"]
                                ) => ({
                                  ...prev,
                                  [skillKey as keyof typeof prev]:
                                    e.target.checked,
                                })
                              );
                            } else {
                              setSkillProficiencies(
                                (
                                  prev: NonNullable<
                                    PlayerToken["proficiencies"]
                                  >["skills"]
                                ) => ({
                                  ...prev,
                                  [skillKey as keyof typeof prev]:
                                    e.target.checked,
                                })
                              );
                            }
                          }}
                          className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1 flex-shrink-0"
                        />
                        <label
                          htmlFor={`skill-prof-${String(
                            skillInfo.key
                          )}-${String(attrName)}`}
                          className="text-xs font-bold text-accent-primary w-max-[0.375rem] text-right flex-shrink-0"
                        >
                          {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
                        </label>
                        <label
                          htmlFor={`skill-prof-${String(
                            skillInfo.key
                          )}-${String(attrName)}`}
                          className="text-xs font-medium text-accent-primary cursor-pointer flex-grow"
                        >
                          {skillInfo.label}
                        </label>
                      </div>
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
