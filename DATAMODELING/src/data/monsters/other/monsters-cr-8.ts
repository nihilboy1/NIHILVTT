// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_8 = [
  {
    name: "Aberrant Cultist",
    source: "XMM",
    page: 86,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N", "E"],
    ac: [14],
    hp: {
      average: 137,
      formula: "25d8 + 25",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 10,
    dex: 19,
    con: 12,
    int: 16,
    wis: 18,
    cha: 15,
    save: {
      int: "+6",
      wis: "+7",
    },
    skill: {
      arcana: "+6",
      perception: "+7",
      religion: "+6",
    },
    senses: ["darkvision 90 ft."],
    passive: 17,
    languages: ["Common", "Deep Speech; telepathy 30 ft."],
    cr: "8",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Detect Thoughts|XPHB}", "{@spell Minor Illusion|XPHB}"],
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Counterspell (2/Day)",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts {@spell Counterspell|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "2": ["{@spell Counterspell|XPHB}"],
        },
        ability: "wis",
        displayAs: "reaction",
        hidden: ["daily"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cultist makes two Tentacle Lash attacks. It can replace any attack with a use of Mind Rot.",
        ],
      },
      {
        name: "Tentacle Lash",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}7 ({@damage 1d6 + 4}) Slashing damage plus 14 ({@damage 4d6}) Psychic damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of two tentacles, and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Mind Rot",
        entries: [
          "{@actSave wis} {@dc 15}, one creature the cultist can see within 90 feet. {@actSaveFail} 27 ({@damage 6d8}) Psychic damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the cultist's next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "DS", "TP"],
    damageTags: ["S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "poisoned", "restrained"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Assassin",
    source: "XMM",
    page: 22,
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
      average: 97,
      formula: "15d8 + 30",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 11,
    dex: 18,
    con: 14,
    int: 16,
    wis: 11,
    cha: 10,
    save: {
      dex: "+7",
      int: "+6",
    },
    skill: {
      acrobatics: "+7",
      perception: "+6",
      stealth: "+10",
    },
    passive: 16,
    resist: ["poison"],
    languages: ["Common", "Thieves' cant"],
    cr: "8",
    gear: [
      "light crossbow|xphb",
      "shortsword|xphb",
      "studded leather armor|xphb",
    ],
    trait: [
      {
        name: "Evasion",
        entries: [
          "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The assassin makes three attacks, using Shortsword or Light Crossbow in any combination.",
        ],
      },
      {
        name: "Shortsword",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Piercing damage plus 17 ({@damage 5d6}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the assassin's next turn.",
        ],
      },
      {
        name: "Light Crossbow",
        entries: [
          "{@atkr r} {@hit 7}, range 80/320 ft. {@h}8 ({@damage 1d8 + 4}) Piercing damage plus 21 ({@damage 6d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Cunning Action",
        entries: ["The assassin takes the Dash, Disengage, or Hide action."],
      },
    ],
    environment: ["any"],
    treasure: ["implements", "individual"],
    soundClip: {
      type: "internal",
      path: "bestiary/assassin.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "TC"],
    damageTags: ["I", "P"],
    miscTags: ["MA", "MLW", "RA", "RNG"],
    conditionInflict: ["incapacitated", "poisoned"],
  },
  {
    name: "Berserker Commander",
    source: "XMM",
    page: 37,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 136,
      formula: "16d8 + 64",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 14,
    con: 19,
    int: 10,
    wis: 14,
    cha: 9,
    save: {
      str: "+7",
      con: "+7",
    },
    skill: {
      athletics: "+7",
      perception: "+5",
    },
    passive: 15,
    conditionImmune: ["charmed", "frightened"],
    languages: ["Common"],
    cr: "8",
    gear: [
      "greataxe|xphb",
      {
        item: "javelin|xphb",
        quantity: 6,
      },
    ],
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
        name: "Multiattack",
        entries: [
          "The berserker makes three attacks, using Greataxe or Javelin in any combination.",
        ],
      },
      {
        name: "Greataxe",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}10 ({@damage 1d12 + 4}) Slashing damage, plus 10 ({@damage 3d6}) Thunder damage to the target or another creature within 5 feet of the target.",
        ],
      },
      {
        name: "Javelin",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 5 ft. or range 30/120 ft. {@h}18 ({@damage 4d6 + 4}) Piercing damage, and the target's {@variantrule Speed|XPHB} decreases by 5 feet until the start of the berserker's next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Frenzied Rush",
        entries: [
          "Each ally within 30 feet of the berserker can take a {@variantrule Reaction|XPHB} to move up to half the ally's {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. The berserker can also move up to half its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments", "individual"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["P", "S", "T"],
    miscTags: ["MA", "MLW", "RA", "THW"],
  },
  {
    name: "Chain Devil",
    group: ["Devils"],
    source: "XMM",
    page: 68,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [15],
    hp: {
      average: 85,
      formula: "10d8 + 40",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 15,
    con: 18,
    int: 11,
    wis: 12,
    cha: 14,
    save: {
      con: "+7",
      wis: "+4",
    },
    senses: [
      "darkvision 120 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 11,
    resist: ["bludgeoning", "cold", "piercing", "slashing"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "8",
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
          "The devil makes two Chain attacks and uses Conjure Infernal Chain.",
        ],
      },
      {
        name: "Chain",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Slashing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of two chains, and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Conjure Infernal Chain",
        entries: [
          "The devil conjures a fiery chain to bind a creature. {@actSave dex} {@dc 15}, one creature the devil can see within 60 feet. {@actSaveFail} 9 ({@damage 2d4 + 4}) Fire damage, and the target has the {@condition Restrained|XPHB} condition until the end of the devil's next turn, at which point the chain disappears. If the target is Large or smaller, the devil moves the target up to 30 feet straight toward itself. {@actSaveSuccess} The chain disappears.",
        ],
      },
    ],
    reaction: [
      {
        name: "Unnerving Gaze",
        entries: [
          "{@actTrigger} A creature the devil can see starts its turn within 30 feet of the devil and can see the devil. {@actResponse d}{@actSave wis} {@dc 15}, the triggering creature. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the end of its turn. {@actSaveSuccess} The target is immune to this devil's Unnerving Gaze for 24 hours.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/chain-devil.mp3",
    },
    traitTags: ["Devil's Sight", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["F", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["frightened", "grappled", "restrained"],
    savingThrowForced: ["dexterity", "wisdom"],
  },
  {
    name: "Cloaker",
    source: "XMM",
    page: 73,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [14],
    hp: {
      average: 91,
      formula: "14d10 + 14",
    },
    speed: {
      walk: 10,
      fly: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 17,
    dex: 15,
    con: 12,
    int: 13,
    wis: 14,
    cha: 7,
    skill: {
      stealth: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 12,
    conditionImmune: ["frightened"],
    languages: ["Deep Speech", "Undercommon"],
    cr: "8",
    spellcasting: [
      {
        name: "Phantasms (Recharge after a Short or Long Rest)",
        type: "spellcasting",
        headerEntries: [
          "The cloaker casts the {@spell Mirror Image|XPHB} spell, requiring no spell components and using Wisdom as the spellcasting ability. The spell ends early if the cloaker starts or ends its turn in {@variantrule Bright Light|XPHB}.",
        ],
        will: ["{@spell Mirror Image|XPHB}"],
        ability: "wis",
        displayAs: "bonus",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Light Sensitivity",
        entries: [
          "While in {@variantrule Bright Light|XPHB}, the cloaker has {@variantrule Disadvantage|XPHB} on attack rolls.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The cloaker makes one Attach attack and two Tail attacks."],
      },
      {
        name: "Attach",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}13 ({@damage 3d6 + 3}) Piercing damage. If the target is a Large or smaller creature, the cloaker attaches to it. While the cloaker is attached, the target has the {@condition Blinded|XPHB} condition, and the cloaker can't make Attach attacks against other targets. In addition, the cloaker halves the damage it takes (round down), and the target takes the same amount of damage.",
          "The cloaker can detach itself by spending 5 feet of movement. The target or a creature within 5 feet of it can take an action to try to detach the cloaker, doing so by succeeding on a {@dc 14} Strength ({@skill Athletics|XPHB}) check.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 6}, reach 10 ft. {@h}8 ({@damage 1d10 + 3}) Slashing damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Moan",
        entries: [
          "{@actSave wis} {@dc 13}, each creature in a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the cloaker. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the end of the cloaker's next turn. {@actSaveSuccess} The target is immune to this cloaker's Moan for the next 24 hours.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["implements"],
    soundClip: {
      type: "internal",
      path: "bestiary/cloaker.mp3",
    },
    traitTags: ["Light Sensitivity"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["DS", "U"],
    damageTags: ["P", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["blinded", "frightened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Cockatrice Regent",
    source: "XMM",
    page: 75,
    size: ["L"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [15],
    hp: {
      average: 136,
      formula: "16d10 + 48",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    str: 19,
    dex: 14,
    con: 16,
    int: 3,
    wis: 16,
    cha: 5,
    save: {
      wis: "+6",
    },
    senses: ["darkvision 120 ft."],
    passive: 13,
    conditionImmune: ["petrified"],
    cr: "8",
    trait: [
      {
        name: "Flyby",
        entries: [
          "The cockatrice doesn't provoke an Opportunity Attack when it flies out of an enemy's reach.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cockatrice makes one Petrifying Bite attack and two Talons attacks.",
        ],
      },
      {
        name: "Petrifying Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Piercing damage. If the target is a creature, it is subjected to the following effect. {@actSave con} {@dc 14}. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}18 ({@damage 4d6 + 4}) Slashing damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Magical Backlash",
        entries: [
          "{@actTrigger} A creature within 120 feet of the cockatrice deals damage to it. {@actResponse d}{@actSave dex} {@dc 14}, the triggering creature. {@actSaveFail} 13 ({@damage 3d6 + 3}) Force damage.",
        ],
      },
    ],
    environment: ["grassland"],
    traitTags: ["Flyby"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    damageTags: ["O", "P", "S"],
    miscTags: ["MA"],
    conditionInflict: ["petrified", "restrained"],
    savingThrowForced: ["constitution", "dexterity"],
  },
  {
    name: "Death Cultist",
    source: "XMM",
    page: 86,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N", "E"],
    ac: [17],
    hp: {
      average: 127,
      formula: "15d8 + 60",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 12,
    con: 18,
    int: 12,
    wis: 16,
    cha: 14,
    save: {
      con: "+7",
      wis: "+6",
    },
    skill: {
      insight: "+6",
      perception: "+6",
      religion: "+4",
    },
    passive: 16,
    languages: ["Common"],
    cr: "8",
    gear: ["splint armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: ["{@spell Speak with Dead|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        ability: "wis",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cultist makes three attacks, using Dread Scythe or Deathly Ray in any combination.",
        ],
      },
      {
        name: "Dread Scythe",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}9 ({@damage 1d10 + 4}) Slashing damage plus 11 ({@damage 2d10}) Necrotic damage, and the target can't regain {@variantrule Hit Points|XPHB} until the end of its next turn.",
        ],
      },
      {
        name: "Deathly Ray",
        entries: [
          "{@atkr r} {@hit 6}, range 120 ft. {@h}22 ({@damage 4d10}) Necrotic damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Spirit Wail {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 14}, each creature in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the cultist. {@actSaveFail} 14 ({@damage 4d6}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["N", "S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Elemental Cultist",
    source: "XMM",
    page: 87,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 135,
      formula: "18d8 + 54",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 12,
    con: 16,
    int: 14,
    wis: 18,
    cha: 12,
    save: {
      con: "+6",
      wis: "+7",
    },
    skill: {
      arcana: "+5",
      perception: "+7",
      religion: "+5",
    },
    passive: 17,
    languages: ["Common", "Primordial"],
    cr: "8",
    gear: ["chain mail|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Elementalism|XPHB}", "{@spell Mage Hand|XPHB}"],
        ability: "wis",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The cultist makes three attacks, using Elemental Flail or Elemental Claw in any combination.",
        ],
      },
      {
        name: "Elemental Flail",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}25 ({@damage 6d6 + 4}) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder.",
        ],
      },
      {
        name: "Elemental Claw",
        entries: [
          "{@atkr r} {@hit 7}, range 120 ft. {@h}22 ({@damage 4d10}) damage of a type chosen by the cultist: Acid, Cold, Fire, Lightning, or Thunder. If the target is a Medium or smaller creature, the cultist moves the target up to 10 feet straight toward or away from itself.",
        ],
      },
    ],
    reaction: [
      {
        name: "Elemental Absorption (1/Day)",
        entries: [
          "{@actTrigger} The cultist takes Acid, Cold, Fire, Lightning, or Thunder damage. {@actResponse} The cultist gives itself {@variantrule Resistance|XPHB} to that instance of damage and gains 10 {@variantrule Temporary Hit Points|XPHB}.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "P"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA"],
  },
  {
    name: "Fiend Cultist",
    source: "XMM",
    page: 87,
    size: ["S", "M"],
    type: "humanoid",
    alignment: ["N", "E"],
    ac: [16],
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
    str: 19,
    dex: 15,
    con: 16,
    int: 12,
    wis: 18,
    cha: 10,
    save: {
      con: "+6",
      wis: "+7",
    },
    skill: {
      perception: "+7",
      religion: "+4",
    },
    senses: [
      "darkvision 90 ft. (unimpeded by magical {@variantrule Darkness|XPHB})",
    ],
    passive: 17,
    languages: ["Abyssal", "Common", "Infernal"],
    cr: "8",
    gear: ["breastplate|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts one of the following spells, using Wisdom as the spellcasting ability (spell save {@dc 15}, {@hit 7} to hit with spell attacks):",
        ],
        will: [
          "{@spell Scorching Ray|XPHB} (level 5 version)",
          "{@spell Thaumaturgy|XPHB}",
        ],
        daily: {
          "2": ["{@spell Fireball|XPHB} (level 6 version)"],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Hellish Rebuke",
        type: "spellcasting",
        headerEntries: [
          "The cultist casts {@spell Hellish Rebuke|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Hellish Rebuke|XPHB}"],
        ability: "wis",
        displayAs: "reaction",
        hidden: ["will"],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The cultist makes three Pact Axe attacks."],
      },
      {
        name: "Pact Axe",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}10 ({@damage 1d12 + 4}) Slashing damage plus 13 ({@damage 3d8}) Fire damage.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["individual", "relics"],
    traitTags: ["Devil's Sight"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "I"],
    damageTags: ["F", "S"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    savingThrowForcedSpell: ["dexterity"],
  },
  {
    name: "Fomorian",
    source: "XMM",
    page: 123,
    size: ["H"],
    type: "giant",
    alignment: ["C", "E"],
    ac: [14],
    hp: {
      average: 172,
      formula: "15d12 + 75",
    },
    speed: {
      walk: 40,
    },
    str: 23,
    dex: 10,
    con: 20,
    int: 9,
    wis: 14,
    cha: 6,
    skill: {
      perception: "+8",
      stealth: "+3",
    },
    senses: ["darkvision 120 ft."],
    passive: 18,
    languages: ["Giant", "Undercommon"],
    cr: "8",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The fomorian makes two Stone Club attacks. It can replace one attack with a use of Warping Hex if available.",
        ],
      },
      {
        name: "Stone Club",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}24 ({@damage 4d8 + 6}) Bludgeoning damage.",
        ],
      },
      {
        name: "Warping Hex {@recharge 4}",
        entries: [
          "{@actSave wis} {@dc 16}, one creature the fomorian can see within 120 feet. {@actSaveFail} 21 ({@damage 6d6}) Psychic damage, and the target gains 1 {@condition Exhaustion|XPHB} level. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/fomorian.mp3",
    },
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["GI", "U"],
    damageTags: ["B", "Y"],
    miscTags: ["MA", "MLW", "RCH"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Frost Giant",
    source: "XMM",
    page: 124,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: "giant",
    alignment: ["N", "E"],
    ac: [15],
    hp: {
      average: 149,
      formula: "13d12 + 65",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 23,
    dex: 9,
    con: 21,
    int: 9,
    wis: 10,
    cha: 12,
    save: {
      con: "+8",
      wis: "+3",
      cha: "+4",
    },
    skill: {
      athletics: "+9",
      perception: "+3",
    },
    passive: 13,
    immune: ["cold"],
    languages: ["Giant"],
    cr: "8",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Frost Axe or Great Bow in any combination.",
        ],
      },
      {
        name: "Frost Axe",
        entries: [
          "{@atkr m} {@hit 9}, reach 10 ft. {@h}19 ({@damage 2d12 + 6}) Slashing damage plus 9 ({@damage 2d8}) Cold damage.",
        ],
      },
      {
        name: "Great Bow",
        entries: [
          "{@atkr r} {@hit 9}, range 150/600 ft. {@h}17 ({@damage 2d10 + 6}) Piercing damage plus 7 ({@damage 2d6}) Cold damage, and the target's {@variantrule Speed|XPHB} decreases by 10 feet until the end of its next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "War Cry {@recharge 5}",
        entries: [
          "The giant or one creature of its choice that can see or hear it gains 16 ({@dice 2d10 + 5}) {@variantrule Temporary Hit Points|XPHB} and has {@variantrule Advantage|XPHB} on attack rolls until the start of the giant's next turn.",
        ],
      },
    ],
    environment: ["arctic", "mountain"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/frost-giant.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["GI"],
    damageTags: ["C", "P", "S"],
    miscTags: ["MA", "RA", "RCH"],
  },
  {
    name: "Githyanki Knight",
    source: "XMM",
    page: 135,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "aberration",
      tags: ["gith"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 117,
      formula: "18d8 + 36",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 14,
    con: 15,
    int: 14,
    wis: 14,
    cha: 15,
    save: {
      con: "+5",
      int: "+5",
      wis: "+5",
    },
    passive: 12,
    languages: ["Common", "Gith"],
    cr: "8",
    gear: ["plate armor|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The githyanki casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 13}):",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "2e": [
            "{@spell Nondetection|XPHB} (self only)",
            "{@spell Tongues|XPHB}",
          ],
          "1e": ["{@spell Plane Shift|XPHB}", "{@spell Telekinesis|XPHB}"],
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
        entries: [
          "The githyanki makes three Silver Sword attacks. It can replace one attack with a use of Spellcasting to cast {@spell Telekinesis|XPHB} if available.",
        ],
      },
      {
        name: "Silver Sword",
        entries: [
          "{@atkr m} {@hit 6}, reach 5 ft. {@h}10 ({@damage 2d6 + 3}) Slashing damage plus 14 ({@damage 4d6}) Psychic damage. Critical {@h}If the target is in an astral body (as with the {@spell Astral Projection|XPHB} spell), the githyanki can cut the silvery cord that tethers the target to its material body instead of dealing damage.",
        ],
      },
    ],
    environment: ["planar, astral"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/githyanki-knight.mp3",
    },
    actionTags: ["Multiattack"],
    languageTags: ["C", "GTH"],
    damageTags: ["S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflictSpell: ["restrained"],
    savingThrowForcedSpell: ["strength"],
  },
  {
    name: "Gnoll Demoniac",
    source: "XMM",
    page: 141,
    size: ["M"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 135,
      formula: "18d8 + 54",
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
    wis: 15,
    cha: 17,
    save: {
      str: "+6",
      con: "+6",
      wis: "+5",
      cha: "+6",
    },
    skill: {
      perception: "+5",
    },
    senses: ["darkvision 60 ft."],
    passive: 15,
    languages: ["Abyssal", "Common", "Gnoll"],
    cr: "8",
    action: [
      {
        name: "Multiattack",
        entries: ["The gnoll makes two Abyssal Strike attacks."],
      },
      {
        name: "Abyssal Strike",
        entries: [
          "{@atkr m,r} {@hit 6}, reach 5 ft. or range 60 ft. {@h}20 ({@damage 5d6 + 3}) Poison damage.",
        ],
      },
      {
        name: "Hunger of Yeenoghu {@recharge 5}",
        entries: [
          "The gnoll conjures a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of magical {@variantrule Darkness|XPHB} originating from a point it can see within 60 feet, which lasts for 1 minute or until the gnoll's {@status Concentration|XPHB} ends on it. This area is {@variantrule Difficult Terrain|XPHB}. {@actSave dex} {@dc 14}, any creature that starts its turn in this area or enters it for the first time on a turn. {@actSaveFail} 28 ({@damage 8d6}) Necrotic damage, and the gnoll or a creature of its choice it can see gains 10 {@variantrule Temporary Hit Points|XPHB}. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Rampage (2/Day)",
        entries: [
          "Immediately after dealing damage to a creature that is already {@variantrule Bloodied|XPHB}, the gnoll moves up to half its {@variantrule Speed|XPHB}, and it makes one Abyssal Strike attack.",
        ],
      },
    ],
    environment: ["desert", "forest", "grassland", "hill"],
    treasure: ["armaments", "individual"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C", "OTH"],
    damageTags: ["I", "N"],
    miscTags: ["MA", "RA"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Green Slaad",
    source: "XMM",
    page: 286,
    size: ["L"],
    type: "aberration",
    alignment: ["C", "N"],
    ac: [16],
    hp: {
      average: 144,
      formula: "17d10 + 51",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 16,
    dex: 15,
    con: 16,
    int: 11,
    wis: 8,
    cha: 18,
    skill: {
      arcana: "+3",
      perception: "+2",
    },
    senses: ["blindsight 30 ft.", "darkvision 60 ft."],
    passive: 12,
    resist: ["acid", "cold", "fire", "lightning", "thunder"],
    languages: ["Common", "Slaad; telepathy 60 ft."],
    cr: "8",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The slaad casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 14}, {@hit 6} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Mage Hand|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Fireball|XPHB}",
            "{@spell Invisibility|XPHB} (self only)",
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
        entries: ["The slaad makes three Chaos Staff attacks."],
      },
      {
        name: "Chaos Staff",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 10 ft. or range 60 ft. {@h}8 ({@damage 1d8 + 4}) Force damage. Until the start of the slaad's next turn, the target has a condition determined by rolling {@dice 1d4}: on a 1, {@condition Charmed|XPHB}; on a 2, {@condition Frightened|XPHB}; on a 3, {@condition Poisoned|XPHB}; or on a 4, {@condition Incapacitated|XPHB}.",
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
      path: "bestiary/green-slaad.mp3",
    },
    traitTags: ["Magic Resistance", "Regeneration"],
    senseTags: ["B", "D"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "OTH", "TP"],
    damageTags: ["O"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflictSpell: ["invisible"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Hezrou",
    group: ["Demons"],
    source: "XMM",
    page: 167,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 157,
      formula: "15d10 + 75",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 17,
    con: 20,
    int: 5,
    wis: 12,
    cha: 13,
    save: {
      str: "+7",
      con: "+8",
      wis: "+4",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "8",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the hezrou dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The hezrou has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Stench",
        entries: [
          "{@actSave con} {@dc 16}, any creature that starts its turn in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the hezrou. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition until the start of its next turn.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hezrou makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}6 ({@damage 1d4 + 4}) Slashing damage plus 9 ({@damage 2d8}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Leap",
        entries: [
          "The hezrou jumps up to 30 feet by spending 10 feet of movement.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/hezrou.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "TP"],
    damageTags: ["I", "S"],
    miscTags: ["MA"],
    conditionInflict: ["poisoned"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Hydra",
    source: "XMM",
    page: 175,
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
      average: 184,
      formula: "16d12 + 80",
    },
    speed: {
      walk: 40,
      swim: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 20,
    dex: 12,
    con: 20,
    int: 2,
    wis: 10,
    cha: 7,
    skill: {
      perception: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 16,
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
      "frightened",
      "stunned",
      "unconscious",
    ],
    cr: "8",
    trait: [
      {
        name: "Hold Breath",
        entries: ["The hydra can hold its breath for 1 hour."],
      },
      {
        name: "Multiple Heads",
        entries: [
          "The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead. At the end of each of its turns when it has at least one living head, the hydra grows two heads for each of its heads that died since its last turn, unless it has taken Fire damage since its last turn. The hydra regains 20 {@variantrule Hit Points|XPHB} when it grows new heads.",
        ],
      },
      {
        name: "Reactive Heads",
        entries: [
          "For each head the hydra has beyond one, it gets an extra {@variantrule Reaction|XPHB} that can be used only for {@action Opportunity Attack|XPHB|Opportunity Attacks}.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The hydra makes as many Bite attacks as it has heads."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}10 ({@damage 1d10 + 5}) Piercing damage.",
        ],
      },
    ],
    environment: ["coastal", "swamp"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/hydra.mp3",
    },
    traitTags: ["Hold Breath"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    damageTags: ["P"],
    miscTags: ["MA", "RCH"],
  },
  {
    name: "Sphinx of Secrets",
    source: "XMM",
    page: 292,
    size: ["L"],
    type: "celestial",
    alignment: ["L", "N"],
    ac: [16],
    hp: {
      average: 136,
      formula: "16d10 + 48",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    initiative: {
      proficiency: 1,
    },
    str: 18,
    dex: 15,
    con: 16,
    int: 18,
    wis: 18,
    cha: 18,
    skill: {
      history: "+7",
      perception: "+7",
      religion: "+7",
    },
    senses: ["truesight 60 ft."],
    passive: 17,
    resist: ["necrotic", "radiant"],
    immune: ["psychic"],
    conditionImmune: ["charmed", "frightened"],
    languages: ["Celestial", "Common"],
    cr: "8",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The sphinx casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Identify|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "1e": ["{@spell Locate Object|XPHB}", "{@spell Remove Curse|XPHB}"],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Inscrutable",
        entries: [
          "No magic can observe the sphinx remotely or detect its thoughts without its permission. Wisdom ({@skill Insight|XPHB}) checks made to ascertain its intentions or sincerity are made with {@variantrule Disadvantage|XPHB}.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The sphinx has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The sphinx makes three Claw attacks. It can replace one attack with a use of {@variantrule Curses|XPHB|Curse} of the Riddle.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}13 ({@damage 2d8 + 4}) Slashing damage plus 7 ({@damage 2d6}) Radiant damage.",
        ],
      },
      {
        name: "Curse of the Riddle",
        entries: [
          "{@actSave int} {@dc 15}, one creature the sphinx can see within 60 feet. {@actSaveFail} 21 ({@damage 6d6}) Psychic damage, and the target is cursed with a riddle. The cursed target has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls. In addition, if it takes the Magic action, it must succeed on a {@dc 15} Intelligence saving throw or that action is wasted. The cursed target can take a Study action to make a {@dc 15} Intelligence check, solving the riddle and ending the curse on a success. The curse ends early if the sphinx curses another target.",
        ],
      },
    ],
    environment: ["desert", "planar, upper"],
    treasure: ["arcana"],
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE"],
    damageTags: ["R", "S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["CUR", "MA"],
    savingThrowForced: ["intelligence"],
  },
  {
    name: "Spirit Naga",
    source: "XMM",
    page: 297,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["L"],
    type: "fiend",
    alignment: ["C", "E"],
    ac: [17],
    hp: {
      average: 135,
      formula: "18d10 + 36",
    },
    speed: {
      walk: 40,
    },
    str: 18,
    dex: 17,
    con: 14,
    int: 16,
    wis: 15,
    cha: 16,
    save: {
      dex: "+6",
      con: "+5",
      wis: "+5",
      cha: "+6",
    },
    senses: ["darkvision 60 ft."],
    passive: 12,
    immune: ["poison"],
    conditionImmune: ["charmed", "poisoned"],
    languages: ["Abyssal", "Common"],
    cr: "8",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The naga casts one of the following spells, requiring no Somatic or Material components and using Intelligence as the spellcasting ability (spell save {@dc 14}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Water Breathing|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Dimension Door|XPHB}",
            "{@spell Hold Person|XPHB} (level 3 version)",
            "{@spell Lightning Bolt|XPHB} (level 4 version)",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Fiendish Restoration",
        entries: [
          "If it dies, the naga returns to life in {@dice 1d6} days and regains all its {@variantrule Hit Points|XPHB}. Only a {@spell Wish|XPHB} spell can prevent this trait from functioning.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The naga makes three attacks, using Bite or Necrotic Ray in any combination.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}7 ({@damage 1d6 + 4}) Piercing damage plus 14 ({@damage 4d6}) Poison damage.",
        ],
      },
      {
        name: "Necrotic Ray",
        entries: [
          "{@atkr r} {@hit 6}, range 60 ft. {@h}21 ({@damage 6d6}) Necrotic damage.",
        ],
      },
    ],
    environment: ["planar, lower", "underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/spirit-naga.mp3",
    },
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "C"],
    damageTags: ["I", "N", "P"],
    damageTagsSpell: ["L", "O"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Thri-kreen Psion",
    source: "XMM",
    page: 306,
    size: ["M"],
    type: "monstrosity",
    alignment: ["N"],
    ac: [16],
    hp: {
      average: 149,
      formula: "23d8 + 46",
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
    str: 18,
    dex: 15,
    con: 14,
    int: 19,
    wis: 12,
    cha: 11,
    save: {
      str: "+7",
      dex: "+5",
      con: "+5",
      int: "+7",
    },
    skill: {
      perception: "+4",
      stealth: "+8",
    },
    senses: ["darkvision 60 ft."],
    passive: 14,
    resist: ["psychic"],
    languages: ["Thri-kreen; telepathy 120 ft."],
    cr: "8",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The thri-kreen casts one of the following spells, requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 15}):",
        ],
        will: ["{@spell Mage Hand|XPHB} (the hand is Invisible)"],
        daily: {
          "1e": [
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Sending|XPHB}",
            "{@spell Synaptic Static|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The thri-kreen makes three Psionic Lance attacks."],
      },
      {
        name: "Psionic Lance",
        entries: [
          "{@atkr m,r} {@hit 7}, reach 10 ft. or range 120 ft. {@h}18 ({@damage 4d6 + 4}) Psychic damage.",
        ],
      },
    ],
    environment: ["desert", "grassland"],
    treasure: ["armaments"],
    senseTags: ["D"],
    actionTags: ["Multiattack"],
    languageTags: ["OTH", "TP"],
    damageTags: ["Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "RCH"],
    savingThrowForcedSpell: ["constitution", "intelligence", "wisdom"],
  },
  {
    name: "Tyrannosaurus Rex",
    group: ["Dinosaurs"],
    source: "XMM",
    page: 372,
    size: ["H"],
    type: {
      type: "beast",
      tags: ["dinosaur"],
    },
    alignment: ["U"],
    ac: [13],
    hp: {
      average: 136,
      formula: "13d12 + 52",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 25,
    dex: 10,
    con: 19,
    int: 2,
    wis: 12,
    cha: 9,
    save: {
      str: "+10",
      wis: "+4",
    },
    skill: {
      perception: "+4",
    },
    passive: 14,
    cr: "8",
    action: [
      {
        name: "Multiattack",
        entries: [
          "The tyrannosaurus makes one Bite attack and one Tail attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}33 ({@damage 4d12 + 7}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 17}). While {@condition Grappled|XPHB}, the target has the {@condition Restrained|XPHB} condition and can't be targeted by the tyrannosaurus's Tail.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 10}, reach 15 ft. {@h}25 ({@damage 4d8 + 7}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["grassland"],
    soundClip: {
      type: "internal",
      path: "bestiary/tyrannosaurus-rex.mp3",
    },
    actionTags: ["Multiattack"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
  },
  {
    name: "Vampire Nightbringer",
    source: "XMM",
    page: 316,
    size: ["S", "M"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [16],
    hp: {
      average: 142,
      formula: "19d8 + 57",
    },
    speed: {
      walk: 30,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    str: 16,
    dex: 18,
    con: 16,
    int: 13,
    wis: 14,
    cha: 15,
    save: {
      dex: "+7",
      wis: "+5",
    },
    skill: {
      perception: "+5",
      stealth: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 15,
    immune: ["cold", "necrotic"],
    conditionImmune: ["charmed", "exhaustion", "frightened"],
    languages: ["Common plus one other language"],
    cr: "8",
    trait: [
      {
        name: "Sunlight Hypersensitivity",
        entries: [
          "The vampire takes 10 Radiant damage if it starts its turn in sunlight. While in sunlight, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The vampire makes one Bite attack and one Shadow Strike attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Piercing damage plus 10 ({@damage 3d6}) Necrotic damage. The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains {@variantrule Hit Points|XPHB} equal to that amount.",
        ],
      },
      {
        name: "Shadow Strike",
        entries: [
          "{@atkr m} {@hit 7}, reach 5 ft. {@h}7 ({@damage 1d6 + 4}) Slashing damage plus 14 ({@damage 4d6}) Cold damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the vampire takes the Hide action.",
        ],
      },
    ],
    environment: ["underdark", "urban"],
    treasure: ["any"],
    traitTags: ["Sunlight Sensitivity"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["C", "N", "P", "R", "S"],
    miscTags: ["MA"],
  },
  {
    name: "Young Bronze Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 58,
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
    alignment: ["L", "G"],
    ac: [17],
    hp: {
      average: 142,
      formula: "15d10 + 60",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
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
      dex: "+3",
      wis: "+4",
    },
    skill: {
      insight: "+4",
      perception: "+7",
      stealth: "+3",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 17,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: "8",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Repulsion Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 8}, reach 10 ft. {@h}16 ({@damage 2d10 + 5}) Slashing damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 15}, each creature in a 60-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 49 ({@damage 9d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Repulsion Breath",
        entries: [
          "{@actSave str} {@dc 15}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target is pushed up to 40 feet straight away from the dragon and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    environment: ["coastal"],
    treasure: ["implements"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/bronze-dragon.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["L", "S"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Young Green Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 152,
    size: ["L"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 136,
      formula: "16d10 + 48",
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
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Common", "Draconic"],
    cr: "8",
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
          "{@atkr m} {@hit 7}, reach 10 ft. {@h}11 ({@damage 2d6 + 4}) Slashing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 42 ({@damage 12d6}) Poison damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["forest"],
    treasure: ["arcana"],
    dragonAge: "young",
    soundClip: {
      type: "internal",
      path: "bestiary/green-dragon.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["I", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["constitution"],
  },
];
