import { PrincipalHeader } from "./PrincipalHeader";
import { PrincipalAttributesAndSkills } from "./PrincipalAttributesAndSkills";
import { PrincipalHealthAndCombat } from "./PrincipalHealthAndCombat";
// Não é mais necessário importar usePlayerSheet aqui, pois os componentes filhos o utilizam diretamente.

export function PrincipalTab() {
  return (
    <div className="flex flex-col p-0.5 overflow-y-auto max-h-[calc(100vh-12rem)] hide-scrollbar">
      <PrincipalHeader />

      <div className="flex flex-wrap gap-2 w-full">
        <PrincipalAttributesAndSkills className="flex-1 min-w-[300px]" />
        <PrincipalHealthAndCombat className="flex-1 min-w-[300px]" />
      </div>
    </div>
  );
}
