export const spellsPart14= [
  {
    "name": "Eldritch Blast",
    "source": "XPHB",
    "page": 267,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You hurl a beam of crackling energy. Make a ranged spell attack against one creature or object in range. On a hit, the target takes {@damage 1d10} Force damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The spell creates two beams at level 5, three beams at level 11, and four beams at level 17. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "MT",
      "ST"
    ]
  },
  {
    "name": "Elemental Weapon",
    "source": "XPHB",
    "page": 267,
    "level": 3,
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
      "s": true
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
      "A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra {@damage 1d4} damage of the chosen type when it hits."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "If you use a level 5-6 spell slot, the bonus to attack rolls increases to +2, and the extra damage increases to {@damage 2d4}. If you use a level 7+ spell slot, the bonus increases to +3, and the extra damage increases to {@damage 3d4}."
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "thunder"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Elementalism",
    "source": "XPHB",
    "page": 267,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You exert control over the elements, creating one of the following effects within range.",
      {
        "type": "entries",
        "name": "Beckon Air",
        "entries": [
          "You create a breeze strong enough to ripple cloth, stir dust, rustle leaves, and close open doors and shutters, all in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. Doors and shutters being held open by someone or something aren't affected."
        ]
      },
      {
        "type": "entries",
        "name": "Beckon Earth",
        "entries": [
          "You create a thin shroud of dust or sand that covers surfaces in a 5-foot-square area, or you cause a single word to appear in your handwriting in a patch of dirt or sand."
        ]
      },
      {
        "type": "entries",
        "name": "Beckon Fire",
        "entries": [
          "You create a thin cloud of harmless embers and colored, scented smoke in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. You choose the color and scent, and the embers can light candles, torches, or lamps in that area. The smoke's scent lingers for 1 minute."
        ]
      },
      {
        "type": "entries",
        "name": "Beckon Water",
        "entries": [
          "You create a spray of cool mist that lightly dampens creatures and objects in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. Alternatively, you create 1 cup of clean water either in an open container or on a surface, and the water evaporates in 1 minute."
        ]
      },
      {
        "type": "entries",
        "name": "Sculpt Element",
        "entries": [
          "You cause dirt, sand, fire, smoke, mist, or water that can fit in a 1-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} to assume a crude shape (such as that of a creature) for 1 hour."
        ]
      }
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "C",
      "Q"
    ]
  },
  {
    "name": "Enhance Ability",
    "source": "XPHB",
    "page": 268,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "m": "fur or a feather"
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
      "You touch a creature and choose Strength, Dexterity, Intelligence, Wisdom, or Charisma. For the duration, the target has {@variantrule Advantage|XPHB} on ability checks using the chosen ability."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 2. You can choose a different ability for each target."
        ]
      }
    ],
    "miscTags": [
      "ADV",
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Enlarge/Reduce",
    "source": "XPHB",
    "page": 268,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "m": "a pinch of powdered iron"
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
      "For the duration, the spell enlarges or reduces a creature or an object you can see within range (see the chosen effect below). A targeted object must be neither worn nor carried. If the target is an unwilling creature, it can make a Constitution saving throw. On a successful save, the spell has no effect.",
      "Everything that a targeted creature is wearing and carrying changes size with it. Any item it drops returns to normal size at once. A thrown weapon or piece of ammunition returns to normal size immediately after it hits or misses a target.",
      {
        "type": "entries",
        "name": "Enlarge",
        "entries": [
          "The target's size increases by one category—from Medium to Large, for example. The target also has {@variantrule Advantage|XPHB} on Strength checks and Strength saving throws. The target's attacks with its enlarged weapons or Unarmed Strikes deal an extra {@damage 1d4} damage on a hit."
        ]
      },
      {
        "type": "entries",
        "name": "Reduce",
        "entries": [
          "The target's size decreases by one category—from Medium to Small, for example. The target also has {@variantrule Disadvantage|XPHB} on Strength checks and Strength saving throws. The target's attacks with its reduced weapons or Unarmed Strikes deal {@damage 1d4} less damage on a hit (this can't reduce the damage below 1)."
        ]
      }
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "ADV",
      "OBJ",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Ensnaring Strike",
    "source": "XPHB",
    "page": 268,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a creature with a weapon"
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
        },
        "concentration": true
      }
    ],
    "entries": [
      "As you hit the target, grasping vines appear on it, and it makes a Strength saving throw. A Large or larger creature has {@variantrule Advantage|XPHB} on this save. On a failed save, the target has the {@condition Restrained|XPHB} condition until the spell ends. On a successful save, the vines shrivel away, and the spell ends.",
      "While {@condition Restrained|XPHB}, the target takes {@damage 1d6} Piercing damage at the start of each of its turns. The target or a creature within reach of it can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. On a success, the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 1d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "piercing"
    ],
    "conditionInflict": [
      "restrained"
    ],
    "savingThrow": [
      "strength"
    ],
    "abilityCheck": [
      "strength"
    ]
  },
  {
    "name": "Entangle",
    "source": "XPHB",
    "page": 268,
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
        "amount": 90
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
      "Grasping plants sprout from the ground in a 20-foot square within range. For the duration, these plants turn the ground in the area into {@variantrule Difficult Terrain|XPHB}. They disappear when the spell ends.",
      "Each creature (other than you) in the area when you cast the spell must succeed on a Strength saving throw or have the {@condition Restrained|XPHB} condition until the spell ends. A {@condition Restrained|XPHB} creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. On a success, it frees itself from the grasping plants and is no longer {@condition Restrained|XPHB} by them."
    ],
    "conditionInflict": [
      "restrained"
    ],
    "savingThrow": [
      "strength"
    ],
    "abilityCheck": [
      "strength"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "Q"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Enthrall",
    "source": "XPHB",
    "page": 269,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "E",
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
      "s": true
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
      "You weave a distracting string of words, causing creatures of your choice that you can see within range to make a Wisdom saving throw. Any creature you or your companions are fighting automatically succeeds on this save. On a failed save, a target has a -10 penalty to Wisdom ({@skill Perception|XPHB}) checks and Passive {@skill Perception|XPHB} until the spell ends."
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Etherealness",
    "source": "XPHB",
    "page": 269,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
          "type": "hour",
          "amount": 8
        }
      }
    ],
    "entries": [
      "You step into the border regions of the Ethereal Plane, where it overlaps with your current plane. You remain in the Border Ethereal for the duration. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can perceive the plane you left, which looks gray, and you can't see anything there more than 60 feet away.",
      "While on the Ethereal Plane, you can affect and be affected only by creatures, objects, and effects on that plane. Creatures that aren't on the Ethereal Plane can't perceive or interact with you unless a feature gives them the ability to do so.",
      "When the spell ends, you return to the plane you left in the spot that corresponds to your space in the Border Ethereal. If you appear in an occupied space, you are shunted to the nearest unoccupied space and take Force damage equal to twice the number of feet you are moved.",
      "This spell ends instantly if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target up to three willing creatures (including yourself) for each spell slot level above 7. The creatures must be within 10 feet of you when you cast the spell."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "miscTags": [
      "PS",
      "SCT"
    ]
  }
];
