import React, { useEffect, useRef, useState } from 'react';

interface DiceRollPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onRoll: (notation: string) => void;
  targetRef: React.RefObject<HTMLButtonElement | null>; // Referência ao botão que aciona o popover
}

const diceOptions = [
  "1D2", "1D4", "1D6", "1D8", "1D10", "1D12", "1D20", "1D100",
];

export function DiceRollPopover({
  isOpen,
  onClose,
  onRoll,
  targetRef,
}: DiceRollPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRef.current && isOpen) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.right + 8, // Posiciona à direita do botão
      });
    }
  }, [targetRef, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, targetRef]);

  if (!isOpen) {
    return null;
  }


  return (
    <div
      ref={popoverRef}
      className="fixed bg-surface-1 border rounded-md shadow-xl z-[60] p-2 grid grid-cols-2 gap-2"
      style={{ top: `${position.top}px`, left: `${position.left}px`, minWidth: '10rem' }} // Converted from 160px
      role="dialog"
      aria-label="Opções de Rolagem de Dados"
    >
      {diceOptions.map(notation => (
        <button
          key={notation}
          onClick={() => {
            onRoll(notation);
            onClose();
          }}
          className="w-full text-center px-3 py-1.5 text-sm  hover:bg-accent-primary-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary-hover rounded"
        >
          {notation}
        </button>
      ))}
    </div>
  );
}
