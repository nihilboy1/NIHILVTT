import React, { useMemo, useRef, useState } from 'react';

import { Container, Graphics, Sprite, Stage, Text, useTick } from '@pixi/react';
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Sprite as PixiSprite,
  TextStyle,
  Texture,
} from 'pixi.js';

import { calculateDistanceInMeters } from '@/entities/board/model/utils/boardUtils';
import { parseCharacterSize } from '@/entities/character/lib/utils/characterUtils';
import { type Character } from '@/entities/character/model/schemas/character.schema';
import type { SessionCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useAttackFeedbackStore } from '@/features/combat/model/attackFeedbackStore';
import { isBludgeoningDamageType } from '@/features/combat/model/damageTypeRules';
import {
  GridSettings,
  MarqueeSelectionState,
  PageSettings,
  Point,
  RulerPathState,
  Token,
} from '@/shared/api/types';
import nextTurnIcon from '@/shared/assets/next.png';
import missAttackIcon from '@/shared/assets/missattack.png';
import skullDeadIcon from '@/shared/assets/skulldead.png';

import { createPixiWorldTransform } from '../model/renderer';

type PixiBoardPrototypeProps = {
  viewBox: { x: number; y: number; width: number; height: number };
  gridSettings: GridSettings;
  pageSettings: PageSettings;
  tokensOnBoard: Token[];
  characters: Character[];
  runtimeCharactersById: Record<string, SessionCharacterRuntime>;
  multiSelectedTokenIds: string[];
  copiedTokenId: string | null;
  pasteTargetCell: Point | null;
  pendingAttackAreaCells: Point[];
  movementRangeCells: Point[];
  movementPreviewPathCells: Point[];
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
  selectionNeutral: number;
  feedbackPositive: number;
  hpBarFill: number;
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
  hpTick: number;
};

const DEAD_SKULL_ALPHA = 0.7;
const NEXT_ICON_SOURCE_SIZE = 1024;
const TOKEN_MELEE_ANIMATION_DURATION_MS = 420;
const CURRENT_TURN_MARKER_EXTRA_DELAY_MS = 1000;
const CLUB_IMPACT_EFFECT_DELAY_MS = 170;
const CLUB_IMPACT_EFFECT_DURATION_MS = 250;
const MISS_FEEDBACK_FADEOUT_MS = 1040;
const HP_DAMAGE_TRAIL_DELAY_MS = 250;
const HP_DAMAGE_TRAIL_DURATION_MS = 250;
const HP_HEAL_FLASH_DURATION_MS = 250;

let cachedImpactAudioContext: AudioContext | null = null;

function getImpactAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
  const Ctx = window.AudioContext ?? audioWindow.webkitAudioContext;
  if (!Ctx) {
    return null;
  }

  if (!cachedImpactAudioContext || cachedImpactAudioContext.state === 'closed') {
    cachedImpactAudioContext = new Ctx();
  }

  return cachedImpactAudioContext;
}

