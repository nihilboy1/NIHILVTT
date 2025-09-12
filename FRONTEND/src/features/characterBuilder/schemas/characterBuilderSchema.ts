import { z } from 'zod';

import { ATTRIBUTE_LIST } from '@/shared/constants/characterData/attributes';
// Importações do datamodeling
import { PHB2024SPECIES, PHB2024ORIGINS, PHB2024FEATS } from '@nihilvtt/datamodeling/data';
import { OriginType, SpecieType, FeatType } from '@nihilvtt/datamodeling/domain';
// Mantemos a importação local para compatibilidade com o código existente
import { CLASSES } from '@/shared/constants/characterData/classes';

// Tipo para opções de personagem - baseado nas estruturas comuns entre specie e origin
export type CharacterOption = {
  id: string;
  name: string; // Aqui usamos string em vez de string[] para compatibilidade
  description: string;
  source?: string;
};

// Função para transformar SpecieType em CharacterOption para a interface
export const specieToCharacterOption = (specie: SpecieType): CharacterOption => ({
  id: specie.id,
  name: specie.name[0] || '', // Pegamos o primeiro nome do array
  description: specie.description,
  source: specie.source,
});

// Função para transformar OriginType em CharacterOption para a interface
export const originToCharacterOption = (origin: OriginType): CharacterOption => ({
  id: origin.id,
  name: origin.name[0] || '', // Pegamos o primeiro nome do array
  description: origin.description,
  source: origin.source,
});

// Esquemas para cada seção - utilizando os schemas do datamodeling
// Validamos se o ID existe nas listas disponíveis
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

// Funções de utilidade para trabalhar com as coleções
export const getSpecieById = (id: string): SpecieType | undefined =>
  PHB2024SPECIES.find((species) => species.id === id);

export const getOriginById = (id: string): OriginType | undefined =>
  PHB2024ORIGINS.find((origin) => origin.id === id);

export const getFeatById = (id: string): FeatType | undefined =>
  PHB2024FEATS.find((feat) => feat.id === id);

// Função para converter dados do formulário para modelo completo
export const formDataToExpandedData = (
  formData: CharacterBuilderFormData,
): CharacterBuilderExpandedData | null => {
  const specie = getSpecieById(formData.species);
  const origin = getOriginById(formData.origin);

  if (!specie || !origin) {
    return null;
  }

  return {
    ...formData,
    species: specie,
    origin: origin,
  };
};

// Função para converter todas as espécies para o formato de opção da interface
export const getAllSpeciesOptions = (): CharacterOption[] =>
  PHB2024SPECIES.map(specieToCharacterOption);

// Função para converter todas as origens para o formato de opção da interface
export const getAllOriginOptions = (): CharacterOption[] =>
  PHB2024ORIGINS.map(originToCharacterOption);

// Esquema para talentos - validação flexível para diferentes tipos de seleções
export const featSchema = z
  .record(z.string(), z.any())
  .transform((val) => val || {})
  .pipe(z.record(z.string(), z.any()));

// Esquema completo para o formulário do CharacterBuilder
export const characterBuilderSchema = z.object({
  species: speciesSchema,
  origin: originSchema,
  feat: featSchema,
  class: classSchema,
  attributes: attributesSchema,
  'personal-info': personalInfoSchema,
});

// Tipo derivado do esquema
export type CharacterBuilderFormData = z.infer<typeof characterBuilderSchema>;

// Tipo expandido com objetos completos de espécie e origem
export type CharacterBuilderExpandedData = Omit<CharacterBuilderFormData, 'species' | 'origin'> & {
  species: SpecieType;
  origin: OriginType;
};

/**
 * Extrai todos os talentos que devem ser processados baseado nas seleções atuais
 * @param selections - Seleções atuais do character builder
 * @returns Array de CharacterOption para talentos
 */
export function getRequiredFeats(selections: any): CharacterOption[] {
  const feats: CharacterOption[] = [];

  // Extrai talentos das origens selecionadas
  if (selections.origin) {
    const origin = getOriginById(selections.origin);
    if (origin) {
      origin.effects.forEach((effect) => {
        if (effect.type === 'passive_providesFeat') {
          const featEffect = effect as any;
          if (featEffect.selection) {
            // Para talentos específicos, adiciona diretamente
            if (featEffect.selection.mode === 'specific') {
              featEffect.selection.feats.forEach((featId: string) => {
                const feat = getFeatById(featId);
                if (feat) {
                  feats.push(featToCharacterOption(feat));
                }
              });
            }
            // Para talentos de escolha, adiciona as opções disponíveis
            else if (featEffect.selection.mode === 'choose') {
              featEffect.selection.feats.forEach((featId: string) => {
                const feat = getFeatById(featId);
                if (feat) {
                  feats.push(featToCharacterOption(feat));
                }
              });
            }
          }
        }
      });
    }
  }

  // TODO: Adicionar talentos de outras fontes (classes, etc.) quando implementadas

  return feats;
}

/**
 * Converte um FeatType para CharacterOption
 */
function featToCharacterOption(feat: FeatType): CharacterOption {
  return {
    id: feat.id,
    name: Array.isArray(feat.name) ? feat.name[0] : feat.name,
    description: feat.description,
  };
}
