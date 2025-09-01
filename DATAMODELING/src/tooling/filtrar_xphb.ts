import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

// Corrige __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, "../data/origins/origins.ts");

// Lê o conteúdo do arquivo
const raw = fs.readFileSync(inputPath, "utf-8");

// Avalia o conteúdo como um array JS (ajuste se necessário)
const originsArray = eval(
  raw.replace(/^export\s+const\s+\w+\s*=\s*/, "").replace(/;$/, ""),
);

// Agrupa por source
const bySource: Record<string, unknown[]> = {};

for (const origin of originsArray) {
  const source = origin.source || "unknown";

  if (!bySource[source]) bySource[source] = [];
  bySource[source].push(origin);
}

// Cria um diretório para salvar os arquivos separados
const outputDir = path.resolve(__dirname, "../data/origins/sources");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Cria um arquivo para cada source
for (const [source, arr] of Object.entries(bySource)) {
  const fileName = `origins-${source.replace(/[^a-zA-Z0-9_-]/g, "_")}.ts`;
  const filePath = path.resolve(outputDir, fileName);
  const content =
    "// Arquivo gerado automaticamente\n" +
    `export const origins = ${JSON.stringify(arr, null, 2)};\n`;

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Gerado: ${fileName}`);
}
