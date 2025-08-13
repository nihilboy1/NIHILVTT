// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_17 = [
  {
    name: "Adult Gold Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 145,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [19],
    hp: {
      average: 243,
      formula: "18d12 + 126",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 27,
    dex: 14,
    con: 25,
    int: 16,
    wis: 15,
    cha: 24,
    save: {
      dex: "+8",
      wis: "+8",
    },
    skill: {
      insight: "+8",
      perception: "+14",
      persuasion: "+13",
      stealth: "+8",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 24,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "17",
      xpLair: 20000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 21}, {@hit 13} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Guiding Bolt|XPHB} (level 2 version)",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": ["{@spell Flame Strike|XPHB}", "{@spell Zone of Truth|XPHB}"],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The dragon can breathe air and water."],
      },
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 2 version) or (B) Weakening Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}17 ({@damage 2d8 + 8}) Slashing damage plus 4 ({@damage 1d8}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 21}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 66 ({@damage 12d10}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Weakening Breath",
        entries: [
          "{@actSave str} {@dc 21}, each creature that isn't currently affected by this breath in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} and subtracts 3 ({@dice 1d6}) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Banish",
        entries: [
          "{@actSave cha} {@dc 21}, one creature the dragon can see within 120 feet. {@actSaveFail} 10 ({@damage 3d6}) Force damage, and the target has the {@condition Incapacitated|XPHB} condition and is transported to a harmless demiplane until the start of the dragon's next turn, at which point it reappears in an unoccupied space of the dragon's choice within 120 feet of the dragon. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Guiding Light",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 2 version).",
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
      name: "Gold Dragon",
      source: "XMM",
    },
    environment: ["forest", "grassland"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/gold-dragon.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "O", "S"],
    damageTagsSpell: ["F", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated"],
    savingThrowForced: ["charisma", "dexterity", "strength"],
    savingThrowForcedLegendary: ["wisdom"],
    savingThrowForcedSpell: ["charisma", "dexterity"],
  },
  {
    name: "Adult Red Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 255,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 256,
      formula: "19d12 + 133",
    },
    speed: {
      walk: 40,
      climb: 40,
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
    cha: 23,
    save: {
      dex: "+6",
      wis: "+7",
    },
    skill: {
      perception: "+13",
      stealth: "+6",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 23,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "17",
      xpLair: 20000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 20}, {@hit 12} to hit with spell attacks):",
        ],
        will: [
          "{@spell Command|XPHB} (level 2 version)",
          "{@spell Detect Magic|XPHB}",
          "{@spell Scorching Ray|XPHB}",
        ],
        daily: {
          "1": ["{@spell Fireball|XPHB}"],
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Scorching Ray|XPHB}.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}13 ({@damage 1d10 + 8}) Slashing damage plus 5 ({@damage 2d4}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 21}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 59 ({@damage 17d6}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Commanding Presence",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Command|XPHB} (level 2 version). The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Fiery Rays",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Scorching Ray|XPHB}. The dragon can't take this action again until the start of its next turn.",
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
      name: "Red Dragon",
      source: "XMM",
    },
    environment: ["hill", "mountain"],
    treasure: ["any"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/red-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "S"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Death Knight",
    source: "XMM",
    page: 92,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "undead",
    alignment: ["C", "E"],
    ac: [20],
    hp: {
      average: 199,
      formula: "21d8 + 105",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 20,
    dex: 11,
    con: 20,
    int: 12,
    wis: 16,
    cha: 18,
    save: {
      dex: "+6",
      wis: "+9",
    },
    senses: ["darkvision 120 ft."],
    passive: 13,
    immune: ["necrotic", "poison"],
    conditionImmune: ["exhaustion", "frightened", "poisoned"],
    languages: ["Abyssal", "Common"],
    cr: "17",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The death knight casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 18}):",
        ],
        will: ["{@spell Command|XPHB}", "{@spell Phantom Steed|XPHB}"],
        daily: {
          "2e": [
            "{@spell Destructive Wave|XPHB} (Necrotic)",
            "{@spell Dispel Magic|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day)",
        entries: [
          "If the death knight fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The death knight has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Marshal Undead",
        entries: [
          "Undead creatures of the death knight's choice (excluding itself) in a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from it have {@variantrule Advantage|XPHB} on attack rolls and saving throws. It can't use this trait if it has the {@condition Incapacitated|XPHB} condition.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If the death knight is destroyed before it atones for its evil, it gains a new body in {@dice 1d10} days, reviving with all its {@variantrule Hit Points|XPHB}. The new body appears in a location significant to the death knight.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The death knight makes three Dread Blade attacks."],
      },
      {
        name: "Dread Blade",
        entries: [
          "{@atkr m} {@hit 11}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 13 ({@damage 3d8}) Necrotic damage.",
        ],
      },
      {
        name: "Hellfire Orb {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the death knight can see within 120 feet. {@actSaveFail} 35 ({@damage 10d6}) Fire damage plus 35 ({@damage 10d6}) Necrotic damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    reaction: [
      {
        name: "Parry",
        entries: [
          "{@actTrigger} The death knight is hit by a melee attack roll while holding a weapon. {@actResponse} The death knight adds 6 to its AC against that attack, possibly causing it to miss.",
        ],
      },
    ],
    legendary: [
      {
        name: "Dread Authority",
        entries: [
          "The death knight uses Spellcasting to cast {@spell Command|XPHB}. The death knight can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Fell Word",
        entries: [
          "{@actSave con} {@dc 18}, one creature the death knight can see within 120 feet. {@actSaveFail} 17 ({@damage 5d6}) Necrotic damage, and the target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken. {@actSaveSuccessOrFail} The death knight can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Lunge",
        entries: [
          "The death knight moves up to half its {@variantrule Speed|XPHB}, and it makes one Dread Blade attack.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/death-knight.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack", "Parry"],
    languageTags: ["AB", "C"],
    damageTags: ["F", "N", "S"],
    damageTagsSpell: ["N", "R", "T"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA"],
    conditionInflict: ["incapacitated"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["constitution", "dexterity"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Dracolich",
    source: "XMM",
    page: 102,
    size: ["H", "G"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [20],
    hp: {
      average: 225,
      formula: "18d12 + 108",
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
    int: 19,
    wis: 15,
    cha: 21,
    save: {
      dex: "+6",
      wis: "+8",
    },
    skill: {
      perception: "+14",
      stealth: "+6",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 24,
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "17",
      xpLair: 20000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dracolich casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 19}, {@hit 11} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Ray of Sickness|XPHB} (level 2 version)",
        ],
        daily: {
          "1e": [
            "{@spell Create Undead|XPHB} (level 8 version)",
            "{@spell Finger of Death|XPHB}",
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
          "If the dracolich fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Life Suppression",
        entries: [
          "Creatures within 60 feet of the dracolich can't regain {@variantrule Hit Points|XPHB}.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The dracolich has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Soul Gem",
        entries: [
          "The dracolich has a magical gem. If the dracolich is destroyed while the gem is on the same plane of existence as it, the dracolich gains a new body in {@dice 1d20} days, regaining all its {@variantrule Hit Points|XPHB} and appearing within 5 feet of the gem.",
          "The gem is a Tiny object that has AC 20; HP 50; and {@variantrule Immunity|XPHB} to Necrotic, Poison, and Psychic damage. The gem regains all its {@variantrule Hit Points|XPHB} at the end of every turn, but it turns to dust if reduced to 0 {@variantrule Hit Points|XPHB}. If the gem is destroyed, the dracolich can create a new one by completing an 8-hour ritual using a gem worth 1,000+ GP and by expending 5,000 GP, which the ritual consumes.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dracolich makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Ray of Sickness|XPHB} (level 2 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 13}, reach 10 ft. {@h}18 ({@damage 2d10 + 7}) Slashing damage plus 4 ({@damage 1d8}) Necrotic damage.",
        ],
      },
      {
        name: "Necrotic Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 20}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 52 ({@damage 8d12}) Necrotic damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Pounce",
        entries: [
          "The dracolich moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
      {
        name: "Sickening Ray",
        entries: [
          "The dracolich uses Spellcasting to cast {@spell Ray of Sickness|XPHB} (level 2 version). The dracolich can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Terrifying Presence",
        entries: [
          "{@actSave wis} {@dc 19}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the dracolich. {@actSaveFail} 11 ({@damage 2d10}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn. {@actSaveSuccessOrFail} The dracolich can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Dracolich",
      source: "XMM",
    },
    environment: ["any"],
    treasure: ["any"],
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["N", "S", "Y"],
    damageTagsSpell: ["I", "N"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["frightened"],
    conditionInflictSpell: ["poisoned"],
    savingThrowForced: ["constitution", "wisdom"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["constitution"],
  },
  {
    name: "Dragon Turtle",
    source: "XMM",
    page: 103,
    size: ["G"],
    type: "dragon",
    alignment: ["N"],
    ac: [20],
    hp: {
      average: 356,
      formula: "23d20 + 115",
    },
    speed: {
      walk: 20,
      swim: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 25,
    dex: 10,
    con: 20,
    int: 10,
    wis: 12,
    cha: 12,
    save: {
      con: "+11",
      wis: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 11,
    resist: ["fire"],
    languages: ["Draconic", "Primordial (Aquan)"],
    cr: "17",
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
          "The dragon makes three Bite attacks. It can replace one attack with a Tail attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 13}, reach 15 ft. {@h}23 ({@damage 3d10 + 7}) Piercing damage plus 7 ({@damage 2d6}) Fire damage. Being underwater doesn't grant {@variantrule Resistance|XPHB} to this Fire damage.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 13}, reach 15 ft. {@h}18 ({@damage 2d10 + 7}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Steam Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 19}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 56 ({@damage 16d6}) Fire damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} Being underwater doesn't grant {@variantrule Resistance|XPHB} to this Fire damage.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/dragon-turtle.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["AQ", "DR", "P"],
    damageTags: ["B", "F", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["constitution"],
  },
  {
    name: "Goristro",
    group: ["Demons"],
    source: "XMM",
    page: 150,
    size: ["H"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 310,
      formula: "23d12 + 161",
    },
    speed: {
      walk: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 25,
    dex: 11,
    con: 25,
    int: 6,
    wis: 13,
    cha: 14,
    save: {
      str: "+13",
      dex: "+6",
      con: "+13",
      wis: "+7",
    },
    skill: {
      perception: "+7",
      survival: "+7",
    },
    senses: ["darkvision 120 ft."],
    passive: 17,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Abyssal"],
    cr: "17",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the goristro dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The goristro has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Siege Monster",
        entries: [
          "The goristro deals double damage to objects and structures.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The goristro makes one Brutal Gore attack and two Slam attacks.",
        ],
      },
      {
        name: "Brutal Gore",
        entries: [
          "{@atkr m} {@hit 13}, reach 10 ft. {@h}40 ({@damage 6d10 + 7}) Piercing damage. If the target is a Huge or smaller creature, it is pushed up to 20 feet straight away from the goristro and has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 13}, reach 10 ft. {@h}29 ({@damage 4d10 + 7}) Bludgeoning damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Charge",
        entries: [
          "The goristro moves up to half its {@variantrule Speed|XPHB} straight toward an enemy it can see.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/goristro.mp3",
    },
    traitTags: ["Magic Resistance", "Siege Monster"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["AB"],
    damageTags: ["B", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["prone"],
  },
  {
    name: "Sphinx of Valor",
    source: "XMM",
    page: 294,
    size: ["L"],
    type: "celestial",
    alignment: ["L", "N"],
    ac: [17],
    hp: {
      average: 199,
      formula: "19d10 + 95",
    },
    speed: {
      walk: 40,
      fly: 60,
    },
    initiative: {
      proficiency: 2,
    },
    str: 22,
    dex: 10,
    con: 20,
    int: 16,
    wis: 23,
    cha: 18,
    save: {
      dex: "+6",
      con: "+11",
      int: "+9",
      wis: "+12",
    },
    skill: {
      arcana: "+9",
      perception: "+12",
      religion: "+15",
    },
    senses: ["truesight 120 ft."],
    passive: 22,
    resist: ["necrotic", "radiant"],
    immune: ["psychic"],
    conditionImmune: ["charmed", "frightened"],
    languages: ["Celestial", "Common"],
    cr: {
      cr: "17",
      xpLair: 20000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The sphinx casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 20}):",
        ],
        will: [
          "{@spell Detect Evil and Good|XPHB}",
          "{@spell Thaumaturgy|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Detect Magic|XPHB}",
            "{@spell Dispel Magic|XPHB}",
            "{@spell Greater Restoration|XPHB}",
            "{@spell Heroes' Feast|XPHB}",
            "{@spell Zone of Truth|XPHB}",
          ],
        },
        ability: "wis",
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
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the sphinx fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The sphinx makes two Claw attacks and uses Roar."],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 12}, reach 5 ft. {@h}20 ({@damage 4d6 + 6}) Slashing damage.",
        ],
      },
      {
        name: "Roar (3/Day)",
        entries: [
          "The sphinx emits a magical roar. Whenever it roars, the roar has a different effect, as detailed below (the sequence resets when it takes a {@variantrule Long Rest|XPHB}):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "First Roar",
                entries: [
                  "{@actSave wis} {@dc 20}, each enemy in a 500-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the sphinx. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition for 1 minute.",
                ],
              },
              {
                type: "item",
                name: "Second Roar",
                entries: [
                  "{@actSave wis} {@dc 20}, each enemy in a 500-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the sphinx. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
                ],
              },
              {
                type: "item",
                name: "Third Roar",
                entries: [
                  "{@actSave con} {@dc 20}, each enemy in a 500-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the sphinx. {@actSaveFail} 44 ({@damage 8d10}) Thunder damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
                ],
              },
            ],
          },
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Arcane Prowl",
        entries: [
          "The sphinx can teleport up to 30 feet to an unoccupied space it can see, and it makes one Claw attack.",
        ],
      },
      {
        name: "Weight of Years",
        entries: [
          "{@actSave con} {@dc 16}, one creature the sphinx can see within 120 feet. {@actSaveFail} The target gains 1 {@condition Exhaustion|XPHB} level. While the target has any {@condition Exhaustion|XPHB} levels, it appears {@dice 3d10} years older. {@actSaveSuccessOrFail} The sphinx can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Sphinx",
      source: "XMM",
    },
    environment: ["desert", "planar, upper"],
    treasure: ["arcana"],
    traitTags: ["Legendary Resistances"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE"],
    damageTags: ["S", "T"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["frightened", "paralyzed", "prone"],
    savingThrowForced: ["constitution", "wisdom"],
    savingThrowForcedSpell: ["charisma"],
  },
];
