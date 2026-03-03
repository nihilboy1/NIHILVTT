import { cn } from "@/shared/lib/utils/cn";

export type PlayerSheetTab =
  | "principal"
  | "equipamento"
  | "detalhes"
  | "configuracoes";

interface PlayerSheetTabsProps {
  activeTab: PlayerSheetTab;
  onTabChange: (tab: PlayerSheetTab) => void;
}

export function PlayerSheetTabs({
  activeTab,
  onTabChange,
}: PlayerSheetTabsProps) {
  const tabs: Array<{ id: PlayerSheetTab; label: string; shortLabel: string }> = [
    { id: "principal", label: "Principal", shortLabel: "Base" },
    { id: "equipamento", label: "Equipamento", shortLabel: "Gear" },
    { id: "detalhes", label: "Detalhes", shortLabel: "Info" },
    { id: "configuracoes", label: "Configurações", shortLabel: "Config" },
  ];

  const tabButtonClass = (tabName: PlayerSheetTab) =>
    cn(
      "flex min-w-0 flex-1 items-center justify-center rounded-lg px-2.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-all duration-150 sm:px-3 sm:py-1.5 sm:text-sm sm:normal-case sm:tracking-normal",
      activeTab === tabName
        ? "bg-accent-primary/90 text-text-primary shadow-sm"
        : "text-text-secondary hover:bg-surface-1/70 hover:text-text-primary"
    );

  return (
    <div className="mb-1.5 rounded-xl bg-surface-0/45 p-1">
      <div className="flex items-center gap-0.5" role="tablist" aria-label="Abas da ficha">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={tabButtonClass(tab.id)}
            title={tab.label}
          >
            <span className="sm:hidden">{tab.shortLabel}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
