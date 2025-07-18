import { PlayerCharacter } from "@/entities/character/model/schemas/character.schema";
import { cn } from "@/shared/lib/utils/cn";
import { generateUniqueId } from "@/shared/lib/utils/id/idUtils";
import { DeleteIcon, PlusCircleIcon } from "@/shared/ui/Icons";
import { useFormContext, useFieldArray } from "react-hook-form";

export const HealthSection = () => {
  const { register, control, formState } = useFormContext<PlayerCharacter>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hitDiceEntries",
  });

  const currentHpError = formState.errors.combatStats?.currentHp?.message;

  const handleAddHitDice = () => {
    append({ id: generateUniqueId(), type: "d6", quantity: 1 });
  };

  const handleDeleteConfirmation = (index: number) => {
    remove(index);
  };

  return (
    <fieldset
      id="pontos de vida"
      className="flex flex-col space-y-1.5 p-2 rounded-md bg-surface-1 mt-2"
    >
      <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold">
        PONTOS DE VIDA
      </legend>

      <div>
        <div>
          <label
            htmlFor="currentHp"
            className={cn(
              "block text-[0.8rem] font-medium mb-px",
              "text-[10px] text-center block"
            )}
          >
            ATUAL
          </label>
          <input
            id="currentHp"
            type="number"
            {...register("combatStats.currentHp", { valueAsNumber: true })}
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-text-primary placeholder-text-secondary",
              "text-center hide-arrows",
              currentHpError && "border-feedback-negative"
            )}
          />
          {currentHpError && (
            <p className="text-feedback-negative text-xs mt-1">
              {currentHpError}
            </p>
          )}
        </div>
        <div className="flex space-x-1.5 mt-1.5">
          <div className="flex-1">
            <label
              htmlFor="tempHp"
              className={cn(
                "block text-[0.8rem] font-medium mb-px",
                "text-[10px] text-center block"
              )}
            >
              TEMPORÁRIO
            </label>
            <input
              id="tempHp"
              type="number"
              {...register("combatStats.tempHp", { valueAsNumber: true })}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                "text-center hide-arrows"
              )}
              min="0"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxHp"
              className={cn(
                "block text-[0.8rem] font-medium mb-px",
                "text-[10px] text-center block"
              )}
            >
              MÁXIMO
            </label>
            <input
              id="maxHp"
              type="number"
              {...register("combatStats.maxHp", { valueAsNumber: true })}
              className={cn(
                "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                "text-center hide-arrows"
              )}
              min="1"
            />
          </div>
        </div>
      </div>

      <fieldset className="flex-1 rounded bg-surface-1 relative">
        <legend className="bg-surface-1 rounded text-sm font-bold">
          Dados de Vida
        </legend>
        <button
          type="button"
          onClick={handleAddHitDice}
          className="flex items-center justify-center -bottom-5.5 w-6 h-6 right-[50%] translate-x-1/2 absolute text-xl font-bold bg-accent-primary text-text-primary rounded-[10rem] hover:bg-accent-secondary"
        >
          <PlusCircleIcon />
        </button>
        <ul className="flex flex-col">
          {fields.map((field, index) => (
            <li key={field.id} className="flex items-center space-x-2 mb-2">
              <select
                {...register(`hitDiceEntries.${index}.type`)}
                className={cn(
                  "p-1 bg-surface-1 border font-bold border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary",
                  "w-20"
                )}
              >
                <option value="d4">D4</option>
                <option value="d6">D6</option>
                <option value="d8">D8</option>
                <option value="d10">D10</option>
                <option value="d12">D12</option>
              </select>
              <input
                type="number"
                {...register(`hitDiceEntries.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                className={cn(
                  "w-full p-1 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-arrows"
                )}
                min="1"
              />
              <button
                type="button"
                title="Remover dado de vida"
                onClick={() => handleDeleteConfirmation(index)}
                disabled={fields.length === 1}
                className="p-2 t hover:text-surface-0 bg-feedback-negative rounded-md hover:bg-feedback-negative-hover flex items-center justify-center text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DeleteIcon className="w-10 h-5" />
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </fieldset>
  );
};
