export const spellsPart15= [
  {
    "name": "Evard's Black Tentacles",
    "source": "XPHB",
    "page": 270,
    "srd52": "Black Tentacles",
    "basicRules2024": true,
    "level": 4,
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
      "s": true,
      "m": "a tentacle"
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
      "Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in that area into {@variantrule Difficult Terrain|XPHB}.",
      "Each creature in that area makes a Strength saving throw. On a failed save, it takes {@damage 3d6} Bludgeoning damage, and it has the {@condition Restrained|XPHB} condition until the spell ends. A creature also makes that save if it enters the area or ends it turn there. A creature makes that save only once per turn.",
      "A {@condition Restrained|XPHB} creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC, ending the condition on itself on a success."
    ],
    "damageInflict": [
      "bludgeoning"
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
      "DFT",
      "SGT"
    ],
    "areaTags": [
      "Q"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Expeditious Retreat",
    "source": "XPHB",
    "page": 270,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "bonus"
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
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "You take the {@action Dash|XPHB} action, and until the spell ends, you can take that action again as a {@variantrule Bonus Action|XPHB}."
    ],
    "miscTags": [
      "UBA"
    ]
  },
  {
    "name": "Eyebite",
    "source": "XPHB",
    "page": 270,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "N",
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
      "For the duration, your eyes become an inky void. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration.",
      "On each of your turns until the spell ends, you can take a {@action Magic|XPHB} action to target another creature but can't target a creature again if it has succeeded on a save against this casting of the spell.",
      {
        "type": "entries",
        "name": "Asleep",
        "entries": [
          "The target has the {@condition Unconscious|XPHB} condition. It wakes up if it takes any damage or if another creature takes an action to shake it awake."
        ]
      },
      {
        "type": "entries",
        "name": "Panicked",
        "entries": [
          "The target has the {@condition Frightened|XPHB} condition. On each of its turns, the {@condition Frightened|XPHB} target must take the {@action Dash|XPHB} action and move away from you by the safest and shortest route available. If the target moves to a space at least 60 feet away from you where it can't see you, this effect ends."
        ]
      },
      {
        "type": "entries",
        "name": "Sickened",
        "entries": [
          "The target has the {@condition Poisoned|XPHB} condition."
        ]
      }
    ],
    "conditionInflict": [
      "frightened",
      "unconscious"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Fabricate",
    "source": "XPHB",
    "page": 271,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
    "school": "T",
    "time": [
      {
        "number": 10,
        "unit": "minute"
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
      "You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, or clothes from flax or wool.",
      "Choose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} or eight connected 5-foot Cubes) given a sufficient quantity of material. If you're working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}). The quality of any fabricated objects is based on the quality of the raw materials.",
      "Creatures and magic items can't be created by this spell. You also can't use it to create items that require a high degree of skill—such as weapons and armor—unless you have proficiency with the type of {@item Artisan's Tools|XPHB} used to craft such objects."
    ],
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT"
    ]
  },
  {
    "name": "Faerie Fire",
    "source": "XPHB",
    "page": 271,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "Objects in a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range are outlined in blue, green, or violet light (your choice). Each creature in the {@variantrule Cube [Area of Effect]|XPHB|Cube} is also outlined if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed {@variantrule Dim Light|XPHB} in a 10-foot radius and can't benefit from the {@condition Invisible|XPHB} condition.",
      "{@action Attack|XPHB} rolls against an affected creature or object have {@variantrule Advantage|XPHB} if the attacker can see it."
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "ADV",
      "LGT"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "False Life",
    "source": "XPHB",
    "page": 271,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "N",
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
      "m": "a drop of alcohol"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You gain {@dice 2d4 + 4} {@variantrule Temporary Hit Points|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You gain 5 additional {@variantrule Temporary Hit Points|XPHB} for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "THP"
    ]
  },
  {
    "name": "Fear",
    "source": "XPHB",
    "page": 271,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "I",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "cone",
      "distance": {
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a white feather"
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
      "Each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} must succeed on a Wisdom saving throw or drop whatever it is holding and have the {@condition Frightened|XPHB} condition for the duration.",
      "A {@condition Frightened|XPHB} creature takes the {@action Dash|XPHB} action and moves away from you by the safest route on each of its turns unless there is nowhere to move. If the creature ends its turn in a space where it doesn't have line of sight to you, the creature makes a Wisdom saving throw. On a successful save, the spell ends on that creature."
    ],
    "conditionInflict": [
      "frightened"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "N"
    ]
  },
  {
    "name": "Feather Fall",
    "source": "XPHB",
    "page": 271,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "reaction",
        "condition": "which you take when you or a creature you can see within 60 feet of you falls"
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
      "m": "a small feather or piece of down"
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
      "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If a creature lands before the spell ends, the creature takes no damage from the fall, and the spell ends for that creature."
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Feign Death",
    "source": "XPHB",
    "page": 271,
    "level": 3,
    "school": "N",
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
      "m": "a pinch of graveyard dirt"
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
      "You touch a willing creature and put it into a cataleptic state that is indistinguishable from death.",
      "For the duration, the target appears dead to outward inspection and to spells used to determine the target's status. The target has the {@condition Blinded|XPHB} and {@condition Incapacitated|XPHB} conditions, and its {@variantrule Speed|XPHB} is 0.",
      "The target also has {@variantrule Resistance|XPHB} to all damage except Psychic damage, and it has {@variantrule Immunity|XPHB} to the {@condition Poisoned|XPHB} condition."
    ],
    "damageResist": [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "piercing",
      "poison",
      "radiant",
      "slashing",
      "thunder"
    ],
    "conditionImmune": [
      "poisoned"
    ],
    "conditionInflict": [
      "blinded",
      "incapacitated"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
