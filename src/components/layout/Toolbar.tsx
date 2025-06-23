import { useState, useEffect } from "react";
import { Tool } from "../../types/index";
import {
  SelectIcon,
  DiceIcon,
  PanIcon,
  RulerIcon,
  ChevronLeftIcon,
} from "../icons";
import RulerPopover from "../ui/RulerPopover";
import { DiceRollPopover } from "../ui/DiceRollPopover";
import { useChat } from "../../contexts/ChatContext";
import { useBoardSettings } from "../../contexts/BoardSettingsContext";
import { useUI } from "../../contexts/UIContext";
import { ToolbarButton } from "../ui/ToolbarButton";
import { ToolbarPopoverButton } from "../ui/ToolbarPopoverButton";

// barra lateral esquerda com os botões de ferramentas
export function Toolbar() {
  const { rollAndSendMessage } = useChat();
  const {
    rulerPlacementMode,
    setRulerPlacementMode,
    rulerPersists,
    setRulerPersists,
  } = useBoardSettings();
  const { activeTool, setActiveTool, setIsToolbarVisible } = useUI();

  const [activePopover, setActivePopover] = useState<"ruler" | "dice" | null>(
    null
  );

  useEffect(() => {
    if (activeTool !== Tool.RULER && activePopover === "ruler") {
      setActivePopover(null);
    }
  }, [activeTool, activePopover]);

  return (
    <div className="w-16 flex flex-col border-r shadow-xl py-5 space-y-3  relative">
      <ToolbarButton
        label="Mover Mapa"
        icon={<PanIcon className="w-6 h-6" />}
        isActive={activeTool === Tool.PAN}
        onClick={() => {
          setActiveTool(Tool.PAN);
          setActivePopover(null);
        }}
      />
      <ToolbarButton
        label="Ferramenta de Seleção"
        icon={<SelectIcon className="w-6 h-6" />}
        isActive={activeTool === Tool.SELECT}
        onClick={() => {
          setActiveTool(Tool.SELECT);
          setActivePopover(null);
        }}
      />

      <ToolbarPopoverButton
        label="Ferramenta de Régua"
        icon={<RulerIcon className="w-6 h-6" />}
        isActive={activeTool === Tool.RULER}
        popoverComponent={RulerPopover}
        popoverProps={{
          currentMode: rulerPlacementMode,
          onSetMode: setRulerPlacementMode,
          rulerPersistsPath: rulerPersists,
          onToggleRulerPersistPath: () => setRulerPersists(!rulerPersists),
        }}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        toolType={Tool.RULER}
        activePopover={activePopover}
        setActivePopover={setActivePopover}
        popoverName="ruler"
      />

      <ToolbarPopoverButton
        label="Rolar Dados"
        icon={<DiceIcon className="w-7 h-7" />}
        isActive={false}
        popoverComponent={DiceRollPopover}
        popoverProps={{
          onRoll: rollAndSendMessage,
        }}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        toolType={Tool.DICE}
        activePopover={activePopover}
        setActivePopover={setActivePopover}
        popoverName="dice"
      />

      <div className="flex-grow"></div>
      <ToolbarButton
        label="Esconder Barra de Ferramentas"
        icon={<ChevronLeftIcon className="w-6 h-6" />}
        isActive={false}
        onClick={() => setIsToolbarVisible(false)}
        isHideButton={true}
      />
    </div>
  );
}
// VISTO
