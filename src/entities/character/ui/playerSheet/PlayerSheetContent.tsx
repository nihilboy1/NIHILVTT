import { useState } from "react";
import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetTabs } from "./PlayerSheetTabs";
import { PrincipalTab } from "@/widgets/character-sheet/PrincipalTab";

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
    <>
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      {playerSheetActiveTab === "principal" ? (
        <PrincipalTab
          characterId={characterId}
          onEditAction={onEditAction}
        />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab />
      ) : (
        <PlayerSheetConfigTab />
      )}
    </>
  );
}
