import React from "react";
import DeathSaveCheckboxGroup from "../ui/DeathSaveCheckboxGroup";
import {
  condensedLabelClass,
  inputClass, // Usar inputClass em vez de condensedInputClass
  condensedCheckboxClass,
} from "../../styles/formClasses";

interface PlayerHealthAndCombatProps {
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

const PlayerHealthAndCombat: React.FC<PlayerHealthAndCombatProps> = ({
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
      <div className="border border-border-inactive p-2 rounded-md">
        <div className="grid grid-cols-3 gap-x-1.5 items-end">
          <div className="w-16">
            <label htmlFor="editingArmorClass" className={condensedLabelClass}>
              CA
            </label>
            <input
              id="editingArmorClass"
              type="number"
              value={editingArmorClass}
              onChange={(e) => setEditingArmorClass(e.target.value)}
              className={`${inputClass} text-center hide-number-spinners`}
              min="0"
            />
          </div>
          <div className="w-16">
            <label htmlFor="editingInitiative" className={condensedLabelClass}>
              INICIATIVA
            </label>
            <input
              id="editingInitiative"
              type="number"
              value={editingInitiative}
              onChange={(e) => setEditingInitiative(e.target.value)}
              className={`${inputClass} text-center hide-number-spinners`}
            />
          </div>
          <div className="w-16">
            <label htmlFor="editingSpeed" className={condensedLabelClass}>
              VELOCIDADE
            </label>
            <input
              id="editingSpeed"
              type="number"
              value={editingSpeed}
              onChange={(e) => setEditingSpeed(e.target.value)}
              className={`${inputClass} text-center hide-number-spinners`}
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
              className={condensedCheckboxClass}
            />
            <span className={`${condensedLabelClass} mb-0`}>ESCUDO</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 border border-border-inactive p-2 rounded-md">
        <div className="border border-border-inactive p-1.5 rounded">
          <label
            className={`${condensedLabelClass} text-xs text-center mb-1 block uppercase`}
          >
            PONTOS DE VIDA
          </label>
          <div className="grid grid-cols-3 gap-x-1.5">
            <div>
              <label
                htmlFor="editingCurrentHp"
                className={`${condensedLabelClass} text-[10px] text-center block`}
              >
                ATUAL
              </label>
              <input
                id="editingCurrentHp"
                type="number"
                value={editingCurrentHp}
                onChange={(e) => setEditingCurrentHp(e.target.value)}
                className={`${inputClass} text-center hide-number-spinners`}
              />
            </div>
            <div>
              <label
                htmlFor="editingTempHp"
                className={`${condensedLabelClass} text-[10px] text-center block`}
              >
                TEMP
              </label>
              <input
                id="editingTempHp"
                type="number"
                value={editingTempHp}
                onChange={(e) => setEditingTempHp(e.target.value)}
                className={`${inputClass} text-center hide-number-spinners`}
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="editingMaxHp"
                className={`${condensedLabelClass} text-[10px] text-center block`}
              >
                MAX
              </label>
              <input
                id="editingMaxHp"
                type="number"
                value={editingMaxHp}
                onChange={(e) => setEditingMaxHp(e.target.value)}
                className={`${inputClass} text-center hide-number-spinners`}
                min="1"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-1.5">
          <div className="flex-1 border border-border-inactive p-1.5 rounded">
            <label
              className={`${condensedLabelClass} text-xs text-center mb-1 block uppercase`}
            >
              DADOS DE VIDA
            </label>
            <div className="grid grid-cols-2 gap-x-1.5">
              <div>
                <label
                  htmlFor="editingHitDiceUsed"
                  className={`${condensedLabelClass} text-[10px] text-center block`}
                >
                  GASTO
                </label>
                <input
                  id="editingHitDiceUsed"
                  type="number"
                  value={editingHitDiceUsed}
                  onChange={(e) => setEditingHitDiceUsed(e.target.value)}
                  className={`${inputClass} text-center hide-number-spinners`}
                  min="0"
                />
              </div>
              <div>
                <label
                  htmlFor="editingHitDiceMax"
                  className={`${condensedLabelClass} text-[10px] text-center block`}
                >
                  MAX
                </label>
                <input
                  id="editingHitDiceMax"
                  type="number"
                  value={editingHitDiceMax}
                  onChange={(e) => setEditingHitDiceMax(e.target.value)}
                  className={`${inputClass} text-center hide-number-spinners`}
                  min="0"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 border border-border-inactive p-1.5 rounded">
            <label
              className={`${condensedLabelClass} text-xs text-center mb-0.5 block uppercase`}
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

export default PlayerHealthAndCombat;
