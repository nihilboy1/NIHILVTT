import z from "zod";

export const ActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(["action", "bonus", "reaction", "free"]),
});

export type ActionType = z.infer<typeof ActionSchema>;
