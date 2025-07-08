import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Action,
  type FeatureOrTrait,
  type HitDiceEntry,
  type PlayerCharacter,
} from "../../../../shared/api/types";
import { SKILLS_CONFIG } from "../../../../shared/config/sheetDefaults";
import {
  getModifier,
  getProficiencyBonus,
  getSkillBonus,
  getInitiative,
  getPassivePerception,
} from "../../lib/utils/sheetUtils";

interface PlayerSheetContextType {
  playerCharacter: PlayerCharacter;
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
  // Valores calculados
  calculatedProficiencyBonus: number;
  calculatedAttributeModifiers: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  calculatedSkillBonuses: {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    sleightOfHand: number;
    stealth: number;
    survival: number;
  };
  calculatedInitiative: number;
  calculatedPassivePerception: number;

  // Propriedades de combate agrupadas (algumas ainda editáveis)
  combatStats: {
    editingArmorClass: string;
    setEditingArmorClass: (value: string) => void;
    editingSpeed: string;
    setEditingSpeed: (value: string) => void;
    editingShieldEquipped: boolean;
    setEditingShieldEquipped: (value: boolean) => void;
    editingTempHp: string;
    setEditingTempHp: (value: string) => void;
    editingMaxHp: string;
    setEditingMaxHp: (value: string) => void;
  };
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
  attacks: NonNullable<PlayerCharacter["attacks"]>;
  handleAddAttack: () => void;
  handleRemoveAttack: (id: string) => void;
  handleAttackChange: (
    id: string,
    field: keyof NonNullable<PlayerCharacter["attacks"]>[number],
    value: string
  ) => void;
  featuresAndTraits: FeatureOrTrait[];
  setFeaturesAndTraits: React.Dispatch<React.SetStateAction<FeatureOrTrait[]>>;
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

