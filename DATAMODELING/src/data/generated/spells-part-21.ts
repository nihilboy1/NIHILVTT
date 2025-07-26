export const spellsPart21= [
  {
    "name": "Healing Word",
    "source": "XPHB",
    "page": 284,
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
      "v": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A creature of your choice that you can see within range regains {@variantrule Hit Points|XPHB} equal to {@dice 2d4} plus your spellcasting ability modifier."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 2d4|1-9|2d4} for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "HL",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Heat Metal",
    "source": "XPHB",
    "page": 284,
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
      "m": "a piece of iron and a flame"
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
      "Choose a manufactured metal object, such as a metal weapon or a suit of Heavy or Medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes {@damage 2d8} Fire damage when you cast the spell. Until the spell ends, you can take a {@variantrule Bonus Action|XPHB} on each of your later turns to deal this damage again if the object is within range.",
      "If a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn't drop the object, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the start of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d8|2-9|1d8} for each spell slot level above 2."
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
      "OBJ",
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Hellish Rebuke",
    "source": "XPHB",
    "page": 284,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "reaction",
        "condition": "which you take in response to taking damage from a creature that you can see within 60 feet of yourself"
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
        "type": "instant"
      }
    ],
    "entries": [
      "The creature that damaged you is momentarily surrounded by green flames. It makes a Dexterity saving throw, taking {@damage 2d10} Fire damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d10|1-9|1d10} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Heroes' Feast",
    "source": "XPHB",
    "page": 284,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "C",
    "time": [
      {
        "number": 10,
        "unit": "minute"
      }
    ],
    "range": {
      "type": "cube",
      "distance": {
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a gem-encrusted bowl worth 1,000+ GP, which the spell consumes",
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
      "You conjure a feast that appears on a surface in an unoccupied 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} next to you. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don't set in until this hour is over. Up to twelve creatures can partake of the feast.",
      "A creature that partakes gains several benefits, which last for 24 hours. The creature has {@variantrule Resistance|XPHB} to Poison damage, and it has {@variantrule Immunity|XPHB} to the {@condition Frightened|XPHB} and {@condition Poisoned|XPHB} conditions. Its {@variantrule Hit Points|XPHB|Hit Point} maximum also increases by {@dice 2d10}, and it gains the same number of {@variantrule Hit Points|XPHB}."
    ],
    "damageImmune": [
      "poison"
    ],
    "conditionImmune": [
      "frightened",
      "poisoned"
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "C",
      "MT"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Heroism",
    "source": "XPHB",
    "page": 285,
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
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to the {@condition Frightened|XPHB} condition and gains {@variantrule Temporary Hit Points|XPHB} equal to your spellcasting ability modifier at the start of each of its turns."
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
    "conditionImmune": [
      "frightened"
    ],
    "miscTags": [
      "SCT",
      "THP"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Hex",
    "source": "XPHB",
    "page": 285,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "E",
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
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "the petrified eye of a newt"
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
      "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra {@damage 1d6} Necrotic damage to the target whenever you hit it with an attack roll. Also, choose one ability when you cast the spell. The target has {@variantrule Disadvantage|XPHB} on ability checks made with the chosen ability.",
      "If the target drops to 0 {@variantrule Hit Points|XPHB} before this spell ends, you can take a {@variantrule Bonus Action|XPHB} on a later turn to curse a new creature."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 2 (up to 4 hours), 3-4 (up to 8 hours), or 5+ (24 hours)."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "miscTags": [
      "AAD",
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Hold Monster",
    "source": "XPHB",
    "page": 285,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a straight piece of iron"
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
      "Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Paralyzed|XPHB} condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 5."
        ]
      }
    ],
    "conditionInflict": [
      "paralyzed"
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
    "name": "Hold Person",
    "source": "XPHB",
    "page": 286,
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
      "s": true,
      "m": "a straight piece of iron"
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
      "Choose a Humanoid that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Paralyzed|XPHB} condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional Humanoid for each spell slot level above 2."
        ]
      }
    ],
    "conditionInflict": [
      "paralyzed"
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
    "name": "Holy Aura",
    "source": "XPHB",
    "page": 286,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
      "v": true,
      "s": true,
      "m": {
        "text": "a reliquary worth 1,000+ GP",
        "cost": 100000
      }
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
      "For the duration, you emit an aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. While in the aura, creatures of your choice have {@variantrule Advantage|XPHB} on all saving throws, and other creatures have {@variantrule Disadvantage|XPHB} on attack rolls against them. In addition, when a Fiend or an Undead hits an affected creature with a melee attack roll, the attacker must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition until the end of its next turn."
    ],
    "conditionInflict": [
      "blinded"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "S"
    ]
  }
];
