import React from "react";
import { FeatureOrTrait } from "../../../../../shared/api/types"; // Certifique-se de que o tipo FeatureTrait está definido em types/index.ts
import { cn } from "../../../../../shared/lib/utils/cn";
import { generateUniqueId } from "../../../../../shared/lib/utils/id/idUtils";

interface FeaturesAndTraitsProps {
  featuresAndTraits: FeatureOrTrait[];
  setFeaturesAndTraits: (features: FeatureOrTrait[]) => void;
}

export const FeaturesAndTraits: React.FC<FeaturesAndTraitsProps> = ({
  featuresAndTraits,
  setFeaturesAndTraits,
}) => {
  return (
    <div className="border p-2 rounded-md mt-2 flex-grow flex flex-col">
      <h3
        className={cn(
          "block text-[0.6875rem] font-medium text-accent-primary mb-px",
          "text-center uppercase mb-1"
        )}
      >
        Características & Talentos
      </h3>
      <textarea
        value={
          featuresAndTraits
            ?.map(
              (ft) =>
                `${ft.name}${ft.source ? ` (${ft.source})` : ""}:\n${
                  ft.description
                }`
            )
            .join("\n\n") || ""
        }
        onChange={(e) => {
          const newFeaturesText = e.target.value;
          const newFeaturesArray = newFeaturesText
            .split("\n\n")
            .map((textBlock, index) => {
              const firstLineEnd = textBlock.indexOf(":\n");
              let name = `Característica ${index + 1}`;
              let description = textBlock;
              if (firstLineEnd !== -1) {
                name = textBlock.substring(0, firstLineEnd);
                description = textBlock.substring(firstLineEnd + 2);
              }
              return {
                id: generateUniqueId(),
                name,
                description,
              };
            });
          setFeaturesAndTraits(newFeaturesArray);
        }}
        placeholder="Descreva características de classe, espécie, talentos, etc."
        className={cn(
          "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
          "min-h-[150px] flex-grow text-xs"
        )}
      />
    </div>
  );
};
