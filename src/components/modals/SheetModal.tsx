import { useState, useEffect, useCallback } from "react";
import { useTokens } from "../../contexts/TokensContext";
import { TokenType, type Point, type PlayerToken } from "../../types"; // Added PlayerToken
import {InteractiveModal} from "../ui/InteractiveModal";
import { useTokenSheetForm } from "../../hooks/useTokenSheetForm";
import { PrincipalTab } from "../sheets/player/principalTab/PrincipalTab";
import {PlayerSheetDetailsTab} from "../sheets/player/detailsTab/PlayerSheetDetailsTab";
import {PlayerSheetConfigTab} from "../sheets/player/configTab/PlayerSheetConfigTab";
import { CreatureSheet } from "../sheets/creature/CreatureSheet";
import { cn } from "../../utils/cn"; // Importar o utilitário cn
import { PlayerSheetProvider } from "../../contexts/PlayerSheetContext"; // Importar o PlayerSheetProvider

type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";
const ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT = 700;

interface TokenSheetModalProps {
  tokenId: string | null;
  onClose: () => void;
  zIndex?: number; // Adicionado zIndex
}

export function SheetModal({ tokenId, onClose, zIndex }: TokenSheetModalProps) {
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
        updateToken(tokenId, updatedData);
        onClose();
      }
    },
  });

  const [playerSheetActiveTab, setPlayerSheetActiveTab] =
    useState<PlayerSheetTab>("principal");

  const [modalPosition, setModalPosition] = useState<Point>({ x: 100, y: 100 });
  const [isModalMinimized, setIsModalMinimized] = useState(false);

  // Estados para controlar as dimensões do modal
  const [modalWidth, setModalWidth] = useState(450);
  const [modalHeight, setModalHeight] = useState(620);

  const MIN_SHEET_WIDTH = 400;
  const MIN_SHEET_HEIGHT = 300;
  const MAX_SHEET_WIDTH = 900;
  const MAX_SHEET_HEIGHT = 800;

  // Efeito para inicializar a posição e tamanho do modal
  useEffect(() => {
    if (initialTokenData) {
      const initialModalWidth =
        initialTokenData.type === TokenType.PLAYER ? 750 : 450;
      const initialModalHeight =
        initialTokenData.type === TokenType.PLAYER
          ? ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT
          : 620;

      setModalWidth(initialModalWidth);
      setModalHeight(initialModalHeight);

      setModalPosition({
        x: Math.max(0, (window.innerWidth - initialModalWidth) / 2 + 30),
        y: Math.max(0, (window.innerHeight - initialModalHeight) / 2 + 30),
      });
      setIsModalMinimized(false); // Ensure it's not minimized on open/data change
    } else if (tokenId) {
      // Only close if tokenId was given, but no data was found
      onClose();
    }
    // If tokenId is null, initialTokenData will also be null.
    // In this case, the component returns null earlier due to:
    // if (!tokenId || editingTokenType === null) return null;
    // So, this effect won't incorrectly call onClose().
  }, [initialTokenData, tokenId, onClose]); // Added tokenId

  const handleResize = useCallback((newWidth: number, newHeight: number) => {
    setModalWidth(newWidth);
    setModalHeight(newHeight);
  }, []);

  const tabButtonClass = (tabName: PlayerSheetTab) =>
    cn(
      "px-4 py-2 text-sm font-medium rounded-t-md  border-b-2",
      playerSheetActiveTab === tabName
        ? "border-accent-primary text-accent-primary bg-surface-1"
        : "border-transparent text-text-secondary hover:bg-surface-1 hover:border-accent-primary-hover"
    );

  if (!tokenId || editingTokenType === null) {
    // Adicionado null check para editingTokenType
    return null;
  }

  const modalTitle =
    editingTokenType === TokenType.PLAYER
      ? `Ficha de Personagem - ${initialTokenData?.name || ""}`
      : `Ficha de ${initialTokenData?.name || ""}`;

  return (
    <InteractiveModal
      id={`sheet-${tokenId}`}
      title={modalTitle}
      isOpen={!!tokenId}
      isMinimized={isModalMinimized}
      position={modalPosition}
      onClose={onClose}
      onMinimize={() => setIsModalMinimized(true)}
      onRestore={() => setIsModalMinimized(false)}
      onPositionChange={setModalPosition}
      onResize={handleResize}
      initialWidth={modalWidth}
      initialHeight={modalHeight}
      minWidth={MIN_SHEET_WIDTH}
      minHeight={MIN_SHEET_HEIGHT}
      maxWidth={MAX_SHEET_WIDTH}
      maxHeight={MAX_SHEET_HEIGHT}
      zIndex={zIndex} // Passar zIndex para o InteractiveModal
    >
      <form onSubmit={handleSave} className="space-y-0.5 bg-surface-0 ">
        {editingTokenType === TokenType.PLAYER && (
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
        )}

        {editingTokenType === TokenType.PLAYER && initialTokenData?.type === TokenType.PLAYER ? (
          <PlayerSheetProvider
            initialToken={initialTokenData as PlayerToken}
            setToken={(updatedPlayerToken) => {
              if (tokenId) {
                updateToken(tokenId, updatedPlayerToken);
              }
            }}
          >
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
                editingTokenImage={editingTokenImage} // Passar a imagem
                setEditingTokenImage={setEditingTokenImage} // Passar o setter da imagem
                editingTokenSize={editingTokenSize}
                setEditingTokenSize={setEditingTokenSize}
              />
            )}
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
            className="px-4 py-2  text-text-primary font-semibold rounded-md  disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!hasTokenSheetChanged}
          >
            Salvar
          </button>
        </div>
      </form>
    </InteractiveModal>
  );
}
