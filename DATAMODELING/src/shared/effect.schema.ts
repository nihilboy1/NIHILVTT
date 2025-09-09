import { z } from "zod";
import {
  AcSchema,
  AreaSchema,
  DurationSchema,
  HPFormulaSchema,
  RechargeSchema,
} from "./blocks.schema.js";
import {
  ActionIdEnum,
  FeatIdEnum,
  MusicalInstrumentIdEnum,
  SpellIdEnum,
  ToolIdEnum,
} from "../shared/data-based-enums.js";
import { ActionOutcomesSchema } from "./outcome.schema.js";
import {
  OutcomeParameterPaths,
  RootParameterPaths,
} from "../shared/data-based-enums.js";

import {
  ArmorTypeEnum,
  ItemPropertyEnum,
  WeaponPropertyEnum,
  WeaponRangeEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "./primitives/item.primitives.js";
import {
  AbilityScoreEnum,
  FeatCategoryEnum,
  SkillEnum,
  VisionTypeEnum,
} from "./primitives/character.primitives.js";
import { ClassesIdEnum } from "./primitives/class.primitives.js";
import {
  ConditionStatusEnum,
  OperationsEnum,
} from "./primitives/system.primitives.js";
import { GameEventSchema, RequirementSchema } from "./game-events.schema.js";
import {
  AttackTypeSchema,
  DcSchema,
  DiceRollSchema,
  RangeSchema,
} from "./character-blocks.schema.js";
import { MagicSchoolEnum } from "./primitives/spell.primitives.js";
import { HPTypesEnum } from "./primitives/combat.primitives.js";
import { ActionParametersSchema } from "../domain/actionParameter/actionParameter.schema.js";

const ChainedEffectSchema = z.object({
  triggers: GameEventSchema,
  area: AreaSchema.optional(),
  save: DcSchema.optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
});

const BaseEffectSchema = z.object({
  endConditions: GameEventSchema.optional(),
  chainedEffects: z.array(ChainedEffectSchema).optional(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
});

export const PassiveProvidesProficiencyEffectSchema = z.discriminatedUnion(
  "on",
  [
    // iniciativa
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("initiative"),
    }),

    // savingThrow
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("savingThrow"),
      choose: z
        .object({
          from: z.array(AbilityScoreEnum),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine((data) => new Set(data.from).size === data.from.length, {
          message: "Não pode ter itens repetidos em 'from'",
        }),
    }),

    // skill
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("skill"),
      grantsExpertise: z.boolean().optional(),
      choose: z
        .object({
          from: z.array(SkillEnum).or(z.literal("any")),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine(
          (data) =>
            Array.isArray(data.from)
              ? new Set(data.from).size === data.from.length
              : true,
          { message: "Não pode ter itens repetidos em 'from'" },
        ),
    }),

    // weaponType
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("weaponType"),
      choose: z
        .object({
          from: z.array(WeaponTypeEnum),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine((data) => new Set(data.from).size === data.from.length, {
          message: "Não pode ter itens repetidos em 'from'",
        }),
    }),

    // armorType
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("armorType"),
      choose: z
        .object({
          from: z.array(ArmorTypeEnum),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine((data) => new Set(data.from).size === data.from.length, {
          message: "Não pode ter itens repetidos em 'from'",
        }),
    }),

    // tool
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("tool"),
      choose: z
        .object({
          from: ToolIdEnum.array(),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine((data) => new Set(data.from).size === data.from.length, {
          message: "Não pode ter itens repetidos em 'from'",
        }),
    }),

    // musicalInstrument
    z.object({
      ...BaseEffectSchema.shape,
      type: z.literal("passive_grantProficiency"),
      on: z.literal("musicalInstrument"),
      choose: z
        .object({
          from: MusicalInstrumentIdEnum.array(),
          count: z.number().int().positive().default(1).or(z.literal("all")),
        })
        .refine((data) => new Set(data.from).size === data.from.length, {
          message: "Não pode ter itens repetidos em 'from'",
        }),
    }),
  ],
);

export const PassiveProvidesExpertiseEffectSchema = z.discriminatedUnion("on", [
  // skill
  z.object({
    ...BaseEffectSchema.shape,
    type: z.literal("passive_grantExpertise"),
    on: z.literal("skill"),
    choose: z.object({
      from: z
        .array(SkillEnum)
        .or(z.literal("any"))
        .or(z.literal("anyProficient")),
      count: z.number().int().positive().default(1).or(z.literal("all")),
    }),
  }),
]);

const ModifyAbilityScoreEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_modifyAbilityScore"),
  choices: z.array(
    z.object({
      pick: z.object({
        from: z.array(AbilityScoreEnum),
        amount: z.union([z.number().int().positive(), z.literal("any")]),
      }),
      operation: OperationsEnum,
      value: z.number().int().positive(),
    }),
  ),
  // A regra de negócio de não poder passar de 20
  maxScore: z.number().int().optional().default(20),
});

const PassiveModifyUserHPEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_modifyUserHP"),
  HPtype: HPTypesEnum,
  amount: z.number().int().min(1),
  multiplierProperty: z.enum(["level"]),
  operation: OperationsEnum,
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

