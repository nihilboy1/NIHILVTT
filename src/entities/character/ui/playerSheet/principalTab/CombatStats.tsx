import React from "react";
import { cn } from "../../../../../shared/lib/utils/cn";
import { usePlayerSheet } from "../../../model/contexts/CharacterSheetContext"; // Importar usePlayerSheet

interface CombatStatsProps {
  editingArmorClass: string;
  setEditingArmorClass: (value: string) => void;
  // editingInitiative e setEditingInitiative removidos, pois agora é calculado
  editingSpeed: string;
  setEditingSpeed: (value: string) => void;
  editingShieldEquipped: boolean;
  setEditingShieldEquipped: (value: boolean) => void;
}

export const CombatStats: React.FC<CombatStatsProps> = ({
  editingArmorClass,
  setEditingArmorClass,
  editingSpeed,
  setEditingSpeed,
  editingShieldEquipped,
  setEditingShieldEquipped,
}) => {
  const { calculatedInitiative, calculatedPassivePerception } = usePlayerSheet(); // Obter valores calculados do contexto

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
            htmlFor="initiative"
            className="block text-[0.8rem] font-medium mb-px"
          >
            INICIATIVA
          </label>
          <div
            id="initiative"
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-text-primary",
              "text-center text-lg font-semibold"
            )}
          >
            {calculatedInitiative >= 0 ? `+${calculatedInitiative}` : calculatedInitiative}
          </div>
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
      <div className="pt-2 flex justify-between items-center">
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
        <div className="w-24">
          <label
            htmlFor="passivePerception"
            className="block text-[0.8rem] font-medium mb-px text-center"
          >
            PERCEPÇÃO PASSIVA
          </label>
          <div
            id="passivePerception"
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-text-primary",
              "text-center text-lg font-semibold"
            )}
          >
            {calculatedPassivePerception}
          </div>
        </div>
      </div>
    </fieldset>
  );
};
