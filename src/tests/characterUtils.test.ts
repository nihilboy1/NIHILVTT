import {
  getContrastingTextColor,
  parseCharacterSize,
} from "../shared/lib/utils/characterUtils";

describe("getContrastingTextColor", () => {
  test('deve retornar "var(--color-raisin-black)" para cores claras', () => {
    expect(getContrastingTextColor("#FFFFFF")).toBe(
      "var(--color-raisin-black)"
    );
    expect(getContrastingTextColor("#F0F0F0")).toBe(
      "var(--color-raisin-black)"
    );
    expect(getContrastingTextColor("#FFFF00")).toBe(
      "var(--color-raisin-black)"
    ); // Amarelo
  });

  test('deve retornar "var(--color-platinum)" para cores escuras', () => {
    expect(getContrastingTextColor("#000000")).toBe("var(--color-platinum)");
    expect(getContrastingTextColor("#333333")).toBe("var(--color-platinum)");
    expect(getContrastingTextColor("#0000FF")).toBe("var(--color-platinum)"); // Azul
  });

  test('deve retornar "var(--color-foreground)" para entrada vazia ou inválida', () => {
    expect(getContrastingTextColor("")).toBe("var(--color-foreground)");
    // @ts-ignore: Testando caso de entrada nula/indefinida, embora a tipagem não permita
    expect(getContrastingTextColor(null)).toBe("var(--color-foreground)");
    // @ts-ignore: Testando caso de entrada nula/indefinida, embora a tipagem não permita
    expect(getContrastingTextColor(undefined)).toBe("var(--color-foreground)");
    expect(getContrastingTextColor("invalid-hex")).toBe(
      "var(--color-foreground)"
    );
    expect(getContrastingTextColor("#FFF")).toBe("var(--color-foreground)"); // Hex curto
  });
});

describe("parseCharacterSize", () => {
  test("deve retornar as dimensões corretas para uma string de tamanho válida", () => {
    expect(parseCharacterSize("1x1")).toEqual([1, 1]);
    expect(parseCharacterSize("2x3")).toEqual([2, 3]);
    expect(parseCharacterSize("10x5")).toEqual([10, 5]);
  });

  test("deve retornar [1, 1] para uma string de tamanho inválida", () => {
    expect(parseCharacterSize("")).toEqual([1, 1]);
    expect(parseCharacterSize("1")).toEqual([1, 1]);
    expect(parseCharacterSize("1x")).toEqual([1, 1]);
    expect(parseCharacterSize("x1")).toEqual([1, 1]);
    expect(parseCharacterSize("axb")).toEqual([1, 1]);
    expect(parseCharacterSize("1x1x1")).toEqual([1, 1]);
    expect(parseCharacterSize("0x1")).toEqual([1, 1]); // Dimensão zero
    expect(parseCharacterSize("1x0")).toEqual([1, 1]); // Dimensão zero
    expect(parseCharacterSize("-1x1")).toEqual([1, 1]); // Dimensão negativa
    expect(parseCharacterSize("1x-1")).toEqual([1, 1]); // Dimensão negativa
  });

  test("deve lidar com espaços em branco na string de entrada", () => {
    expect(parseCharacterSize(" 1x1 ")).toEqual([1, 1]);
    expect(parseCharacterSize("2 x 3")).toEqual([1, 1]); // Espaços entre o número e o 'x' tornam inválido
  });
});
