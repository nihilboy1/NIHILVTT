import { z } from "zod";
import {
  DistanceUnitEnum,
  DurationUnitEnum,
} from "./primitives/world.primitives.js";
import {
  AbilityScoreEnum,
  AncestryIdEnum,
  SkillEnum,
} from "./primitives/character.primitives.js";
import {
  AttackSourceEnum,
  CoverEnum,
  DamageTypeEnum,
  RechargeEventEnum,
  RollModeEnum,
} from "./primitives/combat.primitives.js";
import {
  ConditionStatusEnum,
  CreatureSizeEnum,
  CreatureTypeEnum,
} from "./primitives/system.primitives.js";
import { SpellIdEnum, WeaponIdEnum } from "./data-based-enums.js";

interface ConditionalHPFormulaType {
  type: "conditional";
  variables: z.infer<typeof GameEventSchema>;
  ifTrue: HPFormulaType;
  ifFalse?: HPFormulaType;
}
type HPFormulaType =
  | z.infer<typeof HealingFormulaSchema>
  | z.infer<typeof DamageFormulaSchema>
  | ConditionalHPFormulaType
  | z.infer<typeof HalfDamageFormulaSchema>;

export const DcSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("fixed"),
    value: z.number().int(),
    attributes: z
      .array(
        AbilityScoreEnum.or(z.literal("proficiency")).or(
          z.literal("spellcasting"),
        ),
      )
      .optional(),
  }),
  z.object({
    type: z.literal("calculated"),
    base: z.number().int(),
    attributes: z.array(
      AbilityScoreEnum.or(z.literal("proficiency")).or(
        z.literal("spellcasting"),
      ),
    ),
  }),
]);

export const BaseRollModifierSchema = z.object({
  type: z.literal("rollModifier"),
  mode: RollModeEnum,
});

export const SavingThrowSchema = z.object({
  ability: AbilityScoreEnum,
  dc: DcSchema,
  ignoreCovers: z.array(CoverEnum).optional(),
});

export const DurationSchema = z.object({
  unit: DurationUnitEnum,
  value: z.number().int().optional(),
  isConcentration: z.boolean().default(false).optional(),
});

export const DiceRollSchema = z.object({
  count: z.number().int().min(1, "A quantidade de dados deve ser no mínimo 1."),
  faces: z
    .number()
    .int()
    .min(1, "O número de faces do dado deve ser no mínimo 1."),
  bonus: z.number().int().optional(),
  explodesOn: z.number().optional(),
  explodeLimit: z
    .union([z.number().int(), z.literal("spellcastingModifier")])
    .optional(),
});

export const AttackTypeSchema = z.object({
  range: z.enum(["melee", "ranged"]),
  source: AttackSourceEnum,
});

export const RangeSchema = z.object({
  normal: z.number().int().optional(),
  long: z.number().int().optional(),
  unit: DistanceUnitEnum.default("ft"),
});

export const TargetSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("self") }),
  z.object({
    type: z.literal("selfArea"),
    selective: z.boolean().default(false).optional(),
    excludeSelf: z.boolean().default(false).optional(),
  }),
  z.object({
    type: z.literal("creature"),
    quantity: z.number().int().default(1),
    creatureTypes: z.array(CreatureTypeEnum).optional(),
  }),
  z.object({
    type: z.literal("object"),
    quantity: z.number().int().default(1),
  }),
  z.object({
    type: z.literal("weapon"),
    quantity: z.number().int().default(1),
    properties: z.array(DamageTypeEnum).optional(),
  }),
  z.object({ type: z.literal("point") }),
  z.object({
    type: z.literal("descriptive"),
    details: z.string(),
  }),
]);

const EventConditionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hasAttribute"),
    attribute: AbilityScoreEnum,
    value: z.number().int().min(0),
    comparison: z
      .enum([
        "equal",
        "greaterThan",
        "lessThan",
        "greaterOrEqual",
        "lessOrEqual",
      ])
      .default("greaterOrEqual"),
  }),
  z.object({
    type: z.literal("dicePatternRolled"),
    diceType: z.number().int().positive(),
    rollCount: z.number().int().min(2),
    condition: z.enum(["anyDoubles", "anyTriples", "allDifferent"]),
    minRepeats: z.number().int().min(2).optional(),
  }),
  z.object({
    type: z.literal("hasAllyNearby"),
    allyIsNotIncapacitated: z.boolean().default(true),
    range: RangeSchema,
  }),
  z.object({
    type: z.literal("isOfAncestry"),
    ancestry: AncestryIdEnum,
  }),
  z.object({
    type: z.literal("hasLevel"),
    value: z.number().int().min(1),
    comparison: z
      .enum([
        "equal",
        "greaterThan",
        "lessThan",
        "greaterOrEqual",
        "lessOrEqual",
      ])
      .default("greaterOrEqual"),
  }),

  z.object({
    type: z.literal("isAttuned"),
    itemId: z.string().optional(),
  }),
  z.object({
    type: z.literal("hasEquippedItem"),
    itemIds: WeaponIdEnum.array().nonempty(),
  }),
  z.object({
    type: z.literal("isProficientWith"),
    other: z.enum(["equippedWeapon"]).optional(),
    skill: SkillEnum.optional(),
    specificItems: WeaponIdEnum.array().optional(),
  }),
  z.object({
    type: z.literal("droppedItem"),
    itemId: z.string().optional(),
  }),

  z.object({
    type: z.literal("madeAttackRoll"),
    attackType: AttackTypeSchema.optional(),
  }),
  z.object({
    type: z.literal("attackHit"),
    attackType: AttackTypeSchema.optional(),
    weaponIds: WeaponIdEnum.array().optional(),
  }),
  z.object({
    type: z.literal("attackMissed"),
    attackType: AttackTypeSchema.optional(),
  }),
  z.object({
    type: z.literal("wasAttacked"),
    attackType: AttackTypeSchema.optional(),
    byVisibleCreature: z.boolean().default(true),
    maxDistance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("dealtDamage"),
    damageTypes: DamageTypeEnum.array().optional(),
    minDamage: z.number().int().optional(),
  }),
  z.object({
    type: z.literal("tookDamage"),
    damageTypes: DamageTypeEnum.array().optional(),
    attackType: AttackTypeSchema.array().optional(),
    from: z.enum(["caster", "casterAllies"]).array().optional(),
    minDamage: z.number().int().optional(),
  }),
  z.object({
    type: z.literal("allyDamagedTarget"),
    allyDistance: RangeSchema.optional(),
    minDamage: z.number().int().optional(),
  }),
  z.object({
    type: z.literal("allyWasHit"),
    allyDistance: RangeSchema.optional(),
  }),

  z.object({
    type: z.literal("onTurnStart"),
  }),
  z.object({
    type: z.literal("onTurnEnd"),
  }),
  z.object({
    type: z.literal("startedTurnInArea"),
    areaId: z.string().optional(),
  }),
  z.object({
    type: z.literal("endedTurnInArea"),
    areaId: z.string().optional(),
  }),

  z.object({
    type: z.literal("enteredArea"),
    areaId: z.string().optional(),
  }),
  z.object({
    type: z.literal("leftArea"),
    areaId: z.string().optional(),
  }),
  z.object({
    type: z.literal("movedInArea"),
    areaId: z.string().optional(),
    minDistance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("movesAtLeast"),
    distance: RangeSchema,
  }),
  z.object({
    type: z.literal("approachedTarget"),
    target: TargetSchema,
    threshold: RangeSchema,
  }),
  z.object({
    type: z.literal("targetEnteredReach"),
    distance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("isFarFromCaster"),
    distance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("targetLeftReach"),
    distance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("userIsFarFromTarget"),
    distance: RangeSchema.optional(),
  }),

  z.object({
    type: z.literal("hasZeroHP"),
  }),
  z.object({
    type: z.literal("hasFallen"),
    affectedTarget: TargetSchema.array(),
    maxDistance: RangeSchema.optional(),
  }),
  z.object({
    type: z.literal("isWounded"),
    hpThreshold: z.number().int().optional(),
    thresholdType: z
      .enum(["absolute", "percentage"])
      .default("absolute")
      .optional(),
  }),
  z.object({
    type: z.literal("hasCondition"),
    condition: ConditionStatusEnum,
    is: z.boolean().default(true),
  }),
  z.object({
    type: z.literal("gainedCondition"),
    condition: ConditionStatusEnum,
  }),
  z.object({
    type: z.literal("lostCondition"),
    condition: ConditionStatusEnum,
  }),
  z.object({
    type: z.literal("tempHPDepleted"),
  }),
  z.object({
    type: z.literal("wasHitByStrongWind"),
  }),
  z.object({
    type: z.literal("wasHealed"),
    minAmount: z.number().int().optional(),
  }),
  z.object({
    type: z.literal("hasHPBelowThreshold"),
    threshold: z.number().int(),
    thresholdType: z.enum(["absolute", "percentage"]).default("absolute"),
  }),
  z.object({
    type: z.literal("madeSavingThrow"),
    ability: AbilityScoreEnum.optional(),
    success: z.boolean().optional(),
    dc: DcSchema.optional(),
  }),
  z.object({
    type: z.literal("wasAffectedBySpell"),
    spellId: SpellIdEnum,
    withinLast: z
      .object({
        value: z.number().positive(),
        unit: DurationUnitEnum,
      })
      .optional(),
  }),

  z.object({
    type: z.literal("castSpellAgain"),
    spellId: SpellIdEnum.optional(),
  }),
  z.object({
    type: z.literal("castOnNonTargetEnemy"),
  }),
  z.object({
    type: z.literal("attackedOtherTarget"),
    targetId: z.string().optional(),
  }),
  z.object({
    type: z.literal("hostile"),
    who: z.enum(["user", "userAllies", "enemy", "any"]).array(),
    is: z.boolean().default(true),
  }),
  z.object({
    type: z.literal("lostConcentration"),
    spellId: SpellIdEnum.optional(),
  }),

  z.object({
    type: z.literal("died"),
    characterId: z.string().optional(),
  }),
  z.object({
    type: z.literal("rolledDice"),
    diceType: z.number().int().positive(),
    result: z.number().int().optional(),
    comparator: z
      .enum([
        "equal",
        "greaterThan",
        "lessThan",
        "greaterOrEqual",
        "lessOrEqual",
      ])
      .optional(),
  }),

  z.object({
    type: z.literal("isObject"),
    isFlammable: z.boolean().optional(),
    isWorn: z.boolean().optional(),
    isCarried: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("isCreatureOfType"),
    creatureTypes: CreatureTypeEnum.array().nonempty(),
  }),
  z.object({
    type: z.literal("isCreatureOfSize"),
    creatureSizes: CreatureSizeEnum.array().nonempty(),
  }),
]);

