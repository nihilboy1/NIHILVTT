import { Tool } from "../../../../shared/api/types";
import { useEffect, useState } from "react";

interface UseToolbarStateProps {
  activeTool: Tool;
}

export const useToolbarState = ({ activeTool }: UseToolbarStateProps) => {
  const [activePopover, setActivePopover] = useState<"ruler" | "dice" | null>(
    null
  );

  useEffect(() => {
    // Fecha o popover da régua se a ferramenta ativa não for a régua
    if (activeTool !== Tool.RULER && activePopover === "ruler") {
      setActivePopover(null);
    }
    // Adicione lógica semelhante para outros popovers se necessário
  }, [activeTool, activePopover]);

  return {
    activePopover,
    setActivePopover, // Retorna a função setState diretamente
  };
};
