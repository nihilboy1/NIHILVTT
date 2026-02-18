import { z } from 'zod';

import { ATTRIBUTE_LIST } from '@/shared/constants/characterData/attributes';
// Importações do datamodeling
import { PHB2024SPECIES, PHB2024ORIGINS, PHB2024FEATS } from '@nihilvtt/datamodeling/data';
import { FeatType, OriginType, SpecieType } from '@nihilvtt/datamodeling/domain';
import { CLASSES } from '@/shared/constants/characterData/classes';

export type CharacterOption = {
  id: string;
  name: string;
  description: string;
  source?: string;
};

const normalizeName = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] ?? '' : value;

export const specieToCharacterOption = (specie: SpecieType): CharacterOption => ({
  id: specie.id,
  name: normalizeName(specie.name),
  description: specie.description,
  source: specie.source,
});

export const originToCharacterOption = (origin: OriginType): CharacterOption => ({
  id: origin.id,
  name: normalizeName(origin.name),
  description: origin.description,
  source: origin.source,
});

const featToCharacterOption = (feat: FeatType): CharacterOption => ({
  id: feat.id,
  name: normalizeName(feat.name),
  description: feat.description,
  source: feat.source,
});

export const getOriginById = (originId: string): OriginType | undefined =>
  PHB2024ORIGINS.find((origin) => origin.id === originId);

export const getFeatById = (featId: string): FeatType | undefined =>
  PHB2024FEATS.find((feat) => feat.id === featId);

export const getRequiredFeats = (selections: { origin?: string }): CharacterOption[] => {
  if (!selections.origin) {
    return [];
  }

  const origin = getOriginById(selections.origin);
  if (!origin) {
    return [];
  }

  const requiredFeatIds = new Set<string>();
  origin.effects.forEach((effect) => {
    if (effect.type === 'passive_providesFeat' && effect.selection?.feats) {
      effect.selection.feats.forEach((featId) => requiredFeatIds.add(featId));
    }
  });

  return Array.from(requiredFeatIds)
    .map((featId) => getFeatById(featId))
    .filter((feat): feat is FeatType => !!feat)
    .map(featToCharacterOption);
};

// Esquemas para cada seção - utilizando os schemas do datamodeling
// Ainda mantemos a validação de string com refine, mas o tipo base vem do datamodeling
export const speciesSchema = z
  .string()
  .refine((value) => PHB2024SPECIES.some((species: SpecieType) => species.id === value), {
    message: 'Selecione uma espécie válida',
  });

export const originSchema = z
  .string()
  .refine((value) => PHB2024ORIGINS.some((origin: OriginType) => origin.id === value), {
    message: 'Selecione uma origem válida',
  });

export const classSchema = z.string().refine((value) => CLASSES.some((cls) => cls.id === value), {
  message: 'Selecione uma classe válida',
});

// Esquema para validar cada atributo individualmente
export const singleAttributeSchema = z.number().int().min(8).max(15);

// Criamos um objeto dinâmico baseado na lista de atributos
const attributesShape = ATTRIBUTE_LIST.reduce(
  (acc, attr) => {
    acc[attr.id] = singleAttributeSchema;
    return acc;
  },
  {} as Record<string, z.ZodNumber>,
);

export const attributesSchema = z
  .object(attributesShape)
  .refine(
    (attrs) => {
      // Verificando que não excede o limite de 27 pontos
      const points = Object.values(attrs).reduce((total, value) => {
        const cost =
          {
            8: 0,
            9: 1,
            10: 2,
            11: 3,
            12: 4,
            13: 5,
            14: 7,
            15: 9,
          }[value] || 0;
        return total + cost;
      }, 0);
      return points <= 27;
    },
    {
      message: 'Você excedeu o limite de 27 pontos',
    },
  )
  .refine(
    (attrs) => {
      // Verificando que usa exatamente 27 pontos
      const points = Object.values(attrs).reduce((total, value) => {
        const cost =
          {
            8: 0,
            9: 1,
            10: 2,
            11: 3,
            12: 4,
            13: 5,
            14: 7,
            15: 9,
          }[value] || 0;
        return total + cost;
      }, 0);
      return points === 27;
    },
    {
      message: 'Você deve usar todos os 27 pontos disponíveis',
    },
  );

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  tokenUrl: z.string().url('URL inválida').optional().or(z.string().length(0)),
  splashartUrl: z.string().url('URL inválida').optional().or(z.string().length(0)),
  lore: z.string().optional().or(z.string()),
});

// Esquema completo para o formulário do CharacterBuilder
export const characterBuilderSchema = z.object({
  species: speciesSchema,
  origin: originSchema,
  class: classSchema,
  attributes: attributesSchema,
  'personal-info': personalInfoSchema,
});

// Tipo derivado do esquema
export type CharacterBuilderFormData = z.infer<typeof characterBuilderSchema>;
