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
import { CharacterTypeEnum } from 'node_modules/@nihilvtt/datamodeling/src/shared/primitives/character.primitives';

export interface CharactersState {
  characters: Character[];
  addCharacter: (characterData: Partial<Omit<Character, 'id'>>) => Character;
  deleteCharacter: (characterId: string) => void;
  updateCharacter: (characterId: string, updates: Partial<Character>) => void;
  updateCharacterHp: (characterId: string, newHp: number) => void;
  duplicateCharacter: (characterId: string) => Character | null;
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

  try {
    return characterSchema.parse(mergedData);
  } catch (e) {
    console.error('Falha ao criar personagem. Objeto inválido:', mergedData);
    if (e instanceof z.ZodError) {
      console.error(
        'DETALHES DO ERRO (de z.treeifyError):',
        JSON.stringify(z.treeifyError(e), null, 2),
      );
    } else {
      console.error('ERRO INESPERADO:', e);
    }
    return characterSchema.parse(baseData);
  }
};

export const useCharactersStore = create<CharactersState>((set, get) => ({
  characters: [
    createNewCharacter({
      type: CharacterTypeEnum.enum.Player,
      name: 'Aventureiro Padrão',
    }),
  ],

  addCharacter: (data) => {
    const newCharacter = createNewCharacter(data);
    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },

  deleteCharacter: (characterId) => {
    set((state) => ({
      characters: state.characters.filter((char) => char.id !== characterId),
    }));
  },

  updateCharacter: (characterId, updates) => {
    set((state) => ({
      characters: state.characters.map((char) => {
        if (char.id === characterId) {
          const updatedObject = deepMerge(char, updates);
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
    }));
  },

  updateCharacterHp: (characterId, newHp) => {
    set((state) => ({
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
          const newCombatStats = { ...characterWithCombatStats.combatStats, currentHp: newHp };
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
    }));
  },

  duplicateCharacter: (characterId) => {
    const original = get().characters.find((char) => char.id === characterId);
    if (!original) return null;

    const newCharacter = createNewCharacter({
      ...original,
      name: `${original.name} (Cópia)`,
    });

    set((state) => ({ characters: [...state.characters, newCharacter] }));
    return newCharacter;
  },
}));
