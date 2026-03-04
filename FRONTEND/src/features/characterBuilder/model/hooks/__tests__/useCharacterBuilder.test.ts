import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';

const mockTrigger = jest.fn();
const mockGetValues = jest.fn();
const mockWatch = jest.fn();
const mockSetValue = jest.fn();
const mockReset = jest.fn();
const mockAddCharacter = jest.fn();
const mockResetEffectChoices = jest.fn();

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    watch: mockWatch,
    trigger: mockTrigger,
    getValues: mockGetValues,
    setValue: mockSetValue,
    reset: mockReset,
    formState: { errors: {} },
  }),
}));

jest.mock('@/entities/character/model/store', () => ({
  useCharactersStore: () => ({
    addCharacter: mockAddCharacter,
  }),
}));

jest.mock('@/features/characterBuilder/model/hooks/useEffectsProcessor', () => ({
  useEffectsProcessor: () => ({
    effectChoices: {},
    resetEffectChoices: mockResetEffectChoices,
    processOriginEffects: () => [],
    areAllEffectsSelected: () => true,
  }),
}));

jest.mock('@/features/characterBuilder/lib/buildPlayerCharacterFromBuilder', () => ({
  buildPlayerCharacterFromBuilder: () => ({
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
  }),
}));

import { useCharacterBuilder } from '@/features/characterBuilder/model/hooks/useCharacterBuilder';

describe('useCharacterBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWatch.mockReturnValue({
      species: 'specie-aasimar',
      origin: 'origin-acolyte',
      feat: {},
      class: 'class-fighter',
      attributes: {
        strength: 15,
        dexterity: 14,
        constitution: 13,
        intelligence: 12,
        wisdom: 10,
        charisma: 8,
      },
      'personal-info': {
        name: 'Heroi',
        lore: '',
        tokenUrl: '',
        splashartUrl: '',
      },
    });
    mockGetValues.mockReturnValue(mockWatch());
    mockTrigger.mockResolvedValue(true);
  });

  it('falha explicitamente quando handleFinish e chamado sem pipeline autoritativo', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { result } = renderHook(() => useCharacterBuilder());

    let finished = false;
    await act(async () => {
      finished = await result.current.handleFinish();
    });

    expect(finished).toBe(false);
    expect(mockAddCharacter).not.toHaveBeenCalled();
    expect(mockReset).not.toHaveBeenCalled();
    expect(mockResetEffectChoices).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      '[CharacterBuilder] Fluxo local bloqueado: o builder exige pipeline autoritativo de persistência.',
    );
  });
});
