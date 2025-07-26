import { validate as uuidValidate } from "uuid";

import { generateUniqueId } from "../idUtils";

describe("idUtils", () => {
  test("deve gerar um ID único", () => {
    const id = generateUniqueId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });

  test("deve gerar um ID no formato UUID v4 válido", () => {
    const id = generateUniqueId();
    expect(uuidValidate(id)).toBe(true);
  });

  test("deve gerar IDs diferentes em chamadas consecutivas", () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });
});
