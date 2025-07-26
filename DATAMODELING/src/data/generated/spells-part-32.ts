export const spellsPart32= [
  {
    "name": "Purify Food and Drink",
    "source": "XPHB",
    "page": 310,
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
        "type": "instant"
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "You remove poison and rot from nonmagical food and drink in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range."
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Raise Dead",
    "source": "XPHB",
    "page": 310,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "text": "a diamond worth 500+ GP, which the spell consumes",
        "cost": 50000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "With a touch, you revive a dead creature if it has been dead no longer than 10 days and it wasn't Undead when it died.",
      "The creature returns to life with 1 {@variantrule Hit Points|XPHB|Hit Point}. This spell also neutralizes any poisons that affected the creature at the time of death.",
      "This spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survival—its head, for instance—the spell automatically fails.",
      "Coming back from the dead is an ordeal. The target takes a -4 penalty to {@variantrule D20 Test|XPHB|D20 Tests}. Every time the target finishes a {@variantrule Long Rest|XPHB}, the penalty is reduced by 1 until it becomes 0."
    ],
    "affectsCreatureType": [
      "aberration",
      "beast",
      "celestial",
      "construct",
      "dragon",
      "elemental",
      "fey",
      "fiend",
      "giant",
      "humanoid",
      "monstrosity",
      "ooze",
      "plant"
    ],
    "miscTags": [
      "HL"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Rary's Telepathic Bond",
    "source": "XPHB",
    "page": 311,
    "srd52": "Telepathic Bond",
    "basicRules2024": true,
    "level": 5,
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
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "two eggs"
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
      "You forge a telepathic link among up to eight willing creatures of your choice within range, psychically linking each creature to all the others for the duration. Creatures that can't communicate in any languages aren't affected by this spell.",
      "Until the spell ends, the targets can communicate telepathically through the bond whether or not they share a language. The communication is possible over any distance, though it can't extend to other planes of existence."
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Ray of Enfeeblement",
    "source": "XPHB",
    "page": 311,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
        },
        "concentration": true
      }
    ],
    "entries": [
      "A beam of enervating energy shoots from you toward a creature within range. The target must make a Constitution saving throw. On a successful save, the target has {@variantrule Disadvantage|XPHB} on the next attack roll it makes until the start of your next turn.",
      "On a failed save, the target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} for the duration. During that time, it also subtracts {@dice 1d8} from all its damage rolls. The target repeats the save at the end of each of its turns, ending the spell on a success."
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Ray of Frost",
    "source": "XPHB",
    "page": 311,
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
      "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes {@damage 1d8} Cold damage, and its {@variantrule Speed|XPHB} is reduced by 10 feet until the start of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Cold damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "cold"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Ray of Sickness",
    "source": "XPHB",
    "page": 311,
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
      "You shoot a greenish ray at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 2d8} Poison damage and has the {@condition Poisoned|XPHB} condition until the end of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d8|1-9|1d8} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "poison"
    ],
    "conditionInflict": [
      "poisoned"
    ],
    "spellAttack": [
      "R"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Regenerate",
    "source": "XPHB",
    "page": 311,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "minute"
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
      "m": "a prayer wheel"
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
      "A creature you touch regains {@dice 4d8 + 15} {@variantrule Hit Points|XPHB}. For the duration, the target regains 1 {@variantrule Hit Points|XPHB|Hit Point} at the start of each of its turns, and any severed body parts regrow after 2 minutes."
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Reincarnate",
    "source": "XPHB",
    "page": 311,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "text": "rare oils worth 1,000+ GP, which the spell consumes",
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
      "You touch a dead Humanoid or a piece of one. If the creature has been dead no longer than 10 days, the spell forms a new body for it and calls the soul to enter that body. Roll {@dice 1d10} and consult the table below to determine the body's species, or the DM chooses another playable species.",
      {
        "type": "table",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "1d10",
          "Species"
        ],
        "rows": [
          [
            "1",
            "{@race Aasimar|XPHB}"
          ],
          [
            "2",
            "{@race Dragonborn|XPHB}"
          ],
          [
            "3",
            "{@race Dwarf|XPHB}"
          ],
          [
            "4",
            "{@race Elf|XPHB}"
          ],
          [
            "5",
            "{@race Gnome|XPHB}"
          ],
          [
            "6",
            "{@race Goliath|XPHB}"
          ],
          [
            "7",
            "{@race Halfling|XPHB}"
          ],
          [
            "8",
            "{@race Human|XPHB}"
          ],
          [
            "9",
            "{@race Orc|XPHB}"
          ],
          [
            "10",
            "{@race Tiefling|XPHB}"
          ]
        ]
      },
      "The reincarnated creature makes any choices that a species' description offers, and the creature recalls its former life. It retains the capabilities it had in its original form, except it loses the traits of its previous species and gains the traits of its new one."
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "miscTags": [
      "HL",
      "RO"
    ]
  },
  {
    "name": "Remove Curse",
    "source": "XPHB",
    "page": 312,
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
      "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's {@variantrule Attunement|XPHB} to the object so it can be removed or discarded."
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
