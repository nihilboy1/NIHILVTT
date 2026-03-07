import { useMemo } from 'react';

import { usePlayerCharacterCombatViewModel } from '@/entities/character/lib/hooks/usePlayerCharacterCombatViewModel';
import { getPlayerProficiencyBonusFromLevel } from '@/entities/character/model/rules/characterDerivedRules';
import {
  buildUnarmedAttackEntry,
  buildWeaponAttackEntry,
} from '@/entities/character/model/rules/weaponAttackDerivedRules';
import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useAuthStore } from '@/features/auth/model/authStore';
import { buildActionAttackEntries } from '@/features/combat/model/actionEntryAdapters';
import { useCombatStore } from '@/features/combat/model/store';
import { useGameStore } from '@/features/game/model/gameStore';
import { canUserControlToken } from '@/features/game/model/tokenControlPolicy';
import { useUIStore } from '@/features/layoutControls/model/store';
import { AttackEntry, PendingAttackSelection } from '@/shared/api/types';
import { DraggablePanel } from '@/shared/ui/DraggablePanel';
import { FloatingPanelDragBar } from '@/shared/ui/FloatingPanelDragBar';

interface TokenActionBarProps {
  tokenId: string | null;
  pendingAttack: PendingAttackSelection | null;
  pendingMovementTokenId: string | null;
  onArmAttack: (attack: AttackEntry) => void;
  onCancelAttack: () => void;
  onArmMovement: () => void;
  onCancelMovement: () => void;
}

