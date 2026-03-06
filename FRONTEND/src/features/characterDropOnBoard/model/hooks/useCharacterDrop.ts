import { useCallback } from 'react';

import { toast } from 'sonner';

import { Character, CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { parseTokenSize } from '@/entities/token/model/utils/tokenUtils';
import { GridSettings, PageSettings, Point } from '@/shared/api/types';
import {
  clampGridCellToBoard,
  isWorldPointInsideBoard,
  worldPointToGridCell,
} from '@/shared/lib/board/boardMath';

interface UseCharacterDropProps {
  getWorldPoint: (clientX: number, clientY: number) => Point;
  characters: Character[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  addToken: (characterId: string, position: Point, currentHp?: number) => void;
  spawnMonsterFromCatalog: (monsterId: string, position: Point) => void;
  canSpawnMonsterFromCompendium: boolean;
  canCreateTokenForCharacter: (characterId: string) => boolean;
}

export function useCharacterDrop({
  getWorldPoint,
  characters,
  gridSettings,
  pageSettings,
  addToken,
  spawnMonsterFromCatalog,
  canSpawnMonsterFromCompendium,
  canCreateTokenForCharacter,
}: UseCharacterDropProps) {
  const handleDragOver = useCallback((event: React.DragEvent<Element>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleCharacterDrop = useCallback(
    (event: React.DragEvent<Element>) => {
      event.preventDefault();
      const monsterId = event.dataTransfer.getData('application/vtt-monster-id').trim();
      const characterId = event.dataTransfer.getData('application/vtt-character-id');
      const dropPoint = getWorldPoint(event.clientX, event.clientY);
      const cellSize = gridSettings.visualCellSize;
      if (!isWorldPointInsideBoard({ worldPoint: dropPoint, pageSettings, cellSize })) {
        return;
      }

      const rawGridCell = worldPointToGridCell({
        worldPoint: dropPoint,
        cellSize,
        roundMode: 'floor',
      });
      const baseGridCell = clampGridCellToBoard({
        gridCell: rawGridCell,
        pageSettings,
      });

      if (monsterId) {
        if (!canSpawnMonsterFromCompendium) {
          toast.error('Somente o mestre pode instanciar monstros a partir da biblioteca.');
          return;
        }

        spawnMonsterFromCatalog(monsterId, baseGridCell);
        return;
      }

      if (characterId) {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return;
        if (!canCreateTokenForCharacter(characterId)) {
          toast.error('Você não tem permissão para instanciar tokens desta ficha.');
          return;
        }

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(character.size);
        const boundedGridCell = clampGridCellToBoard({
          gridCell: baseGridCell,
          pageSettings,
          tokenSizeInCells: [sizeMultiplierX, sizeMultiplierY],
        });

        const initialHp =
          character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum.NPC
            ? character.combatStats.maxHp
            : undefined;

        addToken(characterId, boundedGridCell, initialHp);
      }
    },
    [
      getWorldPoint,
      characters,
      gridSettings,
      pageSettings,
      addToken,
      spawnMonsterFromCatalog,
      canSpawnMonsterFromCompendium,
      canCreateTokenForCharacter,
    ],
  );

  return {
    handleDragOver,
    handleCharacterDrop,
  };
}
