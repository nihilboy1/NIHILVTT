import { z } from "zod";
import { ArmorIdEnum, WeaponIdEnum } from "../../shared/data-based-enums.js";

export const BodyArmorIdEnum = ArmorIdEnum.exclude(["armor-escudo"]);
export const ShieldArmorIdEnum = z.literal("armor-escudo");

export const EquipmentStateSchema = z.object({
  bodyArmorItemId: BodyArmorIdEnum.nullable().default(null),
  shieldItemId: ShieldArmorIdEnum.nullable().default(null),
  mainHandWeaponId: WeaponIdEnum.nullable().default(null),
  offHandWeaponId: WeaponIdEnum.nullable().default(null),
});

export type EquipmentStateType = z.infer<typeof EquipmentStateSchema>;
