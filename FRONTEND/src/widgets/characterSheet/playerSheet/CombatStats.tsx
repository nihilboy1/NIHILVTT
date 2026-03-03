import type React from "react";

interface CombatStatsProps {
  calculatedInitiative: number;
  calculatedPassivePerception: number;
  speedInMeters: string;
  speedInSquares: string;
  armorClass: number;
  speed: number;
  shieldEquipped: boolean;
}


function StatTile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-1 rounded-lg bg-surface-0/20 p-1.5">
      <label className="mb-1 block text-center text-[0.54rem] font-semibold tracking-[0.08em] text-text-secondary">
        {label}
      </label>
      {children}
    </div>
  );
}

export function CombatStats({
  calculatedInitiative,
  calculatedPassivePerception,
  speedInMeters,
  speedInSquares,
  armorClass,
  speed,
  shieldEquipped,
}: CombatStatsProps) {
  return (
    <fieldset className="rounded-xl bg-surface-1/70 px-2.5 py-2.5">
      <legend className="px-1 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-text-primary">
        Armadura e Combate
      </legend>
      <div className="mt-1 grid grid-cols-2 gap-1 xl:grid-cols-4">
        <StatTile label="CA">
          <div className="flex h-7 w-full items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
            {armorClass}
          </div>
          <div className="flex items-center justify-center pt-1.5">
            <span className="rounded-md bg-surface-1/35 px-1.5 py-0.5 text-[0.5rem] font-medium tracking-[0.08em] text-text-secondary">
              {shieldEquipped ? "ESCUDO EQUIPADO" : "SEM ESCUDO"}
            </span>
          </div>
        </StatTile>

        <StatTile label="INICIATIVA">
          <div className="flex h-7 w-full items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
            {Number.isNaN(calculatedInitiative)
              ? 0
              : calculatedInitiative >= 0
                ? `+${calculatedInitiative}`
                : calculatedInitiative}
          </div>
        </StatTile>

        <StatTile label="DESLOC.">
          <div className="flex h-7 w-full items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
            {speed}
          </div>
          <div className="mt-1 grid grid-cols-2 gap-0.5 text-center">
            <p
              className="rounded bg-surface-1/35 px-1 py-0.5 text-[0.5rem] text-text-secondary/80"
              title="Deslocamento em METROS"
            >
              {Number.isNaN(Number(speedInMeters)) ? 0 : speedInMeters} M
            </p>
            <p
              className="rounded bg-surface-1/35 px-1 py-0.5 text-[0.5rem] text-text-secondary/80"
              title="Deslocamento em QUADRADOS"
            >
              {Number.isNaN(Number(speedInSquares)) ? 0 : speedInSquares} Q
            </p>
          </div>
        </StatTile>

        <StatTile label="PERCEP. PASS.">
          <div className="flex h-7 w-full items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
            {calculatedPassivePerception}
          </div>
        </StatTile>
      </div>
    </fieldset>
  );
}
