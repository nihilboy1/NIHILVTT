import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { glob } from "glob";

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
  // Permite outras propriedades para ser compatível com itemsWeapon, etc.
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

// --- Funções Auxiliares (de generate-paths.ts) ---

/**
 * Função recursiva para extrair todos os caminhos de propriedades de um objeto.
 */
function getPaths(
  obj: Record<string, unknown>,
  options: { ignoreKeys?: string[] } = {},
  currentPath = "",
  paths = new Set<string>(),
): Set<string> {
  for (const key in obj) {
    if (options.ignoreKeys?.includes(key)) {
      continue;
    }

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

/**
 * Extrai caminhos da raiz do objeto 'parameters', ignorando o array 'outcomes'.
 */
function extractParameterPaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();

  data.forEach((item) => {
    item.effects?.forEach((effect) => {
      if (effect.parameters) {
        getPaths(effect.parameters, { ignoreKeys: ["outcomes"] }, "", allPaths);
      }
    });
  });
  return allPaths;
}

/**
 * Extrai caminhos de dentro dos objetos no array 'outcomes'.
 */
function extractOutcomePaths(data: DataObject[]): Set<string> {
  const allPaths = new Set<string>();

  data.forEach((item) => {
    item.effects?.forEach((effect) => {
      if (Array.isArray(effect.parameters?.outcomes)) {
        effect.parameters.outcomes.forEach((outcome) => {
          getPaths(outcome, {}, "", allPaths);
        });
      }
    });
  });
  return allPaths;
}

// --- Funções de Geração de Zod Enums ---

/**
 * Gera uma string de Zod Enum a partir de um Set de valores.
 * (Usado para os enums de ID)
 */
function generateZodEnumFromSet(name: string, values: Set<string>): string {
  if (values.size === 0) {
    console.log(
      chalk.yellow(
        `\n⚠️ Nenhum ID encontrado para ${name}. Gerando enum vazio.`,
      ),
    );
    return `export const ${name} = z.enum([]);`;
  }

  const sortedValues = Array.from(values).sort();
  const enumValues = sortedValues.map((val) => `  '${val}'`).join(",\n");

  return `export const ${name} = z.enum([\n${enumValues}\n]);`;
}

/**
 * Gera uma string de Zod Enum para os caminhos de propriedades.
 * (Usado para os enums de Paths)
 */
function generateZodEnumFromPaths(
  paths: Set<string>,
  sourceType: "parameters" | "outcomes",
): string {
  const variableName =
    sourceType === "parameters"
      ? "RootParameterPaths"
      : "OutcomeParameterPaths";
  const dataName =
    sourceType === "parameters" ? "Parameters (Raiz)" : "Outcomes";

  console.log(
    chalk.cyan(
      `\n🔍 Gerando enum para caminhos de: ${chalk.bold.underline(dataName)}...`,
    ),
  );

  if (paths.size === 0) {
    console.log(
      chalk.yellow(
        `\n⚠️ Nenhum caminho encontrado em ${dataName}. Gerando enum vazio.`,
      ),
    );
    return `// No paths found for ${dataName}\nexport const ${variableName} = z.enum([]);`;
  }

  const sortedPaths = Array.from(paths).sort();
  const enumValues = sortedPaths.map((path) => `  '${path}'`).join(",\n");
  const zodEnumString = `export const ${variableName} = z.enum([\n${enumValues}\n]);`;

  console.log(
    chalk.green(`  -> ${sortedPaths.length} caminhos únicos encontrados.`),
  );

  return zodEnumString;
}

// --- Função Principal Unificada ---

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");

  console.log(
    chalk.blue("Buscando arquivos de dados para geração de schemas..."),
  );

  // Unifica todos os padrões de busca em um só lugar
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

  const dataFiles = await glob(globPatterns, {
    ignore: ignorePattern,
  });

  console.log(chalk.blue("Carregando e processando arquivos de dados..."));

  // Armazenadores para todos os dados extraídos
  const allWeaponIds = new Set<string>();
  const allActionIds = new Set<string>();
  const allSpellIds = new Set<string>();
  let allDataForPaths: DataObject[] = [];

  for (const absolutePath of dataFiles) {
    const relativeImportPath = path
      .relative(__dirname, absolutePath)
      .replace(/\\/g, "/");
    const finalImportPath = relativeImportPath.startsWith("../")
      ? relativeImportPath
      : "./" + relativeImportPath;

    try {
      const module = await import(finalImportPath);

      console.log(
        chalk.gray(
          `- Processando ${path.relative(projectRoot, absolutePath)}...`,
        ),
      );

      // Lógica de extração de ID (do script generate-enums.ts)
      if (
        absolutePath.includes("items-weapon") &&
        Array.isArray(module.itemsWeapon)
      ) {
        console.log(
          chalk.green(
            `  -> Encontrado 'itemsWeapon' com ${module.itemsWeapon.length} itens para extração de ID.`,
          ),
        );
        module.itemsWeapon.forEach((item: { id: string }) =>
          allWeaponIds.add(item.id),
        );
      }
      if (
        absolutePath.includes("actions.data") &&
        Array.isArray(module.ACTIONS)
      ) {
        console.log(
          chalk.green(
            `  -> Encontrado 'ACTIONS' com ${module.ACTIONS.length} itens para extração de ID.`,
          ),
        );
        module.ACTIONS.forEach((item: { id: string }) =>
          allActionIds.add(item.id),
        );
      }

      // Lógica de extração de ID de Magias
      if (absolutePath.includes(path.join("data", "spells"))) {
        for (const key in module) {
          if (Array.isArray(module[key])) {
            console.log(
              chalk.cyan(
                `  -> Encontrado '${key}' com ${module[key].length} magias para extração de ID.`,
              ),
            );
            module[key].forEach((item: { id: string }) => {
              if (item.id) {
                allSpellIds.add(item.id);
              }
            });
          }
        }
      }

      // Lógica de extração de dados para Paths (do script generate-paths.ts)
      for (const key in module) {
        const exportedItem = module[key];

        if (Array.isArray(exportedItem) && exportedItem.length > 0) {
          // Adiciona qualquer array exportado que contenha objetos com 'id' e 'effects'
          if (
            exportedItem.every(
              (item) =>
                typeof item === "object" && item !== null && "id" in item,
            )
          ) {
            console.log(
              chalk.magenta(
                `  -> Encontrado array exportado '${key}' com ${exportedItem.length} itens para extração de caminhos.`,
              ),
            );
            allDataForPaths = allDataForPaths.concat(exportedItem);
          }
        }
      }
    } catch (error) {
      console.error(
        chalk.red(
          `\n🚨 Erro ao carregar o arquivo ${path.relative(
            projectRoot,
            absolutePath,
          )}:`,
        ),
        error,
      );
    }
  }

  // --- Geração dos Enums de ID ---
  const weaponIdEnumString = generateZodEnumFromSet(
    "WeaponIdEnum",
    allWeaponIds,
  );
  const actionIdEnumString = generateZodEnumFromSet(
    "ActionIdEnum",
    allActionIds,
  );
  const spellIdEnumString = generateZodEnumFromSet("SpellIdEnum", allSpellIds);

  // --- Geração dos Enums de Caminho ---
  const parameterPaths = extractParameterPaths(allDataForPaths);
  const outcomePaths = extractOutcomePaths(allDataForPaths);
  const parameterEnumString = generateZodEnumFromPaths(
    parameterPaths,
    "parameters",
  );
  const outcomeEnumString = generateZodEnumFromPaths(outcomePaths, "outcomes");

  // --- Montagem do Conteúdo Final do Arquivo ---
  const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.
// Use o script 'npm run enums' para atualizar.

import { z } from 'zod';

// --- Enums de ID ---
${weaponIdEnumString}

${actionIdEnumString}

${spellIdEnumString}

// --- Enums de Caminho de Propriedade ---
${parameterEnumString}

${outcomeEnumString}
`;

  // --- Escrita do Arquivo de Saída Único ---
  const outputPath = path.resolve(
    projectRoot,
    "src",
    "shared",
    "data-based-enums.ts",
  );
  const outputDir = path.dirname(outputPath);

  try {
    if (!fsSync.existsSync(outputDir)) {
      fsSync.mkdirSync(outputDir, { recursive: true });
    }

    await fs.writeFile(outputPath, fileContent, "utf-8");
    console.log(
      chalk.bgGreen.bold(
        `\n✅ Arquivo de schemas gerado com sucesso em: ${path.relative(
          projectRoot,
          outputPath,
        )}\n`,
      ),
    );
  } catch (error) {
    console.error(
      chalk.bgRed.white(`\n🚨 Erro ao escrever o arquivo de schemas:`),
      error,
    );
  }
}

main();