function playClubImpactSound(): void {
  const ctx = getImpactAudioContext();
  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(78, now + 0.11);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

function resolveHpTickProfile(maxHp: number): { minorStep: number; majorStep: number } {
  if (maxHp <= 10) {
    return { minorStep: 1, majorStep: 5 };
  }
  if (maxHp <= 50) {
    return { minorStep: 5, majorStep: 10 };
  }
  if (maxHp <= 100) {
    return { minorStep: 10, majorStep: 25 };
  }
  if (maxHp <= 250) {
    return { minorStep: 25, majorStep: 50 };
  }
  if (maxHp <= 500) {
    return { minorStep: 50, majorStep: 100 };
  }

  return { minorStep: 100, majorStep: 250 };
}

function drawHpBarWithTicks({
  graphics,
  y,
  width,
  height,
  currentValue,
  maxValue,
  cameraScaleY,
  backgroundColor,
  fillColor,
  borderColor,
  borderAlpha,
  tickColor,
}: {
  graphics: PixiGraphics;
  y: number;
  width: number;
  height: number;
  currentValue: number;
  maxValue: number;
  cameraScaleY: number;
  backgroundColor: number;
  fillColor: number;
  borderColor: number;
  borderAlpha: number;
  tickColor: number;
}): void {
  const safeMaxValue = Math.max(1, maxValue);
  const safeCurrentValue = Math.max(0, Math.min(currentValue, safeMaxValue));
  const fillRatio = safeCurrentValue / safeMaxValue;
  const fillWidth = width * fillRatio;

  graphics.lineStyle({
    width: Math.max(0.75 / cameraScaleY, 0.2),
    color: borderColor,
    alpha: borderAlpha,
  });
  graphics.beginFill(backgroundColor, 0.9);
  graphics.drawRect(0, y, width, height);
  graphics.endFill();

  if (fillWidth > 0) {
    graphics.beginFill(fillColor, 0.95);
    graphics.drawRect(0, y, fillWidth, height);
    graphics.endFill();
  }

  const { minorStep, majorStep } = resolveHpTickProfile(safeMaxValue);
  const minorTickWidth = Math.max(0.85 / cameraScaleY, 0.24);
  const majorTickWidth = Math.max(1.45 / cameraScaleY, 0.34);
  const hpUnitWidth = width / safeMaxValue;

  for (let hpIndex = minorStep; hpIndex < safeMaxValue; hpIndex += minorStep) {
    const tickX = hpUnitWidth * hpIndex;
    const isMajorTick = hpIndex % majorStep === 0;
    const tickHeight = isMajorTick ? height : height * 0.76;
    const tickWidth = isMajorTick ? majorTickWidth : minorTickWidth;
    const tickAlpha = isMajorTick ? 0.95 : 0.68;
    const tickY = y + (height - tickHeight) / 2;

    graphics.lineStyle({
      width: tickWidth,
      color: tickColor,
      alpha: tickAlpha,
    });
    graphics.moveTo(tickX, tickY);
    graphics.lineTo(tickX, tickY + tickHeight);
  }
}

function tintColorTowardsWhite(color: number, amount: number): number {
  const clampedAmount = Math.max(0, Math.min(1, amount));
  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const nextR = Math.round(r + (255 - r) * clampedAmount);
  const nextG = Math.round(g + (255 - g) * clampedAmount);
  const nextB = Math.round(b + (255 - b) * clampedAmount);

  return (nextR << 16) | (nextG << 8) | nextB;
}

function TokenHpBars({
  width,
  maxHp,
  currentHp,
  tempHp,
  cameraScaleY,
  theme,
}: {
  width: number;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  cameraScaleY: number;
  theme: Pick<
    PixiThemeColors,
    | 'surface0'
    | 'surface1'
    | 'hpBarFill'
    | 'hpTick'
    | 'info'
    | 'feedbackNegative'
    | 'feedbackPositive'
  >;
}) {
  const graphicsRef = useRef<PixiGraphics | null>(null);
  const previousCurrentHpRef = useRef(currentHp);
  const trailStartHpRef = useRef(currentHp);
  const trailCurrentHpRef = useRef(currentHp);
  const trailStartMsRef = useRef<number | null>(null);
  const healStartHpRef = useRef(currentHp);
  const healEndHpRef = useRef(currentHp);
  const healStartMsRef = useRef<number | null>(null);
  const initialTempHp = Math.max(0, tempHp);
  const previousTempHpRef = useRef(initialTempHp);
  const tempTrailStartHpRef = useRef(initialTempHp);
  const tempTrailCurrentHpRef = useRef(initialTempHp);
  const tempTrailStartMsRef = useRef<number | null>(null);
  const tempHealStartHpRef = useRef(initialTempHp);
  const tempHealEndHpRef = useRef(initialTempHp);
  const tempHealStartMsRef = useRef<number | null>(null);

  React.useEffect(() => {
    const previousCurrentHp = previousCurrentHpRef.current;
    if (currentHp < previousCurrentHp) {
      const trailStartHp = Math.max(trailCurrentHpRef.current, previousCurrentHp);
      trailStartHpRef.current = trailStartHp;
      trailCurrentHpRef.current = trailStartHp;
      trailStartMsRef.current = Date.now();
      healStartMsRef.current = null;
    } else if (currentHp > previousCurrentHp) {
      // Healing should not keep stale red damage trail.
      trailStartHpRef.current = currentHp;
      trailCurrentHpRef.current = currentHp;
      trailStartMsRef.current = null;
      healStartHpRef.current = previousCurrentHp;
      healEndHpRef.current = currentHp;
      healStartMsRef.current = Date.now();
    }

    previousCurrentHpRef.current = currentHp;

    const safeTempHp = Math.max(0, tempHp);
    const previousTempHp = previousTempHpRef.current;
    if (safeTempHp < previousTempHp) {
      const tempTrailStartHp = Math.max(tempTrailCurrentHpRef.current, previousTempHp);
      tempTrailStartHpRef.current = tempTrailStartHp;
      tempTrailCurrentHpRef.current = tempTrailStartHp;
      tempTrailStartMsRef.current = Date.now();
      tempHealStartMsRef.current = null;
    } else if (safeTempHp > previousTempHp) {
      // Temp HP gain should not keep stale temp trail.
      tempTrailStartHpRef.current = safeTempHp;
      tempTrailCurrentHpRef.current = safeTempHp;
      tempTrailStartMsRef.current = null;
      tempHealStartHpRef.current = previousTempHp;
      tempHealEndHpRef.current = safeTempHp;
      tempHealStartMsRef.current = Date.now();
    }

    previousTempHpRef.current = safeTempHp;
  }, [currentHp, tempHp]);

  useTick(() => {
    const graphics = graphicsRef.current;
    if (!graphics) {
      return;
    }

    const nowMs = Date.now();
    const safeMaxHp = Math.max(1, maxHp);
    const safeCurrentHp = Math.max(0, Math.min(currentHp, safeMaxHp));

    let trailHp = Math.max(safeCurrentHp, Math.min(trailCurrentHpRef.current, safeMaxHp));
    const trailStartMs = trailStartMsRef.current;
    if (trailStartMs != null && trailHp > safeCurrentHp) {
      const elapsedMs = nowMs - trailStartMs;
      if (elapsedMs > HP_DAMAGE_TRAIL_DELAY_MS) {
        const rawProgress = Math.min(
          1,
          (elapsedMs - HP_DAMAGE_TRAIL_DELAY_MS) / HP_DAMAGE_TRAIL_DURATION_MS,
        );
        const easedProgress = 1 - (1 - rawProgress) ** 3;
        const trailStartHp = Math.max(safeCurrentHp, Math.min(trailStartHpRef.current, safeMaxHp));
        trailHp = trailStartHp + (safeCurrentHp - trailStartHp) * easedProgress;
        if (rawProgress >= 1) {
          trailHp = safeCurrentHp;
          trailStartMsRef.current = null;
        }
      }
    } else {
      trailHp = safeCurrentHp;
      trailStartMsRef.current = null;
    }

    trailCurrentHpRef.current = trailHp;
    const damageTrailHp = Math.max(safeCurrentHp, Math.min(trailHp, safeMaxHp));

    const safeTempHp = Math.max(0, tempHp);
    let trailTempHp = Math.max(safeTempHp, tempTrailCurrentHpRef.current);
    const tempTrailStartMs = tempTrailStartMsRef.current;
    if (tempTrailStartMs != null && trailTempHp > safeTempHp) {
      const elapsedMs = nowMs - tempTrailStartMs;
      if (elapsedMs > HP_DAMAGE_TRAIL_DELAY_MS) {
        const rawProgress = Math.min(
          1,
          (elapsedMs - HP_DAMAGE_TRAIL_DELAY_MS) / HP_DAMAGE_TRAIL_DURATION_MS,
        );
        const easedProgress = 1 - (1 - rawProgress) ** 3;
        const tempTrailStartHp = Math.max(safeTempHp, tempTrailStartHpRef.current);
        trailTempHp = tempTrailStartHp + (safeTempHp - tempTrailStartHp) * easedProgress;
        if (rawProgress >= 1) {
          trailTempHp = safeTempHp;
          tempTrailStartMsRef.current = null;
        }
      }
    } else {
      trailTempHp = safeTempHp;
      tempTrailStartMsRef.current = null;
    }

    tempTrailCurrentHpRef.current = trailTempHp;
    const tempScaleMaxHp = Math.max(safeMaxHp, safeTempHp, trailTempHp);
    const displayedTrailTempHp = Math.max(safeTempHp, Math.min(trailTempHp, tempScaleMaxHp));

    const shouldRenderCurrentBar =
      safeCurrentHp > 0 || damageTrailHp > safeCurrentHp || healStartMsRef.current != null;
    const shouldRenderTempBar =
      safeTempHp > 0 || displayedTrailTempHp > safeTempHp || tempHealStartMsRef.current != null;

    graphics.clear();

    if (!shouldRenderCurrentBar && !shouldRenderTempBar) {
      return;
    }

    const hpBarHeight = Math.max(4 / cameraScaleY, 1.5);
    const hpBarGap = Math.max(0.35 / cameraScaleY, 0.2);
    const barY = -hpBarHeight - hpBarGap;

    if (shouldRenderCurrentBar) {
      drawHpBarWithTicks({
        graphics,
        y: barY,
        width,
        height: hpBarHeight,
        currentValue: safeCurrentHp,
        maxValue: safeMaxHp,
        cameraScaleY,
        backgroundColor: theme.surface1,
        fillColor: theme.hpBarFill,
        borderColor: theme.surface0,
        borderAlpha: 0.72,
        tickColor: theme.hpTick,
      });

      if (damageTrailHp > safeCurrentHp) {
        const hpUnitWidth = width / safeMaxHp;
        const trailX = hpUnitWidth * safeCurrentHp;
        const trailWidth = hpUnitWidth * (damageTrailHp - safeCurrentHp);
        const hpTrailColor = tintColorTowardsWhite(theme.feedbackNegative, 0.52);
        graphics.beginFill(hpTrailColor, 0.5);
        graphics.drawRect(trailX, barY, trailWidth, hpBarHeight);
        graphics.endFill();
      }

      const healStartMs = healStartMsRef.current;
      if (healStartMs != null) {
        const elapsedMs = nowMs - healStartMs;
        const rawProgress = Math.min(1, elapsedMs / HP_HEAL_FLASH_DURATION_MS);
        const healAlpha = (1 - rawProgress) * 0.62;
        const healFrom = Math.max(0, Math.min(healStartHpRef.current, safeMaxHp));
        const healTo = Math.max(healFrom, Math.min(healEndHpRef.current, safeMaxHp));
        if (healTo > healFrom && healAlpha > 0) {
          const hpUnitWidth = width / safeMaxHp;
          const healX = hpUnitWidth * healFrom;
          const healWidth = hpUnitWidth * (healTo - healFrom);
          const healColor = tintColorTowardsWhite(theme.feedbackPositive, 0.46);
          graphics.beginFill(healColor, healAlpha);
          graphics.drawRect(healX, barY, healWidth, hpBarHeight);
          graphics.endFill();
        }
        if (rawProgress >= 1) {
          healStartMsRef.current = null;
        }
      }
    }

    if (shouldRenderTempBar) {
      const tempBarHeight = hpBarHeight;
      const tempBarY = barY - tempBarHeight - Math.max(0.45 / cameraScaleY, 0.2);

      drawHpBarWithTicks({
        graphics,
        y: tempBarY,
        width,
        height: tempBarHeight,
        currentValue: safeTempHp,
        maxValue: tempScaleMaxHp,
        cameraScaleY,
        backgroundColor: theme.surface1,
        fillColor: theme.info,
        borderColor: theme.surface0,
        borderAlpha: 0.52,
        tickColor: theme.hpTick,
      });

      if (displayedTrailTempHp > safeTempHp) {
        const tempUnitWidth = width / tempScaleMaxHp;
        const tempTrailX = tempUnitWidth * safeTempHp;
        const tempTrailWidth = tempUnitWidth * (displayedTrailTempHp - safeTempHp);
        graphics.beginFill(theme.info, 0.34);
        graphics.drawRect(tempTrailX, tempBarY, tempTrailWidth, tempBarHeight);
        graphics.endFill();
      }

      const tempHealStartMs = tempHealStartMsRef.current;
      if (tempHealStartMs != null) {
        const elapsedMs = nowMs - tempHealStartMs;
        const rawProgress = Math.min(1, elapsedMs / HP_HEAL_FLASH_DURATION_MS);
        const healAlpha = (1 - rawProgress) * 0.58;
        const healFrom = Math.max(0, tempHealStartHpRef.current);
        const healTo = Math.max(healFrom, tempHealEndHpRef.current);
        if (healTo > healFrom && healAlpha > 0) {
          const tempUnitWidth = width / tempScaleMaxHp;
          const tempHealX = tempUnitWidth * healFrom;
          const tempHealWidth = tempUnitWidth * (healTo - healFrom);
          const tempHealColor = tintColorTowardsWhite(theme.info, 0.52);
          graphics.beginFill(tempHealColor, healAlpha);
          graphics.drawRect(tempHealX, tempBarY, tempHealWidth, tempBarHeight);
          graphics.endFill();
        }
        if (rawProgress >= 1) {
          tempHealStartMsRef.current = null;
        }
      }
    }
  });

  return <Graphics ref={graphicsRef} alpha={1} />;
}

function hasDeadConditionFromEffects(
  effects: Array<{ linkedCondition?: string | null } | null> | undefined,
): boolean {
  if (!Array.isArray(effects)) {
    return false;
  }

  return effects.some((effect) => effect?.linkedCondition === 'dead');
}

function characterHasDeadCondition(
  character: Character,
  runtimeCharacter: SessionCharacterRuntime | null,
): boolean {
  const runtimeEffects = runtimeCharacter?.activeEffects.effects;
  if (hasDeadConditionFromEffects(runtimeEffects)) {
    return true;
  }

  const legacyEffects = (
    character as Character & {
      activeEffects?: { effects?: Array<{ linkedCondition?: string | null } | null> };
    }
  ).activeEffects?.effects;

  return hasDeadConditionFromEffects(legacyEffects);
}

function parseCssColorToPixi(cssColor: string): number | null {
  const value = cssColor.trim();
  if (value.length === 0) {
    return null;
  }

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      const normalized = hex
        .split('')
        .map((part) => `${part}${part}`)
        .join('');
      const parsed = Number.parseInt(normalized, 16);
      return Number.isNaN(parsed) ? null : parsed;
    }
    if (hex.length === 6) {
      const parsed = Number.parseInt(hex, 16);
      return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (!rgbMatch) {
    return null;
  }

  const parts = rgbMatch[1]?.split(',').map((part) => part.trim()) ?? [];
  if (parts.length < 3) {
    return null;
  }

  const r = Number.parseInt(parts[0] ?? '', 10);
  const g = Number.parseInt(parts[1] ?? '', 10);
  const b = Number.parseInt(parts[2] ?? '', 10);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255);
}

