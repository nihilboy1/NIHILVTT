import { AttackEntry, CombatDamageType } from '@/shared/api/types';

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
  actions:
    | Array<{
        id: string;
        actionId?: string;
        name: string;
        bonus?: string | number;
        damage?: string | number;
        damageType?: CombatDamageType;
        rangeMeters?: number;
      }>
    | undefined,
): AttackEntry[] {
  if (!actions || actions.length === 0) {
    return [];
  }

  const requireDamageType = (action: {
    id: string;
    name: string;
    damageType?: CombatDamageType;
  }): CombatDamageType => {
    if (action.damageType) {
      return action.damageType;
    }

    throw new Error(
      `Violação de contrato de sessão: ação sem damageType em ${characterId}:${action.id}:${action.name}.`,
    );
  };

  return actions.map((action) => ({
    id:
      typeof action.actionId === 'string' && action.actionId.trim().length > 0
        ? action.actionId.trim()
        : `action-${characterId}-${action.id}`,
    label: action.name,
    attackBonus: parseAttackBonus(action.bonus),
    damageFormula: action.damage == null ? '-' : String(action.damage),
    damageType: requireDamageType(action),
    rangeMeters: action.rangeMeters ?? 1.5,
    sourceType: 'action',
    sourceItemId: null,
    sourceSlot: null,
  }));
}
