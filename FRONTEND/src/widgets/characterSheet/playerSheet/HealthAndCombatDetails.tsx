import { useMemo } from "react";

import { useCharacterCalculations } from "@/entities/character/lib/hooks/useCharacterCalculations";
import { usePlayerCharacter } from "@/entities/character/lib/hooks/usePlayerCharacter";
import { usePlayerCharacterCombatViewModel } from "@/entities/character/lib/hooks/usePlayerCharacterCombatViewModel";
import {
  getAbilityModifier,
  getPlayerProficiencyBonusFromLevel,
} from "@/entities/character/model/rules/characterDerivedRules";
import { buildWeaponAttackAction } from "@/entities/character/model/rules/weaponAttackDerivedRules";
import { Action } from "@/entities/character/model/schemas/character.schema";
import { isPlayerCharacterRuntime } from "@/entities/character/model/schemas/playerCharacterRuntime.schema";
import { useCharactersStore } from "@/entities/character/model/store";
import { buildPlayerCharacterCalculationsViewModel } from "@/entities/character/model/view-models/playerCharacterCalculationsViewModel";
import { DiceFormula, RollCategory } from "@/shared/api/types";

import { CombatStats } from "./CombatStats";
import { HealthSection } from "./HealthSection";


interface HealthAndCombatDetailsProps {
  characterId: string;
  className?: string;
  onRollDice: (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    characterName: string
  ) => void;
}

export function HealthAndCombatDetails({
  characterId,
  className,
  onRollDice,
}: HealthAndCombatDetailsProps) {
  const combatViewModel = usePlayerCharacterCombatViewModel(characterId);
  const character = usePlayerCharacter(characterId);
  const runtimeCharacter = useCharactersStore(
    (state) => state.runtimeCharactersById[characterId] ?? null,
  );
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;

  const characterName = playerRuntimeCharacter?.name ?? character?.name ?? '-';

  const calculationsViewModel = useMemo(
    () =>
      buildPlayerCharacterCalculationsViewModel({
        level: combatViewModel?.level ?? 1,
        attributes: {
          dexterity: combatViewModel?.dexterity ?? 10,
          wisdom: combatViewModel?.wisdom ?? 10,
        },
        proficiencies: {
          skills: {
            perception: combatViewModel?.perceptionProficiencyLevel ?? "none",
          },
        },
        combatStats: {
          speed: combatViewModel?.speed ?? 0,
        },
      }),
    [combatViewModel],
  );

  const {
    calculatedInitiative,
    calculatedPassivePerception,
    speedInMeters,
    speedInSquares,
  } = useCharacterCalculations(calculationsViewModel);

  const strengthScore = combatViewModel?.strength ?? 10;
  const strengthModifier = getAbilityModifier(strengthScore);
  const unarmedAttackBonus =
    getPlayerProficiencyBonusFromLevel(combatViewModel?.level ?? 1) + strengthModifier;
  const unarmedDamage = Math.max(1, 1 + strengthModifier);

  const displayActions = useMemo<Action[]>(() => {
    const derivedActions: Action[] = [
      {
        id: 'builtin-unarmed-strike',
        name: 'Ataque desarmado',
        bonus: unarmedAttackBonus >= 0 ? `+${unarmedAttackBonus}` : `${unarmedAttackBonus}`,
        damage: `${unarmedDamage}`,
      },
    ];

    if (playerRuntimeCharacter) {
      const mainHandAction = buildWeaponAttackAction(
        playerRuntimeCharacter.equipment.mainHandWeaponId,
        {
          classId: playerRuntimeCharacter.build.classId,
          strength: strengthScore,
          dexterity: combatViewModel?.dexterity ?? 10,
          proficiencyBonus: getPlayerProficiencyBonusFromLevel(combatViewModel?.level ?? 1),
        },
      );
      const offHandAction = buildWeaponAttackAction(
        playerRuntimeCharacter.equipment.offHandWeaponId,
        {
          classId: playerRuntimeCharacter.build.classId,
          strength: strengthScore,
          dexterity: combatViewModel?.dexterity ?? 10,
          proficiencyBonus: getPlayerProficiencyBonusFromLevel(combatViewModel?.level ?? 1),
        },
      );

      if (mainHandAction) {
        derivedActions.push(mainHandAction);
      }
      if (offHandAction) {
        const offHandIdAlreadyPresent = derivedActions.some(
          (action) => action.id === offHandAction.id,
        );
        if (!offHandIdAlreadyPresent) {
          derivedActions.push({
            ...offHandAction,
            id: `${offHandAction.id}-offhand`,
            name: `${offHandAction.name} (Mão Sec.)`,
          });
        }
      }
    }

    return derivedActions;
  }, [
    combatViewModel?.dexterity,
    combatViewModel?.level,
    playerRuntimeCharacter,
    strengthScore,
    unarmedAttackBonus,
    unarmedDamage,
  ]);

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

  return (
    <section className={`flex w-full flex-col gap-2.5 ${className}`}>
      <h2 className="sr-only">Dados de Saúde e Combate do Personagem</h2>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <CombatStats
          calculatedInitiative={calculatedInitiative}
          calculatedPassivePerception={calculatedPassivePerception}
          speedInMeters={speedInMeters}
          speedInSquares={speedInSquares}
          armorClass={combatViewModel?.armorClass ?? 0}
          speed={combatViewModel?.speed ?? 0}
          shieldEquipped={combatViewModel?.shieldEquipped ?? false}
        />
        <HealthSection combatViewModel={combatViewModel} />

        <fieldset
          id="Ações"
          className="relative flex flex-col gap-2 rounded-xl bg-surface-1/70 px-2.5 py-2.5"
        >
          <legend className="px-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-text-secondary">
            AÇÕES
          </legend>
          <div className="flex items-center justify-between px-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-text-secondary/80">
            <span>Nome</span>
            <div className="flex items-center gap-3 text-right">
              <span>Bônus</span>
              <span>Dano</span>
            </div>
          </div>
          {displayActions.length === 0 && (
            <div className="rounded-lg bg-surface-0/35 px-2.5 py-2 text-[0.72rem] text-text-secondary">
              Nenhuma ação disponível no momento.
            </div>
          )}
          {displayActions.map((action) => (
            <div
              key={action.id}
              className="group flex items-center gap-1.5 rounded-lg bg-surface-0/40 px-2 py-1.5 hover:bg-surface-0/55"
            >
              <button
                type="button"
                title="Realizar ação"
                className="flex min-w-0 flex-1 items-center gap-1.5 text-left text-[0.68rem]"
                onClick={() => handleRollAction(action)}
              >
                <span className="min-w-0 flex-1 truncate font-medium text-text-primary">
                  {action.name || "-"}
                </span>
                <span className="min-w-[3.25rem] rounded-md bg-surface-1/75 px-1.5 py-1 text-center font-semibold text-text-secondary">
                  {action.bonus || "-"}
                </span>
                <span className="min-w-[4.5rem] rounded-md bg-surface-1/75 px-1.5 py-1 text-center font-semibold text-text-secondary">
                  {action.damage || "-"}
                </span>
              </button>
            </div>
          ))}
        </fieldset>
      </div>
    </section>
  );
}
