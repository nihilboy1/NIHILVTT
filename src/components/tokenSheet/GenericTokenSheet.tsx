import { TokenType } from "../../types";
import { TOKEN_TYPES_OPTIONS } from "../../constants";
import { cn } from "../../utils/cn";

interface GenericTokenSheetProps {
  editingTokenName: string;
  setEditingTokenName: (name: string) => void;
  editingTokenType: TokenType | null;
  setEditingTokenType: (type: TokenType) => void;
  editingCurrentHp: string;
  setEditingCurrentHp: (hp: string) => void;
  editingMaxHp: string;
  setEditingMaxHp: (hp: string) => void;
  editingTokenNotes: string;
  setEditingTokenNotes: (notes: string) => void;
  editingTokenImage: string; // Nova propriedade para a imagem
  setEditingTokenImage: (image: string) => void; // Novo setter
  editingTokenSize: string;
  setEditingTokenSize: (size: string) => void;
}

export function GenericTokenSheet({
  editingTokenName,
  setEditingTokenName,
  editingTokenType,
  setEditingTokenType,
  editingCurrentHp,
  setEditingCurrentHp,
  editingMaxHp,
  setEditingMaxHp,
  editingTokenNotes,
  setEditingTokenNotes,
  editingTokenImage, // Usar a imagem
  setEditingTokenImage, // Usar o setter da imagem
  editingTokenSize,
  setEditingTokenSize,
}: GenericTokenSheetProps) {
  return (
    <div className="p-0.5 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
      <div>
        <label
          htmlFor="editingTokenName"
          className="block text-[11px] font-medium text-accent-primary mb-px"
        >
          Nome do Token
        </label>
        <input
          id="editingTokenName"
          type="text"
          value={editingTokenName}
          onChange={(e) => setEditingTokenName(e.target.value)}
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
          required
          maxLength={35}
        />
      </div>
      <div>
        <label
          htmlFor="editingTokenType"
          className="block text-[11px] font-medium text-accent-primary mb-px"
        >
          Tipo
        </label>
        <select
          id="editingTokenType"
          value={editingTokenType || ""}
          onChange={(e) => setEditingTokenType(e.target.value as TokenType)}
          className="w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary"
        >
          {TOKEN_TYPES_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <div className="flex-1">
          <label
            htmlFor="editingCurrentHp"
            className="block text-[11px] font-medium text-accent-primary mb-px"
          >
            Vida Atual
          </label>
          <input
            id="editingCurrentHp"
            type="number"
            value={editingCurrentHp}
            onChange={(e) => setEditingCurrentHp(e.target.value)}
            className={cn(
              "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
              "hide-number-spinners"
            )}
            min="0"
            step="1"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="editingMaxHp"
            className="block text-[11px] font-medium text-accent-primary mb-px"
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
              "hide-number-spinners"
            )}
            min="1"
            step="1"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="editingTokenNotes"
          className="block text-[11px] font-medium text-accent-primary mb-px"
        >
          Notas
        </label>
        <textarea
          id="editingTokenNotes"
          value={editingTokenNotes}
          onChange={(e) => setEditingTokenNotes(e.target.value)}
          className={cn(
            "w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary",
            "min-h-[100px]"
          )}
        />
      </div>
      <div>
        <label htmlFor="editingTokenImage" className="block text-[11px] font-medium text-accent-primary mb-px">
          URL da Imagem do Token
        </label>
        <input
          id="editingTokenImage"
          type="text"
          value={editingTokenImage}
          onChange={(e) => setEditingTokenImage(e.target.value)}
          placeholder="Cole a URL da imagem aqui"
          className={cn("w-full p-2 bg-surface-1 border border-surface-2 rounded-md focus:ring-1 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary")}
        />
      </div>
      <div>
        <label
          htmlFor="editingTokenSize"
          className="block text-[11px] font-medium text-accent-primary mb-px"
        >
          Tamanho
        </label>
        <select
          id="editingTokenSize"
          value={editingTokenSize}
          onChange={(e) => setEditingTokenSize(e.target.value)}
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
