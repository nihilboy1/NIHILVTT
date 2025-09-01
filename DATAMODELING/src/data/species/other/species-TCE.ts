// Arquivo gerado automaticamente
export const species = [
  {
    name: "Custom Lineage",
    source: "TCE",
    lineage: true,
    size: ["S", "M"],
    speed: 30,
    ability: [
      {
        choose: {
          from: ["str", "dex", "con", "int", "wis", "cha"],
          amount: 2,
        },
      },
    ],
    darkvision: 60,
    feats: [
      {
        any: 1,
      },
    ],
    skillProficiencies: [
      {
        any: 1,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
    ],
    entries: [
      "Instead of choosing one of the game's races for your character at 1st level, you can use the following traits to represent your character's lineage, giving you full control over how your character's origin shaped them:",
      {
        name: "Creature Type",
        entries: [
          "You are a humanoid. You determine your appearance and whether you resemble any of your kin.",
        ],
      },
      {
        name: "Size",
        entries: ["You are Small or Medium (your choice)."],
      },
      {
        name: "Feat",
        entries: [
          "You gain one {@5etools feat|feats.html} of your choice for which you qualify.",
        ],
      },
      {
        name: "Variable Trait",
        entries: [
          "You gain one of the following options of your choice: (a) {@sense darkvision} with a range of 60 feet or (b) proficiency in one skill of your choice.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and one other language that you and your DM agree is appropriate for your character.",
        ],
      },
      "Your race is considered to be a Custom Lineage for any game feature that requires a certain race, such as elf or dwarf.",
    ],
    _versions: [
      {
        name: "Custom Lineage; Darkvision",
        source: "TCE",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Variable Trait",
            items: {
              name: "Variable Trait; Darkvision",
              entries: [
                "You gain {@sense darkvision} with a range of 60 feet.",
              ],
            },
          },
        },
        skillProficiencies: null,
      },
      {
        name: "Custom Lineage; Skill Proficiency",
        source: "TCE",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Variable Trait",
            items: {
              name: "Variable Trait; Skill Proficiency",
              entries: ["You gain proficiency in one skill of your choice."],
            },
          },
        },
        darkvision: null,
      },
    ],
  },
];
