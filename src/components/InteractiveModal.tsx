import React, { useState, useEffect, useRef, useCallback } from "react";
import { XMarkIcon, MinimizeIcon, RestoreWindowIcon } from "./icons";

interface InteractiveModalProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  onResize?: (newWidth: number, newHeight: number) => void; // Adicionado para notificar o pai sobre o redimensionamento
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number; // Alterado para number, 'auto' será tratado internamente
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  zIndex?: number;
}

const MINIMIZED_HEIGHT = 40; // px
const MINIMIZED_WIDTH = 250; // px
const HEADER_HEIGHT = 48; // Approximate px height of the header for y clamping

export function InteractiveModal({
  id,
  title,
  isOpen,
  isMinimized,
  position,
  onClose,
  onMinimize,
  onRestore,
  onPositionChange,
  onResize,
  children,
  initialWidth = 450,
  initialHeight = 620, // Valor padrão para altura, já que 'auto' será tratado internamente
  minWidth = 300, // Largura mínima padrão
  minHeight = 200, // Altura mínima padrão
  maxWidth, // Largura máxima, se não fornecida, será a inicial
  maxHeight, // Altura máxima, se não fornecida, será a inicial
  zIndex = 50,
}: InteractiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });

  // Estados para largura e altura controladas pelo redimensionamento
  const [currentWidth, setCurrentWidth] = useState(initialWidth);
  const [currentHeight, setCurrentHeight] = useState(initialHeight);

  // Sincroniza as dimensões iniciais com os estados internos
  useEffect(() => {
    if (!isMinimized) {
      setCurrentWidth(initialWidth);
      setCurrentHeight(initialHeight);
    }
  }, [initialWidth, initialHeight, isMinimized]);

  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(""); // 'n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'
  const [resizeStartMousePos, setResizeStartMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [resizeStartSize, setResizeStartSize] = useState({
    width: 0,
    height: 0,
  });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 }); // Para redimensionamento que afeta a posição (top/left)

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen && !isMinimized) {
      // Only listen for Esc when fully open
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isMinimized, onClose]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isMinimized) return; // No dragging when minimized
      // Only allow dragging by the header
      if ((event.target as HTMLElement).closest(".modal-header")) {
        setIsDragging(true);
        const modalRect = modalRef.current?.getBoundingClientRect();
        if (modalRect) {
          setDragStartOffset({
            x: event.clientX - modalRect.left,
            y: event.clientY - modalRect.top,
          });
        }
        event.preventDefault(); // Prevent text selection
      }
    },
    [isMinimized]
  );

  const handleResizeMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, direction: string) => {
      if (isMinimized) return;
      setIsResizing(true);
      setResizeDirection(direction);
      setResizeStartMousePos({ x: event.clientX, y: event.clientY });
      setResizeStartSize({ width: currentWidth, height: currentHeight });
      setResizeStartPos({ x: position.x, y: position.y });
      event.preventDefault();
      event.stopPropagation(); // Evita que o evento de arrastar do cabeçalho seja acionado
    },
    [isMinimized, currentWidth, currentHeight, position.x, position.y]
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || isMinimized) return;

      let newX = event.clientX - dragStartOffset.x;
      let newY = event.clientY - dragStartOffset.y;

      // Clamp position to viewport
      const modalCurrentWidth = modalRef.current?.offsetWidth || currentWidth;
      const modalCurrentHeight =
        modalRef.current?.offsetHeight || currentHeight;

      newX = Math.max(0, Math.min(newX, window.innerWidth - modalCurrentWidth));
      newY = Math.max(
        0,
        Math.min(newY, window.innerHeight - modalCurrentHeight)
      );

      // Ensure header is always visible for y-axis
      newY = Math.max(0, Math.min(newY, window.innerHeight - HEADER_HEIGHT));

      onPositionChange({ x: newX, y: newY });
    };

    const handleResizeMouseMove = (event: MouseEvent) => {
      if (!isResizing || isMinimized) return;

      const dx = event.clientX - resizeStartMousePos.x;
      const dy = event.clientY - resizeStartMousePos.y;

      let newWidth = resizeStartSize.width;
      let newHeight = resizeStartSize.height;
      let newX = position.x;
      let newY = position.y;

      const effectiveMaxWidth = maxWidth ?? window.innerWidth;
      const effectiveMaxHeight = maxHeight ?? window.innerHeight;

      switch (resizeDirection) {
        case "s":
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height + dy)
          );
          break;
        case "e":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width + dx)
          );
          break;
        case "se":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width + dx)
          );
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height + dy)
          );
          break;
        case "n":
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height - dy)
          );
          newY = Math.max(
            0,
            Math.min(resizeStartPos.y + dy, window.innerHeight - HEADER_HEIGHT)
          );
          break;
        case "w":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width - dx)
          );
          newX = Math.max(
            0,
            Math.min(
              resizeStartPos.x + dx,
              window.innerWidth - modalRef.current!.offsetWidth
            )
          );
          break;
        case "nw":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width - dx)
          );
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height - dy)
          );
          newX = Math.max(
            0,
            Math.min(
              resizeStartPos.x + dx,
              window.innerWidth - modalRef.current!.offsetWidth
            )
          );
          newY = Math.max(
            0,
            Math.min(resizeStartPos.y + dy, window.innerHeight - HEADER_HEIGHT)
          );
          break;
        case "ne":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width + dx)
          );
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height - dy)
          );
          newY = Math.max(
            0,
            Math.min(resizeStartPos.y + dy, window.innerHeight - HEADER_HEIGHT)
          );
          break;
        case "sw":
          newWidth = Math.min(
            effectiveMaxWidth,
            Math.max(minWidth, resizeStartSize.width - dx)
          );
          newHeight = Math.min(
            effectiveMaxHeight,
            Math.max(minHeight, resizeStartSize.height + dy)
          );
          newX = Math.max(
            0,
            Math.min(
              resizeStartPos.x + dx,
              window.innerWidth - modalRef.current!.offsetWidth
            )
          );
          break;
      }

      setCurrentWidth(newWidth);
      setCurrentHeight(newHeight);
      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (isResizing) {
        setIsResizing(false);
        setResizeDirection("");
        if (onResize) {
          onResize(currentWidth, currentHeight);
        }
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else if (isResizing) {
      window.addEventListener("mousemove", handleResizeMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleResizeMouseMove);
    };
  }, [
    isDragging,
    dragStartOffset,
    onPositionChange,
    isMinimized,
    currentWidth,
    currentHeight,
    isResizing,
    resizeDirection,
    resizeStartMousePos,
    resizeStartSize,
    resizeStartPos,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    position.x,
    position.y,
    onResize,
  ]);

  if (!isOpen) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: isMinimized ? undefined : `${position.y}px`,
    left: isMinimized ? "20px" : `${position.x}px`, // Minimized to bottom-left
    bottom: isMinimized ? "20px" : undefined,
    width: `${currentWidth}px`,
    height: `${currentHeight}px`, // Sempre em px agora
    zIndex,
    minHeight: isMinimized ? `${MINIMIZED_HEIGHT}px` : undefined, // Enforce min height for minimized state
    minWidth: isMinimized ? `${MINIMIZED_WIDTH}px` : undefined, // Enforce min width for minimized state
  };

  if (isMinimized) {
    return (
      <div
        ref={modalRef}
        style={style}
        className="bg-toolbar-bg border border-border-active rounded-md shadow-xl flex items-center justify-between px-3"
        role="dialog"
        aria-label={`${title} (Minimizado)`}
        aria-modal="false"
      >
        <span className="text-sm text-foreground truncate font-medium">
          {title}
        </span>
        <button
          onClick={onRestore}
          className="p-1 text-foreground hover:bg-accent-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-border-active"
          aria-label="Restaurar modal"
        >
          <RestoreWindowIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      ref={modalRef}
      style={style}
      className={`bg-toolbar-bg rounded-lg shadow-xl flex flex-col overflow-hidden border border-border-inactive ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      {/* Header */}
      <div
        className={`modal-header flex items-center justify-between p-3 border-b border-border-inactive bg-input-bg ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <h2
          id={`modal-title-${id}`}
          className="text-lg font-semibold text-foreground truncate"
        >
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="p-1 text-text-secondary hover:text-accent-primary rounded-full focus:outline-none focus:ring-1 focus:ring-border-active"
            aria-label="Minimizar modal"
          >
            <MinimizeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-accent-negative rounded-full focus:outline-none focus:ring-1 focus:ring-border-active"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-grow text-foreground">
        {children}
      </div>

      {/* Resize handles */}
      <div
        className="resize-handle resize-s"
        onMouseDown={(e) => handleResizeMouseDown(e, "s")}
      />
      <div
        className="resize-handle resize-e"
        onMouseDown={(e) => handleResizeMouseDown(e, "e")}
      />
      <div
        className="resize-handle resize-n"
        onMouseDown={(e) => handleResizeMouseDown(e, "n")}
      />
      <div
        className="resize-handle resize-w"
        onMouseDown={(e) => handleResizeMouseDown(e, "w")}
      />
      <div
        className="resize-handle resize-se"
        onMouseDown={(e) => handleResizeMouseDown(e, "se")}
      />
      <div
        className="resize-handle resize-sw"
        onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
      />
      <div
        className="resize-handle resize-ne"
        onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
      />
      <div
        className="resize-handle resize-nw"
        onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
      />
    </div>
  );
}
