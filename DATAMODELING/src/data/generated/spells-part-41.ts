export const spellsPart41= [
  {
    "name": "Tongues",
    "source": "XPHB",
    "page": 334,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "m": "a miniature ziggurat"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "entries": [
      "This spell grants the creature you touch the ability to understand any spoken or signed language that it hears or sees. Moreover, when the target communicates by speaking or signing, any creature that knows at least one language can understand it if that creature can hear the speech or see the signing."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Transport via Plants",
    "source": "XPHB",
    "page": 334,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "round",
          "amount": 1
        }
      }
    ],
    "entries": [
      "This spell creates a magical link between a Large or larger inanimate plant within range and another plant, at any distance, on the same plane of existence. You must have seen or touched the destination plant at least once before. For the duration, any creature can step into the target plant and exit from the destination plant by using 5 feet of movement."
    ],
    "miscTags": [
      "TP"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Tree Stride",
    "source": "XPHB",
    "page": 335,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered.",
      "You can use this transportation ability only once on each of your turns. You must end each turn outside a tree."
    ],
    "miscTags": [
      "TP"
    ],
    "hasFluffImages": true
  },
  {
    "name": "True Polymorph",
    "source": "XPHB",
    "page": 335,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a drop of mercury, a dollop of gum arabic, and a wisp of smoke"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "Choose one creature or nonmagical object that you can see within range. The creature shape-shifts into a different creature or a nonmagical object, or the object shape-shifts into a creature (the object must be neither worn nor carried). The transformation lasts for the duration or until the target dies or is destroyed, but if you maintain {@status Concentration|XPHB} on this spell for the full duration, the spell lasts until dispelled.",
      "An unwilling creature can make a Wisdom saving throw, and if it succeeds, it isn't affected by this spell.",
      {
        "type": "entries",
        "name": "Creature into Creature",
        "entries": [
          "If you turn a creature into another kind of creature, the new form can be any kind you choose that has a {@variantrule Challenge Rating|XPHB} equal to or less than the target's {@variantrule Challenge Rating|XPHB} or level. The target's game statistics are replaced by the stat block of the new form, but it retains its {@variantrule Hit Points|XPHB}, {@variantrule Hit Point Dice|XPHB}, alignment, and personality.",
          "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the new form. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The spell ends early on the target if it has no {@variantrule Temporary Hit Points|XPHB} left.",
          "The target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.",
          "The target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment."
        ]
      },
      {
        "type": "entries",
        "name": "Object into Creature",
        "entries": [
          "You can turn an object into any kind of creature, as long as the creature's size is no larger than the object's size and the creature has a {@variantrule Challenge Rating|XPHB} of 9 or lower. The creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you and your allies. In combat, it takes its turns immediately after yours, and it obeys your commands.",
          "If the spell lasts more than an hour, you no longer control the creature. It might remain {@variantrule Friendly [Attitude]|XPHB|Friendly} to you, depending on how you have treated it."
        ]
      },
      {
        "type": "entries",
        "name": "Creature into Object",
        "entries": [
          "If you turn a creature into an object, it transforms along with whatever it is wearing and carrying into that form, as long as the object's size is no larger than the creature's size. The creature's statistics become those of the object, and the creature has no memory of time spent in this form after the spell ends and it returns to normal."
        ]
      }
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT",
      "SMN",
      "THP"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "True Resurrection",
    "source": "XPHB",
    "page": 336,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
    "school": "N",
    "time": [
      {
        "number": 1,
        "unit": "hour"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "diamonds worth 25,000+ GP, which the spell consumes",
        "cost": 2500000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You touch a creature that has been dead for no longer than 200 years and that died for any reason except old age. The creature is revived with all its {@variantrule Hit Points|XPHB}.",
      "This spell closes all wounds, neutralizes any poison, cures all magical contagions, and lifts any curses affecting the creature when it died. The spell replaces damaged or missing organs and limbs. If the creature was Undead, it is restored to its non-Undead form.",
      "The spell can provide a new body if the original no longer exists, in which case you must speak the creature's name. The creature then appears in an unoccupied space you choose within 10 feet of you."
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "True Seeing",
    "source": "XPHB",
    "page": 336,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "mushroom powder worth 25+ GP, which the spell consumes",
        "cost": 2500,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "entries": [
      "For the duration, the willing creature you touch has {@sense Truesight|XPHB} with a range of 120 feet."
    ]
  },
  {
    "name": "True Strike",
    "source": "XPHB",
    "page": 336,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "s": true,
      "m": {
        "text": "a weapon with which you have proficiency and that is worth 1+ CP",
        "cost": 1
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Guided by a flash of magical insight, you make one attack with the weapon used in the spell's casting. The attack uses your spellcasting ability for the attack and damage rolls instead of using Strength or Dexterity. If the attack deals damage, it can be Radiant damage or the weapon's normal damage type (your choice)."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "Whether you deal Radiant damage or the weapon's normal damage type, the attack deals extra Radiant damage when you reach levels 5 ({@damage 1d6}), 11 ({@damage 2d6}), and 17 ({@damage 3d6})."
        ]
      }
    ],
    "scalingLevelDice": [
      {
        "label": "extra Radiant damage",
        "scaling": {
          "5": "1d6",
          "11": "2d6",
          "17": "3d6"
        }
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "miscTags": [
      "AAD"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Tsunami",
    "source": "XPHB",
    "page": 336,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "minute"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "miles",
        "amount": 1
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "round",
          "amount": 6
        },
        "concentration": true
      }
    ],
    "entries": [
      "A wall of water springs into existence at a point you choose within range. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick. The wall lasts for the duration.",
      "When the wall appears, each creature in its area makes a Strength saving throw, taking {@damage 6d10} Bludgeoning damage on a failed save or half as much damage on a successful one.",
      "At the start of each of your turns after the wall appears, the wall, along with any creatures in it, moves 50 feet away from you. Any Huge or smaller creature inside the wall or whose space the wall enters when it moves must succeed on a Strength saving throw or take {@damage 5d10} Bludgeoning damage. A creature can take this damage only once per round. At the end of the turn, the wall's height is reduced by 50 feet, and the damage the wall deals on later rounds is reduced by {@dice 1d10}. When the wall reaches 0 feet in height, the spell ends.",
      "A creature caught in the wall can move by swimming. Because of the wave's force, though, the creature must succeed on a Strength ({@skill Athletics|XPHB}) check against your spell save DC to move at all. If it fails the check, it can't move. A creature that moves out of the wall falls to the ground."
    ],
    "damageInflict": [
      "bludgeoning"
    ],
    "savingThrow": [
      "strength"
    ],
    "abilityCheck": [
      "strength"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Unseen Servant",
    "source": "XPHB",
    "page": 336,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of string and of wood"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "This spell creates an {@condition Invisible|XPHB}, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 {@variantrule Hit Points|XPHB|Hit Point}, and a Strength of 2, and it can't attack. If it drops to 0 {@variantrule Hit Points|XPHB}, the spell ends.",
      "Once on each of your turns as a {@variantrule Bonus Action|XPHB}, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring drinks. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.",
      "If you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends."
    ],
    "miscTags": [
      "SMN",
      "UBA"
    ]
  }
];
