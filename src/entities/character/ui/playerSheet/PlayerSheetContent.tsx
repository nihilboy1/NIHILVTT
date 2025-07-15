// src/entities/character/ui/playerSheet/PlayerSheetContent.tsx

import { useState } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetTabs } from "./PlayerSheetTabs";
import { PrincipalTab } from "./principalTab/PrincipalTab";
import { PlayerCharacter } from "../../model/schemas/character.schema";
import { HitDiceEntry } from "../../model/schemas/character.schema"; // Assuming HitDiceEntry type is here

interface PlayerSheetContentProps {
  onEditAction: (actionId: string) => void;
  onDeleteHitDice: (index: number) => void;
  hitDiceFields: FieldArrayWithId<PlayerCharacter, "hitDiceEntries", "id">[];
  onAddHitDice: (value: HitDiceEntry) => void;
  onRemoveHitDice: (index?: number | number[]) => void;
}

export function PlayerSheetContent({
  onEditAction,
  onDeleteHitDice,
  hitDiceFields,
  onAddHitDice,
  onRemoveHitDice,
}: PlayerSheetContentProps) {
  const [playerSheetActiveTab, setPlayerSheetActiveTab] = useState<
    "principal" | "detalhes" | "configuracoes"
  >("principal");

  return (
    <>
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      {playerSheetActiveTab === "principal" ? (
        <PrincipalTab
          onEditAction={onEditAction}
          onDeleteHitDice={onDeleteHitDice}
          hitDiceFields={hitDiceFields}
          onAddHitDice={onAddHitDice}
          onRemoveHitDice={onRemoveHitDice}
        />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab />
      ) : (
        <PlayerSheetConfigTab />
      )}
    </>
  );
}
