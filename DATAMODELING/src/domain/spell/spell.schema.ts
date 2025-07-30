import { z } from "zod";
import {
  MagicSchoolEnum,
  SourceEnum,
  SpellComponentEnum,
} from "../../shared/primitives.js";
import { DurationSchema } from "../../shared/blocks.schema.js";
import { effectSchema, EffectType } from "../../shared/effect.schema.js";
import { ActionOutcomeType } from "../../shared/outcome.schema.js";

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
  effects: z.array(effectSchema),
});

const SpellSchemaWithRefinement = SpellSchema.check((ctx) => {
  const spell = ctx.value;
  const scalingEffects = spell.effects.filter(
    (effect: EffectType) =>
      effect.type === "activatableCastSpell" && effect.scaling
  );
  if (scalingEffects.length === 0) {
    return;
  }

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

  scalingEffects.forEach((effect: EffectType) => {
    if (
      effect.type === "activatableCastSpell" &&
      effect.scaling?.type === "characterLevel"
    ) {
      effect.scaling.rules.forEach((rule: any, index: number) => {
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
      });
    }
  });
});

export const FinalSpellDataSchema = z.array(SpellSchemaWithRefinement);

export { SpellSchema, SpellSchemaWithRefinement };
export type Spell = z.infer<typeof SpellSchema>;
export type FinalSpellData = Spell[];