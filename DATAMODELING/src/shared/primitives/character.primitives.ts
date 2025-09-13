import z from "zod";

export const AncestryNameEnum = z.enum([
  "human",
  "elf",
  "dwarf",
  "halfling",
  "gnome",
  "dragonborn",
  "tiefling",
  "aasimar",
  "goliath",
  "orc",
]);

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

export const CharacterTypeEnum = z.enum(['Player', 'NPC', 'Object']);


export const ProficiencyLevelEnum = z.enum(['none', 'proficient', 'expertise']);


export const CreatureSizeEnum = z.enum([
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
]);

export const LanguageEnum = z.enum([
  "common",
  "dwarvish",
  "elvish",
  "giant",
  "gnomish",
  "goblin",
  "halfling",
  "orc",
  "abyssal",
  "celestial",
  "draconic",
  "deepSpeech",
  "infernal",
  "primordial",
  "sylvan",
  "undercommon",
  "aquan",
  "auran",
  "ignan",
  "terran",
  "druidic",
  "thievesCant",
  "telepathy",
  "giantEagle",
  "giantOwl",
  "modron",
  "blinkDog",
  "sphinx",
  "gnoll",
  "grimlock",
  "kuoToa",
  "lizardfolk",
  "minotaur",
  "sahuagin",
  "troglodyte",
  "yeti",
  "worg",
  "aarakocra",
  "bullywug",
  "gith",
  "githyanki",
  "githzerai",
  "grung",
  "merfolk",
  "merrow",
  "myconid",
  "ogre",
  "quaggoth",
  "tabaxi",
  "thriKreen",
  "umberHulk",
  "vegepygmy",
  "yuanTi",
  "kobold",
  "eladrin",
  "quori",
  "slaad",
  "troll",
  "vampire",
  "willOWisp",
]);

export const AbilityScoreEnum = z.enum([
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
]);

export const SkillEnum = z.enum([
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
]);

export const AlignmentEnum = z.enum([
  "lawfulGood",
  "neutralGood",
  "chaoticGood",
  "lawfulNeutral",
  "trueNeutral",
  "chaoticNeutral",
  "lawfulEvil",
  "neutralEvil",
  "chaoticEvil",
  "unaligned",
]);

export const VisionTypeEnum = z.enum([
  "darkvision",
  "blindsight",
  "tremorsense",
  "truesight",
]);

export const FeatCategoryEnum = z.enum([
  "general",
  "fightingStyle",
  "origin",
  "epicBoon",
]);

export const DispositionEnum = z.enum(["friendly", "neutral", "hostile"]);
