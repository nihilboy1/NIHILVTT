import { useState, useCallback, useMemo } from "react";
import {
  type Token,
  TokenType,
  type GridInstance,
  type PlayerToken,
  type MonsterNPCToken,
  type ObjectToken,
} from "../types"; // Import all necessary token types
import {
  DEFAULT_TOKEN_IMAGE, // Importar a imagem padrão
  DEFAULT_TOKEN_DATA, // Importar os dados padrão do token
} from "../constants/sheetDefaults"; // Ajustar o caminho da importação
import { generateUniqueId } from '../utils/id/idUtils';

export interface TokensState {
  tokens: Token[]; // Changed from PlayerToken[]
  gridInstances: GridInstance[];
  gridInstanceCounts: Map<string, number>;
  addToken: (tokenData: Omit<Token, "id">) => Token; // Changed from PlayerToken
  deleteToken: (tokenId: string) => void; // Changed parameter name
  duplicateToken: (tokenId: string) => Token | null; // Changed return type and parameter name
  updateToken: (tokenId: string, updates: Partial<Token>) => void; // Changed parameter type and name
  addGridInstance: (
    tokenId: string, // Changed parameter name
    gridX: number,
    gridY: number
  ) => GridInstance;
  removeGridInstance: (instanceId: string) => void;
  updateGridInstancePosition: (
    instanceId: string,
    newGridX: number,
    newGridY: number
  ) => void;
  makeGridInstanceIndependent: (instanceId: string) => Token | null; // Changed return type
}