export function TokenActionBar({
  tokenId,
  pendingAttack,
  pendingMovementTokenId,
  onArmAttack,
  onCancelAttack,
  onArmMovement,
  onCancelMovement,
}: TokenActionBarProps) {
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);
  const characters = useCharactersStore((state) => state.characters);
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const tokensOnBoard = useTokenStore((state) => state.tokensOnBoard);
  const combatState = useCombatStore((state) => state.combatState);

  const token = tokenId ? (tokensOnBoard.find((entry) => entry.id === tokenId) ?? null) : null;
  const character = token
    ? (characters.find((entry) => entry.id === token.characterId) ?? null)
    : null;
  const runtimeCharacter = token ? (runtimeCharactersById[token.characterId] ?? null) : null;
  const runtimeCharacterType = runtimeCharacter?.type ?? null;
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter)
    ? runtimeCharacter
    : null;
  const combatViewModel = usePlayerCharacterCombatViewModel(token?.characterId ?? '');
  const currentUser = useAuthStore((state) => state.user);
  const currentGame = useGameStore((state) => state.currentGame);

  const attackEntries = useMemo(() => {
    if (!token || !character) {
      return [];
    }

    if (character.type === 'NPC') {
      return buildActionAttackEntries(character.id, character.actions);
    }

    if (!playerRuntimeCharacter || !combatViewModel) {
      console.error(
        'Violação de contrato de sessão: TokenActionBar recebeu personagem Player sem runtime de Player válido.',
        { tokenId: token.id, characterId: character.id, runtimeType: runtimeCharacterType },
      );
      return [];
    }

    const proficiencyBonus = getPlayerProficiencyBonusFromLevel(combatViewModel.level);
    const entries: AttackEntry[] = [
      buildUnarmedAttackEntry({
        strength: combatViewModel.strength,
        proficiencyBonus,
        specieId: playerRuntimeCharacter.build.specieId,
      }),
    ];

    const mainHandEntry = buildWeaponAttackEntry(
      playerRuntimeCharacter.equipment.mainHandWeaponId,
      {
        classId: playerRuntimeCharacter.build.classId,
        strength: combatViewModel.strength,
        dexterity: combatViewModel.dexterity,
        proficiencyBonus,
        sourceSlot: 'mainHandWeaponId',
      },
    );

    const offHandEntry = buildWeaponAttackEntry(playerRuntimeCharacter.equipment.offHandWeaponId, {
      classId: playerRuntimeCharacter.build.classId,
      strength: combatViewModel.strength,
      dexterity: combatViewModel.dexterity,
      proficiencyBonus,
      sourceSlot: 'offHandWeaponId',
    });

    if (mainHandEntry) {
      entries.push(mainHandEntry);
    }

    if (offHandEntry) {
      const duplicatesMainHand = entries.some(
        (entry) => entry.sourceItemId != null && entry.sourceItemId === offHandEntry.sourceItemId,
      );
      if (duplicatesMainHand) {
        entries.push({
          ...offHandEntry,
          id: `${offHandEntry.id}-offhand`,
          label: `${offHandEntry.label} (Mão Sec.)`,
        });
      } else {
        entries.push(offHandEntry);
      }
    }

    return entries;
  }, [character, combatViewModel, playerRuntimeCharacter, runtimeCharacterType, token]);

  const targetLabel = useMemo(() => {
    if (!pendingAttack?.targetTokenId) {
      return null;
    }

    const targetToken = tokensOnBoard.find((entry) => entry.id === pendingAttack.targetTokenId);
    if (!targetToken) {
      return null;
    }

    const targetCharacter = characters.find((entry) => entry.id === targetToken.characterId);
    return targetCharacter?.name ?? 'Alvo';
  }, [characters, pendingAttack?.targetTokenId, tokensOnBoard]);

  const canTakeTurnActions = useMemo(() => {
    if (!token || !combatState) {
      return false;
    }

    const participantIndex = combatState.participants.findIndex(
      (participant) => participant.tokenId === token.id,
    );
    if (participantIndex < 0) {
      return false;
    }

    return participantIndex === combatState.turnIndex;
  }, [combatState, token]);

  const canSpendAction = useMemo(() => {
    return canTakeTurnActions && (combatState?.turnResources.actionAvailable ?? false);
  }, [canTakeTurnActions, combatState?.turnResources.actionAvailable]);

  const canMove = useMemo(() => {
    return canTakeTurnActions && (combatState?.turnResources.remainingMovementCells ?? 0) > 0;
  }, [canTakeTurnActions, combatState?.turnResources.remainingMovementCells]);

  const canCurrentUserControlToken = useMemo(() => {
    if (!token || !currentUser || !currentGame) {
      return false;
    }

    if (currentGame.owner.id === currentUser.id) {
      return true;
    }

    if (!runtimeCharacter) {
      console.error(
        'Violação de contrato de sessão: TokenActionBar recebeu token sem runtime compartilhado.',
        { tokenId: token.id, characterId: token.characterId },
      );
      return false;
    }

    return canUserControlToken({
      gameOwnerUserId: currentGame.owner.id,
      currentUserId: currentUser.id,
      runtimeCharacter,
    });
  }, [currentGame, currentUser, runtimeCharacter, token]);

  if (!token || !character || !canTakeTurnActions || !canCurrentUserControlToken) {
    return null;
  }

  const activeAttackId =
    pendingAttack?.attackerTokenId === token.id ? pendingAttack.attack.id : null;
  const isMovementArmed = pendingMovementTokenId === token.id;
  const rightInset = isRightSidebarVisible ? 400 : 16;
  const initialPosition = {
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - rightInset) : 16,
    y: typeof window !== 'undefined' ? Math.max(16, window.innerHeight - 16) : 16,
  };

  return (
    <DraggablePanel
      initialPosition={initialPosition}
      safeArea={{
        bottom: 16,
        left: 16,
        right: rightInset,
        top: 16,
      }}
      className="border-surface-2 bg-surface-0/95 z-[85] flex max-w-[24rem] min-w-[19rem] flex-col gap-2 rounded-xl border px-3 py-3 shadow-xl backdrop-blur-sm"
      style={{
        width: 'min(24rem, calc(100vw - 2rem))',
      }}
    >
      <FloatingPanelDragBar title="Ações do token" />
      <div className="flex items-start justify-between gap-3">
        <div className="text-text-secondary/80 flex min-w-0 flex-1 flex-col rounded-lg px-1 py-0.5">
          <p className="text-text-primary truncate text-sm font-bold">{character.name}</p>
        </div>
        {pendingAttack?.attackerTokenId === token.id ? (
          <button
            type="button"
            className="border-surface-2 text-text-secondary hover:bg-surface-1 rounded-md border px-2 py-1 text-[0.62rem] font-semibold tracking-[0.08em] uppercase"
            data-no-panel-drag="true"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onCancelAttack}
          >
            Cancelar
          </button>
        ) : isMovementArmed ? (
          <button
            type="button"
            className="border-surface-2 text-text-secondary hover:bg-surface-1 rounded-md border px-2 py-1 text-[0.62rem] font-semibold tracking-[0.08em] uppercase"
            data-no-panel-drag="true"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onCancelMovement}
          >
            Cancelar
          </button>
        ) : null}
      </div>

      {combatState ? (
        <div className="bg-surface-1/75 text-text-secondary grid grid-cols-2 gap-1.5 rounded-lg px-2.5 py-2 text-[0.68rem]">
          <div className="bg-surface-0/45 rounded-md px-2 py-1">
            <span className="block text-[0.58rem] tracking-[0.12em] uppercase">Ação</span>
            <span className="text-text-primary font-semibold">
              {combatState.turnResources.actionAvailable ? 'Disponível' : 'Gasta'}
            </span>
          </div>
          <div className="bg-surface-0/45 rounded-md px-2 py-1">
            <span className="block text-[0.58rem] tracking-[0.12em] uppercase">Ação bônus</span>
            <span className="text-text-primary font-semibold">
              {combatState.turnResources.bonusActionAvailable ? 'Disponível' : 'Gasta'}
            </span>
          </div>
        </div>
      ) : null}

      <div className="bg-surface-1/75 text-text-secondary rounded-lg px-2.5 py-2 text-[0.68rem]">
        {pendingAttack?.attackerTokenId === token.id
          ? `Alvo: ${targetLabel ?? 'selecione outro token'}`
          : isMovementArmed
            ? 'Movimento armado: clique em uma celula valida do alcance.'
            : 'Selecione uma ação para entrar em modo de alvo ou movimento.'}
      </div>

      <button
        type="button"
        className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
          isMovementArmed
            ? 'border-accent-primary bg-accent-primary/10 border'
            : 'border-surface-2 bg-surface-1/55 hover:bg-surface-1 border'
        } ${canMove ? '' : 'opacity-60'}`}
        data-no-panel-drag="true"
        onClick={onArmMovement}
        disabled={!canMove}
      >
        <span className="text-text-primary min-w-0 flex-1 truncate text-[0.72rem] font-semibold">
          Mover
        </span>
        <span className="text-text-secondary bg-surface-0/55 rounded px-1.5 py-0.5 text-[0.62rem] font-semibold">
          {combatState
            ? `${combatState.turnResources.remainingMovementCells}/${combatState.turnResources.totalMovementCells}`
            : '--/--'}
        </span>
      </button>

      <div className="flex flex-col gap-1.5">
        {attackEntries.map((attack) => {
          const isArmed = activeAttackId === attack.id;

          return (
            <button
              key={attack.id}
              type="button"
              className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                isArmed
                  ? 'border-accent-primary bg-accent-primary/10 border'
                  : 'border-surface-2 bg-surface-1/55 hover:bg-surface-1 border'
              }`}
              data-no-panel-drag="true"
              onClick={() => onArmAttack(attack)}
              disabled={!canSpendAction}
            >
              <span className="text-text-primary min-w-0 flex-1 truncate text-[0.72rem] font-semibold">
                {attack.label}
              </span>
              <div className="text-text-secondary flex items-center gap-1.5 text-[0.62rem]">
                <span className="bg-surface-0/55 rounded px-1.5 py-0.5 font-semibold">
                  {attack.attackBonus >= 0 ? `+${attack.attackBonus}` : `${attack.attackBonus}`}
                </span>
                <span className="bg-surface-0/55 rounded px-1.5 py-0.5 font-semibold">
                  {attack.damageFormula}
                </span>
                <span className="bg-surface-0/55 rounded px-1.5 py-0.5 font-semibold">
                  {attack.rangeMeters}m
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </DraggablePanel>
  );
}