function usePixiThemeColors(): PixiThemeColors {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      throw new Error(
        'Violação de contrato de tema: window indisponível para leitura de CSS vars do Pixi.',
      );
    }

    const styles = window.getComputedStyle(document.documentElement);
    const readRequired = (cssVarName: string): number => {
      const rawValue = styles.getPropertyValue(cssVarName);
      const parsed = parseCssColorToPixi(rawValue);
      if (parsed == null) {
        throw new Error(
          `Violação de contrato de tema: CSS var obrigatória ausente ou inválida (${cssVarName}).`,
        );
      }

      return parsed;
    };

    return {
      accentPrimary: readRequired('--color-accent-primary'),
      accentSecondary: readRequired('--color-accent-secondary'),
      selectionNeutral: readRequired('--color-text-secondary'),
      feedbackPositive: readRequired('--color-feedback-positive'),
      hpBarFill: readRequired('--color-hp-bar-fill'),
      feedbackNegative: readRequired('--color-feedback-negative'),
      textPrimary: readRequired('--color-text-primary'),
      textSecondary: readRequired('--color-text-secondary'),
      surface0: readRequired('--color-surface-0'),
      surface1: readRequired('--color-surface-1'),
      warning: readRequired('--color-feedback-warning'),
      boardBg: readRequired('--color-board-bg'),
      boardGrid: readRequired('--color-board-grid'),
      info: readRequired('--color-info'),
      shadow: readRequired('--color-shadow'),
      hpTick: readRequired('--color-hp-tick'),
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
  markerX,
  markerY,
  markerWidth,
  markerHeight,
  currentMarkerHiddenUntilMs,
  nextMarkerHiddenUntilMs,
  cameraScaleY,
  isCurrent,
  isNext,
  theme,
}: {
  tokenWidth: number;
  tokenHeight: number;
  markerX: number;
  markerY: number;
  markerWidth: number;
  markerHeight: number;
  currentMarkerHiddenUntilMs?: number;
  nextMarkerHiddenUntilMs?: number;
  cameraScaleY: number;
  isCurrent: boolean;
  isNext: boolean;
  theme: PixiThemeColors;
}) {
  const currentPulseRef = useRef<PixiContainer | null>(null);
  const currentPulsePhaseRef = useRef(0);
  const nextPulseRef = useRef<PixiContainer | null>(null);
  const nextPulsePhaseRef = useRef(0);
  const minTokenSize = Math.min(tokenWidth, tokenHeight);
  const tokenScreenSize = minTokenSize * cameraScaleY;
  const centerX = tokenWidth / 2;
  const centerY = tokenHeight / 2;
  const markerMinSide = Math.max(1, Math.min(markerWidth, markerHeight));
  const markerCenterX = markerX + markerWidth / 2;
  const markerCenterY = markerY + markerHeight / 2;
  const markerStrokeWidth = Math.max(2.2 / cameraScaleY, markerMinSide * 0.05, 0.9);
  const markerShadowStrokeWidth = markerStrokeWidth + Math.max(1.1 / cameraScaleY, 0.35);
  const markerCornerLength = Math.min(
    markerMinSide * 0.42,
    Math.max(markerMinSide * 0.2, 8 / cameraScaleY, 2.8),
  );
  const showNextIcon = tokenScreenSize >= 18;
  const nextIconSize = Math.max(14, Math.min(70, minTokenSize * 0.624));
  const nextIconScale = nextIconSize / NEXT_ICON_SOURCE_SIZE;

  useTick((delta) => {
    if (isCurrent && currentPulseRef.current) {
      if (
        typeof currentMarkerHiddenUntilMs === 'number' &&
        Date.now() < currentMarkerHiddenUntilMs
      ) {
        currentPulseRef.current.alpha = 0;
        currentPulseRef.current.scale.set(1);
      } else {
        currentPulsePhaseRef.current += 0.055 * delta;
        const pulse = (Math.sin(currentPulsePhaseRef.current) + 1) / 2;
        const scale = 1 + pulse * 0.065;
        currentPulseRef.current.scale.set(scale);
        currentPulseRef.current.alpha = 0.76 + pulse * 0.22;
      }
    }

    if (isNext && nextPulseRef.current) {
      if (typeof nextMarkerHiddenUntilMs === 'number' && Date.now() < nextMarkerHiddenUntilMs) {
        nextPulseRef.current.alpha = 0;
        nextPulseRef.current.scale.set(1);
      } else {
        nextPulsePhaseRef.current += 0.045 * delta;
        const pulse = (Math.sin(nextPulsePhaseRef.current) + 1) / 2;
        const scale = 1 + pulse * 0.06;
        nextPulseRef.current.scale.set(scale);
        nextPulseRef.current.alpha = 0.7 + pulse * 0.14;
      }
    }
  });

  if (!isCurrent && !isNext) {
    return null;
  }

  return (
    <Container>
      {isCurrent ? (
        <Container ref={currentPulseRef} x={markerCenterX} y={markerCenterY}>
          <Graphics
            draw={(graphics) => {
              graphics.clear();
              const left = -markerWidth / 2;
              const top = -markerHeight / 2;
              const right = markerWidth / 2;
              const bottom = markerHeight / 2;
              const len = markerCornerLength;

              const drawCorners = () => {
                graphics.moveTo(left, top);
                graphics.lineTo(left + len, top);
                graphics.moveTo(left, top);
                graphics.lineTo(left, top + len);

                graphics.moveTo(right, top);
                graphics.lineTo(right - len, top);
                graphics.moveTo(right, top);
                graphics.lineTo(right, top + len);

                graphics.moveTo(left, bottom);
                graphics.lineTo(left + len, bottom);
                graphics.moveTo(left, bottom);
                graphics.lineTo(left, bottom - len);

                graphics.moveTo(right, bottom);
                graphics.lineTo(right - len, bottom);
                graphics.moveTo(right, bottom);
                graphics.lineTo(right, bottom - len);
              };

              graphics.lineStyle(markerShadowStrokeWidth, theme.surface0, 0.4);
              drawCorners();

              graphics.lineStyle(markerStrokeWidth, theme.accentPrimary, 0.98);
              drawCorners();
            }}
          />
        </Container>
      ) : null}
      {isNext ? (
        <Container x={centerX} y={centerY}>
          {showNextIcon ? (
            <Container ref={nextPulseRef}>
              <Sprite
                image={nextTurnIcon}
                x={0}
                y={0}
                anchor={{ x: 0.5, y: 0.5 }}
                scale={{ x: -nextIconScale, y: nextIconScale }}
                alpha={0.86}
              />
            </Container>
          ) : null}
        </Container>
      ) : null}
    </Container>
  );
}

