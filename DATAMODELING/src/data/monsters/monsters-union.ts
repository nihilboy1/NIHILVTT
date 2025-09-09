import { MonsterType } from "../../domain/monster/monster.schema";
import { monstersCR0 } from "./monsters-cr-0";
import { monstersCR1Over2 } from "./monsters-cr-1Over2";

export const PHB2024MONSTERS = [
  ...monstersCR0,
  ...monstersCR1Over2,
] as const satisfies MonsterType[];
