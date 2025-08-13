import z from "zod";
import { EffectSchema } from "../../shared/effect.schema";

// Schema data-driven para capacidades de tokens invocados
// Capabilities minimalista: apenas flags fundamentais para automação básica
export const TokenCapabilitiesSchema = z.object({
  controllable: z.boolean().optional(), // Pode ser comandado pelo conjurador?
  autonomous: z.boolean().optional(), // Age por conta própria?
  physical: z.boolean().optional(), // Tem corpo físico? (pode bloquear, ser alvo, etc)
});

export const SummonedTokenSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  effects: z.array(EffectSchema),
  capabilities: TokenCapabilitiesSchema.optional(),
});

export type SummonedTokenType = z.infer<typeof SummonedTokenSchema>;
