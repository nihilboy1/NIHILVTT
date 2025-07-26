import { calculateNewHP } from "@/entities/token/model/utils/hpUtils";

describe("calculateNewHP", () => {
  const currentHP = 50;
  const maxHP = 100;

  // Testes para entradas válidas
  test("deve calcular o HP corretamente para um valor numérico direto", () => {
    expect(calculateNewHP("60", currentHP, maxHP)).toBe(60);
  });

  test("deve calcular o HP corretamente para um valor numérico direto com espaços", () => {
    expect(calculateNewHP(" 75 ", currentHP, maxHP)).toBe(75);
  });

  test("deve calcular o HP corretamente para um ajuste positivo", () => {
    expect(calculateNewHP("+10", currentHP, maxHP)).toBe(60);
  });

  test("deve calcular o HP corretamente para um ajuste negativo", () => {
    expect(calculateNewHP("-5", currentHP, maxHP)).toBe(45);
  });

  test("deve calcular o HP corretamente para um ajuste positivo com espaços", () => {
    expect(calculateNewHP(" +15 ", currentHP, maxHP)).toBe(65);
  });

  test("deve calcular o HP corretamente para um ajuste negativo com espaços", () => {
    expect(calculateNewHP(" -20 ", currentHP, maxHP)).toBe(30);
  });

  // Testes para limites (min/max HP)
  test("deve limitar o HP ao máximo se o valor for muito alto", () => {
    expect(calculateNewHP("150", currentHP, maxHP)).toBe(maxHP);
  });

  test("deve limitar o HP a 0 se o valor for muito baixo", () => {
    expect(calculateNewHP("-70", currentHP, maxHP)).toBe(0);
  });

  test("deve limitar o HP ao máximo com ajuste positivo", () => {
    expect(calculateNewHP("+60", currentHP, maxHP)).toBe(maxHP); // 50 + 60 = 110 -> 100
  });

  test("deve limitar o HP a 0 com ajuste negativo", () => {
    expect(calculateNewHP("-60", currentHP, maxHP)).toBe(0); // 50 - 60 = -10 -> 0
  });

  // Testes para entradas inválidas
  test("deve retornar null para entrada não numérica", () => {
    expect(calculateNewHP("abc", currentHP, maxHP)).toBeNull();
  });

  test("deve retornar null para entrada vazia", () => {
    expect(calculateNewHP("", currentHP, maxHP)).toBeNull();
  });

  test("deve retornar null para ajuste com valor não numérico", () => {
    expect(calculateNewHP("+abc", currentHP, maxHP)).toBeNull();
  });

  test("deve retornar null para ajuste com apenas o sinal", () => {
    expect(calculateNewHP("+", currentHP, maxHP)).toBeNull();
    expect(calculateNewHP("-", currentHP, maxHP)).toBeNull();
  });

  test("deve retornar null para ajuste com valor negativo após o sinal", () => {
    expect(calculateNewHP("+-5", currentHP, maxHP)).toBeNull();
  });

  test("deve retornar null para ajuste com valor decimal", () => {
    expect(calculateNewHP("+5.5", currentHP, maxHP)).toBeNull();
    expect(calculateNewHP("5.5", currentHP, maxHP)).toBeNull();
  });

  // Testes com currentHP e maxHP diferentes
  test("deve funcionar corretamente com currentHP e maxHP diferentes", () => {
    expect(calculateNewHP("+10", 10, 20)).toBe(20);
    expect(calculateNewHP("-5", 10, 20)).toBe(5);
    expect(calculateNewHP("15", 10, 20)).toBe(15);
  });
});
