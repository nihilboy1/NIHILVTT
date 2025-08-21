// ============================================================================
// PRIMITIVOS DE MEDIDA E AMBIENTE
// Proposta: Mover para 'world.primitives.ts'
// ============================================================================

export const TemplateType = z.enum(["areaOfEffect", "Token"]);

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
  "darkness",
  "acid",
  "grease",
  "water",
  "web",
  "fog",
  "oil",
  "ballBearings",
  "caltrops",
]);
