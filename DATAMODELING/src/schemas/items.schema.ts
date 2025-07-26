import { z } from "zod";
import {
  CostUnitEnum,
  WeightUnitEnum,
  ArmorTypeEnum,
  RarityEnum,
  SourceEnum,
} from "./primitives.js";
import { RequirementSchema } from "./blocks.schema.js";
import { EffectSchema } from "./effects.schema.js";

const BaseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  source: SourceEnum,
  page: z.number(),
  type: z.string(),
  rarity: RarityEnum,
  requiresAttunement: z.boolean().default(false).optional(),
  description: z.string().optional(),
  weight: z.object({ value: z.number(), unit: WeightUnitEnum }),
  price: z.object({ quantity: z.number(), unit: CostUnitEnum }).optional(),
  requirements: z.array(RequirementSchema).optional(),
  effects: z.array(EffectSchema),
});

const GearItemSchema = BaseItemSchema.extend({ type: z.literal("gear") });
const ToolItemSchema = BaseItemSchema.extend({ type: z.literal("tool") });
const ArmorItemSchema = BaseItemSchema.extend({
  type: z.literal("armor"),
  armorType: ArmorTypeEnum,
});
const WeaponItemSchema = BaseItemSchema.extend({ type: z.literal("weapon") });

export const ItemSchema = z.discriminatedUnion("type", [
  GearItemSchema,
  ToolItemSchema,
  WeaponItemSchema,
  ArmorItemSchema,
]);

export const FinalItemDataSchema = z.array(ItemSchema);
