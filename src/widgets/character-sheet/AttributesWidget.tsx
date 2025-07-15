import { PrincipalAttributesAndSkills } from "@/entities/character/ui/playerSheet/principalTab/PrincipalAttributesAndSkills";
import { useCharactersStore } from "@/entities/character/model/store";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import {
  PlayerCharacter,
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
  const { characters, updateCharacter } = useCharactersStore();
  const { rollDice } = useDiceRollingStore();

  const foundCharacter = characters.find((char) => char.id === characterId);

  if (!foundCharacter) {
    return <div>Personagem não encontrado.</div>;
  }

  if (foundCharacter.type !== CharacterTypeEnum.enum.Player) {
    return <div>Este widget é apenas para Personagens Jogadores.</div>;
  }

  const character: PlayerCharacter = foundCharacter;

  const handleRollDice = (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    charName: string
  ) => {
    rollDice(formula, rollName, category, charName);
  };

  const handleAttributeChange = (
    attributeName: keyof PlayerCharacter["attributes"],
    value: number
  ) => {
    updateCharacter(character.id, {
      attributes: {
        ...character.attributes,
        [attributeName]: value,
      },
    });
  };

  const handleToggleProficiency = (
    proficiencyPath: string,
    isProficient: boolean
  ) => {
    const [_, type, key] = proficiencyPath.split(".");
    if (type === "savingThrows") {
      updateCharacter(character.id, {
        proficiencies: {
          ...character.proficiencies,
          savingThrows: {
            ...character.proficiencies.savingThrows,
            [key]: isProficient,
          },
        },
      });
    } else if (type === "skills") {
      updateCharacter(character.id, {
        proficiencies: {
          ...character.proficiencies,
          skills: {
            ...character.proficiencies.skills,
            [key]: isProficient,
          },
        },
      });
    }
  };

  return (
    <PrincipalAttributesAndSkills
      className={className}
      characterName={character.name}
      level={character.level}
      attributes={character.attributes}
      proficiencies={character.proficiencies}
      onRollDice={handleRollDice}
      onAttributeChange={handleAttributeChange}
      onToggleProficiency={handleToggleProficiency}
    />
  );
}
