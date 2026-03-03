import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type PanelSafeArea = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type Position = {
  x: number;
  y: number;
};

type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

type DragHandleContextValue = {
  onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
};

const DragHandleContext = createContext<DragHandleContextValue | null>(null);

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getSafeAreaValue(value: number | undefined): number {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : 0;
}

function clampPosition(position: Position, bounds: Bounds): Position {
  return {
    x: clamp(position.x, bounds.left, bounds.right),
    y: clamp(position.y, bounds.top, bounds.bottom),
  };
}

interface DraggableHandleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function DraggableHandle({ children, onMouseDown, ...props }: DraggableHandleProps) {
  const context = useContext(DragHandleContext);
  if (!context) {
    throw new Error('DraggableHandle must be used inside DraggablePanel.');
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown?.(event);
    if (event.defaultPrevented) {
      return;
    }

    context.onMouseDown(event);
  };

  return (
    <div
      {...props}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}

interface DraggablePanelProps {
  initialPosition: Position;
  safeArea?: PanelSafeArea;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

function DraggablePanelInner({
  initialPosition,
  safeArea = {},
  className,
  style,
  children,
}: DraggablePanelProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [bounds, setBounds] = useState<Bounds>({
    left: initialPosition.x,
    top: initialPosition.y,
    right: initialPosition.x,
    bottom: initialPosition.y,
  });
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const safeLeft = getSafeAreaValue(safeArea.left);
  const safeTop = getSafeAreaValue(safeArea.top);
  const safeRight = getSafeAreaValue(safeArea.right);
  const safeBottom = getSafeAreaValue(safeArea.bottom);

  const recalculateBounds = useCallback(() => {
    if (!node) {
      return;
    }

    const nextBounds = {
      left: safeLeft,
      top: safeTop,
      right: Math.max(safeLeft, window.innerWidth - node.offsetWidth - safeRight),
      bottom: Math.max(safeTop, window.innerHeight - node.offsetHeight - safeBottom),
    };

    setBounds(nextBounds);
    setPosition((current) => clampPosition(current, nextBounds));
  }, [node, safeBottom, safeLeft, safeRight, safeTop]);

  useLayoutEffect(() => {
    recalculateBounds();
  }, [recalculateBounds]);

  useEffect(() => {
    if (!node || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => {
      recalculateBounds();
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, recalculateBounds]);

  useEffect(() => {
    window.addEventListener('resize', recalculateBounds);

    return () => {
      window.removeEventListener('resize', recalculateBounds);
    };
  }, [recalculateBounds]);

  useEffect(() => {
    return () => {
      if (document.body.style.cursor === 'grabbing') {
        document.body.style.cursor = 'default';
      }
    };
  }, []);

  const handleDragHandleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event.button !== 0 || !node) {
      return;
    }

    const target = event.target;
    if (target instanceof HTMLElement && target.closest('[data-no-panel-drag="true"]')) {
      return;
    }

    const rect = node.getBoundingClientRect();
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition(() =>
        clampPosition(
          {
            x: moveEvent.clientX - dragOffsetRef.current.x,
            y: moveEvent.clientY - dragOffsetRef.current.y,
          },
          bounds,
        ),
      );
    };

    const handleMouseUp = () => {
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.body.style.cursor = 'grabbing';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    event.preventDefault();
  };

  const mergedStyle: CSSProperties = {
    left: `${position.x}px`,
    position: 'fixed',
    top: `${position.y}px`,
    ...style,
  };

  const dragHandleContext = useMemo<DragHandleContextValue>(
    () => ({
      onMouseDown: handleDragHandleMouseDown,
    }),
    [handleDragHandleMouseDown],
  );

  return (
    <DragHandleContext.Provider value={dragHandleContext}>
      <div ref={setNode} className={className} style={mergedStyle}>
        {children}
      </div>
    </DragHandleContext.Provider>
  );
}

export function DraggablePanel(props: DraggablePanelProps) {
  return <DraggablePanelInner {...props} />;
}
