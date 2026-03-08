import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { buildMonsterCatalogManifest } from "./lib/monster-manifest-builder.js";

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
    "monster-catalog-manifest.json",
  );

  const expectedManifest = buildMonsterCatalogManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "monster-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-monster-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    "monster-catalog-manifest.json está sincronizado com DATAMODELING.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
