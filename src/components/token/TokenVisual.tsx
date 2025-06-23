import React from 'react';

export interface TokenMetrics {
  tokenRenderWidth: number;
  tokenRenderHeight: number;
  tokenColor: string;
  strokeColor: string;
  strokeWidth: number;
  cornerRadius: number;
  name: string; // Adicionado para o nome completo
  fontSize: number; // Mantido para o novo nome, pode ser ajustado
}

interface TokenVisualProps {
  metrics: TokenMetrics;
}

export function TokenVisual({
  metrics,
}:TokenVisualProps)  {
  return (
    <>
      <rect
        x="0" y="0" width={metrics.tokenRenderWidth} height={metrics.tokenRenderHeight} fill={metrics.tokenColor}
        stroke={metrics.strokeColor} strokeWidth={metrics.strokeWidth}
        rx={metrics.cornerRadius} ry={metrics.cornerRadius}
      />
      <rect
        x={metrics.strokeWidth / 2}
        y={metrics.strokeWidth / 2}
        width={Math.max(0, metrics.tokenRenderWidth - metrics.strokeWidth)}
        height={Math.max(0, metrics.tokenRenderHeight - metrics.strokeWidth)}
        fill="transparent"
        stroke="var(--color-surface-0)" // Very subtle shadow/inset effect
        strokeOpacity="0.5"
        strokeWidth={metrics.strokeWidth / 3}
        rx={Math.max(0, metrics.cornerRadius - metrics.strokeWidth / 3)}
        ry={Math.max(0, metrics.cornerRadius - metrics.strokeWidth / 3)}
        pointerEvents="none"
      />
    </>
  );
};

export default React.memo(TokenVisual);
