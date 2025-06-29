import React from "react";
import { ChatPanel } from "../components/chat/ChatPanel";
import { CharactersPanel } from "../components/tokens/CharactersPanel";
import { SidebarTab } from "../shared/api/types";

interface SidebarContentProps {
  activeSidebarTab: SidebarTab;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  activeSidebarTab,
}) => {
  return (
    <div
      title="bloco de chat e input"
      className="relative flex-grow overflow-hidden"
    >
      <div
        id="tabpanel-chat"
        role="tabpanel"
        aria-labelledby="tab-chat"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.CHAT ? "" : "hidden"
        }`}
      >
        <ChatPanel />
      </div>

      <div
        id="tabpanel-tokens"
        role="tabpanel"
        aria-labelledby="tab-tokens"
        className={`absolute inset-0 flex flex-col ${
          activeSidebarTab === SidebarTab.TOKENS ? "" : "hidden"
        }`}
      >
        <CharactersPanel />
      </div>
    </div>
  );
};
