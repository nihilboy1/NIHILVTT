import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { XMarkIcon, MinimizeIcon, RestoreWindowIcon } from "../icons";

interface InteractiveModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialWidth?: number;
  initialHeight?: string | number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  zIndex?: number;
  onResizeEnd?: (newWidth: number, newHeight: number) => void;
  onPositionChangeEnd?: (newPosition: { x: number; y: number }) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>; // Adicionado containerRef
  minimizedTitle?: string; // Adicionado para o título do modal minimizado
}

const MINIMIZED_HEIGHT_REM = 2.5;
const MINIMIZED_WIDTH_REM = 15.625;
const HEADER_HEIGHT_REM = 3;

export function InteractiveModal({
  id,
  title,
  isOpen,
  onClose,
  children,
  initialPosition = { x: 100, y: 100 },
  initialWidth = 450,
  initialHeight = "auto",
  minWidth = 200,
  minHeight = 150,
  maxWidth = window.innerWidth,
  maxHeight = window.innerHeight,
  zIndex = 50,
  onResizeEnd,
  onPositionChangeEnd,
  containerRef, // Receber containerRef
  minimizedTitle, // Receber minimizedTitle
}: InteractiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [minimizedPosition, setMinimizedPosition] = useState({ x: 0, y: 0 }); // Posição padrão para o canto inferior esquerdo
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeData, setResizeData] = useState<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    direction: string;
  } | null>(null);

  // Efeito para inicializar posição e tamanho
  useEffect(() => {
    setPosition(initialPosition);
    // Calcula a posição inicial do modal minimizado no canto inferior esquerdo
    const initialMinimizedX = 0;
    const initialMinimizedY = window.innerHeight - MINIMIZED_HEIGHT_REM * 16;
    setMinimizedPosition({ x: initialMinimizedX, y: initialMinimizedY });
    setWidth(initialWidth);
    setHeight(initialHeight);
    setIsMinimized(false);
  }, [initialPosition, initialWidth, initialHeight]);

  // Calcula os limites de arraste dinamicamente com base no containerRef
  const [draggableBounds, setDraggableBounds] = useState({
    left: 0,
    top: 0,
    right:
      window.innerWidth - (typeof width === "number" ? width : initialWidth),
    bottom: window.innerHeight - HEADER_HEIGHT_REM * 16,
  });

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef?.current && modalRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const modalRect = modalRef.current.getBoundingClientRect();

        setDraggableBounds({
          left: containerRect.left,
          top: containerRect.top,
          right: containerRect.right - modalRect.width,
          bottom: containerRect.bottom - HEADER_HEIGHT_REM * 16, // Garante que o header esteja sempre visível
        });
      } else {
        // Fallback para o viewport se containerRef não estiver disponível
        setDraggableBounds({
          left: 0,
          top: 0,
          right:
            window.innerWidth -
            (modalRef.current?.offsetWidth ||
              (typeof width === "number" ? width : initialWidth)),
          bottom: window.innerHeight - HEADER_HEIGHT_REM * 16,
        });
      }
    };

    window.addEventListener("resize", updateBounds);
    updateBounds(); // Chamar uma vez para definir os limites iniciais

    // Atualizar bounds quando o modal ou o container mudarem de tamanho/posição
    const observer = new ResizeObserver(updateBounds);
    if (containerRef?.current) observer.observe(containerRef.current);
    if (modalRef.current) observer.observe(modalRef.current);

    return () => {
      window.removeEventListener("resize", updateBounds);
      observer.disconnect();
    };
  }, [containerRef, width, height, initialWidth, modalRef.current]);

  // Efeito para fechar o modal com a tecla Esc
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen && !isMinimized) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isMinimized, onClose]);

  // Início do redimensionamento
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isMinimized) return;

      const target = event.target as HTMLElement;
      const modalRect = modalRef.current?.getBoundingClientRect();

      if (!modalRect) return;

      const resizeHandle = target.closest(".resize-handle");
      if (resizeHandle) {
        setIsResizing(true);
        setResizeData({
          startX: event.clientX,
          startY: event.clientY,
          startWidth: modalRect.width,
          startHeight: modalRect.height,
          direction:
            Array.from(resizeHandle.classList).find((cls) =>
              cls.startsWith("resize-")
            ) || "",
        });
        event.preventDefault();
        return;
      }
    },
    [isMinimized]
  );

  // Movimento do mouse para redimensionamento
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isResizing && resizeData) {
        const { startX, startY, startWidth, startHeight, direction } =
          resizeData;
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = position.x;
        let newY = position.y;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        // Calcular novas dimensões e posição
        if (direction.includes("e")) {
          newWidth = startWidth + deltaX;
        }
        if (direction.includes("s")) {
          newHeight = startHeight + deltaY;
        }
        if (direction.includes("w")) {
          newWidth = startWidth - deltaX;
          newX = position.x + deltaX; // Mover a posição X
        }
        if (direction.includes("n")) {
          newHeight = startHeight - deltaY;
          newY = position.y + deltaY; // Mover a posição Y
        }

        // Aplicar limites de min/max para largura e altura
        newWidth = Math.min(maxWidth, Math.max(minWidth, newWidth));
        newHeight = Math.min(maxHeight, Math.max(minHeight, newHeight));

        // Ajustar a posição X e Y para garantir que o modal não saia da tela
        // e que o redimensionamento a partir do topo/esquerda funcione corretamente
        if (direction.includes("w")) {
          // Se a nova largura for menor que a mínima, ajustar newX para manter a largura mínima
          if (newWidth === minWidth && startWidth - deltaX > minWidth) {
            newX = position.x + (startWidth - minWidth);
          }
          // Clamp newX to prevent going off-screen left
          newX = Math.max(0, newX);
        }
        if (direction.includes("n")) {
          // Se a nova altura for menor que a mínima, ajustar newY para manter a altura mínima
          if (newHeight === minHeight && startHeight - deltaY > minHeight) {
            newY = position.y + (startHeight - minHeight);
          }
          // Clamp newY to prevent going off-screen top
          newY = Math.max(0, newY);
        }

        // Atualizar estados
        setWidth(newWidth);
        setHeight(newHeight);
        setPosition({ x: newX, y: newY });
      }
    },
    [
      isResizing,
      resizeData,
      position,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      width,
      height,
    ]
  );

  // Fim do redimensionamento
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeData(null); // Limpar resizeData

    if (
      onResizeEnd &&
      typeof width === "number" &&
      typeof height === "number"
    ) {
      onResizeEnd(width, height);
    }
  }, [onResizeEnd, width, height]);

  // Adicionar e remover event listeners globais
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    if (isMinimized) {
      setMinimizedPosition(newPosition); // Atualiza a posição do modal minimizado
    } else {
      setPosition(newPosition);
    }
    if (onPositionChangeEnd) {
      onPositionChangeEnd(newPosition);
    }
  };

  if (!isOpen) return null;

  const style: React.CSSProperties = {
    position: "absolute", // Adicionado para garantir posicionamento independente
    width: `${isMinimized ? MINIMIZED_WIDTH_REM : width / 16}rem`, // Convert px to rem
    height:
      typeof height === "number"
        ? `${isMinimized ? MINIMIZED_HEIGHT_REM : height / 16}rem` // Convert px to rem
        : isMinimized
        ? `${MINIMIZED_HEIGHT_REM}rem`
        : height,
    zIndex,
    minHeight: isMinimized ? `${MINIMIZED_HEIGHT_REM}rem` : undefined, // Enforce min height for minimized state
  };

  const handleMinimize = () => {
    // Define a posição do modal minimizado para o canto inferior esquerdo, com um pequeno offset
    // O offset de 16px (1rem) para X e 40px (2.5rem) para Y é um palpite baseado na imagem
    // para posicionar acima da barra de tarefas e com um pequeno padding.
    const offsetBottom = 25; // Ajuste conforme a altura da barra de tarefas ou preferência
    const offsetLeft = 75; // Ajuste para o padding esquerdo

    const newMinimizedX = offsetLeft;
    const newMinimizedY =
      window.innerHeight - MINIMIZED_HEIGHT_REM * 16 - offsetBottom;
    setMinimizedPosition({ x: newMinimizedX, y: newMinimizedY });
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setPosition(initialPosition); // Restaura para a posição inicial definida
    setIsMinimized(false);
  };

  if (isMinimized) {
    return (
      <Draggable
        handle=".modal-header-minimized"
        nodeRef={modalRef as React.RefObject<HTMLElement>} // Cast para HTMLElement
        position={minimizedPosition} // Usa a posição do modal minimizado
        onStop={handleDragStop}
        bounds={draggableBounds} // Aplica os limites calculados dinamicamente
        axis="both"
      >
        <div
          ref={modalRef}
          style={style}
          className=" bg-surface-0  border rounded-md shadow-2xl flex items-center justify-between px-3"
          role="dialog"
          aria-label={`${title} (Minimizado)`}
          aria-modal="false"
        >
          <div className="modal-header-minimized flex-grow cursor-grab py-2">
            <span className="text-sm truncate font-medium">
              {minimizedTitle || title}
            </span>
          </div>
          <button
            onClick={handleRestore}
            className="p-1 rounded-full focus:outline-none focus:ring-1 "
            aria-label="Restaurar modal"
          >
            <RestoreWindowIcon className="w-4 h-4" />
          </button>
        </div>
      </Draggable>
    );
  }

  return (
    <Draggable
      handle=".modal-header"
      nodeRef={modalRef as React.RefObject<HTMLElement>} // Cast para HTMLElement
      position={position}
      onStop={handleDragStop}
      bounds={draggableBounds} // Aplica os limites calculados dinamicamente
      axis="both" // Permite o arraste em ambos os eixos (horizontal e vertical)
    >
      <div
        ref={modalRef}
        style={style}
        className={`bg-surface-0 rounded-lg shadow-xl flex flex-col overflow-hidden `}
        onMouseDown={handleMouseDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${id}`}
      >
        {/* Header */}
        <div
          className={`modal-header flex items-center justify-between p-3 border-b cursor-grab`}
        >
          <h2
            id={`modal-title-${id}`}
            className="text-lg font-semibold truncate"
          >
            {title}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMinimize}
              className="p-1 rounded-full focus:outline-none focus:ring-1"
              aria-label="Minimizar modal"
            >
              <MinimizeIcon className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full focus:outline-none focus:ring-1"
              aria-label="Fechar modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 overflow-hidden flex-grow ">{children}</div>

        {/* Resize Handles */}
        <div className="resize-handle resize-s" />
        <div className="resize-handle resize-e" />
        <div className="resize-handle resize-n" />
        <div className="resize-handle resize-w" />
        <div className="resize-handle resize-se" />
        <div className="resize-handle resize-sw" />
        <div className="resize-handle resize-ne" />
        <div className="resize-handle resize-nw" />
      </div>
    </Draggable>
  );
}
