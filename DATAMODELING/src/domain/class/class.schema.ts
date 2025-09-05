import z from "zod";
import { SourceEnum } from "../../shared/primitives/system.primitives";
import { EffectSchema } from "../../shared/effect.schema";
import { StartingEquipmentSchema } from "../../shared/character-blocks.schema";
import { RequirementSchema } from "../../shared/game-events.schema";
import { AbilityScoreEnum } from "../../shared/primitives/character.primitives";
import { DiceRollSchema } from "../../shared/blocks.schema";
import { ClassProgressionSchema } from "../../shared/class-progression.schema";
import { FighterResourcesIdEnum } from "../../shared/primitives/class.primitives";

export const ClassResourcesSchema = z.discriminatedUnion("class", [
  z.object({
    class: z.literal("fighter"),
    classResourceIds: FighterResourcesIdEnum.array(),
  }),
]);

export const ClassSchema = z.object({
  id: z.string().min(1),
  name: z.string().array(),
  primaryAbilities: z.object({
    choose: {
      from: AbilityScoreEnum.array(),
      count: z.number().int().min(1),
    },
  }),
  initialHitPoints: DiceRollSchema,
  source: SourceEnum,
  description: z.string(),
  multiclassingBenefits: z.array(EffectSchema),
  effects: z.array(EffectSchema),
  classResources: ClassResourcesSchema,
  startingEquipment: StartingEquipmentSchema,
  multiclassingRequirements: RequirementSchema,
  classProgression: ClassProgressionSchema,
});

export type Class = z.infer<typeof ClassSchema>;
