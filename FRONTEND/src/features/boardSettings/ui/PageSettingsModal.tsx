import { useEffect, useState } from 'react';

import { GRID_CONFIG } from '@/shared/config/constants';

import { cn } from '../../../shared/lib/utils/cn';
import { Modal } from '../../../shared/ui/Modal';
import { useBoardSettingsStore } from '../model/store';

interface PageAndGridSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PageSettingsModal({ isOpen, onClose }: PageAndGridSettingsModalProps) {
  const {
    pageSettings: contextPageSettings,
    gridSettings: contextGridSettings,
    updatePageSettings,
    updateGridSettings,
  } = useBoardSettingsStore();

  const [widthInUnits, setWidthInUnits] = useState(contextPageSettings.widthInUnits);
  const [heightInUnits, setHeightInUnits] = useState(contextPageSettings.heightInUnits);
  const [backgroundColor, setBackgroundColor] = useState(contextPageSettings.backgroundColor);

  const [visualCellSize, setVisualCellSize] = useState(contextGridSettings.visualCellSize);
  const [lineColor, setLineColor] = useState(contextGridSettings.lineColor);
  const [metersPerSquare, setMetersPerSquare] = useState(contextGridSettings.metersPerSquare);

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
      widthInUnits: Number(widthInUnits),
      heightInUnits: Number(heightInUnits),
      backgroundColor,
    });
    updateGridSettings({
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
      <div className="hide-scrollbar max-h-[70vh] space-y-6 overflow-y-auto px-2">
        <h3 className="mb-3 text-lg font-semibold">Página</h3>
        <div>
          <label
            htmlFor="pageWidthInUnits"
            className="text-accent-primary mb-1 block text-sm font-medium"
          >
            Largura da Página (quadrados)
          </label>
          <input
            id="pageWidthInUnits"
            type="number"
            value={widthInUnits}
            onChange={(e) => setWidthInUnits(Math.max(1, parseInt(e.target.value, 10)))}
            className="bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1"
            min="1"
            step="1"
          />
        </div>
        <div>
          <label
            htmlFor="pageHeightInUnits"
            className="text-accent-primary mb-1 block text-sm font-medium"
          >
            Altura da Página (quadrados)
          </label>
          <input
            id="pageHeightInUnits"
            type="number"
            value={heightInUnits}
            onChange={(e) => setHeightInUnits(Math.max(1, parseInt(e.target.value, 10)))}
            className="bg-surface-1 border-surface-2 placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1"
            min="1"
            step="1"
          />
        </div>
        <div>
          <label
            htmlFor="pageBackgroundColor"
            className="text-accent-primary mb-1 block text-sm font-medium"
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
                'bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'h-10 w-16 p-1',
              )}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className={cn(
                'bg-surface-1 border-surface-2 placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'flex-grow',
              )}
              placeholder="#FFFFFF"
            />
          </div>
        </div>

        <h3 className="mt-6 mb-3 border-t pt-4 text-lg font-semibold">Grade</h3>
        <div>
          <label
            htmlFor="visualCellSize"
            className="text-accent-primary mb-1 block text-sm font-medium"
          >
            Tamanho da Célula
          </label>
          <input
            id="visualCellSize"
            type="number"
            value={visualCellSize}
            onChange={(e) => setVisualCellSize(Math.max(10, parseFloat(e.target.value)))}
            className="bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1"
            min="10"
            step="1"
            placeholder={String(GRID_CONFIG.CELL_SIZE)}
          />
        </div>
        <div>
          <label htmlFor="lineColor" className="text-accent-primary mb-1 block text-sm font-medium">
            Cor da Linha da Grade
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="lineColor"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={cn(
                'bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'h-10 w-16 p-1',
              )}
            />
            <input
              type="text"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={cn(
                'bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'flex-grow',
              )}
              placeholder={GRID_CONFIG.LINE_COLOR}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="metersPerSquare"
            className="text-accent-primary mb-1 block text-sm font-medium"
          >
            Metros por Quadrado
          </label>
          <input
            id="metersPerSquare"
            type="number"
            value={metersPerSquare}
            onChange={(e) => setMetersPerSquare(Math.max(0.1, parseFloat(e.target.value)))}
            className="bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1"
            min="0.1"
            step="0.1"
            placeholder={String(GRID_CONFIG.DEFAULT_METERS_PER_SQUARE)}
          />
        </div>
      </div>
    </Modal>
  );
}
