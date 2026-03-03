// src/shared/ui/OptionsPopover.tsx
import React, { useLayoutEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';

import { useDismissable } from '../lib/hooks/useDismissable';

interface OptionsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  targetRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

interface PopoverPosition {
  left: number;
  top: number;
}

const VIEWPORT_PADDING = 8;
const VERTICAL_OFFSET = 8;
const FALLBACK_WIDTH = 180;

export function OptionsPopover({ isOpen, onClose, targetRef, children }: OptionsPopoverProps) {
  const floatingRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PopoverPosition | null>(null);

  useDismissable([targetRef, floatingRef], isOpen, onClose);

  useLayoutEffect(() => {
    if (!isOpen || !targetRef.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const targetRect = targetRef.current?.getBoundingClientRect();
      if (!targetRect) {
        setPosition(null);
        return;
      }

      const floatingRect = floatingRef.current?.getBoundingClientRect();
      const popoverWidth = floatingRect?.width ?? FALLBACK_WIDTH;
      const popoverHeight = floatingRect?.height ?? 0;

      const minLeft = VIEWPORT_PADDING;
      const maxLeft = Math.max(minLeft, window.innerWidth - popoverWidth - VIEWPORT_PADDING);
      const preferredLeft = targetRect.left;
      const clampedLeft = Math.min(Math.max(preferredLeft, minLeft), maxLeft);

      const preferredTop = targetRect.bottom + VERTICAL_OFFSET;
      const wouldOverflowBottom = preferredTop + popoverHeight > window.innerHeight - VIEWPORT_PADDING;
      const fallbackTop = targetRect.top - popoverHeight - VERTICAL_OFFSET;
      const top = wouldOverflowBottom && fallbackTop >= VIEWPORT_PADDING ? fallbackTop : preferredTop;

      setPosition({
        left: clampedLeft,
        top: Math.max(VIEWPORT_PADDING, top),
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, targetRef]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && targetRef.current && position && (
        <motion.div
          ref={floatingRef}
          style={{
            position: 'fixed',
            left: position.left,
            top: position.top,
          }}
          className="bg-surface-0 border-accent-primary-hover z-[70] rounded-md border p-1 shadow-xl"
          role="menu"
          aria-orientation="vertical"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
