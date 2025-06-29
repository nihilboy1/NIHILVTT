import React from "react";
import { cn } from "../../../../utils/cn";
import { ATTRIBUTE_LABELS } from "../../../../constants/sheetDefaults";
import { PlayerToken } from "../../../../shared/types";

interface AttributeBlockProps {
  attrName: keyof NonNullable<PlayerToken["attributes"]>;
  attrValue: number;
  onAttributeChange: (
    attrName: keyof NonNullable<PlayerToken["attributes"]>,
    value: number | ""
  ) => void;
}

export const AttributeBlock: React.FC<AttributeBlockProps> = ({
  attrName,
  attrValue,
  onAttributeChange,
}) => {
  const attrLabel = ATTRIBUTE_LABELS[attrName];
  const modifier = Math.floor((attrValue - 10) / 2);

  return (
    <div className="flex justify-between w-[10rem]">
      <div className="flex flex-col ">
        <label
          htmlFor={`attr-${attrName}`}
          className={cn("block text-xs font-bold mb-0.5", "text-xs uppercase")}
        >
          {attrLabel}
        </label>
        <input
          id={`attr-${attrName}`}
          type="number"
          value={attrValue}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              onAttributeChange(attrName, Math.max(1, Math.min(30, value)));
            } else if (e.target.value === "") {
              onAttributeChange(attrName, "");
            }
          }}
          className={cn(
            "hide-arrows w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "text-center hide-number-spinners w-12 text-lg font-semibold p-0"
          )}
        />
      </div>
      <div id="modificador" className="flex items-center justify-center w-14">
        <span className="block text-2xl font-bold p-1 border rounded w-full text-center ">
          {modifier >= 0 ? `+${modifier}` : modifier}
        </span>
      </div>
    </div>
  );
};
