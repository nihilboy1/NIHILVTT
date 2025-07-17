export const ATTRIBUTES_CONFIG = {
  strength: {
    label: "Força",
    skills: [{ key: "athletics", label: "Atletismo" }],
  },
  dexterity: {
    label: "Destreza",
    skills: [
      { key: "acrobatics", label: "Acrobacia" },
      { key: "sleightOfHand", label: "Prestidigitação" },
      { key: "stealth", label: "Furtividade" },
    ],
  },
  constitution: { label: "Constituição", skills: [] },
  intelligence: {
    label: "Inteligência",
    skills: [
      { key: "arcana", label: "Arcanismo" },
      { key: "history", label: "História" },
      { key: "investigation", label: "Investigação" },
      { key: "nature", label: "Natureza" },
      { key: "religion", label: "Religião" },
    ],
  },
  wisdom: {
    label: "Sabedoria",
    skills: [
      { key: "animalHandling", label: "Adestrar Animais" },
      { key: "insight", label: "Intuição" },
      { key: "medicine", label: "Medicina" },
      { key: "perception", label: "Percepção" },
      { key: "survival", label: "Sobrevivência" },
    ],
  },
  charisma: {
    label: "Carisma",
    skills: [
      { key: "deception", label: "Enganação" },
      { key: "intimidation", label: "Intimidação" },
      { key: "performance", label: "Atuação" },
      { key: "persuasion", label: "Persuasão" },
    ],
  },
} as const;
