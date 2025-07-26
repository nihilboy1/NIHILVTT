// src/entities/character/ui/playerSheet/detailsTab/PlayerSheetDetailsTab.tsx

import { useFormContext } from "react-hook-form"; // 1. Importar o hook

import { PlayerCharacter } from "../../../../entities/character/model/schemas/character.schema";
import { cn } from "../../../../shared/lib/utils/cn";

export function PlayerSheetDetailsTab() {
  // 3. Pegamos o método `register` do contexto do formulário.
  const { register } = useFormContext<PlayerCharacter>();

  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-12.5rem)]">
      <div>
        <label
          htmlFor="characterNotes"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Notas do Personagem
        </label>
        {/* 4. O campo agora é registrado com o nome 'notes' do nosso schema */}
        <textarea
          id="characterNotes"
          {...register("notes")}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "min-h-[5rem]"
          )}
        />
      </div>
      <div className="pt-1">
        <label
          htmlFor="characterInspiration"
          className="flex items-center space-x-1.5 cursor-pointer"
        >
          {/* 5. O checkbox também é registrado com o nome 'inspiration' */}
          <input
            id="characterInspiration"
            type="checkbox"
            {...register("inspiration")}
            className="h-3.5 w-3.5 rounded-sm border-surface-2 text-accent-primary focus:ring-accent-primary bg-surface-1"
          />
          <span
            className={cn(
              "block text-[0.6875rem] font-medium text-accent-primary mb-px",
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
