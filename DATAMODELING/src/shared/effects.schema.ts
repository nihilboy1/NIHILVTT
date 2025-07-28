import { z, ZodType } from "zod";
import {
  AcSchema,
  DamageFormulaSchema,
  DurationSchema,
  RangeSchema,
  WeaponPropertySchema,
} from "./blocks.schema.js";
import {
  AbilityScoreEnum,
  ItemPropertyEnum,
  SkillEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
  ScalablePropertyEnum,
} from "./primitives.js";

// ============================================================================
// FACTORY DE SCHEMAS DE EFEITO
// ============================================================================
// Para quebrar o ciclo de dependência entre as camadas 'shared' e 'domain',
// este ficheiro torna-se uma fábrica. Ele não importa mais diretamente da
// camada 'domain', mas recebe essas dependências.
// ----------------------------------------------------------------------------

export function createEffectSchemas(dependencies: {
  ActionIdEnum: z.ZodType<string>;
  ActionParametersSchema: z.ZodObject<any>;
  ActionOutcomesSchema: z.ZodType<any>;
}) {
  // Desestruturamos as dependências injetadas da camada de domínio.
  const { ActionIdEnum, ActionParametersSchema, ActionOutcomesSchema } =
    dependencies;

  // O resto do ficheiro permanece o mesmo, mas agora dentro do escopo da fábrica.

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
    // z.lazy ainda é crucial para quebrar o ciclo interno com outcomes.schema.ts
    outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
    cost: z
      .object({
        amount: z.number(),
        source: z.enum(["inventory"]),
        resourceId: z.string(),
      })
      .optional(),
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

  // Este schema agora usa a dependência injetada 'ActionIdEnum'.
  const ActivatableActionEffectSchema = z.object({
    type: z.literal("activatableAction"),
    actionId: ActionIdEnum,
    parameters: ActionParametersSchema.optional(),
  });

  // Este schema também usa as dependências injetadas.
  const ActivatableCastSpellEffectSchema = z.object({
    type: z.literal("activatableCastSpell"),
    actionId: ActionIdEnum,
    parameters: ActionParametersSchema,
    scaling: SpellScalingSchema.optional(),
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

  // --- Uniões de Schemas ---

  const ApplicableEffectSchema = z.discriminatedUnion("type", [
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
    ActivatableActionEffectSchema,
  ]);

  const EffectSchema = z.discriminatedUnion("type", [
    OnEquipSetACEffectSchema,
    OnEquipImposeDisadvantageEffectSchema,
    OnEquipProvidesContainerEffectSchema,
    OnWieldGrantWeaponAttackEffectSchema,
    PassiveGrantAdvantageEffectSchema,
    PassiveProvidesLightEffectSchema,
    PassivePropertyEffectSchema,
    PassiveGrantBonusEffectSchema,
    ActivatableActionEffectSchema,
    ActivatableCastSpellEffectSchema,
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
  ]);

  // Retornamos os schemas construídos para serem usados na camada de domínio.
  return {
    EffectSchema,
    ApplicableEffectSchema,
  };
}
