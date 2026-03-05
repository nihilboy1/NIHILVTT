import { type Character } from "@/entities/character/model/schemas/character.schema";

import { BoardToken } from "../../../entities/token/ui/BoardToken";
import {
  Point,
  GridSettings,
  PendingAttackSelection,
  PageSettings,
  Tool,
  Token,
} from "../../../shared/api/types";

interface BoardTokenLayerProps {
  updateTokenPosition: (tokenId: string, newPosition: Point) => void;
  tokensOnBoard: Token[];
  characters: Character[];
  gridSettings: GridSettings;
  zoomLevel: number;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onTokenDragStart: (tokenId: string) => void;
  copiedTokenId: string | null;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  multiSelectedTokenIds: string[];
  handleBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  activeCombatTurnTokenId: string | null;
  activeCombatNextTurnTokenId: string | null;
  combatParticipantTokenIds: string[];
  activeCombatTurnCanMove: boolean;
  controllableTokenIds: string[];
  pendingAttack: PendingAttackSelection | null;
}

export function BoardTokenLayer({
  updateTokenPosition,
  tokensOnBoard,
  characters,
  gridSettings,
  zoomLevel,
  activeTool,
  pageSettings,
  getSVGPoint,
  onTokenDragStart,
  copiedTokenId,
  onTokenDragMove,
  onTokenDragEnd,
  multiSelectedTokenIds,
  handleBoardTokenDoubleClick,
  onSetMultiSelectedTokenIds,
  activeCombatTurnTokenId,
  activeCombatNextTurnTokenId,
  combatParticipantTokenIds,
  activeCombatTurnCanMove,
  controllableTokenIds,
  pendingAttack,
}: BoardTokenLayerProps) {
  return (
    <>
      <filter id="tokenDragShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx={2.5 / zoomLevel}
          dy={3.5 / zoomLevel}
          stdDeviation={2 / zoomLevel}
          floodColor="#000000"
          floodOpacity="0.5"
        />
      </filter>

      {tokensOnBoard.map((token: Token) => {
        const character = characters.find(
          (c: Character) => c.id === token.characterId
        );
        if (!character) return null;

        let inspirationValue = false;

        if (character.type === "Player") {
          inspirationValue = character.inspiration ?? false;
        }

        const characterForToken = {
          ...character,
          inspiration: inspirationValue,
        };

        const isControllableToken = controllableTokenIds.includes(token.id);
        const isCombatParticipant = combatParticipantTokenIds.includes(token.id);
        const isActiveTurnToken =
          activeCombatTurnTokenId != null && activeCombatTurnTokenId === token.id;
        const isNextTurnToken =
          activeCombatNextTurnTokenId != null && activeCombatNextTurnTokenId === token.id;
        const canTokenMoveInCombat = !isCombatParticipant || (isActiveTurnToken && activeCombatTurnCanMove);
        const canDragToken = isControllableToken && canTokenMoveInCombat;
        const dragBlockedReason = !isControllableToken
          ? 'Esse token está sob controle do mestre.'
          : pendingAttack == null && isCombatParticipant && !isActiveTurnToken
            ? 'Aguarde o seu turno para agir no combate.'
            : pendingAttack == null && isCombatParticipant && !activeCombatTurnCanMove
              ? 'Seu movimento neste turno acabou.'
              : null;

        return (
          <BoardToken
            key={`${token.id}-${token.characterId}`}
            token={token}
            character={characterForToken}
            cellSize={gridSettings.visualCellSize}
            zoomLevel={zoomLevel}
            onMove={(tokenId: string, newPosition: Point) =>
              updateTokenPosition(tokenId, newPosition)
            }
            activeTool={activeTool}
            pageSettings={pageSettings}
            getSVGPoint={getSVGPoint}
            onTokenDragStart={onTokenDragStart}
            isCopied={copiedTokenId === token.id}
            onTokenDragMove={onTokenDragMove}
            onTokenDragEnd={onTokenDragEnd}
            isMultiSelected={multiSelectedTokenIds.includes(token.id)}
            onBoardTokenDoubleClick={handleBoardTokenDoubleClick}
            onSetMultiSelectedTokenIds={onSetMultiSelectedTokenIds}
            canDrag={canDragToken}
            dragBlockedReason={dragBlockedReason}
            isCombatParticipant={isCombatParticipant}
            isActiveTurnToken={isActiveTurnToken}
            isNextTurnToken={isNextTurnToken}
            isAttackTargeting={pendingAttack != null}
          />
        );
      })}
    </>
  );
}
