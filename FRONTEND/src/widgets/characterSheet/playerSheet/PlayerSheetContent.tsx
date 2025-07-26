import { useState } from "react";

import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetPrincipalTab } from "./PlayerSheetPrincipalTab";
import { PlayerSheetTabs } from "./PlayerSheetTabs";

interface PlayerSheetContentProps {
  characterId: string;
  onEditAction: (actionId: string) => void;
}

export function PlayerSheetContent({
  characterId,
  onEditAction,
}: PlayerSheetContentProps) {
  const [playerSheetActiveTab, setPlayerSheetActiveTab] = useState<
    "principal" | "detalhes" | "configuracoes"
  >("principal");

  return (
    <div className="w-[40rem] h-[30rem]">
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      {playerSheetActiveTab === "principal" ? (
        <PlayerSheetPrincipalTab
          characterId={characterId}
          onEditAction={onEditAction}
        />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab />
      ) : (
        <PlayerSheetConfigTab />
      )}
    </div>
  );
}
