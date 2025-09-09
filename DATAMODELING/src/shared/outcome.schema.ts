import { z } from "zod";
import {
  AcSchema,
  DurationSchema,
  HPFormulaSchema,
} from "../shared/blocks.schema.js";
import {
  ApplicableEffectSchema,
  ApplicableEffectType,
} from "../shared/effect.schema.js";
import {
  DistanceUnitEnum,
  SurfaceTypeEnum,
} from "./primitives/world.primitives.js";
import {
  ActionTypeEnum,
  DamageTypeEnum,
  EffectOutcomeEnum,
  HPTypesEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import {
  AbilityScoreEnum,
  CreatureSizeEnum,
} from "./primitives/character.primitives.js";
import {
  ConditionStatusEnum,
  OperationsEnum,
  SystemStatusEnum,
} from "./primitives/system.primitives.js";
import { SummonedTokenIdEnum } from "./data-based-enums.js";
import { GameEventSchema, RequirementSchema } from "./game-events.schema.js";
import {
  DcSchema,
  DiceRollSchema,
  TargetSchema,
} from "./character-blocks.schema.js";

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
  vitals: z.array(HPTypesEnum).default(["currentHp"]),
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
  roll: DiceRollSchema.optional(),
  on: EffectOutcomeEnum,
  details: z.string(),
});

export const ProvidesNewActionOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("providesNewAction"),
  on: EffectOutcomeEnum,
  actionTypes: z.array(ActionTypeEnum), // quais ações extras são dadas
  requirements: RequirementSchema.optional(), // restrição de uso
  duration: DurationSchema.optional(), // até quando essa ação extra fica disponível
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
  properties: z.object({
    damageTypeOptions: z.array(
      z.union([DamageTypeEnum, z.literal("weaponDefault")]),
    ),
  }),
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
  triggers: z.lazy(() => GameEventSchema),
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
    .enum(["nextAttacker", "anyAttacker", "target", "self"])
    .default("nextAttacker"),
  appliesToFilter: z
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
  operation: OperationsEnum,
  value: z.union([
    z.number().int().positive("O valor da modificação deve ser positivo."),
    z.literal("all"),
  ]),
  duration: DurationSchema,
  endConditions: z.array(z.lazy(() => GameEventSchema)).optional(),
});

export const ChooseEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("chooseEffect"),
  on: EffectOutcomeEnum,
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      outcome: z.lazy(() => ActionOutcomesSchema),
    }),
  ),
});

export const CreateItemOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("createItem"),
  on: EffectOutcomeEnum,
  itemId: z.string(),
  quantity: z.number().int().positive(),
  duration: DurationSchema.optional(),
});

export const SurfaceRuleSchema = z.object({
  trigger: z.lazy(() => GameEventSchema),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
});

export const TransformRuleSchema = z.lazy(() =>
  z.object({
    triggers: z.lazy(() => GameEventSchema),
    newSurface: CreateAreaEffectOutcomeSchema,
  }),
);

export const CreateAreaEffectOutcomeSchema = z.lazy(() =>
  z.object({
    id: z.string().optional(),
    type: z.literal("createAreaEffect"),
    on: EffectOutcomeEnum,
    surfaceType: SurfaceTypeEnum,
    isDifficultTerrain: z.boolean().optional(),
    rules: z.array(z.lazy(() => SurfaceRuleSchema)).optional(),
    duration: DurationSchema,
    status: SystemStatusEnum.optional(),
    // transformRules: z.array(TransformRuleSchema).optional(),
  }),
);

const ApplyEffectOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("applyEffect"),
  on: EffectOutcomeEnum,
  effect: z.lazy(() => ApplicableEffectSchema),
});

const SummonTokenOutcomeSchema = z.object({
  id: z.string().optional(),
  type: z.literal("summonToken"),
  on: EffectOutcomeEnum,
  tokenId: SummonedTokenIdEnum,
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
  triggers: z.infer<typeof GameEventSchema>;
  newSurface: CreateAreaEffectOutcomeType;
}

export interface SurfaceRuleType {
  trigger: z.infer<typeof GameEventSchema>;
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
  // transformRules?: TransformRuleType[];
};

type ApplyEffectOutcomeType = {
  id?: string;
  type: "applyEffect";
  on: z.infer<typeof EffectOutcomeEnum>;
  effect: ApplicableEffectType;
};

type ModifyWeaponPropertiesOutcomeType = {
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

export const ActionOutcomesSchema: z.ZodType<ActionOutcomeType> =
  z.discriminatedUnion("type", [
    NoneOutcomeSchema,
    SetAcOutcomeSchema,
    ProvidesNewActionOutcomeSchema,
    ModifyTargetHPOutcomeSchema,
    ApplyConditionOutcomeSchema,
    ChooseEffectOutcomeSchema,
    DescriptiveOutcomeSchema,
    CreateAreaEffectOutcomeSchema,
    DealWeaponDamageOutcomeSchema,
    CreateItemOutcomeSchema,
    ApplyEffectOutcomeSchema,
    SummonTokenOutcomeSchema,
    ModifyAttributeOutcomeSchema,
    MoveTargetOutcomeSchema,
    DamageOverTimeOutcomeSchema,
    GrantAdvantageDisadvantageOutcomeSchema,
    ModifyWeaponPropertiesOutcomeSchema,
  ]);

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
  | z.infer<typeof ProvidesNewActionOutcomeSchema>
  | z.infer<typeof SummonTokenOutcomeSchema>
  | CreateAreaEffectOutcomeType
  | ApplyEffectOutcomeType
  | ChooseEffectOutcomeType
  | ModifyWeaponPropertiesOutcomeType;
