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

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: SpecieManifest = {
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

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "specie-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Specie catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
