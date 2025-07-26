import { useFormContext, useFieldArray } from "react-hook-form";

import { useCharacterCalculations } from "@/entities/character/lib/hooks/useCharacterCalculations";
import {
  Action,
  PlayerCharacter,
} from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";
import {
  EditIcon,
  PlusCircleIcon,
  DeleteIcon,
} from "@/shared/ui/Icons";

import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";


interface HealthAndCombatDetailsProps {
  className?: string;
  onEditAction: (actionId: string) => void;
  onRollDice: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    characterName: string
  ) => void;
}

export function HealthAndCombatDetails({
  className,
  onEditAction,
  onRollDice,
}: HealthAndCombatDetailsProps) {
  const { watch, control } = useFormContext<PlayerCharacter>();
  const {
    fields: actions,
    append: appendAction,
    remove: removeAction,
  } = useFieldArray({
    control,
    name: "actions",
  });

  const character = watch();
  const characterName = watch("name");

  const {
    calculatedInitiative,
    calculatedPassivePerception,
    speedInMeters,
    speedInSquares,
  } = useCharacterCalculations(character);

  const handleRollAction = (action: Action) => {
    if (action.bonus)
      onRollDice(action.bonus, action.name, "Attack", characterName);
    if (action.damage)
      onRollDice(
        action.damage,
        `${action.name} - Dano`,
        "Damage",
        characterName
      );
  };

  const handleOpenEditModal = (actionId: string) => {
    onEditAction(actionId);
  };

  return (
    <section className={`flex flex-col space-y-2.5 w-[16rem] ${className}`}>
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <div>
        <CombatStats
          calculatedInitiative={calculatedInitiative}
          calculatedPassivePerception={calculatedPassivePerception}
          speedInMeters={speedInMeters}
          speedInSquares={speedInSquares}
        />
        <HealthSection />

        <fieldset
          id="Ações"
          className="relative flex flex-col space-y-1.5 mt-4 p-2 rounded-md bg-surface-1 pb-5"
        >
          <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold">
            AÇÕES
          </legend>
          {actions.map((action, index) => (
            <div key={action.id} className="relative group">
              <button
                type="button"
                title="Realizar ação"
                className="w-full grid grid-cols-6 gap-2 text-[0.70rem] rounded bg-accent-primary hover:bg-surface-4 text-start hover:bg-accent-primary-hover hover:shadow-md"
                onClick={() => handleRollAction(action)}
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
                  onClick={() => handleOpenEditModal(action.id)}
                >
                  <EditIcon size={4} />
                </button>
                <button
                  type="button"
                  title="Remover ação"
                  onClick={() => removeAction(index)}
                  className="p-2 hover:text-surface-0 bg-feedback-negative rounded-md hover:bg-feedback-negative-hover flex items-center justify-center text-sm font-bold"
                >
                  <DeleteIcon className="w-10 h-5" />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendAction({
                id: crypto.randomUUID(),
                name: "Nova Ação",
                bonus: "",
                damage: "",
              })
            }
          >
            <PlusCircleIcon />
          </button>
        </fieldset>
      </div>
    </section>
  );
}
