import { Spell } from "../../domain/spell/spell.schema";
import { spellsLevel0 } from "./spells-level-0";
import { spellsLevel1 } from "./spells-level-1";

export const PHB2024SPELLS = [
  ...spellsLevel0,
  ...spellsLevel1,
] as const satisfies Spell[];
