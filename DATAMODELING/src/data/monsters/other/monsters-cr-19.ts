// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_19 = [
  {
    name: "Balor",
    group: ["Demons"],
    source: "XMM",
    page: 26,
    size: ["H"],
    type: {
      type: "fiend",
      tags: ["demon"],
    },
    alignment: ["C", "E"],
    ac: [19],
    hp: {
      average: 287,
      formula: "23d12 + 138",
    },
    speed: {
      walk: 40,
      fly: 80,
    },
    initiative: {
      proficiency: 2,
    },
    str: 26,
    dex: 15,
    con: 22,
    int: 20,
    wis: 16,
    cha: 22,
    save: {
      con: "+12",
      wis: "+9",
    },
    skill: {
      perception: "+9",
    },
    senses: ["truesight 120 ft."],
    passive: 19,
    resist: ["cold", "lightning"],
    immune: ["fire", "poison"],
    conditionImmune: ["charmed", "frightened", "poisoned"],
    languages: ["Abyssal; telepathy 120 ft."],
    cr: "19",
    trait: [
      {
        name: "Death Throes",
        entries: [
          "The balor explodes when it dies. {@actSave dex} {@dc 20}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the balor. {@actSaveFail} 31 ({@damage 9d6}) Fire damage plus 31 ({@damage 9d6}) Force damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} If the balor dies outside the Abyss, it gains a new body instantly, reviving with all its {@variantrule Hit Points|XPHB} somewhere in the Abyss.",
        ],
      },
      {
        name: "Fire Aura",
        entries: [
          "At the end of each of the balor's turns, each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the balor takes 13 ({@damage 3d8}) Fire damage.",
        ],
      },
      {
        name: "Legendary Resistance (3/Day)",
        entries: [
          "If the balor fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The balor has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The balor makes one Flame Whip attack and one Lightning Blade attack.",
        ],
      },
      {
        name: "Flame Whip",
        entries: [
          "{@atkr m} {@hit 14}, reach 30 ft. {@h}18 ({@damage 3d6 + 8}) Force damage plus 17 ({@damage 5d6}) Fire damage. If the target is a Huge or smaller creature, the balor pulls the target up to 25 feet straight toward itself, and the target has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Lightning Blade",
        entries: [
          "{@atkr m} {@hit 14}, reach 10 ft. {@h}21 ({@damage 3d8 + 8}) Force damage plus 22 ({@damage 4d10}) Lightning damage, and the target can't take Reactions until the start of the balor's next turn.",
        ],
      },
    ],
    bonus: [
      {
        name: "Teleport",
        entries: [
          "The balor teleports itself or a willing demon within 10 feet of itself up to 60 feet to an unoccupied space the balor can see.",
        ],
      },
    ],
    environment: ["planar, abyss"],
    treasure: ["armaments"],
    soundClip: {
      type: "internal",
      path: "bestiary/balor.mp3",
    },
    traitTags: ["Death Burst", "Legendary Resistances", "Magic Resistance"],
    senseTags: ["U"],
    actionTags: ["Multiattack", "Teleport"],
    languageTags: ["AB", "TP"],
    damageTags: ["F", "L", "O"],
    miscTags: ["MA", "MLW", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
];
