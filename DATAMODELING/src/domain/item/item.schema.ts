import { z } from "zod";
import { EffectSchema } from "../../shared/effect.schema.js";
import {
  CostUnitEnum,
  ItemTypeEnum,
  RarityEnum,
  WeightUnitEnum,
} from "../../shared/primitives/item.primitives.js";
import { SourceEnum } from "../../shared/primitives/system.primitives.js";
import { RequirementSchema } from "../../shared/game-events.schema.js";

const BaseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).array(),
  source: SourceEnum,
  page: z.number(),
  type: ItemTypeEnum,
  rarity: RarityEnum,
  requiresAttunement: z.boolean().default(false).optional(),
  description: z.string().optional(),
  weight: z.object({ value: z.number(), unit: WeightUnitEnum }),
  price: z.object({ quantity: z.number(), unit: CostUnitEnum }).optional(),
  requirements: RequirementSchema.optional(),
  effects: z.array(EffectSchema),
});

const GearItemSchema = BaseItemSchema.extend({ type: z.literal("gear") });

const ToolItemSchema = BaseItemSchema.extend({ type: z.literal("tool") });

const ArmorItemSchema = BaseItemSchema.extend({
  type: z.literal("armor"),
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
  },
);

export const ItemSchema = z.discriminatedUnion("type", [
  GearItemSchema,
  ToolItemSchema,
  WeaponItemSchema,
  ArmorItemSchema,
]);

export type Item = z.infer<typeof ItemSchema>;

export const FinalItemDataSchema = z.array(ItemSchema);
