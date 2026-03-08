import React from 'react';

import { PHB2024MONSTERS } from '@nihilvtt/datamodeling/data';
import { parseCharacterSize } from '@/entities/character/lib/utils/characterUtils';
import { type Character } from '@/entities/character/model/schemas/character.schema';
import {
  isMonsterCharacterRuntime,
  type SessionCharacterRuntime,
} from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useUIStore } from '@/features/layoutControls/model/store';
import {
  CombatState,
  GridSettings,
  MarqueeSelectionState,
  PageSettings,
  PendingAttackSelection,
  Point,
  RulerPathState,
  Token,
} from '@/shared/api/types';
import aimCursorUrl from '@/shared/assets/aim.png';

import { PageSettingsModal } from '../../../features/boardSettings/ui/PageSettingsModal';
import {
  getChebyshevDistanceBetweenTokenBounds,
  getTokenGridBounds,
  pickTopmostTokenIdAtWorldPoint,
} from '../model/renderer';

import { GameBoardSideOption } from './GameBoardSideOption';
import { PixiBoardPrototype } from './PixiBoardPrototype';

interface GameBoardContentProps {
  viewportRef: React.RefObject<HTMLDivElement>;
  viewBox: { x: number; y: number; width: number; height: number };
  getWorldPoint: (clientX: number, clientY: number) => Point;
  handleWheel: (event: React.WheelEvent<Element>) => void;
  handleDragOver: (event: React.DragEvent<Element>) => void;
  handleCharacterDrop: (event: React.DragEvent<Element>) => void;
  handleMouseDown: (event: React.MouseEvent<Element>) => void;
  handleBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  draggingVisuals: { tokenId: string | null; visualWorldPoint: Point | null };
  isPageAndGridSettingsModalOpen: boolean;
  setIsPageAndGridSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  canManageBoardSettings: boolean;
  multiSelectBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  copiedTokenId: string | null;
  pasteTargetCell: Point | null;
  pendingAttack: PendingAttackSelection | null;
  movementRangeCells: Point[];
  movementPreviewPathCells: Point[];
  multiSelectedTokenIds: string[];
  onBoardPointerMove: (worldPoint: Point) => void;
  onBoardPointerLeave: () => void;
  characters: Character[];
  runtimeCharactersById: Record<string, SessionCharacterRuntime>;
  tokensOnBoard: Token[];
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  marqueeSelection: MarqueeSelectionState;
  rulerPath: RulerPathState;
  activeCombatTurnTokenId: string | null;
  activeCombatNextTurnTokenId: string | null;
  combatParticipantTokenIds: string[];
  combatState: CombatState | null;
}

type PackTacticsTrigger = {
  rangeMeters: number;
  allyIsNotIncapacitated: boolean;
};

function convertDistanceToMeters(normal: number, unit: string | undefined): number {
  return unit === 'm' ? normal : normal * 0.3;
}

const PACK_TACTICS_TRIGGERS_BY_MONSTER_ID = new Map<string, PackTacticsTrigger[]>(
  PHB2024MONSTERS.map((monster) => {
    const triggers = monster.effects.flatMap((effect) => {
      if (effect.type !== 'passive_grantAdvantage' || effect.on !== 'attackRoll') {
        return [];
      }

      const triggerEvents = effect.triggers?.events ?? [];

      return triggerEvents.flatMap((event) => {
        if (event.type !== 'hasAllyNearby') {
          return [];
        }

        const rangeNormal = event.range?.normal;
        if (typeof rangeNormal !== 'number' || rangeNormal <= 0) {
          return [];
        }

        return [
          {
            rangeMeters: convertDistanceToMeters(rangeNormal, event.range?.unit),
            allyIsNotIncapacitated: event.allyIsNotIncapacitated === true,
          },
        ];
      });
    });

    return [monster.id, triggers] as const;
  }),
);

