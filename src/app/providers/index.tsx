import { CharactersProvider } from "../../entities/character/model/contexts/CharactersContext";
import { SelectedTokenProvider } from "../../entities/token/model/contexts/SelectedTokenContext";
import { BoardSettingsProvider } from "../../features/boardSettings/contexts/BoardSettingsContext";
import { ChatProvider } from "../../widgets/chatPanel/model/contexts/ChatContext";
import { UIProvider } from "../../widgets/layoutControls/model/contexts/UIProvider";
import { ModalProvider } from "../../widgets/modalManager/model/contexts/ModalProvider";

export function GameProvider({ children }: { children: React.ReactNode }) {
  return (
    <CharactersProvider>
      <ChatProvider>
        <BoardSettingsProvider>
          <UIProvider>
            <ModalProvider>
              <SelectedTokenProvider>{children}</SelectedTokenProvider>
            </ModalProvider>
          </UIProvider>
        </BoardSettingsProvider>
      </ChatProvider>
    </CharactersProvider>
  );
}
