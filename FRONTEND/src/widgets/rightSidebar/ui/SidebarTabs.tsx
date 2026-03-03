import { SidebarTab } from '../../../shared/api/types';
import { BookIcon, ChatBubbleIcon, IdentificationCardIcon, PageConfigIcon } from '../../../shared/ui/Icons';
import { TabButton } from '../../../shared/ui/TabButton';

interface SidebarTabsProps {
  activeSidebarTab: SidebarTab;
  isGameMaster: boolean;
  setActiveSidebarTab: (tab: SidebarTab) => void;
}

export function SidebarTabs({ activeSidebarTab, isGameMaster, setActiveSidebarTab }: SidebarTabsProps) {
  return (
    <>
      <TabButton
        tab={SidebarTab.CHAT}
        label="Chat"
        icon={<ChatBubbleIcon />}
        isActive={activeSidebarTab === SidebarTab.CHAT}
        onClick={() => setActiveSidebarTab(SidebarTab.CHAT)}
      />
      <TabButton
        tab={SidebarTab.CHARACTERS}
        label="Personagens"
        icon={<IdentificationCardIcon />}
        isActive={activeSidebarTab === SidebarTab.CHARACTERS}
        onClick={() => setActiveSidebarTab(SidebarTab.CHARACTERS)}
      />
      {isGameMaster ? (
        <TabButton
          tab={SidebarTab.COMPENDIUM}
          label="Biblioteca"
          icon={<BookIcon />}
          isActive={activeSidebarTab === SidebarTab.COMPENDIUM}
          onClick={() => setActiveSidebarTab(SidebarTab.COMPENDIUM)}
        />
      ) : null}
      <TabButton
        tab={SidebarTab.SETTINGS}
        label="Configs"
        icon={<PageConfigIcon />}
        isActive={activeSidebarTab === SidebarTab.SETTINGS}
        onClick={() => setActiveSidebarTab(SidebarTab.SETTINGS)}
      />
    </>
  );
}