  // Estados para combatStats
  const [editingArmorClass, setEditingArmorClass] = useState(
    initialCharacter.combatStats?.armorClass?.toString() || ""
  );
  const [editingSpeed, setEditingSpeed] = useState(
    initialCharacter.combatStats?.speed?.toString() || ""
  );
  const [editingShieldEquipped, setEditingShieldEquipped] = useState(
    initialCharacter.combatStats?.shieldEquipped || false
  );
  const [editingTempHp, setEditingTempHp] = useState(
    initialCharacter.combatStats?.tempHp?.toString() || ""
  );
  const [editingMaxHp, setEditingMaxHp] = useState(
    initialCharacter.combatStats?.maxHp?.toString() || ""
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
  >(initialCharacter.attacks || []);
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
    
    // Sincroniza combatStats
    setEditingArmorClass(initialCharacter.combatStats?.armorClass?.toString() || "");
    setEditingSpeed(initialCharacter.combatStats?.speed?.toString() || "");
    setEditingShieldEquipped(initialCharacter.combatStats?.shieldEquipped || false);
    setEditingTempHp(initialCharacter.combatStats?.tempHp?.toString() || "");
    setEditingMaxHp(initialCharacter.combatStats?.maxHp?.toString() || "");

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
    setAttacks(initialCharacter.attacks || []);
    setFeaturesAndTraits(initialCharacter.featuresAndTraits || []);
  }, [initialCharacter]);

  // Cálculos de valores derivados usando useMemo
  const calculatedProficiencyBonus = useMemo(
    () => getProficiencyBonus(Number(editingLevel)),
    [editingLevel]
  );

  const calculatedAttributeModifiers = useMemo(() => {
    return {
      strength: getModifier(attributes.strength),
      dexterity: getModifier(attributes.dexterity),
      constitution: getModifier(attributes.constitution),
      intelligence: getModifier(attributes.intelligence),
      wisdom: getModifier(attributes.wisdom),
      charisma: getModifier(attributes.charisma),
    };
  }, [attributes]);

  const calculatedSkillBonuses = useMemo(() => {
    const skillBonuses: PlayerSheetContextType["calculatedSkillBonuses"] = {} as PlayerSheetContextType["calculatedSkillBonuses"];
    for (const skillKey of Object.keys(skillProficiencies) as Array<keyof NonNullable<PlayerCharacter["proficiencies"]>["skills"]>) {
      const config = SKILLS_CONFIG.find(s => s.key === skillKey);
      if (config) {
        const isProficient = skillProficiencies[skillKey];
        const attributeModifier = calculatedAttributeModifiers[config.parentAttribute];
        skillBonuses[skillKey] = getSkillBonus(isProficient, attributeModifier, calculatedProficiencyBonus);
      }
    }
    return skillBonuses;
  }, [SKILLS_CONFIG, skillProficiencies, calculatedAttributeModifiers, calculatedProficiencyBonus]);


  const calculatedInitiative = useMemo(
    () => getInitiative(calculatedAttributeModifiers.dexterity),
    [calculatedAttributeModifiers.dexterity]
  );

  const calculatedPassivePerception = useMemo(
    () =>
      getPassivePerception(
        calculatedAttributeModifiers.wisdom,
        skillProficiencies.perception,
        calculatedProficiencyBonus
      ),
    [
      calculatedAttributeModifiers.wisdom,
      skillProficiencies.perception,
      calculatedProficiencyBonus,
    ]
  );

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
      ...(initialCharacter as PlayerCharacter), // Começa com o personagem inicial para manter propriedades não gerenciadas pelo contexto
      name: editingCharacterName,
      charClass: editingCharClass,
      level: Number(editingLevel),
      background: editingBackground,
      species: editingSpecies,
      subclass: editingSubclass,
      proficiencyBonus: calculatedProficiencyBonus, // Usar o valor calculado
      combatStats: {
        armorClass: Number(editingArmorClass),
        initiative: calculatedInitiative, // Usar o valor calculado
        speed: Number(editingSpeed),
        shieldEquipped: editingShieldEquipped,
        tempHp: Number(editingTempHp),
        maxHp: Number(editingMaxHp),
        currentHp: initialCharacter.combatStats.currentHp, // Manter o HP atual do personagem
        passivePerception: calculatedPassivePerception, // Usar o valor calculado
      },
      hitDiceEntries: editingHitDiceEntries,
      deathSavesSuccesses: editingDeathSavesSuccesses,
      deathSavesFailures: editingDeathSavesFailures,
      attributes: attributes,
      proficiencies: {
        savingThrows: savingThrowProficiencies,
        skills: skillProficiencies,
      },
      actions: actions,
      attacks: attacks,
      featuresAndTraits: featuresAndTraits,
    };
  }, [
    initialCharacter,
    editingCharacterName,
    editingCharClass,
    editingLevel,
    editingBackground,
    editingSpecies,
    editingSubclass,
    calculatedProficiencyBonus,
    editingArmorClass,
    calculatedInitiative,
    editingSpeed,
    editingShieldEquipped,
    editingTempHp,
    editingMaxHp,
    initialCharacter.combatStats.currentHp,
    calculatedPassivePerception,
    editingHitDiceEntries,
    editingDeathSavesSuccesses,
    editingDeathSavesFailures,
    attributes,
    savingThrowProficiencies,
    skillProficiencies,
    actions,
    attacks,
    featuresAndTraits,
  ]);

  const value = {
    playerCharacter: initialCharacter,
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
    calculatedProficiencyBonus, // Expor o valor calculado
    calculatedAttributeModifiers, // Expor os modificadores calculados
    calculatedSkillBonuses, // Expor os bônus de perícia calculados
    calculatedInitiative, // Expor a iniciativa calculada
    calculatedPassivePerception, // Expor a percepção passiva calculada
    combatStats: {
      editingArmorClass,
      setEditingArmorClass,
      editingSpeed,
      setEditingSpeed,
      editingShieldEquipped,
      setEditingShieldEquipped,
      editingTempHp,
      setEditingTempHp,
      editingMaxHp,
      setEditingMaxHp,
    },
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
    attacks,
    handleAddAttack,
    handleRemoveAttack,
    handleAttackChange,
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
