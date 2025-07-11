// src/entities/character/ui/playerSheet/PlayerSheetContent.tsx

import { useState } from "react";
// 1. A desestruturação de `isDirty` foi removida, pois não é mais usada.
import { useFormContext } from 'react-hook-form';
import { PlayerSheetConfigTab } from "./configTab/PlayerSheetConfigTab";
import { PlayerSheetDetailsTab } from "./detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetTabs } from "./PlayerSheetTabs";
import { PrincipalTab } from "./principalTab/PrincipalTab";
import { PlayerCharacterSchema } from "../../model/schemas/character.schema";

// 2. A prop 'onClose' foi removida da interface.
interface PlayerSheetContentProps {}

export function PlayerSheetContent({}: PlayerSheetContentProps) { // 3. E removida dos parâmetros.
  // A busca por 'isDirty' foi removida.
  const {} = useFormContext<PlayerCharacterSchema>();
  const [playerSheetActiveTab, setPlayerSheetActiveTab] = useState<"principal" | "detalhes" | "configuracoes">("principal");

  return (
    <>
      <PlayerSheetTabs
        activeTab={playerSheetActiveTab}
        onTabChange={setPlayerSheetActiveTab}
      />

      {playerSheetActiveTab === "principal" ? (
        <PrincipalTab />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab />
      ) : (
        <PlayerSheetConfigTab />
      )}

      {/* 4. O <div> contendo os botões "Cancelar" e "Salvar" foi completamente removido daqui. */}
    </>
  );
}