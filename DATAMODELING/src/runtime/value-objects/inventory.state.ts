import { z } from "zod";
import { AllItemsEnum } from "../../shared/data-based-enums.js";

export const InventoryItemEntryStateSchema = z.object({
  itemId: AllItemsEnum,
  quantity: z.number().int().min(1),
});

export const InventoryStateSchema = z.object({
  items: z.array(InventoryItemEntryStateSchema),
});

export type InventoryItemEntryStateType = z.infer<typeof InventoryItemEntryStateSchema>;
export type InventoryStateType = z.infer<typeof InventoryStateSchema>;
