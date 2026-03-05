import type { SessionCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';

type TokenControlInput = {
  gameOwnerUserId: number | null | undefined;
  currentUserId: number | null | undefined;
  runtimeCharacter: SessionCharacterRuntime | null | undefined;
};

export function canUserControlToken(input: TokenControlInput): boolean {
  const { gameOwnerUserId, currentUserId, runtimeCharacter } = input;

  if (gameOwnerUserId == null || currentUserId == null) {
    return false;
  }

  if (gameOwnerUserId === currentUserId) {
    return true;
  }

  if (!runtimeCharacter) {
    return false;
  }

  if (runtimeCharacter.type === 'NPC') {
    return false;
  }

  return runtimeCharacter.controlledByUserId === currentUserId;
}
