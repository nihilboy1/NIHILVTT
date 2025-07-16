import { PrincipalAttributesAndSkills } from "@/entities/character/ui/playerSheet/principalTab/PrincipalAttributesAndSkills";
import { useCharactersStore } from "@/entities/character/model/store";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import {
  CharacterTypeEnum,
} from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";

interface AttributesWidgetProps {
  characterId: string;
  className?: string;
}

export function AttributesWidget({
  characterId,
  className,
}: AttributesWidgetProps) {
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
    <PrincipalAttributesAndSkills
      className={className}
      onRollDice={handleRollDice}
    />
  );
}
