export const spellsPart44= [
  {
    "name": "Word of Recall",
    "source": "XPHB",
    "page": 343,
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
        "amount": 5
      }
    },
    "components": {
      "v": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect.",
      "You must designate a location, such as a temple, as a sanctuary by casting this spell there."
    ],
    "miscTags": [
      "PS",
      "TP"
    ]
  },
  {
    "name": "Wrathful Smite",
    "source": "XPHB",
    "page": 343,
    "level": 1,
    "school": "N",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a creature with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
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
      "The target takes an extra {@damage 1d6} Necrotic damage from the attack, and it must succeed on a Wisdom saving throw or have the {@condition Frightened|XPHB} condition until the spell ends. At the end of each of its turns, the {@condition Frightened|XPHB} target repeats the save, ending the spell on itself on a success."
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
      "necrotic"
    ],
    "conditionInflict": [
      "frightened"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Yolande's Regal Presence",
    "source": "XPHB",
    "page": 343,
    "level": 5,
    "school": "E",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "emanation",
      "distance": {
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a miniature tiara"
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
      "You surround yourself with unearthly majesty in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters the space of a creature you can see and whenever a creature you can see enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, you can force that creature to make a Wisdom saving throw. On a failed save, the target takes {@damage 4d6} Psychic damage and has the {@condition Prone|XPHB} condition, and you can push it up to 10 feet away. On a successful save, the target takes half as much damage only. A creature makes this save only once per turn."
    ],
    "damageInflict": [
      "psychic"
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "FMV",
      "SGT"
    ],
    "areaTags": [
      "S"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Zone of Truth",
    "source": "XPHB",
    "page": 343,
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
          "amount": 10
        }
      }
    ],
    "entries": [
      "You create a magical zone that guards against deception in a 15-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range. Until the spell ends, a creature that enters the spell's area for the first time on a turn or starts its turn there makes a Charisma saving throw. On a failed save, a creature can't speak a deliberate lie while in the radius. You know whether a creature succeeds or fails on this save.",
      "An affected creature is aware of the spell and can avoid answering questions to which it would normally respond with a lie. Such a creature can be evasive yet must be truthful."
    ],
    "savingThrow": [
      "charisma"
    ],
    "areaTags": [
      "S"
    ]
  }
];
