import { array, z } from "zod";

import {
  AreaSchema,
  DcSchema,
  DiceRollSchema,
  RangeSchema,
  RechargeSchema,
  RequirementSchema,
  RollModifierSchema,
  TargetSchema,
} from "../../shared/blocks.schema.js";
import {
  ActionOutcomesSchema,
  ActionOutcomeType,
  ChooseEffectOutcomeSchema,
} from "../../shared/outcome.schema.js";
import {
  ActionTypeEnum,
  AttackTypeEnum,
  CoverEnum,
  RechargeEventEnum,
  ResourceCostIdEnum,
} from "../../shared/primitives/combat.primitives.js";
import { AbilityScoreEnum } from "../../shared/primitives/character.primitives.js";
import { GameEventSchema } from "../../shared/game-events.schema.js";

export const ActionParametersSchema = z.object({
  activation: z
    .object({
      type: ActionTypeEnum,
      extraCost: z
        .object({
          amount: z.number().int(),
          source: z.enum(["item", "character"]),
          resourceId: ResourceCostIdEnum,
        })
        .optional(),
      triggers: GameEventSchema.optional(),
    })
    .optional(),
  attackType: AttackTypeEnum.array().optional(),
  attackBonus: z.number().int().optional(),
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
      resourceId: z.infer<typeof ResourceCostIdEnum>;
    };
    trigger?: z.infer<typeof GameEventSchema>;
  };
  attackType?: z.infer<typeof AttackTypeEnum>;
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
