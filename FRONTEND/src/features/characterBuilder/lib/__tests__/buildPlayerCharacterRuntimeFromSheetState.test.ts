import '@testing-library/jest-dom';

const mockParse = jest.fn((value: unknown) => value);

jest.mock('@nihilvtt/datamodeling/runtime', () => ({
  PlayerCharacterStateSchema: {
    parse: (value: unknown) => mockParse(value),
  },
}));

import { buildPlayerCharacterRuntimeFromSheetState } from '@/features/characterBuilder/lib/buildPlayerCharacterRuntimeFromSheetState';

describe('buildPlayerCharacterRuntimeFromSheetState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('envia controlledByUserId explicito como null no runtime criado pelo builder', () => {
    buildPlayerCharacterRuntimeFromSheetState({
      name: 'Heroi',
      image: '',
      size: 'Medium',
      notes: '',
      attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
      proficiencies: {
        savingThrows: {
          strength: 'None',
          dexterity: 'None',
          constitution: 'None',
          intelligence: 'None',
          wisdom: 'None',
          charisma: 'None',
        },
        skills: {
          acrobatics: 'None',
          animalHandling: 'None',
          arcana: 'None',
          athletics: 'None',
          deception: 'None',
          history: 'None',
          insight: 'None',
          intimidation: 'None',
          investigation: 'None',
          medicine: 'None',
          nature: 'None',
          perception: 'None',
          performance: 'None',
          persuasion: 'None',
          religion: 'None',
          sleightOfHand: 'None',
          stealth: 'None',
          survival: 'None',
        },
      },
      combatStats: {
        maxHp: 10,
        currentHp: 10,
        tempHp: 0,
        armorClass: 10,
        speed: 30,
      },
      actions: [],
      attacks: [],
      equipment: [],
      featuresAndTraits: [],
      level: 1,
      inspiration: false,
      charClass: 'class-fighter',
      subclass: '',
      background: 'origin-acolyte',
      species: 'specie-aasimar',
      hitDiceEntries: [],
    } as never);

    expect(mockParse).toHaveBeenCalledWith(
      expect.objectContaining({
        controlledByUserId: null,
        inspiration: false,
        hitPoints: expect.objectContaining({
          temporary: 0,
        }),
      }),
    );
  });
});
