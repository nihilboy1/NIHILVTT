// Arquivo gerado automaticamente
export const species = [
  {
    name: "Elf (Zendikar)",
    source: "PSZ",
    size: ["M"],
    speed: 30,
    ability: [
      {
        wis: 2,
      },
    ],
    age: {
      mature: 100,
      max: 750,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        elvish: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/elf.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Keen Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws against being {@condition charmed}, and magic can't put you to sleep.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
        ],
      },
    ],
  },
  {
    name: "Goblin",
    source: "PSZ",
    otherSources: [
      {
        source: "PSX",
      },
    ],
    size: ["S"],
    speed: 25,
    age: {
      mature: 12,
      max: 50,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    resist: ["fire", "psychic"],
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Goblins mature faster than humans, reaching adulthood at around age 12. They also age noticeably faster than humans, and even the most cautious goblins rarely live longer than 50 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most goblins are wildly chaotic, though they have no particular inclination toward good or evil.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Goblins average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Human (Zendikar)",
    source: "PSZ",
    _copy: {
      name: "Human",
      source: "PHB",
      _mod: {
        entries: {
          mode: "replaceArr",
          replace: "Languages",
          items: {
            name: "Languages",
            entries: [
              "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: vampire curses, Elvish musical expressions, merfolk scholarly jargon, and so on.",
            ],
          },
        },
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
    soundClip: {
      type: "internal",
      path: "races/human.mp3",
    },
  },
  {
    name: "Kor",
    source: "PSZ",
    size: ["M"],
    speed: {
      walk: 30,
      climb: 30,
    },
    ability: [
      {
        dex: 2,
        wis: 1,
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    skillProficiencies: [
      {
        athletics: true,
        acrobatics: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Kor mature at the same rate as humans and live about as long.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most kor are lawful good, with a strong dedication to community and the traditions of their ancestors.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Kor average nearly 6 feet tall, but are much lighter and more slender than humans. Your size is Medium.",
        ],
      },
      {
        name: "Brave",
        entries: [
          "You have advantage on saving throws against being {@condition frightened}.",
        ],
      },
      {
        name: "Climbing",
        entries: [
          "You also have a climbing speed of 30 feet as long as you are not encumbered or wearing heavy armor.",
        ],
      },
      {
        name: "Kor Climbing",
        entries: [
          "You have proficiency in the {@skill Athletics} and {@skill Acrobatics} skills.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, and communicate in the silent speech of the Kor.",
        ],
      },
      {
        name: "Lucky",
        entries: [
          "When you roll a 1 on the {@dice d20} for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
        ],
      },
    ],
  },
  {
    name: "Merfolk",
    source: "PSZ",
    otherSources: [
      {
        source: "PSX",
      },
    ],
    size: ["M"],
    speed: {
      walk: 30,
      swim: 30,
    },
    ability: [
      {
        cha: 1,
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/merfolk.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Merfolk mature at the same rate humans do and reach adulthood around the age of 20. They live considerably longer than humans, though, often reaching well over 100 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most merfolk are neutral, though merfolk of the Emeria and Cosi creeds have chaotic leanings.",
        ],
      },
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Size",
        entries: [
          "Merfolk are about the same size and build as humans. Your size is Medium.",
        ],
      },
      {
        name: "Swimming",
        entries: ["You have a swimming speed of 30 feet."],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, Merfolk, and one extra language of your choice.",
        ],
      },
    ],
  },
  {
    name: "Vampire",
    source: "PSZ",
    otherSources: [
      {
        source: "PSX",
      },
    ],
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    resist: ["necrotic"],
    soundClip: {
      type: "internal",
      path: "races/vampire.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Vampires don't mature and age in the same way that other races do. Every living vampire is either a bloodchief, infected by Ulamog's influence in the distant reaches of history, or was spawned by a bloodchief from a living human. Most vampires are thus very old, but few have any memory of their earliest years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Vampires have no innate tendency toward evil, but consuming the life energy of other creatures often pushes them to that end. Regardless of their moral bent, the strict hierarchies of their bloodchiefs inclines them toward a lawful alignment.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Vampires are about the same size and build as humans. Your size is Medium.",
        ],
      },
      {
        name: "Blood Thirst",
        entries: [
          "You can drain blood and life energy from a willing creature, or one that is {@condition grappled} by you, {@condition incapacitated}, or {@condition restrained}. Make a melee attack against the target. If you hit, you deal 1 piercing damage and {@damage 1d6} necrotic damage. The target's hit point maximum is reduced by an amount equal to the necrotic damage taken, and you regain hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Vampire."],
      },
      {
        name: "Vampiric Resistance",
        entries: ["You have resistance to necrotic damage."],
      },
    ],
  },
];
