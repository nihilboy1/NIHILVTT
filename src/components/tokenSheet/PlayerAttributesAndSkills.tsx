import React from "react";
import { type PlayerToken} from "../../types/index"; // Caminho corrigido
import { ATTRIBUTE_LABELS } from "../../constants/tokenSheetDefaults"; // Importar ATTRIBUTE_LABELS
import {
  condensedLabelClass, // Manter condensedLabelClass
  inputClass, // Usar inputClass
  condensedCheckboxClass,
} from "../../styles/formClasses";

interface PlayerAttributesAndSkillsProps {
  attributes: NonNullable<PlayerToken["attributes"]>;
  setAttributes: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerToken["attributes"]>>
  >;
  savingThrowProficiencies: NonNullable<
    PlayerToken["proficiencies"]
  >["savingThrows"];
  setSavingThrowProficiencies: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerToken["proficiencies"]>["savingThrows"]>
  >;
  skillProficiencies: NonNullable<PlayerToken["proficiencies"]>["skills"];
  setSkillProficiencies: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerToken["proficiencies"]>["skills"]>
  >;
  SKILLS_CONFIG: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerToken["attributes"]>;
  }[];
  proficiencyBonus: number;
}

const PlayerAttributesAndSkills: React.FC<PlayerAttributesAndSkillsProps> = ({
  attributes,
  setAttributes,
  savingThrowProficiencies,
  setSavingThrowProficiencies,
  skillProficiencies,
  setSkillProficiencies,
  SKILLS_CONFIG,
  proficiencyBonus,
}) => {
  return (
    <div className="col-span-1 flex flex-col space-y-2 border border-border-inactive p-2 rounded-md">
      {(Object.keys(attributes) as Array<keyof typeof attributes>).map(
        (attrName) => {
          const attrLabel = ATTRIBUTE_LABELS[attrName]; // Usar ATTRIBUTE_LABELS
          const modifier = Math.floor((attributes[attrName] - 10) / 2);

          // Filtrar perícias para o atributo atual
          const parentAttributeSkills = SKILLS_CONFIG.filter(
            (skill) => skill.parentAttribute === attrName
          );

          return (
            // Alterar para flex-col para acomodar perícias abaixo
            <div
              key={attrName}
              className="flex flex-col space-y-1 border border-border-inactive p-1.5 rounded"
            >
              {/* Grid original para valor, modificador e salvaguarda */}
              <div className="grid grid-cols-3 items-center gap-x-1.5">
                <div className="flex flex-col items-center col-span-1">
                  <label
                    htmlFor={`attr-${attrName}`}
                    className={`${condensedLabelClass} text-xs uppercase`}
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
                      setAttributes((prev) => ({
                        ...prev,
                        [attrName]: Math.max(1, Math.min(30, value)),
                      }));
                    } else if (e.target.value === "") {
                      setAttributes((prev) => ({
                        ...prev,
                        [attrName]: 10,
                      }));
                    }
                  }}
                  className={`${inputClass} text-center hide-number-spinners w-12 text-lg font-semibold p-0`}
                />
              </div>
              <div className="flex items-center justify-center col-span-1">
                <span className="text-2xl font-bold text-foreground p-1 border border-border-inactive rounded bg-background">
                  {modifier >= 0 ? `+${modifier}` : modifier}
                </span>
              </div>
              <div className="flex flex-col items-center col-span-1">
                <label
                  htmlFor={`save-prof-${attrName}`}
                  className={`${condensedLabelClass} text-[10px] text-center`}
                >
                  Prof. em Salvaguarda {/* Label Localizada */}
                </label>
                <input
                  id={`save-prof-${attrName}`}
                  type="checkbox"
                  checked={
                    savingThrowProficiencies[
                      attrName as keyof typeof savingThrowProficiencies
                    ]
                  }
                  onChange={(e) =>
                    setSavingThrowProficiencies((prev) => ({
                      ...prev,
                      [attrName]: e.target.checked,
                    }))
                  }
                  className={`${condensedCheckboxClass} h-4 w-4`}
                />
              </div>
              </div> {/* Fim da grid original */}

              {/* Nova seção para perícias aninhadas */}
              {parentAttributeSkills.length > 0 && (
                <div className="mt-1.5 pt-1.5 border-t border-text-secondary space-y-0.5">
                  {parentAttributeSkills.map((skillInfo) => {
                    const skillKey =
                      skillInfo.key as keyof typeof skillProficiencies;
                    // O 'modifier' já foi calculado acima para o atributo pai (attrName)
                    const isProficient = skillProficiencies[skillKey];
                    const proficiencyBonusValue = isProficient
                      ? proficiencyBonus
                      : 0;
                    const totalBonus = modifier + proficiencyBonusValue;

                    return (
                      <div
                        key={skillKey}
                        className="grid grid-cols-12 items-center gap-x-1"
                      >
                        <input
                          type="checkbox"
                          id={`skill-prof-${skillKey}-${attrName}`} // Adicionar attrName para ID único
                          checked={isProficient}
                          onChange={(e) =>
                            setSkillProficiencies((prev) => ({
                              ...prev,
                              [skillKey]: e.target.checked,
                            }))
                          }
                          className={`${condensedCheckboxClass} h-3.5 w-3.5 col-span-1 justify-self-center`}
                        />
                        <label
                          htmlFor={`skill-prof-${skillKey}-${attrName}`}
                          className={`${condensedLabelClass} col-span-1 text-[10px] text-center mb-0`}
                        >
                          {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
                        </label>
                        <label
                          htmlFor={`skill-prof-${skillKey}-${attrName}`}
                          className={`${condensedLabelClass} col-span-10 text-xs mb-0 cursor-pointer hover:text-foreground`}
                        >
                          {skillInfo.label}{" "}
                          {/* A abreviação do atributo pai não é mais necessária aqui, pois está implícito pelo aninhamento */}
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
      {/* O bloco de Perícias separado foi removido */}
    </div>
  );
};

export default PlayerAttributesAndSkills;
