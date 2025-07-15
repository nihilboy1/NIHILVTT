import { EditIcon, PlusCircleIcon } from "../../../../../shared/ui/Icons";
import { HitDiceEntry, Action } from "../../../model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";
import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";
import { getModifier, getProficiencyBonusFromLevel } from "@/entities/character/lib/utils/characterUtils"; // Importar funções de utilidade

interface PrincipalHealthAndCombatProps {
  className?: string;
  characterName: string;
  level: number;
  dexterity: number;
  wisdom: number;
  isPerceptionProficient: boolean;
  combatStats: {
    armorClass: number;
    shieldEquipped?: boolean; // Tornar opcional
    speed: number;
    currentHp: number;
    tempHp?: number; // Tornar opcional
    maxHp: number;
  };
  hitDiceEntries: HitDiceEntry[];
  actions: Action[];
  onEditAction: (actionId: string) => void;
  onDeleteHitDice: (index: number) => void;
  onAddHitDice: (value: HitDiceEntry) => void;
  onRemoveHitDice: (index?: number | number[]) => void;
  onCombatStatChange: (key: keyof PrincipalHealthAndCombatProps["combatStats"], value: number | boolean) => void;
  onAddAction: (action: Action) => void;
  onRollDice: (formula: DiceFormula, rollName: string, category: RollCategory, characterName: string) => void;
  onHitDiceTypeChange: (index: number, type: HitDiceEntry["type"]) => void;
  onHitDiceQuantityChange: (index: number, quantity: number) => void;
}

export function PrincipalHealthAndCombat({
  className,
  characterName,
  level,
  dexterity,
  wisdom,
  isPerceptionProficient,
  combatStats,
  hitDiceEntries,
  actions,
  onEditAction,
  onDeleteHitDice,
  onAddHitDice,
  onRemoveHitDice,
  onCombatStatChange,
  onAddAction,
  onRollDice,
  onHitDiceTypeChange,
  onHitDiceQuantityChange,
}: PrincipalHealthAndCombatProps) {
  // Cálculos que antes estavam em CombatStats, agora aqui
  const dexModifier = getModifier(dexterity);
  const wisModifier = getModifier(wisdom);
  const proficiencyBonus = getProficiencyBonusFromLevel(level);
  const speedInMeters = (combatStats.speed * 0.3).toFixed(2);
  const speedInSquares = (combatStats.speed / 5).toFixed(2);

  const calculatedInitiative = dexModifier;
  const calculatedPassivePerception =
    10 + wisModifier + (isPerceptionProficient ? proficiencyBonus : 0);

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
          armorClass={combatStats.armorClass}
          shieldEquipped={combatStats.shieldEquipped ?? false} // Adicionar fallback
          speed={combatStats.speed}
          calculatedInitiative={calculatedInitiative}
          calculatedPassivePerception={calculatedPassivePerception}
          speedInMeters={speedInMeters}
          speedInSquares={speedInSquares}
          onArmorClassChange={(value) => onCombatStatChange("armorClass", value)}
          onShieldEquippedChange={(checked) => onCombatStatChange("shieldEquipped", checked)}
          onSpeedChange={(value) => onCombatStatChange("speed", value)}
        />
        <HealthSection
          onDeleteHitDice={onDeleteHitDice}
          fields={hitDiceEntries}
          append={onAddHitDice}
          remove={onRemoveHitDice}
          currentHp={combatStats.currentHp}
          tempHp={combatStats.tempHp ?? 0} // Adicionar fallback
          maxHp={combatStats.maxHp}
          onCurrentHpChange={(value) => onCombatStatChange("currentHp", value)}
          onTempHpChange={(value) => onCombatStatChange("tempHp", value)}
          onMaxHpChange={(value) => onCombatStatChange("maxHp", value)}
          onHitDiceTypeChange={onHitDiceTypeChange}
          onHitDiceQuantityChange={onHitDiceQuantityChange}
        />

        <fieldset
          id="Ações"
          className="relative flex flex-col space-y-1.5 mt-4 p-2 rounded-md bg-surface-1 pb-5"
        >
          <legend className="bg-surface-1 p-1 pl-2 pr-3 rounded text-sm font-bold">
            AÇÕES
          </legend>
          {actions.map((action) => (
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
                  <EditIcon height={4} width={4} />
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => onAddAction({ id: crypto.randomUUID(), name: "Nova Ação", bonus: "", damage: "" })} /* ... */>
            <PlusCircleIcon />
          </button>
        </fieldset>
      </div>
    </section>
  );
}
