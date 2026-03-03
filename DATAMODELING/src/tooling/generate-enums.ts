// scripts/generate-enums.ts
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { glob } from "glob";

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
  id?: string;
  type?: string;
  effects?: Effect[];
  parameters?: Parameters;
  outcomes?: Outcome[];
  [key: string]: unknown;
}

function generateZodEnumFromSet(name: string, values: Set<string>): string {
  const sortedValues = Array.from(values).sort();
  const enumValues = sortedValues.map((val) => `  '${val}'`).join(",\n");

  return `export const ${name} = z.enum([\n${enumValues}\n]);`;
}

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
      if (effect.parameters?.outcomes) {
        effect.parameters.outcomes.forEach((outcome) =>
          getPaths(outcome, {}, "", allPaths),
        );
      }
    }),
  );
  return allPaths;
}

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
    path
      .join(projectRoot, "src", "data", "feats", "**", "*.ts")
      .replace(/\\/g, "/"),
    path
      .join(projectRoot, "src", "data", "summonedTokens", "**", "*.{ts,js}")
      .replace(/\\/g, "/"),
    path
      .join(projectRoot, "src", "data", "monsters", "**", "*.ts")
      .replace(/\\/g, "/"),
  ];

  const ignorePattern = path
    .join(projectRoot, "src", "data", "**", "*-union.ts")
    .replace(/\\/g, "/");

  const dataFiles = await glob(globPatterns, { ignore: ignorePattern });

  const allWeaponIds = new Set<string>();
  const allToolIds = new Set<string>();
  const allGearIds = new Set<string>();
  const allArmorIds = new Set<string>();
  const allMusicalInstrumentIds = new Set<string>();
  const allActionIds = new Set<string>();
  const allSpellIds = new Set<string>();
  const allFeatIds = new Set<string>();
  const allTokenIds = new Set<string>();
  const allMonsterIds = new Set<string>();

  let allDataForPaths: DataObject[] = [];

  for (const absolutePath of dataFiles) {
    const normalizedAbsolutePath = absolutePath.replace(/\\/g, "/");
    const relativeImportPath =
      "./" + path.relative(__dirname, absolutePath).replace(/\\/g, "/");

    let itemBucket:
      | "weapon"
      | "tool"
      | "gear"
      | "armor"
      | "musicalInstrument"
      | null = null;

    if (normalizedAbsolutePath.includes("/src/data/items/")) {
      if (normalizedAbsolutePath.endsWith("/items-weapon.ts")) itemBucket = "weapon";
      else if (normalizedAbsolutePath.endsWith("/items-tool.ts")) itemBucket = "tool";
      else if (normalizedAbsolutePath.endsWith("/items-gear.ts")) itemBucket = "gear";
      else if (normalizedAbsolutePath.endsWith("/items-armor.ts")) itemBucket = "armor";
      else if (normalizedAbsolutePath.endsWith("/items-musical-instruments.ts")) itemBucket = "musicalInstrument";
    }

    try {
      const module = await import(relativeImportPath);

      for (const key in module) {
        const exportedValue = module[key];

        if (Array.isArray(exportedValue)) {
          allDataForPaths = allDataForPaths.concat(
            exportedValue as DataObject[],
          );

          if (itemBucket) {
            exportedValue.forEach((item: { id?: string }) => {
              if (!item.id) return;

              switch (itemBucket) {
                case "weapon":
                  allWeaponIds.add(item.id);
                  break;
                case "tool":
                  allToolIds.add(item.id);
                  break;
                case "gear":
                  allGearIds.add(item.id);
                  break;
                case "armor":
                  allArmorIds.add(item.id);
                  break;
                case "musicalInstrument":
                  allMusicalInstrumentIds.add(item.id);
                  break;
              }
            });
          }

          // Captura de IDs por módulo
          if (absolutePath.includes("actions"))
            exportedValue.forEach(
              (i: { id?: string }) => i.id && allActionIds.add(i.id),
            );
          if (absolutePath.includes("spells"))
            exportedValue.forEach(
              (i: { id?: string }) => i.id && allSpellIds.add(i.id),
            );
          if (absolutePath.includes("feats"))
            exportedValue.forEach(
              (i: { id?: string }) => i.id && allFeatIds.add(i.id),
            );
          if (absolutePath.includes("summonedTokens"))
            exportedValue.forEach(
              (i: { id?: string }) => i.id && allTokenIds.add(i.id),
            );
          if (absolutePath.includes("monsters"))
            exportedValue.forEach(
              (i: { id?: string }) => i.id && allMonsterIds.add(i.id),
            );
        }
      }
    } catch (error) {
      console.error(chalk.red(`Erro ao carregar ${absolutePath}:`), error);
    }
  }

  // Geração dos enums
  const weaponIdEnumString = generateZodEnumFromSet(
    "WeaponIdEnum",
    allWeaponIds,
  );
  const toolIdEnumString = generateZodEnumFromSet("ToolIdEnum", allToolIds);
  const gearIdEnumString = generateZodEnumFromSet("GearIdEnum", allGearIds);
  const armorIdEnumString = generateZodEnumFromSet("ArmorIdEnum", allArmorIds);
  const musicalInstrumentIdEnumString = generateZodEnumFromSet(
    "MusicalInstrumentIdEnum",
    allMusicalInstrumentIds,
  );
  const actionIdEnumString = generateZodEnumFromSet(
    "ActionIdEnum",
    allActionIds,
  );
  const spellIdEnumString = generateZodEnumFromSet("SpellIdEnum", allSpellIds);
  const featIdEnumString = generateZodEnumFromSet("FeatIdEnum", allFeatIds);
  const tokenIdEnumString = generateZodEnumFromSet(
    "SummonedTokenIdEnum",
    allTokenIds,
  );
  const monsterIdEnumString = generateZodEnumFromSet(
    "MonsterIdEnum",
    allMonsterIds,
  );

  const parameterPaths = extractParameterPaths(allDataForPaths);
  const outcomePaths = extractOutcomePaths(allDataForPaths);
  const parameterEnumString = generateZodEnumFromSet(
    "RootParameterPaths",
    parameterPaths,
  );
  const outcomeEnumString = generateZodEnumFromSet(
    "OutcomeParameterPaths",
    outcomePaths,
  );

  const fileContent = `// Este arquivo é gerado automaticamente. Não edite manualmente.
import { z } from 'zod';

${weaponIdEnumString}

${toolIdEnumString}

${gearIdEnumString}

${armorIdEnumString}

${musicalInstrumentIdEnumString}

export const AllItemsEnum = z.union([
  WeaponIdEnum,
  ToolIdEnum,
  GearIdEnum,
  ArmorIdEnum,
  MusicalInstrumentIdEnum,
]);

${actionIdEnumString}

${spellIdEnumString}

${featIdEnumString}

${tokenIdEnumString}

${monsterIdEnumString}

${parameterEnumString}

${outcomeEnumString}
`;

  const outputPath = path.resolve(
    projectRoot,
    "src",
    "shared",
    "data-based-enums.ts",
  );

  if (!fsSync.existsSync(path.dirname(outputPath))) {
    fsSync.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  await fs.writeFile(outputPath, fileContent, "utf-8");
  console.log(chalk.bgGreen(`Arquivo de enums gerado em: ${outputPath}`));
}

main();
