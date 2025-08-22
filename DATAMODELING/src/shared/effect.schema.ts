import { z } from "zod";
import {
  AcSchema,
  AreaSchema,
  DcSchema,
  DiceRollSchema,
  DurationSchema,
  GameEventSchema,
  HPFormulaSchema,
  RangeSchema,
  RequirementSchema,
} from "./blocks.schema.js";
import { ActionIdEnum } from "../shared/data-based-enums.js";
import { ActionOutcomesSchema } from "./outcome.schema.js";
import { ActionParametersSchema } from "../domain/action/actions.schema.js";
import {
  OutcomeParameterPaths,
  RootParameterPaths,
} from "../shared/data-based-enums.js";

import {
  ArmorTypeEnum,
  ItemPropertyEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponPropertyEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives/item.primitives.js";
import {
  AbilityScoreEnum,
  SkillEnum,
} from "./primitives/character.primitives.js";
import { ConditionStatusEnum } from "./primitives/system.primitives.js";

const ChainedEffectSchema = z.object({
  triggers: GameEventSchema,
  area: AreaSchema.optional(),
  save: DcSchema.optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
});

const BaseEffectSchema = z.object({
  endConditions: GameEventSchema.optional(),
  chainedEffects: z.array(ChainedEffectSchema).optional(),
  name: z.string().min(1).max(100)
});

const ReactionActionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("reaction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema).optional(),
  duration: DurationSchema.optional(),
});

const ActivatableActionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("activatableAction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema).optional(),
  duration: DurationSchema.optional(),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
});

const MultiAttackActionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("multiAttack"),
  amount: z.number().min(1),
  attacksName: z.array(z.string()),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema).optional(),
});

const ActivatableCastSpellEffectSchema = BaseEffectSchema.extend({
  type: z.literal("activatableCastSpell"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => ActionParametersSchema),
  scaling: z.lazy(() => SpellScalingSchema).optional(),
  requirements: RequirementSchema.optional(),
});

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
  properties: WeaponPropertyEnum.array().optional(),
  mastery: z.array(WeaponMasteryEnum),
  damageFormulas: z
    .object({
      primary: HPFormulaSchema,
      versatile: HPFormulaSchema.optional(),
    })
    .optional(),
  range: RangeSchema.optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
  cost: z
    .object({
      amount: z.number(),
      source: z.enum(["inventory"]),
      resourceId: z.string(),
    })
    .optional(),
});

const PassiveGrantAdvantageEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_grantAdvantage"),
  on: z.enum(["abilityCheck", "skillCheck", "savingThrow", "attackRoll"]),
  ability: AbilityScoreEnum.optional(),
  skill: SkillEnum.optional(),

  triggers: GameEventSchema.optional(),
  appliesToActions: ActionIdEnum.array().optional(),
  duration: DurationSchema.optional(),
}).refine((data) => data.ability || data.skill || data.triggers, {
  message: "Deve ter pelo menos ability, skill ou condition",
});

const PassiveProvidesLightEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_providesLight"),
  properties: z.object({
    bright: z.number().int().optional(),
    dim: z.number().int().optional(),
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
  on: z.enum(["attackRoll", "damageRoll", "ac", "savingThrow", "action"]),
  appliesToActions: ActionIdEnum.array().optional(),
  value: z.number().int().or(z.literal("proficiency")),
  condition: z.string().optional(),
  duration: DurationSchema.optional(),
});

const PreventsConditionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("preventsCondition"),
  condition: ConditionStatusEnum,
  duration: DurationSchema,
});

const GrantConditionalBonusEffectSchema = BaseEffectSchema.extend({
  type: z.literal("grantConditionalBonus"),
  on: z.enum(["abilityCheck", "skillCheck"]),
  modifier: DiceRollSchema,
  requiresChoice: z.enum(["skill"]),
  duration: DurationSchema.optional(),
});

export const TriggeredEffectSchema = BaseEffectSchema.extend({
  type: z.literal("triggeredEffect"),

  triggers: GameEventSchema,
  save: DcSchema.optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
  parameters: z.lazy(() => ActionParametersSchema).optional(),

  duration: DurationSchema.optional(),
});

const TriggeredModifierEffectSchema = BaseEffectSchema.extend({
  type: z.literal("triggeredModifier"),

  triggers: GameEventSchema.optional(),
  modifier: z.object({
    operation: z.enum(["add", "subtract"]),
    dice: DiceRollSchema,
    target: z.enum(["attackRoll", "damageRoll", "saveRoll", "ac"]).array(),
    appliesTo: z.enum(["self", "target", "attacker"]),
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
  count: z.number().int().positive().default(1).optional(),
  duration: DurationSchema,
});

const PreventsReactionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("preventsReaction"),
  duration: DurationSchema,
});

const ModifyOutcomeFormulaRuleSchema = z.object({
  type: z.literal("modifyOutcomeFormula"),
  level: z.number().int(),
  outcomeId: z.string(),
  newFormula: HPFormulaSchema,
});

const ModifyActionParameterRuleSchema = z.object({
  type: z.literal("modifyActionParameter"),
  level: z.number().int(),
  propertyPath: RootParameterPaths,
  newValue: z.any(),
});

const DescriptiveRuleSchema = z.object({
  type: z.literal("descriptive"),
  details: z.string(),
});

const IncrementActionParameterRuleSchema = z.object({
  type: z.literal("incrementRootParameter"),
  propertyPath: RootParameterPaths,
  increment: z.number().default(1),
});

export const IncrementOutcomePropertyRuleSchema = z.object({
  type: z.literal("incrementOutcomeProperty"),
  level: z.number().optional(),
  outcomeId: z.string().min(1, {
    message: "É necessário especificar o ID do outcome a ser modificado.",
  }),
  propertyPath: OutcomeParameterPaths,
  increment: z.number().int().default(1),
});

const IncrementChainedEffectPropertyRuleSchema = z.object({
  type: z.literal("incrementChainedEffectProperty"),
  chainedEffectIndex: z.number().int().default(0),
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
  IncrementChainedEffectPropertyRuleSchema,
  DescriptiveRuleSchema,
]);

export type SpellScalingRuleType = z.infer<typeof SpellScalingRuleSchema>;

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

export const EffectSchema = z.discriminatedUnion("type", [
  ReactionActionEffectSchema,
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
  MultiAttackActionEffectSchema,
  PreventsReactionEffectSchema,
  TriggeredEffectSchema,
  PreventsConditionEffectSchema,
]);

export const ApplicableEffectSchema = z.discriminatedUnion("type", [
  ReactionActionEffectSchema,
  ActivatableActionEffectSchema,
  GrantConditionalBonusEffectSchema,
  ImposeDisadvantageEffectSchema,
  PassiveGrantAdvantageEffectSchema,
  PassiveProvidesLightEffectSchema,
  PassiveGrantBonusEffectSchema,
  PreventsHealingEffectSchema,
  PreventsReactionEffectSchema,
  TriggeredModifierEffectSchema,
  TriggeredEffectSchema,
  PreventsConditionEffectSchema,
]);

export type EffectType = z.infer<typeof EffectSchema>;

export type ApplicableEffectType = z.infer<typeof ApplicableEffectSchema>;
