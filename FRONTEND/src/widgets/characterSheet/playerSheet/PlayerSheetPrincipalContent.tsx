import { usePlayerCharacter } from "@/entities/character/lib/hooks/usePlayerCharacter";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import { DiceFormula, RollCategory } from "@/shared/api/types";

import { AttributesAndSkillsList } from "./AttributesAndSkillsList";
import { HealthAndCombatDetails } from "./HealthAndCombatDetails";

interface PlayerSheetPrincipalContentProps {
  characterId: string;
  onEditAction: (actionId: string) => void;
}

export function PlayerSheetPrincipalContent({
  characterId,
  onEditAction,
}: PlayerSheetPrincipalContentProps) {
  const character = usePlayerCharacter(characterId);
  const { rollDice } = useDiceRollingStore();

  if (!character) {
    return <div>Personagem não encontrado ou não é um Personagem Jogador.</div>;
  }

  const handleRollDice = (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    charName: string
  ) => {
    rollDice(formula, rollName, category, charName);
  };

  return (
    <div className="flex flex-wrap gap-2 w-full">
      <AttributesAndSkillsList
        className="flex-1 min-w-[300px]"
        onRollDice={handleRollDice}
      />
      <HealthAndCombatDetails
        className="flex-1 min-w-[300px]"
        onEditAction={onEditAction}
        onRollDice={handleRollDice}
      />
    </div>
  );
}
