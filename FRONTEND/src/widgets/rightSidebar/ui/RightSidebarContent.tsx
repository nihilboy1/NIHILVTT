import { Suspense, lazy } from 'react';

import type { Game } from '@/entities/game/model/schemas/game.schema';

import { SidebarTab } from '../../../shared/api/types';
import { Spinner } from '../../../shared/ui/Spinner';

const CharactersPanel = lazy(async () => import('../../charactersPanel/ui/CharactersPanel').then((module) => ({
  default: module.CharactersPanel,
})));
const ChatPanel = lazy(async () => import('../../chatPanel/ui/ChatPanel').then((module) => ({
  default: module.ChatPanel,
})));
const GameSettingsPanel = lazy(async () =>
  import('../../gameSettingsPanel/ui/GameSettingsPanel').then((module) => ({
    default: module.GameSettingsPanel,
  })));
const CompendiumPanel = lazy(async () =>
  import('../../compendiumPanel/ui/CompendiumPanel').then((module) => ({
    default: module.CompendiumPanel,
  })));

interface RightSidebarContentProps {
  activeSidebarTab: SidebarTab;
  currentGame: Game | null;
  isGameMaster: boolean;
  isLeavingGame: boolean;
  onLeaveGame: () => void;
}

export function RightSidebarContent({
  activeSidebarTab,
  currentGame,
  isGameMaster,
  isLeavingGame,
  onLeaveGame,
}: RightSidebarContentProps) {
  const fallback = (
    <div className="flex h-full items-center justify-center">
      <Spinner variant="mini" />
    </div>
  );

  return (
    <div title="bloco de chat e input" className="relative flex-grow overflow-hidden">
      <div
        id="tabpanel-chat"
        role="tabpanel"
        aria-labelledby="tab-chat"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.CHAT ? '' : 'hidden'
        }`}
      >
        {activeSidebarTab === SidebarTab.CHAT ? (
          <Suspense fallback={fallback}>
            <ChatPanel />
          </Suspense>
        ) : null}
      </div>

      <div
        id="tabpanel-characters"
        role="tabpanel"
        aria-labelledby="tab-CHARACTERS"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.CHARACTERS ? '' : 'hidden'
        }`}
      >
        {activeSidebarTab === SidebarTab.CHARACTERS ? (
          <Suspense fallback={fallback}>
            <CharactersPanel />
          </Suspense>
        ) : null}
      </div>

      <div
        id="tabpanel-compendium"
        role="tabpanel"
        aria-labelledby="tab-compendium"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.COMPENDIUM && isGameMaster ? '' : 'hidden'
        }`}
      >
        {activeSidebarTab === SidebarTab.COMPENDIUM && isGameMaster ? (
          <Suspense fallback={fallback}>
            <CompendiumPanel gameId={currentGame?.id ?? null} />
          </Suspense>
        ) : null}
      </div>

      <div
        id="tabpanel-settings"
        role="tabpanel"
        aria-labelledby="tab-settings"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.SETTINGS ? '' : 'hidden'
        }`}
      >
        {activeSidebarTab === SidebarTab.SETTINGS ? (
          <Suspense fallback={fallback}>
            <GameSettingsPanel
              game={currentGame}
              isLeavingGame={isLeavingGame}
              onLeaveGame={onLeaveGame}
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}
