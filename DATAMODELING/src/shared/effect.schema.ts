// ============================================================================
// >> INÍCIO: src/shared/effect.schema.ts
// Este é o coração do sistema. Define todos os Efeitos.
// Ele depende de Ações e Outcomes.
// ============================================================================

// --- Importações necessárias para este arquivo ---
import { z } from "zod";
import {
  AcSchema,
  DamageFormulaSchema,
  DiceRollSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "./blocks.schema.js";
const ActionIdEnum = z.string(); // Usando um placeholder seguro

import {
  AbilityScoreEnum,
  ActionParameterPaths, // <-- Sua alteração mantida
  ItemPropertyEnum,
  ScalablePropertyEnum,
  SkillEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives.js"; // <-- Sua alteração mantida
import { actionOutcomesSchema, ActionOutcomeType } from "./outcome.schema.js";
import {
  actionParametersSchema,
  ActionParametersType,
} from "./actions.schema.js";

// ============================================================================
// INTERFACES DE TIPO
// ============================================================================

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
interface GrantConditionalBonusEffectType {
  type: "grantConditionalBonus";
  on: "abilityCheck" | "skillCheck";
  modifier: z.infer<typeof DiceRollSchema>; // <-- ALTERADO de string para DiceRollSchema
  requiresChoice: "skill";
  duration: z.infer<typeof DurationSchema>;
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
    operation: "add" | "subtract"; // <-- NOVA PROPRIEDADE
    dice: z.infer<typeof DiceRollSchema>; // <-- MUDOU DE string PARA DiceRollSchema
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
  | GrantConditionalBonusEffectType
  | ActivatableActionEffectType
  | ActivatableCastSpellEffectType;

// Definindo o tipo explícito para 'ApplicableEffect'
export type ApplicableEffectType =
  | TriggeredModifierEffectType
  | PreventsHealingEffectType
  | ActivatableActionEffectType
  | GrantConditionalBonusEffectType;

// ============================================================================
// SCHEMAS ZOD
// ============================================================================

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

const GrantConditionalBonusEffectSchema = z.object({
  type: z.literal("grantConditionalBonus"),
  on: z.enum(["abilityCheck", "skillCheck"]),
  modifier: DiceRollSchema, // ex: "1d4"
  requiresChoice: z.enum(["skill"]),
  duration: DurationSchema,
});

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
    operation: z.enum(["add", "subtract"]), // <-- NOVA PROPRIEDADE
    dice: DiceRollSchema, // <-- MUDOU DE z.string() PARA DiceRollSchema
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
    GrantConditionalBonusEffectSchema,
    ActivatableCastSpellEffectSchema,
  ]
);

// CORREÇÃO: Usando o tipo explícito que definimos no início do arquivo.
export const applicableEffectSchema: z.ZodType<ApplicableEffectType> =
  z.discriminatedUnion("type", [
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
    ActivatableActionEffectSchema,
    GrantConditionalBonusEffectSchema,
  ]);

export type Effect = z.infer<typeof effectSchema>;
export type ApplicableEffect = z.infer<typeof applicableEffectSchema>;

// ============================================================================
// >> FIM: src/shared/effect.schema.ts
// ============================================================================
