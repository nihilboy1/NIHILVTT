// Arquivo gerado automaticamente
export const species = [
  {
    name: "Aetherborn",
    source: "PSK",
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
        choose: {
          from: ["str", "dex", "con", "int", "wis"],
          count: 2,
        },
      },
    ],
    age: {
      mature: 0,
      max: 3,
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
        anyStandard: 2,
      },
    ],
    resist: ["necrotic"],
    entries: [
      {
        name: "Age",
        entries: [
          "Aetherborn come into being as adults and live no more than a few years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "As a rule, aetherborn are driven by hedonism and self-interest, making them neutral at best and thoroughly evil at worst. Neutral aetherborn might devote much of their time (and wealth) to parties and social activity, while evil aetherborn are usually involved in the criminal underworld.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Aetherborn are about the same size as humans, ranging from 5 to 6 feet tall. They are quite light—only about 100 pounds—and their weight diminishes as they age and more and more of their substance returns to the aethersphere. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Born of Aether",
        entries: ["You have resistance to necrotic damage."],
      },
      {
        name: "Menacing",
        entries: ["You have proficiency in the {@skill Intimidation} skill."],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and two other languages of your choice.",
        ],
      },
      {
        type: "inset",
        name: "Gift of the Aetherborn",
        entries: [
          'An unknown aetherborn, desperately seeking a means to extend their short life, discovered a process of transformation that prolonged their existence—by giving them the ability to feed on the life essence of other beings. Since then, other aetherborn have learned and carried out this monstrous transformation, and aetherborn with this "gift" have become a small minority among an already small population.',
          "A gifted aetherborn has the ability to drain the life essence of other beings. Similar to the way heat is transferred from a warm object to a cold one, a gifted aetherborn need only touch another living being with a clawed hand to draw life essence out, fueling their own continued existence while draining strength and vitality from their victim.",
          'For many aetherborn, living as they do for indulgence and instant gratification, the concepts of "want" and "need" are virtually synonymous. But Aetherborn with this gift understand what it is to truly need, for they develop a hunger for life essence that far exceeds any desires they might have felt before their transformation. A gifted aetherborn who abstains from this feeding deteriorates even more rapidly than other aetherborn, while enduring unspeakable agony caused by the deprivation of life energy.',
          'At the DM\'s option, an aetherborn character can research methods of achieving this dark "gift." The process is similar to inventing and manufacturing a rare magic item (see "{@book Inventing and Manufacturing Devices|PS-K|1|Inventing and Manufacturing Devices}" earlier in this document). But rather than aether, the process requires a variety of rare unguents and unusual ingredients that make up the cost of researching and undergoing the transformation.',
          "An aetherborn with this gift gains the Drain Life ability: a natural attack that deals {@damage 1d6} necrotic damage and restores the same number of hit points to the aetherborn. However, if the aetherborn goes for 7 days without dealing this damage, their hit point maximum is reduced by {@dice 1d6} per week. This reduction can't be removed until the aetherborn has used their Drain Life ability and completed a long rest.",
        ],
      },
    ],
    _versions: [
      {
        name: "Variant; Gifted Aetherborn",
        source: "PSK",
        _mod: {
          entries: {
            mode: "appendArr",
            items: {
              name: "Drain Life",
              entries: [
                "You gain a natural attack that deals {@damage 1d6} necrotic damage and restores the same number of hit points to you. However, if you goes for 7 days without dealing this damage, your hit point maximum is reduced by {@dice 1d6} per week. This reduction can't be removed until you have used your Drain Life ability and completed a long rest.",
              ],
            },
          },
        },
      },
    ],
  },
  {
    name: "Dwarf (Kaladesh)",
    source: "PSK",
    size: ["M"],
    speed: 25,
    ability: [
      {
        con: 2,
        wis: 1,
      },
    ],
    age: {
      mature: 50,
      max: 350,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        dwarvish: true,
      },
    ],
    toolProficiencies: [
      {
        anyArtisansTool: 2,
      },
    ],
    resist: ["poison"],
    soundClip: {
      type: "internal",
      path: "races/dwarf.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Dwarves mature at the same rate as humans, but they're considered young until they reach the age of 50. On average, they live about 350 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Dwarves stand around 5 feet tall and average about 150 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Speed",
        entries: [
          "Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground in your race's ancient past, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Dwarven Resilience",
        entries: [
          "You have advantage on saving throws against poison, and you have resistance against poison damage.",
        ],
      },
      {
        name: "Dwarven Toughness",
        entries: [
          "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
        ],
      },
      {
        name: "Artisan's Expertise",
        entries: [
          "You gain proficiency with two kinds of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} of your choice. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies. In addition, whenever you make an Intelligence ({@skill History}) check related to the origin of any architectural construction (including buildings, public works such as canals and aqueducts, and the massive cogwork that underlies much of the construction of Ghirapur), you are considered proficient in the {@skill History} skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and {@language Dwarvish}. {@language Dwarvish} is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
        ],
      },
    ],
  },
  {
    name: "Elf (Kaladesh)",
    source: "PSK",
    size: ["M"],
    speed: 30,
    ability: [
      {
        dex: 2,
        wis: 1,
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
    weaponProficiencies: [
      {
        "longsword|phb": true,
        "shortsword|phb": true,
        "shortbow|phb": true,
        "longbow|phb": true,
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
        name: "Elf Weapon Training",
        entries: [
          "You have proficiency with the {@item longsword|phb}, {@item shortsword|phb}, {@item shortbow|phb}, and {@item longbow|phb}.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws against being {@condition charmed}, and magic can't put you to sleep.",
        ],
      },
      {
        name: "Trance",
        entries: [
          'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.',
          "{@note If you meditate during a long rest, you finish the rest after only 4 hours. You otherwise obey all the rules for a long rest; only the duration is changed.}",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
        ],
      },
      {
        name: "Elf Culture",
        entries: [
          "The elves of Kaladesh don't organize themselves into nations or tribes. Still, they recognize three distinct cultural groups among their kind—though in truth these groupings are more like attitudes or alignments with regard to the rest of society and the use of technology. Choose one of these cultures.",
        ],
      },
    ],
  },
  {
    name: "Human (Kaladesh)",
    source: "PSK",
    _copy: {
      name: "Human",
      source: "PHB",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: ["Humans tend toward no particular alignment."],
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
                "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Dwarvish curses, Elvish musical expressions, {@race Vedalken|PSK} scholarly jargon, and so on.",
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
    soundClip: {
      type: "internal",
      path: "races/human.mp3",
    },
  },
  {
    name: "Vedalken",
    source: "PSK",
    size: ["M"],
    speed: 30,
    ability: [
      {
        int: 2,
        wis: 1,
      },
    ],
    age: {
      mature: 40,
      max: 500,
    },
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
          "Vedalken mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
        ],
      },
      {
        name: "Alignment",
        entries: ["Vedalken are most often lawful and rarely evil."],
      },
      {
        name: "Size",
        entries: [
          "Vedalken are taller than humans but more slender. They average 6 to 6½ feet tall, but usually weigh less than 200 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Vedalken. The Vedalken language is renowned for its technical treatises and its catalogs of knowledge about the natural world and the aether that pervades it.",
        ],
      },
      {
        name: "Vedalken Cunning",
        entries: [
          "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
        ],
      },
      {
        name: "Aether Lore",
        entries: [
          "Whenever you make an Intelligence ({@skill History}) check related to magic items or aether-powered technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
        ],
      },
    ],
  },
];
