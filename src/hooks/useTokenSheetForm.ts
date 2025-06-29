import { useState, useEffect, useCallback } from "react";
import { type Token, TokenType, type PlayerToken } from "../shared/types/index";
import { DEFAULT_TOKEN_SIZE, DEFAULT_TOKEN_HP } from "../constants";
import { DEFAULT_TOKEN_IMAGE } from "../constants/sheetDefaults";

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
  editingInspiration: boolean;
  setEditingInspiration: React.Dispatch<React.SetStateAction<boolean>>;
  hasTokenSheetChanged: boolean;
  handleSave: (e: React.FormEvent) => void;
}

export interface UseTokenSheetFormProps {
  initialTokenData: Token | null;
  onSave: (updatedData: Partial<Token>) => void;
}

export function useTokenSheetForm({
  initialTokenData,
  onSave,
}: UseTokenSheetFormProps): UseTokenSheetFormReturn {
  const [editingTokenName, setEditingTokenName] = useState("");
  const [editingTokenImage, setEditingTokenImage] =
    useState(DEFAULT_TOKEN_IMAGE);
  const [editingTokenSize, setEditingTokenSize] = useState(DEFAULT_TOKEN_SIZE);
  const [editingTokenType, setEditingTokenType] = useState<TokenType | null>(
    null
  );
  const [editingCurrentHp, setEditingCurrentHp] = useState(
    String(DEFAULT_TOKEN_HP)
  );
  const [editingMaxHp, setEditingMaxHp] = useState(String(DEFAULT_TOKEN_HP));
  const [editingTokenNotes, setEditingTokenNotes] = useState("");
  const [editingInspiration, setEditingInspiration] = useState(false);

  const [hasTokenSheetChanged, setHasTokenSheetChanged] =
    useState<boolean>(false);

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
      // Apenas inicializa inspiration se for PlayerToken
      if (initialTokenData.type === TokenType.PLAYER) {
        setEditingInspiration(
          (initialTokenData as PlayerToken).inspiration ?? false
        );
      } else {
        setEditingInspiration(false); // Garante que seja false para outros tipos
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
    changed = changed || editingTokenType !== (initialTokenData.type || null);
    changed =
      changed ||
      editingCurrentHp !==
        String(initialTokenData.currentHp ?? DEFAULT_TOKEN_HP);
    changed =
      changed ||
      editingMaxHp !== String(initialTokenData.maxHp ?? DEFAULT_TOKEN_HP);
    changed = changed || editingTokenNotes !== (initialTokenData.notes || "");

    if (initialTokenData.type === TokenType.PLAYER) {
      changed =
        changed ||
        editingInspiration !==
          ((initialTokenData as PlayerToken).inspiration ?? false);
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
    editingInspiration,
    initialTokenData,
  ]);

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // Se initialTokenData é nulo, estamos criando um novo token.
      // A validação aqui é para garantir que o tipo do token foi selecionado.
      if (editingTokenType === null) {
        alert("Erro: O tipo do token deve ser selecionado.");
        return;
      }
      // Se estamos editando um token existente e initialTokenData é nulo por algum motivo,
      // isso indica um erro de estado, mas o caso de criação já foi tratado acima.
      if (!initialTokenData && editingTokenType !== null) {
        // Isso pode acontecer se o hook for usado para criar um token,
        // mas o initialTokenData é nulo. Não precisamos de um alerta aqui,
        // pois o tipo já foi validado.
      }
      if (!editingTokenName.trim()) {
        alert("O nome do token não pode estar vazio.");
        return;
      }

      // Validação de imagem
      const MAX_IMAGE_DIMENSION = 500;
      if (
        editingTokenImage.trim() !== "" &&
        editingTokenImage !== DEFAULT_TOKEN_IMAGE
      ) {
        try {
          const img = new Image();
          img.src = editingTokenImage;

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

      const updatedTokenPartialData: Partial<Token> = {
        name: editingTokenName.trim(),
        image:
          editingTokenImage.trim() === ""
            ? DEFAULT_TOKEN_IMAGE
            : editingTokenImage,
        size: editingTokenSize,
        currentHp: currentHpNum,
        maxHp: maxHpNum,
        notes: editingTokenNotes,
        type: editingTokenType,
      };

      if (editingTokenType === TokenType.PLAYER) {
        (updatedTokenPartialData as Partial<PlayerToken>).inspiration =
          editingInspiration;
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
      editingInspiration,
      onSave,
    ]
  );

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
    editingInspiration,
    setEditingInspiration,
    hasTokenSheetChanged,
    handleSave,
  };
}
