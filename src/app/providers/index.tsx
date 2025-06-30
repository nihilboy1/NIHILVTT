import { ChatProvider } from "../../widgets/chatPanel/model/contexts/ChatContext";
import { CharactersProvider } from "../../entities/character/model/contexts/CharactersContext";
import { SelectedTokenProvider } from "../../entities/token/model/contexts/SelectedTokenContext";
import { BoardSettingsProvider } from "../../features/boardSettings/contexts/BoardSettingsContext";
import { ModalProvider } from "./ModalProvider";
import { UIProvider } from "./UIProvider";

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
