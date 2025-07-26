// src/shared/ui/TermsModal.tsx

import { motion } from 'framer-motion';

import { fadeIn } from '@/shared/config/MotionAnimations';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export function TermsModal({ isOpen, onClose, content }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="bg-overlay fixed inset-0 z-[100] flex items-center justify-center p-4"
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="hidden"
      onClick={(e) => {
        // Add onClick to close modal when clicking outside
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="button" // Add role for accessibility
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => {
        // Add keyboard listener
        if (e.key === 'Enter' || e.key === ' ') {
          onClose();
        }
      }}
    >
      <div
        className="bg-surface-1/90 pointer-events-auto relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg p-8 shadow-xl backdrop-blur-3xl"
        role="dialog" // Add role for accessibility
        aria-modal="true" // Indicate that it's a modal
      >
        <h2 className="iceberg-regular text-text-primary mb-4 text-3xl">Termos de Serviço</h2>
        <p className="text-text-secondary whitespace-pre-wrap">{content}</p>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-accent-primary text-text-primary hover:bg-accent-secondary-hover rounded-lg px-6 py-2 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
