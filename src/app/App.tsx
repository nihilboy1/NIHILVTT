// src/app/App.tsx (versão idealizada)
import { GameBoardPage } from "../pages/GameBoardPage"; // A página conteria a lógica do tabuleiro
import { useUIStore } from "../features/layoutControls/model/store";
import { RightSidebar } from "../widgets/rightSidebar/ui/RightSidebar";
import { Toolbar } from "../widgets/toolBar/ui/Toolbar";

export default function App() {
  const { isToolbarVisible, isRightSidebarVisible } = useUIStore(); // Obter estados de visibilidade

  return (
    <div className="flex h-screen">
      {isToolbarVisible && <Toolbar />}
      <GameBoardPage />
      {isRightSidebarVisible && <RightSidebar />}
    </div>
  );
}
