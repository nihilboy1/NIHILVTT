import { useState, useEffect } from "react";
// PageSettings, GridSettings types removed from direct import, will get from context
import { Modal } from "../ui/Modal";
import { cn } from "../../utils/cn";
import {
  DEFAULT_METERS_PER_SQUARE,
  GRID_CELL_SIZE,
  GRID_LINE_COLOR,
} from "../../constants";
import { useBoardSettings } from "../../contexts/BoardSettingsContext"; // Import useBoardSettings

interface PageAndGridSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PageSettingsModal({
  isOpen,
  onClose,
}: PageAndGridSettingsModalProps) {
  const {
    pageSettings: contextPageSettings,
    gridSettings: contextGridSettings,
    updatePageSettings,
    updateGridSettings,
  } = useBoardSettings(); // Use context

  // Estado para configurações da página
  const [widthInUnits, setWidthInUnits] = useState(
    contextPageSettings.widthInUnits
  );
  const [heightInUnits, setHeightInUnits] = useState(
    contextPageSettings.heightInUnits
  );
  const [backgroundColor, setBackgroundColor] = useState(
    contextPageSettings.backgroundColor
  );

  // Estado para configurações da grade
  const [visualCellSize, setVisualCellSize] = useState(
    contextGridSettings.visualCellSize
  );
  const [lineColor, setLineColor] = useState(contextGridSettings.lineColor);
  const [metersPerSquare, setMetersPerSquare] = useState(
    contextGridSettings.metersPerSquare
  );

  useEffect(() => {
    if (isOpen) {
      setWidthInUnits(contextPageSettings.widthInUnits);
      setHeightInUnits(contextPageSettings.heightInUnits);
      setBackgroundColor(contextPageSettings.backgroundColor);

      setVisualCellSize(contextGridSettings.visualCellSize);
      setLineColor(contextGridSettings.lineColor);
      setMetersPerSquare(contextGridSettings.metersPerSquare);
    }
  }, [isOpen, contextPageSettings, contextGridSettings]);

  const handleSave = () => {
    updatePageSettings({
      // Use context action
      widthInUnits: Number(widthInUnits),
      heightInUnits: Number(heightInUnits),
      backgroundColor,
    });
    updateGridSettings({
      // Use context action
      visualCellSize: Number(visualCellSize),
      lineColor,
      metersPerSquare: Number(metersPerSquare),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajustes de Página e Grade"
      onConfirm={handleSave}
      confirmText="Salvar Alterações"
      cancelText="Cancelar"
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto px-2 hide-scrollbar">
        <h3 className="text-lg font-semibold mb-3">Página</h3>
        <div>
          <label
            htmlFor="pageWidthInUnits"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Largura da Página (quadrados)
          </label>
          <input
            id="pageWidthInUnits"
            type="number"
            value={widthInUnits}
            onChange={(e) =>
              setWidthInUnits(Math.max(1, parseInt(e.target.value, 10)))
            }
            className=" w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary"
            min="1"
            step="1"
          />
        </div>
        <div>
          <label
            htmlFor="pageHeightInUnits"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Altura da Página (quadrados)
          </label>
          <input
            id="pageHeightInUnits"
            type="number"
            value={heightInUnits}
            onChange={(e) =>
              setHeightInUnits(Math.max(1, parseInt(e.target.value, 10)))
            }
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1    placeholder-text-secondary"
            min="1"
            step="1"
          />
        </div>
        <div>
          <label
            htmlFor="pageBackgroundColor"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Cor de Fundo da Página
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="pageBackgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary",
                "h-10 w-16 p-1"
              )}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1    placeholder-text-secondary",
                "flex-grow"
              )}
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-3 pt-4 border-t">
          Grade
        </h3>
        <div>
          <label
            htmlFor="visualCellSize"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Tamanho da Célula
          </label>
          <input
            id="visualCellSize"
            type="number"
            value={visualCellSize}
            onChange={(e) =>
              setVisualCellSize(Math.max(10, parseFloat(e.target.value)))
            }
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary"
            min="10"
            step="1"
            placeholder={String(GRID_CELL_SIZE)}
          />
        </div>
        <div>
          <label
            htmlFor="lineColor"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Cor da Linha da Grade
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="lineColor"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary",
                "h-10 w-16 p-1"
              )}
            />
            <input
              type="text"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary",
                "flex-grow"
              )}
              placeholder={GRID_LINE_COLOR}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="metersPerSquare"
            className="block text-sm font-medium text-accent-primary mb-1"
          >
            Metros por Quadrado
          </label>
          <input
            id="metersPerSquare"
            type="number"
            value={metersPerSquare}
            onChange={(e) =>
              setMetersPerSquare(Math.max(0.1, parseFloat(e.target.value)))
            }
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1   text-text-primary placeholder-text-secondary"
            min="0.1"
            step="0.1"
            placeholder={String(DEFAULT_METERS_PER_SQUARE)}
          />
        </div>
      </div>
    </Modal>
  );
}


// visto
