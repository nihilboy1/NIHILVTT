// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_7 = [
  {
    name: "Bandit Deceiver",
    source: "XMM",
    page: 28,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 130,
      formula: "20d8 + 40",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 8,
    dex: 16,
    con: 14,
    int: 17,
    wis: 12,
    cha: 16,
    save: {
      dex: "+6",
      int: "+6",
    },
    skill: {
      acrobatics: "+6",
      perception: "+4",
      stealth: "+9",
    },
    passive: 14,
    languages: ["Common", "Thieves' cant"],
    cr: "7",
    gear: [
      {
        item: "dagger|xphb",
        quantity: 6,
      },
      "wand|xphb",
    ],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The bandit casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Disguise Self|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Hold Person|XPHB} (level 4 version)",
            "{@spell Mage Armor|XPHB} (included in AC)",
            "{@spell Major Image|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The bandit makes three Dagger attacks."],
      },
      {
        name: "Dagger",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 20/60 ft. {@h}8 ({@damage 2d4 + 3}) Piercing damage plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
      {
        name: "Blinding Flash {@recharge 4}",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the bandit can see within 120 feet. {@actSaveFail} 13 ({@damage 3d6 + 3}) Radiant damage, and the target has the {@condition Blinded|XPHB} condition until the start of the bandit's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "TC"],
    damageTags: ["I", "P", "R"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "MLW", "RA", "THW"],
    conditionInflict: ["blinded"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForced: ["constitution"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Blue Slaad",
    source: "XMM",
    page: 285,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [15],
    hp: {
      average: 133,
      formula: "14d10 + 56",
    },
    speed: {
      walk: 30,
    },
    str: 20,
    dex: 15,
    con: 18,
    int: 7,
    wis: 7,
    cha: 9,
    skill: {
      perception: "+1",
    },
    senses: ["darkvision 60 ft."],
    passive: 11,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["Slaad; telepathy 60 ft."],
    cr: "7",
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
        entries: ["The slaad makes three Mutating Claw attacks."],
      },
      {
        name: "Mutating Claw",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 3 ({@damage 1d6}) Poison damage. If the target is a Humanoid not cursed by a slaad, it is subjected to the following effect. {@actSave con} {@dc 15}. {@actSaveFail} The target is cursed. The cursed target can't regain {@variantrule Hit Points|XPHB}, and its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 10 ({@dice 3d6}) after every 24 hours and doesn't return to normal after finishing a {@variantrule Long Rest|XPHB}. If the curse reduces the target's {@variantrule Hit Points|XPHB|Hit Point} maximum to 0, the curse ends, and instead of dying, the target instantly transforms into a {@creature Red Slaad|XMM} or, if it can cast spells of level 3 or higher, a {@creature Green Slaad|XMM}. Only a {@spell Wish|XPHB} spell can reverse this transformation.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/blue-slaad.mp3",
    },
    traitTags: ["Magic Resistance", "Regeneration"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH", "TP"],
    damageTags: ["I", "S"],
    miscTags: ["CUR", "MA", "RCH"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Centaur Warden",
    source: "XMM",
    page: 67,
    size: ["L"],
    type: "fey",
    alignment: ["N", "G"],
    ac: [16],
    hp: {
      average: 105,
      formula: "14d10 + 28",
    },
    speed: {
      walk: 50,
    },
    str: 18,
    dex: 14,
    con: 14,
    int: 9,
    wis: 18,
    cha: 11,
    save: {
      con: "+5",
      wis: "+7",
    },
    skill: {
      athletics: "+7",
      nature: "+5",
      perception: "+7",
    },
    passive: 17,
    languages: ["Druidic", "Elvish", "Sylvan"],
    cr: "7",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The centaur casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Druidcraft|XPHB}", "{@spell Speak with Animals|XPHB}"],
        ability: "wis",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The centaur makes two attacks, using Forest Staff or Sun Ray in any combination.",
        ],
      },
      {
        name: "Forest Staff",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Bludgeoning damage plus 14 ({@damage 4d6}) Poison damage.",
        ],
      },
      {
        name: "Sun Ray",
        entries: [
          "{@atkr r} {@hit 7}, range 90 ft. {@h}14 ({@damage 3d6 + 4}) Radiant damage, and the target has the {@condition Blinded|XPHB} condition until the start of the centaur's next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Entangling Trail {@recharge 5}",
        entries: [
          "The centaur moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. Each creature within 5 feet of the centaur as it moves is targeted once by the following effect. {@actSave str} {@dc 15}. {@actSaveFail} 11 ({@damage 2d6 + 4}) Bludgeoning damage, and the target has the {@condition Restrained|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    environment: ["forest", "grassland", "planar, feywild"],
    treasure: ["armaments", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["DU", "E", "S"],
    damageTags: ["B", "I", "R"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["blinded", "restrained"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Giant Ape",
    source: "XMM",
    page: 354,
    size: ["H"],
    type: "beast",
    alignment: ["U"],
    ac: [12],
    hp: {
      average: 168,
      formula: "16d12 + 64",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 14,
    con: 18,
    int: 5,
    wis: 12,
    cha: 7,
    skill: {
      athletics: "+9",
      perception: "+4",
      survival: "+4",
    },
    passive: 14,
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: ["The ape makes two Fist attacks."],
      },
      {
        name: "Fist",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}22 ({@damage 3d10 + 6}) Bludgeoning damage.",
        ],
      },
      {
        name: "Boulder Toss {@recharge}",
        entries: [
          "The ape hurls a boulder at a point it can see within 90 feet. {@actSave dex} {@dc 17}, each creature in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point. {@actSaveFail} 24 ({@damage 7d6}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The ape jumps up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["forest"],
    soundClip: {
      type: "internal",
      path: "bestiary/giant-ape.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Graveyard Revenant",
    source: "XMM",
    page: 260,
    size: ["H"],
    type: "undead",
    alignment: ["N"],
    ac: [14],
    hp: {
      average: 161,
      formula: "14d12 + 70",
    },
    speed: {
      walk: 40,
    },
    str: 20,
    dex: 14,
    con: 20,
    int: 13,
    wis: 16,
    cha: 18,
    save: {
      str: "+8",
      con: "+8",
      wis: "+6",
      cha: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 13,
    resist: ["necrotic", "psychic"],
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
      "stunned",
      "unconscious",
    ],
    languages: ["Common plus two other languages"],
    cr: "7",
    trait: [
      {
        name: "Undead Restoration",
        entries: [
          "If the revenant dies, it revives 24 hours later unless {@spell Dispel Evil and Good|XPHB} is cast on its remains. If it revives, it animates another group of corpses elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The revenant makes two Suffocate attacks."],
      },
      {
        name: "Suffocate",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}10 ({@damage 1d10 + 5}) Bludgeoning damage plus 10 ({@damage 3d6}) Necrotic damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 15}). Until the grapple ends, the target is suffocating. The revenant can have up to two targets {@condition Grappled|XPHB} in this way at a time.",
        ],
      },
      {
        name: "Haunting Glare {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 15}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the revenant. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["forest", "swamp", "urban"],
    treasure: ["any"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "N"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "paralyzed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Grick Ancient",
    source: "XMM",
    page: 158,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "aberration",
    alignment: ["U"],
    ac: [18],
    hp: {
      average: 135,
      formula: "18d10 + 36",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    str: 18,
    dex: 16,
    con: 15,
    int: 4,
    wis: 14,
    cha: 9,
    skill: {
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The grick makes one Beak attack, one Slam attack, and one Tentacles attack.",
        ],
      },
      {
        name: "Beak",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}22 ({@damage 4d8 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}7 ({@damage 1d6 + 4}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Tentacles",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}15 ({@damage 2d10 + 4}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from all four tentacles.",
        ],
      },
    ],
    environment: ["forest", "underdark"],
    treasure: ["any"],
    senseTags: ["D"],
    actionTags: ["Multiattack", "Tentacles"],
    damageTags: ["B", "P", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone"],
  },
  {
    name: "Mind Flayer",
    source: "XMM",
    page: 214,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: "aberration",
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 99,
      formula: "18d8 + 18",
    },
    speed: {
      walk: 30,
      fly: {
        number: 15,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 11,
    dex: 12,
    con: 12,
    int: 19,
    wis: 17,
    cha: 17,
    save: {
      dex: "+4",
      int: "+7",
      wis: "+6",
      cha: "+6",
    },
    skill: {
      arcana: "+7",
      insight: "+6",
      perception: "+6",
      stealth: "+4",
    },
    senses: ["darkvision 120 ft."],
    passive: 16,
    resist: ["psychic"],
    languages: ["Deep Speech", "Undercommon; telepathy 120 ft."],
    cr: "7",
    gear: ["breastplate|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mind flayer casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Detect Thoughts|XPHB}"],
        daily: {
          "1e": [
            "{@spell Dominate Monster|XPHB}",
            "{@spell Plane Shift|XPHB} (self only)",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The mind flayer has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Tentacles",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}22 ({@damage 4d8 + 4}) Psychic damage. If the target is a Medium or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from all the mind flayer's tentacles, and the target has the {@condition Stunned|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Extract Brain",
        entries: [
          "{@actSave con} {@dc 15}, one creature that is {@condition Grappled|XPHB} by the mind flayer's Tentacles. {@actSaveFail} 55 ({@damage 10d10}) Piercing damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If this damage reduces the target to 0 {@variantrule Hit Points|XPHB}, the mind flayer kills it and devours its brain.",
        ],
      },
      {
        name: "Mind Blast {@recharge 5}",
        entries: [
          "{@actSave int} {@dc 15}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 31 ({@damage 6d8 + 4}) Psychic damage, and the target has the {@condition Stunned|XPHB} condition until the end of the mind flayer's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/mind-flayer.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Tentacles"],
    languageTags: ["DS", "TP", "U"],
    damageTags: ["P", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "stunned"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["constitution", "intelligence"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Oni",
    source: "XMM",
    page: 232,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 119,
      formula: "14d10 + 42",
    },
    speed: {
      walk: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 19,
    dex: 11,
    con: 16,
    int: 14,
    wis: 12,
    cha: 15,
    save: {
      dex: "+3",
      con: "+6",
      wis: "+4",
      cha: "+5",
    },
    skill: {
      arcana: "+5",
      deception: "+8",
      perception: "+4",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    resist: ["cold"],
    languages: ["Common", "Giant"],
    cr: "7",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The oni casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 13}):",
        ],
        daily: {
          "1e": [
            "{@spell Charm Person|XPHB} (level 2 version)",
            "{@spell Darkness|XPHB}",
            "{@spell Gaseous Form|XPHB}",
            "{@spell Sleep|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Invisibility",
        type: "spellcasting",
        headerEntries: [
          "The oni casts {@spell Invisibility|XPHB} on itself, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Invisibility|XPHB}"],
        ability: "cha",
        displayAs: "bonus",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Regeneration",
        entries: [
          "The oni regains 10 {@variantrule Hit Points|XPHB} at the start of each of its turns if it has at least 1 {@variantrule Hit Points|XPHB|Hit Point}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The oni makes two Claw or Nightmare Ray attacks. It can replace one attack with a use of Spellcasting.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}10 ({@damage 1d12 + 4}) Slashing damage plus 9 ({@damage 2d8}) Necrotic damage.",
        ],
      },
      {
        name: "Nightmare Ray",
        entries: [
          "{@atkr r} {@hit 5}, range 60 ft. {@h}9 ({@damage 2d6 + 2}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the start of the oni's next turn.",
        ],
      },
      {
        name: "Shape-Shift",
        entries: [
          "The oni shape-shifts into a Small or Medium Humanoid or a Large Giant, or it returns to its true form. Other than its size, its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["forest", "urban"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/oni.mp3",
    },
    traitTags: ["Regeneration"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GI"],
    damageTags: ["N", "S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["frightened"],
    conditionInflictSpell: [
      "charmed",
      "incapacitated",
      "invisible",
      "unconscious",
    ],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Primeval Owlbear",
    source: "XMM",
    page: 234,
    size: ["H"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [16],
    hp: {
      average: 126,
      formula: "12d12 + 48",
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: 5,
    },
    initiative: {
      proficiency: 1,
    },
    str: 22,
    dex: 14,
    con: 19,
    int: 8,
    wis: 15,
    cha: 7,
    save: {
      con: "+7",
      wis: "+5",
    },
    skill: {
      perception: "+8",
    },
    senses: ["darkvision 120 ft."],
    passive: 18,
    cr: "7",
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The owlbear has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The owlbear makes two Ravage attacks."],
      },
      {
        name: "Ravage",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}15 ({@damage 2d8 + 6}) Slashing damage. If the target is a Huge or smaller creature and the owlbear moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 ({@damage 2d8}) Slashing damage and has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Screech {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the owlbear. {@actSaveFail} 27 ({@damage 6d8}) Thunder damage, and the target has the {@condition Incapacitated|XPHB} condition until the end of its next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["forest"],
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    damageTags: ["S", "T"],
    miscTags: ["MA"],
    conditionInflict: ["incapacitated", "prone"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Shield Guardian",
    source: "XMM",
    page: 277,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [17],
    hp: {
      average: 142,
      formula: "15d10 + 60",
    },
    speed: {
      walk: 30,
    },
    str: 18,
    dex: 8,
    con: 18,
    int: 7,
    wis: 10,
    cha: 3,
    senses: ["blindsight 10 ft.", "darkvision 60 ft."],
    passive: 10,
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["understands commands given in any language but can't speak"],
    cr: "7",
    trait: [
      {
        name: "Bound",
        entries: [
          "The guardian is magically bound to an amulet. While the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (round up) is transferred to the guardian.",
        ],
      },
      {
        name: "Regeneration",
        entries: [
          "The guardian regains 10 {@variantrule Hit Points|XPHB} at the start of each of its turns if it has at least 1 {@variantrule Hit Points|XPHB|Hit Point}.",
        ],
      },
      {
        name: "Spell Storing",
        entries: [
          "A spellcaster who wears the guardian's amulet can cause the guardian to store one spell of level 4 or lower. To do so, the wearer must cast the spell on the guardian while within 5 feet of it. The spell has no effect but is stored within the guardian. Any previously stored spell is lost when a new spell is stored. The guardian can cast the spell stored with any parameters set by the original caster, requiring no spell components and using the caster's spellcasting ability. The stored spell is then lost.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The guardian makes two Fist attacks."],
      },
      {
        name: "Fist",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Bludgeoning damage plus 7 ({@damage 2d6}) Force damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Protection",
        entries: [
          "{@actTrigger} An attack roll hits the wearer of the guardian's amulet while the wearer is within 5 feet of the guardian. {@actResponse} The wearer gains a +5 bonus to AC, including against the triggering attack and possibly causing it to miss, until the start of the guardian's next turn.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/shield-guardian.mp3",
    },
    traitTags: ["Regeneration"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack"],
    languageTags: ["CS", "X"],
    damageTags: ["B", "O"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Stone Giant",
    source: "XMM",
    page: 300,
    size: ["H"],
    type: "giant",
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 126,
      formula: "11d12 + 55",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 15,
    con: 20,
    int: 10,
    wis: 12,
    cha: 9,
    save: {
      dex: "+5",
      con: "+8",
      wis: "+4",
    },
    skill: {
      athletics: "+12",
      perception: "+4",
      stealth: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    languages: ["Giant"],
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Stone Club or Boulder in any combination.",
        ],
      },
      {
        name: "Stone Club",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}22 ({@damage 3d10 + 6}) Bludgeoning damage.",
        ],
      },
      {
        name: "Boulder",
        entries: [
          "{@atkr r} {@hit 9}, range 60/240 ft. {@h}15 ({@damage 2d8 + 6}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    reaction: [
      {
        name: "Deflect Missile {@recharge 5}",
        entries: [
          "{@actTrigger} The giant is hit by a ranged attack roll and takes Bludgeoning, Piercing, or Slashing damage from it. {@actResponse} The giant reduces the damage it takes from the attack by 11 ({@dice 1d10 + 6}), and if that damage is reduced to 0, the giant can redirect some of the attack's force. {@actSave dex} {@dc 17}, one creature the giant can see within 60 feet. {@actSaveFail} 11 ({@damage 1d10 + 6}) Force damage.",
        ],
      },
    ],
    environment: ["mountain", "underdark"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/stone-giant.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["B", "O"],
    miscTags: ["MA", "MLW", "RA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Tree Blight",
    source: "XMM",
    page: 44,
    size: ["H"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 115,
      formula: "10d12 + 50",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 10,
    con: 20,
    int: 6,
    wis: 10,
    cha: 3,
    senses: ["blindsight 60 ft."],
    passive: 10,
    conditionImmune: ["deafened"],
    languages: ["understands Common and Druidic but can't speak"],
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The blight makes two Branch attacks and uses Grasping Root.",
        ],
      },
      {
        name: "Branch",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}16 ({@damage 3d6 + 6}) Bludgeoning damage.",
        ],
      },
      {
        name: "Grasping Root",
        entries: [
          "{@actSave str} {@dc 17}, one Large or smaller creature the blight can see within 15 feet. {@actSaveFail} The target is pulled up to 10 feet straight toward the blight and has the {@condition Grappled|XPHB} condition (escape {@dc 16}) from one of six roots. Until the grapple ends, the target takes 13 ({@damage 2d6 + 6}) Bludgeoning damage at the start of each of its turns.",
        ],
      },
    ],
    bonus: [
      {
        name: "Gnash",
        entries: [
          "{@actSave dex} {@dc 17}, one creature {@condition Grappled|XPHB} by the blight. {@actSaveFail} 19 ({@damage 3d8 + 6}) Piercing damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["forest"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "DU"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Violet Fungus Necrohulk",
    source: "XMM",
    page: 126,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [17],
    hp: {
      average: 123,
      formula: "13d10 + 52",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 12,
    con: 18,
    int: 7,
    wis: 14,
    cha: 10,
    senses: ["blindsight 60 ft."],
    passive: 12,
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "poisoned",
    ],
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: ["The necrohulk makes two Rotting Slam attacks."],
      },
      {
        name: "Rotting Slam",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Bludgeoning damage plus 7 ({@damage 2d6}) Necrotic damage.",
        ],
      },
      {
        name: "Spore Bomb {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 15}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the necrohulk can see within 60 feet. {@actSaveFail} 28 ({@damage 8d6}) Necrotic damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the necrohulk's next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Absorb Body",
        entries: [
          "{@actSave str} {@dc 15}, one Medium or Small creature the necrohulk can see within 5 feet. {@actSaveFail} The target is pulled into the necrohulk's space and becomes grafted to its body. The necrohulk can have only one target grafted at a time.",
          "While grafted, the target has the {@condition Restrained|XPHB} condition and {@variantrule Disadvantage|XPHB} on Constitution saving throws. When the necrohulk moves, the grafted target moves with it. If the target dies while grafted, its body is destroyed, and the necrohulk regains 10 {@variantrule Hit Points|XPHB}.",
          "The grafted target or a creature within 5 feet of the necrohulk can take an action to make a {@dc 15} Strength ({@skill Athletics|XPHB}) check. On a successful check, the target is no longer grafted and moves to an unoccupied space within 5 feet of the necrohulk.",
        ],
      },
    ],
    environment: ["underdark"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["B", "N"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflict: ["poisoned", "restrained"],
    savingThrowForced: ["constitution", "strength"],
  },
  {
    name: "Young Black Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 38,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 127,
      formula: "15d10 + 45",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 14,
    con: 17,
    int: 12,
    wis: 11,
    cha: 15,
    save: {
      dex: "+5",
      wis: "+3",
    },
    skill: {
      perception: "+6",
      stealth: "+5",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 16,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: "7",
    trait: [
      {
        name: "Amphibious",
        entries: ["The dragon can breathe air and water."],
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
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}9 ({@damage 2d4 + 4}) Slashing damage plus 3 ({@damage 1d6}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 14}, each creature in a 30-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 49 ({@damage 14d6}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["swamp"],
    treasure: ["relics"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/black-dragon.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["A", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Young Copper Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 78,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [17],
    hp: {
      average: 119,
      formula: "14d10 + 42",
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 12,
    con: 17,
    int: 16,
    wis: 13,
    cha: 15,
    save: {
      dex: "+4",
      wis: "+4",
    },
    skill: {
      deception: "+5",
      perception: "+7",
      stealth: "+4",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 17,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: "7",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of Slowing Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}15 ({@damage 2d10 + 4}) Slashing damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 14}, each creature in a 40-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 40 ({@damage 9d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Slowing Breath",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target can't take Reactions; its {@variantrule Speed|XPHB} is halved; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. This effect lasts until the end of its next turn.",
        ],
      },
    ],
    environment: ["hill"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/copper-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["A", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Yuan-ti Abomination",
    source: "XMM",
    page: 345,
    size: ["L"],
    type: "monstrosity",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 127,
      formula: "15d10 + 45",
    },
    speed: {
      walk: 40,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 16,
    con: 17,
    int: 17,
    wis: 18,
    cha: 15,
    skill: {
      perception: "+7",
      stealth: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 17,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Common", "Draconic"],
    cr: "7",
    spellcasting: [
      {
        name: "Spellcasting (Yuan-ti Form Only)",
        type: "spellcasting",
        headerEntries: [
          "The yuan-ti casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Animal Friendship|XPHB} (snakes only)"],
        daily: {
          "3": ["{@spell Suggestion|XPHB}"],
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
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}11 ({@damage 2d6 + 4}) Piercing damage plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 15}, one Large or smaller creature within 5 feet. {@actSaveFail} 28 ({@damage 7d6 + 4}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 14}), and it has the {@condition Restrained|XPHB} condition until the grapple ends. {@actSaveSuccess} Half damage only.",
        ],
      },
      {
        name: "Poison Spray {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 21 ({@damage 6d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the end of the yuan-ti's next turn. While {@condition Poisoned|XPHB}, the target has the {@condition Blinded|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The yuan-ti shape-shifts into a Large snake or returns to its true form. If it dies, it stays in its current form. The yuan-ti's game statistics are the same in each form, except where noted. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    environment: ["desert", "forest", "swamp", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/yuan-ti-abomination.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "DR"],
    damageTags: ["B", "I", "P"],
    spellcastingTags: ["F"],
    miscTags: ["MA"],
    conditionInflict: ["blinded", "grappled", "poisoned", "restrained"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["constitution", "strength"],
    savingThrowForcedSpell: ["wisdom"],
  },
];
