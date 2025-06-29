import { useTokens } from "../../contexts/TokensContext";
import { TokenType, type PlayerToken } from "../../shared/types";
import { InteractiveModal } from "../ui/InteractiveModal";
import { useTokenSheetForm } from "../../hooks/useTokenSheetForm";
import { CreatureSheet } from "../sheets/creature/CreatureSheet";
import { PlayerSheetProvider } from "../../contexts/PlayerSheetContext";
import { PlayerSheetContent } from "./PlayerSheetContent";

const ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT = 700;

interface TokenSheetModalProps {
  tokenId: string | null;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function SheetModal({
  tokenId,
  isOpen,
  onClose,
  zIndex,
}: TokenSheetModalProps) {
  const { tokens, updateToken } = useTokens();
  const initialTokenData = tokenId
    ? tokens.find((t) => t.id === tokenId) || null
    : null;

  const {
    editingTokenImage,
    setEditingTokenImage,
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
        if (initialTokenData?.type !== TokenType.PLAYER) {
          updateToken(tokenId, updatedData);
          onClose();
        }
      }
    },
  });

  // Estados para controlar as dimensões do modal
  const MIN_SHEET_WIDTH = 400;
  const MIN_SHEET_HEIGHT = 300;
  const MAX_SHEET_WIDTH = 900;
  const MAX_SHEET_HEIGHT = 800;

  // Posição inicial centralizada com um pequeno offset
  const initialPosition = {
    x: Math.max(
      0,
      (window.innerWidth -
        (initialTokenData?.type === TokenType.PLAYER ? 750 : 450)) /
        2 +
        30
    ),
    y: Math.max(
      0,
      (window.innerHeight -
        (initialTokenData?.type === TokenType.PLAYER
          ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT
          : 620)) /
        2 +
        30
    ),
  };

  // Largura e altura iniciais baseadas no tipo de token
  const initialModalWidth =
    initialTokenData?.type === TokenType.PLAYER ? 750 : 450;
  const initialModalHeight =
    initialTokenData?.type === TokenType.PLAYER
      ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT
      : 620;

  if (!tokenId || editingTokenType === null || !isOpen) {
    return null;
  }

  const modalTitle =
    editingTokenType === TokenType.PLAYER
      ? `${initialTokenData?.name || ""}`
      : `Ficha de ${initialTokenData?.name || ""}`;

  const minimizedModalTitle = initialTokenData?.name || "";

  return (
    <InteractiveModal
      id={`sheet-${tokenId}`}
      title={modalTitle}
      minimizedTitle={minimizedModalTitle}
      isOpen={isOpen}
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
        {editingTokenType === TokenType.PLAYER &&
        initialTokenData?.type === TokenType.PLAYER ? (
          <PlayerSheetProvider
            initialToken={initialTokenData as PlayerToken}
            setToken={(updatedPlayerToken) => {
              if (tokenId) {
                updateToken(tokenId, updatedPlayerToken);
              }
            }}
          >
            <PlayerSheetContent
              tokenId={tokenId}
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
            editingTokenImage={editingTokenImage}
            setEditingTokenImage={setEditingTokenImage}
            editingTokenSize={editingTokenSize}
            setEditingTokenSize={setEditingTokenSize}
          />
        )}
      </form>
    </InteractiveModal>
  );
}
