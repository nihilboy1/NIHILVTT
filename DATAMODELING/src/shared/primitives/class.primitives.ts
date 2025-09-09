import z from "zod";

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
