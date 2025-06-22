import React from "react";
import {
  condensedLabelClass,
  inputClass, // Usar inputClass em vez de condensedInputClass
} from "../../styles/formClasses";

interface PlayerBasicInfoProps {
  editingTokenName: string;
  setEditingTokenName: (name: string) => void;
  editingCharClass: string;
  setEditingCharClass: (charClass: string) => void;
  editingLevel: string;
  setEditingLevel: (level: string) => void;
  editingBackground: string;
  setEditingBackground: (background: string) => void;
  editingSpecies: string;
  setEditingSpecies: (species: string) => void;
  editingSubclass: string;
  setEditingSubclass: (subclass: string) => void;
  editingExp: string;
  setEditingExp: (exp: string) => void;
}

const PlayerBasicInfo: React.FC<PlayerBasicInfoProps> = ({
  editingTokenName,
  setEditingTokenName,
  editingCharClass,
  setEditingCharClass,
  editingLevel,
  setEditingLevel,
  editingBackground,
  setEditingBackground,
  editingSpecies,
  setEditingSpecies,
  editingSubclass,
  setEditingSubclass,
  editingExp,
  setEditingExp,
}) => {
  return (
    <div className="col-span-3 border border-border-inactive p-2 rounded-md">
      <div className="grid grid-cols-7 gap-x-2 gap-y-1.5 items-end">
        <div className="col-span-2">
          <label htmlFor="editingTokenName" className={condensedLabelClass}>
            NOME DO PERSONAGEM
          </label>
          <input
            id="editingTokenName"
            type="text"
            value={editingTokenName}
            onChange={(e) => setEditingTokenName(e.target.value)}
            className={inputClass}
            required
            maxLength={28}
          />
        </div>
        <div>
          <label htmlFor="editingCharClass" className={condensedLabelClass}>
            CLASSE
          </label>
          <input
            id="editingCharClass"
            type="text"
            value={editingCharClass}
            onChange={(e) => setEditingCharClass(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="w-16">
          <label htmlFor="editingLevel" className={condensedLabelClass}>
            NÍVEL
          </label>
          <input
            id="editingLevel"
            type="number"
            value={editingLevel}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 2) setEditingLevel(val);
            }}
            className={`${inputClass} text-center hide-number-spinners`}
            min="1"
            max="99"
            step="1"
          />
        </div>
        <div>
          <label htmlFor="editingBackground" className={condensedLabelClass}>
            ANTECEDENTE
          </label>
          <input
            id="editingBackground"
            type="text"
            value={editingBackground}
            onChange={(e) => setEditingBackground(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="editingSpecies" className={condensedLabelClass}>
            ESPÉCIE
          </label>
          <input
            id="editingSpecies"
            type="text"
            value={editingSpecies}
            onChange={(e) => setEditingSpecies(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="editingSubclass" className={condensedLabelClass}>
            SUBCLASSE
          </label>
          <input
            id="editingSubclass"
            type="text"
            value={editingSubclass}
            onChange={(e) => setEditingSubclass(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="col-start-7 w-20 justify-self-end">
          <label htmlFor="editingExp" className={condensedLabelClass}>
            EXP
          </label>
          <input
            id="editingExp"
            type="number"
            value={editingExp}
            onChange={(e) => setEditingExp(e.target.value)}
            className={`${inputClass} text-center hide-number-spinners`}
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBasicInfo;
