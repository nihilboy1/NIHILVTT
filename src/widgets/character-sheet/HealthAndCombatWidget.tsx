import { PrincipalHealthAndCombat } from "@/entities/character/ui/playerSheet/principalTab/PrincipalHealthAndCombat";
import { useCharactersStore } from "@/entities/character/model/store";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import { DiceFormula, RollCategory } from "@/shared/api/types";
import { CharacterTypeEnum } from "@/entities/character/model/schemas/character.schema";

interface HealthAndCombatWidgetProps {
  characterId: string;
  onEditAction: (actionId: string) => void;
  className?: string;
}

export function HealthAndCombatWidget({
  characterId,
  onEditAction,
  className,
}: HealthAndCombatWidgetProps) {
  const { characters } = useCharactersStore();
  const { rollDice } = useDiceRollingStore();

  const foundCharacter = characters.find((char) => char.id === characterId);

  if (!foundCharacter) {
    return <div>Personagem não encontrado.</div>;
  }

  if (foundCharacter.type !== CharacterTypeEnum.enum.Player) {
    return <div>Este widget é apenas para Personagens Jogadores.</div>;
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
    <PrincipalHealthAndCombat
      className={className}
      onEditAction={onEditAction}
      onRollDice={handleRollDice}
    />
  );
}
