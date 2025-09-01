// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_20 = [
  {
    name: "Ancient Brass Dragon",
    group: ["Metallic Dragons"],
    source: "XMM",
    page: 56,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["metallic"],
    },
    alignment: ["C", "G"],
    ac: [20],
    hp: {
      average: 332,
      formula: "19d20 + 133",
    },
    speed: {
      walk: 40,
      burrow: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 27,
    dex: 10,
    con: 25,
    int: 16,
    wis: 15,
    cha: 22,
    save: {
      dex: "+6",
      wis: "+8",
    },
    skill: {
      history: "+9",
      perception: "+14",
      persuasion: "+12",
      stealth: "+6",
    },
    senses: ["blindsight 60 ft.", "darkvision 120 ft."],
    passive: 24,
    immune: ["fire"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "20",
      xpLair: 33000,
    },
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 20}):",
        ],
        will: [
          "{@spell Detect Magic|XPHB}",
          "{@spell Minor Illusion|XPHB}",
          "{@spell Scorching Ray|XPHB} (level 3 version)",
          "{@spell Shapechange|XPHB} (Beast or Humanoid form only, no {@variantrule Temporary Hit Points|XPHB} gained from the spell, and no Concentration or {@variantrule Temporary Hit Points|XPHB} required to maintain the spell)",
          "{@spell Speak with Animals|XPHB}",
        ],
        daily: {
          "1e": [
            "{@spell Control Weather|XPHB}",
            "{@spell Detect Thoughts|XPHB}",
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
          "The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast {@spell Scorching Ray|XPHB} (level 3 version).",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 14}, reach 15 ft. {@h}19 ({@damage 2d10 + 8}) Slashing damage plus 7 ({@damage 2d6}) Fire damage.",
        ],
      },
      {
        name: "Fire Breath {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 21}, each creature in a 90-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 58 ({@damage 13d8}) Fire damage. {@actSaveSuccess} Half damage.",
        ],
      },
      {
        name: "Sleep Breath",
        entries: [
          "{@actSave con} {@dc 21}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} The target has the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it repeats the save. {@actSaveFail 2} The target has the {@condition Unconscious|XPHB} condition for 10 minutes. This effect ends for the target if it takes damage or a creature within 5 feet of it takes an action to wake it.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Blazing Light",
        entries: [
          "The dragon uses Spellcasting to cast {@spell Scorching Ray|XPHB} (level 3 version).",
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
          "{@actSave dex} {@dc 20}, one creature the dragon can see within 120 feet. {@actSaveFail} 36 ({@damage 8d8}) Fire damage, and the target's {@variantrule Speed|XPHB} is halved until the end of its next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
        ],
      },
    ],
    legendaryGroup: {
      name: "Brass Dragon",
      source: "XMM",
    },
    environment: ["desert"],
    treasure: ["arcana"],
    dragonAge: "ancient",
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
    name: "Ancient White Dragon",
    group: ["Chromatic Dragons"],
    source: "XMM",
    page: 330,
    size: ["G"],
    type: {
      type: "dragon",
      tags: ["chromatic"],
    },
    alignment: ["C", "E"],
    ac: [20],
    hp: {
      average: 333,
      formula: "18d20 + 144",
    },
    speed: {
      walk: 40,
      burrow: 40,
      fly: 80,
      swim: 40,
    },
    initiative: {
      proficiency: 2,
    },
    str: 26,
    dex: 10,
    con: 26,
    int: 10,
    wis: 13,
    cha: 18,
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
    immune: ["cold"],
    languages: ["Common", "Draconic"],
    cr: {
      cr: "20",
      xpLair: 33000,
    },
    spellcasting: [
      {
        name: "Frightful Presence",
        type: "spellcasting",
        headerEntries: [
          "The dragon casts {@spell Fear|XPHB}, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 18}). The dragon can't take this action again until the start of its next turn.",
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
        name: "Legendary Resistance (4/Day, or 5/Day in Lair)",
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
          "{@atkr m} {@hit 14}, reach 15 ft. {@h}17 ({@damage 2d8 + 8}) Slashing damage plus 7 ({@damage 2d6}) Cold damage.",
        ],
      },
      {
        name: "Cold Breath {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 22}, each creature in a 90-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 63 ({@damage 14d8}) Cold damage. {@actSaveSuccess} Half damage.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Freezing Burst",
        entries: [
          "{@actSave con} {@dc 20}, each creature in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point the dragon can see within 120 feet. {@actSaveFail} 14 ({@damage 4d6}) Cold damage, and the target's {@variantrule Speed|XPHB} is 0 until the end of the target's next turn. {@actSaveSuccessOrFail} The dragon can't take this action again until the start of its next turn.",
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
    dragonAge: "ancient",
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
    name: "Animal Lord",
    source: "XMM",
    page: 15,
    size: ["M"],
    type: "celestial",
    alignment: ["N"],
    ac: [19],
    hp: {
      average: 323,
      formula: "34d8 + 170",
    },
    speed: {
      walk: 60,
      fly: {
        number: 60,
        condition: "(hover)",
      },
      swim: 60,
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 24,
    dex: 25,
    con: 20,
    int: 19,
    wis: 23,
    cha: 22,
    save: {
      con: "+11",
      wis: "+12",
    },
    skill: {
      acrobatics: "+13",
      athletics: "+13",
      perception: "+18",
      stealth: "+13",
    },
    senses: ["truesight 120 ft."],
    passive: 28,
    resist: ["cold", "fire", "necrotic", "psychic", "radiant"],
    conditionImmune: ["charmed", "frightened", "stunned"],
    languages: ["all"],
    cr: "20",
    spellcasting: [
      {
        name: "Spellcasting",
        type: "spellcasting",
        headerEntries: [
          "The animal lord casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save {@dc 20}):",
        ],
        will: [
          "{@spell Animal Friendship|XPHB}",
          "{@spell Animal Messenger|XPHB}",
          "{@spell Speak with Animals|XPHB}",
        ],
        daily: {
          "2e": ["{@spell Awaken|XPHB}", "{@spell Greater Restoration|XPHB}"],
          "1e": ["{@spell Animal Shapes|XPHB}", "{@spell Sunburst|XPHB}"],
        },
        ability: "wis",
        displayAs: "action",
      },
    ],
    trait: [
      {
        name: "Animal Lordship",
        entries: [
          "An animal lord represents a Forager, Hunter, or Sage (DM's choice), which determines certain traits in this stat block.",
        ],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the animal lord fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Lordly Presence",
        entries: [
          "{@actSave wis} {@dc 20}, any enemy that starts its turn in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the animal lord. {@actSaveFail} The target suffers one of the following effects:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Captivated (Forager Only)",
                entries: [
                  "The target has the {@condition Charmed|XPHB} condition until the end of its next turn. While {@condition Charmed|XPHB}, the target has the {@condition Incapacitated|XPHB} condition.",
                ],
              },
              {
                type: "item",
                name: "Fearful (Hunter Only)",
                entries: [
                  "The target has the {@condition Frightened|XPHB} condition until the end of its next turn.",
                ],
              },
              {
                type: "item",
                name: "Mired (Sage Only)",
                entries: [
                  "The target takes 10 ({@damage 3d6}) Psychic damage, and the target is magically bewildered until the end of its next turn. While bewildered, the target subtracts {@dice 1d4} from its saving throws.",
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The animal lord has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The animal lord makes two attacks, using Rend or Radiant Ray in any combination, and uses Animal Spirit.",
        ],
      },
      {
        name: "Rend",
        entries: [
          "{@atkr m} {@hit 13}, reach 5 ft. {@h}14 ({@damage 2d6 + 7}) Slashing damage plus 7 ({@damage 2d6}) Force damage.",
        ],
      },
      {
        name: "Radiant Ray",
        entries: [
          "{@atkr r} {@hit 12}, range 120 ft. {@h}20 ({@damage 4d6 + 6}) Radiant damage.",
        ],
      },
      {
        name: "Animal Spirit",
        entries: [
          "The animal lord conjures an animal spirit that strikes at a creature and then disappears. {@actSave dex} {@dc 20}, one creature the animal lord can see within 120 feet. {@actSaveFail} 28 ({@damage 4d10 + 6}) Radiant damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} One of the following effects occurs:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Fortify (Forager Only)",
                entries: [
                  "The animal lord gains 20 {@variantrule Temporary Hit Points|XPHB}.",
                ],
              },
              {
                type: "item",
                name: "Marked as Prey (Hunter Only)",
                entries: [
                  "The animal lord has {@variantrule Advantage|XPHB} on attack rolls against the target until the start of the animal lord's next turn.",
                ],
              },
              {
                type: "item",
                name: "Pesky Swarm (Sage Only)",
                entries: [
                  "The target has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the end of its next turn.",
                ],
              },
            ],
          },
        ],
      },
    ],
    bonus: [
      {
        name: "Shape-Shift",
        entries: [
          "The animal lord shape-shifts into a Huge or smaller version of the animal it represents or a Medium or Small Humanoid, or it returns to its true form. Its game statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed.",
        ],
      },
    ],
    legendary: [
      {
        name: "Feral Strike",
        entries: [
          "The animal lord moves up to its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}, and it makes one Rend attack.",
        ],
      },
      {
        name: "Radiant Strike",
        entries: ["The animal lord makes one Radiant Ray attack."],
      },
    ],
    environment: ["planar, beastlands"],
    treasure: ["relics"],
    altArt: [
      {
        name: "Hunter Animal Lord",
        source: "XMM",
      },
    ],
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["XX"],
    damageTags: ["O", "R", "S", "Y"],
    damageTagsSpell: ["R"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "RA"],
    conditionInflict: ["charmed", "frightened", "incapacitated"],
    conditionInflictSpell: ["blinded", "charmed"],
    savingThrowForced: ["dexterity", "wisdom"],
    savingThrowForcedSpell: ["charisma", "constitution", "wisdom"],
    _versions: [
      {
        name: "Animal Lord; Forager",
        source: "XMM",
        _mod: {
          trait: {
            mode: "replaceArr",
            replace: "Lordly Presence",
            items: {
              name: "Lordly Presence",
              entries: [
                "{@actSave wis} {@dc 20}, any enemy that starts its turn in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the animal lord. {@actSaveFail} The target has the {@condition Charmed|XPHB} condition until the end of its next turn. While {@condition Charmed|XPHB}, the target has the {@condition Incapacitated|XPHB} condition.",
              ],
            },
          },
          action: {
            mode: "replaceArr",
            replace: "Animal Spirit",
            items: {
              name: "Animal Spirit",
              entries: [
                "The animal lord conjures an animal spirit that strikes at a creature and then disappears. {@actSave dex} {@dc 20}, one creature the animal lord can see within 120 feet. {@actSaveFail} 28 ({@damage 4d10 + 6}) Radiant damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The animal lord gains 20 {@variantrule Temporary Hit Points|XPHB}.",
              ],
            },
          },
        },
      },
      {
        name: "Animal Lord; Hunter",
        source: "XMM",
        _mod: {
          trait: {
            mode: "replaceArr",
            replace: "Lordly Presence",
            items: {
              name: "Lordly Presence",
              entries: [
                "{@actSave wis} {@dc 20}, any enemy that starts its turn in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the animal lord. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the end of its next turn.",
              ],
            },
          },
          action: {
            mode: "replaceArr",
            replace: "Animal Spirit",
            items: {
              name: "Animal Spirit",
              entries: [
                "The animal lord conjures an animal spirit that strikes at a creature and then disappears. {@actSave dex} {@dc 20}, one creature the animal lord can see within 120 feet. {@actSaveFail} 28 ({@damage 4d10 + 6}) Radiant damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The animal lord has {@variantrule Advantage|XPHB} on attack rolls against the target until the start of the animal lord's next turn.",
              ],
            },
          },
        },
      },
      {
        name: "Animal Lord; Sage",
        source: "XMM",
        _mod: {
          trait: {
            mode: "replaceArr",
            replace: "Lordly Presence",
            items: {
              name: "Lordly Presence",
              entries: [
                "{@actSave wis} {@dc 20}, any enemy that starts its turn in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the animal lord. {@actSaveFail} The target takes 10 ({@damage 3d6}) Psychic damage, and the target is magically bewildered until the end of its next turn. While bewildered, the target subtracts {@dice 1d4} from its saving throws.",
              ],
            },
          },
          action: {
            mode: "replaceArr",
            replace: "Animal Spirit",
            items: {
              name: "Animal Spirit",
              entries: [
                "The animal lord conjures an animal spirit that strikes at a creature and then disappears. {@actSave dex} {@dc 20}, one creature the animal lord can see within 120 feet. {@actSaveFail} 28 ({@damage 4d10 + 6}) Radiant damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} The target has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the end of its next turn.",
              ],
            },
          },
        },
      },
    ],
  },
  {
    name: "Pit Fiend",
    group: ["Devils"],
    source: "XMM",
    page: 243,
    size: ["L"],
    type: {
      type: "fiend",
      tags: ["devil"],
    },
    alignment: ["L", "E"],
    ac: [21],
    hp: {
      average: 337,
      formula: "27d10 + 189",
    },
    speed: {
      walk: 30,
      fly: 60,
    },
    initiative: {
      proficiency: 2,
    },
    str: 26,
    dex: 14,
    con: 24,
    int: 22,
    wis: 18,
    cha: 24,
    save: {
      dex: "+8",
      wis: "+10",
    },
    skill: {
      perception: "+10",
      persuasion: "+19",
    },
    senses: ["truesight 120 ft."],
    passive: 20,
    resist: ["cold"],
    immune: ["fire", "poison"],
    conditionImmune: ["poisoned"],
    languages: ["Infernal; telepathy 120 ft."],
    cr: "20",
    spellcasting: [
      {
        name: "Hellfire Spellcasting {@recharge 4}",
        type: "spellcasting",
        headerEntries: [
          "The pit fiend casts {@spell Fireball|XPHB} (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save {@dc 21}). It can replace one {@spell Fireball|XPHB} with {@spell Hold Monster|XPHB} (level 7 version) or {@spell Wall of Fire|XPHB}.",
        ],
        recharge: {
          "4": [
            "{@spell Fireball|XPHB} (level 5 version)",
            "{@spell Hold Monster|XPHB} (level 7 version)",
            "{@spell Wall of Fire|XPHB}",
          ],
        },
        ability: "cha",
        displayAs: "action",
        hidden: ["recharge"],
      },
    ],
    trait: [
      {
        name: "Diabolical Restoration",
        entries: [
          "If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Nine Hells.",
        ],
      },
      {
        name: "Fear Aura",
        entries: [
          "The pit fiend emanates an aura in a 20-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} while it doesn't have the {@condition Incapacitated|XPHB} condition. {@actSave wis} {@dc 21}, any enemy that starts its turn in the aura. {@actSaveFail} The target has the {@condition Frightened|XPHB} condition until the start of its next turn. {@actSaveSuccess} The target is immune to this pit fiend's aura for 24 hours.",
        ],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the pit fiend fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The pit fiend has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}18 ({@damage 3d6 + 8}) Piercing damage. If the target is a creature, it must make the following saving throw. {@actSave con} {@dc 21}. {@actSaveFail} The target has the {@condition Poisoned|XPHB} condition. While {@condition Poisoned|XPHB}, the target can't regain {@variantrule Hit Points|XPHB} and takes 21 ({@damage 6d6}) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.",
        ],
      },
      {
        name: "Devilish Claw",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}26 ({@damage 4d8 + 8}) Necrotic damage.",
        ],
      },
      {
        name: "Fiery Mace",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}22 ({@damage 4d6 + 8}) Force damage plus 21 ({@damage 6d6}) Fire damage.",
        ],
      },
    ],
    environment: ["planar, nine hells"],
    treasure: ["relics"],
    soundClip: {
      type: "internal",
      path: "bestiary/pit-fiend.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["I", "TP"],
    damageTags: ["F", "I", "N", "O", "P"],
    damageTagsSpell: ["F"],
    spellcastingTags: ["O"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["frightened", "poisoned"],
    conditionInflictSpell: ["paralyzed"],
    savingThrowForced: ["constitution", "wisdom"],
    savingThrowForcedSpell: ["dexterity", "wisdom"],
  },
];
