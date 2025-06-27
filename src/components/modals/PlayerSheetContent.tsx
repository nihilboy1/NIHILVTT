import { useState } from "react";
import { usePlayerSheet } from "../../contexts/PlayerSheetContext";
import { PrincipalTab } from "../sheets/player/principalTab/PrincipalTab";
import { PlayerSheetDetailsTab } from "../sheets/player/detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetConfigTab } from "../sheets/player/configTab/PlayerSheetConfigTab";
import { cn } from "../../utils/cn";
import { useModal } from "../../contexts/ModalContext"; // Importar useModal
import { ActionEditModal } from "./ActionEditModal"; // Importar ActionEditModal
import { PlayerToken } from "../../types"; // Importar PlayerToken

type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";

interface PlayerSheetContentProps {
  tokenId: string;
  updateToken: (tokenId: string, updates: Partial<PlayerToken>) => void;
  onClose: () => void;
  editingTokenImage: string;
  setEditingTokenImage: (image: string) => void;
  editingTokenSize: string;
  setEditingTokenSize: (size: string) => void;
  editingTokenNotes: string;
  setEditingTokenNotes: (notes: string) => void;
  editingInspiration: boolean;
  setEditingInspiration: (inspiration: boolean) => void;
  hasTokenSheetChanged: boolean;
}

export function PlayerSheetContent({
  tokenId,
  updateToken,
  onClose,
  editingTokenImage,
  setEditingTokenImage,
  editingTokenSize,
  setEditingTokenSize,
  editingTokenNotes,
  setEditingTokenNotes,
  editingInspiration,
  setEditingInspiration,
  hasTokenSheetChanged,
}: PlayerSheetContentProps) {
  const { getUpdatedPlayerToken } = usePlayerSheet();
  const { modalStack, closeModal } = useModal(); // Importar useModal
  const [playerSheetActiveTab, setPlayerSheetActiveTab] =
    useState<PlayerSheetTab>("principal");

  const tabButtonClass = (tabName: PlayerSheetTab) =>
    cn(
      "px-4 py-2 text-sm font-medium rounded-t-md  border-b-2",
      playerSheetActiveTab === tabName
        ? "border-accent-primary text-accent-primary bg-surface-1"
        : "border-transparent text-text-secondary hover:bg-surface-1 hover:border-accent-primary-hover"
    );

  // Helper para obter o modal ativo e suas props
  const activeModalEntry = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;
  const activeModalName = activeModalEntry?.name;
  const activeModalProps = activeModalEntry?.props;

  return (
    <>
      <div className="flex border-b border-surface-2 mb-2.5">
        <button
          type="button"
          onClick={() => setPlayerSheetActiveTab("principal")}
          className={tabButtonClass("principal")}
        >
          Principal
        </button>
        <button
          type="button"
          onClick={() => setPlayerSheetActiveTab("detalhes")}
          className={tabButtonClass("detalhes")}
        >
          Detalhes
        </button>
        <button
          type="button"
          onClick={() => setPlayerSheetActiveTab("configuracoes")}
          className={tabButtonClass("configuracoes")}
        >
          Configurações
        </button>
      </div>

      {playerSheetActiveTab === "principal" ? (
        <PrincipalTab />
      ) : playerSheetActiveTab === "detalhes" ? (
        <PlayerSheetDetailsTab
          editingTokenNotes={editingTokenNotes}
          setEditingTokenNotes={setEditingTokenNotes}
          editingInspiration={editingInspiration}
          setEditingInspiration={setEditingInspiration}
        />
      ) : (
        <PlayerSheetConfigTab
          editingTokenImage={editingTokenImage}
          setEditingTokenImage={setEditingTokenImage}
          editingTokenSize={editingTokenSize}
          setEditingTokenSize={setEditingTokenSize}
        />
      )}

      <div className="pt-2 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-accent-secondary hover:bg-accent-secondary-hover text-text-primary font-semibold rounded-md "
        >
          Cancelar
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault(); // Prevenir o submit padrão do formulário
            // Para PlayerToken, obtenha os dados atualizados do contexto
            const updatedPlayerToken = getUpdatedPlayerToken();
            updateToken(tokenId, updatedPlayerToken);
            onClose();
          }}
          className="px-4 py-2  text-text-primary font-semibold rounded-md  disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasTokenSheetChanged}
        >
          Salvar
        </button>
      </div>

      {activeModalName === "actionEdit" && activeModalProps?.actionId && (
        <ActionEditModal
          isOpen={true}
          actionId={activeModalProps.actionId}
          onClose={closeModal}
          zIndex={200} // Um zIndex alto para garantir que fique acima da ficha
        />
      )}
    </>
  );
}
