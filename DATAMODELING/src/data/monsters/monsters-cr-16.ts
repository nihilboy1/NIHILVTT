// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_16 = [
  {
    name: "Adult Blue Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 49,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [19],
    hp: {
      average: 212,
      formula: "17d12 + 102",
    },
    speed: {
      walk: 40,
      burrow: 30,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 25,
    dex: 10,
    con: 23,
    int: 16,
    wis: 15,
    cha: 20,
    save: {
      dex: "+5",
      wis: "+7",
    },
    skill: {
      perception: "+12",
      stealth: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 22,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "16",
      xpLair: 18000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 18}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Invisibility|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Shatter|XPHB}",
        ],
        daily: {
          "1e": ["{@spell Scrying|XPHB}", "{@spell Sending|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the dragon fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Shatter|XPHB}.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 12}, reach 10 ft. {@h}16 ({@damage 2d8 + 7}) Slashing damage plus 5 ({@damage 1d10}) Lightning damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 19}, each creature in a 90-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 60 ({@damage 11d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Cloaked Flight",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Invisibility|XPHB} on itself, and it can fly up to half its {@variantrule Fly Speed|XPHB}. The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Sonic Boom",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Shatter|XPHB}. The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Tail Swipe",
        entries: ["The dragon makes one Rend attack."],
      },
    ],
    legendaryGroup: {
      name: "Blue Dragon",
      source: "XMM",
    },
    environment: ["coastal", "desert"],
    treasure: ["relics"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/blue-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["L", "S"],
    damageTagsSpell: ["T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedLegendary: ["dexterity"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Adult Silver Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 279,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [19],
    hp: {
      average: 216,
      formula: "16d12 + 112",
    },
    speed: {
      walk: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 27,
    dex: 10,
    con: 25,
    int: 16,
    wis: 13,
    cha: 22,
    save: {
      dex: "+5",
      wis: "+6",
    },
    skill: {
      history: "+8",
      perception: "+11",
      stealth: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 21,
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "16",
      xpLair: 18000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 19}, {@hit 11} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Hold Monster|XPHB}",
          "{@spell Ice Knife|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Ice Storm|XPHB} (level 5 version)",
            "{@spell Zone of Truth|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the dragon fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Paralyzing Breath or (B) Spellcasting to cast {@spell Ice Knife|XPHB}.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 13}, reach 10 ft. {@h}17 ({@damage 2d8 + 8}) Slashing damage plus 4 ({@damage 1d8}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 20}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 54 ({@damage 12d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Paralyzing Breath",
        entries: [
          "{@actSave con} {@dc 20}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail 1} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, when it repeats the save. {@actSaveFail 2} The target has the {@condition Paralyzed|XPHB} condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Chill",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Hold Monster|XPHB}. The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Cold Gale",
        entries: [
          "{@actSave dex} {@dc 19}, each creature in a 60-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 14 ({@damage 4d6}) Cold damage, and the target is pushed up to 30 feet straight away from the dragon. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Pounce",
        entries: [
          "The dragon moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Silver Dragon",
      source: "XMM",
    },
    environment: ["mountain", "urban"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/silver-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["C", "S"],
    damageTagsSpell: ["B", "C", "P"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated", "paralyzed"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForced: ["constitution", "dexterity"],
    savingThrowForcedSpell: ["charisma", "dexterity", "wisdom"],
  },
  {
    name: "Githyanki Dracomancer",
    source: "XMM",
    page: 135,
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 255,
      formula: "30d8 + 120",
    },
    speed: {
      walk: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 16,
    con: 18,
    int: 20,
    wis: 16,
    cha: 18,
    save: {
      dex: "+8",
      con: "+9",
      int: "+10",
      wis: "+8",
    },
    skill: {
      arcana: "+10",
      perception: "+8",
    },
    senses: ["blindsight 30 ft."],
    passive: 18,
    languages: ["Common", "Draconic", "Gith"],
    cr: "16",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 18}, {@hit 10} to hit with spell attacks):",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "2e": [
            "{@spell Nondetection|XPHB} (self only)",
            "{@spell Plane Shift|XPHB}",
            "{@spell Tongues|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Misty Step (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The githyanki casts {@spell Misty Step|XPHB}, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": ["{@spell Misty Step|XPHB}"],
        },
        ability: "int",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The githyanki makes three Draconic Strike attacks."],
      },
      {
        name: "Draconic Strike",
        entries: [
          "{@atkr m,r} {@hit 10}, reach 10 ft. or range 120 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 17 ({@damage 5d6}) Fire damage, and the target has the {@condition Frightened|XPHB} condition until the start of the githyanki's next turn.",
        ],
      },
      {
        name: "Conjured Dragon's Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 27 ({@damage 6d8}) Fire damage plus 27 ({@damage 6d8}) Force damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, astral"],
    treasure: ["armaments"],
    senseTags: ["B"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR", "GTH"],
    damageTags: ["F", "O", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Gulthias Blight",
    source: "XMM",
    page: 45,
    size: ["G"],
    type: "plant",
    alignment: ["N", "E"],
    ac: [20],
    hp: {
      average: 264,
      formula: "16d20 + 96",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 25,
    dex: 10,
    con: 22,
    int: 10,
    wis: 18,
    cha: 12,
    skill: {
      perception: "+9",
    },
    senses: ["blindsight 120 ft."],
    passive: 19,
    resist: ["fire", "necrotic"],
    conditionImmune: ["deafened"],
    languages: ["Common", "Druidic"],
    cr: "16",
    trait: [
      {
        name: "Blight Seeds",
        entries: [
          "When it finishes a {@variantrule Long Rest|XPHB}, the blight expels {@dice 1d6} seeds into unoccupied spaces on the ground within 30 feet of itself. After 24 hours, the seeds become creatures under the blight's control. Roll {@dice 1d8} for each seed to determine the creature it becomes: on 1-4, {@creature Twig Blight|XMM}; on 5-6, {@creature Needle Blight|XMM}; on 7-8, {@creature Vine Blight|XMM}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The blight makes two attacks, using Slam or Thorn Volley in any combination. It also uses Life-Draining Root.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 12}, reach 10 ft. {@h}25 ({@damage 4d8 + 7}) Bludgeoning damage.",
        ],
      },
      {
        name: "Thorn Volley",
        entries: [
          "{@atkr r} {@hit 12}, range 60/180 ft. {@h}20 ({@damage 3d8 + 7}) Piercing damage.",
        ],
      },
      {
        name: "Life-Draining Root",
        entries: [
          "{@actSave con} {@dc 20}, one Huge or smaller creature the blight can see within 30 feet. {@actSaveFail} 14 ({@damage 2d6 + 7}) Necrotic damage, and the target has the {@condition Grappled|XPHB} condition (escape {@dc 17}) from one of six roots. Until the grapple ends, the target has the {@condition Restrained|XPHB} condition and takes 14 ({@damage 4d6}) Necrotic damage at the start of each of its turns. The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Necrotic damage taken, and the blight regains {@variantrule Hit Points|XPHB} equal to that amount.",
        ],
      },
    ],
    environment: ["forest"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "DU"],
    damageTags: ["B", "N", "P"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["grappled", "restrained"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Iron Golem",
    source: "XMM",
    page: 181,
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [20],
    hp: {
      average: 252,
      formula: "24d10 + 120",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 24,
    dex: 9,
    con: 20,
    int: 3,
    wis: 11,
    cha: 1,
    senses: ["darkvision 120 ft."],
    passive: 10,
    immune: ["fire", "poison", "psychic"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["understands Common plus two other languages but can't speak"],
    cr: "16",
    trait: [
      {
        name: "Fire Absorption",
        entries: [
          "Whenever the golem is subjected to Fire damage, it regains a number of {@variantrule Hit Points|XPHB} equal to the Fire damage dealt.",
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
          "The golem makes two attacks, using Bladed Arm or Fiery Bolt in any combination.",
        ],
      },
      {
        name: "Bladed Arm",
        entries: [
          "{@atkr m} {@hit 12}, reach 10 ft. {@h}20 ({@damage 3d8 + 7}) Slashing damage plus 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Fiery Bolt",
        entries: [
          "{@atkr r} {@hit 10}, range 120 ft. {@h}36 ({@damage 8d8}) Fire damage.",
        ],
      },
      {
        name: "Poison Breath {@recharge}",
        entries: [
          "{@actSave con} {@dc 18}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 55 ({@damage 10d10}) Poison damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/iron-golem.mp3",
    },
    traitTags: ["Damage Absorption", "Immutable Form", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["F", "I", "S"],
    miscTags: ["MA", "RA", "RCH"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Marilith",
    group: ["Demons"],
    source: "XMM",
    page: 204,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 220,
      formula: "21d10 + 105",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 20,
    con: 20,
    int: 18,
    wis: 16,
    cha: 20,
    save: {
      str: "+9",
      con: "+10",
      wis: "+8",
      cha: "+10",
    },
    skill: {
      perception: "+8",
    },
    senses: ["truesight 120 ft."],
    passive: 18,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "16",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the marilith dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The marilith has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Reactive",
        entries: [
          "The marilith can take one {@variantrule Reaction|XPHB} on every turn of combat.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The marilith makes six Pact Blade attacks and uses Constrict.",
        ],
      },
      {
        name: "Pact Blade",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}10 ({@damage 1d10 + 5}) Slashing damage plus 7 ({@damage 2d6}) Necrotic damage.",
        ],
      },
      {
        name: "Constrict",
        entries: [
          "{@actSave str} {@dc 17}, one Medium or smaller creature the marilith can see within 5 feet. {@actSaveFail} 15 ({@damage 2d10 + 4}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 14}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
    ],
    bonus: [
      {
        name: "Teleport {@recharge 5}",
        entries: [
          "The marilith teleports up to 120 feet to an unoccupied space it can see.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The marilith is hit by a melee attack roll while holding a weapon. {@actResponse} The marilith adds 5 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/marilith.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Parry", "Teleport"],
    languageTags: ["AB", "TP"],
    damageTags: ["B", "N", "S"],
    miscTags: ["MA"],
    conditionInflict: ["grappled", "restrained"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Planetar",
    group: ["Angels"],
    source: "XMM",
    page: 245,
    size: ["L"],
    type: {
      type: "celestial",
      tags: ["angel"],
    },
    alignment: ["L", "G"],
    ac: [19],
    hp: {
      average: 262,
      formula: "21d10 + 147",
    },
    speed: {
      walk: 40,
      fly: {
        number: 120,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 24,
    dex: 20,
    con: 24,
    int: 19,
    wis: 22,
    cha: 25,
    save: {
      str: "+12",
      con: "+12",
      wis: "+11",
      cha: "+12",
    },
    skill: {
      perception: "+11",
    },
    senses: ["truesight 120 ft."],
    passive: 21,
    resist: ["radiant"],
    conditionImmune: ["charmed", "exhaustion", "frightened"],
    languages: ["all; telepathy 120 ft."],
    cr: "16",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The planetar casts one of the following spells, requiring no Material components and using Charisma as spellcasting ability (spell save {@dc 20}):",
        ],
        will: ["{@spell Detect Evil and Good|XPHB}"],
        daily: {
          "1e": [
            "{@spell Commune|XPHB}",
            "{@spell Control Weather|XPHB}",
            "{@spell Dispel Evil and Good|XPHB}",
            "{@spell Raise Dead|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Divine Aid (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The planetar casts {@spell Cure Wounds|XPHB}, {@spell Invisibility|XPHB}, {@spell Lesser Restoration|XPHB}, or {@spell Remove Curse|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": [
            "{@spell Cure Wounds|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Lesser Restoration|XPHB}",
            "{@spell Remove Curse|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "bonus",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Divine Awareness",
        entries: ["The planetar knows if it hears a lie."],
      },
      {
        name: "Exalted Restoration",
        entries: [
          "If the planetar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Mount Celestia.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The planetar has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The planetar makes three Radiant Sword attacks or uses Holy Burst twice.",
        ],
      },
      {
        name: "Radiant Sword",
        entries: [
          "{@atkr m} {@hit 12}, reach 10 ft. {@h}14 ({@damage 2d6 + 7}) Slashing damage plus 18 ({@damage 4d8}) Radiant damage.",
        ],
      },
      {
        name: "Holy Burst",
        entries: [
          "{@actSave dex} {@dc 20}, each enemy in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the planetar can see within 120 feet. {@actSaveFail} 24 ({@damage 7d6}) Radiant damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, upper"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/planetar.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["TP", "XX"],
    damageTags: ["R", "S"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedSpell: ["charisma"],
  },
];
