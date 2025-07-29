import { z } from "zod";
import {
  AbilityScoreEnum,
  ActionTypeEnum,
  AttackTypeEnum,
  ConditionEnum,
  DamageTypeEnum,
  DurationUnitEnum,
  EffectOutcomeEnum,
  ItemPropertyEnum,
  MagicSchoolEnum,
  ReactionTriggerEnum,
  RechargeEventEnum,
  ResourceCostIdEnum,
  ScalablePropertyEnum,
  SkillEnum,
  SourceEnum,
  SpellComponentEnum,
  WeaponCategoryEnum,
  WeaponMasteryEnum,
  WeaponPropertyEnum,
  WeaponTypeEnum,
  WeightUnitEnum,
} from "../shared/primitives.js";
import {
  AcSchema,
  AreaSchema,
  DamageFormulaSchema,
  DcSchema,
  DiceRollSchema,
  DurationSchema,
  RangeSchema,
  TargetSchema,
  WeaponPropertySchema,
} from "../shared/blocks.schema.js";
import { ActionIdEnum } from "./action/actions.data.js";

// ============================================================================
// PASSO 1: DECLARAR OS TIPOS FINAIS USANDO INTERFACES (VERSÃO ESPECÍFICA)
// MUDANÇA CRÍTICA: Em vez de interfaces genéricas com `[key: string]: any`,
// declaramos uma interface para CADA tipo de efeito e outcome, e então
// criamos um tipo de união. Isso fornece o mapa exato para o TypeScript.
// ============================================================================

// --- Tipos para Outcomes (AGORA COMPLETOS) ---
interface NoneOutcomeType {
  id?: string;
  type: "none";
  on: z.infer<typeof EffectOutcomeEnum>;
}
interface DamageOutcomeType {
  id?: string;
  type: "damage";
  on: z.infer<typeof EffectOutcomeEnum>;
  formula: z.infer<typeof DamageFormulaSchema>;
}
interface ModifyVitalsOutcomeType {
  id?: string;
  type: "modifyVitals";
  on: z.infer<typeof EffectOutcomeEnum>;
  vitals: Array<"maxHp" | "currentHp" | "tempHp">;
  formula: z.infer<typeof DiceRollSchema>;
}
interface ApplyConditionOutcomeType {
  id?: string;
  type: "applyCondition";
  on: z.infer<typeof EffectOutcomeEnum>;
  condition: z.infer<typeof ConditionEnum>;
  duration?: z.infer<typeof DurationSchema>;
}
interface DescriptiveOutcomeType {
  id?: string;
  type: "descriptive";
  on: z.infer<typeof EffectOutcomeEnum>;
  text: string;
}
interface ApplyEffectOutcomeType {
  id?: string;
  type: "applyEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: EffectType; // Referência recursiva
}
interface SummonTokenOutcomeType {
  id?: string;
  type: "summonToken";
  on: z.infer<typeof EffectOutcomeEnum>;
  token: {
    name: string;
    quantity: number;
    effects: EffectType[];
  };
  duration: z.infer<typeof DurationSchema>;
}

// O tipo final do Outcome é uma união de todos os tipos específicos.
type ActionOutcomeType =
  | NoneOutcomeType
  | DamageOutcomeType
  | ModifyVitalsOutcomeType
  | ApplyConditionOutcomeType
  | DescriptiveOutcomeType
  | ApplyEffectOutcomeType
  | SummonTokenOutcomeType;

// --- Tipos para Efeitos (AGORA COMPLETOS) ---

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

// O tipo final do Efeito é uma união de todos os tipos específicos.
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

