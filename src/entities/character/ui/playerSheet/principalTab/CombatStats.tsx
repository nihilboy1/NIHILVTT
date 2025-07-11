// src/entities/character/ui/playerSheet/principalTab/CombatStats.tsx

import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../../../../shared/lib/utils/cn";
import { type PlayerCharacterSchema } from "../../../model/schemas/character.schema";

// Helper para calcular o modificador de um atributo
const getModifier = (attributeValue: number | undefined) => {
  if (typeof attributeValue !== "number") return 0;
  return Math.floor((attributeValue - 10) / 2);
};

// Helper para calcular o bônus de proficiência (regra padrão 5e)
const getProficiencyBonus = (level: number | undefined) => {
  if (typeof level !== "number" || level < 1) return 2; // Retorna 2 como padrão se o nível for inválido
  return Math.floor((level - 1) / 4) + 2;
};


export const CombatStats: React.FC = () => {
  // 1. "Observamos" todos os valores base que precisamos do formulário
  const { register, watch } = useFormContext<PlayerCharacterSchema>();
  const level = Number(watch("level") || 0);
  const dexterity = Number(watch("attributes.dexterity") || 0);
  const wisdom = Number(watch("attributes.wisdom") || 0);
  const isPerceptionProficient = watch("proficiencies.skills.perception");

  // 2. Calculamos os valores derivados usando os valores base
  const dexModifier = getModifier(dexterity);
  const wisModifier = getModifier(wisdom);
  const proficiencyBonus = getProficiencyBonus(level);
  
  const calculatedInitiative = dexModifier;
  // Percepção passiva só adiciona o bônus de proficiência se o personagem for proficiente
  const calculatedPassivePerception = 10 + wisModifier + (isPerceptionProficient ? proficiencyBonus : 0);

  return (
    <fieldset className="p-2 rounded-md bg-surface-1">
      <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
        Armadura e Combate
      </legend>
      <div className="flex justify-between items-end">
        {/* CA */}
        <div className="w-16">
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
              "w-full p-2 text-center hide-number-spinners" /* ... */
            )}
            min="0"
          />
        </div>
        {/* Iniciativa */}
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
              "w-full p-2 text-center text-lg font-semibold" /* ... */
            )}
          >
            {calculatedInitiative >= 0
              ? `+${calculatedInitiative}`
              : calculatedInitiative}
          </div>
        </div>
        {/* Deslocamento */}
        <div className="w-16">
          <label
            htmlFor="speed"
            className="block text-[0.8rem] font-medium mb-px"
          >
            DESLOC.
          </label>
          <input
            id="speed"
            type="number"
            {...register("combatStats.speed", { valueAsNumber: true })}
            className={cn(
              "w-full p-2 text-center hide-number-spinners" /* ... */
            )}
            min="0"
          />
        </div>
      </div>
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
          <span className={cn("block text-[0.8rem] font-medium mb-px", "mb-0")}>
            ESCUDO
          </span>
        </label>
        {/* Percepção Passiva */}
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
              "w-full p-2 text-center text-lg font-semibold" /* ... */
            )}
          >
            {calculatedPassivePerception}
          </div>
        </div>
      </div>
    </fieldset>
  );
};
