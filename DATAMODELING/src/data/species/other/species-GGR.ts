// Arquivo gerado automaticamente
export const species = [
  {
    name: "Centaur",
    source: "GGR",
    reprintedAs: ["Centaur|MPMM"],
    creatureTypes: ["fey"],
    size: ["M"],
    speed: 40,
    ability: [
      {
        str: 2,
        wis: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 72,
      heightMod: "1d10",
      baseWeight: 600,
      weightMod: "2d12",
    },
    age: {
      mature: 20,
      max: 100,
    },
    skillProficiencies: [
      {
        choose: {
          from: ["animal handling", "medicine", "nature", "survival"],
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        sylvan: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/centaur.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: ["Centaurs mature and age at about the same rate as humans."],
      },
      {
        name: "Alignment",
        entries: [
          "Centaurs are inclined toward neutrality. Those who join the Selesnya are more often neutral good, while those who join the Gruul are typically chaotic neutral.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Centaurs stand between 6 and 7 feet tall, with their equine bodies reaching about 4 feet at the withers. Your size is Medium.",
        ],
      },
      {
        name: "Fey",
        entries: ["Your creature type is fey, rather than humanoid."],
      },
      {
        name: "Charge",
        entries: [
          "If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a bonus action, making one attack against the target with your hooves.",
        ],
      },
      {
        name: "Hooves",
        entries: [
          "Your hooves are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to {@damage 1d4} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Equine Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push or drag.",
          "In addition, any climb that requires hands and feet is especially difficult for you because of your equine legs. When you make such a climb, each foot of movement costs you 4 extra feet, instead of the normal 1 extra foot.",
        ],
      },
      {
        name: "Survivor",
        entries: [
          "You have proficiency in one of the following skills of your choice: {@skill Animal Handling}, {@skill Medicine}, {@skill Nature}, or {@skill Survival}.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and Sylvan. Sylvan is widely spoken in the Selesnya Conclave, for it is rich in vocabulary to describe natural phenomena and spiritual forces.",
        ],
      },
    ],
  },
  {
    name: "Goblin",
    source: "GGR",
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
                "Goblins are typically neutral evil, as they care only for their own needs. A few goblins might tend toward good or neutrality, but only rarely.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Age",
            items: {
              name: "Age",
              entries: [
                "Goblins reach adulthood around age 8. They age noticeably faster than humans, and though few goblins live to old age, the most cautious rarely live longer than 60 years.",
              ],
            },
          },
          {
            mode: "replaceArr",
            replace: "Languages",
            items: {
              name: "Languages",
              entries: [
                "You can speak, read, and write Common and Goblin. In Ravnica, Goblin is a simplistic language with a limited vocabulary and fluid rules of grammar, unsuited for any sophisticated conversation.",
              ],
            },
          },
        ],
      },
      _preserve: {
        reprintedAs: true,
      },
    },
    traitTags: null,
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
  },
  {
    name: "Loxodon",
    source: "GGR",
    size: ["M"],
    speed: 30,
    ability: [
      {
        con: 2,
        wis: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 79,
      heightMod: "2d10",
      baseWeight: 295,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 450,
    },
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Loxodons physically mature at the same rate as humans, but they live about 450 years. They highly value the weight of wisdom and experience and are considered young until they reach the age of 60.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most loxodons are lawful, believing in the value of a peaceful, ordered life. They also tend toward good.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Loxodons stand between 7 and 8 feet tall. Their massive bodies weigh between 300 and 400 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Loxodon Serenity",
        entries: [
          "You have advantage on saving throws against being {@condition charmed} or {@condition frightened}.",
        ],
      },
      {
        name: "Natural Armor",
        entries: [
          "You have thick, leathery skin. When you aren't wearing armor, your AC is 12 + your Constitution modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
          {
            type: "inset",
            name: "Tip: AC Calculations Don't Stack",
            entries: [
              "When the game gives you more than one way to calculate your Armor Class, you can use only one of them. You choose the one to use. For example, if you have the loxodon's Natural Armor trait and the monk's Unarmored Defense feature, you don't mix them together. Instead, you choose which one determines your AC.",
            ],
          },
        ],
      },
      {
        name: "Trunk",
        entries: [
          "You can grasp things with your trunk, and you can use it as a snorkel. It has a reach of 5 feet, and it can lift a number of pounds equal to five times your Strength score. You can use it to do the following simple tasks: lift, drop, hold, push, or pull an object or a creature; open or close a door or a container; grapple someone; or make an unarmed strike. Your DM might allow other simple tasks to be added to that list of options.",
          "Your trunk can't wield weapons or shields or do anything that requires manual precision, such as using tools or magic items or performing the somatic components of a spell.",
        ],
      },
      {
        name: "Keen Smell",
        entries: [
          "Thanks to your sensitive trunk, you have advantage on Wisdom ({@skill Perception}), Wisdom ({@skill Survival}), and Intelligence ({@skill Investigation}) checks that involve smell.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Loxodon."],
      },
    ],
  },
  {
    name: "Minotaur",
    source: "GGR",
    reprintedAs: ["Minotaur|MPMM"],
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
      mature: 17,
      max: 150,
    },
    skillProficiencies: [
      {
        choose: {
          from: ["intimidation", "persuasion"],
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/minotaur.mp3",
    },
    entries: [
      {
        entries: [
          "{@note These traits are also suitable for minotaurs in other D&D worlds where these people have avoided the demonic influence of Baphomet.}",
        ],
      },
      {
        name: "Age",
        entries: [
          "Minotaurs enter adulthood at around the age of 17 and can live up to 150 years.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most minotaurs who join the Boros Legion lean toward lawful alignments, while those associated with the Cult of Rakdos or the Gruul Clans tend toward chaotic alignments.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Minotaurs average over 6 feet in height, and they have stocky builds. Your size is Medium.",
        ],
      },
      {
        name: "Horns",
        entries: [
          "Your horns are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal piercing damage equal to {@damage 1d6} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Goring Rush",
        entries: [
          "Immediately after you use the {@action Dash} action on your turn and move at least 20 feet, you can make one melee attack with your horns as a bonus action.",
        ],
      },
      {
        name: "Hammering Horns",
        entries: [
          "Immediately after you hit a creature with a melee attack as part of the {@action Attack} action on your turn, you can use a bonus action to attempt to shove that target with your horns. The target must be no more than one size larger than you and within 5 feet of you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Strength modifier, you push it up to 10 feet away from you.",
        ],
      },
      {
        name: "Imposing Presence",
        entries: [
          "You have proficiency in one of the following skills of your choice: {@skill Intimidation} or {@skill Persuasion}.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Minotaur."],
      },
    ],
  },
  {
    name: "Simic Hybrid",
    source: "GGR",
    size: ["M"],
    speed: {
      walk: 30,
    },
    ability: [
      {
        con: 2,
        choose: {
          from: ["str", "dex", "int", "wis", "cha"],
          count: 1,
        },
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        choose: {
          from: ["elvish", "other"],
          count: 1,
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Hybrids begin their lives as adult humans, elves, or vedalken. They age at a slightly accelerated rate, so their maximum life spans are probably reduced somewhat. The Guardian Project has not been operating long enough to observe the full effect of this phenomenon.",
        ],
      },
      {
        name: "Alignment",
        entries: [
          "Most hybrids share the generally neutral outlook of the Simic Combine. They are more interested in scientific research and the standing of their guild than in moral or ethical questions. Those who leave the Combine, however, often do so because their philosophical outlook and alignment are more in line with a different guild's.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Your size is Medium, within the normal range of your humanoid base race.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common and your choice of Elvish or Vedalken.",
        ],
      },
      {
        name: "Animal Enhancement",
        entries: [
          "Your body has been altered to incorporate certain animal characteristics. You choose one animal enhancement now and a second enhancement at 5th level.",
          "At 1st level, choose one of the following options:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Manta Glide",
                entry:
                  "You have ray-like fins that you can use as wings to slow your fall or allow you to glide. When you fall and aren't {@condition incapacitated}, you can subtract up to 100 feet from the fall when calculating falling damage, and you can move up to 2 feet horizontally for every 1 foot you descend.",
              },
              {
                type: "item",
                name: "Nimble Climber",
                entry: "You have a climbing speed equal to your walking speed.",
              },
              {
                type: "item",
                name: "Underwater Adaptation",
                entry:
                  "You can breathe air and water, and you have a swimming speed equal to your walking speed.",
              },
            ],
          },
          "At 5th level, your body evolves further, developing new characteristics. Choose one of the options you didn't take at 1st level, or one of the following options:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Grappling Appendage",
                entry:
                  "You have two special appendages growing alongside your arms. Choose whether they're both claws or tentacles. As an action, you can use one of them to try to grapple a creature. Each one is also a natural weapon, which you can use to make an unarmed strike. If you hit with it, the target takes bludgeoning damage equal to {@damage 1d6} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike. Immediately after hitting, you can try to grapple the target as a bonus action. These appendages can't precisely manipulate anything and can't wield weapons, magic items, or other specialized equipment.",
              },
              {
                type: "item",
                name: "Carapace",
                entry:
                  "Your skin in places is covered by a thick shell. You gain a +1 bonus to AC when you're not wearing heavy armor.",
              },
              {
                type: "item",
                name: "Acid Spit",
                entry:
                  "As an action, you can spray acid from glands in your mouth, targeting one creature or object you can see within 30 feet of you. The target takes {@damage 2d10} acid damage unless it succeeds on a Dexterity saving throw against a DC equal to 8 + your Constitution modifier + your proficiency bonus. This damage increases by {@damage 1d10} when you reach 11th level ({@damage 3d10}) and 17th level ({@damage 4d10}). You can use this trait a number of times equal to your Constitution modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Vedalken",
    source: "GGR",
    size: ["M"],
    speed: 30,
    ability: [
      {
        int: 2,
        wis: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 64,
      heightMod: "2d10",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 40,
      max: 500,
    },
    skillProficiencies: [
      {
        choose: {
          from: [
            "arcana",
            "history",
            "investigation",
            "medicine",
            "performance",
            "sleight of hand",
          ],
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        other: true,
        anyStandard: 1,
      },
    ],
    toolProficiencies: [
      {
        any: 1,
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Vedalken mature slower than humans do, reaching maturity around age 40. Their life span is typically 350 years, with some living to the age of 500.",
        ],
      },
      {
        name: "Alignment",
        entries: ["Vedalken are usually lawful and non-evil."],
      },
      {
        name: "Size",
        entries: [
          "Tall and slender, Vedalken stand 6 to 6½ feet tall on average and usually weigh less than 200 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Vedalken Dispassion",
        entries: [
          "You have advantage on all Intelligence, Wisdom, and Charisma saving throws.",
        ],
      },
      {
        name: "Tireless Precision",
        entries: [
          "You are proficient in one of the following skills of your choice: {@skill Arcana}, {@skill History}, {@skill Investigation}, {@skill Medicine}, {@skill Performance}, or {@skill Sleight of Hand}. You are also proficient with one {@book tool|phb|5|tools} of your choice.",
          "Whenever you make an ability check with the chosen skill or tool, roll a {@dice d4} and add the number rolled to the check's total.",
        ],
      },
      {
        name: "Partially Amphibious",
        entries: [
          "By absorbing oxygen through your skin, you can breathe underwater for up to 1 hour. Once you've reached that limit, you can't use this trait again until you finish a long rest.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, Vedalken, and one other language of your choice.",
        ],
      },
    ],
  },
];
