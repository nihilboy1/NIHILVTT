import { useMemo, useState } from 'react';

import { PHB2024ITEMS } from '@nihilvtt/datamodeling/data';
import { useParams } from 'react-router-dom';

import { usePlayerCharacterEquipmentViewModel } from '@/entities/character/lib/hooks/usePlayerCharacterEquipmentViewModel';
import { useCharactersStore } from '@/entities/character/model/store';
import { sendGameUpdateCharacterEquipment } from '@/features/game/model/gameSessionApi';
import { cn } from '@/shared/lib/utils/cn';

interface PlayerSheetEquipmentTabProps {
  characterId: string;
}

type RuntimeEquipmentCommandSlot =
  | 'bodyArmorItemId'
  | 'shieldItemId'
  | 'mainHandWeaponId'
  | 'offHandWeaponId';

export function PlayerSheetEquipmentTab({
  characterId,
}: PlayerSheetEquipmentTabProps) {
  const { gameId: gameIdParam } = useParams<{ gameId: string }>();
  const gameId = gameIdParam ? Number(gameIdParam) : Number.NaN;
  const addCharacterFromSession = useCharactersStore((state) => state.addCharacterFromSession);
  const [pendingSlot, setPendingSlot] = useState<RuntimeEquipmentCommandSlot | null>(null);
  const equipmentViewModel = usePlayerCharacterEquipmentViewModel(characterId);
  const itemCatalogById = useMemo(
    () => new Map<string, (typeof PHB2024ITEMS)[number]>(PHB2024ITEMS.map((item) => [item.id, item])),
    [],
  );

  if (!equipmentViewModel) {
    return null;
  }

  const slotById = Object.fromEntries(
    equipmentViewModel.slots.map((slot) => [slot.id, slot]),
  );

  const canSendEquipmentCommand = Number.isInteger(gameId) && gameId > 0;

  const bodyArmorItemId = slotById.bodyArmor?.itemId ?? null;
  const shieldItemId = slotById.offHand?.itemId === 'armor-escudo' ? slotById.offHand.itemId : null;
  const mainHandWeaponId = slotById.mainHand?.itemId ?? null;
  const offHandWeaponId =
    slotById.offHand?.itemId && slotById.offHand.itemId !== 'armor-escudo'
      ? slotById.offHand.itemId
      : null;

  const handleEquipmentChange = async (
    slot: RuntimeEquipmentCommandSlot,
    itemId: string | null,
  ) => {
    if (!canSendEquipmentCommand) {
      return;
    }

    setPendingSlot(slot);
    try {
      const event = await sendGameUpdateCharacterEquipment(gameId, characterId, slot, itemId);
      const payloadCharacter = event.payload?.character;
      if (payloadCharacter) {
        addCharacterFromSession(payloadCharacter);
      }
    } finally {
      setPendingSlot(null);
    }
  };

  const buildInventoryActions = (itemId: string) => {
    const item = itemCatalogById.get(itemId);
    if (!item || !canSendEquipmentCommand) {
      return [] as Array<{
        key: string;
        label: string;
        slot: RuntimeEquipmentCommandSlot;
        nextItemId: string | null;
      }>;
    }

    const armorEffect =
      item.type === 'armor'
        ? item.effects.find((effect) => effect.type === 'onEquip_setAC')
        : null;
    const isShield = armorEffect?.type === 'onEquip_setAC' && armorEffect.armorType === 'shield';

    if (isShield) {
      return [
        {
          key: 'shield',
          label: shieldItemId === itemId ? 'Desequipar escudo' : 'Equipar escudo',
          slot: 'shieldItemId' as const,
          nextItemId: shieldItemId === itemId ? null : itemId,
        },
      ];
    }

    if (item.type === 'armor') {
      return [
        {
          key: 'body-armor',
          label: bodyArmorItemId === itemId ? 'Desequipar armadura' : 'Equipar armadura',
          slot: 'bodyArmorItemId' as const,
          nextItemId: bodyArmorItemId === itemId ? null : itemId,
        },
      ];
    }

    if (item.type === 'weapon') {
      return [
        {
          key: 'main-hand',
          label: mainHandWeaponId === itemId ? 'Soltar mão principal' : 'Mão principal',
          slot: 'mainHandWeaponId' as const,
          nextItemId: mainHandWeaponId === itemId ? null : itemId,
        },
        {
          key: 'off-hand',
          label: offHandWeaponId === itemId ? 'Soltar mão secundária' : 'Mão secundária',
          slot: 'offHandWeaponId' as const,
          nextItemId: offHandWeaponId === itemId ? null : itemId,
        },
      ];
    }

    return [] as Array<{
      key: string;
      label: string;
      slot: RuntimeEquipmentCommandSlot;
      nextItemId: string | null;
    }>;
  };

  const renderSlot = (slotId: string, compact = false) => {
    const slot = slotById[slotId];

    if (!slot) {
      return null;
    }

    return (
      <div
        key={slot.id}
        className={cn(
          'rounded-xl px-2 py-2',
          compact ? 'min-h-16' : 'min-h-20',
          slot.isActive
            ? 'bg-accent-primary/10 ring-1 ring-accent-secondary/30'
            : 'bg-surface-0/25',
        )}
      >
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-text-secondary">
            {slot.label}
          </span>
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-[0.52rem] font-semibold uppercase tracking-[0.08em]',
              slot.isModeled
                ? 'bg-accent-secondary/15 text-accent-secondary'
                : 'bg-surface-1/65 text-text-secondary',
            )}
          >
            {slot.isModeled ? 'Ativo' : 'Futuro'}
          </span>
        </div>
        <div className="rounded-lg bg-surface-1/40 px-2 py-2 text-[0.72rem] text-text-primary">
          {slot.itemName ?? <span className="text-text-secondary">Vazio</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="hide-scrollbar flex h-full min-h-0 flex-col gap-2.5 overflow-y-auto rounded-lg bg-surface-0/30 p-1.5">
      <div className="grid gap-2.5 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <section className="rounded-xl bg-surface-1/70 p-2.5">
          <header className="mb-2 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-text-primary">
                Equipamento
              </h2>
              <p className="text-[0.7rem] text-text-secondary">
                Estrutura visual pronta para slots de gear. Os slots autoritativos atuais já refletem o runtime.
              </p>
            </div>
            <span className="rounded-full bg-surface-0/55 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Painel
            </span>
          </header>

          <div className="rounded-2xl bg-gradient-to-b from-surface-0/30 to-surface-0/10 p-2">
            <div className="grid gap-1.5 md:grid-cols-[minmax(5.5rem,0.9fr)_minmax(0,1.3fr)_minmax(5.5rem,0.9fr)]">
              <div className="order-2 grid gap-1.5 md:order-1">
                {renderSlot('ringLeft', true)}
                {renderSlot('mainHand')}
              </div>

              <div className="order-1 grid gap-1.5 md:order-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {renderSlot('helmet', true)}
                  {renderSlot('amulet', true)}
                </div>
                {renderSlot('upper')}
                {renderSlot('bodyArmor')}
                <div className="grid grid-cols-2 gap-1.5">
                  {renderSlot('legs', true)}
                  {renderSlot('shoes', true)}
                </div>
              </div>

              <div className="order-3 grid gap-1.5">
                {renderSlot('ringRight', true)}
                {renderSlot('offHand')}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-surface-1/70 p-2.5">
          <header className="mb-2">
            <h3 className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-text-primary">
              Inventário Rápido
            </h3>
            <p className="text-[0.7rem] text-text-secondary">
              {canSendEquipmentCommand
                ? 'Use os botões do inventário para equipar ou desequipar os slots autoritativos já suportados.'
                : 'Fora de uma sessão de jogo, esta lista permanece somente leitura.'}
            </p>
          </header>

          <div className="space-y-1.5">
            {equipmentViewModel.inventory.length === 0 ? (
              <div className="rounded-lg bg-surface-0/28 px-3 py-3 text-xs text-text-secondary">
                Nenhum item carregado.
              </div>
            ) : (
              equipmentViewModel.inventory.map((item) => {
                const inventoryActions = buildInventoryActions(item.itemId);

                return (
                  <div
                    key={item.key}
                    className="flex flex-col gap-2 rounded-lg bg-surface-0/32 px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.82rem] font-medium text-text-primary">
                          {item.name}
                        </p>
                        <p className="text-[0.64rem] text-text-secondary">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'rounded-full px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]',
                          item.equipped
                            ? 'bg-feedback-positive/10 text-feedback-positive ring-1 ring-feedback-positive/30'
                            : 'bg-surface-1/65 text-text-secondary',
                        )}
                      >
                        {item.equipped ? 'Equipado' : 'Mochila'}
                      </span>
                    </div>
                    {inventoryActions.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {inventoryActions.map((action) => (
                          <button
                            key={`${item.key}-${action.key}`}
                            type="button"
                            className="rounded-md bg-surface-1/60 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-text-secondary hover:bg-surface-1/85 hover:text-text-primary disabled:cursor-wait disabled:opacity-60"
                            disabled={pendingSlot !== null}
                            onClick={() => handleEquipmentChange(action.slot, action.nextItemId)}
                          >
                            {pendingSlot === action.slot ? '...' : action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
