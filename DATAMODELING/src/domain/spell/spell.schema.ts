// Importa a biblioteca Zod para validação de schemas em TypeScript
import { z } from "zod";

// Schemas compartilhados para requisitos e duração de magias
import {
  RequirementSchema,
  DurationSchema,
} from "../../shared/blocks.schema.js";
// Schemas e tipos relacionados a efeitos de magias
import {
  EffectSchema,
  EffectType,
  SpellScalingRuleType,
} from "../../shared/effect.schema.js";
// Tipo para outcomes de ações
import { ActionOutcomeType } from "../../shared/outcome.schema.js";
// Enums para escola de magia, fonte e componentes
import {
  MagicSchoolEnum,
  SourceEnum,
  SpellComponentEnum,
} from "../../shared/primitives/world.primitives.js";

// 1. Schema base: estrutura fundamental de uma magia
// Define todos os campos obrigatórios e opcionais de uma spell
const baseSpellSchema = z.object({
  // Identificador único da magia
  id: z.string().min(1),
  // Nome da magia (pode ser string ou array de strings para nomes alternativos)
  name: z.union([z.string().min(1), z.array(z.string().min(1))]),
  // Descrição detalhada da magia
  description: z.string(),
  // Fonte (livro, suplemento, etc.)
  source: SourceEnum,
  // Página de referência
  page: z.number(),
  // Nível da magia (0 a 9)
  level: z.number().int().min(0).max(9),
  // Escola de magia
  school: MagicSchoolEnum,
  // Regras adicionais específicas da magia
  additionalRules: z
    .object({ id: z.string(), details: z.string() })
    .array()
    .optional(),
  // Indica se a magia pode ser conjurada como ritual
  isRitual: z.boolean().default(false).optional(),
  // Componentes necessários para conjuração
  components: z.object({
    types: z.array(SpellComponentEnum),
    material: z
      .object({
        // Descrição do material
        description: z.string(),
        // Custo em peças de ouro (opcional)
        costGp: z.number().optional(),
        // Se o material é consumido ao conjurar (opcional)
        isConsumed: z.boolean().default(false).optional(),
      })
      .optional(),
  }),
  // Requisitos para conjuração (opcional)
  requirements: RequirementSchema.optional(),
  // Duração da magia (opcional)
  duration: DurationSchema.optional(),
  // Tempo de conjuração (padrão: instantâneo)
  castingTime: DurationSchema.default({
    unit: "instantaneous",
  }).optional(),
  // Lista de efeitos da magia
  effects: z.array(EffectSchema),
});

// 2. Schema final com validação customizada
//    Garante que regras de scaling que modificam outcomes referenciem IDs válidos
export const SpellSchema = baseSpellSchema.check((ctx) => {
  const spell = ctx.value;
  // Filtra efeitos do tipo activatableCastSpell que possuem scaling
  const scalingEffects = spell.effects.filter(
    (effect: EffectType) =>
      effect.type === "activatableCastSpell" && effect.scaling
  );

  // Se não houver efeitos escaláveis, não há nada para validar
  if (scalingEffects.length === 0) {
    return;
  }

  // Coleta todos os IDs de outcomes definidos nos efeitos
  const definedOutcomeIds = new Set<string>();
  spell.effects.forEach((effect: EffectType) => {
    if (
      effect.type === "activatableCastSpell" &&
      effect.parameters &&
      Array.isArray(effect.parameters.outcomes)
    ) {
      effect.parameters.outcomes.forEach((outcome: ActionOutcomeType) => {
        if (outcome.id) {
          definedOutcomeIds.add(outcome.id);
        }
      });
    }
  });

  // Para cada scaling rule do tipo modifyOutcomeFormula, verifica se o outcomeId existe
  scalingEffects.forEach((effect: EffectType) => {
    if (
      effect.type === "activatableCastSpell" &&
      effect.scaling?.type === "characterLevel"
    ) {
      effect.scaling.rules.forEach(
        (rule: SpellScalingRuleType, index: number) => {
          if (rule.type === "modifyOutcomeFormula") {
            if (!definedOutcomeIds.has(rule.outcomeId)) {
              ctx.issues.push({
                input: ctx.value,
                code: "custom",
                message: `ID de outcome inválido: "${rule.outcomeId}". Não foi encontrado nenhum outcome com este ID na definição da magia.`,
                path: [
                  "effects",
                  spell.effects.indexOf(effect),
                  "scaling",
                  "rules",
                  index,
                  "outcomeId",
                ],
              });
            }
          }
        }
      );
    }
  });
});

// 3. Schema para um array de magias e tipo TypeScript inferido
export const FinalSpellDataSchema = z.array(SpellSchema);
export type Spell = z.infer<typeof SpellSchema>;
