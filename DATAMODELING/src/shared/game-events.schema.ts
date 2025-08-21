import z from "zod";
import {
  AbilityScoreEnum,
  AncestryIdEnum,
  SkillEnum,
} from "./primitives/character.primitives";
import { SpellIdEnum, WeaponIdEnum } from "./data-based-enums";
import { DcSchema, RangeSchema, TargetSchema } from "./blocks.schema";
import { AttackTypeEnum, DamageTypeEnum } from "./primitives/combat.primitives";
import { DurationUnitEnum } from "./primitives/world.primitives";
import {
  ConditionStatusEnum,
  CreatureSizeEnum,
  CreatureTypeEnum,
} from "./primitives/system.primitives";

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
    attackType: AttackTypeEnum.or(z.literal("any")),
  }),
  z.object({
    type: z.literal("attackHit"),
    attackType: AttackTypeEnum.or(z.literal("any")).optional(),
    weaponIds: WeaponIdEnum.array().optional(),
  }),
  z.object({
    type: z.literal("attackMissed"),
    attackType: AttackTypeEnum.or(z.literal("any")).optional(),
  }),
  z.object({
    type: z.literal("wasAttacked"),
    attackType: AttackTypeEnum.optional(),
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
    attackType: AttackTypeEnum.or(z.literal("any")).array().optional(),
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
    type: z.literal("userOrAlliesActedHostile"),
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
    type: z.literal("madeAttackRoll"),
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
