import { cn } from "@/shared/lib/utils/cn";

interface AttributeBlockProps {
  value: number;
  label: string;
  modifier: number;
  onRoll?: () => void;
}

export function AttributeBlock({
  value,
  label,
  modifier,
  onRoll,
}: AttributeBlockProps) {
  const isEmpty =
    value === undefined || value === null || Number.isNaN(value);

  const displayModifier =
    isEmpty || Number.isNaN(modifier)
      ? 0
      : modifier >= 0
        ? `+${modifier}`
        : modifier;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg bg-surface-0/18 px-2 py-1.5 transition-colors duration-200",
        onRoll && "cursor-pointer hover:bg-surface-0/30"
      )}
      onClick={onRoll}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onRoll?.();
        }
      }}
      role="button"
      tabIndex={onRoll ? 0 : -1}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="min-w-0">
          <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
            {label}
          </p>
          <div
            id={label}
            aria-label={`${label} definido pela ficha`}
            className={cn(
              "flex h-9 w-16 items-center justify-center rounded-md bg-surface-1/70 text-base font-semibold text-text-primary",
              isEmpty ? "text-feedback-negative" : ""
            )}
          >
            {isEmpty ? "-" : String(value)}
          </div>
        </div>
        {isEmpty && (
          <p className="text-[0.68rem] text-feedback-negative">Não pode ser vazio</p>
        )}
      </div>

      <span className="flex h-9 min-w-12 items-center justify-center rounded-md bg-accent-primary/14 px-2 text-lg font-bold text-accent-secondary">
        {displayModifier}
      </span>
    </div>
  );
}
