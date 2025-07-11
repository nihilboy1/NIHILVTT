// src/entities/character/ui/playerSheet/principalTab/PrincipalHealthAndCombat.tsx

import { useFormContext, useFieldArray } from "react-hook-form"; // 1. Importar useFieldArray
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import { EditIcon, PlusCircleIcon } from "../../../../../shared/ui/Icons";
import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";
import { PlayerCharacterSchema } from "../../../model/schemas/character.schema";
import { type Action } from "../../../../../shared/api/types";

interface PrincipalHealthAndCombatProps {
  className?: string;
}

export function PrincipalHealthAndCombat({ className }: PrincipalHealthAndCombatProps) {
  const { control, watch } = useFormContext<PlayerCharacterSchema>();
  const { openModal } = useModal();
  const { rollDice } = useDiceRoller();
  const characterName = watch("name");

  // 2. useFieldArray para gerenciar a lista de ações
  const { fields, append } = useFieldArray({
    control,
    name: "actions",
  });

  const handleAddAction = () => {
    // Adiciona uma nova ação em branco ao formulário
    append({
      id: crypto.randomUUID(),
      name: "Nova Ação",
      bonus: "",
      damage: "",
    });
  };

  const handleOpenEditModal = (actionId: string) => {
    openModal("actionEdit", { actionId: actionId }, false);
  };

  return (
    <section className={`flex flex-col space-y-2.5 w-[16rem] ${className}`}>
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <div>
        {/* 3. Passamos os nomes dos campos para os filhos */}
        <CombatStats />
        <HealthSection />

        <fieldset
          id="Ações"
          className="relative flex flex-col space-y-1.5 mt-4 p-2 rounded-md bg-surface-1 pb-5"
        >
          <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold">
            AÇÕES
          </legend>
          {/* 4. Iteramos sobre os 'fields' do useFieldArray */}
          {fields.map((field) => {
            const action = field as Action; // Cast para o seu tipo, se necessário

            const handleRollAction = () => {
              if (action.bonus)
                rollDice(action.bonus, action.name, "Attack", characterName);
              if (action.damage)
                rollDice(
                  action.damage,
                  `${action.name} - Dano`,
                  "Damage",
                  characterName
                );
            };

            return (
              <div key={field.id} className="relative group">
                {/* Aqui, os inputs dentro deste botão seriam registrados com `actions.${index}.name`, etc. */}
                <button
                  type="button"
                  title="Realizar ação"
                  className="w-full grid grid-cols-6 gap-2 text-[0.70rem] rounded bg-accent-primary hover:bg-surface-4 text-start hover:bg-accent-primary-hover hover:shadow-md"
                  onClick={handleRollAction}
                >
                  <span className="border col-span-3 border-surface-2 rounded-md p-1 my-1 ml-1">
                    {action.name || "-"}
                  </span>
                  <span className="border border-surface-2 rounded-md p-1 my-1">
                    {action.bonus || "-"}
                  </span>
                  <span className="border col-span-2 border-surface-2 rounded-md p-1 my-1 mr-1">
                    {action.damage || "-"}
                  </span>
                </button>
                <div className="absolute -top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(action.id)} /* ... */
                  >
                    <EditIcon height={4} width={4} />
                  </button>
                </div>
              </div>
            );
          })}
          <button type="button" onClick={handleAddAction} /* ... */>
            <PlusCircleIcon />
          </button>
        </fieldset>
      </div>
    </section>
  );
}
