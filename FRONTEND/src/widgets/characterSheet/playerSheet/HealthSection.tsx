import { PlayerCharacterCombatViewModel } from '@/entities/character/model/view-models/playerCharacterCombatViewModel';

interface HealthSectionProps {
  combatViewModel: PlayerCharacterCombatViewModel | null;
}

export function HealthSection({ combatViewModel }: HealthSectionProps) {
  const currentHp = combatViewModel?.currentHp ?? 0;
  const tempHp = combatViewModel?.tempHp ?? 0;
  const maxHp = combatViewModel?.maxHp ?? 0;
  const hitDiceEntries = combatViewModel?.hitDiceEntries ?? [];

  return (
    <fieldset
      id="pontos de vida"
      className="flex flex-col gap-2 rounded-xl bg-surface-1/70 px-2.5 py-2.5"
    >
      <legend className="px-1 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-text-primary">
        Pontos de Vida
      </legend>

      <div className="grid grid-cols-1 gap-1">
        <div>
          <div className="mb-1 text-center text-[0.56rem] font-semibold tracking-[0.08em] text-text-secondary">
            ATUAL
          </div>
          <div className="flex h-7 items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
            {currentHp}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="mb-1 text-center text-[0.56rem] font-semibold tracking-[0.08em] text-text-secondary">
              TEMPORÁRIO
            </div>
            <div className="flex h-7 items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
              {tempHp}
            </div>
          </div>
          <div>
            <div className="mb-1 text-center text-[0.56rem] font-semibold tracking-[0.08em] text-text-secondary">
              MÁXIMO
            </div>
            <div className="flex h-7 items-center justify-center rounded-md bg-surface-1/55 px-2 text-[0.82rem] font-semibold text-text-primary">
              {maxHp}
            </div>
          </div>
        </div>
      </div>

      <fieldset className="flex-1 rounded-lg bg-surface-0/16 p-2 pt-2.5">
        <legend className="px-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Dados de Vida
        </legend>
        {hitDiceEntries.length === 0 ? (
          <div className="rounded-md bg-surface-1/45 px-2 py-2 text-center text-[0.68rem] text-text-secondary">
            Nenhum dado de vida configurado.
          </div>
        ) : (
          <ul className="flex flex-col gap-1">
            {hitDiceEntries.map((entry, index) => (
              <li
                key={entry.id ?? `${entry.type}-${index}`}
                className="flex items-center justify-between rounded-md bg-surface-1/45 px-2 py-1.5 text-[0.68rem]"
              >
                <span className="font-bold uppercase text-text-primary">
                  {String(entry.type).toUpperCase()}
                </span>
                <span className="font-semibold text-text-secondary">
                  {entry.quantity ?? 0}
                </span>
              </li>
            ))}
          </ul>
        )}
      </fieldset>
    </fieldset>
  );
}
