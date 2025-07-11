import React from "react";
import { SidebarTab } from "../../../shared/api/types";
import { ChatBubbleIcon, IdentificationCardIcon } from "../../../shared/ui/Icons";
import { TabButton } from "../../../shared/ui/TabButton";

interface SidebarTabsProps {
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: (tab: SidebarTab) => void;
}

export const SidebarTabs: React.FC<SidebarTabsProps> = ({
  activeSidebarTab,
  setActiveSidebarTab,
}) => {
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
    </>
  );
};
