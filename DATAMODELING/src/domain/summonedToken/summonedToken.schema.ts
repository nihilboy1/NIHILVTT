import z from "zod";
import { EffectSchema } from "../../shared/effect.schema";

export const TokenCapabilitiesSchema = z.object({
  controllable: z.boolean().optional(),
  autonomous: z.boolean().optional(),
  physical: z.boolean().optional(),
});

export const SummonedTokenSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  effects: z.array(EffectSchema),
  capabilities: TokenCapabilitiesSchema.optional(),
});

export const SummonedTokenSchemaArray = z.array(SummonedTokenSchema);
export type SummonedTokenType = z.infer<typeof SummonedTokenSchema>;
