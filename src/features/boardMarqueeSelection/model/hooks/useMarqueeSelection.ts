import {GridSettings, MarqueeSelectionState, Point, Token } from "@/shared/api/types";
import { parseTokenSize } from "../../../../shared/lib/utils/board/boardUtils";
import { useCallback, useState } from "react";
import { CharacterSchema } from "@/entities/character/model/schemas/character.schema";


interface UseMarqueeSelectionProps {
  activeTool: string; // Tool.SELECT
  getSVGPoint: (clientX: number, clientY: number) => Point;
  tokensOnBoard: Token[]; // Renomeado de gridInstances
  characters: CharacterSchema[]; // Renomeado de tokens
  gridSettings: GridSettings;
  onSetMultiSelectedTokenIds: (ids: string[]) => void; // Renomeado
  onClearMultiSelection: () => void;
}

export const useMarqueeSelection = ({
  activeTool,
  getSVGPoint,
  tokensOnBoard, // Renomeado
  characters, // Renomeado
  gridSettings,
  onSetMultiSelectedTokenIds, // Renomeado
  onClearMultiSelection,
}: UseMarqueeSelectionProps) => {
  const [marqueeSelection, setMarqueeSelection] =
    useState<MarqueeSelectionState>({
      isActive: false,
      startPoint: null,
      currentPoint: null,
    });

  const handleMarqueeMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (activeTool !== "SELECT") return;
      onClearMultiSelection();
      const startPt = getSVGPoint(event.clientX, event.clientY);
      setMarqueeSelection({
        isActive: true,
        startPoint: startPt,
        currentPoint: startPt,
      });
    },
    [activeTool, getSVGPoint, onClearMultiSelection]
  );

  const handleMarqueeMouseMove = useCallback(
    (event: MouseEvent) => {
      if (marqueeSelection.isActive && activeTool === "SELECT") {
        const currentPt = getSVGPoint(event.clientX, event.clientY);
        setMarqueeSelection((prev) => ({ ...prev, currentPoint: currentPt }));
      }
    },
    [marqueeSelection.isActive, activeTool, getSVGPoint]
  );

  const handleMarqueeMouseUp = useCallback(() => {
    if (
      marqueeSelection.isActive &&
      marqueeSelection.startPoint &&
      marqueeSelection.currentPoint &&
      activeTool === "SELECT"
    ) {
      const { startPoint, currentPoint } = marqueeSelection;
      const marqueeSvgX = Math.min(startPoint.x, currentPoint.x);
      const marqueeSvgY = Math.min(startPoint.y, currentPoint.y);
      const marqueeWidth = Math.abs(startPoint.x - currentPoint.x);
      const marqueeHeight = Math.abs(startPoint.y - currentPoint.y);

      const selectedIds: string[] = [];
      tokensOnBoard.forEach((token) => { // Renomeado
        const character = characters.find((c) => c.id === token.characterId); // Renomeado
        if (!character) return;

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(
          character.size // Renomeado
        );
        const tokenSvgX = token.position.x * gridSettings.visualCellSize; // Renomeado
        const tokenSvgY = token.position.y * gridSettings.visualCellSize; // Renomeado
        const tokenWidth = sizeMultiplierX * gridSettings.visualCellSize;
        const tokenHeight = sizeMultiplierY * gridSettings.visualCellSize;

        const intersects = !(
          marqueeSvgX > tokenSvgX + tokenWidth ||
          marqueeSvgX + marqueeWidth < tokenSvgX ||
          marqueeSvgY > tokenSvgY + tokenHeight ||
          marqueeSvgY + marqueeHeight < tokenSvgY
        );

        if (intersects) {
          selectedIds.push(token.id); // Renomeado
        }
      });
      onSetMultiSelectedTokenIds(selectedIds); // Renomeado
      setMarqueeSelection({
        isActive: false,
        startPoint: null,
        currentPoint: null,
      });
    }
  }, [
    marqueeSelection,
    activeTool,
    tokensOnBoard, // Renomeado
    characters, // Renomeado
    gridSettings.visualCellSize,
    onSetMultiSelectedTokenIds, // Renomeado
  ]);

  const clearMarquee = useCallback(() => {
    setMarqueeSelection({
      isActive: false,
      startPoint: null,
      currentPoint: null,
    });
  }, []);

  return {
    marqueeSelection,
    handleMarqueeMouseDown,
    handleMarqueeMouseMove,
    handleMarqueeMouseUp,
    clearMarquee,
  };
};
