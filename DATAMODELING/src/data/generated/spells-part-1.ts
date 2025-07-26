export const spellsPart1 = [
  {
    name: "Acid Splash",
    source: "XPHB",
    page: 239,
    srd52: true,
    basicRules2024: true,
    level: 0,
    school: "V",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You create an acidic bubble at a point within range, where it explodes in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. Each creature in that {@variantrule Sphere [Area of Effect]|XPHB|Sphere} must succeed on a Dexterity saving throw or take {@damage 1d6} Acid damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Cantrip Upgrade",
        entries: [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6}).",
        ],
      },
    ],
    scalingLevelDice: {
      label: "Acid damage",
      scaling: {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6",
      },
    },
    damageInflict: ["acid"],
    savingThrow: ["dexterity"],
    miscTags: ["SCL", "SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Aid",
    source: "XPHB",
    page: 239,
    srd52: true,
    basicRules2024: true,
    level: 2,
    school: "A",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a strip of white cloth",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 8,
        },
      },
    ],
    entries: [
      "Choose up to three creatures within range. Each target's {@variantrule Hit Points|XPHB|Hit Point} maximum and current {@variantrule Hit Points|XPHB} increase by 5 for the duration.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Each target's {@variantrule Hit Points|XPHB} increase by 5 for each spell slot level above 2.",
        ],
      },
    ],
    miscTags: ["HL"],
    areaTags: ["MT"],
  },
  {
    name: "Alarm",
    source: "XPHB",
    page: 239,
    srd52: true,
    basicRules2024: true,
    level: 1,
    school: "A",
    time: [
      {
        number: 1,
        unit: "minute",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a bell and silver wire",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 8,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "You set an alarm against intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. Until the spell ends, an alarm alerts you whenever a creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is audible or mental:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Audible Alarm",
            entries: [
              "The alarm produces the sound of a handbell for 10 seconds within 60 feet of the warded area.",
            ],
          },
          {
            type: "item",
            name: "Mental Alarm",
            entries: [
              "You are alerted by a mental ping if you are within 1 mile of the warded area. This ping awakens you if you're asleep.",
            ],
          },
        ],
      },
    ],
    areaTags: ["C"],
  },
  {
    name: "Alter Self",
    source: "XPHB",
    page: 239,
    srd52: true,
    basicRules2024: true,
    level: 2,
    school: "T",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You alter your physical form. Choose one of the following options. Its effects last for the duration, during which you can take a {@action Magic|XPHB} action to replace the option you chose with a different one.",
      {
        type: "entries",
        name: "Aquatic Adaptation",
        entries: [
          "You sprout gills and grow webs between your fingers. You can breathe underwater and gain a {@variantrule Swim Speed|XPHB} equal to your {@variantrule Speed|XPHB}.",
        ],
      },
      {
        type: "entries",
        name: "Change Appearance",
        entries: [
          "You alter your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and other distinguishing characteristics. You can make yourself appear as a member of another species, though none of your statistics change. You can't appear as a creature of a different size, and your basic shape stays the same; if you're bipedal, you can't use this spell to become quadrupedal, for instance. For the duration, you can take a {@action Magic|XPHB} action to change your appearance in this way again.",
        ],
      },
      {
        type: "entries",
        name: "Natural Weapons",
        entries: [
          "You grow claws (Slashing), fangs (Piercing), horns (Piercing), or hooves (Bludgeoning). When you use your {@variantrule Unarmed Strike|XPHB} to deal damage with that new growth, it deals {@damage 1d6} damage of the type in parentheses instead of dealing the normal damage for your {@variantrule Unarmed Strike|XPHB}, and you use your spellcasting ability modifier for the attack and damage rolls rather than using Strength.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "piercing", "slashing"],
  },
  {
    name: "Animal Friendship",
    source: "XPHB",
    page: 239,
    srd52: true,
    basicRules2024: true,
    level: 1,
    school: "E",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a morsel of food",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    entries: [
      "Target a Beast that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. If you or one of your allies deals damage to the target, the spells ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional Beast for each spell slot level above 1.",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["beast"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Animal Messenger",
    source: "XPHB",
    page: 240,
    srd52: true,
    basicRules2024: true,
    level: 2,
    school: "E",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a morsel of food",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      'A {@filter Tiny Beast|bestiary|size=T|type=beast|miscellaneous=!swarm} of your choice that you can see within range must succeed on a Charisma saving throw, or it attempts to deliver a message for you (if the target\'s {@variantrule Challenge Rating|XPHB} isn\'t 0, it automatically succeeds). You specify a location you have visited and a recipient who matches a general description, such as "a person dressed in the uniform of the town guard" or "a red-haired dwarf wearing a pointed hat." You also communicate a message of up to twenty-five words. The Beast travels for the duration toward the specified location, covering about 25 miles per 24 hours or 50 miles if the Beast can fly.',
      "When the Beast arrives, it delivers your message to the creature that you described, mimicking your communication. If the Beast doesn't reach its destination before the spell ends, the message is lost, and the Beast returns to where you cast the spell.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The spell's duration increases by 48 hours for each spell slot level above 2.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["beast"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Animal Shapes",
    source: "XPHB",
    page: 240,
    srd52: true,
    basicRules2024: true,
    level: 8,
    school: "T",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    entries: [
      "Choose any number of willing creatures that you can see within range. Each target shape-shifts into a Large or smaller Beast of your choice that has a {@variantrule Challenge Rating|XPHB} of 4 or lower. You can choose a different form for each target. On later turns, you can take a {@action Magic|XPHB} action to transform the targets again.",
      "A target's game statistics are replaced by the chosen Beast's statistics, but the target retains its creature type; {@variantrule Hit Points|XPHB}; {@variantrule Hit Point Dice|XPHB}; alignment; ability to communicate; and Intelligence, Wisdom, and Charisma scores. The target's actions are limited by the Beast form's anatomy, and it can't cast spells. The target's equipment melds into the new form, and the target can't use any of that equipment while in that form.",
      "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the first form into which it shape-shifts. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The transformation lasts for the duration or until the target ends it as a {@variantrule Bonus Action|XPHB}.",
    ],
    miscTags: ["SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Animate Dead",
    source: "XPHB",
    page: 240,
    srd52: true,
    basicRules2024: true,
    level: 3,
    school: "N",
    time: [
      {
        number: 1,
        unit: "minute",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a drop of blood, a piece of flesh, and a pinch of bone dust",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Choose a pile of bones or a corpse of a Medium or Small Humanoid within range. The target becomes an Undead creature: a {@creature Skeleton|XMM} if you chose bones or a {@creature Zombie|XMM} if you chose a corpse.",
      "On each of your turns, you can take a {@variantrule Bonus Action|XPHB} to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a chamber or corridor. If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. Once given an order, the creature continues to follow it until its task is complete.",
      "The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell rather than animating a new creature.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You animate or reassert control over two additional Undead creatures for each spell slot level above 3. Each of the creatures must come from a different corpse or pile of bones.",
        ],
      },
    ],
    affectsCreatureType: ["humanoid"],
    miscTags: ["PRM", "SMN", "UBA"],
  },
  {
    name: "Animate Objects",
    source: "XPHB",
    page: 240,
    srd52: true,
    basicRules2024: true,
    level: 5,
    school: "T",
    time: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "Objects animate at your command. Choose a number of nonmagical objects within range that aren't being worn or carried, aren't fixed to a surface, and aren't Gargantuan. The maximum number of objects is equal to your spellcasting ability modifier; for this number, a Medium or smaller target counts as one object, a Large target counts as two, and a Huge target counts as three.",
      "Each target animates, sprouts legs, and becomes a Construct that uses the {@creature Animated Object|XPHB} stat block; this creature is under your control until the spell ends or until it is reduced to 0 {@variantrule Hit Points|XPHB}. Each creature you make with this spell is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count and takes its turn immediately after yours.",
      "Until the spell ends, you can take a {@variantrule Bonus Action|XPHB} to mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. When the creature drops to 0 {@variantrule Hit Points|XPHB}, it reverts to its object form, and any remaining damage carries over to that form.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The creature's Slam damage increases by {@damage 1d4} (Medium or smaller), {@damage 1d6} (Large), or {@damage 1d12} (Huge) for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "piercing", "slashing"],
    miscTags: ["OBJ", "SMN", "UBA"],
    areaTags: ["MT"],
    hasFluffImages: true,
  },
];
