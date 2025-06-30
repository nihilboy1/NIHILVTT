import React, { useEffect, useState } from "react";
import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";
import { Character, Point, Token } from "../../../shared/api/types";
import { useGameBoard } from "../model/contexts/GameBoardContext";

export const HPModalRenderer: React.FC = () => {
  const {
    activeHPModalTokenId,
    onHPModalAnchorShouldUpdate,
    onHPChange,
    onRemoveFromBoard,
    onMakeIndependent,
    tokensOnBoard,
    characters,
    getTokenScreenRect,
    zoomLevel,
    viewBox,
    gridSettings,
  } = useGameBoard();

  const [hpModalAnchorPoint, setHpModalAnchorPoint] = useState<Point | null>(
    null
  );

  useEffect(() => {
    if (activeHPModalTokenId) {
      const tokenToUpdate = tokensOnBoard.find(
        (t) => t.id === activeHPModalTokenId
      );
      if (tokenToUpdate) {
        const character = characters.find(
          (c) => c.id === tokenToUpdate.characterId
        );
        const newScreenRect = getTokenScreenRect(tokenToUpdate, character);
        if (newScreenRect) {
          setHpModalAnchorPoint({
            x: newScreenRect.x + newScreenRect.width - 110,
            y: newScreenRect.y - 60,
          });
        } else {
          setHpModalAnchorPoint(null);
        }
      } else {
        setHpModalAnchorPoint(null);
      }
    } else {
      setHpModalAnchorPoint(null);
    }
  }, [
    activeHPModalTokenId,
    tokensOnBoard,
    characters,
    getTokenScreenRect,
    zoomLevel,
    viewBox,
    gridSettings,
  ]);

  return (
    <>
      {activeHPModalTokenId && hpModalAnchorPoint && (
        <HPControlModal
          tokenId={activeHPModalTokenId}
          character={
            characters.find(
              (c: Character) =>
                c.id ===
                tokensOnBoard.find((t: Token) => t.id === activeHPModalTokenId)
                  ?.characterId
            ) || null
          }
          anchorPoint={hpModalAnchorPoint}
          isOpen={true}
          onClose={() => onHPModalAnchorShouldUpdate(null, null)} // Usar onHPModalAnchorShouldUpdate para fechar o modal
          onHPChange={onHPChange}
          onRemoveFromBoard={onRemoveFromBoard}
          onMakeIndependent={onMakeIndependent}
          zIndex={100}
        />
      )}
    </>
  );
};
