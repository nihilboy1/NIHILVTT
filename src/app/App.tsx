// src/app/App.tsx (versão idealizada)
import { GameBoardPage } from "../pages/GameBoardPage"; // A página conteria a lógica do tabuleiro
import { RightSidebar } from "../widgets/RightSidebar";
import { Toolbar } from "../widgets/toolBar/ui/Toolbar";
import { useUI } from "./providers/UIProvider"; // Importar o hook useUI

export default function App() {
  const { isToolbarVisible, isRightSidebarVisible } = useUI(); // Obter estados de visibilidade

  return (
    <div className="flex h-screen">
      {isToolbarVisible && <Toolbar />}
      <GameBoardPage />
      {isRightSidebarVisible && <RightSidebar />}
    </div>
  );
}
