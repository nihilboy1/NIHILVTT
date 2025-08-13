// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_14 = [
  {
    name: "Adult Black Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 39,
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
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 195,
      formula: "17d12 + 85",
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
    dex: 14,
    con: 21,
    int: 14,
    wis: 13,
    cha: 19,
    save: {
      dex: "+7",
      wis: "+6",
    },
    skill: {
      perception: "+11",
      stealth: "+7",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 21,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "14",
      xpLair: 13000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 17}, {@hit 9} to hit with spell attacks):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Fear|XPHB}",
          "{@spell Melf's Acid Arrow|XPHB} (level 3 version)",
        ],
        daily: {
          "1e": [
            "{@spell Speak with Dead|XPHB}",
            "{@spell Vitriolic Sphere|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Melf's Acid Arrow|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}13 ({@damage 2d6 + 6}) Slashing damage plus 4 ({@damage 1d8}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 60-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 54 ({@damage 12d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Cloud of Insects",
        entries: [
          "{@actSave dex} {@dc 17}, one creature the dragon can see within 120 feet. {@actSaveFail} 22 ({@damage 4d10}) Poison damage, and the target has {@variantrule Disadvantage|XPHB} on saving throws to maintain {@status Concentration|XPHB} until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Frightful Presence",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Fear|XPHB}. The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Pounce",
        entries: [
          "The dragon can move up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Black Dragon",
      source: "XMM",
    },
    environment: ["swamp"],
    treasure: ["relics"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/black-dragon.mp3",
    },
    traitTags: ["Amphibious", "Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["A", "I", "S"],
    damageTagsSpell: ["A"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflictSpell: ["frightened"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Adult Copper Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 79,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [18],
    hp: {
      average: 184,
      formula: "16d12 + 80",
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: 80,
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
      stealth: "+6",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 22,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "14",
      xpLair: 13000,
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
          "{@spell Mind Spike|XPHB} (level 4 version)",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Greater Restoration|XPHB}",
            "{@spell Major Image|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast {@spell Mind Spike|XPHB} (level 4 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}17 ({@damage 2d10 + 6}) Slashing damage plus 4 ({@damage 1d8}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in an 60-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 54 ({@damage 12d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Slowing Breath",
        entries: [
          "{@actSave con} {@dc 18}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target can't take Reactions; its {@variantrule Speed|XPHB} is halved; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. This effect lasts until the end of its next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Giggling Magic",
        entries: [
          "{@actSave cha} {@dc 17}, one creature the dragon can see within 90 feet. {@actSaveFail} 24 ({@damage 7d6}) Psychic damage. Until the end of its next turn, the target rolls {@dice 1d6} whenever it makes an ability check or attack roll and subtracts the number rolled from the {@variantrule D20 Test|XPHB}. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Mind Jolt",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Mind Spike|XPHB} (level 4 version). The dragon can't take this action again until the start of its next turn.",
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
      name: "Copper Dragon",
      source: "XMM",
    },
    environment: ["hill"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/copper-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["A", "S", "Y"],
    damageTagsSpell: ["Y"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["charisma", "constitution", "dexterity"],
    savingThrowForcedLegendary: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Death Tyrant",
    group: ["Beholders"],
    source: "XMM",
    page: 95,
    size: ["L"],
    type: {
      type: "undead",
      tags: ["beholder"],
    },
    alignment: ["L", "E"],
    ac: [19],
    hp: {
      average: 195,
      formula: "26d10 + 52",
    },
    speed: {
      walk: 5,
      fly: {
        number: 40,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 14,
    con: 14,
    int: 19,
    wis: 15,
    cha: 19,
    save: {
      con: "+7",
      wis: "+7",
    },
    skill: {
      perception: "+12",
    },
    senses: ["darkvision 120 ft."],
    passive: 22,
    immune: ["poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
    ],
    languages: ["Deep Speech", "Undercommon"],
    cr: {
      cr: "14",
      xpLair: 13000,
    },
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the death tyrant fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The death tyrant uses Eye Rays three times."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 feet. {@h}13 ({@damage 2d8 + 4}) Piercing damage.",
        ],
      },
      {
        name: "Eye Rays",
        entries: [
          "The death tyrant randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll {@dice 1d10}; reroll if the death tyrant has already used that ray during this turn):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1: Charm Ray",
                entries: [
                  "{@actSave wis} {@dc 17}. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage, and the target has the {@condition Charmed|XPHB} condition for 1 hour or until it takes damage. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "2: Paralyzing Ray",
                entries: [
                  "{@actSave con} {@dc 17}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
                ],
              },
              {
                type: "item",
                name: "3: Fear Ray",
                entries: [
                  "{@actSave wis} {@dc 17}. {@actSaveFail} 10 ({@damage 3d6}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "4: Slowing Ray",
                entries: [
                  "{@actSave con} {@dc 17}. {@actSaveFail} 18 ({@damage 4d8}) Necrotic damage. Until the end of the target's next turn, the target can't take Reactions; its {@variantrule Speed|XPHB} is halved; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "5: Enervation Ray",
                entries: [
                  "{@actSave con} {@dc 17}. {@actSaveFail} 16 ({@damage 3d10}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "6: Telekinetic Ray",
                entries: [
                  "{@actSave str} {@dc 17} (the target succeeds automatically if it is Gargantuan). {@actSaveFail} The death tyrant moves the target up to 30 feet in any direction. The target has the {@condition Restrained|XPHB} condition until the start of the death tyrant's next turn or until the death tyrant has the {@condition Incapacitated|XPHB} condition. The death tyrant can also exert fine control on objects with this ray, such as manipulating a tool or opening a door or container.",
                ],
              },
              {
                type: "item",
                name: "7: Sleep Ray",
                entries: [
                  "{@actSave wis} {@dc 17} (the target succeeds automatically if it is a Construct or an Undead). {@actSaveFail} The target has the {@condition Unconscious|XPHB} condition for 1 minute. The condition ends if the target takes damage or a creature within 5 feet of it takes an action to wake it.",
                ],
              },
              {
                type: "item",
                name: "8: Petrification Ray",
                entries: [
                  "{@actSave con} {@dc 17}. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
                ],
              },
              {
                type: "item",
                name: "9: Disintegration Ray",
                entries: [
                  "{@actSave dex} {@dc 17}. {@actSaveFail} 36 ({@damage 8d8}) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 {@variantrule Hit Points|XPHB}, it disintegrates into dust.",
                ],
              },
              {
                type: "item",
                name: "10: Death Ray",
                entries: [
                  "{@actSave dex} {@dc 17}. {@actSaveFail} 55 ({@damage 10d10}) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target dies if the ray reduces it to 0 {@variantrule Hit Points|XPHB}.",
                ],
              },
            ],
          },
        ],
      },
    ],
    bonus: [
      {
        name: "Negative Energy Cone",
        entries: [
          "The death tyrant's central eye emits an imperceptible, magical wave of negative energy in a 150-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Creatures in that area can't regain {@variantrule Hit Points|XPHB} until the start of the death tyrant's next turn. An intact Humanoid corpse there instantly rises as a {@creature Zombie|XMM} under the death tyrant's control and takes its turn immediately after the death tyrant on the same initiative count.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Chomp",
        entries: ["The death tyrant makes two Bite attacks."],
      },
      {
        name: "Glare",
        entries: ["The death tyrant uses Eye Rays."],
      },
    ],
    legendaryGroup: {
      name: "Death Tyrant",
      source: "XMM",
    },
    environment: ["underdark"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/death-tyrant.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["DS", "U"],
    damageTags: ["I", "N", "O", "P", "Y"],
    miscTags: ["MA"],
    conditionInflict: [
      "charmed",
      "frightened",
      "incapacitated",
      "paralyzed",
      "petrified",
      "poisoned",
      "restrained",
      "unconscious",
    ],
    savingThrowForced: ["constitution", "dexterity", "strength", "wisdom"],
    savingThrowForcedLegendary: ["wisdom"],
  },
  {
    name: "Ice Devil",
    group: ["Devils"],
    source: "XMM",
    page: 176,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 228,
      formula: "24d10 + 96",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 14,
    con: 18,
    int: 18,
    wis: 15,
    cha: 18,
    save: {
      dex: "+7",
      con: "+9",
      wis: "+7",
      cha: "+9",
    },
    skill: {
      insight: "+7",
      perception: "+7",
      persuasion: "+9",
    },
    senses: ["blindsight 120 ft."],
    passive: 17,
    immune: ["cold", "fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "14",
    spellcasting: [
      {
        name: "Ice Wall {@recharge}",
        type: "spellcasting",
        headerEntries: [
          "The devil casts {@spell Wall of Ice|XPHB} (level 8 version), requiring no spell components and using Intelligence as the spellcasting ability (spell save {@dc 17}).",
        ],
        recharge: {
          "6": ["{@spell Wall of Ice|XPHB} (level 8 version)"],
        },
        ability: "int",
        displayAs: "action",
        hidden: ["recharge"],
      },
    ],
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
          "The devil makes three Ice Spear attacks. It can replace one attack with a Tail attack.",
        ],
      },
      {
        name: "Ice Spear",
        entries: [
          "{@atkr m,r} {@hit 10}, reach 5 ft. or range 30/120 ft. {@h}14 ({@damage 2d8 + 5}) Piercing damage plus 10 ({@damage 3d6}) Cold damage. Until the end of its next turn, the target can't take a {@variantrule Bonus Action|XPHB} or {@variantrule Reaction|XPHB}, its {@variantrule Speed|XPHB} decreases by 10 feet, and it can move or take one action on its turn, not both. {@hom}The spear magically returns to the devil's hand immediately after a ranged attack.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}15 ({@damage 3d6 + 5}) Bludgeoning damage plus 18 ({@damage 4d8}) Cold damage.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/ice-devil.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["B"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["B", "C", "P"],
    damageTagsSpell: ["C"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RA", "RCH", "THW"],
    savingThrowForcedSpell: ["constitution", "dexterity"],
  },
];