// --- Tipo para Parâmetros de Ação ---
interface ActionParametersType {
  activation?: {
    type: z.infer<typeof ActionTypeEnum>;
    cost?: {
      amount: number;
      source: "item" | "character";
      resourceId: z.infer<typeof ResourceCostIdEnum>;
    };
    trigger?: z.infer<typeof ReactionTriggerEnum>;
  };
  attackType?: z.infer<typeof AttackTypeEnum>;
  range?: z.infer<typeof RangeSchema>;
  area?: z.infer<typeof AreaSchema>;
  target?: z.infer<typeof TargetSchema>;
  save?: {
    ability: z.infer<typeof AbilityScoreEnum>;
    dc: z.infer<typeof DcSchema>;
  };
  outcomes?: ActionOutcomeType[]; // <-- Agora usa a união de tipos específica
  charges?: {
    max: number;
    recharge?: {
      amount: z.infer<typeof DiceRollSchema>;
      event: z.infer<typeof RechargeEventEnum>;
    };
  };
}

// ============================================================================
// PASSO 2: DEFINIR OS "TIJOLOS" - SCHEMAS BASE E NÃO-RECURSIVOS
// ============================================================================

// --- Schemas de Outcome Base (não dependem de nada complexo) ---
export const NoneOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("none"),
  on: EffectOutcomeEnum,
});
export const DamageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("damage"),
  on: EffectOutcomeEnum,
  formula: DamageFormulaSchema,
});
export const ModifyVitalsOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyVitals"),
  on: EffectOutcomeEnum,
  vitals: z.array(z.enum(["maxHp", "currentHp", "tempHp"])),
  formula: DiceRollSchema,
});
export const ApplyConditionOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCondition"),
  on: EffectOutcomeEnum,
  condition: ConditionEnum,
  duration: DurationSchema.optional(),
});
export const DescriptiveOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("descriptive"),
  on: EffectOutcomeEnum,
  text: z.string(),
});

export const BaseActionOutcomesSchema = z.discriminatedUnion("type", [
  NoneOutcomeSchema,
  DamageOutcomeSchema,
  ModifyVitalsOutcomeSchema,
  ApplyConditionOutcomeSchema,
  DescriptiveOutcomeSchema,
]);

// --- Schemas de Efeitos Não-Recursivos ---
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

// --- Schema Base para ActionParameters (sem o campo 'outcomes') ---
const ActionParametersBaseSchema = z.object({
  activation: z
    .object({
      type: ActionTypeEnum,
      cost: z
        .object({
          amount: z.number().int(),
          source: z.enum(["item", "character"]),
          resourceId: ResourceCostIdEnum,
        })
        .optional(),
      trigger: ReactionTriggerEnum.optional(),
    })
    .optional(),
  attackType: AttackTypeEnum.optional(),
  range: RangeSchema.optional(),
  area: AreaSchema.optional(),
  target: TargetSchema.optional(),
  save: z.object({ ability: AbilityScoreEnum, dc: DcSchema }).optional(),
  charges: z
    .object({
      max: z.number().int(),
      recharge: z
        .object({ amount: DiceRollSchema, event: RechargeEventEnum })
        .optional(),
    })
    .optional(),
});

// ============================================================================
// PASSO 3: LIGAR TUDO - DEFINIR OS SCHEMAS FINAIS COM RECURSÃO
// ============================================================================

// --- AÇÃO ---
const actionParametersSchema: z.ZodType<ActionParametersType> =
  ActionParametersBaseSchema.extend({
    outcomes: z.array(z.lazy(() => actionOutcomesSchema)).optional(),
  });

// --- EFEITO ---
const ActivatableActionEffectSchema = z.object({
  type: z.literal("activatableAction"),
  actionId: ActionIdEnum,
  parameters: z.lazy(() => actionParametersSchema).optional(),
  duration: DurationSchema.optional(), // <-- CORREÇÃO APLICADA AQUI
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

export const effectSchema: z.ZodType<EffectType> = z.discriminatedUnion("type", [
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
]);

const applicableEffectSchema: z.ZodType<EffectType> = z.discriminatedUnion(
  "type",
  [
    TriggeredModifierEffectSchema,
    PreventsHealingEffectSchema,
    ActivatableActionEffectSchema,
  ]
);

// --- OUTCOME ---
const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: z.enum(["success", "fail", "hit", "miss"]),
  effect: z.lazy(() => applicableEffectSchema),
});

