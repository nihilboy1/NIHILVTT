// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_6 = [
  {
    name: "Azer Pyromancer",
    source: "XMM",
    page: 25,
    size: ["M"],
    type: "elemental",
    alignment: ["L", "N"],
    ac: [18],
    hp: {
      average: 97,
      formula: "13d8 + 39",
    },
    speed: {
      walk: 30,
    },
    str: 15,
    dex: 14,
    con: 16,
    int: 12,
    wis: 18,
    cha: 13,
    save: {
      con: "+6",
      wis: "+7",
    },
    skill: {
      arcana: "+4",
      perception: "+7",
    },
    passive: 17,
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Primordial (Ignan)"],
    cr: "6",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The azer casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Elementalism|XPHB}", "{@spell Mage Hand|XPHB}"],
        daily: {
          "1": ["{@spell Fireball|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Hellish Rebuke (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The azer casts {@spell Hellish Rebuke|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Hellish Rebuke|XPHB}"],
        },
        ability: "wis",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the azer's turns, each creature of the azer's choice in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the azer takes 11 ({@damage 2d10}) Fire damage unless the azer has the {@condition Incapacitated|XPHB} condition.",
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
        name: "Multiattack",
        entries: ["The azer makes two Flame Burst attacks."],
      },
      {
        name: "Flame Burst",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 120 ft. {@h}15 ({@damage 2d10 + 4}) Fire damage.",
        ],
      },
    ],
    environment: ["mountain", "planar, fire"],
    treasure: ["armaments", "individual"],
    traitTags: ["Illumination"],
    actionTags: ["Multiattack"],
    languageTags: ["IG", "P"],
    damageTags: ["F"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["incapacitated"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Chasme",
    group: ["Demons"],
    source: "XMM",
    page: 69,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 78,
      formula: "12d10 + 12",
    },
    speed: {
      walk: 20,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 15,
    con: 12,
    int: 11,
    wis: 14,
    cha: 10,
    save: {
      dex: "+5",
      wis: "+5",
    },
    skill: {
      perception: "+5",
    },
    senses: ["blindsight 10 ft.", "darkvision 120 ft."],
    passive: 15,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "6",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the chasme dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The chasme has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The chasme can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
    ],
    action: [
      {
        name: "Proboscis",
        entries: [
          "{@atkr m} {@hit 5}, reach 5 ft. {@h}16 ({@damage 4d6 + 2}) Piercing damage plus 21 ({@damage 6d6}) Necrotic damage. If the target is a creature, its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Necrotic damage taken.",
        ],
      },
    ],
    bonus: [
      {
        name: "Drone",
        entries: [
          "{@actSave con} {@dc 12}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the chasme (demons automatically succeed on this save). {@actSaveFail} The target has the {@condition Unconscious|XPHB} condition and repeats the save at the end of each of its turns. The target succeeds automatically after 10 minutes or if it takes damage or a creature within 5 feet of it takes an action to empty a flask of Holy Water on it. {@actSaveSuccess} The target is immune to this chasme's Drone for 24 hours.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/chasme.mp3",
    },
    traitTags: ["Magic Resistance", "Spider Climb"],
    senseTags: ["B", "SD"],
    languageTags: ["AB", "TP"],
    damageTags: ["N", "P"],
    miscTags: ["MA"],
    conditionInflict: ["unconscious"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Chimera",
    source: "XMM",
    page: 70,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 114,
      formula: "12d10 + 48",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    str: 19,
    dex: 11,
    con: 19,
    int: 3,
    wis: 14,
    cha: 10,
    skill: {
      perception: "+8",
    },
    senses: ["darkvision 60 ft."],
    passive: 18,
    languages: ["understands Draconic but can't speak"],
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The chimera makes one Ram attack, one Bite attack, and one Claw attack. It can replace the Claw attack with a use of Fire Breath if available.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage, or 18 ({@damage 4d6 + 4}) Piercing damage if the chimera had {@variantrule Advantage|XPHB} on the attack roll.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Ram",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}10 ({@damage 1d12 + 4}) Bludgeoning damage. If the target is a Medium or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 15}, each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 31 ({@damage 7d8}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["grassland", "hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/chimera.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["CS", "DR"],
    damageTags: ["B", "F", "P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Cyclops Sentry",
    source: "XMM",
    page: 88,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "giant",
    alignment: ["C", "N"],
    ac: [14],
    hp: {
      average: 138,
      formula: "12d12 + 60",
    },
    speed: {
      walk: 40,
    },
    str: 22,
    dex: 11,
    con: 20,
    int: 8,
    wis: 6,
    cha: 10,
    passive: 8,
    languages: ["Giant"],
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cyclops makes two attacks, using Stone Club or Rock in any combination.",
        ],
      },
      {
        name: "Stone Club",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}16 ({@damage 3d6 + 6}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Rock",
        entries: [
          "{@atkr r} {@hit 9}, range 30/120 ft. {@h}22 ({@damage 3d10 + 6}) Bludgeoning damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Limited Foresight {@recharge}",
        entries: [
          "{@actTrigger} A creature the cyclops can see makes an attack roll against it. {@actResponse} The cyclops imposes {@variantrule Disadvantage|XPHB} on the roll, and the cyclops gains {@variantrule Advantage|XPHB} on attack rolls against the target until the end of the cyclops's next turn.",
        ],
      },
    ],
    environment: [
      "coastal",
      "desert",
      "grassland",
      "hill",
      "mountain",
      "underdark",
    ],
    treasure: ["armaments"],
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["B"],
    miscTags: ["MA", "MLW", "RA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Drider",
    source: "XMM",
    page: 105,
    size: ["L"],
    type: "monstrosity",
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 123,
      formula: "13d10 + 52",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 16,
    dex: 19,
    con: 18,
    int: 13,
    wis: 16,
    cha: 12,
    skill: {
      perception: "+6",
      stealth: "+10",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    languages: ["Elvish", "Undercommon"],
    cr: "6",
    spellcasting: [
      {
        name: "Magic of the Spider Queen {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The drider casts {@spell Darkness|XPHB}, {@spell Faerie Fire|XPHB}, or {@spell Web|XPHB}, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 14}).",
        ],
        recharge: {
          "5": [
            "{@spell Darkness|XPHB}",
            "{@spell Faerie Fire|XPHB}",
            "{@spell Web|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
    ],
    trait: [
      {
        name: "Spider Climb",
        entries: [
          "The drider can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the drider has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
      },
      {
        name: "Web Walker",
        entries: [
          "The drider ignores movement restrictions caused by webs, and the drider knows the location of any other creature in contact with the same web.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The drider makes three attacks, using Foreleg or Poison Burst in any combination.",
        ],
      },
      {
        name: "Foreleg",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Poison Burst",
        entries: [
          "{@atkr r} {@hit 6}, range 120 ft. {@h}13 ({@damage 3d6 + 3}) Poison damage.",
        ],
      },
    ],
    environment: ["forest", "underdark"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/drider.mp3",
    },
    traitTags: ["Spider Climb", "Sunlight Sensitivity", "Web Walker"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["E", "U"],
    damageTags: ["I", "P"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Galeb Duhr",
    source: "XMM",
    page: 127,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 123,
      formula: "13d8 + 65",
    },
    speed: {
      walk: {
        number: 15,
        condition: "(30 ft. when rolling, 60 ft. rolling downhill)",
      },
    },
    str: 20,
    dex: 14,
    con: 20,
    int: 11,
    wis: 12,
    cha: 11,
    senses: ["darkvision 60 ft.", "tremorsense 60 ft."],
    passive: 11,
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["Primordial (Terran)"],
    cr: "6",
    action: [
      {
        name: "Avalanche Slam",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Bludgeoning damage. If the target is a Large or smaller creature and the galeb duhr moved 20+ feet straight toward it immediately before the hit, the target takes an extra 7 ({@damage 2d6}) Bludgeoning damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Animate Boulders (1/Day)",
        entries: [
          "The galeb duhr magically animates one or two boulders it can see within 60 feet of itself. Each boulder uses the Galeb Duhr stat block, except it has Intelligence and Charisma scores of 1 and lacks this action. The boulder takes its turn immediately after the galeb duhr on the same {@variantrule Initiative|XPHB} count, and it obeys the galeb duhr. A boulder remains animate for 1 minute or until it or the galeb duhr dies.",
        ],
      },
    ],
    environment: ["hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/galeb-duhr.mp3",
    },
    senseTags: ["D", "T"],
    languageTags: ["P", "T"],
    damageTags: ["B"],
    miscTags: ["MA"],
    conditionInflict: ["prone"],
  },
  {
    name: "Ghast Gravecaller",
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
    ac: [16],
    hp: {
      average: 97,
      formula: "15d8 + 30",
    },
    speed: {
      walk: 30,
    },
    str: 16,
    dex: 17,
    con: 14,
    int: 18,
    wis: 14,
    cha: 8,
    save: {
      con: "+5",
      wis: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 12,
    immune: ["necrotic", "poison"],
    conditionImmune: ["charmed", "exhaustion", "poisoned"],
    languages: ["Abyssal", "Common"],
    cr: "6",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The ghast casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability:",
        ],
        will: ["{@spell Speak with Dead|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Stench",
        entries: [
          "{@actSave con} {@dc 13}, any creature that starts its turn in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the ghast. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the start of its next turn. {@actSaveSuccess} The target is immune to this ghast's Stench for 24 hours.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The ghast makes two Horrific Necrosis attacks. It can replace one attack with a Claw attack.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}13 ({@damage 3d6 + 3}) Slashing damage. If the target isn't an Undead, it has the {@condition Paralyzed|XPHB} condition until the end of its next turn.",
        ],
      },
      {
        name: "Horrific Necrosis",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 120 ft. {@h}15 ({@damage 2d10 + 4}) Necrotic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["swamp", "underdark", "urban"],
    treasure: ["any"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C"],
    damageTags: ["N", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["frightened", "paralyzed", "poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Giant Squid",
    source: "XMM",
    page: 360,
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 120,
      formula: "16d12 + 16",
    },
    speed: {
      walk: 5,
      swim: 80,
    },
    str: 23,
    dex: 14,
    con: 12,
    int: 5,
    wis: 11,
    cha: 4,
    save: {
      str: "+9",
      dex: "+5",
    },
    skill: {
      perception: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    cr: "6",
    trait: [
      {
        name: "Water Breathing",
        entries: ["The squid can breathe only underwater."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The squid makes one Bite attack and one Tentacle attack."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}28 ({@damage 4d10 + 6}) Piercing damage.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}19 ({@damage 3d8 + 6}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 16}) from one of two tentacles, and the squid can pull the target up to 10 feet straight toward itself.",
        ],
      },
    ],
    reaction: [
      {
        name: "Ink Cloud (1/Day)",
        entries: [
          "{@actTrigger} The squid takes damage while underwater. {@actResponse} The squid releases ink that fills a 15-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} centered on itself, and the squid moves up to its {@variantrule Swim Speed|XPHB}. The {@variantrule Cube [Area of Effect]|XPHB|Cube} is {@variantrule Heavily Obscured|XPHB} for 1 minute or until a strong current or similar effect disperses the ink.",
        ],
      },
    ],
    environment: ["underwater"],
    traitTags: ["Water Breathing"],
    senseTags: ["SD"],
    actionTags: ["Multiattack", "Tentacles"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
  },
  {
    name: "Githzerai Zerth",
    source: "XMM",
    page: 137,
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "N"],
    ac: [17],
    hp: {
      average: 84,
      formula: "13d8 + 26",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 13,
    dex: 18,
    con: 15,
    int: 16,
    wis: 17,
    cha: 12,
    save: {
      str: "+4",
      dex: "+7",
      int: "+6",
      wis: "+6",
    },
    skill: {
      arcana: "+6",
      insight: "+6",
      perception: "+6",
    },
    passive: 16,
    languages: ["Common", "Gith"],
    cr: "6",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts one of the following spells, requiring no spell components and using Wisdom as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "1e": [
            "{@spell Phantasmal Killer|XPHB} (level 6 version)",
            "{@spell Plane Shift|XPHB}",
            "{@spell See Invisibility|XPHB}",
          ],
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
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Bludgeoning damage plus 13 ({@damage 3d8}) Psychic damage.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["arcana", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/githzerai-zerth.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "GTH"],
    damageTags: ["B", "Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Hobgoblin Warlord",
    group: ["Goblinoids"],
    source: "XMM",
    page: 171,
    size: ["M"],
    type: {
      type: "fey",
      tags: ["goblinoid"],
    },
    alignment: ["L", "E"],
    ac: [20],
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
    str: 17,
    dex: 14,
    con: 16,
    int: 14,
    wis: 11,
    cha: 15,
    save: {
      dex: "+5",
      int: "+5",
      wis: "+3",
      cha: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 10,
    languages: ["Common", "Goblin"],
    cr: "6",
    gear: [
      {
        item: "javelin|xphb",
        quantity: 9,
      },
      "longsword|xphb",
      "plate armor|xphb",
      "shield|xphb",
    ],
    trait: [
      {
        name: "Aura of Authority",
        entries: [
          "While in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the hobgoblin, the hobgoblin and its allies have {@variantrule Advantage|XPHB} on attack rolls and saving throws, provided the hobgoblin doesn't have the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The hobgoblin makes three attacks, using Javelin or Longsword in any combination.",
        ],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 30/120 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage, and the target's {@variantrule Speed|XPHB} decreases by 10 feet until the start of the hobgoblin's next turn.",
        ],
      },
      {
        name: "Longsword",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}12 ({@damage 2d8 + 3}) Slashing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The hobgoblin is hit by a melee attack roll while holding a weapon. {@actResponse} The hobgoblin adds 3 to its AC against that attack, possibly causing it to miss.",
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
      path: "bestiary/hobgoblin-warlord.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["C", "GO"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Invisible Stalker",
    source: "XMM",
    page: 180,
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
      average: 97,
      formula: "13d10 + 26",
    },
    speed: {
      walk: 50,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 19,
    con: 14,
    int: 10,
    wis: 15,
    cha: 11,
    skill: {
      perception: "+8",
      stealth: "+10",
    },
    senses: ["darkvision 60 ft."],
    passive: 18,
    resist: ["bludgeoning", "piercing", "slashing"],
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
    languages: ["Common", "Primordial (Auran)"],
    cr: "6",
    trait: [
      {
        name: "Air Form",
        entries: [
          "The stalker can enter an enemy's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.",
        ],
      },
      {
        name: "Invisibility",
        entries: ["The stalker has the {@condition Invisible|XPHB} condition."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The stalker makes three Wind Swipe attacks. It can replace one attack with a use of Vortex.",
        ],
      },
      {
        name: "Wind Swipe",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Force damage.",
        ],
      },
      {
        name: "Vortex",
        entries: [
          "{@actSave con} {@dc 14}, one Large or smaller creature in the stalker's space. {@actSaveFail} 7 ({@damage 1d8 + 3}) Thunder damage, and the target has the {@condition Grappled|XPHB} condition (escape {@dc 13}). Until the grapple ends, the target can't cast spells with a Verbal component and takes 7 ({@damage 2d6}) Thunder damage at the start of each of the stalker's turns.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/invisible-stalker.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AU", "C", "P"],
    damageTags: ["O", "T"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "invisible"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Kuo-toa Archpriest",
    source: "XMM",
    page: 191,
    size: ["M"],
    type: "aberration",
    alignment: ["N", "E"],
    ac: [13],
    hp: {
      average: 105,
      formula: "14d8 + 42",
    },
    speed: {
      walk: 30,
      swim: 30,
    },
    str: 16,
    dex: 14,
    con: 16,
    int: 13,
    wis: 16,
    cha: 14,
    skill: {
      perception: "+9",
      religion: "+4",
    },
    senses: ["darkvision 120 ft.", "truesight 30 ft."],
    passive: 19,
    languages: ["Undercommon"],
    cr: "6",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The kuo-toa casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: ["{@spell Detect Magic|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Destructive Wave|XPHB}",
            "{@spell Divination|XPHB}",
            "{@spell Hold Monster|XPHB} (level 6 version)",
            "{@spell Scrying|XPHB}",
            "{@spell Tongues|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Shield of Faith (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The kuo-toa casts {@spell Shield of Faith|XPHB}, using the same spellcasting ability as Spellcasting.",
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
        name: "Multiattack",
        entries: ["The kuo-toa makes three Strange Scepter attacks."],
      },
      {
        name: "Strange Scepter",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 120 ft. {@h}20 ({@damage 5d6 + 3}) Lightning damage.",
        ],
      },
    ],
    environment: ["coastal", "underdark"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/kuo-toa-archpriest.mp3",
    },
    traitTags: ["Amphibious", "Sunlight Sensitivity"],
    senseTags: ["SD", "U"],
    actionTags: ["Multiattack"],
    languageTags: ["U"],
    damageTags: ["L"],
    damageTagsSpell: ["N", "R", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["paralyzed", "prone"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Mage",
    source: "XMM",
    page: 199,
    otherSources: [
      {
        source: "UtHftLH",
      },
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: {
      type: "humanoid",
      tags: ["wizard"],
    },
    alignment: ["N"],
    ac: [15],
    hp: {
      average: 81,
      formula: "18d8",
    },
    speed: {
      walk: 30,
    },
    str: 9,
    dex: 14,
    con: 11,
    int: 17,
    wis: 12,
    cha: 11,
    save: {
      int: "+6",
      wis: "+4",
    },
    skill: {
      arcana: "+6",
      history: "+6",
      perception: "+4",
    },
    passive: 14,
    languages: ["Common and any three languages"],
    cr: "6",
    gear: ["wand|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mage casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Light|XPHB}",
          "{@spell Mage Armor|XPHB} (included in AC)",
          "{@spell Mage Hand|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Fireball|XPHB} (level 4 version)",
            "{@spell Invisibility|XPHB}",
          ],
          "1e": ["{@spell Cone of Cold|XPHB}", "{@spell Fly|XPHB}"],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Misty Step (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The mage casts {@spell Misty Step|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": ["{@spell Misty Step|XPHB}"],
        },
        ability: "int",
        displayAs: "bonus",
        hidden: ["daily"],
      },
      {
        name: "Protective Magic (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The mage casts {@spell Counterspell|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": ["{@spell Counterspell|XPHB}", "{@spell Shield|XPHB}"],
        },
        ability: "int",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The mage makes three Arcane Burst attacks."],
      },
      {
        name: "Arcane Burst",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 120 ft. {@h}16 ({@damage 3d8 + 3}) Force damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["arcana", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/mage.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["O"],
    damageTagsSpell: ["C", "F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["constitution", "dexterity"],
  },
  {
    name: "Mammoth",
    source: "XMM",
    page: 365,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 126,
      formula: "11d12 + 55",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 24,
    dex: 9,
    con: 21,
    int: 3,
    wis: 11,
    cha: 6,
    save: {
      str: "+10",
      con: "+8",
    },
    passive: 10,
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: ["The mammoth makes two Gore attacks."],
      },
      {
        name: "Gore",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}18 ({@damage 2d10 + 7}) Piercing damage. If the target is a Huge or smaller creature and the mammoth moved 20+ feet straight toward it immediately before the hit, the target has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    bonus: [
      {
        name: "Trample",
        entries: [
          "{@actSave dex} {@dc 18}, one creature within 5 feet that has the {@condition Prone|XPHB} condition. {@actSaveFail} 29 ({@damage 4d10 + 7}) Bludgeoning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["arctic"],
    soundClip: {
      type: "internal",
      path: "bestiary/mammoth.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Medusa",
    source: "XMM",
    page: 205,
    size: ["M"],
    type: "monstrosity",
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 127,
      formula: "17d8 + 51",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 17,
    con: 16,
    int: 12,
    wis: 13,
    cha: 15,
    save: {
      wis: "+4",
    },
    skill: {
      deception: "+5",
      perception: "+4",
      stealth: "+6",
    },
    senses: ["darkvision 150 ft."],
    passive: 14,
    languages: ["Common plus one other language"],
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The medusa makes two Claw attacks and one Snake Hair attack, or it makes three Poison Ray attacks.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage.",
        ],
      },
      {
        name: "Snake Hair",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}5 ({@damage 1d4 + 3}) Piercing damage plus 14 ({@damage 4d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Ray",
        entries: [
          "{@atkr r} {@hit 5}, range 150 ft. {@h}11 ({@damage 2d8 + 2}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Petrifying Gaze {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 13}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. If the medusa sees its reflection in the {@variantrule Cone [Area of Effect]|XPHB|Cone}, the medusa must make this save. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
        ],
      },
    ],
    environment: ["desert"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/medusa.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["petrified", "restrained"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Merfolk Wavebender",
    source: "XMM",
    page: 209,
    size: ["M"],
    type: "elemental",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 97,
      formula: "15d8 + 30",
    },
    speed: {
      walk: 10,
      swim: 40,
    },
    str: 10,
    dex: 18,
    con: 14,
    int: 13,
    wis: 19,
    cha: 15,
    save: {
      dex: "+7",
      con: "+5",
      wis: "+7",
      cha: "+5",
    },
    skill: {
      perception: "+7",
    },
    passive: 17,
    resist: ["cold"],
    languages: ["Common", "Primordial (Aquan)"],
    cr: "6",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The merfolk casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Elementalism|XPHB}", "{@spell Light|XPHB}"],
        daily: {
          "1e": [
            "{@spell Control Water|XPHB}",
            "{@spell Create or Destroy Water|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The merfolk can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The merfolk makes two Aquatic Burst attacks."],
      },
      {
        name: "Aquatic Burst",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 60 ft. {@h}20 ({@damage 3d10 + 4}) Cold damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    reaction: [
      {
        name: "Watery Rebuke",
        entries: [
          "{@actTrigger} An enemy the merfolk can see enters a space within 5 feet of the merfolk. {@actResponse d}{@actSave str} {@dc 15}, the triggering enemy. {@actSaveFail} 14 ({@damage 4d6}) Cold damage. If the target is Large or smaller, it is pushed up to 30 feet straight away from the merfolk by conjured water.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["individual"],
    traitTags: ["Amphibious"],
    actionTags: ["Multiattack"],
    languageTags: ["AQ", "C", "P"],
    damageTags: ["C"],
    damageTagsSpell: ["B"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["prone"],
    savingThrowForced: ["strength"],
    savingThrowForcedSpell: ["strength"],
  },
  {
    name: "Performer Maestro",
    source: "XMM",
    page: 237,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 110,
      formula: "17d8 + 34",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 18,
    con: 14,
    int: 13,
    wis: 14,
    cha: 19,
    save: {
      dex: "+7",
      cha: "+7",
    },
    skill: {
      acrobatics: "+10",
      athletics: "+4",
      perception: "+5",
      performance: "+10",
      stealth: "+7",
    },
    passive: 15,
    languages: ["Common plus one other language"],
    cr: "6",
    gear: ["rapier|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: [
          "{@spell Minor Illusion|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "1": ["{@spell Tasha's Hideous Laughter|XPHB} (level 3 version)"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The performer makes three Rapier attacks."],
      },
      {
        name: "Rapier",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Piercing damage plus 7 ({@damage 2d6}) Psychic damage.",
        ],
      },
      {
        name: "Beguiling Song",
        entries: [
          "{@actSave wis} {@dc 15}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within 120 feet. {@actSaveFail} 20 ({@damage 3d10 + 4}) Psychic damage, and the target has the {@condition Charmed|XPHB} condition until the end of the performer's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "MLW"],
    conditionInflict: ["charmed"],
    conditionInflictSpell: ["incapacitated", "prone"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Pirate Captain",
    source: "XMM",
    page: 242,
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
    ac: [17],
    hp: {
      average: 84,
      formula: "13d8 + 26",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 18,
    con: 14,
    int: 10,
    wis: 14,
    cha: 17,
    save: {
      str: "+3",
      dex: "+7",
      wis: "+5",
      cha: "+6",
    },
    skill: {
      acrobatics: "+7",
      perception: "+5",
    },
    passive: 15,
    languages: ["Common plus one other language"],
    cr: "6",
    gear: ["pistol|xphb", "rapier|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The pirate makes three attacks, using Rapier or Pistol in any combination.",
        ],
      },
      {
        name: "Rapier",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage, and the pirate has {@variantrule Advantage|XPHB} on the next attack roll it makes before the end of this turn.",
        ],
      },
      {
        name: "Pistol",
        entries: [
          "{@atkr r} {@hit 7}, range 30/90 ft. {@h}15 ({@damage 2d10 + 4}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Captain's Charm",
        entries: [
          "{@actSave wis} {@dc 14}, one creature the pirate can see within 30 feet. {@actSaveFail} The target has the {@condition Charmed|XPHB} condition until the start of the pirate's next turn.",
        ],
      },
    ],
    reaction: [
      {
        name: "Riposte",
        entries: [
          "{@actTrigger} The pirate is hit by a melee attack roll while holding a weapon. {@actResponse} The pirate adds 3 to its AC against that attack, possibly causing it to miss. On a miss, the pirate makes one Rapier attack against the triggering creature if within range.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
    conditionInflict: ["charmed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Satyr Revelmaster",
    source: "XMM",
    page: 268,
    size: ["M"],
    type: "fey",
    alignment: ["C", "N"],
    ac: [17],
    hp: {
      average: 82,
      formula: "15d8 + 15",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 18,
    con: 12,
    int: 12,
    wis: 14,
    cha: 17,
    save: {
      dex: "+7",
      wis: "+5",
    },
    skill: {
      acrobatics: "+7",
      perception: "+5",
      performance: "+9",
    },
    passive: 15,
    languages: ["Common", "Elvish", "Sylvan"],
    cr: "6",
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
        name: "Multiattack",
        entries: ["The satyr makes three Prance attacks."],
      },
      {
        name: "Prance",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage, and the target has the {@condition Charmed|XPHB} condition until the start of the satyr's next turn.",
        ],
      },
      {
        name: "Fey Melody {@recharge 4}",
        entries: [
          "The satyr conjures a charming or frightening song. {@actSave wis} {@dc 14}, each enemy in a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the satyr. {@actSaveFail} The target is subjected to the song's effect:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Charming",
                entries: [
                  "The target has the {@condition Charmed|XPHB} condition for 1 minute. While {@condition Charmed|XPHB}, the target has the {@condition Incapacitated|XPHB} condition and uses all its movement to dance in place. The effect ends on the target if it takes any damage.",
                ],
              },
              {
                type: "item",
                name: "Frightening",
                entries: [
                  "10 ({@damage 2d6 + 3}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition for 1 minute. If the target ends its turn out of line of sight from the satyr, the condition ends on it.",
                ],
              },
            ],
          },
        ],
      },
    ],
    environment: ["forest", "planar, feywild"],
    treasure: ["implements"],
    traitTags: ["Magic Resistance"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "E", "S"],
    damageTags: ["B", "Y"],
    miscTags: ["MA"],
    conditionInflict: ["charmed", "frightened", "incapacitated"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Vrock",
    group: ["Demons"],
    source: "XMM",
    page: 319,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 152,
      formula: "16d10 + 64",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    str: 17,
    dex: 15,
    con: 18,
    int: 8,
    wis: 13,
    cha: 8,
    save: {
      dex: "+5",
      wis: "+4",
      cha: "+2",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "6",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the vrock dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The vrock has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The vrock makes two Shred attacks."],
      },
      {
        name: "Shred",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Piercing damage plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
      {
        name: "Spores {@recharge}",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the vrock. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. While {@condition Poisoned|XPHB}, the target takes 5 ({@damage 1d10}) Poison damage at the start of each of its turns. Emptying a flask of Holy Water on the target ends the effect early.",
        ],
      },
      {
        name: "Stunning Screech (1/Day)",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the vrock (demons succeed automatically). {@actSaveFail} 10 ({@damage 3d6}) Thunder damage, and the target has the {@condition Stunned|XPHB} condition until the end of the vrock's next turn.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/vrock.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "TP"],
    damageTags: ["I", "P", "T"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned", "stunned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Wyvern",
    source: "XMM",
    page: 337,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "dragon",
    alignment: ["U"],
    ac: [14],
    hp: {
      average: 127,
      formula: "15d10 + 45",
    },
    speed: {
      walk: 30,
      fly: 80,
    },
    str: 19,
    dex: 10,
    con: 16,
    int: 5,
    wis: 12,
    cha: 6,
    skill: {
      perception: "+4",
    },
    senses: ["darkvision 120 ft."],
    passive: 14,
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: ["The wyvern makes one Bite attack and one Sting attack."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Sting",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage plus 24 ({@damage 7d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the wyvern's next turn.",
        ],
      },
    ],
    environment: ["hill", "mountain"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/wyvern.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["poisoned"],
  },
  {
    name: "Young Brass Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 54,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [17],
    hp: {
      average: 110,
      formula: "13d10 + 39",
    },
    speed: {
      walk: 40,
      burrow: 20,
      fly: 80,
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
      dex: "+3",
      wis: "+3",
    },
    skill: {
      perception: "+6",
      persuasion: "+5",
      stealth: "+3",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 16,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: "6",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace two attacks with a use of Sleep Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}15 ({@damage 2d10 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 14}, each creature in a 40-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 38 ({@damage 11d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Sleep Breath",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it repeats the save. {@actSaveFail 2} The target has the {@condition Unconscious|XPHB} condition for 1 minute. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        ],
      },
    ],
    environment: ["desert"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/brass-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated", "unconscious"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Young White Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 328,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [17],
    hp: {
      average: 123,
      formula: "13d10 + 52",
    },
    speed: {
      walk: 40,
      burrow: 20,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 10,
    con: 18,
    int: 6,
    wis: 11,
    cha: 12,
    save: {
      dex: "+3",
      wis: "+3",
    },
    skill: {
      perception: "+6",
      stealth: "+3",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 16,
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: "6",
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
        entries: ["The dragon makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}9 ({@damage 2d4 + 4}) Slashing damage plus 2 ({@damage 1d4}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 40 ({@damage 9d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["arctic"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/white-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["C", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["constitution"],
  },
];
