import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024MONSTERS } from "../data/index.js";

type MonsterManifestSpeed = {
  walk: number | null;
  burrow: number | null;
  climb: number | null;
  fly: number | null;
  swim: number | null;
  unit: string;
};

type MonsterManifestAbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type MonsterCatalogManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  tokenUrl: string;
  splashArtUrl: string;
  size: string;
  creatureType: string;
  alignment: string;
  abilityScores: MonsterManifestAbilityScores;
  armorClass: number;
  hitPointMaximum: number;
  speed: MonsterManifestSpeed;
  defenses: MonsterManifestDefenses;
  challengeRating: string;
  actions: MonsterManifestAction[];
  automatedPassives: MonsterManifestPassiveEffect[];
};

type MonsterManifestDefenses = {
  resistances: string[];
  vulnerabilities: string[];
  damageImmunities: string[];
};

type MonsterManifestAction = {
  actionId: string;
  name: string;
  attackBonus: number;
  damageFormula: string;
  damageType: string;
  rangeMeters: number;
  conditionalDamageBonuses: MonsterManifestConditionalDamage[];
  conditionalAppliedConditions: MonsterManifestConditionalCondition[];
};

type MonsterManifestConditionalDamage = {
  damageFormula: string;
  damageType: string;
  requiresUserMovementAtLeastMeters: number;
};

type MonsterManifestConditionalCondition = {
  condition: string;
  requiresUserMovementAtLeastMeters: number;
};

type MonsterManifestPassiveEffect = {
  type: "passive_grantAdvantage";
  on: "attackRoll";
  name: string;
  appliesToActionIds: string[];
  triggerHasAllyNearby: {
    rangeMeters: number;
    allyIsNotIncapacitated: boolean;
  };
};

type MonsterCatalogManifest = {
  manifestVersion: number;
  monsters: MonsterCatalogManifestEntry[];
};

const MONSTER_CATALOG_MANIFEST_VERSION = 1;

