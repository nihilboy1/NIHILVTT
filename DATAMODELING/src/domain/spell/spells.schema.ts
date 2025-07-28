import { z } from "zod";
import {
  MagicSchoolEnum,
  SourceEnum,
  SpellComponentEnum,
} from "../../shared/primitives.js";
import { DurationSchema } from "../../shared/blocks.schema.js";

// ============================================================================
// FACTORY DE SCHEMAS DE SPELL
// ============================================================================
// Para quebrar o ciclo de dependências final, este ficheiro também se torna
// uma fábrica. Ele recebe o EffectSchema já construído como dependência.
// ----------------------------------------------------------------------------

// Definimos uma "forma" base para o efeito para ajudar o TypeScript.
type BaseEffect = { type: string; [key: string]: any };
type EffectZodType = z.ZodType<BaseEffect, any, any>;

export function createSpellSchemas<T extends EffectZodType>(dependencies: {
  EffectSchema: T;
}) {
  const { EffectSchema } = dependencies;

  /** uma magia NÃO É uma ação. Uma magia TEM uma ação. */
  const SpellSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string(),

    source: SourceEnum,
    page: z.number(),
    level: z.number().int().min(0).max(9),
    school: MagicSchoolEnum,
    isRitual: z.boolean().default(false).optional(),

    components: z.object({
      types: z.array(SpellComponentEnum),
      material: z
        .object({
          description: z.string(),
          costGp: z.number().optional(),
          isConsumed: z.boolean().default(false),
        })
        .optional(),
    }),

    duration: DurationSchema,
    effects: z.array(EffectSchema),
  });

  const SpellSchemaWithRefinement = SpellSchema.check((ctx) => {
    const spell = ctx.value;
    const scalingEffects = spell.effects.filter(
      (effect) => effect.type === "activatableCastSpell" && effect.scaling
    );

    if (scalingEffects.length === 0) {
      return;
    }

    const definedOutcomeIds = new Set<string>();
    spell.effects.forEach((effect) => {
      if (
        effect.type === "activatableCastSpell" &&
        effect.parameters &&
        Array.isArray(effect.parameters.outcomes)
      ) {
        effect.parameters.outcomes.forEach((outcome) => {
          if (outcome.id) {
            definedOutcomeIds.add(outcome.id);
          }
        });
      }
    });

    scalingEffects.forEach((effect) => {
      if (
        effect.type === "activatableCastSpell" &&
        effect.scaling?.type === "characterLevel"
      ) {
        effect.scaling.rules.forEach((rule, index) => {
          if (!definedOutcomeIds.has(rule.outcomeId)) {
            ctx.issues.push({
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
              input: spell, // ou outro valor de entrada relevante para o erro
            });
          }
        });
      }
    });
  });

  const FinalSpellDataSchema = z.array(SpellSchemaWithRefinement);

  // Retornamos os schemas construídos.
  return {
    SpellSchema,
    SpellSchemaWithRefinement,
    FinalSpellDataSchema,
  };
}
