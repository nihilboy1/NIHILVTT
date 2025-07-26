import { PlayerSheetPrincipalContent } from "./PlayerSheetPrincipalContent";
import { PrincipalHeader } from "./PrincipalHeader";

interface PlayerSheetPrincipalTabProps {
  characterId: string;
  onEditAction: (actionId: string) => void;
}

export function PlayerSheetPrincipalTab({ characterId, onEditAction }: PlayerSheetPrincipalTabProps) {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar">
      <PrincipalHeader />
      <PlayerSheetPrincipalContent
        characterId={characterId}
        onEditAction={onEditAction}
      />
    </div>
  );
}
