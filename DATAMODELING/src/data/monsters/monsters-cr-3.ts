// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_3 = [
  {
    name: "Ankylosaurus",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 348,
    size: ["H"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 68,
      formula: "8d12 + 16",
    },
    speed: {
      walk: 30,
    },
    str: 19,
    dex: 11,
    con: 15,
    int: 2,
    wis: 12,
    cha: 5,
    save: {
      str: "+6",
    },
    passive: 11,
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The ankylosaurus makes two Tail attacks."],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/ankylosaurus.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Basilisk",
    source: "XMM",
    page: 32,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 52,
      formula: "8d8 + 16",
    },
    speed: {
      walk: 20,
    },
    str: 16,
    dex: 8,
    con: 15,
    int: 2,
    wis: 8,
    cha: 7,
    senses: ["darkvision 60 ft."],
    passive: 9,
    cr: "3",
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Petrifying Gaze {@recharge 4}",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. If the basilisk sees its reflection within the {@variantrule Cone [Area of Effect]|XPHB|Cone}, the basilisk must make this save. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
        ],
      },
    ],
    environment: ["mountain", "underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/basilisk.mp3",
    },
    senseTags: ["D"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["petrified", "restrained"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Bearded Devil",
    group: ["Devils"],
    source: "XMM",
    page: 33,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 58,
      formula: "9d8 + 18",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 15,
    con: 15,
    int: 9,
    wis: 11,
    cha: 14,
    save: {
      str: "+5",
      con: "+4",
      cha: "+4",
    },
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 10,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["frightened", "poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "3",
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The devil has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The devil makes one Beard attack and one Infernal Glaive attack.",
        ],
      },
      {
        name: "Beard",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the devil's next turn. Until this poison ends, the target can't regain {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Infernal Glaive",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage. If the target is a creature and doesn't already have an infernal wound, it is subjected to the following effect. {@actSave con} {@dc 12}. {@actSaveFail} The target receives an infernal wound. While wounded, the target loses 5 ({@dice 1d10}) {@variantrule Hit Points|XPHB} at the start of each of its turns. The wound closes after 1 minute, after a spell restores {@variantrule Hit Points|XPHB} to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, doing so by succeeding on a {@dc 12} Wisdom ({@skill Medicine|XPHB}) check.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/bearded-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Blue Dragon Wyrmling",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 48,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
      burrow: 15,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 10,
    con: 15,
    int: 12,
    wis: 11,
    cha: 15,
    save: {
      dex: "+2",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      stealth: "+2",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 14,
    immune: ["lightning"],
    languages: ["Draconic"],
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage plus 3 ({@damage 1d6}) Lightning damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 12}, each creature in a 30-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 21 ({@damage 6d6}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["coastal", "desert"],
    treasure: ["relics"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/blue-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["L", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Bugbear Stalker",
    group: ["Goblinoids"],
    source: "XMM",
    page: 62,
    size: ["M"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
    },
    str: 17,
    dex: 14,
    con: 14,
    int: 11,
    wis: 12,
    cha: 11,
    save: {
      con: "+4",
      wis: "+3",
    },
    skill: {
      stealth: "+6",
      survival: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    languages: ["Common", "Goblin"],
    cr: "3",
    gear: [
      "chain shirt|xphb",
      {
        item: "javelin|xphb",
        quantity: 6,
      },
      "morningstar|xphb",
    ],
    trait: [
      {
        name: "Abduct",
        entries: [
          "The bugbear needn't spend extra movement to move a creature it is grappling.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The bugbear makes two Javelin or Morningstar attacks."],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 10 ft. or range 30/120 ft. {@h}13 ({@damage 3d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Morningstar",
        entries: [
          "{@atkr m} {@hit 5} (with {@variantrule Advantage|XPHB} if the target is {@condition Grappled|XPHB} by the bugbear), reach 10 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Quick Grapple",
        entries: [
          "{@actSave dex} {@dc 13}, one Medium or smaller creature the bugbear can see within 10 feet. {@actSaveFail} The target has the {@condition Grappled|XPHB} condition (escape {@dc 13}).",
        ],
      },
    ],
    environment: ["forest", "grassland", "planar, feywild", "underdark"],
    treasure: ["armaments", "individual"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GO"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RCH", "THW"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Displacer Beast",
    source: "XMM",
    page: 98,
    size: ["L"],
    type: "monstrosity",
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 76,
      formula: "9d10 + 27",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 6,
    wis: 12,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 11,
    languages: ["understands Sylvan but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Avoidance",
        entries: [
          "If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the save and half damage if it fails. It can't use this trait if it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Displacement",
        entries: [
          "Attack rolls against the displacer beast have {@variantrule Disadvantage|XPHB}, since it projects an illusion that makes it appear to be near its actual location. This trait is suppressed while the displacer beast has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The displacer beast makes one Rend attack and one Tentacle attack.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 feet. {@h}9 ({@damage 1d10 + 4}) Slashing damage. If target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 feet. {@h}11 ({@damage 2d6 + 4}) Piercing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/displacer-beast.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack", "Tentacles"],
    languageTags: ["CS", "S"],
    damageTags: ["P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "prone"],
  },
  {
    name: "Doppelganger",
    source: "XMM",
    page: 100,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 52,
      formula: "8d8 + 16",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 18,
    con: 14,
    int: 11,
    wis: 12,
    cha: 14,
    skill: {
      deception: "+6",
      insight: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    conditionImmune: ["charmed"],
    languages: ["Common plus three other languages"],
    cr: "3",
    spellcasting: [
      {
        name: "Read Thoughts",
        type: "spellcasting",
        headerEntries: [
          "The doppelganger casts {@spell Detect Thoughts|XPHB}, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 12}).",
        ],
        will: ["{@spell Detect Thoughts|XPHB}"],
        ability: "cha",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The doppelganger makes two Slam attacks and uses Unsettling Visage if available.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 6} (with {@variantrule Advantage|XPHB} during the first round of each combat), reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Bludgeoning damage.",
        ],
      },
      {
        name: "Unsettling Visage {@recharge}",
        entries: [
          "{@actSave wis} {@dc 12}, each creature in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the doppelganger that can see the doppelganger. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The doppelganger shape-shifts into a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/doppelganger.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["B"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Flaming Skeleton",
    source: "XMM",
    page: 283,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 14,
    con: 15,
    int: 10,
    wis: 15,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["fire", "poison"],
    vulnerable: ["bludgeoning"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["understands Common plus one other language but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Death Burst",
        entries: [
          "The skeleton explodes when it dies. {@actSave dex} {@dc 12}, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the skeleton. {@actSaveFail} 14 ({@damage 4d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Illumination",
        entries: [
          "The skeleton sheds {@variantrule Bright Light|XPHB} in a 15-foot radius and {@variantrule Dim Light|XPHB} for an additional 15 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The skeleton makes two attacks, using Flame Scepter or Hurl Flame in any combination.",
        ],
      },
      {
        name: "Flame Scepter",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Bludgeoning damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Hurl Flame",
        entries: [
          "{@atkr r} {@hit 4}, range 60 ft. {@h}7 ({@damage 1d10 + 2}) Fire damage.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    traitTags: ["Death Burst", "Illumination"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["B", "F"],
    miscTags: ["AOE", "MA", "RA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Giant Scorpion",
    source: "XMM",
    page: 359,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 52,
      formula: "7d10 + 14",
    },
    speed: {
      walk: 40,
    },
    str: 16,
    dex: 13,
    con: 15,
    int: 1,
    wis: 9,
    cha: 3,
    senses: ["blindsight 60 ft."],
    passive: 9,
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The scorpion makes two Claw attacks and one Sting attack."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}) from one of two claws.",
        ],
      },
      {
        name: "Sting",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage plus 11 ({@damage 2d10}) Poison damage.",
        ],
      },
    ],
    environment: ["desert"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-scorpion.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Githyanki Warrior",
    source: "XMM",
    page: 134,
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 49,
      formula: "9d8 + 9",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 14,
    con: 12,
    int: 13,
    wis: 13,
    cha: 10,
    save: {
      con: "+3",
      int: "+3",
      wis: "+3",
    },
    passive: 11,
    languages: ["Common", "Gith"],
    cr: "3",
    gear: ["half plate armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability:",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "2": ["{@spell Nondetection|XPHB} (self only)"],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Misty Step (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The githyanki casts {@spell Misty Step|XPHB}, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Misty Step|XPHB}"],
        },
        ability: "int",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The githyanki makes two Psi Blade attacks."],
      },
      {
        name: "Psi Blade",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Slashing damage plus 7 ({@damage 2d6}) Psychic damage.",
        ],
      },
    ],
    environment: ["planar, astral"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/githyanki-warrior.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "GTH"],
    damageTags: ["S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
  },
  {
    name: "Goblin Hexer",
    group: ["Goblinoids"],
    source: "XMM",
    page: 143,
    size: ["S"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "N"],
    ac: [13],
    hp: {
      average: 45,
      formula: "10d6 + 10",
    },
    speed: {
      walk: 30,
    },
    str: 8,
    dex: 16,
    con: 12,
    int: 16,
    wis: 10,
    cha: 10,
    skill: {
      "sleight of hand": "+5",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Common", "Goblin"],
    cr: "3",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The goblin casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Minor Illusion|XPHB}"],
        daily: {
          "1e": [
            "{@spell Blindness/Deafness|XPHB}",
            "{@spell Faerie Fire|XPHB}",
            "{@spell Grease|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The goblin makes two Hex Stick attacks. It can replace one attack with a use of Spellcasting.",
        ],
      },
      {
        name: "Hex Stick",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 60 ft. {@h}12 ({@damage 2d8 + 3}) Psychic damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Jinx",
        entries: [
          "{@actTrigger} A creature the goblin can see hits it with an attack roll. {@actResponse d}{@actSave wis} {@dc 13}, the triggering creature. {@actSaveFail} The attack misses instead.",
        ],
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
    actionTags: ["Multiattack"],
    languageTags: ["C", "GO"],
    damageTags: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["blinded", "deafened", "prone"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["constitution", "dexterity"],
  },
  {
    name: "Gold Dragon Wyrmling",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 144,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [17],
    hp: {
      average: 60,
      formula: "8d8 + 24",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 14,
    con: 17,
    int: 14,
    wis: 11,
    cha: 16,
    save: {
      dex: "+4",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      stealth: "+4",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 14,
    immune: ["fire"],
    languages: ["Draconic"],
    cr: "3",
    trait: [
      {
        name: "Amphibious",
        entries: ["The dragon can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 1d10 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 13}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 22 ({@damage 4d10}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Weakening Breath",
        entries: [
          "{@actSave str} {@dc 13}, each creature that isn't currently affected by this breath in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} and subtracts 2 ({@dice 1d4}) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["forest", "grassland"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/gold-dragon-wyrmlin.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Green Hag",
    source: "XMM",
    page: 156,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "fey",
    alignment: ["N", "E"],
    ac: [17],
    hp: {
      average: 82,
      formula: "11d8 + 33",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 18,
    dex: 12,
    con: 16,
    int: 13,
    wis: 14,
    cha: 14,
    skill: {
      arcana: "+5",
      deception: "+4",
      perception: "+4",
      stealth: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Common", "Elvish", "Sylvan"],
    cr: "3",
    spellcasting: [
      {
        name: "Coven Magic",
        type: "spellcasting",
        headerEntries: [
          "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save {@dc 11}): {@spell Augury|XPHB}, {@spell Find Familiar|XPHB}, {@spell Identify|XPHB}, {@spell Locate Object|XPHB}, {@spell Scrying|XPHB}, or {@spell Unseen Servant|XPHB}. The hag must finish a {@variantrule Long Rest|XPHB} before using this trait to cast that spell again.",
        ],
        restLong: {
          "1": [
            "{@spell Augury|XPHB}",
            "{@spell Find Familiar|XPHB}",
            "{@spell Identify|XPHB}",
            "{@spell Locate Object|XPHB}",
            "{@spell Scrying|XPHB}",
            "{@spell Unseen Servant|XPHB}",
          ],
        },
        ability: "int",
        hidden: ["restLong"],
      },
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The hag casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 12}, {@hit 4} to hit with spell attacks):",
        ],
        will: [
          "{@spell Dancing Lights|XPHB}",
          "{@spell Disguise Self|XPHB} (24-hour duration)",
          "{@spell Invisibility|XPHB} (self only, and the hag leaves no tracks while Invisible)",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Ray of Sickness|XPHB} (level 3 version)",
        ],
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The hag can breathe air and water."],
      },
      {
        name: "Mimicry",
        entries: [
          "The hag can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful {@dc 14} Wisdom ({@skill Insight|XPHB}) check.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hag makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Slashing damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
    ],
    environment: ["forest", "hill", "swamp"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/green-hag.mp3",
    },
    traitTags: ["Amphibious", "Mimicry"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "E", "S"],
    damageTags: ["I", "S"],
    damageTagsSpell: ["I"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["invisible", "poisoned"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Grell",
    source: "XMM",
    page: 157,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 55,
      formula: "10d8 + 10",
    },
    speed: {
      walk: 10,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 15,
    dex: 14,
    con: 13,
    int: 12,
    wis: 11,
    cha: 9,
    skill: {
      perception: "+4",
      stealth: "+6",
    },
    senses: ["blindsight 60 ft."],
    passive: 14,
    immune: ["lightning"],
    conditionImmune: ["blinded", "prone"],
    languages: ["Deep Speech"],
    cr: "3",
    trait: [
      {
        name: "Abduct",
        entries: [
          "The grell needn't spend extra movement to move a creature it is grappling.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The grell makes one Beak attack and one Paralyzing Tentacles attack.",
        ],
      },
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}11 ({@damage 2d8 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Paralyzing Tentacles",
        entries: [
          "{@atkr m} {@hit 4}, reach 10 ft. {@h}7 ({@damage 1d10 + 2}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}) from two of ten tentacles. The target is also subjected to the following effect. {@actSave con} {@dc 11}. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While {@condition Poisoned|XPHB}, the target has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/grell.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["DS"],
    damageTags: ["P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "paralyzed", "poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Hell Hound",
    source: "XMM",
    page: 165,
    size: ["M"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 58,
      formula: "9d8 + 18",
    },
    speed: {
      walk: 50,
    },
    str: 17,
    dex: 12,
    con: 14,
    int: 6,
    wis: 13,
    cha: 6,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    immune: ["fire"],
    languages: ["understands Infernal but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The hound has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the hound's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hound makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 12}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 17 ({@damage 5d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["mountain", "planar, lower", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/hell-hound.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["CS", "I"],
    damageTags: ["F", "P"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Hobgoblin Captain",
    group: ["Goblinoids"],
    source: "XMM",
    page: 171,
    size: ["M"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 58,
      formula: "9d8 + 18",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 14,
    con: 14,
    int: 12,
    wis: 10,
    cha: 13,
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Common", "Goblin"],
    cr: "3",
    gear: ["greatsword|xphb", "half plate armor|xphb", "longbow|xphb"],
    trait: [
      {
        name: "Aura of Authority",
        entries: [
          "While in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the hobgoblin, the hobgoblin and its allies have {@variantrule Advantage|XPHB} on attack rolls and saving throws, provided the hobgoblin doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The hobgoblin makes two attacks, using Greatsword or Longbow in any combination.",
        ],
      },
      {
        name: "Greatsword",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Slashing damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage plus 5 ({@damage 2d4}) Poison damage.",
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
    soundClip: {
      type: "internal",
      path: "bestiary/hobgoblin-captain.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GO"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Hook Horror",
    source: "XMM",
    page: 173,
    size: ["L"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 75,
      formula: "10d10 + 20",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 18,
    dex: 10,
    con: 15,
    int: 6,
    wis: 12,
    cha: 7,
    save: {
      con: "+4",
    },
    skill: {
      perception: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 15,
    languages: ["Hook Horror"],
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The hook horror makes two Hook attacks."],
      },
      {
        name: "Hook",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage. If the target is a Large or smaller creature, the hook horror moves the target 5 feet straight toward or away from itself.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/hook-horror.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["P"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Killer Whale",
    source: "XMM",
    page: 364,
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 90,
      formula: "12d12 + 12",
    },
    speed: {
      walk: 5,
      swim: 60,
    },
    str: 19,
    dex: 14,
    con: 13,
    int: 3,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+3",
      stealth: "+4",
    },
    senses: ["blindsight 120 ft."],
    passive: 13,
    cr: "3",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The whale can hold its breath for 30 minutes."],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}21 ({@damage 5d6 + 4}) Piercing damage.",
        ],
      },
    ],
    environment: ["underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/killer-whale.mp3",
    },
    traitTags: ["Hold Breath"],
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Knight",
    source: "XMM",
    page: 184,
    otherSources: [
      {
        source: "ScoEE",
      },
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
    ac: [18],
    hp: {
      average: 52,
      formula: "8d8 + 16",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 11,
    con: 14,
    int: 11,
    wis: 11,
    cha: 15,
    save: {
      con: "+4",
      wis: "+2",
    },
    passive: 10,
    conditionImmune: ["frightened"],
    languages: ["Common plus one other language"],
    cr: "3",
    gear: ["greatsword|xphb", "heavy crossbow|xphb", "plate armor|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The knight makes two attacks, using Greatsword or Heavy Crossbow in any combination.",
        ],
      },
      {
        name: "Greatsword",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage plus 4 ({@damage 1d8}) Radiant damage.",
        ],
      },
      {
        name: "Heavy Crossbow",
        entries: [
          "{@atkr r} {@hit 2}, range 100/400 ft. {@h}11 ({@damage 2d10}) Piercing damage plus 4 ({@damage 1d8}) Radiant damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The knight is hit by a melee attack roll while holding a weapon. {@actResponse} The knight adds 2 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/knight.mp3",
    },
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["C", "X"],
    damageTags: ["P", "R", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Kuo-toa Monitor",
    source: "XMM",
    page: 190,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 16,
    dex: 10,
    con: 14,
    int: 12,
    wis: 14,
    cha: 11,
    skill: {
      perception: "+6",
      religion: "+3",
    },
    senses: ["darkvision 120 ft.", "truesight 30 ft."],
    passive: 16,
    languages: ["Undercommon"],
    cr: "3",
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
        name: "Multiattack",
        entries: ["The kuo-toa makes two Bone Whip attacks."],
      },
      {
        name: "Bone Whip",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage plus 7 ({@damage 2d6}) Lightning damage, and the target can't make {@action Opportunity Attack|XPHB|Opportunity Attacks} until the start of the kuo-toa's next turn.",
        ],
      },
    ],
    environment: ["coastal", "underdark"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/kuo-toa-monitor.mp3",
    },
    traitTags: ["Amphibious", "Sunlight Sensitivity"],
    senseTags: ["SD", "U"],
    actionTags: ["Multiattack"],
    languageTags: ["U"],
    damageTags: ["L", "S"],
    miscTags: ["MA", "MLW", "RCH"],
  },
  {
    name: "Manticore",
    source: "XMM",
    page: 202,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["L", "E"],
    ac: [14],
    hp: {
      average: 68,
      formula: "8d10 + 24",
    },
    speed: {
      walk: 30,
      fly: 50,
    },
    str: 17,
    dex: 16,
    con: 17,
    int: 7,
    wis: 12,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 11,
    languages: ["Common"],
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The manticore makes three attacks, using Rend or Tail Spike in any combination.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Tail Spike",
        entries: [
          "{@atkr r} {@hit 5}, range 100/200 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: ["arctic", "coastal", "grassland", "hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/manticore.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Minotaur of Baphomet",
    source: "XMM",
    page: 215,
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 85,
      formula: "10d10 + 30",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 11,
    con: 16,
    int: 6,
    wis: 16,
    cha: 9,
    skill: {
      perception: "+7",
      survival: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 17,
    languages: ["Abyssal"],
    cr: "3",
    action: [
      {
        name: "Abyssal Glaive",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}10 ({@damage 1d12 + 4}) Slashing damage plus 10 ({@damage 3d6}) Necrotic damage.",
        ],
      },
      {
        name: "Gore {@recharge 5}",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}18 ({@damage 4d6 + 4}) Piercing damage. If the target is a Large or smaller creature and the minotaur moved 10+ feet straight toward it immediately before the hit, the target takes an extra 10 ({@damage 3d6}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["armaments"],
    senseTags: ["D"],
    languageTags: ["AB"],
    damageTags: ["N", "P", "S"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Mummy",
    source: "XMM",
    page: 219,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [11],
    hp: {
      average: 58,
      formula: "9d8 + 18",
    },
    speed: {
      walk: 20,
    },
    str: 16,
    dex: 8,
    con: 15,
    int: 6,
    wis: 12,
    cha: 12,
    save: {
      wis: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    immune: ["necrotic", "poison"],
    vulnerable: ["fire"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    languages: ["Common plus two other languages"],
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The mummy makes two Rotting Fist attacks and uses Dreadful Glare.",
        ],
      },
      {
        name: "Rotting Fist",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Bludgeoning damage plus 10 ({@damage 3d6}) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain {@variantrule Hit Points|XPHB}, its {@variantrule Hit Points|XPHB|Hit Point} maximum doesn't return to normal when finishing a {@variantrule Long Rest|XPHB}, and its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 10 ({@dice 3d6}) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 {@variantrule Hit Points|XPHB} by this attack.",
        ],
      },
      {
        name: "Dreadful Glare",
        entries: [
          "{@actSave wis} {@dc 11}, one creature the mummy can see within 60 feet. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the end of the mummy's next turn. {@actSaveSuccess} The target is immune to this mummy's Dreadful Glare for 24 hours.",
        ],
      },
    ],
    environment: ["desert", "swamp"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/mummy.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "N"],
    miscTags: ["CUR", "MA"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Nightmare",
    source: "XMM",
    page: 226,
    size: ["L"],
    type: "fiend",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 68,
      formula: "8d10 + 24",
    },
    speed: {
      walk: 60,
      fly: {
        number: 90,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 10,
    wis: 13,
    cha: 15,
    passive: 11,
    immune: ["fire"],
    languages: [
      "understands Abyssal",
      "Common",
      "and Infernal but can't speak",
    ],
    cr: "3",
    trait: [
      {
        name: "Confer Fire Resistance",
        entries: [
          "The nightmare can grant {@variantrule Resistance|XPHB} to Fire damage to a rider while it is on the nightmare.",
        ],
      },
      {
        name: "Illumination",
        entries: [
          "The nightmare sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage plus 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Ethereal Stride",
        entries: [
          "The nightmare and up to three willing creatures within 5 feet of it teleport to the Ethereal Plane from the Material Plane or vice versa.",
        ],
      },
    ],
    environment: ["planar, lower"],
    soundClip: {
      type: "internal",
      path: "bestiary/nightmare.mp3",
    },
    traitTags: ["Illumination"],
    languageTags: ["AB", "C", "CS", "I"],
    damageTags: ["B", "F"],
    miscTags: ["AOE", "MA"],
  },
  {
    name: "Owlbear",
    source: "XMM",
    page: 234,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 59,
      formula: "7d10 + 21",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    str: 20,
    dex: 12,
    con: 17,
    int: 3,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The owlbear makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Slashing damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/owlbear.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Phase Spider",
    source: "XMM",
    page: 239,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 45,
      formula: "7d10 + 7",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 15,
    dex: 16,
    con: 12,
    int: 6,
    wis: 10,
    cha: 6,
    skill: {
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    cr: "3",
    trait: [
      {
        name: "Ethereal Sight",
        entries: [
          "The spider can see 60 feet into the Ethereal Plane while on the Material Plane and vice versa.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Web Walker",
        entries: [
          "The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The spider makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Piercing damage plus 9 ({@damage 2d8}) Poison damage. If this damage reduces the target to 0 {@variantrule Hit Points|XPHB}, the target becomes {@variantrule Stable|XPHB}, and it has the {@condition Poisoned|XPHB} condition for 1 hour. While {@condition Poisoned|XPHB}, the target also has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Ethereal Jaunt",
        entries: [
          "The spider teleports from the Material Plane to the Ethereal Plane or vice versa.",
        ],
      },
    ],
    environment: [
      "desert",
      "forest",
      "grassland",
      "hill",
      "planar, ethereal",
      "underdark",
      "urban",
    ],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/phase-spider.mp3",
    },
    traitTags: ["Spider Climb", "Web Walker"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["paralyzed", "poisoned"],
  },
  {
    name: "Quaggoth Thonot",
    source: "XMM",
    page: 251,
    size: ["M"],
    type: "monstrosity",
    alignment: ["C", "N"],
    ac: [15],
    hp: {
      average: 67,
      formula: "9d8 + 27",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 17,
    dex: 12,
    con: 16,
    int: 6,
    wis: 14,
    cha: 7,
    skill: {
      athletics: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 12,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Undercommon"],
    cr: "3",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The quaggoth casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save {@dc 12}):",
        ],
        will: [
          "{@spell Mage Hand|XPHB} (the hand is Invisible)",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "2": ["{@spell Mind Spike|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Psionic Defense (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The quaggoth casts {@spell Feather Fall|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": ["{@spell Feather Fall|XPHB}", "{@spell Shield|XPHB}"],
        },
        ability: "wis",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Bloodied Fury",
        entries: [
          "While {@variantrule Bloodied|XPHB}, the quaggoth has {@variantrule Advantage|XPHB} on attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The quaggoth makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage plus 5 ({@damage 2d4}) Psychic damage.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/quaggoth-thonot.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["U"],
    damageTags: ["S", "Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Scout Captain",
    source: "XMM",
    page: 270,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 11,
    dex: 16,
    con: 12,
    int: 14,
    wis: 15,
    cha: 11,
    save: {
      dex: "+5",
      int: "+4",
    },
    skill: {
      perception: "+6",
      stealth: "+7",
      survival: "+6",
    },
    passive: 16,
    languages: ["Common plus one other language"],
    cr: "3",
    gear: ["longbow|xphb", "shortsword|xphb", "studded leather armor|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The scout makes two attacks, using Shortsword or Longbow in any combination.",
        ],
      },
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage, plus 10 ({@damage 3d6}) Piercing damage if the attack was made with {@variantrule Advantage|XPHB}.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 5}, range 150/600 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage, plus 10 ({@damage 3d6}) Piercing damage if the attack was made with {@variantrule Advantage|XPHB}.",
        ],
      },
    ],
    bonus: [
      {
        name: "Aim",
        entries: [
          "The scout has {@variantrule Advantage|XPHB} on the next attack roll it makes during the current turn.",
        ],
      },
    ],
    reaction: [
      {
        name: "Uncanny Dodge",
        entries: [
          "{@actTrigger} The scout is hit by an attack roll. {@actResponse} The scout halves the damage (round down) it takes from that attack.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Spectator",
    group: ["Beholders"],
    source: "XMM",
    page: 289,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["beholder"],
    },
    alignment: ["L", "N"],
    ac: [14],
    hp: {
      average: 45,
      formula: "7d8 + 14",
    },
    speed: {
      walk: 5,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 8,
    dex: 14,
    con: 14,
    int: 13,
    wis: 14,
    cha: 11,
    skill: {
      perception: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    conditionImmune: ["exhaustion", "prone"],
    languages: ["Deep Speech", "Undercommon; telepathy 120 ft."],
    cr: "3",
    action: [
      {
        name: "Multiattack",
        entries: ["The spectator uses Eye Rays twice."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Eye Rays",
        entries: [
          "The spectator randomly shoots one of the following magical rays at a target it can see within 90 feet of itself (roll {@dice 1d4}; reroll if the spectator has already used that ray during this turn):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1: Confusion Ray",
                entries: [
                  "{@actSave wis} {@dc 12}. {@actSaveFail} 5 ({@damage 2d4}) Psychic damage, and the target can't take Reactions until the end of its next turn. On its next turn, the target can't move, and it uses its action to make a melee or ranged attack against a randomly determined creature within range. If the target can't attack, it does nothing on that turn.",
                ],
              },
              {
                type: "item",
                name: "2: Paralyzing Ray",
                entries: [
                  "{@actSave con} {@dc 12}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
                ],
              },
              {
                type: "item",
                name: "3: Fear Ray",
                entries: [
                  "{@actSave wis} {@dc 12}. {@actSaveFail} 5 ({@damage 2d4}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn.",
                ],
              },
              {
                type: "item",
                name: "4: Wounding Ray",
                entries: [
                  "{@actSave con} {@dc 12}. {@actSaveFail} 16 ({@damage 3d10}) Necrotic damage. {@actSaveSuccess} Half damage.",
                ],
              },
            ],
          },
        ],
      },
    ],
    reaction: [
      {
        name: "Spell Reflection",
        entries: [
          "{@actTrigger} The spectator succeeds on a saving throw against a spell, or a spell's attack roll misses it. {@actResponse d}{@actSave dex} {@dc 12}, one creature the spectator can see within 120 feet. {@actSaveFail} 10 ({@damage 3d6}) Force damage.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/spectator.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["DS", "TP", "U"],
    damageTags: ["N", "O", "P", "Y"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "paralyzed"],
    savingThrowForced: ["constitution", "dexterity", "wisdom"],
  },
  {
    name: "Swarm of Crawling Claws",
    source: "XMM",
    page: 83,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "undead",
      swarmSize: "T",
    },
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 49,
      formula: "11d8",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 14,
    con: 11,
    int: 5,
    wis: 10,
    cha: 4,
    senses: ["blindsight 30 ft."],
    passive: 10,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "incapacitated",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "stunned",
    ],
    languages: ["understands Common but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Swarm of Grasping Hands",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}20 ({@damage 4d8 + 2}) Necrotic damage, or 11 ({@damage 2d8 + 2}) Necrotic damage if the swarm is {@variantrule Bloodied|XPHB}. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["any"],
    senseTags: ["B"],
    languageTags: ["C", "CS"],
    damageTags: ["N"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Swarm of Lemures",
    group: ["Devils"],
    source: "XMM",
    page: 194,
    size: ["L"],
    type: {
      type: "fiend",
      swarmSize: "M",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [12],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 40,
    },
    str: 14,
    dex: 7,
    con: 14,
    int: 1,
    wis: 12,
    cha: 3,
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 11,
    resist: ["bludgeoning", "cold", "piercing", "slashing"],
    immune: ["fire", "poison"],
    conditionImmune: [
      "charmed",
      "frightened",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "stunned",
    ],
    languages: ["understands Infernal but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Hellish Restoration",
        entries: [
          "If the swarm dies in the Nine Hells, it revives with all its {@variantrule Hit Points|XPHB} in {@dice 1d10} days unless it is killed by a creature under the effects of a {@spell Bless|XPHB} spell or its remains are sprinkled with Holy Water.",
        ],
      },
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium creature. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The swarm makes two Vile Slime attacks."],
      },
      {
        name: "Vile Slime",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}11 ({@damage 2d8 + 2}) Poison damage, or 9 ({@damage 2d6 + 2}) Poison damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    traitTags: ["Devil's Sight"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["CS", "I"],
    damageTags: ["I"],
    miscTags: ["MA"],
  },
  {
    name: "Vampire Familiar",
    source: "XMM",
    page: 314,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 16,
    con: 15,
    int: 10,
    wis: 10,
    cha: 14,
    save: {
      dex: "+5",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      persuasion: "+4",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    resist: ["necrotic"],
    conditionImmune: [
      {
        conditionImmune: ["charmed"],
        note: "(except from its vampire master)",
        cond: true,
      },
    ],
    languages: ["Common plus one other language"],
    cr: "3",
    gear: [
      {
        item: "dagger|xphb",
        quantity: 10,
      },
    ],
    trait: [
      {
        name: "Vampiric Connection",
        entries: [
          "While the familiar and its vampire master are on the same plane of existence, the vampire can communicate with the familiar telepathically, and the vampire can perceive through the familiar's senses.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The familiar makes two Umbral Dagger attacks."],
      },
      {
        name: "Umbral Dagger",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 20/60 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage plus 7 ({@damage 3d4}) Necrotic damage. If the target is reduced to 0 {@variantrule Hit Points|XPHB} by this attack, the target becomes {@variantrule Stable|XPHB} but has the {@condition Poisoned|XPHB} condition for 1 hour. While it has the {@condition Poisoned|XPHB} condition, the target has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Deathless Agility",
        entries: ["The familiar takes the Dash or Disengage action."],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["N", "P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
    conditionInflict: ["paralyzed", "poisoned"],
  },
  {
    name: "Warrior Veteran",
    source: "XMM",
    page: 320,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 65,
      formula: "10d8 + 20",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 13,
    con: 14,
    int: 10,
    wis: 11,
    cha: 10,
    skill: {
      athletics: "+5",
      perception: "+2",
    },
    passive: 12,
    languages: ["Common plus one other language"],
    cr: "3",
    gear: ["greatsword|xphb", "heavy crossbow|xphb", "splint armor|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The warrior makes two Greatsword or Heavy Crossbow attacks.",
        ],
      },
      {
        name: "Greatsword",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Heavy Crossbow",
        entries: [
          "{@atkr r} {@hit 3}, range 100/400 ft. {@h}12 ({@damage 2d10 + 1}) Piercing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The warrior is hit by a melee attack roll while holding a weapon. {@actResponse} The warrior adds 2 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["C", "X"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Water Weird",
    source: "XMM",
    page: 323,
    size: ["L"],
    type: "elemental",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 65,
      formula: "10d10 + 10",
    },
    speed: {
      walk: 5,
      swim: 60,
    },
    str: 17,
    dex: 16,
    con: 13,
    int: 11,
    wis: 10,
    cha: 10,
    senses: ["blindsight 30 ft."],
    passive: 10,
    resist: ["fire"],
    immune: ["poison"],
    conditionImmune: [
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "unconscious",
    ],
    languages: ["understands Primordial but can't speak"],
    cr: "3",
    trait: [
      {
        name: "Invisible in Water",
        entries: [
          "The water weird has the {@condition Invisible|XPHB} condition while fully immersed in water.",
        ],
      },
      {
        name: "Water Bound",
        entries: [
          "The water weird dies if it leaves the water to which it is bound or if that water is destroyed.",
        ],
      },
    ],
    action: [
      {
        name: "Surge",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}13 ({@damage 3d6 + 3}) Cold damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/water-weird.mp3",
    },
    senseTags: ["B"],
    languageTags: ["CS", "P"],
    damageTags: ["C"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "invisible", "restrained"],
  },
  {
    name: "Werewolf",
    group: ["Lycanthropes"],
    source: "XMM",
    page: 327,
    size: ["S", "M"],
    type: {
      type: "monstrosity",
      tags: ["lycanthrope"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 71,
      formula: "11d8 + 22",
    },
    speed: {
      walk: 30,
      alternate: {
        walk: [
          {
            number: 40,
            condition: "(wolf form only)",
          },
        ],
      },
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 14,
    con: 14,
    int: 10,
    wis: 11,
    cha: 10,
    skill: {
      perception: "+4",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Common (can't speak in wolf form)"],
    cr: "3",
    gear: ["longbow|xphb"],
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The werewolf has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the werewolf's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The werewolf makes two attacks, using Scratch or Longbow in any combination. It can replace one attack with a Bite attack.",
        ],
      },
      {
        name: "Bite (Wolf or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. {@actSave con} {@dc 12}. {@actSaveFail} The target is cursed. If the cursed target drops to 0 {@variantrule Hit Points|XPHB}, it instead becomes a Werewolf under the DM's control and has 10 {@variantrule Hit Points|XPHB}. {@actSaveSuccess} The target is immune to this werewolf's curse for 24 hours.",
        ],
      },
      {
        name: "Scratch",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Longbow (Humanoid or Hybrid Form Only)",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}11 ({@damage 2d8 + 2}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The werewolf shape-shifts into a Large wolf-humanoid hybrid or a Medium wolf, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["forest", "hill"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/werewolf.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS"],
    damageTags: ["P", "S"],
    miscTags: ["CUR", "MA", "RA", "RNG"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Wight",
    source: "XMM",
    page: 332,
    size: ["M"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [14],
    hp: {
      average: 82,
      formula: "11d8 + 33",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 14,
    con: 16,
    int: 10,
    wis: 13,
    cha: 15,
    skill: {
      perception: "+3",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    resist: ["necrotic"],
    immune: ["poison"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["Common plus one other language"],
    cr: "3",
    gear: ["studded leather armor|xphb"],
    trait: [
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the wight has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The wight makes two attacks, using Necrotic Sword or Necrotic Bow in any combination. It can replace one attack with a use of Life Drain.",
        ],
      },
      {
        name: "Necrotic Sword",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Slashing damage plus 4 ({@damage 1d8}) Necrotic damage.",
        ],
      },
      {
        name: "Necrotic Bow",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage plus 4 ({@damage 1d8}) Necrotic damage.",
        ],
      },
      {
        name: "Life Drain",
        entries: [
          "{@actSave con} {@dc 13}, one creature within 5 feet. {@actSaveFail} 6 ({@damage 1d8 + 2}) Necrotic damage, and the target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken.",
          "A Humanoid slain by this attack rises 24 hours later as a {@creature Zombie|XMM} under the wight's control, unless the Humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at a time.",
        ],
      },
    ],
    environment: [
      "desert",
      "planar, shadowfell",
      "swamp",
      "underdark",
      "urban",
    ],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/wight.mp3",
    },
    traitTags: ["Sunlight Sensitivity"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["N", "P", "S"],
    miscTags: ["MA", "RA"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Winter Wolf",
    source: "XMM",
    page: 334,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 75,
      formula: "10d10 + 20",
    },
    speed: {
      walk: 50,
    },
    str: 18,
    dex: 13,
    con: 14,
    int: 7,
    wis: 12,
    cha: 8,
    skill: {
      perception: "+5",
      stealth: "+5",
    },
    passive: 15,
    immune: ["cold"],
    languages: ["Common", "Giant"],
    cr: "3",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The wolf has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 18 ({@damage 4d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["arctic"],
    soundClip: {
      type: "internal",
      path: "bestiary/winter-wolf.mp3",
    },
    traitTags: ["Pack Tactics"],
    actionTags: ["Breath Weapon"],
    languageTags: ["C", "GI"],
    damageTags: ["C", "P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Yeti",
    source: "XMM",
    page: 339,
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 51,
      formula: "6d10 + 18",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    str: 18,
    dex: 13,
    con: 16,
    int: 8,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+5",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    immune: ["cold"],
    languages: ["Yeti"],
    cr: "3",
    trait: [
      {
        name: "Fear of Fire",
        entries: [
          "If the yeti takes Fire damage, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the end of its next turn.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The yeti can use its Chilling Gaze and makes two attacks, using Claw or Ice Throw in any combination.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Slashing damage plus 3 ({@damage 1d6}) Cold damage.",
        ],
      },
      {
        name: "Ice Throw",
        entries: [
          "{@atkr r} {@hit 6}, range 30/120 ft. {@h}6 ({@damage 1d4 + 4}) Bludgeoning damage plus 2 ({@damage 1d4}) Cold damage.",
        ],
      },
      {
        name: "Chilling Gaze",
        entries: [
          "{@actSave con} {@dc 13}, one creature the yeti can see within 30 feet. {@actSaveFail} 5 ({@damage 2d4}) Cold damage, and the target has the {@condition Paralyzed|XPHB} condition until the start of the yeti's next turn unless the target has {@variantrule Immunity|XPHB} to Cold damage. {@actSaveSuccess} The target is immune to the Chilling Gaze of all yetis (but not abominable yetis) for 1 hour.",
        ],
      },
    ],
    environment: ["arctic"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/yeti.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["B", "C", "S"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["paralyzed"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Yuan-ti Malison (Type 1)",
    source: "XMM",
    page: 343,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      climb: {
        number: 30,
        condition: "(snake form only)",
      },
    },
    str: 16,
    dex: 14,
    con: 13,
    int: 14,
    wis: 16,
    cha: 12,
    skill: {
      stealth: "+4 (+6 while in snake form)",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Draconic"],
    cr: "3",
    spellcasting: [
      {
        name: "Spellcasting (Yuan-ti Form Only)",
        type: "spellcasting",
        headerEntries: [
          "The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Animal Friendship|XPHB} (snakes only)"],
        daily: {
          "2": ["{@spell Suggestion|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The yuan-ti has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The yuan-ti makes two attacks, using Bite or Poison Ray in any combination, and it can use Spellcasting to cast {@spell Suggestion|XPHB} if available.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Ray (Yuan-ti Form Only)",
        entries: [
          "{@atkr r} {@hit 5}, range 120 ft. {@h}12 ({@damage 2d8 + 3}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/yuan-ti-malison.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "DR"],
    damageTags: ["I", "P"],
    spellcastingTags: ["F"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["charmed"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Yuan-ti Malison (Type 2)",
    source: "XMM",
    page: 343,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      climb: {
        number: 30,
        condition: "(snake form only)",
      },
    },
    str: 16,
    dex: 14,
    con: 13,
    int: 14,
    wis: 16,
    cha: 12,
    skill: {
      stealth: "+4 (+6 while in snake form)",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Draconic"],
    cr: "3",
    spellcasting: [
      {
        name: "Spellcasting (Yuan-ti Form Only)",
        type: "spellcasting",
        headerEntries: [
          "The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Animal Friendship|XPHB} (snakes only)"],
        daily: {
          "2": ["{@spell Suggestion|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The yuan-ti has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The yuan-ti makes two Bite attacks, and it can use Spellcasting to cast {@spell Suggestion|XPHB} if available.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/yuan-ti-malison.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "DR"],
    damageTags: ["I", "P"],
    spellcastingTags: ["F"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["charmed"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Yuan-ti Malison (Type 3)",
    source: "XMM",
    page: 344,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 66,
      formula: "12d8 + 12",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 16,
    dex: 14,
    con: 13,
    int: 14,
    wis: 16,
    cha: 12,
    skill: {
      stealth: "+4 (+6 while in snake form)",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Draconic"],
    cr: "3",
    spellcasting: [
      {
        name: "Spellcasting (Yuan-ti Form Only)",
        type: "spellcasting",
        headerEntries: [
          "The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Animal Friendship|XPHB} (snakes only)"],
        daily: {
          "2": ["{@spell Suggestion|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The yuan-ti has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The yuan-ti makes two Poison Burst attacks, and it can use Spellcasting to cast {@spell Suggestion|XPHB} if available.",
        ],
      },
      {
        name: "Poison Burst (Yuan-ti Form Only)",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 120 ft. {@h}12 ({@damage 2d8 + 3}) Poison damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 13}, one Medium or smaller creature within 5 feet. {@actSaveFail} 21 ({@damage 4d8 + 3}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 13}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The yuan-ti shape-shifts into a Medium snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/yuan-ti-malison.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "DR"],
    damageTags: ["B", "I"],
    spellcastingTags: ["F"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["grappled", "restrained"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["strength"],
    savingThrowForcedSpell: ["wisdom"],
  },
];
