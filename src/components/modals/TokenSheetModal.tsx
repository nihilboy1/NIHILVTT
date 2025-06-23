import React, { useState, useEffect, useCallback } from "react";
import { useTokens } from "../../contexts/TokensContext";
import { TokenType, type Point, type PlayerToken } from "../../types"; // Added PlayerToken
import { InteractiveModal } from "../InteractiveModal";
import { useTokenSheetForm } from "../../hooks/useTokenSheetForm";
import {
  buttonPositiveClass,
  buttonSecondaryClass,
} from "../../styles/formClasses";
import PlayerSheetPrincipalTab from "../tokenSheet/PlayerSheetPrincipalTab";
import PlayerSheetDetailsTab from "../tokenSheet/PlayerSheetDetailsTab";
import PlayerSheetConfigTab from "../tokenSheet/PlayerSheetConfigTab";
import {GenericTokenSheet} from "../tokenSheet/GenericTokenSheet";

type PlayerSheetTab = "principal" | "detalhes" | "configuracoes";
const ESTIMATED_PLAYER_SHEET_AUTO_HEIGHT = 700;

interface TokenSheetModalProps {
  tokenId: string | null;
  onClose: () => void;
}

export function TokenSheetModal({ tokenId, onClose }: TokenSheetModalProps) {
  const { tokens, updateToken } = useTokens();
  const initialTokenData = tokenId
    ? tokens.find((t) => t.id === tokenId) || null
    : null;

  const {
    editingTokenName,
    setEditingTokenName,
    editingTokenColor,
    setEditingTokenColor,
    editingTokenSize,
    setEditingTokenSize,
    editingTokenType,
    setEditingTokenType,
    editingCurrentHp,
    setEditingCurrentHp,
    editingMaxHp,
    setEditingMaxHp,
    editingTokenNotes,
    setEditingTokenNotes,
    editingSpecies,
    setEditingSpecies,
    editingCharClass,
    setEditingCharClass,
    editingSubclass,
    setEditingSubclass,
    editingLevel,
    setEditingLevel,
    editingBackground,
    setEditingBackground,
    editingInspiration,
    setEditingInspiration,
    editingArmorClass,
    setEditingArmorClass,
    editingShieldEquipped,
    setEditingShieldEquipped,
    editingTempHp,
    setEditingTempHp,
    editingHitDiceUsed,
    setEditingHitDiceUsed,
    editingHitDiceMax,
    setEditingHitDiceMax,
    editingDeathSavesSuccesses,
    setEditingDeathSavesSuccesses,
    editingDeathSavesFailures,
    setEditingDeathSavesFailures,
    editingExp,
    setEditingExp,
    editingInitiative,
    setEditingInitiative,
    editingSpeed,
    setEditingSpeed,
    attributes,
    setAttributes,
    savingThrowProficiencies,
    setSavingThrowProficiencies,
    skillProficiencies,
    setSkillProficiencies,
    attacks,
    featuresAndTraits,
    setFeaturesAndTraits,
    hasTokenSheetChanged,
    handleSave,
    handleAddAttack,
    handleRemoveAttack,
    handleAttackChange,
    SKILLS_CONFIG,
  } = useTokenSheetForm({
    initialTokenData: initialTokenData as PlayerToken | null, // Unsafe cast to satisfy hook signature
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
    `px-4 py-2 text-sm font-medium rounded-t-md transition-colors border-b-2
     ${
       playerSheetActiveTab === tabName
         ? "border-accent-primary text-accent-primary bg-input-bg"
         : "border-transparent text-text-secondary hover:bg-input-bg hover:border-border-inactive"
     }`;

  if (!tokenId || editingTokenType === null) {
    // Adicionado null check para editingTokenType
    return null;
  }

  const modalTitle =
    editingTokenType === TokenType.PLAYER
      ? `Ficha de Personagem - ${editingTokenName}`
      : `Ficha de ${editingTokenName}`;

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
      zIndex={51}
    >
      <form onSubmit={handleSave} className="space-y-0.5">
        {editingTokenType === TokenType.PLAYER && (
          <div className="flex border-b border-border-inactive mb-2.5">
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

        {editingTokenType === TokenType.PLAYER ? (
          playerSheetActiveTab === "principal" ? (
            <PlayerSheetPrincipalTab
              editingTokenName={editingTokenName}
              setEditingTokenName={setEditingTokenName}
              editingCharClass={editingCharClass}
              setEditingCharClass={setEditingCharClass}
              editingLevel={editingLevel}
              setEditingLevel={setEditingLevel}
              editingBackground={editingBackground}
              setEditingBackground={setEditingBackground}
              editingSpecies={editingSpecies}
              setEditingSpecies={setEditingSpecies}
              editingSubclass={editingSubclass}
              setEditingSubclass={setEditingSubclass}
              editingExp={editingExp}
              setEditingExp={setEditingExp}
              editingArmorClass={editingArmorClass}
              setEditingArmorClass={setEditingArmorClass}
              editingInitiative={editingInitiative}
              setEditingInitiative={setEditingInitiative}
              editingSpeed={editingSpeed}
              setEditingSpeed={setEditingSpeed}
              editingShieldEquipped={editingShieldEquipped}
              setEditingShieldEquipped={setEditingShieldEquipped}
              editingCurrentHp={editingCurrentHp}
              setEditingCurrentHp={setEditingCurrentHp}
              editingTempHp={editingTempHp}
              setEditingTempHp={setEditingTempHp}
              editingMaxHp={editingMaxHp}
              setEditingMaxHp={setEditingMaxHp}
              editingHitDiceUsed={editingHitDiceUsed}
              setEditingHitDiceUsed={setEditingHitDiceUsed}
              editingHitDiceMax={editingHitDiceMax}
              setEditingHitDiceMax={setEditingHitDiceMax}
              editingDeathSavesSuccesses={editingDeathSavesSuccesses}
              setEditingDeathSavesSuccesses={setEditingDeathSavesSuccesses}
              editingDeathSavesFailures={editingDeathSavesFailures}
              setEditingDeathSavesFailures={setEditingDeathSavesFailures}
              attributes={attributes}
              setAttributes={setAttributes}
              savingThrowProficiencies={savingThrowProficiencies}
              setSavingThrowProficiencies={setSavingThrowProficiencies}
              skillProficiencies={skillProficiencies}
              setSkillProficiencies={setSkillProficiencies}
              attacks={attacks}
              handleAddAttack={handleAddAttack}
              handleRemoveAttack={handleRemoveAttack}
              handleAttackChange={handleAttackChange}
              featuresAndTraits={featuresAndTraits}
              setFeaturesAndTraits={setFeaturesAndTraits}
              SKILLS_CONFIG={SKILLS_CONFIG}
              proficiencyBonus={
                initialTokenData && initialTokenData.type === TokenType.PLAYER
                  ? (initialTokenData as PlayerToken).proficiencyBonus ?? 0
                  : 0
              }
            />
          ) : playerSheetActiveTab === "detalhes" ? (
            <PlayerSheetDetailsTab
              editingTokenNotes={editingTokenNotes}
              setEditingTokenNotes={setEditingTokenNotes}
              editingInspiration={editingInspiration}
              setEditingInspiration={setEditingInspiration}
            />
          ) : (
            <PlayerSheetConfigTab
              editingTokenColor={editingTokenColor}
              setEditingTokenColor={setEditingTokenColor}
              editingTokenSize={editingTokenSize}
              setEditingTokenSize={setEditingTokenSize}
            />
          )
        ) : (
          <GenericTokenSheet
            editingTokenName={editingTokenName}
            setEditingTokenName={setEditingTokenName}
            editingTokenType={editingTokenType}
            setEditingTokenType={setEditingTokenType}
            editingCurrentHp={editingCurrentHp}
            setEditingCurrentHp={setEditingCurrentHp}
            editingMaxHp={editingMaxHp}
            setEditingMaxHp={setEditingMaxHp}
            editingTokenNotes={editingTokenNotes}
            setEditingTokenNotes={setEditingTokenNotes}
            editingTokenColor={editingTokenColor}
            setEditingTokenColor={setEditingTokenColor}
            editingTokenSize={editingTokenSize}
            setEditingTokenSize={setEditingTokenSize}
          />
        )}

        <div className="pt-2 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className={buttonSecondaryClass}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={buttonPositiveClass}
            disabled={!hasTokenSheetChanged}
          >
            Salvar
          </button>
        </div>
      </form>
    </InteractiveModal>
  );
}
