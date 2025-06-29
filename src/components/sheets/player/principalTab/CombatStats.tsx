import React from "react";
import { cn } from "../../../../shared/lib/utils/cn";

interface CombatStatsProps {
  editingArmorClass: string;
  setEditingArmorClass: (value: string) => void;
  editingInitiative: string;
  setEditingInitiative: (value: string) => void;
  editingSpeed: string;
  setEditingSpeed: (value: string) => void;
  editingShieldEquipped: boolean;
  setEditingShieldEquipped: (value: boolean) => void;
}

export const CombatStats: React.FC<CombatStatsProps> = ({
  editingArmorClass,
  setEditingArmorClass,
  editingInitiative,
  setEditingInitiative,
  editingSpeed,
  setEditingSpeed,
  editingShieldEquipped,
  setEditingShieldEquipped,
}) => {
  return (
    <fieldset className="p-2 rounded-md bg-surface-1">
      <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
        Armadura e Combate
      </legend>
      <div className="flex justify-between items-end ">
        <div className="w-16">
          <label
            htmlFor="editingArmorClass"
            className="text-center block text-[0.8rem] font-medium mb-px"
          >
            CA
          </label>
          <input
            id="editingArmorClass"
            type="number"
            value={editingArmorClass}
            onChange={(e) => setEditingArmorClass(e.target.value)}
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
              "text-center hide-number-spinners"
            )}
            min="0"
          />
        </div>
        <div className="w-16">
          <label
            htmlFor="editingInitiative"
            className="block text-[0.8rem] font-medium mb-px"
          >
            INICIATIVA
          </label>
          <input
            id="editingInitiative"
            type="number"
            value={editingInitiative}
            onChange={(e) => setEditingInitiative(e.target.value)}
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
              "text-center hide-number-spinners"
            )}
          />
        </div>
        <div className="w-16">
          <label
            htmlFor="editingSpeed"
            className="block text-[0.8rem] font-medium mb-px"
          >
            DESLOC.
          </label>
          <input
            id="editingSpeed"
            type="number"
            value={editingSpeed}
            onChange={(e) => setEditingSpeed(e.target.value)}
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
              "text-center hide-number-spinners"
            )}
            min="0"
          />
        </div>
      </div>
      <div className="pt-2">
        <label
          htmlFor="editingShieldEquipped"
          className="flex items-center space-x-1.5 cursor-pointer"
        >
          <input
            id="editingShieldEquipped"
            type="checkbox"
            checked={editingShieldEquipped}
            onChange={(e) => setEditingShieldEquipped(e.target.checked)}
            className="h-3.5 w-3.5 rounded-sm focus:ring-accent-primary bg-surface-1"
          />
          <span className={cn("block text-[0.8rem] font-medium mb-px", "mb-0")}>
            ESCUDO
          </span>
        </label>
      </div>
    </fieldset>
  );
};
