import { build } from "esbuild";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { pathToFileURL } from "url";

// --- Configurações ---
const inputFilePath = "./src/domain/spell/spells.data.ts";
const outputDirectory = "./src/data/generated";
const tempOutfile = "./.temp/spells.bundle.mjs";
// ---------------------

async function bundleWithEsbuild() {
  await build({
    entryPoints: [inputFilePath],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: tempOutfile,
    external: [], // pode adicionar libs externas se quiser ignorar
  });
}

async function loadSpellsArray() {
  const module = await import(pathToFileURL(tempOutfile));
  // Detecta qualquer exportação que seja um array
  const key = Object.keys(module).find((k) => Array.isArray(module[k]));
  if (!key)
    throw new Error(
      "Nenhuma exportação de array encontrada no módulo compilado."
    );
  return module[key];
}

async function splitSpellsByLevel() {
  console.log(`🔧 Bundling com esbuild...`);
  await bundleWithEsbuild();

  console.log(`📦 Importando módulo compilado...`);
  const spells = await loadSpellsArray();

  console.log(`🔍 Magias encontradas: ${spells.length}`);

  if (!existsSync(outputDirectory)) {
    mkdirSync(outputDirectory, { recursive: true });
    console.log(`📁 Criado diretório: ${outputDirectory}`);
  }

  const grouped = {};
  for (let lvl = 0; lvl <= 9; lvl++) grouped[lvl] = [];

  for (const spell of spells) {
    if (typeof spell.level !== "number") {
      console.warn(`⚠️ Spell sem level numérico:`, spell.name);
      continue;
    }
    const lvl = spell.level;
    if (lvl >= 0 && lvl <= 9) {
      grouped[lvl].push(spell);
    } else {
      console.warn(`⚠️ Level inválido: ${lvl} (spell: ${spell.name})`);
    }
  }

  for (let lvl = 0; lvl <= 9; lvl++) {
    const outputFileName = `spells-level-${lvl}.ts`;
    const outputPath = path.join(outputDirectory, outputFileName);
    const tsContent = `export const spellsLevel${lvl} = ${JSON.stringify(
      grouped[lvl],
      null,
      2
    )};\n`;
    writeFileSync(outputPath, tsContent, "utf8");
    console.log(`✅ ${outputFileName} (${grouped[lvl].length} magias)`);
  }

  console.log("🏁 Divisão por nível concluída.");
}

splitSpellsByLevel().catch((err) => {
  console.error("❌ Erro durante execução:", err);
});
