import { useState } from "react";
import { useTokens } from "../../contexts/TokensContext";
import { TokenType, type PlayerToken, type Action } from "../../types"; // Added PlayerToken and Action
import { InteractiveModal } from "../ui/InteractiveModal";
import { useTokenSheetForm } from "../../hooks/useTokenSheetForm";
import { PrincipalTab } from "../sheets/player/principalTab/PrincipalTab";
import { PlayerSheetDetailsTab } from "../sheets/player/detailsTab/PlayerSheetDetailsTab";
import { PlayerSheetConfigTab } from "../sheets/player/configTab/PlayerSheetConfigTab";
import { CreatureSheet } from "../sheets/creature/CreatureSheet";
import { cn } from "../../utils/cn"; // Importar o utilitário cn
import { PlayerSheetProvider } from "../../contexts/PlayerSheetContext"; // Importar o PlayerSheetProvider
import { ActionEditModal } from "./ActionEditModal"; // Importar ActionEditModal
import { PlayerSheetContent } from "./PlayerSheetContent"; // Importar o novo componente

type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";
const ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT = 700;

interface TokenSheetModalProps {
  tokenId: string | null;
  isOpen: boolean; // Adicionado para controlar a visibilidade
  onClose: () => void;
  zIndex?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function SheetModal({
  tokenId,
  isOpen,
  onClose,
  zIndex,
  containerRef,
}: TokenSheetModalProps) {
  const { tokens, updateToken } = useTokens();
  const initialTokenData = tokenId
    ? tokens.find((t) => t.id === tokenId) || null
    : null;

  const {
    editingTokenImage, // Adicionado para a imagem
    setEditingTokenImage, // Adicionado para o setter da imagem
    editingTokenSize,
    setEditingTokenSize,
    editingTokenType,
    setEditingTokenType,
    editingTokenNotes,
    setEditingTokenNotes,
    editingInspiration,
    setEditingInspiration,
    hasTokenSheetChanged,
    handleSave,
  } = useTokenSheetForm({
    initialTokenData: initialTokenData,
    onSave: (updatedData) => {
      if (tokenId) {
        // A atualização do token agora será feita no PlayerSheetProvider
        // Apenas para tokens que não são PLAYER, ou para dados que não são gerenciados pelo PlayerSheetContext
        if (initialTokenData?.type !== TokenType.PLAYER) {
          updateToken(tokenId, updatedData);
          onClose();
        }
      }
    },
  });

  const [playerSheetActiveTab, setPlayerSheetActiveTab] =
    useState<PlayerSheetTab>("principal");

  // Estados para controlar as dimensões do modal
  const MIN_SHEET_WIDTH = 400;
  const MIN_SHEET_HEIGHT = 300;
  const MAX_SHEET_WIDTH = 900;
  const MAX_SHEET_HEIGHT = 800;

  // Posição inicial centralizada com um pequeno offset
  const initialPosition = {
    x: Math.max(0, (window.innerWidth - (initialTokenData?.type === TokenType.PLAYER ? 750 : 450)) / 2 + 30),
    y: Math.max(0, (window.innerHeight - (initialTokenData?.type === TokenType.PLAYER ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT : 620)) / 2 + 30),
  };

  // Largura e altura iniciais baseadas no tipo de token
  const initialModalWidth = initialTokenData?.type === TokenType.PLAYER ? 750 : 450;
  const initialModalHeight = initialTokenData?.type === TokenType.PLAYER ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT : 620;

  const tabButtonClass = (tabName: PlayerSheetTab) =>
    cn(
      "px-4 py-2 text-sm font-medium rounded-t-md  border-b-2",
      playerSheetActiveTab === tabName
        ? "border-accent-primary text-accent-primary bg-surface-1"
        : "border-transparent text-text-secondary hover:bg-surface-1 hover:border-accent-primary-hover"
    );

  if (!tokenId || editingTokenType === null || !isOpen) {
    // Adicionado null check para editingTokenType e isOpen
    return null;
  }

  const modalTitle =
    editingTokenType === TokenType.PLAYER
      ? `${initialTokenData?.name || ""}`
      : `Ficha de ${initialTokenData?.name || ""}`;

  const minimizedModalTitle = initialTokenData?.name || ""; // Apenas o nome do personagem

  return (
    <InteractiveModal
      id={`sheet-${tokenId}`}
      title={modalTitle}
      minimizedTitle={minimizedModalTitle}
      isOpen={isOpen} // Usar a prop isOpen diretamente
      onClose={onClose}
      initialPosition={initialPosition}
      initialWidth={initialModalWidth}
      initialHeight={initialModalHeight}
      minWidth={MIN_SHEET_WIDTH}
      minHeight={MIN_SHEET_HEIGHT}
      maxWidth={MAX_SHEET_WIDTH}
      maxHeight={MAX_SHEET_HEIGHT}
      zIndex={zIndex}
    >
      <form onSubmit={handleSave} className="space-y-0.5 bg-surface-0 ">
        {editingTokenType === TokenType.PLAYER && initialTokenData?.type === TokenType.PLAYER ? (
          <PlayerSheetProvider
            initialToken={initialTokenData as PlayerToken}
            setToken={(updatedPlayerToken) => {
              // Esta função setToken agora é usada apenas para sincronização interna do PlayerSheetProvider
              // A atualização real do token no TokensContext ocorrerá no PlayerSheetContent
              if (tokenId) {
                updateToken(tokenId, updatedPlayerToken); // Manter para compatibilidade se necessário, mas o principal é o handleSave
              }
            }}
          >
            <PlayerSheetContent
              tokenId={tokenId}
              initialTokenData={initialTokenData as PlayerToken}
              updateToken={updateToken}
              onClose={onClose}
              editingTokenImage={editingTokenImage}
              setEditingTokenImage={setEditingTokenImage}
              editingTokenSize={editingTokenSize}
              setEditingTokenSize={setEditingTokenSize}
              editingTokenNotes={editingTokenNotes}
              setEditingTokenNotes={setEditingTokenNotes}
              editingInspiration={editingInspiration}
              setEditingInspiration={setEditingInspiration}
              hasTokenSheetChanged={hasTokenSheetChanged}
              handleSave={handleSave} // Passar o handleSave do useTokenSheetForm
            />
          </PlayerSheetProvider>
        ) : (
          <CreatureSheet
            editingTokenName={initialTokenData?.name || ""}
            setEditingTokenName={(name) => {
              if (initialTokenData) {
                updateToken(initialTokenData.id, { ...initialTokenData, name });
              }
            }}
            editingTokenType={editingTokenType}
            setEditingTokenType={setEditingTokenType}
            editingCurrentHp={initialTokenData?.currentHp?.toString() || ""}
            setEditingCurrentHp={(hp) => {
              if (initialTokenData) {
                updateToken(initialTokenData.id, {
                  ...initialTokenData,
                  currentHp: parseInt(hp),
                });
              }
            }}
            editingMaxHp={initialTokenData?.maxHp?.toString() || ""}
            setEditingMaxHp={(hp) => {
              if (initialTokenData) {
                updateToken(initialTokenData.id, {
                  ...initialTokenData,
                  maxHp: parseInt(hp),
                });
              }
            }}
            editingTokenNotes={editingTokenNotes}
            setEditingTokenNotes={setEditingTokenNotes}
            editingTokenImage={editingTokenImage} // Passar a imagem
            setEditingTokenImage={setEditingTokenImage} // Passar o setter da imagem
            editingTokenSize={editingTokenSize}
            setEditingTokenSize={setEditingTokenSize}
          />
        )}
      </form>
    </InteractiveModal>
  );
}
