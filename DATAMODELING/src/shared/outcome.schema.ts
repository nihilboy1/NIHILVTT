import { z } from "zod";

import {
  AcSchema,
  DcSchema,
  DurationSchema,
  HPFormulaSchema,
  RequirementSchema,
  TargetSchema,
} from "../shared/blocks.schema.js";
import {
  ApplicableEffectSchema,
  ApplicableEffectType,
  SystemEventsSchema,
} from "../shared/effect.schema.js";
import {
  DistanceUnitEnum,
  SurfaceTypeEnum,
} from "./primitives/world.primitives.js";
import {
  DamageTypeEnum,
  EffectOutcomeEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import {
  AbilityScoreEnum,
  ConditionStatusEnum,
  CreatureSizeEnum,
  SystemStatusEnum,
} from "./primitives/character.primitives.js";

// ============================================================================
// SEÇÃO: SCHEMAS DE RESULTADOS (OUTCOMES) INDIVIDUAIS
// ============================================================================

// --- Schemas Base (Sem dependências complexas) ---

export const NoneOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("none"),
  on: EffectOutcomeEnum,
});

export const ModifyTargetHPOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyTargetHP"),
  on: EffectOutcomeEnum,
  formula: HPFormulaSchema,
  vitals: z
    .array(z.enum(["maxHp", "currentHp", "tempHp"]))
    .default(["currentHp"]),
  requirements: RequirementSchema.optional(),
});

export const ApplyConditionOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyCondition"),
  on: EffectOutcomeEnum,
  condition: ConditionStatusEnum,
  requirements: RequirementSchema.optional(),
  duration: DurationSchema.optional(),
});

export const DescriptiveOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("descriptive"),
  on: EffectOutcomeEnum,
  details: z.string(),
});

export const SetAcOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("setAC"),
  on: EffectOutcomeEnum,
  calculation: AcSchema,
  duration: DurationSchema.optional(),
});

export const DealWeaponDamageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("dealWeaponDamage"),
  on: EffectOutcomeEnum,
  properties: z.object({ damageTypeOptions: DamageTypeEnum.array() }),
});

export const MoveTargetOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("moveTarget"),
  on: EffectOutcomeEnum,
  direction: z.enum(["towards", "away"]),
  distance: z.object({
    value: z.union([z.number().int().positive(), z.literal("max")]),
    unit: DistanceUnitEnum,
  }),
  allowedSizes: z.array(CreatureSizeEnum).optional(),
  usesReaction: z.boolean().optional(),
});

export const DamageOverTimeOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("damageOverTime"),
  on: EffectOutcomeEnum,
  duration: DurationSchema,
  trigger: z.lazy(() => SystemEventsSchema),
  damage: z.object({
    formula: HPFormulaSchema,
  }),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
      endsOnSuccess: z.boolean().optional(),
    })
    .optional(),
  stackable: z.boolean().default(false).optional(),
});

export const GrantAdvantageDisadvantageOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("grantAdvantageDisadvantage"),
  on: EffectOutcomeEnum,
  target: TargetSchema,
  mode: RollModeEnum.exclude(["normal"]),
  targetRoll: z.enum(["abilityCheck", "attackRoll", "savingThrow"]),
  duration: DurationSchema,
  appliesTo: z
    .object({
      abilities: z.array(AbilityScoreEnum).optional(),
      status: z.array(ConditionStatusEnum).optional(),
      damageTypes: z.array(DamageTypeEnum).optional(),
    })
    .optional(),
});

export const ModifyAttributeOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyAttribute"),
  on: EffectOutcomeEnum,
  attribute: z.enum(["speed"]),
  stacking: z.enum(["none", "intensity", "duration"]),
  operation: z.enum(["add", "subtract"]),
  value: z.union([
    z.number().int().positive("O valor da modificação deve ser positivo."),
    z.literal("all"),
  ]),
  duration: DurationSchema,
  endConditions: z.array(z.lazy(() => SystemEventsSchema)).optional(),
});

const ChoiceOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  outcome: z.lazy(() => ActionOutcomesSchema),
});

export const ChooseEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("chooseEffect"),
  on: EffectOutcomeEnum,
  options: z.array(ChoiceOptionSchema),
});

export const CreateItemOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("createItem"),
  on: EffectOutcomeEnum,
  itemId: z.string(),
  quantity: z.number().int().positive(),
  duration: DurationSchema.optional(),
});

// --- Schemas com Dependências Circulares ---

export const SurfaceRuleSchema = z.object({
  trigger: z.lazy(() => SystemEventsSchema),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
});

export const TransformRuleSchema = z.object({
  trigger: z.lazy(() => SystemEventsSchema),
  newSurface: z.lazy(() => CreateAreaEffectOutcomeSchema),
});

export const CreateAreaEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("createAreaEffect"),
  on: EffectOutcomeEnum,
  surfaceType: SurfaceTypeEnum,
  isDifficultTerrain: z.boolean().optional(),
  rules: z.array(z.lazy(() => SurfaceRuleSchema)).optional(),
  duration: DurationSchema,
  status: SystemStatusEnum.optional(),
  transformRules: z.array(z.lazy(() => TransformRuleSchema)).optional(),
});

