import { z } from "zod";
import {
  AbilityScoreEnum,
  AlignmentEnum,
  EnvironmentEnum,
  LanguageEnum,
  SkillEnum,
  VisionTypeEnum,
} from "../../shared/primitives/character.primitives";
import { DamageTypeEnum } from "../../shared/primitives/combat.primitives";
import { DiceRollSchema } from "../../shared/blocks.schema";
import { EffectSchema } from "../../shared/effect.schema";
import {
  DistanceUnitEnum,
} from "../../shared/primitives/world.primitives";
import { ArmorIdEnum } from "../../data/items/items-armor";
import { GearIdEnum } from "../../data/items/items-gear";
import { ToolIdEnum } from "../../data/items/items-tool";
import { WeaponIdEnum } from "../../data/items/items-weapon";
import { ChallengeRatingEnum, ConditionStatusEnum, CreatureSizeEnum, CreatureTypeEnum, SourceEnum } from "../../shared/primitives/system.primitives";
const ItemIdEnum = z.union([WeaponIdEnum, ArmorIdEnum, GearIdEnum, ToolIdEnum]);
const AbilityScoresSchema = z.object({
  strength: z.number().int(),
  dexterity: z.number().int(),
  constitution: z.number().int(),
  intelligence: z.number().int(),
  wisdom: z.number().int(),
  charisma: z.number().int(),
});
const HitPointsSchema = z.object({
  average: z.number().int(),
  formula: DiceRollSchema,
});
const SpeedSchema = z.object({
  walk: z.number().int().optional(),
  climb: z.number().int().optional(),
  fly: z.number().int().optional(),
  swim: z.number().int().optional(),
  burrow: z.number().int().optional(),
  unit: DistanceUnitEnum,
});
const ProficienciesSchema = z.object({
  skills: z
    .array(
      z.object({
        skill: SkillEnum,
        bonus: z.number().int(),
      }),
    )
    .optional(),
  savingThrows: z
    .array(
      z.object({
        ability: AbilityScoreEnum,
        bonus: z.number().int(),
      }),
    )
    .optional(),
});
const DefensesSchema = z.object({
  resistances: z.array(DamageTypeEnum).optional(),
  vulnerabilities: z.array(DamageTypeEnum).optional(),
  immunities: z
    .object({
      damage: z.array(DamageTypeEnum).optional(),
      condition: z.array(ConditionStatusEnum).optional(),
    })
    .optional(),
});

const SensesSchema = z.object({
  passivePerception: z.number().int().min(0),
  vision: z
    .object({
      darkvision: z.number().int().positive(),
      blindsight: z.number().int().positive(),
      tremorsense: z.number().int().positive(),
      truesight: z.number().int().positive(),
    })
    .partial()
    .optional(),
});

export const MonsterSchema = z.object({
  id: z.string().min(1),
  name: z.array(z.string().min(1)),
  source: SourceEnum,
  description: z.string().optional(),
  tokenUrl: z.url().optional(),
  splashArtUrl: z.url().optional(),
  size: CreatureSizeEnum,
  type: CreatureTypeEnum,
  alignment: AlignmentEnum,
  environment: EnvironmentEnum.array(),
  isFamiliar: z.boolean().default(false).optional(),
  armorClass: z.number().int(),
  hitPoints: HitPointsSchema,
  speed: SpeedSchema,
  traits: z
    .object({ name: z.string().min(1), description: z.string().optional() })
    .array()
    .default([])
    .optional(),
  abilityScores: AbilityScoresSchema,
  proficiencyBonus: ProficienciesSchema.optional(),
  senses: SensesSchema.optional(),
  defenses: DefensesSchema.optional(),
  languages: z.array(LanguageEnum.or(z.literal("other"))).optional(),
  challengeRating: ChallengeRatingEnum,
  effects: z.array(EffectSchema),
  equipment: z
    .array(
      z.object({
        itemId: ItemIdEnum,
        isEquipped: z.boolean().default(true),
      }),
    )
    .optional(),
});

export type Monster = z.infer<typeof MonsterSchema>;
