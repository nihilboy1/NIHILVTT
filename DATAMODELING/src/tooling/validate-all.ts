import chalk from "chalk";

import { SpellSchemaArray } from "../domain/spell/spell.schema.js";
import { ItemSchemaArray } from "../domain/item/item.schema.js";
import { MonsterSchemaArray } from "../domain/monster/monster.schema.js";
import { FeatSchemaArray } from "../domain/feat/feat.schema.js";
import { OriginSchemaArray } from "../domain/origin/origin.schema.js";

import {
  PHB2024FEATS,
  PHB2024ITEMS,
  PHB2024MONSTERS,
  PHB2024ORIGINS,
  PHB2024SPELLS,
} from "../data/index.js";

function validateData(data: unknown[], schema: { safeParse: (value: unknown) => { success: boolean; error?: { issues: Array<{ message: string; path: Array<string | number> }> } } }, dataName: string): void {
  const result = schema.safeParse(data);
  if (result.success) {
    console.log(chalk.green(`✅ ${dataName} válido.`));
    return;
  }

  console.error(chalk.red(`❌ Erros em ${dataName}:`));
  for (const issue of result.error?.issues ?? []) {
    const fieldPath = issue.path.join(".");
    console.error(`- ${fieldPath || "(root)"}: ${issue.message}`);
  }

  throw new Error(`Validação falhou em ${dataName}.`);
}

function main() {
  validateData(PHB2024SPELLS, SpellSchemaArray, "Spells");
  validateData(PHB2024ITEMS, ItemSchemaArray, "Items");
  validateData(PHB2024MONSTERS, MonsterSchemaArray, "Monsters");
  validateData(PHB2024FEATS, FeatSchemaArray, "Feats");
  validateData(PHB2024ORIGINS, OriginSchemaArray, "Origins");
  console.log(chalk.green("✅ validate:data:all concluído com sucesso."));
}

main();
