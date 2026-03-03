import { z } from 'zod';
import { create } from 'zustand';

import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';
import { deepMerge } from '@/shared/lib/utils/object/objectUtils';

import { DEFAULT_MONSTER_DATA, DEFAULT_PLAYER_DATA } from '../config/sheetDefaults';

import {
  Character,
  characterSchema,
  PlayerCharacter,
  MonsterNpcCharacter,
} from './schemas/character.schema';
import {
  normalizeCharacterForStore,
  requireNormalizedCharacterEntry,
} from './adapters/sessionCharacterAdapter';
import type { PlayerCharacterRuntime } from './schemas/playerCharacterRuntime.schema';
import { CharacterTypeEnum } from '@nihilvtt/datamodeling/primitives';

export interface CharactersState {
  characters: Character[];
  runtimeCharactersById: Record<string, PlayerCharacterRuntime>;
  addCharacter: (characterData: Partial<Omit<Character, 'id'>>) => Character;
  addCharacterFromSession: (character: unknown) => void;
  deleteCharacter: (characterId: string) => void;
  removeCharacterFromSession: (characterId: string) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  updateCharacterHp: (characterId: string, newHp: number, newTempHp?: number) => void;
  duplicateCharacter: (characterId: string) => Character | null;
  replaceCharacters: (characters: unknown[]) => void;
}

function isRuntimeBackedCharacter(
  runtimeCharactersById: Record<string, PlayerCharacterRuntime>,
  characterId: string,
): boolean {
  return runtimeCharactersById[characterId] !== undefined;
}

function logBlockedRuntimeMutation(operation: string, characterId: string): void {
  console.error(
    `Mutação local bloqueada (${operation}) para personagem runtime-backed. Use comando autoritativo de sessão.`,
    { characterId },
  );
}

const createNewCharacter = (characterData: Partial<Omit<Character, 'id'>>): Character => {
  const newId = generateUniqueId();
  const type = characterData.type || CharacterTypeEnum.enum.Player;

  let baseData;
  if (type === CharacterTypeEnum.enum.Player) {
    baseData = { ...DEFAULT_PLAYER_DATA, id: newId, type };
  } else {
    baseData = {
      ...DEFAULT_MONSTER_DATA,
      id: newId,
      type: CharacterTypeEnum.enum['NPC'],
    };
  }

  const mergedData = deepMerge(baseData, characterData as object);

  const normalizedCharacter = normalizeCharacterForStore(mergedData);
  if (normalizedCharacter) {
    return normalizedCharacter;
  }

  console.error('Falha ao criar personagem. Objeto inválido:', mergedData);
  const normalizedBaseCharacter = normalizeCharacterForStore(baseData);
  if (normalizedBaseCharacter) {
    return normalizedBaseCharacter;
  }

  try {
    return characterSchema.parse(baseData);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(
        'DETALHES DO ERRO (de z.treeifyError):',
        JSON.stringify(z.treeifyError(e), null, 2),
      );
    } else {
      console.error('ERRO INESPERADO:', e);
    }
    throw e;
  }
};

