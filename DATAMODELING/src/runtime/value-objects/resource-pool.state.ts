import { z } from "zod";
import { ClassResourceIdEnum } from "../../shared/primitives/class.primitives.js";

export const ResourcePoolEntryStateSchema = z.object({
  resourceId: ClassResourceIdEnum,
  current: z.number().int().min(0).default(0),
});

export const ResourcePoolStateSchema = z.object({
  pools: z.array(ResourcePoolEntryStateSchema).default([]),
});

export type ResourcePoolEntryStateType = z.infer<typeof ResourcePoolEntryStateSchema>;
export type ResourcePoolStateType = z.infer<typeof ResourcePoolStateSchema>;
