import React from "react";
import { cn } from "../../utils/cn"; // Importar utilitário de classes

interface DeathSaveCheckboxGroupProps {
  count: number;
  onChange: (newCount: number) => void;
  type: "success" | "failure";
  label: string;
}

const DeathSaveCheckboxGroup: React.FC<DeathSaveCheckboxGroupProps> = ({
  count,
  onChange,
  type,
  label,
}) => {
  return (
    <div className="flex flex-col items-center">
      <label
        className={cn("block text-[11px] font-medium text-accent-primary mb-px", "text-[10px] text-center uppercase")}
      >
        {label}
      </label>
      <div className="flex space-x-1.5 justify-center mt-0.5">
        {[1, 2, 3].map((value) => (
          <input
            key={value}
            type="checkbox"
            className={cn("h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1", "cursor-pointer !h-3 !w-3")}
            checked={count >= value}
            onChange={() => {
              if (count >= value) {
                onChange(value - 1);
              } else {
                onChange(value);
              }
            }}
            aria-label={`${type} ${value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DeathSaveCheckboxGroup;
