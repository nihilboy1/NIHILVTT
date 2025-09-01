import z from "zod";
import {
  CreatureSizeEnum,
  CreatureTypeEnum,
  SourceEnum,
} from "../../shared/primitives/system.primitives";
import {
  DefensesSchema,
  SensesSchema,
  SpeedSchema,
} from "../../shared/character-blocks.schema";
import { EffectSchema } from "../../shared/effect.schema";

export const SpecieSchema = z.object({
  id: z.string(),
  source: SourceEnum,
  creatureType: CreatureTypeEnum,
  senses: SensesSchema.optional(),
  traits: z
    .object({ name: z.string().min(1), description: z.string() })
    .array()
    .default([])
    .optional(),
  name: z.string().min(2).max(100).array(),
  description: z.string().max(500),
  size: CreatureSizeEnum,
  speed: SpeedSchema,
  defenses: DefensesSchema.optional(),

  effects: EffectSchema.array(),
});

export type Specie = z.infer<typeof SpecieSchema>;