const OnWieldProvideWeaponAttackEffectSchema = BaseEffectSchema.extend({
  type: z.literal("onWield_grantWeaponAttack"),
  weaponType: WeaponTypeEnum,
  weaponRange: WeaponRangeEnum,
  properties: WeaponPropertyEnum.array().optional(),
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

const PassiveProvidesAdvantageEffectSchema = BaseEffectSchema.extend({
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

const PassiveProvidesBonusEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_providesBonus"),
  on: z.enum(["attackRoll", "damageRoll", "ac", "savingThrow", "action"]),
  appliesToActions: ActionIdEnum.array().optional(),
  appliesToArmor: ArmorTypeEnum.array().optional(),
  appliesToAttackType: AttackTypeSchema.optional(),
  value: z
    .number()
    .int()
    .or(z.literal("proficiency"))
    .or(z.literal("abilityModifier")),
  duration: DurationSchema.optional(),
  requirements: RequirementSchema.optional(),
});

const SpecificFeatSelectionSchema = z.object({
  mode: z.literal("specific"),
  feats: FeatIdEnum.array().min(
    1,
    "A lista de feats específicos não pode estar vazia.",
  ),
});

const CategoryFeatSelectionSchema = z.object({
  mode: z.literal("category"),
  source: FeatCategoryEnum.array(),
  count: z.number().int().min(1).default(1),
});

const FeatProviderSchema = z.discriminatedUnion("selection", [
  SpecificFeatSelectionSchema,
  CategoryFeatSelectionSchema,
]);

export const PassiveProvidesFeatEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_providesFeat"),
  selection: FeatProviderSchema,
});

const PassiveProvidesSpellKnowledgeEffectSchema = z.discriminatedUnion("mode", [
  BaseEffectSchema.extend({
    type: z.literal("passive_providesSpellKnowledge"),
    mode: z.literal("filter"),
    amount: z.number().min(1),
    filter: z.object({
      level: z.number().min(0).optional(),
      school: MagicSchoolEnum.array().optional(),
      class: ClassesIdEnum.optional(),
    }),
    canBeSwappedOn: z.enum(["levelUp", "shortRest", "longRest", "never"]),
    castingAbilityOptions: AbilityScoreEnum.exclude([
      "constitution",
      "strength",
      "dexterity",
    ])
      .or(z.literal("selectedByFeat"))
      .array(),
    freeCasting: z
      .object({
        amount: z.number().min(1),
        recharge: RechargeSchema,
      })
      .optional(),
  }),

  BaseEffectSchema.extend({
    type: z.literal("passive_providesSpellKnowledge"),
    mode: z.literal("fixedSpells"),
    spells: SpellIdEnum.array().min(1),
    canBeSwappedOn: z.enum(["levelUp", "shortRest", "longRest", "never"]),
    castingAbilityOptions: AbilityScoreEnum.exclude([
      "constitution",
      "strength",
      "dexterity",
    ])
      .or(z.literal("selectedByFeat"))
      .array(),
    freeCasting: z
      .object({
        amount: z.number().min(1),
        recharge: RechargeSchema,
      })
      .optional(),
  }),
]);

const PassiveProvidesVisionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_providesVision"),
  vision: VisionTypeEnum,
  range: RangeSchema,
});

const PreventsConditionEffectSchema = BaseEffectSchema.extend({
  type: z.literal("preventsCondition"),
  condition: ConditionStatusEnum,
  duration: DurationSchema,
});

const ProvidesConditionalBonusEffectSchema = BaseEffectSchema.extend({
  type: z.literal("providesConditionalBonus"),
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
    operation: OperationsEnum,
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

export const passiveSetACEffectSchema = BaseEffectSchema.extend({
  type: z.literal("passive_setAC"),
  amount: z.number().int().min(1),
  appliesToArmor: z.enum(["light", "medium", "heavy"]).array(),
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
  newValue: z.number(),
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
  OnWieldProvideWeaponAttackEffectSchema,
  PassiveProvidesAdvantageEffectSchema,
  PassiveProvidesFeatEffectSchema,
  PassiveProvidesLightEffectSchema,
  PassivePropertyEffectSchema,
  PassiveProvidesBonusEffectSchema,
  ProvidesConditionalBonusEffectSchema,
  TriggeredModifierEffectSchema,
  PreventsHealingEffectSchema,
  ImposeDisadvantageEffectSchema,
  MultiAttackActionEffectSchema,
  PreventsReactionEffectSchema,
  PassiveProvidesExpertiseEffectSchema,
  TriggeredEffectSchema,
  passiveSetACEffectSchema,
  PreventsConditionEffectSchema,
  ModifyAbilityScoreEffectSchema,
  PassiveProvidesProficiencyEffectSchema,
  PassiveProvidesSpellKnowledgeEffectSchema,
  PassiveProvidesVisionEffectSchema,
  PassiveModifyUserHPEffectSchema,
]);

export const ApplicableEffectSchema = z.discriminatedUnion("type", [
  ReactionActionEffectSchema,
  ActivatableActionEffectSchema,
  ProvidesConditionalBonusEffectSchema,
  ImposeDisadvantageEffectSchema,
  PassiveProvidesAdvantageEffectSchema,
  PassiveProvidesLightEffectSchema,
  PassiveProvidesBonusEffectSchema,
  PreventsHealingEffectSchema,
  PreventsReactionEffectSchema,
  TriggeredModifierEffectSchema,
  TriggeredEffectSchema,
  PreventsConditionEffectSchema,
]);

export type EffectType = z.infer<typeof EffectSchema>;

export type ApplicableEffectType = z.infer<typeof ApplicableEffectSchema>;
