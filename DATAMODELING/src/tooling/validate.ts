import readline from "readline";
import chalk from "chalk";
import { z } from "zod";

import { FinalSpellDataSchema } from "../domain/spell/spell.schema.js";
import { FinalItemDataSchema } from "../domain/item/items.schema.js";

process.on("uncaughtException", (err) => {
  console.error(chalk.bgRed.white(" Uncaught Exception "), err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error(chalk.bgRed.white(" Unhandled Rejection "), reason);
  process.exit(1);
});

function validateData(data: any[], schema: z.ZodSchema<any>, dataName: string) {
  console.log(
    chalk.cyan(
      `\n🔍 Iniciando a validação dos dados de: ${chalk.bold.underline(
        dataName
      )}...`
    )
  );

  try {
    const result = schema.safeParse(data);

    if (result.success) {
      console.log(
        chalk.green(
          `✅ Validação de ${chalk.bold.underline(
            dataName
          )} concluída com sucesso!`
        )
      );
      return;
    }

    console.error(
      chalk.redBright(
        `\n❌ Erro(s) de validação encontrado(s) em ${chalk.bold.underline(
          dataName
        )}!\n`
      )
    );

    const errorsById: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const [index, ...fieldPathParts] = issue.path;
      const fieldPath = fieldPathParts.join(".");

      const itemWithError = data[index as number];
      const itemId =
        itemWithError?.id || `Índice ${String(index)} (ID não encontrado)`;

      const readableField = fieldPath || "(campo não identificado)";
      const message = `${chalk.yellow("- Campo")} '${chalk.cyan(
        readableField
      )}': ${chalk.red(issue.message)}`;

      if (!errorsById[itemId]) {
        errorsById[itemId] = [];
      }
      errorsById[itemId].push(message);
    }

    console.log(chalk.bold.underline("\n--- Resumo dos Erros ---"));
    for (const [id, errorMessages] of Object.entries(errorsById)) {
      console.error(chalk.bgRed.white(`\n🚨 Em '${id}':`));
      errorMessages.forEach((msg) => console.error(`  ${msg}`));
    }
  } catch (e) {
    console.error(
      chalk.bgRed.white(
        ` Erro inesperado durante a validação de ${chalk.bold.underline(
          dataName
        )}: `
      ),
      e
    );
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(chalk.blue(question), resolve));
}

async function main() {
  let choice: string;

  while (true) {
    choice = (
      await ask(
        "\nO que você quer testar?\n[1] Magias\n[2] Itens\n[3] Testar todos\nInforme: "
      )
    ).trim();

    if (["1", "2", "3"].includes(choice)) break;

    console.log(chalk.red("❌ Opção inválida! Digite 1, 2 ou 3."));
  }

  if (choice === "1" || choice === "3") {
    console.log(chalk.blue("Carregando dados de magias..."));
    const { PHB2024SPELLS } = await import("../data/spell/spells-union.js");
    validateData(PHB2024SPELLS, FinalSpellDataSchema, "Magias");
  }

  if (choice === "2" || choice === "3") {
    console.log(chalk.blue("Carregando dados de itens..."));
    const { PHB2024ITEMS } = await import("../data/item/items-union.js");
    validateData(PHB2024ITEMS, FinalItemDataSchema, "Itens");
  }

  rl.close();
}

main();
