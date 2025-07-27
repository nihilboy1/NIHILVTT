import { z } from "zod";
import {
  CostUnitEnum,
  WeightUnitEnum,
  ArmorTypeEnum,
  RarityEnum,
  SourceEnum,
  ItemTypeEnum,
} from "../../shared/primitives.js";
import { RequirementSchema } from "../../shared/blocks.schema.js";
import { Schemas } from "../schemas.js";

const BaseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  source: SourceEnum,
  page: z.number(),
  type: ItemTypeEnum, // Agora usa o enum
  rarity: RarityEnum,
  requiresAttunement: z.boolean().default(false).optional(),
  description: z.string().optional(),
  weight: z.object({ value: z.number(), unit: WeightUnitEnum }),
  price: z.object({ quantity: z.number(), unit: CostUnitEnum }).optional(),
  requirements: z.array(RequirementSchema).optional(),
  effects: z.array(Schemas.effects),
});

const GearItemSchema = BaseItemSchema.extend({ type: z.literal("gear") });
const ToolItemSchema = BaseItemSchema.extend({ type: z.literal("tool") });
const ArmorItemSchema = BaseItemSchema.extend({
  type: z.literal("armor"),
  armorType: ArmorTypeEnum,
}).refine((item) => item.effects.some((e) => e.type === "onEquip_setAC"), {
  message:
    "Itens do tipo 'armor' devem ter um efeito 'onEquip_setAC' para definir a Classe de Armadura.",
});
const WeaponItemSchema = BaseItemSchema.extend({
  type: z.literal("weapon"),
}).refine(
  (item) => item.effects.some((e) => e.type === "onWield_grantWeaponAttack"),
  {
    message:
      "Itens do tipo 'weapon' devem ter pelo menos um efeito 'onWield_grantWeaponAttack'.",
  }
);

export const ItemSchema = z.discriminatedUnion("type", [
  GearItemSchema,
  ToolItemSchema,
  WeaponItemSchema,
  ArmorItemSchema,
]);

export const FinalItemDataSchema = z.array(ItemSchema);
