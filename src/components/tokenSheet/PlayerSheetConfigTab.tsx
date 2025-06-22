import React from "react";
import { TokenType } from "../../types";
import { tokenTypeTranslations } from "../../constants";
import {
  condensedLabelClass,
  inputClass,
} from "../../styles/formClasses";

interface PlayerSheetConfigTabProps {
  editingTokenColor: string;
  setEditingTokenColor: (color: string) => void;
  editingTokenSize: string;
  setEditingTokenSize: (size: string) => void;
}

const PlayerSheetConfigTab: React.FC<PlayerSheetConfigTabProps> = ({
  editingTokenColor,
  setEditingTokenColor,
  editingTokenSize,
  setEditingTokenSize,
}) => {
  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div>
        <label htmlFor="pjSheetEditingTokenColor" className={condensedLabelClass}>
          Cor do Token (Tabuleiro)
        </label>
        <div className="flex items-center space-x-2">
          <input
            id="pjSheetEditingTokenColor"
            type="color"
            value={editingTokenColor}
            onChange={(e) => setEditingTokenColor(e.target.value)}
            className={`${inputClass} h-9 w-14 p-0.5 cursor-pointer`}
          />
          <input
            type="text"
            value={editingTokenColor}
            onChange={(e) => setEditingTokenColor(e.target.value)}
            className={`${inputClass} flex-grow`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="pjSheetEditingTokenSize" className={condensedLabelClass}>
          Tamanho do Token (Tabuleiro)
        </label>
        <select
          id="pjSheetEditingTokenSize"
          value={editingTokenSize}
          onChange={(e) => setEditingTokenSize(e.target.value)}
          className={inputClass}
        >
          <option value="1x1">1x1 (Padrão)</option>
          <option value="2x2">2x2 (Grande)</option>
          <option value="3x3">3x3 (Enorme)</option>
          <option value="0.5x0.5">0.5x0.5 (Minúsculo)</option>
        </select>
      </div>
      <div>
        <label className={condensedLabelClass}>Tipo do Token</label>
        <input
          type="text"
          value={tokenTypeTranslations[TokenType.PLAYER]}
          className={`${inputClass} bg-input-bg opacity-70 cursor-not-allowed`}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

export default PlayerSheetConfigTab;
