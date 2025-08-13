// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_15 = [
  {
    name: "Adult Bronze Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 59,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [18],
    hp: {
      average: 212,
      formula: "17d12 + 102",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
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
      insight: "+7",
      perception: "+12",
      stealth: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 22,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "15",
      xpLair: 15000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}, {@hit 10} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Guiding Bolt|XPHB} (level 2 version)",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
          "{@spell Speak with Animals|XPHB}",
          "{@spell Thaumaturgy|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Water Breathing|XPHB}",
          ],
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 2 version).",
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
          "{@actSave dex} {@dc 19}, each creature in a 90-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 55 ({@damage 10d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Repulsion Breath",
        entries: [
          "{@actSave str} {@dc 19}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target is pushed up to 60 feet straight away from the dragon and has the {@condition Prone|XPHB} condition.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
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
      {
        name: "Thunderclap",
        entries: [
          "{@actSave con} {@dc 17}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 90 feet. {@actSaveFail} 10 ({@damage 3d6}) Thunder damage, and the target has the {@condition Deafened|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Bronze Dragon",
      source: "XMM",
    },
    environment: ["coastal"],
    treasure: ["implements"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/bronze-dragon.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["L", "S", "T"],
    damageTagsSpell: ["R"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflict: ["deafened", "prone"],
    savingThrowForced: ["constitution", "dexterity", "strength"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Adult Green Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 153,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [19],
    hp: {
      average: 207,
      formula: "18d12 + 90",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 23,
    dex: 12,
    con: 21,
    int: 18,
    wis: 15,
    cha: 18,
    save: {
      dex: "+6",
      wis: "+7",
    },
    skill: {
      deception: "+9",
      perception: "+12",
      persuasion: "+9",
      stealth: "+6",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 22,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "15",
      xpLair: 15000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Mind Spike|XPHB} (level 3 version)",
        ],
        daily: {
          "1": ["{@spell Geas|XPHB}"],
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Mind Spike|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}15 ({@damage 2d8 + 6}) Slashing damage plus 7 ({@damage 2d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 18}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 56 ({@damage 16d6}) Poison damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Mind Invasion",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Mind Spike|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Noxious Miasma",
        entries: [
          "{@actSave con} {@dc 17}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 90 feet. {@actSaveFail} 7 ({@damage 2d6}) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
      name: "Green Dragon",
      source: "XMM",
    },
    environment: ["forest"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/green-dragon.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["I", "S"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflictSpell: ["charmed"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Mummy Lord",
    source: "XMM",
    page: 221,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: {
      type: "undead",
      tags: ["cleric"],
    },
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 187,
      formula: "25d8 + 75",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 10,
    con: 17,
    int: 11,
    wis: 19,
    cha: 16,
    save: {
      int: "+5",
      wis: "+9",
    },
    skill: {
      history: "+5",
      perception: "+9",
      religion: "+5",
    },
    senses: ["truesight 60 ft."],
    passive: 19,
    immune: ["necrotic", "poison"],
    vulnerable: ["fire"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    languages: ["Common plus three other languages"],
    cr: {
      cr: "15",
      xpLair: 15000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The mummy casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 17}, {@hit 9} to hit with spell attacks):",
        ],
        will: ["{@spell Dispel Magic|XPHB}", "{@spell Thaumaturgy|XPHB}"],
        daily: {
          "1e": [
            "{@spell Animate Dead|XPHB}",
            "{@spell Harm|XPHB}",
            "{@spell Insect Plague|XPHB} (level 7 version)",
          ],
        },
        ability: "wis",
        displayAs: "action",
      },
      {
        name: "Dread Command",
        type: "spellcasting",
        headerEntries: [
          "The mummy casts {@spell Command|XPHB} (level 2 version), using the same spellcasting ability as Spellcasting. The mummy can't take this action again until the start of its next turn.",
        ],
        legendary: {
          "1": ["{@spell Command|XPHB} (level 2 version)"],
        },
        ability: "wis",
        displayAs: "legendary",
        hidden: ["legendary"],
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the mummy fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The mummy has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If destroyed, the mummy gains a new body in 24 hours if its heart is intact, reviving with all its {@variantrule Hit Points|XPHB}. The new body appears in an unoccupied space within the mummy's lair. The heart is a Tiny object that has AC 17, HP 10, and {@variantrule Immunity|XPHB} to all damage except Fire.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The mummy makes one Rotting Fist or Channel Negative Energy attack, and it uses Dreadful Glare.",
        ],
      },
      {
        name: "Rotting Fist",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}15 ({@damage 2d10 + 4}) Bludgeoning damage plus 10 ({@damage 3d6}) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target can't regain {@variantrule Hit Points|XPHB}, it gains no benefit from finishing a {@variantrule Long Rest|XPHB}, and its {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 10 ({@dice 3d6}) every 24 hours that elapse. A creature dies and turns to dust if reduced to 0 {@variantrule Hit Points|XPHB} by this attack.",
        ],
      },
      {
        name: "Channel Negative Energy",
        entries: [
          "{@atkr r} {@hit 9}, range 60 ft. {@h}25 ({@damage 6d6 + 4}) Necrotic damage.",
        ],
      },
      {
        name: "Dreadful Glare",
        entries: [
          "{@actSave wis} {@dc 17}, one creature the mummy can see within 60 feet. {@actSaveFail} 25 ({@damage 6d6 + 4}) Psychic damage, and the target has the {@condition Paralyzed|XPHB} condition until the end of the mummy's next turn.",
        ],
      },
    ],
    reaction: [
      {
        name: "Whirlwind of Sand",
        entries: [
          "{@actTrigger} The mummy is hit by an attack roll. {@actResponse} The mummy adds 2 to its AC against the attack, possibly causing the attack to miss, and the mummy teleports up to 60 feet to an unoccupied space it can see. Each creature of its choice that it can see within 5 feet of its destination space has the {@condition Blinded|XPHB} condition until the end of the mummy's next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Glare",
        entries: [
          "The mummy uses Dreadful Glare. The mummy can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Necrotic Strike",
        entries: [
          "The mummy makes one Rotting Fist or Channel Negative Energy attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Mummy Lord",
      source: "XMM",
    },
    environment: ["desert", "swamp"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/mummy-lord.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["B", "N", "Y"],
    damageTagsSpell: ["N", "P"],
    spellcastingTags: ["O"],
    miscTags: ["CUR", "MA", "RA"],
    conditionInflict: ["blinded", "paralyzed"],
    conditionInflictSpell: ["prone"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Purple Worm",
    source: "XMM",
    page: 250,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["G"],
    type: "monstrosity",
    alignment: ["U"],
    ac: [18],
    hp: {
      average: 247,
      formula: "15d20 + 90",
    },
    speed: {
      walk: 50,
      burrow: 50,
    },
    initiative: {
      proficiency: 1,
    },
    str: 28,
    dex: 7,
    con: 22,
    int: 1,
    wis: 8,
    cha: 4,
    save: {
      con: "+11",
      wis: "+4",
    },
    senses: ["blindsight 30 ft.", "tremorsense 60 ft."],
    passive: 9,
    cr: "15",
    trait: [
      {
        name: "Tunneler",
        entries: [
          "The worm can burrow through solid rock at half its {@variantrule Burrow Speed|XPHB} and leaves a 10-foot-diameter tunnel in its wake.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The worm makes one Bite attack and one Tail Stinger attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}22 ({@damage 3d8 + 9}) Piercing damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 19}), and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Tail Stinger",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}16 ({@damage 2d6 + 9}) Piercing damage plus 35 ({@damage 10d6}) Poison damage.",
        ],
      },
    ],
    bonus: [
      {
        name: "Swallow",
        entries: [
          "{@actSave str} {@dc 19}, one Large or smaller creature {@condition Grappled|XPHB} by the worm (it can have up to three creatures swallowed at a time). {@actSaveFail} The target is swallowed by the worm, and the {@condition Grappled|XPHB} condition ends. A swallowed creature has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions, has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the worm, and takes 17 ({@damage 5d6}) Acid damage at the start of each of the worm's turns.",
          "If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a {@dc 21} Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the {@condition Prone|XPHB} condition. If the worm dies, any swallowed creature no longer has the {@condition Restrained|XPHB} condition and can escape from the corpse using 20 feet of movement, exiting {@condition Prone|XPHB}.",
        ],
      },
    ],
    environment: ["desert", "underdark"],
    soundClip: {
      type: "internal",
      path: "bestiary/purple-worm.mp3",
    },
    traitTags: ["Tunneler"],
    senseTags: ["B", "T"],
    actionTags: ["Multiattack", "Swallow"],
    damageTags: ["A", "I", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["constitution", "strength"],
  },
  {
    name: "Salamander Inferno Master",
    source: "XMM",
    page: 267,
    size: ["L"],
    type: "elemental",
    alignment: ["N", "E"],
    ac: [18],
    hp: {
      average: 256,
      formula: "27d10 + 108",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 24,
    dex: 16,
    con: 18,
    int: 14,
    wis: 10,
    cha: 20,
    save: {
      dex: "+8",
      wis: "+5",
    },
    senses: ["darkvision 120 ft."],
    passive: 10,
    immune: ["fire"],
    vulnerable: ["cold"],
    languages: ["Primordial (Ignan)"],
    cr: "15",
    trait: [
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the salamander's turns, each creature of the salamander's choice in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the salamander takes 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The salamander has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The salamander makes two Flame Trident attacks."],
      },
      {
        name: "Flame Trident",
        entries: [
          "{@atkr m,r} {@hit 12}, reach 5 ft. or range 30/90 ft. {@h}16 ({@damage 2d8 + 7}) Piercing damage plus 14 ({@damage 4d6}) Fire damage. {@hom}The trident magically returns to the salamander's hand immediately after a ranged attack.",
        ],
      },
      {
        name: "Inferno Blast {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the salamander can see within 120 feet. {@actSaveFail} 35 ({@damage 10d6}) Fire damage, and the target starts {@hazard burning|XPHB}, taking 5 ({@damage 1d10}) Fire damage at the start of each of its turns instead of the normal {@hazard burning|XPHB} damage. The target gains 1 {@condition Exhaustion|XPHB} level whenever it takes this {@hazard burning|XPHB} damage. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Blazing Movement",
        entries: [
          "The salamander moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. During this movement, fire fills a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the salamander. When the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters a creature's space, that creature takes 7 ({@damage 2d6}) Fire damage. A creature can take this damage only once per turn.",
        ],
      },
    ],
    environment: ["planar, fire", "underdark"],
    treasure: ["armaments"],
    traitTags: ["Magic Resistance"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["IG", "P"],
    damageTags: ["F", "P"],
    miscTags: ["AOE", "MA", "MLW", "RA", "THW"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Vampire Umbral Lord",
    source: "XMM",
    page: 318,
    size: ["S", "M"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [16],
    hp: {
      average: 187,
      formula: "22d8 + 88",
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 20,
    dex: 18,
    con: 18,
    int: 19,
    wis: 16,
    cha: 21,
    save: {
      str: "+10",
      dex: "+9",
      wis: "+8",
      cha: "+10",
    },
    skill: {
      arcana: "+9",
      perception: "+13",
      stealth: "+9",
    },
    senses: ["blindsight 120 ft."],
    passive: 23,
    immune: ["cold", "necrotic"],
    conditionImmune: ["charmed", "exhaustion"],
    languages: ["Common plus three other languages"],
    cr: {
      cr: "15",
      xpLair: 15000,
    },
    spellcasting: [
      {
        name: "Hunger of Hadar {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The vampire casts {@spell Hunger of Hadar|XPHB} (level 5 version), requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 18}).",
        ],
        recharge: {
          "5": ["{@spell Hunger of Hadar|XPHB} (level 5 version)"],
        },
        ability: "cha",
        displayAs: "action",
        hidden: ["recharge"],
      },
      {
        name: "Beguile",
        type: "spellcasting",
        headerEntries: [
          "The vampire casts {@spell Command|XPHB}, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 18}). The vampire can't take this action again until the start of its next turn.",
        ],
        legendary: {
          "1": ["{@spell Command|XPHB}"],
        },
        ability: "cha",
        displayAs: "legendary",
        hidden: ["legendary"],
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the vampire fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Shadow Escape",
        entries: [
          "If the vampire drops to 0 {@variantrule Hit Points|XPHB} outside its resting place, it teleports into its resting place unless it is in running water or sunlight. If it can't teleport, it is destroyed. Once inside its resting place, it has the {@condition Paralyzed|XPHB} condition for 1 hour, after which it regains 1 {@variantrule Hit Points|XPHB|Hit Point}.",
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
                  "If a weapon that deals Piercing damage is driven into the vampire's heart while the vampire has the {@condition Incapacitated|XPHB} condition in its resting place, the vampire has the {@condition Paralyzed|XPHB} condition until the weapon is removed.",
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
        entries: [
          "The vampire makes two attacks, using Grave Strike or Sickening Ray in any combination.",
        ],
      },
      {
        name: "Grave Strike",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}9 ({@damage 1d8 + 5}) Slashing damage plus 13 ({@damage 3d8}) Necrotic damage.",
        ],
      },
      {
        name: "Sickening Ray",
        entries: [
          "{@atkr r} {@hit 10}, range 120 ft. {@h}16 ({@damage 2d10 + 5}) Necrotic damage, and the target has the {@condition Poisoned|XPHB} condition until the start of the vampire's next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Sanguine Drain",
        entries: [
          "{@actSave con} {@dc 18}, one creature the vampire can see within 30 feet that isn't a Construct or an Undead. {@actSaveFail} 14 ({@damage 4d6}) Necrotic damage. The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the damage taken, and the vampire regains {@variantrule Hit Points|XPHB} equal to that amount.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Umbral Strike",
        entries: [
          "The vampire moves up to half its {@variantrule Speed|XPHB}, and it makes one Grave Strike or Sickening Ray attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Vampire",
      source: "XMM",
    },
    environment: ["underdark", "urban"],
    treasure: ["any"],
    traitTags: ["Legendary Resistances"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["C"],
    damageTags: ["A", "N", "R", "S"],
    damageTagsSpell: ["A", "C"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["incapacitated", "paralyzed", "poisoned"],
    conditionInflictSpell: ["blinded", "prone"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["wisdom"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
];
