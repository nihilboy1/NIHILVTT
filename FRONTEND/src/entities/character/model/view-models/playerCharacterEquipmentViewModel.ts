import { PHB2024ITEMS } from '@nihilvtt/datamodeling/data';

import type { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';
import type { PlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';

export type EquipmentSlotId =
  | 'helmet'
  | 'upper'
  | 'legs'
  | 'shoes'
  | 'ringLeft'
  | 'ringRight'
  | 'bodyArmor'
  | 'mainHand'
  | 'offHand'
  | 'amulet';

export type EquipmentSlotViewModel = {
  id: EquipmentSlotId;
  label: string;
  itemId: string | null;
  itemName: string | null;
  isActive: boolean;
  isModeled: boolean;
};

export type InventoryItemViewModel = {
  key: string;
  itemId: string;
  name: string;
  quantity: number;
  equipped: boolean;
};

export type PlayerCharacterEquipmentViewModel = {
  slots: EquipmentSlotViewModel[];
  inventory: InventoryItemViewModel[];
};

const EMPTY_SLOT_LABELS: Array<{ id: EquipmentSlotId; label: string; isModeled: boolean }> = [
  { id: 'helmet', label: 'Helmet', isModeled: false },
  { id: 'amulet', label: 'Amulet', isModeled: false },
  { id: 'ringLeft', label: 'Ring L', isModeled: false },
  { id: 'ringRight', label: 'Ring R', isModeled: false },
  { id: 'upper', label: 'Upper', isModeled: false },
  { id: 'bodyArmor', label: 'Armor', isModeled: true },
  { id: 'mainHand', label: 'Main Hand', isModeled: true },
  { id: 'offHand', label: 'Off Hand', isModeled: true },
  { id: 'legs', label: 'Legs', isModeled: false },
  { id: 'shoes', label: 'Shoes', isModeled: false },
];

function getItemDisplayName(itemId: string | null): string | null {
  if (!itemId) {
    return null;
  }

  const item = PHB2024ITEMS.find((entry) => entry.id === itemId);
  if (!item) {
    return itemId;
  }

  return item.name[1] ?? item.name[0] ?? item.id;
}

export function buildPlayerCharacterEquipmentViewModel(
  character: PlayerCharacter,
  runtimeCharacter?: PlayerCharacterRuntime | null,
): PlayerCharacterEquipmentViewModel {
  void character;

  const slots = EMPTY_SLOT_LABELS.map((slot) => {
    if (!runtimeCharacter) {
      return {
        ...slot,
        itemId: null,
        itemName: null,
        isActive: false,
      };
    }

    switch (slot.id) {
      case 'bodyArmor': {
        const itemId = runtimeCharacter.equipment.bodyArmorItemId;
        return {
          ...slot,
          itemId,
          itemName: getItemDisplayName(itemId),
          isActive: itemId !== null,
        };
      }
      case 'mainHand': {
        const itemId = runtimeCharacter.equipment.mainHandWeaponId;
        return {
          ...slot,
          itemId,
          itemName: getItemDisplayName(itemId),
          isActive: itemId !== null,
        };
      }
      case 'offHand': {
        const itemId =
          runtimeCharacter.equipment.offHandWeaponId ?? runtimeCharacter.equipment.shieldItemId;
        return {
          ...slot,
          itemId,
          itemName: getItemDisplayName(itemId),
          isActive:
            runtimeCharacter.equipment.offHandWeaponId !== null ||
            runtimeCharacter.equipment.shieldItemId !== null,
        };
      }
      default:
        return {
          ...slot,
          itemId: null,
          itemName: null,
          isActive: false,
        };
    }
  });

  const inventory = runtimeCharacter
    ? runtimeCharacter.inventory.items.map((item) => ({
        key: item.itemId,
        itemId: item.itemId,
        name: getItemDisplayName(item.itemId) ?? item.itemId,
        quantity: item.quantity,
        equipped:
          item.itemId === runtimeCharacter.equipment.bodyArmorItemId ||
          item.itemId === runtimeCharacter.equipment.shieldItemId ||
          item.itemId === runtimeCharacter.equipment.mainHandWeaponId ||
          item.itemId === runtimeCharacter.equipment.offHandWeaponId,
      }))
    : [];

  return {
    slots,
    inventory,
  };
}
