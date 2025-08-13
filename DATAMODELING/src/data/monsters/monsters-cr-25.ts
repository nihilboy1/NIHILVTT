// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_25 = [
  {
    name: "Colossus",
    group: ["Titans"],
    source: "XMM",
    page: 76,
    size: ["G"],
    type: {
      type: "construct",
      tags: ["titan"],
    },
    alignment: ["U"],
    ac: [23],
    hp: {
      average: 553,
      formula: "27d20 + 270",
    },
    speed: {
      walk: 60,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 11,
    con: 30,
    int: 3,
    wis: 11,
    cha: 8,
    save: {
      dex: "+8",
      wis: "+8",
    },
    senses: ["truesight 300 ft."],
    passive: 10,
    resist: ["necrotic", "radiant"],
    immune: ["poison", "psychic"],
    conditionImmune: [
      "charmed",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
      "stunned",
      "unconscious",
    ],
    languages: ["understands Celestial and Common but can't speak"],
    cr: "25",
    trait: [
      {
        name: "Immutable Form",
        entries: ["The colossus can't shape-shift."],
      },
      {
        name: "Legendary Resistance (4/Day)",
        entries: [
          "If the colossus fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The colossus has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Siege Monster",
        entries: [
          "The colossus deals double damage to objects and structures.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The colossus makes three attacks, using Slam or Radiant Ray in any combination.",
        ],
      },
      {
        name: "Slam",
        entries: [
          "{@atkr m} {@hit 18}, reach 20 ft. {@h}32 ({@damage 4d10 + 10}) Bludgeoning damage, and the colossus pushes the target up to 20 feet straight away from itself.",
        ],
      },
      {
        name: "Radiant Ray",
        entries: [
          "{@atkr r} {@hit 18}, range 300 ft. {@h}22 ({@damage 4d10}) Radiant damage. If the target is a Large or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Divine Beam {@recharge 5}",
        entries: [
          "{@actSave dex} {@dc 26}, each creature in a 300-foot-long, 10-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line}. {@actSaveFail} 65 ({@damage 10d12}) Radiant damage. {@actSaveSuccess} Half damage. {@actSaveSuccessOrFail} A creature reduced to 0 {@variantrule Hit Points|XPHB} by this beam disintegrates into dust, leaving behind any magic items it was wearing or carrying.",
        ],
      },
    ],
    legendary: [
      {
        name: "Smite",
        entries: ["The colossus makes one Radiant Ray attack."],
      },
      {
        name: "Stomp",
        entries: [
          "The colossus moves up to half its {@variantrule Speed|XPHB} without provoking {@action Opportunity Attack|XPHB|Opportunity Attacks}, and it can make one Slam attack at any point during that move.",
        ],
      },
    ],
    environment: ["any"],
    treasure: ["relics"],
    traitTags: [
      "Immutable Form",
      "Legendary Resistances",
      "Magic Resistance",
      "Siege Monster",
    ],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    languageTags: ["C", "CE", "CS"],
    damageTags: ["B", "R"],
    miscTags: ["MA", "RA", "RCH"],
    conditionInflict: ["prone"],
    savingThrowForced: ["dexterity"],
  },
];
