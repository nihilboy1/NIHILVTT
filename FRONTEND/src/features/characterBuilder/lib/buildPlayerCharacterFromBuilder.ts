import { PHB2024CLASSES, PHB2024FEATS, PHB2024ORIGINS, PHB2024SPECIES } from '@nihilvtt/datamodeling/data';

import { DEFAULT_PLAYER_DATA } from '@/entities/character/config/sheetDefaults';
import { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';

import { CharacterBuilderFormData } from '../schemas/characterBuilderSchema';
import { EffectChoices } from '../types/effectTypes';

type ProficiencyLevel = PlayerCharacter['proficiencies']['skills']['acrobatics'];
type Attributes = PlayerCharacter['attributes'];

const PROFICIENT: ProficiencyLevel = 'proficient';

const FACE_TO_DICE: Record<number, PlayerCharacter['hitDiceEntries'][number]['type']> = {
  4: 'd4',
  6: 'd6',
  8: 'd8',
  10: 'd10',
  12: 'd12',
  20: 'd20',
};

const clampAttribute = (value: number): number => Math.min(30, Math.max(1, value));

const normalizeName = (value: string | string[]): string =>
  Array.isArray(value) ? (value[1] ?? value[0] ?? '') : value;

const deepCloneDefaultPlayer = (): Omit<PlayerCharacter, 'id' | 'type'> =>
  JSON.parse(JSON.stringify(DEFAULT_PLAYER_DATA)) as Omit<PlayerCharacter, 'id' | 'type'>;

const applyProficiencyToSheet = (
  proficiencies: PlayerCharacter['proficiencies'],
  proficiencyType: string,
  value: string,
): void => {
  if (proficiencyType === 'savingThrow' && value in proficiencies.savingThrows) {
    proficiencies.savingThrows[value as keyof PlayerCharacter['proficiencies']['savingThrows']] =
      PROFICIENT;
    return;
  }

  if (proficiencyType === 'skill' && value in proficiencies.skills) {
    proficiencies.skills[value as keyof PlayerCharacter['proficiencies']['skills']] = PROFICIENT;
  }
};

const resolveSelectedChoices = (
  effect: {
    choose?: { from: string[]; count: number | 'all' };
    proficiencies?: string[];
  },
  selectedChoice: unknown,
): string[] => {
  if (Array.isArray(selectedChoice)) {
    return selectedChoice.filter((item): item is string => typeof item === 'string');
  }

  if (typeof selectedChoice === 'string') {
    return [selectedChoice];
  }

  if (effect.proficiencies && Array.isArray(effect.proficiencies)) {
    return effect.proficiencies;
  }

  if (!effect.choose) {
    return [];
  }

  if (effect.choose.count === 'all') {
    return effect.choose.from;
  }

  return effect.choose.from.slice(0, effect.choose.count);
};

const applyAbilityScoreEffects = (
  attributes: Attributes,
  entityId: string,
  entityPrefix: 'origin' | 'feat',
  effects: Array<unknown>,
  effectChoices: EffectChoices,
): void => {
  effects.forEach((rawEffect, index) => {
    const effect = rawEffect as {
      type: string;
      choices?: Array<{
        operation: 'add' | 'set';
        pick: { amount: number | 'any'; from: string[] };
        value: number;
      }>;
    };

    if (effect.type !== 'passive_modifyAbilityScore') {
      return;
    }

    const firstChoice = effect.choices?.[0];
    if (!firstChoice) {
      return;
    }

    const effectId = `${entityId}-${entityPrefix}-effect-${index}`;
    const selected = effectChoices[effectId];

    if (!Array.isArray(selected)) {
      return;
    }

    selected.forEach((ability) => {
      if (typeof ability !== 'string' || !(ability in attributes)) {
        return;
      }

      const key = ability as keyof Attributes;
      if (firstChoice.operation === 'set') {
        attributes[key] = clampAttribute(firstChoice.value);
        return;
      }

      attributes[key] = clampAttribute(attributes[key] + firstChoice.value);
    });
  });
};

const applyProficiencyEffects = (
  proficiencies: PlayerCharacter['proficiencies'],
  entityId: string,
  entityPrefix: 'origin' | 'feat' | 'class',
  effects: Array<unknown>,
  effectChoices: EffectChoices,
): void => {
  effects.forEach((rawEffect, index) => {
    const effect = rawEffect as {
      type: string;
      on?: string;
      choose?: { from: string[]; count: number | 'all' };
      proficiencies?: string[];
    };

    if (effect.type !== 'passive_grantProficiency' || !effect.on) {
      return;
    }

    const effectId = `${entityId}-${entityPrefix}-effect-${index}`;
    const selectedChoice = effectChoices[effectId];
    const selectedValues = resolveSelectedChoices(effect, selectedChoice);

    selectedValues.forEach((selected) => {
      applyProficiencyToSheet(proficiencies, effect.on as string, selected);
    });
  });
};

const deriveSelectedFeatIds = (
  formData: CharacterBuilderFormData,
  originEffects: Array<unknown>,
  originId: string,
  effectChoices: EffectChoices,
): string[] => {
  const featIds = new Set<string>();

  if (typeof formData.feat === 'string' && formData.feat.length > 0) {
    featIds.add(formData.feat);
  }

  if (formData.feat && typeof formData.feat === 'object' && !Array.isArray(formData.feat)) {
    Object.keys(formData.feat).forEach((key) => {
      if (key.startsWith('feat-') || key.startsWith('feat_')) {
        const normalized = key.replace(/^feat[-_]/, '');
        featIds.add(normalized);
      }
    });
  }

  originEffects.forEach((rawEffect, index) => {
    const effect = rawEffect as {
      type: string;
      selection?: {
        mode: 'specific' | 'choose' | 'category';
        feats?: string[];
      };
    };

    if (effect.type !== 'passive_providesFeat' || !effect.selection) {
      return;
    }

    if (effect.selection.mode === 'specific' && Array.isArray(effect.selection.feats)) {
      effect.selection.feats.forEach((featId) => featIds.add(featId));
      return;
    }

    const effectId = `${originId}-origin-effect-${index}`;
    const selected = effectChoices[effectId];

    if (Array.isArray(selected)) {
      selected
        .filter((item): item is string => typeof item === 'string' && item.length > 0)
        .forEach((featId) => featIds.add(featId));
      return;
    }

    if (typeof selected === 'string' && selected.length > 0) {
      featIds.add(selected);
    }
  });

  return Array.from(featIds);
};

const mapTraits = (
  entries: Array<{ name: string; description?: string }> | undefined,
  source: string,
): NonNullable<PlayerCharacter['featuresAndTraits']> => {
  if (!entries || entries.length === 0) {
    return [];
  }

  return entries.map((entry) => ({
    id: generateUniqueId(),
    name: entry.name,
    description: entry.description || '',
    source,
  }));
};

export function buildPlayerCharacterFromBuilder(
  formData: CharacterBuilderFormData,
  effectChoices: EffectChoices,
): Omit<PlayerCharacter, 'id' | 'type'> {
  const selectedClass = PHB2024CLASSES.find((item) => item.id === formData.class);
  const selectedSpecies = PHB2024SPECIES.find((item) => item.id === formData.species);
  const selectedOrigin = PHB2024ORIGINS.find((item) => item.id === formData.origin);

  if (!selectedClass || !selectedSpecies || !selectedOrigin) {
    throw new Error('Dados de classe, espécie ou origem inválidos para criação de personagem.');
  }

  const character = deepCloneDefaultPlayer();
  const attributes = { ...formData.attributes } as Attributes;

  applyAbilityScoreEffects(
    attributes,
    selectedOrigin.id,
    'origin',
    selectedOrigin.effects,
    effectChoices,
  );

  const selectedFeatIds = deriveSelectedFeatIds(
    formData,
    selectedOrigin.effects,
    selectedOrigin.id,
    effectChoices,
  );

  const selectedFeats = selectedFeatIds
    .map((featId) => PHB2024FEATS.find((feat) => feat.id === featId))
    .filter((feat): feat is (typeof PHB2024FEATS)[number] => Boolean(feat));

  selectedFeats.forEach((feat) => {
    applyAbilityScoreEffects(attributes, feat.id, 'feat', feat.effects, effectChoices);
  });

  character.attributes = attributes;

  const proficiencies = deepCloneDefaultPlayer().proficiencies;
  applyProficiencyEffects(proficiencies, selectedClass.id, 'class', selectedClass.effects, effectChoices);
  applyProficiencyEffects(
    proficiencies,
    selectedOrigin.id,
    'origin',
    selectedOrigin.effects,
    effectChoices,
  );
  selectedFeats.forEach((feat) => {
    applyProficiencyEffects(proficiencies, feat.id, 'feat', feat.effects, effectChoices);
  });

  character.proficiencies = proficiencies;

  const constitutionModifier = Math.floor((attributes.constitution - 10) / 2);
  const dexterityModifier = Math.floor((attributes.dexterity - 10) / 2);
  const hitDieFaces = selectedClass.initialHitPoints.faces;
  const maxHp = Math.max(1, hitDieFaces + constitutionModifier);

  character.combatStats = {
    ...character.combatStats,
    maxHp,
    currentHp: maxHp,
    armorClass: Math.max(1, 10 + dexterityModifier),
    speed: selectedSpecies.speed.walk ?? character.combatStats.speed,
  };

  const hitDiceType = FACE_TO_DICE[hitDieFaces] ?? 'd6';

  character.hitDiceEntries = [
    {
      id: generateUniqueId(),
      type: hitDiceType,
      quantity: 1,
    },
  ];

  character.name = formData['personal-info'].name.trim();
  character.notes = formData['personal-info'].lore?.trim() || '';
  character.image = formData['personal-info'].tokenUrl?.trim() || character.image;
  character.size = selectedSpecies.size;
  character.charClass = selectedClass.id;
  character.subclass = '';
  character.background = selectedOrigin.id;
  character.species = selectedSpecies.id;
  character.level = 1;
  character.inspiration = false;

  const originTraitsRaw =
    'traits' in selectedOrigin && Array.isArray(selectedOrigin.traits) ? selectedOrigin.traits : [];
  const speciesTraits = mapTraits(selectedSpecies.traits, normalizeName(selectedSpecies.name));
  const originTraits = mapTraits(originTraitsRaw, normalizeName(selectedOrigin.name));
  const featTraits = selectedFeats.flatMap((feat) => mapTraits(feat.traits, normalizeName(feat.name)));
  const currentFeaturesAndTraits = character.featuresAndTraits ?? [];

  character.featuresAndTraits = [
    ...currentFeaturesAndTraits,
    ...speciesTraits,
    ...originTraits,
    ...featTraits,
  ];

  return character;
}
