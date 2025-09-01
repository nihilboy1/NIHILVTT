// Arquivo gerado automaticamente
export const species = [
  {
    name: "Human (Ixalan)",
    source: "PSX",
    _copy: {
      name: "Human",
      source: "PHB",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: [
                "Humans tend toward no particular alignment. The best and the worst are found among them.",
              ],
            },
          },
          {
            mode: "appendArr",
            items: {
              name: "Speed",
              entries: ["Your base walking speed is 30 feet."],
            },
          },
          {
            mode: "replaceArr",
            replace: "Languages",
            items: {
              name: "Languages",
              entries: [
                "You can speak, read, and write {@language Common} and one extra language of your choice. Or, if your campaign uses the optional rules for languages found in the previous section, your national origin determines your native language: {@language Itzocan|PSX} for the Sun Empire, {@language Coalition pidgin|PSX} for the Brazen Coalition, or {@language Vampire|PSX} for the Legion of Dusk. You still speak one additional language of your choice, and {@language Common Trade Pidgin|PSX|Common} if it exists in your campaign.",
              ],
            },
          },
        ],
      },
    },
    ability: [
      {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
      {
        common: true,
        other: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/human.mp3",
    },
  },
  {
    name: "Orc (Ixalan)",
    source: "PSX",
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 1,
      },
    ],
    age: {
      mature: 14,
      max: 75,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        intimidation: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        orc: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/orc.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most orcs lean toward chaotic alignments, and many serve on pirate ships that encourage an inclination toward evil.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Orcs average over 6 feet in height, and they have strong, stocky builds. Your size is Medium.",
        ],
      },
      {
        name: "Menacing",
        entries: ["You gain proficiency in the {@skill Intimidation} skill."],
      },
      {
        name: "Relentless Endurance",
        entries: [
          "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
        ],
      },
      {
        name: "Savage Attacks",
        entries: [
          "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write {@language Common Trade Pidgin|PSX|Common} (if it exists in your campaign) and {@language Orc|PHB}.",
        ],
      },
    ],
  },
  {
    name: "Siren",
    source: "PSX",
    size: ["M"],
    speed: {
      walk: 25,
      fly: 30,
    },
    ability: [
      {
        cha: 2,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    additionalSpells: [
      {
        known: {
          "1": ["friends#c"],
        },
      },
    ],
    entries: [
      {
        name: "Alignment",
        entries: [
          "Most sirens lean toward chaotic alignment, cherishing the freedom and independence that comes from joining a pirate crew.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Sirens stand about 5 to 6 feet tall, but their bodies are slender and their bones partially hollow to facilitate their flight. Your size is Medium.",
        ],
      },
      {
        name: "Siren's Song",
        entries: [
          "You know the {@spell friends} cantrip and can cast it without material components.",
        ],
      },
      {
        name: "Flight",
        entries: [
          "You have a flying speed of 30 feet. You can't use your flying speed while you wear medium or heavy armor. (If your campaign uses the variant rule for {@variantrule encumbrance|PHB}, you can't use your flying speed if you are encumbered.)",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write {@language Common Trade Pidgin|PSX|Common} (if it exists in your campaign) and {@language Siren|PSX}.",
        ],
      },
    ],
  },
];
