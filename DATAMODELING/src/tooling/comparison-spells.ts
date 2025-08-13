import { spellsLevel0 } from "../data/spells/spells-level-0";
import { spellsLevel1 } from "../data/spells/spells-level-1";

const listX0 = spellsLevel0.map((spell) => spell.name[1]);
const listX1 = spellsLevel1.map((spell) => spell.name[1]);

const missingSpells = listX0.filter((spellName) => !listX1.includes(spellName));

if (missingSpells.length === 0) {
  console.log("X1 possui todas as magias de X0.");
} else {
  console.log("As seguintes magias de X0 não foram encontradas em X1:");
  missingSpells.forEach((spellName) => console.log(`- ${spellName}`));
}
