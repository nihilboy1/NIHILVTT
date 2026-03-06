// src/widgets/sessionModalManager/ui/SessionModalManager.tsx

import { Suspense, lazy } from 'react';

import { useCharactersStore } from '@/entities/character/model/store';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useGameStore } from '@/features/game/model/gameStore';
import { useUIStore } from '@/features/layoutControls/model/store';
import { ModalEntry } from '@/features/modalManager/model/baseModalConfig';
import { useSessionModalStore } from '@/features/modalManager/model/sessionModalStore';
import { type Token } from '@/shared/api/types';

import { useTokenStore } from '../../../entities/token/model/store/tokenStore';
import { SimpleNameModal } from '../../../features/characterCreation/ui/SimpleNameModal';
import { ActionEditModal } from '../../../features/characterEditAction/ui/ActionEditModal';
import { HPControlModal } from '../../../features/characterUpdateHp/ui/HPControlModal';
import { ConfirmationModal } from '../../../shared/ui/ConfirmationModal';
import { Spinner } from '../../../shared/ui/Spinner';

const SheetModal = lazy(async () => import('../../sheetModal/ui/SheetModal').then((module) => ({
  default: module.SheetModal,
})));
const CharacterBuilderModal = lazy(async () =>
  import('@/features/characterBuilder/components/ui/CharacterBuilderModal').then((module) => ({
    default: module.CharacterBuilderModal,
  })));

// 1. Novas Importações: Trocamos os tipos manuais pelo CharacterSchema do Zod.

interface SessionModalManagerProps {
  handleHPChangeFromModal: (tokenId: string, mode: 'damage' | 'heal', amount: number) => void;
  handleTempHpChangeFromModal: (tokenId: string, amount: number) => void;
}

export function SessionModalManager({
  handleHPChangeFromModal,
  handleTempHpChangeFromModal,
}: SessionModalManagerProps) {
  const { modalStack, closeModal } = useSessionModalStore();
  const characters = useCharactersStore((state) => state.characters);
  const { tokensOnBoard } = useTokenStore();
  const currentGame = useGameStore((state) => state.currentGame);
  const user = useAuthStore((state) => state.user);
  const isToolbarVisible = useUIStore((state) => state.isToolbarVisible);
  const isRightSidebarVisible = useUIStore((state) => state.isRightSidebarVisible);
  const canModifyHp = currentGame?.owner.id === user?.id;

  const topModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const shouldRenderOverlay =
    topModal && topModal.name !== 'hpControl' && topModal.name !== 'sheet';
  const isGameMaster = currentGame?.owner.id === user?.id;

  return (
    <>
      {shouldRenderOverlay && (
        <div
          className="bg-overlay fixed inset-0 flex items-center justify-center p-4"
          onClick={() => {
            if (topModal && topModal.dismissible !== false) {
              closeModal();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (topModal && topModal.dismissible !== false) {
                closeModal();
              }
            }
          }}
          role="button"
          tabIndex={0}
          style={{ zIndex: 99 }} // Overlay zIndex
        />
      )}
      {modalStack.map((modalEntry: ModalEntry, index: number) => {
        const { name, props } = modalEntry;
        const isTopModal = index === modalStack.length - 1;

        switch (name) {
          case 'simpleName':
            return (
              <SimpleNameModal
                key={modalEntry.id}
                isOpen={true}
                onClose={closeModal}
                title={props.title as string}
                zIndex={100 + index} // Default modal zIndex
              />
            );

          case 'sheet':
            return (
              <Suspense
                key={(props.characterId as string | undefined) ?? (props.monsterId as string)}
                fallback={(
                  <div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 1000 + index }}
                  >
                    <Spinner variant="mini" />
                  </div>
                )}
              >
                <SheetModal
                  characterId={(props.characterId as string | undefined) ?? null}
                  monsterId={(props.monsterId as string | undefined) ?? null}
                  isOpen={true}
                  onClose={closeModal}
                  zIndex={1000 + index} // Character sheet zIndex (higher than overlay)
                />
              </Suspense>
            );

          case 'actionEdit': {
            return (
              <ActionEditModal
                key={modalEntry.id}
                isOpen={true}
                onClose={closeModal}
                actionId={props.actionId as string}
                zIndex={1500 + index} // Action edit modal zIndex (between sheet and confirmation)
              />
            );
          }

          case 'characterbuilderModal': {
            return (
              <Suspense
                key={modalEntry.id}
                fallback={(
                  <div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 1500 + index }}
                  >
                    <Spinner variant="mini" />
                  </div>
                )}
              >
                <CharacterBuilderModal
                  isOpen={true}
                  onClose={closeModal}
                  zIndex={1500 + index}
                />
              </Suspense>
            );
          }

          case 'hpControl':
            const selectedTokenForHP = tokensOnBoard.find((t: Token) => t.id === props.tokenId);
            const characterForHPModal = selectedTokenForHP
              ? characters.find((c) => c.id === selectedTokenForHP.characterId)
              : null;
            const canAccessHpControl = isGameMaster;

            return (
              props.tokenId &&
              characterForHPModal && (
                <HPControlModal
                  key={modalEntry.id}
                  tokenId={props.tokenId as string}
                  character={characterForHPModal}
                  isOpen={isTopModal}
                  onClose={closeModal}
                  onHPChange={handleHPChangeFromModal}
                  onTempHpChange={handleTempHpChangeFromModal}
                  canModifyHp={canModifyHp}
                  canAccessContext={canAccessHpControl}
                  dockSide={canModifyHp ? 'left' : 'right'}
                  leftToolbarVisible={isToolbarVisible}
                  rightSidebarVisible={isRightSidebarVisible}
                  zIndex={100 + index} // Default modal zIndex
                />
              )
            );

          case 'confirmationModal':
            return (
              <ConfirmationModal
                key={modalEntry.id}
                isOpen={true}
                title={props.title as string}
                content={props.content as string}
                confirmText={props.confirmText as string}
                cancelText={props.cancelText as string}
                onConfirm={props.onConfirm as () => void}
                onCancel={props.onCancel as () => void}
                zIndex={2000 + index} // Confirmation modal zIndex (highest)
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
