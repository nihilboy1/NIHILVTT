import { usePlayerSheet } from "../../../../contexts/PlayerSheetContext";
import { PlusCircleIcon, TrashIcon } from "../../../icons";
import { cn } from "../../../../utils/cn";
import { generateUniqueId } from '../../../../utils/id/idUtils';

export function PlayerAttacksAndFeatures() {
  const {
    attacks,
    handleAddAttack,
    handleRemoveAttack,
    handleAttackChange,
    featuresAndTraits,
    setFeaturesAndTraits,
  } = usePlayerSheet();

  return (
    <div className="col-span-1 flex flex-col space-y-2.5 border  p-2 rounded-md">
      <h3
        className={cn(
          "block text-[0.6875rem] font-medium text-accent-primary mb-px", // Converted from 11px
          "text-center uppercase mb-1"
        )}
      >
        Ataques & Cantrips
      </h3>
      {attacks &&
        attacks.map((attack) => (
          <div
            key={attack.id}
            className="grid grid-cols-12 gap-x-1.5 items-center border-b  pb-1.5 mb-1.5"
          >
            <div className="col-span-5">
              <input
                type="text"
                placeholder="Nome do Ataque"
                value={attack.name}
                onChange={(e) =>
                  handleAttackChange(attack.id, "name", e.target.value)
                }
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-xs"
                )}
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="+ Ataque"
                value={attack.attackBonus}
                onChange={(e) =>
                  handleAttackChange(attack.id, "attackBonus", e.target.value)
                }
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-xs text-center"
                )}
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                placeholder="Dano/Tipo"
                value={attack.damage}
                onChange={(e) =>
                  handleAttackChange(attack.id, "damage", e.target.value)
                }
                className={cn(
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-xs"
                )}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveAttack(attack.id)}
              className="col-span-1  justify-self-center"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={handleAddAttack}
        className="flex items-center justify-center space-x-1 py-1 text-xs text-accent-primary hover:text-accent-primary-hover border border-accent-primary hover:border-accent-primary-hover rounded-md"
      >
        <PlusCircleIcon className="h-4 w-4" />
        <span>Adicionar Ataque</span>
      </button>
      <div className="border  p-2 rounded-md mt-2 flex-grow flex flex-col">
        <h3
          className={cn(
            "block text-[0.6875rem] font-medium text-accent-primary mb-px", // Converted from 11px
            "text-center uppercase mb-1"
          )}
        >
          Características & Talentos
        </h3>
        <textarea
          value={
            featuresAndTraits
              ?.map(
                (ft) =>
                  `${ft.name}${ft.source ? ` (${ft.source})` : ""}:\n${
                    ft.description
                  }`
              )
              .join("\n\n") || ""
          }
          onChange={(e) => {
            const newFeaturesText = e.target.value;
            const newFeaturesArray = newFeaturesText
              .split("\n\n")
              .map((textBlock, index) => {
                const firstLineEnd = textBlock.indexOf(":\n");
                let name = `Característica ${index + 1}`;
                let description = textBlock;
                if (firstLineEnd !== -1) {
                  name = textBlock.substring(0, firstLineEnd);
                  description = textBlock.substring(firstLineEnd + 2);
                }
                return {
                  id: generateUniqueId(),
                  name,
                  description,
                };
              });
            setFeaturesAndTraits(newFeaturesArray);
          }}
          placeholder="Descreva características de classe, espécie, talentos, etc."
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "min-h-[150px] flex-grow text-xs"
          )}
        />
      </div>
    </div>
  );
}