type TokenMeleeAnimation = {
  role: 'attacker' | 'target';
  startMs: number;
  dirX: number;
  dirY: number;
  distance: number;
};

function ClubImpactBurstEffect({
  center,
  startMs,
  cameraScaleY,
  theme,
  playSound,
}: {
  center: { x: number; y: number };
  startMs: number;
  cameraScaleY: number;
  theme: PixiThemeColors;
  playSound: boolean;
}) {
  const graphicsRef = useRef<PixiGraphics | null>(null);
  const soundPlayedRef = useRef(false);

  React.useEffect(() => {
    if (!playSound || soundPlayedRef.current) {
      return;
    }

    soundPlayedRef.current = true;
    try {
      playClubImpactSound();
    } catch {
      // Audio is optional; ignore browser/autoplay failures.
    }
  }, [playSound]);

  useTick(() => {
    const graphics = graphicsRef.current;
    if (!graphics) {
      return;
    }

    const elapsedMs = Date.now() - startMs;
    if (elapsedMs < 0 || elapsedMs > CLUB_IMPACT_EFFECT_DURATION_MS) {
      graphics.visible = false;
      return;
    }

    graphics.visible = true;
    const t = elapsedMs / CLUB_IMPACT_EFFECT_DURATION_MS;
    const easeOutCubic = 1 - (1 - t) ** 3;
    const fade = 1 - t;

    const maxRadius = Math.max(16 / cameraScaleY, 5.8);
    const travel = maxRadius * easeOutCubic;

    const vectors = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 0.72, y: 0.72 },
      { x: -0.72, y: 0.72 },
      { x: 0.72, y: -0.72 },
      { x: -0.72, y: -0.72 },
    ];

    graphics.clear();
    graphics.position.set(center.x, center.y);

    graphics.lineStyle(Math.max(2.1 / cameraScaleY, 0.7), theme.accentPrimary, 0.75 * fade);
    graphics.drawCircle(0, 0, Math.max(3 / cameraScaleY, 1) + travel * 0.35);

    vectors.forEach((vector, index) => {
      const v = 0.6 + (index % 3) * 0.22;
      const sparkDistance = travel * v;
      const sparkX = vector.x * sparkDistance;
      const sparkY = vector.y * sparkDistance;

      graphics.lineStyle(Math.max(1.4 / cameraScaleY, 0.45), theme.accentSecondary, 0.8 * fade);
      graphics.moveTo(0, 0);
      graphics.lineTo(sparkX * 0.72, sparkY * 0.72);

      graphics.beginFill(theme.accentPrimary, 0.92 * fade);
      graphics.drawCircle(sparkX, sparkY, Math.max((2.3 / cameraScaleY) * (1 - t * 0.4), 0.6));
      graphics.endFill();
    });
  });

  return <Graphics ref={graphicsRef} />;
}

