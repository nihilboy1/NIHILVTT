import { useCallback, useEffect, useState } from "react";
import { DEFAULT_TOKEN_IMAGE } from "../constants/sheetDefaults";
import { CharacterType, type PlayerCharacter, type Character } from "../shared/api/types";
import {
  DEFAULT_TOKEN_HP,
  DEFAULT_TOKEN_SIZE,
} from "../shared/config/constants";

export interface UseCharacterSheetFormReturn {
  editingCharacterName: string;
  setEditingCharacterName: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterImage: string;
  setEditingCharacterImage: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterSize: string;
  setEditingCharacterSize: React.Dispatch<React.SetStateAction<string>>;
  editingCharacterType: CharacterType | null;
  setEditingCharacterType: React.Dispatch<React.SetStateAction<CharacterType | null>>;
  editingMaxHp: string;
  setEditingMaxHp: React.Dispatch<React.SetStateAction<string>>;
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
  const [editingCharacterSize, setEditingCharacterSize] = useState(DEFAULT_TOKEN_SIZE);
  const [editingCharacterType, setEditingCharacterType] = useState<CharacterType | null>(
    null
  );
  const [editingMaxHp, setEditingMaxHp] = useState(String(DEFAULT_TOKEN_HP));
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
      setEditingMaxHp(String(initialCharacterData.maxHp ?? DEFAULT_TOKEN_HP));
      setEditingCharacterNotes(initialCharacterData.notes || "");
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
    changed = changed || editingCharacterName !== (initialCharacterData.name || "");
    changed =
      changed ||
      editingCharacterImage !== (initialCharacterData.image || DEFAULT_TOKEN_IMAGE);
    changed =
      changed ||
      editingCharacterSize !== (initialCharacterData.size || DEFAULT_TOKEN_SIZE);
    changed = changed || editingCharacterType !== (initialCharacterData.type || null);
    changed =
      changed ||
      editingMaxHp !== String(initialCharacterData.maxHp ?? DEFAULT_TOKEN_HP);
    changed = changed || editingCharacterNotes !== (initialCharacterData.notes || "");

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
    editingCharacterNotes,
    editingInspiration,
    initialCharacterData,
  ]);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // Se initialCharacterData é nulo, estamos criando um novo personagem.
      // A validação aqui é para garantir que o tipo do personagem foi selecionado.
      if (editingCharacterType === null) {
        alert("Erro: O tipo do personagem deve ser selecionado.");
        return;
      }
      // Se estamos editando um personagem existente e initialCharacterData é nulo por algum motivo,
      // isso indica um erro de estado, mas o caso de criação já foi tratado acima.
      if (!initialCharacterData && editingCharacterType !== null) {
        // Isso pode acontecer se o hook for usado para criar um personagem,
        // mas o initialCharacterData é nulo. Não precisamos de um alerta aqui,
        // pois o tipo já foi validado.
      }
      if (!editingCharacterName.trim()) {
        alert("O nome do personagem não pode estar vazio.");
        return;
      }

      // Validação de imagem
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

      if (
        isNaN(maxHpNum) ||
        maxHpNum <= 0
      ) {
        alert(
          "Valores de HP inválidos. Vida Máxima deve ser > 0."
        );
        return;
      }

      const updatedCharacterPartialData: Partial<Character> = {
        name: editingCharacterName.trim(),
        image:
          editingCharacterImage.trim() === ""
            ? DEFAULT_TOKEN_IMAGE
            : editingCharacterImage,
        size: editingCharacterSize,
        maxHp: maxHpNum,
        notes: editingCharacterNotes,
        type: editingCharacterType,
      };

      if (editingCharacterType === CharacterType.PLAYER) {
        (updatedCharacterPartialData as Partial<PlayerCharacter>).inspiration =
          editingInspiration;
      }

      onSave(updatedCharacterPartialData);
    },
    [
      initialCharacterData,
      editingCharacterName,
      editingCharacterImage,
      editingCharacterSize,
      editingCharacterType,
      editingMaxHp,
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
    editingCharacterNotes,
    setEditingCharacterNotes,
    editingInspiration,
    setEditingInspiration,
    hasCharacterSheetChanged,
    handleSave,
  };
}
