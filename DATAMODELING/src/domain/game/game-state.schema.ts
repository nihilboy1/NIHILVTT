// Em src/schemas/game-state.schema.ts

import { z } from "zod";
import { ActionOutcomeSchema } from "../../shared/outcomes.schema";
import { AreaSchema, DurationSchema } from "../../shared/blocks.schema";
// Este arquivo agora importa de outros, mas não é importado por eles,
// quebrando a dependência circular.

export const ActiveSurfaceSchema = z.object({
  id: z.string(),
  shape: AreaSchema,
  surfaceType: z.string(),
  outcomes: z.array(ActionOutcomeSchema),
  duration: DurationSchema.optional(), // <-- MUDOU AQUI
});

const GameStateSchema = z.object({
  // Você precisará definir o CharacterSchema aqui no futuro
  // characters: z.array(CharacterSchema),
  activeSurfaces: z.array(ActiveSurfaceSchema),
});
