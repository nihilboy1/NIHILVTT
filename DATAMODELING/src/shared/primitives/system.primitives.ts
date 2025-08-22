import z from "zod";

export const SourceEnum = z.enum(["LDJ2024", "MM2024"]);

export const CreatureTypeEnum = z.enum([
  "aberration",
  "beast",
  "celestial",
  "construct",
  "dragon",
  "elemental",
  "fey",
  "fiend",
  "giant",
  "humanoid",
  "monstrosity",
  "ooze",
  "plant",
  "undead",
]);

export const ChallengeRatingEnum = z.enum([
  "0",
  "1/8",
  "1/4",
  "1/2",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
]);

export const CreatureSizeEnum = z.enum([
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
]);

export const BaseConditionEnum = z.enum([
  "blinded",
  "charmed",
  "deafened",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "exhausted",
  "restrained",
  "stunned",
  "unconscious",
]);

export const SystemStatusEnum = z.enum([
  "flammable",
  "wet",
  "frozen",
  "burning",
  "lightlyObscured",
  "heavilyObscured",
]);

// União de condições e status do sistema.
export const ConditionStatusEnum = z.union([
  BaseConditionEnum,
  SystemStatusEnum,
]);
