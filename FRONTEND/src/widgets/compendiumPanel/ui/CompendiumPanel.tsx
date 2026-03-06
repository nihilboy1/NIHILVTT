import { useMemo, useState } from 'react';

import { PHB2024ITEMS, PHB2024MONSTERS } from '@nihilvtt/datamodeling/data';

import { isPlayerCharacterRuntime } from '@/entities/character/model/schemas/playerCharacterRuntime.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { useAuthStore } from '@/features/auth/model/authStore';
import { sendGameAddCharacterInventoryItem } from '@/features/game/model/gameSessionApi';
import { useGameStore } from '@/features/game/model/gameStore';
import { useSessionModalStore } from '@/features/modalManager/model/sessionModalStore';
import { Modal } from '@/shared/ui/Modal';

interface CompendiumPanelProps {
  gameId: number | null;
}

function getItemDisplayName(item: (typeof PHB2024ITEMS)[number]): string {
  return item.name[0] ?? item.name[1] ?? item.id;
}

function getItemTypeLabel(item: (typeof PHB2024ITEMS)[number]): string {
  switch (item.type) {
    case 'armor':
      return 'Armadura';
    case 'weapon':
      return 'Arma';
    case 'gear':
      return 'Equipamento';
    case 'tool':
      return 'Ferramenta';
    default:
      return 'Item';
  }
}

function getMonsterDisplayName(monster: (typeof PHB2024MONSTERS)[number]): string {
  return monster.name[0] ?? monster.name[1] ?? monster.id;
}

function getMonsterTypeLabel(monster: (typeof PHB2024MONSTERS)[number]): string {
  return `${monster.type} • CR ${monster.challengeRating}`;
}

