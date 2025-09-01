// Este arquivo é gerado automaticamente. Não edite manualmente.

export const monsters_cr_30 = [
  {
    name: "Tarrasque",
    group: ["Titans"],
    source: "XMM",
    page: 305,
    size: ["G"],
    type: {
      type: "monstrosity",
      tags: ["titan"],
    },
    alignment: ["U"],
    ac: [25],
    hp: {
      average: 697,
      formula: "34d20 + 340",
    },
    speed: {
      walk: 60,
      burrow: 40,
      climb: 60,
    },
    initiative: {
      proficiency: 2,
    },
    str: 30,
    dex: 11,
    con: 30,
    int: 3,
    wis: 11,
    cha: 11,
    save: {
      dex: "+9",
      int: "+5",
      wis: "+9",
      cha: "+9",
    },
    skill: {
      perception: "+9",
    },
    senses: ["blindsight 120 ft."],
    passive: 19,
    resist: ["bludgeoning", "piercing", "slashing"],
    immune: ["fire", "poison"],
    conditionImmune: [
      "charmed",
      "deafened",
      "frightened",
      "paralyzed",
      "poisoned",
    ],
    cr: "30",
    trait: [
      {
        name: "Legendary Resistance (6/Day)",
        entries: [
          "If the tarrasque fails a saving throw, it can choose to succeed instead.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "The tarrasque has {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Reflective Carapace",
        entries: [
          "If the tarrasque is targeted by a {@spell Magic Missile|XPHB} spell or a spell that requires a ranged attack roll, roll {@dice 1d6}. On a 1-5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected and reflects the spell, turning the caster into the target.",
        ],
      },
      {
        name: "Siege Monster",
        entries: [
          "The tarrasque deals double damage to objects and structures.",
        ],
      },
    ],
    action: [
      {
        name: "Multiattack",
        entries: [
          "The tarrasque makes one Bite attack and three other attacks, using Claw or Tail in any combination.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "{@atkr m} {@hit 19}, reach 15 ft. {@h}36 ({@damage 4d12 + 10}) Piercing damage, and the target has the {@condition Grappled|XPHB} condition (escape {@dc 20}). Until the grapple ends, the target has the {@condition Restrained|XPHB} condition and can't teleport.",
        ],
      },
      {
        name: "Claw",
        entries: [
          "{@atkr m} {@hit 19}, reach 15 ft. {@h}28 ({@damage 4d8 + 10}) Slashing damage.",
        ],
      },
      {
        name: "Tail",
        entries: [
          "{@atkr m} {@hit 19}, reach 30 ft. {@h}23 ({@damage 3d8 + 10}) Bludgeoning damage. If the target is a Huge or smaller creature, it has the {@condition Prone|XPHB} condition.",
        ],
      },
      {
        name: "Thunderous Bellow {@recharge 5}",
        entries: [
          "{@actSave con} {@dc 27}, each creature and each object that isn't being worn or carried in a 150-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. {@actSaveFail} 78 ({@damage 12d12}) Thunder damage, and the target has the {@condition Deafened|XPHB} and {@condition Frightened|XPHB} conditions until the end of its next turn. {@actSaveSuccess} Half damage only.",
        ],
      },
    ],
    bonus: [
      {
        name: "Swallow",
        entries: [
          "{@actSave str} {@dc 27}, one Large or smaller creature {@condition Grappled|XPHB} by the tarrasque (it can have up to six creatures swallowed at a time). {@actSaveFail} The target is swallowed, and the {@condition Grappled|XPHB} condition ends. A swallowed creature has the {@condition Blinded|XPHB} and {@condition Restrained|XPHB} conditions and can't teleport, it has {@variantrule Cover|XPHB|Total Cover} against attacks and other effects outside the tarrasque, and it takes 56 ({@damage 16d6}) Acid damage at the start of each of the tarrasque's turns.",
          "If the tarrasque takes 60 damage or more on a single turn from a creature inside it, the tarrasque must succeed on a {@dc 20} Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the tarrasque and has the {@condition Prone|XPHB} condition. If the tarrasque dies, any swallowed creature no longer has the {@condition Restrained|XPHB} condition and can escape from the corpse using 20 feet of movement, exiting {@condition Prone|XPHB}.",
        ],
      },
    ],
    legendary: [
      {
        name: "Onslaught",
        entries: [
          "The tarrasque moves up to half its {@variantrule Speed|XPHB}, and it makes one Claw or Tail attack.",
        ],
      },
      {
        name: "World-Shaking Movement",
        entries: [
          "The tarrasque moves up to its {@variantrule Speed|XPHB}. At the end of this movement, the tarrasque creates an instantaneous shock wave in a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from itself. Creatures in that area lose {@status Concentration|XPHB} and, if Medium or smaller, have the {@condition Prone|XPHB} condition. The tarrasque can't take this action again until the start of its next turn.",
        ],
      },
    ],
    environment: ["urban"],
    soundClip: {
      type: "internal",
      path: "bestiary/tarrasque.mp3",
    },
    traitTags: ["Legendary Resistances", "Magic Resistance", "Siege Monster"],
    senseTags: ["B"],
    actionTags: ["Multiattack", "Swallow"],
    damageTags: ["A", "B", "P", "S", "T"],
    miscTags: ["MA", "RCH"],
    conditionInflict: ["grappled", "prone", "restrained"],
    savingThrowForced: ["constitution", "strength"],
  },
];
