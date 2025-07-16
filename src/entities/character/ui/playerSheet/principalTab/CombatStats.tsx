import { useFormContext } from 'react-hook-form';
import { cn } from "../../../../../shared/lib/utils/cn";
import { handleNumericInputKeyDown } from "@/entities/character/lib/utils/characterUtils";
import { PlayerCharacter } from '../../../model/schemas/character.schema';

interface CombatStatsProps {
  calculatedInitiative: number;
  calculatedPassivePerception: number;
  speedInMeters: string;
  speedInSquares: string;
}

export const CombatStats: React.FC<CombatStatsProps> = ({
  calculatedInitiative,
  calculatedPassivePerception,
  speedInMeters,
  speedInSquares,
}) => {
  const { register } = useFormContext<PlayerCharacter>();

 
  return (
    <fieldset className="p-2 rounded-md bg-surface-1 border">
      <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
        Armadura e Combate
      </legend>
      <div className="flex justify-between ">
        {/* CA */}
        <div className="w-16 ">
          <label
            htmlFor="armorClass"
            className="text-center block text-[0.8rem] font-medium mb-px"
          >
            CA
          </label>
          <input
            id="armorClass"
            type="number"
            {...register("combatStats.armorClass", { valueAsNumber: true })}
            className={cn(
              "w-full p-2 text-center hide-arrows border rounded border-text-secondary h-10"
            )}
            onKeyDown={(e) => {
              handleNumericInputKeyDown(e, { min: 1, max: 40 });
            }}
          />
          <div className="pt-2 flex justify-between items-center">
            {/* Escudo */}
            <label
              htmlFor="shieldEquipped"
              className="flex items-center space-x-1.5 cursor-pointer"
            >
              <input
                id="shieldEquipped"
                type="checkbox"
                {...register("combatStats.shieldEquipped")}
                className="h-3.5 w-3.5 rounded-sm focus:ring-accent-primary bg-surface-1"
              />
              <span
                className={cn("block text-[0.8rem] font-medium mb-px", "mb-0")}
              >
                ESCUDO
              </span>
            </label>
            {/* Percepção Passiva */}
          </div>
        </div>
        {/* Iniciativa */}
        <div className="w-16 ">
          <label
            htmlFor="initiative"
            className="block text-[0.8rem] font-medium mb-px"
          >
            INICIATIVA
          </label>
          <div
            id="initiative"
            className={cn(
              "w-full p-2 text-center text-lg font-semibold border rounded border-text-secondary h-10 flex justify-center items-center"
            )}
          >
            {calculatedInitiative >= 0
              ? `+${calculatedInitiative}`
              : calculatedInitiative}
          </div>
        </div>
        {/* ALTERADO: Bloco de Deslocamento refatorado */}
        <div className="w-16 ">
          <label
            htmlFor="speed"
            title="Deslocamento em FEET"
            className="block text-[0.8rem] font-medium mb-px"
          >
            DESLOC.
          </label>
          <input
            id="speed"
            type="number"
            {...register("combatStats.speed", { valueAsNumber: true })}
            className={cn(
              "w-full p-2 text-center hide-arrows border rounded border-text-secondary h-10"
            )}
            onKeyDown={(e) =>
              handleNumericInputKeyDown(e, { min: 0, max: 150 })
            }
          />
          {/* NOVO: Container para os valores calculados */}
          <div className="text-center mt-1 flex flex-col justify-center items-center ">
            <p
              className="text-xs text-text-secondary/80  text-center cursor-default hover:text-text-secondary"
              title="Deslocamento em METROS"
            >
              {speedInMeters} M
            </p>
            <p
              className="text-xs text-text-secondary/80 text-center cursor-default hover:text-text-secondary"
              title="Deslocamento em QUADRADOS"
            >
              {speedInSquares} Q
            </p>
          </div>
        </div>
        <div className="w-24">
          <label
            htmlFor="passivePerception"
            title="Percepção Passiva"
            className="block text-[0.8rem] font-medium mb-px text-center"
          >
            PASS PERCEP
          </label>
          <div
            id="passivePerception"
            className={cn(
              "w-full p-2 text-center text-lg font-semibold border rounded border-text-secondary h-10 flex justify-center items-center"
            )}
          >
            {calculatedPassivePerception}
          </div>
        </div>
      </div>
    </fieldset>
  );
};
