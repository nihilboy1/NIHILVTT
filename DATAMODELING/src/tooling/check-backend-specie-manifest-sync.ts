import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024SPECIES } from "../data/index.js";

type SpecieManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  source: string;
  creatureType: string;
  size: string;
  walkSpeed: number | null;
};

type SpecieManifest = {
  manifestVersion: number;
  species: SpecieManifestEntry[];
};

const SPECIE_CATALOG_MANIFEST_VERSION = 1;

function buildExpectedManifest(): SpecieManifest {
  return {
    manifestVersion: SPECIE_CATALOG_MANIFEST_VERSION,
    species: [...PHB2024SPECIES]
      .map((entry) => ({
        id: entry.id,
        primaryName: entry.name[0] ?? entry.id,
        names: [...entry.name],
        source: entry.source,
        creatureType: entry.creatureType,
        size: entry.size,
        walkSpeed: entry.speed?.walk ?? null,
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
    "specie-catalog-manifest.json",
  );

  const expectedManifest = buildExpectedManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "specie-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-specie-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log("specie-catalog-manifest.json está sincronizado com DATAMODELING.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
