// Arquivo gerado automaticamente
export const species = [
  {
    name: "Centaur",
    source: "MOT",
    reprintedAs: ["Centaur|MPMM"],
    _copy: {
      name: "Centaur",
      source: "GGR",
      _mod: {
        entries: [
          {
            mode: "replaceArr",
            replace: "Alignment",
            items: {
              name: "Alignment",
              entries: [
                "Centaurs are inclined toward neutrality. Lagonna centaurs tend to be more lawful, while Pheres centaurs are more often chaotic.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Size",
            items: {
              name: "Size",
              entries: [
                "Centaurs stand between 6 and 7 feet tall, with their equine bodies reaching about 4 feet at the withers. Pheres centaurs tend to be slightly larger than Lagonna centaurs. Your size is Medium.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Languages",
            items: {
              name: "Languages",
              entries: ["You can speak, read, and write Common and Sylvan."],
            },
          },
        ],
      },
    },
    soundClip: {
      type: "internal",
      path: "races/centaur.mp3",
    },
  },
  {
    name: "Leonin",
    source: "MOT",
    size: ["M"],
    speed: 35,
    ability: [
      {
        str: 1,
        con: 2,
      },
    ],
    heightAndWeight: {
      baseHeight: 66,
      heightMod: "2d10",
      baseWeight: 180,
      weightMod: "2d6",
    },
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        choose: {
          from: ["athletics", "intimidation", "perception", "survival"],
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: ["Leonin mature and age at about the same rate as humans."],
      },
      {
        name: "Alignment",
        entries: [
          "Leonin tend toward good alignments. Leonin who are focused on the pride lean toward lawful good.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Leonin are typically over 6 feet tall, with some standing over 7 feet. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Claws",
        entries: [
          "Your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you can deal slashing damage equal to {@damage 1d4} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Hunter's Instincts",
        entries: [
          "You have proficiency in one of the following skills of your choice: {@skill Athletics}, {@skill Intimidation}, {@skill Perception}, or {@skill Survival}.",
        ],
      },
      {
        name: "Daunting Roar",
        entries: [
          "As a bonus action, you can let out an especially menacing roar. Creatures of your choice within 10 feet of you that can hear you must succeed on a Wisdom saving throw or become {@condition frightened} of you until the end of your next turn. The DC of the save equals 8 + your proficiency bonus + your Constitution modifier. Once you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Leonin."],
      },
    ],
  },
  {
    name: "Minotaur",
    source: "MOT",
    reprintedAs: ["Minotaur|MPMM"],
    _copy: {
      name: "Minotaur",
      source: "GGR",
      _mod: {
        entries: [
          {
            mode: "replaceArr",
            replace: "Age",
            items: {
              name: "Age",
              entries: [
                "Minotaurs mature and age at about the same rate as humans.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Alignment",
            items: {
              name: "Alignment",
              entries: [
                "Minotaurs who leave the walls of Skophos have the opportunity to be free of its culture and pursue chaotic alignments, while those who remain within the polis and its tyrannical regime tend toward lawful alignments.",
              ],
            },
          },
        ],
      },
    },
    soundClip: {
      type: "internal",
      path: "races/minotaur.mp3",
    },
  },
  {
    name: "Satyr",
    source: "MOT",
    reprintedAs: ["Satyr|MPMM"],
    creatureTypes: ["fey"],
    size: ["M"],
    speed: 35,
    ability: [
      {
        cha: 2,
        dex: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 56,
      heightMod: "2d8",
      baseWeight: 100,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    skillProficiencies: [
      {
        performance: true,
        persuasion: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        sylvan: true,
      },
    ],
    toolProficiencies: [
      {
        anyMusicalInstrument: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/satyr.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: ["Satyrs mature and age at about the same rate as humans."],
      },
      {
        name: "Alignment",
        entries: [
          "Satyrs delight in living a life free of the mantle of law. They gravitate toward being good, but some have devious streaks and enjoy causing dismay.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Satyrs range from just under 5 feet to about 6 feet in height, with generally slender builds. Your size is Medium.",
        ],
      },
      {
        name: "Fey",
        entries: ["Your creature type is fey, rather than humanoid."],
      },
      {
        name: "Ram",
        entries: [
          "You can use your head and horns to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to {@damage 1d4} + your Strength modifier.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "You have advantage on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Mirthful Leaps",
        entries: [
          "Whenever you make a long or high jump, you can roll a {@dice d8} and add the number rolled to the number of feet you cover, even when making a standing jump. This extra distance costs movement as normal.",
        ],
      },
      {
        name: "Reveler",
        entries: [
          "You have proficiency in the {@skill Performance} and {@skill Persuasion} skills, and you have proficiency with one {@item musical instrument|PHB} of your choice.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Sylvan."],
      },
    ],
  },
  {
    name: "Triton",
    source: "MOT",
    _copy: {
      name: "Triton",
      source: "VGM",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: [
                "Tritons tend toward neutrality. Their culture encourages them to be mindful of life's currents, knowing when to harness fate's tides and when to flow along with them.",
              ],
            },
          },
        ],
      },
      _preserve: {
        reprintedAs: true,
      },
    },
    soundClip: {
      type: "internal",
      path: "races/triton.mp3",
    },
  },
];
