import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do arquivo TS de feats filtrados
const featsTsPath = path.join(__dirname, "../data/feats/rawfeats_XPHB.ts");

// Lê o conteúdo do arquivo de feats
const content = fs.readFileSync(featsTsPath, "utf8");

// --- Extrai o array `feats: Feat[] = [...]` ---
const arrayStart = content.indexOf("[");
const arrayEnd = content.lastIndexOf("]");

if (arrayStart === -1 || arrayEnd === -1) {
  throw new Error("Não foi possível encontrar o array de feats no arquivo TS.");
}

const arrayText = content.substring(arrayStart, arrayEnd + 1);

// Avalia o array como JS (seguro, já que são só literais)
const feats: any[] = Function(`"use strict"; return (${arrayText});`)();

// --- Agrupa feats por categoria ---
const featsByCategory: Record<string, any[]> = {};

for (const feat of feats) {
  const category =
    typeof feat.category === "string" && feat.category.trim()
      ? feat.category
      : "uncategorized";

  if (!featsByCategory[category]) {
    featsByCategory[category] = [];
  }

  featsByCategory[category].push(feat);
}

// --- Garante que a pasta `src/data/feats` existe ---
const outputDir = path.join(__dirname, "../data/feats/");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// --- Salva cada categoria em um arquivo TS separado ---
for (const [category, featsArr] of Object.entries(featsByCategory)) {
  const fileName = `feats-${category}.ts`;
  const filePath = path.join(outputDir, fileName);

  const fileContent =
    `import { Feat } from "../../domain/feat/feat.schema.js";\n\n` +
    `export const feats: Feat[] = ${JSON.stringify(featsArr, null, 2)};\n`;

  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Arquivo salvo: ${filePath}`);
}
