import { z } from "zod";
import {
  RequirementSchema,
  DurationSchema,
} from "../../shared/blocks.schema.js";
import {
  EffectSchema,
  EffectType,
  SpellScalingRuleType,
} from "../../shared/effect.schema.js";
import { ActionOutcomeType } from "../../shared/outcome.schema.js";
import { SourceEnum } from "../../shared/primitives/system.primitives.js";
import {
  MagicSchoolEnum, 
  SpellComponentEnum,
} from "../../shared/primitives/spell.primitives.js";

const baseSpellSchema = z.object({
  id: z.string().min(1),
  name: z.union([z.string().min(1), z.array(z.string().min(1))]),
  description: z.string(),
  source: SourceEnum,
  page: z.number(),
  level: z.number().int().min(0).max(9),
  school: MagicSchoolEnum,
  additionalRules: z
    .object({ id: z.string(), details: z.string() })
    .array()
    .optional(),
  isRitual: z.boolean().default(false).optional(),
  components: z.object({
    types: z.array(SpellComponentEnum),
    material: z
      .object({
        description: z.string(),
        costGp: z.number().optional(),
        isConsumed: z.boolean().default(false).optional(),
      })
      .optional(),
  }),
  requirements: RequirementSchema.optional(),
  duration: DurationSchema.optional(),
  castingTime: DurationSchema.default({
    unit: "instantaneous",
  }).optional(),
  effects: z.array(EffectSchema),
});

export const SpellSchema = baseSpellSchema.check((ctx) => {
  const spell = ctx.value;

  const scalingEffects = spell.effects.filter(
    (effect: EffectType) =>
      effect.type === "activatableCastSpell" && effect.scaling,
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
        },
      );
    }
  });
});

export const FinalSpellDataSchema = z.array(SpellSchema);

export type Spell = z.infer<typeof SpellSchema>;
