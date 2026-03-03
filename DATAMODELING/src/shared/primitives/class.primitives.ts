import z from "zod";

export const ClassIdEnum = z.enum([
  "class-paladin",
  "class-rogue",
  "class-wizard",
  "class-fighter",
  "class-barbarian",
  "class-monk",
  "class-cleric",
  "class-druid",
  "class-ranger",
  "class-sorcerer",
  "class-warlock",
  "class-bard",
]);

// Logical class keys retained while parts of the catalog still reference class slugs
// in rules and progression structures.
export const ClassesIdEnum = z.enum([
  "paladin",
  "rogue",
  "wizard",
  "fighter",
  "barbarian",
  "monk",
  "cleric",
  "druid",
  "ranger",
  "sorcerer",
  "warlock",
  "bard",
]);

export const FighterResourcesIdEnum = z.enum(["resource-secondWind"]);

export const ClassResourceIdEnum = z.union([FighterResourcesIdEnum]);
