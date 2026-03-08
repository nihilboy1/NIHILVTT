import { PHB2024MONSTERS } from '@nihilvtt/datamodeling/data';
import { DamageTypeEnum } from '@nihilvtt/datamodeling/primitives';
import { type MonsterCharacterStateType } from '@nihilvtt/datamodeling/runtime';
import { z } from 'zod';

import {
  DEFAULT_PLAYER_DATA,
  DEFAULT_TOKEN_IMAGE,
} from '@/entities/character/config/sheetDefaults';
import { getArmorClassFromEquipment } from '@/entities/character/model/rules/itemDerivedRules';
import { getBaseWalkSpeedFromSpecieId } from '@/entities/character/model/rules/specieDerivedRules';
import {
  Action,
  Character,
  MonsterNpcCharacter,
  PlayerCharacter,
} from '@/entities/character/model/schemas/character.schema';
import {
  isMonsterCharacterRuntime,
  isPlayerCharacterRuntime,
  monsterCharacterRuntimeSchema,
  sessionCharacterRuntimeSchema,
  type SessionCharacterRuntime,
  playerCharacterRuntimeSchema,
  type PlayerCharacterRuntime,
} from '@/entities/character/model/schemas/playerCharacterRuntime.schema';

import type { MonsterType } from '@nihilvtt/datamodeling/domain';

export type NormalizedCharacterEntry = {
  character: Character;
  runtimeCharacter: SessionCharacterRuntime | null;
};

const MONSTERS_BY_ID = new Map<string, MonsterType>(
  PHB2024MONSTERS.map((monster) => [monster.id, monster]),
);

const deepCloneDefaultPlayer = (): Omit<PlayerCharacter, 'id' | 'type'> =>
  JSON.parse(JSON.stringify(DEFAULT_PLAYER_DATA)) as Omit<PlayerCharacter, 'id' | 'type'>;

