
import React, { createContext, useContext, type ReactNode } from 'react';
import { useChatState, type ChatState } from '../hooks/useChatState'; // Import the custom hook

const ChatContext = createContext<ChatState | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const chatState = useChatState(); // Use the custom hook

  return <ChatContext.Provider value={chatState}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatState => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
