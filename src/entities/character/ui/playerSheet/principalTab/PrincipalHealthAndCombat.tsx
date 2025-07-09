import { type Action } from "../../../../../shared/api/types";
import { EditIcon, PlusCircleIcon } from "../../../../../shared/ui/Icons";
import { useDiceRoller } from "../../../../../shared/lib/hooks/useDiceRoller";
import { usePlayerSheet } from "../../../model/contexts/CharacterSheetContext";
import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";

export function PrincipalHealthAndCombat() {
  const {
    combatStats,
    editingHitDiceEntries,
    setEditingHitDiceEntries,
    actions,
    handleAddAction,
  } = usePlayerSheet();

  const { openModal } = useModal();

  const handleOpenEditModal = (action: Action) => {
    openModal("actionEdit", { actionId: action.id }, false); // Abrir ActionEditModal como não dismissible
  };

  return (
    <section className="flex flex-col space-y-2.5 w-[16rem]">
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <div>
        <CombatStats
          editingArmorClass={combatStats.editingArmorClass}
          setEditingArmorClass={combatStats.setEditingArmorClass}
          editingSpeed={combatStats.editingSpeed}
          setEditingSpeed={combatStats.setEditingSpeed}
          editingShieldEquipped={combatStats.editingShieldEquipped}
          setEditingShieldEquipped={combatStats.setEditingShieldEquipped}
        />
        <HealthSection
          editingMaxHp={combatStats.editingMaxHp}
          setEditingMaxHp={combatStats.setEditingMaxHp}
          editingTempHp={combatStats.editingTempHp}
          setEditingTempHp={combatStats.setEditingTempHp}
          editingHitDiceEntries={editingHitDiceEntries}
          setEditingHitDiceEntries={setEditingHitDiceEntries}
        />
        <fieldset
          id="Ações"
          className="relative flex flex-col space-y-1.5 mt-4 p-2 rounded-md bg-surface-1 pb-5 "
        >
          <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold ">
            AÇÕES
          </legend>
          {actions.map(
            (action: Action) => {
              const { rollDice } = useDiceRoller();
              const { playerCharacter } = usePlayerSheet(); // Obter o personagem para o sender

              const handleRollAction = () => {
                if (action.bonus) {
                  rollDice(action.bonus, action.name, "Attack", playerCharacter.name);
                }
                if (action.damage) {
                  rollDice(action.damage, `${action.name} - Dano`, "Damage", playerCharacter.name);
                }
              };

              return (
                <div key={action.id} className="relative group">
                  <button
                    type="button"
                    title="Realizar ação"
                    className="w-full grid grid-cols-6 gap-2 text-[0.70rem] rounded bg-accent-primary hover:bg-surface-4 text-start hover:bg-accent-primary-hover hover:shadow-md"
                    onClick={handleRollAction} // Adicionar onClick para rolagem
                  >
                    <span className="border col-span-3 border-surface-2 rounded-md p-1 my-1 ml-1">
                      {action.name || "-"}
                    </span>
                    <span className="border border-surface-2 rounded-md p-1 my-1">
                      {typeof action.bonus === 'number' ? (action.bonus >= 0 ? `+${action.bonus}` : action.bonus) : action.bonus || "-"}
                    </span>
                    <span className="border col-span-2 border-surface-2 rounded-md p-1 my-1 mr-1">
                      {typeof action.damage === 'number' ? (action.damage >= 0 ? `+${action.damage}` : action.damage) : action.damage || "-"}
                    </span>
                  </button>
                  <div className="absolute -top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(action)}
                      className="flex items-center justify-center w-5 h-5 text-xl font-bold bg-accent-primary hover:bg-accent-primary-hover"
                      title="Editar ação"
                    >
                      <EditIcon height={4} width={4} />
                    </button>
                  </div>
                </div>
              );
            }
          )}
          <button
            type="button"
            onClick={handleAddAction}
            title="Adicionar nova ação"
            className="absolute -bottom-3.5 right-[50%] translate-x-1/2 flex items-center justify-center w-6 h-6 text-xl font-bold bg-accent-primary text-text-primary rounded-[10rem] hover:bg-accent-secondary "
          >
            <PlusCircleIcon />
          </button>
        </fieldset>
      </div>
    </section>
  );
}
