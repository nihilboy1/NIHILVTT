// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_24 = [
  {
    name: "Ancient Gold Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 146,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [22],
    hp: {
      average: 546,
      formula: "28d20 + 252",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 14,
    con: 29,
    int: 18,
    wis: 17,
    cha: 28,
    save: {
      dex: "+9",
      wis: "+10",
    },
    skill: {
      insight: "+10",
      perception: "+17",
      persuasion: "+16",
      stealth: "+9",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 27,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "24",
      xpLair: 75000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 24}, {@hit 16} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Guiding Bolt|XPHB} (level 4 version)",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Flame Strike|XPHB} (level 6 version)",
            "{@spell Word of Recall|XPHB}",
            "{@spell Zone of Truth|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 4 version) or (B) Weakening Breath.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 17} to hit, reach 15 ft. {@h}19 ({@damage 2d8 + 10}) Slashing damage plus 9 ({@damage 2d8}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 24}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 71 ({@damage 13d10}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Weakening Breath",
        entries: [
          "{@actSave str} {@dc 24}, each creature that isn't currently affected by this breath in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} and subtracts 5 ({@dice 1d10}) from its damage rolls. It repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Banish",
        entries: [
          "{@actSave cha} {@dc 24}, one creature the dragon can see within 120 feet. {@actSaveFail} 24 ({@damage 7d6}) Force damage, and the target has the {@condition Incapacitated|XPHB} condition and is transported to a harmless demiplane until the start of the dragon's next turn, at which point it reappears in an unoccupied space of the dragon's choice within 120 feet of the dragon. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Guiding Light",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 4 version).",
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
    dragonAge: "ancient",
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
    name: "Ancient Red Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 256,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [22],
    hp: {
      average: 507,
      formula: "26d20 + 234",
    },
    speed: {
      walk: 40,
      climb: 40,
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
    cha: 27,
    save: {
      dex: "+7",
      wis: "+9",
    },
    skill: {
      perception: "+16",
      stealth: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 26,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "24",
      xpLair: 75000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 23}, {@hit 15} to hit with spell attacks):",
        ],
        will: [
          "{@spell Command|XPHB} (level 2 version)",
          "{@spell Detect Magic|XPHB}",
          "{@spell Scorching Ray|XPHB} (level 3 version)",
        ],
        daily: {
          "1e": [
            "{@spell Fireball|XPHB} (level 6 version)",
            "{@spell Scrying|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Scorching Ray|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 17}, reach 15 ft. {@h}19 ({@damage 2d8 + 10}) Slashing damage plus 10 ({@damage 3d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 24}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 91 ({@damage 26d6}) Fire damage. {@actSaveSuccess} Half damage.",
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
          "The dragon uses Spellcasting to cast {@spell Scorching Ray|XPHB} (level 3 version). The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
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
];
