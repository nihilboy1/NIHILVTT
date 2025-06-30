export interface TokenVisualMetrics {
  tokenRenderWidth: number;
  tokenRenderHeight: number;
  imageUrl: string;
  name: string;
  fontSize: number;
}

interface TokenVisualProps {
  metrics: TokenVisualMetrics;
}

export function TokenVisual({ metrics }: TokenVisualProps) {
  return (
    <image
      href={metrics.imageUrl}
      x="0"
      y="0"
      width={metrics.tokenRenderWidth}
      height={metrics.tokenRenderHeight}
      // Adiciona um fallback visual para imagens quebradas, se necessário,
      // mas a tag <img> nativamente já mostra um ícone de quebra.
      // Para SVG, 'image' tag não tem um 'alt' ou 'onerror' direto como HTML <img>.
      // A validação de imagem quebrada será tratada pelo navegador.
    />
  );
}
