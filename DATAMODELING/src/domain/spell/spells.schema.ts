// Em src/domain/spell/spell.schema.ts

import { z } from "zod";
import { ActionOutcomeSchema } from "../../shared/outcomes.schema.js";
import { AreaSchema, DurationSchema, RangeSchema, TargetSchema } from "../../shared/blocks.schema.js";
import { MagicSchoolEnum, SpellComponentSchema } from "../../shared/primitives.js";


export const SpellSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.number().int().min(0).max(9),
  school: MagicSchoolEnum,
  
  castingTime: z.object({
    value: z.number(),
    unit: z.enum(["action", "bonusAction", "reaction", "minute", "hour"]),
  }),

  components: z.object({
    types: z.array(SpellComponentSchema),
    material: z.string().optional(),
  }),

  duration: DurationSchema,
  range: RangeSchema,
  area: AreaSchema.optional(),
  target: TargetSchema.optional(),
  
  outcomes: z.array(ActionOutcomeSchema),

  higherLevel: z.string().optional(), // Descrição para níveis superiores
});

export const FinalSpellDataSchema = z.array(SpellSchema);