import z from "zod";
import {
  CHARACTER_TYPES_OPTIONS,
  CharacterTypeEnum,
} from "../../model/schemas/character.schema";
import { cn } from "@/shared/lib/utils/cn";
type CharacterType = z.infer<typeof CharacterTypeEnum>;

interface CreatureSheetProps {
  editingCharacterName: string;
  setEditingCharacterName: (name: string) => void;
  editingCharacterType: CharacterType | null;
  setEditingCharacterType: (type: CharacterType) => void;
  editingMaxHp: string;
  setEditingMaxHp: (hp: string) => void;
  editingCharacterNotes: string;
  setEditingCharacterNotes: (notes: string) => void;
  editingCharacterImage: string;
  setEditingCharacterImage: (image: string) => void;
  editingCharacterSize: string;
  setEditingCharacterSize: (size: string) => void;
}

export function CreatureSheet({
  editingCharacterName,
  setEditingCharacterName,
  editingCharacterType,
  setEditingCharacterType,
  editingMaxHp,
  setEditingMaxHp,
  editingCharacterNotes,
  setEditingCharacterNotes,
  editingCharacterImage,
  setEditingCharacterImage,
  editingCharacterSize,
  setEditingCharacterSize,
}: CreatureSheetProps) {
  return (
    <div className="p-0.5 space-y-3 overflow-y-auto max-h-[calc(100vh-12.5rem)]">
      <div>
        <label
          htmlFor="editingCharacterName"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Nome do Personagem
        </label>
        <input
          id="editingCharacterName"
          type="text"
          value={editingCharacterName}
          onChange={(e) => setEditingCharacterName(e.target.value)}
          className="w-full p-0 bg-surface-1  rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          required
          maxLength={35}
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterType"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Tipo
        </label>
        <select
          id="editingCharacterType"
          value={editingCharacterType || ""}
          onChange={(e) =>
            setEditingCharacterType(e.target.value as CharacterType)
          }
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
        >
          {CHARACTER_TYPES_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="editingMaxHp"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Vida Máxima
        </label>
        <input
          id="editingMaxHp"
          type="number"
          value={editingMaxHp}
          onChange={(e) => setEditingMaxHp(e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "hide-arrows"
          )}
          min="1"
          step="1"
          required
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterNotes"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Notas
        </label>
        <textarea
          id="editingCharacterNotes"
          value={editingCharacterNotes}
          onChange={(e) => setEditingCharacterNotes(e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "min-h-[6.25rem]"
          )}
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterImage"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          URL da Imagem do Personagem
        </label>
        <input
          id="editingCharacterImage"
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
          htmlFor="editingCharacterSize"
          className="block text-[0.6875rem] font-medium text-accent-primary mb-px"
        >
          Tamanho
        </label>
        <select
          id="editingCharacterSize"
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
    </div>
  );
}
