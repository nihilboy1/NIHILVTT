import  { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useAuthStore } from '@/features/auth/model/authStore';
import { EditProfileModal } from '@/features/userEdit/ui/EditProfileModal/EditProfileModal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, logout } = useAuthStore();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            className="bg-surface-1 text-text-primary relative flex w-full max-w-md flex-col overflow-y-auto p-6 shadow-lg"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="iceberg-regular text-3xl">Perfil do Usuário</h2>
              <button onClick={onClose} className="text-text-secondary hover:text-accent-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {user ? (
              <div className="flex h-full flex-col justify-between">
                <section title="Dados do Usuário">
                  <div title="Nome do Usuário">
                    <p className="text-text-secondary text-sm">Nome de Usuário:</p>
                    <p className="text-xl font-semibold">{user.name}</p>
                  </div>

                  <div title="Email do Usuário">
                    <p className="text-text-secondary text-sm">Email:</p>
                    <p className="text-xl font-semibold">{user.email}</p>
                  </div>
                </section>

                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(true)}
                    className="hover:bg-accent-primary bg-surface-3 text-text-primary border-text-primary iceberg-regular flex w-fit items-center justify-center gap-3 rounded-lg border-b-3 px-8 py-3 text-lg font-bold shadow-lg transition-all hover:scale-105"
                  >
                    ALTERAR DADOS
                  </button>
                  <button
                    onClick={logout}
                    className="bg-feedback-negative hover:bg-feedback-negative-hover text-text-primary border-text-primary iceberg-regular w-fit rounded-lg border-b-3 px-6 py-2 text-lg font-bold shadow-lg transition-all hover:scale-105"
                  >
                    SAIR DA CONTA
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-text-secondary">Nenhum usuário logado.</p>
            )}
          </motion.div>
        </motion.div>
      )}
      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        zIndex={60} // Ensure edit profile modal is above profile modal
      />
    </AnimatePresence>
  );
}

export default ProfileModal;
