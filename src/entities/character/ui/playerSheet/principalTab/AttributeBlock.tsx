

import { useFormContext } from 'react-hook-form';
import { cn } from "../../../../../shared/lib/utils/cn";
import { handleNumericInputKeyDown } from "@/entities/character/lib/utils/characterUtils";
import { PlayerCharacter } from '../../../model/schemas/character.schema';
import { Path } from 'react-hook-form';

interface AttributeBlockProps {
  name: Path<PlayerCharacter>;
  label: string;
  modifier: number;
  onRoll?: () => void;
}

export const AttributeBlock: React.FC<AttributeBlockProps> = ({
  name,
  label,
  modifier,
  onRoll,
}) => {
  const { register } = useFormContext<PlayerCharacter>();
  return (
    <div
      className={cn(
        "flex items-end transition-colors duration-200 rounded-md p-1 gap-2 w-fit",
        onRoll && "cursor-pointer hover:bg-surface-2"
      )}
      onClick={onRoll}
    >
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className={cn(
            "cursor-pointer block text-xs font-bold mb-0.5",
            "text-xs uppercase"
          )}
        >
          {label}
        </label>
          <input
            id={name}
            type="number"
            {...register(name, { valueAsNumber: true })}
            className={cn(
              "text-center hide-arrows w-12 text-lg font-semibold p-0",
              "w-[6rem] p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary h-10"
            )}
            onKeyDown={(e) => handleNumericInputKeyDown(e, { min: 1, max: 30 })}
            onClick={(e) => e.stopPropagation()}
          />
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="flex justify-center items-center text-2xl font-bold p-1 border rounded text-center h-10 pb-2 w-[4rem]">
          {modifier >= 0 ? `+${modifier}` : modifier}
        </span>
      </div>
    </div>
  );
};
