import React from "react";
import { TokenType } from "../../types";
import { TOKEN_TYPES_OPTIONS } from "../../constants";
import {
  condensedLabelClass,
  inputClass,
} from "../../styles/formClasses";

interface GenericTokenSheetProps {
  editingTokenName: string;
  setEditingTokenName: (name: string) => void;
  editingTokenType: TokenType | null;
  setEditingTokenType: (type: TokenType) => void;
  editingCurrentHp: string;
  setEditingCurrentHp: (hp: string) => void;
  editingMaxHp: string;
  setEditingMaxHp: (hp: string) => void;
  editingTokenNotes: string;
  setEditingTokenNotes: (notes: string) => void;
  editingTokenColor: string;
  setEditingTokenColor: (color: string) => void;
  editingTokenSize: string;
  setEditingTokenSize: (size: string) => void;
}

const GenericTokenSheet: React.FC<GenericTokenSheetProps> = ({
  editingTokenName,
  setEditingTokenName,
  editingTokenType,
  setEditingTokenType,
  editingCurrentHp,
  setEditingCurrentHp,
  editingMaxHp,
  setEditingMaxHp,
  editingTokenNotes,
  setEditingTokenNotes,
  editingTokenColor,
  setEditingTokenColor,
  editingTokenSize,
  setEditingTokenSize,
}) => {
  return (
    <div className="p-0.5 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div>
        <label htmlFor="editingTokenName" className={condensedLabelClass}>
          Nome do Token
        </label>
        <input
          id="editingTokenName"
          type="text"
          value={editingTokenName}
          onChange={(e) => setEditingTokenName(e.target.value)}
          className={inputClass}
          required
          maxLength={35}
        />
      </div>
      <div>
        <label htmlFor="editingTokenType" className={condensedLabelClass}>
          Tipo
        </label>
        <select
          id="editingTokenType"
          value={editingTokenType || ""}
          onChange={(e) => setEditingTokenType(e.target.value as TokenType)}
          className={inputClass}
        >
          {TOKEN_TYPES_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="flex-1">
          <label htmlFor="editingCurrentHp" className={condensedLabelClass}>
            Vida Atual
          </label>
          <input
            id="editingCurrentHp"
            type="number"
            value={editingCurrentHp}
            onChange={(e) => setEditingCurrentHp(e.target.value)}
            className={`${inputClass} hide-number-spinners`}
            min="0"
            step="1"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="editingMaxHp" className={condensedLabelClass}>
            Vida Máxima
          </label>
          <input
            id="editingMaxHp"
            type="number"
            value={editingMaxHp}
            onChange={(e) => setEditingMaxHp(e.target.value)}
            className={`${inputClass} hide-number-spinners`}
            min="1"
            step="1"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="editingTokenNotes" className={condensedLabelClass}>
          Notas
        </label>
        <textarea
          id="editingTokenNotes"
          value={editingTokenNotes}
          onChange={(e) => setEditingTokenNotes(e.target.value)}
          className={`${inputClass} min-h-[100px]`}
        />
      </div>
      <div>
        <label htmlFor="editingTokenColor" className={condensedLabelClass}>
          Cor
        </label>
        <div className="flex items-center space-x-2">
          <input
            id="editingTokenColor"
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
        <label htmlFor="editingTokenSize" className={condensedLabelClass}>
          Tamanho
        </label>
        <select
          id="editingTokenSize"
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
    </div>
  );
};

export default GenericTokenSheet;
