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

// CORREÇÃO: Conforme a sua sugestão, definimos a "forma mínima" que um efeito
// precisa de ter para que a nossa lógica de validação funcione.
const RefinableEffectShape = z.object({
  type: z.string(),
  scaling: z.any().optional(),
  parameters: z.any().optional(),
});

// Usamos esta forma para restringir o nosso tipo genérico. Isto garante que
// qualquer EffectSchema passado para esta fábrica irá produzir um output
// que o TypeScript consegue entender, resolvendo os erros de tipo.
export function createSpellSchemas<
  EffectSchemaType extends z.ZodType<z.infer<typeof RefinableEffectShape>>
>(dependencies: { EffectSchema: EffectSchemaType }) {
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

  const SpellSchemaWithRefinement = SpellSchema.superRefine((spell, ctx) => {
    // Agora, o TypeScript sabe que cada 'effect' tem as propriedades 'type', 'scaling', etc.
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
            ctx.addIssue({
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
