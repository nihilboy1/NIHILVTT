export const spellsPart4= [
  {
    "name": "Barkskin",
    "source": "XPHB",
    "page": 245,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a handful of oak bark"
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
      "You touch a willing creature. Until the spell ends, the target's skin assumes a bark-like appearance, and the target has an {@variantrule Armor Class|XPHB} of 17 if its AC is lower than that."
    ],
    "miscTags": [
      "MAC"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Beacon of Hope",
    "source": "XPHB",
    "page": 245,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "A",
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
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "Choose any number of creatures within range. For the duration, each target has {@variantrule Advantage|XPHB} on Wisdom saving throws and Death Saving Throws and regains the maximum number of {@variantrule Hit Points|XPHB} possible from any healing."
    ],
    "miscTags": [
      "ADV",
      "HL"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Beast Sense",
    "source": "XPHB",
    "page": 245,
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
        "type": "touch"
      }
    },
    "components": {
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You touch a willing Beast. For the duration, you can perceive through the Beast's senses as well as your own. When perceiving through the Beast's senses, you benefit from any special senses it has."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Befuddlement",
    "source": "XPHB",
    "page": 245,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a key ring with no keys"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You blast the mind of a creature that you can see within range. The target makes an Intelligence saving throw.",
      "On a failed save, the target takes {@damage 10d12} Psychic damage and can't cast spells or take the {@action Magic|XPHB} action. At the end of every 30 days, the target repeats the save, ending the effect on a success. The effect can also be ended by the {@spell Greater Restoration|XPHB}, {@spell Heal|XPHB}, or {@spell Wish|XPHB} spell.",
      "On a successful save, the target takes half as much damage only."
    ],
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Bestow Curse",
    "source": "XPHB",
    "page": 246,
    "srd52": true,
    "basicRules2024": true,
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
      "You touch a creature, which must succeed on a Wisdom saving throw or become cursed for the duration. Until the curse ends, the target suffers one of the following effects of your choice:",
      {
        "type": "list",
        "items": [
          "Choose one ability. The target has {@variantrule Disadvantage|XPHB} on ability checks and saving throws made with that ability.",
          "The target has {@variantrule Disadvantage|XPHB} on attack rolls against you.",
          "In combat, the target must succeed on a Wisdom saving throw at the start of each of its turns or be forced to take the {@action Dodge|XPHB} action on that turn.",
          "If you deal damage to the target with an attack roll or a spell, the target takes an extra {@damage 1d8} Necrotic damage."
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "If you cast this spell using a level 4 spell slot, you can maintain {@status Concentration|XPHB} on it for up to 10 minutes. If you use a level 5+ spell slot, the spell doesn't require {@status Concentration|XPHB}, and the duration becomes 8 hours (level 5-6 slot) or 24 hours (level 7-8 slot). If you use a level 9 spell slot, the spell lasts until dispelled."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "PRM"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Bigby's Hand",
    "source": "XPHB",
    "page": 246,
    "srd52": "Arcane Hand",
    "basicRules2024": true,
    "level": 5,
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
      "s": true,
      "m": "an eggshell and a glove"
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
      "You create a Large hand of shimmering magical energy in an unoccupied space that you can see within range. The hand lasts for the duration, and it moves at your command, mimicking the movements of your own hand.",
      "The hand is an object that has AC 20 and {@variantrule Hit Points|XPHB} equal to your {@variantrule Hit Points|XPHB|Hit Point} maximum. If it drops to 0 {@variantrule Hit Points|XPHB}, the spell ends. The hand doesn't occupy its space.",
      "When you cast the spell and as a {@variantrule Bonus Action|XPHB} on your later turns, you can move the hand up to 60 feet and then cause one of the following effects:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Clenched Fist",
            "entries": [
              "The hand strikes a target within 5 feet of it. Make a melee spell attack. On a hit, the target takes {@damage 5d8} Force damage."
            ]
          },
          {
            "type": "item",
            "name": "Forceful Hand",
            "entries": [
              "The hand attempts to push a Huge or smaller creature within 5 feet of it. The target must succeed on a Strength saving throw, or the hand pushes the target up to 5 feet plus a number of feet equal to five times your spellcasting ability modifier. The hand moves with the target, remaining within 5 feet of it."
            ]
          },
          {
            "type": "item",
            "name": "Grasping Hand",
            "entries": [
              "The hand attempts to grapple a Huge or smaller creature within 5 feet of it. The target must succeed on a Dexterity saving throw, or the target has the {@condition Grappled|XPHB} condition, with an escape DC equal to your spell save DC. While the hand grapples the target, you can take a {@variantrule Bonus Action|XPHB} to cause the hand to crush it, dealing Bludgeoning damage to the target equal to {@damage 4d6} plus your spellcasting ability modifier."
            ]
          },
          {
            "type": "item",
            "name": "Interposing Hand",
            "entries": [
              "The hand grants you Half {@variantrule Cover|XPHB} against attacks and other effects that originate from its space or that pass through it. In addition, its space counts as {@variantrule Difficult Terrain|XPHB} for your enemies."
            ]
          }
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage of the Clenched Fist increases by {@scaledamage 4d8|5-9|2d8} and the damage of the Grasping Hand increases by {@scaledamage 2d6|5-9|2d6} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "bludgeoning",
      "force"
    ],
    "conditionInflict": [
      "grappled"
    ],
    "spellAttack": [
      "M"
    ],
    "savingThrow": [
      "dexterity",
      "strength"
    ],
    "miscTags": [
      "DFT",
      "FMV",
      "OBJ",
      "SGT",
      "UBA"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Blade Barrier",
    "source": "XPHB",
    "page": 247,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
      "You create a wall of whirling blades made of magical energy. The wall appears within range and lasts for the duration. You make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides Three-Quarters {@variantrule Cover|XPHB}, and its space is {@variantrule Difficult Terrain|XPHB}.",
      "Any creature in the wall's space makes a Dexterity saving throw, taking {@damage 6d10} Force damage on a failed save or half as much damage on a successful one. A creature also makes that save if it enters the wall's space or ends it turn there. A creature makes that save only once per turn."
    ],
    "damageInflict": [
      "force"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Blade Ward",
    "source": "XPHB",
    "page": 247,
    "level": 0,
    "school": "A",
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
      "Whenever a creature makes an attack roll against you before the spell ends, the attacker subtracts {@dice 1d4} from the attack roll."
    ]
  },
  {
    "name": "Bless",
    "source": "XPHB",
    "page": 247,
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
      "s": true,
      "m": {
        "text": "a Holy Symbol worth 5+ GP",
        "cost": 500
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
      "You bless up to three creatures within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target adds {@dice 1d4} to the attack roll or save."
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
      "MT"
    ]
  }
];
