import { z } from "zod";
import {
  ActionIdEnum,
  AllItemsEnum,
  FeatIdEnum,
  SpellIdEnum,
} from "../../shared/data-based-enums.js";
import { ClassIdEnum } from "../../shared/primitives/class.primitives.js";
import { ConditionStatusEnum } from "../../shared/primitives/system.primitives.js";
import { DurationUnitEnum } from "../../shared/primitives/world.primitives.js";

export const ActiveEffectSourceSchema = z.discriminatedUnion("sourceType", [
  z.object({
    sourceType: z.literal("class"),
    sourceId: ClassIdEnum,
  }),
  z.object({
    sourceType: z.literal("feat"),
    sourceId: FeatIdEnum,
  }),
  z.object({
    sourceType: z.literal("item"),
    sourceId: AllItemsEnum,
  }),
  z.object({
    sourceType: z.literal("spell"),
    sourceId: SpellIdEnum,
  }),
  z.object({
    sourceType: z.literal("action"),
    sourceId: ActionIdEnum,
  }),
]);

export const ActiveEffectDurationStateSchema = z.object({
  unit: DurationUnitEnum,
  remaining: z.number().int().min(0).optional(),
});

export const ActiveEffectEntryStateSchema = z.object({
  instanceId: z.uuid(),
  source: ActiveEffectSourceSchema,
  effectIndex: z.number().int().min(0),
  appliedByCharacterId: z.string().min(1).optional(),
  linkedCondition: ConditionStatusEnum.optional(),
  remainingDuration: ActiveEffectDurationStateSchema.optional(),
  stackCount: z.number().int().min(1).default(1),
  isSuppressed: z.boolean().default(false),
});

export const ActiveEffectStateSchema = z.object({
  effects: z.array(ActiveEffectEntryStateSchema).default([]),
});

export type ActiveEffectSourceType = z.infer<typeof ActiveEffectSourceSchema>;
export type ActiveEffectDurationStateType = z.infer<typeof ActiveEffectDurationStateSchema>;
export type ActiveEffectEntryStateType = z.infer<typeof ActiveEffectEntryStateSchema>;
export type ActiveEffectStateType = z.infer<typeof ActiveEffectStateSchema>;
