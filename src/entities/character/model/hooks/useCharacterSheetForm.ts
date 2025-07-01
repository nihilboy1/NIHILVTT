import { useCallback, useEffect, useState } from "react";
import {
  CharacterType,
  type Character,
  type PlayerCharacter,
  type BaseDndCharacter,
} from "../../../../shared/api/types";
import {
  DEFAULT_TOKEN_HP,
  DEFAULT_TOKEN_SIZE,
} from "../../../../shared/config/constants";
import { DEFAULT_TOKEN_IMAGE } from "../../../../shared/config/sheetDefaults";

export interface UseCharacterSheetFormReturn {
  editingCharacterName: string;
  setEditingCharacterName: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterImage: string;
  setEditingCharacterImage: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterSize: string;
  setEditingCharacterSize: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterType: CharacterType | null;
  setEditingCharacterType: React.Dispatch<
    React.SetStateAction<CharacterType | null>
  >;
  editingMaxHp: string;
  setEditingMaxHp: React.Dispatch<React.SetStateAction<string>>;
  editingArmorClass: string;
  setEditingArmorClass: React.Dispatch<React.SetStateAction<string>>;
  editingSpeed: string;
  setEditingSpeed: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterNotes: string;
  setEditingCharacterNotes: React.Dispatch<React.SetStateAction<string>>;
  editingInspiration: boolean;
  setEditingInspiration: React.Dispatch<React.SetStateAction<boolean>>;
  hasCharacterSheetChanged: boolean;
  handleSave: (e: React.FormEvent) => void;
}

export interface UseCharacterSheetFormProps {
  initialCharacterData: Character | null;
  onSave: (updatedData: Partial<Character>) => void;
}

