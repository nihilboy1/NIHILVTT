import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { sendGameCreateCharacter } from '@/features/game/model/gameSessionApi';
import { PlayerCharacter } from '@/entities/character/model/schemas/character.schema';
import { Modal } from '@/shared/ui/Modal';
import { buildPlayerCharacterRuntimeFromSheetState } from '../../lib/buildPlayerCharacterRuntimeFromSheetState';
import { useCharacterBuilder } from '../../model/hooks/useCharacterBuilder';
import { CharacterBuilderEffectsProvider } from '../../model/context/effectsProcessorContext';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';



interface CharacterBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function CharacterBuilderModal({
  isOpen,
  onClose,
  zIndex = 100,
}: CharacterBuilderModalProps) {
  const { gameId } = useParams<{ gameId: string }>();
  const {
    currentStep,
    selections,
    handleSelect,
    handleStepChange,
    handleNext,
    handleFinish,
    handlePrevious,
    canGoNext,
    canGoPrevious,
    formMethods,
    effectsProcessor,
  } = useCharacterBuilder();

  const handleNextWithCompletion = async () => {
    const isLastStep = await handleNext();
    if (isLastStep && canGoNext) {
      const parsedGameId = Number(gameId);
      const isValidGameId = Number.isInteger(parsedGameId) && parsedGameId > 0;
      const persistCharacter = isValidGameId
        ? async (characterData: Omit<PlayerCharacter, 'id' | 'type'>) => {
            const runtimeCharacter = buildPlayerCharacterRuntimeFromSheetState(characterData);
            console.info('[CharacterBuilderModal] Enviando criação autoritativa de personagem.', {
              gameId: parsedGameId,
              runtimeCharacter,
            });
            try {
              const event = await sendGameCreateCharacter(parsedGameId, runtimeCharacter);
              console.info('[CharacterBuilderModal] Evento recebido para personagem criado.', {
                eventType: event.type,
                eventId: event.eventId,
                serverVersion: event.serverVersion,
              });
              applyGameSessionEvent(event);
              return true;
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error('[CharacterBuilderModal] Falha HTTP ao criar personagem.', {
                  status: error.response?.status,
                  data: error.response?.data,
                  message: error.message,
                });
              } else {
                console.error('[CharacterBuilderModal] Falha inesperada ao criar personagem.', error);
              }
              return false;
            }
          }
        : undefined;
      const finished = await handleFinish(persistCharacter);
      if (finished) {
        onClose();
      } else {
        console.warn('[CharacterBuilderModal] Finalização não concluída. Verifique logs acima.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      fullscreen={true}
      onClose={onClose}
      title="Construtor de Personagem"
      zIndex={zIndex}
      modalClassName="w-[100vw] h-[100vh] p-0"
      hideFooter={true}
    >
      <FormProvider {...formMethods}>
        <CharacterBuilderEffectsProvider effectsProcessor={effectsProcessor}>
          <div className="bg-surface-1 flex h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)] overflow-hidden">
            <Sidebar
              currentStep={currentStep}
              selections={selections}
              onStepChange={handleStepChange}
            />
            <MainContent
              currentStep={currentStep}
              selections={selections}
              onSelect={handleSelect}
              onNext={handleNextWithCompletion}
              onPrevious={handlePrevious}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
            />
          </div>
        </CharacterBuilderEffectsProvider>
      </FormProvider>
    </Modal>
  );
}
