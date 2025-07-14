import { SelectedTokenProvider } from "../../entities/token/model/contexts/SelectedTokenContext";
import { TokenProvider } from "../../entities/token/model/contexts/TokenContext";
import { ChatProvider } from "../../features/chat/model/contexts/ChatContext";
import { UIProvider } from "../../features/layoutControls/model/contexts/UIProvider";
import { ModalProvider } from "../../features/modalManager/model/contexts/ModalProvider";

export function GameProvider({ children }: { children: React.ReactNode }) {
  return (
      <TokenProvider>
        <ChatProvider>
            <UIProvider>
              <ModalProvider>
                <SelectedTokenProvider>{children}</SelectedTokenProvider>
              </ModalProvider>
            </UIProvider>
        </ChatProvider>
      </TokenProvider>
  );
}
