import { useBoardZoomStore } from '@/features/boardZoom/model/store'; // Importar useBoardZoomStore
import { ZOOM_CONFIG } from '@/shared/config/constants';

export function ZoomControls() {
  const { zoomLevel, handleZoomIn, handleZoomOut } = useBoardZoomStore(); // Usar useBoardZoomStore
  return (
    <div className="bg-opacity-80 flex w-10 flex-col items-center space-y-2 rounded-md p-2 shadow-md">
      <button
        onClick={handleZoomIn}
        disabled={zoomLevel >= ZOOM_CONFIG.MAX}
        className="hover:bg-accent-primary-hover zoom-control-button cursor-pointer rounded p-1 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Aumentar zoom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
      <button
        onClick={handleZoomOut}
        disabled={zoomLevel <= ZOOM_CONFIG.MIN}
        className="hover:bg-accent-primary-hover zoom-control-button cursor-pointer rounded p-1 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Diminuir zoom"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="text-[0.6rem]">Zoom</span>
      <div className="bg-surface-3 -mt-[0.4rem] rounded border p-1 px-2 text-xs">
        {zoomLevel.toFixed(2)}x
      </div>
    </div>
  );
}
