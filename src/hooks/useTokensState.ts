import { useState, useCallback, useMemo } from "react";
import { type Token, TokenType, type GridInstance, type PlayerToken, type MonsterNPCToken, type ObjectToken } from "../types"; // Import all necessary token types
import {
  DEFAULT_TOKEN_HP,
  DEFAULT_PLAYER_LEVEL,
  DEFAULT_PLAYER_INSPIRATION,
  DEFAULT_TOKEN_COLOR,
  DEFAULT_TOKEN_SIZE,
} from "../constants";
import { generateUniqueId } from "../utils/id/idUtils"; // Importar a função

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
  const initialTokens: Token[] = [ // Changed from PlayerToken[]
    {
      id: generateUniqueId(),
      name: "Aventureiro Padrão",
      type: TokenType.PLAYER,
      color: "#008000", // Verde
      size: "1x1",
      currentHp: 10,
      maxHp: 10,
      notes: "Um aventureiro genérico para começar.",
      species: "Humano",
      charClass: "Guerreiro",
      subclass: "",
      level: 1,
      background: "Herói do Povo",
      inspiration: false,
      armorClass: 12,
      shieldEquipped: false,
      tempHp: 0,
      hitDiceUsed: 0,
      hitDiceMax: 1,
      deathSavesSuccesses: 0,
      deathSavesFailures: 0,
      xp: 0,
      initiative: 0,
      speed: 30,
      attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
      proficiencies: {
        savingThrows: {
          strength: false,
          dexterity: false,
          constitution: false,
          intelligence: false,
          wisdom: false,
          charisma: false,
        },
        skills: {
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
        },
      },
      attacks: [],
      featuresAndTraits: [],
    } as PlayerToken, // Assert as PlayerToken to ensure all properties are present
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

  const addToken = useCallback(
    (tokenData: Omit<Token, "id">): Token => { // Changed parameter and return type
      let newToken: Token; // Declare as Token

      const commonProps = {
        name: tokenData.name,
        type: tokenData.type,
        color: tokenData.color ?? DEFAULT_TOKEN_COLOR,
        size: tokenData.size ?? DEFAULT_TOKEN_SIZE,
        currentHp: tokenData.currentHp ?? DEFAULT_TOKEN_HP,
        maxHp: tokenData.maxHp ?? DEFAULT_TOKEN_HP,
        notes: tokenData.notes ?? "",
      };

      if (tokenData.type === TokenType.PLAYER) {
        newToken = {
          ...commonProps,
          species: (tokenData as Omit<PlayerToken, "id">).species || "",
          charClass: (tokenData as Omit<PlayerToken, "id">).charClass || "",
          subclass: (tokenData as Omit<PlayerToken, "id">).subclass || "",
          level:
            (tokenData as Omit<PlayerToken, "id">).level !== undefined
              ? (tokenData as Omit<PlayerToken, "id">).level
              : DEFAULT_PLAYER_LEVEL,
          background: (tokenData as Omit<PlayerToken, "id">).background || "",
          inspiration:
            (tokenData as Omit<PlayerToken, "id">).inspiration !== undefined
              ? (tokenData as Omit<PlayerToken, "id">).inspiration
              : DEFAULT_PLAYER_INSPIRATION,
          armorClass: (tokenData as Omit<PlayerToken, "id">).armorClass ?? 10,
          shieldEquipped: (tokenData as Omit<PlayerToken, "id">).shieldEquipped ?? false,
          tempHp: (tokenData as Omit<PlayerToken, "id">).tempHp ?? 0,
          hitDiceUsed: (tokenData as Omit<PlayerToken, "id">).hitDiceUsed ?? 0,
          hitDiceMax: (tokenData as Omit<PlayerToken, "id">).hitDiceMax ?? 1,
          deathSavesSuccesses: (tokenData as Omit<PlayerToken, "id">).deathSavesSuccesses ?? 0,
          deathSavesFailures: (tokenData as Omit<PlayerToken, "id">).deathSavesFailures ?? 0,
          xp: (tokenData as Omit<PlayerToken, "id">).xp ?? 0,
          initiative: (tokenData as Omit<PlayerToken, "id">).initiative ?? 0,
          speed: (tokenData as Omit<PlayerToken, "id">).speed ?? 30,
          attributes: (tokenData as Omit<PlayerToken, "id">).attributes ?? {
            strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10
          },
          proficiencies: (tokenData as Omit<PlayerToken, "id">).proficiencies ?? {
            savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
            skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false }
          },
          attacks: (tokenData as Omit<PlayerToken, "id">).attacks ?? [],
          equipment: (tokenData as Omit<PlayerToken, "id">).equipment ?? [],
          featuresAndTraits: (tokenData as Omit<PlayerToken, "id">).featuresAndTraits ?? [],
          id: generateUniqueId(),
        } as PlayerToken; // Assert as PlayerToken
      } else if (tokenData.type === TokenType.MONSTER_NPC) {
        newToken = {
          ...commonProps,
          challengeRating: (tokenData as Omit<MonsterNPCToken, "id">).challengeRating ?? 0,
          id: generateUniqueId(),
        } as MonsterNPCToken; // Assert as MonsterNPCToken
      } else if (tokenData.type === TokenType.OBJECT) {
        newToken = {
          ...commonProps,
          isInteractive: (tokenData as Omit<ObjectToken, "id">).isInteractive ?? false,
          id: generateUniqueId(),
        } as ObjectToken; // Assert as ObjectToken
      } else {
        // Fallback for any other TokenType, though our union should cover all cases
        newToken = {
          ...commonProps,
          id: generateUniqueId(),
        } as Token; // Assert as generic Token
      }

      setTokens((prevTokens) => [...prevTokens, newToken]);
      return newToken;
    },
    []
  );

  const deleteToken = useCallback((tokenId: string) => { // Changed parameter name
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== tokenId)
    );
    setGridInstances((prevInstances) =>
      prevInstances.filter((instance) => instance.tokenInfoId !== tokenId)
    );
  }, []);

  const updateToken = useCallback(
    (tokenId: string, updates: Partial<Token>) => { // Changed parameter type and name
      setTokens((prevTokens) =>
        prevTokens.map((token) =>
          token.id === tokenId ? { ...token, ...updates } : token
        )
      );
    },
    []
  );

  const addGridInstance = useCallback(
    (tokenId: string, gridX: number, gridY: number): GridInstance => { // Changed parameter name
      const parentTokenExists = tokens.some(
        (token) => token.id === tokenId
      );
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
    (tokenId: string): Token | null => { // Changed return type and parameter name
      const originalToken = tokens.find((token) => token.id === tokenId);
      if (!originalToken) {
        console.error(
          "TokenInfo não encontrado para duplicação:",
          tokenId
        );
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
    (instanceId: string): Token | null => { // Changed return type
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
        console.error(
          "Original Token not found for instance:",
          instanceId
        );
        return null;
      }

      const copiedTokenInfoData = JSON.parse(JSON.stringify(originalTokenInfo));

      const newIndependentToken: Token = { // Changed type
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
