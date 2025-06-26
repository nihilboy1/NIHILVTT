import { cn } from "../../../../utils/cn";
import { usePlayerSheet } from "../../../../contexts/PlayerSheetContext";
import { generateUniqueId } from '../../../../utils/id/idUtils';

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
  } = usePlayerSheet();

  const handleAddHitDice = () => {
    setEditingHitDiceEntries([
      ...editingHitDiceEntries,
      { id: generateUniqueId(), type: "d6", quantity: 1 },
    ]);
  };

  const handleRemoveHitDice = (id: string) => {
    setEditingHitDiceEntries(
      editingHitDiceEntries.filter((entry) => entry.id !== id)
    );
  };

  const handleUpdateHitDice = (
    id: string,
    field: "type" | "quantity",
    value: string | number
  ) => {
    setEditingHitDiceEntries(
      editingHitDiceEntries.map((entry) =>
        entry.id === id
          ? { ...entry, [field]: field === "quantity" ? Number(value) : value }
          : entry
      )
    );
  };

  return (
    <section className="flex flex-col space-y-2.5 w-[15rem]">
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <form>
        <fieldset className="p-2 rounded-md bg-surface-1">
          <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
            Armadura e Combate
          </legend>
          <div className="flex justify-between items-end ">
            <div className="w-16">
              <label
                htmlFor="editingArmorClass"
                className="text-center block text-[0.8rem] font-medium mb-px"
              >
                CA
              </label>
              <input
                id="editingArmorClass"
                type="number"
                value={editingArmorClass}
                onChange={(e) => setEditingArmorClass(e.target.value)}
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
                min="0"
              />
            </div>
            <div className="w-16">
              <label
                htmlFor="editingInitiative"
                className="block text-[0.8rem] font-medium mb-px"
              >
                INICIATIVA
              </label>
              <input
                id="editingInitiative"
                type="number"
                value={editingInitiative}
                onChange={(e) => setEditingInitiative(e.target.value)}
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
              />
            </div>
            <div className="w-16">
              <label
                htmlFor="editingSpeed"
                className="block text-[0.8rem] font-medium mb-px"
              >
                DESLOC.
              </label>
              <input
                id="editingSpeed"
                type="number"
                value={editingSpeed}
                onChange={(e) => setEditingSpeed(e.target.value)}
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
                min="0"
              />
            </div>
          </div>
          <div className="pt-2">
            <label
              htmlFor="editingShieldEquipped"
              className="flex items-center space-x-1.5 cursor-pointer"
            >
              <input
                id="editingShieldEquipped"
                type="checkbox"
                checked={editingShieldEquipped}
                onChange={(e) => setEditingShieldEquipped(e.target.checked)}
                className="h-3.5 w-3.5 rounded-sm focus:ring-accent-primary bg-surface-1"
              />
              <span
                className={cn("block text-[0.8rem] font-medium mb-px", "mb-0")}
              >
                ESCUDO
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="flex flex-col space-y-1.5  p-2 rounded-md bg-surface-1 mt-2">
          <legend className=" bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
            Pontos de Vida
          </legend>
          <div>
            <div>
              <label
                htmlFor="editingCurrentHp"
                className={cn(
                  "block text-[0.8rem] font-medium mb-px",
                  "text-[10px] text-center block"
                )}
              >
                ATUAL
              </label>
              <input
                id="editingCurrentHp"
                type="number"
                value={editingCurrentHp}
                onChange={(e) => setEditingCurrentHp(e.target.value)}
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
              />
            </div>
            <div className="flex space-x-1.5 mt-1.5">
              <div className="flex-1">
                <label
                  htmlFor="editingTempHp"
                  className={cn(
                    "block text-[0.8rem] font-medium mb-px",
                    "text-[10px] text-center block"
                  )}
                >
                  TEMPORÁRIO
                </label>
                <input
                  id="editingTempHp"
                  type="number"
                  value={editingTempHp}
                  onChange={(e) => setEditingTempHp(e.target.value)}
                  className={cn(
                    "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                    "text-center hide-number-spinners"
                  )}
                  min="0"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="editingMaxHp"
                  className={cn(
                    "block text-[0.8rem] font-medium mb-px",
                    "text-[10px] text-center block"
                  )}
                >
                  MÁXIMO
                </label>
                <input
                  id="editingMaxHp"
                  type="number"
                  value={editingMaxHp}
                  onChange={(e) => setEditingMaxHp(e.target.value)}
                  className={cn(
                    "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                    "text-center hide-number-spinners"
                  )}
                  min="1"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="flex-1 p-1.5 rounded mt-2 bg-surface-1 relative">
          <button
            type="button"
            onClick={handleAddHitDice}
            title="Adicionar novo dado de vida"
            className="top-[-2.5rem] right-0 absolute text-xl mt-2 p-0.5 px-2 pb-1 font-bold bg-accent-primary text-white rounded-md hover:bg-accent-secondary "
          >
            +
          </button>
          <legend className=" bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold uppercase">
            Dados de Vida
          </legend>

          <ul className="flex flex-col space-y-1.5">
            {editingHitDiceEntries.map((entry) => (
              <li key={entry.id} className="flex items-center space-x-1.5">
                <label
                  htmlFor={`hit-dice-type-${entry.id}`}
                  className="sr-only"
                >
                  Tipo de Dado de Vida para {entry.id}
                </label>
                <select
                  id={`hit-dice-type-${entry.id}`}
                  value={entry.type}
                  onChange={(e) =>
                    handleUpdateHitDice(entry.id, "type", e.target.value)
                  }
                  className={cn(
                    "p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary",
                    "w-20"
                  )}
                >
                  <option value="d4">d4</option>
                  <option value="d6">d6</option>
                  <option value="d8">d8</option>
                  <option value="d10">d10</option>
                  <option value="d12">d12</option>
                  <option value="d20">d20</option>
                </select>
                <label
                  htmlFor={`hit-dice-quantity-${entry.id}`}
                  className="sr-only"
                >
                  Quantidade de Dados de Vida {entry.type}
                </label>
                <input
                  id={`hit-dice-quantity-${entry.id}`}
                  type="number"
                  value={entry.quantity}
                  onChange={(e) =>
                    handleUpdateHitDice(entry.id, "quantity", e.target.value)
                  }
                  className={cn(
                    "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                    "text-center hide-number-spinners"
                  )}
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHitDice(entry.id)}
                  className="p-1 bg-red-600 text-white rounded-md hover:bg-red-700 w-8 h-8 flex items-center justify-center text-sm font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </section>
  );
}
