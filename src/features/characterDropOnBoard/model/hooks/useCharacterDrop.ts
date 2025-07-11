import { GridSettings, PageSettings, Point, CharacterType } from "@/shared/api/types"; // Adicionado CharacterType
import { parseTokenSize } from "../../../../shared/lib/utils/board/boardUtils";
import { useCallback } from "react";
import { CharacterSchema } from "@/entities/character/model/schemas/character.schema";

interface UseCharacterDropProps {
  getSVGPoint: (clientX: number, clientY: number) => Point;
  characters: CharacterSchema[]; // Renomeado tokens para characters
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  addToken: (characterId: string, position: Point, currentHp?: number) => void; // Renomeado addGridInstance para addToken
}

export const useCharacterDrop = ({
  getSVGPoint,
  characters, // Renomeado
  gridSettings,
  pageSettings,
  addToken, // Renomeado
}: UseCharacterDropProps) => {
  const handleDragOver = useCallback(
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const handleCharacterDrop = useCallback( // Renomeado
    (event: React.DragEvent<SVGSVGElement>) => {
      event.preventDefault();
      const characterId = event.dataTransfer.getData( // Renomeado tokenInfoId para characterId
        "application/vtt-character-id" // Renomeado
      );
      if (characterId) {
        const character = characters.find((c) => c.id === characterId); // Renomeado sheet para character
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

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(character.size); // Renomeado sheet.size para character.size
        let gridX = Math.floor(dropPoint.x / cellSize);
        let gridY = Math.floor(dropPoint.y / cellSize);

        gridX = Math.max(
          0,
          Math.min(
            gridX,
            pageSettings.widthInUnits - Math.ceil(sizeMultiplierX)
          )
        );
        gridY = Math.max(
          0,
          Math.min(
            gridY,
            pageSettings.heightInUnits - Math.ceil(sizeMultiplierY)
          )
        );

        // Determina o HP inicial com base no tipo de personagem
        const initialHp =
          character.type === CharacterType.PLAYER ||
          character.type === CharacterType.MONSTER_NPC
            ? character.combatStats.maxHp
            : undefined;

        addToken(characterId, { x: gridX, y: gridY }, initialHp); // Passa o HP inicial
      }
    },
    [getSVGPoint, characters, gridSettings, pageSettings, addToken]
  );

  return {
    handleDragOver,
    handleCharacterDrop, // Renomeado
  };
};
