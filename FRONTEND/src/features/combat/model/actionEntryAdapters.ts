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

  const requireCanonicalActionId = (action: {
    id: string;
    name: string;
    actionId?: string;
  }): string => {
    if (typeof action.actionId === 'string' && action.actionId.trim().length > 0) {
      return action.actionId.trim();
    }

    throw new Error(
      `Violação de contrato de sessão: ação sem actionId canônico em ${characterId}:${action.id}:${action.name}.`,
    );
  };

  const requireRangeMeters = (action: {
    id: string;
    name: string;
    rangeMeters?: number;
  }): number => {
    if (typeof action.rangeMeters === 'number' && Number.isFinite(action.rangeMeters)) {
      if (action.rangeMeters > 0) {
        return action.rangeMeters;
      }
    }

    throw new Error(
      `Violação de contrato de sessão: ação sem rangeMeters válido em ${characterId}:${action.id}:${action.name}.`,
    );
  };

  return actions.map((action) => ({
    id: requireCanonicalActionId(action),
    label: action.name,
    attackBonus: parseAttackBonus(action.bonus),
    damageFormula: action.damage == null ? '-' : String(action.damage),
    damageType: requireDamageType(action),
    rangeMeters: requireRangeMeters(action),
    sourceType: 'action',
    sourceItemId: null,
    sourceSlot: null,
  }));
}
