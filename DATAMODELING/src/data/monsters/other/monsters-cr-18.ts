// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_18 = [
  {
    name: "Demilich",
    source: "XMM",
    page: 96,
    size: ["T"],
    type: "undead",
    alignment: ["N", "E"],
    ac: [20],
    hp: {
      average: 180,
      formula: "72d4",
    },
    speed: {
      walk: 5,
      fly: {
        number: 30,
        condition: "(hover)",
      },
      canHover: true,
    },
    initiative: {
      proficiency: 2,
    },
    str: 1,
    dex: 20,
    con: 10,
    int: 20,
    wis: 17,
    cha: 20,
    save: {
      con: "+6",
      int: "+11",
      wis: "+9",
    },
    senses: ["truesight 120 ft."],
    passive: 13,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["necrotic", "poison", "psychic"],
    conditionImmune: [
      "charmed",
      "deafened",
      "exhaustion",
      "frightened",
      "paralyzed",
      "petrified",
      "poisoned",
      "prone",
      "stunned",
    ],
    cr: {
      cr: "18",
      xpLair: 22000,
    },
    trait: [
      {
        name: "Legendary Resistance (3/Day, or 4/Day in Lair)",
        entries: [
          "If the demilich fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Undead Restoration",
        entries: [
          "If the demilich is destroyed, it reforms and regains all its {@variantrule Hit Points|XPHB} in {@dice 1d10} days unless a {@spell Wish|XPHB} spell is cast on its remains.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: ["The demilich makes three Necrotic Burst attacks."],
      },
      {
        name: "Necrotic Burst",
        entries: [
          "{@atkr m,r} {@hit 11}, reach 5 ft. or range 120 ft. {@h}24 ({@damage 7d6}) Necrotic damage.",
        ],
      },
      {
        name: "Howl {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 19}, each creature in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from the demilich. {@actSaveFail} 70 ({@damage 20d6}) Psychic damage. {@actSaveSuccessOrFail} The target has the {@condition Frightened|XPHB} condition until the start of the demilich's next turn.",
        ],
      },
    ],
    legendaryActionsLair: 4,
    legendary: [
      {
        name: "Energy Drain",
        entries: [
          "{@actSave con} {@dc 19}, one creature the demilich can see within 120 feet. {@actSaveFail} The target's {@variantrule Hit Points|XPHB|Hit Point} maximum decreases by 14 ({@dice 4d6}). {@actSaveSuccessOrFail} The demilich can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Grave-Dust Flight",
        entries: [
          "The demilich flies up to its {@variantrule Fly Speed|XPHB}, shedding grave dust. Each creature within 5 feet of the demilich as it moves is targeted once by the following effect. {@actSave con} {@dc 19}. {@actSaveFail} The target has the {@condition Blinded|XPHB} condition until the end of the demilich's next turn. {@actSaveSuccessOrFail} The demilich can't take this action again until the start of its next turn.",
        ],
      },
      {
        name: "Necrosis",
        entries: ["The demilich makes one Necrotic Burst attack."],
      },
    ],
    legendaryGroup: {
      name: "Demilich",
      source: "XMM",
    },
    environment: ["any"],
    treasure: ["arcana"],
    soundClip: {
      type: "internal",
      path: "bestiary/demilich.mp3",
    },
    traitTags: ["Legendary Resistances"],
    senseTags: ["U"],
    actionTags: ["Multiattack"],
    damageTags: ["N", "Y"],
    miscTags: ["AOE", "MA", "RA"],
    conditionInflict: ["blinded", "frightened"],
    savingThrowForced: ["constitution"],
    savingThrowForcedLegendary: ["constitution"],
  },
];
