import { z } from "zod";
import { CharacterTypeEnum } from "../../shared/primitives/character.primitives.js";
import { ActiveEffectEntryStateSchema } from "../value-objects/active-effect.state.js";

const MonsterIdSchema = z.string().regex(/^monster-[a-z0-9-]+$/, {
  message: "Monster id must use the canonical namespaced format (monster-...).",
});

const MonsterResourceIdSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)+$/, {
  message: "Monster resource ids must use the canonical namespaced format.",
});

export const MonsterCharacterIdentityStateSchema = z.object({
  id: z.uuid(),
  type: z.literal(CharacterTypeEnum.enum.NPC),
  monsterId: MonsterIdSchema,
});

export const MonsterCharacterHitPointStateSchema = z.object({
  current: z.number().int().min(0),
  temporary: z.number().int().min(0),
});

export const MonsterResourcePoolEntryStateSchema = z.object({
  resourceId: MonsterResourceIdSchema,
  current: z.number().int().min(0),
});

export const MonsterResourcePoolStateSchema = z.object({
  pools: z.array(MonsterResourcePoolEntryStateSchema),
});

export const MonsterActiveEffectStateSchema = z.object({
  effects: z.array(ActiveEffectEntryStateSchema),
});

export const MonsterCharacterStateSchema = z.object({
  ...MonsterCharacterIdentityStateSchema.shape,
  nameOverride: z.string().min(1).max(100).nullable(),
  imageOverride: z.string().min(1).nullable(),
  hitPoints: MonsterCharacterHitPointStateSchema,
  resourcePools: MonsterResourcePoolStateSchema,
  activeEffects: MonsterActiveEffectStateSchema,
  notes: z.string().max(5000).nullable(),
});

export type MonsterCharacterIdentityStateType = z.infer<typeof MonsterCharacterIdentityStateSchema>;
export type MonsterCharacterHitPointStateType = z.infer<typeof MonsterCharacterHitPointStateSchema>;
export type MonsterResourcePoolEntryStateType = z.infer<typeof MonsterResourcePoolEntryStateSchema>;
export type MonsterResourcePoolStateType = z.infer<typeof MonsterResourcePoolStateSchema>;
export type MonsterActiveEffectStateType = z.infer<typeof MonsterActiveEffectStateSchema>;
export type MonsterCharacterStateType = z.infer<typeof MonsterCharacterStateSchema>;
