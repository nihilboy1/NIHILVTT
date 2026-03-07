import z from "zod";

import { DamageTypeEnum } from "../../shared/primitives/combat.primitives.js";

const SpecieIdSchema = z.string().regex(/^specie-[a-z0-9-]+$/, {
  message: "Specie id must use the canonical namespaced format (specie-...).",
});

export const UnarmedAttackDamageTypeOverrideSchema = z.object({
  specieId: SpecieIdSchema,
  damageType: DamageTypeEnum,
});

export const UnarmedAttackProfileSchema = z.object({
  attackId: z.literal("builtin-unarmed-strike"),
  label: z.string().min(1),
  sourceType: z.literal("unarmed"),
  defaultDamageType: DamageTypeEnum,
  rangeMeters: z.number().positive(),
  damageTypeOverrides: z.array(UnarmedAttackDamageTypeOverrideSchema),
});

export const UNARMED_ATTACK_PROFILE = UnarmedAttackProfileSchema.parse({
  attackId: "builtin-unarmed-strike",
  label: "Ataque desarmado",
  sourceType: "unarmed",
  defaultDamageType: "bludgeoning",
  rangeMeters: 1.5,
  // Future-ready: species-specific overrides can be extended here without touching app code.
  damageTypeOverrides: [
    {
      specieId: "specie-lizardfolk",
      damageType: "slashing",
    },
  ],
});

export function resolveUnarmedAttackDamageType(specieId?: string | null) {
  if (typeof specieId !== "string" || specieId.trim().length === 0) {
    return UNARMED_ATTACK_PROFILE.defaultDamageType;
  }

  const normalizedSpecieId = specieId.trim().toLowerCase();
  const override = UNARMED_ATTACK_PROFILE.damageTypeOverrides.find(
    (entry) => entry.specieId === normalizedSpecieId,
  );
  return override?.damageType ?? UNARMED_ATTACK_PROFILE.defaultDamageType;
}
