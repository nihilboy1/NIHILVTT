import React from "react";
import {
  condensedLabelClass,
  inputClass,
  condensedCheckboxClass,
} from "../../styles/formClasses";

interface PlayerSheetDetailsTabProps {
  editingTokenNotes: string;
  setEditingTokenNotes: (notes: string) => void;
  editingInspiration: boolean;
  setEditingInspiration: (inspiration: boolean) => void;
}

const PlayerSheetDetailsTab: React.FC<PlayerSheetDetailsTabProps> = ({
  editingTokenNotes,
  setEditingTokenNotes,
  editingInspiration,
  setEditingInspiration,
}) => {
  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div>
        <label htmlFor="pjSheetEditingTokenNotes" className={condensedLabelClass}>
          Notas do Personagem
        </label>
        <textarea
          id="pjSheetEditingTokenNotes"
          value={editingTokenNotes}
          onChange={(e) => setEditingTokenNotes(e.target.value)}
          className={`${inputClass} min-h-[80px]`}
        />
      </div>
      <div className="pt-1">
        <label
          htmlFor="editingInspiration"
          className="flex items-center space-x-1.5 cursor-pointer"
        >
          <input
            id="editingInspiration"
            type="checkbox"
            checked={editingInspiration}
            onChange={(e) => setEditingInspiration(e.target.checked)}
            className={condensedCheckboxClass}
          />
          <span className={`${condensedLabelClass} mb-0`}>Inspiração</span>
        </label>
      </div>
      <p className="text-text-secondary text-xs italic mt-4 text-center">
        Outras informações de história, magias, etc. (Em desenvolvimento)
      </p>
    </div>
  );
};

export default PlayerSheetDetailsTab;
