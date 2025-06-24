import React from 'react';

export interface TokenMetrics {
  tokenRenderWidth: number;
  tokenRenderHeight: number;
  imageUrl: string; // Nova propriedade para a URL da imagem
  strokeColor: string;
  strokeWidth: number;
  cornerRadius: number;
  name: string; // Adicionado para o nome completo
  fontSize: number; // Mantido para o novo nome, pode ser ajustado
}

interface TokenVisualProps {
  metrics: TokenMetrics;
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

export default React.memo(TokenVisual);
