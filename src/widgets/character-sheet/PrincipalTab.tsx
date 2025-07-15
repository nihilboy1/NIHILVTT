import { PrincipalHeader } from "@/entities/character/ui/playerSheet/principalTab/PrincipalHeader";
import { AttributesWidget } from "@/widgets/character-sheet/AttributesWidget";
import { HealthAndCombatWidget } from "@/widgets/character-sheet/HealthAndCombatWidget";

interface PrincipalTabProps {
  characterId: string;
  onEditAction: (actionId: string) => void;
}

export function PrincipalTab({ characterId, onEditAction }: PrincipalTabProps) {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar">
      <PrincipalHeader />

      <div className="flex flex-wrap gap-2 w-full">
        <AttributesWidget
          characterId={characterId}
          className="flex-1 min-w-[300px]"
        />
        <HealthAndCombatWidget
          characterId={characterId}
          className="flex-1 min-w-[300px]"
          onEditAction={onEditAction}
        />
      </div>
    </div>
  );
}
