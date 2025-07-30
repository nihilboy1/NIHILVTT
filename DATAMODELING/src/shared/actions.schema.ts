// ============================================================================
// >> INÍCIO: src/domain/shared/action.schema.ts
// Este arquivo definirá a estrutura de uma "Ação" no jogo.
// Ele dependerá de Outcomes, então precisará importá-los.
// ============================================================================

import { z } from "zod";
import {
  AbilityScoreEnum,
  ActionTypeEnum,
  AttackTypeEnum,
  ReactionTriggerEnum,
  RechargeEventEnum,
  ResourceCostIdEnum,
} from "../shared/primitives.js";
import {
  AreaSchema,
  DcSchema,
  DiceRollSchema,
  RangeSchema,
  TargetSchema,
} from "../shared/blocks.schema.js";
import {
  actionOutcomesSchema,
  ActionOutcomeType,
} from "../shared/outcome.schema.js";

export interface ActionParametersType {
  activation?: {
    type: z.infer<typeof ActionTypeEnum>;
    cost?: {
      amount: number;
      source: "item" | "character";
      resourceId: z.infer<typeof ResourceCostIdEnum>;
    };
    trigger?: z.infer<typeof ReactionTriggerEnum>;
  };
  attackType?: z.infer<typeof AttackTypeEnum>;
  range?: z.infer<typeof RangeSchema>;
  area?: z.infer<typeof AreaSchema>;
  target?: z.infer<typeof TargetSchema>;
  save?: {
    ability: z.infer<typeof AbilityScoreEnum>;
    dc: z.infer<typeof DcSchema>;
  };
  outcomes?: ActionOutcomeType[]; // <-- Dependência de Outcome
  charges?: {
    max: number;
    recharge?: {
      amount: z.infer<typeof DiceRollSchema>;
      event: z.infer<typeof RechargeEventEnum>;
    };
  };
}

const ActionParametersBaseSchema = z.object({
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
  save: z.object({ ability: AbilityScoreEnum, dc: DcSchema }).optional(),
  charges: z
    .object({
      max: z.number().int(),
      recharge: z
        .object({ amount: DiceRollSchema, event: RechargeEventEnum })
        .optional(),
    })
    .optional(),
});

// A ligação com z.lazy() resolve a dependência circular LÓGICA.
export const actionParametersSchema: z.ZodType<ActionParametersType> =
  ActionParametersBaseSchema.extend({
    outcomes: z.array(z.lazy(() => actionOutcomesSchema)).optional(),
  });

export type ActionParameters = z.infer<typeof actionParametersSchema>;
