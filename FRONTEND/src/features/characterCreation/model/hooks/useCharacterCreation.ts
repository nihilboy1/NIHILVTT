// src/features/characterCreation/model/hooks/useCharacterCreation.ts

import { useCallback } from 'react';

export function useCharacterCreation() {
  const createPlayerCharacter = useCallback(
    (name: string) => {
      console.error(
        'Fluxo local bloqueado: criação direta de personagem exige pipeline autoritativo de sessão.',
        { name, characterType: 'Player' },
      );
    },
    [],
  );

  const createMonsterNpc = useCallback(
    (name: string) => {
      console.error(
        'Fluxo local bloqueado: criação direta de NPC exige pipeline autoritativo de sessão.',
        { name, characterType: 'NPC' },
      );
    },
    [],
  );

  return { createPlayerCharacter, createMonsterNpc };
}
