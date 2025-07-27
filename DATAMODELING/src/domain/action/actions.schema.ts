import { z } from "zod";
import {
  AbilityScoreEnum,
  ActionTypeEnum,
  AttackTypeEnum,
  ReactionTriggerEnum,
  RechargeEventEnum,
  ResourceCostIdEnum,
} from "../../shared/primitives.js";
import {
  DcSchema,
  AreaSchema,
  RangeSchema,
  TargetSchema,
  DiceRollSchema,
} from "../../shared/blocks.schema.js";
import { ActionOutcomesSchema } from "../../shared/outcomes.schema.js";

export const ActionParametersSchema = z.object({
  activation: z
    .object({
      type: ActionTypeEnum,
      cost: z
        .object({
          amount: z.number().int(),
          source: z.enum(["item", "character"]),
          resourceId: ResourceCostIdEnum,
        })
        .optional(),
      trigger: ReactionTriggerEnum.optional(),
    })
    .optional(),
  attackType: AttackTypeEnum.optional(),
  range: RangeSchema.optional(),
  area: AreaSchema.optional(),
  target: TargetSchema.optional(),
  save: z
    .object({
      ability: AbilityScoreEnum,
      dc: DcSchema,
    })
    .optional(),
  outcomes: z.array(ActionOutcomesSchema).optional(),
  charges: z
    .object({
      max: z.number().int(),
      recharge: z
        .object({
          amount: DiceRollSchema,
          event: RechargeEventEnum,
        })
        .optional(),
    })
    .optional(),
});
export const ActionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const FinalActionDataSchema = z.array(ActionSchema);
