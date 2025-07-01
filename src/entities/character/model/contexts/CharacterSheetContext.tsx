import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type Action,
  type FeatureOrTrait,
  type HitDiceEntry,
  type PlayerCharacter,
} from "../../../../shared/api/types";
import { SKILLS_CONFIG } from "../../../../shared/config/sheetDefaults";

interface PlayerSheetContextType {
  playerCharacter: PlayerCharacter; // Adicionar playerCharacter
  editingCharacterName: string;
  setEditingCharacterName: (name: string) => void;
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
  attributes: NonNullable<PlayerCharacter["attributes"]>;
  setAttributes: React.Dispatch<
    React.SetStateAction<NonNullable<PlayerCharacter["attributes"]>>
  >;
  savingThrowProficiencies: NonNullable<
    PlayerCharacter["proficiencies"]
  >["savingThrows"];
  setSavingThrowProficiencies: React.Dispatch<
    React.SetStateAction<
      NonNullable<PlayerCharacter["proficiencies"]>["savingThrows"]
    >
  >;
  skillProficiencies: NonNullable<PlayerCharacter["proficiencies"]>["skills"];
  setSkillProficiencies: React.Dispatch<
    React.SetStateAction<
      NonNullable<PlayerCharacter["proficiencies"]>["skills"]
    >
  >;
  actions: NonNullable<PlayerCharacter["actions"]>;
  handleAddAction: () => void;
  handleRemoveAction: (id: string) => void;
  handleActionChange: (id: string, field: keyof Action, value: string) => void;
  attacks: NonNullable<PlayerCharacter["attacks"]>; // Adicionado
  handleAddAttack: () => void; // Adicionado
  handleRemoveAttack: (id: string) => void; // Adicionado
  handleAttackChange: (
    id: string,
    field: keyof NonNullable<PlayerCharacter["attacks"]>[number],
    value: string
  ) => void; // Adicionado
  featuresAndTraits: FeatureOrTrait[]; // Alterado para garantir que não seja undefined
  setFeaturesAndTraits: React.Dispatch<React.SetStateAction<FeatureOrTrait[]>>; // Alterado para garantir que não seja undefined
  SKILLS_CONFIG: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerCharacter["attributes"]>;
  }[];
  getUpdatedPlayerCharacter: () => PlayerCharacter;
}

const PlayerSheetContext = createContext<PlayerSheetContextType | undefined>(
  undefined
);

interface PlayerSheetProviderProps {
  children: React.ReactNode;
  initialCharacter: PlayerCharacter;
  setCharacter: (character: PlayerCharacter) => void;
}

