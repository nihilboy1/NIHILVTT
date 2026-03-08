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

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: ClassManifest = {
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

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "class-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Class catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
