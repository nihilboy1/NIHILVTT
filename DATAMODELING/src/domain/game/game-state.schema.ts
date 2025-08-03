import { z } from "zod";
import {
  AreaSchema,
  DcSchema,
  DurationSchema,
} from "../../shared/blocks.schema";

import { ActionOutcomesSchema } from "../../shared/outcome.schema.js";
import { TriggerSchema } from "../../shared/effect.schema.js";
import { EventTriggerEnum } from "../../shared/primitives/combat.primitives.js";
import { AbilityScoreEnum } from "../../shared/primitives/character.primitives.js";
import { SurfaceTypeEnum } from "../../shared/primitives/world.primitives.js";

export const SurfaceRuleSchema = z.object({
  trigger: EventTriggerEnum,
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
