// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_10 = [
  {
    name: "Aboleth",
    source: "XMM",
    page: 12,
    size: ["L"],
    type: "aberration",
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 150,
      formula: "20d10 + 40",
    },
    speed: {
      walk: 10,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 21,
    dex: 9,
    con: 15,
    int: 18,
    wis: 15,
    cha: 18,
    save: {
      dex: "+3",
      con: "+6",
      int: "+8",
      wis: "+6",
    },
    skill: {
      history: "+12",
      perception: "+10",
    },
    senses: ["darkvision 120 ft."],
    passive: 20,
    languages: ["Deep Speech; telepathy 120 ft."],
    cr: {
      cr: "10",
      xpLair: 7200,
    },
    trait: [
      {
        name: "Amphibious",
        entries: ["The aboleth can breathe air and water."],
      },
      {
        name: "Eldritch Restoration",
        entries: [
          "If destroyed, the aboleth gains a new body in {@dice 5d10} days, reviving with all its {@variantrule Hit Points|XPHB} in the Far Realm or another location chosen by the DM.",
        ],
      },
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the aboleth fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Mucus Cloud",
        entries: [
          "While underwater, the aboleth is surrounded by mucus. {@actSave con} {@dc 14}, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the aboleth at the end of the aboleth's turn. {@actSaveFail} The target is cursed. Until the curse ends, the target's skin becomes slimy, the target can breathe air and water, and it can't regain {@variantrule Hit Points|XPHB} unless it is underwater.",
          "While the cursed creature is outside a body of water, the creature takes 6 ({@damage 1d12}) Acid damage at the end of every 10 minutes unless moisture is applied to its skin before those minutes have passed.",
        ],
      },
      {
        name: "Probing Telepathy",
        entries: [
          "If a creature the aboleth can see communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The aboleth makes two Tentacle attacks and uses either Consume Memories or Dominate Mind if available.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}12 ({@damage 2d6 + 5}) Bludgeoning damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of four tentacles.",
        ],
      },
      {
        name: "Consume Memories",
        entries: [
          "{@actSave int} {@dc 16}, one creature within 30 feet that is {@condition Charmed|XPHB} or {@condition Grappled|XPHB} by the aboleth. {@actSaveFail} 10 ({@damage 3d6}) Psychic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The aboleth gains the target's memories if the target is a Humanoid and is reduced to 0 {@variantrule Hit Points|XPHB} by this action.",
        ],
      },
      {
        name: "Dominate Mind (2/Day)",
        entries: [
          "{@actSave wis} {@dc 16}, one creature the aboleth can see within 30 feet. {@actSaveFail} The target has the {@condition Charmed|XPHB} condition until the aboleth dies or is on a different plane of existence from the target. While {@condition Charmed|XPHB}, the target acts as an ally to the aboleth and is under its control while within 60 feet of it. In addition, the aboleth and the target can communicate telepathically with each other over any distance.",
          "The target repeats the save whenever it takes damage as well as after every 24 hours it spends at least 1 mile away from the aboleth, ending the effect on itself on a success.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Lash",
        entries: ["The aboleth makes one Tentacle attack."],
      },
      {
        name: "Psychic Drain",
        entries: [
          "If the aboleth has at least one creature {@condition Charmed|XPHB} or {@condition Grappled|XPHB}, it uses Consume Memories and regains 5 ({@dice 1d10}) {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Aboleth",
      source: "XMM",
    },
    environment: ["underdark", "underwater"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/aboleth.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["SD"],
    actionTags: ["Multiattack", "Tentacles"],
    languageTags: ["DS", "TP"],
    damageTags: ["A", "B", "Y"],
    miscTags: ["CUR", "MA", "RCH"],
    conditionInflict: ["charmed", "grappled"],
    savingThrowForced: ["constitution", "intelligence", "wisdom"],
    savingThrowForcedLegendary: ["constitution"],
  },
  {
    name: "Cultist Hierophant",
    source: "XMM",
    page: 85,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 144,
      formula: "17d8 + 68",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 14,
    dex: 18,
    con: 18,
    int: 13,
    wis: 16,
    cha: 20,
    save: {
      wis: "+7",
      cha: "+9",
    },
    skill: {
      perception: "+7",
      persuasion: "+9",
      religion: "+5",
    },
    passive: 17,
    languages: ["Celestial", "Common"],
    cr: "10",
    gear: ["breastplate|xphb", "holy symbol|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Charisma as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: ["{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Jallarzi's Storm of Radiance|XPHB} (level 7 version)",
            "{@spell Mass Suggestion|XPHB}",
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
          "The cultist makes three attacks, using Pact Blade or Radiant Ray in any combination.",
        ],
      },
      {
        name: "Pact Blade",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 18 ({@damage 4d8}) Radiant damage.",
        ],
      },
      {
        name: "Radiant Ray",
        entries: [
          "{@atkr r} {@hit 9}, range 120 ft. {@h}31 ({@damage 4d12 + 5}) Radiant damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE"],
    damageTags: ["R", "S"],
    damageTagsSpell: ["R", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflictSpell: ["blinded", "charmed", "deafened"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Cyclops Oracle",
    source: "XMM",
    page: 88,
    size: ["H"],
    type: "giant",
    alignment: ["C", "N"],
    ac: [16],
    hp: {
      average: 207,
      formula: "18d12 + 90",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 22,
    dex: 11,
    con: 20,
    int: 16,
    wis: 18,
    cha: 10,
    save: {
      con: "+9",
      wis: "+8",
    },
    skill: {
      history: "+11",
      perception: "+12",
    },
    senses: ["truesight 30 ft."],
    passive: 22,
    languages: ["Giant"],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cyclops casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 16}):",
        ],
        daily: {
          "1": ["{@spell Legend Lore|XPHB}"],
          "2e": [
            "{@spell Arcane Eye|XPHB}",
            "{@spell Detect Magic|XPHB}",
            "{@spell Locate Object|XPHB}",
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
          "The cyclops makes three attacks, using Radiant Strike or Flash of Light in any combination.",
        ],
      },
      {
        name: "Radiant Strike",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}22 ({@damage 3d10 + 6}) Radiant damage.",
        ],
      },
      {
        name: "Flash of Light",
        entries: [
          "{@atkr r} {@hit 10}, range 120 ft. {@h}17 ({@damage 2d10 + 6}) Radiant damage, and the target has {@variantrule Disadvantage|XPHB} on attack rolls until the end of the cyclops's next turn.",
        ],
      },
    ],
    reaction: [
      {
        name: "Portent {@recharge 4}",
        entries: [
          "{@actTrigger} The cyclops or an ally it can see makes a {@variantrule D20 Test|XPHB}. {@actResponse} The cyclops rolls {@dice 1d20} and chooses whether to use that roll in place of the {@dice d20} rolled for the {@variantrule D20 Test|XPHB}.",
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
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
  },
  {
    name: "Death Slaad",
    source: "XMM",
    page: 287,
    size: ["M"],
    type: "aberration",
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 178,
      formula: "21d8 + 84",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 20,
    dex: 15,
    con: 19,
    int: 15,
    wis: 10,
    cha: 19,
    skill: {
      arcana: "+6",
      perception: "+8",
    },
    senses: ["blindsight 60 ft.", "darkvision 60 ft."],
    passive: 18,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["Common", "Slaad; telepathy 60 ft."],
    cr: "10",
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
            "{@spell Blight|XPHB} (level 8 version)",
            "{@spell Cloudkill|XPHB} (level 6 version)",
            "{@spell Fly|XPHB}",
            "{@spell Plane Shift|XPHB}",
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
        entries: ["The slaad makes two Chaos Blade attacks."],
      },
      {
        name: "Chaos Blade",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}11 ({@damage 1d12 + 5}) Slashing damage plus 10 ({@damage 3d6}) Necrotic damage. Until the start of the slaad's next turn, the target has a condition determined by rolling {@dice 1d4}: on a 1, {@condition Charmed|XPHB}; on a 2, {@condition Frightened|XPHB}; on a 3, {@condition Poisoned|XPHB}; or on a 4, {@condition Incapacitated|XPHB}.",
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
      path: "bestiary/death-slaad.mp3",
    },
    traitTags: ["Magic Resistance", "Regeneration"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "OTH", "TP"],
    damageTags: ["N", "S"],
    damageTagsSpell: ["I", "N"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Deva",
    group: ["Angels"],
    source: "XMM",
    page: 97,
    size: ["M"],
    type: {
      type: "celestial",
      tags: ["angel"],
    },
    alignment: ["L", "G"],
    ac: [17],
    hp: {
      average: 229,
      formula: "27d8 + 108",
    },
    speed: {
      walk: 30,
      fly: {
        number: 90,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 18,
    dex: 18,
    con: 18,
    int: 17,
    wis: 20,
    cha: 20,
    save: {
      wis: "+9",
      cha: "+9",
    },
    skill: {
      insight: "+9",
      perception: "+9",
    },
    senses: ["darkvision 120 ft."],
    passive: 19,
    resist: ["radiant"],
    conditionImmune: ["charmed", "exhaustion", "frightened"],
    languages: ["all; telepathy 120 ft."],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The deva casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": ["{@spell Commune|XPHB}", "{@spell Raise Dead|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Divine Aid (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The deva casts {@spell Cure Wounds|XPHB}, {@spell Lesser Restoration|XPHB}, or {@spell Remove Curse|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": [
            "{@spell Cure Wounds|XPHB}",
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
        name: "Exalted Restoration",
        entries: [
          "If the deva dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Mount Celestia.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The deva has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The deva makes two Holy Mace attacks."],
      },
      {
        name: "Holy Mace",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Bludgeoning damage plus 18 ({@damage 4d8}) Radiant damage.",
        ],
      },
    ],
    environment: ["planar, upper"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/deva.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["TP", "XX"],
    damageTags: ["B", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW"],
  },
  {
    name: "Dire Worg",
    source: "XMM",
    page: 335,
    size: ["H"],
    type: "fey",
    alignment: ["N", "E"],
    ac: [16],
    hp: {
      average: 147,
      formula: "14d12 + 56",
    },
    speed: {
      walk: 50,
    },
    str: 22,
    dex: 14,
    con: 18,
    int: 7,
    wis: 16,
    cha: 8,
    save: {
      dex: "+6",
      wis: "+7",
    },
    skill: {
      perception: "+11",
    },
    senses: ["darkvision 120 ft."],
    passive: 21,
    languages: ["Goblin", "Sylvan", "Worg"],
    cr: "10",
    trait: [
      {
        name: "Magic Resistance",
        entries: [
          "The worg has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The worg makes three Bite attacks."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}15 ({@damage 2d8 + 6}) Piercing damage plus 7 ({@damage 2d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the worg's next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Dreadful Howl {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 16}, each creature within 30 feet that isn't a worg. {@actSaveFail} 36 ({@damage 8d8}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the start of the worg's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Warp Step",
        entries: [
          "The worg teleports, along with a willing creature of its choice within 5 feet of it, up to 30 feet to an unoccupied space it can see.",
        ],
      },
    ],
    environment: ["forest", "grassland", "hill", "planar, feywild"],
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["GO", "OTH", "S"],
    damageTags: ["I", "P", "Y"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["frightened", "poisoned"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Guardian Naga",
    source: "XMM",
    page: 161,
    size: ["L"],
    type: "celestial",
    alignment: ["L", "G"],
    ac: [18],
    hp: {
      average: 136,
      formula: "16d10 + 48",
    },
    speed: {
      walk: 40,
      climb: 40,
      swim: 40,
    },
    str: 19,
    dex: 18,
    con: 16,
    int: 16,
    wis: 19,
    cha: 18,
    save: {
      dex: "+8",
      con: "+7",
      int: "+7",
      wis: "+8",
      cha: "+8",
    },
    skill: {
      arcana: "+11",
      history: "+11",
      religion: "+11",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    immune: ["poison"],
    conditionImmune: ["charmed", "paralyzed", "poisoned", "restrained"],
    languages: ["Celestial", "Common"],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The naga casts one of the following spells, requiring no Somatic or Material components and using Wisdom as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: ["{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Clairvoyance|XPHB}",
            "{@spell Cure Wounds|XPHB} (level 6 version)",
            "{@spell Flame Strike|XPHB} (level 6 version)",
            "{@spell Geas|XPHB}",
            "{@spell True Seeing|XPHB}",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Celestial Restoration",
        entries: [
          "If the naga dies, it returns to life in {@dice 1d6} days and regains all its {@variantrule Hit Points|XPHB} unless {@spell Dispel Evil and Good|XPHB} is cast on its remains.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The naga makes two Bite attacks. It can replace any attack with a use of Poisonous Spittle.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}17 ({@damage 2d12 + 4}) Piercing damage plus 22 ({@damage 4d10}) Poison damage.",
        ],
      },
      {
        name: "Poisonous Spittle",
        entries: [
          "{@actSave con} {@dc 16}, one creature the naga can see within 60 feet. {@actSaveFail} 31 ({@damage 7d8}) Poison damage, and the target has the {@condition Blinded|XPHB} condition until the start of the naga's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["desert", "forest", "planar, upper"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/guardian-naga.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE"],
    damageTags: ["I", "P"],
    damageTagsSpell: ["F", "R", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["blinded"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["constitution"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Haunting Revenant",
    source: "XMM",
    page: 260,
    size: ["G"],
    type: "undead",
    alignment: ["N"],
    ac: [20],
    hp: {
      average: 203,
      formula: "14d20 + 56",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 12,
    con: 18,
    int: 16,
    wis: 18,
    cha: 20,
    save: {
      con: "+8",
      wis: "+8",
    },
    senses: ["truesight 60 ft."],
    passive: 14,
    resist: ["necrotic", "psychic"],
    immune: ["poison"],
    conditionImmune: [
      "charmed",
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
    languages: ["Common plus two other languages"],
    cr: "10",
    trait: [
      {
        name: "Haunted Zone",
        entries: [
          "{@actSave con} {@dc 17}, any creature that casts a spell while inside the revenant's space. {@actSaveFail} The spell fails and is wasted.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If the revenant dies, it revives 24 hours later unless {@spell Dispel Evil and Good|XPHB} is cast on its remains. If it revives, it animates another Gargantuan object or structure elsewhere on the same plane of existence; it now looks different but uses the same stat block and returns with all its {@variantrule Hit Points|XPHB}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The revenant makes two {@variantrule Object|XPHB} Slam attacks and uses Invitation.",
        ],
      },
      {
        name: "Object Slam",
        entries: [
          "{@atkr m,r} {@hit 9} (with {@variantrule Advantage|XPHB} if the target is inside the revenant's space), reach 10 ft. or range 30/90 ft. {@h}27 ({@damage 5d8 + 5}) Bludgeoning damage.",
        ],
      },
      {
        name: "Invitation",
        entries: [
          "{@actSave cha} {@dc 17}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target is teleported inside the revenant's space and swallowed. A swallowed creature has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the revenant.",
          "While the revenant has {@variantrule Hit Points|XPHB}, a swallowed creature can leave the revenant's space only by using magic that enables planar travel, such as the {@spell Plane Shift|XPHB} spell.",
        ],
      },
    ],
    environment: ["forest", "swamp", "urban"],
    treasure: ["any"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Swallow"],
    languageTags: ["C", "X"],
    damageTags: ["B"],
    miscTags: ["MA", "RA", "RCH"],
    savingThrowForced: ["charisma", "constitution"],
  },
  {
    name: "Noble Prodigy",
    source: "XMM",
    page: 227,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 148,
      formula: "27d8 + 27",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 8,
    dex: 16,
    con: 12,
    int: 15,
    wis: 14,
    cha: 19,
    save: {
      dex: "+7",
      con: "+5",
      wis: "+6",
      cha: "+8",
    },
    skill: {
      perception: "+6",
      persuasion: "+8",
    },
    passive: 16,
    languages: ["Common plus two other languages"],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The noble casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Mage Armor|XPHB} (included in AC)",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Befuddlement|XPHB}",
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Fly|XPHB}",
            "{@spell Scrying|XPHB}",
            "{@spell Shatter|XPHB} (level 7 version)",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Shield (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The noble casts {@spell Shield|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Shield|XPHB}"],
        },
        ability: "cha",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The noble makes three Beguiling Strike attacks."],
      },
      {
        name: "Beguiling Strike",
        entries: [
          "{@atkr m,r} {@hit 8}, reach 5 ft. or range 60 ft. {@h}18 ({@damage 4d6 + 4}) Psychic damage, and the target has the {@condition Charmed|XPHB} condition until the start of the noble's next turn.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["Y"],
    damageTagsSpell: ["T", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["charmed"],
    savingThrowForcedSpell: ["constitution", "intelligence", "wisdom"],
  },
  {
    name: "Performer Legend",
    source: "XMM",
    page: 237,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [20],
    hp: {
      average: 162,
      formula: "25d8 + 50",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 12,
    dex: 20,
    con: 14,
    int: 15,
    wis: 16,
    cha: 20,
    save: {
      dex: "+9",
      int: "+6",
      wis: "+7",
      cha: "+9",
    },
    skill: {
      acrobatics: "+13",
      athletics: "+5",
      perception: "+7",
      performance: "+13",
      stealth: "+9",
    },
    passive: 17,
    languages: ["Common plus two other languages"],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The performer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "1e": ["{@spell Major Image|XPHB}", "{@spell Project Image|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The performer makes three Bejeweled Baton attacks."],
      },
      {
        name: "Bejeweled Baton",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}10 ({@damage 2d4 + 5}) Bludgeoning damage plus 10 ({@damage 3d6}) Psychic damage.",
        ],
      },
      {
        name: "Majestic Song",
        entries: [
          "{@actSave wis} {@dc 17}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within 120 feet. {@actSaveFail} 22 ({@damage 4d8 + 4}) Psychic damage, and the target has the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition (performer's choice) until the end of the performer's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    reaction: [
      {
        name: "Warding Charm",
        entries: [
          "{@actTrigger} A creature hits the performer with an attack roll. {@actResponse d}{@actSave wis} {@dc 17}, the triggering creature. {@actSaveFail} The attack roll misses the performer, and the target has the {@condition Charmed|XPHB} condition until the end of the performer's next turn.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["B", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["charmed"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Spy Master",
    source: "XMM",
    page: 295,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [19],
    hp: {
      average: 137,
      formula: "25d8 + 25",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 20,
    con: 12,
    int: 18,
    wis: 16,
    cha: 16,
    save: {
      dex: "+9",
      con: "+5",
      int: "+8",
      wis: "+7",
    },
    skill: {
      deception: "+7",
      insight: "+7",
      investigation: "+8",
      perception: "+11",
      "sleight of hand": "+9",
      stealth: "+13",
    },
    passive: 21,
    languages: ["Common plus two other languages"],
    cr: "10",
    gear: ["hand crossbow|xphb", "rapier|xphb", "thieves' tools|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The spy makes three attacks, using Rapier or Hand Crossbow in any combination.",
        ],
      },
      {
        name: "Rapier",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}14 ({@damage 2d8 + 5}) Piercing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Hand Crossbow",
        entries: [
          "{@atkr r} {@hit 9}, range 30/120 ft. {@h}12 ({@damage 2d6 + 5}) Piercing damage plus 9 ({@damage 2d8}) Poison damage.",
        ],
      },
      {
        name: "Smoke Bomb (1/Day)",
        entries: [
          "The spy throws a bomb to a point it can see within 30 feet of itself. {@actSave con} {@dc 16}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point. {@actSaveFail} 28 ({@damage 8d6}) Poison damage, and the target has the {@condition Blinded|XPHB} condition until the end of the spy's next turn. {@actSaveSuccess} Half damage only.",
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
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["I", "P"],
    miscTags: ["AOE", "MA", "MLW", "RA", "RNG"],
    conditionInflict: ["blinded"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Stone Golem",
    source: "XMM",
    page: 301,
    otherSources: [
      {
        source: "ScoEE",
      },
    ],
    size: ["L"],
    type: "construct",
    alignment: ["U"],
    ac: [18],
    hp: {
      average: 220,
      formula: "21d10 + 105",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 22,
    dex: 9,
    con: 20,
    int: 3,
    wis: 11,
    cha: 1,
    senses: ["darkvision 120 ft."],
    passive: 10,
    immune: ["poison", "psychic"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
    ],
    languages: ["understands Common plus two other languages but can't speak"],
    cr: "10",
    spellcasting: [
      {
        name: "Slow {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The golem casts the {@spell Slow|XPHB} spell, requiring no spell components and using Constitution as the spellcasting ability (spell save {@dc 17}).",
        ],
        recharge: {
          "5": ["{@spell Slow|XPHB}"],
        },
        ability: "con",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
    ],
    trait: [
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
          "The golem makes two attacks, using Slam or Force Bolt in any combination.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}15 ({@damage 2d8 + 6}) Bludgeoning damage plus 9 ({@damage 2d8}) Force damage.",
        ],
      },
      {
        name: "Force Bolt",
        entries: [
          "{@atkr r} {@hit 9}, range 120 ft. {@h}22 ({@damage 4d10}) Force damage.",
        ],
      },
    ],
    environment: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/stone-golem.mp3",
    },
    traitTags: ["Immutable Form", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CS", "X"],
    damageTags: ["B", "O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Warrior Commander",
    source: "XMM",
    page: 321,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [18],
    hp: {
      average: 161,
      formula: "19d8 + 76",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 20,
    con: 18,
    int: 14,
    wis: 16,
    cha: 14,
    save: {
      str: "+9",
      dex: "+9",
      con: "+8",
      wis: "+7",
    },
    skill: {
      athletics: "+9",
      insight: "+7",
      perception: "+7",
    },
    passive: 17,
    languages: ["Common plus one other language"],
    cr: "10",
    gear: ["greatsword|xphb", "longbow|xphb", "plate armor|xphb"],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The warrior makes three attacks, using Greatsword or Longbow in any combination.",
        ],
      },
      {
        name: "Greatsword",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}19 ({@damage 4d6 + 5}) Slashing damage. The warrior also creates one of the following effects:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Sap",
                entries: [
                  "The target has {@variantrule Disadvantage|XPHB} on its next attack roll before the start of the warrior's next turn.",
                ],
              },
              {
                type: "item",
                name: "Maneuver",
                entries: [
                  "One ally who can see or hear the warrior can take a {@variantrule Reaction|XPHB} to move up to half the ally's {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Longbow",
        entries: [
          "{@atkr r} {@hit 9}, range 150/600 ft. {@h}18 ({@damage 3d8 + 5}) Piercing damage, and the target's {@variantrule Speed|XPHB} decreases by 10 feet until the end of the target's next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Tactical Charge",
        entries: [
          "The warrior moves up to half its {@variantrule Speed|XPHB} straight toward an enemy it can see without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
        ],
      },
    ],
    reaction: [
      {
        name: "Counterattack",
        entries: [
          "{@actTrigger} The warrior is hit by an attack roll. {@actResponse} The warrior adds 4 to its AC against that attack, possibly causing it to miss. On a miss, the warrior can make one Greatsword or Longbow attack against the attacker.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["P", "S"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
  },
  {
    name: "Yochlol",
    group: ["Demons"],
    source: "XMM",
    page: 341,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [15],
    hp: {
      average: 153,
      formula: "18d8 + 72",
    },
    speed: {
      walk: 30,
      climb: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 15,
    dex: 19,
    con: 18,
    int: 13,
    wis: 15,
    cha: 17,
    save: {
      dex: "+8",
      int: "+5",
      wis: "+6",
      cha: "+7",
    },
    skill: {
      deception: "+11",
      insight: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 12,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal", "Elvish", "Undercommon"],
    cr: "10",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The yochlol casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: [
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Gaseous Form|XPHB} (self only)",
          "{@spell Web|XPHB}",
        ],
        daily: {
          "1": ["{@spell Dominate Person|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the yochlol dies outside the Abyss, its body dissolves, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The yochlol has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The yochlol can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
        ],
      },
      {
        name: "Web Walker",
        entries: ["The yochlol ignores movement restrictions caused by webs."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The yochlol makes two Caustic Lash attacks, and it can use Spellcasting to cast {@spell Web|XPHB} or {@spell Dominate Person|XPHB} if available.",
        ],
      },
      {
        name: "Caustic Lash",
        entries: [
          "{@atkr m,r} {@hit 8}, reach 10 ft. or range 120 ft. {@h}25 ({@damage 6d6 + 4}) Acid damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The yochlol shape-shifts into a Medium Humanoid or a Medium spider or back into its true form. Its game statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    reaction: [
      {
        name: "Toxic Escape",
        entries: [
          "{@actTrigger} The yochlol is hit by an attack roll. {@actResponse} The yochlol halves the attack's damage to itself (round down), and it teleports to an unoccupied space it can see within 30 feet of itself. {@actSave con} {@dc 15}, each creature within 5 feet of the yochlol's destination space. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the end of its next turn. While {@condition Poisoned|XPHB}, it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    soundClip: {
      type: "internal",
      path: "bestiary/yochlol.mp3",
    },
    traitTags: ["Magic Resistance", "Spider Climb", "Web Walker"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "E", "U"],
    damageTags: ["A"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA", "RCH"],
    conditionInflict: ["incapacitated", "poisoned"],
    conditionInflictSpell: ["charmed", "restrained"],
    savingThrowForced: ["constitution"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Young Gold Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 144,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [18],
    hp: {
      average: 178,
      formula: "17d10 + 85",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 14,
    con: 21,
    int: 16,
    wis: 13,
    cha: 20,
    save: {
      dex: "+6",
      wis: "+5",
    },
    skill: {
      insight: "+5",
      perception: "+9",
      persuasion: "+9",
      stealth: "+6",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 19,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: "10",
    trait: [
      {
        name: "Amphibious",
        entries: ["The dragon can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of Weakening Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}17 ({@damage 2d10 + 6}) Slashing damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 17}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 55 ({@damage 10d10}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Weakening Breath",
        entries: [
          "{@actSave str} {@dc 17}, each creature that isn't currently affected by this breath in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} and subtracts 3 ({@dice 1d6}) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    environment: ["forest", "grassland"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/gold-dragon.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Young Red Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 254,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 178,
      formula: "17d10 + 85",
    },
    speed: {
      walk: 40,
      climb: 40,
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
      perception: "+8",
      stealth: "+4",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 18,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: "10",
    action: [
      {
        name: "Multiattack",
        entries: ["The dragon makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}13 ({@damage 2d6 + 6}) Slashing damage plus 3 ({@damage 1d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 17}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 56 ({@damage 16d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["hill", "mountain"],
    treasure: ["any"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/red-dragon.mp3",
    },
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
];