export function PlayerSheetProvider({
  children,
  initialCharacter,
}: PlayerSheetProviderProps) {
  const [editingCharacterName, setEditingCharacterName] = useState(
    initialCharacter.name || ""
  );
  const [editingCharClass, setEditingCharClass] = useState(
    initialCharacter.charClass || ""
  );
  const [editingLevel, setEditingLevel] = useState(
    initialCharacter.level?.toString() || ""
  );
  const [editingBackground, setEditingBackground] = useState(
    initialCharacter.background || ""
  );
  const [editingSpecies, setEditingSpecies] = useState(
    initialCharacter.species || ""
  );
  const [editingSubclass, setEditingSubclass] = useState(
    initialCharacter.subclass || ""
  );
  const [proficiencyBonus] = useState(initialCharacter.proficiencyBonus || 2);
  const [editingArmorClass, setEditingArmorClass] = useState(
    initialCharacter.armorClass?.toString() || ""
  );
  const [editingInitiative, setEditingInitiative] = useState(
    initialCharacter.initiative?.toString() || ""
  );
  const [editingSpeed, setEditingSpeed] = useState(
    initialCharacter.speed?.toString() || ""
  );
  const [editingShieldEquipped, setEditingShieldEquipped] = useState(
    initialCharacter.shieldEquipped || false
  );
  const [editingTempHp, setEditingTempHp] = useState(
    initialCharacter.tempHp?.toString() || ""
  );
  const [editingMaxHp, setEditingMaxHp] = useState(
    initialCharacter.maxHp?.toString() || ""
  );
  const [editingHitDiceEntries, setEditingHitDiceEntries] = useState<
    HitDiceEntry[]
  >(
    initialCharacter.hitDiceEntries &&
      initialCharacter.hitDiceEntries.length > 0
      ? initialCharacter.hitDiceEntries
      : [{ id: crypto.randomUUID(), type: "d6", quantity: 1 }]
  );
  const [editingDeathSavesSuccesses, setEditingDeathSavesSuccesses] = useState(
    initialCharacter.deathSavesSuccesses || 0
  );
  const [editingDeathSavesFailures, setEditingDeathSavesFailures] = useState(
    initialCharacter.deathSavesFailures || 0
  );
  const [attributes, setAttributes] = useState<
    NonNullable<PlayerCharacter["attributes"]>
  >(
    initialCharacter.attributes || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }
  );
  const [savingThrowProficiencies, setSavingThrowProficiencies] = useState<
    NonNullable<PlayerCharacter["proficiencies"]>["savingThrows"]
  >(
    initialCharacter.proficiencies?.savingThrows || {
      strength: false,
      dexterity: false,
      constitution: false,
      intelligence: false,
      wisdom: false,
      charisma: false,
    }
  );
  const [skillProficiencies, setSkillProficiencies] = useState<
    NonNullable<PlayerCharacter["proficiencies"]>["skills"]
  >(
    initialCharacter.proficiencies?.skills || {
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
  const [actions, setActions] = useState<
    NonNullable<PlayerCharacter["actions"]>
  >(initialCharacter.actions || []);
  const [attacks, setAttacks] = useState<
    NonNullable<PlayerCharacter["attacks"]>
  >(initialCharacter.attacks || []); // Adicionado
  const [featuresAndTraits, setFeaturesAndTraits] = useState<
    NonNullable<PlayerCharacter["featuresAndTraits"]>
  >(initialCharacter.featuresAndTraits || []);

  // Efeito para sincronizar o estado interno com as props do personagem inicial
  useEffect(() => {
    setEditingCharacterName(initialCharacter.name || "");
    setEditingCharClass(initialCharacter.charClass || "");
    setEditingLevel(initialCharacter.level?.toString() || "");
    setEditingBackground(initialCharacter.background || "");
    setEditingSpecies(initialCharacter.species || "");
    setEditingSubclass(initialCharacter.subclass || "");
    setEditingArmorClass(initialCharacter.armorClass?.toString() || "");
    setEditingInitiative(initialCharacter.initiative?.toString() || "");
    setEditingSpeed(initialCharacter.speed?.toString() || "");
    setEditingShieldEquipped(initialCharacter.shieldEquipped || false);
    setEditingTempHp(initialCharacter.tempHp?.toString() || "");
    setEditingMaxHp(initialCharacter.maxHp?.toString() || "");
    setEditingHitDiceEntries(
      initialCharacter.hitDiceEntries &&
        initialCharacter.hitDiceEntries.length > 0
        ? initialCharacter.hitDiceEntries
        : [{ id: crypto.randomUUID(), type: "d6", quantity: 1 }]
    );
    setEditingDeathSavesSuccesses(initialCharacter.deathSavesSuccesses || 0);
    setEditingDeathSavesFailures(initialCharacter.deathSavesFailures || 0);
    setAttributes(
      initialCharacter.attributes || {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      }
    );
    setSavingThrowProficiencies(
      initialCharacter.proficiencies?.savingThrows || {
        strength: false,
        dexterity: false,
        constitution: false,
        intelligence: false,
        wisdom: false,
        charisma: false,
      }
    );
    setSkillProficiencies(
      initialCharacter.proficiencies?.skills || {
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
    setActions(initialCharacter.actions || []);
    setAttacks(initialCharacter.attacks || []); // Adicionado
    setFeaturesAndTraits(initialCharacter.featuresAndTraits || []);
  }, [initialCharacter]);

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
      field: keyof NonNullable<PlayerCharacter["attacks"]>[number],
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

  // Nova função para obter o personagem atualizado com base nos estados internos
  const getUpdatedPlayerCharacter = useCallback((): PlayerCharacter => {
    return {
      ...initialCharacter, // Começa com o personagem inicial para manter propriedades não gerenciadas pelo contexto
      name: editingCharacterName,
      charClass: editingCharClass,
      level: Number(editingLevel),
      background: editingBackground,
      species: editingSpecies,
      subclass: editingSubclass,
      armorClass: Number(editingArmorClass),
      initiative: Number(editingInitiative),
      speed: Number(editingSpeed),
      shieldEquipped: editingShieldEquipped,
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
      // Outras propriedades do personagem que podem ser gerenciadas pelo PlayerSheetContext
    };
  }, [
    initialCharacter,
    editingCharacterName,
    editingCharClass,
    editingLevel,
    editingBackground,
    editingSpecies,
    editingSubclass,
    editingArmorClass,
    editingInitiative,
    editingSpeed,
    editingShieldEquipped,
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
    playerCharacter: initialCharacter, // Expor o personagem inicial
    editingCharacterName,
    setEditingCharacterName,
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
    getUpdatedPlayerCharacter,
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
