// ============================================================================
// PRIMITIVOS DE PERSONAGEM
// Proposta: Mover para 'character.primitives.ts'
// ============================================================================

import z from "zod";

export const AncestryIdEnum = z.enum([
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

export const CreatureSizeEnum = z.enum([
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
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
  "restrained",
  "stunned",
  "unconscious",
]);

export const SystemStatusEnum = z.enum([
  "flammable",
  "wet",
  "hasZeroHp",
  "frozen",
  "burning",
  "hostile",
  "movementStopped",
  "lightlyObscured", // Adicionado
  "heavilyObscured", // Adicionado
]);

// União de condições e status do sistema.
export const ConditionStatusEnum = z.union([
  BaseConditionEnum,
  SystemStatusEnum,
]);
export type ConditionStatus = z.infer<typeof ConditionStatusEnum>;
