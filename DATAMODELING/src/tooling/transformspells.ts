import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import lodash from "lodash";

try {
  const { kebabCase } = lodash;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Caminho dos arquivos
  const inputPath = path.resolve(__dirname, "../data/spells.json");
  const outputPath = path.resolve(__dirname, "../data/spells-normalized.json");

  // Utilitário: gera ID a partir do nome
  function gerarId(name: string): string {
    return (
      "spell-" +
      kebabCase(name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );
  }

  // Utilitário: normaliza o campo components
  function normalizarComponentes(components: any): {
    types: string[];
    material?: string;
  } {
    const mapping: Record<string, string> = {
      v: "verbal",
      s: "somatic",
      m: "material",
    };

    const types: string[] = [];
    let material: string | undefined;

    if (components && typeof components === "object") {
      for (const [key, value] of Object.entries(components)) {
        if (key === "m") {
          types.push("material");
          if (typeof value === "string") {
            material = value;
          }
        } else if (value === true && mapping[key]) {
          types.push(mapping[key]);
        }
      }
    }

    return material ? { types, material } : { types };
  }

  // Função principal
  function transformarSpells() {
    const raw = fs.readFileSync(inputPath, "utf-8");
    const spells = JSON.parse(raw);

    const spellsAtualizadas = spells.map((spell: any) => {
      const novaSpell = { ...spell };

      // Garante que haja um ID
      if (!novaSpell.id && typeof novaSpell.name === "string") {
        novaSpell.id = gerarId(novaSpell.name);
      }

      // Transforma o campo components
      if (novaSpell.components) {
        novaSpell.components = normalizarComponentes(novaSpell.components);
      }

      return novaSpell;
    });

    fs.writeFileSync(
      outputPath,
      JSON.stringify(spellsAtualizadas, null, 2),
      "utf-8"
    );
    console.log("✅ Spells transformadas com sucesso!");
  }

  transformarSpells();
} catch (error) {
  console.error("Erro capturado no processamento:", error);
  process.exit(1);
}
