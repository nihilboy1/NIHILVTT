import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/features/auth/model/authStore";
import { EditProfileModal } from "@/features/userEdit/ui/EditProfileModal/EditProfileModal";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
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
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md bg-surface-1 text-text-primary shadow-lg flex flex-col p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl iceberg-regular">Perfil do Usuário</h2>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-accent-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {user ? (
              <div className="space-y-6">
                {/* Display Username */}
                <div>
                  <p className="text-text-secondary text-sm">
                    Nome de Usuário:
                  </p>
                  <p className="text-xl font-semibold">{user.name}</p>
                </div>

                {/* Display Email */}
                <div>
                  <p className="text-text-secondary text-sm">Email:</p>
                  <p className="text-xl font-semibold">{user.email}</p>
                </div>

                {/* Botão para Alterar Dados Cadastrados */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(true)}
                    className="w-full hover:bg-accent-primary flex justify-center items-center gap-3 bg-surface-3 text-text-primary text-2xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
                  >
                    ALTERAR DADOS
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
};

export default ProfileModal;
