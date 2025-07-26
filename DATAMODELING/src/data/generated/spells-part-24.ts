export const spellsPart24= [
  {
    "name": "Lesser Restoration",
    "source": "XPHB",
    "page": 291,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
        "type": "touch"
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
      "You touch a creature and end one condition on it: {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, {@condition Paralyzed|XPHB}, or {@condition Poisoned|XPHB}."
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Levitate",
    "source": "XPHB",
    "page": 291,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a metal spring"
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
      "One creature or loose object of your choice that you can see within range rises vertically up to 20 feet and remains suspended there for the duration. The spell can levitate an object that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.",
      "The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can take a {@action Magic|XPHB} action to move the target, which must remain within the spell's range.",
      "When the spell ends, the target floats gently to the ground if it is still aloft."
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Light",
    "source": "XPHB",
    "page": 292,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "m": "a firefly or phosphorescent moss"
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
      "You touch one Large or smaller object that isn't being worn or carried by someone else. Until the spell ends, the object sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. The light can be colored as you like.",
      "Covering the object with something opaque blocks the light. The spell ends if you cast it again."
    ],
    "miscTags": [
      "LGT",
      "OBJ"
    ]
  },
  {
    "name": "Lightning Arrow",
    "source": "XPHB",
    "page": 292,
    "level": 3,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting or missing a target with a ranged attack using a weapon"
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
        "type": "instant"
      }
    ],
    "entries": [
      "As your attack hits or misses the target, the weapon or ammunition you're using transforms into a lightning bolt. Instead of taking any damage or other effects from the attack, the target takes {@damage 4d8} Lightning damage on a hit or half as much damage on a miss. Each creature within 10 feet of the target then makes a Dexterity saving throw, taking {@damage 2d8} Lightning damage on a failed save or half as much damage on a successful one.",
      "The weapon or ammunition then returns to its normal form."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage for both effects of the spell increases by {@scaledamage 4d8;2d8|3-9|1d8} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "lightning"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Lightning Bolt",
    "source": "XPHB",
    "page": 292,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "line",
      "distance": {
        "type": "feet",
        "amount": 100
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of fur and a crystal rod"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A stroke of lightning forming a 100-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line} blasts out from you in a direction you choose. Each creature in the {@variantrule Line [Area of Effect]|XPHB|Line} makes a Dexterity saving throw, taking {@damage 8d6} Lightning damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d6|3-9|1d6} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "lightning"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "L"
    ]
  },
  {
    "name": "Locate Animals or Plants",
    "source": "XPHB",
    "page": 292,
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
      "m": "fur from a bloodhound"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "Describe or name a specific kind of Beast, Plant creature, or nonmagical plant. You learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present."
    ],
    "affectsCreatureType": [
      "beast",
      "plant"
    ]
  },
  {
    "name": "Locate Creature",
    "source": "XPHB",
    "page": 292,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
      "m": "fur from a bloodhound"
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
      "Describe or name a creature that is familiar to you. You sense the direction to the creature's location if that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement.",
      "The spell can locate a specific creature known to you or the nearest creature of a specific kind (such as a human or a unicorn) if you have seen such a creature up close—within 30 feet—at least once. If the creature you described or named is in a different form, such as under the effects of a {@spell Flesh to Stone|XPHB} or {@spell Polymorph|XPHB} spell, this spell doesn't locate the creature.",
      "This spell can't locate a creature if any thickness of lead blocks a direct path between you and the creature."
    ]
  },
  {
    "name": "Locate Object",
    "source": "XPHB",
    "page": 293,
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
      "m": "a forked twig"
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
      "Describe or name an object that is familiar to you. You sense the direction to the object's location if that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.",
      "The spell can locate a specific object known to you if you have seen it up close—within 30 feet—at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.",
      "This spell can't locate an object if any thickness of lead blocks a direct path between you and the object."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Longstrider",
    "source": "XPHB",
    "page": 293,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "m": "a pinch of dirt"
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
      "You touch a creature. The target's {@variantrule Speed|XPHB} increases by 10 feet until the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
