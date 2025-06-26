import React from "react";
import { PrincipalHeader } from "./PrincipalHeader";
import { PlayerAttributesAndSkills } from "./PrincipalAttributesAndSkills";
import { PlayerAttacksAndFeatures } from "./PlayerAttacksAndFeatures"; // Alterado para importação nomeada
import { PrincipalHealthAndCombat } from "./PrincipalHealthAndCombat";
// Não é mais necessário importar usePlayerSheet aqui, pois os componentes filhos o utilizam diretamente.

export function PrincipalTab() {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar border">
      <PrincipalHeader />

      <div className="flex justify-between flex-wrap gap-2">
        <PlayerAttributesAndSkills />

        <PrincipalHealthAndCombat />

        <PlayerAttacksAndFeatures />
      </div>
    </div>
  );
}
