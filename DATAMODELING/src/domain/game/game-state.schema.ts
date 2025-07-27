import { z } from "zod";
import {
  AreaSchema,
  DcSchema,
  DurationSchema,
} from "../../shared/blocks.schema";
import {
  AbilityScoreEnum,
  SurfaceTriggerEnum,
  SurfaceTypeEnum,
} from "../../shared/primitives.js";

import {ActionOutcomesSchema} from "../../shared/outcomes.schema.js"

export const SurfaceRuleSchema = z.object({
  trigger: SurfaceTriggerEnum,
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(ActionOutcomesSchema),
});
export const ActiveSurfaceSchema = z.object({
  id: z.string(),
  shape: AreaSchema,
  surfaceType: SurfaceTypeEnum, // Usando o novo enum
  rules: z.array(SurfaceRuleSchema),
  duration: DurationSchema.optional(),
});
const GameStateSchema = z.object({
  // Você precisará definir o CharacterSchema aqui no futuro
  // characters: z.array(CharacterSchema),
  activeSurfaces: z.array(ActiveSurfaceSchema),
});
