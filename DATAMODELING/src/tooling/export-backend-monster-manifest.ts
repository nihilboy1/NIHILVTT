import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { PHB2024MONSTERS } from "../data/index.js";

type MonsterManifestSpeed = {
  walk: number | null;
  burrow: number | null;
  climb: number | null;
  fly: number | null;
  swim: number | null;
  unit: string;
};

type MonsterManifestAbilityScores = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

type MonsterCatalogManifestEntry = {
  id: string;
  primaryName: string;
  names: string[];
  tokenUrl: string;
  splashArtUrl: string;
  size: string;
  creatureType: string;
  alignment: string;
  abilityScores: MonsterManifestAbilityScores;
  armorClass: number;
  hitPointMaximum: number;
  speed: MonsterManifestSpeed;
  challengeRating: string;
};

type MonsterCatalogManifest = {
  monsters: MonsterCatalogManifestEntry[];
};

function buildMonsterSpeed(monster: (typeof PHB2024MONSTERS)[number]): MonsterManifestSpeed {
  return {
    walk: monster.speed.walk ?? null,
    burrow: monster.speed.burrow ?? null,
    climb: monster.speed.climb ?? null,
    fly: monster.speed.fly ?? null,
    swim: monster.speed.swim ?? null,
    unit: monster.speed.unit,
  };
}

function buildMonsterAbilityScores(
  monster: (typeof PHB2024MONSTERS)[number],
): MonsterManifestAbilityScores {
  return {
    strength: monster.abilityScores.strength,
    dexterity: monster.abilityScores.dexterity,
    constitution: monster.abilityScores.constitution,
    intelligence: monster.abilityScores.intelligence,
    wisdom: monster.abilityScores.wisdom,
    charisma: monster.abilityScores.charisma,
  };
}

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const projectRoot = path.resolve(__dirname, "../..");
  const monorepoRoot = path.resolve(projectRoot, "..");

  const manifest: MonsterCatalogManifest = {
    monsters: [...PHB2024MONSTERS]
      .map((monster) => ({
        id: monster.id,
        primaryName: monster.name[0] ?? monster.id,
        names: [...monster.name],
        tokenUrl: monster.tokenUrl,
        splashArtUrl: monster.splashArtUrl,
        size: monster.size,
        creatureType: monster.type,
        alignment: monster.alignment,
        abilityScores: buildMonsterAbilityScores(monster),
        armorClass: monster.armorClass,
        hitPointMaximum: monster.hitPoints.average,
        speed: buildMonsterSpeed(monster),
        challengeRating: monster.challengeRating,
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
    "monster-catalog-manifest.json",
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`Monster catalog manifest gerado em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
