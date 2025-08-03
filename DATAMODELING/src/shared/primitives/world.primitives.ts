// ============================================================================
// PRIMITIVOS DE MEDIDA E AMBIENTE
// Proposta: Mover para 'world.primitives.ts'
// ============================================================================

import z from "zod";

export const DurationUnitEnum = z.enum([
  "round",
  "minute",
  "hour",
  "day",
  "turn",
  "instantaneous",
  "special",
  "indefinite",
]);

export const DistanceUnitEnum = z.enum(["ft", "mile"]);

export const SurfaceTypeEnum = z.enum([
  "fire",
  "ice",
  "acid",
  "grease",
  "water",
  "web",
  "darkness",
]);

export const SourceEnum = z.enum(["LDJ2024"]);

export const MagicSchoolEnum = z.enum([
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation",
]);

export const SpellComponentEnum = z.enum(["verbal", "somatic", "material"]);
