import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024CLASSES } from "../data/index.js";

type ClassManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  source: string;
};

type ClassManifest = {
  manifestVersion: number;
  classes: ClassManifestEntry[];
};

const CLASS_CATALOG_MANIFEST_VERSION = 1;

function buildExpectedManifest(): ClassManifest {
  return {
    manifestVersion: CLASS_CATALOG_MANIFEST_VERSION,
    classes: [...PHB2024CLASSES]
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
    "class-catalog-manifest.json",
  );

  const expectedManifest = buildExpectedManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "class-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-class-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log("class-catalog-manifest.json está sincronizado com DATAMODELING.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