const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: z.enum(["success", "fail", "hit", "miss"]),
  token: z.object({
    name: z.string(),
    quantity: z.number().int().min(1),
    effects: z.array(z.lazy(() => effectSchema)),
  }),
  duration: DurationSchema,
});

const actionOutcomesSchema: z.ZodType<ActionOutcomeType> = z.discriminatedUnion(
  "type",
  [
    ...BaseActionOutcomesSchema.options,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema,
  ] as any
);

// ============================================================================
// SCHEMA FINAL DA MAGIA (SPELL)
// ============================================================================

const SpellSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  source: SourceEnum,
  page: z.number(),
  level: z.number().int().min(0).max(9),
  school: MagicSchoolEnum,
  isRitual: z.boolean().default(false).optional(),
  components: z.object({
    types: z.array(SpellComponentEnum),
    material: z
      .object({
        description: z.string(),
        costGp: z.number().optional(),
        isConsumed: z.boolean().default(false),
      })
      .optional(),
  }),
  duration: DurationSchema,
  effects: z.array(effectSchema),
});

// MUDANÇA: Revertido para usar .check((ctx) => { ... }) e a API correspondente,
// conforme solicitado e especificado pelo usuário.
const SpellSchemaWithRefinement = SpellSchema.check((ctx) => {
  const spell = ctx.value;

  const scalingEffects = spell.effects.filter(
    (effect: EffectType) =>
      effect.type === "activatableCastSpell" && effect.scaling
  );

  if (scalingEffects.length === 0) {
    return;
  }

  const definedOutcomeIds = new Set<string>();
  spell.effects.forEach((effect: EffectType) => {
    if (
      effect.type === "activatableCastSpell" &&
      effect.parameters &&
      Array.isArray(effect.parameters.outcomes)
    ) {
      effect.parameters.outcomes.forEach((outcome: ActionOutcomeType) => {
        if (outcome.id) {
          definedOutcomeIds.add(outcome.id);
        }
      });
    }
  });

  scalingEffects.forEach((effect: EffectType) => {
    if (
      effect.type === "activatableCastSpell" &&
      effect.scaling?.type === "characterLevel"
    ) {
      effect.scaling.rules.forEach((rule: any, index: number) => {
        if (!definedOutcomeIds.has(rule.outcomeId)) {
          ctx.issues.push({
            input: ctx.value,
            code: "custom",
            message: `ID de outcome inválido: "${rule.outcomeId}". Não foi encontrado nenhum outcome com este ID na definição da magia.`,
            path: [
              "effects",
              spell.effects.indexOf(effect),
              "scaling",
              "rules",
              index,
              "outcomeId",
            ],
          });
        }
      });
    }
  });
});

export const FinalSpellDataSchema = z.array(SpellSchemaWithRefinement);

// ============================================================================
// EXPORTS FINAIS E CORRETOS
// ============================================================================
export {
  actionParametersSchema as ActionParametersSchema,
  effectSchema as EffectSchema,
  applicableEffectSchema as ApplicableEffectSchema,
  actionOutcomesSchema as ActionOutcomesSchema,
  SpellSchema,
  SpellSchemaWithRefinement,
};

// ============================================================================
// EXPORTAÇÕES DE TIPOS
// ============================================================================
export type Spell = z.infer<typeof SpellSchema>;
export type Effect = z.infer<typeof effectSchema>;
export type ApplicableEffect = z.infer<typeof applicableEffectSchema>;
export type ActionOutcome = z.infer<typeof actionOutcomesSchema>;
export type ActionParameters = z.infer<typeof actionParametersSchema>;
export type FinalSpellData = Spell[];
