import z from 'zod';

import {
  CHARACTER_TYPES_OPTIONS,
  CharacterTypeEnum,
} from '@/entities/character/model/schemas/character.schema';
import { cn } from '@/shared/lib/utils/cn';
type CharacterType = z.infer<typeof CharacterTypeEnum>;

interface MonsterNpcSheetProps {
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

export function MonsterNpcSheet({
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
}: MonsterNpcSheetProps) {
  return (
    <div className="max-h-[calc(100vh-12.5rem)] space-y-3 overflow-y-auto p-0.5">
      <div>
        <label
          htmlFor="editingCharacterName"
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
        >
          Nome do Personagem
        </label>
        <input
          id="editingCharacterName"
          type="text"
          value={editingCharacterName}
          onChange={(e) => setEditingCharacterName(e.target.value)}
          className="placeholder-text-secondary bg-surface-1 text-text-primary focus:ring-accent-primary focus:border-accent-primary w-full rounded-md p-0 focus:ring-1"
          required
          maxLength={35}
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterType"
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
        >
          Tipo
        </label>
        <select
          id="editingCharacterType"
          value={editingCharacterType || ''}
          onChange={(e) => setEditingCharacterType(e.target.value as CharacterType)}
          className="placeholder-text-secondary bg-surface-1 text-text-primary border-surface-2 focus:ring-accent-primary focus:border-accent-primary w-full rounded-md border p-2 focus:ring-1"
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
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
        >
          Vida Máxima
        </label>
        <input
          id="editingMaxHp"
          type="number"
          value={editingMaxHp}
          onChange={(e) => setEditingMaxHp(e.target.value)}
          className={cn(
            'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
            'hide-arrows',
          )}
          min="1"
          step="1"
          required
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterNotes"
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
        >
          Notas
        </label>
        <textarea
          id="editingCharacterNotes"
          value={editingCharacterNotes}
          onChange={(e) => setEditingCharacterNotes(e.target.value)}
          className={cn(
            'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
            'min-h-[6.25rem]',
          )}
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterImage"
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
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
            'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
          )}
        />
      </div>
      <div>
        <label
          htmlFor="editingCharacterSize"
          className="text-accent-primary mb-px block text-[0.6875rem] font-medium"
        >
          Tamanho
        </label>
        <select
          id="editingCharacterSize"
          value={editingCharacterSize}
          onChange={(e) => setEditingCharacterSize(e.target.value)}
          className="placeholder-text-secondary bg-surface-1 text-text-primary border-surface-2 focus:ring-accent-primary focus:border-accent-primary w-full rounded-md border p-2 focus:ring-1"
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
