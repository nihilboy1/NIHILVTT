import z from "zod";
import { SourceEnum } from "../../shared/primitives/system.primitives";
import { EffectSchema } from "../../shared/effect.schema";
import { StartingEquipmentSchema } from "../../shared/character-blocks.schema";

export const OriginSchema = z.object({
  id: z.string().min(1),
  name: z.string().array(),
  source: SourceEnum,
  description: z.string(),
  traits: z
    .object({ name: z.string().min(1), description: z.string().optional() })
    .array()
    .default([])
    .optional(),
  effects: z.array(EffectSchema),
  startingEquipment: StartingEquipmentSchema,
});

export type Origin = z.infer<typeof OriginSchema>;
