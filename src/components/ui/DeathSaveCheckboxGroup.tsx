import React from "react";
import { condensedLabelClass, condensedCheckboxClass } from "../../styles/formClasses"; // Importar as classes

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
        className={`${condensedLabelClass} text-[10px] text-center uppercase`}
      >
        {label}
      </label>
      <div className="flex space-x-1.5 justify-center mt-0.5">
        {[1, 2, 3].map((value) => (
          <input
            key={value}
            type="checkbox"
            className={condensedCheckboxClass + " cursor-pointer !h-3 !w-3"}
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
