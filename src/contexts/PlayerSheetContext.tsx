import React, { createContext, useContext, useState, useCallback } from "react";
import { type PlayerToken, type Attack, type HitDiceEntry } from "../types";
import { SKILLS_CONFIG } from "../constants/sheetDefaults";

interface PlayerSheetContextType {
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
  editingHitDiceEntries: HitDiceEntry[];
  setEditingHitDiceEntries: (value: HitDiceEntry[]) => void;
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

const PlayerSheetContext = createContext<PlayerSheetContextType | undefined>(
  undefined
);

interface PlayerSheetProviderProps {
  children: React.ReactNode;
  initialToken: PlayerToken;
  setToken: (token: PlayerToken) => void;
}

export function PlayerSheetProvider({
  children,
  initialToken,
  setToken,
}: PlayerSheetProviderProps) {
  const [editingTokenName, setEditingTokenName] = useState(
    initialToken.name || ""
  );
  const [editingCharClass, setEditingCharClass] = useState(
    initialToken.charClass || ""
  );
  const [editingLevel, setEditingLevel] = useState(
    initialToken.level?.toString() || ""
  );
  const [editingBackground, setEditingBackground] = useState(
    initialToken.background || ""
  );
  const [editingSpecies, setEditingSpecies] = useState(
    initialToken.species || ""
  );
  const [editingSubclass, setEditingSubclass] = useState(
    initialToken.subclass || ""
  );
  const [proficiencyBonus, setProficiencyBonus] = useState(
    initialToken.proficiencyBonus || 2
  );
  const [editingArmorClass, setEditingArmorClass] = useState(
    initialToken.armorClass?.toString() || ""
  );
  const [editingInitiative, setEditingInitiative] = useState(
    initialToken.initiative?.toString() || ""
  );
  const [editingSpeed, setEditingSpeed] = useState(
    initialToken.speed?.toString() || ""
  );
  const [editingShieldEquipped, setEditingShieldEquipped] = useState(
    initialToken.shieldEquipped || false
  );
  const [editingCurrentHp, setEditingCurrentHp] = useState(
    initialToken.currentHp?.toString() || ""
  );
  const [editingTempHp, setEditingTempHp] = useState(
    initialToken.tempHp?.toString() || ""
  );
  const [editingMaxHp, setEditingMaxHp] = useState(
    initialToken.maxHp?.toString() || ""
  );
  const [editingHitDiceEntries, setEditingHitDiceEntries] = useState<
    HitDiceEntry[]
  >(initialToken.hitDiceEntries || []);
  const [editingDeathSavesSuccesses, setEditingDeathSavesSuccesses] = useState(
    initialToken.deathSavesSuccesses || 0
  );
  const [editingDeathSavesFailures, setEditingDeathSavesFailures] = useState(
    initialToken.deathSavesFailures || 0
  );
  const [attributes, setAttributes] = useState<
    NonNullable<PlayerToken["attributes"]>
  >(
    initialToken.attributes || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }
  );
  const [savingThrowProficiencies, setSavingThrowProficiencies] = useState<
    NonNullable<PlayerToken["proficiencies"]>["savingThrows"]
  >(
    initialToken.proficiencies?.savingThrows || {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    }
  );
  const [skillProficiencies, setSkillProficiencies] = useState<
    NonNullable<PlayerToken["proficiencies"]>["skills"]
  >(
    initialToken.proficiencies?.skills || {
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false,
    }
  );
  const [attacks, setAttacks] = useState<NonNullable<PlayerToken["attacks"]>>(
    initialToken.attacks || []
  );
  const [featuresAndTraits, setFeaturesAndTraits] = useState<
    PlayerToken["featuresAndTraits"]
  >(initialToken.featuresAndTraits || []);

  // Handlers for attacks
  const handleAddAttack = useCallback(() => {
    setAttacks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", attackBonus: "", damage: "" },
    ]);
  }, []);

  const handleRemoveAttack = useCallback((id: string) => {
    setAttacks((prev) => prev.filter((attack) => attack.id !== id));
  }, []);

  const handleAttackChange = useCallback(
    (id: string, field: keyof Attack, value: string) => {
      setAttacks((prev) =>
        prev.map((attack) => (attack.id === id ? { ...attack, [field]: value } : attack))
      );
    },
    []
  );

  // TODO: Adicionar um useEffect para atualizar o token pai quando os estados internos mudarem.
  // Isso será feito após a refatoração inicial para evitar loops de renderização.

  const value = {
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
    editingHitDiceEntries,
    setEditingHitDiceEntries,
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
  };

  return (
    <PlayerSheetContext.Provider value={value}>
      {children}
    </PlayerSheetContext.Provider>
  );
}

export function usePlayerSheet() {
  const context = useContext(PlayerSheetContext);
  if (context === undefined) {
    throw new Error("usePlayerSheet must be used within a PlayerSheetProvider");
  }
  return context;
}
