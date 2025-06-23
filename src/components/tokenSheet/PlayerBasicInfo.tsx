import React from "react";
import { cn } from "../../utils/cn";

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
      <div className="grid grid-cols-7 gap-x-2 gap-y-1.5 items-end ">
        <div className="col-span-2">
          <label htmlFor="editingTokenName" className="block text-[11px] font-medium text-accent-primary mb-px">
            NOME DO PERSONAGEM
          </label>
          <input
            id="editingTokenName"
            type="text"
            value={editingTokenName}
            onChange={(e) => setEditingTokenName(e.target.value)}
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
            required
            maxLength={28}
          />
        </div>
        <div>
          <label htmlFor="editingCharClass" className="block text-[11px] font-medium text-accent-primary mb-px">
            CLASSE
          </label>
          <input
            id="editingCharClass"
            type="text"
            value={editingCharClass}
            onChange={(e) => setEditingCharClass(e.target.value)}
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          />
        </div>
        <div className="w-16">
          <label htmlFor="editingLevel" className="block text-[11px] font-medium text-accent-primary mb-px">
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
            className={cn("w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary", "text-center hide-number-spinners")}
            min="1"
            max="99"
            step="1"
          />
        </div>
        <div>
          <label htmlFor="editingBackground" className="block text-[11px] font-medium text-accent-primary mb-px">
            ANTECEDENTE
          </label>
          <input
            id="editingBackground"
            type="text"
            value={editingBackground}
            onChange={(e) => setEditingBackground(e.target.value)}
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          />
        </div>
        <div>
          <label htmlFor="editingSpecies" className="block text-[11px] font-medium text-accent-primary mb-px">
            ESPÉCIE
          </label>
          <input
            id="editingSpecies"
            type="text"
            value={editingSpecies}
            onChange={(e) => setEditingSpecies(e.target.value)}
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          />
        </div>
        <div>
          <label htmlFor="editingSubclass" className="block text-[11px] font-medium text-accent-primary mb-px">
            SUBCLASSE
          </label>
          <input
            id="editingSubclass"
            type="text"
            value={editingSubclass}
            onChange={(e) => setEditingSubclass(e.target.value)}
            className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          />
        </div>
        <div className="col-start-7 w-20 justify-self-end">
          <label htmlFor="editingExp" className="block text-[11px] font-medium text-accent-primary mb-px">
            EXP
          </label>
          <input
            id="editingExp"
            type="number"
            value={editingExp}
            onChange={(e) => setEditingExp(e.target.value)}
            className={cn("w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary", "text-center hide-number-spinners")}
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBasicInfo;
