import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024ITEMS } from "../data/index.js";

type ItemManifestEntry = {
  id: string;
  type: string;
  armorType: string | null;
  acCalculationType: string | null;
  acValue: number | null;
  acBase: number | null;
  acAttribute: string | null;
  acMaxBonus: number | null;
};

type ItemManifest = {
  manifestVersion: number;
  items: ItemManifestEntry[];
};

const ITEM_CATALOG_MANIFEST_VERSION = 1;

function resolveArmorEffect(item: (typeof PHB2024ITEMS)[number]) {
  if (item.type !== "armor") {
    return null;
  }

  const acEffect = item.effects.find((effect) => effect.type === "onEquip_setAC");
  if (!acEffect || !("armorType" in acEffect)) {
    return null;
  }

  return acEffect;
}

function buildExpectedManifest(): ItemManifest {
  return {
    manifestVersion: ITEM_CATALOG_MANIFEST_VERSION,
    items: [...PHB2024ITEMS]
      .map((item) => {
        const armorEffect = resolveArmorEffect(item);
        const calculation = armorEffect?.calculation;

        return {
          id: item.id,
          type: item.type,
          armorType: armorEffect?.armorType ?? null,
          acCalculationType: calculation?.calculation ?? null,
          acValue:
            calculation && calculation.calculation !== "formula" ? calculation.value : null,
          acBase:
            calculation && calculation.calculation === "formula" ? calculation.base : null,
          acAttribute:
            calculation && calculation.calculation === "formula" ? calculation.attribute : null,
          acMaxBonus:
            calculation && calculation.calculation === "formula"
              ? calculation.maxBonus ?? null
              : null,
        };
      })
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
    "item-catalog-manifest.json",
  );

  const expectedManifest = buildExpectedManifest();
  const expectedJson = JSON.stringify(expectedManifest, null, 2) + "\n";
  const currentJson = await fs.readFile(manifestPath, "utf-8");

  if (currentJson !== expectedJson) {
    console.error(
      "item-catalog-manifest.json está fora de sincronização com DATAMODELING. Rode: pnpm export:backend-item-manifest",
    );
    process.exitCode = 1;
    return;
  }

  console.log("item-catalog-manifest.json está sincronizado com DATAMODELING.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
