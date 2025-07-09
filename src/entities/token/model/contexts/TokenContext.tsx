import React, { createContext, useContext, type ReactNode } from "react";
import { useTokenState, type TokenState } from "../hooks/useTokenState";

export const TokenContext = createContext<TokenState | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const tokenState = useTokenState();
    return (
        <TokenContext.Provider value={tokenState}>
            {children}
        </TokenContext.Provider>
    );
};

export const useTokens = (): TokenState => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useTokens must be used within a TokenProvider");
    }
    return context;
};
