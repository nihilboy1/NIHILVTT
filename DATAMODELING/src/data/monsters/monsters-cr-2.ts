// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_2 = [
  {
    name: "Allosaurus",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 348,
    size: ["L"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 51,
      formula: "6d10 + 18",
    },
    speed: {
      walk: 60,
    },
    str: 19,
    dex: 13,
    con: 17,
    int: 2,
    wis: 12,
    cha: 5,
    skill: {
      perception: "+5",
    },
    passive: 15,
    cr: "2",
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}15 ({@damage 2d10 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Claws",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Slashing damage. If the target is a Large or smaller creature and the allosaurus moved 30+ feet straight toward it immediately before the hit, the target has the {@condition Prone|XPHB} condition, and the allosaurus can make one Bite attack against it.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/allosaurus.mp3",
    },
    damageTags: ["P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Animated Rug of Smothering",
    source: "XMM",
    page: 17,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 27,
      formula: "5d10",
    },
    speed: {
      walk: 10,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 14,
    con: 10,
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
    cr: "2",
    action: [
      {
        name: "Smother",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Bludgeoning damage. If the target is a Medium or smaller creature, the rug can give it the {@condition Grappled|XPHB} condition (escape {@dc 13}) instead of dealing damage. Until the grapple ends, the target has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, is suffocating, and takes 10 ({@damage 2d6 + 3}) Bludgeoning damage at the start of each of its turns. The rug can smother only one creature at a time.",
          "While grappling the target, the rug can't take this action, the rug halves the damage it takes (round down), and the target takes the same amount of damage.",
        ],
      },
    ],
    environment: ["urban"],
    senseTags: ["B"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Ankheg",
    source: "XMM",
    page: 18,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 30,
      burrow: 10,
    },
    str: 17,
    dex: 11,
    con: 14,
    int: 1,
    wis: 13,
    cha: 6,
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 11,
    cr: "2",
    trait: [
      {
        name: "Tunneler",
        entries: [
          "The ankheg can burrow through solid rock at half its {@variantrule Burrow Speed|XPHB} and leaves a 10-foot-diameter tunnel in its wake.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5} (with {@variantrule Advantage|XPHB} if the target is {@condition Grappled|XPHB} by the ankheg), reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage plus 3 ({@damage 1d6}) Acid damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}).",
        ],
      },
      {
        name: "Acid Spray {@recharge}",
        entries: [
          "{@actSave dex} {@dc 12}, each creature in a 30-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 14 ({@damage 4d6}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["forest", "grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/ankheg.mp3",
    },
    traitTags: ["Tunneler"],
    senseTags: ["D", "T"],
    damageTags: ["A", "S"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Awakened Tree",
    source: "XMM",
    page: 23,
    size: ["H"],
    type: "plant",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 59,
      formula: "7d12 + 14",
    },
    speed: {
      walk: 20,
    },
    str: 19,
    dex: 6,
    con: 15,
    int: 10,
    wis: 10,
    cha: 7,
    passive: 10,
    resist: ["bludgeoning", "piercing"],
    vulnerable: ["fire"],
    languages: ["Common plus one other language"],
    cr: "2",
    action: [
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/awakened-tree.mp3",
    },
    languageTags: ["C", "X"],
    damageTags: ["B"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Azer Sentinel",
    source: "XMM",
    page: 25,
    size: ["M"],
    type: "elemental",
    alignment: ["L", "N"],
    ac: [17],
    hp: {
      average: 39,
      formula: "6d8 + 12",
    },
    speed: {
      walk: 30,
    },
    str: 17,
    dex: 12,
    con: 15,
    int: 12,
    wis: 13,
    cha: 10,
    save: {
      con: "+4",
    },
    passive: 11,
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Primordial (Ignan)"],
    cr: "2",
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the azer takes 5 ({@damage 1d10}) Fire damage unless the azer has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Illumination",
        entries: [
          "The azer sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Burning Hammer",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Bludgeoning damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
    ],
    environment: ["mountain", "planar, fire"],
    treasure: ["armaments", "individual"],
    traitTags: ["Illumination"],
    languageTags: ["IG", "P"],
    damageTags: ["B", "F"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["incapacitated"],
  },
  {
    name: "Bandit Captain",
    source: "XMM",
    page: 27,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 52,
      formula: "8d8 + 16",
    },
    speed: {
      walk: 30,
    },
    str: 15,
    dex: 16,
    con: 14,
    int: 14,
    wis: 11,
    cha: 14,
    save: {
      str: "+4",
      dex: "+5",
      wis: "+2",
    },
    skill: {
      athletics: "+4",
      deception: "+4",
    },
    passive: 10,
    languages: ["Common", "Thieves' cant"],
    cr: "2",
    gear: ["pistol|xphb", "scimitar|xphb", "studded leather armor|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The bandit makes two attacks, using Scimitar and Pistol in any combination.",
        ],
      },
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Pistol",
        entries: [
          "{@atkr r} {@hit 5}, range 30/90 ft. {@h}8 ({@damage 1d10 + 3}) Piercing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The bandit is hit by a melee attack roll while holding a weapon. {@actResponse} The bandit adds 2 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/bandit-captain.mp3",
    },
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["C", "TC"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Berserker",
    source: "XMM",
    page: 37,
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
    ac: [13],
    hp: {
      average: 67,
      formula: "9d8 + 27",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 12,
    con: 17,
    int: 9,
    wis: 11,
    cha: 9,
    passive: 10,
    languages: ["Common"],
    cr: "2",
    gear: ["greataxe|xphb", "hide armor|xphb"],
    trait: [
      {
        name: "Bloodied Frenzy",
        entries: [
          "While {@variantrule Bloodied|XPHB}, the berserker has {@variantrule Advantage|XPHB} on attack rolls and saving throws.",
        ],
      },
    ],
    action: [
      {
        name: "Greataxe",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}9 ({@damage 1d12 + 3}) Slashing damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/berserker.mp3",
    },
    languageTags: ["C"],
    damageTags: ["S"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Black Dragon Wyrmling",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 38,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [17],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 14,
    con: 13,
    int: 10,
    wis: 11,
    cha: 13,
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
    immune: ["acid"],
    languages: ["Draconic"],
    cr: "2",
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
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Slashing damage plus 2 ({@damage 1d4}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 11}, each creature in a 15-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 22 ({@damage 5d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["swamp"],
    treasure: ["relics"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/black-dragon-wyrmling.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["A", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Bronze Dragon Wyrmling",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 58,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [15],
    hp: {
      average: 39,
      formula: "6d8 + 12",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
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
    cr: "2",
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
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 12}, each creature in a 40-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 16 ({@damage 3d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Repulsion Breath",
        entries: [
          "{@actSave str} {@dc 12}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target is pushed up to 30 feet straight away from the dragon and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal"],
    treasure: ["implements"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/bronze-dragon-wyrmling.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["L", "S"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Bulette Pup",
    source: "XMM",
    page: 63,
    size: ["M"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [16],
    hp: {
      average: 45,
      formula: "6d8 + 18",
    },
    speed: {
      walk: 30,
      burrow: 20,
    },
    str: 16,
    dex: 8,
    con: 17,
    int: 2,
    wis: 10,
    cha: 4,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 30 ft.", "tremorsense 60 ft."],
    passive: 14,
    cr: "2",
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}14 ({@damage 2d10 + 3}) Piercing damage.",
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
    senseTags: ["D", "T"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Carrion Crawler",
    source: "XMM",
    page: 66,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 51,
      formula: "6d10 + 18",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 13,
    con: 16,
    int: 1,
    wis: 12,
    cha: 5,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "2",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The carrion crawler can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The carrion crawler uses Paralyzing Tentacles and makes one Bite attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Piercing damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
      {
        name: "Paralyzing Tentacles",
        entries: [
          "{@actSave con} {@dc 12}, one creature the carrion crawler can see within 10 feet. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While {@condition Poisoned|XPHB}, the target has the {@condition Paralyzed|XPHB} condition.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/carrion-crawler.mp3",
    },
    traitTags: ["Spider Climb"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
    conditionInflict: ["paralyzed", "poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Centaur Trooper",
    source: "XMM",
    page: 67,
    size: ["L"],
    type: "fey",
    alignment: ["N", "G"],
    ac: [16],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 50,
    },
    str: 18,
    dex: 14,
    con: 14,
    int: 9,
    wis: 13,
    cha: 11,
    skill: {
      athletics: "+6",
      perception: "+3",
    },
    passive: 13,
    languages: ["Elvish", "Sylvan"],
    cr: "2",
    gear: ["breastplate|xphb", "longbow|xphb", "pike|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The centaur makes two attacks, using Pike or Longbow in any combination.",
        ],
      },
      {
        name: "Pike",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 4}, range 150/600 ft. {@h}6 ({@damage 1d8 + 2}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Trampling Charge {@recharge 5}",
        entries: [
          "The centaur moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks} and can move through the spaces of Medium or smaller creatures. Each creature whose space the centaur enters is targeted once by the following effect. {@actSave str} {@dc 14}. {@actSaveFail} 7 ({@damage 1d6 + 4}) Bludgeoning damage, and the target has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "planar, feywild"],
    treasure: ["armaments", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["E", "S"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW", "RA", "RCH", "RNG"],
    conditionInflict: ["prone"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Cultist Fanatic",
    source: "XMM",
    page: 85,
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
    ac: [13],
    hp: {
      average: 44,
      formula: "8d8 + 8",
    },
    speed: {
      walk: 30,
    },
    str: 11,
    dex: 14,
    con: 12,
    int: 10,
    wis: 14,
    cha: 13,
    save: {
      wis: "+4",
    },
    skill: {
      deception: "+3",
      persuasion: "+3",
      religion: "+2",
    },
    passive: 12,
    languages: ["Common"],
    cr: "2",
    gear: ["holy symbol|xphb", "leather armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 12}, {@hit 4} to hit with spell attacks):",
        ],
        will: ["{@spell Light|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1": ["{@spell Hold Person|XPHB}"],
          "2": ["{@spell Command|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Spiritual Weapon (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts the {@spell Spiritual Weapon|XPHB} spell, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Spiritual Weapon|XPHB}"],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Pact Blade",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Slashing damage plus 7 ({@damage 2d6}) Necrotic damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    languageTags: ["C"],
    damageTags: ["N", "S"],
    damageTagsSpell: ["O"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["paralyzed", "prone"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Druid",
    source: "XMM",
    page: 106,
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
      average: 44,
      formula: "8d8 + 8",
    },
    speed: {
      walk: 30,
    },
    str: 10,
    dex: 12,
    con: 13,
    int: 12,
    wis: 16,
    cha: 11,
    skill: {
      medicine: "+5",
      nature: "+3",
      perception: "+5",
    },
    passive: 15,
    languages: ["Common", "Druidic", "Sylvan"],
    cr: "2",
    gear: ["studded leather armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The druid casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Druidcraft|XPHB}", "{@spell Speak with Animals|XPHB}"],
        daily: {
          "2e": ["{@spell Entangle|XPHB}", "{@spell Thunderwave|XPHB}"],
          "1e": [
            "{@spell Animal Messenger|XPHB}",
            "{@spell Longstrider|XPHB}",
            "{@spell Moonbeam|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The druid makes two attacks, using Vine Staff or Verdant Wisp in any combination.",
        ],
      },
      {
        name: "Vine Staff",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Bludgeoning damage plus 2 ({@damage 1d4}) Poison damage.",
        ],
      },
      {
        name: "Verdant Wisp",
        entries: [
          "{@atkr r} {@hit 5}, range 90 ft. {@h}10 ({@damage 3d6}) Radiant damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/druid.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "DU", "S"],
    damageTags: ["B", "I", "R"],
    damageTagsSpell: ["R", "T"],
    spellcastingTags: ["CD"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["charisma", "constitution", "strength"],
  },
  {
    name: "Ettercap",
    source: "XMM",
    page: 115,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 44,
      formula: "8d8 + 8",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 15,
    con: 13,
    int: 7,
    wis: 12,
    cha: 8,
    skill: {
      perception: "+3",
      stealth: "+4",
      survival: "+3",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    cr: "2",
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The ettercap can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Web Walker",
        entries: [
          "The ettercap ignores movement restrictions caused by webs, and the ettercap knows the location of any other creature in contact with the same web.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The ettercap makes one Bite attack and one Claw attack."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 2 ({@damage 1d4}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the ettercap's next turn.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Slashing damage.",
        ],
      },
      {
        name: "Web Strand {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 12}, one Large or smaller creature the ettercap can see within 30 feet. {@actSaveFail} The target has the {@condition Restrained|XPHB} condition until the web is destroyed (AC 10; HP 5; {@variantrule Vulnerability|XPHB} to Fire damage; {@variantrule Immunity|XPHB} to Bludgeoning, Poison, and Psychic damage).",
        ],
      },
    ],
    bonus: [
      {
        name: "Reel",
        entries: [
          "The ettercap pulls one creature within 30 feet of itself that is {@condition Restrained|XPHB} by its Web Strand up to 25 feet straight toward itself.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/ettercap.mp3",
    },
    traitTags: ["Spider Climb", "Web Walker"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned", "restrained"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Faerie Dragon Adult",
    source: "XMM",
    page: 117,
    size: ["T"],
    type: "dragon",
    alignment: ["C", "G"],
    ac: [15],
    hp: {
      average: 35,
      formula: "10d4 + 10",
    },
    speed: {
      walk: 10,
      fly: 60,
    },
    str: 3,
    dex: 20,
    con: 13,
    int: 12,
    wis: 12,
    cha: 14,
    skill: {
      arcana: "+4",
      perception: "+3",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 13,
    languages: ["Draconic", "Sylvan; telepathy 60 ft. (faerie dragons only)"],
    cr: "2",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: [
          "{@spell Dancing Lights|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Hallucinatory Terrain|XPHB}",
            "{@spell Polymorph|XPHB}",
          ],
        },
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
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}7 ({@damage 1d4 + 5}) Piercing damage plus 3 ({@damage 1d6}) Psychic damage.",
        ],
      },
      {
        name: "Euphoria Breath {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 13}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically. While {@condition Incapacitated|XPHB}, the target uses all its movement on each of its turns to move in a random direction.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["implements"],
    dragonAge: "adult",
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
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Gargoyle",
    source: "XMM",
    page: 128,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "elemental",
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 67,
      formula: "9d8 + 27",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 11,
    con: 16,
    int: 6,
    wis: 11,
    cha: 7,
    skill: {
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    immune: ["poison"],
    conditionImmune: ["exhaustion", "petrified", "poisoned"],
    languages: ["Primordial (Terran)"],
    cr: "2",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The gargoyle doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The gargoyle makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Slashing damage.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/gargoyle.mp3",
    },
    traitTags: ["Flyby"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["P", "T"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Gelatinous Cube",
    source: "XMM",
    page: 129,
    size: ["L"],
    type: "ooze",
    alignment: ["U"],
    ac: [6],
    hp: {
      average: 63,
      formula: "6d10 + 30",
    },
    speed: {
      walk: 15,
    },
    str: 14,
    dex: 3,
    con: 20,
    int: 1,
    wis: 6,
    cha: 1,
    senses: ["blindsight 60 ft."],
    passive: 8,
    immune: ["acid"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "prone",
    ],
    cr: "2",
    trait: [
      {
        name: "Ooze Cube",
        entries: [
          "The cube fills its entire space and is transparent. Other creatures can enter that space, but a creature that does so is subjected to the cube's Engulf and has {@variantrule Disadvantage|XPHB} on the saving throw.",
          "Creatures inside the cube have {@variantrule Cover|XPHB|Total Cover}, and the cube can hold one Large creature or up to four Medium or Small creatures inside itself at a time.",
          "As an action, a creature within 5 feet of the cube can pull a creature or an object out of the cube by succeeding on a {@dc 12} Strength ({@skill Athletics|XPHB}) check, and the puller takes 10 ({@damage 3d6}) Acid damage.",
        ],
      },
      {
        name: "Transparent",
        entries: [
          "Even when the cube is in plain sight, a creature must succeed on a {@dc 15} Wisdom ({@skill Perception|XPHB}) check to notice the cube if the creature hasn't witnessed the cube move or otherwise act.",
        ],
      },
    ],
    action: [
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}12 ({@damage 3d6 + 2}) Acid damage.",
        ],
      },
      {
        name: "Engulf",
        entries: [
          "The cube moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. The cube can move through the spaces of Large or smaller creatures if it has room inside itself to contain them (see the Ooze {@variantrule Cube [Area of Effect]|XPHB|Cube} trait). {@actSave dex} {@dc 12}, each creature whose space the cube enters for the first time during this move. {@actSaveFail} 10 ({@damage 3d6}) Acid damage, and the target is engulfed. An engulfed target is suffocating, can't cast spells with a Verbal component, has the {@condition Restrained|XPHB} condition, and takes 10 ({@damage 3d6}) Acid damage at the start of each of the cube's turns. When the cube moves, the engulfed target moves with it. An engulfed target can try to escape by taking an action to make a {@dc 12} Strength ({@skill Athletics|XPHB}) check. On a successful check, the target escapes and enters the nearest unoccupied space. {@actSaveSuccess} Half damage, and the target moves to an unoccupied space within 5 feet of the cube. If there is no unoccupied space, the target fails the save instead.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/gelatinous-cube.mp3",
    },
    senseTags: ["B"],
    damageTags: ["A"],
    miscTags: ["MA"],
    conditionInflict: ["restrained"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Ghast",
    source: "XMM",
    page: 130,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 36,
      formula: "8d8",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 17,
    con: 10,
    int: 11,
    wis: 10,
    cha: 8,
    save: {
      wis: "+2",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    resist: ["necrotic"],
    immune: ["poison"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    languages: ["Common"],
    cr: "2",
    trait: [
      {
        name: "Stench",
        entries: [
          "{@actSave con} {@dc 10}, any creature that starts its turn in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the ghast. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the start of its next turn. {@actSaveSuccess} The target is immune to this ghast's Stench for 24 hours.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage plus 9 ({@damage 2d8}) Necrotic damage.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage. If the target is a non-Undead creature, it is subjected to the following effect. {@actSave con} {@dc 10}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["swamp", "underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/ghast.mp3",
    },
    senseTags: ["D"],
    languageTags: ["C"],
    damageTags: ["N", "P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["paralyzed", "poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Giant Boar",
    source: "XMM",
    page: 355,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 42,
      formula: "5d10 + 15",
    },
    speed: {
      walk: 40,
    },
    str: 17,
    dex: 10,
    con: 16,
    int: 2,
    wis: 7,
    cha: 5,
    save: {
      str: "+5",
    },
    passive: 8,
    cr: "2",
    trait: [
      {
        name: "Bloodied Fury",
        entries: [
          "The boar has {@variantrule Advantage|XPHB} on melee attack rolls while it is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage. If the target is a Large or smaller creature and the boar moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 ({@damage 2d6}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-boar.mp3",
    },
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Giant Constrictor Snake",
    source: "XMM",
    page: 355,
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 60,
      formula: "8d12 + 8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 19,
    dex: 14,
    con: 12,
    int: 1,
    wis: 10,
    cha: 3,
    skill: {
      perception: "+2",
    },
    senses: ["blindsight 10 ft."],
    passive: 12,
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The snake makes one Bite attack and uses Constrict."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 14}, one Large or smaller creature the snake can see within 10 feet. {@actSaveFail} 13 ({@damage 2d8 + 4}) Bludgeoning damage, and the target has the {@condition Grappled|XPHB} condition (escape {@dc 14}).",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-constrictor-snake.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Giant Elk",
    source: "XMM",
    page: 356,
    size: ["H"],
    type: "celestial",
    alignment: ["N", "G"],
    ac: [14],
    hp: {
      average: 42,
      formula: "5d12 + 10",
    },
    speed: {
      walk: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 18,
    con: 14,
    int: 7,
    wis: 14,
    cha: 10,
    save: {
      str: "+6",
      dex: "+6",
    },
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 90 ft."],
    passive: 14,
    resist: ["necrotic", "radiant"],
    languages: [
      "Celestial; understands Common",
      "Elvish",
      "and Sylvan but can't speak them",
    ],
    cr: "2",
    action: [
      {
        name: "Ram",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Bludgeoning damage plus 5 ({@damage 2d4}) Radiant damage. If the target is a Huge or smaller creature and the elk moved 20+ feet straight toward it immediately before the hit, the target takes an extra 5 ({@damage 2d4}) Bludgeoning damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-elk.mp3",
    },
    senseTags: ["D"],
    languageTags: ["C", "CE", "CS", "E", "S"],
    damageTags: ["B", "R"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Gibbering Mouther",
    source: "XMM",
    page: 133,
    size: ["M"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [9],
    hp: {
      average: 52,
      formula: "7d8 + 21",
    },
    speed: {
      walk: 20,
      swim: 20,
    },
    str: 10,
    dex: 8,
    con: 16,
    int: 3,
    wis: 10,
    cha: 6,
    senses: ["darkvision 60 ft."],
    passive: 10,
    conditionImmune: ["prone"],
    cr: "2",
    trait: [
      {
        name: "Aberrant Ground",
        entries: [
          "The ground in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the mouther is {@variantrule Difficult Terrain|XPHB}.",
        ],
      },
      {
        name: "Gibbering",
        entries: [
          "The mouther babbles incoherently while it doesn't have the {@condition Incapacitated|XPHB} condition. {@actSave wis} {@dc 10}, any creature that starts its turn within 20 feet of the mouther while it is babbling. {@actSaveFail} The target rolls {@dice 1d8} to determine what it does during the current turn:",
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
                  "The target makes a melee attack against a randomly determined creature within its reach or does nothing if it can't make such an attack.",
              },
            ],
          },
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 2}, reach 5 ft. {@h}7 ({@damage 2d6}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition. The target dies if it is reduced to 0 {@variantrule Hit Points|XPHB} by this attack. Its body is then absorbed into the mouther, leaving only equipment behind.",
        ],
      },
      {
        name: "Blinding Spittle {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 10}, each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within 30 feet. {@actSaveFail} 7 ({@damage 2d6}) Radiant damage, and the target has the {@condition Blinded|XPHB} condition until the end of the mouther's next turn.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/gibbering-mouther.mp3",
    },
    senseTags: ["D"],
    damageTags: ["P", "R"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["blinded", "prone"],
    savingThrowForced: ["dexterity", "wisdom"],
  },
  {
    name: "Githzerai Monk",
    source: "XMM",
    page: 136,
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "N"],
    ac: [14],
    hp: {
      average: 38,
      formula: "7d8 + 7",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 15,
    con: 12,
    int: 13,
    wis: 14,
    cha: 10,
    save: {
      str: "+3",
      dex: "+4",
      int: "+3",
      wis: "+4",
    },
    skill: {
      insight: "+4",
      perception: "+4",
    },
    passive: 14,
    languages: ["Common", "Gith"],
    cr: "2",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability:",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "1": ["{@spell See Invisibility|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Psi-Powered Leap (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts {@spell Jump|XPHB}, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Jump|XPHB}"],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
      {
        name: "Psionic Defense (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts {@spell Feather Fall|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Feather Fall|XPHB}", "{@spell Shield|XPHB}"],
        },
        ability: "wis",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The githzerai makes two Psi Strike attacks."],
      },
      {
        name: "Psi Strike",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Bludgeoning damage plus 9 ({@damage 2d8}) Psychic damage.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["arcana", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/githzerai-monk.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "GTH"],
    damageTags: ["B", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
  },
  {
    name: "Gnoll Pack Lord",
    source: "XMM",
    page: 140,
    size: ["M"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [15],
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
    str: 16,
    dex: 14,
    con: 13,
    int: 8,
    wis: 11,
    cha: 9,
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Gnoll"],
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The gnoll makes two attacks, using Bone Whip or Bone Javelin in any combination, and it uses Incite Rampage if available.",
        ],
      },
      {
        name: "Bone Whip",
        entries: [
          "{@atkr m} {@hit 5}, reach 10 ft. {@h}8 ({@damage 2d4 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Bone Javelin",
        entries: [
          "{@atkr r} {@hit 5}, range 30/120 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Incite Rampage {@recharge 5}",
        entries: [
          "The gnoll targets another creature it can see within 60 feet of itself that has the Rampage {@variantrule Bonus Action|XPHB}. The target can take a {@variantrule Reaction|XPHB} to make one melee attack.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rampage (2/Day)",
        entries: [
          "Immediately after dealing damage to a creature that is already {@variantrule Bloodied|XPHB}, the gnoll moves up to half its {@variantrule Speed|XPHB}, and it makes one Bone Whip attack.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "hill"],
    treasure: ["armaments", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/gnoll-pack-lord.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RCH", "THW"],
  },
  {
    name: "Green Dragon Wyrmling",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 152,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 38,
      formula: "7d8 + 7",
    },
    speed: {
      walk: 30,
      fly: 60,
      swim: 30,
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
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Draconic"],
    cr: "2",
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
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 1d10 + 2}) Slashing damage plus 3 ({@damage 1d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 11}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 21 ({@damage 6d6}) Poison damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/green-dragon-wyrmling.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["I", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Grick",
    source: "XMM",
    page: 158,
    size: ["M"],
    type: "aberration",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 54,
      formula: "12d8",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 14,
    dex: 14,
    con: 11,
    int: 3,
    wis: 14,
    cha: 5,
    skill: {
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The grick makes one Beak attack and one Tentacles attack."],
      },
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}9 ({@damage 2d6 + 2}) Piercing damage.",
        ],
      },
      {
        name: "Tentacles",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 1d10 + 2}) Slashing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 12}) from all four tentacles.",
        ],
      },
    ],
    environment: ["forest", "underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/grick.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack", "Tentacles"],
    damageTags: ["P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Griffon",
    source: "XMM",
    page: 159,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 59,
      formula: "7d10 + 21",
    },
    speed: {
      walk: 30,
      fly: 80,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 2,
    wis: 13,
    cha: 8,
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The griffon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Piercing damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from both of the griffon's front claws.",
        ],
      },
    ],
    environment: ["arctic", "coastal", "grassland", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/griffon.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Hunter Shark",
    source: "XMM",
    page: 363,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 5,
      swim: 40,
    },
    str: 18,
    dex: 14,
    con: 15,
    int: 1,
    wis: 10,
    cha: 4,
    skill: {
      perception: "+2",
    },
    senses: ["blindsight 60 ft."],
    passive: 12,
    cr: "2",
    trait: [
      {
        name: "Water Breathing",
        entries: ["The shark can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6} (with {@variantrule Advantage|XPHB} if the target doesn't have all its {@variantrule Hit Points|XPHB}), reach 5 ft. {@h}14 ({@damage 3d6 + 4}) Piercing damage.",
        ],
      },
    ],
    environment: ["underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/hunter-shark.mp3",
    },
    traitTags: ["Water Breathing"],
    senseTags: ["B"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Intellect Devourer",
    source: "XMM",
    page: 179,
    size: ["T"],
    type: "aberration",
    alignment: ["L", "E"],
    ac: [12],
    hp: {
      average: 28,
      formula: "8d4 + 8",
    },
    speed: {
      walk: 40,
    },
    str: 6,
    dex: 14,
    con: 13,
    int: 14,
    wis: 11,
    cha: 10,
    skill: {
      perception: "+2",
      stealth: "+4",
    },
    senses: ["blindsight 60 ft."],
    passive: 12,
    resist: ["psychic"],
    languages: ["understands Deep Speech but can't speak; telepathy 60 ft."],
    cr: "2",
    trait: [
      {
        name: "Detect Intelligence",
        entries: [
          "The intellect devourer magically senses the location of any creature within 300 feet of itself that has an Intelligence score of 3 or higher, regardless of interposing barriers.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The intellect devourer makes one Claw attack and uses Devour Intellect.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}7 ({@damage 2d4 + 2}) Slashing damage.",
        ],
      },
      {
        name: "Devour Intellect",
        entries: [
          "{@actSave int} {@dc 12}, one creature the intellect devourer can see within 5 feet. {@actSaveFail} 11 ({@damage 2d10}) Psychic damage, and the target has the {@condition Stunned|XPHB} condition until the end of the intellect devourer's next turn.",
        ],
      },
      {
        name: "Steal Body",
        entries: [
          "{@actSave int} {@dc 12}, one Small or Medium creature within 5 feet that has the {@condition Incapacitated|XPHB} condition, is a Humanoid or Beast, and has 10 {@variantrule Hit Points|XPHB} or fewer. {@actSaveFail} The intellect devourer possesses the target, consumes its brain, and teleports inside its skull. While there, the intellect devourer has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores; its understanding of Deep Speech; its telepathy; and its Detect Intelligence trait. It otherwise adopts the target's game statistics. It knows everything the target knew, including spells and languages.",
          "If the host body dies, the intellect devourer must leave it. The intellect devourer is also forced out if the target regains its devoured brain by means of a {@spell Wish|XPHB} spell. By spending 5 feet of its movement, the intellect devourer can voluntarily leave the body, teleporting to the nearest unoccupied space within 5 feet of it. The body then dies unless its brain is restored before the end of the intellect devourer's next turn.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/intellect-devourer.mp3",
    },
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["CS", "DS", "TP"],
    damageTags: ["S", "Y"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "stunned"],
    savingThrowForced: ["intelligence"],
  },
  {
    name: "Lizardfolk Geomancer",
    source: "XMM",
    page: 197,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [13],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 30,
      burrow: 20,
      swim: 30,
    },
    str: 15,
    dex: 10,
    con: 13,
    int: 10,
    wis: 15,
    cha: 8,
    skill: {
      nature: "+2",
      perception: "+4",
      stealth: "+4",
    },
    passive: 14,
    languages: ["Draconic", "Primordial (Terran)"],
    cr: "2",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The lizardfolk casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 12}):",
        ],
        will: ["{@spell Elementalism|XPHB}"],
        daily: {
          "1e": [
            "{@spell Meld into Stone|XPHB}",
            "{@spell Speak with Plants|XPHB}",
            "{@spell Spike Growth|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The lizardfolk makes two Earth Burst attacks."],
      },
      {
        name: "Earth Burst",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 60 ft. {@h}9 ({@damage 2d6 + 2}) Bludgeoning damage.",
        ],
      },
      {
        name: "Hail of Stone {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 20-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point the lizardfolk can see within 60 feet. {@actSaveFail} 15 ({@damage 6d4}) Bludgeoning damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["forest", "swamp"],
    treasure: ["individual"],
    actionTags: ["Multiattack"],
    languageTags: ["DR", "P", "T"],
    damageTags: ["B"],
    damageTagsSpell: ["O", "P"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["prone"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Mage Apprentice",
    source: "XMM",
    page: 198,
    size: ["S", "M"],
    type: {
      type: "humanoid",
      tags: ["wizard"],
    },
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 49,
      formula: "9d8 + 9",
    },
    speed: {
      walk: 30,
    },
    str: 8,
    dex: 14,
    con: 12,
    int: 16,
    wis: 13,
    cha: 10,
    save: {
      int: "+5",
      wis: "+3",
    },
    skill: {
      arcana: "+5",
      perception: "+3",
    },
    passive: 13,
    languages: ["Common plus one other language"],
    cr: "2",
    gear: ["component pouch|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 13}, {@hit 5} to hit with spell attacks):",
        ],
        will: ["{@spell Mage Hand|XPHB}", "{@spell Prestidigitation|XPHB}"],
        daily: {
          "1e": [
            "{@spell Disguise Self|XPHB}",
            "{@spell Ice Knife|XPHB}",
            "{@spell Mage Armor|XPHB} (included in AC)",
            "{@spell Thunderwave|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Arcane Burst",
        entries: [
          "{@atkr m,r} {@hit 5}, reach 5 ft. or range 120 ft. {@h}14 ({@damage 2d10 + 3}) Force damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["arcana", "individual"],
    languageTags: ["C", "X"],
    damageTags: ["O"],
    damageTagsSpell: ["C", "P", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    savingThrowForcedSpell: ["constitution", "dexterity"],
  },
  {
    name: "Merrow",
    source: "XMM",
    page: 210,
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 10,
      swim: 40,
    },
    str: 18,
    dex: 15,
    con: 15,
    int: 8,
    wis: 10,
    cha: 9,
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Abyssal", "Primordial (Aquan)"],
    cr: "2",
    trait: [
      {
        name: "Amphibious",
        entries: ["The merrow can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The merrow makes two attacks, using Bite, Claw, or Harpoon in any combination.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}6 ({@damage 1d4 + 4}) Piercing damage, and the target has the {@condition Poisoned|XPHB} condition until the end of the merrow's next turn.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 2d4 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Harpoon",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 20/60 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage. If the target is a Large or smaller creature, the merrow pulls the target up to 15 feet straight toward itself.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/merrow.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "AQ", "P"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Mimic",
    source: "XMM",
    page: 212,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [12],
    hp: {
      average: 58,
      formula: "9d8 + 18",
    },
    speed: {
      walk: 20,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 12,
    con: 15,
    int: 5,
    wis: 13,
    cha: 8,
    skill: {
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    immune: ["acid"],
    conditionImmune: ["prone"],
    cr: "2",
    trait: [
      {
        name: "Adhesive (Object Form Only)",
        entries: [
          "The mimic adheres to anything that touches it. A Huge or smaller creature adhered to the mimic has the {@condition Grappled|XPHB} condition (escape {@dc 13}). Ability checks made to escape this grapple have {@variantrule Disadvantage|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 5} (with {@variantrule Advantage|XPHB} if the target is {@condition Grappled|XPHB} by the mimic), reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage—or 12 ({@damage 2d8 + 3}) Piercing damage if the target is {@condition Grappled|XPHB} by the mimic—plus 4 ({@damage 1d8}) Acid damage.",
        ],
      },
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Bludgeoning damage plus 4 ({@damage 1d8}) Acid damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 13}). Ability checks made to escape this grapple have {@variantrule Disadvantage|XPHB}.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The mimic shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true blob form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/mimic.mp3",
    },
    senseTags: ["D"],
    damageTags: ["A", "B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Minotaur Skeleton",
    source: "XMM",
    page: 283,
    size: ["L"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [12],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 11,
    con: 15,
    int: 6,
    wis: 8,
    cha: 5,
    senses: ["darkvision 60 ft."],
    passive: 9,
    immune: ["poison"],
    vulnerable: ["bludgeoning"],
    conditionImmune: ["exhaustion", "poisoned"],
    languages: ["understands Abyssal but can't speak"],
    cr: "2",
    action: [
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage. If the target is a Large or smaller creature and the skeleton moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 ({@damage 2d8}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}15 ({@damage 2d10 + 4}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/minotaur-skeleton.mp3",
    },
    senseTags: ["D"],
    languageTags: ["AB", "CS"],
    damageTags: ["B", "P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Modron Pentadrone",
    source: "XMM",
    page: 218,
    size: ["L"],
    type: "construct",
    alignment: ["L", "N"],
    ac: [16],
    hp: {
      average: 32,
      formula: "5d10 + 5",
    },
    speed: {
      walk: 40,
    },
    str: 15,
    dex: 14,
    con: 12,
    int: 10,
    wis: 10,
    cha: 13,
    skill: {
      perception: "+4",
    },
    senses: ["truesight 120 ft."],
    passive: 14,
    conditionImmune: ["charmed"],
    languages: ["Modron"],
    cr: "2",
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
          "The modron makes five Slam attacks or five Electrical Discharge attacks.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Force damage.",
        ],
      },
      {
        name: "Electrical Discharge",
        entries: [
          "{@atkr r} {@hit 4}, range 120 ft. {@h}5 ({@damage 1d6 + 2}) Lightning damage.",
        ],
      },
      {
        name: "Paralysis Gas {@recharge 5}",
        entries: [
          "Constitution Saving Throws: {@dc 11}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["planar, mechanus"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["L", "O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["paralyzed"],
  },
  {
    name: "Myconid Sovereign",
    source: "XMM",
    page: 223,
    size: ["L"],
    type: "plant",
    alignment: ["L", "N"],
    ac: [13],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 30,
    },
    str: 12,
    dex: 10,
    con: 14,
    int: 13,
    wis: 15,
    cha: 10,
    senses: ["darkvision 120 ft."],
    passive: 12,
    languages: ["telepathy 240 ft."],
    cr: "2",
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
        name: "Multiattack",
        entries: [
          "The myconid makes one Slam attack and uses Pacifying Spores.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 3}, reach 5 ft. {@h}6 ({@damage 2d4 + 1}) Bludgeoning damage plus 5 ({@damage 2d4}) Poison damage.",
        ],
      },
      {
        name: "Animating Spores (3/Day)",
        entries: [
          "The myconid releases spores at a Medium or Small corpse within 5 feet of it that wasn't a Construct or an Undead. In 24 hours, the corpse rises as a {@creature Myconid Spore Servant|XMM}. The corpse stays animate for {@dice 1d4 + 1} weeks or until destroyed, and it can't be animated again in this way.",
        ],
      },
      {
        name: "Pacifying Spores",
        entries: [
          "{@actSave con} {@dc 12}, one creature the myconid can see within 10 feet. {@actSaveFail} The target has the {@condition Stunned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
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
      path: "bestiary/myconid-sovere.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["TP"],
    damageTags: ["B", "I"],
    miscTags: ["MA"],
    conditionInflict: ["stunned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Nothic",
    source: "XMM",
    page: 228,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 45,
      formula: "6d8 + 18",
    },
    speed: {
      walk: 30,
    },
    str: 14,
    dex: 16,
    con: 16,
    int: 13,
    wis: 10,
    cha: 8,
    skill: {
      arcana: "+3",
      insight: "+4",
      perception: "+4",
      stealth: "+5",
    },
    senses: ["truesight 120 ft."],
    passive: 14,
    languages: ["Undercommon"],
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The nothic makes two Claw attacks."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Rotting Gaze",
        entries: [
          "{@actSave con} {@dc 13}, one creature the nothic can see within 120 feet. {@actSaveFail} 17 ({@damage 5d6}) Necrotic damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Weird Insight {@recharge}",
        entries: [
          "{@actSave wis} {@dc 14}, one creature the nothic can see within 120 feet. {@actSaveFail} The nothic magically learns one fact or secret about the target.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/nothic.mp3",
    },
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["U"],
    damageTags: ["N", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution", "wisdom"],
  },
  {
    name: "Ochre Jelly",
    source: "XMM",
    page: 230,
    size: ["L"],
    type: "ooze",
    alignment: ["U"],
    ac: [8],
    hp: {
      average: 52,
      formula: "7d10 + 14",
    },
    speed: {
      walk: 20,
      climb: 20,
    },
    str: 15,
    dex: 6,
    con: 14,
    int: 2,
    wis: 6,
    cha: 1,
    senses: ["blindsight 60 ft."],
    passive: 8,
    resist: ["acid"],
    immune: ["lightning", "slashing"],
    conditionImmune: [
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "grappled",
      "prone",
      "restrained",
    ],
    cr: "2",
    trait: [
      {
        name: "Amorphous",
        entries: [
          "The jelly can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The jelly can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}12 ({@damage 3d6 + 2}) Acid damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Split",
        entries: [
          "{@actTrigger} While the jelly is Large or Medium and has 10+ {@variantrule Hit Points|XPHB}, it becomes {@variantrule Bloodied|XPHB} or is subjected to Lightning or Slashing damage. {@actResponse} The jelly splits into two new Ochre Jellies. Each new jelly is one size smaller than the original jelly and acts on its {@variantrule Initiative|XPHB}. The original jelly's {@variantrule Hit Points|XPHB} are divided evenly between the new jellies (round down).",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/ochre-jelly.mp3",
    },
    traitTags: ["Amorphous", "Spider Climb"],
    senseTags: ["B"],
    damageTags: ["A"],
    miscTags: ["MA"],
  },
  {
    name: "Ogre",
    source: "XMM",
    page: 231,
    otherSources: [
      {
        source: "ScoEE",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [11],
    hp: {
      average: 68,
      formula: "8d10 + 24",
    },
    speed: {
      walk: 40,
    },
    str: 19,
    dex: 8,
    con: 16,
    int: 5,
    wis: 7,
    cha: 7,
    senses: ["darkvision 60 ft."],
    passive: 8,
    languages: ["Common", "Giant"],
    cr: "2",
    gear: [
      "greatclub|xphb",
      {
        item: "javelin|xphb",
        quantity: 3,
      },
    ],
    action: [
      {
        name: "Greatclub",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage.",
        ],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 30/120 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage.",
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
    soundClip: {
      type: "internal",
      path: "bestiary/ogre.mp3",
    },
    senseTags: ["D"],
    languageTags: ["C", "GI"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Ogre Zombie",
    source: "XMM",
    page: 346,
    otherSources: [
      {
        source: "HBTD",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [8],
    hp: {
      average: 85,
      formula: "9d10 + 36",
    },
    speed: {
      walk: 30,
    },
    str: 19,
    dex: 6,
    con: 18,
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
    languages: ["understands Common and Giant but can't speak"],
    cr: "2",
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
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage.",
        ],
      },
    ],
    environment: ["planar, shadowfell", "underdark", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/ogre-zombie.mp3",
    },
    traitTags: ["Undead Fortitude"],
    senseTags: ["D"],
    languageTags: ["C", "CS", "GI"],
    damageTags: ["B"],
    miscTags: ["MA"],
  },
  {
    name: "Pegasus",
    source: "XMM",
    page: 235,
    size: ["L"],
    type: "celestial",
    alignment: ["C", "G"],
    ac: [12],
    hp: {
      average: 59,
      formula: "7d10 + 21",
    },
    speed: {
      walk: 60,
      fly: 90,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 10,
    wis: 15,
    cha: 13,
    save: {
      dex: "+4",
      con: "+5",
      wis: "+4",
      cha: "+3",
    },
    skill: {
      perception: "+6",
    },
    passive: 16,
    languages: [
      "understands Celestial",
      "Common",
      "Elvish",
      "and Sylvan but can't speak",
    ],
    cr: "2",
    action: [
      {
        name: "Hooves",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Bludgeoning damage plus 5 ({@damage 2d4}) Radiant damage.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill", "planar, upper"],
    soundClip: {
      type: "internal",
      path: "bestiary/pegasus.mp3",
    },
    languageTags: ["C", "CE", "CS", "E", "S"],
    damageTags: ["B", "R"],
    miscTags: ["MA"],
  },
  {
    name: "Peryton",
    source: "XMM",
    page: 238,
    size: ["M"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [13],
    hp: {
      average: 33,
      formula: "6d8 + 6",
    },
    speed: {
      walk: 20,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 12,
    con: 13,
    int: 9,
    wis: 12,
    cha: 10,
    skill: {
      perception: "+5",
      stealth: "+3",
    },
    passive: 15,
    languages: ["understands Common and Elvish but can't speak"],
    cr: "2",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The peryton doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The peryton makes one Gore attack and one Talons attack."],
      },
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}7 ({@damage 1d8 + 3}) Piercing damage. If the peryton moved 30+ feet straight toward the target immediately before the hit, the target takes an extra 9 ({@damage 2d8}) Piercing damage.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 2d4 + 3}) Piercing damage. If the attack reduces a Humanoid target to 0 {@variantrule Hit Points|XPHB}, the peryton kills the target by removing its heart.",
        ],
      },
    ],
    environment: ["hill", "mountain"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/peryton.mp3",
    },
    traitTags: ["Flyby"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "E"],
    damageTags: ["P"],
    miscTags: ["MA"],
  },
  {
    name: "Plesiosaurus",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 366,
    size: ["L"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 68,
      formula: "8d10 + 24",
    },
    speed: {
      walk: 20,
      swim: 40,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 2,
    wis: 12,
    cha: 5,
    skill: {
      perception: "+3",
      stealth: "+4",
    },
    passive: 13,
    cr: "2",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The plesiosaurus can hold its breath for 1 hour."],
      },
    ],
    action: [
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage.",
        ],
      },
    ],
    environment: ["arctic", "underwater"],
    soundClip: {
      type: "internal",
      path: "bestiary/plesiosaurus.mp3",
    },
    traitTags: ["Hold Breath"],
    damageTags: ["P"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Polar Bear",
    source: "XMM",
    page: 367,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 42,
      formula: "5d10 + 15",
    },
    speed: {
      walk: 40,
      swim: 40,
    },
    str: 20,
    dex: 14,
    con: 16,
    int: 2,
    wis: 13,
    cha: 7,
    skill: {
      perception: "+5",
      stealth: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    resist: ["cold"],
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The bear makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}9 ({@damage 1d8 + 5}) Slashing damage.",
        ],
      },
    ],
    environment: ["arctic"],
    soundClip: {
      type: "internal",
      path: "bestiary/polar-bear.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Poltergeist",
    source: "XMM",
    page: 246,
    size: ["S", "M"],
    type: "undead",
    alignment: ["C", "N"],
    ac: [12],
    hp: {
      average: 22,
      formula: "5d8",
    },
    speed: {
      walk: 5,
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
    cha: 14,
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
    languages: ["Common plus one other language"],
    cr: "2",
    trait: [
      {
        name: "Incorporeal Movement",
        entries: [
          "The poltergeist can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The poltergeist makes one Object Slam attack and uses Telekinetic Thrust.",
        ],
      },
      {
        name: "Object Slam",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 30 ft. {@h}7 ({@damage 2d4 + 2}) Bludgeoning damage.",
        ],
      },
      {
        name: "Telekinetic Thrust",
        entries: [
          "{@actSave str} {@dc 12}, one creature the poltergeist can see within 30 feet. {@actSaveFail} 9 ({@damage 2d6 + 2}) Force damage, and the target is pushed up to 30 feet straight away from the poltergeist.",
        ],
      },
    ],
    bonus: [
      {
        name: "Vanish",
        entries: [
          "The poltergeist gives itself the {@condition Invisible|XPHB} condition or ends that condition on itself.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/poltergeist.mp3",
    },
    traitTags: ["Incorporeal Movement"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "O"],
    miscTags: ["MA", "RA"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Priest",
    source: "XMM",
    page: 248,
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
      average: 38,
      formula: "7d8 + 7",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 10,
    con: 12,
    int: 13,
    wis: 16,
    cha: 13,
    skill: {
      medicine: "+7",
      perception: "+5",
      religion: "+5",
    },
    passive: 15,
    languages: ["Common plus one other language"],
    cr: "2",
    gear: ["chain shirt|xphb", "holy symbol|xphb", "mace|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The priest casts one of the following spells, using Wisdom as the spellcasting ability:",
        ],
        will: ["{@spell Light|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1": ["{@spell Spirit Guardians|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Divine Aid (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The priest casts {@spell Bless|XPHB}, {@spell Dispel Magic|XPHB}, {@spell Healing Word|XPHB}, or {@spell Lesser Restoration|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": [
            "{@spell Bless|XPHB}",
            "{@spell Dispel Magic|XPHB}",
            "{@spell Healing Word|XPHB}",
            "{@spell Lesser Restoration|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The priest makes two attacks, using Mace or Radiant Flame in any combination.",
        ],
      },
      {
        name: "Mace",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Bludgeoning damage plus 5 ({@damage 2d4}) Radiant damage.",
        ],
      },
      {
        name: "Radiant Flame",
        entries: [
          "{@atkr r} {@hit 5}, range 60 ft. {@h}11 ({@damage 2d10}) Radiant damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/priest.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "R"],
    damageTagsSpell: ["N", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Quaggoth",
    source: "XMM",
    page: 251,
    size: ["M"],
    type: "monstrosity",
    alignment: ["C", "N"],
    ac: [13],
    hp: {
      average: 45,
      formula: "6d8 + 18",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 17,
    dex: 12,
    con: 16,
    int: 6,
    wis: 12,
    cha: 7,
    skill: {
      athletics: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Undercommon"],
    cr: "2",
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
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage, or 13 ({@damage 3d6 + 3}) Slashing damage if the quaggoth is {@variantrule Bloodied|XPHB}.",
        ],
      },
    ],
    environment: ["underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/quaggoth.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["U"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Rhinoceros",
    source: "XMM",
    page: 368,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 45,
      formula: "6d10 + 12",
    },
    speed: {
      walk: 40,
    },
    str: 21,
    dex: 8,
    con: 15,
    int: 2,
    wis: 12,
    cha: 6,
    passive: 11,
    cr: "2",
    action: [
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Piercing damage. If target is a Large or smaller creature and the rhinoceros moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 ({@damage 2d8}) Piercing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/rhinoceros.mp3",
    },
    damageTags: ["P"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Saber-Toothed Tiger",
    source: "XMM",
    page: 369,
    size: ["L"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 52,
      formula: "7d10 + 14",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 17,
    con: 15,
    int: 3,
    wis: 12,
    cha: 8,
    save: {
      str: "+6",
      dex: "+5",
    },
    skill: {
      perception: "+5",
      stealth: "+7",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    cr: "2",
    trait: [
      {
        name: "Running Leap",
        entries: [
          "With a 10-foot running start, the tiger can {@variantrule Long Jump|XPHB} up to 25 feet.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The tiger makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Nimble Escape",
        entries: ["The tiger takes the Disengage or Hide action."],
      },
    ],
    environment: ["arctic", "hill", "mountain"],
    soundClip: {
      type: "internal",
      path: "bestiary/saber-toothed-tiger.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["S"],
    miscTags: ["MA"],
  },
  {
    name: "Sahuagin Priest",
    source: "XMM",
    page: 265,
    size: ["M"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [12],
    hp: {
      average: 38,
      formula: "7d8 + 7",
    },
    speed: {
      walk: 30,
      swim: 40,
    },
    str: 13,
    dex: 11,
    con: 12,
    int: 12,
    wis: 14,
    cha: 13,
    skill: {
      perception: "+6",
      religion: "+3",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    resist: ["acid", "cold"],
    languages: ["Sahuagin"],
    cr: "2",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The sahuagin casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 12}):",
        ],
        will: ["{@spell Thaumaturgy|XPHB}"],
        daily: {
          "2e": ["{@spell Hold Person|XPHB}", "{@spell Tongues|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Fiendish Aid (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The sahuagin casts {@spell Bless|XPHB} or {@spell Healing Word|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Bless|XPHB}", "{@spell Healing Word|XPHB}"],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
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
        entries: ["The sahuagin makes two Spectral Jaws attacks."],
      },
      {
        name: "Spectral Jaws",
        entries: [
          "{@atkr m,r} {@hit 4}, reach 5 ft. or range 120 ft. {@h}11 ({@damage 2d8 + 2}) Force damage.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["any"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH"],
    damageTags: ["O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Sea Hag",
    source: "XMM",
    page: 271,
    size: ["M"],
    type: "fey",
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 52,
      formula: "7d8 + 21",
    },
    speed: {
      walk: 30,
      swim: 40,
    },
    str: 16,
    dex: 13,
    con: 16,
    int: 12,
    wis: 12,
    cha: 13,
    senses: ["darkvision 60 ft."],
    passive: 11,
    languages: ["Common", "Giant", "Primordial (Aquan)"],
    cr: "2",
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
        name: "Illusory Appearance",
        type: "spellcasting",
        headerEntries: [
          "The hag casts {@spell Disguise Self|XPHB}, using Constitution as the spellcasting ability (spell save {@dc 13}). The spell's duration is 24 hours.",
        ],
        will: ["{@spell Disguise Self|XPHB}"],
        ability: "con",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The hag can breathe air and water."],
      },
      {
        name: "Vile Appearance",
        entries: [
          "{@actSave wis} {@dc 11}, any Beast or Humanoid that starts its turn within 30 feet of the hag and can see the hag's true form. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the start of its next turn. {@actSaveSuccess} The target is immune to this hag's Vile Appearance for 24 hours.",
        ],
      },
    ],
    action: [
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Death Glare {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 11}, one {@condition Frightened|XPHB} creature the hag can see within 30 feet. {@actSaveFail} If the target has 20 {@variantrule Hit Points|XPHB} or fewer, it drops to 0 {@variantrule Hit Points|XPHB}. Otherwise, the target takes 13 ({@damage 3d8}) Psychic damage.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/sea-hag.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["D"],
    languageTags: ["AQ", "C", "GI", "P"],
    damageTags: ["S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Silver Dragon Wyrmling",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 278,
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
      average: 45,
      formula: "6d8 + 18",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 10,
    con: 17,
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
    immune: ["cold"],
    languages: ["Draconic"],
    cr: "2",
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes two Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}9 ({@damage 1d10 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 13}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 18 ({@damage 4d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Paralyzing Breath",
        entries: [
          "{@actSave con} {@dc 13}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail 1} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, when it repeats the save. {@actSaveFail 2} The target has the {@condition Paralyzed|XPHB} condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["mountain", "urban"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/silver-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["C", "P"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "paralyzed"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Spined Devil",
    group: ["Devils"],
    source: "XMM",
    page: 296,
    size: ["S"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 45,
      formula: "10d6 + 10",
    },
    speed: {
      walk: 20,
      fly: 40,
    },
    str: 10,
    dex: 15,
    con: 12,
    int: 11,
    wis: 14,
    cha: 8,
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 12,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "2",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The devil doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
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
          "The devil makes two attacks, using Infernal Fork and Tail Spine in any combination.",
        ],
      },
      {
        name: "Infernal Fork",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}5 ({@damage 1d6 + 2}) Piercing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Tail Spine",
        entries: [
          "{@atkr r} {@hit 4}, range 20/80 ft. {@h}4 ({@damage 1d4 + 2}) Piercing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    soundClip: {
      type: "internal",
      path: "bestiary/spined-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Flyby", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["F", "P"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Swarm of Stirges",
    source: "XMM",
    page: 299,
    size: ["M"],
    type: {
      type: "monstrosity",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 36,
      formula: "8d8",
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
    cr: "2",
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
        name: "Swarm of Proboscises",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}14 ({@damage 2d10 + 3}) Piercing damage, or 8 ({@damage 1d10 + 3}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}. If the target is a Medium or smaller creature in the swarm's space, the target has the {@condition Grappled|XPHB} condition (escape {@dc 13}). Until the grapple ends, the target takes 7 ({@damage 2d6}) Necrotic damage at the end of each of its turns.",
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
    senseTags: ["D"],
    damageTags: ["N", "P"],
    miscTags: ["MA"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Swarm of Venomous Snakes",
    source: "XMM",
    page: 371,
    size: ["M"],
    type: {
      type: "beast",
      swarmSize: "T",
    },
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 36,
      formula: "8d8",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 8,
    dex: 18,
    con: 11,
    int: 1,
    wis: 10,
    cha: 3,
    senses: ["blindsight 10 ft."],
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
    cr: "2",
    trait: [
      {
        name: "Swarm",
        entries: [
          "The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny snake. The swarm can't regain {@variantrule Hit Points|XPHB} or gain {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Bites",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Piercing damage—or 6 ({@damage 1d4 + 4}) Piercing damage if the swarm is {@variantrule Bloodied|XPHB}—plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
    ],
    environment: ["coastal", "desert", "forest", "grassland", "hill", "swamp"],
    senseTags: ["B"],
    damageTags: ["I", "P"],
    miscTags: ["MA"],
  },
  {
    name: "Wererat",
    group: ["Lycanthropes"],
    source: "XMM",
    page: 325,
    size: ["S", "M"],
    type: {
      type: "monstrosity",
      tags: ["lycanthrope"],
    },
    alignment: ["L", "E"],
    ac: [13],
    hp: {
      average: 60,
      formula: "11d8 + 11",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 10,
    dex: 16,
    con: 12,
    int: 11,
    wis: 10,
    cha: 8,
    skill: {
      perception: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Common (can't speak in rat form)"],
    cr: "2",
    gear: ["hand crossbow|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The wererat makes two attacks, using Scratch or Hand Crossbow in any combination. It can replace one attack with a Bite attack.",
        ],
      },
      {
        name: "Bite (Rat or Hybrid Form Only)",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}8 ({@damage 2d4 + 3}) Piercing damage. If the target is a Humanoid, it is subjected to the following effect. {@actSave con} {@dc 11}. {@actSaveFail} The target is cursed. If the cursed target drops to 0 {@variantrule Hit Points|XPHB}, it instead becomes a Wererat under the DM's control and has 10 {@variantrule Hit Points|XPHB}. {@actSaveSuccess} The target is immune to this wererat's curse for 24 hours.",
        ],
      },
      {
        name: "Scratch",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}6 ({@damage 1d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Hand Crossbow (Humanoid or Hybrid Form Only)",
        entries: [
          "{@atkr r} {@hit 5}, range 30/120 ft. {@h}6 ({@damage 1d6 + 3}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The wererat shape-shifts into a Medium rat-humanoid hybrid or a Small rat, or it returns to its true humanoid form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["forest", "urban"],
    treasure: ["individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/wererat.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS"],
    damageTags: ["P", "S"],
    miscTags: ["CUR", "MA", "RA", "RNG"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "White Dragon Wyrmling",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 328,
    size: ["M"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 32,
      formula: "5d8 + 10",
    },
    speed: {
      walk: 30,
      burrow: 15,
      fly: 60,
      swim: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 14,
    dex: 10,
    con: 14,
    int: 5,
    wis: 10,
    cha: 11,
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
    immune: ["cold"],
    languages: ["Draconic"],
    cr: "2",
    trait: [
      {
        name: "Ice Walk",
        entries: [
          "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, {@variantrule Difficult Terrain|XPHB} composed of ice or snow doesn't cost it extra movement.",
        ],
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
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}6 ({@damage 1d8 + 2}) Slashing damage plus 2 ({@damage 1d4}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 22 ({@damage 5d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["arctic"],
    treasure: ["arcana"],
    dragonAge: "wyrmling",
    soundClip: {
      type: "internal",
      path: "bestiary/white-dragon-wyrmling.mp3",
    },
    senseTags: ["B", "D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["DR"],
    damageTags: ["C", "S"],
    miscTags: ["MA"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Will-o'-Wisp",
    source: "XMM",
    page: 333,
    size: ["T"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 27,
      formula: "11d4",
    },
    speed: {
      walk: 5,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 1,
    dex: 28,
    con: 10,
    int: 13,
    wis: 14,
    cha: 11,
    senses: ["darkvision 120 ft."],
    passive: 12,
    resist: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "necrotic",
      "piercing",
      "slashing",
    ],
    immune: ["lightning", "poison"],
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
    languages: ["Common plus one other language"],
    cr: "2",
    trait: [
      {
        name: "Ephemeral",
        entries: ["The wisp can't wear or carry anything."],
      },
      {
        name: "Illumination",
        entries: [
          "The wisp sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet.",
        ],
      },
      {
        name: "Incorporeal Movement",
        entries: [
          "The wisp can move through other creatures and objects as if they were {@variantrule Difficult Terrain|XPHB}. It takes 5 ({@damage 1d10}) Force damage if it ends its turn inside an object.",
        ],
      },
    ],
    action: [
      {
        name: "Shock",
        entries: [
          "{@atkr m} {@hit 4}, reach 5 ft. {@h}11 ({@damage 2d8 + 2}) Lightning damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Consume Life",
        entries: [
          "{@actSave con} {@dc 10}, one living creature the wisp can see within 5 feet that has 0 {@variantrule Hit Points|XPHB}. {@actSaveFail} The target dies, and the wisp regains 10 ({@dice 3d6}) {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Vanish",
        entries: [
          "The wisp and its light have the {@condition Invisible|XPHB} condition until the wisp's {@status Concentration|XPHB} ends on this effect, which ends early immediately after the wisp makes an attack roll or uses Consume Life.",
        ],
      },
    ],
    environment: ["forest", "swamp", "urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/will-o-wisp.mp3",
    },
    traitTags: ["Illumination", "Incorporeal Movement"],
    senseTags: ["SD"],
    languageTags: ["C", "X"],
    damageTags: ["L", "O"],
    miscTags: ["AOE", "MA"],
    savingThrowForced: ["constitution"],
  },
];
