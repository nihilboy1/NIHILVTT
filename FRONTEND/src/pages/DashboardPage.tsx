import { useEffect, useState } from "react";

import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/features/auth/model/authStore";
import { MotionLink } from "@/shared/ui/MotionLink";
import { Spinner } from "@/shared/ui/Spinner";
import { Squares } from "@/shared/ui/SquaresBackground";
import { ProfileModal } from "@/widgets/profileModal";

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();


  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => setIsProfileModalOpen(true);
  const handleCloseProfileModal = () => setIsProfileModalOpen(false);

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

  return (
    <div className="relative bg-surface-0 text-text-primary min-h-screen w-full flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Squares direction="left" />
      </div>

      <div className="relative w-full max-w-6xl p-8 rounded-lg shadow-xl bg-surface-1/80 backdrop-blur-3xl text-center">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleOpenProfileModal}
            className="text-text-secondary hover:bg-accent-primary hover:scale-105 p-2 rounded-full bg-surface-2/50 backdrop-blur-sm"
            title="Perfil do Usuário"
          >
            <FaRegUser />
          </button>
        </div>

        <h1 className="text-5xl iceberg-regular text-text-primary mb-4">
          Bem-vindo, {user.name}!
        </h1>
        <p className="text-text-secondary text-lg mb-8">
          Este é o seu Dashboard.
        </p>

        <MotionLink
          to="/session"
          className=" justify-center w-fit flex bg-accent-primary text-text-primary text-xl font-bold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
        >
          <span className="mt-1">IR PARA SESSÃO TESTE</span>
        </MotionLink>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      />
    </div>
  );
}
