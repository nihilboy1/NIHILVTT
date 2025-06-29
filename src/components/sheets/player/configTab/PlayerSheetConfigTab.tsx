import { CharacterType } from "../../../../shared/api/types";
import { characterTypeTranslations } from "../../../../shared/config/constants"; // Renomeado
import { cn } from "../../../../shared/lib/utils/cn";

interface PlayerSheetConfigTabProps {
  editingCharacterImage: string;
  setEditingCharacterImage: (image: string) => void;
  editingCharacterSize: string;
  setEditingCharacterSize: (size: string) => void;
}

export function PlayerSheetConfigTab({
  editingCharacterImage,
  setEditingCharacterImage,
  editingCharacterSize,
  setEditingCharacterSize,
}: PlayerSheetConfigTabProps) {
  return (
    <div className="p-2 space-y-1.5 overflow-y-auto max-h-[calc(100vh-12.5rem)]">
      {" "}
      {/* Converted 200px to 12.5rem */}
      <div>
        <label
          htmlFor="pjSheetEditingCharacterImage"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px" // Converted from 11px
        >
          URL da Imagem do Personagem
        </label>
        <input
          id="pjSheetEditingCharacterImage"
          type="text"
          value={editingCharacterImage}
          onChange={(e) => setEditingCharacterImage(e.target.value)}
          placeholder="Cole a URL da imagem aqui"
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          )}
        />
      </div>
      <div>
        <label
          htmlFor="pjSheetEditingCharacterSize"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px" // Converted from 11px
        >
          Tamanho do Personagem (Tabuleiro)
        </label>
        <select
          id="pjSheetEditingCharacterSize"
          value={editingCharacterSize}
          onChange={(e) => setEditingCharacterSize(e.target.value)}
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
        >
          <option value="1x1">1x1 (Padrão)</option>
          <option value="2x2">2x2 (Grande)</option>
          <option value="3x3">3x3 (Enorme)</option>
          <option value="0.5x0.5">0.5x0.5 (Minúsculo)</option>
        </select>
      </div>
      <div>
        <label className="block text-[0.6875rem] font-medium text-accent-primary mb-px">
          {" "}
          {/* Converted from 11px */}
          Tipo do Personagem
        </label>
        <input
          type="text"
          value={characterTypeTranslations[CharacterType.PLAYER]}
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
