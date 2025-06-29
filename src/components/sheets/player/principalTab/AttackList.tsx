import React from "react";
import { Attack } from "../../../../shared/api/types"; // Certifique-se de que o tipo Attack está definido em types/index.ts
import { cn } from "../../../../shared/lib/utils/cn";
import { PlusCircleIcon } from "../../../../shared/ui/Icons";
import { AttackItem } from "./AttackItem";

interface AttackListProps {
  attacks: Attack[];
  handleAddAttack: () => void;
  handleRemoveAttack: (id: string) => void;
  handleAttackChange: (id: string, field: keyof Attack, value: string) => void;
}

export const AttackList: React.FC<AttackListProps> = ({
  attacks,
  handleAddAttack,
  handleRemoveAttack,
  handleAttackChange,
}) => {
  return (
    <div className="col-span-1 flex flex-col space-y-2.5 border p-2 rounded-md">
      <h3
        className={cn(
          "block text-[0.6875rem] font-medium text-accent-primary mb-px",
          "text-center uppercase mb-1"
        )}
      >
        Ataques & Cantrips
      </h3>
      {attacks &&
        attacks.map((attack) => (
          <AttackItem
            key={attack.id}
            attack={attack}
            onAttackChange={handleAttackChange}
            onRemoveAttack={handleRemoveAttack}
          />
        ))}
      <button
        type="button"
        onClick={handleAddAttack}
        className="flex items-center justify-center space-x-1 py-1 text-xs text-accent-primary hover:text-accent-primary-hover border border-accent-primary hover:border-accent-primary-hover rounded-md"
      >
        <PlusCircleIcon className="h-4 w-4" />
        <span>Adicionar Ataque</span>
      </button>
    </div>
  );
};
