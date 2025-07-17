import { cn } from "@/shared/lib/utils/cn";
import React from "react";
type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";

interface PlayerSheetTabsProps {
  activeTab: PlayerSheetTab;
  onTabChange: (tab: PlayerSheetTab) => void;
}

export const PlayerSheetTabs: React.FC<PlayerSheetTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabButtonClass = (tabName: PlayerSheetTab) =>
    cn(
      "px-4 py-2 text-sm font-medium rounded-t-md border-b-2",
      activeTab === tabName
        ? "border-accent-primary text-accent-primary bg-surface-1"
        : "border-transparent text-text-secondary hover:bg-surface-1 hover:border-accent-primary-hover"
    );

  return (
    <div className="flex border-b border-surface-2 mb-2.5">
      <button
        type="button"
        onClick={() => onTabChange("principal")}
        className={tabButtonClass("principal")}
      >
        Principal
      </button>
      <button
        type="button"
        onClick={() => onTabChange("detalhes")}
        className={tabButtonClass("detalhes")}
      >
        Detalhes
      </button>
      <button
        type="button"
        onClick={() => onTabChange("configuracoes")}
        className={tabButtonClass("configuracoes")}
      >
        Configurações
      </button>
    </div>
  );
};
