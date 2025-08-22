import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { glob } from "glob";

import { SummonedTokensData } from "../data/tokens/tokens.js";

// --- Tipagem (do script generate-paths.ts) ---
interface Outcome {
  id?: string;
  type: string;
  [key: string]: unknown;
}

interface Parameters {
  outcomes?: Outcome[];
  [key: string]: unknown;
}

interface Effect {
  type: string;
  parameters?: Parameters;
}

interface DataObject {
  id: string;
  effects?: Effect[];
  [key: string]: unknown;
}

// --- Tratamento de Erros Globais ---
process.on("uncaughtException", (err) => {
  console.error(chalk.bgRed.white(" Uncaught Exception "), err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error(chalk.bgRed.white(" Unhandled Rejection "), reason);
  process.exit(1);
});

// --- Funções Auxiliares ---
function getPaths(
  obj: Record<string, unknown>,
  options: { ignoreKeys?: string[] } = {},
  currentPath = "",
  paths = new Set<string>(),
): Set<string> {
  for (const key in obj) {
    if (options.ignoreKeys?.includes(key)) continue;

    const value = obj[key];
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      getPaths(value as Record<string, unknown>, options, newPath, paths);
    } else {
      paths.add(newPath);
    }
  }
  return paths;
}

function extractParameterPaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();

  data.forEach((item) =>
    item.effects?.forEach((effect) => {
      if (effect.parameters)
        getPaths(effect.parameters, { ignoreKeys: ["outcomes"] }, "", allPaths);
    }),
  );
  return allPaths;
}

function extractOutcomePaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();

  data.forEach((item) =>
    item.effects?.forEach((effect) => {
      if (Array.isArray(effect.parameters?.outcomes)) {
        effect.parameters.outcomes.forEach((outcome) =>
          getPaths(outcome, {}, "", allPaths),
        );
      }
    }),
  );
  return allPaths;
}

function generateZodEnumFromSet(name: string, values: Set<string>): string {
  const sortedValues = Array.from(values).sort();
  const enumValues = sortedValues.map((val) => `  '${val}'`).join(",\n");

  return `export const ${name} = z.enum([\n${enumValues}\n]);`;
}

function generateZodEnumFromPaths(
  paths: Set<string>,
  sourceType: "parameters" | "outcomes",
): string {
  const variableName =
    sourceType === "parameters"
      ? "RootParameterPaths"
      : "OutcomeParameterPaths";
  const sortedPaths = Array.from(paths).sort();
  const enumValues = sortedPaths.map((path) => `  '${path}'`).join(",\n");

  return `export const ${variableName} = z.enum([\n${enumValues}\n]);`;
}

// --- Função Principal ---
async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");

  const globPatterns = [
    path
      .join(projectRoot, "src", "data", "items", "**", "*.ts")
      .replace(/\\/g, "/"),
    path
      .join(projectRoot, "src", "data", "actions", "**", "*.ts")
      .replace(/\\/g, "/"),
    path
      .join(projectRoot, "src", "data", "spells", "**", "*.ts")
      .replace(/\\/g, "/"),
  ];
  const ignorePattern = path
    .join(projectRoot, "src", "data", "**", "*-union.ts")
    .replace(/\\/g, "/");

  const dataFiles = await glob(globPatterns, { ignore: ignorePattern });

  const allWeaponIds = new Set<string>();
  const allActionIds = new Set<string>();
  const allSpellIds = new Set<string>();
  const allTokenIds = new Set<string>(SummonedTokensData.map((t) => t.id));
  let allDataForPaths: DataObject[] = [];

  for (const absolutePath of dataFiles) {
    const relativeImportPath =
      "./" + path.relative(__dirname, absolutePath).replace(/\\/g, "/");

    try {
      const module = await import(relativeImportPath);

      for (const key in module) {
        if (Array.isArray(module[key])) {
          allDataForPaths = allDataForPaths.concat(module[key]);
          if (key === "itemsWeapon")
            module[key].forEach((i: { id: string }) => allWeaponIds.add(i.id));
          if (key === "ACTIONS")
            module[key].forEach((i: { id: string }) => allActionIds.add(i.id));
          if (absolutePath.includes("spells"))
            module[key].forEach((i: { id: string }) => allSpellIds.add(i.id));
        }
      }
    } catch (error) {
      console.error(chalk.red(`Erro ao carregar ${absolutePath}:`), error);
    }
  }

  // --- Geração de Enums ---
  const weaponIdEnumString = generateZodEnumFromSet(
    "WeaponIdEnum",
    allWeaponIds,
  );
  const actionIdEnumString = generateZodEnumFromSet(
    "ActionIdEnum",
    allActionIds,
  );
  const spellIdEnumString = generateZodEnumFromSet("SpellIdEnum", allSpellIds);
  const tokenIdEnumString = generateZodEnumFromSet(
    "SummonedTokenIdEnum",
    allTokenIds,
  );

  const parameterPaths = extractParameterPaths(allDataForPaths);
  const outcomePaths = extractOutcomePaths(allDataForPaths);
  const parameterEnumString = generateZodEnumFromPaths(
    parameterPaths,
    "parameters",
  );
  const outcomeEnumString = generateZodEnumFromPaths(outcomePaths, "outcomes");

  const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.
import { z } from 'zod';

// --- Enums de ID ---
${weaponIdEnumString}

${actionIdEnumString}

${spellIdEnumString}

${tokenIdEnumString}

// --- Enums de Caminho de Propriedade ---
${parameterEnumString}

${outcomeEnumString}
`;

  const outputPath = path.resolve(
    projectRoot,
    "src",
    "shared",
    "data-based-enums.ts",
  );

  if (!fsSync.existsSync(path.dirname(outputPath)))
    fsSync.mkdirSync(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, fileContent, "utf-8");
  console.log(chalk.bgGreen(`Arquivo de enums gerado em: ${outputPath}`));
}

main();
