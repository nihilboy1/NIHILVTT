import { createContext, useContext, ReactNode, RefObject } from 'react';

interface GameBoardInteractionContextType {
  gameBoardRef: RefObject<HTMLDivElement>;
  handleHPChangeFromModal: (tokenId: string, newHP: number) => void; // Renomeado
  handleRemoveInstanceFromBoard: (tokenId: string) => void; // Renomeado
  handleMakeInstanceIndependent: (tokenId: string) => void; // Renomeado
}

const GameBoardInteractionContext = createContext<GameBoardInteractionContextType | undefined>(undefined);

export function useGameBoardInteractionContext() {
  const context = useContext(GameBoardInteractionContext);
  if (context === undefined) {
    throw new Error('useGameBoardInteractionContext must be used within a GameBoardInteractionProvider');
  }
  return context;
}

interface GameBoardInteractionProviderProps {
  children: ReactNode;
  gameBoardRef: RefObject<HTMLDivElement>;
  handleHPChangeFromModal: (tokenId: string, newHP: number) => void; // Renomeado
  handleRemoveInstanceFromBoard: (tokenId: string) => void; // Renomeado
  handleMakeInstanceIndependent: (tokenId: string) => void; // Renomeado
}

export function GameBoardInteractionProvider({
  children,
  gameBoardRef,
  handleHPChangeFromModal,
  handleRemoveInstanceFromBoard,
  handleMakeInstanceIndependent,
}: GameBoardInteractionProviderProps) {
  const value = {
    gameBoardRef,
    handleHPChangeFromModal,
    handleRemoveInstanceFromBoard,
    handleMakeInstanceIndependent,
  };

  return (
    <GameBoardInteractionContext.Provider value={value}>
      {children}
    </GameBoardInteractionContext.Provider>
  );
}
