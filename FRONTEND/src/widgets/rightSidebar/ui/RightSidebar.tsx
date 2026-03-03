import { useEffect } from 'react';

import type { Game } from '@/entities/game/model/schemas/game.schema';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useUIStore } from '@/features/layoutControls/model/store';
import { SidebarTab } from '@/shared/api/types';

import { ChevronRightIcon } from '../../../shared/ui/Icons';

import { RightSidebarContent } from './RightSidebarContent';
import { SidebarTabs } from './SidebarTabs';

type RightSidebarProps = {
  currentGame: Game | null;
  isLeavingGame: boolean;
  onLeaveGame: () => void;
};

export function RightSidebar({
  currentGame,
  isLeavingGame,
  onLeaveGame,
}: RightSidebarProps) {
  const user = useAuthStore((state) => state.user);
  const { activeSidebarTab, setActiveSidebarTab, setIsRightSidebarVisible } = useUIStore();
  const isGameMaster = Boolean(currentGame && user && currentGame.owner.id === user.id);

  useEffect(() => {
    if (!isGameMaster && activeSidebarTab === SidebarTab.COMPENDIUM) {
      setActiveSidebarTab(SidebarTab.CHAT);
    }
  }, [activeSidebarTab, isGameMaster, setActiveSidebarTab]);

  return (
    <div
      className="bg-surface-0 fixed top-0 right-0 bottom-0 z-50 flex h-full w-80 flex-col border-l shadow-xl md:w-96"
      role="tablist"
      aria-orientation="horizontal"
    >
      <header className="flex items-center">
        <button
          onClick={() => setIsRightSidebarVisible(false)}
          className="hover:bg-surface-3 h-full cursor-pointer border-b-2 p-3 focus:ring-1 focus:outline-none focus:ring-inset"
          aria-label="Esconder Barra Lateral Direita"
          title="Esconder Barra Lateral"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        <SidebarTabs
          activeSidebarTab={activeSidebarTab}
          isGameMaster={isGameMaster}
          setActiveSidebarTab={setActiveSidebarTab}
        />
      </header>

      <RightSidebarContent
        activeSidebarTab={activeSidebarTab}
        currentGame={currentGame}
        isGameMaster={isGameMaster}
        isLeavingGame={isLeavingGame}
        onLeaveGame={onLeaveGame}
      />
    </div>
  );
}
