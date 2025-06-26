import { PrincipalHeader } from "./PrincipalHeader";
import { PrincipalAttributesAndSkills } from "./PrincipalAttributesAndSkills";
import { PrincipalAttacksAndFeatures } from "./PrincipalAttacksAndFeatures"; // Alterado para importação nomeada
import { PrincipalHealthAndCombat } from "./PrincipalHealthAndCombat";
// Não é mais necessário importar usePlayerSheet aqui, pois os componentes filhos o utilizam diretamente.

export function PrincipalTab() {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar border">
      <PrincipalHeader />

      <div className="flex justify-between flex-wrap gap-2">
        <PrincipalAttributesAndSkills />

        <PrincipalHealthAndCombat />

        <PrincipalAttacksAndFeatures />
      </div>
    </div>
  );
}
