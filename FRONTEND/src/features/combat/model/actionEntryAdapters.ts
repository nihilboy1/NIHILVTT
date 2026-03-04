import { AttackEntry } from '@/shared/api/types';

export function parseAttackBonus(value: string | number | undefined): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildActionAttackEntries(
  characterId: string,
  actions: Array<{
    id: string;
    name: string;
    bonus?: string | number;
    damage?: string | number;
    rangeMeters?: number;
  }> | undefined,
): AttackEntry[] {
  if (!actions || actions.length === 0) {
    return [];
  }

  return actions.map((action) => ({
    id: `action-${characterId}-${action.id}`,
    label: action.name,
    attackBonus: parseAttackBonus(action.bonus),
    damageFormula: action.damage == null ? '-' : String(action.damage),
    rangeMeters: action.rangeMeters ?? 1.5,
    sourceType: 'action',
    sourceItemId: null,
    sourceSlot: null,
  }));
}
