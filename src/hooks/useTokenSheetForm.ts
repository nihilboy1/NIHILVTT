import { useState, useEffect, useCallback } from "react";
import { type PlayerToken, TokenType, type Attack } from "../types/index";
import {
  DEFAULT_TOKEN_SIZE,
  DEFAULT_TOKEN_HP,
  DEFAULT_PLAYER_LEVEL,
  DEFAULT_PLAYER_INSPIRATION,
} from "../constants";
import {
  SKILLS_CONFIG,
  defaultAttributes,
  defaultSavingThrows,
  defaultSkills,
  DEFAULT_TOKEN_IMAGE,
} from "../constants/sheetDefaults";
import { calculateProficiencyBonus } from "../utils/sheetUtils"; // Importar a função utilitária

export interface UseTokenSheetFormReturn {
  editingTokenName: string;
  setEditingTokenName: React.Dispatch<React.SetStateAction<string>>;
  editingTokenImage: string;
  setEditingTokenImage: React.Dispatch<React.SetStateAction<string>>;
  editingTokenSize: string;
  setEditingTokenSize: React.Dispatch<React.SetStateAction<string>>;
  editingTokenType: TokenType | null;
  setEditingTokenType: React.Dispatch<React.SetStateAction<TokenType | null>>;
  editingCurrentHp: string;
  setEditingCurrentHp: React.Dispatch<React.SetStateAction<string>>;
  editingMaxHp: string;
  setEditingMaxHp: React.Dispatch<React.SetStateAction<string>>;
  editingTokenNotes: string;
  setEditingTokenNotes: React.Dispatch<React.SetStateAction<string>>;
  editingSpecies: string;
  setEditingSpecies: React.Dispatch<React.SetStateAction<string>>;
  editingCharClass: string;
  setEditingCharClass: React.Dispatch<React.SetStateAction<string>>;
  editingSubclass: string;
  setEditingSubclass: React.Dispatch<React.SetStateAction<string>>;
  editingLevel: string;
  setEditingLevel: React.Dispatch<React.SetStateAction<string>>;
  editingBackground: string;
  setEditingBackground: React.Dispatch<React.SetStateAction<string>>;
  editingInspiration: boolean;
  setEditingInspiration: React.Dispatch<React.SetStateAction<boolean>>;
  editingArmorClass: string;
  setEditingArmorClass: React.Dispatch<React.SetStateAction<string>>;
  editingShieldEquipped: boolean;
  setEditingShieldEquipped: React.Dispatch<React.SetStateAction<boolean>>;
  editingTempHp: string;
  setEditingTempHp: React.Dispatch<React.SetStateAction<string>>;
  editingHitDiceUsed: string;
  setEditingHitDiceUsed: React.Dispatch<React.SetStateAction<string>>;
  editingHitDiceMax: string;
  setEditingHitDiceMax: React.Dispatch<React.SetStateAction<string>>;
  editingDeathSavesSuccesses: number;
  setEditingDeathSavesSuccesses: React.Dispatch<React.SetStateAction<number>>;
  editingDeathSavesFailures: number;
  setEditingDeathSavesFailures: React.Dispatch<React.SetStateAction<number>>;
  proficiencyBonus: number; // Alterado para number e não editável
  editingInitiative: string;
  setEditingInitiative: React.Dispatch<React.SetStateAction<string>>;
  editingSpeed: string;
  setEditingSpeed: React.Dispatch<React.SetStateAction<string>>;
  attributes: NonNullable<PlayerToken["attributes"]>;
  setAttributes: React.Dispatch<React.SetStateAction<NonNullable<PlayerToken["attributes"]>>>;
  savingThrowProficiencies: NonNullable<PlayerToken["proficiencies"]>["savingThrows"];
  setSavingThrowProficiencies: React.Dispatch<React.SetStateAction<NonNullable<PlayerToken["proficiencies"]>["savingThrows"]>>;
  skillProficiencies: NonNullable<PlayerToken["proficiencies"]>["skills"];
  setSkillProficiencies: React.Dispatch<React.SetStateAction<NonNullable<PlayerToken["proficiencies"]>["skills"]>>;
  attacks: Attack[];
  setAttacks: React.Dispatch<React.SetStateAction<Attack[]>>;
  featuresAndTraits: PlayerToken["featuresAndTraits"];
  setFeaturesAndTraits: React.Dispatch<React.SetStateAction<PlayerToken["featuresAndTraits"]>>;
  hasTokenSheetChanged: boolean;
  handleSave: (e: React.FormEvent) => void;
  handleAddAttack: () => void;
  handleRemoveAttack: (id: string) => void;
  handleAttackChange: (id: string, field: keyof Attack, value: string) => void;
  SKILLS_CONFIG: {
    key: string;
    label: string;
    parentAttribute: keyof NonNullable<PlayerToken["attributes"]>;
  }[];
  defaultAttributes: NonNullable<PlayerToken["attributes"]>;
  defaultSavingThrows: NonNullable<PlayerToken["proficiencies"]>["savingThrows"];
  defaultSkills: NonNullable<PlayerToken["proficiencies"]>["skills"];
}

