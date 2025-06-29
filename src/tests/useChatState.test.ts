import { renderHook, act } from "@testing-library/react";
import { useChatState } from "../hooks/useChatState";
import {
  TextMessage,
  DiceRollMessage,
  DiceRollDetails,
} from "../shared/types/index";
import { DEFAULT_PLAYER_NAME } from "../constants";

// Mock para generateUniqueId para garantir IDs consistentes nos testes
jest.mock("../utils/id/idUtils", () => ({
  generateUniqueId: jest.fn(() => "mock-id"),
}));

// Mock para rollDiceInternal para controlar o resultado das rolagens
jest.mock("../utils/dice/diceUtils", () => ({
  rollDiceInternal: jest.fn((notation: string) => {
    if (notation === "1d6") {
      return { notation: "1d6", rolls: [3], finalResult: 3 };
    }
    if (notation === "invalid") {
      return { error: "Comando inválido" };
    }
    return { notation: "1d1", rolls: [1], finalResult: 1 };
  }),
}));

describe("useChatState", () => {
  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve inicializar o estado com a mensagem de boas-vindas", () => {
    const { result } = renderHook(() => useChatState());

    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].sender).toBe("Sistema");
    expect(result.current.messages[0].text).toContain(
      "Saudações, nobre aventureiro!"
    );
  });

  it("deve enviar uma mensagem de texto", () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.sendMessage("Olá, mundo!");
    });

    // Espera que a mensagem de boas-vindas e a nova mensagem estejam presentes
    expect(result.current.messages.length).toBe(2);
    expect(result.current.messages[1].text).toBe("Olá, mundo!");
    expect(result.current.messages[1].sender).toBe(DEFAULT_PLAYER_NAME);
    expect((result.current.messages[1] as TextMessage).isDiceRoll).toBe(false);
  });

  it("deve enviar uma mensagem de rolagem de dados", () => {
    const { result } = renderHook(() => useChatState());

    const diceRollDetails: DiceRollDetails = {
      notation: "2d6+5",
      rolls: [1, 6],
      modifierOperator: "+",
      modifierValue: 5,
      finalResult: 12,
    };

    act(() => {
      result.current.sendMessage(diceRollDetails, "Mestre");
    });

    expect(result.current.messages.length).toBe(2);
    const sentMessage = result.current.messages[1] as DiceRollMessage;
    expect(sentMessage.text).toBe("Rolou 2d6+5: [1, 6] + 5 = 12");
    expect(sentMessage.sender).toBe("Mestre");
    expect(sentMessage.isDiceRoll).toBe(true);
    expect(sentMessage.diceRollDetails).toEqual(diceRollDetails);
  });

  it("deve rolar dados e enviar a mensagem de resultado", () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.rollAndSendMessage("1d6");
    });

    expect(result.current.messages.length).toBe(2);
    const sentMessage = result.current.messages[1] as DiceRollMessage;
    expect(sentMessage.text).toBe("Rolou 1d6: [3] = 3"); // Baseado no mock
    expect(sentMessage.sender).toBe(DEFAULT_PLAYER_NAME);
    expect(sentMessage.isDiceRoll).toBe(true);
    expect(sentMessage.diceRollDetails.notation).toBe("1d6");
  });

  it("deve enviar mensagem de erro para rolagem de dados inválida", () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.rollAndSendMessage("invalid");
    });

    expect(result.current.messages.length).toBe(2);
    const errorMessage = result.current.messages[1] as TextMessage;
    expect(errorMessage.text).toBe("Comando inválido"); // Baseado no mock
    expect(errorMessage.sender).toBe("Sistema");
    expect(errorMessage.isDiceRoll).toBe(false);
  });

  it("deve limpar as mensagens e adicionar a mensagem de boas-vindas novamente", () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.sendMessage("Mensagem 1");
      result.current.sendMessage("Mensagem 2");
    });
    expect(result.current.messages.length).toBe(3); // Boas-vindas + 2 mensagens

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages.length).toBe(1);
    expect(result.current.messages[0].sender).toBe("Sistema");
    expect(result.current.messages[0].text).toContain(
      "Saudações, nobre aventureiro!"
    );
  });
});
