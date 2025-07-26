// src/shared/ui/OptionsPopover.tsx
import React from 'react';

import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';

import { useDismissable } from '../lib/hooks/useDismissable';

// As props continuam as mesmas
interface OptionsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  targetRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export function OptionsPopover({ isOpen, onClose, targetRef, children }: OptionsPopoverProps) {
  // 1. Lógica de posicionamento delegada para o Floating UI
  const { refs, floatingStyles } = useFloating({
    elements: { reference: targetRef.current },
    whileElementsMounted: autoUpdate, // Magia: atualiza a posição em scroll/resize
    placement: 'bottom-start', // Posição inicial desejada
    middleware: [
      offset(8), // Distância do alvo
      flip(), // Vira para cima se não couber embaixo
      shift({ padding: 8 }), // Garante que não saia da tela
    ],
  });

  // 2. Lógica de fechamento delegada para o seu hook (supondo que ele aceite um array de refs)
  useDismissable([refs.reference, refs.floating], isOpen, onClose);

  // 3. Lógica de animação delegada para o Framer Motion
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={refs.setFloating}
          style={floatingStyles} // Estilos de posição vêm do Floating UI
          className="bg-surface-0 border-accent-primary-hover z-[70] rounded-md border p-1 shadow-xl"
          role="menu"
          aria-orientation="vertical"
          // Variantes de animação do Framer Motion
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
