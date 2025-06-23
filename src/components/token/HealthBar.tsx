import React from 'react';

const HEALTH_BAR_WIDTH = 4; // Largura fixa da barra de vida vertical
const HEALTH_BAR_MARGIN = 2; // Margem entre a barra de vida e o token
const HEALTH_BAR_CORNER_RADIUS = 1; // Raio da borda da barra de vida

interface HealthBarProps {
  currentHp: number | undefined;
  maxHp: number | undefined;
  tokenRenderHeight: number; // Usar a altura do token para a barra de vida
  zoomLevel: number;
}

export function HealthBar({
  currentHp,
  maxHp,
  tokenRenderHeight,
  zoomLevel,
}: HealthBarProps) {
  const showHealthBar = maxHp !== undefined && maxHp > 0 && currentHp !== undefined;
  if (!showHealthBar) {
    return null;
  }

  const actualCurrentHp = currentHp ?? 0;
  const actualMaxHp = maxHp ?? 0;
  const clampedCurrentHp = Math.max(0, Math.min(actualCurrentHp, actualMaxHp));
  const healthPercentage = actualMaxHp > 0 ? clampedCurrentHp / actualMaxHp : 0;

  // A altura da barra de vida será a altura do token
  const healthBarTotalHeight = tokenRenderHeight;
  const healthBarWidthScaled = Math.max(1, HEALTH_BAR_WIDTH / zoomLevel); // Largura da barra de vida escalada
  const healthBarStrokeWidth = Math.max(0.2, 0.5 / zoomLevel); // Largura do traço da barra de vida

  // Posição X da barra de vida (à esquerda do token)
  // O tokenRenderWidth não é mais necessário aqui, mas sim no BoardToken para posicionar o HealthBar
  const healthBarX = -healthBarWidthScaled - (HEALTH_BAR_MARGIN / zoomLevel);

  // Altura do foreground (vida atual)
  const healthBarForegroundHeight = healthBarTotalHeight * healthPercentage;
  // Posição Y do foreground para que ele diminua para baixo
  const healthBarForegroundY = healthBarTotalHeight - healthBarForegroundHeight;

  const cornerRadius = Math.min(HEALTH_BAR_CORNER_RADIUS / zoomLevel, HEALTH_BAR_CORNER_RADIUS);

  return (
    <g className="token-health-bar" transform={`translate(${healthBarX}, 0)`}>
      {/* Background da barra de vida */}
      <rect
        x="0"
        y="0"
        width={healthBarWidthScaled}
        height={healthBarTotalHeight}
        fill={'var(--color-health-bar-background)'}
        rx={cornerRadius}
        ry={cornerRadius}
        stroke={'var(--color-background)'}
        strokeWidth={healthBarStrokeWidth}
      />
      {/* Foreground da barra de vida (vida atual) */}
      <rect
        x={healthBarStrokeWidth / 2}
        y={healthBarForegroundY + healthBarStrokeWidth / 2}
        width={healthBarWidthScaled - healthBarStrokeWidth}
        height={healthBarForegroundHeight - healthBarStrokeWidth}
        fill={'var(--color-health-bar-foreground)'}
        rx={Math.max(0, cornerRadius - healthBarStrokeWidth / 2)}
        ry={Math.max(0, cornerRadius - healthBarStrokeWidth / 2)}
      />
    </g>
  );
}
