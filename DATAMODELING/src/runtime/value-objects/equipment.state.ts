import { z } from "zod";
import { ArmorIdEnum, WeaponIdEnum } from "../../shared/data-based-enums.js";

export const BodyArmorIdEnum = ArmorIdEnum.exclude(["armor-escudo"]);
export const ShieldArmorIdEnum = z.literal("armor-escudo");

export const EquipmentStateSchema = z.object({
  bodyArmorItemId: BodyArmorIdEnum.nullable(),
  shieldItemId: ShieldArmorIdEnum.nullable(),
  mainHandWeaponId: WeaponIdEnum.nullable(),
  offHandWeaponId: WeaponIdEnum.nullable(),
});

export type EquipmentStateType = z.infer<typeof EquipmentStateSchema>;
