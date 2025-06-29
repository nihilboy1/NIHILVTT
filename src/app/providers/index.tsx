import { BoardSettingsProvider } from "../../contexts/BoardSettingsContext";
import { ChatProvider } from "../../contexts/ChatContext";
import { SelectedTokenProvider } from "../../contexts/SelectedTokenContext";
import { CharactersProvider } from "../../contexts/CharactersContext";
import { UIProvider } from "./UIProvider";
import { ModalProvider } from "./ModalProvider";

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
