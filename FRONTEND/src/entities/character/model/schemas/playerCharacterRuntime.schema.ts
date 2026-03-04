import { z } from 'zod';
import {
  MonsterCharacterStateSchema,
  PlayerCharacterStateSchema,
  SessionCharacterStateSchema,
} from '@nihilvtt/datamodeling/runtime';

export const playerCharacterRuntimeSchema = PlayerCharacterStateSchema;
export const monsterCharacterRuntimeSchema = MonsterCharacterStateSchema;
export const sessionCharacterRuntimeSchema = SessionCharacterStateSchema;

export type PlayerCharacterRuntime = z.infer<typeof playerCharacterRuntimeSchema>;
export type MonsterCharacterRuntime = z.infer<typeof monsterCharacterRuntimeSchema>;
export type SessionCharacterRuntime = z.infer<typeof sessionCharacterRuntimeSchema>;

export function isPlayerCharacterRuntime(
  runtimeCharacter: SessionCharacterRuntime | null | undefined,
): runtimeCharacter is PlayerCharacterRuntime {
  return runtimeCharacter?.type === 'Player';
}

export function isMonsterCharacterRuntime(
  runtimeCharacter: SessionCharacterRuntime | null | undefined,
): runtimeCharacter is MonsterCharacterRuntime {
  return runtimeCharacter?.type === 'NPC';
}
