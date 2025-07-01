import { RulerPopover } from "../../../features/boardRuler/ui/RulerPopover";
import { useBoardSettings } from "../../../features/boardSettings/contexts/BoardSettingsContext";
import { DiceRollPopover } from "../../../features/diceRolling/ui/DiceRollPopover";
import { useDiceRoller } from "../../../features/diceRolling/model/hooks/useDiceRoller"; // Importar useDiceRoller
import { Tool } from "../../../shared/api/types";
import { DEFAULT_PLAYER_NAME } from "../../../shared/config/constants"; // Importar DEFAULT_PLAYER_NAME
import {
  ChevronLeftIcon,
  DiceIcon,
  PanIcon,
  RulerIcon,
  SelectIcon,
} from "../../../shared/ui/Icons";
import { ToolbarButton } from "../../../shared/ui/ToolbarButton";
import { ToolbarPopoverButton } from "../../../shared/ui/ToolbarPopoverButton";
import { useUI } from "../../layoutControls/model/contexts/UIProvider";
import { useToolbarState } from "../model/hooks/useToolbarState";

// barra lateral esquerda com os botões de ferramentas
export function Toolbar() {
  const { rollDice } = useDiceRoller(); // Usar o novo hook
  const {
    rulerPlacementMode,
    setRulerPlacementMode,
    rulerPersists,
    setRulerPersists,
  } = useBoardSettings();
  const { activeTool, setActiveTool, setIsToolbarVisible } = useUI();

  const { activePopover, setActivePopover } = useToolbarState({ activeTool });

  const handleToolbarRoll = (notation: string) => {
    rollDice(notation, notation, "Generic", DEFAULT_PLAYER_NAME);
  };

  return (
    <div className="bg-surface-0 w-16 flex flex-col border-r shadow-xl py-5 space-y-3 fixed left-0 top-0 bottom-0 z-50 h-full">
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
          onRoll: handleToolbarRoll, // Passar a nova função
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
