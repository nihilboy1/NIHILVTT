import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useChatState } from "../../hooks/useChatState";
import { ChatProvider, useChat } from "../ChatContext";
import { Message } from "@/shared/api/types";

// Mock the useChatState hook
jest.mock("../hooks/useChatState", () => ({
  useChatState: jest.fn(),
}));

const mockChatState = {
  messages: [
    {
      id: "1",
      sender: "User",
      text: "Hello",
      timestamp: new Date(),
      isDiceRoll: false,
    },
  ] as Message[],
  sendMessage: jest.fn(),
  rollAndSendMessage: jest.fn(),
  clearMessages: jest.fn(),
};

describe("ChatContext", () => {
  beforeEach(() => {
    // Reset mock before each test
    (useChatState as jest.Mock).mockReturnValue(mockChatState);
  });

  test("useChat deve lançar um erro se não for usado dentro de um ChatProvider", () => {
    const TestComponent = () => {
      useChat();
      return null;
    };

    // Suprimir o erro do console para este teste específico
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useChat must be used within a ChatProvider"
    );

    consoleErrorSpy.mockRestore(); // Restaurar o console.error
  });

  test("ChatProvider deve fornecer o estado do useChatState", () => {
    const TestComponent = () => {
      const context = useChat();
      return (
        <div>
          <span data-testid="message-count">{context.messages.length}</span>
          <span data-testid="first-message-text">
            {context.messages[0].text}
          </span>
        </div>
      );
    };

    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    expect(screen.getByTestId("message-count")).toHaveTextContent("1");
    expect(screen.getByTestId("first-message-text")).toHaveTextContent("Hello");
  });

  test("as funções do contexto devem ser chamáveis", () => {
    const TestComponent = () => {
      const { sendMessage, rollAndSendMessage, clearMessages } = useChat();
      return (
        <div>
          <button onClick={() => sendMessage("New Message", "TestSender")}>
            Send
          </button>
          <button onClick={() => rollAndSendMessage("1d6")}>Roll</button>
          <button onClick={() => clearMessages()}>Clear</button>
        </div>
      );
    };

    render(
      <ChatProvider>
        <TestComponent />
      </ChatProvider>
    );

    fireEvent.click(screen.getByText("Send"));
    expect(mockChatState.sendMessage).toHaveBeenCalledWith(
      "New Message",
      "TestSender"
    );

    fireEvent.click(screen.getByText("Roll"));
    expect(mockChatState.rollAndSendMessage).toHaveBeenCalledWith("1d6");

    fireEvent.click(screen.getByText("Clear"));
    expect(mockChatState.clearMessages).toHaveBeenCalledTimes(1);
  });
});
