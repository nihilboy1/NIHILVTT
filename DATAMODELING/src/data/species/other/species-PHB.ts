// Arquivo gerado automaticamente
export const species = [
  {
    name: "Dragonborn",
    source: "PHB",
    srd: true,
    reprintedAs: ["Dragonborn|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        cha: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 66,
      heightMod: "2d8",
      baseWeight: 175,
      weightMod: "2d6",
    },
    age: {
      mature: 15,
      max: 80,
    },
    languageProficiencies: [
      {
        common: true,
        draconic: true,
      },
    ],
    resist: [
      {
        choose: {
          from: ["acid", "cold", "fire", "lightning", "poison"],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/dragonborn.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Draconic Ancestry",
        entries: [
          "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
          {
            type: "table",
            caption: "Draconic Ancestry",
            colLabels: ["Dragon", "Damage Type", "Breath Weapon"],
            colStyles: ["col-3 text-center", "col-3 text-center", "col-6"],
            rows: [
              ["Black", "Acid", "5 by 30 ft. line (Dex. save)"],
              ["Blue", "Lightning", "5 by 30 ft. line (Dex. save)"],
              ["Brass", "Fire", "5 by 30 ft. line (Dex. save)"],
              ["Bronze", "Lightning", "5 by 30 ft. line (Dex. save)"],
              ["Copper", "Acid", "5 by 30 ft. line (Dex. save)"],
              ["Gold", "Fire", "15 ft. cone (Dex. save)"],
              ["Green", "Poison", "15 ft. cone (Con. save)"],
              ["Red", "Fire", "15 ft. cone (Dex. save)"],
              ["Silver", "Cold", "15 ft. cone (Con. save)"],
              ["White", "Cold", "15 ft. cone (Con. save)"],
            ],
          },
        ],
      },
      {
        name: "Breath Weapon",
        entries: [
          "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.",
          "When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes {@damage 2d6} damage on a failed save, and half as much damage on a successful one. The damage increases to {@damage 3d6} at 6th level, {@damage 4d6} at 11th level, and {@damage 5d6} at 16th level.",
          "After you use your breath weapon, you can't use it again until you complete a short or long rest.",
        ],
      },
      {
        name: "Damage Resistance",
        entries: [
          "You have resistance to the damage type associated with your draconic ancestry.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
        ],
      },
    ],
  },
  {
    name: "Dwarf",
    source: "PHB",
    srd: true,
    basicRules: true,
    reprintedAs: ["Dwarf|XPHB"],
    size: ["M"],
    speed: 25,
    ability: [
      {
        con: 2,
      },
    ],
    age: {
      mature: 20,
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
        choose: {
          from: ["smith's tools", "brewer's supplies", "mason's tools"],
        },
      },
    ],
    weaponProficiencies: [
      {
        "battleaxe|phb": true,
        "handaxe|phb": true,
        "light hammer|phb": true,
        "warhammer|phb": true,
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
        name: "Size",
        entries: [
          "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Speed",
        entries: ["Your speed is not reduced by wearing heavy armor."],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Dwarven Resilience",
        entries: [
          "You have advantage on saving throws against poison, and you have resistance against poison damage.",
        ],
      },
      {
        name: "Dwarven Combat Training",
        entries: [
          "You have proficiency with the {@item battleaxe|phb}, {@item handaxe|phb}, {@item light hammer|phb}, and {@item warhammer|phb}.",
        ],
      },
      {
        name: "Tool Proficiency",
        entries: [
          "You gain proficiency with the artisan's tools of your choice: {@item Smith's tools|phb}, {@item brewer's supplies|phb}, or {@item mason's tools|phb}.",
        ],
      },
      {
        name: "Stonecunning",
        entries: [
          "Whenever you make an Intelligence ({@skill History}) check related to the origin of stonework, you are considered proficient in the {@skill History} skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
        ],
      },
    ],
  },
  {
    name: "Elf",
    source: "PHB",
    srd: true,
    basicRules: true,
    reprintedAs: ["Elf|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        dex: 2,
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
    ],
  },
  {
    name: "Gnome",
    source: "PHB",
    srd: true,
    reprintedAs: ["Gnome|XPHB"],
    size: ["S"],
    speed: 25,
    ability: [
      {
        int: 2,
      },
    ],
    heightAndWeight: {
      baseHeight: 35,
      heightMod: "2d4",
      baseWeight: 35,
    },
    age: {
      mature: 40,
      max: 500,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        gnomish: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/gnome.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Gnome Cunning",
        entries: [
          "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.",
        ],
      },
    ],
  },
  {
    name: "Half-Elf",
    source: "PHB",
    srd: true,
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
    heightAndWeight: {
      baseHeight: 57,
      heightMod: "2d8",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 180,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        any: 2,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        elvish: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/half-elf.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws against being {@condition charmed}, and magic can't put you to sleep.",
        ],
      },
      {
        name: "Skill Versatility",
        entries: ["You gain proficiency in two skills of your choice."],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
        ],
      },
    ],
  },
  {
    name: "Half-Orc",
    source: "PHB",
    srd: true,
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 58,
      heightMod: "2d10",
      baseWeight: 140,
      weightMod: "2d6",
    },
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
      path: "races/half-orc.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
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
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.",
        ],
      },
    ],
  },
  {
    name: "Halfling",
    source: "PHB",
    srd: true,
    basicRules: true,
    reprintedAs: ["Halfling|XPHB"],
    size: ["S"],
    speed: 25,
    ability: [
      {
        dex: 2,
      },
    ],
    heightAndWeight: {
      baseHeight: 31,
      heightMod: "2d4",
      baseWeight: 35,
    },
    age: {
      mature: 20,
      max: 250,
    },
    languageProficiencies: [
      {
        common: true,
        halfling: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/halfling.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
        ],
      },
      {
        name: "Lucky",
        entries: [
          "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
        ],
      },
      {
        name: "Brave",
        entries: [
          "You have advantage on saving throws against being {@condition frightened}.",
        ],
      },
      {
        name: "Halfling Nimbleness",
        entries: [
          "You can move through the space of any creature that is of a size larger than yours.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Halfling. The Halfling language isn't secret, but halflings are loath to share it with others. They write very little, so they don't have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.",
        ],
      },
    ],
  },
  {
    name: "Human",
    source: "PHB",
    srd: true,
    basicRules: true,
    reprintedAs: ["Human|XPHB"],
    size: ["M"],
    speed: 30,
    heightAndWeight: {
      baseHeight: 56,
      heightMod: "2d10",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/human.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Humans reach adulthood in their late teens and live less than a century.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
        ],
      },
    ],
  },
  {
    name: "Tiefling",
    source: "PHB",
    srd: true,
    reprintedAs: ["Tiefling|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
        int: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 57,
      heightMod: "2d8",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        infernal: true,
      },
    ],
    resist: ["fire"],
    soundClip: {
      type: "internal",
      path: "races/tiefling.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["hellish rebuke#2"],
            },
          },
          "5": {
            daily: {
              "1": ["darkness"],
            },
          },
        },
        ability: "cha",
        known: {
          "1": ["thaumaturgy#c"],
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Tieflings mature at the same rate as humans but live a few years longer.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Tieflings are about the same size and build as humans. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Hellish Resistance",
        entries: ["You have resistance to fire damage."],
      },
      {
        name: "Infernal Legacy",
        entries: [
          "You know the {@spell thaumaturgy} cantrip. Once you reach 3rd level, you can cast the {@spell hellish rebuke} spell as a 2nd-level spell with this trait; you regain the ability to cast it when you finish a long rest. Once you reach 5th level, you can also cast the {@spell darkness} spell once per day with this trait; you regain the ability to cast it when you finish a long rest. Charisma is your spellcasting ability for these spells.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Infernal."],
      },
    ],
  },
];
