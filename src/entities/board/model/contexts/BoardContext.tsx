// CÓDIGO PARA O NOVO ARQUIVO

import React, { createContext, useContext, useRef, type ReactNode } from "react";
import { useZoomAndPan } from "../hooks/useZoomAndPan";
import { type PageSettings, type GridSettings, type Point } from "@/shared/api/types";

// 1. A interface é muito menor, contendo apenas o estado fundamental do tabuleiro.
interface BoardContextType {
  svgRef: React.RefObject<SVGSVGElement>;
  gridSettings: GridSettings; // <-- ADICIONADO AQUI

  viewBox: { x: number; y: number; width: number; height: number };
  zoomLevel: number;
  isPanning: boolean;
  getSVGPoint: (clientX: number, clientY: number) => Point;
  handleWheel: (event: React.WheelEvent<SVGSVGElement>) => void;
  handlePanStart: (point: Point) => void;
  handlePanMove: (event: MouseEvent) => void;
  handlePanEnd: (event: MouseEvent) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardProviderProps {
  children: ReactNode;
  pageSettings: PageSettings; // Recebe as configurações necessárias
  gridSettings: GridSettings; // Recebe as configurações necessárias
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, pageSettings, gridSettings }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // 2. O novo provider usa o hook que acabamos de mover.
  const zoomAndPanApi = useZoomAndPan({ svgRef, pageSettings, gridSettings });

  // 3. O valor do contexto agora só expõe a API de zoom e pan.
  const contextValue: BoardContextType = {
    svgRef,
    ...zoomAndPanApi,
        gridSettings, // 2. EXPONHA O 'gridSettings' NO VALOR DO CONTEXTO

  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

// 4. Criamos o hook de consumo para a nova entidade.
export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};