import { z } from "zod";
import {
  AlignmentEnum,
  CreatureSizeEnum,
  CreatureTypeEnum,
  LanguageEnum,
} from "../../shared/primitives/character.primitives";
import { EnvironmentEnum } from "../../shared/primitives/world.primitives";
import { EffectSchema } from "../../shared/effect.schema";
import {
  ChallengeRatingEnum,
  SourceEnum,
} from "../../shared/primitives/system.primitives";
import {
  AbilityScoresSchema,
  DefensesSchema,
  HitPointsSchema,
  ProficienciesSchema,
  SensesSchema,
  SpeedSchema,
} from "../../shared/character-blocks.schema";

export const MonsterSchema = z.object({
  id: z.string().min(1),
  name: z.array(z.string().min(1)),
  source: SourceEnum,
  description: z.string(),
  tokenUrl: z.url(),
  splashArtUrl: z.url(),
  size: CreatureSizeEnum,
  type: CreatureTypeEnum,
  alignment: AlignmentEnum,
  environment: EnvironmentEnum.array(),
  isFamiliar: z.boolean().default(false).optional(),
  armorClass: z.number().int(),
  hitPoints: HitPointsSchema,
  speed: SpeedSchema,
  traits: z
    .object({ name: z.string().min(1), description: z.string() })
    .array()
    .default([])
    .optional(),
  abilityScores: AbilityScoresSchema,
  proficiencyBonus: ProficienciesSchema.optional(),
  senses: SensesSchema.optional(),
  defenses: DefensesSchema.optional(),
  languages: z.array(LanguageEnum.or(z.literal("any"))).optional(),
  challengeRating: ChallengeRatingEnum,
  effects: z.array(EffectSchema),
});

export type MonsterType = z.infer<typeof MonsterSchema>;
export const MonsterSchemaArray = z.array(MonsterSchema);
