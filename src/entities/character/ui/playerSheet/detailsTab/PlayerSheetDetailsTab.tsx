import { cn } from "../../../../../shared/lib/utils/cn";

interface PlayerSheetDetailsTabProps {
  editingCharacterNotes: string;
  setEditingCharacterNotes: (notes: string) => void;
  editingInspiration: boolean;
  setEditingInspiration: (inspiration: boolean) => void;
}

export function PlayerSheetDetailsTab({
  editingCharacterNotes,
  setEditingCharacterNotes,
  editingInspiration,
  setEditingInspiration,
}: PlayerSheetDetailsTabProps) {
  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-12.5rem)]">
      {" "}
      {/* Converted 200px to 12.5rem */}
      <div>
        <label
          htmlFor="pjSheetEditingTokenNotes"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px" // Converted from 11px
        >
          Notas do Personagem
        </label>
        <textarea
          id="pjSheetEditingCharacterNotes"
          value={editingCharacterNotes}
          onChange={(e) => setEditingCharacterNotes(e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "min-h-[5rem]" // Converted from 80px
          )}
        />
      </div>
      <div className="pt-1">
        <label
          htmlFor="editingInspiration"
          className="flex items-center space-x-1.5 cursor-pointer"
        >
          <input
            id="editingInspiration"
            type="checkbox"
            checked={editingInspiration}
            onChange={(e) => setEditingInspiration(e.target.checked)}
            className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1"
          />
          <span
            className={cn(
              "block text-[0.6875rem] font-medium text-accent-primary mb-px", // Converted from 11px
              "mb-0"
            )}
          >
            Inspiração
          </span>
        </label>
      </div>
      <p className="text-text-secondary text-xs italic mt-4 text-center">
        Outras informações de história, magias, etc. (Em desenvolvimento)
      </p>
    </div>
  );
}
