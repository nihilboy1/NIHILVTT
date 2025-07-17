import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/authStore";
import Spinner from "@/shared/ui/Spinner/Spinner";
import { ProfileModal } from "@/widgets/profileModal";
import { Squares } from "@/shared/ui/SquaresBackground";

export default function DashboardPage() {
  const { user, isLoading, logout, initializeAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => setIsProfileModalOpen(true);
  const handleCloseProfileModal = () => setIsProfileModalOpen(false);

  return (
    <div className="relative bg-surface-0 text-text-primary min-h-screen w-full flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Squares direction="left" />
      </div>

      <div className="relative w-full max-w-4xl p-8 rounded-lg shadow-xl bg-surface-1/80 backdrop-blur-md text-center">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleOpenProfileModal}
            className="text-text-secondary hover:text-accent-primary p-2 rounded-full bg-surface-2/50 backdrop-blur-sm"
            title="Perfil do Usuário"
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-5xl iceberg-regular text-text-primary mb-4">
          Bem-vindo, {user.name}!
        </h1>
        <p className="text-text-secondary text-lg mb-8">
          Este é o seu Dashboard.
        </p>
        <button
          onClick={logout}
          className="bg-accent-primary text-text-primary text-xl font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
        >
          Sair
        </button>
      </div>

      <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
    </div>
  );
}
