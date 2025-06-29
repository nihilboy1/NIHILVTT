import { useUI } from "../app/providers/UIProvider";
import { useBoardSettings } from "../contexts/BoardSettingsContext";
import { useChat } from "../contexts/ChatContext";
import { useToolbarState } from "../hooks/useToolbarState"; // Importar o novo hook
import { Tool } from "../shared/api/types";
import { DiceRollPopover } from "../shared/ui/DiceRollPopover";
import {
  ChevronLeftIcon,
  DiceIcon,
  PanIcon,
  RulerIcon,
  SelectIcon,
} from "../shared/ui/Icons";
import { RulerPopover } from "../shared/ui/RulerPopover";
import { ToolbarButton } from "../shared/ui/ToolbarButton";
import { ToolbarPopoverButton } from "../shared/ui/ToolbarPopoverButton";

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

  const { activePopover, setActivePopover } = useToolbarState({ activeTool });

  return (
    <div className="w-16 flex flex-col border-r shadow-xl py-5 space-y-3 relative">
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
        icon={<DiceIcon className="w-5 h-5" />}
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
