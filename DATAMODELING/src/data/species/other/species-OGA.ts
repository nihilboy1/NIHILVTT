// Arquivo gerado automaticamente
export const species = [
  {
    name: "Grung",
    source: "OGA",
    size: ["S"],
    speed: {
      walk: 25,
      climb: 25,
    },
    ability: [
      {
        dex: 2,
        con: 1,
      },
    ],
    age: {
      mature: 1,
      max: 50,
    },
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    languageProficiencies: [
      {
        other: true,
      },
    ],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    soundClip: {
      type: "internal",
      path: "races/grung.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Grungs mature to adulthood in a single year, but have been known to live up to 50 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most grungs are lawful, having been raised in a strict caste system. They tend toward evil as well, coming from a culture where social advancement occurs rarely, and most often because another member of your army has died and there is no one else of that caste to fill the vacancy.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Grungs stand between 2½ and 3½ feet tall and average about 30 pounds. Your size is Small.",
        ],
      },
      {
        name: "Arboreal Alertness",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Poison Immunity",
        entries: [
          "You're immune to poison damage and the {@condition poisoned} condition.",
        ],
      },
      {
        name: "Poisonous Skin",
        entries: [
          "Any creature that grapples you or otherwise comes into direct contact with your skin must succeed on a {@dc 12} Constitution saving throw or become {@condition poisoned} for 1 minute. A {@condition poisoned} creature no longer in direct contact with you can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
          "You can also apply this poison to any piercing weapon as part of an attack with that weapon, though when you hit the poison reacts differently. The target must succeed on a {@dc 12} Constitution saving throw or take {@damage 2d4} poison damage.",
        ],
      },
      {
        name: "Standing Leap",
        entries: [
          "Your long jump is up to 25 feet and your high jump is up to 15 feet, with or without a running start.",
        ],
      },
      {
        name: "Water Dependency",
        entries: [
          "If you fail to immerse yourself in water for at least 1 hour during a day, you suffer one level of {@condition exhaustion} at the end of that day. You can only recover from this {@condition exhaustion} through magic or by immersing yourself in water for at least 1 hour.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Grung."],
      },
    ],
  },
];
