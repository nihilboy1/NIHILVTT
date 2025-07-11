// src/widgets/gameBoard/ui/HPModalRenderer.tsx

import React, { useEffect, useState } from "react";
import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";
// 1. A importação do 'Character' antigo foi removida.
import { type Point } from "../../../shared/api/types";
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

  const [hpModalAnchorPoint, setHpModalAnchorPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (activeHPModalTokenId) {
      const tokenToUpdate = tokensOnBoard.find((t) => t.id === activeHPModalTokenId);
      if (tokenToUpdate) {
        // Deixamos o 'c' ser inferido como CharacterSchema
        const character = characters.find((c) => c.id === tokenToUpdate.characterId);
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

  const selectedToken = tokensOnBoard.find((t) => t.id === activeHPModalTokenId) || null;
  const characterForModal = selectedToken ? characters.find((c) => c.id === selectedToken.characterId) || null : null;

  return (
    <>
      {activeHPModalTokenId && hpModalAnchorPoint && selectedToken && characterForModal && (
        <HPControlModal
          tokenId={activeHPModalTokenId}
          // 2. Agora o `character` é inferido como `CharacterSchema`, o tipo correto.
          character={characterForModal}
          token={selectedToken}
          anchorPoint={hpModalAnchorPoint}
          isOpen={true}
          onClose={() => onHPModalAnchorShouldUpdate(null, null)}
          onHPChange={onHPChange}
          onRemoveFromBoard={onRemoveFromBoard}
          onMakeIndependent={onMakeIndependent}
          zIndex={100}
        />
      )}
    </>
  );
};