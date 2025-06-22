import React, { useEffect, useRef, useState } from 'react';

interface OptionsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  targetRef: React.RefObject<HTMLElement | null>; // Alterado para aceitar null
  children: React.ReactNode;
}

const OptionsPopover: React.FC<OptionsPopoverProps> = ({ isOpen, onClose, targetRef, children }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, opacity: 0 });

  useEffect(() => {
    if (isOpen && targetRef.current && popoverRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const popoverHeight = popoverRef.current.offsetHeight;
      const popoverWidth = popoverRef.current.offsetWidth;

      let topPosition = targetRect.bottom + 8;
      let leftPosition = targetRect.left;

      // Prioriza posicionar abaixo, mas se não couber, tenta acima
      if (topPosition + popoverHeight > window.innerHeight) {
        topPosition = targetRect.top - popoverHeight - 8;
      }

      // Prioriza alinhar à esquerda do target, mas se não couber, tenta alinhar à direita
      if (leftPosition + popoverWidth >= window.innerWidth) { // Changed > to >=
        leftPosition = targetRect.right - popoverWidth;
      }

      // Clamping final para garantir que não saia da tela (vertical)
      if (topPosition < 0) {
        topPosition = 0; // Clamp to top of screen
      }
      if (topPosition + popoverHeight > window.innerHeight) {
        topPosition = window.innerHeight - popoverHeight; // Clamp to bottom of screen
      }
      // Clamping final para garantir que não saia da tela (horizontal)
      if (leftPosition < 0) {
        leftPosition = 0; // Clamp to left of screen
      }
      if (leftPosition + popoverWidth > window.innerWidth) {
        leftPosition = window.innerWidth - popoverWidth; // Clamp to right of screen
      }


      setPosition({ 
        top: topPosition, 
        left: leftPosition,
        opacity: 1 
      });
    } else {
      setPosition(prev => ({ ...prev, opacity: 0 }));
    }
  }, [isOpen, targetRef, children]); // Recalcula se o conteúdo mudar (pode afetar altura/largura)

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, targetRef]);

  if (!isOpen && position.opacity === 0) {
    return null;
  }

  return (
    <div
      ref={popoverRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: position.opacity,
        transition: 'opacity 0.1s ease-in-out',
      }}
      className="bg-theme-input-bg border border-theme-border-inactive rounded-md shadow-xl z-[70] p-1"
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>
  );
};

export default OptionsPopover;
