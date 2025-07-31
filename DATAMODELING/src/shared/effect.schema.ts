// ============================================================================
// >> INÍCIO: src/shared/effect.schema.ts
// Este é o coração do sistema. Define todos os Efeitos.
// Os schemas Zod são a única fonte da verdade para a estrutura dos dados.
// ============================================================================

import { z } from "zod";
import {
  AcSchema,
  DamageFormulaSchema,
  DiceRollSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "./blocks.schema.js";
import { ActionIdEnum } from "../data/actions/actions.data.js";
import {
  AbilityScoreEnum,
  ActionParameterPaths,
  ArmorTypeEnum,
  ItemPropertyEnum,
  ScalablePropertyEnum,
  SkillEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives.js";
import { actionOutcomesSchema } from "./outcome.schema.js";
import { ActionParametersSchema } from "../domain/action/actions.schema.js";

// ============================================================================
// SEÇÃO: SCHEMAS DE EFEITOS INDIVIDUAIS
// Cada schema representa um tipo de efeito único no sistema.
// ============================================================================

// --- Efeitos Ativáveis ---

const ActivatableActionEffectSchema = z.object({
  type: z.literal("activatableAction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema).optional(),
  duration: DurationSchema.optional(),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
});

const ActivatableCastSpellEffectSchema = z.object({
  type: z.literal("activatableCastSpell"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
});

// --- Efeitos de Equipar/Empunhar ---

const OnEquipSetACEffectSchema = z.object({
  type: z.literal("onEquip_setAC"),
  armorType: ArmorTypeEnum,
  calculation: AcSchema,
});

const OnEquipImposeDisadvantageEffectSchema = z.object({
  type: z.literal("onEquip_imposeDisadvantage"),
  on: z.literal("skillCheck"),
  skill: SkillEnum,
});

const OnEquipProvidesContainerEffectSchema = z.object({
  type: z.literal("onEquip_providesContainer"),
  properties: z.object({
    capacity: z.object({ value: z.number(), unit: WeightUnitEnum }),
    volume: z.object({ value: z.number(), unit: z.string() }).optional(),
  }),
});

const OnWieldGrantWeaponAttackEffectSchema = z.object({
  type: z.literal("onWield_grantWeaponAttack"),
  weaponCategory: WeaponCategoryEnum,
  weaponType: WeaponTypeEnum,
  properties: z.array(WeaponPropertySchema),
  mastery: z.array(WeaponMasteryEnum),
  damage: z
    .object({
      primary: DamageFormulaSchema,
      versatile: DamageFormulaSchema.optional(),
    })
    .optional(),
  range: RangeSchema.optional(),
  outcomes: z.array(z.lazy(() => actionOutcomesSchema)).optional(),
  cost: z
    .object({
      amount: z.number(),
      source: z.enum(["inventory"]),
      resourceId: z.string(),
    })
    .optional(),
});

// --- Efeitos Passivos ---

const PassiveGrantAdvantageEffectSchema = z
  .object({
    type: z.literal("passive_grantAdvantage"),
    on: z.enum(["abilityCheck", "skillCheck", "savingThrow"]),
    ability: AbilityScoreEnum.optional(),
    skill: SkillEnum.optional(),
    condition: z.string().optional(),
    duration: DurationSchema.optional(),
  })
  .refine((data) => data.ability || data.skill || data.condition, {
    message: "Deve ter pelo menos ability, skill ou condition",
  });

const PassiveProvidesLightEffectSchema = z.object({
  type: z.literal("passive_providesLight"),
  properties: z.object({
    bright: z.number().int(),
    dim: z.number().int(),
    duration: DurationSchema.optional(),
  }),
});

const PassivePropertyEffectSchema = z.object({
  type: z.literal("passive_property"),
  property: ItemPropertyEnum,
  value: z.union([z.string(), z.number(), z.boolean()]),
});

const PassiveGrantBonusEffectSchema = z.object({
  type: z.literal("passive_grantBonus"),
  on: z.enum(["attackRoll", "damageRoll", "ac", "savingThrow"]),
  value: z.number().int(),
  condition: z.string().optional(),
});

// --- Efeitos de Buff/Debuff e Modificadores ---

const GrantConditionalBonusEffectSchema = z.object({
  type: z.literal("grantConditionalBonus"),
  on: z.enum(["abilityCheck", "skillCheck"]),
  modifier: DiceRollSchema,
  requiresChoice: z.enum(["skill"]),
  duration: DurationSchema.optional(),
});

const TriggeredModifierEffectSchema = z.object({
  type: z.literal("triggeredModifier"),
  trigger: z.enum([
    "onBeingAttacked",
    "onAttackRoll",
    "onDealingDamage",
    "onTakingDamage",
    "onSavingThrow",
  ]),
  modifier: z.object({
    operation: z.enum(["add", "subtract"]),
    dice: DiceRollSchema,
    target: z.enum(["attackRoll", "damageRoll", "saveRoll", "ac"]),
    appliesTo: z.enum(["self", "attacker", "targetCreature"]),
  }),
  duration: DurationSchema,
  requiresChoice: z.literal("damageType").optional(),
});

const PreventsHealingEffectSchema = z.object({
  type: z.literal("preventsHealing"),
  duration: DurationSchema,
});

const ImposeDisadvantageEffectSchema = z.object({
  type: z.literal("imposeDisadvantage"),
  on: z.enum(["attackRoll", "abilityCheck", "skillCheck", "savingThrow"]),
  count: z.number().int().positive().default(1),
  duration: DurationSchema,
});

const PreventsReactionEffectSchema = z.object({
  type: z.literal("preventsReaction"),
  duration: DurationSchema,
});

// --- Schemas de Escalonamento (usados nos efeitos acima) ---

const ModifyOutcomeFormulaRuleSchema = z.object({
  type: z.literal("modifyOutcomeFormula"),
  level: z.number().int(),
  outcomeId: z.string(),
  newFormula: DamageFormulaSchema,
});

const ModifyActionParameterRuleSchema = z.object({
  type: z.literal("modifyActionParameter"),
  level: z.number().int(),
  propertyPath: ActionParameterPaths,
  newValue: z.any(),
});

const SpellScalingRuleSchema = z.discriminatedUnion("type", [
  ModifyOutcomeFormulaRuleSchema,
  ModifyActionParameterRuleSchema,
]);

const SpellScalingSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("characterLevel"),
    rules: z.array(SpellScalingRuleSchema),
  }),
  z.object({
    type: z.literal("spellSlot"),
    perLevel: z.object({
      outcomeId: z.string(),
      targetProperty: ScalablePropertyEnum,
      value: z.number().int(),
    }),
  }),
]);

