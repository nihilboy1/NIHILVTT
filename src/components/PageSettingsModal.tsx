
import React, { useState, useEffect } from 'react';
// PageSettings, GridSettings types removed from direct import, will get from context
import { Modal } from './Modal';
import { DEFAULT_METERS_PER_SQUARE, GRID_CELL_SIZE, GRID_LINE_COLOR } from '../constants';
import { useBoardSettings } from '../contexts/BoardSettingsContext'; // Import useBoardSettings

interface PageAndGridSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // currentPageSettings prop removed
  // currentGridSettings prop removed
  // onSave prop removed
}

const PageSettingsModal: React.FC<PageAndGridSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    pageSettings: contextPageSettings, 
    gridSettings: contextGridSettings, 
    updatePageSettings, 
    updateGridSettings 
  } = useBoardSettings(); // Use context

  // Estado para configurações da página
  const [widthInUnits, setWidthInUnits] = useState(contextPageSettings.widthInUnits);
  const [heightInUnits, setHeightInUnits] = useState(contextPageSettings.heightInUnits);
  const [backgroundColor, setBackgroundColor] = useState(contextPageSettings.backgroundColor);

  // Estado para configurações da grade
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
    updatePageSettings({ // Use context action
      widthInUnits: Number(widthInUnits),
      heightInUnits: Number(heightInUnits),
      backgroundColor,
    });
    updateGridSettings({ // Use context action
      visualCellSize: Number(visualCellSize),
      lineColor,
      metersPerSquare: Number(metersPerSquare),
    });
    onClose(); 
  };

  const inputClass = "w-full p-2 bg-theme-input-bg border border-theme-border-inactive rounded-md focus:ring-1 focus:ring-theme-border-active focus:border-theme-border-active text-theme-foreground placeholder-theme-text-secondary";
  const labelClass = "block text-sm font-medium text-theme-accent-primary mb-1";
  const subHeadingClass = "text-lg font-semibold text-theme-foreground mt-6 mb-3 pt-4 border-t border-theme-border-inactive";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configurações da Página e Grade">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2"> 
        
        <h3 className="text-lg font-semibold text-theme-foreground mb-3">Página</h3>
        <div>
          <label htmlFor="pageWidthInUnits" className={labelClass}>
            Largura da Página (quadrados)
          </label>
          <input
            id="pageWidthInUnits"
            type="number"
            value={widthInUnits}
            onChange={(e) => setWidthInUnits(Math.max(1, parseInt(e.target.value, 10)))}
            className={inputClass}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label htmlFor="pageHeightInUnits" className={labelClass}>
            Altura da Página (quadrados)
          </label>
          <input
            id="pageHeightInUnits"
            type="number"
            value={heightInUnits}
            onChange={(e) => setHeightInUnits(Math.max(1, parseInt(e.target.value, 10)))}
            className={inputClass}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label htmlFor="pageBackgroundColor" className={labelClass}>
            Cor de Fundo da Página
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="pageBackgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className={`${inputClass} h-10 w-16 p-1`}
            />
            <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className={`${inputClass} flex-grow`}
                placeholder="#FFFFFF"
            />
          </div>
        </div>

        <h3 className={subHeadingClass}>Grade</h3>
        <div>
          <label htmlFor="visualCellSize" className={labelClass}>
            Tamanho da Célula (px)
          </label>
          <input
            id="visualCellSize"
            type="number"
            value={visualCellSize}
            onChange={(e) => setVisualCellSize(Math.max(10, parseFloat(e.target.value)))}
            className={inputClass}
            min="10"
            step="1"
            placeholder={String(GRID_CELL_SIZE)}
          />
        </div>
        <div>
          <label htmlFor="lineColor" className={labelClass}>
            Cor da Linha da Grade
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="lineColor"
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={`${inputClass} h-10 w-16 p-1`}
            />
            <input
                type="text"
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className={`${inputClass} flex-grow`}
                placeholder={GRID_LINE_COLOR}
            />
          </div>
        </div>
        <div>
          <label htmlFor="metersPerSquare" className={labelClass}>
            Metros por Quadrado
          </label>
          <input
            id="metersPerSquare"
            type="number"
            value={metersPerSquare}
            onChange={(e) => setMetersPerSquare(Math.max(0.1, parseFloat(e.target.value)))}
            className={inputClass}
            min="0.1"
            step="0.1"
            placeholder={String(DEFAULT_METERS_PER_SQUARE)}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-theme-accent-secondary hover:bg-theme-accent-secondary-hover text-theme-accent-secondary-text font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-toolbar-bg focus:ring-theme-border-active"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-theme-accent-positive hover:bg-theme-accent-positive-hover text-theme-accent-positive-text font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-theme-toolbar-bg focus:ring-theme-accent-positive"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PageSettingsModal;
