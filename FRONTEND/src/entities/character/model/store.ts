import { create } from 'zustand';

import { requireNormalizedCharacterEntry } from './adapters/sessionCharacterAdapter';
import {
  Character,
  PlayerCharacter,
  MonsterNpcCharacter,
  characterSchema,
} from './schemas/character.schema';

import type { SessionCharacterRuntime } from './schemas/playerCharacterRuntime.schema';

export interface CharactersState {
  characters: Character[];
  runtimeCharactersById: Record<string, SessionCharacterRuntime>;
  addCharacter: (characterData: Partial<Omit<Character, 'id'>>) => Character;
  addCharacterFromSession: (character: unknown) => void;
  deleteCharacter: (characterId: string) => void;
  removeCharacterFromSession: (characterId: string) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  updateCharacterHp: (
    characterId: string,
    newHp: number,
    newTempHp?: number,
    options?: {
      deadConditionApplied?: boolean;
      deadConditionRemoved?: boolean;
    },
  ) => void;
  duplicateCharacter: (characterId: string) => Character | null;
  replaceCharacters: (characters: unknown[]) => void;
}

function isRuntimeBackedCharacter(
  runtimeCharactersById: Record<string, SessionCharacterRuntime>,
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

function throwBlockedLocalCharacterMutation(operation: string): never {
  throw new Error(
    `Fluxo local bloqueado em charactersStore.${operation}: a store de personagens aceita apenas mutações autoritativas de sessão.`,
  );
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: [],
  runtimeCharactersById: {},

  addCharacter: (_characterData) => {
    void _characterData;
    return throwBlockedLocalCharacterMutation('addCharacter');
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
    const state = get();
    if (isRuntimeBackedCharacter(state.runtimeCharactersById, characterId)) {
      logBlockedRuntimeMutation('deleteCharacter', characterId);
      return;
    }

    throwBlockedLocalCharacterMutation('deleteCharacter');
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
    const state = get();
    if (isRuntimeBackedCharacter(state.runtimeCharactersById, characterId)) {
      logBlockedRuntimeMutation('updateCharacter', characterId);
      return;
    }

    void updates;
    throwBlockedLocalCharacterMutation('updateCharacter');
  },

  updateCharacterHp: (characterId, newHp, newTempHp, options) => {
    set((state) => {
      const nextRuntimeCharactersById = { ...state.runtimeCharactersById };
      const runtimeCharacter = nextRuntimeCharactersById[characterId];
      let nextRuntimeCharacter = runtimeCharacter;
      if (runtimeCharacter) {
        if (runtimeCharacter.type === 'Player') {
          nextRuntimeCharacter = {
            ...runtimeCharacter,
            hitPoints: {
              ...runtimeCharacter.hitPoints,
              current: newHp,
              max: runtimeCharacter.hitPoints.max,
              temporary: newTempHp ?? runtimeCharacter.hitPoints.temporary,
            },
          };
        } else {
          nextRuntimeCharacter = {
            ...runtimeCharacter,
            hitPoints: {
              ...runtimeCharacter.hitPoints,
              current: newHp,
              temporary: newTempHp ?? runtimeCharacter.hitPoints.temporary,
            },
          };
        }
        const nextEffects = nextRuntimeCharacter.activeEffects.effects.filter(
          (effect) => effect.linkedCondition !== 'dead',
        );
        if (options?.deadConditionApplied) {
          const nextEffectIndex =
            nextEffects.reduce((max, effect) => Math.max(max, effect.effectIndex), -1) + 1;

          nextEffects.push({
            instanceId: crypto.randomUUID(),
            source: {
              sourceType: 'action',
              sourceId: 'act-apply-effect',
            },
            effectIndex: nextEffectIndex,
            linkedCondition: 'dead',
            stackCount: 1,
            isSuppressed: false,
          });
        }

        if (options?.deadConditionApplied || options?.deadConditionRemoved) {
          nextRuntimeCharacter = {
            ...nextRuntimeCharacter,
            activeEffects: {
              ...nextRuntimeCharacter.activeEffects,
              effects: nextEffects,
            },
          };
        }

        nextRuntimeCharactersById[characterId] = nextRuntimeCharacter;
      }

      return {
        characters: state.characters.map((char) => {
          if (char.id === characterId && 'combatStats' in char) {
            const characterWithCombatStats = char as PlayerCharacter | MonsterNpcCharacter;
            if (nextRuntimeCharacter) {
              const nextMaxHp =
                nextRuntimeCharacter.type === 'Player'
                  ? nextRuntimeCharacter.hitPoints.max
                  : characterWithCombatStats.combatStats.maxHp;
              return {
                ...characterWithCombatStats,
                combatStats: {
                  ...characterWithCombatStats.combatStats,
                  currentHp: nextRuntimeCharacter.hitPoints.current,
                  tempHp: nextRuntimeCharacter.hitPoints.temporary,
                  maxHp: nextMaxHp,
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
              return parsedCharacter;
            } catch (e) {
              console.error('Violação de contrato ao atualizar HP localmente.', {
                characterId,
                error: e,
                updatedObject,
              });
              throw e;
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
    return throwBlockedLocalCharacterMutation('duplicateCharacter');
  },

  replaceCharacters: (characters) => {
    const normalizedEntries = characters.map((entry, index) =>
      requireNormalizedCharacterEntry(entry, `replaceCharacters[${index}]`),
    );

    const runtimeCharactersById = normalizedEntries.reduce<Record<string, SessionCharacterRuntime>>(
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
