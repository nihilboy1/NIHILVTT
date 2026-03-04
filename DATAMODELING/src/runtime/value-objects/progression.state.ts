import { z } from "zod";

export const ProgressionStateSchema = z.object({
  currentLevel: z.number().int().min(1).max(20),
  pendingLevelUps: z.number().int().min(0),
});

export type ProgressionStateType = z.infer<typeof ProgressionStateSchema>;
