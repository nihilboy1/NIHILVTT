import { z } from "zod";
import { AbilityScoresSchema } from "../../shared/character-blocks.schema.js";

export const BaseAttributesStateSchema = AbilityScoresSchema;

export const AttributesStateSchema = z.object({
  base: BaseAttributesStateSchema,
});

export type BaseAttributesStateType = z.infer<typeof BaseAttributesStateSchema>;
export type AttributesStateType = z.infer<typeof AttributesStateSchema>;