const INITIAL_CHARACTERS: Character[] = [
  createNewCharacter({
    type: CharacterTypeEnum.enum.Player,
    name: 'Aventureiro Padrão',
  }),
];

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: INITIAL_CHARACTERS,
  runtimeCharactersById: {},

  addCharacter: (data) => {
    const newCharacter = createNewCharacter(data);
    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },

  addCharacterFromSession: (character) => {
    set((state) => {
      const normalizedEntry = requireNormalizedCharacterEntry(character, 'addCharacterFromSession');
      const { character: normalizedCharacter, runtimeCharacter } = normalizedEntry;
      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      if (runtimeCharacter) {
        nextRuntimeCharactersById[normalizedCharacter.id] = runtimeCharacter;
      } else {
        delete nextRuntimeCharactersById[normalizedCharacter.id];
      }

      const index = state.characters.findIndex((entry) => entry.id === normalizedCharacter.id);
      if (index < 0) {
        return {
          characters: [...state.characters, normalizedCharacter],
          runtimeCharactersById: nextRuntimeCharactersById,
        };
      }
      return {
        characters: state.characters.map((entry, currentIndex) =>
          currentIndex === index ? normalizedCharacter : entry,
        ),
        runtimeCharactersById: nextRuntimeCharactersById,
      };
    });
  },

  deleteCharacter: (characterId) => {
    set((state) => {
      if (isRuntimeBackedCharacter(state.runtimeCharactersById, characterId)) {
        logBlockedRuntimeMutation('deleteCharacter', characterId);
        return state;
      }

      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      delete nextRuntimeCharactersById[characterId];

      return {
        characters: state.characters.filter((char) => char.id !== characterId),
        runtimeCharactersById: nextRuntimeCharactersById,
      };
    });
  },

  removeCharacterFromSession: (characterId) => {
    set((state) => {
      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      delete nextRuntimeCharactersById[characterId];

      return {
        characters: state.characters.filter((char) => char.id !== characterId),
        runtimeCharactersById: nextRuntimeCharactersById,
      };
    });
  },

  updateCharacter: (characterId, updates) => {
    set((state) => {
      if (isRuntimeBackedCharacter(state.runtimeCharactersById, characterId)) {
        logBlockedRuntimeMutation('updateCharacter', characterId);
        return state;
      }

      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      delete nextRuntimeCharactersById[characterId];

      return {
        characters: state.characters.map((char) => {
          if (char.id === characterId) {
            const updatedObject = deepMerge(char, updates);
            const normalizedCharacter = normalizeCharacterForStore(updatedObject);
            if (normalizedCharacter) {
              return normalizedCharacter;
            }

            try {
              return characterSchema.parse(updatedObject);
            } catch (e) {
              console.error('--- ZOD VALIDATION FAILED ---');
              if (e instanceof z.ZodError) {
                console.error(
                  'DETALHES DO ERRO (de e.flatten()):',
                  JSON.stringify(e.flatten(), null, 2),
                );
              } else {
                console.error('ERRO INESPERADO:', e);
              }
              console.log('--- OBJETO QUE FALHOU NA VALIDAÇÃO (de updatedObject) ---');
              console.log(updatedObject);
              throw e; // Re-throw the error so react-hook-form can catch it
            }
          }
          return char;
        }),
        runtimeCharactersById: nextRuntimeCharactersById,
      };
    });
  },

  updateCharacterHp: (characterId, newHp, newTempHp) => {
    set((state) => {
      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      const runtimeCharacter = nextRuntimeCharactersById[characterId];
      let nextRuntimeCharacter = runtimeCharacter;
      if (runtimeCharacter) {
        nextRuntimeCharacter = {
          ...runtimeCharacter,
          hitPoints: {
            ...runtimeCharacter.hitPoints,
            current: newHp,
            max: runtimeCharacter.hitPoints.max,
            temporary: newTempHp ?? runtimeCharacter.hitPoints.temporary,
          },
        };
        nextRuntimeCharactersById[characterId] = nextRuntimeCharacter;
      }

      return {
        characters: state.characters.map((char) => {
          if (char.id === characterId && 'combatStats' in char) {
            const characterWithCombatStats = char as PlayerCharacter | MonsterNpcCharacter;
            console.log(
              'CharacterStore: updateCharacterHp chamado para Character ID:',
              characterId,
              'com novo HP:',
              newHp,
              'HP atual (antes):',
              characterWithCombatStats.combatStats.currentHp,
            );

            if (nextRuntimeCharacter) {
              return {
                ...characterWithCombatStats,
                combatStats: {
                  ...characterWithCombatStats.combatStats,
                  currentHp: nextRuntimeCharacter.hitPoints.current,
                  tempHp: nextRuntimeCharacter.hitPoints.temporary,
                  maxHp: nextRuntimeCharacter.hitPoints.max,
                },
              };
            }

            const newCombatStats = {
              ...characterWithCombatStats.combatStats,
              currentHp: newHp,
              tempHp: newTempHp ?? characterWithCombatStats.combatStats.tempHp,
            };
            const updatedObject = { ...characterWithCombatStats, combatStats: newCombatStats };

            try {
              const parsedCharacter = characterSchema.parse(updatedObject);
              if ('combatStats' in parsedCharacter) {
                console.log(
                  'CharacterStore: HP atualizado para:',
                  parsedCharacter.combatStats.currentHp,
                );
              }
              return parsedCharacter;
            } catch (e) {
              console.error('--- ZOD VALIDATION FAILED (updateCharacterHp) ---');
              if (e instanceof z.ZodError) {
                console.error('DETALHES DO ERRO:', JSON.stringify(e.flatten(), null, 2));
              } else {
                console.error('ERRO INESPERADO:', e);
              }
              console.log('--- OBJETO QUE FALHOU: ---');
              console.log(updatedObject);
              return char; // Retorna o original em caso de falha
            }
          }
          return char;
        }),
        runtimeCharactersById: nextRuntimeCharactersById,
      };
    });
  },

  duplicateCharacter: (characterId) => {
    const state = get();
    if (isRuntimeBackedCharacter(state.runtimeCharactersById, characterId)) {
      logBlockedRuntimeMutation('duplicateCharacter', characterId);
      return null;
    }

    const original = state.characters.find((char) => char.id === characterId);
    if (!original) return null;

    const newCharacter = createNewCharacter({
      ...original,
      name: `${original.name} (Cópia)`,
    });

    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },

  replaceCharacters: (characters) => {
    const normalizedEntries = characters.map((entry, index) =>
      requireNormalizedCharacterEntry(entry, `replaceCharacters[${index}]`),
    );

    const runtimeCharactersById = normalizedEntries.reduce<Record<string, PlayerCharacterRuntime>>(
      (acc, entry) => {
        if (entry.runtimeCharacter) {
          acc[entry.character.id] = entry.runtimeCharacter;
        }
        return acc;
      },
      {},
    );

    set({
      characters: normalizedEntries.map((entry) => entry.character),
      runtimeCharactersById,
    });
  },
}));
