import { buildActionAttackEntries } from '../../model/actionEntryAdapters';

describe('TokenActionBar action entries', () => {
  it('projeta acoes explicitas como AttackEntry com sourceType canonico', () => {
    const entries = buildActionAttackEntries('char-1', [
      {
        id: 'action-1',
        name: 'Mordida',
        bonus: '+4',
        damage: '1d6+2',
        rangeMeters: 1.5,
      },
    ]);

    expect(entries).toEqual([
      {
        id: 'action-char-1-action-1',
        label: 'Mordida',
        attackBonus: 4,
        damageFormula: '1d6+2',
        rangeMeters: 1.5,
        sourceType: 'action',
        sourceItemId: null,
        sourceSlot: null,
      },
    ]);
  });

  it('retorna lista vazia quando nao ha acoes', () => {
    expect(buildActionAttackEntries('char-1', [])).toEqual([]);
    expect(buildActionAttackEntries('char-1', undefined)).toEqual([]);
  });
});
