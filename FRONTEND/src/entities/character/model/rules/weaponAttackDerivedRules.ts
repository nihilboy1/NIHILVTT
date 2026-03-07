import {
  PHB2024CLASSES,
  PHB2024ITEMS,
  UNARMED_ATTACK_PROFILE,
  resolveUnarmedAttackDamageType,
} from '@nihilvtt/datamodeling/data';
import { DamageTypeEnum } from '@nihilvtt/datamodeling/primitives';

import { getAbilityModifier } from '@/entities/character/model/rules/characterDerivedRules';
import type { Action } from '@/entities/character/model/schemas/character.schema';
import type { AttackEntry, CombatDamageType } from '@/shared/api/types';

function formatSignedValue(value: number): string {
  if (value > 0) {
    return `+${value}`;
  }

  return `${value}`;
}

function formatDamageFormula(diceCount: number, diceFaces: number, modifier: number): string {
  const baseFormula = `${diceCount}d${diceFaces}`;

  if (modifier === 0) {
    return baseFormula;
  }

  return `${baseFormula}${formatSignedValue(modifier)}`;
}

function feetToMeters(valueInFeet: number): number {
  return Math.round(valueInFeet * 0.3048 * 10) / 10;
}

function resolveWeaponRangeMeters(attackEffect: {
  weaponRange: 'melee' | 'ranged';
  properties?: string[];
  range?: { normal: number; long: number; unit: string };
}): number {
  if (attackEffect.weaponRange === 'ranged') {
    const normalRangeFeet = attackEffect.range?.normal;
    if (
      typeof normalRangeFeet === 'number' &&
      Number.isFinite(normalRangeFeet) &&
      normalRangeFeet > 0
    ) {
      return feetToMeters(normalRangeFeet);
    }
    return 6;
  }

  if (Array.isArray(attackEffect.properties) && attackEffect.properties.includes('reach')) {
    return 3;
  }

  return 1.5;
}

function hasAutomaticWeaponTypeProficiency(
  classId: string | null | undefined,
  weaponType: 'simple' | 'martial',
): boolean {
  if (!classId) {
    return false;
  }

  const characterClass = PHB2024CLASSES.find((entry) => entry.id === classId);
  if (!characterClass) {
    return false;
  }

  return characterClass.effects.some((effect) => {
    if (effect.type !== 'passive_grantProficiency' || effect.on !== 'weaponType') {
      return false;
    }

    return effect.choose.count === 'all' && effect.choose.from.includes(weaponType);
  });
}

function resolvePrimaryDamageType(attackEffect: {
  damageFormulas: { primary: { damageTypeOptions?: string[] } };
}): CombatDamageType {
  const options = attackEffect.damageFormulas.primary.damageTypeOptions;
  const first = Array.isArray(options) ? options[0] : null;
  if (typeof first !== 'string' || first.trim().length === 0) {
    throw new Error(
      'Violação de contrato de catálogo: ataque de arma sem damageTypeOptions.primary.',
    );
  }

  const parsed = DamageTypeEnum.safeParse(first.trim().toLowerCase());
  if (!parsed.success) {
    throw new Error('Violação de contrato de catálogo: ataque de arma com damageType inválido.');
  }

  return parsed.data;
}

export function buildUnarmedAttackEntry(options: {
  strength: number;
  proficiencyBonus: number;
  specieId?: string | null;
}): AttackEntry {
  const strengthModifier = getAbilityModifier(options.strength);
  const attackBonus = options.proficiencyBonus + strengthModifier;
  const flatDamage = Math.max(1, 1 + strengthModifier);
  const damageType = resolveUnarmedAttackDamageType(options.specieId);

  return {
    id: UNARMED_ATTACK_PROFILE.attackId,
    label: UNARMED_ATTACK_PROFILE.label,
    attackBonus,
    damageFormula: `${flatDamage}`,
    damageType,
    rangeMeters: UNARMED_ATTACK_PROFILE.rangeMeters,
    sourceType: UNARMED_ATTACK_PROFILE.sourceType,
    sourceItemId: null,
    sourceSlot: null,
  };
}

export function buildUnarmedAttackAction(options: {
  strength: number;
  proficiencyBonus: number;
}): Action {
  const unarmedAttack = buildUnarmedAttackEntry(options);

  return {
    id: unarmedAttack.id,
    name: unarmedAttack.label,
    bonus:
      unarmedAttack.attackBonus >= 0
        ? `+${unarmedAttack.attackBonus}`
        : `${unarmedAttack.attackBonus}`,
    damage: unarmedAttack.damageFormula,
  };
}

export function buildWeaponAttackEntry(
  itemId: string | null | undefined,
  options: {
    classId?: string | null;
    strength: number;
    dexterity: number;
    proficiencyBonus: number;
    sourceSlot?: 'mainHandWeaponId' | 'offHandWeaponId';
  },
): AttackEntry | null {
  if (!itemId) {
    return null;
  }

  const item = PHB2024ITEMS.find((entry) => entry.id === itemId);
  if (!item || item.type !== 'weapon') {
    return null;
  }

  const attackEffect = item.effects.find((effect) => effect.type === 'onWield_grantWeaponAttack');

  if (!attackEffect || attackEffect.type !== 'onWield_grantWeaponAttack') {
    return null;
  }

  const strengthModifier = getAbilityModifier(options.strength);
  const dexterityModifier = getAbilityModifier(options.dexterity);
  const weaponProperties: string[] =
    'properties' in attackEffect && Array.isArray(attackEffect.properties)
      ? [...attackEffect.properties]
      : [];
  const usesDexterity =
    attackEffect.weaponRange === 'ranged' || weaponProperties.includes('finesse');
  const attackModifier = usesDexterity
    ? Math.max(strengthModifier, dexterityModifier)
    : strengthModifier;

  const primaryDamage = attackEffect.damageFormulas.primary;
  const damageFormula = formatDamageFormula(
    primaryDamage.roll.count,
    primaryDamage.roll.faces,
    attackModifier,
  );
  const gainsProficiencyBonus = hasAutomaticWeaponTypeProficiency(
    options.classId,
    attackEffect.weaponType,
  );
  const totalAttackBonus = attackModifier + (gainsProficiencyBonus ? options.proficiencyBonus : 0);
  const damageType = resolvePrimaryDamageType(attackEffect);

  return {
    id: `builtin-${item.id}`,
    label: attackEffect.name,
    attackBonus: totalAttackBonus,
    damageFormula,
    damageType,
    rangeMeters: resolveWeaponRangeMeters(attackEffect),
    sourceType: 'weapon',
    sourceItemId: item.id,
    sourceSlot: options.sourceSlot ?? null,
  };
}

export function buildWeaponAttackAction(
  itemId: string | null | undefined,
  options: {
    classId?: string | null;
    strength: number;
    dexterity: number;
    proficiencyBonus: number;
  },
): Action | null {
  const attackEntry = buildWeaponAttackEntry(itemId, options);
  if (!attackEntry) {
    return null;
  }

  return {
    id: attackEntry.id,
    name: attackEntry.label,
    bonus: formatSignedValue(attackEntry.attackBonus),
    damage: attackEntry.damageFormula,
  };
}
