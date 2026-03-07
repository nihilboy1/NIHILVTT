import { DamageTypeEnum } from '@nihilvtt/datamodeling/primitives';

import type { CombatDamageType } from '@/shared/api/types';

export function normalizeDamageType(value: string | null | undefined): CombatDamageType | null {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  const parsed = DamageTypeEnum.safeParse(normalized);
  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}

export function isBludgeoningDamageType(value: string | null | undefined): boolean {
  return normalizeDamageType(value) === 'bludgeoning';
}
