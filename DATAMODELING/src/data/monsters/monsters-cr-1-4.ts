// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_1_4 = [
  {
    name: "Aarakocra Skirmisher",
    source: "XMM",
    page: 10,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 20,
      fly: 50,
    },
    str: 10,
    dex: 14,
    con: 12,
    int: 11,
    wis: 12,
    cha: 11,
    skill: {
      perception: "+5",
    },
    passive: 15,
    languages: ["Aarakocra", "Primordial (Auran)"],
    cr: 0.25,
    action: [
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Slashing damage, or 9 ({@damage 3d4 + 2}) Slashing damage if the aarakocra moved 30+ feet straight toward the target immediately before the hit.",
        ],
      },
      {
        name: "Wind Javelin",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 30/120 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 2 ({@damage 1d4}) Thunder damage. {@hom}The javelin magically returns to the aarakocra's hand immediately after a ranged attack.",
        ],
      },
    ],
    environment: ["mountain", "planar, air"],
    treasure: ["implements", "individual"],
    languageTags: ["AU", "OTH", "P"],
    damageTags: ["P", "S", "T"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Animated Broom",
    source: "XMM",
    page: 16,
    size: ["S"],
    type: "construct",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 14,
      formula: "4d6",
    },
    speed: {
      walk: 5,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 17,
    con: 10,
    int: 1,
    wis: 5,
    cha: 1,
    senses: ["blindsight 60 ft."],
    passive: 7,
    immune: ["poison", "psychic"],
    conditionImmune: [
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    cr: 0.25,
    trait: [
      {
        name: "Flyby",
        entries: [
          "The broom doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["urban"],
    traitTags: ["Flyby"],
    senseTags: ["B"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Animated Flying Sword",
    source: "XMM",
    page: 17,
    size: ["S"],
    type: "construct",
    alignment: ["U"],
    ac: [17],
    hp: {
      average: 14,
      formula: "4d6",
    },
    speed: {
      walk: 5,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 15,
    con: 11,
    int: 1,
    wis: 5,
    cha: 1,
    save: {
      dex: "+4",
    },
    senses: ["blindsight 60 ft."],
    passive: 7,
    immune: ["poison", "psychic"],
    conditionImmune: [
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    cr: 0.25,
    action: [
      {
        name: "Slash",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["urban"],
    senseTags: ["B"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Axe Beak",
    source: "XMM",
    page: 24,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 19,
      formula: "3d10 + 3",
    },
    speed: {
      walk: 50,
    },
    str: 14,
    dex: 12,
    con: 12,
    int: 2,
    wis: 10,
    cha: 5,
    passive: 10,
    cr: 0.25,
    action: [
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["arctic", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/axe-beak.mp3",
    },
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Blink Dog",
    source: "XMM",
    page: 46,
    otherSources: [
      {
        source: "UtHftLH",
      },
    ],
    size: ["M"],
    type: "fey",
    alignment: ["L", "G"],
    ac: [13],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 40,
    },
    str: 12,
    dex: 17,
    con: 12,
    int: 10,
    wis: 13,
    cha: 11,
    skill: {
      perception: "+5",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    languages: ["understands Elvish and Sylvan but can't speak them"],
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Teleport {@recharge 4}",
        entries: [
          "The dog teleports up to 40 feet to an unoccupied space it can see.",
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    soundClip: {
      type: "internal",
      path: "bestiary/blink-dog.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Teleport"],
    languageTags: ["CS", "E", "S"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Boar",
    source: "XMM",
    page: 350,
    otherSources: [
      {
        source: "XPHB",
        page: 347,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 13,
      formula: "2d8 + 4",
    },
    speed: {
      walk: 40,
    },
    str: 13,
    dex: 11,
    con: 14,
    int: 2,
    wis: 9,
    cha: 5,
    passive: 9,
    cr: 0.25,
    trait: [
      {
        name: "Bloodied Fury",
        entries: [
          "While {@variantrule Bloodied|XPHB}, the boar has {@variantrule Advantage|XPHB} on attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Piercing damage. If the target is a Medium or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 ({@damage 1d6}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/boar.mp3",
    },
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Bullywug Warrior",
    source: "XMM",
    page: 64,
    otherSources: [
      {
        source: "UtHftLH",
      },
    ],
    size: ["M"],
    type: "fey",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 12,
    dex: 14,
    con: 13,
    int: 7,
    wis: 10,
    cha: 7,
    skill: {
      stealth: "+4",
    },
    passive: 10,
    languages: ["Bullywug", "Common"],
    cr: 0.25,
    trait: [
      {
        name: "Amphibious",
        entries: ["The bullywug can breathe air and water."],
      },
      {
        name: "Speak with Frogs and Toads",
        entries: [
          "The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.",
        ],
      },
    ],
    action: [
      {
        name: "Insectile Rapier",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage plus 2 ({@damage 1d4}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The bullywug can jump up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["swamp"],
    treasure: ["implements", "individual"],
    traitTags: ["Amphibious"],
    languageTags: ["C", "OTH"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Constrictor Snake",
    source: "XMM",
    page: 351,
    otherSources: [
      {
        source: "XPHB",
        page: 348,
      },
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 13,
      formula: "2d10 + 2",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 15,
    dex: 14,
    con: 12,
    int: 1,
    wis: 10,
    cha: 3,
    skill: {
      perception: "+2",
      stealth: "+4",
    },
    senses: ["blindsight 10 ft."],
    passive: 12,
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 12}, one Medium or smaller creature the snake can see within 5 feet. {@actSaveFail} 7 ({@damage 3d4}) Bludgeoning damage, and the target has the {@condition Grappled|XPHB} condition (escape {@dc 12}).",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/constrictor-snake.mp3",
    },
    senseTags: ["B"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Draft Horse",
    source: "XMM",
    page: 352,
    otherSources: [
      {
        source: "XPHB",
        page: 349,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 15,
      formula: "2d10 + 4",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 10,
    con: 15,
    int: 2,
    wis: 11,
    cha: 7,
    passive: 10,
    cr: 0.25,
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}6 ({@damage 1d4 + 4}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/draft-horse.mp3",
    },
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Dretch",
    group: ["Demons"],
    source: "XMM",
    page: 103,
    size: ["S"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [11],
    hp: {
      average: 18,
      formula: "4d6 + 4",
    },
    speed: {
      walk: 20,
    },
    str: 12,
    dex: 11,
    con: 12,
    int: 5,
    wis: 8,
    cha: 3,
    senses: ["darkvision 60 ft."],
    passive: 9,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: [
      "Abyssal; telepathy 60 ft. (works only with creatures that understand Abyssal)",
    ],
    cr: 0.25,
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Fetid Cloud (1/Day)",
        entries: [
          "{@actSave con} {@dc 11}, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the dretch. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the end of its next turn. While {@condition Poisoned|XPHB}, the creature can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both, and it can't take Reactions.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    soundClip: {
      type: "internal",
      path: "bestiary/dretch.mp3",
    },
    senseTags: ["D"],
    languageTags: ["AB", "TP"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Elk",
    source: "XMM",
    page: 353,
    otherSources: [
      {
        source: "XPHB",
        page: 349,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 11,
      formula: "2d10",
    },
    speed: {
      walk: 50,
    },
    str: 16,
    dex: 10,
    con: 11,
    int: 2,
    wis: 10,
    cha: 6,
    skill: {
      perception: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    cr: 0.25,
    action: [
      {
        name: "Ram",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage. If the target is a Large or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 3 ({@damage 1d6}) Bludgeoning damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/elk.mp3",
    },
    senseTags: ["D"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Giant Badger",
    source: "XMM",
    page: 354,
    otherSources: [
      {
        source: "XPHB",
        page: 350,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 15,
      formula: "2d8 + 6",
    },
    speed: {
      walk: 30,
      burrow: 10,
    },
    str: 13,
    dex: 10,
    con: 17,
    int: 2,
    wis: 12,
    cha: 5,
    skill: {
      perception: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    resist: ["poison"],
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-badger.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Bat",
    source: "XMM",
    page: 355,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 22,
      formula: "4d10",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 15,
    dex: 16,
    con: 11,
    int: 2,
    wis: 12,
    cha: 6,
    senses: ["blindsight 120 ft."],
    passive: 11,
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest", "mountain", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-bat.mp3",
    },
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Centipede",
    source: "XMM",
    page: 355,
    otherSources: [
      {
        source: "BQGT",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 9,
      formula: "2d6 + 2",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 5,
    dex: 14,
    con: 12,
    int: 1,
    wis: 7,
    cha: 3,
    senses: ["blindsight 30 ft."],
    passive: 8,
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the centipede's next turn.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-centipede.mp3",
    },
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Giant Frog",
    source: "XMM",
    page: 357,
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 18,
      formula: "4d8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 12,
    dex: 13,
    con: 11,
    int: 2,
    wis: 10,
    cha: 3,
    skill: {
      perception: "+2",
      stealth: "+4",
    },
    senses: ["darkvision 30 ft."],
    passive: 12,
    cr: 0.25,
    trait: [
      {
        name: "Amphibious",
        entries: ["The frog can breathe air and water."],
      },
      {
        name: "Standing Leap",
        entries: [
          "The frog's {@variantrule Long Jump|XPHB} is up to 20 feet and its {@variantrule High Jump|XPHB} is up to 10 feet with or without a running start.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 11}).",
        ],
      },
      {
        name: "Swallow",
        entries: [
          "The frog swallows a Small or smaller target it is grappling. While swallowed, the target isn't {@condition Grappled|XPHB} but has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, and it has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the frog. While swallowing the target, the frog can't use Bite, and if the frog dies, the swallowed target is no longer {@condition Restrained|XPHB} and can escape from the corpse using 5 feet of movement, exiting with the {@condition Prone|XPHB} condition.",
          "At the end of the frog's next turn, the swallowed target takes 5 ({@damage 2d4}) Acid damage. If that damage doesn't kill it, the frog disgorges it, causing it to exit {@condition Prone|XPHB}.",
        ],
      },
    ],
    environment: ["forest", "swamp"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-frog.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["D"],
    actionTags: ["Swallow"],
    damageTags: ["A", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "restrained"],
  },
  {
    name: "Giant Lizard",
    source: "XMM",
    page: 358,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 19,
      formula: "3d10 + 3",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    str: 15,
    dex: 12,
    con: 13,
    int: 2,
    wis: 10,
    cha: 5,
    save: {
      dex: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    cr: 0.25,
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The lizard can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "swamp", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-lizard.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Owl",
    source: "XMM",
    page: 358,
    size: ["L"],
    type: "celestial",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 19,
      formula: "3d10 + 3",
    },
    speed: {
      walk: 5,
      fly: 60,
    },
    str: 13,
    dex: 15,
    con: 12,
    int: 10,
    wis: 14,
    cha: 10,
    save: {
      wis: "+4",
    },
    skill: {
      perception: "+6",
      stealth: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    resist: ["necrotic", "radiant"],
    languages: [
      "Celestial; understands Common",
      "Elvish",
      "and Sylvan but can't speak them",
    ],
    cr: 0.25,
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The owl casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Detect Magic|XPHB}",
        ],
        daily: {
          "1": ["{@spell Clairvoyance|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Flyby",
        entries: [
          "The owl doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 1d10 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["arctic", "forest", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-owl.mp3",
    },
    traitTags: ["Flyby"],
    senseTags: ["SD"],
    languageTags: ["C", "CE", "CS", "E", "S"],
    damageTags: ["S"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Venomous Snake",
    source: "XMM",
    page: 361,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 40,
      swim: 40,
    },
    str: 10,
    dex: 18,
    con: 13,
    int: 2,
    wis: 10,
    cha: 3,
    skill: {
      perception: "+2",
    },
    senses: ["blindsight 10 ft."],
    passive: 12,
    cr: 0.25,
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}6 ({@damage 1d4 + 4}) Piercing damage plus 4 ({@damage 1d8}) Poison damage.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "grassland", "hill", "swamp"],
    senseTags: ["B"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Giant Wolf Spider",
    source: "XMM",
    page: 362,
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    str: 12,
    dex: 16,
    con: 13,
    int: 3,
    wis: 12,
    cha: 4,
    skill: {
      perception: "+3",
      stealth: "+7",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 13,
    cr: 0.25,
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage plus 5 ({@damage 2d4}) Poison damage.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-wolf-spider.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["B", "D"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Goblin Warrior",
    group: ["Goblinoids"],
    source: "XMM",
    page: 142,
    otherSources: [
      {
        source: "BQGT",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "N"],
    ac: [15],
    hp: {
      average: 10,
      formula: "3d6",
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
    cr: 0.25,
    gear: [
      "leather armor|xphb",
      "scimitar|xphb",
      "shield|xphb",
      "shortbow|xphb",
    ],
    action: [
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage, plus 2 ({@damage 1d4}) Slashing damage if the attack roll had {@variantrule Advantage|XPHB}.",
        ],
      },
      {
        name: "Shortbow",
        entries: [
          "{@atkr r} {@hit 4}, range 80/320 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage, plus 2 ({@damage 1d4}) Piercing damage if the attack roll had {@variantrule Advantage|XPHB}.",
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
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Grimlock",
    source: "XMM",
    page: 160,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [11],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 16,
    dex: 12,
    con: 12,
    int: 9,
    wis: 8,
    cha: 6,
    skill: {
      athletics: "+5",
      perception: "+3",
      stealth: "+5",
    },
    senses: ["blindsight 30 ft."],
    passive: 13,
    cr: 0.25,
    action: [
      {
        name: "Bone Cudgel",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage plus 2 ({@damage 1d4}) Psychic damage.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/grimlock.mp3",
    },
    senseTags: ["B"],
    damageTags: ["B", "Y"],
    miscTags: ["MA"],
  },
  {
    name: "Kenku",
    source: "XMM",
    page: 183,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 13,
      formula: "3d8",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 16,
    con: 10,
    int: 11,
    wis: 10,
    cha: 10,
    skill: {
      deception: "+4",
      perception: "+2",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    languages: ["Common", "Primordial (Auran)"],
    cr: 0.25,
    spellcasting: [
      {
        name: "Eldritch Lantern {@recharge 4}",
        type: "spellcasting",
        headerEntries: [
          "The kenku casts {@spell Faerie Fire|XPHB}, using Intelligence as the spellcasting ability (spell save {@dc 10}).",
        ],
        recharge: {
          "4": ["{@spell Faerie Fire|XPHB}"],
        },
        ability: "int",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
    ],
    trait: [
      {
        name: "Mimicry",
        entries: [
          "The kenku can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful {@dc 14} Wisdom ({@skill Insight|XPHB}) check.",
        ],
      },
    ],
    action: [
      {
        name: "Shadow Blade",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 60 ft. {@h}6 ({@damage 1d6 + 3}) Necrotic damage. {@hom}The blade magically returns to the kenku's hand immediately after a ranged attack.",
        ],
      },
    ],
    environment: ["forest", "planar, shadowfell", "urban"],
    treasure: ["implements", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/kenku.mp3",
    },
    traitTags: ["Mimicry"],
    senseTags: ["D"],
    languageTags: ["AU", "C", "P"],
    damageTags: ["N"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Kuo-toa",
    source: "XMM",
    page: 189,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 18,
      formula: "4d8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 13,
    dex: 10,
    con: 11,
    int: 11,
    wis: 10,
    cha: 8,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 120 ft.", "truesight 30 ft."],
    passive: 14,
    languages: ["Undercommon"],
    cr: 0.25,
    gear: ["spear|xphb"],
    trait: [
      {
        name: "Amphibious",
        entries: ["The kuo-toa can breathe air and water."],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the kuo-toa has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Spear",
        entries: [
          "{@atkr m,r} {@hit 3}, reach 5 ft. or range 20/60 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage.",
        ],
      },
      {
        name: "Sticky Net (1/Day)",
        entries: [
          "{@actSave dex} {@dc 10}, one Large or smaller creature the kuo-toa can see within 15 feet. {@actSaveFail} The target has the {@condition Restrained|XPHB} condition until the net is destroyed (AC 10; HP 5; {@variantrule Immunity|XPHB} to Bludgeoning, Poison, and Psychic damage). A creature can take an action to make a {@dc 10} Strength ({@skill Athletics|XPHB}) check to free itself or another creature in a net within 5 feet, destroying the net on a success.",
        ],
      },
    ],
    reaction: [
      {
        name: "Sticky Shield",
        entries: [
          "{@actTrigger} A creature misses the kuo-toa with a melee attack roll using a weapon. {@actResponse d}{@actSave str} {@dc 11}, the triggering creature. {@actSaveFail} The attack's weapon sticks to the kuo-toa's shield. If the target doesn't let go of the weapon, the target has the {@condition Grappled|XPHB} condition while the weapon is stuck (escape {@dc 11}). While stuck, the weapon can't be used. The target can take an action to make a {@dc 11} Strength ({@skill Athletics|XPHB}) check, freeing the weapon on a success.",
        ],
      },
    ],
    environment: ["coastal", "underdark"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/kuo-toa.mp3",
    },
    traitTags: ["Amphibious", "Sunlight Sensitivity"],
    senseTags: ["SD", "U"],
    languageTags: ["U"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RNG", "THW"],
    conditionInflict: ["grappled", "restrained"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Modron Duodrone",
    source: "XMM",
    page: 217,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "construct",
    alignment: ["L", "N"],
    ac: [15],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 13,
    con: 12,
    int: 6,
    wis: 10,
    cha: 7,
    senses: ["truesight 120 ft."],
    passive: 10,
    conditionImmune: ["charmed"],
    languages: ["Modron"],
    cr: 0.25,
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
        name: "Multiattack",
        entries: ["The modron makes two Clockwork Blade attacks."],
      },
      {
        name: "Clockwork Blade",
        entries: [
          "{@atkr m,r} {@hit 3}, reach 5 ft. or range 30 ft. {@h}4 ({@damage 1d6 + 1}) Force damage. {@hom}The blade magically returns to the modron's hand immediately after a ranged attack.",
        ],
      },
    ],
    environment: ["planar, mechanus"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["O"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Mud Mephit",
    source: "XMM",
    page: 207,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [11],
    hp: {
      average: 13,
      formula: "3d6 + 3",
    },
    speed: {
      walk: 20,
      fly: 20,
      swim: 20,
    },
    str: 8,
    dex: 12,
    con: 12,
    int: 9,
    wis: 11,
    cha: 7,
    skill: {
      stealth: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["poison"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Aquan, Terran)"],
    cr: 0.25,
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave dex} {@dc 11}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} The target has the {@condition Restrained|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Bludgeoning damage.",
        ],
      },
      {
        name: "Mud Breath {@recharge}",
        entries: [
          "{@actSave dex} {@dc 11}, one creature the mephit can see within 15 feet. {@actSaveFail} The target has the {@condition Restrained|XPHB} condition until the end of the mephit's next turn.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/mud-mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["AQ", "P", "T"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["restrained"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Needle Blight",
    source: "XMM",
    page: 43,
    size: ["M"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 16,
      formula: "3d8 + 3",
    },
    speed: {
      walk: 30,
    },
    str: 12,
    dex: 12,
    con: 13,
    int: 4,
    wis: 8,
    cha: 3,
    senses: ["blindsight 60 ft."],
    passive: 9,
    conditionImmune: ["deafened"],
    languages: ["understands Common but can't speak"],
    cr: 0.25,
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Needles",
        entries: [
          "{@atkr r} {@hit 3}, range 30/60 ft. {@h}6 ({@damage 2d4 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/needle-blight.mp3",
    },
    senseTags: ["B"],
    languageTags: ["C", "CS"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Panther",
    source: "XMM",
    page: 366,
    otherSources: [
      {
        source: "XPHB",
        page: 354,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 13,
      formula: "3d8",
    },
    speed: {
      walk: 50,
      climb: 40,
    },
    str: 14,
    dex: 16,
    con: 10,
    int: 3,
    wis: 14,
    cha: 7,
    skill: {
      perception: "+4",
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    cr: 0.25,
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Nimble Escape",
        entries: ["The panther takes the Disengage or Hide action."],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/panther.mp3",
    },
    senseTags: ["D"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Pixie",
    source: "XMM",
    page: 244,
    size: ["T"],
    type: "fey",
    alignment: ["N", "G"],
    ac: [15],
    hp: {
      average: 9,
      formula: "6d4 - 6",
    },
    speed: {
      walk: 10,
      fly: 30,
    },
    str: 2,
    dex: 20,
    con: 8,
    int: 10,
    wis: 14,
    cha: 15,
    skill: {
      perception: "+4",
      stealth: "+7",
    },
    passive: 14,
    languages: ["Sylvan"],
    cr: 0.25,
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 12}):",
        ],
        will: [
          "{@spell Dancing Lights|XPHB}",
          "{@spell Druidcraft|XPHB}",
          "{@spell Invisibility|XPHB} (self only)",
        ],
        daily: {
          "1e": [
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Fly|XPHB}",
            "{@spell Sleep|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The pixie has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Faerie Dust",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 60 ft. {@h}1 Radiant damage, and the target has the {@condition Charmed|XPHB} or {@condition Poisoned|XPHB} condition (pixie's choice) until the start of the pixie's next turn.",
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/pixie.mp3",
    },
    traitTags: ["Magic Resistance"],
    languageTags: ["S"],
    damageTags: ["R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["incapacitated", "invisible", "unconscious"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Priest Acolyte",
    source: "XMM",
    page: 247,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: {
      type: "humanoid",
      tags: ["cleric"],
    },
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
    },
    str: 14,
    dex: 10,
    con: 12,
    int: 10,
    wis: 14,
    cha: 11,
    skill: {
      medicine: "+4",
      religion: "+2",
    },
    passive: 12,
    languages: ["Common"],
    cr: 0.25,
    gear: ["chain shirt|xphb", "holy symbol|xphb", "mace|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The priest casts one of the following spells, using Wisdom as the spellcasting ability:",
        ],
        will: ["{@spell Light|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Divine Aid (1/Day)",
        type: "spellcasting",
        headerEntries: [
          "The priest casts {@spell Bless|XPHB}, {@spell Healing Word|XPHB}, or {@spell Sanctuary|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "1": [
            "{@spell Bless|XPHB}",
            "{@spell Healing Word|XPHB}",
            "{@spell Sanctuary|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Mace",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Bludgeoning damage plus 2 ({@damage 1d4}) Radiant damage.",
        ],
      },
      {
        name: "Radiant Flame",
        entries: [
          "{@atkr r} {@hit 4}, range 60 ft. {@h}7 ({@damage 2d6}) Radiant damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    languageTags: ["C"],
    damageTags: ["B", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Pseudodragon",
    source: "XMM",
    page: 249,
    otherSources: [
      {
        source: "XPHB",
        page: 354,
      },
    ],
    size: ["T"],
    type: "dragon",
    alignment: ["N", "G"],
    ac: [14],
    hp: {
      average: 10,
      formula: "3d4 + 3",
    },
    speed: {
      walk: 15,
      fly: 60,
    },
    str: 6,
    dex: 15,
    con: 13,
    int: 10,
    wis: 12,
    cha: 10,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 15,
    languages: ["understands Common and Draconic but can't speak"],
    cr: 0.25,
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The pseudodragon has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The pseudodragon makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Sting",
        entries: [
          "{@actSave con} {@dc 12}, one creature the pseudodragon can see within 5 feet. {@actSaveFail} 5 ({@damage 2d4}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition for 1 hour. While {@condition Poisoned|XPHB}, the target also has the {@condition Unconscious|XPHB} condition, which ends early if the target takes damage or a creature within 5 feet of it takes an action to wake it.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "hill", "mountain", "urban"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/pseudodragon.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "DR"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned", "unconscious"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Pteranodon",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 367,
    size: ["M"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 13,
      formula: "3d8",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 12,
    dex: 15,
    con: 10,
    int: 2,
    wis: 9,
    cha: 5,
    skill: {
      perception: "+1",
    },
    passive: 11,
    cr: 0.25,
    trait: [
      {
        name: "Flyby",
        entries: [
          "The pteranodon doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["coastal", "grassland", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/pteranodon.mp3",
    },
    traitTags: ["Flyby"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Riding Horse",
    source: "XMM",
    page: 368,
    otherSources: [
      {
        source: "XPHB",
        page: 356,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 13,
      formula: "2d10 + 2",
    },
    speed: {
      walk: 60,
    },
    str: 16,
    dex: 13,
    con: 12,
    int: 2,
    wis: 11,
    cha: 7,
    passive: 10,
    cr: 0.25,
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["grassland", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/riding-horse.mp3",
    },
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Skeleton",
    source: "XMM",
    page: 282,
    otherSources: [
      {
        source: "XPHB",
        page: 356,
      },
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [14],
    hp: {
      average: 13,
      formula: "2d8 + 4",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 16,
    con: 15,
    int: 6,
    wis: 8,
    cha: 5,
    senses: ["darkvision 60 ft."],
    passive: 9,
    immune: ["poison"],
    vulnerable: ["bludgeoning"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["understands Common plus one other language but can't speak"],
    cr: 0.25,
    gear: ["shortbow|xphb", "shortsword|xphb"],
    action: [
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Shortbow",
        entries: [
          "{@atkr r} {@hit 5}, range 80/320 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/skeleton.mp3",
    },
    senseTags: ["D"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Smoke Mephit",
    source: "XMM",
    page: 208,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 13,
      formula: "3d6 + 3",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 6,
    dex: 14,
    con: 12,
    int: 10,
    wis: 10,
    cha: 11,
    skill: {
      perception: "+2",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["fire", "poison"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Auran, Ignan)"],
    cr: 0.25,
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave con} {@dc 11}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the end of its next turn.",
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
      {
        name: "Cinder Breath {@recharge}",
        entries: [
          "{@actSave dex} {@dc 11}, one creature the mephit can see within 15 feet. {@actSaveFail} The target has the {@condition Blinded|XPHB} condition until the end of the mephit's next turn.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/smoke-mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["AU", "IG", "P"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["blinded", "poisoned"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Sprite",
    source: "XMM",
    page: 298,
    otherSources: [
      {
        source: "XPHB",
        page: 358,
      },
    ],
    size: ["T"],
    type: "fey",
    alignment: ["N", "G"],
    ac: [15],
    hp: {
      average: 10,
      formula: "4d4",
    },
    speed: {
      walk: 10,
      fly: 40,
    },
    str: 3,
    dex: 18,
    con: 10,
    int: 14,
    wis: 13,
    cha: 11,
    skill: {
      perception: "+3",
      stealth: "+8",
    },
    passive: 13,
    languages: ["Common", "Elvish", "Sylvan"],
    cr: 0.25,
    spellcasting: [
      {
        name: "Invisibility",
        type: "spellcasting",
        headerEntries: [
          "The sprite casts {@spell Invisibility|XPHB} on itself, requiring no spell components and using Charisma as the spellcasting ability.",
        ],
        will: ["{@spell Invisibility|XPHB}"],
        ability: "cha",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    action: [
      {
        name: "Needle Sword",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}6 ({@damage 1d4 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Enchanting Bow",
        entries: [
          "{@atkr r} {@hit 6}, range 40/160 ft. {@h}1 Piercing damage, and the target has the {@condition Charmed|XPHB} condition until the start of the sprite's next turn.",
        ],
      },
      {
        name: "Heart Sight",
        entries: [
          "{@actSave cha} {@dc 10}, one creature within 5 feet the sprite can see (Celestials, Fiends, and Undead automatically fail the save). {@actSaveFail} The sprite knows the target's emotions and alignment.",
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/sprite.mp3",
    },
    languageTags: ["C", "E", "S"],
    damageTags: ["P"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["charmed"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["charisma"],
  },
  {
    name: "Steam Mephit",
    source: "XMM",
    page: 208,
    size: ["S"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [10],
    hp: {
      average: 17,
      formula: "5d6",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 5,
    dex: 11,
    con: 10,
    int: 11,
    wis: 10,
    cha: 12,
    skill: {
      stealth: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["fire", "poison"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Aquan, Ignan)"],
    cr: 0.25,
    trait: [
      {
        name: "Blurred Form",
        entries: [
          "Attack rolls against the mephit are made with {@variantrule Disadvantage|XPHB} unless the mephit has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave dex} {@dc 10}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} 5 ({@damage 2d4}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 2}, reach 5 ft. {@h}2 ({@damage 1d4}) Slashing damage plus 2 ({@damage 1d4}) Fire damage.",
        ],
      },
      {
        name: "Steam Breath {@recharge}",
        entries: [
          "{@actSave con} {@dc 10}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 5 ({@damage 2d4}) Fire damage, and the target's {@variantrule Speed|XPHB} decreases by 10 feet until the end of the mephit's next turn. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} Being underwater doesn't grant {@variantrule Resistance|XPHB} to this Fire damage.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/steam-mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["AQ", "IG", "P"],
    damageTags: ["F", "S"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Swarm of Bats",
    source: "XMM",
    page: 370,
    otherSources: [
      {
        source: "HBTD",
      },
    ],
    size: ["L"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 11,
      formula: "2d10",
    },
    speed: {
      walk: 5,
      fly: 30,
    },
    str: 5,
    dex: 15,
    con: 10,
    int: 2,
    wis: 12,
    cha: 4,
    senses: ["blindsight 60 ft."],
    passive: 11,
    resist: ["bludgeoning", "piercing", "slashing"],
    conditionImmune: [
      "charmed",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "prone",
      "restrained",
      "stunned",
    ],
    cr: 0.25,
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny bat. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 2d4}) Piercing damage, or 2 ({@damage 1d4}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["forest", "mountain", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/swarm-of-bats.mp3",
    },
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Swarm of Rats",
    source: "XMM",
    page: 370,
    size: ["M"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [10],
    hp: {
      average: 14,
      formula: "4d8 - 4",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 9,
    dex: 11,
    con: 9,
    int: 2,
    wis: 10,
    cha: 3,
    senses: ["darkvision 30 ft."],
    passive: 10,
    resist: ["bludgeoning", "piercing", "slashing"],
    conditionImmune: [
      "charmed",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "prone",
      "restrained",
      "stunned",
    ],
    cr: 0.25,
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny rat. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 2}, reach 5 ft. {@h}5 ({@damage 2d4}) Piercing damage, or 2 ({@damage 1d4}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["forest", "swamp", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/swarm-of-rats.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Swarm of Ravens",
    source: "XMM",
    page: 371,
    size: ["M"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 10,
      fly: 50,
    },
    str: 6,
    dex: 14,
    con: 12,
    int: 5,
    wis: 12,
    cha: 6,
    skill: {
      perception: "+5",
    },
    passive: 15,
    resist: ["bludgeoning", "piercing", "slashing"],
    conditionImmune: [
      "charmed",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "prone",
      "restrained",
      "stunned",
    ],
    cr: 0.25,
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny raven. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Beaks",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage, or 2 ({@damage 1d4}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
      {
        name: "Cacophony {@recharge}",
        entries: [
          "{@actSave wis} {@dc 10}, one creature in the swarm's space. {@actSaveFail} The target has the {@condition Deafened|XPHB} condition until the start of the swarm's next turn. While {@condition Deafened|XPHB}, the target also has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    environment: ["hill", "swamp", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/swarm-of-ravens.mp3",
    },
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["deafened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Troglodyte",
    source: "XMM",
    page: 309,
    size: ["M"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [11],
    hp: {
      average: 13,
      formula: "2d8 + 4",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 10,
    con: 14,
    int: 6,
    wis: 10,
    cha: 6,
    skill: {
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Troglodyte"],
    cr: 0.25,
    trait: [
      {
        name: "Stench",
        entries: [
          "{@actSave con} {@dc 12}, any creature (other than a troglodyte) that starts its turn in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the troglodyte. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the start of its next turn. {@actSaveSuccess} The target is immune to the Stench of all troglodytes for 1 hour.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the troglodyte has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/troglodyte.mp3",
    },
    traitTags: ["Sunlight Sensitivity"],
    senseTags: ["D"],
    languageTags: ["OTH"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Violet Fungus",
    source: "XMM",
    page: 126,
    size: ["M"],
    type: "plant",
    alignment: ["U"],
    ac: [5],
    hp: {
      average: 18,
      formula: "4d8",
    },
    speed: {
      walk: 5,
    },
    str: 3,
    dex: 1,
    con: 10,
    int: 1,
    wis: 3,
    cha: 1,
    senses: ["blindsight 30 ft."],
    passive: 6,
    conditionImmune: ["blinded", "charmed", "deafened", "frightened"],
    cr: 0.25,
    action: [
      {
        name: "Multiattack",
        entries: ["The fungus makes two Rotting Touch attacks."],
      },
      {
        name: "Rotting Touch",
        entries: [
          "{@atkr m} {@hit 2}, reach 10 ft. {@h}4 ({@damage 1d8}) Necrotic damage.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/violet-fungus.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["N"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Winged Kobold",
    source: "XMM",
    page: 185,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "dragon",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 10,
      formula: "4d6 - 4",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 7,
    dex: 16,
    con: 9,
    int: 8,
    wis: 7,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 8,
    languages: ["Common", "Draconic"],
    cr: 0.25,
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
        name: "Dragon-Tooth Blade",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Chromatic Spittle",
        entries: [
          "{@atkr r} {@hit 5}, range 30 ft. {@h}6 ({@damage 1d6 + 3}) damage of a type chosen by the kobold: Acid, Cold, Fire, Lightning, or Poison.",
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
    soundClip: {
      type: "internal",
      path: "bestiary/winged-kobold.mp3",
    },
    traitTags: ["Pack Tactics", "Sunlight Sensitivity"],
    senseTags: ["D"],
    languageTags: ["C", "DR"],
    damageTags: ["P"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Wolf",
    source: "XMM",
    page: 373,
    otherSources: [
      {
        source: "XPHB",
        page: 359,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 40,
    },
    str: 14,
    dex: 15,
    con: 12,
    int: 3,
    wis: 12,
    cha: 6,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: 0.25,
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The wolf has {@variantrule Advantage|XPHB} on attack rolls against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/wolf.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Zombie",
    source: "XMM",
    page: 346,
    otherSources: [
      {
        source: "XPHB",
        page: 359,
      },
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [8],
    hp: {
      average: 15,
      formula: "2d8 + 6",
    },
    speed: {
      walk: 20,
    },
    str: 13,
    dex: 6,
    con: 16,
    int: 3,
    wis: 6,
    cha: 5,
    save: {
      wis: "+0",
    },
    senses: ["darkvision 60 ft."],
    passive: 8,
    immune: ["poison"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["understands Common plus one other language but can't speak"],
    cr: 0.25,
    trait: [
      {
        name: "Undead Fortitude",
        entries: [
          "If damage reduces the zombie to 0 {@variantrule Hit Points|XPHB}, it makes a Constitution saving throw ({@dc 5} plus the damage taken) unless the damage is Radiant or from a {@variantrule Critical Hit|XPHB}. On a successful save, the zombie drops to 1 {@variantrule Hit Points|XPHB|Hit Point} instead.",
        ],
      },
    ],
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d8 + 1}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/zombie.mp3",
    },
    traitTags: ["Undead Fortitude"],
    senseTags: ["D"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
];
