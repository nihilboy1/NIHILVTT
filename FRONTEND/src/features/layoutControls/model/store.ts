import { create } from "zustand";

import { SidebarTab, Tool } from "@/shared/api/types";

export interface UIState {
  activeTool: Tool;
  activeSidebarTab: SidebarTab;
  isToolbarVisible: boolean;
  isRightSidebarVisible: boolean;
  activePopover: "ruler" | "dice" | null;
  setActiveTool: (tool: Tool) => void;
  setActiveSidebarTab: (tab: SidebarTab) => void;
  setIsToolbarVisible: (isVisible: boolean) => void;
  setIsRightSidebarVisible: (isVisible: boolean) => void;
  setActivePopover: (popover: "ruler" | "dice" | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTool: Tool.SELECT,
  activeSidebarTab: SidebarTab.CHAT,
  isToolbarVisible: true,
  isRightSidebarVisible: true,
  activePopover: null,
  setActiveTool: (tool) => set({ activeTool: tool }),
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),
  setIsToolbarVisible: (isVisible) => set({ isToolbarVisible: isVisible }),
  setIsRightSidebarVisible: (isVisible) =>
    set({ isRightSidebarVisible: isVisible }),
  setActivePopover: (popover) => set({ activePopover: popover }),
}));
