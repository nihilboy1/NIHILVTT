import { act, renderHook } from "@testing-library/react";
import { useChatState } from "@/widgets/chatPanel/model/hooks/useChatState";
import {
  DiceRollDetails,
  DiceRollMessage,
  TextMessage,
  RollCategory,
} from "@/shared/api/types";
import { DEFAULT_PLAYER_NAME } from "@/shared/config/constants";

// Mock para generateUniqueId para garantir IDs consistentes nos testes
jest.mock("../../../../shared/lib/utils/id/idUtils", () => ({
  generateUniqueId: jest.fn(() => "mock-id"),
}));

// Mock para performDiceRoll para controlar o resultado das rolagens
jest.mock("@/utils/dice/diceUtils", () => ({
  performDiceRoll: jest.fn((formula: string, rollName: string, category: RollCategory) => {
    if (formula === "1d6") {
      return { rollName, category, parts: [{ dice: "d6", result: 3 }], finalResult: 3 };
    }
    if (formula === "invalid") {
      throw new Error("Comando inválido");
    }
    return { rollName, category, parts: [{ dice: "d1", result: 1 }], finalResult: 1 };
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
      rollName: "2d6+5",
      category: "Generic",
      parts: [{ dice: "d6", result: 1 }, { dice: "d6", result: 6 }, 5],
      finalResult: 12,
    };

    act(() => {
      result.current.sendMessage(diceRollDetails, "Mestre");
    });

    expect(result.current.messages.length).toBe(2);
    const sentMessage = result.current.messages[1] as DiceRollMessage;
    expect(sentMessage.text).toBe(""); // Agora o texto é vazio, o componente de exibição renderiza os detalhes
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
    expect(sentMessage.text).toBe(""); // Agora o texto é vazio
    expect(sentMessage.sender).toBe(DEFAULT_PLAYER_NAME);
    expect(sentMessage.isDiceRoll).toBe(true);
    expect(sentMessage.diceRollDetails.rollName).toBe("1d6");
    expect(sentMessage.diceRollDetails.finalResult).toBe(3);
  });

  it("deve enviar mensagem de erro para rolagem de dados inválida", () => {
    const { result } = renderHook(() => useChatState());

    act(() => {
      result.current.rollAndSendMessage("invalid");
    });

    expect(result.current.messages.length).toBe(2);
    const errorMessage = result.current.messages[1] as TextMessage;
    expect(errorMessage.text).toBe("Erro ao rolar dados: Comando inválido"); // Baseado no mock
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
