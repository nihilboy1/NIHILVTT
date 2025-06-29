import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  type PlayerToken,
  type Action,
  type HitDiceEntry,
  type FeatureOrTrait,
} from "../shared/types";
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
  actions: NonNullable<PlayerToken["actions"]>;
  handleAddAction: () => void;
  handleRemoveAction: (id: string) => void;
  handleActionChange: (id: string, field: keyof Action, value: string) => void;
  attacks: NonNullable<PlayerToken["attacks"]>; // Adicionado
  handleAddAttack: () => void; // Adicionado
  handleRemoveAttack: (id: string) => void; // Adicionado
  handleAttackChange: (
    id: string,
    field: keyof NonNullable<PlayerToken["attacks"]>[number],
    value: string
  ) => void; // Adicionado
  featuresAndTraits: FeatureOrTrait[]; // Alterado para garantir que não seja undefined
  setFeaturesAndTraits: React.Dispatch<React.SetStateAction<FeatureOrTrait[]>>; // Alterado para garantir que não seja undefined
  SKILLS_CONFIG: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerToken["attributes"]>;
  }[];
  getUpdatedPlayerToken: () => PlayerToken;
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
  const [proficiencyBonus] = useState(initialToken.proficiencyBonus || 2);
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
  >(
    initialToken.hitDiceEntries && initialToken.hitDiceEntries.length > 0
      ? initialToken.hitDiceEntries
      : [{ id: crypto.randomUUID(), type: "d6", quantity: 1 }]
  );
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
  const [actions, setActions] = useState<NonNullable<PlayerToken["actions"]>>(
    initialToken.actions || []
  );
  const [attacks, setAttacks] = useState<NonNullable<PlayerToken["attacks"]>>(
    initialToken.attacks || []
  ); // Adicionado
  const [featuresAndTraits, setFeaturesAndTraits] = useState<
    NonNullable<PlayerToken["featuresAndTraits"]>
  >(initialToken.featuresAndTraits || []);

  // Efeito para sincronizar o estado interno com as props do token inicial
  useEffect(() => {
    setEditingTokenName(initialToken.name || "");
    setEditingCharClass(initialToken.charClass || "");
    setEditingLevel(initialToken.level?.toString() || "");
    setEditingBackground(initialToken.background || "");
    setEditingSpecies(initialToken.species || "");
    setEditingSubclass(initialToken.subclass || "");
    setEditingArmorClass(initialToken.armorClass?.toString() || "");
    setEditingInitiative(initialToken.initiative?.toString() || "");
    setEditingSpeed(initialToken.speed?.toString() || "");
    setEditingShieldEquipped(initialToken.shieldEquipped || false);
    setEditingCurrentHp(initialToken.currentHp?.toString() || "");
    setEditingTempHp(initialToken.tempHp?.toString() || "");
    setEditingMaxHp(initialToken.maxHp?.toString() || "");
    setEditingHitDiceEntries(
      initialToken.hitDiceEntries && initialToken.hitDiceEntries.length > 0
        ? initialToken.hitDiceEntries
        : [{ id: crypto.randomUUID(), type: "d6", quantity: 1 }]
    );
    setEditingDeathSavesSuccesses(initialToken.deathSavesSuccesses || 0);
    setEditingDeathSavesFailures(initialToken.deathSavesFailures || 0);
    setAttributes(
      initialToken.attributes || {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      }
    );
    setSavingThrowProficiencies(
      initialToken.proficiencies?.savingThrows || {
        strength: false,
        dexterity: false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false,
      }
    );
    setSkillProficiencies(
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
    setActions(initialToken.actions || []);
    setAttacks(initialToken.attacks || []); // Adicionado
    setFeaturesAndTraits(initialToken.featuresAndTraits || []);
  }, [initialToken]);

  // Handlers for actions
  const handleAddAction = useCallback(() => {
    setActions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", bonus: "", damage: "" },
    ]);
  }, []);

  const handleRemoveAction = useCallback((id: string) => {
    setActions((prev) => prev.filter((action) => action.id !== id));
  }, []);

  const handleActionChange = useCallback(
    (id: string, field: keyof Action, value: string) => {
      setActions((prev) =>
        prev.map((action) =>
          action.id === id ? { ...action, [field]: value } : action
        )
      );
    },
    []
  );

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
    (
      id: string,
      field: keyof NonNullable<PlayerToken["attacks"]>[number],
      value: string
    ) => {
      setAttacks((prev) =>
        prev.map((attack) =>
          attack.id === id ? { ...attack, [field]: value } : attack
        )
      );
    },
    []
  );

  // Nova função para obter o token atualizado com base nos estados internos
  const getUpdatedPlayerToken = useCallback((): PlayerToken => {
    return {
      ...initialToken, // Começa com o token inicial para manter propriedades não gerenciadas pelo contexto
      name: editingTokenName,
      charClass: editingCharClass,
      level: Number(editingLevel),
      background: editingBackground,
      species: editingSpecies,
      subclass: editingSubclass,
      armorClass: Number(editingArmorClass),
      initiative: Number(editingInitiative),
      speed: Number(editingSpeed),
      shieldEquipped: editingShieldEquipped,
      currentHp: Number(editingCurrentHp),
      tempHp: Number(editingTempHp),
      maxHp: Number(editingMaxHp),
      hitDiceEntries: editingHitDiceEntries,
      deathSavesSuccesses: editingDeathSavesSuccesses,
      deathSavesFailures: editingDeathSavesFailures,
      attributes: attributes,
      proficiencies: {
        savingThrows: savingThrowProficiencies,
        skills: skillProficiencies,
      },
      actions: actions,
      attacks: attacks, // Adicionado
      featuresAndTraits: featuresAndTraits,
      // Outras propriedades do token que podem ser gerenciadas pelo PlayerSheetContext
    };
  }, [
    initialToken,
    editingTokenName,
    editingCharClass,
    editingLevel,
    editingBackground,
    editingSpecies,
    editingSubclass,
    editingArmorClass,
    editingInitiative,
    editingSpeed,
    editingShieldEquipped,
    editingCurrentHp,
    editingTempHp,
    editingMaxHp,
    editingHitDiceEntries,
    editingDeathSavesSuccesses,
    editingDeathSavesFailures,
    attributes,
    savingThrowProficiencies,
    skillProficiencies,
    actions,
    attacks, // Adicionado
    featuresAndTraits,
  ]);

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
    actions,
    handleAddAction,
    handleRemoveAction,
    handleActionChange,
    attacks, // Adicionado
    handleAddAttack, // Adicionado
    handleRemoveAttack, // Adicionado
    handleAttackChange, // Adicionado
    featuresAndTraits,
    setFeaturesAndTraits,
    SKILLS_CONFIG,
    getUpdatedPlayerToken,
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
