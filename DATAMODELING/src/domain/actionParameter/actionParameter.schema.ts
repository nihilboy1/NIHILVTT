import { z } from "zod";

import {
  AreaSchema,
  RechargeSchema,
  RollModifierSchema,
} from "../../shared/blocks.schema.js";
import {
  ActionOutcomesSchema,
  ActionOutcomeType,
  ChooseEffectOutcomeSchema,
} from "../../shared/outcome.schema.js";
import {
  ActionTypeEnum,
  CoverEnum,
  RechargeEventEnum,
  ResourceTypeEnum,
} from "../../shared/primitives/combat.primitives.js";
import { AbilityScoreEnum } from "../../shared/primitives/character.primitives.js";
import {
  AttackTypeSchema,
  BonusSchema,
  DcSchema,
  DiceRollSchema,
  RangeSchema,
  TargetSchema,
} from "../../shared/character-blocks.schema.js";
import {
  GameEventSchema,
  RequirementSchema,
} from "../../shared/game-events.schema.js";

export const ActionParametersSchema = z.object({
  activation: z
    .object({
      type: ActionTypeEnum,
      extraCost: z
        .object({
          amount: z.number().int(),
          source: z.enum(["item", "character"]),
          resourceType: ResourceTypeEnum,
          resourceId: z.enum(["secondWind"]).optional(),
        })
        .optional(),
      triggers: GameEventSchema.optional(),
    })
    .optional(),
  attackType: AttackTypeSchema.array().optional(),
  attackBonus: BonusSchema.optional(),
  range: RangeSchema.optional(),
  overrideAbilityScore: AbilityScoreEnum.or(
    z.literal("spellcasting"),
  ).optional(),
  requirements: RequirementSchema.optional(),
  triggers: GameEventSchema.optional(),

  area: AreaSchema.optional(),
  target: TargetSchema.optional(),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
      ignoreCovers: CoverEnum.array().optional(),
      rollModifier: RollModifierSchema.optional(), // <-- aqui
    })
    .optional(),
  charges: RechargeSchema.optional(),
  outcomes: z.array(z.lazy(() => ActionOutcomesSchema)).optional(),
  choices: ChooseEffectOutcomeSchema.optional(),
});

export interface ActionParametersType {
  activation?: {
    type: z.infer<typeof ActionTypeEnum>;
    cost?: {
      amount: number;
      source: "item" | "character";
      resourceId: z.infer<typeof ResourceTypeEnum>;
    };
    trigger?: z.infer<typeof GameEventSchema>;
  };
  attackType?: z.infer<typeof AttackTypeSchema>;
  overrideAbilityScore?: z.infer<typeof AbilityScoreEnum> | "spellcasting";

  range?: z.infer<typeof RangeSchema>;
  area?: z.infer<typeof AreaSchema>;
  target?: z.infer<typeof TargetSchema>;
  save?: {
    ability: z.infer<typeof AbilityScoreEnum>;
    dc: z.infer<typeof DcSchema>;
  };
  outcomes?: ActionOutcomeType[];
  charges?: {
    max: number;
    recharge?: {
      amount: z.infer<typeof DiceRollSchema>;
      event: z.infer<typeof RechargeEventEnum>;
    };
  };
}
