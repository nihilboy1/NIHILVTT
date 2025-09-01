// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_23 = [
  {
    name: "Ancient Blue Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 50,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [22],
    hp: {
      average: 481,
      formula: "26d20 + 208",
    },
    speed: {
      walk: 40,
      burrow: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 29,
    dex: 10,
    con: 27,
    int: 18,
    wis: 17,
    cha: 25,
    save: {
      dex: "+7",
      wis: "+10",
    },
    skill: {
      perception: "+17",
      stealth: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 27,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "23",
      xpLair: 62000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 22}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Invisibility|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Shatter|XPHB} (level 3 version)",
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
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
        entries: [
          "If the dragon fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Shatter|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 16}, reach 15 ft. {@h}18 ({@damage 2d8 + 9}) Slashing damage plus 11 ({@damage 2d10}) Lightning damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 23}, each creature in a 120-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 88 ({@damage 16d10}) Lightning damage. {@actSaveSuccess} Half damage.",
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
          "The dragon uses Spellcasting to cast {@spell Shatter|XPHB} (level 3 version). The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
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
    name: "Ancient Silver Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 280,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [22],
    hp: {
      average: 468,
      formula: "24d20 + 216",
    },
    speed: {
      walk: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 10,
    con: 29,
    int: 18,
    wis: 15,
    cha: 26,
    save: {
      dex: "+7",
      wis: "+9",
    },
    skill: {
      history: "+11",
      perception: "+16",
      stealth: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 26,
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "23",
      xpLair: 62000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 23}, {@hit 15} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Hold Monster|XPHB}",
          "{@spell Ice Knife|XPHB} (level 2 version)",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Control Weather|XPHB}",
            "{@spell Ice Storm|XPHB} (level 7 version)",
            "{@spell Teleport|XPHB}",
            "{@spell Zone of Truth|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
        entries: [
          "If the dragon fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Paralyzing Breath or (B) Spellcasting to cast {@spell Ice Knife|XPHB} (level 2 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 17}, reach 15 ft. {@h}19 ({@damage 2d8 + 10}) Slashing damage plus 9 ({@damage 2d8}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 24}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 67 ({@damage 15d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Paralyzing Breath",
        entries: [
          "{@actSave con} {@dc 24}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail 1} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, when it repeats the save. {@actSaveFail 2} The target has the {@condition Paralyzed|XPHB} condition, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
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
          "{@actSave dex} {@dc 23}, each creature in a 60-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 14 ({@damage 4d6}) Cold damage, and the target is pushed up to 30 feet straight away from the dragon. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
    soundClip: {
      type: "internal",
      path: "bestiary/silver-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["C", "S"],
    damageTagsSpell: ["B", "C", "O", "P"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated", "paralyzed"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForced: ["constitution", "dexterity"],
    savingThrowForcedSpell: ["charisma", "dexterity", "wisdom"],
  },
  {
    name: "Blob of Annihilation",
    group: ["Titans"],
    source: "XMM",
    page: 47,
    size: ["G"],
    type: {
      type: "ooze",
      tags: ["titan"],
    },
    alignment: ["N", "E"],
    ac: [18],
    hp: {
      average: 448,
      formula: "23d20 + 207",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 27,
    dex: 14,
    con: 28,
    int: 10,
    wis: 16,
    cha: 10,
    save: {
      dex: "+9",
      con: "+16",
    },
    senses: ["blindsight 120 ft."],
    passive: 13,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["acid", "necrotic", "poison"],
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
      "stunned",
      "unconscious",
    ],
    cr: "23",
    trait: [
      {
        name: "Astral Implosion",
        entries: [
          "If the blob is reduced to 0 {@variantrule Hit Points|XPHB}, it implodes and ejects any creatures and objects engulfed by it into the Astral Sea. The blob itself vanishes, leaving behind a layer of slime on everything that was within 600 feet of it. In {@dice 1d20} years, the blob reconstitutes on a random world in the Material Plane.",
        ],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the blob fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The blob has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The blob makes two Pseudopod attacks and uses Engulf. It can replace one attack with a use of Restraining Glob.",
        ],
      },
      {
        name: "Pseudopod",
        entries: [
          "{@atkr m} {@hit 15}, reach 30 ft. {@h}24 ({@damage 3d10 + 8}) Force damage.",
        ],
      },
      {
        name: "Engulf",
        entries: [
          "The blob moves up to its {@variantrule Speed|XPHB} and can move through the spaces of Huge or smaller creatures and objects. {@actSave str} {@dc 23}, each creature or object whose space the blob enters for the first time during this move. {@actSaveFail} The target is engulfed. While engulfed, a target has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the blob, and when the blob moves, the engulfed target moves with it. A nonmagical object is destroyed after spending 1 minute engulfed.",
          "While engulfed, a creature takes 21 ({@damage 6d6}) Force damage at the start of each of its turns, is suffocating, has the {@condition Restrained|XPHB} condition, and repeats the save at the end of each of its turns. An engulfed creature that is reduced to 0 {@variantrule Hit Points|XPHB} dissolves into ash, which is ejected into the Astral Sea. {@actSaveSuccess} The target escapes and enters the nearest unoccupied space.",
        ],
      },
      {
        name: "Restraining Glob",
        entries: [
          "The blob lobs a slimy glob at one Large or smaller creature it can see within 600 feet of itself. {@actSave dex} {@dc 23}, the targeted creature. {@actSaveFail} 18 ({@damage 3d6 + 8}) Acid damage. The glob rolls the target 60 feet straight toward the blob, and the target has the {@condition Restrained|XPHB} condition until the end of its next turn, when the glob harmlessly dissolves. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    legendary: [
      {
        name: "Decay",
        entries: [
          "The blob deals 14 ({@damage 4d6}) Necrotic damage to each creature engulfed by it. The blob can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Grasping Glob",
        entries: [
          "The blob uses Restraining Glob. The blob can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Lashing Goop",
        entries: ["The blob makes one Pseudopod attack."],
      },
    ],
    environment: ["any"],
    treasure: ["any"],
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    damageTags: ["A", "N", "O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["restrained"],
    savingThrowForced: ["dexterity", "strength"],
  },
  {
    name: "Empyrean",
    group: ["Titans"],
    source: "XMM",
    page: 113,
    size: ["H"],
    type: {
      type: {
        choose: ["celestial", "fiend"],
      },
      tags: ["titan"],
    },
    alignment: ["N"],
    ac: [22],
    hp: {
      average: 346,
      formula: "21d12 + 210",
    },
    speed: {
      walk: 50,
      fly: {
        number: 50,
        condition: "(hover)",
      },
      swim: 50,
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 21,
    con: 30,
    int: 21,
    wis: 22,
    cha: 27,
    save: {
      str: "+17",
      wis: "+13",
    },
    skill: {
      insight: "+13",
      perception: "+13",
    },
    senses: ["truesight 120 ft."],
    passive: 23,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["necrotic", "radiant"],
    languages: ["all"],
    cr: "23",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The empyrean casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 23}):",
        ],
        will: [
          "{@spell Calm Emotions|XPHB}",
          "{@spell Greater Restoration|XPHB}",
          "{@spell Pass without Trace|XPHB}",
          "{@spell Water Breathing|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Commune|XPHB}",
            "{@spell Dispel Evil and Good|XPHB}",
            "{@spell Plane Shift|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the empyrean fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The empyrean has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The empyrean makes two attacks, using Sacred Weapon or Divine Ray in any combination.",
        ],
      },
      {
        name: "Sacred Weapon",
        entries: [
          "{@atkr m} {@hit 17}, reach 10 ft. {@h}31 ({@damage 6d6 + 10}) Force damage, and the target has the {@condition Stunned|XPHB} condition until the start of the empyrean's next turn. The target can choose not to be {@condition Stunned|XPHB}, in which case it takes an extra 21 Force damage that bypasses {@variantrule Resistance|XPHB} or {@variantrule Immunity|XPHB}.",
        ],
      },
      {
        name: "Divine Ray",
        entries: [
          "{@atkr r} {@hit 15}, range 600 ft. {@h}35 ({@damage 6d8 + 8}) Necrotic or Radiant damage (empyrean's choice).",
        ],
      },
    ],
    legendary: [
      {
        name: "Bolster",
        entries: [
          "The empyrean gains 10 {@variantrule Temporary Hit Points|XPHB}, and the empyrean and each ally within 30 feet of it gain {@variantrule Advantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests} until the end of the empyrean's next turn. The empyrean can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Shockwave of Glory",
        entries: [
          "{@actSave con} {@dc 23}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the empyrean. {@actSaveFail} 27 ({@damage 6d8}) Force damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} The empyrean can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Smite",
        entries: ["The empyrean makes one Divine Ray attack."],
      },
    ],
    environment: ["any"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/empyrean.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["XX"],
    damageTags: ["N", "O", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["prone", "stunned"],
    savingThrowForced: ["constitution"],
    savingThrowForcedSpell: ["charisma"],
  },
  {
    name: "Kraken",
    group: ["Titans"],
    source: "XMM",
    page: 187,
    size: ["G"],
    type: {
      type: "monstrosity",
      tags: ["titan"],
    },
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 481,
      formula: "26d20 + 208",
    },
    speed: {
      walk: 30,
      swim: 120,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 11,
    con: 26,
    int: 22,
    wis: 18,
    cha: 20,
    save: {
      str: "+17",
      dex: "+7",
      con: "+15",
      wis: "+11",
    },
    skill: {
      history: "+13",
      perception: "+11",
    },
    senses: ["truesight 120 ft."],
    passive: 21,
    immune: ["cold", "lightning"],
    conditionImmune: ["frightened", "grappled", "paralyzed", "restrained"],
    languages: [
      "understands Abyssal",
      "Celestial",
      "Infernal",
      "and Primordial but can't speak; telepathy 120 ft.",
    ],
    cr: {
      cr: "23",
      xpLair: 62000,
    },
    trait: [
      {
        name: "Amphibious",
        entries: ["The kraken can breathe air and water."],
      },
      {
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
        entries: [
          "If the kraken fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Siege Monster",
        entries: ["The kraken deals double damage to objects and structures."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The kraken makes two Tentacle attacks and uses Fling, Lightning Strike, or Swallow.",
        ],
      },
      {
        name: "Tentacle",
        entries: [
          "{@atkr m} {@hit 17}, reach 30 ft. {@h}24 ({@damage 4d6 + 10}) Bludgeoning damage. The target has the {@condition Grappled|XPHB} condition (escape {@dc 20}) from one of ten tentacles, and it has the {@condition Restrained|XPHB} condition until the grapple ends.",
        ],
      },
      {
        name: "Fling",
        entries: [
          "The kraken throws a Large or smaller creature {@condition Grappled|XPHB} by it to a space it can see within 60 feet of itself that isn't in the air. {@actSave dex} {@dc 25}, the creature thrown and each creature in the destination space. {@actSaveFail} 18 ({@damage 4d8}) Bludgeoning damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only.",
        ],
      },
      {
        name: "Lightning Strike",
        entries: [
          "{@actSave dex} {@dc 23}, one creature the kraken can see within 120 feet. {@actSaveFail} 33 ({@damage 6d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Swallow",
        entries: [
          "{@actSave dex} {@dc 25}, one creature {@condition Grappled|XPHB} by the kraken (it can have up to four creatures swallowed at a time). {@actSaveFail} 23 ({@damage 3d8 + 10}) Piercing damage. If the target is Large or smaller, it is swallowed and no longer {@condition Grappled|XPHB}. A swallowed creature has the {@condition Restrained|XPHB} condition, has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the kraken, and takes 24 ({@damage 7d6}) Acid damage at the start of each of its turns.",
          "If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a {@dc 25} Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken with the {@condition Prone|XPHB} condition. If the kraken dies, any swallowed creature no longer has the {@condition Restrained|XPHB} condition and can escape from the corpse using 15 feet of movement, exiting {@condition Prone|XPHB}.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Storm Bolt",
        entries: ["The kraken uses Lightning Strike."],
      },
      {
        name: "Toxic Ink",
        entries: [
          "{@actSave con} {@dc 23}, each creature in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the kraken while it is underwater. {@actSaveFail} The target has the {@condition Blinded|XPHB} and {@condition Poisoned|XPHB} conditions until the end of the kraken's next turn. The kraken then moves up to its {@variantrule Speed|XPHB}. {@actSaveSuccessOrFail} The kraken can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Kraken",
      source: "XMM",
    },
    environment: ["underwater"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/kraken.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances", "Siege Monster"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Swallow", "Tentacles"],
    languageTags: ["AB", "CE", "CS", "I", "P", "TP"],
    damageTags: ["A", "B", "L", "P"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["constitution", "dexterity"],
  },
];