export const useTokensState = (): TokensState => {
  const initialTokens: Token[] = [
    {
      ...DEFAULT_TOKEN_DATA,
      id: generateUniqueId(),
      name: "Aventureiro Padrão", // Sobrescrever o nome padrão para o exemplo inicial
    } as PlayerToken, // Assegurar que é um PlayerToken para o exemplo inicial
  ];

  const [tokens, setTokens] = useState<Token[]>(initialTokens); // Changed from PlayerToken[]
  const [gridInstances, setGridInstances] = useState<GridInstance[]>([]);

  const gridInstanceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    gridInstances.forEach((instance) => {
      counts.set(
        instance.tokenInfoId,
        (counts.get(instance.tokenInfoId) || 0) + 1
      );
    });
    return counts;
  }, [gridInstances]);

  const addToken = useCallback((tokenData: Omit<Token, "id">): Token => {
    console.log("addToken chamado com:", tokenData);
    const newId = generateUniqueId();

    let newToken: Token;

    if (tokenData.type === TokenType.PLAYER) {
      newToken = {
        ...DEFAULT_TOKEN_DATA, // Começa com os defaults de PlayerToken
        ...tokenData, // Sobrescreve com os dados fornecidos
        id: newId, // Garante um novo ID
        image: tokenData.image ?? DEFAULT_TOKEN_IMAGE, // Garante a imagem padrão se não fornecida
      } as PlayerToken;
    } else if (tokenData.type === TokenType.MONSTER_NPC) {
      newToken = {
        id: newId,
        name: tokenData.name,
        type: TokenType.MONSTER_NPC,
        image: tokenData.image ?? DEFAULT_TOKEN_IMAGE,
        size: tokenData.size ?? DEFAULT_TOKEN_DATA.size,
        currentHp: tokenData.currentHp ?? DEFAULT_TOKEN_DATA.currentHp,
        maxHp: tokenData.maxHp ?? DEFAULT_TOKEN_DATA.maxHp,
        notes: tokenData.notes ?? DEFAULT_TOKEN_DATA.notes,
        challengeRating: (tokenData as MonsterNPCToken).challengeRating ?? 0, // Default para Monster/NPC
      } as MonsterNPCToken;
    } else if (tokenData.type === TokenType.OBJECT) {
      newToken = {
        id: newId,
        name: tokenData.name,
        type: TokenType.OBJECT,
        image: tokenData.image ?? DEFAULT_TOKEN_IMAGE,
        size: tokenData.size ?? DEFAULT_TOKEN_DATA.size,
        currentHp: tokenData.currentHp ?? DEFAULT_TOKEN_DATA.currentHp,
        maxHp: tokenData.maxHp ?? DEFAULT_TOKEN_DATA.maxHp,
        notes: tokenData.notes ?? DEFAULT_TOKEN_DATA.notes,
        isInteractive: (tokenData as ObjectToken).isInteractive ?? false, // Default para Object
      } as ObjectToken;
    } else {
      // Fallback para qualquer outro TokenType, embora nossa união deva cobrir todos os casos
      newToken = {
        id: newId,
        name: tokenData.name,
        type: tokenData.type,
        image: tokenData.image ?? DEFAULT_TOKEN_IMAGE,
        size: tokenData.size ?? DEFAULT_TOKEN_DATA.size,
        currentHp: tokenData.currentHp ?? DEFAULT_TOKEN_DATA.currentHp,
        maxHp: tokenData.maxHp ?? DEFAULT_TOKEN_DATA.maxHp,
        notes: tokenData.notes ?? DEFAULT_TOKEN_DATA.notes,
      } as Token;
    }

    setTokens((prevTokens) => {
      console.log("Tokens antes da atualização:", prevTokens);
      const updatedTokens = [...prevTokens, newToken];
      console.log("Tokens depois da atualização:", updatedTokens);
      return updatedTokens;
    });
    return newToken;
  }, []);

  const deleteToken = useCallback((tokenId: string) => {
    // Changed parameter name
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== tokenId)
    );
    setGridInstances((prevInstances) =>
      prevInstances.filter((instance) => instance.tokenInfoId !== tokenId)
    );
  }, []);

  const updateToken = useCallback(
    (tokenId: string, updates: Partial<Token>) => {
      // Changed parameter type and name
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId ? { ...token, ...updates } : token
        )
      );
    },
    []
  );

  const addGridInstance = useCallback(
    (tokenId: string, gridX: number, gridY: number): GridInstance => {
      // Changed parameter name
      const parentTokenExists = tokens.some((token) => token.id === tokenId);
      if (!parentTokenExists) {
        const stillReferencedByInstances =
          (gridInstanceCounts.get(tokenId) || 0) > 0;
        if (!stillReferencedByInstances) {
          console.warn(
            `TokenInfo with id ${tokenId} not found and no existing instances. Cannot create GridInstance.`
          );
        }
      }
      const newInstance: GridInstance = {
        instanceId: generateUniqueId(),
        tokenInfoId: tokenId,
        gridX,
        gridY,
      };
      setGridInstances((prevInstances) => [...prevInstances, newInstance]);
      return newInstance;
    },
    [tokens, gridInstanceCounts]
  );

  const removeGridInstance = useCallback(
    (instanceId: string) => {
      const instanceToRemove = gridInstances.find(
        (inst) => inst.instanceId === instanceId
      );
      if (!instanceToRemove) return;

      setGridInstances((prevInstances) =>
        prevInstances.filter((instance) => instance.instanceId !== instanceId)
      );

      const associatedTokenInfo = tokens.find(
        (token) => token.id === instanceToRemove.tokenInfoId
      );
      if (associatedTokenInfo && associatedTokenInfo.name.includes("(Cópia)")) {
        const countForCopiedSheet =
          (gridInstanceCounts.get(associatedTokenInfo.id) || 0) - 1;

        if (countForCopiedSheet <= 0) {
          setTokens((prevTokens) =>
            prevTokens.filter((token) => token.id !== associatedTokenInfo.id)
          );
        }
      }
    },
    [gridInstances, tokens, gridInstanceCounts]
  );

  const duplicateToken = useCallback(
    (tokenId: string): Token | null => {
      // Changed return type and parameter name
      const originalToken = tokens.find((token) => token.id === tokenId);
      if (!originalToken) {
        console.error("TokenInfo não encontrado para duplicação:", tokenId);
        return null;
      }

      const duplicatedTokenData: Token = JSON.parse(
        JSON.stringify(originalToken)
      );

      const newId = generateUniqueId();
      const newName = `${originalToken.name} (Cópia)`;

      const newToken: Token = {
        ...duplicatedTokenData,
        id: newId,
        name: newName,
      };

      setTokens((prevTokens) => [...prevTokens, newToken]);
      return newToken;
    },
    [tokens]
  );

  const updateGridInstancePosition = useCallback(
    (instanceId: string, newGridX: number, newGridY: number) => {
      setGridInstances((prevInstances) =>
        prevInstances.map((instance) =>
          instance.instanceId === instanceId
            ? { ...instance, gridX: newGridX, gridY: newGridY }
            : instance
        )
      );
    },
    []
  );

  const makeGridInstanceIndependent = useCallback(
    (instanceId: string): Token | null => {
      // Changed return type
      const targetInstance = gridInstances.find(
        (inst) => inst.instanceId === instanceId
      );
      if (!targetInstance) {
        console.error("Instance not found for making independent:", instanceId);
        return null;
      }

      const originalTokenInfo = tokens.find(
        (token) => token.id === targetInstance.tokenInfoId
      );
      if (!originalTokenInfo) {
        console.error("Original Token not found for instance:", instanceId);
        return null;
      }

      const copiedTokenInfoData = JSON.parse(JSON.stringify(originalTokenInfo));

      const newIndependentToken: Token = {
        // Changed type
        ...copiedTokenInfoData,
        id: generateUniqueId(),
        name: `${originalTokenInfo.name} (Cópia)`,
      };

      setTokens((prevTokens) => [...prevTokens, newIndependentToken]);

      setGridInstances((prevInstances) =>
        prevInstances.map((instance) =>
          instance.instanceId === instanceId
            ? { ...instance, tokenInfoId: newIndependentToken.id }
            : instance
        )
      );
      return newIndependentToken;
    },
    [gridInstances, tokens]
  );

  return {
    tokens,
    gridInstances,
    gridInstanceCounts,
    addToken,
    deleteToken,
    duplicateToken,
    updateToken,
    addGridInstance,
    removeGridInstance,
    updateGridInstancePosition,
    makeGridInstanceIndependent,
  };
};