function AnimatedTokenContainer({
  baseX,
  baseY,
  pivotX,
  pivotY,
  animation,
  cameraScaleY,
  children,
}: {
  baseX: number;
  baseY: number;
  pivotX: number;
  pivotY: number;
  animation: TokenMeleeAnimation | undefined;
  cameraScaleY: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<PixiContainer | null>(null);

  useTick(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let offsetX = 0;
    let offsetY = 0;
    let scale = 1;

    if (animation) {
      const durationMs = TOKEN_MELEE_ANIMATION_DURATION_MS;
      const elapsedMs = Date.now() - animation.startMs;
      if (elapsedMs >= 0 && elapsedMs <= durationMs) {
        const t = elapsedMs / durationMs;
        const easeOutCubic = (value: number) => 1 - (1 - value) ** 3;

        if (animation.role === 'attacker') {
          const windupEnd = 0.22;
          const strikePeak = 0.52;
          const recoilEnd = 0.78;
          const retreat = Math.max(14 / cameraScaleY, 5);
          const lift = Math.max(18 / cameraScaleY, 6.5);
          const lunge = Math.min(
            Math.max(38 / cameraScaleY, 14),
            Math.max(10, animation.distance * 0.48),
          );
          const recoilBack = Math.max(13 / cameraScaleY, 4.8);

          let forward = 0;
          let verticalLift = 0;

          if (t < windupEnd) {
            const p = t / windupEnd;
            const eased = easeOutCubic(p);
            forward = -retreat * (1 - eased);
            verticalLift = -lift * (1 - eased * 0.45);
          } else if (t < strikePeak) {
            const p = (t - windupEnd) / (strikePeak - windupEnd);
            const eased = easeOutCubic(p);
            forward = lunge * eased;
            verticalLift = -lift * (1 - eased * 0.15);
          } else if (t < recoilEnd) {
            const p = (t - strikePeak) / (recoilEnd - strikePeak);
            const eased = easeOutCubic(p);
            forward = lunge - (lunge + recoilBack) * eased;
            verticalLift = -lift * (0.15 - eased * 0.08);
          } else {
            const p = (t - recoilEnd) / (1 - recoilEnd);
            const eased = easeOutCubic(p);
            forward = -recoilBack * (1 - eased);
            verticalLift = -lift * 0.07 * (1 - eased);
          }

          offsetX = animation.dirX * forward;
          offsetY = animation.dirY * forward + verticalLift;
        } else {
          const impactStart = 0.34;
          const impactEnd = 0.94;
          if (t >= impactStart && t <= impactEnd) {
            const p = (t - impactStart) / (impactEnd - impactStart);
            offsetX = 0;
            offsetY = 0;
            scale = 1 - Math.sin(p * Math.PI) * 0.08;
          } else {
            offsetX = 0;
            offsetY = 0;
            scale = 1;
          }
        }
      }
    }

    container.pivot.set(pivotX, pivotY);
    container.position.set(baseX + offsetX + pivotX, baseY + offsetY + pivotY);
    container.scale.set(scale);
  });

  return <Container ref={containerRef}>{children}</Container>;
}

