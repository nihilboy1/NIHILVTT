import { SidebarTab } from "../../types/index"; // Ajustar o caminho do tipo
import { ChatBubbleIcon, UsersIcon, ChevronRightIcon } from "../icons"; // Ajustar o caminho do componente
import TabButton from "../ui/TabButton"; // Ajustar o caminho do componente
import { useUI } from "../../contexts/UIContext"; // Ajustar o caminho do contexto
import ChatPanel from "../chat/ChatPanel"; // Importar o novo componente
import TokensPanel from "../tokens/TokensPanel"; // Importar o novo componente

const RightSidebar = () => {
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
          className="h-full border-b-2 p-3 transition-colors focus:outline-none focus:ring-1 focus:ring-inset cursor-pointer"
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
          icon={<UsersIcon />}
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
};

export default RightSidebar;

// ESTILO CORRIJIDO
