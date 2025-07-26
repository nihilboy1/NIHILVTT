import { FinalItemDataSchema } from "../domain/item/items.schema.js";
import { PHB2024ITEMS } from "../domain/item/items.data.js";
console.log("Iniciando a validação dos dados...");

const result = FinalItemDataSchema.safeParse(PHB2024ITEMS);

if (result.success) {
  console.log("✅ Validação concluída com sucesso!");
} else {
  console.error("❌ Erro de validação encontrado!");

  const flatErrors = result.error.flatten().fieldErrors;
  const errorsById: Record<string, string[]> = {};

  for (const [path, messages] of Object.entries(flatErrors)) {
    const indexStr = path.match(/^\d+/)?.[0];
    if (indexStr) {
      const index = parseInt(indexStr, 10);
      const itemWithError = PHB2024ITEMS[index];
      const itemId = itemWithError?.id || `Índice ${index} (ID não encontrado)`;

      const cleanPath = path.substring(indexStr.length + 1);

      if (!errorsById[itemId]) {
        errorsById[itemId] = [];
      }

      // Mensagem de erro simplificada, sem o valor do campo
      const errorMessage = `- Campo '${cleanPath || "(item inteiro)"}': ${(
        messages || []
      ).join(", ")}`;
      errorsById[itemId].push(errorMessage);
    }
  }

  console.log("\n--- Resumo dos Erros por Item ---");
  for (const [id, errorMessages] of Object.entries(errorsById)) {
    console.error(`\n🚨 Item: ${id}`);
    errorMessages.forEach((msg) => console.error(`  ${msg}`));
  }
}
