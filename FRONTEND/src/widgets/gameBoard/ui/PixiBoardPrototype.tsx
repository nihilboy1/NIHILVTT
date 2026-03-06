import React, { useMemo, useRef, useState } from 'react';

import { Container, Graphics, Sprite, Stage, Text, useTick } from '@pixi/react';
import { Container as PixiContainer, Graphics as PixiGraphics, TextStyle, Texture } from 'pixi.js';

import { calculateDistanceInMeters } from '@/entities/board/model/utils/boardUtils';
import { parseCharacterSize } from '@/entities/character/lib/utils/characterUtils';
import { type Character } from '@/entities/character/model/schemas/character.schema';
import { useAttackFeedbackStore } from '@/features/combat/model/attackFeedbackStore';
import {
  GridSettings,
  MarqueeSelectionState,
  PageSettings,
  Point,
  RulerPathState,
  Token,
} from '@/shared/api/types';
import crossCombatIcon from '@/shared/assets/crosscombat.svg';

import { createPixiWorldTransform } from '../model/renderer';

type PixiBoardPrototypeProps = {
  viewBox: { x: number; y: number; width: number; height: number };
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  tokensOnBoard: Token[];
  characters: Character[];
  multiSelectedTokenIds: string[];
  copiedTokenId: string | null;
  pasteTargetCell: Point | null;
  pendingAttackAreaCells: Point[];
  multiSelectBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  marqueeSelection: MarqueeSelectionState;
  rulerPath: RulerPathState;
  draggingVisuals: { tokenId: string | null; visualWorldPoint: Point | null };
  activeCombatTurnTokenId: string | null;
  activeCombatNextTurnTokenId: string | null;
  combatParticipantTokenIds: string[];
};

type PixiThemeColors = {
  accentPrimary: number;
  accentSecondary: number;
  feedbackPositive: number;
  feedbackNegative: number;
  textPrimary: number;
  textSecondary: number;
  surface0: number;
  surface1: number;
  warning: number;
  boardBg: number;
  boardGrid: number;
  info: number;
  shadow: number;
};

const DEFAULT_PIXI_THEME: PixiThemeColors = {
  accentPrimary: 0x8b5cf6,
  accentSecondary: 0xc4b5fd,
  feedbackPositive: 0x22c55e,
  feedbackNegative: 0xef4444,
  textPrimary: 0xffffff,
  textSecondary: 0xa9a9a9,
  surface0: 0x0b0b0d,
  surface1: 0x0f1218,
  warning: 0xf59e0b,
  boardBg: 0xf3f4f6,
  boardGrid: 0xc3cad6,
  info: 0x60a5fa,
  shadow: 0x020617,
};

function parseCssColorToPixi(cssColor: string, fallback: number): number {
  const value = cssColor.trim();
  if (value.length === 0) {
    return fallback;
  }

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      const normalized = hex
        .split('')
        .map((part) => `${part}${part}`)
        .join('');
      const parsed = Number.parseInt(normalized, 16);
      return Number.isNaN(parsed) ? fallback : parsed;
    }
    if (hex.length === 6) {
      const parsed = Number.parseInt(hex, 16);
      return Number.isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (!rgbMatch) {
    return fallback;
  }

  const parts = rgbMatch[1]?.split(',').map((part) => part.trim()) ?? [];
  if (parts.length < 3) {
    return fallback;
  }

  const r = Number.parseInt(parts[0] ?? '', 10);
  const g = Number.parseInt(parts[1] ?? '', 10);
  const b = Number.parseInt(parts[2] ?? '', 10);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return fallback;
  }

  return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
}

function usePixiThemeColors(): PixiThemeColors {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_PIXI_THEME;
    }

    const styles = window.getComputedStyle(document.documentElement);
    const read = (cssVarName: string, fallback: number) =>
      parseCssColorToPixi(styles.getPropertyValue(cssVarName), fallback);

    return {
      accentPrimary: read('--color-accent-primary', DEFAULT_PIXI_THEME.accentPrimary),
      accentSecondary: read('--color-accent-secondary', DEFAULT_PIXI_THEME.accentSecondary),
      feedbackPositive: read('--color-feedback-positive', DEFAULT_PIXI_THEME.feedbackPositive),
      feedbackNegative: read('--color-feedback-negative', DEFAULT_PIXI_THEME.feedbackNegative),
      textPrimary: read('--color-text-primary', DEFAULT_PIXI_THEME.textPrimary),
      textSecondary: read('--color-text-secondary', DEFAULT_PIXI_THEME.textSecondary),
      surface0: read('--color-surface-0', DEFAULT_PIXI_THEME.surface0),
      surface1: read('--color-surface-1', DEFAULT_PIXI_THEME.surface1),
      warning: DEFAULT_PIXI_THEME.warning,
      boardBg: DEFAULT_PIXI_THEME.boardBg,
      boardGrid: DEFAULT_PIXI_THEME.boardGrid,
      info: DEFAULT_PIXI_THEME.info,
      shadow: DEFAULT_PIXI_THEME.shadow,
    };
  }, []);
}

