// src/widgets/gameBoard/ui/HPModalRenderer.tsx

import React, { useEffect, useState } from "react";
import { HPControlModal } from "../../../features/characterUpdateHp/ui/HPControlModal";
import { type Point, type Token, type GridSettings } from "../../../shared/api/types";
import { type Character } from "@/entities/character/model/schemas/character.schema";

interface HPModalRendererProps {
  activeHPModalTokenId: string | null;
  onHPModalAnchorShouldUpdate: (tokenId: string | null, newScreenRect: DOMRect | null) => void;
  onHPChange: (tokenId: string, newHP: number) => void;
  onRemoveFromBoard: (tokenId: string) => void;
  onMakeIndependent: (tokenId: string) => void;
  tokensOnBoard: Token[];
  characters: Character[];
  getTokenScreenRect: (
    token: Token,
    character: Character | undefined,
    liveSVGPoint?: Point
  ) => DOMRect | null;
  zoomLevel: number;
  viewBox: { x: number; y: number; width: number; height: number };
  gridSettings: GridSettings;
}

export const HPModalRenderer: React.FC<HPModalRendererProps> = ({
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
}) => {
  const [hpModalAnchorPoint, setHpModalAnchorPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (activeHPModalTokenId) {
      const tokenToUpdate = tokensOnBoard.find((t: Token) => t.id === activeHPModalTokenId);
      if (tokenToUpdate) {
        const character = characters.find((c: Character) => c.id === tokenToUpdate.characterId);
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

  const selectedToken = tokensOnBoard.find((t: Token) => t.id === activeHPModalTokenId) || null;
  const characterForModal = selectedToken ? characters.find((c: Character) => c.id === selectedToken.characterId) || null : null;

  return (
    <>
      {activeHPModalTokenId && hpModalAnchorPoint && selectedToken && characterForModal && (
        <HPControlModal
          tokenId={activeHPModalTokenId}
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
