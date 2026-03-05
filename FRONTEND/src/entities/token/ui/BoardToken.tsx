import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

import { parseCharacterSize } from '@/entities/character/lib/utils/characterUtils';
import { Character, CharacterTypeEnum } from '@/entities/character/model/schemas/character.schema';
import { useAttackFeedbackStore } from '@/features/combat/model/attackFeedbackStore';
import aimCursorUrl from '@/shared/assets/aim.png';

import { Tool, type PageSettings, type Point, type Token } from '../../../shared/api/types';
import { useTokenDrag } from '../model/hooks/useTokenDrag';
import { useSelectedTokenStore } from '../model/store/selectedTokenStore';

import { HealthBar } from './HealthBar';
import { TokenVisual, TokenVisualMetrics } from './TokenVisual';

interface BoardTokenProps {
  token: Token;
  character: Character;
  cellSize: number;
  zoomLevel: number;
  onMove: (tokenId: string, newPosition: Point) => void;
  activeTool: Tool;
  pageSettings: PageSettings;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  onTokenDragStart: (tokenId: string) => void;
  isCopied: boolean;
  onTokenDragMove: (tokenId: string, visualSVGPoint: Point) => void;
  onTokenDragEnd: (tokenId: string) => void;
  isMultiSelected: boolean;
  onBoardTokenDoubleClick: (tokenId: string, altKey: boolean) => void;
  // Removendo props relacionadas ao HPModal, pois ele será renderizado em outro lugar
  // activeHPModalTokenId: string | null;
  // onHPModalAnchorShouldUpdate: (
  //   tokenId: string,
  //   newScreenRect: DOMRect | null
  // ) => void;
  // onHPChange: (tokenId: string, newHP: number) => void;
  // onRemoveFromBoard: (tokenId: string) => void;
  // onMakeIndependent: (tokenId: string) => void;
  onSetMultiSelectedTokenIds: (ids: string[]) => void;
  canDrag: boolean;
  dragBlockedReason?: string | null;
  isCombatParticipant: boolean;
  isActiveTurnToken: boolean;
  isNextTurnToken: boolean;
  isAttackTargeting: boolean;
}

