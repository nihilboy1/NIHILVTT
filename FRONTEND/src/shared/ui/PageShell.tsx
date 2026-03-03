import { ReactNode } from 'react';

import { Squares } from './SquaresBackground';

type PageShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  withSquares?: boolean;
  squareDirection?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  squareInteractive?: boolean;
  squareAnimated?: boolean;
};

export function PageShell({
  children,
  className,
  contentClassName,
  withSquares = true,
  squareDirection = 'diagonal',
  squareInteractive = true,
  squareAnimated = true,
}: PageShellProps) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden bg-surface-0 ${className || ''}`}
    >
      {withSquares && (
        <div className="absolute top-0 left-0 h-full w-full">
          <Squares
            direction={squareDirection}
            interactive={squareInteractive}
            animated={squareAnimated}
          />
        </div>
      )}

      <div className={`relative ${contentClassName || ''}`}>{children}</div>
    </div>
  );
}
