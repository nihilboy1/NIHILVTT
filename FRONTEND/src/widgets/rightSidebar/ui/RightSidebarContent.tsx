import { SidebarTab } from '../../../shared/api/types';
import { CharactersPanel } from '../../charactersPanel/ui/CharactersPanel';
import { ChatPanel } from '../../chatPanel/ui/ChatPanel';

interface RightSidebarContentProps {
  activeSidebarTab: SidebarTab;
}

export function RightSidebarContent({ activeSidebarTab }: RightSidebarContentProps) {
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
        <ChatPanel />
      </div>

      <div
        id="tabpanel-characters"
        role="tabpanel"
        aria-labelledby="tab-CHARACTERS"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.CHARACTERS ? '' : 'hidden'
        }`}
      >
        <CharactersPanel />
      </div>
    </div>
  );
}