export function BoardToken({
  token,
  character,
  cellSize,
  zoomLevel,
  onMove,
  activeTool,
  pageSettings,
  getSVGPoint,
  onTokenDragStart,
  isCopied,
  onTokenDragMove,
  onTokenDragEnd,
  isMultiSelected,
  onBoardTokenDoubleClick,
  onSetMultiSelectedTokenIds,
  canDrag,
  dragBlockedReason = null,
  isCombatParticipant,
  isActiveTurnToken,
  isNextTurnToken,
  isAttackTargeting,
}: BoardTokenProps) {
  const tokenGroupRef = useRef<SVGGElement>(null);
  const { selectedTokenId, setSelectedTokenId } = useSelectedTokenStore();
  const attackFeedback = useAttackFeedbackStore((state) => state.feedbackByTokenId[token.id] ?? null);

  useEffect(() => {
    if (!attackFeedback) {
      return;
    }

    console.info('[attack-feedback] BoardToken render feedback', {
      tokenId: token.id,
      feedback: attackFeedback,
    });
  }, [attackFeedback, token.id]);

  const handleSelectThisToken = useCallback(
    (tokenId: string) => {
      if (activeTool !== Tool.SELECT) {
        return;
      }
      setSelectedTokenId(tokenId);
      onSetMultiSelectedTokenIds([tokenId]);
    },
    [activeTool, setSelectedTokenId, onSetMultiSelectedTokenIds],
  );

  const { isDragging, displayPosition, dragHandlers } = useTokenDrag({
    tokenId: token.id,
    initialPosition: token.position,
    characterSize: character.size,
    cellSize,
    preventDrag: isAttackTargeting,
    activeTool,
    pageSettings,
    getSVGPoint,
    onMove,
    onDragStart: onTokenDragStart,
    onDragMove: onTokenDragMove,
    onDragEnd: onTokenDragEnd,
    onSelectToken: handleSelectThisToken,
    canDrag,
    onDragBlocked: () => {
      if (dragBlockedReason) {
        toast.error(dragBlockedReason);
      }
    },
  });

  // O useEffect para atualizar a posição do HPModal não é mais necessário aqui
  // pois o HPModal não será renderizado neste componente.
  // useEffect(() => {
  //   if (token.id === activeHPModalTokenId && tokenGroupRef.current) {
  //     const screenRect = tokenGroupRef.current.getBoundingClientRect();
  //     const plainRect = screenRect
  //       ? ({
  //           x: screenRect.x,
  //           y: screenRect.y,
  //           width: screenRect.width,
  //           height: screenRect.height,
  //           top: screenRect.top,
  //           right: screenRect.right,
  //           bottom: screenRect.bottom,
  //           left: screenRect.left,
  //           toJSON: () => ({}),
  //         } as DOMRect)
  //       : null;
  //     onHPModalAnchorShouldUpdate(token.id, plainRect);
  //   }
  // }, [
  //   token.id,
  //   activeHPModalTokenId,
  //   onHPModalAnchorShouldUpdate,
  //   displayPosition,
  //   zoomLevel,
  // ]);

  const handleDoubleClick = useCallback(
    (event: React.MouseEvent<SVGElement>) => {
      onBoardTokenDoubleClick(token.id, event.altKey);
    },
    [token.id, onBoardTokenDoubleClick],
  );

  const [sizeMultiplierX, sizeMultiplierY] = parseCharacterSize(character.size);
  const tokenRenderWidth = sizeMultiplierX * cellSize;
  const tokenRenderHeight = sizeMultiplierY * cellSize;

  const baseStrokeWidth = Math.max(0.5, 1.5 / zoomLevel);
  const isSelected = selectedTokenId === token.id || isMultiSelected;

  const strokeWidth = isSelected ? baseStrokeWidth + Math.max(0.3, 1 / zoomLevel) : baseStrokeWidth;
  const strokeColor = isSelected
    ? 'var(--color-accent-primary)'
    : isDragging
      ? 'var(--color-accent-secondary)'
      : 'var(--color-border-base)';

  const nameplateFontSize = Math.max(8, 12 / zoomLevel);
  const cursorStyle = isAttackTargeting
    ? `url(${aimCursorUrl}) 32 32, crosshair`
    : activeTool === Tool.SELECT
      ? (isDragging ? 'grabbing' : 'pointer')
      : 'default';

  const padding = 1 / zoomLevel;

  const tokenMetrics: TokenVisualMetrics = useMemo(
    () => ({
      tokenRenderWidth,
      tokenRenderHeight,
      imageUrl: character.image,
      name: character.name,
      fontSize: nameplateFontSize,
    }),
    [tokenRenderWidth, tokenRenderHeight, character.image, character.name, nameplateFontSize],
  );

  const displayName = character.name;
  const nameplateYOffset = tokenRenderHeight + nameplateFontSize / 2 + 5 / zoomLevel;
  const badgeSize = 14 / zoomLevel;
  const badgeCornerRadius = 2 / zoomLevel;
  const badgeStrokeWidth = 1 / zoomLevel;
  const copiedBadgeY = -16 / zoomLevel;
  const estimatedNameWidth = Math.max(nameplateFontSize, displayName.length * nameplateFontSize * 0.62);
  const turnOrbitRadius = Math.max(
    4 / zoomLevel,
    Math.min(tokenRenderWidth, tokenRenderHeight) / 2 + 3 / zoomLevel,
  );
  const turnOrbitDotRadius = 2 / zoomLevel;

  return (
    <g
      ref={tokenGroupRef}
      transform={`translate(${displayPosition.x}, ${displayPosition.y})`}
      className="board-token-group"
      style={{ cursor: cursorStyle }}
      filter={isDragging ? 'url(#tokenDragShadow)' : 'none'}
      data-token-id={token.id}
    >
      <rect
        x={0}
        y={0}
        width={tokenRenderWidth}
        height={tokenRenderHeight}
        fill="transparent"
        stroke="transparent"
        strokeWidth={0}
        pointerEvents="all"
        {...dragHandlers}
        onDoubleClick={handleDoubleClick}
      />
      <g pointerEvents="none">
      {/* Renderiza HealthBar apenas para PlayerCharacter ou MonsterNPCCharacter */}
      {(character.type === CharacterTypeEnum.enum.Player ||
        character.type === CharacterTypeEnum.enum.NPC) && (
        <HealthBar
          currentHp={character.combatStats.currentHp}
          maxHp={character.combatStats.maxHp}
          tempHp={character.combatStats.tempHp}
          tokenRenderWidth={tokenRenderWidth}
          zoomLevel={zoomLevel}
        />
      )}
      <TokenVisual metrics={tokenMetrics} />
      {attackFeedback && (
        <g key={attackFeedback.id}>
          <text
            x={tokenRenderWidth / 2}
            y={tokenRenderHeight / 2 - 4 / zoomLevel}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.max(18 / zoomLevel, Math.max(tokenRenderWidth, tokenRenderHeight) * 0.48)}
            fill={attackFeedback.hit ? '#ef4444' : '#f59e0b'}
            fontWeight="900"
            stroke="#0b0b0d"
            strokeWidth={2.6 / zoomLevel}
            paintOrder="stroke"
          >
            {attackFeedback.hit ? `-${attackFeedback.damageApplied}` : 'MISS'}
          </text>
          {attackFeedback.hit && (
            <text
              x={tokenRenderWidth / 2}
              y={tokenRenderHeight / 2 + Math.max(13 / zoomLevel, Math.max(tokenRenderWidth, tokenRenderHeight) * 0.34)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.max(8 / zoomLevel, Math.max(tokenRenderWidth, tokenRenderHeight) * 0.2)}
              fill="rgba(255,255,255,0.9)"
              stroke="#0b0b0d"
              strokeWidth={1.4 / zoomLevel}
              paintOrder="stroke"
            >
              ACERTO
            </text>
          )}
        </g>
      )}
      <text
        x={tokenRenderWidth / 2}
        y={nameplateYOffset}
        fontSize={nameplateFontSize}
        textAnchor="middle"
        dominantBaseline="alphabetic"
        className="board-token-name select-none"
        pointerEvents="none"
        style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.7))' }}
      >
        {displayName}
      </text>
      {isCombatParticipant && (
        <line
          x1={tokenRenderWidth / 2 - estimatedNameWidth / 2}
          y1={nameplateYOffset + Math.max(1 / zoomLevel, 1.2 / zoomLevel)}
          x2={tokenRenderWidth / 2 + estimatedNameWidth / 2}
          y2={nameplateYOffset + Math.max(1 / zoomLevel, 1.2 / zoomLevel)}
          stroke="var(--color-feedback-negative)"
          strokeWidth={Math.max(1 / zoomLevel, 1.4 / zoomLevel)}
          strokeLinecap="round"
        />
      )}
      {isSelected && (
        <rect
          x={-padding}
          y={-padding}
          width={tokenRenderWidth + 2 * padding}
          height={tokenRenderHeight + 2 * padding}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}
      {isCopied && (
        <g pointerEvents="none">
          <rect
            x={tokenRenderWidth - 14 / zoomLevel}
            y={copiedBadgeY}
            width={badgeSize}
            height={badgeSize}
            rx={badgeCornerRadius}
            fill="var(--color-accent-primary)"
            stroke="var(--color-surface-0)"
            strokeWidth={badgeStrokeWidth}
          />
          <text
            x={tokenRenderWidth - 7 / zoomLevel}
            y={copiedBadgeY + 10 / zoomLevel}
            fontSize={8 / zoomLevel}
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="bold"
            fill="var(--color-text-1)"
          >
            C
          </text>
        </g>
      )}
      {(isActiveTurnToken || isNextTurnToken) && (
        <g pointerEvents="none">
          <circle
            cx={tokenRenderWidth / 2}
            cy={tokenRenderHeight / 2}
            r={turnOrbitRadius}
            fill="none"
            stroke="rgba(0,0,0,0.72)"
            strokeOpacity={isActiveTurnToken ? 0.85 : 0.6}
            strokeWidth={2.2 / zoomLevel}
            strokeDasharray={`${3 / zoomLevel} ${5 / zoomLevel}`}
          />
          <circle
            cx={tokenRenderWidth / 2}
            cy={tokenRenderHeight / 2}
            r={turnOrbitRadius}
            fill="none"
            stroke="#e9d5ff"
            strokeOpacity={isActiveTurnToken ? 0.95 : 0.75}
            strokeWidth={1.2 / zoomLevel}
            strokeDasharray={`${3 / zoomLevel} ${5 / zoomLevel}`}
          />
        </g>
      )}
      {isActiveTurnToken && (
        <g pointerEvents="none">
          <circle
            cx={tokenRenderWidth / 2}
            cy={tokenRenderHeight / 2 - turnOrbitRadius}
            r={turnOrbitDotRadius}
            fill="var(--color-accent-primary)"
            stroke="none"
            opacity={1}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${tokenRenderWidth / 2} ${tokenRenderHeight / 2}`}
              to={`360 ${tokenRenderWidth / 2} ${tokenRenderHeight / 2}`}
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx={tokenRenderWidth / 2}
            cy={tokenRenderHeight / 2 + turnOrbitRadius}
            r={turnOrbitDotRadius}
            fill="var(--color-accent-primary)"
            stroke="none"
            opacity={1}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${tokenRenderWidth / 2} ${tokenRenderHeight / 2}`}
              to={`360 ${tokenRenderWidth / 2} ${tokenRenderHeight / 2}`}
              dur="6.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}
      </g>
    </g>
  );
}
