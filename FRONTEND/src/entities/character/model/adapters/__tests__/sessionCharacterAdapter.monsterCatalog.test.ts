import { PHB2024MONSTERS } from '@nihilvtt/datamodeling/data';

import { adaptMonsterCatalogToSheetModel } from '@/entities/character/model/adapters/sessionCharacterAdapter';

describe('adaptMonsterCatalogToSheetModel', () => {
  it('projeta campos informativos completos para monster-awakened-shrub', () => {
    const awakenedShrub = PHB2024MONSTERS.find(
      (monster) => monster.id === 'monster-awakened-shrub',
    );

    expect(awakenedShrub).toBeDefined();

    const sheet = adaptMonsterCatalogToSheetModel(awakenedShrub!);

    expect(sheet.source).toBe('MM2024');
    expect(sheet.image).toBe(awakenedShrub!.tokenUrl);
    expect(sheet.monsterSheetImage).toBe(awakenedShrub!.splashArtUrl);
    expect(sheet.hitPointsFormula).toBe('3d6');
    expect(sheet.monsterType).toBe('plant');
    expect(sheet.alignment).toBe('trueNeutral');
    expect(sheet.environments).toEqual(['forest']);
    expect(sheet.languages).toEqual(['common', 'any']);
    expect(sheet.isFamiliar).toBe(false);
    expect(sheet.speedSummary).toBe('walk 20ft');

    expect(sheet.senses).toEqual({
      passivePerception: 10,
      vision: undefined,
    });

    expect(sheet.defenses).toEqual({
      resistances: ['piercing'],
      vulnerabilities: ['fire'],
      damageImmunities: [],
      conditionImmunities: [],
    });
  });

  it('converte challenge rating fracionario sem produzir NaN', () => {
    const monsterWithFractionalCr = PHB2024MONSTERS.find((monster) =>
      String(monster.challengeRating).includes('/'),
    );

    expect(monsterWithFractionalCr).toBeDefined();

    const [numeratorRaw, denominatorRaw] = String(monsterWithFractionalCr!.challengeRating).split(
      '/',
    );
    const expectedCr = Number(numeratorRaw) / Number(denominatorRaw);

    const sheet = adaptMonsterCatalogToSheetModel(monsterWithFractionalCr!);

    expect(Number.isFinite(sheet.challengeRating)).toBe(true);
    expect(sheet.challengeRating).toBe(expectedCr);
  });

  it('projeta isFamiliar=true quando marcado no catalogo', () => {
    const familiarMonster = PHB2024MONSTERS.find((monster) => monster.id === 'monster-baboon');

    expect(familiarMonster).toBeDefined();

    const sheet = adaptMonsterCatalogToSheetModel(familiarMonster!);

    expect(sheet.isFamiliar).toBe(true);
  });
});
