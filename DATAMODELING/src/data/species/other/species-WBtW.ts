// Arquivo gerado automaticamente
export const species = [
  {
    name: "Fairy",
    source: "WBtW",
    reprintedAs: ["Fairy|MPMM"],
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["S"],
    speed: {
      walk: 30,
      fly: true,
    },
    additionalSpells: [
      {
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["druidcraft#c"],
        },
        innate: {
          "3": {
            daily: {
              "1": ["faerie fire"],
            },
          },
          "5": {
            daily: {
              "1": ["enlarge/reduce"],
            },
          },
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Flight",
        entries: [
          "Because of your wings, you have a flying speed equal to your walking speed. You can't use this flying speed if you're wearing medium or heavy armor.",
        ],
      },
      {
        name: "Fairy Magic",
        entries: [
          "You know the {@spell druidcraft} cantrip.",
          "Starting at 3rd level, you can cast the {@spell faerie fire} spell with this trait. Starting at 5th level, you can also cast the {@spell enlarge/reduce} spell with this trait. Once you cast {@spell faerie fire} or {@spell enlarge/reduce} with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
    ],
  },
  {
    name: "Harengon",
    source: "WBtW",
    reprintedAs: ["Harengon|MPMM"],
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Hare-Trigger",
        entries: [
          "You can add your proficiency bonus to your initiative rolls.",
        ],
      },
      {
        name: "Leporine Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Lucky Footwork",
        entries: [
          "When you fail a Dexterity saving throw, you can use your reaction to roll a {@dice d4} and add it to the save, potentially turning the failure into a success. You can't use this reaction if you're {@condition prone} or your speed is 0.",
        ],
      },
      {
        name: "Rabbit Hop",
        entries: [
          "As a bonus action, you can jump a number of feet equal to five times your proficiency bonus, without provoking opportunity attacks. You can use this trait only if your speed is greater than 0. You can use it a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
];