function hashStringToUint32(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function toHex32(value: number): string {
  return value.toString(16).padStart(8, '0');
}

function buildDeterministicUuid(seed: string): string {
  const blockA = toHex32(hashStringToUint32(`${seed}:0`));
  const blockB = toHex32(hashStringToUint32(`${seed}:1`));
  const blockC = toHex32(hashStringToUint32(`${seed}:2`));
  const blockD = toHex32(hashStringToUint32(`${seed}:3`));

  const hex = `${blockA}${blockB}${blockC}${blockD}`;
  const versioned = `${hex.slice(0, 12)}4${hex.slice(13, 16)}8${hex.slice(17)}`;

  return [
    versioned.slice(0, 8),
    versioned.slice(8, 12),
    versioned.slice(12, 16),
    versioned.slice(16, 20),
    versioned.slice(20, 32),
  ].join('-');
}

function formatMonsterDamageFormula(formula: unknown): string | undefined {
  if (!formula || typeof formula !== 'object') {
    return undefined;
  }

  const formulaRecord = formula as Record<string, unknown>;
  if (typeof formulaRecord.fixed === 'number') {
    return String(formulaRecord.fixed);
  }

  const roll = formulaRecord.roll;
  if (!roll || typeof roll !== 'object') {
    return undefined;
  }

  const rollRecord = roll as Record<string, unknown>;
  const count = typeof rollRecord.count === 'number' ? rollRecord.count : null;
  const faces = typeof rollRecord.faces === 'number' ? rollRecord.faces : null;
  if (count == null || faces == null) {
    return undefined;
  }

  const bonusValueRaw =
    rollRecord.bonus && typeof rollRecord.bonus === 'object'
      ? (rollRecord.bonus as Record<string, unknown>).value
      : undefined;
  const bonusValue = typeof bonusValueRaw === 'number' ? bonusValueRaw : 0;
  if (bonusValue === 0) {
    return `${count}d${faces}`;
  }

  const sign = bonusValue > 0 ? '+' : '';
  return `${count}d${faces}${sign}${bonusValue}`;
}

function extractMonsterDamageType(formula: unknown): Action['damageType'] {
  if (!formula || typeof formula !== 'object') {
    return undefined;
  }

  const formulaRecord = formula as Record<string, unknown>;
  const options = formulaRecord.damageTypeOptions;
  if (!Array.isArray(options) || options.length === 0) {
    return undefined;
  }

  const firstOption = options[0];
  if (typeof firstOption !== 'string' || firstOption.trim().length === 0) {
    return undefined;
  }

  const parsed = DamageTypeEnum.safeParse(firstOption.trim().toLowerCase());
  return parsed.success ? parsed.data : undefined;
}

function convertFeetToMeters(feet: number): number {
  const meters = feet * 0.3;
  return Number.isInteger(meters) ? meters : Number(meters.toFixed(1));
}

function convertDistanceToMeters(normal: number, unit: unknown): number {
  if (typeof unit !== 'string') {
    throw new Error('Violação de contrato de catálogo: distância sem unidade válida.');
  }

  const normalizedUnit = unit.trim().toLowerCase();
  if (normalizedUnit === 'ft' || normalizedUnit === 'feet') {
    return convertFeetToMeters(normal);
  }
  if (normalizedUnit === 'm' || normalizedUnit === 'meter' || normalizedUnit === 'meters') {
    return Number.isInteger(normal) ? normal : Number(normal.toFixed(1));
  }

  throw new Error(
    `Violação de contrato de catálogo: unidade de distância inválida (${normalizedUnit}).`,
  );
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatHitPointsFormula(formula: MonsterType['hitPoints']['formula']): string {
  const base = `${formula.count}d${formula.faces}`;
  const bonus = formula.bonus?.value ?? 0;

  if (bonus === 0) {
    return base;
  }

  const sign = bonus > 0 ? '+' : '';
  return `${base}${sign}${bonus}`;
}

function buildMonsterSpeedSummary(monster: MonsterType): string {
  const movementModes: Array<{ key: keyof MonsterType['speed']; label: string }> = [
    { key: 'walk', label: 'walk' },
    { key: 'climb', label: 'climb' },
    { key: 'fly', label: 'fly' },
    { key: 'swim', label: 'swim' },
    { key: 'burrow', label: 'burrow' },
  ];

  const speedParts = movementModes.flatMap(({ key, label }) => {
    const value = monster.speed[key];
    return typeof value === 'number' ? [`${label} ${value}${monster.speed.unit}`] : [];
  });

  return speedParts.join(', ');
}

function buildMonsterSenses(monster: MonsterType): MonsterNpcCharacter['senses'] {
  if (!monster.senses) {
    return undefined;
  }

  return {
    passivePerception: monster.senses.passivePerception,
    vision: monster.senses.vision ? { ...monster.senses.vision } : undefined,
  };
}

function buildMonsterDefenses(monster: MonsterType): MonsterNpcCharacter['defenses'] {
  return {
    resistances: monster.defenses?.resistances ? [...monster.defenses.resistances] : [],
    vulnerabilities: monster.defenses?.vulnerabilities ? [...monster.defenses.vulnerabilities] : [],
    damageImmunities: monster.defenses?.immunities?.damage
      ? [...monster.defenses.immunities.damage]
      : [],
    conditionImmunities: monster.defenses?.immunities?.condition
      ? [...monster.defenses.immunities.condition]
      : [],
  };
}

function parseMonsterChallengeRating(challengeRating: MonsterType['challengeRating']): number {
  const raw = String(challengeRating).trim();
  const numericValue = Number(raw);
  if (Number.isFinite(numericValue)) {
    return numericValue;
  }

  const fractionMatch = raw.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);

    if (denominator > 0) {
      return numerator / denominator;
    }
  }

  throw new Error(`Violação de contrato de catálogo: challengeRating inválido em ${raw}.`);
}