export interface UseTokenSheetFormProps {
  initialTokenData: PlayerToken | null;
  onSave: (updatedData: Partial<PlayerToken>) => void;
}

export const useTokenSheetForm = ({
  initialTokenData,
  onSave,
}: UseTokenSheetFormProps): UseTokenSheetFormReturn => {
  const [editingTokenName, setEditingTokenName] = useState("");
  const [editingTokenImage, setEditingTokenImage] = useState(DEFAULT_TOKEN_IMAGE);
  const [editingTokenSize, setEditingTokenSize] = useState(DEFAULT_TOKEN_SIZE);
  const [editingTokenType, setEditingTokenType] = useState<TokenType | null>(
    null
  );
  const [editingCurrentHp, setEditingCurrentHp] = useState(
    String(DEFAULT_TOKEN_HP)
  );
  const [editingMaxHp, setEditingMaxHp] = useState(String(DEFAULT_TOKEN_HP));
  const [editingTokenNotes, setEditingTokenNotes] = useState("");

  const [editingSpecies, setEditingSpecies] = useState("");
  const [editingCharClass, setEditingCharClass] = useState("");
  const [editingSubclass, setEditingSubclass] = useState("");
  const [editingLevel, setEditingLevel] = useState(
    String(DEFAULT_PLAYER_LEVEL)
  );
  const [editingBackground, setEditingBackground] = useState("");
  const [editingInspiration, setEditingInspiration] = useState(
    DEFAULT_PLAYER_INSPIRATION
  );
  const [editingArmorClass, setEditingArmorClass] = useState(String(10));
  const [editingShieldEquipped, setEditingShieldEquipped] = useState(false);
  const [editingTempHp, setEditingTempHp] = useState(String(0));
  const [editingHitDiceUsed, setEditingHitDiceUsed] = useState(String(0));
  const [editingHitDiceMax, setEditingHitDiceMax] = useState(String(1));
  const [editingDeathSavesSuccesses, setEditingDeathSavesSuccesses] =
    useState(0);
  const [editingDeathSavesFailures, setEditingDeathSavesFailures] = useState(0);
  // Removido editingProficiency como estado, será calculado
  const [editingInitiative, setEditingInitiative] = useState(String(0));
  const [editingSpeed, setEditingSpeed] = useState(String(30));

  const [attributes, setAttributes] = useState(defaultAttributes);
  const [savingThrowProficiencies, setSavingThrowProficiencies] =
    useState(defaultSavingThrows);
  const [skillProficiencies, setSkillProficiencies] = useState(defaultSkills);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [featuresAndTraits, setFeaturesAndTraits] = useState<
    PlayerToken["featuresAndTraits"]
  >([]);

  const [hasTokenSheetChanged, setHasTokenSheetChanged] =
    useState<boolean>(false);

  // Calcula o bônus de proficiência com base no nível
  const proficiencyBonus = calculateProficiencyBonus(parseInt(editingLevel, 10));

  // Inicializa os estados com os dados do token
  useEffect(() => {
    if (initialTokenData) {
      setEditingTokenName(initialTokenData.name);
      setEditingTokenImage(initialTokenData.image);
      setEditingTokenSize(initialTokenData.size);
      setEditingTokenType(initialTokenData.type);
      setEditingCurrentHp(
        String(initialTokenData.currentHp ?? DEFAULT_TOKEN_HP)
      );
      setEditingMaxHp(String(initialTokenData.maxHp ?? DEFAULT_TOKEN_HP));
      setEditingTokenNotes(initialTokenData.notes || "");

      if (initialTokenData.type === TokenType.PLAYER) {
        setEditingSpecies(initialTokenData.species || "");
        setEditingCharClass(initialTokenData.charClass || "");
        setEditingSubclass(initialTokenData.subclass || "");
        setEditingLevel(String(initialTokenData.level ?? DEFAULT_PLAYER_LEVEL));
        setEditingBackground(initialTokenData.background || "");
        setEditingInspiration(
          initialTokenData.inspiration ?? DEFAULT_PLAYER_INSPIRATION
        );
        setEditingArmorClass(String(initialTokenData.armorClass ?? 10));
        setEditingShieldEquipped(initialTokenData.shieldEquipped ?? false);
        setEditingTempHp(String(initialTokenData.tempHp ?? 0));
        setEditingHitDiceUsed(String(initialTokenData.hitDiceUsed ?? 0));
        setEditingHitDiceMax(String(initialTokenData.hitDiceMax ?? 1));
        setEditingDeathSavesSuccesses(initialTokenData.deathSavesSuccesses ?? 0);
        setEditingDeathSavesFailures(initialTokenData.deathSavesFailures ?? 0);
        // Removido setEditingProficiency
        setEditingInitiative(String(initialTokenData.initiative ?? 0));
        setEditingSpeed(String(initialTokenData.speed ?? 30));
        setAttributes(initialTokenData.attributes ?? defaultAttributes);
        setSavingThrowProficiencies(
          initialTokenData.proficiencies?.savingThrows ?? defaultSavingThrows
        );
        setSkillProficiencies(
          initialTokenData.proficiencies?.skills ?? defaultSkills
        );
        setAttacks(initialTokenData.attacks ?? []);
        setFeaturesAndTraits(initialTokenData.featuresAndTraits ?? []);
      }
      setHasTokenSheetChanged(false);
    }
  }, [initialTokenData]);

  // Efeito para verificar se a ficha foi alterada
  useEffect(() => {
    if (!initialTokenData) {
      setHasTokenSheetChanged(false);
      return;
    }

    let changed = false;
    changed = changed || editingTokenName !== (initialTokenData.name || "");
    changed =
      changed ||
      editingTokenImage !== (initialTokenData.image || DEFAULT_TOKEN_IMAGE);
    changed =
      changed ||
      editingTokenSize !== (initialTokenData.size || DEFAULT_TOKEN_SIZE);
    changed =
      changed || editingTokenType !== (initialTokenData.type || null);
    changed =
      changed ||
      editingCurrentHp !==
        String(initialTokenData.currentHp ?? DEFAULT_TOKEN_HP);
    changed =
      changed ||
      editingMaxHp !== String(initialTokenData.maxHp ?? DEFAULT_TOKEN_HP);
    changed =
      changed || editingTokenNotes !== (initialTokenData.notes || "");

    if (editingTokenType === TokenType.PLAYER) {
      changed =
        changed || editingSpecies !== (initialTokenData.species || "");
      changed =
        changed || editingCharClass !== (initialTokenData.charClass || "");
      changed =
        changed || editingSubclass !== (initialTokenData.subclass || "");
      changed =
        changed ||
        editingLevel !==
          String(initialTokenData.level ?? DEFAULT_PLAYER_LEVEL);
      changed =
        changed || editingBackground !== (initialTokenData.background || "");
      changed =
        changed ||
        editingInspiration !==
          (initialTokenData.inspiration ?? DEFAULT_PLAYER_INSPIRATION);
      changed =
        changed ||
        editingArmorClass !== String(initialTokenData.armorClass ?? 10);
      changed =
        changed ||
        editingShieldEquipped !== (initialTokenData.shieldEquipped ?? false);
      changed =
        changed || editingTempHp !== String(initialTokenData.tempHp ?? 0);
      changed =
        changed ||
        editingHitDiceUsed !== String(initialTokenData.hitDiceUsed ?? 0);
      changed =
        changed ||
        editingHitDiceMax !== String(initialTokenData.hitDiceMax ?? 1);
      changed =
        changed ||
        editingDeathSavesSuccesses !==
          (initialTokenData.deathSavesSuccesses ?? 0);
      changed =
        changed ||
        editingDeathSavesFailures !==
          (initialTokenData.deathSavesFailures ?? 0);
      // Removido editingProficiency da comparação
      changed =
        changed ||
        editingInitiative !== String(initialTokenData.initiative ?? 0);
      changed =
        changed || editingSpeed !== String(initialTokenData.speed ?? 30);

      const initialAttrs = initialTokenData.attributes ?? defaultAttributes;
      if (JSON.stringify(attributes) !== JSON.stringify(initialAttrs))
        changed = true;

      const initialSavingThrows =
        initialTokenData.proficiencies?.savingThrows ?? defaultSavingThrows;
      if (
        JSON.stringify(savingThrowProficiencies) !==
        JSON.stringify(initialSavingThrows)
      )
        changed = true;

      const initialSkills =
        initialTokenData.proficiencies?.skills ?? defaultSkills;
      if (JSON.stringify(skillProficiencies) !== JSON.stringify(initialSkills))
        changed = true;

      if (
        JSON.stringify(attacks) !==
        JSON.stringify(initialTokenData.attacks ?? [])
      ) {
        changed = true;
      }
      if (
        JSON.stringify(featuresAndTraits) !==
        JSON.stringify(initialTokenData.featuresAndTraits ?? [])
      ) {
        changed = true;
      }
    }
    setHasTokenSheetChanged(changed);
  }, [
    editingTokenName,
    editingTokenImage,
    editingTokenSize,
    editingTokenType,
    editingCurrentHp,
    editingMaxHp,
    editingTokenNotes,
    editingSpecies,
    editingCharClass,
    editingSubclass,
    editingLevel,
    editingBackground,
    editingInspiration,
    editingArmorClass,
    editingShieldEquipped,
    editingTempHp,
    editingHitDiceUsed,
    editingHitDiceMax,
    editingDeathSavesSuccesses,
    editingDeathSavesFailures,
    // Removido editingProficiency
    editingInitiative,
    editingSpeed,
    attributes,
    savingThrowProficiencies,
    skillProficiencies,
    attacks,
    featuresAndTraits,
    initialTokenData,
  ]);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!initialTokenData || editingTokenType === null) {
        alert("Erro ao identificar o token ou tipo para atualização.");
        return;
      }
      if (!editingTokenName.trim()) {
        alert("O nome do token não pode estar vazio.");
        return;
      }

      // Validação de imagem
      const MAX_IMAGE_DIMENSION = 500;
      if (editingTokenImage.trim() !== '' && editingTokenImage !== DEFAULT_TOKEN_IMAGE) {
        try {
          const img = new Image();
          img.src = editingTokenImage;

          await new Promise<void>((resolve, reject) => {
            img.onload = () => {
              if (img.width > MAX_IMAGE_DIMENSION || img.height > MAX_IMAGE_DIMENSION) {
                reject(new Error(`A imagem é muito grande. Dimensões máximas permitidas: ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION} pixels.`));
              } else {
                resolve();
              }
            };
            img.onerror = () => {
              reject(new Error("Não foi possível carregar a imagem. Verifique a URL."));
            };
          });
        } catch (error) {
          alert(`Erro na validação da imagem: ${error instanceof Error ? error.message : "Erro desconhecido."}`);
          return;
        }
      }

      const currentHpNum = parseInt(editingCurrentHp, 10);
      const maxHpNum = parseInt(editingMaxHp, 10);

      if (
        isNaN(currentHpNum) ||
        isNaN(maxHpNum) ||
        maxHpNum <= 0 ||
        currentHpNum < 0 ||
        currentHpNum > maxHpNum
      ) {
        alert(
          "Valores de HP inválidos. Vida Máxima deve ser > 0 e Vida Atual entre 0 e Vida Máxima."
        );
        return;
      }

      let levelNum = DEFAULT_PLAYER_LEVEL;
      let armorClassNum = 10;
      let tempHpNum = 0;
      let hitDiceUsedNum = 0;
      let hitDiceMaxNum = 1;
      // Removido proficiencyNum como variável de estado
      let initiativeNum = 0;
      let speedNum = 30;

      if (editingTokenType === TokenType.PLAYER) {
        levelNum = parseInt(editingLevel, 10);
        if (isNaN(levelNum) || levelNum < 1 || editingLevel.length > 2) {
          alert("Nível inválido. Deve ser um número entre 1 e 99.");
          return;
        }
        armorClassNum = parseInt(editingArmorClass, 10);
        if (isNaN(armorClassNum) || armorClassNum < 0) {
          alert(
            "Classe de Armadura inválida. Deve ser um número não negativo."
          );
          return;
        }
        tempHpNum = parseInt(editingTempHp, 10);
        if (isNaN(tempHpNum) || tempHpNum < 0) {
          alert("Vida Temporária inválida. Deve ser um número não negativo.");
          return;
        }
        hitDiceUsedNum = parseInt(editingHitDiceUsed, 10);
        hitDiceMaxNum = parseInt(editingHitDiceMax, 10);
        if (
          isNaN(hitDiceUsedNum) ||
          hitDiceUsedNum < 0 ||
          isNaN(hitDiceMaxNum) ||
          hitDiceMaxNum < 0 ||
          hitDiceUsedNum > hitDiceMaxNum
        ) {
          alert("Valores de Dados de Vida inválidos.");
          return;
        }
        // Removida validação de proficiencyNum
        initiativeNum = parseInt(editingInitiative, 10);
        if (isNaN(initiativeNum)) {
          alert("Iniciativa inválida. Deve ser um número.");
          return;
        }
        speedNum = parseInt(editingSpeed, 10);
        if (isNaN(speedNum) || speedNum < 0) {
          alert("Velocidade inválida. Deve ser um número não negativo.");
          return;
        }
      }

      const updatedTokenPartialData: Partial<PlayerToken> = {
        name: editingTokenName.trim(),
        image: editingTokenImage.trim() === '' ? DEFAULT_TOKEN_IMAGE : editingTokenImage,
        size: editingTokenSize,
        currentHp: currentHpNum,
        maxHp: maxHpNum,
        notes: editingTokenNotes,
      };

      if (editingTokenType === TokenType.PLAYER) {
        updatedTokenPartialData.type = editingTokenType;
        updatedTokenPartialData.species = editingSpecies;
        updatedTokenPartialData.charClass = editingCharClass;
        updatedTokenPartialData.subclass = editingSubclass;
        updatedTokenPartialData.level = levelNum;
        updatedTokenPartialData.background = editingBackground;
        updatedTokenPartialData.inspiration = editingInspiration;
        updatedTokenPartialData.armorClass = armorClassNum;
        updatedTokenPartialData.shieldEquipped = editingShieldEquipped;
        updatedTokenPartialData.tempHp = tempHpNum;
        updatedTokenPartialData.hitDiceUsed = hitDiceUsedNum;
        updatedTokenPartialData.hitDiceMax = hitDiceMaxNum;
        updatedTokenPartialData.deathSavesSuccesses =
          editingDeathSavesSuccesses;
        updatedTokenPartialData.deathSavesFailures = editingDeathSavesFailures;
        updatedTokenPartialData.proficiencyBonus = proficiencyBonus; // Usar o valor calculado
        updatedTokenPartialData.initiative = initiativeNum;
        updatedTokenPartialData.speed = speedNum;
        updatedTokenPartialData.attributes = attributes;
        updatedTokenPartialData.proficiencies = {
          savingThrows: savingThrowProficiencies,
          skills: skillProficiencies,
        };
        updatedTokenPartialData.attacks = attacks;
        updatedTokenPartialData.featuresAndTraits = featuresAndTraits;
      }

      onSave(updatedTokenPartialData);
    },
    [
      initialTokenData,
      editingTokenName,
      editingTokenImage,
      editingTokenSize,
      editingTokenType,
      editingCurrentHp,
      editingMaxHp,
      editingTokenNotes,
      editingSpecies,
      editingCharClass,
      editingSubclass,
      editingLevel,
      editingBackground,
      editingInspiration,
      editingArmorClass,
      editingShieldEquipped,
      editingTempHp,
      editingHitDiceUsed,
      editingHitDiceMax,
      editingDeathSavesSuccesses,
      editingDeathSavesFailures,
      proficiencyBonus, // Adicionado ao array de dependências
      editingInitiative,
      editingSpeed,
      attributes,
      savingThrowProficiencies,
      skillProficiencies,
      attacks,
      featuresAndTraits,
      onSave,
    ]
  );

  const handleAddAttack = () => {
    setAttacks((prev) => [
      ...prev,
      { id: String(Date.now()), name: "", attackBonus: "", damage: "" },
    ]);
  };

  const handleRemoveAttack = (id: string) => {
    setAttacks((prev) => prev.filter((attack) => attack.id !== id));
  };

  const handleAttackChange = (
    id: string,
    field: keyof Attack,
    value: string
  ) => {
    setAttacks((prev) =>
      prev.map((attack) =>
        attack.id === id ? { ...attack, [field]: value } : attack
      )
    );
  };

  return {
    editingTokenName,
    setEditingTokenName,
    editingTokenImage,
    setEditingTokenImage,
    editingTokenSize,
    setEditingTokenSize,
    editingTokenType,
    setEditingTokenType,
    editingCurrentHp,
    setEditingCurrentHp,
    editingMaxHp,
    setEditingMaxHp,
    editingTokenNotes,
    setEditingTokenNotes,
    editingSpecies,
    setEditingSpecies,
    editingCharClass,
    setEditingCharClass,
    editingSubclass,
    setEditingSubclass,
    editingLevel,
    setEditingLevel,
    editingBackground,
    setEditingBackground,
    editingInspiration,
    setEditingInspiration,
    editingArmorClass,
    setEditingArmorClass,
    editingShieldEquipped,
    setEditingShieldEquipped,
    editingTempHp,
    setEditingTempHp,
    editingHitDiceUsed,
    setEditingHitDiceUsed,
    editingHitDiceMax,
    setEditingHitDiceMax,
    editingDeathSavesSuccesses,
    setEditingDeathSavesSuccesses,
    editingDeathSavesFailures,
    setEditingDeathSavesFailures,
    proficiencyBonus, // Retornar o bônus de proficiência calculado
    editingInitiative,
    setEditingInitiative,
    editingSpeed,
    setEditingSpeed,
    attributes,
    setAttributes,
    savingThrowProficiencies,
    setSavingThrowProficiencies,
    skillProficiencies,
    setSkillProficiencies,
    attacks,
    setAttacks,
    featuresAndTraits,
    setFeaturesAndTraits,
    hasTokenSheetChanged,
    handleSave,
    handleAddAttack,
    handleRemoveAttack,
    handleAttackChange,
    SKILLS_CONFIG,
    defaultAttributes,
    defaultSavingThrows,
    defaultSkills,
  };
};
