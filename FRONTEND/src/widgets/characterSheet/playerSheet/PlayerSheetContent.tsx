import { useState } from "react";

import { PlayerCharacterViewModel } from "@/entities/character/model/view-models/playerCharacterViewModel";

import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetEquipmentTab } from "./equipmentTab/PlayerSheetEquipmentTab";
import { PlayerSheetPrincipalTab } from "./PlayerSheetPrincipalTab";
import { PlayerSheetTabs, type PlayerSheetTab } from "./PlayerSheetTabs";

interface PlayerSheetContentProps {
  characterId: string;
  viewModel: PlayerCharacterViewModel | null;
}

export function PlayerSheetContent({
  characterId,
  viewModel,
}: PlayerSheetContentProps) {
  const [playerSheetActiveTab, setPlayerSheetActiveTab] =
    useState<PlayerSheetTab>("principal");

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col rounded-xl bg-gradient-to-b from-surface-1/95 via-surface-1 to-surface-0 p-2 shadow-xl shadow-black/25">
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      <div className="min-h-0 flex-1 overflow-hidden">
        {playerSheetActiveTab === "principal" ? (
          <PlayerSheetPrincipalTab
            characterId={characterId}
            viewModel={viewModel}
          />
        ) : playerSheetActiveTab === "equipamento" ? (
          <PlayerSheetEquipmentTab characterId={characterId} />
        ) : playerSheetActiveTab === "detalhes" ? (
          <PlayerSheetDetailsTab viewModel={viewModel} />
        ) : (
          <PlayerSheetConfigTab characterId={characterId} viewModel={viewModel} />
        )}
      </div>
    </div>
  );
}
