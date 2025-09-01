// Arquivo gerado automaticamente
export const species = [
  {
    name: "Bugbear",
    source: "ERLW",
    reprintedAs: ["Bugbear|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        dex: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 72,
      heightMod: "2d12",
      baseWeight: 200,
      weightMod: "2d6",
    },
    age: {
      mature: 16,
      max: 80,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        stealth: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/bugbear.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Bugbears reach adulthood at age 16 and live up to 80 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Bugbears live on the fringes of society even in Darguun, where they value self-sufficiency and violence. They are generally chaotic, organizing in loose tribes under charismatic and powerful leaders.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Long-Limbed",
        entries: [
          "When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Sneaky",
        entries: ["You are proficient in the {@skill Stealth} skill."],
      },
      {
        name: "Surprise Attack",
        entries: [
          "If you surprise a creature and hit it with an attack on your first turn in combat, the attack deals an extra {@damage 2d6} damage to it. You can use this trait only once per combat.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Changeling",
    source: "ERLW",
    reprintedAs: ["Changeling|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
        choose: {
          from: ["str", "dex", "con", "int", "wis"],
          count: 1,
        },
      },
    ],
    heightAndWeight: {
      baseHeight: 61,
      heightMod: "2d4",
      baseWeight: 115,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    skillProficiencies: [
      {
        choose: {
          from: ["deception", "insight", "intimidation", "persuasion"],
          count: 2,
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 2,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Changelings mature slightly faster than humans but share a similar lifespan—typically a century or less. While a changeling can transform to conceal their age, the effects of aging affect them similarly to humans.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Changelings tend toward pragmatic neutrality, and few changelings embrace evil.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Shapechanger",
        entries: [
          "As an action, you can change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another race, though none of your game statistics change. You can't duplicate the appearance of a creature you've never seen, and you must adopt a form that has the same basic arrangement of limbs that you have. Your clothing and equipment aren't changed by this trait.",
          "You stay in the new form until you use an action to revert to your true form or until you die.",
        ],
      },
      {
        name: "Changeling Instincts",
        entries: [
          "You gain proficiency with two of the following skills of your choice: {@skill Deception}, {@skill Insight}, {@skill Intimidation}, and {@skill Persuasion}.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and two other languages of your choice.",
        ],
      },
    ],
  },
  {
    name: "Goblin",
    source: "ERLW",
    _copy: {
      name: "Goblin",
      source: "VGM",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: [
                "In Eberron, goblins are usually neutral. They tend to look out for themselves, preferably without drawing unwanted attention from any larger, more powerful people.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Size",
            items: {
              name: "Size",
              entries: ["Your size is Small."],
            },
          },
        ],
      },
      _preserve: {
        reprintedAs: true,
      },
    },
    size: ["S"],
    traitTags: null,
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
  },
  {
    name: "Hobgoblin",
    source: "ERLW",
    _copy: {
      name: "Hobgoblin",
      source: "VGM",
      _mod: {
        entries: [
          {
            mode: "appendArr",
            items: {
              name: "Alignment",
              entries: [
                "Hobgoblin society in Eberron is shaped by the ideal of a strict code of honor and rigid martial discipline. Most hobgoblins are lawful, tending toward harsh enforcement of their laws.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Size",
            items: {
              name: "Size",
              entries: ["Your size is Medium."],
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
      path: "races/hobgoblin.mp3",
    },
  },
  {
    name: "Kalashtar",
    source: "ERLW",
    size: ["M"],
    speed: 30,
    ability: [
      {
        wis: 2,
        cha: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 64,
      heightMod: "2d6",
      baseWeight: 110,
      weightMod: "1d6",
    },
    age: {
      mature: 20,
      max: 100,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
        anyStandard: 1,
      },
    ],
    resist: ["psychic"],
    entries: [
      {
        name: "Age",
        entries: ["Kalashtar mature and age at the same rate as humans."],
      },
      {
        name: "Alignment",
        entries: [
          "The noble spirit tied to a kalashtar drives it toward lawful and good behavior. Most kalashtar combine strong self-discipline with compassion for all beings, but some kalashtar resist the virtuous influence of their spirit.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Dual Mind",
        entries: ["You have advantage on all Wisdom saving throws."],
      },
      {
        name: "Mental Discipline",
        entries: ["You have resistance to psychic damage."],
      },
      {
        name: "Mind Link",
        entries: [
          "You can speak telepathically to any creature you can see, provided the creature is within a number of feet of you equal to 10 times your level. You don't need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.",
          "When you're using this trait to speak telepathically to a creature, you can use your action to give that creature the ability to speak telepathically with you for 1 hour or until you end this effect as an action. To use this ability, the creature must be able to see you and must be within this trait's range. You can give this ability to only one creature at a time; giving it to a creature takes it away from another creature who has it.",
        ],
      },
      {
        name: "Severed from Dreams",
        entries: [
          "Kalashtar sleep, but they don't connect to the plane of dreams as other creatures do. Instead, their minds draw from the memories of their otherworldly spirit while they sleep. As such, you are immune to spells and other magical effects that require you to dream, like {@spell dream}, but not to spells and other magical effects that put you to sleep, like {@spell sleep}.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, Quori, and one other language of your choice.",
        ],
      },
    ],
  },
  {
    name: "Orc",
    source: "ERLW",
    reprintedAs: ["Orc|MPMM", "Orc|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 64,
      heightMod: "2d8",
      baseWeight: 175,
      weightMod: "2d6",
    },
    age: {
      mature: 12,
      max: 50,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        choose: {
          from: [
            "animal handling",
            "insight",
            "intimidation",
            "medicine",
            "nature",
            "perception",
            "survival",
          ],
          count: 2,
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        orc: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/orc.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: ["Orcs reach adulthood at age 12 and live up to 50 years."],
      },
      {
        name: "Alignment",
        entries: [
          "The orcs of Eberron are a passionate people, given to powerful emotion and deep faith. They are generally chaotic, but can be any alignment.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Aggressive",
        entries: [
          "As a bonus action, you can move up to your movement speed toward a hostile creature you can see or hear. You must end this move closer to the enemy than you started.",
        ],
      },
      {
        name: "Primal Intuition",
        entries: [
          "You have proficiency in two of the following skills of your choice: {@skill Animal Handling}, {@skill Insight}, {@skill Intimidation}, {@skill Medicine}, {@skill Nature}, {@skill Perception}, and {@skill Survival}.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Orc."],
      },
    ],
  },
  {
    name: "Shifter",
    source: "ERLW",
    reprintedAs: ["Shifter|MPMM"],
    size: ["M"],
    speed: 30,
    heightAndWeight: {
      baseHeight: 54,
      heightMod: "2d8",
      baseWeight: 90,
      weightMod: "2d4",
    },
    age: {
      mature: 10,
      max: 70,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Shifters are quick to mature both physically and emotionally, reaching young adulthood at age 10. They rarely live to be more than 70 years old.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Shifters tend toward neutrality, being more focused on survival than concepts of good and evil. A love of personal freedom can drive shifters toward chaotic alignments.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Speed",
        entries: ["Your base walking speed is 30 feet."],
      },
      {
        name: "Darkvision",
        entries: [
          "You have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Shifting",
        entries: [
          "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to your level + your Constitution modifier (minimum of 1 temporary hit point). You also gain additional benefits that depend on your shifter subrace, described below.",
          "Once you shift, you can't do so again until you finish a short or long rest.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common."],
      },
    ],
  },
  {
    name: "Warforged",
    source: "ERLW",
    size: ["M"],
    speed: 30,
    ability: [
      {
        con: 2,
        choose: {
          from: ["str", "dex", "int", "wis", "cha"],
          count: 1,
        },
      },
    ],
    heightAndWeight: {
      baseHeight: 70,
      heightMod: "2d6",
      baseWeight: 270,
      weightMod: "4",
    },
    age: {
      mature: 2,
      max: 30,
    },
    skillProficiencies: [
      {
        any: 1,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
    ],
    toolProficiencies: [
      {
        any: 1,
      },
    ],
    resist: ["poison"],
    conditionImmune: ["disease"],
    entries: [
      {
        name: "Age",
        entries: [
          "A typical warforged is between two and thirty years old. The maximum warforged lifespan remains a mystery; so far, warforged have shown no signs of deterioration due to age. You are immune to magical aging effects.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most warforged take comfort in order and discipline, tending toward law and neutrality. But some have absorbed the morality, or lack thereof, of the beings with which they served.",
        ],
      },
      {
        name: "Size",
        entries: ["Your size is Medium."],
      },
      {
        name: "Constructed Resilience",
        entries: [
          "You were created to have remarkable fortitude, represented by the following benefits:",
          {
            type: "list",
            items: [
              "You have advantage on saving throws against being {@condition poisoned}, and you have resistance to poison damage.",
              "You don't need to eat, drink, or breathe.",
              "You are immune to disease.",
              "You don't need to sleep, and magic can't put you to sleep.",
            ],
          },
        ],
      },
      {
        name: "Sentry's Rest",
        entries: [
          "When you take a long rest, you must spend at least six hours in an inactive, motionless state, rather than sleeping. In this state, you appear inert, but it doesn't render you {@condition unconscious}, and you can see and hear as normal.",
        ],
      },
      {
        name: "Integrated Protection",
        entries: [
          "Your body has built-in defensive layers, which can be enhanced with armor:",
          {
            type: "list",
            items: [
              "You gain a +1 bonus to Armor Class.",
              "You can don only armor with which you have proficiency. To don armor other than a shield, you must incorporate it into your body over the course of 1 hour, during which you remain in contact with the armor. To doff armor, you must spend 1 hour removing it. You can rest while donning or doffing armor in this way.",
              "While you live, the armor incorporated into your body can't be removed against your will.",
            ],
          },
        ],
      },
      {
        name: "Specialized Design",
        entries: [
          "You gain one skill proficiency and one tool proficiency of your choice.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and one other language of your choice.",
        ],
      },
    ],
  },
];