// ============================================================================
// SEÇÃO: UNIÕES DE SCHEMAS E TIPOS FINAIS
// Agrupamos os schemas individuais em uniões para criar os tipos finais.
// ============================================================================

// --- Schema para TODOS os efeitos possíveis ---
export const effectSchema = z.discriminatedUnion("type", [
  ActivatableActionEffectSchema,
  ActivatableCastSpellEffectSchema,
  OnEquipSetACEffectSchema,
  OnEquipImposeDisadvantageEffectSchema,
  OnEquipProvidesContainerEffectSchema,
  OnWieldGrantWeaponAttackEffectSchema,
  PassiveGrantAdvantageEffectSchema,
  PassiveProvidesLightEffectSchema,
  PassivePropertyEffectSchema,
  PassiveGrantBonusEffectSchema,
  GrantConditionalBonusEffectSchema,
  TriggeredModifierEffectSchema,
  PreventsHealingEffectSchema,
  ImposeDisadvantageEffectSchema,
  PreventsReactionEffectSchema,
]);

// --- Schema para efeitos que podem ser APLICADOS a um alvo (ex: um buff) ---
export const applicableEffectSchema = z.discriminatedUnion("type", [
  ActivatableActionEffectSchema,
  GrantConditionalBonusEffectSchema,
  ImposeDisadvantageEffectSchema,
  PassiveGrantAdvantageEffectSchema,
  PassiveProvidesLightEffectSchema,
  PreventsHealingEffectSchema,
  PreventsReactionEffectSchema,
  TriggeredModifierEffectSchema,
]);

// --- Tipos Finais (Inferidos) ---
// Os tipos TypeScript são gerados automaticamente a partir dos schemas,
// eliminando a necessidade de interfaces manuais.
export type EffectType = z.infer<typeof effectSchema>;
export type ApplicableEffectType = z.infer<typeof applicableEffectSchema>;
