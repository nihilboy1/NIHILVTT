import React from "react";
import { Attack } from "../../../../shared/api/types"; // Certifique-se de que o tipo Attack está definido em types/index.ts
import { cn } from "../../../../shared/lib/utils/cn";
import { DeleteIcon } from "../../../../shared/ui/Icons";

interface AttackItemProps {
  attack: Attack;
  onAttackChange: (id: string, field: keyof Attack, value: string) => void;
  onRemoveAttack: (id: string) => void;
}

export const AttackItem: React.FC<AttackItemProps> = ({
  attack,
  onAttackChange,
  onRemoveAttack,
}) => {
  return (
    <div className="grid grid-cols-12 gap-x-1.5 items-center border-b pb-1.5 mb-1.5">
      <div className="col-span-5">
        <input
          type="text"
          placeholder="Nome do Ataque"
          value={attack.name}
          onChange={(e) => onAttackChange(attack.id, "name", e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "text-xs"
          )}
        />
      </div>
      <div className="col-span-3">
        <input
          type="text"
          placeholder="+ Ataque"
          value={attack.attackBonus}
          onChange={(e) =>
            onAttackChange(attack.id, "attackBonus", e.target.value)
          }
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "text-xs text-center"
          )}
        />
      </div>
      <div className="col-span-3">
        <input
          type="text"
          placeholder="Dano/Tipo"
          value={attack.damage}
          onChange={(e) => onAttackChange(attack.id, "damage", e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "text-xs"
          )}
        />
      </div>
      <button
        type="button"
        onClick={() => onRemoveAttack(attack.id)}
        className="col-span-1 justify-self-center"
      >
        <DeleteIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
