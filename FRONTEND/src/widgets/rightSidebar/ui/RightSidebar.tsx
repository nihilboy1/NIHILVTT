import { useUIStore } from '@/features/layoutControls/model/store';

import { ChevronRightIcon } from '../../../shared/ui/Icons';

import { RightSidebarContent } from './RightSidebarContent';
import { SidebarTabs } from './SidebarTabs';

// a barra lateral direita como um todo. botões de abas e as condicionais para exibir os painéis de chat e tokens
export function RightSidebar() {
  const { activeSidebarTab, setActiveSidebarTab, setIsRightSidebarVisible } = useUIStore();

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
          setActiveSidebarTab={setActiveSidebarTab}
        />
      </header>

      <RightSidebarContent activeSidebarTab={activeSidebarTab} />
    </div>
  );
}
