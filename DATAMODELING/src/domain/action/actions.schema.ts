import { z } from "zod";
import {
  AbilityScoreEnum,
  ActionTypeEnum,
  AttackTypeEnum,
  RechargeEventEnum,
  ResourceCostIdEnum,
} from "../../shared/primitives.js";
import {
  DcSchema,
  AreaSchema,
  RangeSchema,
  TargetSchema,
} from "../../shared/blocks.schema.js";
import { ActionOutcomeSchema } from "../../shared/outcomes.schema.js";

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
      trigger: z.string().optional(),
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
  effects: z.array(ActionOutcomeSchema).optional(),
  charges: z
    .object({
      max: z.number().int(),
      recharge: z
        .object({
          amount: z.string(),
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
