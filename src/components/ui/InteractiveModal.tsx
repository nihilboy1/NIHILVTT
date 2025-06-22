import React, { useState, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon, MinimizeIcon, RestoreWindowIcon } from '../icons';

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
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: string | number; // Can be 'auto' or a number
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
  children,
  initialWidth = 450,
  initialHeight = 'auto',
  zIndex = 50,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });

  const currentWidth = isMinimized ? MINIMIZED_WIDTH : initialWidth;
  const currentHeight = isMinimized ? MINIMIZED_HEIGHT : initialHeight;


  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen && !isMinimized) { // Only listen for Esc when fully open
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, isMinimized, onClose]);


  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMinimized) return; // No dragging when minimized
    // Only allow dragging by the header
    if ((event.target as HTMLElement).closest('.modal-header')) {
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
  }, [isMinimized]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || isMinimized) return;

      let newX = event.clientX - dragStartOffset.x;
      let newY = event.clientY - dragStartOffset.y;
      
      // Clamp position to viewport
      const modalCurrentWidth = modalRef.current?.offsetWidth || currentWidth;
      const modalCurrentHeight = modalRef.current?.offsetHeight || (typeof currentHeight === 'number' ? currentHeight : 400); // estimate if auto

      newX = Math.max(0, Math.min(newX, window.innerWidth - modalCurrentWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - modalCurrentHeight));
      
      // Ensure header is always visible for y-axis
      newY = Math.max(0, Math.min(newY, window.innerHeight - HEADER_HEIGHT));


      onPositionChange({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartOffset, onPositionChange, isMinimized, currentWidth, currentHeight]);

  if (!isOpen) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: isMinimized ? undefined : `${position.y}px`,
    left: isMinimized ? '20px' : `${position.x}px`, // Minimized to bottom-left
    bottom: isMinimized ? '20px' : undefined,
    width: `${currentWidth}px`,
    height: typeof currentHeight === 'number' ? `${currentHeight}px` : currentHeight,
    zIndex,
    minHeight: isMinimized ? `${MINIMIZED_HEIGHT}px` : undefined, // Enforce min height for minimized state
  };

  if (isMinimized) {
    return (
      <div
        ref={modalRef}
        style={style}
        className="bg-theme-toolbar-bg border border-theme-border-active rounded-md shadow-xl flex items-center justify-between px-3"
        role="dialog"
        aria-label={`${title} (Minimizado)`}
        aria-modal="false" 
      >
        <span className="text-sm text-theme-foreground truncate font-medium">{title}</span>
        <button
          onClick={onRestore}
          className="p-1 text-theme-foreground hover:bg-theme-accent-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-theme-border-active"
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
      className={`bg-theme-toolbar-bg rounded-lg shadow-xl flex flex-col overflow-hidden border border-theme-border-inactive ${isDragging ? 'cursor-grabbing' : ''}`}
      onMouseDown={handleMouseDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      {/* Header */}
      <div className={`modal-header flex items-center justify-between p-3 border-b border-theme-border-inactive bg-theme-input-bg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
        <h2 id={`modal-title-${id}`} className="text-lg font-semibold text-theme-foreground truncate">
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMinimize}
            className="p-1 text-theme-text-secondary hover:text-theme-accent-primary rounded-full focus:outline-none focus:ring-1 focus:ring-theme-border-active"
            aria-label="Minimizar modal"
          >
            <MinimizeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-theme-text-secondary hover:text-theme-accent-negative rounded-full focus:outline-none focus:ring-1 focus:ring-theme-border-active"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-grow text-theme-foreground">
        {children}
      </div>
    </div>
  );
};

export default InteractiveModal;
