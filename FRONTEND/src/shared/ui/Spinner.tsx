import { cn } from '../lib/utils/cn';

type SpinnerProps = {
  variant?: 'fullpage' | 'mini';
  loadingText?: string;
};

export function Spinner({ variant = 'fullpage', loadingText = 'Carregando...' }: SpinnerProps) {
  const isFullPage = variant === 'fullpage';

  return (
    <div
      role="status"
      className={cn(
        'flex items-center justify-center',
        isFullPage && 'bg-surface-0 h-[100vh] w-full',
      )}
    >
      <div
        className={cn(
          'border-text-primary border-l-accent-primary animate-spin rounded-full border-4 border-solid',
          'h-5 w-5',
          isFullPage && 'h-16 w-16',
        )}
      />
      <span className="sr-only">{loadingText}</span>
    </div>
  );
}