function useElementSize() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1280, height: 720 });

  React.useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const nextWidth = Math.max(1, Math.floor(entry.contentRect.width));
      const nextHeight = Math.max(1, Math.floor(entry.contentRect.height));
      setSize({ width: nextWidth, height: nextHeight });
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return { elementRef, size };
}

function drawDottedRect(
  graphics: PixiGraphics,
  x: number,
  y: number,
  width: number,
  height: number,
  dashLength: number,
  gapLength: number,
) {
  if (width <= 0 || height <= 0) {
    return;
  }

  const segmentStep = Math.max(0.0001, dashLength + gapLength);
  const drawDashedSegment = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    if (length <= 0) {
      return;
    }
    const ux = dx / length;
    const uy = dy / length;

    for (let offset = 0; offset < length; offset += segmentStep) {
      const start = offset;
      const end = Math.min(offset + dashLength, length);
      graphics.moveTo(x1 + ux * start, y1 + uy * start);
      graphics.lineTo(x1 + ux * end, y1 + uy * end);
    }
  };

  drawDashedSegment(x, y, x + width, y);
  drawDashedSegment(x + width, y, x + width, y + height);
  drawDashedSegment(x + width, y + height, x, y + height);
  drawDashedSegment(x, y + height, x, y);
}

function drawDottedLine(
  graphics: PixiGraphics,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dashLength: number,
  gapLength: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  if (length <= 0) {
    return;
  }

  const step = Math.max(0.0001, dashLength + gapLength);
  const ux = dx / length;
  const uy = dy / length;
  for (let offset = 0; offset < length; offset += step) {
    const start = offset;
    const end = Math.min(offset + dashLength, length);
    graphics.moveTo(x1 + ux * start, y1 + uy * start);
    graphics.lineTo(x1 + ux * end, y1 + uy * end);
  }
}

function TokenTurnIndicator({
  tokenWidth,
  tokenHeight,
  cameraScaleY,
  isCurrent,
  isNext,
  theme,
}: {
  tokenWidth: number;
  tokenHeight: number;
  cameraScaleY: number;
  isCurrent: boolean;
  isNext: boolean;
  theme: PixiThemeColors;
}) {
  const currentDottedRef = useRef<PixiContainer | null>(null);
  const minTokenSize = Math.min(tokenWidth, tokenHeight);
  const tokenScreenSize = minTokenSize * cameraScaleY;
  const centerX = tokenWidth / 2;
  const centerY = tokenHeight / 2;
  const currentOrbitRadius = minTokenSize / 2 + Math.max(minTokenSize * 0.12, 1.1);
  const dottedStrokeWidth = Math.max(minTokenSize * 0.03, 0.75);
  const dotDashLength = Math.max(minTokenSize * 0.13, 1.7);
  const dotGapLength = Math.max(minTokenSize * 0.16, 2.1);
  const showNextLabel = tokenScreenSize >= 18;
  const nextLabelFontSize = Math.max(8, Math.min(11, minTokenSize * 0.18));
  const nextLabelStroke = Math.max(1.1, minTokenSize * 0.022);
  const nextLabelStyle = useMemo(
    () =>
      new TextStyle({
        fontFamily: 'Work Sans, sans-serif',
        fontSize: nextLabelFontSize,
        fontWeight: '700',
        fill: theme.textPrimary,
        stroke: theme.surface0,
        strokeThickness: nextLabelStroke,
        lineJoin: 'round',
      }),
    [nextLabelFontSize, nextLabelStroke, theme.surface0, theme.textPrimary],
  );

  useTick((delta) => {
    if (isCurrent && currentDottedRef.current) {
      currentDottedRef.current.rotation += 0.0042 * delta;
    }
  });

  if (!isCurrent && !isNext) {
    return null;
  }

  return (
    <Container>
      {isCurrent ? (
        <Container x={centerX} y={centerY}>
          <Container ref={currentDottedRef}>
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                graphics.lineStyle({
                  width: dottedStrokeWidth,
                  color: theme.accentSecondary,
                  alpha: 0.84,
                });
                const circumference = 2 * Math.PI * currentOrbitRadius;
                const stepLength = Math.max(0.0001, dotDashLength + dotGapLength);
                const segmentCount = Math.max(10, Math.floor(circumference / stepLength));
                const angleStep = (Math.PI * 2) / segmentCount;
                const dashRatio = dotDashLength / (dotDashLength + dotGapLength);
                const dashAngle = angleStep * Math.min(0.92, Math.max(0.12, dashRatio));

                for (let i = 0; i < segmentCount; i += 1) {
                  const start = i * angleStep;
                  const end = start + dashAngle;
                  graphics.moveTo(
                    Math.cos(start) * currentOrbitRadius,
                    Math.sin(start) * currentOrbitRadius,
                  );
                  graphics.arc(0, 0, currentOrbitRadius, start, end);
                }
              }}
            />
          </Container>
        </Container>
      ) : null}
      {isNext ? (
        <Container x={centerX} y={centerY}>
          {showNextLabel ? (
            <Text
              text="NEXT"
              x={0}
              y={0}
              anchor={{ x: 0.5, y: 0.5 }}
              style={nextLabelStyle}
              resolution={2}
              roundPixels
            />
          ) : null}
        </Container>
      ) : null}
    </Container>
  );
}

