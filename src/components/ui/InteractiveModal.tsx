import React, { useState, useEffect, useRef, useCallback } from "react";
import { XMarkIcon, MinimizeIcon, RestoreWindowIcon } from "../icons";

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
  onResize?: (newWidth: number, newHeight: number) => void; // Adicionado para redimensionamento
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: string | number; // Can be 'auto' or a number
  minWidth?: number; // Adicionado para redimensionamento
  minHeight?: number; // Adicionado para redimensionamento
  maxWidth?: number; // Adicionado para redimensionamento
  maxHeight?: number; // Adicionado para redimensionamento
  zIndex?: number;
}

const MINIMIZED_HEIGHT = 40; // px
const MINIMIZED_WIDTH = 250; // px
const HEADER_HEIGHT = 48; // Approximate px height of the header for y clamping

const InteractiveModal: React.FC<InteractiveModalProps> = ({
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
  initialHeight = "auto",
  minWidth = 200, // Default min width
  minHeight = 150, // Default min height
  maxWidth = window.innerWidth, // Default max width
  maxHeight = window.innerHeight, // Default max height
  zIndex = 50,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [resizeDirection, setResizeDirection] = useState("");

  // Update internal width/height when initialWidth/Height props change
  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
  }, [initialWidth, initialHeight]);

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
      if (isMinimized) return; // No dragging or resizing when minimized

      const target = event.target as HTMLElement;
      const modalRect = modalRef.current?.getBoundingClientRect();

      if (!modalRect) return;

      // Check for resize handles
      const resizeHandle = target.closest(".resize-handle");
      if (resizeHandle) {
        setIsResizing(true);
        setResizeDirection(
          Array.from(resizeHandle.classList).find((cls) =>
            cls.startsWith("resize-")
          ) || ""
        );
        setResizeStart({
          x: event.clientX,
          y: event.clientY,
          width: modalRect.width,
          height: modalRect.height,
        });
        event.preventDefault(); // Prevent text selection
        return;
      }

      // Only allow dragging by the header
      if (target.closest(".modal-header")) {
        setIsDragging(true);
        setDragStartOffset({
          x: event.clientX - modalRect.left,
          y: event.clientY - modalRect.top,
        });
        event.preventDefault(); // Prevent text selection
      }
    },
    [isMinimized]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        let newX = event.clientX - dragStartOffset.x;
        let newY = event.clientY - dragStartOffset.y;

        // Clamp position to viewport
        const modalCurrentWidth = modalRef.current?.offsetWidth || width;
        const modalCurrentHeight =
          modalRef.current?.offsetHeight ||
          (typeof height === "number" ? height : 400); // estimate if auto

        newX = Math.max(
          0,
          Math.min(newX, window.innerWidth - modalCurrentWidth)
        );
        newY = Math.max(
          0,
          Math.min(newY, window.innerHeight - modalCurrentHeight)
        );

        // Ensure header is always visible for y-axis
        newY = Math.max(0, Math.min(newY, window.innerHeight - HEADER_HEIGHT));

        onPositionChange({ x: newX, y: newY });
      } else if (isResizing) {
        let newWidth = width as number;
        let newHeight = height as number;
        let newX = position.x;
        let newY = position.y;

        const currentModalLeft = position.x;
        const currentModalTop = position.y;
        const currentModalRight =
          position.x + (modalRef.current?.offsetWidth || (width as number));
        const currentModalBottom =
          position.y + (modalRef.current?.offsetHeight || (height as number));

        if (resizeDirection.includes("e")) {
          newWidth = event.clientX - currentModalLeft;
        }
        if (resizeDirection.includes("s")) {
          newHeight = event.clientY - currentModalTop;
        }
        if (resizeDirection.includes("w")) {
          newWidth = currentModalRight - event.clientX;
          newX = event.clientX;
        }
        if (resizeDirection.includes("n")) {
          newHeight = currentModalBottom - event.clientY;
          newY = event.clientY;
        }

        // Apply min/max constraints to new dimensions
        newWidth = Math.min(maxWidth, Math.max(minWidth, newWidth));
        newHeight = Math.min(maxHeight, Math.max(minHeight, newHeight));

        // Re-clamp newX and newY based on the final clamped dimensions
        newX = Math.max(0, Math.min(newX, window.innerWidth - newWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - newHeight));

        setWidth(newWidth);
        setHeight(newHeight);
        onPositionChange({ x: newX, y: newY });
        onResize?.(newWidth, newHeight);
      }
    },
    [
      isDragging,
      isResizing,
      dragStartOffset,
      resizeStart,
      resizeDirection,
      onPositionChange,
      onResize,
      position,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      width,
      height,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection("");
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  if (!isOpen) return null;

  const style: React.CSSProperties = {
    position: "fixed",
    top: isMinimized ? undefined : `${position.y}px`,
    left: isMinimized ? "20px" : `${position.x}px`, // Minimized to bottom-left
    bottom: isMinimized ? "20px" : undefined,
    width: `${isMinimized ? MINIMIZED_WIDTH : width}px`,
    height:
      typeof height === "number"
        ? `${isMinimized ? MINIMIZED_HEIGHT : height}px`
        : isMinimized
        ? `${MINIMIZED_HEIGHT}px`
        : height,
    zIndex,
    minHeight: isMinimized ? `${MINIMIZED_HEIGHT}px` : undefined, // Enforce min height for minimized state
  };

  if (isMinimized) {
    return (
      <div
        ref={modalRef}
        style={style}
        className="bg-surface-0 border rounded-md shadow-xl flex items-center justify-between px-3"
        role="dialog"
        aria-label={`${title} (Minimizado)`}
        aria-modal="false"
      >
        <span className="text-sm truncate font-medium">{title}</span>
        <button
          onClick={onRestore}
          className="p-1 rounded-full focus:outline-none focus:ring-1 "
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
      className={`bg-surface-0 rounded-lg shadow-xl flex flex-col overflow-hidden border border-red-600   ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      {/* Header */}
      <div
        className={`modal-header flex items-center justify-between p-3 border-b ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <h2 id={`modal-title-${id}`} className="text-lg font-semibold truncate">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
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
      <div className="p-3 overflow-y-auto flex-grow ">{children}</div>

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
  );
};

export default InteractiveModal;
