import { usePlayerSheet } from "../../../../contexts/CharacterSheetContext"; // Renomeado
import { AttackList } from "./AttackList";
import { FeaturesAndTraits } from "./FeaturesAndTraits";

export function PrincipalAttacksAndFeatures() {
  const {
    attacks,
    handleAddAttack,
    handleRemoveAttack,
    handleAttackChange,
    featuresAndTraits,
    setFeaturesAndTraits,
  } = usePlayerSheet();

  return (
    <div className="col-span-1 flex flex-col space-y-2.5">
      <AttackList
        attacks={attacks}
        handleAddAttack={handleAddAttack}
        handleRemoveAttack={handleRemoveAttack}
        handleAttackChange={handleAttackChange}
      />
      <FeaturesAndTraits
        featuresAndTraits={featuresAndTraits}
        setFeaturesAndTraits={setFeaturesAndTraits}
      />
    </div>
  );
}
