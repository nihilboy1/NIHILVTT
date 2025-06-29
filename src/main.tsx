import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"
import { TokensProvider } from "./contexts/TokensContext";
import { ChatProvider } from "./contexts/ChatContext";
import { BoardSettingsProvider } from "./contexts/BoardSettingsContext";
import { UIProvider } from "./contexts/UIContext";
import { ModalProvider } from "./contexts/ModalContext"; // Importar ModalProvider
import { SelectedTokenProvider } from "./contexts/SelectedTokenContext"; // Importar SelectedTokenProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokensProvider>
      <ChatProvider>
        <BoardSettingsProvider>
          <UIProvider>
            <ModalProvider>
              <SelectedTokenProvider> {/* Envolver App com SelectedTokenProvider */}
                <App />
              </SelectedTokenProvider>
            </ModalProvider>
          </UIProvider>
        </BoardSettingsProvider>
      </ChatProvider>
    </TokensProvider>
  </StrictMode>
);
