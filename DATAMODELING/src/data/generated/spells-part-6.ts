export const spellsPart6= [
  {
    "name": "Charm Monster",
    "source": "XPHB",
    "page": 249,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
          "amount": 1
        }
      }
    ],
    "entries": [
      "One creature you can see within range makes a Wisdom saving throw. It does so with {@variantrule Advantage|XPHB} if you or your allies are fighting it. On a failed save, the target has the {@condition Charmed|XPHB} condition until the spell ends or until you or your allies damage it. The {@condition Charmed|XPHB} creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you. When the spell ends, the target knows it was {@condition Charmed|XPHB} by you."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 4."
        ]
      }
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Charm Person",
    "source": "XPHB",
    "page": 249,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
          "amount": 1
        }
      }
    ],
    "entries": [
      "One Humanoid you can see within range makes a Wisdom saving throw. It does so with {@variantrule Advantage|XPHB} if you or your allies are fighting it. On a failed save, the target has the {@condition Charmed|XPHB} condition until the spell ends or until you or your allies damage it. The {@condition Charmed|XPHB} creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you. When the spell ends, the target knows it was {@condition Charmed|XPHB} by you."
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
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Chill Touch",
    "source": "XPHB",
    "page": 249,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Channeling the chill of the grave, make a melee spell attack against a target within reach. On a hit, the target takes {@damage 1d10} Necrotic damage, and it can't regain {@variantrule Hit Points|XPHB} until the end of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d10} when you reach levels 5 ({@damage 2d10}), 11 ({@damage 3d10}), and 17 ({@damage 4d10})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Necrotic damage",
      "scaling": {
        "1": "1d10",
        "5": "2d10",
        "11": "3d10",
        "17": "4d10"
      }
    },
    "damageInflict": [
      "necrotic"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Chromatic Orb",
    "source": "XPHB",
    "page": 249,
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
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a diamond worth 50+ GP",
        "cost": 5000
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You hurl an orb of energy at a target within range. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder for the type of orb you create, and then make a ranged spell attack against the target. On a hit, the target takes {@damage 3d8} damage of the chosen type.",
      "If you roll the same number on two or more of the d8s, the orb leaps to a different target of your choice within 30 feet of the target. Make an attack roll against the new target, and make a new damage roll. The orb can't leap again unless you cast the spell with a level 2+ spell slot."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d8|1-9|1d8} for each spell slot level above 1. The orb can leap a maximum number of times equal to the level of the slot expended, and a creature can be targeted only once by each casting of this spell."
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "poison",
      "thunder"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Circle of Death",
    "source": "XPHB",
    "page": 250,
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
        "type": "feet",
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "the powder of a crushed black pearl worth 500+ GP",
        "cost": 50000
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Negative energy ripples out in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} from a point you choose within range. Each creature in that area makes a Constitution saving throw, taking {@damage 8d8} Necrotic damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d8|6-9|2d8} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Circle of Power",
    "source": "XPHB",
    "page": 250,
    "level": 5,
    "school": "A",
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
        "amount": 30
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
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects. When an affected creature makes a saving throw against a spell or magical effect that allows a save to take only half damage, it takes no damage if it succeeds on the save."
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Clairvoyance",
    "source": "XPHB",
    "page": 250,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "D",
    "time": [
      {
        "number": 10,
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
      "s": true,
      "m": {
        "text": "a focus worth 100+ GP, either a jeweled horn for hearing or a glass eye for seeing",
        "cost": 10000
      }
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
      "You create an {@condition Invisible|XPHB} sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The intangible, invulnerable sensor remains in place for the duration.",
      "When you cast the spell, choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As a {@variantrule Bonus Action|XPHB}, you can switch between seeing and hearing.",
      "A creature that sees the sensor (such as a creature benefiting from {@spell See Invisibility|XPHB} or {@sense Truesight|XPHB}) sees a luminous orb about the size of your fist."
    ],
    "miscTags": [
      "UBA"
    ]
  },
  {
    "name": "Clone",
    "source": "XPHB",
    "page": 251,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
        "text": "a diamond worth 1,000+ GP, which the spell consumes, and a sealable vessel worth 2,000+ GP that is large enough to hold the creature being cloned",
        "cost": 100000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You touch a creature or at least 1 cubic inch of its flesh. An inert duplicate of that creature forms inside the vessel used in the spell's casting and finishes growing after 120 days; you choose whether the finished clone is the same age as the creature or younger. The clone remains inert and endures indefinitely while its vessel remains undisturbed.",
      "If the original creature dies after the clone finishes forming, the creature's soul transfers to the clone if the soul is free and willing to return. The clone is physically identical to the original and has the same personality, memories, and abilities, but none of the original's equipment. The creature's original remains, if any, become inert and can't be revived, since the creature's soul is elsewhere."
    ],
    "miscTags": [
      "PRM"
    ]
  },
  {
    "name": "Cloud of Daggers",
    "source": "XPHB",
    "page": 251,
    "level": 2,
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
      "m": "a sliver of glass"
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
      "You conjure spinning daggers in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} centered on a point within range. Each creature in that area takes {@damage 4d4} Slashing damage. A creature also takes this damage if it enters the {@variantrule Cube [Area of Effect]|XPHB|Cube} or ends its turn there or if the {@variantrule Cube [Area of Effect]|XPHB|Cube} moves into its space. A creature takes this damage only once per turn.",
      "On your later turns, you can take a {@action Magic|XPHB} action to teleport the {@variantrule Cube [Area of Effect]|XPHB|Cube} up to 30 feet."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 4d4|2-9|2d4} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "slashing"
    ],
    "areaTags": [
      "C"
    ]
  }
];
