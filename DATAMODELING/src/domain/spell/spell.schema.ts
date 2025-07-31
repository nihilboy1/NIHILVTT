import { z } from "zod";
import {
  MagicSchoolEnum,
  SourceEnum,
  SpellComponentEnum,
} from "../../shared/primitives.js";
import {
  SpellRequirementsSchema,
  DurationSchema,
} from "../../shared/blocks.schema.js";
import { effectSchema, EffectType } from "../../shared/effect.schema.js";
import { ActionOutcomeType } from "../../shared/outcome.schema.js";

// 1. O schema base define a estrutura fundamental de uma magia.
const baseSpellSchema = z.object({
  id: z.string().min(1),
  name: z.union([z.string().min(1), z.array(z.string().min(1))]),
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
        isConsumed: z.boolean().default(false).optional(),
      })
      .optional(),
  }),
  requirements: SpellRequirementsSchema.optional(),
  duration: DurationSchema,
  effects: z.array(effectSchema),
});

// 2. O schema final e exportado é a versão com o refinamento.
//    A lógica de validação foi restaurada para a sua versão original.
export const SpellSchema = baseSpellSchema.check((ctx) => {
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
      });
    }
  });
});

// 3. Tipos e schemas finais, inferidos diretamente do schema principal.
export const FinalSpellDataSchema = z.array(SpellSchema);
export type Spell = z.infer<typeof SpellSchema>;
