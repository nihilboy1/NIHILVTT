import { CharactersProvider } from "../../entities/character/model/contexts/CharactersContext";
import { SelectedTokenProvider } from "../../entities/token/model/contexts/SelectedTokenContext";
import { TokenProvider } from "../../entities/token/model/contexts/TokenContext";
import { BoardSettingsProvider } from "../../features/boardSettings/contexts/BoardSettingsContext";
import { ChatProvider } from "../../features/chat/model/contexts/ChatContext";
import { UIProvider } from "../../features/layoutControls/model/contexts/UIProvider";
import { ModalProvider } from "../../features/modalManager/model/contexts/ModalProvider";

export function GameProvider({ children }: { children: React.ReactNode }) {
  return (
    <CharactersProvider>
      <TokenProvider>
        <ChatProvider>
          <BoardSettingsProvider>
            <UIProvider>
              <ModalProvider>
                <SelectedTokenProvider>{children}</SelectedTokenProvider>
              </ModalProvider>
            </UIProvider>
          </BoardSettingsProvider>
        </ChatProvider>
      </TokenProvider>
    </CharactersProvider>
  );
}
