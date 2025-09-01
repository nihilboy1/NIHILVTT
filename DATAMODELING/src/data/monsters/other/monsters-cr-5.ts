// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_5 = [
  {
    name: "Air Elemental",
    source: "XMM",
    page: 13,
    size: ["L"],
    type: "elemental",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 90,
      formula: "12d10 + 24",
    },
    speed: {
      walk: 10,
      fly: {
        number: 90,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 14,
    dex: 20,
    con: 14,
    int: 6,
    wis: 10,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["bludgeoning", "lightning", "piercing", "slashing"],
    immune: ["poison", "thunder"],
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
    languages: ["Primordial (Auran)"],
    cr: "5",
    trait: [
      {
        name: "Air Form",
        entries: [
          "The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The elemental makes two Thunderous Slam attacks."],
      },
      {
        name: "Thunderous Slam",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}14 ({@damage 2d8 + 5}) Thunder damage.",
        ],
      },
      {
        name: "Whirlwind {@recharge 4}",
        entries: [
          "{@actSave str} {@dc 13}, one Medium or smaller creature in the elemental's space. {@actSaveFail} 24 ({@damage 4d10 + 2}) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["desert", "mountain", "planar, air"],
    soundClip: {
      type: "internal",
      path: "bestiary/air-elemental.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AU", "P"],
    damageTags: ["T"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Barbed Devil",
    group: ["Devils"],
    source: "XMM",
    page: 30,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 110,
      formula: "13d8 + 52",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 16,
    dex: 17,
    con: 18,
    int: 12,
    wis: 14,
    cha: 14,
    save: {
      str: "+6",
      con: "+7",
      wis: "+5",
      cha: "+5",
    },
    skill: {
      deception: "+5",
      insight: "+5",
      perception: "+8",
    },
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 18,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "5",
    trait: [
      {
        name: "Barbed Hide",
        entries: [
          "At the start of each of its turns, the devil deals 5 ({@damage 1d10}) Piercing damage to any creature it is grappling or any creature grappling it.",
        ],
      },
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
          "The devil makes one Claws attack and one Tail attack, or it makes two Hurl Flame attacks.",
        ],
      },
      {
        name: "Claws",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}) from both claws.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}14 ({@damage 2d10 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Hurl Flame",
        entries: [
          "{@atkr r} {@hit 5}, range 150 ft. {@h}17 ({@damage 5d6}) Fire damage. If the target is a flammable object that isn't being worn or carried, it starts {@hazard burning|XPHB}.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/barbed-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["F", "P", "S"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Barlgura",
    group: ["Demons"],
    source: "XMM",
    page: 31,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 85,
      formula: "10d10 + 30",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 7,
    wis: 14,
    cha: 9,
    save: {
      dex: "+5",
      con: "+6",
    },
    skill: {
      perception: "+5",
      stealth: "+5",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 15,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "5",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The barlgura casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        daily: {
          "2e": [
            "{@spell Disguise Self|XPHB}",
            "{@spell Invisibility|XPHB} (self only)",
          ],
          "1e": [
            "{@spell Entangle|XPHB}",
            "{@spell Phantasmal Killer|XPHB} (level 6 version)",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the barlgura dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The barlgura makes one Tormenting Bite attack and two Thrash attacks.",
        ],
      },
      {
        name: "Tormenting Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage plus 13 ({@damage 2d12}) Psychic damage.",
        ],
      },
      {
        name: "Thrash",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}9 ({@damage 1d10 + 4}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The barlgura jumps up to 40 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/barlgura.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "TP"],
    damageTags: ["B", "P", "Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    conditionInflictSpell: ["invisible", "restrained"],
    savingThrowForcedSpell: ["strength", "wisdom"],
  },
  {
    name: "Beholder Zombie",
    group: ["Beholders"],
    source: "XMM",
    page: 347,
    size: ["L"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 5,
      fly: {
        number: 20,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 14,
    dex: 8,
    con: 16,
    int: 3,
    wis: 8,
    cha: 5,
    save: {
      wis: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 9,
    immune: ["poison"],
    conditionImmune: ["exhaustion", "poisoned", "prone"],
    languages: ["understands Deep Speech and Undercommon but can't speak"],
    cr: "5",
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
        name: "Multiattack",
        entries: ["The zombie uses Eye Rays twice."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}16 ({@damage 4d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Eye Rays",
        entries: [
          "The zombie randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll {@dice 1d4}; reroll if the zombie has already used that ray during this turn):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1: Paralyzing Ray",
                entries: [
                  "{@actSave con} {@dc 14}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
                ],
              },
              {
                type: "item",
                name: "2: Fear Ray",
                entries: [
                  "{@actSave wis} {@dc 14}. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn.",
                ],
              },
              {
                type: "item",
                name: "3: Enervation Ray",
                entries: [
                  "{@actSave con} {@dc 14}. {@actSaveFail} 10 ({@damage 3d6}) Necrotic damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "4: Disintegration Ray",
                entries: [
                  "{@actSave dex} {@dc 14}. {@actSaveFail} 27 ({@damage 5d10}) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 {@variantrule Hit Points|XPHB}, it disintegrates into dust.",
                ],
              },
            ],
          },
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/beholder-zombie.mp3",
    },
    traitTags: ["Undead Fortitude"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["CS", "DS", "U"],
    damageTags: ["N", "O", "P", "Y"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "paralyzed", "poisoned"],
    savingThrowForced: ["constitution", "dexterity", "wisdom"],
  },
  {
    name: "Bulette",
    source: "XMM",
    page: 63,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [17],
    hp: {
      average: 94,
      formula: "9d10 + 45",
    },
    speed: {
      walk: 40,
      burrow: 40,
    },
    str: 19,
    dex: 11,
    con: 21,
    int: 2,
    wis: 10,
    cha: 5,
    skill: {
      perception: "+6",
    },
    senses: ["darkvision 60 ft.", "tremorsense 120 ft."],
    passive: 16,
    cr: "5",
    action: [
      {
        name: "Multiattack",
        entries: ["The bulette makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}17 ({@damage 2d12 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Deadly Leap",
        entries: [
          "The bulette spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. {@actSave dex} {@dc 15}, each creature in the bulette's destination space. {@actSaveFail} 19 ({@damage 3d12}) Bludgeoning damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage, and the target is pushed 5 feet straight away from the bulette.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The bulette jumps up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/bulette.mp3",
    },
    senseTags: ["D", "T"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Cambion",
    source: "XMM",
    page: 65,
    size: ["M"],
    type: "fiend",
    alignment: ["N", "E"],
    ac: [19],
    hp: {
      average: 105,
      formula: "14d8 + 42",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    str: 18,
    dex: 18,
    con: 16,
    int: 14,
    wis: 12,
    cha: 16,
    save: {
      str: "+7",
      con: "+6",
      int: "+5",
      cha: "+6",
    },
    skill: {
      deception: "+6",
      perception: "+4",
      stealth: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 14,
    resist: ["cold", "fire", "lightning", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Infernal"],
    cr: "5",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cambion casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 14}):",
        ],
        daily: {
          "2e": [
            "{@spell Alter Self|XPHB}",
            "{@spell Command|XPHB} (level 3 version)",
            "{@spell Detect Magic|XPHB}",
          ],
          "1e": [
            "{@spell Dominate Person|XPHB} (level 8 version)",
            "{@spell Plane Shift|XPHB} (self only)",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cambion makes two attacks, using Claw or Fire Ray in any combination.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Slashing damage plus 7 ({@damage 2d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Ray",
        entries: [
          "{@atkr r} {@hit 7}, range 120 ft. {@h}13 ({@damage 3d6 + 3}) Fire damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/cambion.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "I"],
    damageTags: ["F", "S"],
    damageTagsSpell: ["B", "P", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["charmed", "prone"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Earth Elemental",
    source: "XMM",
    page: 108,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "elemental",
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 147,
      formula: "14d10 + 70",
    },
    speed: {
      walk: 30,
      burrow: 30,
    },
    str: 20,
    dex: 8,
    con: 20,
    int: 5,
    wis: 10,
    cha: 5,
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 10,
    immune: ["poison"],
    vulnerable: ["thunder"],
    conditionImmune: [
      "exhaustion",
      "paralyzed",
      "petrified",
      "poisoned",
      "unconscious",
    ],
    languages: ["Primordial (Terran)"],
    cr: "5",
    trait: [
      {
        name: "Earth Glide",
        entries: [
          "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.",
        ],
      },
      {
        name: "Siege Monster",
        entries: [
          "The elemental deals double damage to objects and structures.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The elemental makes two attacks, using Slam or Rock Launch in any combination.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}14 ({@damage 2d8 + 5}) Bludgeoning damage.",
        ],
      },
      {
        name: "Rock Launch",
        entries: [
          "{@atkr r} {@hit 8}, range 60 ft. {@h}8 ({@damage 1d6 + 5}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["mountain", "planar, earth", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/earth-elemental.mp3",
    },
    traitTags: ["Siege Monster"],
    senseTags: ["D", "T"],
    actionTags: ["Multiattack"],
    languageTags: ["P", "T"],
    damageTags: ["B"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Fire Elemental",
    source: "XMM",
    page: 118,
    otherSources: [
      {
        source: "ScoEE",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "elemental",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 50,
    },
    str: 10,
    dex: 17,
    con: 16,
    int: 6,
    wis: 10,
    cha: 7,
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["fire", "poison"],
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
    languages: ["Primordial (Ignan)"],
    cr: "5",
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the elemental's turns, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the elemental takes 5 ({@damage 1d10}) Fire damage. Creatures and flammable objects in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} start {@hazard burning|XPHB}.",
        ],
      },
      {
        name: "Fire Form",
        entries: [
          "The elemental can move through a space as narrow as 1 inch without expending extra movement to do so, and it can enter a creature's space and stop there. The first time it enters a creature's space on a turn, that creature takes 5 ({@damage 1d10}) Fire damage.",
        ],
      },
      {
        name: "Illumination",
        entries: [
          "The elemental sheds {@variantrule Bright Light|XPHB} in a 30-foot radius and {@variantrule Dim Light|XPHB} for an additional 30 feet.",
        ],
      },
      {
        name: "Water Susceptibility",
        entries: [
          "The elemental takes 3 ({@damage 1d6}) Cold damage for every 5 feet the elemental moves in water or for every gallon of water splashed on it.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The elemental makes two Burn attacks."],
      },
      {
        name: "Burn",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Fire damage. If the target is a creature or a flammable object, it starts {@hazard burning|XPHB}.",
        ],
      },
    ],
    environment: ["desert", "planar, fire"],
    soundClip: {
      type: "internal",
      path: "bestiary/fire-elemental.mp3",
    },
    traitTags: ["Illumination"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["IG", "P"],
    damageTags: ["C", "F"],
    miscTags: ["MA"],
  },
  {
    name: "Flesh Golem",
    source: "XMM",
    page: 121,
    size: ["M"],
    type: "construct",
    alignment: ["N"],
    ac: [9],
    hp: {
      average: 127,
      formula: "15d8 + 60",
    },
    speed: {
      walk: 30,
    },
    str: 19,
    dex: 9,
    con: 18,
    int: 6,
    wis: 10,
    cha: 5,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["lightning", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["understands Common plus one other language but can't speak"],
    cr: "5",
    trait: [
      {
        name: "Aversion to Fire",
        entries: [
          "If the golem takes Fire damage, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the end of its next turn.",
        ],
      },
      {
        name: "Berserk",
        entries: [
          "Whenever the golem starts its turn {@variantrule Bloodied|XPHB}, roll {@dice 1d6}. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object. Once the golem goes berserk, it remains so until it is destroyed or it is no longer {@variantrule Bloodied|XPHB}.",
          "The golem's creator, if within 60 feet of the berserk golem, can try to calm it by taking an action to make a {@dc 15} Charisma ({@skill Persuasion|XPHB}) check; the golem must be able to hear its creator. If this check succeeds, the golem ceases being berserk until the start of its next turn, at which point it resumes rolling for the Berserk trait again if it is still {@variantrule Bloodied|XPHB}.",
        ],
      },
      {
        name: "Immutable Form",
        entries: ["The golem can't shape-shift."],
      },
      {
        name: "Lightning Absorption",
        entries: [
          "Whenever the golem is subjected to Lightning damage, it regains a number of {@variantrule Hit Points|XPHB} equal to the Lightning damage dealt.",
        ],
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
        entries: ["The golem makes two Slam attacks."],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage plus 4 ({@damage 1d8}) Lightning damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/flesh-golem.mp3",
    },
    traitTags: ["Damage Absorption", "Immutable Form", "Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["B", "L"],
    miscTags: ["MA"],
  },
  {
    name: "Giant Axe Beak",
    source: "XMM",
    page: 24,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 84,
      formula: "8d12 + 32",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 14,
    con: 19,
    int: 3,
    wis: 12,
    cha: 5,
    skill: {
      perception: "+4",
    },
    passive: 14,
    cr: "5",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The axe beak makes one Sharpened Beak attack and one Talons attack.",
        ],
      },
      {
        name: "Sharpened Beak",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}18 ({@damage 2d12 + 5}) Slashing damage, and a creature within 5 feet of the target (axe beak's choice) takes 6 ({@damage 1d12}) Slashing damage.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["arctic", "grassland", "hill"],
    actionTags: ["Multiattack"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Giant Crocodile",
    source: "XMM",
    page: 356,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 85,
      formula: "9d12 + 27",
    },
    speed: {
      walk: 30,
      swim: 50,
    },
    str: 21,
    dex: 9,
    con: 17,
    int: 2,
    wis: 10,
    cha: 7,
    skill: {
      stealth: "+5",
    },
    passive: 10,
    cr: "5",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The crocodile can hold its breath for 1 hour."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The crocodile makes one Bite attack and one Tail attack."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}21 ({@damage 3d10 + 5}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 15}). While {@condition Grappled|XPHB}, the target has the {@condition Restrained|XPHB} condition and can't be targeted by the crocodile's Tail.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}18 ({@damage 3d8 + 5}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal", "swamp"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-crocodile.mp3",
    },
    traitTags: ["Hold Breath"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
  },
  {
    name: "Giant Shark",
    source: "XMM",
    page: 359,
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 92,
      formula: "8d12 + 40",
    },
    speed: {
      walk: 5,
      swim: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 11,
    con: 21,
    int: 1,
    wis: 10,
    cha: 5,
    skill: {
      perception: "+3",
    },
    senses: ["blindsight 60 ft."],
    passive: 13,
    cr: "5",
    trait: [
      {
        name: "Water Breathing",
        entries: ["The shark can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The shark makes two Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 9} (with {@variantrule Advantage|XPHB} if the target doesn't have all its {@variantrule Hit Points|XPHB}), reach 5 ft. {@h}22 ({@damage 3d10 + 6}) Piercing damage.",
        ],
      },
    ],
    environment: ["underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-shark.mp3",
    },
    traitTags: ["Water Breathing"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Gladiator",
    source: "XMM",
    page: 139,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 112,
      formula: "15d8 + 45",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 10,
    wis: 12,
    cha: 15,
    save: {
      str: "+7",
      dex: "+5",
      con: "+6",
      wis: "+4",
    },
    skill: {
      athletics: "+10",
      performance: "+5",
    },
    passive: 11,
    languages: ["Common"],
    cr: "5",
    gear: [
      "shield|xphb",
      {
        item: "spear|xphb",
        quantity: 3,
      },
      "studded leather armor|xphb",
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The gladiator makes three Spear attacks. It can replace one attack with a use of Shield Bash.",
        ],
      },
      {
        name: "Spear",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 20/60 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Shield Bash",
        entries: [
          "{@actSave str} {@dc 15}, one creature within 5 feet that the gladiator can see. {@actSaveFail} 9 ({@damage 2d4 + 4}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The gladiator is hit by a melee attack roll while holding a weapon. {@actResponse} The gladiator adds 3 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/gladiator.mp3",
    },
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["C"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
    conditionInflict: ["prone"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Gorgon",
    source: "XMM",
    page: 148,
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [19],
    hp: {
      average: 114,
      formula: "12d10 + 48",
    },
    speed: {
      walk: 40,
    },
    str: 20,
    dex: 11,
    con: 18,
    int: 2,
    wis: 12,
    cha: 7,
    skill: {
      perception: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 17,
    conditionImmune: ["exhaustion", "petrified"],
    cr: "5",
    action: [
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}18 ({@damage 2d12 + 5}) Piercing damage. If the target is a Large or smaller creature and the gorgon moved 20+ feet straight toward it immediately before the hit, the target has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Petrifying Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Trample",
        entries: [
          "{@actSave dex} {@dc 16}, one creature within 5 feet that has the {@condition Prone|XPHB} condition. {@actSaveFail} 16 ({@damage 2d10 + 5}) Bludgeoning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/gorgon.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Breath Weapon"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["petrified", "prone", "restrained"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Half-Dragon",
    source: "XMM",
    page: 163,
    size: ["M"],
    type: "dragon",
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 105,
      formula: "14d8 + 42",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 14,
    con: 16,
    int: 10,
    wis: 15,
    cha: 14,
    save: {
      dex: "+5",
      wis: "+5",
    },
    skill: {
      athletics: "+7",
      perception: "+5",
      stealth: "+5",
    },
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 15,
    resist: [
      {
        special: "Damage type chosen for the Draconic Origin trait below",
      },
    ],
    languages: ["Common", "Draconic"],
    cr: "5",
    trait: [
      {
        name: "Draconic Origin",
        entries: [
          "The half-dragon is related to a type of dragon associated with one of the following damage types (DM's choice): Acid, Cold, Fire, Lightning, or Poison. This choice affects other aspects of the stat block.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The half-dragon makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}6 ({@damage 1d4 + 4}) Slashing damage plus 7 ({@damage 2d6}) damage of the type chosen for the Draconic Origin trait.",
        ],
      },
      {
        name: "Dragon's Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 28 ({@damage 8d6}) damage of the type chosen for the Draconic Origin trait. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The half-dragon jumps up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Hill Giant",
    source: "XMM",
    page: 168,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 105,
      formula: "10d12 + 40",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 8,
    con: 19,
    int: 5,
    wis: 9,
    cha: 6,
    skill: {
      perception: "+2",
    },
    passive: 12,
    languages: ["Giant"],
    cr: "5",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Tree Club or Trash Lob in any combination.",
        ],
      },
      {
        name: "Tree Club",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}18 ({@damage 3d8 + 5}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Trash Lob",
        entries: [
          "{@atkr r} {@hit 8}, range 60/240 ft. {@h}16 ({@damage 2d10 + 5}) Bludgeoning damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["hill"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/hill-giant.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["B"],
    miscTags: ["MA", "MLW", "RA", "RCH"],
    conditionInflict: ["poisoned", "prone"],
  },
  {
    name: "Mezzoloth",
    group: ["Yugoloths"],
    source: "XMM",
    page: 211,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["yugoloth"],
    },
    alignment: ["N", "E"],
    ac: [18],
    hp: {
      average: 75,
      formula: "10d8 + 30",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 11,
    con: 16,
    int: 7,
    wis: 14,
    cha: 10,
    skill: {
      perception: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 60 ft."],
    passive: 15,
    resist: ["cold", "fire", "lightning"],
    immune: ["acid", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Infernal; telepathy 60 ft."],
    cr: "5",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mezzoloth casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        daily: {
          "1e": [
            "{@spell Cloudkill|XPHB}",
            "{@spell Darkness|XPHB}",
            "{@spell Dispel Magic|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Fiendish Restoration",
        entries: [
          "If the mezzoloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Gehenna.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The mezzoloth has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The mezzoloth makes two attacks, using Claws or Mercurial Trident in any combination.",
        ],
      },
      {
        name: "Claws",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}9 ({@damage 2d4 + 4}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from two of four claws, and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Mercurial Trident",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 20/60 ft. {@h}8 ({@damage 1d8 + 4}) Piercing damage plus 10 ({@damage 3d6}) Force damage. {@hom}The trident magically returns to the mezzoloth's claw immediately after a ranged attack.",
        ],
      },
    ],
    bonus: [
      {
        name: "Teleport {@recharge 5}",
        entries: [
          "The mezzoloth teleports up to 60 feet to an unoccupied space it can see. It can teleport one creature it is grappling to an unoccupied space within 5 feet of its destination space.",
        ],
      },
    ],
    environment: ["planar, gehenna"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/mezzoloth.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack", "Teleport"],
    languageTags: ["AB", "I", "TP"],
    damageTags: ["O", "P", "S"],
    damageTagsSpell: ["I"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "THW"],
    conditionInflict: ["grappled", "restrained"],
    savingThrowForcedSpell: ["constitution"],
  },
  {
    name: "Night Hag",
    source: "XMM",
    page: 225,
    size: ["M"],
    type: "fiend",
    alignment: ["N", "E"],
    ac: [17],
    hp: {
      average: 112,
      formula: "15d8 + 45",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 16,
    wis: 14,
    cha: 16,
    skill: {
      deception: "+6",
      insight: "+5",
      perception: "+5",
      stealth: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 15,
    resist: ["cold", "fire"],
    conditionImmune: ["charmed"],
    languages: ["Abyssal", "Common", "Infernal", "Primordial"],
    cr: "5",
    spellcasting: [
      {
        name: "Coven Magic",
        type: "spellcasting",
        headerEntries: [
          "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save {@dc 14}): {@spell Augury|XPHB}, {@spell Find Familiar|XPHB}, {@spell Identify|XPHB}, {@spell Locate Object|XPHB}, {@spell Scrying|XPHB}, or {@spell Unseen Servant|XPHB}. The hag must finish a {@variantrule Long Rest|XPHB} before using this trait to cast that spell again.",
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
          "The hag casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Etherealness|XPHB}",
          "{@spell Magic Missile|XPHB} (level 4 version)",
        ],
        daily: {
          "2e": [
            "{@spell Phantasmal Killer|XPHB}",
            "{@spell Plane Shift|XPHB} (self only)",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Nightmare Haunting (1/Day; Requires Soul Bag)",
        type: "spellcasting",
        headerEntries: [
          "While on the Ethereal Plane, the hag casts {@spell Dream|XPHB}, using the same spellcasting ability as Spellcasting. Only the hag can serve as the spell's messenger, and the target must be a creature the hag can see on the Material Plane. The spell fails and is wasted if the target is under the effect of the {@spell Protection from Evil and Good|XPHB} spell or within a {@spell Magic Circle|XPHB} spell.",
          "If the target takes damage from the {@spell Dream|XPHB} spell, the target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to that damage. If the spell kills the target, its soul is trapped in the hag's soul bag, and the target can't be raised from the dead until its soul is released.",
        ],
        daily: {
          "1": [
            "{@spell Dream|XPHB}",
            "{@spell Protection from Evil and Good|XPHB}",
            "{@spell Magic Circle|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The hag has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Soul Bag",
        entries: [
          "The hag has a soul bag. While holding or carrying the bag, the hag can use its Nightmare Haunting action.",
          "The bag has AC 15, HP 20, and {@variantrule Resistance|XPHB} to all damage. The bag turns to dust if reduced to 0 {@variantrule Hit Points|XPHB}. If the bag is destroyed, any souls the bag is holding are released. The hag can create a new bag after 7 days.",
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
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The hag shape-shifts into a Small or Medium Humanoid, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["planar, lower"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/night-hag.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "I", "P"],
    damageTags: ["S"],
    damageTagsSpell: ["O", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    savingThrowForcedSpell: ["charisma", "wisdom"],
  },
  {
    name: "Otyugh",
    source: "XMM",
    page: 233,
    size: ["L"],
    type: "aberration",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 104,
      formula: "11d10 + 44",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 11,
    con: 19,
    int: 6,
    wis: 13,
    cha: 6,
    save: {
      con: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    languages: [
      "Otyugh; telepathy 120 ft. (doesn't allow the receiving creature to respond telepathically)",
    ],
    cr: "5",
    action: [
      {
        name: "Multiattack",
        entries: ["The otyugh makes one Bite attack and two Tentacle attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition. Whenever the {@condition Poisoned|XPHB} target finishes a {@variantrule Long Rest|XPHB}, it is subjected to the following effect. {@actSave con} {@dc 15}. {@actSaveFail} The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 5 ({@dice 1d10}) and doesn't return to normal until the {@condition Poisoned|XPHB} condition ends on the target. {@actSaveSuccess} The {@condition Poisoned|XPHB} condition ends.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}) from one of two tentacles.",
        ],
      },
      {
        name: "Tentacle Slam",
        entries: [
          "{@actSave con} {@dc 14}, each creature {@condition Grappled|XPHB} by the otyugh. {@actSaveFail} 16 ({@damage 3d8 + 3}) Bludgeoning damage, and the target has the {@condition Stunned|XPHB} condition until the start of the otyugh's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/otyugh.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack", "Tentacles"],
    languageTags: ["OTH", "TP"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "poisoned", "stunned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Pixie Wonderbringer",
    source: "XMM",
    page: 244,
    size: ["T"],
    type: "fey",
    alignment: ["N", "G"],
    ac: [15],
    hp: {
      average: 60,
      formula: "24d4",
    },
    speed: {
      walk: 10,
      fly: 30,
    },
    str: 2,
    dex: 20,
    con: 10,
    int: 11,
    wis: 14,
    cha: 18,
    skill: {
      arcana: "+3",
      perception: "+5",
      stealth: "+8",
    },
    passive: 15,
    languages: ["Common", "Elvish", "Sylvan"],
    cr: "5",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The pixie casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 15}):",
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
            "{@spell Major Image|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Burst of Wonder {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The pixie casts {@spell Entangle|XPHB}, {@spell Polymorph|XPHB}, or {@spell Tasha's Hideous Laughter|XPHB}, requiring no Material components and using the same spellcasting ability as Spellcasting.",
        ],
        recharge: {
          "5": [
            "{@spell Entangle|XPHB}",
            "{@spell Polymorph|XPHB}",
            "{@spell Tasha's Hideous Laughter|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "bonus",
        hidden: ["recharge"],
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
        name: "Multiattack",
        entries: ["The pixie makes two Faerie Dust attacks."],
      },
      {
        name: "Faerie Dust",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 60 ft. {@h}15 ({@damage 2d10 + 4}) Radiant damage, and the target has the {@condition Charmed|XPHB} or {@condition Poisoned|XPHB} condition (pixie's choice) until the start of the pixie's next turn.",
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    treasure: ["arcana"],
    traitTags: ["Magic Resistance"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "E", "S"],
    damageTags: ["R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: [
      "incapacitated",
      "invisible",
      "prone",
      "restrained",
    ],
    savingThrowForcedSpell: ["strength", "wisdom"],
  },
  {
    name: "Red Slaad",
    source: "XMM",
    page: 285,
    size: ["L"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [14],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 12,
    con: 16,
    int: 6,
    wis: 6,
    cha: 7,
    skill: {
      perception: "+1",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["Slaad; telepathy 60 ft."],
    cr: "5",
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
        entries: ["The slaad makes three Injecting Claw attacks."],
      },
      {
        name: "Injecting Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage. If the target is a Humanoid not cursed by a slaad, it is subjected to the following effect. {@actSave con} {@dc 14}. {@actSaveFail} The target is cursed unawares, and a minuscule slaad egg is implanted in it. Removing the curse destroys the egg.",
          "Over {@dice 2d4 × 10} days, the egg gestates. In the final 24 hours, the cursed target feels unwell; its {@variantrule Speed|XPHB} is halved, and it has {@variantrule Disadvantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}. At the end of this time, the egg turns into a Slaad Tadpole, which chews out of the host and kills it.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/red-slaad.mp3",
    },
    traitTags: ["Magic Resistance", "Regeneration"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH", "TP"],
    damageTags: ["P"],
    miscTags: ["CUR", "MA", "RCH"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Revenant",
    source: "XMM",
    page: 259,
    size: ["M"],
    type: "undead",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 127,
      formula: "15d8 + 60",
    },
    speed: {
      walk: 30,
    },
    str: 18,
    dex: 14,
    con: 18,
    int: 13,
    wis: 16,
    cha: 18,
    save: {
      str: "+7",
      con: "+7",
      wis: "+6",
      cha: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    resist: ["necrotic", "psychic"],
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
      "stunned",
    ],
    languages: ["Common plus one other language"],
    cr: "5",
    trait: [
      {
        name: "Regeneration",
        entries: [
          "The revenant regains 10 {@variantrule Hit Points|XPHB} at the start of each of its turns. If the revenant takes Fire or Radiant damage, this trait doesn't function at the start of its next turn. Its body is destroyed only if it starts its turn with 0 {@variantrule Hit Points|XPHB} and doesn't regenerate.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If the revenant dies, it revives 24 hours later in a different body unless {@spell Dispel Evil and Good|XPHB} is cast on its corpse. If it revives, it animates a Humanoid corpse elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The revenant uses Vengeful Glare and makes two Slam attacks.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Necrotic damage.",
        ],
      },
      {
        name: "Vengeful Glare",
        entries: [
          "{@actSave wis} {@dc 15}, one creature the revenant can see within 30 feet. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. If the {@condition Frightened|XPHB} target is cursed by the revenant (see Vow of Revenge), the target also has the {@condition Paralyzed|XPHB} condition for the duration.",
        ],
      },
    ],
    bonus: [
      {
        name: "Vow of Revenge (1/Day)",
        entries: [
          "The revenant curses one creature it can see within 30 feet of itself. The revenant knows the distance to and direction of the cursed target, even if it is on a different plane of existence. The curse ends on the target if the revenant uses this {@variantrule Bonus Action|XPHB} on a different creature.",
        ],
      },
    ],
    environment: ["forest", "swamp", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/revenant.mp3",
    },
    traitTags: ["Regeneration"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["N"],
    miscTags: ["CUR", "MA"],
    conditionInflict: ["frightened", "paralyzed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Roper",
    source: "XMM",
    page: 262,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [20],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 10,
      climb: 20,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 8,
    con: 17,
    int: 7,
    wis: 16,
    cha: 6,
    skill: {
      perception: "+6",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 16,
    cr: "5",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The roper can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The roper makes two Tentacle attacks, uses Reel, and makes two Bite attacks.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}17 ({@damage 3d8 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 7}, reach 60 ft. {@h}The target has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of six tentacles, and the target has the {@condition Poisoned|XPHB} condition until the grapple ends.",
          "The tentacle can be damaged, freeing a creature it has {@condition Grappled|XPHB} when destroyed (AC 20, HP 10, {@variantrule Immunity|XPHB} to Poison and Psychic damage). Damaging the tentacle deals no damage to the roper, and a destroyed tentacle regrows at the start of the roper's next turn.",
        ],
      },
      {
        name: "Reel",
        entries: [
          "The roper pulls each creature {@condition Grappled|XPHB} by it up to 30 feet straight toward it.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/roper.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["D"],
    actionTags: ["Multiattack", "Tentacles"],
    damageTags: ["P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "poisoned"],
  },
  {
    name: "Sahuagin Baron",
    source: "XMM",
    page: 265,
    size: ["L"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [16],
    hp: {
      average: 76,
      formula: "9d10 + 27",
    },
    speed: {
      walk: 30,
      swim: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 15,
    con: 16,
    int: 14,
    wis: 13,
    cha: 17,
    save: {
      dex: "+5",
      con: "+6",
      wis: "+4",
    },
    skill: {
      perception: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 17,
    resist: ["acid", "cold"],
    languages: ["Sahuagin"],
    cr: "5",
    gear: ["breastplate|xphb", "trident|xphb"],
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
        entries: ["The sahuagin makes three Trident attacks."],
      },
      {
        name: "Trident",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 20/60 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Fiendish Blood",
        entries: [
          "{@actTrigger} The sahuagin takes Piercing or Slashing damage. {@actResponse d}{@actSave con} {@dc 14}, each creature of the sahuagin's choice in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the sahuagin. {@actSaveFail} 10 ({@damage 3d6}) Acid damage, and the target is cursed until it finishes a {@variantrule Short Rest|XPHB|Short} or {@variantrule Long Rest|XPHB}. While cursed, the target can't benefit from the {@condition Invisible|XPHB} condition, its {@variantrule Speed|XPHB} decreases by 10 feet, and all Fiends within 120 feet of the target can sense its location regardless of interposing obstacles.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/sahuagin-baron.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["A", "P"],
    miscTags: ["CUR", "MA", "MLW", "RA", "THW"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Salamander",
    source: "XMM",
    page: 267,
    size: ["L"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 90,
      formula: "12d10 + 24",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 18,
    dex: 14,
    con: 15,
    int: 11,
    wis: 10,
    cha: 12,
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["fire"],
    vulnerable: ["cold"],
    languages: ["Primordial (Ignan)"],
    cr: "5",
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the salamander's turns, each creature of the salamander's choice in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the salamander takes 7 ({@damage 2d6}) Fire damage.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The salamander makes two Flame Spear attacks. It can replace one attack with a use of Constrict.",
        ],
      },
      {
        name: "Flame Spear",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 20/60 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage plus 7 ({@damage 2d6}) Fire damage. {@hom}The spear magically returns to the salamander's hand immediately after a ranged attack.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 15}, one Large or smaller creature the salamander can see within 10 feet. {@actSaveFail} 11 ({@damage 2d6 + 4}) Bludgeoning damage plus 7 ({@damage 2d6}) Fire damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 14}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    environment: ["planar, fire", "underdark"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/salamander.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["IG", "P"],
    damageTags: ["B", "F", "P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
    conditionInflict: ["grappled", "restrained"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Shambling Mound",
    source: "XMM",
    page: 276,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "plant",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 110,
      formula: "13d10 + 39",
    },
    speed: {
      walk: 30,
      swim: 20,
    },
    str: 18,
    dex: 8,
    con: 16,
    int: 5,
    wis: 10,
    cha: 5,
    skill: {
      stealth: "+3",
    },
    senses: ["blindsight 60 ft."],
    passive: 10,
    resist: ["cold", "fire"],
    immune: ["lightning"],
    conditionImmune: ["deafened", "exhaustion"],
    cr: "5",
    trait: [
      {
        name: "Lightning Absorption",
        entries: [
          "Whenever the shambling mound is subjected to Lightning damage, it regains a number of {@variantrule Hit Points|XPHB} equal to the Lightning damage dealt.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The shambling mound makes three Charged Tendril attacks. It can replace one attack with a use of Engulf.",
        ],
      },
      {
        name: "Charged Tendril",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}7 ({@damage 1d6 + 4}) Bludgeoning damage plus 5 ({@damage 2d4}) Lightning damage. If the target is a Medium or smaller creature, the shambling mound pulls the target 5 feet straight toward itself.",
        ],
      },
      {
        name: "Engulf",
        entries: [
          "{@actSave str} {@dc 15}, one Medium or smaller creature within 5 feet. {@actSaveFail} The target is pulled into the shambling mound's space and has the {@condition Grappled|XPHB} condition (escape {@dc 14}). Until the grapple ends, the target has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, and it takes 10 ({@damage 3d6}) Lightning damage at the start of each of its turns. When the shambling mound moves, the {@condition Grappled|XPHB} target moves with it, costing it no extra movement. The shambling mound can have only one creature {@condition Grappled|XPHB} by this action at a time.",
        ],
      },
    ],
    environment: ["forest", "swamp"],
    soundClip: {
      type: "internal",
      path: "bestiary/shambling-mound.mp3",
    },
    traitTags: ["Damage Absorption"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "L"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Triceratops",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 372,
    size: ["H"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 114,
      formula: "12d12 + 36",
    },
    speed: {
      walk: 50,
    },
    str: 22,
    dex: 9,
    con: 17,
    int: 2,
    wis: 11,
    cha: 5,
    passive: 10,
    cr: "5",
    action: [
      {
        name: "Multiattack",
        entries: ["The triceratops makes two Gore attacks."],
      },
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}19 ({@damage 2d12 + 6}) Piercing damage. If the target is Huge or smaller and the triceratops moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 ({@damage 2d8}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/triceratops.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Troll",
    source: "XMM",
    page: 310,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 94,
      formula: "9d10 + 45",
    },
    speed: {
      walk: 30,
    },
    str: 18,
    dex: 13,
    con: 20,
    int: 7,
    wis: 9,
    cha: 7,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    languages: ["Giant"],
    cr: "5",
    trait: [
      {
        name: "Loathsome Limbs (4/Day)",
        entries: [
          "If the troll ends any turn {@variantrule Bloodied|XPHB} and took 15+ Slashing damage during that turn, one of the troll's limbs is severed, falls into the troll's space, and becomes a {@creature Troll Limb|XMM}. The limb acts immediately after the troll's turn. The troll has 1 {@condition Exhaustion|XPHB} level for each missing limb, and it grows replacement limbs the next time it regains {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Regeneration",
        entries: [
          "The troll regains 15 {@variantrule Hit Points|XPHB} at the start of each of its turns. If the troll takes Acid or Fire damage, this trait doesn't function on the troll's next turn. The troll dies only if it starts its turn with 0 {@variantrule Hit Points|XPHB} and doesn't regenerate.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The troll makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Charge",
        entries: [
          "The troll moves up to half its {@variantrule Speed|XPHB} straight toward an enemy it can see.",
        ],
      },
    ],
    environment: ["arctic", "forest", "hill", "mountain", "swamp", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/troll.mp3",
    },
    traitTags: ["Regeneration"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["S"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Umber Hulk",
    source: "XMM",
    page: 312,
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 30,
      burrow: 20,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 13,
    con: 16,
    int: 9,
    wis: 10,
    cha: 10,
    senses: ["darkvision 120 ft.", "tremorsense 60 ft."],
    passive: 10,
    languages: ["Umber Hulk"],
    cr: "5",
    trait: [
      {
        name: "Tunneler",
        entries: [
          "The umber hulk can burrow through solid rock at half its {@variantrule Burrow Speed|XPHB} and leaves a 10-foot-diameter tunnel in its wake.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The umber hulk makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Confusing Gaze {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target can't take Reactions until the start of the umber hulk's next turn, and the target rolls {@dice 1d8} to determine what it does on its next turn:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1-4",
                entry: "The target does nothing.",
              },
              {
                type: "item",
                name: "5-6",
                entry:
                  "The target takes no action or {@variantrule Bonus Action|XPHB} and uses all its movement to move in a random direction.",
              },
              {
                type: "item",
                name: "7-8",
                entry:
                  "The target makes a melee attack against a random creature within its reach or does nothing if it can't make such an attack.",
              },
            ],
          },
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/umber-hulk.mp3",
    },
    traitTags: ["Tunneler"],
    senseTags: ["SD", "T"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Unicorn",
    source: "XMM",
    size: ["L"],
    type: "celestial",
    alignment: ["L", "G"],
    ac: [12],
    hp: {
      average: 97,
      formula: "13d10 + 26",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 14,
    con: 15,
    int: 11,
    wis: 17,
    cha: 16,
    senses: ["darkvision 60 ft."],
    passive: 13,
    immune: ["poison"],
    conditionImmune: ["charmed", "paralyzed", "poisoned"],
    languages: ["Celestial", "Elvish", "Sylvan; telepathy 120 ft."],
    cr: "5",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The unicorn casts one of the following spells, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Druidcraft|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Calm Emotions|XPHB}",
            "{@spell Dispel Evil and Good|XPHB}",
            "{@spell Entangle|XPHB}",
            "{@spell Pass without Trace|XPHB}",
            "{@spell Word of Recall|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Unicorn's Blessing (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The unicorn touches another creature with its horn and casts {@spell Cure Wounds|XPHB} or {@spell Lesser Restoration|XPHB} on that creature, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": [
            "{@spell Cure Wounds|XPHB}",
            "{@spell Lesser Restoration|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day)",
        entries: [
          "If the unicorn fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The unicorn has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The unicorn makes one Hooves attack and one Radiant Horn attack.",
        ],
      },
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Bludgeoning damage.",
        ],
      },
      {
        name: "Radiant Horn",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}9 ({@damage 1d10 + 4}) Radiant damage.",
        ],
      },
    ],
    legendary: [
      {
        name: "Charging Horn",
        entries: [
          "The unicorn moves up to half its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}, and it makes one Radiant Horn attack.",
        ],
      },
      {
        name: "Shimmering Shield",
        entries: [
          "The unicorn targets itself or one creature it can see within 60 feet of itself. The target gains 10 ({@dice 3d6}) {@variantrule Temporary Hit Points|XPHB}, and its AC increases by 2 until the end of the unicorn's next turn. The unicorn can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Unicorn",
      source: "XMM",
    },
    environment: ["forest", "planar, feywild"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/unicorn.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["CE", "E", "S", "TP"],
    damageTags: ["B", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["charisma", "strength"],
  },
  {
    name: "Vampire Spawn",
    source: "XMM",
    page: 315,
    size: ["S", "M"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [16],
    hp: {
      average: 90,
      formula: "12d8 + 36",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 16,
    con: 16,
    int: 11,
    wis: 10,
    cha: 12,
    save: {
      dex: "+6",
      wis: "+3",
    },
    skill: {
      perception: "+3",
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    resist: ["necrotic"],
    languages: ["Common plus one other language"],
    cr: "5",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Vampire Weakness",
        entries: [
          "The vampire has these weaknesses:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Forbiddance",
                entries: [
                  "The vampire can't enter a residence without an invitation from an occupant.",
                ],
              },
              {
                type: "item",
                name: "Running Water",
                entries: [
                  "The vampire takes 20 Acid damage if it ends its turn in running water.",
                ],
              },
              {
                type: "item",
                name: "Stake to the Heart",
                entries: [
                  "The vampire is destroyed if a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the {@condition Incapacitated|XPHB} condition.",
                ],
              },
              {
                type: "item",
                name: "Sunlight",
                entries: [
                  "The vampire takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks.",
                ],
              },
            ],
          },
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The vampire makes two Claw attacks and uses Bite."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 2d4 + 3}) Slashing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}) from one of two claws.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@actSave con} {@dc 14}, one creature within 5 feet that is willing or that has the {@condition Grappled|XPHB}, {@condition Incapacitated|XPHB}, or {@condition Restrained|XPHB} condition. {@actSaveFail} 5 ({@damage 1d4 + 3}) Piercing damage plus 10 ({@damage 3d6}) Necrotic damage. The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains {@variantrule Hit Points|XPHB} equal to that amount.",
        ],
      },
    ],
    bonus: [
      {
        name: "Deathless Agility",
        entries: ["The vampire takes the Dash or Disengage action."],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/vampire-spawn.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["A", "N", "P", "R", "S"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "incapacitated"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Water Elemental",
    source: "XMM",
    page: 322,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "elemental",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 114,
      formula: "12d10 + 48",
    },
    speed: {
      walk: 30,
      swim: 90,
    },
    str: 18,
    dex: 14,
    con: 18,
    int: 5,
    wis: 10,
    cha: 8,
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["acid", "fire"],
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
    languages: ["Primordial (Aquan)"],
    cr: "5",
    trait: [
      {
        name: "Freeze",
        entries: [
          "If the elemental takes Cold damage, its {@variantrule Speed|XPHB} decreases by 20 feet until the end of its next turn.",
        ],
      },
      {
        name: "Water Form",
        entries: [
          "The elemental can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The elemental makes two Slam attacks."],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Whelm {@recharge 4}",
        entries: [
          "{@actSave str} {@dc 15}, each creature in the elemental's space. {@actSaveFail} 22 ({@damage 4d8 + 4}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}). Until the grapple ends, the target has the {@condition Restrained|XPHB} condition, is suffocating unless it can breathe water, and takes 9 ({@damage 2d8}) Bludgeoning damage at the start of each of the elemental's turns. The elemental can grapple one Large creature or up to two Medium or smaller creatures at a time with Whelm. As an action, a creature within 5 feet of the elemental can pull a creature out of it by succeeding on a {@dc 14} Strength ({@skill Athletics|XPHB}) check. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["coastal", "planar, water", "swamp", "underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/water-elemental.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AQ", "P"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Werebear",
    group: ["Lycanthropes"],
    source: "XMM",
    page: 324,
    size: ["S", "M"],
    type: {
      type: "monstrosity",
      tags: ["lycanthrope"],
    },
    alignment: ["N", "G"],
    ac: [15],
    hp: {
      average: 135,
      formula: "18d8 + 54",
    },
    speed: {
      walk: 30,
      alternate: {
        walk: [
          {
            number: 40,
            condition: "(bear form only)",
          },
        ],
      },
      climb: {
        number: 30,
        condition: "(bear form only)",
      },
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 10,
    con: 17,
    int: 11,
    wis: 12,
    cha: 12,
    skill: {
      perception: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 17,
    languages: ["Common (can't speak in bear form)"],
    cr: "5",
    gear: [
      {
        item: "handaxe|xphb",
        quantity: 4,
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The werebear makes two attacks, using Handaxe or Rend in any combination. It can replace one attack with a Bite attack.",
        ],
      },
      {
        name: "Bite (Bear or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}17 ({@damage 2d12 + 4}) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. {@actSave con} {@dc 14}. {@actSaveFail} The target is cursed. If the cursed target drops to 0 {@variantrule Hit Points|XPHB}, it instead becomes a Werebear under the DM's control and has 10 {@variantrule Hit Points|XPHB}. {@actSaveSuccess} The target is immune to this werebear's curse for 24 hours.",
        ],
      },
      {
        name: "Handaxe (Humanoid or Hybrid Form Only)",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft or range 20/60 ft. {@h}14 ({@damage 3d6 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Rend (Bear or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The werebear shape-shifts into a Large bear-humanoid hybrid form or a Large bear, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["arctic", "forest", "hill"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/werebear.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS"],
    damageTags: ["P", "S"],
    miscTags: ["CUR", "MA", "MLW", "RA", "THW"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Wraith",
    source: "XMM",
    page: 336,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 67,
      formula: "9d8 + 27",
    },
    speed: {
      walk: 5,
      fly: {
        number: 60,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 6,
    dex: 16,
    con: 16,
    int: 12,
    wis: 14,
    cha: 15,
    senses: ["darkvision 60 ft."],
    passive: 12,
    resist: ["acid", "bludgeoning", "cold", "fire", "piercing", "slashing"],
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
    languages: ["Common plus two other languages"],
    cr: "5",
    trait: [
      {
        name: "Incorporeal Movement",
        entries: [
          "The wraith can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the wraith has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Life Drain",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}21 ({@damage 4d8 + 3}) Necrotic damage. If the target is a creature, its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken.",
        ],
      },
      {
        name: "Create Specter",
        entries: [
          "The wraith targets a Humanoid corpse within 10 feet of itself that has been dead for no longer than 1 minute. The target's spirit rises as a {@creature Specter|XMM} in the space of its corpse or in the nearest unoccupied space. The specter is under the wraith's control. The wraith can have no more than seven specters under its control at a time.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/wraith.mp3",
    },
    traitTags: ["Incorporeal Movement", "Sunlight Sensitivity"],
    senseTags: ["D"],
    languageTags: ["C", "X"],
    damageTags: ["N", "O"],
    miscTags: ["MA"],
  },
  {
    name: "Xorn",
    source: "XMM",
    page: 338,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [19],
    hp: {
      average: 84,
      formula: "8d8 + 48",
    },
    speed: {
      walk: 20,
      burrow: 20,
    },
    str: 17,
    dex: 10,
    con: 22,
    int: 11,
    wis: 10,
    cha: 11,
    skill: {
      perception: "+6",
      stealth: "+6",
    },
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 16,
    immune: ["poison"],
    conditionImmune: ["paralyzed", "petrified", "poisoned"],
    languages: ["Primordial (Terran)"],
    cr: "5",
    trait: [
      {
        name: "Earth Glide",
        entries: [
          "The xorn can burrow through nonmagical, unworked earth and stone. While doing so, the xorn doesn't disturb the material it moves through.",
        ],
      },
      {
        name: "Treasure Sense",
        entries: [
          "The xorn can pinpoint the location of precious metals and stones within 60 feet of itself.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The xorn makes one Bite attack and three Claw attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}17 ({@damage 4d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Charge",
        entries: [
          "The xorn moves up to its {@variantrule Speed|XPHB} or {@variantrule Burrow Speed|XPHB} straight toward an enemy it can sense.",
        ],
      },
    ],
    environment: ["planar, earth", "underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/xorn.mp3",
    },
    senseTags: ["D", "T"],
    actionTags: ["Multiattack"],
    languageTags: ["P", "T"],
    damageTags: ["P", "S"],
    miscTags: ["MA"],
  },
  {
    name: "Young Remorhaz",
    source: "XMM",
    page: 258,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 93,
      formula: "11d10 + 33",
    },
    speed: {
      walk: 30,
      burrow: 20,
    },
    str: 18,
    dex: 13,
    con: 17,
    int: 3,
    wis: 10,
    cha: 4,
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 10,
    immune: ["cold", "fire"],
    cr: "5",
    trait: [
      {
        name: "Heat Aura",
        entries: [
          "At the end of each of the remorhaz's turns, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the remorhaz takes 11 ({@damage 2d10}) Fire damage.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}15 ({@damage 2d10 + 4}) Piercing damage plus 13 ({@damage 3d8}) Fire damage.",
        ],
      },
    ],
    environment: ["arctic"],
    soundClip: {
      type: "internal",
      path: "bestiary/remorhaz.mp3",
    },
    senseTags: ["D", "T"],
    damageTags: ["F", "P"],
    miscTags: ["MA"],
  },
];
