import { useUI } from "../app/providers/UIProvider";
import { ChevronRightIcon } from "../shared/ui/Icons";
import { SidebarContent } from "./SidebarContent";
import { SidebarTabs } from "./SidebarTabs";

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
      <header className="flex items-center">
        <button
          onClick={() => setIsRightSidebarVisible(false)}
          className="hover:bg-surface-3 h-full border-b-2 p-3 focus:outline-none focus:ring-1 focus:ring-inset cursor-pointer"
          aria-label="Esconder Barra Lateral Direita"
          title="Esconder Barra Lateral"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <SidebarTabs
          activeSidebarTab={activeSidebarTab}
          setActiveSidebarTab={setActiveSidebarTab}
        />
      </header>

      <SidebarContent activeSidebarTab={activeSidebarTab} />
    </div>
  );
}