const MAX_ATTACK_RANGE_METERS_BY_MONSTER_ID = new Map<string, number>(
  PHB2024MONSTERS.map((monster) => {
    const maxRangeMeters = monster.effects.reduce((maxRange, effect) => {
      if (effect.type !== 'activatableAction') {
        return maxRange;
      }

      const rangeNormal = effect.parameters?.range?.normal;
      if (typeof rangeNormal !== 'number' || rangeNormal <= 0) {
        return maxRange;
      }

      const nextRangeMeters = convertDistanceToMeters(rangeNormal, effect.parameters.range?.unit);
      return Math.max(maxRange, nextRangeMeters);
    }, 0);

    return [monster.id, maxRangeMeters] as const;
  }),
);

function hasIncapacitatedCondition(runtimeCharacter: SessionCharacterRuntime | null): boolean {
  const activeEffects = runtimeCharacter?.activeEffects?.effects;
  if (!Array.isArray(activeEffects)) {
    return false;
  }

  return activeEffects.some((effect) => effect?.linkedCondition === 'incapacitated');
}

export function GameBoardContent({
  viewportRef,
  viewBox,
  getWorldPoint,
  handleWheel,
  handleDragOver,
  handleCharacterDrop,
  handleMouseDown,
  handleBoardTokenDoubleClick,
  draggingVisuals,
  isPageAndGridSettingsModalOpen,
  setIsPageAndGridSettingsModalOpen,
  canManageBoardSettings,
  multiSelectBoundingBox,
  copiedTokenId,
  pasteTargetCell,
  pendingAttack,
  movementRangeCells,
  movementPreviewPathCells,
  multiSelectedTokenIds,
  onBoardPointerMove,
  onBoardPointerLeave,
  characters,
  runtimeCharactersById,
  tokensOnBoard,
  gridSettings,
  pageSettings,
  marqueeSelection,
  rulerPath,
  activeCombatTurnTokenId,
  activeCombatNextTurnTokenId,
  combatParticipantTokenIds,
  combatState,
}: GameBoardContentProps) {
  const { isRightSidebarVisible } = useUIStore();
  const handleBoardDoubleClick = (event: React.MouseEvent<Element>) => {
    const point = getWorldPoint(event.clientX, event.clientY);
    const tokenId = pickTopmostTokenIdAtWorldPoint({
      worldPoint: point,
      cellSize: gridSettings.visualCellSize,
      tokensOnBoard,
      preferredTopTokenIds: multiSelectedTokenIds,
      getTokenSizeInCells: (token) => {
        const character = characters.find((entry) => entry.id === token.characterId);
        return parseCharacterSize(character?.size ?? 'Medium');
      },
    });

    if (!tokenId) {
      return;
    }

    handleBoardTokenDoubleClick(tokenId, event.altKey);
  };

  const handleBoardMouseMove = (event: React.MouseEvent<Element>) => {
    const worldPoint = getWorldPoint(event.clientX, event.clientY);
    const cellSize = gridSettings.visualCellSize;
    const snappedCell = {
      x: Math.max(0, Math.min(Math.floor(worldPoint.x / cellSize), pageSettings.widthInUnits - 1)),
      y: Math.max(0, Math.min(Math.floor(worldPoint.y / cellSize), pageSettings.heightInUnits - 1)),
    };

    onBoardPointerMove(snappedCell);
  };

  const pendingAttackToken = pendingAttack
    ? (tokensOnBoard.find((token) => token.id === pendingAttack.attackerTokenId) ?? null)
    : null;
  const pendingAttackAreaCells =
    pendingAttackToken && pendingAttack && gridSettings.metersPerSquare > 0
      ? (() => {
          const attackerCharacter = characters.find(
            (character) => character.id === pendingAttackToken.characterId,
          );
          const [attackerWidthRaw, attackerHeightRaw] = attackerCharacter
            ? parseCharacterSize(attackerCharacter.size)
            : [1, 1];
          const attackerWidth = Math.max(1, Math.ceil(attackerWidthRaw));
          const attackerHeight = Math.max(1, Math.ceil(attackerHeightRaw));

          const rangeSquares = Math.floor(
            (pendingAttack.attack.rangeMeters + Number.EPSILON) / gridSettings.metersPerSquare,
          );
          if (rangeSquares <= 0) {
            return [] as Point[];
          }

          const attackerMinX = pendingAttackToken.position.x;
          const attackerMinY = pendingAttackToken.position.y;
          const attackerMaxX = attackerMinX + attackerWidth - 1;
          const attackerMaxY = attackerMinY + attackerHeight - 1;
          const cells: Point[] = [];

          for (let y = attackerMinY - rangeSquares; y <= attackerMaxY + rangeSquares; y += 1) {
            for (let x = attackerMinX - rangeSquares; x <= attackerMaxX + rangeSquares; x += 1) {
              if (
                x < 0 ||
                y < 0 ||
                x >= pageSettings.widthInUnits ||
                y >= pageSettings.heightInUnits
              ) {
                continue;
              }

              const distanceX =
                x < attackerMinX ? attackerMinX - x : x > attackerMaxX ? x - attackerMaxX : 0;
              const distanceY =
                y < attackerMinY ? attackerMinY - y : y > attackerMaxY ? y - attackerMaxY : 0;
              const isAttackerCell = distanceX === 0 && distanceY === 0;
              const chebyshevDistance = Math.max(distanceX, distanceY);

              if (!isAttackerCell && chebyshevDistance <= rangeSquares) {
                cells.push({ x, y });
              }
            }
          }

          return cells;
        })()
      : [];

  const packTacticsPreviewTargetTokenIds = React.useMemo(() => {
    if (combatState == null || combatState.mode !== 'teams' || gridSettings.metersPerSquare <= 0) {
      return [] as string[];
    }

    const attackerTokenId = pendingAttack?.attackerTokenId ?? activeCombatTurnTokenId;
    if (!attackerTokenId) {
      return [] as string[];
    }

    const attackerToken = tokensOnBoard.find((token) => token.id === attackerTokenId);
    if (!attackerToken) {
      return [] as string[];
    }

    const attackerRuntime = runtimeCharactersById[attackerToken.characterId] ?? null;
    if (!isMonsterCharacterRuntime(attackerRuntime)) {
      return [] as string[];
    }

    const packTacticsTriggers =
      PACK_TACTICS_TRIGGERS_BY_MONSTER_ID.get(attackerRuntime.monsterId) ?? [];
    if (packTacticsTriggers.length === 0) {
      return [] as string[];
    }

    const participantByTokenId = new Map(
      combatState.participants.map((participant) => [participant.tokenId, participant]),
    );
    const attackerParticipant = participantByTokenId.get(attackerToken.id);
    const attackerTeamId = attackerParticipant?.teamId ?? null;
    if (!attackerTeamId) {
      return [] as string[];
    }

    const tokenById = new Map(tokensOnBoard.map((token) => [token.id, token]));
    const characterById = new Map(characters.map((character) => [character.id, character]));
    const boundsByTokenId = new Map<string, ReturnType<typeof getTokenGridBounds>>();

    const resolveTokenBounds = (token: Token) => {
      const cached = boundsByTokenId.get(token.id);
      if (cached) {
        return cached;
      }

      const character = characterById.get(token.characterId);
      const [sizeXRaw, sizeYRaw] = parseCharacterSize(character?.size ?? 'Medium');
      const bounds = getTokenGridBounds({
        token,
        sizeInCells: [Math.max(1, Math.ceil(sizeXRaw)), Math.max(1, Math.ceil(sizeYRaw))],
      });
      boundsByTokenId.set(token.id, bounds);
      return bounds;
    };

    const attackerBounds = resolveTokenBounds(attackerToken);
    const attackerRangeMeters =
      pendingAttack != null
        ? pendingAttack.attack.rangeMeters
        : (MAX_ATTACK_RANGE_METERS_BY_MONSTER_ID.get(attackerRuntime.monsterId) ?? 0);
    if (attackerRangeMeters <= 0) {
      return [] as string[];
    }

    const allyParticipants = combatState.participants.filter(
      (participant) =>
        participant.tokenId !== attackerToken.id && participant.teamId === attackerTeamId,
    );

    if (allyParticipants.length === 0) {
      return [] as string[];
    }

    const eligibleTargetIds: string[] = [];

    tokensOnBoard.forEach((targetToken) => {
      if (targetToken.id === attackerToken.id) {
        return;
      }

      const targetParticipant = participantByTokenId.get(targetToken.id);
      if (
        !targetParticipant ||
        targetParticipant.teamId == null ||
        targetParticipant.teamId === attackerTeamId
      ) {
        return;
      }

      const targetBounds = resolveTokenBounds(targetToken);
      const attackerDistanceSquares = getChebyshevDistanceBetweenTokenBounds(
        attackerBounds,
        targetBounds,
      );
      const attackerDistanceMeters = attackerDistanceSquares * gridSettings.metersPerSquare;
      if (attackerDistanceMeters > attackerRangeMeters + Number.EPSILON) {
        return;
      }

      const hasAnyTriggerSatisfied = packTacticsTriggers.some((trigger) => {
        return allyParticipants.some((allyParticipant) => {
          const allyToken = tokenById.get(allyParticipant.tokenId);
          if (!allyToken) {
            return false;
          }

          if (trigger.allyIsNotIncapacitated) {
            const allyRuntime = runtimeCharactersById[allyToken.characterId] ?? null;
            if (allyRuntime == null || hasIncapacitatedCondition(allyRuntime)) {
              return false;
            }
          }

          const allyBounds = resolveTokenBounds(allyToken);
          const allyDistanceSquares = getChebyshevDistanceBetweenTokenBounds(
            allyBounds,
            targetBounds,
          );
          const allyDistanceMeters = allyDistanceSquares * gridSettings.metersPerSquare;

          return allyDistanceMeters <= trigger.rangeMeters + Number.EPSILON;
        });
      });

      if (hasAnyTriggerSatisfied) {
        eligibleTargetIds.push(targetToken.id);
      }
    });

    return eligibleTargetIds;
  }, [
    characters,
    activeCombatTurnTokenId,
    combatState,
    gridSettings.metersPerSquare,
    pendingAttack,
    runtimeCharactersById,
    tokensOnBoard,
  ]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={viewportRef}
      className="bg-surface-0 relative flex-grow overflow-hidden"
      role="application"
      aria-label="Tabuleiro do jogo"
      style={{
        cursor: pendingAttack ? `url(${aimCursorUrl}) 32 32, crosshair` : 'default',
      }}
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
      onMouseMove={handleBoardMouseMove}
      onMouseLeave={() => onBoardPointerLeave()}
      onDragOver={handleDragOver}
      onDrop={handleCharacterDrop}
      onDoubleClick={handleBoardDoubleClick}
    >
      <PixiBoardPrototype
        viewBox={viewBox}
        gridSettings={gridSettings}
        pageSettings={pageSettings}
        tokensOnBoard={tokensOnBoard}
        characters={characters}
        runtimeCharactersById={runtimeCharactersById}
        multiSelectedTokenIds={multiSelectedTokenIds}
        copiedTokenId={copiedTokenId}
        pasteTargetCell={pasteTargetCell}
        pendingAttackAreaCells={pendingAttackAreaCells}
        movementRangeCells={movementRangeCells}
        movementPreviewPathCells={movementPreviewPathCells}
        multiSelectBoundingBox={multiSelectBoundingBox}
        marqueeSelection={marqueeSelection}
        rulerPath={rulerPath}
        draggingVisuals={draggingVisuals}
        activeCombatTurnTokenId={activeCombatTurnTokenId}
        activeCombatNextTurnTokenId={activeCombatNextTurnTokenId}
        combatParticipantTokenIds={combatParticipantTokenIds}
        packTacticsPreviewTargetTokenIds={packTacticsPreviewTargetTokenIds}
      />

      <GameBoardSideOption
        isRightSidebarVisible={isRightSidebarVisible}
        setIsPageAndGridSettingsModalOpen={setIsPageAndGridSettingsModalOpen}
        canManageBoardSettings={canManageBoardSettings}
      />

      {canManageBoardSettings ? (
        <PageSettingsModal
          isOpen={isPageAndGridSettingsModalOpen}
          onClose={() => setIsPageAndGridSettingsModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
