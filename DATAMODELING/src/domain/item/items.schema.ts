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
import { effectSchema } from "../../shared/effect.schema.js";

// 1. O schema base continua o mesmo, definindo as propriedades comuns a todos os itens.
const BaseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).array(),
  source: SourceEnum,
  page: z.number(),
  type: ItemTypeEnum, // O tipo genérico que será especializado abaixo
  rarity: RarityEnum,
  requiresAttunement: z.boolean().default(false).optional(),
  description: z.string().optional(),
  weight: z.object({ value: z.number(), unit: WeightUnitEnum }),
  price: z.object({ quantity: z.number(), unit: CostUnitEnum }).optional(),
  requirements: z.array(RequirementSchema).optional(),
  effects: z.array(effectSchema),
});

// 2. Schemas específicos que estendem o base, cada um com seu tipo literal.
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
  }
);

// 3. Schema final: a união discriminada. O Zod infere a união de tipos automaticamente.
export const ItemSchema = z.discriminatedUnion("type", [
  GearItemSchema,
  ToolItemSchema,
  WeaponItemSchema,
  ArmorItemSchema,
]);

// 4. Tipos finais: inferidos diretamente do schema final, sem passos intermediários.
export type Item = z.infer<typeof ItemSchema>;
export const FinalItemDataSchema = z.array(ItemSchema);
