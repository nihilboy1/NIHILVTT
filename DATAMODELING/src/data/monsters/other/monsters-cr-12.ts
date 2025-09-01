// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_12 = [
  {
    name: "Arcanaloth",
    group: ["Yugoloths"],
    source: "XMM",
    page: 19,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["yugoloth"],
    },
    alignment: ["N", "E"],
    ac: [18],
    hp: {
      average: 175,
      formula: "27d8 + 54",
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
    str: 17,
    dex: 12,
    con: 14,
    int: 20,
    wis: 16,
    cha: 17,
    save: {
      dex: "+5",
      con: "+6",
      int: "+9",
      wis: "+7",
    },
    skill: {
      arcana: "+9",
      deception: "+7",
      insight: "+7",
      perception: "+7",
    },
    senses: ["truesight 120 ft."],
    passive: 17,
    resist: ["cold", "fire", "lightning"],
    immune: ["acid", "poison"],
    conditionImmune: ["charmed", "poisoned"],
    languages: ["all; telepathy 120 ft."],
    cr: "12",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The arcanaloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Alter Self|XPHB}",
          "{@spell Detect Magic|XPHB}",
          "{@spell Identify|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Contact Other Plane|XPHB}",
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Dimension Door|XPHB}",
            "{@spell Mind Blank|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Counterspell",
        type: "spellcasting",
        headerEntries: [
          "The arcanaloth casts {@spell Counterspell|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Counterspell|XPHB}"],
        ability: "int",
        displayAs: "reaction",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Fiendish Restoration",
        entries: [
          "If the arcanaloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly and revives with all its {@variantrule Hit Points|XPHB} in Gehenna.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The arcanaloth has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Soul Tome",
        entries: [
          "The arcanaloth has a magic tome. While holding or carrying the tome, the arcanaloth can use its Banishing Claw action.",
          "The tome has AC 17; HP 35; and {@variantrule Immunity|XPHB} to Necrotic, Poison, and Psychic damage. The tome regains all its {@variantrule Hit Points|XPHB} at the end of every turn, but it turns to dust if reduced to 0 {@variantrule Hit Points|XPHB} or when the arcanaloth dies. If the tome is destroyed, the arcanaloth can create a new one when it finishes a {@variantrule Short Rest|XPHB|Short} or {@variantrule Long Rest|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The arcanaloth makes three Fiendish Burst attacks. It can replace one attack with a Banishing Claw attack.",
        ],
      },
      {
        name: "Fiendish Burst",
        entries: [
          "{@atkr m,r} {@hit 9}, reach 5 ft. or range 120 ft. {@h}31 ({@damage 4d12 + 5}) Necrotic damage.",
        ],
      },
      {
        name: "Banishing Claw (Requires Soul Tome)",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}10 ({@damage 2d4 + 5}) Slashing damage plus 19 ({@damage 3d12}) Psychic damage. If the target is a creature, it is subjected to the following effect. {@actSave cha} {@dc 17}. {@actSaveFail} The target is trapped in a demiplane inside the Soul Tome. While trapped there, the target has the {@condition Incapacitated|XPHB} condition. At the end of each of its turns, the target repeats the save, escaping the tome on a success. When the target escapes, it appears in the space it left or, if that space is occupied, the nearest unoccupied space.",
          "If the target fails three of these saves while in the demiplane, it becomes bound to the tome and can escape only if the tome is reduced to 0 {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    bonus: [
      {
        name: "Teleport",
        entries: [
          "The arcanaloth teleports up to 30 feet to an unoccupied space it can see.",
        ],
      },
    ],
    environment: ["planar, lower"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/arcanaloth.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Teleport"],
    languageTags: ["TP", "XX"],
    damageTags: ["N", "S", "Y"],
    damageTagsSpell: ["B", "O", "P", "S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["incapacitated"],
    savingThrowForced: ["charisma"],
    savingThrowForcedSpell: ["constitution", "intelligence", "wisdom"],
  },
  {
    name: "Archmage",
    source: "XMM",
    page: 199,
    size: ["S", "M"],
    type: {
      type: "humanoid",
      tags: ["wizard"],
    },
    alignment: ["N"],
    ac: [17],
    hp: {
      average: 170,
      formula: "31d8 + 31",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 14,
    con: 12,
    int: 20,
    wis: 15,
    cha: 16,
    save: {
      int: "+9",
      wis: "+6",
    },
    skill: {
      arcana: "+13",
      history: "+9",
      perception: "+6",
    },
    passive: 16,
    immune: ["psychic"],
    conditionImmune: [
      {
        conditionImmune: ["charmed"],
        note: "(with Mind Blank)",
        cond: true,
      },
    ],
    languages: ["Common plus five other languages"],
    cr: "12",
    gear: ["wand|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The archmage casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Disguise Self|XPHB}",
          "{@spell Invisibility|XPHB}",
          "{@spell Light|XPHB}",
          "{@spell Mage Armor|XPHB} (included in AC)",
          "{@spell Mage Hand|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Fly|XPHB}",
            "{@spell Lightning Bolt|XPHB} (level 7 version)",
          ],
          "1e": [
            "{@spell Cone of Cold|XPHB} (level 9 version)",
            "{@spell Mind Blank|XPHB} (cast before combat)",
            "{@spell Scrying|XPHB}",
            "{@spell Teleport|XPHB}",
          ],
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
          "The archmage casts {@spell Counterspell|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": ["{@spell Counterspell|XPHB}", "{@spell Shield|XPHB}"],
        },
        ability: "int",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The archmage has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The archmage makes four Arcane Burst attacks."],
      },
      {
        name: "Arcane Burst",
        entries: [
          "{@atkr m,r} {@hit 9}, reach 5 ft. or range 150 ft. {@h}27 ({@damage 4d10 + 5}) Force damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["arcana", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/archmage.mp3",
    },
    traitTags: ["Magic Resistance"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["O"],
    damageTagsSpell: ["C", "L", "O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["constitution", "dexterity", "wisdom"],
  },
  {
    name: "Archpriest",
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
    ac: [16],
    hp: {
      average: 240,
      formula: "32d8 + 96",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 12,
    con: 17,
    int: 14,
    wis: 21,
    cha: 14,
    save: {
      str: "+7",
      con: "+7",
      int: "+6",
      wis: "+9",
    },
    skill: {
      insight: "+9",
      medicine: "+9",
      perception: "+9",
      religion: "+10",
    },
    passive: 19,
    languages: ["Common plus two other languages"],
    cr: "12",
    gear: ["chain mail|xphb", "holy symbol|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The archpriest casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: ["{@spell Light|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Flame Strike|XPHB} (level 6 version)",
            "{@spell Greater Restoration|XPHB}",
            "{@spell Raise Dead|XPHB}",
            "{@spell Zone of Truth|XPHB}",
          ],
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
        entries: ["The archpriest makes three Radiant Burst attacks."],
      },
      {
        name: "Radiant Burst",
        entries: [
          "{@atkr m,r} {@hit 9}, reach 5 ft. or range 60 ft. {@h}27 ({@damage 4d10 + 5}) Radiant damage.",
        ],
      },
      {
        name: "Holy Word {@recharge 4}",
        entries: [
          "{@actSave wis} {@dc 17}, each enemy in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the archpriest. {@actSaveFail} 21 ({@damage 6d6}) Radiant damage, and the target has the {@condition Stunned|XPHB} condition until the end of the archpriest's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["R"],
    damageTagsSpell: ["F", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["stunned"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["charisma", "dexterity"],
  },
  {
    name: "Erinyes",
    group: ["Devils"],
    source: "XMM",
    page: 114,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 178,
      formula: "21d8 + 84",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 16,
    con: 18,
    int: 14,
    wis: 14,
    cha: 18,
    save: {
      dex: "+7",
      con: "+8",
      cha: "+8",
    },
    skill: {
      perception: "+6",
      persuasion: "+8",
    },
    senses: ["truesight 120 ft."],
    passive: 16,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "12",
    trait: [
      {
        name: "Diabolical Restoration",
        entries: [
          "If the erinyes dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Nine Hells.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The erinyes has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Magic Rope",
        entries: [
          "The erinyes has a magic rope. While bearing it, the erinyes can use the Entangling Rope action. The rope has AC 20, HP 90, and {@variantrule Immunity|XPHB} to Poison and Psychic damage. The rope turns to dust if reduced to 0 {@variantrule Hit Points|XPHB}, if it is 5+ feet away from the erinyes for 1 hour or more, or if the erinyes dies. If the rope is damaged or destroyed, the erinyes can fully restore it when finishing a {@variantrule Short Rest|XPHB|Short} or {@variantrule Long Rest|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The erinyes makes three Withering Sword attacks and can use Entangling Rope.",
        ],
      },
      {
        name: "Withering Sword",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Slashing damage plus 11 ({@damage 2d10}) Necrotic damage.",
        ],
      },
      {
        name: "Entangling Rope (Requires Magic Rope)",
        entries: [
          "{@actSave str} {@dc 16}, one creature the erinyes can see within 120 feet. {@actSaveFail} 14 ({@damage 4d6}) Force damage, and the target has the {@condition Restrained|XPHB} condition until the rope is destroyed, the erinyes uses a {@variantrule Bonus Action|XPHB} to release the target, or the erinyes uses Entangling Rope again.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The erinyes is hit by a melee attack roll while holding a weapon. {@actResponse} The erinyes adds 4 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/erinyes.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["I", "TP"],
    damageTags: ["N", "O", "S"],
    miscTags: ["MA"],
    conditionInflict: ["restrained"],
    savingThrowForced: ["strength"],
  },
  {
    name: "Githzerai Psion",
    source: "XMM",
    page: 137,
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "N"],
    ac: [18],
    hp: {
      average: 169,
      formula: "26d8 + 52",
    },
    speed: {
      walk: 40,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 18,
    con: 15,
    int: 19,
    wis: 18,
    cha: 14,
    save: {
      str: "+5",
      dex: "+8",
      int: "+8",
      wis: "+8",
    },
    skill: {
      arcana: "+8",
      insight: "+8",
      perception: "+8",
    },
    passive: 18,
    languages: ["Common", "Gith"],
    cr: "12",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "1e": ["{@spell Plane Shift|XPHB}", "{@spell See Invisibility|XPHB}"],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Psionic Defense",
        type: "spellcasting",
        headerEntries: [
          "The githzerai casts {@spell Feather Fall|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, requiring no spell components and using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Feather Fall|XPHB}", "{@spell Shield|XPHB}"],
        ability: "int",
        displayAs: "reaction",
        hidden: ["will"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The githzerai makes three Psychic Warp attacks."],
      },
      {
        name: "Psychic Warp",
        entries: [
          "{@atkr m,r} {@hit 8}, reach 5 ft. or range 120 ft. {@h}26 ({@damage 4d10 + 4}) Psychic damage, and the target has the githzerai's choice of (A) the {@condition Charmed|XPHB} condition until the start of the githzerai's next turn or (B) the {@condition Prone|XPHB} condition, provided the target is a Large or smaller creature.",
        ],
      },
    ],
    environment: ["planar, limbo"],
    treasure: ["arcana", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GTH"],
    damageTags: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
  },
  {
    name: "Pirate Admiral",
    source: "XMM",
    page: 242,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [20],
    hp: {
      average: 182,
      formula: "28d8 + 56",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 14,
    dex: 22,
    con: 14,
    int: 12,
    wis: 14,
    cha: 19,
    save: {
      str: "+6",
      dex: "+10",
      wis: "+6",
      cha: "+8",
    },
    skill: {
      acrobatics: "+10",
      athletics: "+6",
      perception: "+6",
    },
    passive: 16,
    languages: ["Common plus one other language"],
    cr: "12",
    gear: ["pistol|xphb", "scimitar|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The pirate makes three attacks, using Scimitar or Pistol in any combination.",
        ],
      },
      {
        name: "Scimitar",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}16 ({@damage 3d6 + 6}) Slashing damage plus 7 ({@damage 2d6}) Poison damage, and the target suffers one of the following effects of the pirate's choice:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Awestruck",
                entries: [
                  "The target has the {@condition Charmed|XPHB} condition until the start of the pirate's next turn.",
                ],
              },
              {
                type: "item",
                name: "Poison",
                entries: [
                  "The target has the {@condition Poisoned|XPHB} condition until the start of the pirate's next turn.",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Pistol",
        entries: [
          "{@atkr r} {@hit 10}, range 30/90 ft. {@h}28 ({@damage 4d10 + 6}) Piercing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rally (1/Day)",
        entries: [
          "The pirate chooses up to three other creatures it can see within 30 feet. Until the start of the pirate's next turn, the targets have {@variantrule Advantage|XPHB} on attack rolls and saving throws.",
        ],
      },
    ],
    reaction: [
      {
        name: "Defensive Stance",
        entries: [
          "{@actTrigger} The pirate is hit by a melee attack roll while holding a weapon. {@actResponse} The pirate adds 4 to its AC against melee attack rolls (including the triggering attack) until the start of its next turn, possibly causing the attacks to miss.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["I", "P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
    conditionInflict: ["charmed", "poisoned"],
  },
  {
    name: "Questing Knight",
    source: "XMM",
    page: 184,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 202,
      formula: "27d8 + 81",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 16,
    con: 16,
    int: 11,
    wis: 12,
    cha: 18,
    save: {
      str: "+9",
      con: "+7",
      wis: "+5",
      cha: "+8",
    },
    skill: {
      athletics: "+9",
      perception: "+5",
      persuasion: "+8",
    },
    passive: 15,
    conditionImmune: ["charmed", "frightened"],
    languages: ["Common plus one other language"],
    cr: "12",
    gear: ["greatsword|xphb", "longbow|xphb", "plate armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The knight casts one of the following spells, using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        daily: {
          "1e": [
            "{@spell Daylight|XPHB}",
            "{@spell Dispel Evil and Good|XPHB}",
            "{@spell Greater Restoration|XPHB}",
            "{@spell Phantom Steed|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Aura of Bravery",
        entries: [
          "Creatures of the knight's choice in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from it have {@variantrule Immunity|XPHB} to the {@condition Charmed|XPHB} and {@condition Frightened|XPHB} conditions while there.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The knight makes three attacks, using Greatsword or Longbow in any combination.",
        ],
      },
      {
        name: "Greatsword",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 22 ({@damage 5d8}) Radiant damage.",
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 7}, range 150/600 ft. {@h}12 ({@damage 2d8 + 3}) Piercing damage plus 22 ({@damage 5d8}) Radiant damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P", "R", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
    savingThrowForcedSpell: ["charisma"],
  },
];
