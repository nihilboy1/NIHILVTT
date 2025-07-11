import { useGameBoard } from "../../../widgets/gameBoard/model/contexts/GameBoardContext";
import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "../../../shared/config/constants";

export function ZoomControls() {
  const {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
  } = useGameBoard();
  return (
    <div className="bg-opacity-80 p-2 rounded-md shadow-md flex flex-col items-center space-y-2 w-10">
      <button
        onClick={handleZoomIn}
        disabled={zoomLevel >= MAX_ZOOM_LEVEL}
        className="hover:bg-accent-primary-hover zoom-control-button p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 cursor-pointer"
        aria-label="Aumentar zoom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
      <button
        onClick={handleZoomOut}
        disabled={zoomLevel <= MIN_ZOOM_LEVEL}
        className="hover:bg-accent-primary-hover zoom-control-button p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 cursor-pointer"
        aria-label="Diminuir zoom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="text-[0.6rem]">Zoom</span>
      <div className="bg-surface-3 text-xs px-2 p-1 rounded border -mt-[0.4rem]">
        {zoomLevel.toFixed(2)}x
      </div>
    </div>
  );
}