export const GameEventSchema = z.object({
  events: z.array(EventConditionSchema).optional(),
  conditionMode: z.enum(["any", "all"]).default("all").optional(),
});

export const RechargeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("dice"), // p/ "Recharge 6" ou "Recharge 5-6"
    roll: DiceRollSchema, // ex: "1d6"
    successOn: z.array(z.number()), // ex: [6] ou [5,6]
    triggers: GameEventSchema,
    max: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("rest"), // p/ varinhas, bastões, etc.
    rest: RechargeEventEnum, // "longRest" | "shortRest"
    amount: z.union([z.number(), DiceRollSchema]).optional(),
    max: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("time"), // recarrega após X tempo
    duration: DurationSchema,
    max: z.number().int().min(1),
  }),
  z.object({
    type: z.literal("static"),
    amount: z.union([z.number(), DiceRollSchema]),
    max: z.number().int().min(1),
  }),
]);

export const HealingFormulaSchema = z.object({
  type: z.literal("healing"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  addSpellcastingModifier: z.boolean().optional(),
});

export const DamageFormulaSchema = z.object({
  type: z.literal("damage"),
  roll: DiceRollSchema.optional(),
  fixed: z.number().int().optional(),
  damageTypeOptions: z.array(DamageTypeEnum),
});

export const RollModifierSchema = z.lazy(() =>
  z.discriminatedUnion("type", [
    BaseRollModifierSchema,
    z.object({
      type: z.literal("conditionalRollModifier"),
      triggers: GameEventSchema.array(),
      ifTrue: BaseRollModifierSchema,
      ifFalse: BaseRollModifierSchema,
    }),
  ]),
);

const HalfDamageFormulaSchema = z.object({
  type: z.literal("halfDamage"),
  of: z
    .string()
    .min(1, "É necessário especificar o ID do outcome de dano original."),
});

export const ConditionalHPFormulaSchema = z.object({
  type: z.literal("conditional"),
  variables: GameEventSchema,
  ifTrue: z.lazy(() => HPFormulaSchema),
  ifFalse: z.lazy(() => HPFormulaSchema).optional(),
});

export const HPFormulaSchema: z.ZodType<HPFormulaType> = z
  .discriminatedUnion("type", [
    HealingFormulaSchema,
    DamageFormulaSchema,
    ConditionalHPFormulaSchema,
    HalfDamageFormulaSchema,
  ])
  .refine(
    (data) => {
      if (data.type === "conditional" || data.type === "halfDamage") {
        return true;
      }
      if (data.type === "healing") {
        return (
          data.roll || data.fixed !== undefined || data.addSpellcastingModifier
        );
      }
      return data.roll || data.fixed !== undefined;
    },
    {
      message:
        "A fórmula precisa ter pelo menos uma rolagem (roll), um valor fixo (fixed) ou usar addSpellcastingModifier.",
    },
  );

export const AcSchema = z.discriminatedUnion("calculation", [
  z.object({ calculation: z.literal("base"), value: z.number() }),
  z.object({ calculation: z.literal("bonus"), value: z.number() }),
  z.object({
    calculation: z.literal("formula"),
    base: z.number(),
    attribute: AbilityScoreEnum,
    maxBonus: z.number().optional(),
  }),
]);

const SelectionModeEnum = z.enum(["choice", "all"]);

export const RequirementSchema = z.object({
  user: GameEventSchema.optional(),
  target: GameEventSchema.optional(),
  allTargetsInArea: GameEventSchema.optional(),
  environment: z.array(z.any()).optional(),
});

export const AreaSchema = z.discriminatedUnion("shape", [
  z.object({
    shape: z.literal("sphere"),
    radius: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cube"),
    size: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("cone"),
    length: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
  z.object({
    shape: z.literal("line"),
    length: z.number(),
    width: z.number(),
    unit: DistanceUnitEnum.default("ft"),
    selectionMode: SelectionModeEnum.default("all").optional(),
  }),
]);
