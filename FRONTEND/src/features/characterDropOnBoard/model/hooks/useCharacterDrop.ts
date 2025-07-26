import { useCallback } from 'react';

import { Character, CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { parseTokenSize } from '@/entities/token/model/utils/tokenUtils';
import { GridSettings, PageSettings, Point } from '@/shared/api/types';

interface UseCharacterDropProps {
  getSVGPoint: (clientX: number, clientY: number) => Point;
  characters: Character[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  addToken: (characterId: string, position: Point, currentHp?: number) => void;
}

export function useCharacterDrop({
  getSVGPoint,
  characters,
  gridSettings,
  pageSettings,
  addToken,
}: UseCharacterDropProps) {
  const handleDragOver = useCallback((event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleCharacterDrop = useCallback(
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      const characterId = event.dataTransfer.getData('application/vtt-character-id');
      if (characterId) {
        const character = characters.find((c) => c.id === characterId);
        if (!character) return;

        const dropPoint = getSVGPoint(event.clientX, event.clientY);
        const cellSize = gridSettings.visualCellSize;
        const pageActualWidth = pageSettings.widthInUnits * cellSize;
        const pageActualHeight = pageSettings.heightInUnits * cellSize;
        if (
          dropPoint.x < 0 ||
          dropPoint.x > pageActualWidth ||
          dropPoint.y < 0 ||
          dropPoint.y > pageActualHeight
        )
          return;

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(character.size);
        let gridX = Math.floor(dropPoint.x / cellSize);
        let gridY = Math.floor(dropPoint.y / cellSize);

        gridX = Math.max(
          0,
          Math.min(gridX, pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)),
        );
        gridY = Math.max(
          0,
          Math.min(gridY, pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)),
        );

        const initialHp =
          character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum['Monster/NPC']
            ? character.combatStats.maxHp
            : undefined;

        addToken(characterId, { x: gridX, y: gridY }, initialHp);
      }
    },
    [getSVGPoint, characters, gridSettings, pageSettings, addToken],
  );

  return {
    handleDragOver,
    handleCharacterDrop,
  };
}
