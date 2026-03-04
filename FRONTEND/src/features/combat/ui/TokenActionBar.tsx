import { useMemo } from 'react';

import { usePlayerCharacterCombatViewModel } from '@/entities/character/lib/hooks/usePlayerCharacterCombatViewModel';
import { getPlayerProficiencyBonusFromLevel } from '@/entities/character/model/rules/characterDerivedRules';
import { buildUnarmedAttackEntry, buildWeaponAttackEntry } from '@/entities/character/model/rules/weaponAttackDerivedRules';
import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useGameStore } from '@/features/game/model/gameStore';
import { useUIStore } from '@/features/layoutControls/model/store';
import { useCombatStore } from '@/features/combat/model/store';
import { buildActionAttackEntries } from '@/features/combat/model/actionEntryAdapters';
import { AttackEntry, PendingAttackSelection } from '@/shared/api/types';
import { DraggablePanel } from '@/shared/ui/DraggablePanel';
import { FloatingPanelDragBar } from '@/shared/ui/FloatingPanelDragBar';

interface TokenActionBarProps {
  tokenId: string | null;
  pendingAttack: PendingAttackSelection | null;
  onArmAttack: (attack: AttackEntry) => void;
  onCancelAttack: () => void;
}

export function TokenActionBar({
  tokenId,
  pendingAttack,
  onArmAttack,
  onCancelAttack,
}: TokenActionBarProps) {
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);
  const characters = useCharactersStore((state) => state.characters);
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const tokensOnBoard = useTokenStore((state) => state.tokensOnBoard);
  const combatState = useCombatStore((state) => state.combatState);

  const token = tokenId ? tokensOnBoard.find((entry) => entry.id === tokenId) ?? null : null;
  const character = token ? characters.find((entry) => entry.id === token.characterId) ?? null : null;
  const runtimeCharacter = token ? runtimeCharactersById[token.characterId] ?? null : null;
  const playerRuntimeCharacter = isPlayerCharacterRuntime(runtimeCharacter) ? runtimeCharacter : null;
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
        { tokenId: token.id, characterId: character.id, runtimeType: runtimeCharacter?.type ?? null },
      );
      return [];
    }

    const proficiencyBonus = getPlayerProficiencyBonusFromLevel(combatViewModel.level);
    const entries: AttackEntry[] = [
      buildUnarmedAttackEntry({
        strength: combatViewModel.strength,
        proficiencyBonus,
      }),
    ];

    const mainHandEntry = buildWeaponAttackEntry(playerRuntimeCharacter.equipment.mainHandWeaponId, {
      classId: playerRuntimeCharacter.build.classId,
      strength: combatViewModel.strength,
      dexterity: combatViewModel.dexterity,
      proficiencyBonus,
      sourceSlot: 'mainHandWeaponId',
    });

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
  }, [character, combatViewModel, playerRuntimeCharacter, token]);

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

  const canActInCombat = useMemo(() => {
    if (!token || !combatState) {
      return false;
    }

    const participantIndex = combatState.participants.findIndex((participant) => participant.tokenId === token.id);
    if (participantIndex < 0) {
      return false;
    }

    return participantIndex === combatState.turnIndex && combatState.turnResources.actionAvailable;
  }, [combatState, token]);

  const canCurrentUserControlToken = useMemo(() => {
    if (!token || !currentUser || !currentGame) {
      return false;
    }

    if (!runtimeCharacter) {
      console.error(
        'Violação de contrato de sessão: TokenActionBar recebeu token sem runtime compartilhado.',
        { tokenId: token.id, characterId: token.characterId },
      );
      return false;
    }

    if (runtimeCharacter.type === 'NPC') {
      return currentGame.owner.id === currentUser.id;
    }

    if (runtimeCharacter.controlledByUserId == null) {
      return currentGame.owner.id === currentUser.id;
    }

    return runtimeCharacter.controlledByUserId === currentUser.id;
  }, [currentGame, currentUser, runtimeCharacter, token]);

  if (!token || !character || attackEntries.length === 0 || !canActInCombat || !canCurrentUserControlToken) {
    return null;
  }

  const activeAttackId = pendingAttack?.attackerTokenId === token.id ? pendingAttack.attack.id : null;
  const panelWidth = 384;
  const estimatedPanelHeight = 260;
  const rightInset = isRightSidebarVisible ? 400 : 16;
  const initialPosition = {
    x:
      typeof window !== 'undefined'
        ? Math.max(16, window.innerWidth - panelWidth - rightInset)
        : 16,
    y:
      typeof window !== 'undefined'
        ? Math.max(16, window.innerHeight - estimatedPanelHeight - 16)
        : 16,
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
      className="z-[85] flex min-w-[19rem] max-w-[24rem] flex-col gap-2 rounded-xl border border-surface-2 bg-surface-0/95 px-3 py-3 shadow-xl backdrop-blur-sm"
      style={{
        width: 'min(24rem, calc(100vw - 2rem))',
      }}
    >
      <FloatingPanelDragBar title="Arrastar barra de ações do token" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex flex-1 flex-col rounded-lg px-1 py-0.5 text-text-secondary/80">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-secondary">
            Ações do Token
          </p>
          <p className="truncate text-sm font-bold text-text-primary">{character.name}</p>
        </div>
        {pendingAttack?.attackerTokenId === token.id ? (
          <button
            type="button"
            className="rounded-md border border-surface-2 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-text-secondary hover:bg-surface-1"
            data-no-panel-drag="true"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onCancelAttack}
          >
            Cancelar
          </button>
        ) : null}
      </div>

      {combatState ? (
        <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-surface-1/75 px-2.5 py-2 text-[0.68rem] text-text-secondary">
          <div className="rounded-md bg-surface-0/45 px-2 py-1">
            <span className="block text-[0.58rem] uppercase tracking-[0.12em]">Ação</span>
            <span className="font-semibold text-text-primary">
              {combatState.turnResources.actionAvailable ? 'Disponível' : 'Gasta'}
            </span>
          </div>
          <div className="rounded-md bg-surface-0/45 px-2 py-1">
            <span className="block text-[0.58rem] uppercase tracking-[0.12em]">Ação bônus</span>
            <span className="font-semibold text-text-primary">
              {combatState.turnResources.bonusActionAvailable ? 'Disponível' : 'Gasta'}
            </span>
          </div>
          <div className="rounded-md bg-surface-0/45 px-2 py-1">
            <span className="block text-[0.58rem] uppercase tracking-[0.12em]">Movimento</span>
            <span className="font-semibold text-text-primary">
              {combatState.turnResources.remainingMovementCells}/{combatState.turnResources.totalMovementCells}
            </span>
          </div>
        </div>
      ) : null}

      <div className="rounded-lg bg-surface-1/75 px-2.5 py-2 text-[0.68rem] text-text-secondary">
        {pendingAttack?.attackerTokenId === token.id
          ? `Alvo: ${targetLabel ?? 'selecione outro token'}`
          : 'Selecione uma ação para entrar em modo de alvo.'}
      </div>

      <div className="flex flex-col gap-1.5">
        {attackEntries.map((attack) => {
          const isArmed = activeAttackId === attack.id;

          return (
            <button
              key={attack.id}
              type="button"
              className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                isArmed
                  ? 'border border-accent-primary bg-accent-primary/10'
                  : 'border border-surface-2 bg-surface-1/55 hover:bg-surface-1'
              }`}
              data-no-panel-drag="true"
              onClick={() => onArmAttack(attack)}
            >
              <span className="min-w-0 flex-1 truncate text-[0.72rem] font-semibold text-text-primary">
                {attack.label}
              </span>
              <div className="flex items-center gap-1.5 text-[0.62rem] text-text-secondary">
                <span className="rounded bg-surface-0/55 px-1.5 py-0.5 font-semibold">
                  {attack.attackBonus >= 0 ? `+${attack.attackBonus}` : `${attack.attackBonus}`}
                </span>
                <span className="rounded bg-surface-0/55 px-1.5 py-0.5 font-semibold">
                  {attack.damageFormula}
                </span>
                <span className="rounded bg-surface-0/55 px-1.5 py-0.5 font-semibold">
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
