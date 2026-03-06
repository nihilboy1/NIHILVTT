import { useCallback, useState } from 'react';

import { Character } from '@/entities/character/model/schemas/character.schema';
import { parseTokenSize } from '@/entities/token/model/utils/tokenUtils';
import { GridSettings, MarqueeSelectionState, Point, Token } from '@/shared/api/types';
import { doRectsIntersect, getMarqueeRect, getTokenWorldRect } from '@/shared/lib/board/boardMath';

interface UseMarqueeSelectionProps {
  activeTool: string;
  isSelectionLocked?: boolean;
  getWorldPoint: (clientX: number, clientY: number) => Point;
  tokensOnBoard: Token[];
  characters: Character[];
  gridSettings: GridSettings;
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  onClearMultiSelection: () => void;
}

export function useMarqueeSelection({
  activeTool,
  isSelectionLocked = false,
  getWorldPoint,
  tokensOnBoard,
  characters,
  gridSettings,
  onSetMultiSelectedTokenIds,
  onClearMultiSelection,
}: UseMarqueeSelectionProps) {
  const [marqueeSelection, setMarqueeSelection] = useState<MarqueeSelectionState>({
    isActive: false,
    startPoint: null,
    currentPoint: null,
  });

  const handleMarqueeMouseDown = useCallback(
    (event: React.MouseEvent<Element>) => {
      if (activeTool !== 'SELECT' || isSelectionLocked) return;
      onClearMultiSelection();
      const startPt = getWorldPoint(event.clientX, event.clientY);
      setMarqueeSelection({
        isActive: true,
        startPoint: startPt,
        currentPoint: startPt,
      });
    },
    [activeTool, getWorldPoint, isSelectionLocked, onClearMultiSelection],
  );

  const handleMarqueeMouseMove = useCallback(
    (event: MouseEvent) => {
      if (marqueeSelection.isActive && activeTool === 'SELECT') {
        const currentPt = getWorldPoint(event.clientX, event.clientY);
        setMarqueeSelection((prev) => ({ ...prev, currentPoint: currentPt }));
      }
    },
    [marqueeSelection.isActive, activeTool, getWorldPoint],
  );

  const handleMarqueeMouseUp = useCallback(() => {
    if (
      marqueeSelection.isActive &&
      marqueeSelection.startPoint &&
      marqueeSelection.currentPoint &&
      activeTool === 'SELECT'
    ) {
      const { startPoint, currentPoint } = marqueeSelection;
      const marqueeRect = getMarqueeRect({ startPoint, currentPoint });

      const selectedIds: string[] = [];
      tokensOnBoard.forEach((token) => {
        const character = characters.find((c) => c.id === token.characterId);
        if (!character) return;

        const [sizeMultiplierX, sizeMultiplierY] = parseTokenSize(character.size);
        const tokenRect = getTokenWorldRect({
          token,
          sizeInCells: [sizeMultiplierX, sizeMultiplierY],
          cellSize: gridSettings.visualCellSize,
        });
        const intersects = doRectsIntersect(marqueeRect, tokenRect);

        if (intersects) {
          selectedIds.push(token.id);
        }
      });
      onSetMultiSelectedTokenIds(selectedIds);
      setMarqueeSelection({
        isActive: false,
        startPoint: null,
        currentPoint: null,
      });
    }
  }, [
    marqueeSelection,
    activeTool,
    tokensOnBoard,
    characters,
    gridSettings.visualCellSize,
    onSetMultiSelectedTokenIds,
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
}
