// src/entities/character/ui/playerSheet/principalTab/PrincipalHeader.tsx

import { useFormContext } from 'react-hook-form';
import { PlayerCharacterSchema } from '../../../model/schemas/character.schema';

export function PrincipalHeader() {
  const { register, watch } = useFormContext<PlayerCharacterSchema>();

  const level = watch('level');
  const calculatedProficiencyBonus = level ? Math.floor((level - 1) / 4) + 2 : 2;

  return (
    <div className="flex w-full rounded-md gap-10 mb-2 items-center bg-surface-1 p-2">
      <div id="name" className="flex flex-col">
        <label htmlFor="characterName" className="text-[1.2rem] font-medium -mt-1 w-[15rem]">
          NOME DO PERSONAGEM
        </label>
        <input
          id="characterName"
          type="text"
          {...register("name")}
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-[1rem]"
          required
          maxLength={28}
        />
      </div>

      <div id="classAndSubclass" className="flex flex-col gap-1">
        <div>
          <label htmlFor="charClass" className="block text-[0.6rem] font-medium w-full">
            CLASSE
          </label>
          <input id="charClass" type="text" {...register("charClass")} className="w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]" />
        </div>
        <div>
          <label htmlFor="subclass" className="block text-[0.6rem] font-medium w-full -mb-1">
            SUBCLASSE
          </label>
          <input id="subclass" type="text" {...register("subclass")} className="w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]" />
        </div>
      </div>

      <div id="backgroundAndSpecies" className="flex flex-col gap-1">
        <div>
          <label htmlFor="background" className="block text-[0.6rem] font-medium w-full">
            ANTECEDENTE
          </label>
          <input id="background" type="text" {...register("background")} className="w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]" />
        </div>
        <div>
          <label htmlFor="species" className="block text-[0.6rem] font-medium w-full -mb-0.5">
            ESPÉCIE
          </label>
          <input id="species" type="text" {...register("species")} className="w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]" />
        </div>
      </div>

      <div id="levelAndProficiency" className="flex flex-col w-[5rem]">
        <div>
          <label htmlFor="level" className="block text-[0.6rem] font-medium w-full">
            NÍVEL
          </label>
          <input
            id="level"
            type="number"
            {...register("level", { valueAsNumber: true })}
            className="hide-arrows w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]"
            min="1" max="99" step="1"
          />
        </div>
        <div>
          <label htmlFor="calculatedProficiencyBonus" className="block text-[0.6rem] font-medium w-full">
            PROF. BÔNUS
          </label>
          <span id="calculatedProficiencyBonus" className="block hide-arrows pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem]">
            +{calculatedProficiencyBonus}
          </span>
        </div>
      </div>
    </div>
  );
}
