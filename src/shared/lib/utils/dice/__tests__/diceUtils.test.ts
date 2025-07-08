import { performDiceRoll } from "@/utils/dice/diceUtils";

describe("performDiceRoll", () => {
  // Mock Math.random para resultados previsíveis
  const mockMathRandom = (values: number[]) => {
    let i = 0;
    return () => values[i++ % values.length];
  };

  beforeEach(() => {
    // Reseta o mock antes de cada teste
    jest.spyOn(Math, "random").mockRestore();
  });

  // Cenários de Sucesso
  test('deve rolar um dado simples (ex: "1d6")', () => {
    jest.spyOn(Math, "random").mockImplementation(mockMathRandom([0.5])); // Simula um 4 em 1d6
    const result = performDiceRoll("1d6", "Teste", "Attack");
    expect(result).toEqual({
      rollName: "Teste",
      category: "Attack",
      parts: [{ dice: "d6", result: 4 }],
      finalResult: 4,
    });
  });

  test('deve rolar múltiplos dados (ex: "3d8")', () => {
    jest
      .spyOn(Math, "random")
      .mockImplementation(mockMathRandom([0.1, 0.5, 0.9])); // Simula 1, 4, 7 em 3d8
    const result = performDiceRoll("3d8", "Teste", "Attack");
    expect(result).toEqual({
      rollName: "Teste",
      category: "Attack",
      parts: [{ dice: "d8", result: 1 }, { dice: "d8", result: 5 }, { dice: "d8", result: 8 }],
      finalResult: 1 + 5 + 8,
    });
  });

  test('deve rolar com modificador positivo (ex: "2d10+5")', () => {
    jest.spyOn(Math, "random").mockImplementation(mockMathRandom([0.0, 0.9])); // Simula 1, 10 em 2d10
    const result = performDiceRoll("2d10+5", "Teste", "Attack");
    expect(result).toEqual({
      rollName: "Teste",
      category: "Attack",
      parts: [{ dice: "d10", result: 1 }, { dice: "d10", result: 10 }, 5],
      finalResult: 1 + 10 + 5,
    });
  });

  test('deve rolar com modificador negativo (ex: "4d4-2")', () => {
    jest
      .spyOn(Math, "random")
      .mockImplementation(mockMathRandom([0.2, 0.4, 0.6, 0.8])); // Simula 1, 2, 3, 4 em 4d4
    const result = performDiceRoll("4d4-2", "Teste", "Attack");
    expect(result).toEqual({
      rollName: "Teste",
      category: "Attack",
      parts: [{ dice: "d4", result: 1 }, { dice: "d4", result: 2 }, { dice: "d4", result: 3 }, { dice: "d4", result: 4 }, -2],
      finalResult: 1 + 2 + 3 + 4 - 2,
    });
  });

  test('deve lidar com notação de dados em maiúsculas (ex: "1D20")', () => {
    jest.spyOn(Math, "random").mockImplementation(mockMathRandom([0.5])); // Simula um 11 em 1d20
    const result = performDiceRoll("1D20", "Teste", "Attack");
    expect(result).toEqual({
      rollName: "Teste",
      category: "Attack",
      parts: [{ dice: "d20", result: 11 }],
      finalResult: 11,
    });
  });

  // Casos Extremos (Edge Cases) e Erros
  test('deve retornar erro para notação inválida (ex: "d6")', () => {
    expect(() => performDiceRoll("d6", "Teste", "Attack")).toThrow("Invalid dice formula: d6");
  });

  test('deve retornar erro para notação inválida (ex: "1d")', () => {
    expect(() => performDiceRoll("1d", "Teste", "Attack")).toThrow("Invalid dice formula: 1d");
  });

  test('deve retornar erro para notação inválida (ex: "abc")', () => {
    expect(() => performDiceRoll("abc", "Teste", "Attack")).toThrow("Invalid dice formula: abc");
  });

  test('deve retornar erro para notação inválida (ex: "1d6x")', () => {
    expect(() => performDiceRoll("1d6x", "Teste", "Attack")).toThrow("Invalid dice formula: 1d6x");
  });

  test('deve retornar erro para notação inválida (ex: "1d6+")', () => {
    expect(() => performDiceRoll("1d6+", "Teste", "Attack")).toThrow("Invalid dice formula: 1d6+");
  });

  test('deve retornar erro para número de dados zero (ex: "0d6")', () => {
    expect(() => performDiceRoll("0d6", "Teste", "Attack")).toThrow("Invalid dice part in formula: 0d6");
  });

  test('deve retornar erro para número de dados muito grande (ex: "101d6")', () => {
    expect(() => performDiceRoll("101d6", "Teste", "Attack")).toThrow("Invalid dice part in formula: 101d6");
  });

  test('deve retornar erro para número de lados zero (ex: "1d0")', () => {
    expect(() => performDiceRoll("1d0", "Teste", "Attack")).toThrow("Invalid dice part in formula: 1d0");
  });

  test('deve retornar erro para número de lados muito grande (ex: "1d101")', () => {
    expect(() => performDiceRoll("1d101", "Teste", "Attack")).toThrow("Invalid dice part in formula: 1d101");
  });
});
