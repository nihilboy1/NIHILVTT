import { handleNumericInputKeyDown } from "@/entities/character/lib/utils/characterUtils";
import { PlayerCharacter } from "@/entities/character/model/schemas/character.schema";
import { cn } from "@/shared/lib/utils/cn";
import { Path, useFormContext, useWatch } from "react-hook-form";

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
  const { register, control } = useFormContext<PlayerCharacter>();
  const value = useWatch({ name, control }); // pega valor atual do input

  const isEmpty =
    value === undefined ||
    value === null ||
    value === "" ||
    Number.isNaN(value);

  const displayModifier =
    isEmpty || Number.isNaN(modifier)
      ? 0
      : modifier >= 0
      ? `+${modifier}`
      : modifier;

  return (
    <div
      className={cn(
        "flex items-center transition-colors duration-200 rounded-md p-1 gap-2 w-fit -mb-2",
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
        <div>
          <input
            id={name}
            type="number"
            {...register(name, { valueAsNumber: true })}
            className={cn(
              "text-center hide-arrows text-lg font-semibold p-0",
              "w-[6rem] p-2 bg-surface-1 border rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary h-10",
              isEmpty ? "border-red-500" : "border-surface-2"
            )}
            onKeyDown={(e) => handleNumericInputKeyDown(e, { min: 1, max: 30 })}
            onClick={(e) => e.stopPropagation()}
          />

          <p
            className={cn(
              "text-xs mt-1",
              isEmpty ? "text-red-500" : "invisible"
            )}
          >
            Não pode ser vazio
          </p>
        </div>
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="flex justify-center items-center text-2xl font-bold p-1 border rounded text-center h-10 pb-2 w-[4rem]">
          {displayModifier}
        </span>
      </div>
    </div>
  );
};