function buildMonsterActionsFromCatalog(monster: MonsterType): MonsterNpcCharacter['actions'] {
  return monster.effects.flatMap((effect, effectIndex) => {
    if (effect.type !== 'activatableAction') {
      return [];
    }

    const parameters = effect.parameters as Record<string, unknown>;
    const attackBonusValue =
      parameters.attackBonus && typeof parameters.attackBonus === 'object'
        ? (parameters.attackBonus as Record<string, unknown>).value
        : undefined;
    const rangeNormal =
      parameters.range && typeof parameters.range === 'object'
        ? (parameters.range as Record<string, unknown>).normal
        : undefined;
    const rangeUnit =
      parameters.range && typeof parameters.range === 'object'
        ? (parameters.range as Record<string, unknown>).unit
        : undefined;
    const outcomes = Array.isArray(effect.parameters?.outcomes) ? effect.parameters.outcomes : [];
    const firstOutcome = outcomes.find((outcome) => outcome.type === 'modifyTargetHP');
    if (!firstOutcome) {
      return [];
    }

    const actionId = effect.actionId.trim();
    if (actionId.length === 0) {
      throw new Error(
        `Violação de contrato de catálogo: ação de monstro sem actionId em ${monster.id}:${effect.name}.`,
      );
    }
    const nameSlug = slugify(effect.name);
    if (nameSlug.length === 0) {
      throw new Error(
        `Violação de contrato de catálogo: ação de monstro sem nome canônico em ${monster.id}:${effect.name}.`,
      );
    }
    const catalogAttackId = `${actionId}:${nameSlug}`;

    if (typeof attackBonusValue !== 'number') {
      throw new Error(
        `Violação de contrato de catálogo: ação de monstro sem attackBonus em ${monster.id}:${effect.name}.`,
      );
    }

    if (typeof rangeNormal !== 'number' || rangeNormal <= 0) {
      throw new Error(
        `Violação de contrato de catálogo: ação de monstro sem range.normal válido em ${monster.id}:${effect.name}.`,
      );
    }

    const damageType = firstOutcome ? extractMonsterDamageType(firstOutcome.formula) : undefined;

    if (firstOutcome && !damageType) {
      throw new Error(
        `Violação de contrato de catálogo: ação de monstro sem damageType em ${monster.id}:${effect.name}.`,
      );
    }

    return [
      {
        id: buildDeterministicUuid(`monster-action:${monster.id}:${effectIndex}:${effect.name}`),
        actionId: catalogAttackId,
        name: effect.name,
        bonus: attackBonusValue,
        damage: firstOutcome ? formatMonsterDamageFormula(firstOutcome.formula) : undefined,
        damageType,
        rangeMeters: convertDistanceToMeters(rangeNormal, rangeUnit),
      },
    ];
  });
}

function buildMonsterActions(character: MonsterCharacterStateType): MonsterNpcCharacter['actions'] {
  const monster = MONSTERS_BY_ID.get(character.monsterId);
  if (!monster) {
    return [];
  }

  return buildMonsterActionsFromCatalog(monster);
}

