// ============================================================================
// >> INÍCIO: src/shared/effect.schema.ts
// Este é o coração do sistema. Define todos os Efeitos.
// Os schemas Zod são a única fonte da verdade para a estrutura dos dados.
// ============================================================================

import { z } from "zod";
import {
  AcSchema,
  AdditionalRulesSchema, // Assumindo que este schema foi importado
  DamageFormulaSchema,
  DiceRollSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "./blocks.schema.js";
import { ActionIdEnum } from "../data/actions/actions.data.js";
import {
  AbilityScoreEnum,
  ArmorTypeEnum,
  DamageTypeEnum,
  ItemPropertyEnum,
  OutcomeParameterPaths,
  RootParameterPaths,
  SkillEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives.js";
import { actionOutcomesSchema } from "./outcome.schema.js";
import { ActionParametersSchema } from "../domain/action/actions.schema.js";

// ============================================================================
// SEÇÃO: CONDIÇÕES DE TÉRMINO E SCHEMA BASE
// ============================================================================

// 1. Schemas para Condições de Término (Automatizáveis)
// Define gatilhos estruturados para que um VTT saiba quando remover um efeito.

const EndOnTakingDamageConditionSchema = z.object({
  trigger: z.literal("onTakingDamage"),
  from: z.array(z.enum(["caster", "casterAllies", "any"])).optional(),
  damageType: z.array(DamageTypeEnum).optional(),
});

const EndOnCastingAgainConditionSchema = z.object({
  trigger: z.literal("onCastingSpellAgain"),
});

const EndOnLoseConcentration = z.object({
  trigger: z.literal("onLoseConcentration"),
});

// União de todas as possíveis condições de término.
const EndConditionSchema = z.discriminatedUnion("trigger", [
  EndOnTakingDamageConditionSchema,
  EndOnCastingAgainConditionSchema,
  EndOnLoseConcentration,
]);

// 2. O Schema Base
// Define propriedades comuns a TODOS os efeitos, evitando repetição.
const BaseEffectSchema = z.object({
  // Para regras que podem ser automatizadas por um VTT.
  endConditions: z.array(EndConditionSchema).optional(),
  // Para regras puramente textuais que não podem ser automatizadas.
  additionalRules: z.array(AdditionalRulesSchema).optional(),
});

// ============================================================================
// SEÇÃO: SCHEMAS DE EFEITOS INDIVIDUAIS
// Cada schema estende o BaseEffectSchema, herdando suas propriedades.
// ============================================================================

// --- Efeitos Ativáveis ---

const ActivatableActionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("activatableAction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema).optional(),
  duration: DurationSchema.optional(),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
});

const ActivatableCastSpellEffectSchema = BaseEffectSchema.extend({
  type: z.literal("activatableCastSpell"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
});

// --- Efeitos de Equipar/Empunhar ---

const OnEquipSetACEffectSchema = BaseEffectSchema.extend({
  type: z.literal("onEquip_setAC"),
  armorType: ArmorTypeEnum,
  calculation: AcSchema,
});

const OnEquipImposeDisadvantageEffectSchema = BaseEffectSchema.extend({
  type: z.literal("onEquip_imposeDisadvantage"),
  on: z.literal("skillCheck"),
  skill: SkillEnum,
});

const OnEquipProvidesContainerEffectSchema = BaseEffectSchema.extend({
  type: z.literal("onEquip_providesContainer"),
  properties: z.object({
    capacity: z.object({ value: z.number(), unit: WeightUnitEnum }),
    volume: z.object({ value: z.number(), unit: z.string() }).optional(),
  }),
});

const OnWieldGrantWeaponAttackEffectSchema = BaseEffectSchema.extend({
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

const PassiveGrantAdvantageEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_grantAdvantage"),
  on: z.enum(["abilityCheck", "skillCheck", "savingThrow"]),
  ability: AbilityScoreEnum.optional(),
  skill: SkillEnum.optional(),
  condition: z.string().optional(),
  duration: DurationSchema.optional(),
}).refine((data) => data.ability || data.skill || data.condition, {
  message: "Deve ter pelo menos ability, skill ou condition",
});

const PassiveProvidesLightEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_providesLight"),
  properties: z.object({
    bright: z.number().int(),
    dim: z.number().int(),
    duration: DurationSchema.optional(),
  }),
});

const PassivePropertyEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_property"),
  property: ItemPropertyEnum,
  value: z.union([z.string(), z.number(), z.boolean()]),
});

const PassiveGrantBonusEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_grantBonus"),
  on: z.enum(["attackRoll", "damageRoll", "ac", "savingThrow"]),
  value: z.number().int(),
  condition: z.string().optional(),
});

// --- Efeitos de Buff/Debuff e Modificadores ---

const GrantConditionalBonusEffectSchema = BaseEffectSchema.extend({
  type: z.literal("grantConditionalBonus"),
  on: z.enum(["abilityCheck", "skillCheck"]),
  modifier: DiceRollSchema,
  requiresChoice: z.enum(["skill"]),
  duration: DurationSchema.optional(),
});

const TriggeredModifierEffectSchema = BaseEffectSchema.extend({
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
  duration: DurationSchema.optional(),
  requiresChoice: z.literal("damageType").optional(),
});

const PreventsHealingEffectSchema = BaseEffectSchema.extend({
  type: z.literal("preventsHealing"),
  duration: DurationSchema,
});

const ImposeDisadvantageEffectSchema = BaseEffectSchema.extend({
  type: z.literal("imposeDisadvantage"),
  on: z.enum(["attackRoll", "abilityCheck", "skillCheck", "savingThrow"]),
  count: z.number().int().positive().default(1),
  duration: DurationSchema,
});

const PreventsReactionEffectSchema = BaseEffectSchema.extend({
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
  propertyPath: RootParameterPaths,
  newValue: z.any(),
});

const IncrementActionParameterRuleSchema = z.object({
  type: z.literal("incrementRootParameter"),
  propertyPath: RootParameterPaths,
  increment: z.number().default(1),
});

export const IncrementOutcomePropertyRuleSchema = z.object({
  type: z.literal("incrementOutcomeProperty"),
  outcomeId: z.string().min(1, {
    message: "É necessário especificar o ID do outcome a ser modificado.",
  }),
  propertyPath: OutcomeParameterPaths,
  increment: z.number().int().default(1),
});

const SpellScalingRuleSchema = z.discriminatedUnion("type", [
  ModifyOutcomeFormulaRuleSchema,
  ModifyActionParameterRuleSchema,
  IncrementActionParameterRuleSchema,
  IncrementOutcomePropertyRuleSchema,
]);

const SpellScalingSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("characterLevel"),
    rules: z.array(SpellScalingRuleSchema),
  }),
  z.object({
    type: z.literal("spellSlot"),
    rules: z.array(SpellScalingRuleSchema),
  }),
]);

// ============================================================================
// SEÇÃO: UNIÕES DE SCHEMAS E TIPOS FINAIS
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
export type EffectType = z.infer<typeof effectSchema>;
export type ApplicableEffectType = z.infer<typeof applicableEffectSchema>;
