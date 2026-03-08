import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024FEATS } from "../data/index.js";

type FeatManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  source: string;
  category: string;
  repeatable: boolean;
};

type FeatManifest = {
  manifestVersion: number;
  feats: FeatManifestEntry[];
};

const FEAT_CATALOG_MANIFEST_VERSION = 1;

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: FeatManifest = {
    manifestVersion: FEAT_CATALOG_MANIFEST_VERSION,
    feats: [...PHB2024FEATS]
      .map((entry) => ({
        id: entry.id,
        primaryName: entry.name[0] ?? entry.id,
        names: [...entry.name],
        source: entry.source,
        category: entry.category,
        repeatable: entry.repeatable?.canBeRepeated === true,
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
    "feat-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Feat catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