export function useCharacterSheetForm({
  initialCharacterData,
  onSave,
}: UseCharacterSheetFormProps): UseCharacterSheetFormReturn {
  const [editingCharacterName, setEditingCharacterName] = useState("");
  const [editingCharacterImage, setEditingCharacterImage] =
    useState(DEFAULT_TOKEN_IMAGE);
  const [editingCharacterSize, setEditingCharacterSize] =
    useState(DEFAULT_TOKEN_SIZE);
  const [editingCharacterType, setEditingCharacterType] =
    useState<CharacterType | null>(null);
  const [editingMaxHp, setEditingMaxHp] = useState(String(DEFAULT_TOKEN_HP));
  const [editingArmorClass, setEditingArmorClass] = useState("10"); // Valor padrão para CA
  const [editingSpeed, setEditingSpeed] = useState("30"); // Valor padrão para velocidade
  const [editingCharacterNotes, setEditingCharacterNotes] = useState("");
  const [editingInspiration, setEditingInspiration] = useState(false);

  const [hasCharacterSheetChanged, setHasCharacterSheetChanged] =
    useState<boolean>(false);

  // Inicializa os estados com os dados do personagem
  useEffect(() => {
    if (initialCharacterData) {
      setEditingCharacterName(initialCharacterData.name);
      setEditingCharacterImage(initialCharacterData.image);
      setEditingCharacterSize(initialCharacterData.size);
      setEditingCharacterType(initialCharacterData.type);
      setEditingCharacterNotes(initialCharacterData.notes || "");

      // Inicializa campos de BaseDndCharacter
      if (
        initialCharacterData.type === CharacterType.PLAYER ||
        initialCharacterData.type === CharacterType.MONSTER_NPC
      ) {
        const dndCharacter = initialCharacterData as BaseDndCharacter;
        setEditingMaxHp(String(dndCharacter.combatStats?.maxHp ?? DEFAULT_TOKEN_HP));
        setEditingArmorClass(String(dndCharacter.combatStats?.armorClass ?? 10));
        setEditingSpeed(String(dndCharacter.combatStats?.speed ?? 30));
      } else {
        setEditingMaxHp(String(DEFAULT_TOKEN_HP));
        setEditingArmorClass("10");
        setEditingSpeed("30");
      }

      // Apenas inicializa inspiration se for PlayerCharacter
      if (initialCharacterData.type === CharacterType.PLAYER) {
        setEditingInspiration(
          (initialCharacterData as PlayerCharacter).inspiration ?? false
        );
      } else {
        setEditingInspiration(false); // Garante que seja false para outros tipos
      }
      setHasCharacterSheetChanged(false);
    }
  }, [initialCharacterData]);

  // Efeito para verificar se a ficha foi alterada
  useEffect(() => {
    if (!initialCharacterData) {
      setHasCharacterSheetChanged(false);
      return;
    }

    let changed = false;
    changed =
      changed || editingCharacterName !== (initialCharacterData.name || "");
    changed =
      changed ||
      editingCharacterImage !==
        (initialCharacterData.image || DEFAULT_TOKEN_IMAGE);
    changed =
      changed ||
      editingCharacterSize !==
        (initialCharacterData.size || DEFAULT_TOKEN_SIZE);
    changed =
      changed || editingCharacterType !== (initialCharacterData.type || null);
    changed =
      changed || editingCharacterNotes !== (initialCharacterData.notes || "");

    // Verifica mudanças em BaseDndCharacter
    if (
      initialCharacterData.type === CharacterType.PLAYER ||
      initialCharacterData.type === CharacterType.MONSTER_NPC
    ) {
      const dndCharacter = initialCharacterData as BaseDndCharacter;
      changed =
        changed || editingMaxHp !== String(dndCharacter.combatStats?.maxHp ?? DEFAULT_TOKEN_HP);
      changed =
        changed ||
        editingArmorClass !== String(dndCharacter.combatStats?.armorClass ?? 10);
      changed =
        changed || editingSpeed !== String(dndCharacter.combatStats?.speed ?? 30);
    } else {
      // Se mudou para um tipo não-D&D, e os valores padrão não correspondem
      changed = changed || editingMaxHp !== String(DEFAULT_TOKEN_HP);
      changed = changed || editingArmorClass !== "10";
      changed = changed || editingSpeed !== "30";
    }

    if (initialCharacterData.type === CharacterType.PLAYER) {
      changed =
        changed ||
        editingInspiration !==
          ((initialCharacterData as PlayerCharacter).inspiration ?? false);
    }

    setHasCharacterSheetChanged(changed);
  }, [
    editingCharacterName,
    editingCharacterImage,
    editingCharacterSize,
    editingCharacterType,
    editingMaxHp,
    editingArmorClass,
    editingSpeed,
    editingCharacterNotes,
    editingInspiration,
    initialCharacterData,
  ]);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (editingCharacterType === null) {
        alert("Erro: O tipo do personagem deve ser selecionado.");
        return;
      }
      if (!editingCharacterName.trim()) {
        alert("O nome do personagem não pode estar vazio.");
        return;
      }

      const MAX_IMAGE_DIMENSION = 500;
      if (
        editingCharacterImage.trim() !== "" &&
        editingCharacterImage !== DEFAULT_TOKEN_IMAGE
      ) {
        try {
          const img = new Image();
          img.src = editingCharacterImage;

          await new Promise<void>((resolve, reject) => {
            img.onload = () => {
              if (
                img.width > MAX_IMAGE_DIMENSION ||
                img.height > MAX_IMAGE_DIMENSION
              ) {
                reject(
                  new Error(
                    `A imagem é muito grande. Dimensões máximas permitidas: ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION} pixels.`
                  )
                );
              } else {
                resolve();
              }
            };
            img.onerror = () => {
              reject(
                new Error(
                  "Não foi possível carregar a imagem. Verifique a URL."
                )
              );
            };
          });
        } catch (error) {
          alert(
            `Erro na validação da imagem: ${
              error instanceof Error ? error.message : "Erro desconhecido."
            }`
          );
          return;
        }
      }

      const maxHpNum = parseInt(editingMaxHp, 10);
      const armorClassNum = parseInt(editingArmorClass, 10);
      const speedNum = parseInt(editingSpeed, 10);

      if (isNaN(maxHpNum) || maxHpNum <= 0) {
        alert("Valores de HP inválidos. Vida Máxima deve ser > 0.");
        return;
      }
      if (isNaN(armorClassNum) || armorClassNum <= 0) {
        alert("Valores de CA inválidos. CA deve ser > 0.");
        return;
      }
      if (isNaN(speedNum) || speedNum <= 0) {
        alert("Valores de Velocidade inválidos. Velocidade deve ser > 0.");
        return;
      }

      const updatedCharacterPartialData: Partial<Character> = {
        name: editingCharacterName.trim(),
        image:
          editingCharacterImage.trim() === ""
            ? DEFAULT_TOKEN_IMAGE
            : editingCharacterImage,
        size: editingCharacterSize,
        notes: editingCharacterNotes,
        type: editingCharacterType,
      };

      if (
        editingCharacterType === CharacterType.PLAYER ||
        editingCharacterType === CharacterType.MONSTER_NPC
      ) {
        (updatedCharacterPartialData as Partial<BaseDndCharacter>).combatStats = {
          maxHp: maxHpNum,
          currentHp: maxHpNum,
          armorClass: armorClassNum,
          speed: speedNum,
        };
        // TODO: Adicionar atributos, proficiências, actions, attacks, featuresAndTraits
      }

      if (editingCharacterType === CharacterType.PLAYER) {
        (updatedCharacterPartialData as Partial<PlayerCharacter>).inspiration =
          editingInspiration;
        // TODO: Adicionar level, xp, hitDice, deathSaves
      }

      onSave(updatedCharacterPartialData);
    },
    [
      editingCharacterName,
      editingCharacterImage,
      editingCharacterSize,
      editingCharacterType,
      editingMaxHp,
      editingArmorClass,
      editingSpeed,
      editingCharacterNotes,
      editingInspiration,
      onSave,
    ]
  );

  return {
    editingCharacterName,
    setEditingCharacterName,
    editingCharacterImage,
    setEditingCharacterImage,
    editingCharacterSize,
    setEditingCharacterSize,
    editingCharacterType,
    setEditingCharacterType,
    editingMaxHp,
    setEditingMaxHp,
    editingArmorClass,
    setEditingArmorClass,
    editingSpeed,
    setEditingSpeed,
    editingCharacterNotes,
    setEditingCharacterNotes,
    editingInspiration,
    setEditingInspiration,
    hasCharacterSheetChanged,
    handleSave,
  };
}
