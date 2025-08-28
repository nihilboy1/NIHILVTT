import z from "zod";
import { DistanceUnitEnum } from "./primitives/world.primitives";
import { AttackSourceEnum, CoverEnum, DamageTypeEnum } from "./primitives/combat.primitives";
import { CreatureTypeEnum } from "./primitives/system.primitives";
import { AbilityScoreEnum } from "./primitives/character.primitives";

export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

export const AttackTypeSchema = z.object({
  range: z.enum(["melee", "ranged"]),
  source: AttackSourceEnum,
  handsInUse: z.enum(["one", "two", "any"]).default("any"),
});

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({
    type: z.literal("selfArea"),
    selective: z.boolean().default(false).optional(),
    excludeSelf: z.boolean().default(false).optional(),
  }),
  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
    creatureTypes: z.array(CreatureTypeEnum).optional(),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("weapon"),
    quantity: z.number().int().default(1),
    properties: z.array(DamageTypeEnum).optional(),
  }),
  z.object({ type: z.literal("point") }),
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

export const DcSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("fixed"),
    value: z.number().int(),
    attributes: z
      .array(
        AbilityScoreEnum.or(z.literal("proficiency")).or(
          z.literal("spellcasting"),
        ),
      )
      .optional(),
  }),
  z.object({
    type: z.literal("calculated"),
    base: z.number().int(),
    attributes: z.array(
      AbilityScoreEnum.or(z.literal("proficiency")).or(
        z.literal("spellcasting"),
      ),
    ),
  }),
]);



export const SavingThrowSchema = z.object({
  ability: AbilityScoreEnum,
  dc: DcSchema,
  ignoreCovers: z.array(CoverEnum).optional(),
});