function CombatCrossIndicator({
  tokenWidth,
  tokenHeight,
  tint,
}: {
  tokenWidth: number;
  tokenHeight: number;
  tint: number;
}) {
  const rotatingRef = useRef<PixiContainer | null>(null);

  useTick((delta) => {
    if (rotatingRef.current) {
      rotatingRef.current.rotation += 0.0022 * delta;
    }
  });

  return (
    <Container x={tokenWidth / 2} y={tokenHeight / 2 - Math.max(tokenHeight * 0.01, 0.35)}>
      <Container ref={rotatingRef}>
        <Sprite
          image={crossCombatIcon}
          x={0}
          y={0}
          anchor={{ x: 0.5, y: 0.5 }}
          width={tokenWidth * 1.1}
          height={tokenHeight * 1.1}
          tint={tint}
          alpha={0.9}
        />
      </Container>
    </Container>
  );
}

export function PixiBoardPrototype({
  viewBox,
  gridSettings,
  pageSettings,
  tokensOnBoard,
  characters,
  multiSelectedTokenIds,
  copiedTokenId,
  pasteTargetCell,
  pendingAttackAreaCells,
  multiSelectBoundingBox,
  marqueeSelection,
  rulerPath,
  draggingVisuals,
  activeCombatTurnTokenId,
  activeCombatNextTurnTokenId,
  combatParticipantTokenIds,
}: PixiBoardPrototypeProps) {
  const { elementRef, size } = useElementSize();
  const theme = usePixiThemeColors();
  const feedbackByTokenId = useAttackFeedbackStore((state) => state.feedbackByTokenId);
  const stageResolution =
    typeof window !== 'undefined' ? Math.max(1, Math.min(window.devicePixelRatio || 1, 3)) : 1;

  const worldWidth = pageSettings.widthInUnits * gridSettings.visualCellSize;
  const worldHeight = pageSettings.heightInUnits * gridSettings.visualCellSize;
  const cameraTransform = useMemo(
    () =>
      createPixiWorldTransform({
        viewBox,
        viewport: size,
      }),
    [size, viewBox],
  );
  const tokenSprites = useMemo(
    () =>
      tokensOnBoard
        .map((token, index) => {
          const character = characters.find((entry) => entry.id === token.characterId);
          if (!character) {
            return null;
          }

          const [sizeX, sizeY] = parseCharacterSize(character.size);
          return {
            id: token.id,
            imageUrl: character.image,
            name: character.name,
            currentHp:
              'combatStats' in character && typeof character.combatStats.currentHp === 'number'
                ? character.combatStats.currentHp
                : null,
            maxHp:
              'combatStats' in character && typeof character.combatStats.maxHp === 'number'
                ? character.combatStats.maxHp
                : null,
            tempHp:
              'combatStats' in character && typeof character.combatStats.tempHp === 'number'
                ? character.combatStats.tempHp
                : 0,
            x: token.position.x * gridSettings.visualCellSize,
            y: token.position.y * gridSettings.visualCellSize,
            width: sizeX * gridSettings.visualCellSize,
            height: sizeY * gridSettings.visualCellSize,
            baseOrder: index,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry != null),
    [characters, gridSettings.visualCellSize, tokensOnBoard],
  );
  const orderedTokenSprites = useMemo(() => {
    const priorityByTokenId = new Map<string, number>();
    multiSelectedTokenIds.forEach((tokenId, index) => {
      priorityByTokenId.set(tokenId, 1000 + index);
    });
    if (draggingVisuals.tokenId) {
      priorityByTokenId.set(draggingVisuals.tokenId, 2000 + multiSelectedTokenIds.length);
    }

    return [...tokenSprites].sort((a, b) => {
      const priorityA = priorityByTokenId.get(a.id) ?? 0;
      const priorityB = priorityByTokenId.get(b.id) ?? 0;
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return a.baseOrder - b.baseOrder;
    });
  }, [draggingVisuals.tokenId, multiSelectedTokenIds, tokenSprites]);
  const tokenLabelFontSize = Math.max(10, Math.round(gridSettings.visualCellSize * 0.2));
  const tokenLabelOffset = Math.round(gridSettings.visualCellSize * -0.085);
  const tokenNameStyle = useMemo(
    () =>
      new TextStyle({
        fontFamily: 'Work Sans, sans-serif',
        fontSize: tokenLabelFontSize,
        fill: theme.surface0,
        fontWeight: '500',
        stroke: theme.textPrimary,
        strokeThickness: 2,
        lineJoin: 'round',
        dropShadow: true,
        dropShadowAlpha: 0.22,
        dropShadowBlur: 0,
        dropShadowDistance: 1,
        dropShadowColor: theme.surface0,
      }),
    [theme.surface0, theme.textPrimary, tokenLabelFontSize],
  );
  const marqueeStart = marqueeSelection.startPoint;
  const marqueeCurrent = marqueeSelection.currentPoint;

  return (
    <div ref={elementRef} className="pointer-events-none absolute inset-0">
      <Stage
        width={size.width}
        height={size.height}
        options={{
          antialias: true,
          backgroundAlpha: 0,
          resolution: stageResolution,
          autoDensity: true,
          powerPreference: 'high-performance',
        }}
      >
        <Container
          x={cameraTransform.containerX}
          y={cameraTransform.containerY}
          scale={{ x: cameraTransform.scaleX, y: cameraTransform.scaleY }}
        >
          <Sprite
            texture={Texture.WHITE}
            width={worldWidth}
            height={worldHeight}
            tint={theme.boardBg}
          />
          <Graphics
            draw={(graphics) => {
              graphics.clear();
              const cell = gridSettings.visualCellSize;
              const lineWidth = Math.max(0.85 / cameraTransform.scaleY, 0.28);

              graphics.lineStyle({
                width: lineWidth,
                color: theme.boardGrid,
                alpha: 0.75,
              });
              for (let x = 0; x <= pageSettings.widthInUnits; x += 1) {
                const worldX = x * cell;
                graphics.moveTo(worldX, 0);
                graphics.lineTo(worldX, worldHeight);
              }
              for (let y = 0; y <= pageSettings.heightInUnits; y += 1) {
                const worldY = y * cell;
                graphics.moveTo(0, worldY);
                graphics.lineTo(worldWidth, worldY);
              }
            }}
          />
          {pasteTargetCell && copiedTokenId ? (
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                const x = pasteTargetCell.x * gridSettings.visualCellSize;
                const y = pasteTargetCell.y * gridSettings.visualCellSize;
                const size = gridSettings.visualCellSize;
                graphics.lineStyle({
                  width: Math.max(1.5 / cameraTransform.scaleY, 0.45),
                  color: theme.accentPrimary,
                  alpha: 0.95,
                });
                graphics.beginFill(theme.accentPrimary, 0.12);
                graphics.drawRect(x, y, size, size);
                graphics.endFill();
              }}
            />
          ) : null}
          {pendingAttackAreaCells.map((cell) => (
            <Graphics
              key={`pixi-pending-attack-cell-${cell.x}-${cell.y}`}
              draw={(graphics) => {
                graphics.clear();
                const size = gridSettings.visualCellSize;
                const x = cell.x * size;
                const y = cell.y * size;
                graphics.lineStyle({
                  width: Math.max(1 / cameraTransform.scaleY, 0.35),
                  color: theme.accentPrimary,
                  alpha: 0.6,
                });
                graphics.beginFill(theme.accentPrimary, 0.1);
                graphics.drawRect(x, y, size, size);
                graphics.endFill();
              }}
            />
          ))}
          {orderedTokenSprites.map((tokenSprite) => (
            <Container
              key={`pixi-token-${tokenSprite.id}`}
              x={
                draggingVisuals.tokenId === tokenSprite.id && draggingVisuals.visualWorldPoint
                  ? draggingVisuals.visualWorldPoint.x
                  : tokenSprite.x
              }
              y={
                draggingVisuals.tokenId === tokenSprite.id && draggingVisuals.visualWorldPoint
                  ? draggingVisuals.visualWorldPoint.y
                  : tokenSprite.y
              }
            >
              <Graphics
                draw={(graphics) => {
                  graphics.clear();
                  const radius = Math.min(tokenSprite.width, tokenSprite.height) * 0.46;
                  graphics.beginFill(theme.shadow, 0.18);
                  graphics.drawCircle(
                    tokenSprite.width / 2,
                    tokenSprite.height / 2 + Math.max(1.4 / cameraTransform.scaleY, 0.5),
                    radius,
                  );
                  graphics.endFill();
                }}
              />
              {multiSelectedTokenIds.includes(tokenSprite.id) ? (
                <Graphics
                  draw={(graphics) => {
                    graphics.clear();
                    const strokeWidth = Math.max(1.8 / cameraTransform.scaleY, 0.7);
                    const padding = Math.max(1 / cameraTransform.scaleY, 0.4);
                    graphics.lineStyle({
                      width: strokeWidth,
                      color: theme.accentPrimary,
                      alpha: 0.98,
                    });
                    graphics.drawRect(
                      -padding,
                      -padding,
                      tokenSprite.width + padding * 2,
                      tokenSprite.height + padding * 2,
                    );
                  }}
                />
              ) : null}
              {combatParticipantTokenIds.includes(tokenSprite.id) ? (
                <CombatCrossIndicator
                  tokenWidth={tokenSprite.width}
                  tokenHeight={tokenSprite.height}
                  tint={theme.feedbackNegative}
                />
              ) : null}
              <Sprite
                image={tokenSprite.imageUrl}
                x={0}
                y={0}
                width={tokenSprite.width}
                height={tokenSprite.height}
              />
              <TokenTurnIndicator
                tokenWidth={tokenSprite.width}
                tokenHeight={tokenSprite.height}
                cameraScaleY={cameraTransform.scaleY}
                isCurrent={activeCombatTurnTokenId === tokenSprite.id}
                isNext={activeCombatNextTurnTokenId === tokenSprite.id}
                theme={theme}
              />
              {tokenSprite.maxHp != null && tokenSprite.currentHp != null ? (
                <Graphics
                  draw={(graphics) => {
                    graphics.clear();
                    const hpBarHeight = Math.max(4 / cameraTransform.scaleY, 1.5);
                    const hpBarGap = Math.max(0.35 / cameraTransform.scaleY, 0.2);
                    const barY = -hpBarHeight - hpBarGap;
                    const safeMaxHp = Math.max(1, tokenSprite.maxHp ?? 1);
                    const safeCurrentHp = Math.max(
                      0,
                      Math.min(tokenSprite.currentHp ?? 0, safeMaxHp),
                    );
                    const currentRatio = safeCurrentHp / safeMaxHp;

                    graphics.lineStyle({
                      width: Math.max(1 / cameraTransform.scaleY, 0.25),
                      color: theme.surface0,
                      alpha: 0.8,
                    });
                    graphics.beginFill(theme.surface1, 0.9);
                    graphics.drawRect(0, barY, tokenSprite.width, hpBarHeight);
                    graphics.endFill();

                    graphics.beginFill(theme.feedbackPositive, 0.95);
                    graphics.drawRect(0, barY, tokenSprite.width * currentRatio, hpBarHeight);
                    graphics.endFill();

                    const tempHp = Math.max(0, tokenSprite.tempHp ?? 0);
                    if (tempHp > 0) {
                      const tempRatio = Math.min(1, tempHp / safeMaxHp);
                      const tempBarHeight = hpBarHeight;
                      const tempBarY =
                        barY - tempBarHeight - Math.max(0.45 / cameraTransform.scaleY, 0.2);
                      graphics.beginFill(theme.info, 0.95);
                      graphics.drawRect(0, tempBarY, tokenSprite.width * tempRatio, tempBarHeight);
                      graphics.endFill();
                    }
                  }}
                />
              ) : null}
              <Text
                text={tokenSprite.name}
                x={Math.round(tokenSprite.width / 2)}
                y={Math.round(tokenSprite.height + tokenLabelOffset)}
                anchor={{ x: 0.5, y: 0 }}
                style={tokenNameStyle}
                resolution={Math.max(2, stageResolution * 1.5)}
                roundPixels
              />
              {feedbackByTokenId[tokenSprite.id] ? (
                <Container>
                  <Text
                    text={
                      feedbackByTokenId[tokenSprite.id]?.hit
                        ? `-${feedbackByTokenId[tokenSprite.id]?.damageApplied ?? 0}`
                        : 'Erro'
                    }
                    x={tokenSprite.width / 2}
                    y={tokenSprite.height / 2 - Math.max(4 / cameraTransform.scaleY, 2)}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={
                      new TextStyle({
                        fontSize: Math.max(
                          18 / cameraTransform.scaleY,
                          Math.max(tokenSprite.width, tokenSprite.height) * 0.48,
                        ),
                        fill: feedbackByTokenId[tokenSprite.id]?.hit
                          ? theme.feedbackNegative
                          : theme.warning,
                        fontWeight: '900',
                        stroke: theme.surface0,
                        strokeThickness: Math.max(2 / cameraTransform.scaleY, 0.9),
                        lineJoin: 'round',
                      })
                    }
                    resolution={Math.max(2, stageResolution * 1.5)}
                    roundPixels
                  />
                  {feedbackByTokenId[tokenSprite.id]?.hit ? (
                    <Text
                      text="Acerto"
                      x={tokenSprite.width / 2}
                      y={
                        tokenSprite.height / 2 +
                        Math.max(
                          13 / cameraTransform.scaleY,
                          Math.max(tokenSprite.width, tokenSprite.height) * 0.34,
                        )
                      }
                      anchor={{ x: 0.5, y: 0.5 }}
                      style={
                        new TextStyle({
                          fontSize: Math.max(
                            11 / cameraTransform.scaleY,
                            Math.max(tokenSprite.width, tokenSprite.height) * 0.24,
                          ),
                          fill: theme.feedbackPositive,
                          fontWeight: '900',
                          stroke: theme.surface0,
                          strokeThickness: Math.max(2 / cameraTransform.scaleY, 0.9),
                          lineJoin: 'round',
                        })
                      }
                      resolution={Math.max(2, stageResolution * 1.5)}
                      roundPixels
                    />
                  ) : null}
                </Container>
              ) : null}
              {copiedTokenId === tokenSprite.id ? (
                <Container>
                  <Graphics
                    draw={(graphics) => {
                      graphics.clear();
                      const badgeSize = Math.max(14 / cameraTransform.scaleY, 5);
                      const badgeX = tokenSprite.width - badgeSize;
                      const badgeY = -Math.max(16 / cameraTransform.scaleY, 6);
                      const badgeRadius = Math.max(2 / cameraTransform.scaleY, 1);
                      graphics.lineStyle({
                        width: Math.max(1 / cameraTransform.scaleY, 0.35),
                        color: theme.surface1,
                        alpha: 0.95,
                      });
                      graphics.beginFill(theme.accentPrimary, 0.98);
                      graphics.drawRoundedRect(badgeX, badgeY, badgeSize, badgeSize, badgeRadius);
                      graphics.endFill();
                    }}
                  />
                  <Text
                    text="C"
                    x={tokenSprite.width - Math.max(7 / cameraTransform.scaleY, 2.5)}
                    y={-Math.max(9 / cameraTransform.scaleY, 3)}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={
                      new TextStyle({
                        fontSize: Math.max(8 / cameraTransform.scaleY, 3),
                        fill: theme.textPrimary,
                        fontWeight: '700',
                      })
                    }
                    resolution={Math.max(2, stageResolution)}
                    roundPixels
                  />
                </Container>
              ) : null}
            </Container>
          ))}
          {multiSelectBoundingBox ? (
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                const lineWidth = Math.max(1.4 / cameraTransform.scaleY, 0.5);
                const dashLength = Math.max(5.5 / cameraTransform.scaleY, 1.8);
                const gapLength = Math.max(4 / cameraTransform.scaleY, 1.4);
                graphics.beginFill(theme.accentPrimary, 0.09);
                graphics.drawRect(
                  multiSelectBoundingBox.x,
                  multiSelectBoundingBox.y,
                  multiSelectBoundingBox.width,
                  multiSelectBoundingBox.height,
                );
                graphics.endFill();
                graphics.lineStyle({
                  width: lineWidth,
                  color: theme.accentPrimary,
                  alpha: 0.98,
                });
                drawDottedRect(
                  graphics,
                  multiSelectBoundingBox.x,
                  multiSelectBoundingBox.y,
                  multiSelectBoundingBox.width,
                  multiSelectBoundingBox.height,
                  dashLength,
                  gapLength,
                );
              }}
            />
          ) : null}
          {marqueeSelection.isActive && marqueeStart && marqueeCurrent ? (
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                const x = Math.min(marqueeStart.x, marqueeCurrent.x);
                const y = Math.min(marqueeStart.y, marqueeCurrent.y);
                const width = Math.abs(marqueeStart.x - marqueeCurrent.x);
                const height = Math.abs(marqueeStart.y - marqueeCurrent.y);
                const lineWidth = Math.max(1.2 / cameraTransform.scaleY, 0.45);
                const dashLength = Math.max(5 / cameraTransform.scaleY, 1.7);
                const gapLength = Math.max(3.8 / cameraTransform.scaleY, 1.3);

                graphics.beginFill(theme.accentPrimary, 0.08);
                graphics.drawRect(x, y, width, height);
                graphics.endFill();
                graphics.lineStyle({
                  width: lineWidth,
                  color: theme.accentPrimary,
                  alpha: 0.98,
                });
                drawDottedRect(graphics, x, y, width, height, dashLength, gapLength);
              }}
            />
          ) : null}
          <Container>
            {rulerPath.points.map((waypoint, index) => {
              const previousWaypoint = index > 0 ? rulerPath.points[index - 1] : null;
              if (!previousWaypoint) {
                return null;
              }

              return (
                <Graphics
                  key={`pixi-ruler-segment-${index}`}
                  draw={(graphics) => {
                    graphics.clear();
                    graphics.lineStyle({
                      width: Math.max(2.5 / cameraTransform.scaleY, 0.75),
                      color: theme.accentPrimary,
                      alpha: 1,
                    });
                    graphics.moveTo(previousWaypoint.point.x, previousWaypoint.point.y);
                    graphics.lineTo(waypoint.point.x, waypoint.point.y);
                  }}
                />
              );
            })}
            {rulerPath.isActive && rulerPath.liveEndPoint && rulerPath.points.length > 0 ? (
              <Graphics
                draw={(graphics) => {
                  graphics.clear();
                  const last = rulerPath.points[rulerPath.points.length - 1];
                  const dashLength = Math.max(7 / cameraTransform.scaleY, 2.6);
                  const gapLength = Math.max(5 / cameraTransform.scaleY, 1.9);
                  graphics.lineStyle({
                    width: Math.max(2.5 / cameraTransform.scaleY, 0.75),
                    color: theme.accentPrimary,
                    alpha: 0.95,
                  });
                  drawDottedLine(
                    graphics,
                    last.point.x,
                    last.point.y,
                    rulerPath.liveEndPoint!.x,
                    rulerPath.liveEndPoint!.y,
                    dashLength,
                    gapLength,
                  );
                }}
              />
            ) : null}
            {rulerPath.points.map((waypoint, index) => (
              <Graphics
                key={`pixi-ruler-waypoint-dot-${index}`}
                draw={(graphics) => {
                  graphics.clear();
                  graphics.beginFill(theme.accentPrimary, 1);
                  graphics.drawCircle(
                    waypoint.point.x,
                    waypoint.point.y,
                    Math.max(6 / cameraTransform.scaleY, 2),
                  );
                  graphics.endFill();
                }}
              />
            ))}
            {rulerPath.points.map((waypoint, index) => {
              const showTextCondition =
                (rulerPath.points.length === 1 &&
                  !rulerPath.isActive &&
                  waypoint.cumulativeDistanceMeters > 0) ||
                (rulerPath.points.length > 1 && index > 0) ||
                (rulerPath.points.length > 1 &&
                  index === 0 &&
                  waypoint.cumulativeDistanceMeters === 0 &&
                  (rulerPath.points[1]?.cumulativeDistanceMeters ?? 0) > 0) ||
                (index === 0 &&
                  rulerPath.points.length === 1 &&
                  rulerPath.isActive &&
                  waypoint.cumulativeDistanceMeters === 0);
              if (!showTextCondition) {
                return null;
              }

              const textContent = `${waypoint.cumulativeDistanceMeters.toFixed(1)}m`;
              const rulerTextFontSize = Math.max(12 / cameraTransform.scaleY, 4);
              const rulerTextBgPadding = Math.max(5 / cameraTransform.scaleY, 2);
              const rulerTextBgRx = Math.max(3 / cameraTransform.scaleY, 1.2);
              const estimatedTextWidth = textContent.length * rulerTextFontSize * 0.55;
              const textBgWidth = estimatedTextWidth + rulerTextBgPadding * 2;
              const textBgHeight = rulerTextFontSize + rulerTextBgPadding * 1.5;
              const textX = waypoint.point.x;
              const textY =
                waypoint.point.y -
                Math.max(6 / cameraTransform.scaleY, 2) -
                textBgHeight / 2 -
                Math.max(2 / cameraTransform.scaleY, 0.75);

              return (
                <Container key={`pixi-ruler-waypoint-label-${index}`}>
                  <Graphics
                    draw={(graphics) => {
                      graphics.clear();
                      graphics.beginFill(theme.accentPrimary, 1);
                      graphics.drawRoundedRect(
                        textX - textBgWidth / 2,
                        textY - textBgHeight * 0.65,
                        textBgWidth,
                        textBgHeight,
                        rulerTextBgRx,
                      );
                      graphics.endFill();
                    }}
                  />
                  <Text
                    text={textContent}
                    x={textX}
                    y={textY}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={
                      new TextStyle({
                        fontSize: rulerTextFontSize,
                        fill: theme.textPrimary,
                        fontWeight: '500',
                      })
                    }
                    resolution={Math.max(2, stageResolution)}
                    roundPixels
                  />
                </Container>
              );
            })}
            {rulerPath.isActive && rulerPath.liveEndPoint && rulerPath.points.length > 0
              ? (() => {
                  const last = rulerPath.points[rulerPath.points.length - 1];
                  const currentTotalDistance =
                    last.cumulativeDistanceMeters +
                    calculateDistanceInMeters(
                      last.point,
                      rulerPath.liveEndPoint!,
                      gridSettings.visualCellSize,
                      gridSettings.metersPerSquare,
                    );
                  const textContent = `${currentTotalDistance.toFixed(1)}m`;
                  const rulerTextFontSize = Math.max(12 / cameraTransform.scaleY, 4);
                  const rulerTextBgPadding = Math.max(5 / cameraTransform.scaleY, 2);
                  const rulerTextBgRx = Math.max(3 / cameraTransform.scaleY, 1.2);
                  const estimatedTextWidth = textContent.length * rulerTextFontSize * 0.55;
                  const textBgWidth = estimatedTextWidth + rulerTextBgPadding * 2;
                  const textBgHeight = rulerTextFontSize + rulerTextBgPadding * 1.5;
                  const textX =
                    rulerPath.liveEndPoint!.x + Math.max(10 / cameraTransform.scaleY, 3);
                  const textY =
                    rulerPath.liveEndPoint!.y - Math.max(10 / cameraTransform.scaleY, 3);

                  return (
                    <Container>
                      <Graphics
                        draw={(graphics) => {
                          graphics.clear();
                          graphics.beginFill(theme.accentPrimary, 1);
                          graphics.drawRoundedRect(
                            textX - rulerTextBgPadding,
                            textY - textBgHeight * 0.65,
                            textBgWidth,
                            textBgHeight,
                            rulerTextBgRx,
                          );
                          graphics.endFill();
                        }}
                      />
                      <Text
                        text={textContent}
                        x={textX}
                        y={textY}
                        anchor={{ x: 0, y: 0.5 }}
                        style={
                          new TextStyle({
                            fontSize: rulerTextFontSize,
                            fill: theme.textPrimary,
                            fontWeight: '500',
                          })
                        }
                        resolution={Math.max(2, stageResolution)}
                        roundPixels
                      />
                    </Container>
                  );
                })()
              : null}
          </Container>
        </Container>
      </Stage>
    </div>
  );
}
