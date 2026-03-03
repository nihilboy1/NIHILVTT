import { usePlayerCharacter } from "@/entities/character/lib/hooks/usePlayerCharacter";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import { DiceFormula, RollCategory } from "@/shared/api/types";

import { AttributesAndSkillsList } from "./AttributesAndSkillsList";
import { HealthAndCombatDetails } from "./HealthAndCombatDetails";

interface PlayerSheetPrincipalContentProps {
  characterId: string;
}

export function PlayerSheetPrincipalContent({
  characterId,
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
    <div className="grid w-full min-w-0 grid-cols-1 gap-2.5 2xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <AttributesAndSkillsList
        characterId={characterId}
        className="min-w-0"
        onRollDice={handleRollDice}
      />
      <HealthAndCombatDetails
        characterId={characterId}
        className="min-w-0"
        onRollDice={handleRollDice}
      />
    </div>
  );
}
