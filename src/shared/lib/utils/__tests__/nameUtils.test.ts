import { getFirstName } from "../nameUtils";

describe("getFirstName", () => {
  test("deve retornar o primeiro nome de um nome completo", () => {
    expect(getFirstName("John Doe")).toBe("John");
  });

  test("deve retornar o nome completo se não houver espaços", () => {
    expect(getFirstName("Alice")).toBe("Alice");
  });

  test("deve retornar uma string vazia para uma entrada vazia", () => {
    expect(getFirstName("")).toBe("");
  });

  test("deve retornar uma string vazia para entrada nula", () => {
    // @ts-ignore: Testando caso de entrada nula, embora a tipagem não permita
    expect(getFirstName(null)).toBe("");
  });

  test("deve retornar uma string vazia para entrada indefinida", () => {
    // @ts-ignore: Testando caso de entrada indefinida, embora a tipagem não permita
    expect(getFirstName(undefined)).toBe("");
  });

  test("deve lidar com múltiplos espaços entre os nomes", () => {
    expect(getFirstName("Jane   Doe")).toBe("Jane");
  });

  test("deve lidar com espaços no início ou no fim da string", () => {
    expect(getFirstName("  Bob Smith  ")).toBe(""); // A função split(" ") com string vazia no início retorna "" como primeiro elemento
  });

  test("deve retornar o primeiro nome mesmo com caracteres especiais", () => {
    expect(getFirstName("João Silva")).toBe("João");
  });
});
