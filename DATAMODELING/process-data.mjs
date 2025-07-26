import { PHB2024ITEMS } from "./src/data/items.data.js";
import { writeFileSync } from "fs";
import { join } from "path";

console.log("Iniciando a migração final para o modelo de efeitos...");

try {
  const transformedData = JSON.parse(JSON.stringify(PHB2024ITEMS));
  let itemsUpdatedCount = 0;

  for (const item of transformedData) {
    // Inicializa o array de efeitos se ele não existir
    if (!item.effects) {
      item.effects = [];
    }

    // --- Lógica de Migração para ARMADURAS ---
    if (item.type === "armor") {
      let hasBeenUpdated = false;

      // Migra 'ac' para um efeito 'setAC'
      if (item.ac) {
        item.effects.push({
          trigger: "equipped",
          payload: { type: "setAC", calculation: item.ac },
        });
        delete item.ac;
        hasBeenUpdated = true;
      }

      // Migra 'stealthDisadvantage' para um efeito 'imposeDisadvantage'
      if (item.stealthDisadvantage) {
        item.effects.push({
          trigger: "equipped",
          payload: {
            type: "imposeDisadvantage",
            on: "skillCheck",
            skill: "stealth",
          },
        });
        delete item.stealthDisadvantage;
        hasBeenUpdated = true;
      }

      if (hasBeenUpdated) itemsUpdatedCount++;
    }

    // --- Lógica de Migração para ARMAS ---
    if (item.type === "weapon") {
      // Agrupa todas as propriedades de arma em um único efeito 'grantWeaponAttack'
      const weaponPayload = {
        type: "grantWeaponAttack",
        weaponCategory: item.weaponCategory,
        weaponType: item.weaponType,
        properties: item.properties || [],
        mastery: item.mastery || [],
        dmg1: item.dmg1,
        dmgType: item.dmgType,
        dmg2: item.dmg2,
        range: item.range,
      };

      item.effects.push({
        trigger: "wielded",
        payload: weaponPayload,
      });

      // Remove os campos antigos do nível superior
      delete item.weaponCategory;
      delete item.weaponType;
      delete item.properties;
      delete item.mastery;
      delete item.dmg1;
      delete item.dmgType;
      delete item.dmg2;
      delete item.range;
      itemsUpdatedCount++;
    }

    // --- Lógica de Migração para EQUIPAMENTOS com Ação ---
    if (item.type === "gear" && item.action) {
      // Assume que a ação do item é para gerar um ID de ação reutilizável
      // (Isso será a base para a Parte 2)
      const actionId = `action-${item.id.replace("item-", "")}`;

      item.effects.push({
        trigger: "action",
        payload: { type: "grantAction", actionId: actionId },
      });
      // Por enquanto, não deletamos o 'action' antigo para poder usá-lo na Parte 2
      itemsUpdatedCount++;
    }
  }

  console.log(
    `${itemsUpdatedCount} itens foram migrados para o modelo de efeitos.`
  );

  // --- Etapa de Salvamento ---
  const finalJsonString = JSON.stringify(transformedData, null, 2);
  const jsonOutputPath = join("src", "data", "items.data.migrated.json");
  writeFileSync(jsonOutputPath, finalJsonString, "utf8");
  console.log(`\n✅ Dados migrados e salvos em: ${jsonOutputPath}`);

  const variableName = "PHB2024_ITEMS_MIGRATED";
  const tsOutputPath = join("src", "data", "items.data.migrated.ts");
  const tsContent = `export const ${variableName} = ${finalJsonString};\n`;
  writeFileSync(tsOutputPath, tsContent, "utf8");
  console.log(`✅ Arquivo TypeScript migrado gerado em: ${tsOutputPath}`);
} catch (error) {
  console.error("❌ Erro durante a transformação:", error);
}
