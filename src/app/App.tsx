// src/app/App.tsx (versão idealizada)
import { Toolbar } from "../widgets/Toolbar";
import { RightSidebar } from "../widgets/RightSidebar";
import { GameBoardPage } from "../pages/GameBoardPage"; // A página conteria a lógica do tabuleiro
export default function App() {
  // Quase nenhum estado ou lógica aqui!
  return (
    <div className="flex h-screen ...">
      <Toolbar />
      <GameBoardPage /> {/* A página agora é autossuficiente */}
      <RightSidebar />
    </div>
  );
}
