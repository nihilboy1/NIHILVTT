
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Tool, SidebarTab } from '../types';

export interface UIState {
  activeTool: Tool;
  setActiveTool: Dispatch<SetStateAction<Tool>>;
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: Dispatch<SetStateAction<SidebarTab>>;
  isToolbarVisible: boolean;
  setIsToolbarVisible: Dispatch<SetStateAction<boolean>>;
  isRightSidebarVisible: boolean;
  setIsRightSidebarVisible: Dispatch<SetStateAction<boolean>>;
}

export const useUIState = (): UIState => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.SELECT);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>(SidebarTab.CHAT);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);

  return {
    activeTool, setActiveTool,
    activeSidebarTab, setActiveSidebarTab,
    isToolbarVisible, setIsToolbarVisible,
    isRightSidebarVisible, setIsRightSidebarVisible
  };
};
