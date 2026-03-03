import { PHB2024ITEMS } from '@nihilvtt/datamodeling/data';

import { getAbilityModifier } from '@/entities/character/model/rules/characterDerivedRules';

function findArmorItem(itemId: string | null | undefined) {
  if (!itemId) {
    return null;
  }

  const item = PHB2024ITEMS.find((entry) => entry.id === itemId);
  return item?.type === 'armor' ? item : null;
}

function resolveArmorBaseClass(
  bodyArmorItemId: string | null | undefined,
  dexterity: number,
  fallbackBaseArmorClass: number,
): number {
  const armorItem = findArmorItem(bodyArmorItemId);
  if (!armorItem) {
    return 10 + getAbilityModifier(dexterity);
  }

  const acEffect = armorItem.effects.find((effect) => effect.type === 'onEquip_setAC');
  if (!acEffect || acEffect.type !== 'onEquip_setAC') {
    return fallbackBaseArmorClass;
  }

  const { calculation } = acEffect;

  if (calculation.calculation === 'base') {
    return calculation.value;
  }

  if (calculation.calculation === 'formula') {
    const attributeModifier =
      calculation.attribute === 'dexterity' ? getAbilityModifier(dexterity) : 0;
    const boundedModifier =
      'maxBonus' in calculation && calculation.maxBonus !== undefined
        ? Math.min(attributeModifier, calculation.maxBonus)
        : attributeModifier;

    return calculation.base + boundedModifier;
  }

  return fallbackBaseArmorClass;
}

function resolveShieldBonus(shieldItemId: string | null | undefined): number {
  const shieldItem = findArmorItem(shieldItemId);
  if (!shieldItem) {
    return 0;
  }

  const shieldEffect = shieldItem.effects.find(
    (effect) => effect.type === 'onEquip_setAC',
  );

  if (!shieldEffect || shieldEffect.type !== 'onEquip_setAC') {
    return 0;
  }

  return shieldEffect.calculation.calculation === 'bonus'
    ? shieldEffect.calculation.value
    : 0;
}

export function getArmorClassFromEquipment(
  bodyArmorItemId: string | null | undefined,
  shieldItemId: string | null | undefined,
  dexterity: number,
  fallbackBaseArmorClass: number,
): number {
  const baseArmorClass = resolveArmorBaseClass(
    bodyArmorItemId,
    dexterity,
    fallbackBaseArmorClass,
  );

  return baseArmorClass + resolveShieldBonus(shieldItemId);
}
