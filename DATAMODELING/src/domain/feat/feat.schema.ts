import z from "zod";
import { SourceEnum } from "../../shared/primitives/system.primitives";
import { FeatCategoryEnum } from "../../shared/primitives/character.primitives";
import { EffectSchema } from "../../shared/effect.schema.js";
import { RequirementSchema } from "../../shared/game-events.schema.js";

export const FeatSchema = z.object({
  id: z.string().min(1),
  name: z.string().array(),
  source: SourceEnum,
  description: z.string(),
  traits: z
    .object({ name: z.string().min(1), description: z.string().optional() })
    .array()
    .default([])
    .optional(),
  category: FeatCategoryEnum,
  requirements: RequirementSchema.optional(),
  repeatable: z.object({
    canBeRepeated: z.boolean().optional(),
    limit: z.number().min(1).optional(),
  }),
  effects: z.array(EffectSchema),
});

export type Feat = z.infer<typeof FeatSchema>;
export const FinalFeatDataSchema = z.array(FeatSchema);
