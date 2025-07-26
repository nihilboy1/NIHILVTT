// src/entities/character/ui/playerSheet/configTab/PlayerSheetConfigTab.tsx

import { useFormContext } from "react-hook-form"; // 1. Importar

import {
  CharacterTypeEnum,
  characterTypeTranslations,
  PlayerCharacter,
} from "../../../../entities/character/model/schemas/character.schema";
import { cn } from "../../../../shared/lib/utils/cn";

export function PlayerSheetConfigTab() {
  // 3. Pegamos o 'register' do contexto
  const { register } = useFormContext<PlayerCharacter>();

  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-12.5rem)]">
      <div>
        <label
          htmlFor="characterImage"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          URL da Imagem do Personagem
        </label>
        {/* 4. Campo registrado com o nome 'image' do nosso schema */}
        <input
          id="characterImage"
          type="text"
          placeholder="Cole a URL da imagem aqui"
          {...register("image")}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          )}
        />
      </div>
      <div>
        <label
          htmlFor="characterSize"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Tamanho do Personagem (Tabuleiro)
        </label>
        {/* 5. Campo registrado com o nome 'size' do nosso schema */}
        <select
          id="characterSize"
          {...register("size")}
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
        >
          <option value="1x1">1x1 (Padrão)</option>
          <option value="2x2">2x2 (Grande)</option>
          <option value="3x3">3x3 (Enorme)</option>
          <option value="0.5x0.5">0.5x0.5 (Minúsculo)</option>
        </select>
      </div>
      <div>
        <p className="block text-[0.6875rem] font-medium text-accent-primary mb-px">
          Tipo do Personagem
        </p>
        {/* Este campo é apenas de exibição, não precisa ser registrado no formulário */}
        <input
          type="text"
          value={characterTypeTranslations[CharacterTypeEnum.enum.Player]}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "bg-surface-1 opacity-70 cursor-not-allowed"
          )}
          readOnly
          disabled
        />
      </div>
    </div>
  );
}