function buildMonsterSpeed(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestSpeed {
  return {
    walk: monster.speed.walk ?? null,
    burrow: monster.speed.burrow ?? null,
    climb: monster.speed.climb ?? null,
    fly: monster.speed.fly ?? null,
    swim: monster.speed.swim ?? null,
    unit: monster.speed.unit,
  };
}

function buildMonsterAbilityScores(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestAbilityScores {
  return {
    strength: monster.abilityScores.strength,
    dexterity: monster.abilityScores.dexterity,
    constitution: monster.abilityScores.constitution,
    intelligence: monster.abilityScores.intelligence,
    wisdom: monster.abilityScores.wisdom,
    charisma: monster.abilityScores.charisma,
  };
}

function normalizeDamageTypeList(
  values: readonly string[] | undefined,
): string[] {
  if (!values || values.length === 0) {
    return [];
  }

  return [
    ...new Set(
      values
        .map((value) => value.trim().toLowerCase())
        .filter((value) => value.length > 0),
    ),
  ].sort((left, right) => left.localeCompare(right));
}

function buildMonsterDefenses(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestDefenses {
  const defenses = monster.defenses;
  return {
    resistances: normalizeDamageTypeList(defenses?.resistances),
    vulnerabilities: normalizeDamageTypeList(defenses?.vulnerabilities),
    damageImmunities: normalizeDamageTypeList(defenses?.immunities?.damage),
  };
}

function convertFeetToMeters(feet: number): number {
  const meters = feet * 0.3;
  return Number.isInteger(meters) ? meters : Number(meters.toFixed(1));
}

function convertDistanceToMeters(normal: number, unit: unknown): number {
  if (typeof unit === "string") {
    const normalizedUnit = unit.trim().toLowerCase();
    if (
      normalizedUnit === "m" ||
      normalizedUnit === "meter" ||
      normalizedUnit === "meters"
    ) {
      return Number.isInteger(normal) ? normal : Number(normal.toFixed(1));
    }
    if (normalizedUnit === "ft" || normalizedUnit === "feet") {
      return convertFeetToMeters(normal);
    }
  }

  // Default to feet because monster data currently uses imperial units.
  return convertFeetToMeters(normal);
}

function formatDamageFormula(formula: unknown): string | null {
  if (!formula || typeof formula !== "object") {
    return null;
  }

  const formulaRecord = formula as Record<string, unknown>;
  if (typeof formulaRecord.fixed === "number") {
    return String(formulaRecord.fixed);
  }

  const roll = formulaRecord.roll;
  if (!roll || typeof roll !== "object") {
    return null;
  }

  const rollRecord = roll as Record<string, unknown>;
  const count = typeof rollRecord.count === "number" ? rollRecord.count : null;
  const faces = typeof rollRecord.faces === "number" ? rollRecord.faces : null;
  if (count == null || faces == null) {
    return null;
  }

  const bonusValueRaw =
    rollRecord.bonus && typeof rollRecord.bonus === "object"
      ? (rollRecord.bonus as Record<string, unknown>).value
      : undefined;
  const bonusValue = typeof bonusValueRaw === "number" ? bonusValueRaw : 0;
  if (bonusValue === 0) {
    return `${count}d${faces}`;
  }

  const sign = bonusValue > 0 ? "+" : "";
  return `${count}d${faces}${sign}${bonusValue}`;
}

function extractDamageType(formula: unknown): string | null {
  if (!formula || typeof formula !== "object") {
    return null;
  }

  const formulaRecord = formula as Record<string, unknown>;
  const options = formulaRecord.damageTypeOptions;
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  const firstOption = options[0];
  if (typeof firstOption !== "string") {
    return null;
  }

  const normalized = firstOption.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function extractMovesAtLeastRequirementMeters(
  outcome: Record<string, unknown>,
): number | null {
  const requirements = outcome.requirements;
  if (!requirements || typeof requirements !== "object") {
    return null;
  }

  const user = (requirements as Record<string, unknown>).user;
  if (!user || typeof user !== "object") {
    return null;
  }

  const events = (user as Record<string, unknown>).events;
  if (!Array.isArray(events)) {
    return null;
  }

  for (const event of events) {
    if (!event || typeof event !== "object") {
      continue;
    }

    const eventRecord = event as Record<string, unknown>;
    if (eventRecord.type !== "movesAtLeast") {
      continue;
    }

    const distance = eventRecord.distance;
    if (!distance || typeof distance !== "object") {
      throw new Error(
        "movesAtLeast sem distância válida no catálogo de monstros.",
      );
    }

    const distanceRecord = distance as Record<string, unknown>;
    const normal = distanceRecord.normal;
    if (typeof normal !== "number" || normal <= 0) {
      throw new Error(
        "movesAtLeast sem distância normal válida no catálogo de monstros.",
      );
    }

    return convertDistanceToMeters(normal, distanceRecord.unit);
  }

  return null;
}

function buildMonsterAutomatedPassives(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestPassiveEffect[] {
  return monster.effects
    .flatMap((effect) => {
      if (effect.type !== "passive_grantAdvantage" || effect.on !== "attackRoll") {
        return [] as MonsterManifestPassiveEffect[];
      }

      const triggerEvents = effect.triggers?.events;
      if (!Array.isArray(triggerEvents)) {
        return [] as MonsterManifestPassiveEffect[];
      }

      const hasAllyNearbyTrigger = triggerEvents.find(
        (event): event is Record<string, unknown> =>
          Boolean(event) && typeof event === "object" && event.type === "hasAllyNearby",
      );
      if (!hasAllyNearbyTrigger) {
        return [] as MonsterManifestPassiveEffect[];
      }

      const range = hasAllyNearbyTrigger.range;
      if (!range || typeof range !== "object") {
        throw new Error(
          `passive_grantAdvantage sem range valido para hasAllyNearby: ${monster.id}:${effect.name}`,
        );
      }

      const rangeRecord = range as Record<string, unknown>;
      const rangeNormal = rangeRecord.normal;
      if (typeof rangeNormal !== "number" || rangeNormal <= 0) {
        throw new Error(
          `passive_grantAdvantage sem range.normal valido para hasAllyNearby: ${monster.id}:${effect.name}`,
        );
      }

      const appliesToActionIds = Array.isArray(effect.appliesToActions)
        ? [
            ...new Set(
              effect.appliesToActions
                .map((actionId) => actionId.trim())
                .filter((actionId) => actionId.length > 0),
            ),
          ].sort((left, right) => left.localeCompare(right))
        : [];

      return [
        {
          type: "passive_grantAdvantage",
          on: "attackRoll",
          name: effect.name,
          appliesToActionIds,
          triggerHasAllyNearby: {
            rangeMeters: convertDistanceToMeters(rangeNormal, rangeRecord.unit),
            allyIsNotIncapacitated:
              typeof hasAllyNearbyTrigger.allyIsNotIncapacitated === "boolean"
                ? hasAllyNearbyTrigger.allyIsNotIncapacitated
                : true,
          },
        },
      ];
    })
    .sort((left, right) => {
      if (left.name !== right.name) {
        return left.name.localeCompare(right.name);
      }

      return (
        left.triggerHasAllyNearby.rangeMeters - right.triggerHasAllyNearby.rangeMeters
      );
    });
}

function buildMonsterAttackActions(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestAction[] {
  return monster.effects
    .flatMap((effect) => {
      if (effect.type !== "activatableAction") {
        return [] as MonsterManifestAction[];
      }

      const actionId = effect.actionId.trim();
      if (actionId.length === 0) {
        return [] as MonsterManifestAction[];
      }

      const parameters = effect.parameters as Record<string, unknown>;
      const attackBonusValue =
        parameters.attackBonus && typeof parameters.attackBonus === "object"
          ? (parameters.attackBonus as Record<string, unknown>).value
          : undefined;
      const rangeNormal =
        parameters.range && typeof parameters.range === "object"
          ? (parameters.range as Record<string, unknown>).normal
          : undefined;
      const outcomes = Array.isArray(parameters.outcomes)
        ? parameters.outcomes
        : [];
      const firstDamageOutcome = outcomes.find(
        (outcome): outcome is Record<string, unknown> =>
          Boolean(outcome) &&
          typeof outcome === "object" &&
          outcome.type === "modifyTargetHP" &&
          outcome.on === "hit" &&
          extractMovesAtLeastRequirementMeters(outcome) == null,
      );

      const fallbackFirstDamageOutcome = outcomes.find(
        (outcome): outcome is Record<string, unknown> =>
          Boolean(outcome) &&
          typeof outcome === "object" &&
          outcome.type === "modifyTargetHP" &&
          outcome.on === "hit",
      );

      const baseDamageOutcome =
        firstDamageOutcome ?? fallbackFirstDamageOutcome;

      if (!baseDamageOutcome || typeof attackBonusValue !== "number") {
        return [] as MonsterManifestAction[];
      }

      const damageFormula = formatDamageFormula(baseDamageOutcome.formula);
      const damageType = extractDamageType(baseDamageOutcome.formula);
      if (damageFormula == null || damageType == null) {
        throw new Error(
          `Monster attack action sem dano canônico válido: ${monster.id}:${actionId}`,
        );
      }

      const conditionalDamageBonuses = outcomes
        .flatMap((outcome) => {
          if (!outcome || typeof outcome !== "object") {
            return [] as MonsterManifestConditionalDamage[];
          }

          const outcomeRecord = outcome as Record<string, unknown>;
          if (
            outcomeRecord.type !== "modifyTargetHP" ||
            outcomeRecord.on !== "hit"
          ) {
            return [] as MonsterManifestConditionalDamage[];
          }

          const requiredMovementMeters =
            extractMovesAtLeastRequirementMeters(outcomeRecord);
          if (requiredMovementMeters == null) {
            return [] as MonsterManifestConditionalDamage[];
          }

          const conditionalFormula = formatDamageFormula(outcomeRecord.formula);
          const conditionalDamageType = extractDamageType(
            outcomeRecord.formula,
          );
          if (conditionalFormula == null || conditionalDamageType == null) {
            throw new Error(
              `Monster attack action condicional sem dano canônico válido: ${monster.id}:${actionId}`,
            );
          }

          return [
            {
              damageFormula: conditionalFormula,
              damageType: conditionalDamageType,
              requiresUserMovementAtLeastMeters: requiredMovementMeters,
            },
          ];
        })
        .sort((left, right) => {
          const movementDelta =
            left.requiresUserMovementAtLeastMeters -
            right.requiresUserMovementAtLeastMeters;
          if (movementDelta !== 0) {
            return movementDelta;
          }

          if (left.damageFormula !== right.damageFormula) {
            return left.damageFormula.localeCompare(right.damageFormula);
          }

          return left.damageType.localeCompare(right.damageType);
        });

      const conditionalAppliedConditions = outcomes
        .flatMap((outcome) => {
          if (!outcome || typeof outcome !== "object") {
            return [] as MonsterManifestConditionalCondition[];
          }

          const outcomeRecord = outcome as Record<string, unknown>;
          if (
            outcomeRecord.type !== "applyCondition" ||
            outcomeRecord.on !== "hit"
          ) {
            return [] as MonsterManifestConditionalCondition[];
          }

          const requiredMovementMeters =
            extractMovesAtLeastRequirementMeters(outcomeRecord);
          if (requiredMovementMeters == null) {
            return [] as MonsterManifestConditionalCondition[];
          }

          const conditionRaw =
            typeof outcomeRecord.condition === "string"
              ? outcomeRecord.condition.trim()
              : "";
          if (conditionRaw.length === 0) {
            throw new Error(
              `Monster attack action condicional sem condição canônica válida: ${monster.id}:${actionId}`,
            );
          }

          return [
            {
              condition: conditionRaw,
              requiresUserMovementAtLeastMeters: requiredMovementMeters,
            },
          ];
        })
        .sort((left, right) => {
          const movementDelta =
            left.requiresUserMovementAtLeastMeters -
            right.requiresUserMovementAtLeastMeters;
          if (movementDelta !== 0) {
            return movementDelta;
          }

          return left.condition.localeCompare(right.condition);
        });

      return [
        {
          actionId,
          name: effect.name,
          attackBonus: attackBonusValue,
          damageFormula,
          damageType,
          rangeMeters:
            typeof rangeNormal === "number"
              ? convertFeetToMeters(rangeNormal)
              : 1.5,
          conditionalDamageBonuses,
          conditionalAppliedConditions,
        },
      ];
    })
    .sort((left, right) => left.actionId.localeCompare(right.actionId));
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: MonsterCatalogManifest = {
    manifestVersion: MONSTER_CATALOG_MANIFEST_VERSION,
    monsters: [...PHB2024MONSTERS]
      .map((monster) => ({
        id: monster.id,
        primaryName: monster.name[0] ?? monster.id,
        names: [...monster.name],
        tokenUrl: monster.tokenUrl,
        splashArtUrl: monster.splashArtUrl,
        size: monster.size,
        creatureType: monster.type,
        alignment: monster.alignment,
        abilityScores: buildMonsterAbilityScores(monster),
        armorClass: monster.armorClass,
        hitPointMaximum: monster.hitPoints.average,
        speed: buildMonsterSpeed(monster),
        defenses: buildMonsterDefenses(monster),
        challengeRating: monster.challengeRating,
        actions: buildMonsterAttackActions(monster),
        automatedPassives: buildMonsterAutomatedPassives(monster),
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
  };

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "monster-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf-8",
  );
  console.log(`Monster catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
