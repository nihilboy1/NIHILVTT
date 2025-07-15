import { PrincipalHeader } from "./PrincipalHeader";
import { PrincipalAttributesAndSkills } from "./PrincipalAttributesAndSkills";
import { PrincipalHealthAndCombat } from "./PrincipalHealthAndCombat";
import { FieldArrayWithId } from "react-hook-form";
import { PlayerCharacter, HitDiceEntry } from "../../../model/schemas/character.schema";

interface PrincipalTabProps {
  onEditAction: (actionId: string) => void;
  onDeleteHitDice: (index: number) => void;
  hitDiceFields: FieldArrayWithId<PlayerCharacter, "hitDiceEntries", "id">[];
  onAddHitDice: (value: HitDiceEntry) => void;
  onRemoveHitDice: (index?: number | number[]) => void;
}

export function PrincipalTab({
  onEditAction,
  onDeleteHitDice,
  hitDiceFields,
  onAddHitDice,
  onRemoveHitDice,
}: PrincipalTabProps) {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar">
      <PrincipalHeader />

      <div className="flex flex-wrap gap-2 w-full">
        <PrincipalAttributesAndSkills className="flex-1 min-w-[300px]" />
        <PrincipalHealthAndCombat
          className="flex-1 min-w-[300px]"
          onEditAction={onEditAction}
          onDeleteHitDice={onDeleteHitDice}
          hitDiceFields={hitDiceFields}
          onAddHitDice={onAddHitDice}
          onRemoveHitDice={onRemoveHitDice}
        />
      </div>
    </div>
  );
}
