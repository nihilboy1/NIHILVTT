// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_22 = [
  {
    name: "Ancient Bronze Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 60,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["L", "G"],
    ac: [22],
    hp: {
      average: 444,
      formula: "24d20 + 192",
    },
    speed: {
      walk: 40,
      fly: 80,
      swim: 40,
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
      insight: "+10",
      perception: "+17",
      stealth: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 27,
    immune: ["lightning"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "22",
      xpLair: 50000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 22}, {@hit 14} to hit with spell attacks):",
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
            "{@spell Control Water|XPHB}",
            "{@spell Scrying|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Repulsion Breath or (B) Spellcasting to cast {@spell Guiding Bolt|XPHB} (level 2 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 16}, reach 15 ft. {@h}18 ({@damage 2d8 + 9}) Slashing damage plus 9 ({@damage 2d8}) Lightning damage.",
        ],
      },
      {
        name: "Lightning Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 23}, each creature in a 120-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 82 ({@damage 15d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Repulsion Breath",
        entries: [
          "{@actSave str} {@dc 23}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target is pushed up to 60 feet straight away from the dragon and has the {@condition Prone|XPHB} condition.",
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
          "{@actSave con} {@dc 22}, each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 120 feet. {@actSaveFail} 13 ({@damage 3d8}) Thunder damage, and the target has the {@condition Deafened|XPHB} condition until the end of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Bronze Dragon",
      source: "XMM",
    },
    environment: ["coastal"],
    treasure: ["implements"],
    dragonAge: "ancient",
    soundClip: {
      type: "internal",
      path: "bestiary/bronze-dragon.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["L", "S", "T"],
    damageTagsSpell: ["B", "R"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflict: ["deafened", "prone"],
    savingThrowForced: ["constitution", "dexterity", "strength"],
    savingThrowForcedSpell: ["strength", "wisdom"],
  },
  {
    name: "Ancient Green Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 154,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["L", "E"],
    ac: [21],
    hp: {
      average: 402,
      formula: "23d20 + 161",
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
    dex: 12,
    con: 25,
    int: 20,
    wis: 17,
    cha: 22,
    save: {
      dex: "+8",
      wis: "+10",
    },
    skill: {
      deception: "+13",
      perception: "+17",
      persuasion: "+13",
      stealth: "+8",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 27,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "22",
      xpLair: 50000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 21}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Mind Spike|XPHB} (level 5 version)",
        ],
        daily: {
          "1e": ["{@spell Geas|XPHB}", "{@spell Modify Memory|XPHB}"],
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Mind Spike|XPHB} (level 5 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 15}, reach 15 ft. {@h}17 ({@damage 2d8 + 8}) Slashing damage plus 10 ({@damage 3d6}) Poison damage.",
        ],
      },
      {
        name: "Poison Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 22}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 77 ({@damage 22d6}) Poison damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Mind Invasion",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Mind Spike|XPHB} (level 5 version).",
        ],
      },
      {
        name: "Noxious Miasma",
        entries: [
          "{@actSave con} {@dc 21}, each creature in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 90 feet. {@actSaveFail} 17 ({@damage 5d6}) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
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
    conditionInflictSpell: ["charmed", "incapacitated"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Elemental Cataclysm",
    group: ["Titans"],
    source: "XMM",
    page: 111,
    size: ["G"],
    type: {
      type: "elemental",
      tags: ["titan"],
    },
    alignment: ["C", "N"],
    ac: [20],
    hp: {
      average: 370,
      formula: "20d20 + 160",
    },
    speed: {
      walk: 60,
      burrow: 60,
      fly: {
        number: 80,
        condition: "(hover)",
      },
      swim: 80,
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 26,
    dex: 19,
    con: 27,
    int: 9,
    wis: 14,
    cha: 9,
    save: {
      dex: "+11",
      con: "+15",
      wis: "+9",
      cha: "+6",
    },
    senses: ["truesight 150 ft."],
    passive: 12,
    immune: ["acid", "cold", "fire", "lightning", "poison", "thunder"],
    conditionImmune: [
      "blinded",
      "charmed",
      "deafened",
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
    languages: ["Primordial"],
    cr: "22",
    spellcasting: [
      {
        name: "Control Weather",
        type: "spellcasting",
        headerEntries: [
          "The cataclysm casts the {@spell Control Weather|XPHB} spell, requiring no spell components and using Constitution as the spellcasting ability.",
        ],
        will: ["{@spell Control Weather|XPHB}"],
        ability: "con",
        displayAs: "action",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Earth Glide",
        entries: [
          "The cataclysm can burrow through nonmagical, unworked earth and stone. While doing so, the cataclysm doesn't disturb the material it moves through.",
        ],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the cataclysm fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Siege Monster",
        entries: [
          "The cataclysm deals double damage to objects and structures.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The cataclysm makes two Elemental Burst attacks."],
      },
      {
        name: "Elemental Burst",
        entries: [
          "{@atkr m,r} {@hit 15}, reach 30 ft. or range 150 ft. {@h}25 ({@damage 5d6 + 8}) damage of a type chosen by the cataclysm: Acid, Cold, Fire, Lightning, or Thunder.",
        ],
      },
      {
        name: "Cataclysmic Event {@recharge 4}",
        entries: [
          "The cataclysm creates one of the following effects at random (roll {@dice 1d4}):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1: Clinging Flames",
                entries: [
                  "{@actSave dex} {@dc 23}, each creature in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the cataclysm can see within 150 feet. {@actSaveFail} 45 ({@damage 13d6}) Fire damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target starts {@hazard burning|XPHB}.",
                ],
              },
              {
                type: "item",
                name: "2: Freezing Waves",
                entries: [
                  "{@actSave str} {@dc 23}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 22 ({@damage 5d8}) Bludgeoning damage plus 22 ({@damage 5d8}) Cold damage, and the target has the {@condition Prone|XPHB} condition. {@actSaveSuccess} Half damage only. {@actSaveSuccessOrFail} The target's {@variantrule Speed|XPHB} is reduced to 0 until the end of its next turn.",
                ],
              },
              {
                type: "item",
                name: "3: Raging Storm",
                entries: [
                  "A storm cloud fills a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the cataclysm can see within 150 feet. The cloud lasts for 1 minute or until the cataclysm uses Cataclysmic Event again. Creatures entirely in the cloud have the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions and can't cast spells with a Verbal component. {@actSave dex} {@dc 23}, each creature that enters the cloud for the first time on a turn or starts its turn there. {@actSaveFail} 18 ({@damage 4d8}) Lightning damage plus 18 ({@damage 4d8}) Thunder damage. {@actSaveSuccess} Half damage.",
                ],
              },
              {
                type: "item",
                name: "4: Swallowing Earth",
                entries: [
                  "{@actSave str} {@dc 23}, each creature in a 90-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} originating from a point on the ground within 150 feet. {@actSaveFail} 18 ({@damage 4d8}) Bludgeoning damage plus 18 ({@damage 4d8}) Acid damage, and the target has the {@condition Prone|XPHB} condition and is buried under rubble. A buried target has the {@condition Restrained|XPHB} condition, has {@variantrule Cover|XPHB|Total Cover}, and is suffocating. As an action, a buried creature or another creature within 5 feet of it can make a {@dc 18} Strength ({@skill Athletics|XPHB}) check. On a successful check, the creature is no longer buried. {@actSaveSuccess} Half damage only.",
                ],
              },
            ],
          },
        ],
      },
    ],
    legendary: [
      {
        name: "Eruption",
        entries: ["The cataclysm makes one Elemental Burst attack."],
      },
      {
        name: "Rumbling Movement",
        entries: [
          "The cataclysm moves up to its {@variantrule Speed|XPHB}, {@variantrule Fly Speed|XPHB}, or {@variantrule Swim Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}. Each creature within 5 feet of the cataclysm as it moves is targeted once by the following effect. {@actSave con} {@dc 23}. {@actSaveFail} The target has the {@condition Prone|XPHB} condition. {@actSaveSuccessOrFail} The cataclysm can't take this action again until the start of its next turn.",
        ],
      },
    ],
    environment: ["planar, elemental chaos"],
    traitTags: ["Legendary Resistances", "Siege Monster"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["P"],
    damageTags: ["A", "B", "C", "F", "L", "T"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA", "RCH"],
    conditionInflict: ["prone", "restrained"],
    savingThrowForced: ["constitution", "dexterity", "strength"],
  },
];
