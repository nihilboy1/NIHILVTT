import { SelectedTokenProvider } from "../../entities/token/model/contexts/SelectedTokenContext";
import { TokenProvider } from "../../entities/token/model/contexts/TokenContext";
export function GameProvider({ children }: { children: React.ReactNode }) {
  return (
    <TokenProvider>
      <SelectedTokenProvider>{children}</SelectedTokenProvider>
    </TokenProvider>
  );
}
