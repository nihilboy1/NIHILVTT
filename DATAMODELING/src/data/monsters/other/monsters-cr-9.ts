// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_9 = [
  {
    name: "Abominable Yeti",
    source: "XMM",
    page: 340,
    size: ["H"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 137,
      formula: "11d12 + 66",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 24,
    dex: 10,
    con: 22,
    int: 9,
    wis: 13,
    cha: 9,
    skill: {
      perception: "+9",
      stealth: "+8",
    },
    senses: ["darkvision 60 ft."],
    passive: 19,
    immune: ["cold"],
    languages: ["Yeti"],
    cr: "9",
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
          "{@atkr m} {@hit 11}, reach 5 ft. {@h}14 ({@damage 2d6 + 7}) Slashing damage plus 7 ({@damage 2d6}) Cold damage.",
        ],
      },
      {
        name: "Ice Throw",
        entries: [
          "{@atkr r} {@hit 11}, range 60/240 ft. {@h}12 ({@damage 2d4 + 7}) Bludgeoning damage plus 7 ({@damage 2d6}) Cold damage.",
        ],
      },
      {
        name: "Chilling Gaze",
        entries: [
          "{@actSave con} {@dc 18}, one creature the yeti can see within 30 feet. {@actSaveFail} 21 ({@damage 6d6}) Cold damage, and the target has the {@condition Paralyzed|XPHB} condition until the start of the yeti's next turn unless the target has {@variantrule Immunity|XPHB} to Cold damage. {@actSaveSuccess} The target is immune to this yeti's Chilling Gaze for 1 hour.",
        ],
      },
      {
        name: "Cold Breath {@recharge}",
        entries: [
          "{@actSave con} {@dc 18}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 45 ({@damage 10d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["arctic"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/abominable-yeti.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["B", "C", "S"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["paralyzed"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Bone Devil",
    group: ["Devils"],
    source: "XMM",
    page: 52,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [16],
    hp: {
      average: 161,
      formula: "17d10 + 68",
    },
    speed: {
      walk: 40,
      fly: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 16,
    con: 18,
    int: 13,
    wis: 14,
    cha: 16,
    save: {
      str: "+8",
      int: "+5",
      wis: "+6",
      cha: "+7",
    },
    skill: {
      deception: "+7",
      insight: "+6",
    },
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 12,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "9",
    trait: [
      {
        name: "Diabolical Restoration",
        entries: [
          "If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Nine Hells.",
        ],
      },
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
          "The devil makes two Claw attacks and one Infernal Sting attack.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}13 ({@damage 2d8 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Infernal Sting",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}15 ({@damage 2d10 + 4}) Piercing damage plus 18 ({@damage 4d8}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the devil's next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/bone-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Brazen Gorgon",
    source: "XMM",
    page: 149,
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [19],
    hp: {
      average: 161,
      formula: "17d10 + 68",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 14,
    con: 19,
    int: 2,
    wis: 14,
    cha: 7,
    skill: {
      perception: "+10",
    },
    senses: ["darkvision 60 ft."],
    passive: 20,
    immune: ["fire"],
    conditionImmune: ["exhaustion", "petrified"],
    cr: "9",
    trait: [
      {
        name: "Flame Aura",
        entries: [
          "At the end of each of the gorgon's turns, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the gorgon takes 13 ({@damage 3d8}) Fire damage.",
        ],
      },
      {
        name: "Illumination",
        entries: [
          "The gorgon sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The gorgon makes two Gore attacks."],
      },
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage plus 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Smelting Charge {@recharge 5}",
        entries: [
          "The gorgon moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks} and can move through the spaces of Medium or smaller creatures. Each time the gorgon enters a creature's space for the first time during this move, that target is subjected to the following effect. {@actSave dex} {@dc 16}. {@actSaveFail} 13 ({@damage 2d8 + 4}) Piercing damage plus 13 ({@damage 3d8}) Fire damage, and the target is pulled into the gorgon's space and has the {@condition Grappled|XPHB} condition (escape {@dc 14}); if the gorgon already has a creature {@condition Grappled|XPHB}, the target has the {@condition Prone|XPHB} condition instead. Until the grapple ends, the target has the {@condition Restrained|XPHB} condition. When the gorgon moves, the {@condition Grappled|XPHB} target moves with it, costing no extra movement.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    treasure: ["any"],
    traitTags: ["Illumination"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["F", "P"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Clay Golem",
    source: "XMM",
    page: 72,
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 123,
      formula: "13d10 + 52",
    },
    speed: {
      walk: 20,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 9,
    con: 18,
    int: 3,
    wis: 8,
    cha: 1,
    senses: ["darkvision 60 ft."],
    passive: 9,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["acid", "poison", "psychic"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["Common plus one other language"],
    cr: "9",
    trait: [
      {
        name: "Acid Absorption",
        entries: [
          "Whenever the golem is subjected to Acid damage, it takes no damage and instead regains a number of {@variantrule Hit Points|XPHB} equal to the Acid damage dealt.",
        ],
      },
      {
        name: "Berserk",
        entries: [
          "Whenever the golem starts its turn {@variantrule Bloodied|XPHB}, roll {@dice 1d6}. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it continues to be berserk until it is destroyed or it is no longer {@variantrule Bloodied|XPHB}.",
        ],
      },
      {
        name: "Immutable Form",
        entries: ["The golem can't shape-shift."],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The golem has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The golem makes two Slam attacks, or it makes three Slam attacks if it used Hasten this turn.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}10 ({@damage 1d10 + 5}) Bludgeoning damage plus 6 ({@damage 1d12}) Acid damage, and the target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Acid damage taken.",
        ],
      },
    ],
    bonus: [
      {
        name: "Hasten {@recharge 5}",
        entries: ["The golem takes the Dash and Disengage actions."],
      },
    ],
    environment: ["urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/clay-golem.mp3",
    },
    traitTags: ["Damage Absorption", "Immutable Form", "Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["A", "B"],
    miscTags: ["MA"],
  },
  {
    name: "Cloud Giant",
    source: "XMM",
    page: 74,
    size: ["H"],
    type: "giant",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 200,
      formula: "16d12 + 96",
    },
    speed: {
      walk: 40,
      fly: {
        number: 20,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 27,
    dex: 10,
    con: 22,
    int: 12,
    wis: 16,
    cha: 16,
    save: {
      con: "+10",
      wis: "+7",
    },
    skill: {
      insight: "+7",
      perception: "+11",
    },
    passive: 21,
    languages: ["Common", "Giant"],
    cr: "9",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The giant casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Fog Cloud|XPHB}",
          "{@spell Light|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Control Weather|XPHB}",
            "{@spell Gaseous Form|XPHB}",
            "{@spell Telekinesis|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Misty Step",
        type: "spellcasting",
        headerEntries: [
          "The giant casts the {@spell Misty Step|XPHB} spell, using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Misty Step|XPHB}"],
        ability: "cha",
        displayAs: "bonus",
        hidden: ["will"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Thunderous Mace or Thundercloud in any combination. It can replace one attack with a use of Spellcasting to cast {@spell Fog Cloud|XPHB}.",
        ],
      },
      {
        name: "Thunderous Mace",
        entries: [
          "{@atkr m} {@hit 12}, reach 10 ft. {@h}21 ({@damage 3d8 + 8}) Bludgeoning damage plus 7 ({@damage 2d6}) Thunder damage.",
        ],
      },
      {
        name: "Thundercloud",
        entries: [
          "{@atkr r} {@hit 12}, range 240 ft. {@h}18 ({@damage 3d6 + 8}) Thunder damage, and the target has the {@condition Incapacitated|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["mountain"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/cloud-giant.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "GI"],
    damageTags: ["B", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "RCH"],
    conditionInflict: ["incapacitated"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["strength"],
  },
  {
    name: "Fire Giant",
    source: "XMM",
    page: 119,
    size: ["H"],
    type: "giant",
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 162,
      formula: "13d12 + 78",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 25,
    dex: 9,
    con: 23,
    int: 10,
    wis: 14,
    cha: 13,
    save: {
      dex: "+3",
      con: "+10",
      cha: "+5",
    },
    skill: {
      athletics: "+11",
      perception: "+6",
    },
    passive: 16,
    immune: ["fire"],
    languages: ["Giant"],
    cr: "9",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Flame Sword or Hammer Throw in any combination.",
        ],
      },
      {
        name: "Flame Sword",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}21 ({@damage 4d6 + 7}) Slashing damage plus 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Hammer Throw",
        entries: [
          "{@atkr r} {@hit 11}, range 60/240 ft. {@h}23 ({@damage 3d10 + 7}) Bludgeoning damage plus 4 ({@damage 1d8}) Fire damage, and the target is pushed up to 15 feet straight away from the giant and has {@variantrule Disadvantage|XPHB} on the next attack roll it makes before the end of its next turn.",
        ],
      },
    ],
    environment: ["mountain", "underdark"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/fire-giant.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["B", "F", "S"],
    miscTags: ["MA", "RA", "RCH"],
  },
  {
    name: "Glabrezu",
    group: ["Demons"],
    source: "XMM",
    page: 138,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [17],
    hp: {
      average: 189,
      formula: "18d10 + 90",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 15,
    con: 21,
    int: 19,
    wis: 17,
    cha: 16,
    save: {
      str: "+9",
      con: "+9",
      wis: "+7",
      cha: "+7",
    },
    skill: {
      deception: "+7",
      perception: "+7",
    },
    senses: ["truesight 120 ft."],
    passive: 17,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "9",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The glabrezu casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Darkness|XPHB}",
          "{@spell Detect Magic|XPHB}",
          "{@spell Dispel Magic|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Confusion|XPHB}",
            "{@spell Fly|XPHB}",
            "{@spell Power Word Stun|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the glabrezu dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The glabrezu has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The glabrezu makes two Pincer attacks and uses Pummel or Spellcasting.",
        ],
      },
      {
        name: "Pincer",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}16 ({@damage 2d10 + 5}) Slashing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 15}) from one of two pincers.",
        ],
      },
      {
        name: "Pummel",
        entries: [
          "{@actSave dex} {@dc 17}, one creature {@condition Grappled|XPHB} by the glabrezu. {@actSaveFail} 15 ({@damage 3d6 + 5}) Bludgeoning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/glabrezu.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "TP"],
    damageTags: ["B", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
    conditionInflictSpell: ["stunned"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Gray Slaad",
    source: "XMM",
    page: 286,
    size: ["M"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [18],
    hp: {
      average: 150,
      formula: "20d8 + 60",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 17,
    con: 16,
    int: 13,
    wis: 8,
    cha: 18,
    skill: {
      arcana: "+5",
      perception: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 60 ft."],
    passive: 17,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["Common", "Slaad; telepathy 60 ft."],
    cr: "9",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Invisibility|XPHB} (self only)",
          "{@spell Mage Hand|XPHB}",
          "{@spell Major Image|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Cloudkill|XPHB}",
            "{@spell Fly|XPHB}",
            "{@spell Plane Shift|XPHB} (self only)",
            "{@spell Tongues|XPHB}",
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
          "The slaad has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Regeneration",
        entries: [
          "The slaad regains 10 {@variantrule Hit Points|XPHB} at the start of each of its turns if it has at least 1 {@variantrule Hit Points|XPHB|Hit Point}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The slaad makes two Chaos Claw attacks."],
      },
      {
        name: "Chaos Claw",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Slashing damage plus 11 ({@damage 2d10}) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling {@dice 1d4}: on a 1, {@condition Charmed|XPHB}; on a 2, {@condition Frightened|XPHB}; on a 3, {@condition Poisoned|XPHB}; or on a 4, {@condition Incapacitated|XPHB}.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The slaad shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/gray-slaad.mp3",
    },
    traitTags: ["Magic Resistance", "Regeneration"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "OTH", "TP"],
    damageTags: ["N", "S"],
    damageTagsSpell: ["I"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Nycaloth",
    group: ["Yugoloths"],
    source: "XMM",
    page: 229,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["yugoloth"],
    },
    alignment: ["N", "E"],
    ac: [18],
    hp: {
      average: 152,
      formula: "16d10 + 64",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 11,
    con: 19,
    int: 12,
    wis: 10,
    cha: 15,
    skill: {
      perception: "+4",
      stealth: "+4",
    },
    senses: ["blindsight 60 ft."],
    passive: 14,
    resist: ["cold", "fire", "lightning"],
    immune: ["acid", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Infernal; telepathy 60 ft."],
    cr: "9",
    trait: [
      {
        name: "Fiendish Restoration",
        entries: [
          "If the nycaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Gehenna.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The nycaloth has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The nycaloth makes two Mercurial Axe attacks."],
      },
      {
        name: "Mercurial Axe",
        entries: [
          "{@atkr m,r} {@hit 9}, reach 10 ft. or range 30/90 ft. {@h}18 ({@damage 2d12 + 5}) Slashing damage plus 10 ({@damage 3d6}) Force damage. {@hom}The axe magically returns to the nycaloth's hand immediately after a ranged attack.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadowy Teleport",
        entries: [
          "The nycaloth has the {@condition Invisible|XPHB} condition for 1 minute, and it teleports up to 30 feet to an unoccupied space it can see. The condition ends early immediately after it deals damage.",
        ],
      },
    ],
    environment: ["planar, gehenna"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/nycaloth.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "I", "TP"],
    damageTags: ["O", "S"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["invisible"],
  },
  {
    name: "Treant",
    source: "XMM",
    page: 308,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "plant",
    alignment: ["C", "G"],
    ac: [16],
    hp: {
      average: 138,
      formula: "12d12 + 60",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 8,
    con: 21,
    int: 12,
    wis: 16,
    cha: 12,
    passive: 13,
    resist: ["bludgeoning", "piercing"],
    vulnerable: ["fire"],
    languages: ["Common", "Druidic", "Elvish", "Sylvan"],
    cr: "9",
    trait: [
      {
        name: "Siege Monster",
        entries: ["The treant deals double damage to objects and structures."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The treant makes two Slam attacks."],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}16 ({@damage 3d6 + 6}) Bludgeoning damage.",
        ],
      },
      {
        name: "Hail of Bark",
        entries: [
          "{@atkr r} {@hit 10}, range 180 ft. {@h}28 ({@damage 4d10 + 6}) Piercing damage.",
        ],
      },
      {
        name: "Animate Trees (1/Day)",
        entries: [
          "The treant magically animates up to two trees it can see within 60 feet of itself. Each tree uses the Treant stat block, except it has Intelligence and Charisma scores of 1, it can't speak, and it lacks this action. The tree takes its turn immediately after the treant on the same {@variantrule Initiative|XPHB} count, and it obeys the treant. A tree remains animate for 1 day or until it dies, the treant dies, or it is more than 120 feet from the treant. The tree then takes root if possible.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/treant.mp3",
    },
    traitTags: ["Siege Monster"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "DU", "E", "S"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Young Blue Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 48,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 152,
      formula: "16d10 + 64",
    },
    speed: {
      walk: 40,
      burrow: 20,
      fly: 80,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 10,
    con: 19,
    int: 14,
    wis: 13,
    cha: 17,
    save: {
      dex: "+4",
      wis: "+5",
    },
    skill: {
      perception: "+9",
      stealth: "+4",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 19,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: "9",
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 5 ({@damage 1d10}) Lightning damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 16}, each creature in a 60-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 55 ({@damage 10d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["coastal", "desert"],
    treasure: ["relics"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/blue-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["L", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Young Silver Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 278,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [18],
    hp: {
      average: 168,
      formula: "16d10 + 80",
    },
    speed: {
      walk: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 10,
    con: 21,
    int: 14,
    wis: 11,
    cha: 19,
    save: {
      dex: "+4",
      wis: "+4",
    },
    skill: {
      history: "+6",
      perception: "+8",
      stealth: "+4",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 18,
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: "9",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of Paralyzing Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}15 ({@damage 2d8 + 6}) Slashing damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 17}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 49 ({@damage 11d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Paralyzing Breath",
        entries: [
          "{@actSave con} {@dc 17}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail 1} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, when it repeats the save. {@actSaveFail 2} The target has the {@condition Paralyzed|XPHB} condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["mountain", "urban"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/silver-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["C", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated", "paralyzed"],
    savingThrowForced: ["constitution"],
  },
];
