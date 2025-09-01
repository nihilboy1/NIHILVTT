
export const monsters_cr_1 = [
  {
    name: "Animated Armor",
    source: "XMM",
    page: 16,
    size: ["M"],
    type: "construct",
    alignment: ["U"],
    ac: [18],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 25,
    },
    initiative: {
      proficiency: 1,
    },
    str: 14,
    dex: 11,
    con: 13,
    int: 1,
    wis: 3,
    cha: 1,
    senses: ["blindsight 60 ft."],
    passive: 6,
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
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The armor makes two Slam attacks."],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/animated-armor.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Brass Dragon Wyrmling",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 54,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [15],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 30,
      burrow: 15,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 10,
    con: 13,
    int: 10,
    wis: 11,
    cha: 13,
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
    immune: ["fire"],
    languages: ["Draconic"],
    cr: "1",
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 1d10 + 2}) Slashing damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 11}, each creature in a 20-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 14 ({@damage 4d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Sleep Breath",
        entries: [
          "{@actSave con} {@dc 11}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it repeats the save. {@actSaveFail 2} The target has the {@condition Unconscious|XPHB} condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        ],
      },
    ],
    environment: ["desert"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/brass-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "unconscious"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Brown Bear",
    source: "XMM",
    page: 350,
    otherSources: [
      {
        source: "XPHB",
        page: 347,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 22,
      formula: "3d10 + 6",
    },
    speed: {
      walk: 40,
      climb: 30,
    },
    str: 17,
    dex: 12,
    con: 15,
    int: 2,
    wis: 13,
    cha: 7,
    skill: {
      perception: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The bear makes one Bite attack and one Claw attack."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["arctic", "forest", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/brown-bear.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Bugbear Warrior",
    group: ["Goblinoids"],
    source: "XMM",
    page: 62,
    otherSources: [
      {
        source: "UtHftLH",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 30,
    },
    str: 15,
    dex: 14,
    con: 13,
    int: 8,
    wis: 11,
    cha: 9,
    skill: {
      stealth: "+6",
      survival: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Common", "Goblin"],
    cr: "1",
    gear: [
      "hide armor|xphb",
      {
        item: "light hammer|xphb",
        quantity: 3,
      },
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
        name: "Grab",
        entries: [
          "{@atkr m} {@hit 4}, reach 10 ft. {@h}9 ({@damage 2d6 + 2}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}).",
        ],
      },
      {
        name: "Light Hammer",
        entries: [
          "{@atkr m,r} {@hit 4} (with {@variantrule Advantage|XPHB} if the target is {@condition Grappled|XPHB} by the bugbear), reach 10 ft. or range 20/60 ft. {@h}9 ({@damage 3d4 + 2}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "planar, feywild", "underdark"],
    treasure: ["armaments", "individual"],
    senseTags: ["D"],
    languageTags: ["C", "GO"],
    damageTags: ["B"],
    miscTags: ["MA", "MLW", "RA", "RCH", "THW"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Copper Dragon Wyrmling",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 78,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [16],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 30,
      climb: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 12,
    con: 13,
    int: 14,
    wis: 11,
    cha: 13,
    save: {
      dex: "+3",
      wis: "+2",
    },
    skill: {
      perception: "+4",
      stealth: "+3",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 14,
    immune: ["acid"],
    languages: ["Draconic"],
    cr: "1",
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 1d10 + 2}) Slashing damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 11}, each creature in a 20-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 18 ({@damage 4d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Slowing Breath",
        entries: [
          "{@actSave con} {@dc 11}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target can't take Reactions; its {@variantrule Speed|XPHB} is halved; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. This effect lasts until the end of its next turn.",
        ],
      },
    ],
    environment: ["hill"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/copper-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["DR"],
    damageTags: ["A", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Death Dog",
    source: "XMM",
    page: 91,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [12],
    hp: {
      average: 39,
      formula: "6d8 + 12",
    },
    speed: {
      walk: 40,
    },
    str: 15,
    dex: 14,
    con: 14,
    int: 3,
    wis: 13,
    cha: 6,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["darkvision 120 ft."],
    passive: 15,
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "stunned",
      "unconscious",
    ],
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The death dog makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage. If the target is a creature, it is subjected to the following effect. {@actSave con} {@dc 12}. {@actSaveFail 1} The target has the {@condition Poisoned|XPHB} condition. While {@condition Poisoned|XPHB}, the target's {@variantrule Hit Points|XPHB|Hit Point} maximum doesn't return to normal when finishing a {@variantrule Long Rest|XPHB}, and it repeats the save every 24 hours that elapse, ending the effect on itself on a success. Subsequent Failures: The {@condition Poisoned|XPHB} target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 5 ({@dice 1d10}).",
        ],
      },
    ],
    environment: ["desert"],
    soundClip: {
      type: "internal",
      path: "bestiary/death-dog.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Dire Wolf",
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
    ac: [14],
    hp: {
      average: 22,
      formula: "3d10 + 6",
    },
    speed: {
      walk: 50,
    },
    str: 17,
    dex: 15,
    con: 15,
    int: 3,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "1",
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
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/dire-wolf.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Dryad",
    source: "XMM",
    page: 107,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "fey",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 12,
    con: 11,
    int: 14,
    wis: 15,
    cha: 18,
    skill: {
      perception: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Elvish", "Sylvan"],
    cr: "1",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dryad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Animal Friendship|XPHB}",
          "{@spell Charm Monster|XPHB} (lasts 24 hours; ends early if the dryad casts the spell again)",
          "{@spell Druidcraft|XPHB}",
        ],
        daily: {
          "1e": ["{@spell Entangle|XPHB}", "{@spell Pass without Trace|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The dryad has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Speak with Beasts and Plants",
        entries: [
          "The dryad can communicate with Beasts and Plants as if they shared a language.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dryad makes one Vine Lash or Thorn Burst attack, and it can use Spellcasting to cast {@spell Charm Monster|XPHB}.",
        ],
      },
      {
        name: "Vine Lash",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}8 ({@damage 1d8 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Thorn Burst",
        entries: [
          "{@atkr r} {@hit 6}, range 60 ft. {@h}7 ({@damage 1d6 + 4}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Tree Stride",
        entries: [
          "If within 5 feet of a Large or bigger tree, the dryad teleports to an unoccupied space within 5 feet of a second Large or bigger tree that is within 60 feet of the previous tree.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/dryad.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["E", "S"],
    damageTags: ["P", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflictSpell: ["charmed", "restrained"],
    savingThrowForcedSpell: ["strength", "wisdom"],
  },
  {
    name: "Empyrean Iota",
    group: ["Titans"],
    source: "XMM",
    page: 112,
    size: ["M"],
    type: {
      type: {
        choose: ["celestial", "fiend"],
      },
      tags: ["titan"],
    },
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 5,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 14,
    con: 10,
    int: 15,
    wis: 16,
    cha: 16,
    skill: {
      history: "+4",
      insight: "+5",
      perception: "+5",
    },
    senses: ["truesight 30 ft."],
    passive: 15,
    resist: ["bludgeoning", "piercing", "slashing"],
    conditionImmune: ["prone"],
    languages: ["all"],
    cr: "1",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The empyrean casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability:",
        ],
        daily: {
          "1e": [
            "{@spell Bless|XPHB}",
            "{@spell Lesser Restoration|XPHB} (as an action)",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Healing Word (1/Day)",
        type: "spellcasting",
        headerEntries: [
          "The empyrean casts {@spell Healing Word|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "1": ["{@spell Healing Word|XPHB}"],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Incorporeal Movement",
        entries: [
          "The empyrean can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The empyrean has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Otherworldly Strike",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 30 ft. {@h}7 ({@damage 1d8 + 3}) Necrotic or Radiant damage (empyrean's choice).",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["relics"],
    traitTags: ["Incorporeal Movement", "Magic Resistance"],
    senseTags: ["U"],
    languageTags: ["XX"],
    damageTags: ["N", "O", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Faerie Dragon Youth",
    source: "XMM",
    page: 117,
    size: ["T"],
    type: "dragon",
    alignment: ["C", "G"],
    ac: [13],
    hp: {
      average: 21,
      formula: "6d4 + 6",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 3,
    dex: 16,
    con: 12,
    int: 12,
    wis: 12,
    cha: 14,
    skill: {
      arcana: "+3",
      perception: "+3",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    languages: ["Draconic", "Sylvan; telepathy 60 ft. (faerie dragons only)"],
    cr: "1",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 12}):",
        ],
        will: [
          "{@spell Dancing Lights|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
        ],
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Superior Invisibility",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts {@spell Greater Invisibility|XPHB} on itself, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Greater Invisibility|XPHB}"],
        ability: "cha",
        displayAs: "bonus",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The dragon has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage plus 2 ({@damage 1d4}) Psychic damage.",
        ],
      },
      {
        name: "Euphoria Breath {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 12}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn and uses all its movement on its turn to move in a random direction.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["implements"],
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    languageTags: ["DR", "S", "TP"],
    damageTags: ["P", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Ghoul",
    source: "XMM",
    page: 132,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 30,
    },
    str: 13,
    dex: 15,
    con: 10,
    int: 7,
    wis: 10,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["poison"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    languages: ["Common"],
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The ghoul makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 3 ({@damage 1d6}) Necrotic damage.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Slashing damage. If the target is a creature that isn't an Undead or elf, it is subjected to the following effect. {@actSave con} {@dc 10}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["swamp", "underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/ghoul.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["N", "P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["paralyzed"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Giant Eagle",
    source: "XMM",
    page: 356,
    size: ["L"],
    type: "celestial",
    alignment: ["N", "G"],
    ac: [13],
    hp: {
      average: 26,
      formula: "4d10 + 4",
    },
    speed: {
      walk: 10,
      fly: 80,
    },
    str: 16,
    dex: 17,
    con: 13,
    int: 8,
    wis: 14,
    cha: 10,
    skill: {
      perception: "+6",
    },
    passive: 16,
    resist: ["necrotic", "radiant"],
    languages: [
      "Celestial; understands Common and Primordial (Auran) but can't speak them",
    ],
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The eagle makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Slashing damage plus 3 ({@damage 1d6}) Radiant damage.",
        ],
      },
    ],
    environment: ["coastal", "grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-eagle.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["AU", "C", "CE", "CS", "P"],
    damageTags: ["R", "S"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Hyena",
    source: "XMM",
    page: 357,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 50,
    },
    str: 16,
    dex: 14,
    con: 14,
    int: 2,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "1",
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rampage (1/Day)",
        entries: [
          "Immediately after dealing damage to a creature that was already {@variantrule Bloodied|XPHB}, the hyena can move up to half its {@variantrule Speed|XPHB}, and it makes one Bite attack.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-hyena.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Octopus",
    source: "XMM",
    page: 358,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 45,
      formula: "7d10 + 7",
    },
    speed: {
      walk: 10,
      swim: 60,
    },
    str: 17,
    dex: 13,
    con: 13,
    int: 5,
    wis: 10,
    cha: 4,
    skill: {
      perception: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    cr: "1",
    trait: [
      {
        name: "Water Breathing",
        entries: [
          "The octopus can breathe only underwater. It can hold its breath for 1 hour outside water.",
        ],
      },
    ],
    action: [
      {
        name: "Tentacles",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}10 ({@damage 2d6 + 3}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}) from all eight tentacles. While {@condition Grappled|XPHB}, the target has the {@condition Restrained|XPHB} condition.",
        ],
      },
    ],
    reaction: [
      {
        name: "Ink Cloud (1/Day)",
        entries: [
          "{@actTrigger} The octopus takes damage while underwater. {@actResponse} The octopus releases ink that fills a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} centered on itself, and the octopus moves up to its {@variantrule Swim Speed|XPHB}. The {@variantrule Cube [Area of Effect]|XPHB|Cube} is {@variantrule Heavily Obscured|XPHB} for 1 minute or until a strong current or similar effect disperses the ink.",
        ],
      },
    ],
    environment: ["underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-octopus.mp3",
    },
    traitTags: ["Water Breathing"],
    senseTags: ["D"],
    actionTags: ["Tentacles"],
    damageTags: ["B"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "restrained"],
  },
  {
    name: "Giant Spider",
    source: "XMM",
    page: 359,
    otherSources: [
      {
        source: "XPHB",
        page: 351,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 26,
      formula: "4d10 + 4",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 16,
    con: 12,
    int: 2,
    wis: 11,
    cha: 4,
    skill: {
      perception: "+4",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    cr: "1",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Web Walker",
        entries: [
          "The spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Web {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 13}, one creature the spider can see within 60 feet. {@actSaveFail} The target has the {@condition Restrained|XPHB} condition until the web is destroyed (AC 10; HP 5; {@variantrule Vulnerability|XPHB} to Fire damage; {@variantrule Immunity|XPHB} to Poison and Psychic damage).",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-spider.mp3",
    },
    traitTags: ["Spider Climb", "Web Walker"],
    senseTags: ["D"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["restrained"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Giant Toad",
    source: "XMM",
    page: 360,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 39,
      formula: "6d10 + 6",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 15,
    dex: 13,
    con: 13,
    int: 2,
    wis: 10,
    cha: 3,
    senses: ["darkvision 60 ft."],
    passive: 10,
    cr: "1",
    trait: [
      {
        name: "Amphibious",
        entries: ["The toad can breathe air and water."],
      },
      {
        name: "Standing Leap",
        entries: [
          "The toad's {@variantrule Long Jump|XPHB} is up to 20 feet and its {@variantrule High Jump|XPHB} is up to 10 feet with or without a running start.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 5 ({@damage 2d4}) Poison damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}).",
        ],
      },
      {
        name: "Swallow",
        entries: [
          "The toad swallows a Medium or smaller target it is grappling. While swallowed, the target isn't {@condition Grappled|XPHB} but has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, and it has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the toad. In addition, the target takes 10 ({@damage 3d6}) Acid damage at the end of each of the toad's turns. The toad can have only one target swallowed at a time, and it can't use Bite while it has a swallowed target. If the toad dies, a swallowed creature is no longer {@condition Restrained|XPHB} and can escape from the corpse using 5 feet of movement, exiting with the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal", "forest", "swamp", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-toad.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["D"],
    actionTags: ["Swallow"],
    damageTags: ["A", "I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Giant Vulture",
    source: "XMM",
    page: 361,
    size: ["L"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [10],
    hp: {
      average: 25,
      formula: "3d10 + 9",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 15,
    dex: 10,
    con: 16,
    int: 6,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    resist: ["necrotic"],
    languages: ["understands Common but can't speak"],
    cr: "1",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The vulture has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the vulture's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Gouge",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["desert", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-vulture.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    languageTags: ["C", "CS"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Goblin Boss",
    group: ["Goblinoids"],
    source: "XMM",
    page: 143,
    size: ["S"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["C", "N"],
    ac: [17],
    hp: {
      average: 21,
      formula: "6d6",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 15,
    con: 10,
    int: 10,
    wis: 8,
    cha: 10,
    skill: {
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 9,
    languages: ["Common", "Goblin"],
    cr: "1",
    gear: ["chain shirt|xphb", "scimitar|xphb", "shield|xphb", "shortbow|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The goblin makes two attacks, using Scimitar or Shortbow in any combination.",
        ],
      },
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
    reaction: [
      {
        name: "Redirect Attack",
        entries: [
          "{@actTrigger} A creature the goblin can see makes an attack roll against it. {@actResponse} The goblin chooses a Small or Medium ally within 5 feet of itself. The goblin and that ally swap places, and the ally becomes the target of the attack instead.",
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
    soundClip: {
      type: "internal",
      path: "bestiary/goblin-boss.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GO"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Harpy",
    source: "XMM",
    page: 164,
    size: ["M"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [11],
    hp: {
      average: 38,
      formula: "7d8 + 7",
    },
    speed: {
      walk: 20,
      fly: 40,
    },
    str: 12,
    dex: 13,
    con: 12,
    int: 7,
    wis: 10,
    cha: 13,
    passive: 10,
    languages: ["Common"],
    cr: "1",
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Luring Song",
        entries: [
          "The harpy sings a magical melody, which lasts until the harpy's {@status Concentration|XPHB} ends on it. {@actSave wis} {@dc 11}, each Humanoid and Giant in a 300-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the harpy when the song starts. {@actSaveFail} The target has the {@condition Charmed|XPHB} condition until the song ends and repeats the save at the end of each of its turns. While {@condition Charmed|XPHB}, the target has the {@condition Incapacitated|XPHB} condition and ignores the Luring Song of other harpies. If the target is more than 5 feet from the harpy, the target moves on its turn toward the harpy by the most direct route, trying to get within 5 feet of the harpy. It doesn't avoid {@action Opportunity Attack|XPHB|Opportunity Attacks}; however, before moving into damaging terrain (such as lava or a pit) and whenever it takes damage from a source other than the harpy, the target repeats the save. {@actSaveSuccess} The target is immune to this harpy's Luring Song for 24 hours.",
        ],
      },
    ],
    environment: ["coastal", "forest", "hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/harpy.mp3",
    },
    languageTags: ["C"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["charmed", "incapacitated"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Hippogriff",
    source: "XMM",
    page: 169,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [11],
    hp: {
      average: 26,
      formula: "4d10 + 4",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    str: 17,
    dex: 13,
    con: 13,
    int: 2,
    wis: 12,
    cha: 8,
    skill: {
      perception: "+5",
    },
    passive: 15,
    cr: "1",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The hippogriff doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hippogriff makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage.",
        ],
      },
    ],
    environment: ["grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/hippogriff.mp3",
    },
    traitTags: ["Flyby"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Imp",
    group: ["Devils"],
    source: "XMM",
    page: 177,
    otherSources: [
      {
        source: "XPHB",
        page: 352,
      },
    ],
    size: ["T"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 21,
      formula: "6d4 + 6",
    },
    speed: {
      walk: 20,
      fly: 40,
    },
    str: 6,
    dex: 17,
    con: 13,
    int: 11,
    wis: 12,
    cha: 14,
    skill: {
      deception: "+4",
      insight: "+3",
      stealth: "+5",
    },
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 11,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Common", "Infernal"],
    cr: "1",
    spellcasting: [
      {
        name: "Invisibility",
        type: "spellcasting",
        headerEntries: [
          "The imp casts {@spell Invisibility|XPHB} on itself, requiring no spell components and using Charisma as the spellcasting ability.",
        ],
        will: ["{@spell Invisibility|XPHB}"],
        ability: "cha",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The imp has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Sting",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Shape-Shift",
        entries: [
          "The imp shape-shifts to resemble a rat ({@variantrule Speed|XPHB} 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its {@variantrule Speed|XPHB}. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/imp.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    languageTags: ["C", "I"],
    damageTags: ["I", "P"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["invisible"],
  },
  {
    name: "Kuo-toa Whip",
    source: "XMM",
    page: 190,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [11],
    hp: {
      average: 45,
      formula: "7d8 + 14",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 14,
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
    cr: "1",
    spellcasting: [
      {
        name: "Shield of Faith (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The kuo-toa casts {@spell Shield of Faith|XPHB}, using Wisdom as the spellcasting ability.",
        ],
        daily: {
          "2": ["{@spell Shield of Faith|XPHB}"],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
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
        name: "Pincer Staff",
        entries: [
          "{@atkr m} {@hit 4}, reach 10 ft. {@h}9 ({@damage 2d6 + 2}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}). Until the grapple ends, the kuo-toa can't make Pincer Staff attacks.",
        ],
      },
      {
        name: "Conjure Slimy Glob",
        entries: [
          "{@atkr r} {@hit 4}, range 60 ft. {@h}9 ({@damage 3d4 + 2}) Acid damage.",
        ],
      },
    ],
    environment: ["coastal", "underdark"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/kuo-toa-whip.mp3",
    },
    traitTags: ["Amphibious", "Sunlight Sensitivity"],
    senseTags: ["SD", "U"],
    languageTags: ["U"],
    damageTags: ["A", "P"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Lacedon Ghoul",
    source: "XMM",
    page: 132,
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 13,
    dex: 15,
    con: 10,
    int: 7,
    wis: 10,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["cold"],
    immune: ["poison"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    languages: ["Common"],
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: ["The ghoul makes two Icy Bite attacks."],
      },
      {
        name: "Icy Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Cold damage, and the target's {@variantrule Speed|XPHB} decreases by 5 feet until the start of the ghoul's next turn.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Slashing damage. If the target is a creature that isn't an Undead or elf, it is subjected to the following effect. {@actSave con} {@dc 10}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Watery Rush",
        entries: [
          "While underwater, the ghoul moves up to half its {@variantrule Swim Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
        ],
      },
    ],
    environment: ["swamp", "underdark", "urban"],
    treasure: ["any"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["C", "S"],
    miscTags: ["MA"],
    conditionInflict: ["paralyzed"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Lion",
    source: "XMM",
    page: 364,
    otherSources: [
      {
        source: "XPHB",
        page: 352,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 22,
      formula: "4d10",
    },
    speed: {
      walk: 50,
    },
    str: 17,
    dex: 15,
    con: 11,
    int: 3,
    wis: 12,
    cha: 8,
    skill: {
      perception: "+3",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "1",
    trait: [
      {
        name: "Pack Tactics",
        entries: [
          "The lion has {@variantrule Advantage|XPHB} on an attack roll against a creature if at least one of the lion's allies is within 5 feet of the creature and the ally doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Running Leap",
        entries: [
          "With a 10-foot running start, the lion can {@variantrule Long Jump|XPHB} up to 25 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The lion makes two Rend attacks. It can replace one attack with a use of Roar.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Roar",
        entries: [
          "{@actSave wis} {@dc 11}, one creature within 15 feet. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the start of the lion's next turn.",
        ],
      },
    ],
    environment: ["desert", "grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/lion.mp3",
    },
    traitTags: ["Pack Tactics"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Manes Vaporspawn",
    group: ["Demons"],
    source: "XMM",
    page: 201,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 19,
      formula: "3d8 + 6",
    },
    speed: {
      walk: 30,
    },
    str: 14,
    dex: 12,
    con: 15,
    int: 5,
    wis: 8,
    cha: 3,
    senses: ["darkvision 60 ft."],
    passive: 9,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "grappled",
      "poisoned",
      "restrained",
    ],
    languages: ["understands Abyssal but can't speak"],
    cr: "1",
    trait: [
      {
        name: "Contortionist",
        entries: [
          "The manes can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Sickening Vapors",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the manes at the end of the manes's turn. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn. {@actSaveSuccess} The target is immune to this manes's Sickening Vapors for 24 hours.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage plus 5 ({@damage 2d4}) Necrotic damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the manes takes the Hide action.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    senseTags: ["D"],
    languageTags: ["AB", "CS"],
    damageTags: ["N", "S"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Modron Quadrone",
    source: "XMM",
    page: 218,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "construct",
    alignment: ["L", "N"],
    ac: [16],
    hp: {
      average: 22,
      formula: "4d8 + 4",
    },
    speed: {
      walk: 30,
      fly: 30,
    },
    str: 12,
    dex: 14,
    con: 12,
    int: 10,
    wis: 10,
    cha: 11,
    skill: {
      perception: "+2",
    },
    senses: ["truesight 120 ft."],
    passive: 12,
    conditionImmune: ["charmed"],
    languages: ["Modron"],
    cr: "1",
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
        entries: [
          "The modron makes four Slam attacks or four Gears Launcher attacks.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}4 ({@damage 1d4 + 2}) Force damage.",
        ],
      },
      {
        name: "Gears Launcher",
        entries: [
          "{@atkr r} {@hit 4}, range 320 ft. {@h}4 ({@damage 1d4 + 2}) Force damage.",
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
    name: "Myconid Spore Servant",
    source: "XMM",
    page: 223,
    size: ["S", "M"],
    type: "plant",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 37,
      formula: "5d8 + 15",
    },
    speed: {
      walk: 20,
    },
    str: 16,
    dex: 12,
    con: 16,
    int: 2,
    wis: 6,
    cha: 1,
    senses: ["blindsight 30 ft."],
    passive: 8,
    immune: ["poison"],
    conditionImmune: [
      "blinded",
      "charmed",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    languages: ["telepathy 30 ft."],
    cr: "1",
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage plus 2 ({@damage 1d4}) Poison damage.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    senseTags: ["B"],
    languageTags: ["TP"],
    damageTags: ["B", "I"],
    miscTags: ["MA"],
  },
  {
    name: "Ogrillon Ogre",
    source: "XMM",
    page: 231,
    size: ["L"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 52,
      formula: "7d10 + 14",
    },
    speed: {
      walk: 30,
    },
    str: 17,
    dex: 10,
    con: 14,
    int: 7,
    wis: 9,
    cha: 10,
    senses: ["darkvision 60 ft."],
    passive: 9,
    languages: ["Common", "Giant"],
    cr: "1",
    gear: [
      "battleaxe|xphb",
      {
        item: "javelin|xphb",
        quantity: 3,
      },
    ],
    action: [
      {
        name: "Battleaxe",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 30/120 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
    ],
    environment: [
      "arctic",
      "desert",
      "forest",
      "grassland",
      "hill",
      "mountain",
      "swamp",
      "underdark",
    ],
    treasure: ["armaments"],
    senseTags: ["D"],
    languageTags: ["C", "GI"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Pirate",
    source: "XMM",
    page: 241,
    otherSources: [
      {
        source: "ScoEE",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 16,
    con: 12,
    int: 8,
    wis: 12,
    cha: 14,
    save: {
      dex: "+5",
      cha: "+4",
    },
    passive: 11,
    languages: ["Common plus one other language"],
    cr: "1",
    gear: [
      {
        item: "dagger|xphb",
        quantity: 6,
      },
      "leather armor|xphb",
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The pirate makes two Dagger attacks. It can replace one attack with a use of Enthralling Panache.",
        ],
      },
      {
        name: "Dagger",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 20/60 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Enthralling Panache",
        entries: [
          "{@actSave wis} {@dc 12}, one creature the pirate can see within 30 feet. {@actSaveFail} The target has the {@condition Charmed|XPHB} condition until the start of the pirate's next turn.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
    conditionInflict: ["charmed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Psychic Gray Ooze",
    source: "XMM",
    page: 151,
    size: ["M"],
    type: "ooze",
    alignment: ["U"],
    ac: [9],
    hp: {
      average: 37,
      formula: "5d8 + 15",
    },
    speed: {
      walk: 10,
      climb: 10,
    },
    str: 12,
    dex: 8,
    con: 16,
    int: 10,
    wis: 6,
    cha: 2,
    skill: {
      stealth: "+3",
    },
    senses: ["blindsight 60 ft."],
    passive: 8,
    resist: ["acid", "cold", "fire", "psychic"],
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
    cr: "1",
    trait: [
      {
        name: "Amorphous",
        entries: [
          "The ooze can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
    ],
    action: [
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}11 ({@damage 3d6 + 1}) Acid damage, and the target has {@variantrule Disadvantage|XPHB} on Intelligence saving throws until the end of the ooze's next turn.",
        ],
      },
      {
        name: "Psychic Crush",
        entries: [
          "{@actSave int} {@dc 10}, one creature the ooze can see within 60 feet. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Mind Corrosion",
        entries: [
          "{@actTrigger} The ooze fails a saving throw against a spell or another magical effect created by a creature. {@actResponse} The triggering creature takes 3 ({@damage 1d6}) Psychic damage.",
        ],
      },
    ],
    environment: ["underdark"],
    traitTags: ["Amorphous"],
    senseTags: ["B"],
    damageTags: ["A", "Y"],
    miscTags: ["MA"],
    savingThrowForced: ["intelligence"],
  },
  {
    name: "Quasit",
    group: ["Demons"],
    source: "XMM",
    page: 252,
    otherSources: [
      {
        source: "XPHB",
        page: 355,
      },
    ],
    size: ["T"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 25,
      formula: "10d4",
    },
    speed: {
      walk: 40,
    },
    str: 5,
    dex: 17,
    con: 10,
    int: 7,
    wis: 10,
    cha: 10,
    skill: {
      stealth: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 10,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common"],
    cr: "1",
    spellcasting: [
      {
        name: "Invisibility",
        type: "spellcasting",
        headerEntries: [
          "The quasit casts {@spell Invisibility|XPHB} on itself, requiring no spell components and using Charisma as the spellcasting ability.",
        ],
        will: ["{@spell Invisibility|XPHB}"],
        ability: "cha",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The quasit has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Slashing damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the quasit's next turn.",
        ],
      },
      {
        name: "Scare (1/Day)",
        entries: [
          "{@actSave wis} {@dc 10}, one creature within 20 feet. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition. At the end of each of its turns, the target repeats the save, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
      {
        name: "Shape-Shift",
        entries: [
          "The quasit shape-shifts to resemble a bat ({@variantrule Speed|XPHB} 10 ft., Fly 40 ft.), a centipede (40 ft., Climb 40 ft.), or a toad (40 ft., Swim 40 ft.), or it returns to its true form. Its game statistics are the same in each form, except for its {@variantrule Speed|XPHB}. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    soundClip: {
      type: "internal",
      path: "bestiary/quasit.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    languageTags: ["AB", "C"],
    damageTags: ["S"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "poisoned"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Salamander Fire Snake",
    source: "XMM",
    page: 266,
    size: ["M"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [14],
    hp: {
      average: 27,
      formula: "6d8",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 12,
    dex: 14,
    con: 11,
    int: 7,
    wis: 10,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["fire"],
    vulnerable: ["cold"],
    languages: ["understands Primordial but can't speak"],
    cr: "1",
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the salamander's turns, each creature of the salamander's choice in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the salamander takes 3 ({@damage 1d6}) Fire damage.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
    ],
    environment: ["planar, fire", "underdark"],
    treasure: ["armaments"],
    senseTags: ["D"],
    languageTags: ["CS", "P"],
    damageTags: ["F", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Scarecrow",
    source: "XMM",
    page: 269,
    size: ["M"],
    type: "construct",
    alignment: ["C", "E"],
    ac: [11],
    hp: {
      average: 27,
      formula: "6d8",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 11,
    dex: 13,
    con: 11,
    int: 10,
    wis: 10,
    cha: 13,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["poison"],
    vulnerable: ["fire"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
      "unconscious",
    ],
    languages: ["Common plus one other language"],
    cr: "1",
    action: [
      {
        name: "Fearsome Claw",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Slashing damage, and the target has the {@condition Frightened|XPHB} condition until the end of the scarecrow's next turn.",
        ],
      },
      {
        name: "Terrifying Glare",
        entries: [
          "{@actSave wis} {@dc 11}, one creature the scarecrow can see within 30 feet. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the end of the scarecrow's next turn. While {@condition Frightened|XPHB}, the target has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/scarecrow.mp3",
    },
    senseTags: ["D"],
    languageTags: ["C", "X"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "paralyzed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Specter",
    source: "XMM",
    page: 290,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [12],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 30,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 14,
    con: 11,
    int: 10,
    wis: 10,
    cha: 11,
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "lightning",
      "piercing",
      "slashing",
      "thunder",
    ],
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "grappled",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "restrained",
      "unconscious",
    ],
    languages: ["understands Common plus one other language but can't speak"],
    cr: "1",
    trait: [
      {
        name: "Incorporeal Movement",
        entries: [
          "The specter can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the specter has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Life Drain",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d6}) Necrotic damage. If the target is a creature, its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/specter.mp3",
    },
    traitTags: ["Incorporeal Movement", "Sunlight Sensitivity"],
    senseTags: ["D"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["N", "O"],
    miscTags: ["MA"],
  },
  {
    name: "Sphinx of Wonder",
    source: "XMM",
    page: 291,
    otherSources: [
      {
        source: "XPHB",
        page: 357,
      },
    ],
    size: ["T"],
    type: "celestial",
    alignment: ["L", "G"],
    ac: [13],
    hp: {
      average: 24,
      formula: "7d4 + 7",
    },
    speed: {
      walk: 20,
      fly: 40,
    },
    str: 6,
    dex: 17,
    con: 13,
    int: 15,
    wis: 12,
    cha: 11,
    skill: {
      arcana: "+4",
      religion: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    resist: ["necrotic", "psychic", "radiant"],
    languages: ["Celestial", "Common"],
    cr: "1",
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The sphinx has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Slashing damage plus 7 ({@damage 2d6}) Radiant damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Burst of Ingenuity (2/Day)",
        entries: [
          "{@actTrigger} The sphinx or another creature within 30 feet makes an ability check or a saving throw. {@actResponse} The sphinx adds 2 to the roll.",
        ],
      },
    ],
    environment: ["desert", "planar, upper"],
    treasure: ["arcana"],
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    languageTags: ["C", "CE"],
    damageTags: ["R", "S"],
    miscTags: ["MA"],
  },
  {
    name: "Spy",
    source: "XMM",
    page: 295,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 27,
      formula: "6d8",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 15,
    con: 10,
    int: 12,
    wis: 14,
    cha: 16,
    skill: {
      deception: "+5",
      insight: "+4",
      investigation: "+5",
      perception: "+6",
      "sleight of hand": "+4",
      stealth: "+6",
    },
    passive: 16,
    languages: ["Common plus one other language"],
    cr: "1",
    gear: ["hand crossbow|xphb", "shortsword|xphb", "thieves' tools|xphb"],
    action: [
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Hand Crossbow",
        entries: [
          "{@atkr r} {@hit 4}, range 30/120 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Cunning Action",
        entries: ["The spy takes the Dash, Disengage, or Hide action."],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/spy.mp3",
    },
    languageTags: ["C", "X"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Swarm of Larvae",
    source: "XMM",
    page: 193,
    size: ["L"],
    type: {
      type: "fiend",
      swarmSize: "M",
    },
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 22,
      formula: "3d10 + 6",
    },
    speed: {
      walk: 30,
    },
    str: 14,
    dex: 11,
    con: 14,
    int: 6,
    wis: 12,
    cha: 2,
    senses: ["darkvision 60 ft."],
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
    languages: ["understands all but can't speak"],
    cr: "1",
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through an opening large enough for a Medium creature. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Necrotic damage, or 7 ({@damage 2d4 + 2}) Necrotic damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["planar, lower"],
    senseTags: ["D"],
    languageTags: ["CS", "XX"],
    damageTags: ["N"],
    miscTags: ["MA"],
  },
  {
    name: "Swarm of Piranhas",
    source: "XMM",
    page: 370,
    size: ["M"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 28,
      formula: "8d8 - 8",
    },
    speed: {
      walk: 5,
      swim: 40,
    },
    str: 13,
    dex: 16,
    con: 9,
    int: 1,
    wis: 7,
    cha: 2,
    senses: ["darkvision 60 ft."],
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
    cr: "1",
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny piranha. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
      {
        name: "Water Breathing",
        entries: ["The swarm can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 5} (with {@variantrule Advantage|XPHB} if the target doesn't have all its {@variantrule Hit Points|XPHB}), reach 5 ft. {@h}8 ({@damage 2d4 + 3}) Piercing damage, or 5 ({@damage 1d4 + 3}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["underwater"],
    traitTags: ["Water Breathing"],
    senseTags: ["D"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Thri-kreen Marauder",
    source: "XMM",
    page: 306,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 40,
    },
    str: 12,
    dex: 15,
    con: 13,
    int: 8,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+3",
      stealth: "+4",
      survival: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    languages: ["Thri-kreen; telepathy 60 ft."],
    cr: "1",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The thri-kreen makes two attacks, using Gythka or Chatkcha in any combination.",
        ],
      },
      {
        name: "Gythka",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}5 ({@damage 1d8 + 1}) Slashing damage plus 2 ({@damage 1d4}) Poison damage.",
        ],
      },
      {
        name: "Chatkcha",
        entries: [
          "{@atkr r} {@hit 4}, range 30/120 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The thri-kreen jumps up to 15 feet by spending 5 feet of movement.",
        ],
      },
    ],
    environment: ["desert", "grassland"],
    treasure: ["armaments"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH", "TP"],
    damageTags: ["I", "S"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Tiger",
    source: "XMM",
    page: 371,
    otherSources: [
      {
        source: "XPHB",
        page: 358,
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 30,
      formula: "4d10 + 8",
    },
    speed: {
      walk: 40,
    },
    str: 17,
    dex: 16,
    con: 14,
    int: 3,
    wis: 12,
    cha: 8,
    skill: {
      perception: "+3",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "1",
    action: [
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Nimble Escape",
        entries: ["The tiger takes the Disengage or Hide action."],
      },
    ],
    environment: ["forest", "grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/tiger.mp3",
    },
    senseTags: ["D"],
    damageTags: ["S"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Yuan-ti Infiltrator",
    source: "XMM",
    page: 342,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [11],
    hp: {
      average: 40,
      formula: "9d8",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 12,
    con: 11,
    int: 13,
    wis: 14,
    cha: 12,
    skill: {
      deception: "+5",
      perception: "+4",
      stealth: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Draconic"],
    cr: "1",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 12}):",
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
        entries: ["The yuan-ti makes two Scimitar attacks."],
      },
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}4 ({@damage 1d6 + 1}) Slashing damage.",
        ],
      },
      {
        name: "Poison Ray",
        entries: [
          "{@atkr r} {@hit 4}, range 120 ft. {@h}9 ({@damage 2d6 + 2}) Poison damage.",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "urban"],
    treasure: ["relics"],
    attachedItems: ["scimitar|phb"],
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "DR"],
    damageTags: ["I", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA"],
    conditionInflictSpell: ["charmed"],
    savingThrowForcedSpell: ["wisdom"],
  },
];
