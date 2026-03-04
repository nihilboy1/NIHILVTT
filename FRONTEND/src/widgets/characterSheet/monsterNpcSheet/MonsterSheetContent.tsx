import type { MonsterNpcCharacter } from '@/entities/character/model/schemas/character.schema';

interface MonsterSheetContentProps {
  character: MonsterNpcCharacter;
}

export function MonsterSheetContent({ character }: MonsterSheetContentProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 rounded-lg bg-surface-0/40 p-3 text-text-primary">
      <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-lg border border-surface-3 bg-surface-1">
          <img
            src={character.image}
            alt={character.name}
            className="h-32 w-full object-cover"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-surface-3 bg-surface-1/80 p-2">
            <p className="text-xs uppercase tracking-wide text-text-secondary">Nome</p>
            <p className="text-sm font-semibold">{character.name}</p>
          </div>
          <div className="rounded-lg border border-surface-3 bg-surface-1/80 p-2">
            <p className="text-xs uppercase tracking-wide text-text-secondary">CR</p>
            <p className="text-sm font-semibold">{character.challengeRating}</p>
          </div>
          <div className="rounded-lg border border-surface-3 bg-surface-1/80 p-2">
            <p className="text-xs uppercase tracking-wide text-text-secondary">HP</p>
            <p className="text-sm font-semibold">
              {character.combatStats.currentHp}/{character.combatStats.maxHp}
            </p>
          </div>
          <div className="rounded-lg border border-surface-3 bg-surface-1/80 p-2">
            <p className="text-xs uppercase tracking-wide text-text-secondary">CA / Movimento</p>
            <p className="text-sm font-semibold">
              {character.combatStats.armorClass} / {character.combatStats.speed}m
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="FOR" value={character.attributes.strength} />
        <StatCard label="DES" value={character.attributes.dexterity} />
        <StatCard label="CON" value={character.attributes.constitution} />
        <StatCard label="INT" value={character.attributes.intelligence} />
        <StatCard label="SAB" value={character.attributes.wisdom} />
        <StatCard label="CAR" value={character.attributes.charisma} />
      </div>

      <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-2">
        <section className="min-h-0 rounded-lg border border-surface-3 bg-surface-1/70 p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-text-secondary">Traços</p>
          <div className="space-y-2 overflow-y-auto pr-1">
            {(character.featuresAndTraits?.length ?? 0) > 0 ? (
              character.featuresAndTraits?.map((trait) => (
                <div key={trait.id} className="rounded-md bg-surface-0/60 p-2">
                  <p className="text-sm font-semibold">{trait.name}</p>
                  <p className="text-xs leading-relaxed text-text-secondary">{trait.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary">Sem traços especiais neste bloco.</p>
            )}
          </div>
        </section>

        <section className="min-h-0 rounded-lg border border-surface-3 bg-surface-1/70 p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-text-secondary">Ações</p>
          <div className="space-y-2 overflow-y-auto pr-1">
            {(character.actions?.length ?? 0) > 0 ? (
              character.actions?.map((action) => (
                <div key={action.id} className="rounded-md bg-surface-0/60 p-2">
                  <p className="text-sm font-semibold">{action.name}</p>
                  <p className="text-xs text-text-secondary">
                    Ataque {action.bonus ?? 0} | Dano {action.damage ?? '-'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary">Sem ações ativas mapeadas.</p>
            )}
          </div>
        </section>
      </div>

      {character.notes ? (
        <section className="rounded-lg border border-surface-3 bg-surface-1/70 p-3">
          <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">Notas</p>
          <p className="text-sm leading-relaxed text-text-secondary">{character.notes}</p>
        </section>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-surface-3 bg-surface-1/80 p-2 text-center">
      <p className="text-[0.7rem] uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
