import { useEffect, useRef } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  squareSize?: number;
  className?: string;
  interactive?: boolean;
  animated?: boolean;
}

export function Squares({
  direction = 'diagonal',
  speed = 0.2,
  squareSize = 50,
  className,
  interactive = true,
  animated = true,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const computedStyle = getComputedStyle(canvas);
    const borderColor =
      computedStyle.getPropertyValue('--color-surface-2').trim() || '#4e4e50';
    const hoverFillColor =
      computedStyle.getPropertyValue('--color-surface-2').trim() || '#4e4e50';
    const surfaceColor =
      computedStyle.getPropertyValue('--color-surface-0').trim() || '#060606';

    canvas.style.background = surfaceColor;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      const hoveredSquare = hoveredSquareRef.current;

      ctx.lineWidth = 0.5;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            interactive &&
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
      );

      gradient.addColorStop(0, 'rgba(6, 6, 6, 0)');
      gradient.addColorStop(1, surfaceColor);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);

      switch (direction) {
        case 'right':
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize,
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize,
      );

      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      hoveredSquareRef.current = null;
    };

    window.addEventListener('resize', resizeCanvas);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    resizeCanvas();
    if (animated) {
      requestRef.current = requestAnimationFrame(updateAnimation);
    } else {
      drawGrid();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [direction, speed, squareSize, interactive, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full border-none block ${className || ''}`}
    />
  );
}
