import fs from "fs";
import { z } from "zod";
import { FinalSpellDataSchema } from "./src/domain/spell/spell.schema.js";

// --- Mapeamentos e Helpers ---
const schoolMap = {
  A: "abjuration",
  C: "conjuration",
  D: "divination",
  E: "enchantment",
  V: "evocation",
  I: "illusion",
  N: "necromancy",
  T: "transmutation",
};
const timeUnitMap = {
  action: "action",
  bonus: "bonusAction",
  reaction: "reaction",
  minute: "minute",
  hour: "hour",
};

function parseDamageString(damageStr) {
  const match = damageStr.match(/(\d+d\d+)(?:\s*\+\s*(\d+))?/);
  if (!match) return { dice: "1d1", bonus: -1 }; // Invalid format, return 0 damage
  return {
    dice: match[1], // "1d4"
    bonus: match[2] ? parseInt(match[2], 10) : undefined, // "1" -> 1
  };
}

/**
 * Converte UMA magia do formato de origem para o nosso schema.
 * @param {object} source - O objeto da magia do JSON original.
 * @returns {object} - O objeto da magia no nosso novo formato.
 */
function transformSpell(source) {
  const id = `spell-${source.name.toLowerCase().replace(/[\s/]+/g, "-")}`;
  const description = source.entries
    .map((e) => (typeof e === "string" ? e : e.name || e.type))
    .join("\n\n");
  const higherLevel = source.entriesHigherLevel?.[0]?.entries?.[0];

  const castingTime = {
    value: source.time[0].number,
    unit: timeUnitMap[source.time[0].unit] || "action",
  };

  const range = {
    unit: source.range.distance?.type === "feet" ? "ft" : source.range.type,
    normal: source.range.distance?.amount,
  };
  if (range.unit === "point") range.unit = "ft"; // Corrige caso 'point' vaze

  const sourceDuration = source.duration[0];
  const duration = { concentration: sourceDuration.concentration === true };
  if (sourceDuration.type === "instant") {
    duration.unit = "instantaneous";
  } else if (sourceDuration.type === "permanent") {
    duration.unit = "unlimited";
  } else if (sourceDuration.type === "timed") {
    duration.unit = sourceDuration.duration.type;
    duration.value = sourceDuration.duration.amount;
  } else {
    duration.unit = sourceDuration.type;
  }

  const components = {
    types: Object.keys(source.components)
      .filter((c) => c === "v" || c === "s" || c === "m")
      .map((c) => c.toUpperCase()),
    material:
      typeof source.components.m === "object"
        ? source.components.m.text
        : typeof source.components.m === "string"
        ? source.components.m
        : undefined,
  };

  // --- Processamento de Efeitos (Outcomes) ---
  const outcomes = [];
  const areaRegex = /(\d+)-foot-radius\s*\{@variantrule\s*Sphere/i;
  let areaMatch = description.match(areaRegex);
  const area = areaMatch
    ? { shape: "sphere", radius: parseInt(areaMatch[1], 10) }
    : undefined;

  if (source.savingThrow && source.savingThrow.length > 0) {
    const damageRegex = /\{@damage (.*?)\}/g;
    let match;
    while ((match = damageRegex.exec(description)) !== null) {
      const formula = parseDamageString(match[1]);
      outcomes.push({
        type: "damage",
        on: "fail", // Dano em falha de save
        formula: {
          ...formula,
          damageType: source.damageInflict?.[0] || "bludgeoning",
        },
      });
    }
  } else {
    // Lógica para dano em acerto de ataque (não temos exemplos ainda)
  }

  if (source.conditionInflict && source.conditionInflict.length > 0) {
    outcomes.push({
      type: "applyCondition",
      on: source.savingThrow ? "fail" : "hit",
      condition: source.conditionInflict[0],
      duration: duration,
    });
  }

  // Tratamento para magias que não são de dano/condição, como "Aid"
  if (source.name === "Aid") {
    outcomes.push({
      type: "applyCustomEffect",
      on: "success",
      effect: "increaseHitPoints",
      value: 5,
      duration: duration,
    });
  }

  // Tratamento especial para Míssil Mágico
  if (source.name === "Magic Missile") {
    outcomes.push({
      type: "damage",
      on: "hit",
      formula: { dice: "1d4", bonus: 1, damageType: "force" },
      details: { autoHit: true, count: 3 },
    });
  }

  // --- Montagem Final ---
  const finalSpell = {
    id,
    name: source.name,
    description,
    level: source.level,
    school: schoolMap[source.school],
    castingTime,
    components,
    duration,
    range,
    outcomes,
    higherLevel,
    area,
  };

  if (source.savingThrow?.[0]) {
    finalSpell.save = { ability: source.savingThrow[0] };
  }

  return finalSpell;
}

// --- Script Principal ---
try {
  console.log("Iniciando a transformação das magias...");
  const sourceFile = fs.readFileSync(
    "D:/CODE/NIHILVTT/DATAMODELING/src/data/spells.json",
    "utf-8"
  ); // Ajuste o caminho se necessário
  const sourceData = JSON.parse(sourceFile);
  const sourceSpells = sourceData.spell;
  if (!Array.isArray(sourceSpells))
    throw new Error("A chave 'spell' no JSON não contém um array.");

  const transformedSpells = sourceSpells.map(transformSpell);
  console.log(`${transformedSpells.length} magias foram processadas.`);

  FinalSpellDataSchema.parse(transformedSpells);
  console.log("✅ Validação Zod bem-sucedida!");

  const tsContent = `import { FinalSpellDataSchema } from "../spell/spell.schema.js";\n\nexport const SPELLS = ${JSON.stringify(
    transformedSpells,
    null,
    2
  )} as const;\n\nFinalSpellDataSchema.parse(SPELLS);`;
  fs.writeFileSync("./src/domain/spell/spell.data.ts", tsContent, "utf-8");

  console.log("✅ Arquivo 'spell.data.ts' criado com sucesso!");
} catch (error) {
  if (error.issues) {
    console.error("❌ Erro de validação Zod!");
    const firstError = error.issues[0];
    const errorIndex = firstError.path[0];
    const problematicSpellSource = sourceSpells[errorIndex];
    console.log(
      `\n🕵️  A falha ocorreu na magia de índice [${errorIndex}]: "${problematicSpellSource.name}"`
    );
    console.log(
      "--- DADOS ORIGINAIS DA MAGIA ---\n",
      JSON.stringify(problematicSpellSource, null, 2)
    );
    console.log("\n--- DETALHES DO PRIMEIRO ERRO ---\n", firstError);
  } else {
    console.error("❌ Erro inesperado durante a transformação:", error);
  }
}
