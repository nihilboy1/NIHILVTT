import type { MonsterNpcCharacter } from '@/entities/character/model/schemas/character.schema';
import {
  convertFeetToMetersDisplay,
  translateMonsterListToPtBr,
  translateMonsterTermToPtBr,
  translateSpeedSummaryToPtBr,
} from '@/shared/lib/utils/monsterGlossary';

interface MonsterSheetContentProps {
  character: MonsterNpcCharacter;
}

export function MonsterSheetContent({ character }: MonsterSheetContentProps) {
  const defenses = character.defenses;
  const senses = buildSenses(character);
  const typeBadges = buildTypeBadges(character);
  const alignmentBadges = buildAlignmentBadges(character);
  const environmentBadges = buildEnvironmentBadges(character);

  return (
    <div className="themed-scrollbar bg-surface-0/40 text-text-primary flex h-full min-h-0 flex-col gap-3 overflow-y-auto rounded-lg p-3">
      <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)]">
        <div className="border-surface-3 bg-surface-1 overflow-hidden rounded-lg border">
          <img
            src={character.monsterSheetImage ?? character.image}
            alt={character.name}
            className="h-32 w-full object-cover"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <InfoCard label="Nome" value={character.name} />
          <InfoCard label="CR" value={String(character.challengeRating)} />
          <InfoCard
            label="HP"
            value={`${character.combatStats.currentHp}/${character.combatStats.maxHp}${
              character.hitPointsFormula ? ` (${character.hitPointsFormula})` : ''
            }`}
          />
          <InfoCard
            label="CA / Movimento"
            value={`${character.combatStats.armorClass} / ${character.combatStats.speed}m`}
          />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <BadgesCard label="Tipo" badges={typeBadges} getClasses={getMonsterTypeBadgeClasses} />
        <BadgesCard
          label="Alinhamento"
          badges={alignmentBadges}
          getClasses={getAlignmentBadgeClasses}
        />
        <InfoCard label="Fonte" value={character.source ?? '-'} />
        <InfoCard label="Velocidades" value={translateSpeedSummaryToPtBr(character.speedSummary)} />
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="FOR" value={character.attributes.strength} />
        <StatCard label="DES" value={character.attributes.dexterity} />
        <StatCard label="CON" value={character.attributes.constitution} />
        <StatCard label="INT" value={character.attributes.intelligence} />
        <StatCard label="SAB" value={character.attributes.wisdom} />
        <StatCard label="CAR" value={character.attributes.charisma} />
      </div>

      <section className="border-surface-3 bg-surface-1/70 rounded-lg border p-3">
        <p className="text-text-secondary mb-2 text-xs tracking-wide uppercase">
          Informacoes de monstro
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <SensesCard senses={senses} />
          <InfoCard label="Idiomas" value={translateMonsterListToPtBr(character.languages)} />
          <BadgesCard
            label="Ambientes"
            badges={environmentBadges}
            getClasses={getEnvironmentBadgeClasses}
          />
          <InfoCard label="Familiar" value={character.isFamiliar ? 'Sim' : 'Nao'} />
          <InfoCard
            label="Resistencias"
            value={translateMonsterListToPtBr(defenses?.resistances)}
          />
          <InfoCard
            label="Vulnerabilidades"
            value={translateMonsterListToPtBr(defenses?.vulnerabilities)}
          />
          <InfoCard
            label="Imunidades a dano"
            value={translateMonsterListToPtBr(defenses?.damageImmunities)}
          />
          <InfoCard
            label="Imunidades a condicao"
            value={translateMonsterListToPtBr(defenses?.conditionImmunities)}
          />
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="border-surface-3 bg-surface-1/70 rounded-lg border p-3">
          <p className="text-text-secondary mb-2 text-xs tracking-wide uppercase">Tracos</p>
          <div className="space-y-2">
            {(character.featuresAndTraits?.length ?? 0) > 0 ? (
              character.featuresAndTraits?.map((trait) => (
                <div key={trait.id} className="bg-surface-0/60 rounded-md p-2">
                  <p className="text-sm font-semibold">{trait.name}</p>
                  <p className="text-text-secondary text-xs leading-relaxed">{trait.description}</p>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">Sem tracos especiais neste bloco.</p>
            )}
          </div>
        </section>

        <section className="border-surface-3 bg-surface-1/70 rounded-lg border p-3">
          <p className="text-text-secondary mb-2 text-xs tracking-wide uppercase">Acoes</p>
          <div className="space-y-2">
            {(character.actions?.length ?? 0) > 0 ? (
              character.actions?.map((action) => (
                <div key={action.id} className="bg-surface-0/60 rounded-md p-2">
                  <p className="text-sm font-semibold">{action.name}</p>
                  <p className="text-text-secondary text-xs">
                    Ataque {action.bonus ?? 0} | Dano {action.damage ?? '-'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">Sem acoes ativas mapeadas.</p>
            )}
          </div>
        </section>
      </div>

      {character.notes ? (
        <section className="border-surface-3 bg-surface-1/70 rounded-lg border p-3">
          <p className="text-text-secondary mb-1 text-xs tracking-wide uppercase">Notas</p>
          <p className="text-text-secondary text-sm leading-relaxed">{character.notes}</p>
        </section>
      ) : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-surface-3 bg-surface-1/80 rounded-lg border p-2 text-center">
      <p className="text-text-secondary text-[0.7rem] tracking-wide uppercase">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-surface-3 bg-surface-1/80 rounded-lg border p-2">
      <p className="text-text-secondary text-xs tracking-wide uppercase">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

interface SenseBadge {
  key: string;
  label: string;
  value: string;
}

interface PlainBadge {
  key: string;
  label: string;
}

function SensesCard({ senses }: { senses: SenseBadge[] }) {
  return (
    <div className="border-surface-3 bg-surface-1/80 rounded-lg border p-2">
      <p className="text-text-secondary text-xs tracking-wide uppercase">Sentidos</p>
      {senses.length > 0 ? (
        <div className="mt-1 flex flex-col gap-1.5">
          {senses.map((sense) => (
            <span
              key={sense.key}
              className={`inline-flex w-fit rounded-md border px-2 py-1 text-xs font-semibold ${getSenseBadgeClasses(
                sense.key,
              )}`}
            >
              {formatSenseBadgeLabel(sense)}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold">-</p>
      )}
    </div>
  );
}

function BadgesCard({
  label,
  badges,
  getClasses,
}: {
  label: string;
  badges: PlainBadge[];
  getClasses: (badgeKey: string) => string;
}) {
  return (
    <div className="border-surface-3 bg-surface-1/80 rounded-lg border p-2">
      <p className="text-text-secondary text-xs tracking-wide uppercase">{label}</p>
      {badges.length > 0 ? (
        <div className="mt-1 flex flex-col gap-1.5">
          {badges.map((badge) => (
            <span
              key={badge.key}
              className={`inline-flex w-fit rounded-md border px-2 py-1 text-xs font-semibold ${getClasses(
                badge.key,
              )}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold">-</p>
      )}
    </div>
  );
}

function buildTypeBadges(character: MonsterNpcCharacter): PlainBadge[] {
  if (!character.monsterType) {
    return [];
  }

  return [
    {
      key: normalizeBadgeKey(character.monsterType),
      label: translateMonsterTermToPtBr(character.monsterType),
    },
  ];
}

function buildAlignmentBadges(character: MonsterNpcCharacter): PlainBadge[] {
  if (!character.alignment) {
    return [];
  }

  return [
    {
      key: normalizeBadgeKey(character.alignment),
      label: translateMonsterTermToPtBr(character.alignment),
    },
  ];
}

function buildEnvironmentBadges(character: MonsterNpcCharacter): PlainBadge[] {
  return (character.environments ?? []).map((environment) => ({
    key: normalizeBadgeKey(environment),
    label: translateMonsterTermToPtBr(environment),
  }));
}

function buildSenses(character: MonsterNpcCharacter): SenseBadge[] {
  if (!character.senses) {
    return [];
  }

  const badges: SenseBadge[] = [
    {
      key: 'passive',
      label: 'Percepção passiva',
      value: String(character.senses.passivePerception),
    },
  ];

  const visionEntries = Object.entries(character.senses.vision ?? {}).flatMap(([sense, range]) =>
    typeof range === 'number'
      ? [
          {
            key: sense,
            label: translateMonsterTermToPtBr(sense),
            value: convertFeetToMetersDisplay(range),
          },
        ]
      : [],
  );

  return [...badges, ...visionEntries];
}

function getSenseBadgeClasses(senseKey: string): string {
  if (senseKey === 'passive') {
    return 'monster-badge-tone-sense-passive';
  }

  if (senseKey === 'darkvision') {
    return 'monster-badge-tone-sense-darkvision';
  }

  if (senseKey === 'blindsight') {
    return 'monster-badge-tone-sense-blindsight';
  }

  if (senseKey === 'tremorsense') {
    return 'monster-badge-tone-sense-tremorsense';
  }

  if (senseKey === 'truesight') {
    return 'monster-badge-tone-sense-truesight';
  }

  return 'monster-badge-tone-default';
}

function getMonsterTypeBadgeClasses(typeKey: string): string {
  if (typeKey === 'beast') {
    return 'monster-badge-tone-type-beast';
  }

  if (typeKey === 'humanoid') {
    return 'monster-badge-tone-type-humanoid';
  }

  if (typeKey === 'plant') {
    return 'monster-badge-tone-type-plant';
  }

  if (typeKey === 'undead') {
    return 'monster-badge-tone-type-undead';
  }

  if (typeKey === 'fiend') {
    return 'monster-badge-tone-type-fiend';
  }

  if (typeKey === 'construct') {
    return 'monster-badge-tone-type-construct';
  }

  return 'monster-badge-tone-default';
}

function getAlignmentBadgeClasses(alignmentKey: string): string {
  if (alignmentKey === 'trueneutral') {
    return 'monster-badge-tone-alignment-trueneutral';
  }

  if (alignmentKey === 'unaligned') {
    return 'monster-badge-tone-alignment-unaligned';
  }

  if (alignmentKey === 'neutralevil') {
    return 'monster-badge-tone-alignment-neutralevil';
  }

  if (alignmentKey === 'lawfulevil') {
    return 'monster-badge-tone-alignment-lawfulevil';
  }

  if (alignmentKey === 'lawfulneutral') {
    return 'monster-badge-tone-alignment-lawfulneutral';
  }

  return 'monster-badge-tone-default';
}

function getEnvironmentBadgeClasses(environmentKey: string): string {
  if (environmentKey === 'any') {
    return 'monster-badge-tone-environment-any';
  }

  if (environmentKey === 'arctic') {
    return 'monster-badge-tone-environment-arctic';
  }

  if (environmentKey === 'coast' || environmentKey === 'underwater') {
    return 'monster-badge-tone-environment-coast';
  }

  if (environmentKey === 'desert') {
    return 'monster-badge-tone-environment-desert';
  }

  if (environmentKey === 'forest') {
    return 'monster-badge-tone-environment-forest';
  }

  if (environmentKey === 'grassland' || environmentKey === 'hill') {
    return 'monster-badge-tone-environment-grassland';
  }

  if (environmentKey === 'mountain') {
    return 'monster-badge-tone-environment-mountain';
  }

  if (environmentKey === 'swamp') {
    return 'monster-badge-tone-environment-swamp';
  }

  if (environmentKey === 'underdark') {
    return 'monster-badge-tone-environment-underdark';
  }

  if (environmentKey === 'urban') {
    return 'monster-badge-tone-environment-urban';
  }

  return 'monster-badge-tone-default';
}

function formatSenseBadgeLabel(sense: SenseBadge): string {
  return /\d/.test(sense.value)
    ? `${sense.label}: ${sense.value}`
    : `${sense.label} ${sense.value}`;
}

function normalizeBadgeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '').replace(/[_-]/g, '');
}
