import { PlayerCharacterViewModel } from "@/entities/character/model/view-models/playerCharacterViewModel";

interface PrincipalHeaderProps {
  viewModel: PlayerCharacterViewModel | null;
}

function StatPill({
  label,
  value,
  title,
}: {
  label: string;
  value: string;
  title?: string;
}) {
  return (
    <div
      className="rounded-lg bg-surface-0/35 px-2 py-1.5"
      title={title}
    >
      <p className="text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-text-secondary/80">
        {label}
      </p>
      <p className="mt-0.5 text-[0.82rem] font-semibold text-text-primary">{value}</p>
    </div>
  );
}

export function PrincipalHeader({ viewModel }: PrincipalHeaderProps) {
  const level = String(viewModel?.level ?? 1);
  const calculatedProficiencyBonus = `+${viewModel?.proficiencyBonus ?? 2}`;

  const charClass = viewModel?.classLabel ?? '-';
  const subclass = viewModel?.subclassLabel ?? '-';
  const background = viewModel?.backgroundLabel ?? '-';
  const species = viewModel?.speciesLabel ?? '-';

  return (
    <div className="mb-1.5 rounded-xl bg-gradient-to-r from-surface-1/75 via-surface-1/65 to-surface-0/45 p-2">
      <div className="grid gap-1.5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-lg bg-surface-0/28 p-2">
          <p className="mb-1 block text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-text-secondary">
            Personagem
          </p>
          <div className="rounded-lg bg-surface-1/55 px-3 py-1.5 text-[0.96rem] font-semibold text-text-primary">
            {viewModel?.name ?? '-'}
          </div>
          <p className="mt-1 text-[0.64rem] text-text-secondary">
            Dados de build e progressão são autoritativos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-3">
          <StatPill
            label="Nível"
            value={level}
            title="Nível definido por progressão autoritativa"
          />
          <StatPill label="Proficiência" value={calculatedProficiencyBonus} />
          <StatPill label="Classe" value={charClass} />
          <StatPill label="Subclasse" value={subclass} />
          <StatPill label="Origem" value={background} />
          <StatPill label="Espécie" value={species} />
        </div>
      </div>
    </div>
  );
}
