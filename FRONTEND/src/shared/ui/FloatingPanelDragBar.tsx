import { DraggableHandle } from './DraggablePanel';
import { DragHandleIcon } from './Icons';

interface FloatingPanelDragBarProps {
  title: string;
  className?: string;
  insetClassName?: string;
}

export function FloatingPanelDragBar({
  title,
  className,
  insetClassName = '-mx-3 -mt-3 mb-2',
}: FloatingPanelDragBarProps) {
  return (
    <DraggableHandle
      className={[
        insetClassName,
        'flex cursor-grab items-center justify-between gap-2 rounded-t-[inherit] rounded-b-none border-b border-surface-3 bg-surface-2/80 px-3 py-1',
        'select-none active:cursor-grabbing',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={title}
      title={title}
    >
      <span className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-text-secondary">
        {title}
      </span>
      <DragHandleIcon className="h-4 w-4 text-black [&_path]:fill-black [&_path]:stroke-black" invert={false} />
    </DraggableHandle>
  );
}
