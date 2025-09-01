// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_21 = [
  {
    name: "Ancient Black Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 40,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [22],
    hp: {
      average: 367,
      formula: "21d20 + 147",
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
    cha: 22,
    save: {
      dex: "+9",
      wis: "+9",
    },
    skill: {
      perception: "+16",
      stealth: "+9",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 26,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "21",
      xpLair: 41000,
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
          "{@spell Fear|XPHB}",
          "{@spell Melf's Acid Arrow|XPHB} (level 4 version)",
        ],
        daily: {
          "1e": [
            "{@spell Create Undead|XPHB}",
            "{@spell Speak with Dead|XPHB}",
            "{@spell Vitriolic Sphere|XPHB} (level 5 version)",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast {@spell Melf's Acid Arrow|XPHB} (level 4 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 15}, reach 15 ft. {@h}17 ({@damage 2d8 + 8}) Slashing damage plus 9 ({@damage 2d8}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 22}, each creature in a 90-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 67 ({@damage 15d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Cloud of Insects",
        entries: [
          "{@actSave dex} {@dc 21}, one creature the dragon can see within 120 feet. {@actSaveFail} 33 ({@damage 6d10}) Poison damage, and the target has {@variantrule Disadvantage|XPHB} on saving throws to maintain {@status Concentration|XPHB} until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
          "The dragon moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Black Dragon",
      source: "XMM",
    },
    environment: ["swamp"],
    treasure: ["relics"],
    dragonAge: "ancient",
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
    name: "Ancient Copper Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 80,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [21],
    hp: {
      average: 367,
      formula: "21d20 + 147",
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
      stealth: "+8",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 27,
    immune: ["acid"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "21",
      xpLair: 41000,
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
          "{@spell Minor Illusion|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
        ],
        daily: {
          "1e": [
            "{@spell Greater Restoration|XPHB}",
            "{@spell Major Image|XPHB}",
            "{@spell Project Image|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Slowing Breath or (B) Spellcasting to cast {@spell Mind Spike|XPHB} (level 5 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 15}, reach 15 ft. {@h}19 ({@damage 2d10 + 8}) Slashing damage plus 9 ({@damage 2d8}) Acid damage.",
        ],
      },
      {
        name: "Acid Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 22}, each creature in an 90-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 63 ({@damage 14d8}) Acid damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Slowing Breath",
        entries: [
          "{@actSave con} {@dc 22}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target can't take Reactions; its {@variantrule Speed|XPHB} is halved; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. This effect lasts until the end of its next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Giggling Magic",
        entries: [
          "{@actSave cha} {@dc 21}, one creature the dragon can see within 120 feet. {@actSaveFail} 31 ({@damage 9d6}) Psychic damage. Until the end of its next turn, the target rolls {@dice 1d8} whenever it makes an ability check or attack roll and subtracts the number rolled from the {@variantrule D20 Test|XPHB}. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Mind Jolt",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Mind Spike|XPHB} (level 5 version). The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
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
    name: "Arch-hag",
    source: "XMM",
    page: 21,
    size: ["L"],
    type: "fey",
    alignment: ["N", "E"],
    ac: [20],
    hp: {
      average: 333,
      formula: "29d10 + 174",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 24,
    dex: 15,
    con: 23,
    int: 19,
    wis: 19,
    cha: 25,
    save: {
      dex: "+9",
      wis: "+11",
    },
    skill: {
      deception: "+14",
      perception: "+11",
      persuasion: "+21",
    },
    senses: ["truesight 60 ft."],
    passive: 21,
    resist: ["cold", "fire", "psychic"],
    conditionImmune: ["charmed", "exhaustion", "frightened"],
    languages: ["all"],
    cr: {
      cr: "21",
      xpLair: 41000,
    },
    spellcasting: [
      {
        name: "Coven Magic",
        type: "spellcasting",
        headerEntries: [
          "While within 30 feet of at least two hag allies, the hag can cast one of the following spells, requiring no Material components, using the spell's normal casting time, and using Intelligence as the spellcasting ability (spell save {@dc 19}): {@spell Augury|XPHB}, {@spell Find Familiar|XPHB}, {@spell Identify|XPHB}, {@spell Locate Object|XPHB}, {@spell Scrying|XPHB}, or {@spell Unseen Servant|XPHB}. The hag must finish a {@variantrule Long Rest|XPHB} before using this trait to cast that spell again.",
        ],
        restLong: {
          "1": [
            "{@spell Augury|XPHB}",
            "{@spell Find Familiar|XPHB}",
            "{@spell Identify|XPHB}",
            "{@spell Locate Object|XPHB}",
            "{@spell Scrying|XPHB}",
            "{@spell Unseen Servant|XPHB}",
          ],
        },
        ability: "int",
        hidden: ["restLong"],
      },
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The hag casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 22}):",
        ],
        will: [
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Dimension Door|XPHB}",
          "{@spell Dispel Magic|XPHB}",
          "{@spell Hypnotic Pattern|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Mass Suggestion|XPHB}",
            "{@spell Modify Memory|XPHB}",
            "{@spell Plane Shift|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Tongue Twister",
        type: "spellcasting",
        headerEntries: [
          "The hag casts {@spell Counterspell|XPHB} in response to that spell's trigger, using the same spellcasting ability as Spellcasting. If the target fails its saving throw, it is cursed until the end of its next turn. Until the curse ends, the target can't cast spells with a Verbal component, and when it speaks, it says the opposite of what it means.",
        ],
        will: ["{@spell Counterspell|XPHB}"],
        ability: "cha",
        displayAs: "reaction",
        hidden: ["will"],
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
        entries: [
          "If the hag fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The hag has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Spiteful Escape",
        entries: [
          "When the hag drops to 0 {@variantrule Hit Points|XPHB}, it dies only if it is within 30 feet of its anathema (a thing the DM chooses as the hag's most hated thing). Otherwise, the hag drops to 1 {@variantrule Hit Points|XPHB|Hit Point} and teleports to a harmless demiplane, and it can't return to the plane it left for {@dice 2d6} days. When the hag teleports away, each creature within 60 feet of the space it left is cursed. Until the curse ends, a creature has {@variantrule Disadvantage|XPHB} on ability checks and saving throws, and the hag knows its location anywhere in the multiverse.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The hag makes two Spectral Claw attacks and uses Crackling Wave.",
        ],
      },
      {
        name: "Spectral Claw",
        entries: [
          "{@atkr m,r} {@hit 14}, reach 10 ft. or range 60 ft. {@h}17 ({@damage 3d6 + 7}) Force damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Crackling Wave",
        entries: [
          "{@actSave dex} {@dc 22}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 32 ({@damage 5d12}) Lightning damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target is cursed until the end of the hag's next turn. The target can't take Reactions until the curse ends.",
        ],
      },
    ],
    bonus: [
      {
        name: "Witch Strike",
        entries: [
          "Each creature cursed by the hag and within 60 feet of it takes 14 ({@damage 4d6}) Lightning damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Hag's Swipe",
        entries: ["The hag makes one Spectral Claw attack."],
      },
      {
        name: "Malicious Magic",
        entries: [
          "The hag uses Spellcasting to cast {@spell Dimension Door|XPHB} or {@spell Hypnotic Pattern|XPHB}. The hag can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Arch-hag",
      source: "XMM",
    },
    environment: ["any"],
    treasure: ["arcana"],
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["XX"],
    damageTags: ["L", "O"],
    damageTagsSpell: ["O"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "CUR", "MA", "RA", "RCH"],
    conditionInflict: ["prone"],
    conditionInflictSpell: ["charmed", "incapacitated"],
    savingThrowForced: ["dexterity"],
    savingThrowForcedLegendary: ["wisdom"],
    savingThrowForcedSpell: ["constitution", "wisdom"],
  },
  {
    name: "Lich",
    source: "XMM",
    page: 196,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["M"],
    type: {
      type: "undead",
      tags: ["wizard"],
    },
    alignment: ["N", "E"],
    ac: [20],
    hp: {
      average: 315,
      formula: "42d8 + 126",
    },
    speed: {
      walk: 30,
    },
    initiative: {
      proficiency: 2,
    },
    str: 11,
    dex: 16,
    con: 16,
    int: 21,
    wis: 14,
    cha: 16,
    save: {
      dex: "+10",
      con: "+10",
      int: "+12",
      wis: "+9",
    },
    skill: {
      arcana: "+19",
      history: "+12",
      insight: "+9",
      perception: "+9",
    },
    senses: ["truesight 120 ft."],
    passive: 19,
    resist: ["cold", "lightning"],
    immune: ["necrotic", "poison"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    languages: ["all"],
    cr: {
      cr: "21",
      xpLair: 41000,
    },
    gear: ["component pouch|xphb"],
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save {@dc 20}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Dispel Magic|XPHB}",
          "{@spell Fireball|XPHB} (level 5 version)",
          "{@spell Invisibility|XPHB}",
          "{@spell Lightning Bolt|XPHB} (level 5 version)",
          "{@spell Mage Hand|XPHB}",
          "{@spell Prestidigitation|XPHB}",
        ],
        daily: {
          "2e": [
            "{@spell Animate Dead|XPHB}",
            "{@spell Dimension Door|XPHB}",
            "{@spell Plane Shift|XPHB}",
          ],
          "1e": [
            "{@spell Chain Lightning|XPHB}",
            "{@spell Finger of Death|XPHB}",
            "{@spell Power Word Kill|XPHB}",
            "{@spell Scrying|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Protective Magic",
        type: "spellcasting",
        headerEntries: [
          "The lich casts {@spell Counterspell|XPHB} or {@spell Shield|XPHB} in response to the spell's trigger, using the same spellcasting ability as Spellcasting.",
        ],
        will: ["{@spell Counterspell|XPHB}", "{@spell Shield|XPHB}"],
        ability: "int",
        displayAs: "reaction",
        hidden: ["will"],
      },
      {
        name: "Frightening Gaze",
        type: "spellcasting",
        headerEntries: [
          "The lich casts {@spell Fear|XPHB}, using the same spellcasting ability as Spellcasting. The lich can't take this action again until the start of its next turn.",
        ],
        legendary: {
          "1": ["{@spell Fear|XPHB}"],
        },
        ability: "int",
        displayAs: "legendary",
        hidden: ["legendary"],
      },
    ],
    trait: [
      {
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
        entries: [
          "If the lich fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Spirit Jar",
        entries: [
          "If destroyed, the lich reforms in {@dice 1d10} days if it has a spirit jar, reviving with all its {@variantrule Hit Points|XPHB}. The new body appears in an unoccupied space within the lich's lair.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination.",
        ],
      },
      {
        name: "Eldritch Burst",
        entries: [
          "{@atkr m,r} {@hit 12}, reach 5 ft. or range 120 ft. {@h}31 ({@damage 4d12 + 5}) Force damage.",
        ],
      },
      {
        name: "Paralyzing Touch",
        entries: [
          "{@atkr m} {@hit 12}, reach 5 ft. {@h}15 ({@damage 3d6 + 5}) Cold damage, and the target has the {@condition Paralyzed|XPHB} condition until the start of the lich's next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Deathly Teleport",
        entries: [
          "The lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 ({@damage 2d10}) Necrotic damage.",
        ],
      },
      {
        name: "Disrupt Life",
        entries: [
          "{@actSave con} {@dc 20}, each creature that isn't an Undead in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the lich. {@actSaveFail} 31 ({@damage 9d6}) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The lich can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Lich",
      source: "XMM",
    },
    environment: ["any"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/lich.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["XX"],
    damageTags: ["C", "N", "O"],
    damageTagsSpell: ["F", "L", "N", "O", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["paralyzed"],
    conditionInflictSpell: ["frightened", "invisible"],
    savingThrowForced: ["constitution"],
    savingThrowForcedSpell: ["constitution", "dexterity", "wisdom"],
  },
  {
    name: "Solar",
    group: ["Angels"],
    source: "XMM",
    page: 288,
    size: ["L"],
    type: {
      type: "celestial",
      tags: ["angel"],
    },
    alignment: ["L", "G"],
    ac: [21],
    hp: {
      average: 297,
      formula: "22d10 + 176",
    },
    speed: {
      walk: 50,
      fly: {
        number: 150,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 26,
    dex: 22,
    con: 26,
    int: 25,
    wis: 25,
    cha: 30,
    skill: {
      perception: "+14",
    },
    senses: ["truesight 120 ft."],
    passive: 24,
    immune: ["poison", "radiant"],
    conditionImmune: ["charmed", "exhaustion", "frightened", "poisoned"],
    languages: ["all; telepathy 120 ft."],
    cr: "21",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The solar casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 25}):",
        ],
        will: ["{@spell Detect Evil and Good|XPHB}"],
        daily: {
          "1e": [
            "{@spell Commune|XPHB}",
            "{@spell Control Weather|XPHB}",
            "{@spell Dispel Evil and Good|XPHB}",
            "{@spell Resurrection|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
      {
        name: "Divine Aid (3/Day)",
        type: "spellcasting",
        headerEntries: [
          "The solar casts {@spell Cure Wounds|XPHB} (level 2 version), {@spell Lesser Restoration|XPHB}, or {@spell Remove Curse|XPHB}, using the same spellcasting ability as Spellcasting.",
        ],
        daily: {
          "3": [
            "{@spell Cure Wounds|XPHB} (level 2 version)",
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
        entries: ["The solar knows if it hears a lie."],
      },
      {
        name: "Exalted Restoration",
        entries: [
          "If the solar dies outside Mount Celestia, its body disappears, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Mount Celestia.",
        ],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the solar fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The solar has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The solar makes two Flying Sword attacks. It can replace one attack with a use of Slaying Bow.",
        ],
      },
      {
        name: "Flying Sword",
        entries: [
          "{@atkr m,r} {@hit 15}, reach 10 ft. or range 120 ft. {@h}22 ({@damage 4d6 + 8}) Slashing damage plus 36 ({@damage 8d8}) Radiant damage. {@hom}The sword magically returns to the solar's hand or hovers within 5 feet of the solar immediately after a ranged attack.",
        ],
      },
      {
        name: "Slaying Bow",
        entries: [
          "{@actSave dex} {@dc 21}, one creature the solar can see within 600 feet. {@actSaveFail} If the creature has 100 {@variantrule Hit Points|XPHB} or fewer, it dies. It otherwise takes 24 ({@damage 4d8 + 6}) Piercing damage plus 36 ({@damage 8d8}) Radiant damage.",
        ],
      },
    ],
    legendary: [
      {
        name: "Blinding Gaze",
        entries: [
          "{@actSave con} {@dc 25}, one creature the solar can see within 120 feet. {@actSaveFail} The target has the {@condition Blinded|XPHB} condition for 1 minute. {@actSaveSuccessOrFail} The solar can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Radiant Teleport",
        entries: [
          "The solar teleports up to 60 feet to an unoccupied space it can see. {@actSave dex} {@dc 25}, each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the solar at its destination space. {@actSaveFail} 11 ({@damage 2d10}) Radiant damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["planar, upper"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/solar.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["TP", "XX"],
    damageTags: ["P", "R", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["blinded"],
    savingThrowForced: ["constitution", "dexterity"],
    savingThrowForcedSpell: ["charisma"],
  },
];
