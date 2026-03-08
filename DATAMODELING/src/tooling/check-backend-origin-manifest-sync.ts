import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024ORIGINS } from "../data/index.js";

type OriginManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  source: string;
};

type OriginManifest = {
  manifestVersion: number;
  origins: OriginManifestEntry[];
};

const ORIGIN_CATALOG_MANIFEST_VERSION = 1;

function buildExpectedManifest(): OriginManifest {
  return {
    manifestVersion: ORIGIN_CATALOG_MANIFEST_VERSION,
    origins: [...PHB2024ORIGINS]
      .map((entry) => ({
        id: entry.id,
        primaryName: entry.name[0] ?? entry.id,
        names: [...entry.name],
        source: entry.source,
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
    "origin-catalog-manifest.json",
  );

  const expectedManifest = buildExpectedManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "origin-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-origin-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log("origin-catalog-manifest.json está sincronizado com DATAMODELING.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
