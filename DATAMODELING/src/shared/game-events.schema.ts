import { z } from "zod";
import {
  ComparisonEnum,
  ConditionStatusEnum,
  CreatureSizeEnum,
  CreatureTypeEnum,
} from "./primitives/system.primitives.js";
import { SpellIdEnum, WeaponIdEnum } from "./data-based-enums.js";
import {
  AbilityScoreEnum,
  AncestryNameEnum,
  ClassesIdEnum,
  SkillEnum,
} from "./primitives/character.primitives.js";
import {
  AttackTypeSchema,
  DcSchema,
  RangeSchema,
  TargetSchema,
} from "./character-blocks.schema.js";
import { ActionTypeEnum, DamageTypeEnum } from "./primitives/combat.primitives.js";
import { DurationUnitEnum } from "./primitives/world.primitives.js";
import { ArmorTypeEnum, WeaponPropertyEnum } from "./primitives/item.primitives.js";

// ============================================================================
// SEÇÃO 1: O ESQUEMA DE CONDIÇÕES BASE (NÃO-RECURSIVO)
// Este é o pilar da nossa lógica de eventos.
// ============================================================================

const EventConditionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hasAttribute"),
    attribute: AbilityScoreEnum,
    value: z.number().int().min(0),
    comparison: ComparisonEnum.default("greaterOrEqual"),
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
    ancestry: AncestryNameEnum,
  }),
  z.object({
    type: z.literal("hasLevel"),
    value: z.number().int().min(1),
    comparison: ComparisonEnum.default("greaterOrEqual"),
  }),
  z.object({
    type: z.literal("hasSpellcasting"),
  }),
  z.object({
    type: z.literal("hasClass"),
    class: ClassesIdEnum,
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
    armorType: ArmorTypeEnum.optional(),
  }),
  z.object({
    type: z.literal("droppedItem"),
    itemId: z.string().optional(),
  }),
  z.object({
    type: z.literal("madeAttackRoll"),
    attackType: AttackTypeSchema.optional(),
    weaponProperty: WeaponPropertyEnum.optional(),
    actionType: ActionTypeEnum.optional(),

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
    comparison: ComparisonEnum.default("greaterOrEqual"),
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

// ============================================================================
// SEÇÃO 2: DEFINIÇÃO DOS TIPOS E ESQUEMAS RECURSIVOS
// ============================================================================

// PASSO A: Definir os tipos TypeScript manualmente para guiar o compilador.

export type GameEventType =
  | z.infer<typeof EventConditionSchema>
  | {
      conditionMode?: "any" | "all";
      events: GameEventType[];
    };

type EventOrGroupType =
  | z.infer<typeof EventConditionSchema>
  | ConditionGroupType;

type ConditionGroupType = {
  type: "group";
  conditionMode: "any" | "all";
  events?: EventOrGroupType[];
};

// PASSO B: Criar os schemas Zod, usando os tipos que acabamos de definir.
const ConditionGroupSchema: z.ZodType<ConditionGroupType> = z.object({
  type: z.literal("group"),
  conditionMode: z.enum(["any", "all"]).default("all"),
  events: z.lazy(() => z.array(EventOrGroupOrConditionSchema)).optional(),
});

const EventOrGroupOrConditionSchema: z.ZodType<EventOrGroupType> = z.lazy(() =>
  z.union([EventConditionSchema, ConditionGroupSchema]),
);

// PASSO C: Definir o schema de topo que usa a nossa estrutura recursiva.
export const GameEventSchema: z.ZodType<GameEventType> = z.lazy(() =>
  z.union([
    EventConditionSchema,
    z.object({
      conditionMode: z.enum(["any", "all"]).optional(),
      events: z.array(GameEventSchema),
    }),
  ]),
);

export const RequirementSchema = z.object({
  user: GameEventSchema.optional(),
  target: GameEventSchema.optional(),
});
