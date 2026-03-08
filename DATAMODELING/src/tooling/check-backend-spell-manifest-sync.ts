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

function buildExpectedManifest(): SpellManifest {
  return {
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
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");
  const manifestPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "spell-catalog-manifest.json",
  );

  const expectedManifest = buildExpectedManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "spell-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-spell-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log("spell-catalog-manifest.json está sincronizado com DATAMODELING.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
