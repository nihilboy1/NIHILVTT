import React from "react";
import { type PlayerToken, type Attack } from "../../../../types"; // Importar Attack
import { PrincipalHeader } from "./PrincipalHeader";
import PlayerAttributesAndSkills from "./PrincipalAttributesAndSkills";
import PlayerHealthAndCombat from "./PrincipalHealthAndCombat";
import PlayerAttacksAndFeatures from "./PrincipalAttacksAndFeatures";

interface PlayerSheetPrincipalTabProps {
  editingTokenName: string;
  setEditingTokenName: (name: string) => void;
  editingCharClass: string;
  setEditingCharClass: (charClass: string) => void;
  editingLevel: string;
  setEditingLevel: (level: string) => void;
  editingBackground: string;
  setEditingBackground: (background: string) => void;
  editingSpecies: string;
  setEditingSpecies: (species: string) => void;
  editingSubclass: string;
  setEditingSubclass: (subclass: string) => void;
  proficiencyBonus: number;
  editingArmorClass: string;
  setEditingArmorClass: (value: string) => void;
  editingInitiative: string;
  setEditingInitiative: (value: string) => void;
  editingSpeed: string;
  setEditingSpeed: (value: string) => void;
  editingShieldEquipped: boolean;
  setEditingShieldEquipped: (value: boolean) => void;
  editingCurrentHp: string;
  setEditingCurrentHp: (value: string) => void;
  editingTempHp: string;
  setEditingTempHp: (value: string) => void;
  editingMaxHp: string;
  setEditingMaxHp: (value: string) => void;
  editingHitDiceUsed: string;
  setEditingHitDiceUsed: (value: string) => void;
  editingHitDiceMax: string;
  setEditingHitDiceMax: (value: string) => void;
  editingDeathSavesSuccesses: number;
  setEditingDeathSavesSuccesses: (value: number) => void;
  editingDeathSavesFailures: number;
  setEditingDeathSavesFailures: (value: number) => void;
  attributes: NonNullable<PlayerToken["attributes"]>;
  setAttributes: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerToken["attributes"]>>
  >;
  savingThrowProficiencies: NonNullable<
    PlayerToken["proficiencies"]
  >["savingThrows"];
  setSavingThrowProficiencies: React.Dispatch<
    React.SetStateAction<
      NonNullable<PlayerToken["proficiencies"]>["savingThrows"]
    >
  >;
  skillProficiencies: NonNullable<PlayerToken["proficiencies"]>["skills"];
  setSkillProficiencies: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerToken["proficiencies"]>["skills"]>
  >;
  attacks: NonNullable<PlayerToken["attacks"]>;
  handleAddAttack: () => void;
  handleRemoveAttack: (id: string) => void;
  handleAttackChange: (id: string, field: keyof Attack, value: string) => void;
  featuresAndTraits: PlayerToken["featuresAndTraits"];
  setFeaturesAndTraits: React.Dispatch<
    React.SetStateAction<PlayerToken["featuresAndTraits"]>
  >;
  SKILLS_CONFIG: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerToken["attributes"]>;
  }[];
}

const PlayerSheetPrincipalTab: React.FC<PlayerSheetPrincipalTabProps> = ({
  editingTokenName,
  setEditingTokenName,
  editingCharClass,
  setEditingCharClass,
  editingLevel,
  setEditingLevel,
  editingBackground,
  setEditingBackground,
  editingSpecies,
  setEditingSpecies,
  editingSubclass,
  setEditingSubclass,
  proficiencyBonus,
  editingArmorClass,
  setEditingArmorClass,
  editingInitiative,
  setEditingInitiative,
  editingSpeed,
  setEditingSpeed,
  editingShieldEquipped,
  setEditingShieldEquipped,
  editingCurrentHp,
  setEditingCurrentHp,
  editingTempHp,
  setEditingTempHp,
  editingMaxHp,
  setEditingMaxHp,
  editingHitDiceUsed,
  setEditingHitDiceUsed,
  editingHitDiceMax,
  setEditingHitDiceMax,
  editingDeathSavesSuccesses,
  setEditingDeathSavesSuccesses,
  editingDeathSavesFailures,
  setEditingDeathSavesFailures,
  attributes,
  setAttributes,
  savingThrowProficiencies,
  setSavingThrowProficiencies,
  skillProficiencies,
  setSkillProficiencies,
  attacks,
  handleAddAttack,
  handleRemoveAttack,
  handleAttackChange,
  featuresAndTraits,
  setFeaturesAndTraits,
  SKILLS_CONFIG,
}) => {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar">
      <PrincipalHeader
        editingTokenName={editingTokenName}
        setEditingTokenName={setEditingTokenName}
        editingCharClass={editingCharClass}
        setEditingCharClass={setEditingCharClass}
        editingLevel={editingLevel}
        setEditingLevel={setEditingLevel}
        editingBackground={editingBackground}
        setEditingBackground={setEditingBackground}
        editingSpecies={editingSpecies}
        setEditingSpecies={setEditingSpecies}
        editingSubclass={editingSubclass}
        setEditingSubclass={setEditingSubclass}
        proficiencyBonus={proficiencyBonus}
      />

      <div className="flex gap-3 ">
        <PlayerAttributesAndSkills
          attributes={attributes}
          setAttributes={setAttributes}
          savingThrowProficiencies={savingThrowProficiencies}
          setSavingThrowProficiencies={setSavingThrowProficiencies}
          skillProficiencies={skillProficiencies}
          setSkillProficiencies={setSkillProficiencies}
          SKILLS_CONFIG={SKILLS_CONFIG}
          proficiencyBonus={proficiencyBonus}
        />

        <PlayerHealthAndCombat
          editingArmorClass={editingArmorClass}
          setEditingArmorClass={setEditingArmorClass}
          editingInitiative={editingInitiative}
          setEditingInitiative={setEditingInitiative}
          editingSpeed={editingSpeed}
          setEditingSpeed={setEditingSpeed}
          editingShieldEquipped={editingShieldEquipped}
          setEditingShieldEquipped={setEditingShieldEquipped}
          editingCurrentHp={editingCurrentHp}
          setEditingCurrentHp={setEditingCurrentHp}
          editingTempHp={editingTempHp}
          setEditingTempHp={setEditingTempHp}
          editingMaxHp={editingMaxHp}
          setEditingMaxHp={setEditingMaxHp}
          editingHitDiceUsed={editingHitDiceUsed}
          setEditingHitDiceUsed={setEditingHitDiceUsed}
          editingHitDiceMax={editingHitDiceMax}
          setEditingHitDiceMax={setEditingHitDiceMax}
          editingDeathSavesSuccesses={editingDeathSavesSuccesses}
          setEditingDeathSavesSuccesses={setEditingDeathSavesSuccesses}
          editingDeathSavesFailures={editingDeathSavesFailures}
          setEditingDeathSavesFailures={setEditingDeathSavesFailures}
        />

        <PlayerAttacksAndFeatures
          attacks={attacks}
          handleAddAttack={handleAddAttack}
          handleRemoveAttack={handleRemoveAttack}
          handleAttackChange={handleAttackChange}
          featuresAndTraits={featuresAndTraits}
          setFeaturesAndTraits={setFeaturesAndTraits}
        />
      </div>
    </div>
  );
};

export default PlayerSheetPrincipalTab;
