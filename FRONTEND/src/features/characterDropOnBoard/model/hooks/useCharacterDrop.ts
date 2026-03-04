import { useCallback } from 'react';
import { toast } from 'sonner';

import { Character, CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { parseTokenSize } from '@/entities/token/model/utils/tokenUtils';
import { GridSettings, PageSettings, Point } from '@/shared/api/types';

interface UseCharacterDropProps {
  getSVGPoint: (clientX: number, clientY: number) => Point;
  characters: Character[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  addToken: (characterId: string, position: Point, currentHp?: number) => void;
  spawnMonsterFromCatalog: (monsterId: string, position: Point) => void;
  canSpawnMonsterFromCompendium: boolean;
  canCreateTokenForCharacter: (characterId: string) => boolean;
}

export function useCharacterDrop({
  getSVGPoint,
  characters,
  gridSettings,
  pageSettings,
  addToken,
  spawnMonsterFromCatalog,
  canSpawnMonsterFromCompendium,
  canCreateTokenForCharacter,
}: UseCharacterDropProps) {
  const handleDragOver = useCallback((event: React.DragEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleCharacterDrop = useCallback(
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      const monsterId = event.dataTransfer.getData('application/vtt-monster-id').trim();
      const characterId = event.dataTransfer.getData('application/vtt-character-id');
      const dropPoint = getSVGPoint(event.clientX, event.clientY);
      const cellSize = gridSettings.visualCellSize;
      const pageActualWidth = pageSettings.widthInUnits * cellSize;
      const pageActualHeight = pageSettings.heightInUnits * cellSize;
      if (
        dropPoint.x < 0 ||
        dropPoint.x > pageActualWidth ||
        dropPoint.y < 0 ||
        dropPoint.y > pageActualHeight
      ) {
        return;
      }

      let gridX = Math.floor(dropPoint.x / cellSize);
      let gridY = Math.floor(dropPoint.y / cellSize);
      gridX = Math.max(0, Math.min(gridX, pageSettings.widthInUnits - 1));
      gridY = Math.max(0, Math.min(gridY, pageSettings.heightInUnits - 1));

      if (monsterId) {
        if (!canSpawnMonsterFromCompendium) {
          toast.error('Somente o mestre pode instanciar monstros a partir da biblioteca.');
          return;
        }

        spawnMonsterFromCatalog(monsterId, { x: gridX, y: gridY });
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
        let snappedGridX = gridX;
        let snappedGridY = gridY;

        snappedGridX = Math.max(
          0,
          Math.min(snappedGridX, pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)),
        );
        snappedGridY = Math.max(
          0,
          Math.min(snappedGridY, pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)),
        );

        const initialHp =
          character.type === CharacterTypeEnum.enum.Player ||
          character.type === CharacterTypeEnum.enum.NPC
            ? character.combatStats.maxHp
            : undefined;

        addToken(characterId, { x: snappedGridX, y: snappedGridY }, initialHp);
      }
    },
    [
      getSVGPoint,
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