function CombatCrossIndicator({
  tokenWidth,
  tokenHeight,
  color,
}: {
  tokenWidth: number;
  tokenHeight: number;
  color: number;
}) {
  const minTokenSide = Math.min(tokenWidth, tokenHeight);
  const ringStrokeWidth = Math.max(0.45, Math.min(minTokenSide * 0.015, 1.15));
  // Inner edge of the stroke sits exactly on the token boundary.
  const ringRadius = minTokenSide / 2 + ringStrokeWidth / 2;

  return (
    <Container x={tokenWidth / 2} y={tokenHeight / 2}>
      <Graphics
        draw={(graphics) => {
          graphics.clear();
          graphics.lineStyle({
            width: ringStrokeWidth,
            color,
            alpha: 0.62,
          });
          graphics.drawCircle(0, 0, ringRadius);
        }}
      />
    </Container>
  );
}

function MissFeedbackSprite({
  x,
  y,
  width,
  height,
  triggeredAtMs,
  baseAlpha = 0.96,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  triggeredAtMs: number;
  baseAlpha?: number;
}) {
  const spriteRef = useRef<PixiSprite | null>(null);

  useTick(() => {
    const sprite = spriteRef.current;
    if (!sprite) {
      return;
    }

    const elapsedMs = Math.max(0, Date.now() - triggeredAtMs);
    const progress = Math.min(1, elapsedMs / MISS_FEEDBACK_FADEOUT_MS);
    sprite.alpha = baseAlpha * (1 - progress);
  });

  return (
    <Sprite
      ref={spriteRef}
      image={missAttackIcon}
      x={x}
      y={y}
      anchor={{ x: 0.5, y: 0.5 }}
      width={width}
      height={height}
      alpha={baseAlpha}
    />
  );
}