export function CompendiumPanel({ gameId }: CompendiumPanelProps) {
  const [query, setQuery] = useState('');
  const [targetQuery, setTargetQuery] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [pendingTargetCharacterId, setPendingTargetCharacterId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [pickerItemId, setPickerItemId] = useState<string | null>(null);
  const [pickerAddCounts, setPickerAddCounts] = useState<Record<string, number>>({});
  const addCharacterFromSession = useCharactersStore((state) => state.addCharacterFromSession);
  const runtimeCharactersById = useCharactersStore((state) => state.runtimeCharactersById);
  const openModal = useSessionModalStore((state) => state.openModal);
  const currentGame = useGameStore((state) => state.currentGame);
  const currentUserId = useAuthStore((state) => state.user?.id ?? null);
  const isGameMaster =
    currentGame != null && currentUserId != null && currentGame.owner.id === currentUserId;

  const normalizedQuery = query.trim().toLowerCase();
  const normalizedTargetQuery = targetQuery.trim().toLowerCase();
  const visibleItems = useMemo(() => {
    const sortedItems = [...PHB2024ITEMS].sort((left, right) =>
      getItemDisplayName(left).localeCompare(getItemDisplayName(right), 'pt-BR', {
        sensitivity: 'base',
      }),
    );

    if (!normalizedQuery) {
      return sortedItems.slice(0, 30);
    }

    return sortedItems.filter((item) => {
      const displayName = getItemDisplayName(item).toLowerCase();
      const translatedType = getItemTypeLabel(item).toLowerCase();
      return (
        displayName.includes(normalizedQuery) ||
        item.name.some((name) => name.toLowerCase().includes(normalizedQuery)) ||
        item.id.toLowerCase().includes(normalizedQuery) ||
        item.type.toLowerCase().includes(normalizedQuery) ||
        translatedType.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  const visibleMonsters = useMemo(() => {
    const sortedMonsters = [...PHB2024MONSTERS].sort((left, right) =>
      getMonsterDisplayName(left).localeCompare(getMonsterDisplayName(right), 'pt-BR', {
        sensitivity: 'base',
      }),
    );

    if (!normalizedQuery) {
      return sortedMonsters.slice(0, 30);
    }

    return sortedMonsters.filter((monster) => {
      const displayName = getMonsterDisplayName(monster).toLowerCase();
      const secondaryNames = monster.name.map((name) => name.toLowerCase());
      const typeLabel = getMonsterTypeLabel(monster).toLowerCase();
      return (
        displayName.includes(normalizedQuery) ||
        secondaryNames.some((name) => name.includes(normalizedQuery)) ||
        monster.id.toLowerCase().includes(normalizedQuery) ||
        typeLabel.includes(normalizedQuery)
      );
    });
  }, [normalizedQuery]);

  const availableTargets = useMemo(() => {
    return Object.values(runtimeCharactersById)
      .filter(isPlayerCharacterRuntime)
      .sort((left, right) =>
        left.name.localeCompare(right.name, 'pt-BR', { sensitivity: 'base' }),
      );
  }, [runtimeCharactersById]);

  const visibleTargets = useMemo(() => {
    if (!normalizedTargetQuery) {
      return availableTargets;
    }

    return availableTargets.filter((character) => {
      const normalizedName = character.name.toLowerCase();
      const normalizedId = character.id.toLowerCase();
      return (
        normalizedName.includes(normalizedTargetQuery) ||
        normalizedId.includes(normalizedTargetQuery)
      );
    });
  }, [availableTargets, normalizedTargetQuery]);

  const canChooseTarget = gameId !== null && availableTargets.length > 0;
  const sanitizedQuantity = Number.isFinite(quantity)
    ? Math.max(1, Math.min(999, Math.trunc(quantity)))
    : 1;

  const handleAddItem = async (itemId: string, targetCharacterId: string) => {
    if (gameId === null) {
      return;
    }

    setPendingItemId(itemId);
    setPendingTargetCharacterId(targetCharacterId);
    setFormError(null);
    try {
      const event = await sendGameAddCharacterInventoryItem(
        gameId,
        targetCharacterId,
        itemId,
        sanitizedQuantity,
      );
      const payloadCharacter = event.payload?.character;
      if (payloadCharacter) {
        addCharacterFromSession(payloadCharacter);
      }
      setPickerAddCounts((currentCounts) => ({
        ...currentCounts,
        [targetCharacterId]: (currentCounts[targetCharacterId] ?? 0) + sanitizedQuantity,
      }));
    } catch (error) {
      const errorMessage =
        typeof error === 'object' &&
        error !== null &&
        'formError' in error &&
        typeof (error as { formError?: unknown }).formError === 'string'
          ? (error as { formError: string }).formError
          : error instanceof Error
            ? error.message
            : 'Falha ao adicionar item ao inventário.';
      setFormError(errorMessage);
    } finally {
      setPendingItemId(null);
      setPendingTargetCharacterId(null);
    }
  };

  const handleOpenPicker = (itemId: string) => {
    if (!canChooseTarget || pendingItemId !== null) {
      return;
    }

    setFormError(null);
    setTargetQuery('');
    setQuantity(1);
    setPickerAddCounts({});
    setPickerItemId(itemId);
  };

  const handleClosePicker = () => {
    if (pendingItemId !== null) {
      return;
    }

    setPickerItemId(null);
    setTargetQuery('');
    setQuantity(1);
    setPickerAddCounts({});
  };

  const handleMonsterDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    monsterId: string,
  ) => {
    if (!isGameMaster || gameId === null) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData('application/vtt-monster-id', monsterId);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.opacity = '0.55';
  };

  const handleMonsterDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.opacity = '1';
  };

  const pickerItem = pickerItemId
    ? PHB2024ITEMS.find((item) => item.id === pickerItemId) ?? null
    : null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden px-3 py-3">
      <header className="space-y-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">
            Biblioteca
          </h2>
          <p className="text-xs text-text-secondary">
            Pesquise itens e monstros canônicos. Itens são concedidos pelo mestre; monstros podem
            ser arrastados da biblioteca direto para o grid.
          </p>
        </div>
        <div className="space-y-2">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar item ou monstro"
            className="w-full rounded-lg bg-surface-1/70 px-3 py-2 text-sm text-text-primary outline-none ring-1 ring-surface-2/60 placeholder:text-text-secondary/70 focus:ring-accent-secondary/50"
          />
          <div className="rounded-lg bg-surface-1/55 px-3 py-2 text-xs text-text-secondary">
            {isGameMaster
              ? 'Arraste monstros para o tabuleiro. Itens continuam sendo distribuídos via popup de personagem runtime.'
              : 'Somente o mestre pode arrastar monstros da biblioteca e conceder itens.'}
          </div>
          {formError ? (
            <div className="rounded-lg bg-feedback-negative/10 px-3 py-2 text-xs text-feedback-negative">
              {formError}
            </div>
          ) : null}
        </div>
      </header>

      <div className="hide-scrollbar flex-1 space-y-4 overflow-y-auto pr-1">
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Monstros
            </h3>
            <span className="text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
              {visibleMonsters.length}
            </span>
          </div>
          {visibleMonsters.length === 0 ? (
            <div className="rounded-lg bg-surface-1/55 px-3 py-3 text-xs text-text-secondary">
              Nenhum monstro encontrado.
            </div>
          ) : (
            visibleMonsters.map((monster) => (
              <div
                key={monster.id}
                className="rounded-xl bg-surface-1/55 px-3 py-2.5"
                draggable={isGameMaster && gameId !== null}
                onDragStart={(event) => handleMonsterDragStart(event, monster.id)}
                onDragEnd={handleMonsterDragEnd}
                title={
                  isGameMaster
                    ? `Arraste ${getMonsterDisplayName(monster)} para o tabuleiro.`
                    : 'Somente o mestre pode instanciar monstros.'
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {getMonsterDisplayName(monster)}
                    </p>
                    <p className="text-[0.68rem] uppercase tracking-[0.08em] text-text-secondary">
                      {getMonsterTypeLabel(monster)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="rounded-md bg-surface-2/75 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-primary transition-colors hover:bg-surface-2"
                      draggable={false}
                      onClick={() => openModal('sheet', { monsterId: monster.id })}
                    >
                      Detalhes
                    </button>
                    <span className="rounded-md bg-accent-primary/12 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-accent-secondary">
                      Arrastar
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Itens
            </h3>
            <span className="text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
              {visibleItems.length}
            </span>
          </div>
          {visibleItems.length === 0 ? (
            <div className="rounded-lg bg-surface-1/55 px-3 py-3 text-xs text-text-secondary">
              Nenhum item encontrado.
            </div>
          ) : (
            visibleItems.map((item) => {
              const displayName = getItemDisplayName(item);
              const isPending = pendingItemId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-surface-1/55 px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text-primary">{displayName}</p>
                      <p className="text-[0.68rem] uppercase tracking-[0.08em] text-text-secondary">
                        {getItemTypeLabel(item)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-md bg-accent-primary/15 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!canChooseTarget || pendingItemId !== null || !isGameMaster}
                      onClick={() => handleOpenPicker(item.id)}
                    >
                      {isPending ? 'Adicionando...' : 'Adicionar'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>

      <Modal
        isOpen={pickerItem !== null}
        onClose={handleClosePicker}
        title={pickerItem ? `Adicionar ${getItemDisplayName(pickerItem)}` : 'Escolher personagem'}
        hideFooter
        zIndex={120}
        modalClassName="max-w-lg"
      >
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            Escolha para quais personagens runtime este item será adicionado. O popup permanece
            aberto para distribuição contínua.
          </p>
          {formError ? (
            <div className="rounded-lg bg-feedback-negative/10 px-3 py-2 text-xs text-feedback-negative">
              {formError}
            </div>
          ) : null}
          <div className="flex flex-wrap items-end gap-2">
            <div className="min-w-0 flex-1">
              <input
                type="search"
                value={targetQuery}
                onChange={(event) => setTargetQuery(event.target.value)}
                placeholder="Buscar personagem"
                className="w-full rounded-lg bg-surface-2/70 px-3 py-2 text-sm text-text-primary outline-none ring-1 ring-surface-2/60 placeholder:text-text-secondary/70 focus:ring-accent-secondary/50"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="rounded-md bg-surface-2/70 px-2 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary transition-colors hover:bg-surface-2"
                onClick={() => setQuantity(1)}
                disabled={pendingItemId !== null}
              >
                +1
              </button>
              <button
                type="button"
                className="rounded-md bg-surface-2/70 px-2 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-text-secondary transition-colors hover:bg-surface-2"
                onClick={() => setQuantity(5)}
                disabled={pendingItemId !== null}
              >
                +5
              </button>
              <input
                type="number"
                min={1}
                max={999}
                step={1}
                value={sanitizedQuantity}
                onChange={(event) => setQuantity(Number(event.target.value) || 1)}
                className="w-20 rounded-md bg-surface-2/70 px-2 py-2 text-right text-sm text-text-primary outline-none ring-1 ring-surface-2/60 focus:ring-accent-secondary/50"
                aria-label="Quantidade para adicionar"
                disabled={pendingItemId !== null}
              />
            </div>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {visibleTargets.length === 0 ? (
              <div className="rounded-lg bg-surface-2/50 px-3 py-3 text-sm text-text-secondary">
                Nenhum personagem encontrado.
              </div>
            ) : (
              visibleTargets.map((character) => {
                const isPending =
                  pendingItemId === pickerItemId && pendingTargetCharacterId === character.id;
                const addedCount = pickerAddCounts[character.id] ?? 0;
                const ownedCount =
                  pickerItemId === null
                    ? 0
                    : (character.inventory.items.find((entry) => entry.itemId === pickerItemId)?.quantity ?? 0);

                return (
                  <button
                    key={character.id}
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-lg bg-surface-2/50 px-3 py-2 text-left transition-colors hover:bg-surface-2/80 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={pendingItemId !== null || pickerItemId === null}
                    onClick={() => pickerItemId && void handleAddItem(pickerItemId, character.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-text-primary">{character.name}</p>
                        {addedCount > 0 ? (
                          <span className="rounded-full bg-accent-primary/15 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-accent-secondary">
                            +{addedCount}
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
                        <span>{character.id}</span>
                        <span>Possui: {ownedCount}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent-secondary">
                        {isPending ? `Adicionando ${sanitizedQuantity}...` : `Adicionar ${sanitizedQuantity}`}
                      </span>
                      {addedCount > 0 ? (
                        <span className="text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
                          neste popup
                        </span>
                      ) : ownedCount > 0 ? (
                        <span className="text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
                          no inventário
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
