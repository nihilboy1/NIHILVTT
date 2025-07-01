import { useState, type Dispatch, type SetStateAction } from "react";
import { SidebarTab, Tool } from "../../../../shared/api/types";

export interface UIState {
  activeTool: Tool;
  setActiveTool: Dispatch<SetStateAction<Tool>>;
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: Dispatch<SetStateAction<SidebarTab>>;
  isToolbarVisible: boolean;
  setIsToolbarVisible: Dispatch<SetStateAction<boolean>>;
  isRightSidebarVisible: boolean;
  setIsRightSidebarVisible: Dispatch<SetStateAction<boolean>>;
  activePopover: "ruler" | "dice" | null;
  setActivePopover: Dispatch<SetStateAction<"ruler" | "dice" | null>>;
}

export const useUIState = (): UIState => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.SELECT);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>(
    SidebarTab.CHAT
  );
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  const [activePopover, setActivePopover] = useState<"ruler" | "dice" | null>(
    null
  );

  return {
    activeTool,
    setActiveTool,
    activeSidebarTab,
    setActiveSidebarTab,
    isToolbarVisible,
    setIsToolbarVisible,
    isRightSidebarVisible,
    setIsRightSidebarVisible,
    activePopover,
    setActivePopover,
  };
};
