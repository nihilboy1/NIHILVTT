import { z } from "zod";
// Importando nossos tipos e schemas já existentes
import {
  CostUnitEnum,
  WeightUnitEnum,
  ArmorTypeEnum,
  RarityEnum,
  SourceEnum,
  ItemTypeEnum,
} from "../../shared/primitives.js";
import { RequirementSchema } from "../../shared/blocks.schema.js";
import { effectSchema, EffectType } from "../../shared/effect.schema.js";
// A MÁGICA ACONTECE AQUI: Reutilizamos o schema de efeitos que já criamos!
// CORREÇÃO: Ajustando o caminho para o arquivo de schema principal, conforme o padrão anterior.

// ============================================================================
// PASSO 1: DECLARAR OS TIPOS FINAIS (INTERFACES)
// ============================================================================

// --- Tipo Base para todos os Itens ---
interface BaseItemType {
  id: string;
  name: string[];
  source: z.infer<typeof SourceEnum>;
  page: number;
  type: z.infer<typeof ItemTypeEnum>;
  rarity: z.infer<typeof RarityEnum>;
  requiresAttunement?: boolean;
  description?: string;
  weight: { value: number; unit: z.infer<typeof WeightUnitEnum> };
  price?: { quantity: number; unit: z.infer<typeof CostUnitEnum> };
  requirements?: z.infer<typeof RequirementSchema>[];
  effects: EffectType[];
}

// --- Tipos Específicos ---
interface GearItemType extends BaseItemType {
  type: 'gear';
}

interface ToolItemType extends BaseItemType {
  type: 'tool';
}

interface ArmorItemType extends BaseItemType {
  type: 'armor';
  armorType: z.infer<typeof ArmorTypeEnum>;
}

interface WeaponItemType extends BaseItemType {
  type: 'weapon';
}

// O tipo final do Item é uma união de todos os tipos específicos.
type ItemTypeUnion = GearItemType | ToolItemType | ArmorItemType | WeaponItemType;


// ============================================================================
// PASSO 2 & 3: DEFINIR E UNIR OS SCHEMAS ZOD
// ============================================================================

// --- Schema Base ---
// Propriedades que TODOS os itens compartilham.
// Este é o seu schema original, que já era excelente.
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
  requirements: z.array(RequirementSchema).optional(),
  // A conexão crucial: um item pode ter uma lista de efeitos.
  effects: z.array(effectSchema),
});

// --- Schemas Específicos ---
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

// --- Schema Final ---
// Unimos tudo com a união discriminada e aplicamos o tipo da nossa interface
// para garantir o autocomplete.
export const ItemSchema: z.ZodType<ItemTypeUnion> = z.discriminatedUnion("type", [
  GearItemSchema,
  ToolItemSchema,
  WeaponItemSchema,
  ArmorItemSchema,
]);


// ============================================================================
// EXPORTS FINAIS
// ============================================================================

// Exportamos o schema principal e o tipo inferido para uso na aplicação.
export type Item = z.infer<typeof ItemSchema>;
export const FinalItemDataSchema = z.array(ItemSchema);
