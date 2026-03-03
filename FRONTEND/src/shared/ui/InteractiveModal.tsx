import React, { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils/cn";

import { XMarkIcon } from "./Icons";

interface InteractiveModalProps {
  id: string;
  title: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  zIndex?: number;
  draggable?: boolean;
  initialOffsetX?: number;
  initialOffsetY?: number;
  dialogClassName?: string;
  contentClassName?: string;
  safeArea?: Partial<Record<"top" | "right" | "bottom" | "left", number>>;
}

type ModalPosition = {
  left: number;
  top: number;
};

type ModalSafeArea = Record<"top" | "right" | "bottom" | "left", number>;

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function clampModalPosition(
  modal: HTMLDivElement,
  position: ModalPosition,
  safeArea: ModalSafeArea,
): ModalPosition {
  const margin = 16;
  const width = modal.offsetWidth;
  const height = modal.offsetHeight;
  const minLeft = margin + safeArea.left;
  const minTop = margin + safeArea.top;
  const maxLeft = Math.max(minLeft, window.innerWidth - safeArea.right - width - margin);
  const maxTop = Math.max(minTop, window.innerHeight - safeArea.bottom - height - margin);

  return {
    left: clamp(position.left, minLeft, maxLeft),
    top: clamp(position.top, minTop, maxTop),
  };
}

export function InteractiveModal({
  id,
  title,
  isOpen,
  onClose,
  children,
  zIndex = 50,
  draggable = false,
  initialOffsetX = 0,
  initialOffsetY = 0,
  dialogClassName,
  contentClassName,
  safeArea,
}: InteractiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState<ModalPosition | null>(null);
  const safeAreaTop = Math.max(0, safeArea?.top ?? 0);
  const safeAreaRight = Math.max(0, safeArea?.right ?? 0);
  const safeAreaBottom = Math.max(0, safeArea?.bottom ?? 0);
  const safeAreaLeft = Math.max(0, safeArea?.left ?? 0);
  const normalizedSafeArea: ModalSafeArea = {
    top: safeAreaTop,
    right: safeAreaRight,
    bottom: safeAreaBottom,
    left: safeAreaLeft,
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const modal = modalRef.current;
      if (!modal) {
        return;
      }

      const width = modal.offsetWidth;
      const height = modal.offsetHeight;

      const nextPosition = clampModalPosition(
        modal,
        {
          left: (window.innerWidth - width) / 2 + initialOffsetX,
          top: (window.innerHeight - height) / 2 + initialOffsetY,
        },
        normalizedSafeArea,
      );

      setPosition(nextPosition);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [initialOffsetX, initialOffsetY, isOpen]);

  useEffect(() => {
    if (!isOpen || position === null) {
      return;
    }

    const modal = modalRef.current;
    if (!modal) {
      return;
    }

    setPosition((currentPosition) => {
      if (currentPosition === null) {
        return currentPosition;
      }

      const nextPosition = clampModalPosition(modal, currentPosition, normalizedSafeArea);
      if (
        nextPosition.left === currentPosition.left &&
        nextPosition.top === currentPosition.top
      ) {
        return currentPosition;
      }

      return nextPosition;
    });
  }, [isOpen, position, safeAreaBottom, safeAreaLeft, safeAreaRight, safeAreaTop]);

  useEffect(() => {
    if (!isOpen || position === null) {
      return;
    }

    const handleResize = () => {
      const modal = modalRef.current;
      if (!modal) {
        return;
      }

      setPosition((currentPosition) => {
        if (currentPosition === null) {
          return currentPosition;
        }

        const nextPosition = clampModalPosition(modal, currentPosition, normalizedSafeArea);
        if (
          nextPosition.left === currentPosition.left &&
          nextPosition.top === currentPosition.top
        ) {
          return currentPosition;
        }

        return nextPosition;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, position, safeAreaBottom, safeAreaLeft, safeAreaRight, safeAreaTop]);

  const handleHeaderMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable) {
      return;
    }

    if (event.target instanceof HTMLElement && event.target.closest("button")) {
      return;
    }

    const modal = modalRef.current;
    if (!modal) {
      return;
    }

    const rect = modal.getBoundingClientRect();
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const nextPosition = clampModalPosition(
        modal,
        {
          left: moveEvent.clientX - dragOffsetRef.current.x,
          top: moveEvent.clientY - dragOffsetRef.current.y,
        },
        normalizedSafeArea,
      );
      setPosition(nextPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    event.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      style={{
        position: "fixed",
        top: position?.top ?? undefined,
        left: position?.left ?? undefined,
        transform: position ? "none" : "translate(-50%, -50%)",
        zIndex,
      }}
      className={cn(
        "bg-surface-0 flex max-h-[min(92vh,64rem)] w-[min(92vw,78rem)] max-w-[92vw] flex-col overflow-hidden rounded-xl border border-surface-2/70 shadow-2xl",
        dialogClassName,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b border-surface-2/70 px-4 py-3",
          draggable ? "cursor-move select-none" : undefined,
        )}
        onMouseDown={handleHeaderMouseDown}
      >
        <h2
          id={`modal-title-${id}`}
          className="min-w-0 truncate pr-3 text-lg font-semibold"
        >
          {title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="rounded-full p-1 transition-colors hover:bg-surface-1 focus:outline-none focus:ring-1"
            aria-label="Fechar modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={cn("flex min-h-0 flex-grow overflow-hidden p-4", contentClassName)}>{children}</div>
    </div>
  );
}