export function adaptMonsterCatalogToSheetModel(monster: MonsterType): MonsterNpcCharacter {
  return {
    id: buildDeterministicUuid(`monster-catalog:${monster.id}`),
    type: 'NPC',
    name: monster.name[0] ?? monster.id,
    image: monster.tokenUrl ?? DEFAULT_TOKEN_IMAGE,
    size: monster.size,
    notes: monster.description,
    source: monster.source,
    monsterSheetImage: monster.splashArtUrl ?? monster.tokenUrl ?? DEFAULT_TOKEN_IMAGE,
    hitPointsFormula: formatHitPointsFormula(monster.hitPoints.formula),
    monsterType: monster.type,
    alignment: monster.alignment,
    environments: [...monster.environment],
    languages: monster.languages ? [...monster.languages] : [],
    isFamiliar: monster.isFamiliar === true,
    speedSummary: buildMonsterSpeedSummary(monster),
    senses: buildMonsterSenses(monster),
    defenses: buildMonsterDefenses(monster),
    attributes: { ...monster.abilityScores },
    proficiencies: {
      savingThrows: {
        strength: 'none',
        dexterity: 'none',
        constitution: 'none',
        intelligence: 'none',
        wisdom: 'none',
        charisma: 'none',
      },
      skills: {
        acrobatics: 'none',
        animalHandling: 'none',
        arcana: 'none',
        athletics: 'none',
        deception: 'none',
        history: 'none',
        insight: 'none',
        intimidation: 'none',
        investigation: 'none',
        medicine: 'none',
        nature: 'none',
        perception: 'none',
        performance: 'none',
        persuasion: 'none',
        religion: 'none',
        sleightOfHand: 'none',
        stealth: 'none',
        survival: 'none',
      },
    },
    combatStats: {
      maxHp: monster.hitPoints.average,
      currentHp: monster.hitPoints.average,
      tempHp: 0,
      armorClass: monster.armorClass,
      speed: convertFeetToMeters(monster.speed.walk ?? 0),
      shieldEquipped: false,
    },
    actions: buildMonsterActionsFromCatalog(monster),
    attacks: [],
    equipment: [],
    featuresAndTraits: ('traits' in monster ? (monster.traits ?? []) : []).map(
      (trait, traitIndex) => ({
        id: buildDeterministicUuid(`monster-trait:${monster.id}:${traitIndex}:${trait.name}`),
        name: trait.name,
        description: trait.description,
      }),
    ),
    challengeRating: parseMonsterChallengeRating(monster.challengeRating),
  };
}

function adaptRuntimePlayerCharacterToSheetModel(
  character: PlayerCharacterRuntime,
): PlayerCharacter {
  const base = deepCloneDefaultPlayer();

  const sheetCharacter: PlayerCharacter = {
    ...base,
    id: character.id,
    type: 'Player',
    name: character.name,
    image: character.image ?? DEFAULT_TOKEN_IMAGE,
    notes: character.notes ?? '',
    attributes: { ...character.attributes.base },
    combatStats: {
      ...base.combatStats,
      currentHp: character.hitPoints.current,
      maxHp: character.hitPoints.max,
      tempHp: character.hitPoints.temporary,
      armorClass: getArmorClassFromEquipment(
        character.equipment.bodyArmorItemId,
        character.equipment.shieldItemId,
        character.attributes.base.dexterity,
        base.combatStats.armorClass,
      ),
      speed: getBaseWalkSpeedFromSpecieId(character.build.specieId, base.combatStats.speed),
      shieldEquipped: character.equipment.shieldItemId !== null,
    },
    level: character.progression.currentLevel,
    inspiration: character.inspiration,
    charClass: character.build.classId,
    subclass: character.build.subclassId ?? '',
    background: character.build.originId,
    species: character.build.specieId,
    equipment: character.inventory.items.map((item, itemIndex) => ({
      id: buildDeterministicUuid(`player-inventory:${character.id}:${itemIndex}:${item.itemId}`),
      name: item.itemId,
      quantity: item.quantity,
      equipped:
        item.itemId === character.equipment.bodyArmorItemId ||
        item.itemId === character.equipment.shieldItemId ||
        item.itemId === character.equipment.mainHandWeaponId ||
        item.itemId === character.equipment.offHandWeaponId,
    })),
  };

  return sheetCharacter;
}

function adaptRuntimeMonsterCharacterToSheetModel(
  character: MonsterCharacterStateType,
): MonsterNpcCharacter | null {
  const monster = MONSTERS_BY_ID.get(character.monsterId);
  if (!monster) {
    return null;
  }

  const sheetCharacter = adaptMonsterCatalogToSheetModel(monster);

  return {
    ...sheetCharacter,
    id: character.id,
    name: character.nameOverride ?? sheetCharacter.name,
    image: character.imageOverride ?? sheetCharacter.image,
    notes: character.notes ?? sheetCharacter.notes,
    combatStats: {
      ...sheetCharacter.combatStats,
      currentHp: character.hitPoints.current,
      tempHp: character.hitPoints.temporary,
    },
    actions: buildMonsterActions(character),
  };
}

