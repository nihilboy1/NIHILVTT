import type { Area } from 'react-easy-crop';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export async function getCroppedImageBlob(imageSrc: string, croppedAreaPixels: Area): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Nao foi possivel processar imagem.');
  }

  const sourceWidth = Math.max(1, Math.round(croppedAreaPixels.width));
  const sourceHeight = Math.max(1, Math.round(croppedAreaPixels.height));
  const maxOutputWidth = 1024;
  const scale = Math.min(1, maxOutputWidth / sourceWidth);
  const outputWidth = Math.max(1, Math.round(sourceWidth * scale));
  const outputHeight = Math.max(1, Math.round(sourceHeight * scale));

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  ctx.drawImage(
    image,
    Math.round(croppedAreaPixels.x),
    Math.round(croppedAreaPixels.y),
    sourceWidth,
    sourceHeight,
    0,
    0,
    outputWidth,
    outputHeight,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Nao foi possivel gerar o arquivo de imagem.'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', 0.9);
  });
}
