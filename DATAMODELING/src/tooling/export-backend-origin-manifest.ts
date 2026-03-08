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

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: OriginManifest = {
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

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "origin-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Origin catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