export function parseRuntimePlayerCharacter(entry: unknown): PlayerCharacterRuntime | null {
  const runtimeParsed = playerCharacterRuntimeSchema.safeParse(entry);
  return runtimeParsed.success ? runtimeParsed.data : null;
}

export function parseRuntimeMonsterCharacter(entry: unknown): MonsterCharacterStateType | null {
  const runtimeCharacter = parseSessionRuntimeCharacter(entry);
  return isMonsterCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;
}

export function parseSessionRuntimeCharacter(entry: unknown): SessionCharacterRuntime | null {
  const runtimeParsed = sessionCharacterRuntimeSchema.safeParse(entry);
  return runtimeParsed.success ? runtimeParsed.data : null;
}

export function normalizeCharacterEntry(entry: unknown): NormalizedCharacterEntry | null {
  const runtimeCharacter = parseSessionRuntimeCharacter(entry);
  if (!runtimeCharacter) {
    return null;
  }

  if (isPlayerCharacterRuntime(runtimeCharacter)) {
    return {
      character: adaptRuntimePlayerCharacterToSheetModel(runtimeCharacter),
      runtimeCharacter,
    };
  }

  const character = adaptRuntimeMonsterCharacterToSheetModel(runtimeCharacter);
  if (!character) {
    throw new Error(
      `Violação de contrato de sessão: monsterId "${runtimeCharacter.monsterId}" não existe no catálogo canônico do frontend.`,
    );
  }

  return {
    character,
    runtimeCharacter,
  };
}

export function requireNormalizedCharacterEntry(
  entry: unknown,
  context: string,
): NormalizedCharacterEntry {
  const sessionRuntimeParsed = sessionCharacterRuntimeSchema.safeParse(entry);
  if (sessionRuntimeParsed.success) {
    const runtimeCharacter = sessionRuntimeParsed.data;
    if (isPlayerCharacterRuntime(runtimeCharacter)) {
      return {
        character: adaptRuntimePlayerCharacterToSheetModel(runtimeCharacter),
        runtimeCharacter,
      };
    }

    const character = adaptRuntimeMonsterCharacterToSheetModel(runtimeCharacter);
    if (!character) {
      throw new Error(
        `Violação de contrato de sessão em ${context}: monsterId "${runtimeCharacter.monsterId}" não existe no catálogo canônico do frontend.`,
      );
    }

    return {
      character,
      runtimeCharacter,
    };
  }

  const playerRuntimeParsed = playerCharacterRuntimeSchema.safeParse(entry);
  const monsterRuntimeParsed = monsterCharacterRuntimeSchema.safeParse(entry);
  const formattedSessionError = JSON.stringify(z.treeifyError(sessionRuntimeParsed.error), null, 2);
  const formattedPlayerError = playerRuntimeParsed.success
    ? 'PlayerCharacterState aceitou o payload; a divergência está fora da trilha esperada.'
    : JSON.stringify(z.treeifyError(playerRuntimeParsed.error), null, 2);
  const formattedMonsterError = monsterRuntimeParsed.success
    ? 'MonsterCharacterState aceitou o payload; a divergência está fora da trilha esperada.'
    : JSON.stringify(z.treeifyError(monsterRuntimeParsed.error), null, 2);
  console.error(`Violação de contrato de sessão em ${context}. Payload recebido:`, entry);
  console.error(`Detalhes SessionCharacterState em ${context}:`, formattedSessionError);
  console.error(`Detalhes PlayerCharacterState em ${context}:`, formattedPlayerError);
  console.error(`Detalhes MonsterCharacterState em ${context}:`, formattedMonsterError);
  throw new Error(`Violação de contrato de sessão em ${context}: runtime de personagem inválido.`);
}
