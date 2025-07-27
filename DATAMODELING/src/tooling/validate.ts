process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

import { spellsLevel0 } from "../data/generated/spells-level-0.js";
import { FinalSpellDataSchema } from "../domain/schemas.js";

console.log("🔍 Iniciando a validação dos dados...");

try {
  const result = FinalSpellDataSchema.safeParse(spellsLevel0);

  if (result.success) {
    console.log("✅ Validação concluída com sucesso!");
  } else {
    console.error("❌ Erro(s) de validação encontrado(s)!\n");

    const errorsById: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const [index, ...fieldPathParts] = issue.path;
      const fieldPath = fieldPathParts.join(".");

      const spellWithError = spellsLevel0[index as number];
      const spellId =
        spellWithError?.id || `Índice ${String(index)} (ID não encontrado)`;

      const readableField = fieldPath || "(campo não identificado)";
      const message = `- Campo '${readableField}': ${issue.message}`;

      if (!errorsById[spellId]) {
        errorsById[spellId] = [];
      }

      errorsById[spellId].push(message);
    }

    console.log("\n--- Resumo dos Erros por Spell ---");
    for (const [id, errorMessages] of Object.entries(errorsById)) {
      console.error(`\n🚨 Spell: ${id}`);
      errorMessages.forEach((msg) => console.error(`  ${msg}`));
    }
  }
} catch (e) {
  console.error("Erro inesperado durante a validação:", e);
}
