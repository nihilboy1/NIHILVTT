// Arquivo gerado automaticamente
export const species = [
  {
    name: "Aasimar",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Aasimar|MPMM", "Aasimar|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
      },
    ],
    heightAndWeight: {
      baseHeight: 56,
      heightMod: "2d10",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 160,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        celestial: true,
      },
    ],
    resist: ["necrotic", "radiant"],
    soundClip: {
      type: "internal",
      path: "races/aasimar.mp3",
    },
    additionalSpells: [
      {
        ability: "cha",
        known: {
          "1": ["light#c"],
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Aasimar mature at the same rate as humans, but they can live up to 160 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Aasimar have the same range of height and weight as humans.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Blessed with a radiant soul, your vision can easily cut through darkness. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Celestial Resistance",
        entries: ["You have resistance to necrotic damage and radiant damage."],
      },
      {
        name: "Healing Hands",
        entries: [
          "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
        ],
      },
      {
        name: "Light Bearer",
        entries: [
          "You know the {@spell light} cantrip. Charisma is your spellcasting ability for it.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Celestial."],
      },
    ],
  },
  {
    name: "Bugbear",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
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
        name: "Size",
        entries: [
          "Bugbears are between 6 and 8 feet tall and weigh between 250 and 350 pounds. Your size is Medium.",
        ],
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
    name: "Firbolg",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Firbolg|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        wis: 2,
        str: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 74,
      heightMod: "2d12",
      baseWeight: 175,
      weightMod: "2d6",
    },
    age: {
      mature: 30,
      max: 500,
    },
    languageProficiencies: [
      {
        common: true,
        elvish: true,
        giant: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/firbolg.mp3",
    },
    additionalSpells: [
      {
        ability: "wis",
        known: {
          "1": {
            rest: {
              "1": ["detect magic", "disguise self"],
            },
          },
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "As humanoids related to the fey, firbolg have long lifespans. A firbolg reaches adulthood around 30, and the oldest of them can live for 500 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Firbolg are between 7 and 8 feet tall and weigh between 240 and 300 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Firbolg Magic",
        entries: [
          "You can cast {@spell detect magic} and {@spell disguise self} with this trait, using Wisdom as your spellcasting ability for them. Once you cast either spell, you can't cast it again with this trait until you finish a short or long rest. When you use this version of {@spell disguise self}, you can seem up to 3 feet shorter than normal, allowing you to more easily blend in with humans and elves.",
        ],
      },
      {
        name: "Hidden Step",
        entries: [
          "As a bonus action, you can magically turn {@condition invisible} until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. Once you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Speech of Beast and Leaf",
        entries: [
          "You have the ability to communicate in a limited manner with beasts and plants. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common, Elvish, and Giant."],
      },
    ],
  },
  {
    name: "Goblin",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Goblin|MPMM"],
    size: ["S"],
    speed: 30,
    ability: [
      {
        dex: 2,
        con: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 41,
      heightMod: "2d4",
      baseWeight: 35,
    },
    age: {
      mature: 8,
      max: 60,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: ["Goblins reach adulthood at age 8 and live up to 60 years."],
      },
      {
        name: "Size",
        entries: [
          "Goblins are between 3 and 4 feet tall and weigh between 40 and 80 pounds. Your size is Small.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Fury of the Small",
        entries: [
          "When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Nimble Escape",
        entries: [
          "You can take the {@action Disengage} or {@action Hide} action as a bonus action on each of your turns.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Goliath",
    source: "VGM",
    otherSources: [
      {
        source: "EEPC",
      },
      {
        source: "EGW",
      },
      {
        source: "IDRotF",
      },
    ],
    reprintedAs: ["Goliath|MPMM", "Goliath|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 74,
      heightMod: "2d10",
      baseWeight: 200,
      weightMod: "2d6",
    },
    age: {
      mature: 20,
      max: 100,
    },
    skillProficiencies: [
      {
        athletics: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        giant: true,
      },
    ],
    resist: ["cold"],
    soundClip: {
      type: "internal",
      path: "races/goliath.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live less than a century.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Goliaths are between 7 and 8 feet tall and weigh between 280 and 340 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Natural Athlete",
        entries: ["You have proficiency in the {@skill Athletics} skill."],
      },
      {
        name: "Stone's Endurance",
        entries: [
          "You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a {@dice d12}. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Mountain Born",
        entries: [
          "You have resistance to cold damage. You're also acclimated to high altitude, including elevations above 20,000 feet.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Giant."],
      },
    ],
  },
  {
    name: "Hobgoblin",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Hobgoblin|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        con: 2,
        int: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 56,
      heightMod: "2d10",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    weaponProficiencies: [
      {
        choose: {
          fromFilter: "type=martial weapon|miscellaneous=mundane",
          count: 2,
        },
      },
    ],
    armorProficiencies: [
      {
        light: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/hobgoblin.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Hobgoblins mature at the same rate as humans and have lifespans similar in length to theirs.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Hobgoblins are between 5 and 6 feet tall and weigh between 150 and 200 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Martial Training",
        entries: [
          "You are proficient with two {@filter martial weapons|items|source=phb|category=basic|type=martial weapon} of your choice and with light armor.",
        ],
      },
      {
        name: "Saving Face",
        entries: [
          "Hobgoblins are careful not to show weakness in front of their allies, for fear of losing status. If you miss with an attack roll or fail an ability check or a saving throw, you can gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +5). Once you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Kenku",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Kenku|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        dex: 2,
        wis: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 52,
      heightMod: "2d8",
      baseWeight: 50,
      weightMod: "1d6",
    },
    age: {
      mature: 12,
      max: 60,
    },
    skillProficiencies: [
      {
        choose: {
          from: ["acrobatics", "deception", "sleight of hand", "stealth"],
          count: 2,
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        auran: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kenku.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Kenku have shorter lifespans than humans. They reach maturity at about 12 years old and can live to 60.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Kenku are around 5 feet tall and weigh between 90 and 120 pounds. Your size is Medium.",
        ],
      },
      {
        name: "Expert Forgery",
        entries: [
          "You can duplicate other creatures' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects.",
        ],
      },
      {
        name: "Kenku Training",
        entries: [
          "You are proficient in your choice of two of the following skills: {@skill Acrobatics}, {@skill Deception}, {@skill Stealth}, and {@skill Sleight of Hand}.",
        ],
      },
      {
        name: "Mimicry",
        entries: [
          "You can mimic sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful Wisdom ({@skill Insight}) check opposed by your Charisma ({@skill Deception}) check.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can read and write Common and Auran, but you can only speak using your Mimicry trait.",
        ],
      },
    ],
  },
  {
    name: "Kobold",
    source: "VGM",
    reprintedAs: ["Kobold|MPMM"],
    size: ["S"],
    speed: 30,
    ability: [
      {
        dex: 2,
      },
    ],
    heightAndWeight: {
      baseHeight: 25,
      heightMod: "2d4",
      baseWeight: 25,
    },
    age: {
      mature: 6,
      max: 120,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        draconic: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kobold.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Kobolds reach adulthood at age 6 and can live up to 120 years but rarely do so.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Kobolds are between 2 and 3 feet tall and weigh between 25 and 35 pounds. Your size is Small.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Grovel, Cower, and Beg",
        entries: [
          "As an action on your turn, you can cower pathetically to distract nearby foes. Until the end of your next turn, your allies gain advantage on attack rolls against enemies within 10 feet of you that you can see. Once you use this trait, you can't use it again until you finish a short or long rest.",
        ],
      },
      {
        name: "Pack Tactics",
        entries: [
          "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't {@condition incapacitated}.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "You have disadvantage on attack rolls and on Wisdom ({@skill Perception}) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Draconic."],
      },
    ],
  },
  {
    name: "Lizardfolk",
    source: "VGM",
    reprintedAs: ["Lizardfolk|MPMM"],
    size: ["M"],
    speed: {
      walk: 30,
      swim: 30,
    },
    ability: [
      {
        con: 2,
        wis: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 57,
      heightMod: "2d10",
      baseWeight: 120,
      weightMod: "2d6",
    },
    age: {
      mature: 14,
      max: 60,
    },
    skillProficiencies: [
      {
        choose: {
          from: [
            "animal handling",
            "nature",
            "perception",
            "stealth",
            "survival",
          ],
          count: 2,
        },
      },
    ],
    languageProficiencies: [
      {
        common: true,
        draconic: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/lizardfolk.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: [
          "Lizardfolk reach maturity around age 14 and rarely live longer than 60 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Lizardfolk are a little bulkier and taller than humans, and their colorful frills make them appear even larger. Your size is Medium.",
        ],
      },
      {
        name: "Swim Speed",
        entries: ["You have a swimming speed of 30 feet."],
      },
      {
        name: "Bite",
        entries: [
          "Your fanged maw is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to {@damage 1d6} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Cunning Artisan",
        entries: [
          "As part of a short rest, you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature of size small or larger to create one of the following items: a {@item shield|phb}, a {@item club|phb}, a {@item javelin|phb}, or {@dice 1d4} {@item dart|phb|darts} or {@item blowgun needle|phb|blowgun needles}. To use this trait, you need a blade, such as a {@item dagger|phb}, or appropriate {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}, such as {@item leatherworker's tools|phb}.",
        ],
      },
      {
        name: "Hold Breath",
        entries: ["You can hold your breath for up to 15 minutes at a time."],
      },
      {
        name: "Hunter's Lore",
        entries: [
          "You gain proficiency with two of the following skills of your choice: {@skill Animal Handling}, {@skill Nature}, {@skill Perception}, {@skill Stealth}, and {@skill Survival}.",
        ],
      },
      {
        name: "Natural Armor",
        entries: [
          "You have tough, scaly skin. When you aren't wearing armor, your AC is 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
        ],
      },
      {
        name: "Hungry Jaws",
        entries: [
          "In battle, you can throw yourself into a vicious feeding frenzy. As a bonus action, you can make a special attack with your bite. If the attack hits, it deals its normal damage, and you gain temporary hit points equal to your Constitution modifier (minimum of 1), and you can't use this trait again until you finish a short or long rest.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Draconic."],
      },
    ],
  },
  {
    name: "Orc",
    source: "VGM",
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
        name: "Size",
        entries: [
          "Orcs are usually over 6 feet tall and weigh between 230 and 280 pounds. Your size is Medium.",
        ],
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
    name: "Tabaxi",
    source: "VGM",
    otherSources: [
      {
        source: "EGW",
      },
    ],
    reprintedAs: ["Tabaxi|MPMM"],
    size: ["M"],
    speed: {
      walk: 30,
      climb: 20,
    },
    ability: [
      {
        dex: 2,
        cha: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 58,
      heightMod: "2d10",
      baseWeight: 90,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
        stealth: true,
      },
    ],
    languageProficiencies: [
      {
        common: true,
        anyStandard: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/tabaxi.mp3",
    },
    entries: [
      {
        name: "Age",
        entries: ["Tabaxi have lifespans equivalent to humans."],
      },
      {
        name: "Size",
        entries: [
          "Tabaxi are taller on average than humans and relatively slender. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You have a cat's keen senses, especially in the dark. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Feline Agility",
        entries: [
          "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns.",
        ],
      },
      {
        name: "Cat's Claws",
        entries: [
          "Because of your claws, you have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to {@damage 1d4} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Cat's Talents",
        entries: [
          "You have proficiency in the {@skill Perception} and {@skill Stealth} skills.",
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
  {
    name: "Triton",
    source: "VGM",
    reprintedAs: ["Triton|MPMM"],
    size: ["M"],
    speed: {
      walk: 30,
      swim: 30,
    },
    ability: [
      {
        str: 1,
        cha: 1,
        con: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 54,
      heightMod: "2d10",
      baseWeight: 90,
      weightMod: "2d4",
    },
    age: {
      mature: 15,
      max: 200,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        primordial: true,
      },
    ],
    resist: ["cold"],
    soundClip: {
      type: "internal",
      path: "races/triton.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "1": {
            daily: {
              "1": ["fog cloud"],
            },
          },
          "3": {
            daily: {
              "1": ["gust of wind"],
            },
          },
          "5": {
            daily: {
              "1": ["wall of water|xge"],
            },
          },
        },
        ability: "cha",
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Tritons reach maturity around age 15 and can live up to 200 years.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Tritons are slightly shorter than humans, averaging about 5 feet tall. Your size is Medium.",
        ],
      },
      {
        name: "Swim Speed",
        entries: ["You have a swimming speed of 30 feet."],
      },
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Control Air and Water",
        entries: [
          "A child of the sea, you can call on the magic of elemental air and water. You can cast {@spell fog cloud} with this trait. Starting at 3rd level, you can cast {@spell gust of wind} with it, and starting at 5th level, you can also cast {@spell wall of water|xge} with it. Once you cast a spell with this trait, you can't cast that spell with it again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Emissary of the Sea",
        entries: [
          "Aquatic beasts have an extraordinary affinity with your people. You can communicate simple ideas with beasts that can breathe water. They can understand the meaning of your words, though you have no special ability to understand them in return.",
        ],
      },
      {
        name: "Guardians of the Depths",
        entries: [
          "Adapted to even the most extreme ocean depths, you have resistance to cold damage.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Primordial."],
      },
    ],
  },
  {
    name: "Yuan-ti Pureblood",
    source: "VGM",
    reprintedAs: ["Yuan-Ti|MPMM"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        cha: 2,
        int: 1,
      },
    ],
    heightAndWeight: {
      baseHeight: 56,
      heightMod: "2d10",
      baseWeight: 110,
      weightMod: "2d4",
    },
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        abyssal: true,
        draconic: true,
      },
    ],
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    soundClip: {
      type: "internal",
      path: "races/yuan-ti-pureblood.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "1": ["animal friendship"],
          "3": {
            daily: {
              "1": ["suggestion"],
            },
          },
        },
        ability: "cha",
        known: {
          "1": ["poison spray#c"],
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Purebloods mature at the same rate as humans and have lifespans similar in length to theirs.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Purebloods match humans in average size and weight. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Innate Spellcasting",
        entries: [
          "You know the {@spell poison spray} cantrip. You can cast {@spell animal friendship} an unlimited number of times with this trait, but you can target only snakes with it. Starting at 3rd level, you can also cast {@spell suggestion} with this trait. Once you cast it, you can't do so again until you finish a long rest. Charisma is your spellcasting ability for these spells.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: [
          "You have advantage on saving throws against spells and other magical effects.",
        ],
      },
      {
        name: "Poison Immunity",
        entries: [
          "You are immune to poison damage and the {@condition poisoned} condition.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Common, Abyssal, and Draconic.",
        ],
      },
    ],
  },
];
