import React from "react";
import DeathSaveCheckboxGroup from "../../../ui/DeathSaveCheckboxGroup";
import { cn } from "../../../../utils/cn";

interface PrincipalHealthAndCombatProps {
  editingArmorClass: string;
  setEditingArmorClass: (value: string) => void;
  editingInitiative: string;
  setEditingInitiative: (value: string) => void;
  editingSpeed: string;
  setEditingSpeed: (value: string) => void;
  editingShieldEquipped: boolean;
  setEditingShieldEquipped: (value: boolean) => void;
  editingCurrentHp: string;
  setEditingCurrentHp: (value: string) => void;
  editingTempHp: string;
  setEditingTempHp: (value: string) => void;
  editingMaxHp: string;
  setEditingMaxHp: (value: string) => void;
  editingHitDiceUsed: string;
  setEditingHitDiceUsed: (value: string) => void;
  editingHitDiceMax: string;
  setEditingHitDiceMax: (value: string) => void;
  editingDeathSavesSuccesses: number;
  setEditingDeathSavesSuccesses: (value: number) => void;
  editingDeathSavesFailures: number;
  setEditingDeathSavesFailures: (value: number) => void;
}

const PrincipalHealthAndCombat: React.FC<PrincipalHealthAndCombatProps> = ({
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
  editingHitDiceUsed,
  setEditingHitDiceUsed,
  editingHitDiceMax,
  setEditingHitDiceMax,
  editingDeathSavesSuccesses,
  setEditingDeathSavesSuccesses,
  editingDeathSavesFailures,
  setEditingDeathSavesFailures,
}) => {
  return (
    <div className="col-span-1 flex flex-col space-y-2.5">
      <div className="border p-2 rounded-md">
        <div className="grid grid-cols-3 gap-x-1.5 items-end">
          <div className="w-16">
            <label
              htmlFor="editingArmorClass"
              className="block text-[11px] font-medium text-accent-primary mb-px"
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
              className="block text-[11px] font-medium text-accent-primary mb-px"
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
              className="block text-[11px] font-medium text-accent-primary mb-px"
            >
              VELOCIDADE
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
              className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1"
            />
            <span
              className={cn(
                "block text-[11px] font-medium text-accent-primary mb-px",
                "mb-0"
              )}
            >
              ESCUDO
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 border p-2 rounded-md">
        <div className="border p-1.5 rounded">
          <label
            className={cn(
              "block text-[11px] font-medium text-accent-primary mb-px",
              "text-xs text-center mb-1 block uppercase"
            )}
          >
            PONTOS DE VIDA
          </label>
          <div className="grid grid-cols-3 gap-x-1.5">
            <div>
              <label
                htmlFor="editingCurrentHp"
                className={cn(
                  "block text-[11px] font-medium text-accent-primary mb-px",
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
                  "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                  "text-center hide-number-spinners"
                )}
              />
            </div>
            <div>
              <label
                htmlFor="editingTempHp"
                className={cn(
                  "block text-[11px] font-medium text-accent-primary mb-px",
                  "text-[10px] text-center block"
                )}
              >
                TEMP
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
            <div>
              <label
                htmlFor="editingMaxHp"
                className={cn(
                  "block text-[11px] font-medium text-accent-primary mb-px",
                  "text-[10px] text-center block"
                )}
              >
                MAX
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
        <div className="flex space-x-1.5">
          <div className="flex-1 border p-1.5 rounded">
            <label
              className={cn(
                "block text-[11px] font-medium text-accent-primary mb-px",
                "text-xs text-center mb-1 block uppercase"
              )}
            >
              DADOS DE VIDA
            </label>
            <div className="grid grid-cols-2 gap-x-1.5">
              <div>
                <label
                  htmlFor="editingHitDiceUsed"
                  className={cn(
                    "block text-[11px] font-medium text-accent-primary mb-px",
                    "text-[10px] text-center block"
                  )}
                >
                  GASTO
                </label>
                <input
                  id="editingHitDiceUsed"
                  type="number"
                  value={editingHitDiceUsed}
                  onChange={(e) => setEditingHitDiceUsed(e.target.value)}
                  className={cn(
                    "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                    "text-center hide-number-spinners"
                  )}
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="editingHitDiceMax"
                  className={cn(
                    "block text-[11px] font-medium text-accent-primary mb-px",
                    "text-[10px] text-center block"
                  )}
                >
                  MAX
                </label>
                <input
                  id="editingHitDiceMax"
                  type="number"
                  value={editingHitDiceMax}
                  onChange={(e) => setEditingHitDiceMax(e.target.value)}
                  className={cn(
                    "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
                    "text-center hide-number-spinners"
                  )}
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 border p-1.5 rounded">
            <label
              className={cn(
                "block text-[11px] font-medium text-accent-primary mb-px",
                "text-xs text-center mb-0.5 block uppercase"
              )}
            >
              SALVAGUARDA CONTRA MORTE
            </label>
            <div className="flex flex-col space-y-0.5">
              <DeathSaveCheckboxGroup
                label="Sucessos"
                count={editingDeathSavesSuccesses}
                onChange={setEditingDeathSavesSuccesses}
                type="success"
              />
              <DeathSaveCheckboxGroup
                label="Falhas"
                count={editingDeathSavesFailures}
                onChange={setEditingDeathSavesFailures}
                type="failure"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalHealthAndCombat;