const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: EffectOutcomeEnum,
  effect: z.lazy(() => ApplicableEffectSchema),
});

// ✅ ATUALIZADO: Schema para invocar um token a partir de um template.
// A lógica agora se baseia em referenciar um template predefinido,
// em vez de descrever o token diretamente no outcome.
const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: EffectOutcomeEnum,
  tokenId: z.string(),
  quantity: z.number().int().min(1),
  duration: DurationSchema.optional(),
});

const AddedWeaponEffectSchema = z.object({
  trigger: z.literal("onHit"),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)),
});

export const ModifyWeaponPropertiesOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("modifyWeaponProperties"),
  on: EffectOutcomeEnum,
  duration: DurationSchema,
  charges: z.number().int().positive().optional().default(1),
  addedEffect: AddedWeaponEffectSchema,
});

// ============================================================================
// SEÇÃO: TIPOS E UNIÃO FINAL DOS SCHEMAS
// ============================================================================

// --- Tipos Manuais para Schemas com z.lazy() ---
export interface ChoiceOptionType {
  id: string;
  name: string;
  outcome: ActionOutcomeType;
}

export type ChooseEffectOutcomeType = {
  id?: string;
  type: "chooseEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  options: ChoiceOptionType[];
};

export interface TransformRuleType {
  trigger: z.infer<typeof SystemEventsSchema>;
  newSurface: CreateAreaEffectOutcomeType;
}

export interface SurfaceRuleType {
  trigger: z.infer<typeof SystemEventsSchema>;
  save?: {
    ability: z.infer<typeof AbilityScoreEnum>;
    dc: z.infer<typeof DcSchema>;
  };
  outcomes?: ActionOutcomeType[];
}

export type CreateAreaEffectOutcomeType = {
  id?: string;
  type: "createAreaEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  surfaceType: z.infer<typeof SurfaceTypeEnum>;
  isDifficultTerrain?: boolean;
  rules?: SurfaceRuleType[];
  duration: z.infer<typeof DurationSchema>;
  status?: z.infer<typeof SystemStatusEnum>;
  transformRules?: TransformRuleType[];
};

export type ApplyEffectOutcomeType = {
  id?: string;
  type: "applyEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: ApplicableEffectType;
};

// ✅ ATUALIZADO: O tipo para SummonToken agora é inferido diretamente do novo schema,
// garantindo consistência e uma única fonte de verdade.
export type SummonTokenOutcomeType = z.infer<typeof SummonTokenOutcomeSchema>;

export type ModifyWeaponPropertiesOutcomeType = {
  id?: string;
  type: "modifyWeaponProperties";
  on: z.infer<typeof EffectOutcomeEnum>;
  duration: z.infer<typeof DurationSchema>;
  charges?: number;
  addedEffect: {
    trigger: "onHit";
    save?: {
      ability: z.infer<typeof AbilityScoreEnum>;
      dc: z.infer<typeof DcSchema>;
    };
    outcomes: ActionOutcomeType[];
  };
};

// --- União Final de Tipos ---
export type ActionOutcomeType =
  | z.infer<typeof NoneOutcomeSchema>
  | z.infer<typeof SetAcOutcomeSchema>
  | z.infer<typeof ModifyTargetHPOutcomeSchema>
  | z.infer<typeof ApplyConditionOutcomeSchema>
  | z.infer<typeof DescriptiveOutcomeSchema>
  | z.infer<typeof DealWeaponDamageOutcomeSchema>
  | z.infer<typeof ModifyAttributeOutcomeSchema>
  | z.infer<typeof MoveTargetOutcomeSchema>
  | z.infer<typeof DamageOverTimeOutcomeSchema>
  | z.infer<typeof GrantAdvantageDisadvantageOutcomeSchema>
  | z.infer<typeof CreateItemOutcomeSchema>
  | CreateAreaEffectOutcomeType
  | ApplyEffectOutcomeType
  | SummonTokenOutcomeType // ✅ Corretamente incluído na união
  | ChooseEffectOutcomeType
  | ModifyWeaponPropertiesOutcomeType;

// --- União Final de Schemas ---
export const ActionOutcomesSchema: z.ZodType<ActionOutcomeType> =
  z.discriminatedUnion("type", [
    NoneOutcomeSchema,
    SetAcOutcomeSchema,
    ModifyTargetHPOutcomeSchema,
    ApplyConditionOutcomeSchema,
    ChooseEffectOutcomeSchema,
    DescriptiveOutcomeSchema,
    CreateAreaEffectOutcomeSchema,
    DealWeaponDamageOutcomeSchema,
    CreateItemOutcomeSchema,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema, // ✅ Schema atualizado na união
    ModifyAttributeOutcomeSchema,
    MoveTargetOutcomeSchema,
    DamageOverTimeOutcomeSchema,
    GrantAdvantageDisadvantageOutcomeSchema,
    ModifyWeaponPropertiesOutcomeSchema,
  ]);

export type ActionOutcome = z.infer<typeof ActionOutcomesSchema>;
