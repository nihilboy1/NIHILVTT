import { useMemo } from 'react';

import { DraggableHandle, DraggablePanel } from '@/shared/ui/DraggablePanel';
import { DragHandleIcon } from '@/shared/ui/Icons';

import { usePlayerCharacterCombatViewModel } from '@/entities/character/lib/hooks/usePlayerCharacterCombatViewModel';
import { getPlayerProficiencyBonusFromLevel } from '@/entities/character/model/rules/characterDerivedRules';
import { buildUnarmedAttackEntry, buildWeaponAttackEntry } from '@/entities/character/model/rules/weaponAttackDerivedRules';
import { useCharactersStore } from '@/entities/character/model/store';
import { useTokenStore } from '@/entities/token/model/store/tokenStore';
import { useUIStore } from '@/features/layoutControls/model/store';
import { AttackEntry, PendingAttackSelection } from '@/shared/api/types';

function parseAttackBonus(value: string | number | undefined): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildLegacyAttackEntries(
  characterId: string,
  actions: Array<{ id: string; name: string; bonus?: string | number; damage?: string | number }> | undefined,
): AttackEntry[] {
  if (!actions || actions.length === 0) {
    return [];
  }

  return actions.map((action) => ({
    id: `legacy-${characterId}-${action.id}`,
    label: action.name,
    attackBonus: parseAttackBonus(action.bonus),
    damageFormula: action.damage == null ? '-' : String(action.damage),
    rangeMeters: 1.5,
    sourceType: 'legacy',
    sourceItemId: null,
    sourceSlot: null,
  }));
}

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
  const { isToolbarVisible } = useUIStore();
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);
  const characters = useCharactersStore((state) => state.characters);
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const tokensOnBoard = useTokenStore((state) => state.tokensOnBoard);

  const token = tokenId ? tokensOnBoard.find((entry) => entry.id === tokenId) ?? null : null;
  const character = token ? characters.find((entry) => entry.id === token.characterId) ?? null : null;
  const runtimeCharacter = token ? runtimeCharactersById[token.characterId] ?? null : null;
  const combatViewModel = usePlayerCharacterCombatViewModel(token?.characterId ?? '');

  const attackEntries = useMemo(() => {
    if (!token || !character) {
      return [];
    }

    if (!runtimeCharacter || !combatViewModel || character.type !== 'Player') {
      const legacyActions = 'actions' in character ? character.actions : undefined;
      return buildLegacyAttackEntries(character.id, legacyActions);
    }

    const proficiencyBonus = getPlayerProficiencyBonusFromLevel(combatViewModel.level);
    const entries: AttackEntry[] = [
      buildUnarmedAttackEntry({
        strength: combatViewModel.strength,
        proficiencyBonus,
      }),
    ];

    const mainHandEntry = buildWeaponAttackEntry(runtimeCharacter.equipment.mainHandWeaponId, {
      classId: runtimeCharacter.build.classId,
      strength: combatViewModel.strength,
      dexterity: combatViewModel.dexterity,
      proficiencyBonus,
      sourceSlot: 'mainHandWeaponId',
    });

    const offHandEntry = buildWeaponAttackEntry(runtimeCharacter.equipment.offHandWeaponId, {
      classId: runtimeCharacter.build.classId,
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
  }, [character, combatViewModel, runtimeCharacter, token]);

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

  if (!token || !character || attackEntries.length === 0) {
    return null;
  }

  const activeAttackId = pendingAttack?.attackerTokenId === token.id ? pendingAttack.attack.id : null;

  return (
    <DraggablePanel
      className="z-[85] flex min-w-[19rem] max-w-[24rem] flex-col gap-2 rounded-xl border border-surface-2 bg-surface-0/95 px-3 py-3 shadow-xl backdrop-blur-sm"
      initialPosition={{ x: isToolbarVisible ? 80 : 16, y: 92 }}
      safeArea={{
        left: isToolbarVisible ? 80 : 16,
        top: 16,
        right: isRightSidebarVisible ? 400 : 16,
        bottom: 16,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <DraggableHandle
          className="min-w-0 flex flex-1 cursor-move select-none flex-col rounded-lg px-1 py-0.5 text-text-secondary/80"
          aria-label="Arrastar painel de ações do token"
          title="Arrastar painel"
        >
          <span className="mb-1 flex items-center">
            <DragHandleIcon className="h-3 w-3" />
          </span>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-text-secondary">
            Ações do Token
          </p>
          <p className="truncate text-sm font-bold text-text-primary">{character.name}</p>
        </DraggableHandle>
        {pendingAttack?.attackerTokenId === token.id ? (
          <button
            type="button"
            className="rounded-md border border-surface-2 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-text-secondary hover:bg-surface-1"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={onCancelAttack}
          >
            Cancelar
          </button>
        ) : null}
      </div>

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
