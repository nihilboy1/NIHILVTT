import { DamageTypeEnum } from '@nihilvtt/datamodeling/primitives';

export const COMBAT_DAMAGE_TYPE_VALUES = DamageTypeEnum.options;

export type CombatDamageType = (typeof COMBAT_DAMAGE_TYPE_VALUES)[number];
