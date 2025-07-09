import React from "react";
import { HitDiceEntry } from "../../../../../shared/api/types";
import { cn } from "../../../../../shared/lib/utils/cn";
import { generateUniqueId } from "../../../../../shared/lib/utils/id/idUtils";
import { DeleteIcon, PlusCircleIcon } from "../../../../../shared/ui/Icons";
import { useModal } from "@/features/modalManager/model/contexts/ModalProvider";

interface HealthSectionProps {
  editingTempHp: string;
  setEditingTempHp: (value: string) => void;
  editingMaxHp: string;
  setEditingMaxHp: (value: string) => void;
  editingHitDiceEntries: HitDiceEntry[];
  setEditingHitDiceEntries: (value: HitDiceEntry[]) => void;
}

export const HealthSection: React.FC<HealthSectionProps> = ({
  editingTempHp,
  setEditingTempHp,
  editingMaxHp,
  setEditingMaxHp,
  editingHitDiceEntries,
  setEditingHitDiceEntries,
}) => {
  const { openModal, closeModal } = useModal();

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

  const handleDeleteConfirmation = (id: string) => {
    openModal("confirmationModal", {
      title: "Confirmar Exclusão",
      content:
        "Você tem certeza que deseja remover esta linha de dados de vida?",
      onConfirm: () => {
        handleRemoveHitDice(id);
        closeModal();
      },
      onCancel: closeModal,
    });
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
    <fieldset
      id="pontos de vida"
      className="flex flex-col space-y-1.5 p-2 rounded-md bg-surface-1 mt-2"
    >
      <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold ">
        PONTOS DE VIDA
      </legend>
      <div>
        <div>
          <label
            htmlFor="editingMaxHp"
            className={cn(
              "block text-[0.8rem] font-medium mb-px",
              "text-[10px] text-center block"
            )}
          >
            ATUAL
          </label>
          <input
            id="editingMaxHp"
            type="number"
            value={editingMaxHp}
            onChange={(e) => setEditingMaxHp(e.target.value)}
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
      <fieldset className="flex-1 rounded bg-surface-1 relative">
        <button
          type="button"
          onClick={handleAddHitDice}
          title="Adicionar novo dado de vida"
          className="flex items-center justify-center -bottom-5.5 w-6 h-6 right-[50%] translate-x-1/2 absolute text-xl font-bold bg-accent-primary text-text-primary rounded-[10rem] hover:bg-accent-secondary "
        >
          <PlusCircleIcon />
        </button>
        <legend className="bg-surface-1 rounded text-sm font-bold ">
          Dados de Vida
        </legend>

        <ul className="flex flex-col">
          {editingHitDiceEntries.map((entry) => (
            <li key={entry.id} className="flex items-center space-x-2 mb-2">
              <label htmlFor={`hit-dice-type-${entry.id}`} className="sr-only">
                Tipo de Dado de Vida para {entry.id}
              </label>
              <select
                id={`hit-dice-type-${entry.id}`}
                value={entry.type}
                onChange={(e) =>
                  handleUpdateHitDice(entry.id, "type", e.target.value)
                }
                className={cn(
                  "p-1 bg-surface-1 border font-bold border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary",
                  "w-20"
                )}
              >
                <option value="D4">D4</option>
                <option value="D6">D6</option>
                <option value="D8">D8</option>
                <option value="D10">D10</option>
                <option value="D12">D12</option>
                <option value="D20">D20</option>
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
                  "w-full p-1 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
                min="1"
              />
              <button
                type="button"
                title="Remover dado de vida"
                onClick={() => handleDeleteConfirmation(entry.id)}
                disabled={editingHitDiceEntries.length === 1}
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
