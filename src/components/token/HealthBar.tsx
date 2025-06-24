
const HEALTH_BAR_HEIGHT = 4; // Altura fixa da barra de vida
const HEALTH_BAR_MARGIN_TOP = 2; // Margem entre a barra de vida e o topo do token
const HEALTH_BAR_CORNER_RADIUS = 1; // Raio da borda da barra de vida

interface HealthBarProps {
  currentHp: number | undefined;
  maxHp: number | undefined;
  tokenRenderWidth: number; // Usar a largura do token para a barra de vida
  zoomLevel: number;
}

export function HealthBar({
  currentHp,
  maxHp,
  tokenRenderWidth,
  zoomLevel,
}: HealthBarProps) {
  const showHealthBar =
    maxHp !== undefined && maxHp > 0 && currentHp !== undefined;
  if (!showHealthBar) {
    return null;
  }

  const actualCurrentHp = currentHp ?? 0;
  const actualMaxHp = maxHp ?? 0;
  const clampedCurrentHp = Math.max(0, Math.min(actualCurrentHp, actualMaxHp));
  const healthPercentage =
    actualMaxHp > 0 ? clampedCurrentHp / actualMaxHp : 0;

  const healthBarTotalWidth = tokenRenderWidth;
  const healthBarHeightScaled = Math.max(1, HEALTH_BAR_HEIGHT / zoomLevel);
  const healthBarStrokeWidth = Math.max(0.2, 0.5 / zoomLevel);

  // Posição Y da barra de vida (acima do token)
  const healthBarY =
    -healthBarHeightScaled - HEALTH_BAR_MARGIN_TOP / zoomLevel;

  const healthBarForegroundWidth = healthBarTotalWidth * healthPercentage;

  const cornerRadius = Math.min(
    HEALTH_BAR_CORNER_RADIUS / zoomLevel,
    HEALTH_BAR_CORNER_RADIUS
  );

  return (
    <g  transform={`translate(0, ${healthBarY})`}>
      {/* Background da barra de vida */}
      <rect
        x="0"
        y="0"
        width={healthBarTotalWidth}
        height={healthBarHeightScaled}
        fill={"var(--color-surface-0)"}
        rx={cornerRadius}
        ry={cornerRadius}
        stroke={"var(--color-surface-0)"}
        strokeWidth={healthBarStrokeWidth}
      />
      <rect
        x={healthBarStrokeWidth / 2}
        y={healthBarStrokeWidth / 2}
        width={healthBarForegroundWidth - healthBarStrokeWidth}
        height={healthBarHeightScaled - healthBarStrokeWidth}
        fill={"var(--color-feedback-positive-hover)"}
        rx={Math.max(0, cornerRadius - healthBarStrokeWidth / 2)}
        ry={Math.max(0, cornerRadius - healthBarStrokeWidth / 2)}
      />
    </g>
  );
}

// visto
