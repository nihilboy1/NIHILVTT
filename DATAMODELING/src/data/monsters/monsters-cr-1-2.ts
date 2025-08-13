// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_1_2 = [
  {
    name: "Ape",
    source: "XMM",
    page: 348,
    otherSources: [
      {
        source: "XPHB",
        page: 346,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 19,
      formula: "3d8 + 6",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 16,
    dex: 14,
    con: 14,
    int: 6,
    wis: 12,
    cha: 7,
    skill: {
      athletics: "+5",
      perception: "+3",
    },
    passive: 13,
    cr: "1/2",
    action: [
      {
        name: "Multiattack",
        entries: ["The ape makes two Fist attacks."],
      },
      {
        name: "Fist",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Bludgeoning damage.",
        ],
      },
      {
        name: "Rock {@recharge}",
        entries: [
          "{@atkr r} {@hit 5}, range 25/50 ft. {@h}10 ({@damage 2d6 + 3}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/ape.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Black Bear",
    source: "XMM",
    page: 349,
    otherSources: [
      {
        source: "XPHB",
        page: 346,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 19,
      formula: "3d8 + 6",
    },
    speed: {
      walk: 30,
      climb: 30,
      swim: 30,
    },
    str: 15,
    dex: 12,
    con: 14,
    int: 2,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "1/2",
    action: [
      {
        name: "Multiattack",
        entries: ["The bear makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/black-bear.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Cockatrice",
    source: "XMM",
    page: 75,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 22,
      formula: "5d6 + 5",
    },
    speed: {
      walk: 20,
      fly: 40,
    },
    str: 6,
    dex: 12,
    con: 12,
    int: 2,
    wis: 13,
    cha: 5,
    senses: ["darkvision 60 ft."],
    passive: 11,
    conditionImmune: ["petrified"],
    cr: "1/2",
    action: [
      {
        name: "Petrifying Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}3 ({@damage 1d4 + 1}) Piercing damage. If the target is a creature, it is subjected to the following effect. {@actSave con} {@dc 11}. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition. The target repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition, instead of the {@condition Restrained|XPHB} condition, for 24 hours.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/cockatrice.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["petrified", "restrained"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Crocodile",
    source: "XMM",
    page: 352,
    otherSources: [
      {
        source: "XPHB",
        page: 348,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 13,
      formula: "2d10 + 2",
    },
    speed: {
      walk: 20,
      swim: 30,
    },
    str: 15,
    dex: 10,
    con: 13,
    int: 2,
    wis: 10,
    cha: 5,
    save: {
      con: "+3",
    },
    skill: {
      stealth: "+2",
    },
    passive: 10,
    cr: "1/2",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The crocodile can hold its breath for 1 hour."],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}). While {@condition Grappled|XPHB}, the target has the {@condition Restrained|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal", "swamp", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/crocodile.mp3",
    },
    traitTags: ["Hold Breath"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "restrained"],
  },
  {
    name: "Darkmantle",
    source: "XMM",
    page: 90,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S"],
    type: "aberration",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 22,
      formula: "5d6 + 5",
    },
    speed: {
      walk: 10,
      fly: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 12,
    con: 13,
    int: 2,
    wis: 10,
    cha: 5,
    skill: {
      stealth: "+3",
    },
    senses: ["blindsight 60 ft."],
    passive: 10,
    cr: "1/2",
    action: [
      {
        name: "Crush",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage, and the darkmantle attaches to the target. If the target is a Medium or smaller creature and the darkmantle had {@variantrule Advantage|XPHB} on the attack roll, it covers the target, which has the {@condition Blinded|XPHB} condition and is suffocating while the darkmantle is attached in this way.",
          "While attached to a target, the darkmantle can attack only the target but has {@variantrule Advantage|XPHB} on its attack rolls. Its {@variantrule Speed|XPHB} becomes 0, it can't benefit from any bonus to its {@variantrule Speed|XPHB}, and it moves with the target.",
          "A creature can take an action to try to detach the darkmantle from itself, doing so with a successful {@dc 13} Strength ({@skill Athletics|XPHB}) check. On its turn, the darkmantle can detach itself by using 5 feet of movement.",
        ],
      },
      {
        name: "Darkness Aura (1/Day)",
        entries: [
          "Magical {@variantrule Darkness|XPHB} fills a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the darkmantle. This effect lasts while the darkmantle maintains {@status Concentration|XPHB} on it, up to 10 minutes. Darkvision can't penetrate this area, and no light can illuminate it.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/darkmantle.mp3",
    },
    senseTags: ["B"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["blinded"],
  },
  {
    name: "Dust Mephit",
    source: "XMM",
    page: 206,
    size: ["S"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 17,
      formula: "5d6",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 5,
    dex: 14,
    con: 10,
    int: 9,
    wis: 11,
    cha: 10,
    skill: {
      perception: "+2",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["poison"],
    vulnerable: ["fire"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Auran, Terran)"],
    cr: "1/2",
    spellcasting: [
      {
        name: "Sleep (1/Day)",
        type: "spellcasting",
        headerEntries: [
          "The mephit casts the {@spell Sleep|XPHB} spell, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 10}).",
        ],
        daily: {
          "1": ["{@spell Sleep|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave dex} {@dc 10}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} 5 ({@damage 2d4}) Bludgeoning damage. {@actSaveSuccess} Half damage.",
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
        name: "Blinding Breath {@recharge}",
        entries: [
          "{@actSave dex} {@dc 10}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Blinded|XPHB} condition until the end of the mephit's next turn.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["AU", "P", "T"],
    damageTags: ["B", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["blinded"],
    conditionInflictSpell: ["incapacitated", "unconscious"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Gas Spore Fungus",
    source: "XMM",
    page: 125,
    size: ["L"],
    type: "plant",
    alignment: ["U"],
    ac: [8],
    hp: {
      average: 13,
      formula: "9d10 - 36",
    },
    speed: {
      walk: 5,
      fly: {
        number: 10,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 5,
    dex: 1,
    con: 3,
    int: 1,
    wis: 1,
    cha: 1,
    senses: ["blindsight 30 ft."],
    passive: 5,
    immune: ["poison"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "paralyzed",
      "poisoned",
      "prone",
    ],
    cr: "1/2",
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The gas spore bursts when it dies. {@actSave con} {@dc 10}, each creature in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the gas spore. {@actSaveFail} The target takes 10 ({@damage 3d6}) Poison damage and has the {@condition Poisoned|XPHB} condition for {@dice 1d12} hours. Unless the {@condition Poisoned|XPHB} condition is removed, the target dies at the end of that time and sprouts {@dice 2d4} Tiny Gas Spore Fungi (each with 1 {@variantrule Hit Points|XPHB|Hit Point}). After {@dice 2d6} days, they become Large and have 13 {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Tendril",
        entries: [
          "{@atkr m} {@hit 0}, reach 5 ft. {@h}3 ({@damage 1d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["underdark"],
    traitTags: ["Death Burst"],
    senseTags: ["B"],
    damageTags: ["I"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Giant Goat",
    source: "XMM",
    page: 357,
    otherSources: [
      {
        source: "XPHB",
        page: 350,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 19,
      formula: "3d10 + 3",
    },
    speed: {
      walk: 40,
      climb: 30,
    },
    str: 17,
    dex: 13,
    con: 12,
    int: 3,
    wis: 12,
    cha: 6,
    save: {
      str: "+5",
    },
    skill: {
      perception: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "1/2",
    action: [
      {
        name: "Ram",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage. If the target is a Large or smaller creature and the goat moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 ({@damage 2d4}) Bludgeoning damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-goat.mp3",
    },
    senseTags: ["D"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Giant Seahorse",
    source: "XMM",
    page: 359,
    otherSources: [
      {
        source: "XPHB",
        page: 350,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 16,
      formula: "3d10",
    },
    speed: {
      walk: 5,
      swim: 40,
    },
    str: 15,
    dex: 12,
    con: 11,
    int: 2,
    wis: 12,
    cha: 5,
    passive: 11,
    cr: "1/2",
    trait: [
      {
        name: "Water Breathing",
        entries: ["The seahorse can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Ram",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Bludgeoning damage, or 11 ({@damage 2d8 + 2}) Bludgeoning damage if the seahorse moved 20+ feet straight toward the target immediately before the hit.",
        ],
      },
    ],
    bonus: [
      {
        name: "Bubble Dash",
        entries: [
          "While underwater, the seahorse moves up to half its {@variantrule Swim Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
        ],
      },
    ],
    environment: ["underwater"],
    traitTags: ["Water Breathing"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Wasp",
    source: "XMM",
    page: 361,
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 10,
      fly: 50,
    },
    str: 10,
    dex: 14,
    con: 10,
    int: 1,
    wis: 10,
    cha: 3,
    passive: 10,
    cr: "1/2",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The wasp doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Sting",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 5 ({@damage 2d4}) Poison damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-wasp.mp3",
    },
    traitTags: ["Flyby"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Gnoll Warrior",
    source: "XMM",
    page: 140,
    size: ["M"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 27,
      formula: "6d8",
    },
    speed: {
      walk: 30,
    },
    str: 14,
    dex: 12,
    con: 11,
    int: 6,
    wis: 10,
    cha: 7,
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Gnoll"],
    cr: "1/2",
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Bone Bow",
        entries: [
          "{@atkr r} {@hit 3}, range 150/600 ft. {@h}6 ({@damage 1d10 + 1}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rampage (1/Day)",
        entries: [
          "Immediately after dealing damage to a creature that is already {@variantrule Bloodied|XPHB}, the gnoll moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "hill"],
    treasure: ["armaments", "individual"],
    senseTags: ["D"],
    languageTags: ["OTH"],
    damageTags: ["P"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Gray Ooze",
    source: "XMM",
    page: 151,
    otherSources: [
      {
        source: "ScoEE",
      },
    ],
    size: ["M"],
    type: "ooze",
    alignment: ["U"],
    ac: [9],
    hp: {
      average: 22,
      formula: "3d8 + 9",
    },
    speed: {
      walk: 10,
      climb: 10,
    },
    str: 12,
    dex: 6,
    con: 16,
    int: 1,
    wis: 6,
    cha: 2,
    skill: {
      stealth: "+2",
    },
    senses: ["blindsight 60 ft."],
    passive: 8,
    resist: ["acid", "cold", "fire"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "grappled",
      "prone",
      "restrained",
    ],
    cr: "1/2",
    trait: [
      {
        name: "Amorphous",
        entries: [
          "The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Corrosive Form",
        entries: [
          "Nonmagical ammunition is destroyed immediately after hitting the ooze and dealing any damage. Any nonmagical weapon takes a cumulative -1 penalty to attack rolls immediately after dealing damage to the ooze and coming into contact with it. The weapon is destroyed if the penalty reaches -5. The penalty can be removed by casting the {@spell Mending|XPHB} spell on the weapon.",
          "The ooze can eat through 2-inch-thick, nonmagical metal or wood in 1 round.",
        ],
      },
    ],
    action: [
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}10 ({@damage 2d8 + 1}) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the {@spell Mending|XPHB} spell on the armor.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/gray-ooze.mp3",
    },
    traitTags: ["Amorphous"],
    senseTags: ["B"],
    damageTags: ["A"],
    miscTags: ["MA"],
  },
  {
    name: "Hobgoblin Warrior",
    group: ["Goblinoids"],
    source: "XMM",
    page: 170,
    size: ["M"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 11,
      formula: "2d8 + 2",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 13,
    dex: 12,
    con: 12,
    int: 10,
    wis: 10,
    cha: 9,
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Common", "Goblin"],
    cr: "1/2",
    gear: [
      "half plate armor|xphb",
      "longbow|xphb",
      "longsword|xphb",
      "shield|xphb",
    ],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The hobgoblin has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the hobgoblin's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Longsword",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}12 ({@damage 2d10 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 3}, range 150/600 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage plus 7 ({@damage 3d4}) Poison damage.",
        ],
      },
    ],
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "mountain",
      "planar, acheron",
      "underdark",
    ],
    treasure: ["armaments", "individual"],
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    languageTags: ["C", "GO"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Ice Mephit",
    source: "XMM",
    page: 206,
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
      average: 21,
      formula: "6d6",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 7,
    dex: 13,
    con: 10,
    int: 9,
    wis: 11,
    cha: 12,
    skill: {
      perception: "+2",
      stealth: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["cold", "poison"],
    vulnerable: ["fire"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Aquan, Auran)"],
    cr: "1/2",
    spellcasting: [
      {
        name: "Fog Cloud (1/Day)",
        type: "spellcasting",
        headerEntries: [
          "The mephit casts {@spell Fog Cloud|XPHB}, requiring no spell components and using Charisma as the spellcasting ability.",
        ],
        daily: {
          "1": ["{@spell Fog Cloud|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave con} {@dc 10}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} 5 ({@damage 2d4}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}3 ({@damage 1d4 + 1}) Slashing damage plus 2 ({@damage 1d4}) Cold damage.",
        ],
      },
      {
        name: "Frost Breath {@recharge}",
        entries: [
          "{@actSave con} {@dc 10}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 7 ({@damage 3d4}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/ice-mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["AQ", "AU", "P"],
    damageTags: ["C", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Jackalwere",
    source: "XMM",
    page: 182,
    size: ["S"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 18,
      formula: "4d6 + 4",
    },
    speed: {
      walk: 40,
    },
    str: 11,
    dex: 15,
    con: 12,
    int: 13,
    wis: 11,
    cha: 10,
    skill: {
      deception: "+4",
      perception: "+4",
      stealth: "+4",
    },
    senses: ["darkvision 90 ft."],
    passive: 14,
    languages: ["Common"],
    cr: "1/2",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The jackalwere has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the jackalwere's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The jackalwere makes two Rend or Slam attacks."],
      },
      {
        name: "Rend (Jackal or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Slam (Human or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Bludgeoning damage.",
        ],
      },
      {
        name: "Sleep Gaze {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 10}, one creature the jackalwere can see within 30 feet (Constructs and Undead succeed automatically). {@actSaveFail} The target has the {@condition Unconscious|XPHB} condition for 10 minutes or until it takes damage or a creature within 5 feet of it takes an action to wake it. {@actSaveSuccess} The target is immune to this jackalwere's Sleep Gaze for 24 hours.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The jackalwere shape-shifts into a Medium human or a Medium jackal-humanoid hybrid, or it returns to its true form (that of a Small jackal). Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "grassland"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/jackalwere.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["unconscious"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Magma Mephit",
    source: "XMM",
    page: 207,
    size: ["S"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [11],
    hp: {
      average: 18,
      formula: "4d6 + 4",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 8,
    dex: 12,
    con: 12,
    int: 7,
    wis: 10,
    cha: 10,
    skill: {
      stealth: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["fire", "poison"],
    vulnerable: ["cold"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Primordial (Ignan, Terran)"],
    cr: "1/2",
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The mephit explodes when it dies. {@actSave dex} {@dc 11}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mephit. {@actSaveFail} 7 ({@damage 2d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}3 ({@damage 1d4 + 1}) Slashing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge}",
        entries: [
          "{@actSave dex} {@dc 11}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 7 ({@damage 2d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, elemental"],
    soundClip: {
      type: "internal",
      path: "bestiary/magma-mephit.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["IG", "P", "T"],
    damageTags: ["F", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Magmin",
    source: "XMM",
    page: 200,
    size: ["S"],
    type: "elemental",
    alignment: ["C", "N"],
    ac: [14],
    hp: {
      average: 13,
      formula: "3d6 + 3",
    },
    speed: {
      walk: 30,
    },
    str: 7,
    dex: 15,
    con: 12,
    int: 8,
    wis: 11,
    cha: 10,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["fire"],
    languages: ["Primordial (Ignan)"],
    cr: "1/2",
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The magmin explodes when it dies. {@actSave dex} {@dc 11}, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the magmin. {@actSaveFail} 7 ({@damage 2d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    action: [
      {
        name: "Touch",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Fire damage. If the target is a creature or a flammable object that isn't being worn or carried, it starts {@hazard burning|XPHB}.",
        ],
      },
    ],
    bonus: [
      {
        name: "Ignited Illumination",
        entries: [
          "The magmin sets itself ablaze or extinguishes its flames. While ablaze, the magmin sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
        ],
      },
    ],
    environment: ["planar, fire"],
    soundClip: {
      type: "internal",
      path: "bestiary/magmin.mp3",
    },
    traitTags: ["Death Burst"],
    senseTags: ["D"],
    languageTags: ["IG", "P"],
    damageTags: ["F"],
    miscTags: ["AOE", "MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Modron Tridrone",
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
      average: 16,
      formula: "3d8 + 3",
    },
    speed: {
      walk: 30,
    },
    str: 12,
    dex: 13,
    con: 12,
    int: 9,
    wis: 10,
    cha: 9,
    senses: ["truesight 120 ft."],
    passive: 10,
    conditionImmune: ["charmed"],
    languages: ["Modron"],
    cr: "1/2",
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
        entries: ["The modron makes three Clockwork Spear attacks."],
      },
      {
        name: "Clockwork Spear",
        entries: [
          "{@atkr m,r} {@hit 3}, reach 5 ft. or range 120 ft. {@h}4 ({@damage 1d6 + 1}) Force damage. {@hom}The spear magically returns to the modron's hand immediately after a ranged attack.",
        ],
      },
    ],
    environment: ["planar, mechanus"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Myconid Adult",
    source: "XMM",
    page: 223,
    size: ["M"],
    type: "plant",
    alignment: ["L", "N"],
    ac: [12],
    hp: {
      average: 16,
      formula: "3d8 + 3",
    },
    speed: {
      walk: 20,
    },
    str: 10,
    dex: 10,
    con: 12,
    int: 10,
    wis: 13,
    cha: 7,
    senses: ["darkvision 120 ft."],
    passive: 11,
    languages: ["telepathy 240 ft."],
    cr: "1/2",
    trait: [
      {
        name: "Sun Sickness",
        entries: [
          "While in sunlight, the myconid has {@variantrule Disadvantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}. The myconid dies if it spends more than 1 hour in sunlight.",
        ],
      },
    ],
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 2}, reach 5 ft. {@h}4 ({@damage 1d8}) Bludgeoning damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
      {
        name: "Pacifying Spores (1/Day)",
        entries: [
          "{@actSave con} {@dc 11}, one creature the myconid can see within 10 feet. {@actSaveFail} The target has the {@condition Stunned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
      {
        name: "Rapport Spores",
        entries: [
          "The myconid expels spores in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from itself. Creatures in that area with an Intelligence score of 2 or higher that aren't Constructs, Elementals, or Undead gain telepathy with a range of 30 feet for 1 hour.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/myconid-adult.mp3",
    },
    altArt: [
      {
        name: "Myconid Adult (Alt)",
        source: "XMM",
      },
    ],
    senseTags: ["SD"],
    languageTags: ["TP"],
    damageTags: ["B", "I"],
    miscTags: ["MA"],
    conditionInflict: ["stunned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Performer",
    source: "XMM",
    page: 236,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 27,
      formula: "5d8 + 5",
    },
    speed: {
      walk: 30,
    },
    str: 12,
    dex: 16,
    con: 12,
    int: 13,
    wis: 14,
    cha: 16,
    save: {
      dex: "+5",
      cha: "+5",
    },
    skill: {
      acrobatics: "+5",
      athletics: "+3",
      performance: "+7",
    },
    passive: 12,
    languages: ["Common plus one other language"],
    cr: "1/2",
    gear: ["shortsword|xphb"],
    action: [
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Uncanny Dodge",
        entries: [
          "{@actTrigger} The performer is hit by an attack roll. {@actResponse} The performer halves the damage (round down) it takes from that attack.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Piercer",
    source: "XMM",
    page: 240,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "aberration",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 22,
      formula: "3d8 + 9",
    },
    speed: {
      walk: 5,
      climb: 15,
    },
    initiative: {
      proficiency: 1,
    },
    str: 13,
    dex: 13,
    con: 16,
    int: 1,
    wis: 7,
    cha: 3,
    skill: {
      stealth: "+5",
    },
    senses: ["blindsight 30 ft.", "darkvision 60 ft."],
    passive: 8,
    cr: "1/2",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The piercer can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage.",
        ],
      },
      {
        name: "Drop",
        entries: [
          "The piercer falls. {@actSave dex} {@dc 11}, one creature directly underneath the piercer. {@actSaveFail} 10 ({@damage 3d6}) Piercing damage. {@actSaveSuccessOrFail} The piercer reduces any damage it takes from the fall by 20.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/piercer.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["B", "D"],
    damageTags: ["P"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Reef Shark",
    source: "XMM",
    page: 368,
    otherSources: [
      {
        source: "XPHB",
        page: 356,
      },
    ],
    size: ["M"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 5,
      swim: 30,
    },
    str: 14,
    dex: 15,
    con: 13,
    int: 1,
    wis: 10,
    cha: 4,
    skill: {
      perception: "+2",
    },
    senses: ["blindsight 30 ft."],
    passive: 12,
    cr: "1/2",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The shark has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the shark's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Water Breathing",
        entries: ["The shark can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/reef-shark.mp3",
    },
    traitTags: ["Pack Tactics", "Water Breathing"],
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Rust Monster",
    source: "XMM",
    page: 263,
    size: ["M"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 40,
    },
    str: 13,
    dex: 12,
    con: 13,
    int: 2,
    wis: 13,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 11,
    cr: "1/2",
    trait: [
      {
        name: "Iron Scent",
        entries: [
          "The rust monster can pinpoint the location of ferrous metal within 30 feet of itself.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The rust monster makes one Bite attack and uses Antennae twice.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d8 + 1}) Piercing damage.",
        ],
      },
      {
        name: "Antennae",
        entries: [
          "The rust monster targets one nonmagical metal object—armor or a weapon—worn or carried by a creature within 5 feet of itself. {@actSave dex} {@dc 11}, the creature with the object. {@actSaveFail} The object takes a -1 penalty to the AC it offers (armor) or to its attack rolls (weapon). Armor is destroyed if the penalty reduces its AC to 10, and a weapon is destroyed if its penalty reaches -5. The penalty can be removed by casting the {@spell Mending|XPHB} spell on the armor or weapon.",
        ],
      },
      {
        name: "Destroy Metal",
        entries: [
          "The rust monster touches a nonmagical metal object within 5 feet of itself that isn't being worn or carried. The touch destroys a 1-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of the object.",
        ],
      },
    ],
    reaction: [
      {
        name: "Reflexive Antennae",
        entries: [
          "{@actTrigger} An attack roll hits the rust monster. {@actResponse} The rust monster uses Antennae.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/rust-monster.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Sahuagin Warrior",
    source: "XMM",
    page: 264,
    size: ["M"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [12],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 30,
      swim: 40,
    },
    str: 13,
    dex: 11,
    con: 12,
    int: 12,
    wis: 13,
    cha: 9,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 15,
    resist: ["acid", "cold"],
    languages: ["Sahuagin"],
    cr: "1/2",
    trait: [
      {
        name: "Blood Frenzy",
        entries: [
          "The sahuagin has {@variantrule Advantage|XPHB} on attack rolls against any creature that doesn't have all its {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Limited Amphibiousness",
        entries: [
          "The sahuagin can breathe air and water, but it must be submerged at least once every 4 hours to avoid suffocating outside water.",
        ],
      },
      {
        name: "Shark Telepathy",
        entries: [
          "The sahuagin can magically control sharks within 120 feet of itself, using a special telepathy.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The sahuagin makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Aquatic Charge",
        entries: [
          "The sahuagin swims up to its {@variantrule Swim Speed|XPHB} straight toward an enemy it can see.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["any"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Satyr",
    source: "XMM",
    page: 268,
    size: ["M"],
    type: "fey",
    alignment: ["C", "N"],
    ac: [13],
    hp: {
      average: 31,
      formula: "7d8",
    },
    speed: {
      walk: 40,
    },
    str: 12,
    dex: 16,
    con: 11,
    int: 12,
    wis: 10,
    cha: 14,
    skill: {
      perception: "+2",
      performance: "+6",
      stealth: "+5",
    },
    passive: 12,
    languages: ["Common", "Elvish", "Sylvan"],
    cr: "1/2",
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The satyr has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Bludgeoning damage. If the target is a Medium or smaller creature, the satyr pushes the target up to 10 feet straight away from itself.",
        ],
      },
      {
        name: "Mockery",
        entries: [
          "{@actSave wis} {@dc 12}, one creature the satyr can see within 90 feet. {@actSaveFail} 5 ({@damage 1d6 + 2}) Psychic damage.",
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/satyr.mp3",
    },
    traitTags: ["Magic Resistance"],
    languageTags: ["C", "E", "S"],
    damageTags: ["B", "Y"],
    miscTags: ["MA"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Scout",
    source: "XMM",
    page: 270,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 16,
      formula: "3d8 + 3",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 14,
    con: 12,
    int: 11,
    wis: 13,
    cha: 11,
    skill: {
      nature: "+4",
      perception: "+5",
      stealth: "+6",
      survival: "+5",
    },
    passive: 15,
    languages: ["Common plus one other language"],
    cr: "1/2",
    gear: ["leather armor|xphb", "longbow|xphb", "shortsword|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The scout makes two attacks, using Shortsword and Longbow in any combination.",
        ],
      },
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/scout.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Shadow",
    source: "XMM",
    page: 272,
    otherSources: [
      {
        source: "HBTD",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 27,
      formula: "5d8 + 5",
    },
    speed: {
      walk: 40,
    },
    str: 6,
    dex: 14,
    con: 13,
    int: 6,
    wis: 10,
    cha: 8,
    skill: {
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    immune: ["necrotic", "poison"],
    vulnerable: ["radiant"],
    conditionImmune: [
      "exhaustion",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "unconscious",
    ],
    cr: "1/2",
    trait: [
      {
        name: "Amorphous",
        entries: [
          "The shadow can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Sunlight Weakness",
        entries: [
          "While in sunlight, the shadow has {@variantrule Disadvantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}.",
        ],
      },
    ],
    action: [
      {
        name: "Draining Swipe",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Necrotic damage, and the target's Strength score decreases by {@dice 1d4}. The target dies if this reduces that score to 0. If a Humanoid is slain by this attack, a Shadow rises from the corpse {@dice 1d4} hours later.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the shadow takes the Hide action.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/shadow.mp3",
    },
    traitTags: ["Amorphous"],
    senseTags: ["D"],
    damageTags: ["N"],
    miscTags: ["MA"],
  },
  {
    name: "Swarm of Insects",
    source: "XMM",
    page: 370,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 19,
      formula: "3d8 + 6",
    },
    speed: {
      walk: 20,
      choose: {
        from: ["climb", "fly"],
        amount: 20,
        note: "(DM's choice)",
      },
    },
    str: 3,
    dex: 13,
    con: 14,
    int: 1,
    wis: 7,
    cha: 1,
    senses: ["blindsight 30 ft."],
    passive: 8,
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
    cr: "1/2",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "If the swarm has a {@variantrule Climb Speed|XPHB}, the swarm can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny insect. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Poison damage, or 3 ({@damage 1d4 + 1}) Poison damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "swamp",
      "underdark",
      "urban",
    ],
    soundClip: {
      type: "internal",
      path: "bestiary/swarm-of-insects.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["B"],
    damageTags: ["I"],
    miscTags: ["MA"],
  },
  {
    name: "Tough",
    source: "XMM",
    page: 307,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 32,
      formula: "5d8 + 10",
    },
    speed: {
      walk: 30,
    },
    str: 15,
    dex: 12,
    con: 14,
    int: 10,
    wis: 10,
    cha: 11,
    passive: 10,
    languages: ["Common"],
    cr: "1/2",
    gear: ["heavy crossbow|xphb", "leather armor|xphb", "mace|xphb"],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The tough has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the tough's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Mace",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Bludgeoning damage.",
        ],
      },
      {
        name: "Heavy Crossbow",
        entries: [
          "{@atkr r} {@hit 3}, range 100/400 ft. {@h}6 ({@damage 1d10 + 1}) Piercing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    traitTags: ["Pack Tactics"],
    languageTags: ["C"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Troll Limb",
    source: "XMM",
    page: 310,
    size: ["S"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 14,
      formula: "4d6",
    },
    speed: {
      walk: 20,
    },
    str: 18,
    dex: 12,
    con: 10,
    int: 1,
    wis: 9,
    cha: 1,
    senses: ["darkvision 60 ft."],
    passive: 9,
    cr: "1/2",
    trait: [
      {
        name: "Regeneration",
        entries: [
          "The limb regains 5 {@variantrule Hit Points|XPHB} at the start of each of its turns. If the limb takes Acid or Fire damage, this trait doesn't function on the limb's next turn. The limb dies only if it starts its turn with 0 {@variantrule Hit Points|XPHB} and doesn't regenerate.",
        ],
      },
      {
        name: "Troll Spawn",
        entries: [
          "The limb uncannily has the same senses as a whole troll. If the limb isn't destroyed within 24 hours, roll {@dice 1d12}. On a 12, the limb turns into a {@creature Troll|XMM}. Otherwise, the limb withers away.",
        ],
      },
    ],
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 2d4 + 4}) Slashing damage.",
        ],
      },
    ],
    environment: ["arctic", "forest", "hill", "mountain", "swamp", "underdark"],
    traitTags: ["Regeneration"],
    senseTags: ["D"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Vine Blight",
    source: "XMM",
    page: 44,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 19,
      formula: "3d8 + 6",
    },
    speed: {
      walk: 20,
    },
    str: 15,
    dex: 8,
    con: 14,
    int: 5,
    wis: 10,
    cha: 3,
    skill: {
      stealth: "+1",
    },
    senses: ["blindsight 60 ft."],
    passive: 10,
    conditionImmune: ["deafened"],
    languages: ["Common"],
    cr: "1/2",
    spellcasting: [
      {
        name: "Entangling Plants {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The blight casts the {@spell Entangle|XPHB} spell, using Constitution as the spellcasting ability (spell save {@dc 12}).",
        ],
        recharge: {
          "5": ["{@spell Entangle|XPHB}"],
        },
        ability: "con",
        displayAs: "action",
        hidden: ["recharge"],
      },
    ],
    action: [
      {
        name: "Constricting Vine",
        entries: [
          "{@atkr m} {@hit 4}, reach 10 ft. {@h}6 ({@damage 1d8 + 2}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}). Until the grapple ends, the target takes 4 ({@damage 1d8}) Bludgeoning damage at the start of each of its turns, and the blight can't make Constricting Vine attacks.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/vine-blight.mp3",
    },
    senseTags: ["B"],
    languageTags: ["C"],
    damageTags: ["B"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["strength"],
  },
  {
    name: "Warhorse",
    source: "XMM",
    page: 373,
    otherSources: [
      {
        source: "XPHB",
        page: 359,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 19,
      formula: "3d10 + 3",
    },
    speed: {
      walk: 60,
    },
    str: 18,
    dex: 12,
    con: 13,
    int: 2,
    wis: 12,
    cha: 7,
    save: {
      wis: "+3",
    },
    passive: 11,
    cr: "1/2",
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 2d4 + 4}) Bludgeoning damage. If the target is a Large or smaller creature and the horse moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 ({@damage 2d4}) Bludgeoning damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/war-horse.mp3",
    },
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Warhorse Skeleton",
    source: "XMM",
    page: 282,
    size: ["L"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 22,
      formula: "3d10 + 6",
    },
    speed: {
      walk: 60,
    },
    str: 18,
    dex: 12,
    con: 15,
    int: 2,
    wis: 8,
    cha: 5,
    senses: ["darkvision 60 ft."],
    passive: 9,
    immune: ["poison"],
    vulnerable: ["bludgeoning"],
    conditionImmune: ["exhaustion", "poisoned"],
    cr: "1/2",
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Bludgeoning damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/warhorse-skeleton.mp3",
    },
    senseTags: ["D"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Worg",
    source: "XMM",
    page: 335,
    otherSources: [
      {
        source: "UtHftLH",
      },
    ],
    size: ["L"],
    type: "fey",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 26,
      formula: "4d10 + 4",
    },
    speed: {
      walk: 50,
    },
    str: 16,
    dex: 13,
    con: 13,
    int: 7,
    wis: 11,
    cha: 8,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Goblin", "Worg"],
    cr: "1/2",
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage, and the next attack roll made against the target before the start of the worg's next turn has {@variantrule Advantage|XPHB}.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill", "planar, feywild"],
    soundClip: {
      type: "internal",
      path: "bestiary/worg.mp3",
    },
    senseTags: ["D"],
    languageTags: ["GO", "OTH"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
];
