import { SidebarTab } from "../../types/index";
import { ChatBubbleIcon, ChevronRightIcon, IdentificationCardIcon } from "../icons";
import { TabButton } from "../ui/TabButton";
import { useUI } from "../../contexts/UIContext";
import { ChatPanel } from "../chat/ChatPanel";
import { TokensPanel } from "../tokens/TokensPanel";

// a barra lateral direita como um todo. botões de abas e as condicionais para exibir os painéis de chat e tokens
export function RightSidebar() {
  const { activeSidebarTab, setActiveSidebarTab, setIsRightSidebarVisible } =
    useUI();

  return (
    <div
      className="w-80 md:w-96 flex flex-col shadow-xl border-l"
      role="tablist"
      aria-orientation="horizontal"
    >
      <header className="flex items-center  ">
        <button
          onClick={() => setIsRightSidebarVisible(false)}
          className="hover:bg-surface-3 h-full border-b-2 p-3 focus:outline-none focus:ring-1 focus:ring-inset cursor-pointer"
          aria-label="Esconder Barra Lateral Direita"
          title="Esconder Barra Lateral"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <TabButton
          tab={SidebarTab.CHAT}
          label="Chat"
          icon={<ChatBubbleIcon />}
          isActive={activeSidebarTab === SidebarTab.CHAT}
          onClick={() => setActiveSidebarTab(SidebarTab.CHAT)}
        />
        <TabButton
          tab={SidebarTab.TOKENS}
          label="Tokens"
          icon={<IdentificationCardIcon />}
          isActive={activeSidebarTab === SidebarTab.TOKENS}
          onClick={() => setActiveSidebarTab(SidebarTab.TOKENS)}
        />
      </header>

      <div
        title="bloco de chat e input"
        className=" relative flex-grow overflow-hidden"
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
          <TokensPanel />
        </div>
      </div>
    </div>
  );
}
// ESTILO CORRIJIDO
