// ============================================================================
// >> INÍCIO: src/domain/shared/effect.schema.ts
// Este é o coração do sistema. Define todos os Efeitos.
// Ele depende de Ações e Outcomes.
// ============================================================================

// --- Importações necessárias para este arquivo ---
import { z } from "zod";
import {
  AcSchema,
  DamageFormulaSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "../shared/blocks.schema.js";
import { ActionIdEnum } from "../domain/action/actions.data.js";
import {
  AbilityScoreEnum,
  ItemPropertyEnum,
  ScalablePropertyEnum,
  SkillEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives.js";
import { actionOutcomesSchema, ActionOutcomeType } from "./outcome.schema.js";
import {
  actionParametersSchema,
  ActionParametersType,
} from "./actions.schema.js";

interface OnEquipSetACEffectType {
  type: "onEquip_setAC";
  calculation: z.infer<typeof AcSchema>;
}
interface OnEquipImposeDisadvantageEffectType {
  type: "onEquip_imposeDisadvantage";
  on: "skillCheck";
  skill: z.infer<typeof SkillEnum>;
}
interface OnEquipProvidesContainerEffectType {
  type: "onEquip_providesContainer";
  properties: {
    capacity: { value: number; unit: z.infer<typeof WeightUnitEnum> };
    volume?: { value: number; unit: string };
  };
}
interface OnWieldGrantWeaponAttackEffectType {
  type: "onWield_grantWeaponAttack";
  weaponCategory: z.infer<typeof WeaponCategoryEnum>;
  weaponType: z.infer<typeof WeaponTypeEnum>;
  properties: z.infer<typeof WeaponPropertySchema>[];
  mastery: z.infer<typeof WeaponMasteryEnum>[];
  damage?: {
    primary: z.infer<typeof DamageFormulaSchema>;
    versatile?: z.infer<typeof DamageFormulaSchema>;
  };
  range?: z.infer<typeof RangeSchema>;
  outcomes?: ActionOutcomeType[];
  cost?: { amount: number; source: "inventory"; resourceId: string };
}
interface PassiveGrantAdvantageEffectType {
  type: "passive_grantAdvantage";
  on: "abilityCheck" | "skillCheck" | "savingThrow";
  ability?: z.infer<typeof AbilityScoreEnum>;
  skill?: z.infer<typeof SkillEnum>;
  condition?: string;
}
interface PassiveProvidesLightEffectType {
  type: "passive_providesLight";
  properties: {
    bright: number;
    dim: number;
    duration?: z.infer<typeof DurationSchema>;
  };
}
interface PassivePropertyEffectType {
  type: "passive_property";
  property: z.infer<typeof ItemPropertyEnum>;
  value: string | number | boolean;
}
interface PassiveGrantBonusEffectType {
  type: "passive_grantBonus";
  on: "attackRoll" | "damageRoll" | "ac" | "savingThrow";
  value: number;
  condition?: string;
}
interface TriggeredModifierEffectType {
  type: "triggeredModifier";
  trigger:
    | "onBeingAttacked"
    | "onAttackRoll"
    | "onDealingDamage"
    | "onTakingDamage"
    | "onSavingThrow";
  modifier: {
    dice: string;
    target: "attackRoll" | "damageRoll" | "saveRoll" | "ac";
    appliesTo: "self" | "attacker" | "targetCreature";
  };
  duration: z.infer<typeof DurationSchema>;
}
interface PreventsHealingEffectType {
  type: "preventsHealing";
  duration: z.infer<typeof DurationSchema>;
}
interface ActivatableActionEffectType {
  type: "activatableAction";
  actionId: z.infer<typeof ActionIdEnum>;
  parameters?: ActionParametersType;
  duration?: z.infer<typeof DurationSchema>;
}
interface ActivatableCastSpellEffectType {
  type: "activatableCastSpell";
  actionId: z.infer<typeof ActionIdEnum>;
  parameters: ActionParametersType;
  scaling?: z.infer<typeof SpellScalingSchema>;
}

export type EffectType =
  | OnEquipSetACEffectType
  | OnEquipImposeDisadvantageEffectType
  | OnEquipProvidesContainerEffectType
  | OnWieldGrantWeaponAttackEffectType
  | PassiveGrantAdvantageEffectType
  | PassiveProvidesLightEffectType
  | PassivePropertyEffectType
  | PassiveGrantBonusEffectType
  | TriggeredModifierEffectType
  | PreventsHealingEffectType
  | ActivatableActionEffectType
  | ActivatableCastSpellEffectType;

const SpellScalingRuleSchema = z.object({
  level: z.number().int(),
  outcomeId: z.string(),
  newFormula: DamageFormulaSchema,
});
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
const OnEquipSetACEffectSchema = z.object({
  type: z.literal("onEquip_setAC"),
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
const PassiveGrantAdvantageEffectSchema = z
  .object({
    type: z.literal("passive_grantAdvantage"),
    on: z.enum(["abilityCheck", "skillCheck", "savingThrow"]),
    ability: AbilityScoreEnum.optional(),
    skill: SkillEnum.optional(),
    condition: z.string().optional(),
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
    dice: z.string().regex(/^-?\d+d\d+(\+\d+)?$/),
    target: z.enum(["attackRoll", "damageRoll", "saveRoll", "ac"]),
    appliesTo: z.enum(["self", "attacker", "targetCreature"]),
  }),
  duration: DurationSchema,
});
const PreventsHealingEffectSchema = z.object({
  type: z.literal("preventsHealing"),
  duration: DurationSchema,
});

const ActivatableActionEffectSchema = z.object({
  type: z.literal("activatableAction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => actionParametersSchema).optional(),
  duration: DurationSchema.optional(),
});
const ActivatableCastSpellEffectSchema = z.object({
  type: z.literal("activatableCastSpell"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => actionParametersSchema),
  scaling: SpellScalingSchema.optional(),
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

export const effectSchema: z.ZodType<EffectType> = z.discriminatedUnion(
  "type",
  [
    OnEquipSetACEffectSchema,
    OnEquipImposeDisadvantageEffectSchema,
    OnEquipProvidesContainerEffectSchema,
    OnWieldGrantWeaponAttackEffectSchema,
    PassiveGrantAdvantageEffectSchema,
    PassiveProvidesLightEffectSchema,
    PassivePropertyEffectSchema,
    PassiveGrantBonusEffectSchema,
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
    ActivatableActionEffectSchema,
    ActivatableCastSpellEffectSchema,
  ]
);
export const applicableEffectSchema: z.ZodType<EffectType> =
  z.discriminatedUnion("type", [
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
    ActivatableActionEffectSchema,
  ]);

export type Effect = z.infer<typeof effectSchema>;
export type ApplicableEffect = z.infer<typeof applicableEffectSchema>;

// ============================================================================
// >> FIM: src/domain/shared/effect.schema.ts
// ============================================================================
