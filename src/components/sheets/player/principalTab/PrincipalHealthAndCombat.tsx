import { usePlayerSheet } from "../../../../contexts/PlayerSheetContext";
import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";
import { EditIcon, PlusCircleIcon } from "../../../icons";
import { useModal } from "../../../../contexts/ModalContext";
import { type Action } from "../../../../shared/types";

export function PrincipalHealthAndCombat() {
  const {
    editingArmorClass,
    setEditingArmorClass,
    editingInitiative,
    setEditingInitiative,
    editingSpeed,
    setEditingSpeed,
    editingShieldEquipped,
    setEditingShieldEquipped,
    editingCurrentHp,
    setEditingCurrentHp,
    editingTempHp,
    setEditingTempHp,
    editingMaxHp,
    setEditingMaxHp,
    editingHitDiceEntries,
    setEditingHitDiceEntries,
    actions,
    handleAddAction,
  } = usePlayerSheet();

  const { openModal } = useModal();

  const handleOpenEditModal = (action: Action) => {
    openModal("actionEdit", { actionId: action.id });
  };

  return (
    <section className="flex flex-col space-y-2.5 w-[16rem]">
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <div>
        <CombatStats
          editingArmorClass={editingArmorClass}
          setEditingArmorClass={setEditingArmorClass}
          editingInitiative={editingInitiative}
          setEditingInitiative={setEditingInitiative}
          editingSpeed={editingSpeed}
          setEditingSpeed={setEditingSpeed}
          editingShieldEquipped={editingShieldEquipped}
          setEditingShieldEquipped={setEditingShieldEquipped}
        />
        <HealthSection
          editingCurrentHp={editingCurrentHp}
          setEditingCurrentHp={setEditingCurrentHp}
          editingTempHp={editingTempHp}
          setEditingTempHp={setEditingTempHp}
          editingMaxHp={editingMaxHp}
          setEditingMaxHp={setEditingMaxHp}
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
          {actions.map((action) => (
            <div key={action.id} className="relative group">
              <button
                type="button"
                title="Realizar ação"
                className="w-full grid grid-cols-6 gap-2 text-[0.70rem] rounded bg-accent-primary hover:bg-surface-4 text-start hover:bg-accent-primary-hover hover:shadow-md"
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
                  onClick={() => handleOpenEditModal(action)}
                  className="flex items-center justify-center w-5 h-5 text-xl font-bold rounded bg-accent-primary hover:bg-accent-primary-hover"
                  title="Editar ação"
                >
                  <EditIcon height={4} width={4} />
                </button>
              </div>
            </div>
          ))}
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
