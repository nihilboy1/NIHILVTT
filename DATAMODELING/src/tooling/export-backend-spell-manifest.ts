import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024SPELLS } from "../data/index.js";

type SpellManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  source: string;
  level: number;
  school: string;
};

type SpellManifest = {
  manifestVersion: number;
  spells: SpellManifestEntry[];
};

const SPELL_CATALOG_MANIFEST_VERSION = 1;

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: SpellManifest = {
    manifestVersion: SPELL_CATALOG_MANIFEST_VERSION,
    spells: [...PHB2024SPELLS]
      .map((entry) => ({
        id: entry.id,
        primaryName: entry.name[0] ?? entry.id,
        names: [...entry.name],
        source: entry.source,
        level: entry.level,
        school: entry.school,
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
  };

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "spell-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Spell catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