export function PixiBoardPrototype({
  viewBox,
  gridSettings,
  pageSettings,
  tokensOnBoard,
  characters,
  runtimeCharactersById,
  multiSelectedTokenIds,
  copiedTokenId,
  pasteTargetCell,
  pendingAttackAreaCells,
  movementRangeCells,
  movementPreviewPathCells,
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
          const cellSize = gridSettings.visualCellSize;
          const centeringOffsetX = Math.max(0, 1 - sizeX) * 0.5 * cellSize;
          const centeringOffsetY = Math.max(0, 1 - sizeY) * 0.5 * cellSize;
          const selectionSizeX = Math.max(1, Math.ceil(sizeX));
          const selectionSizeY = Math.max(1, Math.ceil(sizeY));
          const runtimeCharacter = runtimeCharactersById[token.characterId] ?? null;
          const hasDeadCondition = characterHasDeadCondition(character, runtimeCharacter);
          const currentHp =
            'combatStats' in character && typeof character.combatStats.currentHp === 'number'
              ? character.combatStats.currentHp
              : null;
          const maxHp =
            'combatStats' in character && typeof character.combatStats.maxHp === 'number'
              ? character.combatStats.maxHp
              : null;
          const tempHp =
            'combatStats' in character && typeof character.combatStats.tempHp === 'number'
              ? character.combatStats.tempHp
              : 0;
          const hasEffectiveHp = (currentHp ?? 0) > 0 || tempHp > 0;
          const isDead = hasDeadCondition && !hasEffectiveHp;

          return {
            id: token.id,
            imageUrl: character.image,
            name: character.name,
            isDead,
            currentHp,
            maxHp,
            tempHp,
            x: token.position.x * cellSize + centeringOffsetX,
            y: token.position.y * cellSize + centeringOffsetY,
            width: sizeX * cellSize,
            height: sizeY * cellSize,
            selectionX: -centeringOffsetX,
            selectionY: -centeringOffsetY,
            selectionWidth: selectionSizeX * cellSize,
            selectionHeight: selectionSizeY * cellSize,
            baseOrder: index,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry != null),
    [characters, gridSettings.visualCellSize, runtimeCharactersById, tokensOnBoard],
  );
  const activeMeleeAttackerTokenIds = useMemo(() => {
    const nowMs = Date.now();
    const ids = new Set<string>();

    Object.values(feedbackByTokenId)
      .filter((entry): entry is NonNullable<typeof entry> => entry != null)
      .filter(
        (entry) =>
          Boolean(entry.attackerTokenId) && isBludgeoningDamageType(entry.attackDamageType),
      )
      .forEach((entry) => {
        const startMs = entry.triggeredAtMs ?? nowMs;
        if (nowMs <= startMs + TOKEN_MELEE_ANIMATION_DURATION_MS && entry.attackerTokenId) {
          ids.add(entry.attackerTokenId);
        }
      });

    return ids;
  }, [feedbackByTokenId]);
  const orderedTokenSprites = useMemo(() => {
    const priorityByTokenId = new Map<string, number>();
    multiSelectedTokenIds.forEach((tokenId, index) => {
      priorityByTokenId.set(tokenId, 1000 + index);
    });
    activeMeleeAttackerTokenIds.forEach((tokenId) => {
      priorityByTokenId.set(tokenId, 3000);
    });
    if (draggingVisuals.tokenId) {
      priorityByTokenId.set(draggingVisuals.tokenId, 4000 + multiSelectedTokenIds.length);
    }

    return [...tokenSprites].sort((a, b) => {
      const priorityA = priorityByTokenId.get(a.id) ?? 0;
      const priorityB = priorityByTokenId.get(b.id) ?? 0;
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return a.baseOrder - b.baseOrder;
    });
  }, [activeMeleeAttackerTokenIds, draggingVisuals.tokenId, multiSelectedTokenIds, tokenSprites]);
  const tokenSpriteById = useMemo(
    () => new Map(orderedTokenSprites.map((sprite) => [sprite.id, sprite])),
    [orderedTokenSprites],
  );
  const meleeAnimationByTokenId = useMemo(() => {
    const animations = new Map<string, TokenMeleeAnimation>();

    Object.values(feedbackByTokenId)
      .filter((entry): entry is NonNullable<typeof entry> => entry != null)
      .filter(
        (entry) =>
          isBludgeoningDamageType(entry.attackDamageType) && Boolean(entry.attackerTokenId),
      )
      .forEach((entry) => {
        const attackerSprite = entry.attackerTokenId
          ? tokenSpriteById.get(entry.attackerTokenId)
          : null;
        const targetSprite = tokenSpriteById.get(entry.tokenId);
        if (!attackerSprite || !targetSprite) {
          return;
        }

        const attackerCenterX =
          attackerSprite.x + attackerSprite.selectionX + attackerSprite.selectionWidth / 2;
        const attackerCenterY =
          attackerSprite.y + attackerSprite.selectionY + attackerSprite.selectionHeight / 2;
        const targetCenterX =
          targetSprite.x + targetSprite.selectionX + targetSprite.selectionWidth / 2;
        const targetCenterY =
          targetSprite.y + targetSprite.selectionY + targetSprite.selectionHeight / 2;

        const dx = targetCenterX - attackerCenterX;
        const dy = targetCenterY - attackerCenterY;
        const distance = Math.hypot(dx, dy);
        if (distance <= 0.001) {
          return;
        }

        const dirX = dx / distance;
        const dirY = dy / distance;
        const startMs = entry.triggeredAtMs ?? Date.now();

        animations.set(attackerSprite.id, {
          role: 'attacker',
          startMs,
          dirX,
          dirY,
          distance,
        });

        animations.set(targetSprite.id, {
          role: 'target',
          startMs,
          dirX,
          dirY,
          distance,
        });
      });

    return animations;
  }, [feedbackByTokenId, tokenSpriteById]);
  const clubImpactEffects = useMemo(
    () =>
      Object.values(feedbackByTokenId)
        .filter((entry): entry is NonNullable<typeof entry> => entry != null)
        .filter(
          (entry) =>
            entry.hit &&
            isBludgeoningDamageType(entry.attackDamageType) &&
            Boolean(entry.attackerTokenId) &&
            typeof entry.triggeredAtMs === 'number',
        )
        .map((entry) => {
          const targetSprite = tokenSpriteById.get(entry.tokenId);
          if (!targetSprite) {
            return null;
          }

          return {
            id: entry.id,
            center: {
              x: targetSprite.x + targetSprite.selectionX + targetSprite.selectionWidth / 2,
              y: targetSprite.y + targetSprite.selectionY + targetSprite.selectionHeight / 2,
            },
            startMs: (entry.triggeredAtMs ?? Date.now()) + CLUB_IMPACT_EFFECT_DELAY_MS,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry != null),
    [feedbackByTokenId, tokenSpriteById],
  );
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
          {movementRangeCells.map((cell) => (
            <Graphics
              key={`pixi-movement-range-cell-${cell.x}-${cell.y}`}
              draw={(graphics) => {
                graphics.clear();
                const size = gridSettings.visualCellSize;
                const x = cell.x * size;
                const y = cell.y * size;
                graphics.lineStyle({
                  width: Math.max(0.9 / cameraTransform.scaleY, 0.3),
                  color: theme.feedbackPositive,
                  alpha: 0.58,
                });
                graphics.beginFill(theme.feedbackPositive, 0.09);
                graphics.drawRect(x, y, size, size);
                graphics.endFill();
              }}
            />
          ))}
          {movementPreviewPathCells.map((cell) => (
            <Graphics
              key={`pixi-movement-preview-cell-${cell.x}-${cell.y}`}
              draw={(graphics) => {
                graphics.clear();
                const size = gridSettings.visualCellSize;
                const x = cell.x * size;
                const y = cell.y * size;
                graphics.beginFill(theme.accentPrimary, 0.16);
                graphics.drawRect(x, y, size, size);
                graphics.endFill();
              }}
            />
          ))}
          {movementPreviewPathCells.length > 1 ? (
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                graphics.lineStyle({
                  width: Math.max(2.1 / cameraTransform.scaleY, 0.7),
                  color: theme.accentPrimary,
                  alpha: 0.94,
                });

                movementPreviewPathCells.forEach((cell, index) => {
                  const centerX = (cell.x + 0.5) * gridSettings.visualCellSize;
                  const centerY = (cell.y + 0.5) * gridSettings.visualCellSize;
                  if (index === 0) {
                    graphics.moveTo(centerX, centerY);
                    return;
                  }
                  graphics.lineTo(centerX, centerY);
                });
              }}
            />
          ) : null}
          {orderedTokenSprites.map((tokenSprite) => {
            const tokenMeleeAnimation = meleeAnimationByTokenId.get(tokenSprite.id);
            const markerHiddenUntilMs = tokenMeleeAnimation
              ? tokenMeleeAnimation.startMs +
                TOKEN_MELEE_ANIMATION_DURATION_MS +
                CURRENT_TURN_MARKER_EXTRA_DELAY_MS
              : undefined;

            const nextMarkerHiddenUntilMs =
              tokenMeleeAnimation?.role === 'target' ? markerHiddenUntilMs : undefined;

            return (
              <AnimatedTokenContainer
                key={`pixi-token-${tokenSprite.id}`}
                baseX={
                  draggingVisuals.tokenId === tokenSprite.id && draggingVisuals.visualWorldPoint
                    ? draggingVisuals.visualWorldPoint.x
                    : tokenSprite.x
                }
                baseY={
                  draggingVisuals.tokenId === tokenSprite.id && draggingVisuals.visualWorldPoint
                    ? draggingVisuals.visualWorldPoint.y
                    : tokenSprite.y
                }
                pivotX={tokenSprite.selectionX + tokenSprite.selectionWidth / 2}
                pivotY={tokenSprite.selectionY + tokenSprite.selectionHeight / 2}
                animation={tokenMeleeAnimation}
                cameraScaleY={cameraTransform.scaleY}
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
                        color: theme.selectionNeutral,
                        alpha: 0.98,
                      });
                      graphics.drawRect(
                        tokenSprite.selectionX - padding,
                        tokenSprite.selectionY - padding,
                        tokenSprite.selectionWidth + padding * 2,
                        tokenSprite.selectionHeight + padding * 2,
                      );
                    }}
                  />
                ) : null}
                {combatParticipantTokenIds.includes(tokenSprite.id) ? (
                  <CombatCrossIndicator
                    tokenWidth={tokenSprite.width}
                    tokenHeight={tokenSprite.height}
                    color={theme.feedbackNegative}
                  />
                ) : null}
                <Sprite
                  image={tokenSprite.imageUrl}
                  x={0}
                  y={0}
                  width={tokenSprite.width}
                  height={tokenSprite.height}
                  alpha={tokenSprite.isDead ? 0.52 : 1}
                />
                {tokenSprite.isDead ? (
                  <Sprite
                    image={skullDeadIcon}
                    x={tokenSprite.width / 2}
                    y={tokenSprite.height / 2}
                    anchor={{ x: 0.5, y: 0.5 }}
                    width={Math.max(tokenSprite.width * 0.88, 10)}
                    height={Math.max(tokenSprite.height * 0.88, 10)}
                    alpha={DEAD_SKULL_ALPHA}
                  />
                ) : null}
                <TokenTurnIndicator
                  tokenWidth={tokenSprite.width}
                  tokenHeight={tokenSprite.height}
                  markerX={tokenSprite.selectionX}
                  markerY={tokenSprite.selectionY}
                  markerWidth={tokenSprite.selectionWidth}
                  markerHeight={tokenSprite.selectionHeight}
                  currentMarkerHiddenUntilMs={markerHiddenUntilMs}
                  nextMarkerHiddenUntilMs={nextMarkerHiddenUntilMs}
                  cameraScaleY={cameraTransform.scaleY}
                  isCurrent={activeCombatTurnTokenId === tokenSprite.id}
                  isNext={activeCombatNextTurnTokenId === tokenSprite.id}
                  theme={theme}
                />
                {tokenSprite.maxHp != null && tokenSprite.currentHp != null ? (
                  <TokenHpBars
                    width={tokenSprite.width}
                    maxHp={tokenSprite.maxHp}
                    currentHp={tokenSprite.currentHp}
                    tempHp={tokenSprite.tempHp}
                    cameraScaleY={cameraTransform.scaleY}
                    theme={theme}
                  />
                ) : null}
                <Text
                  text={tokenSprite.name}
                  x={Math.round(tokenSprite.width / 2)}
                  y={Math.round(tokenSprite.height + tokenLabelOffset)}
                  anchor={{ x: 0.5, y: 0 }}
                  style={tokenNameStyle}
                  alpha={tokenSprite.isDead ? 0.56 : 1}
                  resolution={Math.max(2, stageResolution * 1.5)}
                  roundPixels
                />
                {feedbackByTokenId[tokenSprite.id] ? (
                  <Container>
                    {feedbackByTokenId[tokenSprite.id]?.hit ? (
                      <Text
                        text={`-${feedbackByTokenId[tokenSprite.id]?.damageApplied ?? 0}`}
                        x={tokenSprite.width / 2}
                        y={tokenSprite.height / 2 - Math.max(4 / cameraTransform.scaleY, 2)}
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={
                          new TextStyle({
                            fontSize: Math.max(
                              18 / cameraTransform.scaleY,
                              Math.max(tokenSprite.width, tokenSprite.height) * 0.48,
                            ),
                            fill: theme.feedbackNegative,
                            fontWeight: '900',
                            stroke: theme.surface0,
                            strokeThickness: Math.max(2 / cameraTransform.scaleY, 0.9),
                            lineJoin: 'round',
                          })
                        }
                        resolution={Math.max(2, stageResolution * 1.5)}
                        roundPixels
                      />
                    ) : (
                      <MissFeedbackSprite
                        x={tokenSprite.width / 2}
                        y={tokenSprite.height / 2 - Math.max(3 / cameraTransform.scaleY, 1)}
                        width={Math.max(tokenSprite.width * 0.62, 10)}
                        height={Math.max(tokenSprite.height * 0.62, 10)}
                        triggeredAtMs={
                          feedbackByTokenId[tokenSprite.id]?.triggeredAtMs ?? Date.now()
                        }
                      />
                    )}
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
              </AnimatedTokenContainer>
            );
          })}
          {clubImpactEffects.map((effect) => (
            <ClubImpactBurstEffect
              key={`club-impact-${effect.id}`}
              center={effect.center}
              startMs={effect.startMs}
              cameraScaleY={cameraTransform.scaleY}
              theme={theme}
              playSound
            />
          ))}
          {multiSelectBoundingBox ? (
            <Graphics
              draw={(graphics) => {
                graphics.clear();
                const lineWidth = Math.max(1.4 / cameraTransform.scaleY, 0.5);
                const dashLength = Math.max(5.5 / cameraTransform.scaleY, 1.8);
                const gapLength = Math.max(4 / cameraTransform.scaleY, 1.4);
                graphics.beginFill(theme.selectionNeutral, 0.09);
                graphics.drawRect(
                  multiSelectBoundingBox.x,
                  multiSelectBoundingBox.y,
                  multiSelectBoundingBox.width,
                  multiSelectBoundingBox.height,
                );
                graphics.endFill();
                graphics.lineStyle({
                  width: lineWidth,
                  color: theme.selectionNeutral,
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

                graphics.beginFill(theme.selectionNeutral, 0.08);
                graphics.drawRect(x, y, width, height);
                graphics.endFill();
                graphics.lineStyle({
                  width: lineWidth,
                  color: theme.selectionNeutral,
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
