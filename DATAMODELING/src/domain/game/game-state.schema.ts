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
import { actionOutcomesSchema } from "../../shared/outcome.schema.js";

export const SurfaceRuleSchema = z.object({
  trigger: SurfaceTriggerEnum,
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(actionOutcomesSchema),
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
