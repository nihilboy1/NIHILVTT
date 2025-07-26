export const spellsPart34= [
  {
    "name": "Searing Smite",
    "source": "XPHB",
    "page": 314,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        }
      }
    ],
    "entries": [
      "As you hit the target, it takes an extra {@damage 1d6} Fire damage from the attack. At the start of each of its turns until the spell ends, the target takes {@damage 1d6} Fire damage and then makes a Constitution saving throw. On a failed save, the spell continues. On a successful save, the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "All the damage increases by {@scaledamage 1d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "See Invisibility",
    "source": "XPHB",
    "page": 314,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "v": true,
      "s": true,
      "m": "a pinch of talc"
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
      "For the duration, you see creatures and objects that have the {@condition Invisible|XPHB} condition as if they were visible, and you can see into the Ethereal Plane. Creatures and objects there appear ghostly."
    ]
  },
  {
    "name": "Seeming",
    "source": "XPHB",
    "page": 314,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "I",
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
      "s": true
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 8
        }
      }
    ],
    "entries": [
      "You give an illusory appearance to each creature of your choice that you can see within range. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.",
      "You can give the same appearance or different ones to the targets. The spell can change the appearance of the targets' bodies and equipment. You can make each creature seem 1 foot shorter or taller and appear heavier or lighter. A target's new appearance must have the same basic arrangement of limbs as the target, but the extent of the illusion is otherwise up to you. The spell lasts for the duration.",
      "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature's outfit, objects pass through the hat.",
      "A creature that takes the {@action Study|XPHB} action to examine a target can make an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised."
    ],
    "savingThrow": [
      "charisma"
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Sending",
    "source": "XPHB",
    "page": 314,
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
        "type": "unlimited"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a copper wire"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You send a short message of 25 words or fewer to a creature you have met or a creature described to you by someone who has met it. The target hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables targets to understand the meaning of your message.",
      "You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a {@chance 5|||Message lost!|Message arrives} chance that the message doesn't arrive. You know if the delivery fails.",
      "Upon receiving your message, a creature can block your ability to reach it again with this spell for 8 hours. If you try to send another message during that time, you learn that you are blocked, and the spell fails."
    ]
  },
  {
    "name": "Sequester",
    "source": "XPHB",
    "page": 315,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "gem dust worth 5,000+ GP, which the spell consumes",
        "cost": 500000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "permanent",
        "ends": [
          "dispel"
        ]
      }
    ],
    "entries": [
      "With a touch, you magically sequester an object or a willing creature. For the duration, the target has the {@condition Invisible|XPHB} condition and can't be targeted by Divination spells, detected by magic, or viewed remotely with magic.",
      "If the target is a creature, it enters a state of suspended animation; it has the {@condition Unconscious|XPHB} condition, doesn't age, and doesn't need food, water, or air.",
      "You can set a condition for the spell to end early. The condition can be anything you choose, but it must occur or be visible within 1 mile of the target. Examples include \"after 1,000 years\" or \"when the tarrasque awakens.\" This spell also ends if the target takes any damage."
    ],
    "conditionInflict": [
      "invisible",
      "unconscious"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Shapechange",
    "source": "XPHB",
    "page": 315,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a jade circlet worth 1,500+ GP",
        "cost": 150000
      }
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
      "You shape-shift into another creature for the duration or until you take a {@action Magic|XPHB} action to shape-shift into a different eligible form. The new form must be of a creature that has a {@variantrule Challenge Rating|XPHB} no higher than your level or {@variantrule Challenge Rating|XPHB}. You must have seen the sort of creature before, and it can't be a Construct or an Undead.",
      "When you cast the spell, you gain a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the first form into which you shape-shift. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends.",
      "Your game statistics are replaced by the stat block of the chosen form, but you retain your creature type; alignment; personality; Intelligence, Wisdom, and Charisma scores; {@variantrule Hit Points|XPHB}; {@variantrule Hit Point Dice|XPHB}; proficiencies; and ability to communicate. If you have the Spellcasting feature, you retain it too.",
      "Upon shape-shifting, you determine whether your equipment drops to the ground or changes in size and shape to fit the new form while you're in it."
    ],
    "miscTags": [
      "THP"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Shatter",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "V",
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
      "m": "a chip of mica"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A loud noise erupts from a point of your choice within range. Each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered there makes a Constitution saving throw, taking {@damage 3d8} Thunder damage on a failed save or half as much damage on a successful one. A Construct has {@variantrule Disadvantage|XPHB} on the save.",
      "A nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d8|2-9|1d8} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "thunder"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Shield",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "A",
    "time": [
      {
        "number": 1,
        "unit": "reaction",
        "condition": "which you take when you are hit by an attack roll or targeted by the Magic Missile spell"
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
          "type": "round",
          "amount": 1
        }
      }
    ],
    "entries": [
      "An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from {@spell Magic Missile|XPHB}."
    ],
    "miscTags": [
      "MAC"
    ]
  },
  {
    "name": "Shield of Faith",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "A",
    "time": [
      {
        "number": 1,
        "unit": "bonus"
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
      "m": "a prayer scroll"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration."
    ],
    "miscTags": [
      "MAC"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
