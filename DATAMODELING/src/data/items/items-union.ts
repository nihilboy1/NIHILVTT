import type { Item } from "../../domain/item/item.schema";
import { itemsArmor } from "./items-armor";
import { itemsGear } from "./items-gear";
import { itemsTool } from "./items-tool";
import { itemsWeapon } from "./items-weapon";

export const PHB2024ITEMS = [
  ...itemsArmor,
  ...itemsGear,
  ...itemsTool,
  ...itemsWeapon,
] as const satisfies Item[];
