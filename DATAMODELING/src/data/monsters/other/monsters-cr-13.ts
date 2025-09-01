// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_13 = [
  {
    name: "Adult Brass Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 55,
    size: ["H"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [18],
    hp: {
      average: 172,
      formula: "15d12 + 75",
    },
    speed: {
      walk: 40,
      burrow: 30,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 23,
    dex: 10,
    con: 21,
    int: 14,
    wis: 13,
    cha: 17,
    save: {
      dex: "+5",
      wis: "+6",
    },
    skill: {
      history: "+7",
      perception: "+11",
      persuasion: "+8",
      stealth: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 21,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "13",
      xpLair: 11500,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 16}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Scorching Ray|XPHB}",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
          "{@spell Speak with Animals|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Detect Thoughts|XPHB}",
            "{@spell Control Weather|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast {@spell Scorching Ray|XPHB}.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}17 ({@damage 2d10 + 6}) Slashing damage plus 4 ({@damage 1d8}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 60-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 45 ({@damage 10d8}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Sleep Breath",
        entries: [
          "{@actSave con} {@dc 18}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it repeats the save. {@actSaveFail 2} The target has the {@condition Unconscious|XPHB} condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Blazing Light",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Scorching Ray|XPHB}.",
        ],
      },
      {
        name: "Pounce",
        entries: [
          "The dragon moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
      {
        name: "Scorching Sands",
        entries: [
          "{@actSave dex} {@dc 16}, one creature the dragon can see within 120 feet. {@actSaveFail} 27 ({@damage 6d8}) Fire damage, and the target's {@variantrule Speed|XPHB} is halved until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Brass Dragon",
      source: "XMM",
    },
    environment: ["desert"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/brass-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["F", "S"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["incapacitated", "unconscious"],
    savingThrowForced: ["constitution", "dexterity"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Adult White Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 329,
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
    ac: [18],
    hp: {
      average: 200,
      formula: "16d12 + 96",
    },
    speed: {
      walk: 40,
      burrow: 30,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 22,
    dex: 10,
    con: 22,
    int: 8,
    wis: 12,
    cha: 12,
    save: {
      dex: "+5",
      wis: "+6",
    },
    skill: {
      perception: "+11",
      stealth: "+5",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 21,
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "13",
      xpLair: 11500,
    },
    spellcasting: [
      {
        name: "Frightful Presence",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts {@spell Fear|XPHB}, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 14}). The dragon can't take this action again until the start of its next turn.",
        ],
        legendary: {
          "1": ["{@spell Fear|XPHB}"],
        },
        ability: "cha",
        displayAs: "legendary",
        hidden: ["legendary"],
      },
    ],
    trait: [
      {
        name: "Ice Walk",
        entries: [
          "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, {@variantrule Difficult Terrain|XPHB} composed of ice or snow doesn't cost it extra movement.",
        ],
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
        entries: ["The dragon makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 11}, reach 10 ft. {@h}13 ({@damage 2d6 + 6}) Slashing damage plus 4 ({@damage 1d8}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 19}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 54 ({@damage 12d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Freezing Burst",
        entries: [
          "{@actSave con} {@dc 14}, each creature in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 120 feet. {@actSaveFail} 7 ({@damage 2d6}) Cold damage, and the target's {@variantrule Speed|XPHB} is 0 until the end of the target's next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
      name: "White Dragon",
      source: "XMM",
    },
    environment: ["arctic"],
    treasure: ["arcana"],
    dragonAge: "adult",
    soundClip: {
      type: "internal",
      path: "bestiary/white-dragon.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["C", "S"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RCH"],
    conditionInflictSpell: ["frightened"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["constitution"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Beholder",
    group: ["Beholders"],
    source: "XMM",
    page: 36,
    size: ["L"],
    type: "aberration",
    alignment: ["L", "E"],
    ac: [18],
    hp: {
      average: 190,
      formula: "20d10 + 80",
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
    str: 16,
    dex: 14,
    con: 18,
    int: 17,
    wis: 15,
    cha: 17,
    save: {
      con: "+9",
      wis: "+7",
    },
    skill: {
      perception: "+12",
    },
    senses: ["darkvision 120 ft."],
    passive: 22,
    conditionImmune: ["prone"],
    languages: ["Deep Speech", "Undercommon"],
    cr: {
      cr: "13",
      xpLair: 11500,
    },
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the beholder fails a saving throw, it can choose to succeed instead.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The beholder uses Eye Rays three times."],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 8}, reach 5 ft. {@h}13 ({@damage 3d6 + 3}) Piercing damage.",
        ],
      },
      {
        name: "Eye Rays",
        entries: [
          "The beholder randomly shoots one of the following magical rays at a target it can see within 120 feet of itself (roll {@dice 1d10}; reroll if the beholder has already used that ray during this turn):",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "1: Charm Ray",
                entries: [
                  "{@actSave wis} {@dc 16}. {@actSaveFail} 13 ({@damage 3d8}) Psychic damage, and the target has the {@condition Charmed|XPHB} condition for 1 hour or until it takes damage. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "2: Paralyzing Ray",
                entries: [
                  "{@actSave con} {@dc 16}. {@actSaveFail} The target has the {@condition Paralyzed|XPHB} condition and repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
                ],
              },
              {
                type: "item",
                name: "3: Fear Ray",
                entries: [
                  "{@actSave wis} {@dc 16}. {@actSaveFail} 14 ({@damage 4d6}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition until the end of its next turn. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "4: Slowing Ray",
                entries: [
                  "{@actSave con} {@dc 16}. {@actSaveFail} 18 ({@damage 4d8}) Necrotic damage. Until the end of the target's next turn, the target's {@variantrule Speed|XPHB} is halved; the target can't take Reactions; and it can take either an action or a {@variantrule Bonus Action|XPHB} on its turn, not both. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "5: Enervation Ray",
                entries: [
                  "{@actSave con} {@dc 16}. {@actSaveFail} 13 ({@damage 3d8}) Poison damage, and the target has the {@condition Poisoned|XPHB} condition until the end of its next turn. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB}. {@actSaveSuccess} Half damage only.",
                ],
              },
              {
                type: "item",
                name: "6: Telekinetic Ray",
                entries: [
                  "{@actSave str} {@dc 16} (the target succeeds automatically if it is Gargantuan). {@actSaveFail} The beholder moves the target up to 30 feet in any direction. The target has the {@condition Restrained|XPHB} condition until the start of the beholder's next turn or until the beholder has the {@condition Incapacitated|XPHB} condition. The beholder can also exert fine control on objects with this ray, such as manipulating a tool or opening a door or container.",
                ],
              },
              {
                type: "item",
                name: "7: Sleep Ray",
                entries: [
                  "{@actSave wis} {@dc 16} (the target succeeds automatically if it is a Construct or an Undead). {@actSaveFail} The target has the {@condition Unconscious|XPHB} condition for 1 minute. The condition ends if the target takes damage or a creature within 5 feet of it takes an action to wake it.",
                ],
              },
              {
                type: "item",
                name: "8: Petrification Ray",
                entries: [
                  "{@actSave con} {@dc 16}. {@actSaveFail 1} The target has the {@condition Restrained|XPHB} condition and repeats the save at the end of its next turn if it is still {@condition Restrained|XPHB}, ending the effect on itself on a success. {@actSaveFail 2} The target has the {@condition Petrified|XPHB} condition instead of the {@condition Restrained|XPHB} condition.",
                ],
              },
              {
                type: "item",
                name: "9: Disintegration Ray",
                entries: [
                  "{@actSave dex} {@dc 16}. {@actSaveFail} 36 ({@damage 8d8}) Force damage. If the target is a nonmagical object or a creation of magical force, a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of it disintegrates into dust. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the target is a creature and this damage reduces it to 0 {@variantrule Hit Points|XPHB}, it disintegrates into dust.",
                ],
              },
              {
                type: "item",
                name: "10: Death Ray",
                entries: [
                  "{@actSave dex} {@dc 16}. {@actSaveFail} 55 ({@damage 10d10}) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target dies if the ray reduces it to 0 {@variantrule Hit Points|XPHB}.",
                ],
              },
            ],
          },
        ],
      },
    ],
    bonus: [
      {
        name: "Antimagic Cone",
        entries: [
          "The beholder's central eye emits an antimagic wave in a 150-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Until the start of the beholder's next turn, that area acts as an {@spell Antimagic Field|XPHB} spell, and that area works against the beholder's own Eye Rays.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Chomp",
        entries: ["The beholder makes two Bite attacks."],
      },
      {
        name: "Glare",
        entries: ["The beholder uses Eye Rays."],
      },
    ],
    legendaryGroup: {
      name: "Beholder",
      source: "XMM",
    },
    environment: ["underdark"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/beholder.mp3",
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
    name: "Nalfeshnee",
    group: ["Demons"],
    source: "XMM",
    page: 224,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [18],
    hp: {
      average: 184,
      formula: "16d10 + 96",
    },
    speed: {
      walk: 20,
      fly: 30,
    },
    initiative: {
      proficiency: 1,
    },
    str: 21,
    dex: 10,
    con: 22,
    int: 19,
    wis: 12,
    cha: 15,
    save: {
      con: "+11",
      int: "+9",
      wis: "+6",
      cha: "+7",
    },
    senses: ["truesight 120 ft."],
    passive: 11,
    resist: ["cold", "fire", "lightning"],
    immune: ["poison"],
    conditionImmune: ["frightened", "poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "13",
    trait: [
      {
        name: "Demonic Restoration",
        entries: [
          "If the nalfeshnee dies outside the Abyss, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The nalfeshnee has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The nalfeshnee makes three Rend attacks."],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}16 ({@damage 2d10 + 5}) Slashing damage plus 11 ({@damage 2d10}) Force damage.",
        ],
      },
      {
        name: "Teleport",
        entries: [
          "The nalfeshnee teleports up to 120 feet to an unoccupied space it can see.",
        ],
      },
    ],
    bonus: [
      {
        name: "Horror Nimbus {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 15}, each creature in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the nalfeshnee. {@actSaveFail} 28 ({@damage 8d6}) Psychic damage, and the target has the {@condition Frightened|XPHB} condition for 1 minute, until it takes damage, or until it ends its turn with the nalfeshnee out of line of sight. {@actSaveSuccess} The target is immune to this nalfeshnee's Horror Nimbus for 24 hours.",
        ],
      },
    ],
    reaction: [
      {
        name: "Pursuit",
        entries: [
          "{@actTrigger} Another creature the nalfeshnee can see ends its move within 120 feet of the nalfeshnee. {@actResponse} The nalfeshnee uses Teleport, but its destination space must be within 10 feet of the triggering creature.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/nalfeshnee.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Teleport"],
    languageTags: ["AB", "TP"],
    damageTags: ["O", "S", "Y"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["frightened"],
    savingThrowForced: ["wisdom"],
  },
  {
    name: "Rakshasa",
    source: "XMM",
    page: 253,
    size: ["M"],
    type: "fiend",
    alignment: ["L", "E"],
    ac: [17],
    hp: {
      average: 221,
      formula: "26d8 + 104",
    },
    speed: {
      walk: 40,
    },
    initiative: {
      proficiency: 1,
    },
    str: 14,
    dex: 17,
    con: 18,
    int: 13,
    wis: 16,
    cha: 20,
    skill: {
      deception: "+10",
      insight: "+8",
      perception: "+8",
    },
    senses: ["truesight 60 ft."],
    passive: 18,
    vulnerable: [
      {
        vulnerable: ["piercing"],
        note: "damage from weapons wielded by creatures under the effect of a Bless spell",
        cond: true,
      },
    ],
    conditionImmune: ["charmed", "frightened"],
    languages: ["Common", "Infernal"],
    cr: "13",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The rakshasa casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 18}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Detect Thoughts|XPHB}",
          "{@spell Disguise Self|XPHB}",
          "{@spell Mage Hand|XPHB}",
          "{@spell Minor Illusion|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Fly|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Major Image|XPHB}",
            "{@spell Plane Shift|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Greater Magic Resistance",
        entries: [
          "The rakshasa automatically succeeds on saving throws against spells and other magical effects, and the attack rolls of spells automatically miss it. Without the rakshasa's permission, no spell can observe the rakshasa remotely or detect its thoughts, creature type, or alignment.",
        ],
      },
      {
        name: "Fiendish Restoration",
        entries: [
          "If the rakshasa dies outside the Nine Hells, its body turns to ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Nine Hells.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The rakshasa makes three Cursed Touch attacks."],
      },
      {
        name: "Cursed Touch",
        entries: [
          "{@atkr m} {@hit 10}, reach 5 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 19 ({@damage 3d12}) Necrotic damage. If the target is a creature, it is cursed. While cursed, the target gains no benefit from finishing a {@variantrule Short Rest|XPHB|Short} or {@variantrule Long Rest|XPHB}.",
        ],
      },
      {
        name: "Baleful Command {@recharge 5}",
        entries: [
          "{@actSave wis} {@dc 18}, each enemy in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the rakshasa. {@actSaveFail} 28 ({@damage 8d6}) Psychic damage, and the target has the {@condition Frightened|XPHB} and {@condition Incapacitated|XPHB} conditions until the start of the rakshasa's next turn.",
        ],
      },
    ],
    environment: ["planar, nine hells", "urban"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/rakshasa.mp3",
    },
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "I"],
    damageTags: ["N", "S", "Y"],
    spellcastingTags: ["O"],
    miscTags: ["CUR", "MA"],
    conditionInflictSpell: ["invisible"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
  {
    name: "Shadow Dragon",
    source: "XMM",
    page: 275,
    size: ["H"],
    type: "dragon",
    alignment: ["C", "E"],
    ac: [16],
    hp: {
      average: 189,
      formula: "18d12 + 72",
    },
    speed: {
      walk: 40,
      climb: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 21,
    dex: 19,
    con: 18,
    int: 14,
    wis: 12,
    cha: 18,
    save: {
      dex: "+9",
      wis: "+6",
    },
    skill: {
      perception: "+11",
      stealth: "+14",
    },
    senses: ["blindsight 30 ft.", "darkvision 120 ft."],
    passive: 21,
    resist: [
      {
        special: "See Living Shadow",
      },
    ],
    immune: ["necrotic"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "13",
      xpLair: 11500,
    },
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the dragon fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Living Shadow",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the dragon has {@variantrule Resistance|XPHB} to damage that isn't Force, Psychic, or Radiant.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, the dragon has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls.",
        ],
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
          "{@atkr m} {@hit 10}, reach 10 ft. {@h}12 ({@damage 2d6 + 5}) Slashing damage plus 3 ({@damage 1d6}) Necrotic damage.",
        ],
      },
      {
        name: "Shadow Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 17}, each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 35 ({@damage 10d6}) Necrotic damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} A Humanoid reduced to 0 {@variantrule Hit Points|XPHB} by this damage dies, and a {@creature Shadow|XMM} rises from the corpse. The shadow is under the dragon's control and shares the dragon's {@variantrule Initiative|XPHB} count but acts immediately after the dragon.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shadow Stealth",
        entries: [
          "While in {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB}, the dragon takes the Hide action.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Pounce",
        entries: [
          "The dragon moves up to half its {@variantrule Speed|XPHB}, and it makes one Rend attack.",
        ],
      },
      {
        name: "Veil of Shadow",
        entries: [
          "The dragon uses Shadow Stealth, and one creature of its choice that it can see within 10 feet of it takes 10 ({@damage 3d6}) Necrotic damage. The dragon can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Shadow Dragon",
      source: "XMM",
    },
    environment: ["planar, shadowfell", "underdark"],
    treasure: ["any"],
    traitTags: ["Legendary Resistances", "Sunlight Sensitivity"],
    senseTags: ["B", "SD"],
    actionTags: ["Breath Weapon", "Multiattack"],
    languageTags: ["C", "DR"],
    damageTags: ["N", "S"],
    miscTags: ["MA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Storm Giant",
    source: "XMM",
    page: 302,
    size: ["H"],
    type: "giant",
    alignment: ["C", "G"],
    ac: [16],
    hp: {
      average: 230,
      formula: "20d12 + 100",
    },
    speed: {
      walk: 50,
      fly: {
        number: 25,
        condition: "(hover)",
      },
      swim: 50,
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 29,
    dex: 14,
    con: 20,
    int: 16,
    wis: 20,
    cha: 18,
    save: {
      str: "+14",
      con: "+10",
      wis: "+10",
      cha: "+9",
    },
    skill: {
      arcana: "+8",
      athletics: "+14",
      history: "+8",
      perception: "+10",
    },
    senses: ["darkvision 120 ft.", "truesight 30 ft."],
    passive: 20,
    resist: ["cold"],
    immune: ["lightning", "thunder"],
    languages: ["Common", "Giant"],
    cr: "13",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The giant casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 18}):",
        ],
        will: ["{@spell Detect Magic|XPHB}", "{@spell Light|XPHB}"],
        daily: {
          "1": ["{@spell Control Weather|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Amphibious",
        entries: ["The giant can breathe air and water."],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The giant makes two attacks, using Storm Sword or Thunderbolt in any combination.",
        ],
      },
      {
        name: "Storm Sword",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}23 ({@damage 4d6 + 9}) Slashing damage plus 13 ({@damage 3d8}) Lightning damage.",
        ],
      },
      {
        name: "Thunderbolt",
        entries: [
          "{@atkr r} {@hit 14}, range 500 ft. {@h}22 ({@damage 2d12 + 9}) Lightning damage, and the target has the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions until the start of the giant's next turn.",
        ],
      },
      {
        name: "Lightning Storm {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 18}, each creature in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} originating from a point the giant can see within 500 feet. {@actSaveFail} 55 ({@damage 10d10}) Lightning damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    environment: ["coastal", "underwater"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/storm-giant.mp3",
    },
    traitTags: ["Amphibious"],
    senseTags: ["SD", "U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "GI"],
    damageTags: ["L", "S"],
    spellcastingTags: ["O"],
    miscTags: ["AOE", "MA", "RA", "RCH"],
    savingThrowForced: ["dexterity"],
  },
  {
    name: "Ultroloth",
    group: ["Yugoloths"],
    source: "XMM",
    page: 311,
    size: ["M"],
    type: {
      type: "fiend",
      tags: ["yugoloth"],
    },
    alignment: ["N", "E"],
    ac: [19],
    hp: {
      average: 221,
      formula: "26d8 + 104",
    },
    speed: {
      walk: 30,
      fly: {
        number: 60,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 1,
    },
    str: 19,
    dex: 16,
    con: 18,
    int: 19,
    wis: 15,
    cha: 18,
    skill: {
      deception: "+9",
      perception: "+7",
      stealth: "+8",
    },
    senses: ["truesight 120 ft."],
    passive: 17,
    resist: ["cold", "fire", "lightning"],
    immune: ["acid", "poison"],
    conditionImmune: ["charmed", "frightened", "poisoned"],
    languages: ["Abyssal", "Infernal; telepathy 120 ft."],
    cr: "13",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The ultroloth casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save {@dc 17}):",
        ],
        will: [
          "{@spell Alter Self|XPHB}",
          "{@spell Clairvoyance|XPHB}",
          "{@spell Detect Magic|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Dimension Door|XPHB}",
            "{@spell Fireball|XPHB} (level 5 version)",
            "{@spell Wall of Fire|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "action",
      },
      {
        name: "Fiendish Guile {@recharge 4}",
        type: "spellcasting",
        headerEntries: [
          "The ultroloth casts {@spell Dispel Magic|XPHB}, {@spell Invisibility|XPHB} (self only), {@spell Misty Step|XPHB}, or {@spell Suggestion|XPHB}, requiring no Material components and using the same spellcasting ability as Spellcasting.",
        ],
        recharge: {
          "4": [
            "{@spell Dispel Magic|XPHB}",
            "{@spell Invisibility|XPHB}",
            "{@spell Misty Step|XPHB}",
            "{@spell Suggestion|XPHB}",
          ],
        },
        ability: "int",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
    ],
    trait: [
      {
        name: "Fiendish Restoration",
        entries: [
          "If the ultroloth dies outside Gehenna, its body dissolves into ichor, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in Gehenna.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The ultroloth has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The ultroloth uses Hypnotic Gaze and makes two Mercurial Whip attacks.",
        ],
      },
      {
        name: "Mercurial Whip",
        entries: [
          "{@atkr m} {@hit 9}, reach 15 ft. {@h}25 ({@damage 6d6 + 4}) Force damage, and the ultroloth can teleport the target up to 10 feet to an unoccupied space the ultroloth can see that isn't in the air.",
        ],
      },
      {
        name: "Hypnotic Gaze",
        entries: [
          "{@actSave wis} {@dc 17}, each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 10 ({@damage 3d6}) Psychic damage, and the target has the {@condition Stunned|XPHB} condition until the start of the ultroloth's next turn. {@actSaveSuccess} The target is immune to this ultroloth's Hypnotic Gaze for 24 hours.",
        ],
      },
    ],
    environment: ["planar, lower"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/ultroloth.mp3",
    },
    traitTags: ["Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["AB", "I", "TP"],
    damageTags: ["O", "Y"],
    damageTagsSpell: ["B", "F", "O", "P", "S"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["stunned"],
    conditionInflictSpell: ["charmed", "invisible"],
    savingThrowForced: ["wisdom"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
  {
    name: "Vampire",
    source: "XMM",
    page: 317,
    otherSources: [
      {
        source: "DrDe",
      },
    ],
    size: ["S", "M"],
    type: "undead",
    alignment: ["L", "E"],
    ac: [16],
    hp: {
      average: 195,
      formula: "23d8 + 92",
    },
    speed: {
      walk: 40,
      climb: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 18,
    dex: 18,
    con: 18,
    int: 17,
    wis: 15,
    cha: 18,
    save: {
      dex: "+9",
      con: "+9",
      wis: "+7",
      cha: "+9",
    },
    skill: {
      perception: "+7",
      stealth: "+9",
    },
    senses: ["darkvision 120 ft."],
    passive: 17,
    resist: ["necrotic"],
    languages: ["Common plus two other languages"],
    cr: {
      cr: "13",
      xpLair: 11500,
    },
    spellcasting: [
      {
        name: "Charm {@recharge 5}",
        type: "spellcasting",
        headerEntries: [
          "The vampire casts {@spell Charm Person|XPHB}, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 17}), and the duration is 24 hours. The Charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the vampire.",
        ],
        recharge: {
          "5": ["{@spell Charm Person|XPHB}"],
        },
        ability: "cha",
        displayAs: "bonus",
        hidden: ["recharge"],
      },
      {
        name: "Beguile",
        type: "spellcasting",
        headerEntries: [
          "The vampire casts {@spell Command|XPHB}, requiring no spell components and using Charisma as the spellcasting ability (spell save {@dc 17}). The vampire can't take this action again until the start of its next turn.",
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
        name: "Misty Escape",
        entries: [
          "If the vampire drops to 0 {@variantrule Hit Points|XPHB} outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.",
          "While it has 0 {@variantrule Hit Points|XPHB} in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the {@condition Paralyzed|XPHB} condition until it regains any {@variantrule Hit Points|XPHB}, and it regains 1 {@variantrule Hit Points|XPHB|Hit Point} after spending 1 hour there.",
        ],
      },
      {
        name: "Spider Climb",
        entries: [
          "The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.",
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
        name: "Multiattack (Vampire Form Only)",
        entries: ["The vampire makes two Grave Strike attacks and uses Bite."],
      },
      {
        name: "Grave Strike (Vampire Form Only)",
        entries: [
          "{@atkr m} {@hit 9}, reach 5 ft. {@h}8 ({@damage 1d8 + 4}) Bludgeoning damage plus 7 ({@damage 2d6}) Necrotic damage. If the target is a Large or smaller creature, it has the {@condition Grappled|XPHB} condition (escape {@dc 14}) from one of two hands.",
        ],
      },
      {
        name: "Bite (Bat or Vampire Form Only)",
        entries: [
          "{@actSave con} {@dc 17}, one creature within 5 feet that is willing or that has the {@condition Grappled|XPHB}, {@condition Incapacitated|XPHB}, or {@condition Restrained|XPHB} condition. {@actSaveFail} 6 ({@damage 1d4 + 4}) Piercing damage plus 13 ({@damage 3d8}) Necrotic damage. The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by an amount equal to the Necrotic damage taken, and the vampire regains {@variantrule Hit Points|XPHB} equal to that amount. A Humanoid reduced to 0 {@variantrule Hit Points|XPHB} by this damage and then buried rises the following sunset as a {@creature Vampire Spawn|XMM} under the vampire's control.",
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat ({@variantrule Speed|XPHB} 5 ft., {@variantrule Fly Speed|XPHB} 30 ft.) or a Medium cloud of mist ({@variantrule Speed|XPHB} 5 ft., {@variantrule Fly Speed|XPHB} 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.",
          "While in bat form, the vampire can't speak. Its game statistics, other than its size and {@variantrule Speed|XPHB}, are unchanged.",
          "While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has {@variantrule Resistance|XPHB} to all damage, except the damage it takes from sunlight.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Deathless Strike",
        entries: [
          "The vampire moves up to half its {@variantrule Speed|XPHB}, and it makes one Grave Strike attack.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Vampire",
      source: "XMM",
    },
    environment: ["underdark", "urban"],
    treasure: ["any"],
    soundClip: {
      type: "internal",
      path: "bestiary/vampire.mp3",
    },
    traitTags: ["Legendary Resistances", "Spider Climb"],
    senseTags: ["SD"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "X"],
    damageTags: ["A", "B", "N", "P", "R"],
    spellcastingTags: ["O"],
    miscTags: ["MA"],
    conditionInflict: ["charmed", "grappled", "incapacitated", "paralyzed"],
    conditionInflictSpell: ["charmed", "prone"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["wisdom"],
    savingThrowForcedSpell: ["wisdom"],
  },
];
