import { useBoardSettingsStore } from '@/features/boardSettings/model/store';
import { useDiceRollingStore } from '@/features/diceRolling/model/store';
import { useUIStore } from '@/features/layoutControls/model/store';
import { DEFAULTS } from '@/shared/config/constants';

import { RulerPopover } from '../../../features/boardRuler/ui/RulerPopover';
import { DiceRollPopover } from '../../../features/diceRolling/ui/DiceRollPopover';
import { Tool } from '../../../shared/api/types';
import {
  ChevronLeftIcon,
  DiceIcon,
  PanIcon,
  RulerIcon,
  SelectIcon,
} from '../../../shared/ui/Icons';
import { ToolbarButton } from '../../../shared/ui/ToolbarButton';
import { ToolbarPopoverButton } from '../../../shared/ui/ToolbarPopoverButton';
import { useToolbarState } from '../model/hooks/useToolbarState';

export function Toolbar() {
  const { rollDice } = useDiceRollingStore();
  const { rulerPlacementMode, setRulerPlacementMode, rulerPersists, setRulerPersists } =
    useBoardSettingsStore();
  const { activeTool, setActiveTool, setIsToolbarVisible, setActivePopover } = useUIStore();

  const { activePopover: toolbarActivePopover, setActivePopover: setToolbarActivePopover } =
    useToolbarState({ activeTool });

  const handleToolbarRoll = (notation: string) => {
    rollDice(notation, notation, 'Generic', DEFAULTS.PLAYER_NAME);
  };

  return (
    <div className="bg-surface-0 fixed top-0 bottom-0 left-0 z-50 flex h-full w-16 flex-col space-y-3 border-r py-5 shadow-xl">
      <ToolbarButton
        label="Mover Mapa"
        icon={<PanIcon className="h-6 w-6" />}
        variant={activeTool === Tool.PAN ? "active" : "default"}
        onClick={() => {
          setActiveTool(Tool.PAN);
          setActivePopover(null);
        }}
      />
      <ToolbarButton
        label="Ferramenta de Seleção"
        icon={<SelectIcon className="h-6 w-6" />}
        variant={activeTool === Tool.SELECT ? "active" : "default"}
        onClick={() => {
          setActiveTool(Tool.SELECT);
          setActivePopover(null);
        }}
      />

      <ToolbarPopoverButton
        label="Ferramenta de Régua"
        icon={<RulerIcon className="h-6 w-6" />}
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
        activePopover={toolbarActivePopover}
        setActivePopover={setToolbarActivePopover}
        popoverName="ruler"
      />

      <ToolbarPopoverButton
        label="Rolar Dados"
        icon={<DiceIcon className="h-5 w-5" />}
        popoverComponent={DiceRollPopover}
        popoverProps={{
          onRoll: handleToolbarRoll,
        }}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        toolType={Tool.DICE}
        activePopover={toolbarActivePopover}
        setActivePopover={setToolbarActivePopover}
        popoverName="dice"
      />

      <div className="flex-grow"></div>
      <ToolbarButton
        label="Esconder Barra de Ferramentas"
        icon={<ChevronLeftIcon className="h-6 w-6" />}
        onClick={() => setIsToolbarVisible(false)}
        variant="hide"
      />
    </div>
  );
}
