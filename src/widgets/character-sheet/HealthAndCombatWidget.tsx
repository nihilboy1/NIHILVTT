import { PrincipalHealthAndCombat } from "@/entities/character/ui/playerSheet/principalTab/PrincipalHealthAndCombat";
import { useCharactersStore } from "@/entities/character/model/store";
import { useDiceRollingStore } from "@/features/diceRolling/model/store";
import {
  PlayerCharacter,
  CharacterTypeEnum,
  HitDiceEntry,
  Action,
} from "@/entities/character/model/schemas/character.schema";
import { DiceFormula, RollCategory } from "@/shared/api/types";

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

  const handleCombatStatChange = (
    key: keyof PlayerCharacter["combatStats"],
    value: number | boolean
  ) => {
    updateCharacter(character.id, {
      combatStats: {
        ...character.combatStats,
        [key]: value,
      },
    });
  };

  const handleAddAction = (action: Action) => {
    updateCharacter(character.id, {
      actions: [...(character.actions || []), action],
    });
  };

  const handleDeleteHitDice = (index: number) => {
    const newHitDiceEntries = character.hitDiceEntries.filter(
      (_, i) => i !== index
    );
    updateCharacter(character.id, { hitDiceEntries: newHitDiceEntries });
  };

  const handleAddHitDice = (value: HitDiceEntry) => {
    updateCharacter(character.id, {
      hitDiceEntries: [...character.hitDiceEntries, value],
    });
  };

  const handleRemoveHitDice = (index?: number | number[]) => {
    if (typeof index === "number") {
      handleDeleteHitDice(index);
    } else if (Array.isArray(index)) {
      console.warn(
        "Remoção de múltiplos dados de vida não implementada neste widget."
      );
    }
  };

  const handleRollDice = (
    formula: DiceFormula,
    rollName: string,
    category: RollCategory,
    charName: string
  ) => {
    rollDice(formula, rollName, category, charName);
  };

  const handleHitDiceTypeChange = (
    index: number,
    type: HitDiceEntry["type"]
  ) => {
    const newHitDiceEntries = [...character.hitDiceEntries];
    newHitDiceEntries[index] = { ...newHitDiceEntries[index], type };
    updateCharacter(character.id, { hitDiceEntries: newHitDiceEntries });
  };

  const handleHitDiceQuantityChange = (index: number, quantity: number) => {
    const newHitDiceEntries = [...character.hitDiceEntries];
    newHitDiceEntries[index] = { ...newHitDiceEntries[index], quantity };
    updateCharacter(character.id, { hitDiceEntries: newHitDiceEntries });
  };

  const dexterity = character.attributes.dexterity;
  const wisdom = character.attributes.wisdom;
  const isPerceptionProficient = character.proficiencies.skills.perception;

  return (
    <PrincipalHealthAndCombat
      className={className}
      characterName={character.name}
      level={character.level}
      dexterity={dexterity}
      wisdom={wisdom}
      isPerceptionProficient={isPerceptionProficient}
      combatStats={character.combatStats}
      hitDiceEntries={character.hitDiceEntries}
      actions={character.actions || []}
      onEditAction={onEditAction}
      onDeleteHitDice={handleDeleteHitDice}
      onAddHitDice={handleAddHitDice}
      onRemoveHitDice={handleRemoveHitDice}
      onCombatStatChange={handleCombatStatChange}
      onAddAction={handleAddAction}
      onRollDice={handleRollDice}
      onHitDiceTypeChange={handleHitDiceTypeChange}
      onHitDiceQuantityChange={handleHitDiceQuantityChange}
    />
  );
}
