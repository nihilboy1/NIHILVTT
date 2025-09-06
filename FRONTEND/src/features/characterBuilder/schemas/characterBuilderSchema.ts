import { z } from 'zod';

import { ATTRIBUTE_LIST } from '@/shared/constants/characterData/attributes';
import { CLASSES } from '@/shared/constants/characterData/classes';
import { SPECIES } from '@/shared/constants/characterData/species';

// Esquemas para cada seção
export const speciesSchema = z
  .string()
  .refine((value) => SPECIES.some((species) => species.id === value), {
    message: 'Selecione uma espécie válida',
  });

export const originSchema = z.string().min(1, {
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
