import { ZoomControls } from "../../../features/boardPanningAndZoom/ui/ZoomControls";
import { PageSettingsButton } from "../../../features/boardSettings/ui/PageSettingsButton";
import { cn } from "../../../shared/lib/utils/cn";

interface GameBoardSideOptionProps {
  isRightSidebarVisible: boolean;
  setIsPageAndGridSettingsModalOpen: (open: boolean) => void;
}

export function GameBoardSideOption({
  isRightSidebarVisible,
  setIsPageAndGridSettingsModalOpen,
}: GameBoardSideOptionProps) {
  return (
    <div
      title="pageSettingsOptions"
      className={cn(
        "border bg-surface-0 absolute top-2 flex flex-col items-end space-y-2 rounded",
        isRightSidebarVisible ? "right-[21rem] md:right-[25rem]" : "right-2"
      )}
    >
      <PageSettingsButton
        onClick={() => setIsPageAndGridSettingsModalOpen(true)}
      />
      <ZoomControls />
    </div>
  );
}
