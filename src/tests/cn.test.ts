import { cn } from "../shared/lib/utils/cn";

describe("cn", () => {
  test("deve mesclar classes Tailwind CSS corretamente", () => {
    expect(cn("text-red-500", "bg-blue-200")).toBe("text-red-500 bg-blue-200");
  });

  test("deve lidar com classes condicionais corretamente", () => {
    expect(
      cn("text-red-500", false && "bg-blue-200", true && "font-bold")
    ).toBe("text-red-500 font-bold");
  });

  test("deve sobrescrever classes duplicadas corretamente", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  test("deve lidar com arrays de classes", () => {
    expect(cn(["text-lg", "font-semibold"], "text-gray-700")).toBe(
      "text-lg font-semibold text-gray-700"
    );
  });

  test("deve retornar uma string vazia se nenhuma entrada for fornecida", () => {
    expect(cn()).toBe("");
  });

  test("deve ignorar valores nulos e indefinidos", () => {
    expect(cn("text-green-500", null, undefined, "bg-white")).toBe(
      "text-green-500 bg-white"
    );
  });

  test("deve lidar com objetos de classe", () => {
    expect(cn({ "text-xl": true, "text-sm": false }, "font-medium")).toBe(
      "text-xl font-medium"
    );
  });

  test("deve combinar diferentes tipos de entrada", () => {
    expect(cn("p-2", { "m-4": true }, ["border", "border-gray-300"])).toBe(
      "p-2 m-4 border border-gray-300"
    );
  });

  test("deve resolver conflitos de classes do Tailwind Merge", () => {
    expect(cn("px-2 py-1", "p-3")).toBe("p-3");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("bg-red-500", "bg-opacity-50")).toBe("bg-opacity-50");
  });
});
