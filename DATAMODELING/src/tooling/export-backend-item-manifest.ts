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
  items: ItemManifestEntry[];
};

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

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: ItemManifest = {
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

  const outputPath = path.resolve(
    monorepoRoot,
    "BACKEND-JAVA",
    "src",
    "main",
    "resources",
    "catalog",
    "item-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Item catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
