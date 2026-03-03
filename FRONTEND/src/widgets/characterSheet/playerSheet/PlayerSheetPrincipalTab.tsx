import { PlayerCharacterViewModel } from "@/entities/character/model/view-models/playerCharacterViewModel";

import { PlayerSheetPrincipalContent } from "./PlayerSheetPrincipalContent";
import { PrincipalHeader } from "./PrincipalHeader";

interface PlayerSheetPrincipalTabProps {
  characterId: string;
  viewModel: PlayerCharacterViewModel | null;
}

export function PlayerSheetPrincipalTab({
  characterId,
  viewModel,
}: PlayerSheetPrincipalTabProps) {
  return (
    <div className="hide-scrollbar flex h-full min-h-0 flex-col overflow-y-auto rounded-lg bg-surface-0/40 p-1.5">
      <PrincipalHeader viewModel={viewModel} />
      <PlayerSheetPrincipalContent characterId={characterId} />
    </div>
  );
}
