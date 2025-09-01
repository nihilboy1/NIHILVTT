// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_1_8 = [
  {
    name: "Bandit",
    source: "XMM",
    page: 27,
    otherSources: [
      {
        source: "BQGT",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 12,
    con: 12,
    int: 10,
    wis: 10,
    cha: 10,
    passive: 10,
    languages: ["Common", "Thieves' cant"],
    cr: 0.125,
    gear: ["leather armor|xphb", "light crossbow|xphb", "scimitar|xphb"],
    action: [
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Light Crossbow",
        entries: [
          "{@atkr r} {@hit 3}, range 80/320 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/bandit.mp3",
    },
    languageTags: ["C", "TC"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Blood Hawk",
    source: "XMM",
    page: 350,
    size: ["S"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 7,
      formula: "2d6",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 6,
    dex: 14,
    con: 10,
    int: 3,
    wis: 14,
    cha: 5,
    skill: {
      perception: "+6",
    },
    passive: 16,
    cr: 0.125,
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The hawk has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the hawk's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage, or 6 ({@damage 1d8 + 2}) Piercing damage if the target is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: [
      "arctic",
      "coastal",
      "forest",
      "grassland",
      "hill",
      "mountain",
    ],
    soundClip: {
      type: "internal",
      path: "bestiary/blood-hawk.mp3",
    },
    traitTags: ["Pack Tactics"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Camel",
    source: "XMM",
    page: 351,
    otherSources: [
      {
        source: "XPHB",
        page: 347,
      },
      {
        source: "HBTD",
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 17,
      formula: "2d10 + 6",
    },
    speed: {
      walk: 50,
    },
    str: 15,
    dex: 8,
    con: 17,
    int: 2,
    wis: 11,
    cha: 5,
    save: {
      con: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    cr: 0.125,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["desert"],
    soundClip: {
      type: "internal",
      path: "bestiary/camel.mp3",
    },
    senseTags: ["D"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Cultist",
    source: "XMM",
    page: 84,
    otherSources: [
      {
        source: "ScoEE",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 9,
      formula: "2d8",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 12,
    con: 10,
    int: 10,
    wis: 11,
    cha: 10,
    save: {
      wis: "+2",
    },
    skill: {
      deception: "+2",
      religion: "+2",
    },
    passive: 10,
    languages: ["Common"],
    cr: 0.125,
    gear: ["leather armor|xphb", "sickle|xphb"],
    action: [
      {
        name: "Ritual Sickle",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}3 ({@damage 1d4 + 1}) Slashing damage plus 1 Necrotic damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/cultist.mp3",
    },
    languageTags: ["C"],
    damageTags: ["N", "S"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Flumph",
    source: "XMM",
    page: 122,
    size: ["S"],
    type: "aberration",
    alignment: ["L", "G"],
    ac: [12],
    hp: {
      average: 7,
      formula: "2d6",
    },
    speed: {
      walk: 5,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 6,
    dex: 15,
    con: 10,
    int: 14,
    wis: 14,
    cha: 11,
    skill: {
      arcana: "+4",
      history: "+4",
      religion: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    vulnerable: ["psychic"],
    languages: ["understands Undercommon but can't speak; telepathy 60 ft."],
    cr: 0.125,
    trait: [
      {
        name: "Advanced Telepathy",
        entries: [
          "The flumph perceives the content of any telepathic communication within 60 feet of it.",
        ],
      },
      {
        name: "Prone Deficiency",
        entries: [
          "If the flumph receives the {@condition Prone|XPHB} condition, roll a die. On an odd number, it has the {@condition Incapacitated|XPHB} condition. At the end of each of its turns, the flumph makes a {@dc 10} Dexterity saving throw, ending the {@condition Incapacitated|XPHB} condition on a success.",
        ],
      },
      {
        name: "Telepathic Shroud",
        entries: [
          "The flumph's thoughts can't be read by any means, and magic can't detect its location or observe it remotely.",
        ],
      },
    ],
    action: [
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 feet. {@h}4 ({@damage 1d4 + 2}) Acid damage.",
        ],
      },
      {
        name: "Stench Spray (1/Day)",
        entries: [
          "{@actSave dex} {@dc 10}, one creature the flumph can see within 15 feet. {@actSaveFail} The target is coated in a foul-smelling liquid, exudes a stench for {@dice 1d4} hours, and has the {@condition Poisoned|XPHB} condition while the stench lasts. Other creatures have the {@condition Poisoned|XPHB} condition while in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the coated target. The target can remove the stench on itself if it bathes during a {@variantrule Short Rest|XPHB|Short} or {@variantrule Long Rest|XPHB}.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/flumph.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Tentacles"],
    languageTags: ["CS", "TP", "U"],
    damageTags: ["A"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "poisoned"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Flying Snake",
    source: "XMM",
    page: 353,
    size: ["T"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 5,
      formula: "2d4",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
    },
    str: 4,
    dex: 15,
    con: 11,
    int: 2,
    wis: 12,
    cha: 5,
    senses: ["blindsight 10 ft."],
    passive: 11,
    cr: 0.125,
    trait: [
      {
        name: "Flyby",
        entries: [
          "The snake doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}1 Piercing damage plus 5 ({@damage 2d4}) Poison damage.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/flying-snake.mp3",
    },
    traitTags: ["Flyby"],
    senseTags: ["B"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Crab",
    source: "XMM",
    page: 356,
    otherSources: [
      {
        source: "XPHB",
        page: 350,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 13,
      formula: "3d8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 13,
    dex: 13,
    con: 11,
    int: 1,
    wis: 9,
    cha: 3,
    skill: {
      stealth: "+3",
    },
    senses: ["blindsight 30 ft."],
    passive: 9,
    cr: 0.125,
    trait: [
      {
        name: "Amphibious",
        entries: ["The crab can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 11}) from one of two claws.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-crab.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Giant Rat",
    source: "XMM",
    page: 358,
    size: ["S"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 7,
      formula: "2d6",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 7,
    dex: 16,
    con: 11,
    int: 2,
    wis: 10,
    cha: 4,
    save: {
      dex: "+5",
    },
    skill: {
      perception: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    cr: 0.125,
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The rat has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the rat's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 feet. {@h}5 ({@damage 1d4 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest", "swamp", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-rat.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Weasel",
    source: "XMM",
    page: 361,
    otherSources: [
      {
        source: "XPHB",
        page: 351,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 9,
      formula: "2d8",
    },
    speed: {
      walk: 40,
      climb: 30,
    },
    str: 11,
    dex: 17,
    con: 10,
    int: 4,
    wis: 12,
    cha: 5,
    skill: {
      acrobatics: "+5",
      perception: "+3",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: 0.125,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-weasel.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Goblin Minion",
    group: ["Goblinoids"],
    source: "XMM",
    page: 142,
    size: ["S"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "N"],
    ac: [12],
    hp: {
      average: 7,
      formula: "2d6",
    },
    speed: {
      walk: 30,
    },
    str: 8,
    dex: 15,
    con: 10,
    int: 10,
    wis: 8,
    cha: 8,
    skill: {
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 9,
    languages: ["Common", "Goblin"],
    cr: 0.125,
    gear: [
      {
        item: "dagger|xphb",
        quantity: 3,
      },
    ],
    action: [
      {
        name: "Dagger",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 20/60 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Nimble Escape",
        entries: ["The goblin takes the Disengage or Hide action."],
      },
    ],
    environment: [
      "forest",
      "grassland",
      "hill",
      "planar, acheron",
      "planar, feywild",
      "underdark",
    ],
    treasure: ["implements", "individual"],
    senseTags: ["D"],
    languageTags: ["C", "GO"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Guard",
    source: "XMM",
    page: 162,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
    },
    str: 13,
    dex: 12,
    con: 12,
    int: 10,
    wis: 11,
    cha: 10,
    skill: {
      perception: "+2",
    },
    passive: 12,
    languages: ["Common"],
    cr: 0.125,
    gear: ["chain shirt|xphb", "shield|xphb", "spear|xphb"],
    action: [
      {
        name: "Spear",
        entries: [
          "{@atkr m,r} {@hit 3}, reach 5 ft. or range 20/60 ft. {@h}4 ({@damage 1d6 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/guard.mp3",
    },
    languageTags: ["C"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Kobold Warrior",
    source: "XMM",
    page: 185,
    size: ["S"],
    type: "dragon",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 7,
      formula: "3d6 - 3",
    },
    speed: {
      walk: 30,
    },
    str: 7,
    dex: 15,
    con: 9,
    int: 8,
    wis: 7,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 8,
    languages: ["Common", "Draconic"],
    cr: 0.125,
    gear: [
      {
        item: "dagger|xphb",
        quantity: 3,
      },
    ],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The kobold has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the kobold has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Dagger",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 20/60 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: [
      "arctic",
      "coastal",
      "desert",
      "forest",
      "hill",
      "mountain",
      "swamp",
      "underdark",
      "urban",
    ],
    treasure: ["armaments"],
    traitTags: ["Pack Tactics", "Sunlight Sensitivity"],
    senseTags: ["D"],
    languageTags: ["C", "DR"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Manes",
    group: ["Demons"],
    source: "XMM",
    page: 201,
    size: ["S"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [9],
    hp: {
      average: 9,
      formula: "2d6 + 2",
    },
    speed: {
      walk: 20,
    },
    str: 10,
    dex: 9,
    con: 13,
    int: 3,
    wis: 8,
    cha: 4,
    senses: ["darkvision 60 ft."],
    passive: 9,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["charmed", "frightened", "poisoned"],
    languages: ["understands Abyssal but can't speak"],
    cr: 0.125,
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 2}, reach 5 ft. {@h}5 ({@damage 2d4}) Slashing damage.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    soundClip: {
      type: "internal",
      path: "bestiary/manes.mp3",
    },
    senseTags: ["D"],
    languageTags: ["AB", "CS"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Mastiff",
    source: "XMM",
    page: 365,
    otherSources: [
      {
        source: "XPHB",
        page: 353,
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 5,
      formula: "1d8 + 1",
    },
    speed: {
      walk: 40,
    },
    str: 13,
    dex: 14,
    con: 12,
    int: 3,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: 0.125,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "hill", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/mastiff.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Merfolk Skirmisher",
    source: "XMM",
    page: 209,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [11],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 10,
      swim: 40,
    },
    str: 10,
    dex: 13,
    con: 12,
    int: 11,
    wis: 14,
    cha: 12,
    passive: 12,
    languages: ["Common", "Primordial (Aquan)"],
    cr: 0.125,
    trait: [
      {
        name: "Amphibious",
        entries: ["The merfolk can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Ocean Spear",
        entries: [
          "{@atkr m,r} {@hit 2}, reach 5 ft. or range 20/60 ft. {@h}3 ({@damage 1d6}) Piercing damage plus 2 ({@damage 1d4}) Cold damage. If the target is a creature, its {@variantrule Speed|XPHB} decreases by 10 feet until the end of its next turn. {@hom}The spear magically returns to the merfolk's hand immediately after a ranged attack.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["individual"],
    traitTags: ["Amphibious"],
    languageTags: ["AQ", "C", "P"],
    damageTags: ["C", "P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Modron Monodrone",
    source: "XMM",
    page: 216,
    size: ["M"],
    type: "construct",
    alignment: ["L", "N"],
    ac: [15],
    hp: {
      average: 5,
      formula: "1d8 + 1",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 10,
    dex: 14,
    con: 12,
    int: 4,
    wis: 10,
    cha: 5,
    senses: ["truesight 120 ft."],
    passive: 10,
    conditionImmune: ["charmed"],
    languages: ["Modron"],
    cr: 0.125,
    trait: [
      {
        name: "Disintegration",
        entries: [
          "If the modron dies, it disintegrates into dust, leaving behind anything it was wearing or carrying.",
        ],
      },
    ],
    action: [
      {
        name: "Gear",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Force damage.",
        ],
      },
      {
        name: "Gear Flinger",
        entries: [
          "{@atkr r} {@hit 4}, range 120 ft. {@h}6 ({@damage 1d8 + 2}) Force damage.",
        ],
      },
    ],
    environment: ["planar, mechanus"],
    senseTags: ["U"],
    languageTags: ["OTH"],
    damageTags: ["O"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Mule",
    source: "XMM",
    page: 365,
    otherSources: [
      {
        source: "XPHB",
        page: 353,
      },
      {
        source: "HBTD",
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 40,
    },
    str: 14,
    dex: 10,
    con: 13,
    int: 2,
    wis: 10,
    cha: 5,
    save: {
      str: "+4",
    },
    passive: 10,
    cr: 0.125,
    trait: [
      {
        name: "Beast of Burden",
        entries: [
          "The mule counts as one size larger for the purpose of determining its carrying capacity.",
        ],
      },
    ],
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["desert", "hill", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/mule.mp3",
    },
    traitTags: ["Beast of Burden"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Noble",
    source: "XMM",
    page: 227,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 9,
      formula: "2d8",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 12,
    con: 11,
    int: 12,
    wis: 14,
    cha: 16,
    skill: {
      deception: "+5",
      insight: "+4",
      persuasion: "+5",
    },
    passive: 12,
    languages: ["Common plus two other languages"],
    cr: 0.125,
    gear: ["breastplate|xphb", "rapier|xphb"],
    action: [
      {
        name: "Rapier",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The noble is hit by a melee attack roll while holding a weapon. {@actResponse} The noble adds 2 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/noble.mp3",
    },
    actionTags: ["Parry"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Pony",
    source: "XMM",
    page: 367,
    otherSources: [
      {
        source: "XPHB",
        page: 354,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 40,
    },
    str: 15,
    dex: 10,
    con: 13,
    int: 2,
    wis: 11,
    cha: 7,
    save: {
      str: "+4",
    },
    passive: 10,
    cr: 0.125,
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["grassland", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/pony.mp3",
    },
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Slaad Tadpole",
    source: "XMM",
    page: 284,
    otherSources: [
      {
        source: "XPHB",
        page: 357,
      },
    ],
    size: ["T"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [12],
    hp: {
      average: 7,
      formula: "3d4",
    },
    speed: {
      walk: 30,
      burrow: 10,
    },
    str: 7,
    dex: 15,
    con: 10,
    int: 3,
    wis: 5,
    cha: 3,
    skill: {
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 7,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["understands Slaad but can't speak"],
    cr: 0.125,
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The slaad has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/slaad-tadpole.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    languageTags: ["CS", "OTH"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Stirge",
    source: "XMM",
    page: 299,
    size: ["T"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 5,
      formula: "2d4",
    },
    speed: {
      walk: 10,
      fly: 40,
    },
    str: 4,
    dex: 16,
    con: 11,
    int: 2,
    wis: 8,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 9,
    cr: 0.125,
    action: [
      {
        name: "Proboscis",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage, and the stirge attaches to the target. While attached, the stirge can't make Proboscis attacks, and the target takes 5 ({@damage 2d4}) Necrotic damage at the start of each of the stirge's turns.",
          "The stirge can detach itself by spending 5 feet of its movement. The target or a creature within 5 feet of it can detach the stirge as an action.",
        ],
      },
    ],
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "mountain",
      "swamp",
      "underdark",
      "urban",
    ],
    soundClip: {
      type: "internal",
      path: "bestiary/stirge.mp3",
    },
    senseTags: ["D"],
    damageTags: ["N", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Twig Blight",
    source: "XMM",
    page: 43,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [14],
    hp: {
      average: 7,
      formula: "2d6",
    },
    speed: {
      walk: 20,
    },
    str: 6,
    dex: 14,
    con: 11,
    int: 4,
    wis: 8,
    cha: 3,
    skill: {
      stealth: "+4",
    },
    senses: ["blindsight 60 ft."],
    passive: 9,
    vulnerable: ["fire"],
    conditionImmune: ["deafened"],
    languages: ["understands Common but can't speak"],
    cr: 0.125,
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The blight has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the blight's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/twig-blight.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["B"],
    languageTags: ["C", "CS"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Venomous Snake",
    source: "XMM",
    page: 372,
    otherSources: [
      {
        source: "XPHB",
        page: 358,
      },
      {
        source: "DrDe",
      },
    ],
    size: ["T"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 5,
      formula: "2d4",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 2,
    dex: 15,
    con: 11,
    int: 1,
    wis: 10,
    cha: 3,
    senses: ["blindsight 10 ft."],
    passive: 10,
    cr: 0.125,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "grassland", "hill", "swamp"],
    senseTags: ["B"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Warrior Infantry",
    source: "XMM",
    page: 320,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 9,
      formula: "2d8",
    },
    speed: {
      walk: 30,
    },
    str: 13,
    dex: 11,
    con: 11,
    int: 8,
    wis: 11,
    cha: 8,
    passive: 10,
    languages: ["Common"],
    cr: 0.125,
    gear: ["chain shirt|xphb", "spear|xphb"],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The warrior has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Spear",
        entries: [
          "{@atkr m,r} {@hit 3}, reach 5 ft. or range 20/60 ft. {@h}4 ({@damage 1d6 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    traitTags: ["Pack Tactics"],
    languageTags: ["C"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
];
