export const spellsPart33= [
  {
    "name": "Resistance",
    "source": "XPHB",
    "page": 312,
    "srd52": true,
    "basicRules2024": true,
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
      "You touch a willing creature and choose a damage type: Acid, Bludgeoning, Cold, Fire, Lightning, Necrotic, Piercing, Poison, Radiant, Slashing, or Thunder. When the creature takes damage of the chosen type before the spell ends, the creature reduces the total damage taken by {@dice 1d4}. A creature can benefit from this spell only once per turn."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Resurrection",
    "source": "XPHB",
    "page": 312,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
        "text": "a diamond worth 1,000+ GP, which the spell consumes",
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
      "With a touch, you revive a dead creature that has been dead for no more than a century, didn't die of old age, and wasn't Undead when it died.",
      "The creature returns to life with all its {@variantrule Hit Points|XPHB}. This spell also neutralizes any poisons that affected the creature at the time of death. This spell closes all mortal wounds and restores any missing body parts.",
      "Coming back from the dead is an ordeal. The target takes a -4 penalty to {@variantrule D20 Test|XPHB|D20 Tests}. Every time the target finishes a {@variantrule Long Rest|XPHB}, the penalty is reduced by 1 until it becomes 0.",
      "Casting this spell to revive a creature that has been dead for 365 days or longer taxes you. Until you finish a {@variantrule Long Rest|XPHB}, you can't cast spells again, and you have {@variantrule Disadvantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}."
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
    ]
  },
  {
    "name": "Reverse Gravity",
    "source": "XPHB",
    "page": 312,
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
        "type": "feet",
        "amount": 100
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a lodestone and iron filings"
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
      "This spell reverses gravity in a 50-foot-radius, 100-foot high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. All creatures and objects in that area that aren't anchored to the ground fall upward and reach the top of the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}. A creature can make a Dexterity saving throw to grab a fixed object it can reach, thus avoiding the fall upward.",
      "If a ceiling or an anchored object is encountered in this upward fall, creatures and objects strike it just as they would during a downward fall. If an affected creature or object reaches the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}'s top without striking anything, it hovers there for the duration. When the spell ends, affected objects and creatures fall downward."
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Revivify",
    "source": "XPHB",
    "page": 312,
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
      "s": true,
      "m": {
        "text": "a diamond worth 300+ GP, which the spell consumes",
        "cost": 30000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You touch a creature that has died within the last minute. That creature revives with 1 {@variantrule Hit Points|XPHB|Hit Point}. This spell can't revive a creature that has died of old age, nor does it restore any missing body parts."
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Rope Trick",
    "source": "XPHB",
    "page": 312,
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
      "m": "a segment of rope"
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
      "You touch a rope. One end of it hovers upward until the rope hangs perpendicular to the ground or the rope reaches a ceiling. At the rope's upper end, an {@condition Invisible|XPHB} 3-foot-by-5-foot portal opens to an extradimensional space that lasts until the spell ends. That space can be reached by climbing the rope, which can be pulled into or dropped out of it.",
      "The space can hold up to eight Medium or smaller creatures. Attacks, spells, and other effects can't pass into or out of the space, but creatures inside it can see through the portal. Anything inside the space drops out when the spell ends."
    ]
  },
  {
    "name": "Sacred Flame",
    "source": "XPHB",
    "page": 313,
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
      "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take {@damage 1d8} Radiant damage. The target gains no benefit from Half {@variantrule Cover|XPHB} or Three-Quarters {@variantrule Cover|XPHB} for this save."
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
      "label": "Radiant damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "radiant"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Sanctuary",
    "source": "XPHB",
    "page": 313,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a shard of glass from a mirror"
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
      "You ward a creature within range. Until the spell ends, any creature who targets the warded creature with an attack roll or a damaging spell must succeed on a Wisdom saving throw or either choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from areas of effect.",
      "The spell ends if the warded creature makes an attack roll, casts a spell, or deals damage."
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Scorching Ray",
    "source": "XPHB",
    "page": 313,
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
      "You hurl three fiery rays. You can hurl them at one target within range or at several. Make a ranged spell attack for each ray. On a hit, the target takes {@damage 2d6} Fire damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You create one additional ray for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "spellAttack": [
      "R"
    ],
    "areaTags": [
      "MT",
      "ST"
    ]
  },
  {
    "name": "Scrying",
    "source": "XPHB",
    "page": 313,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a focus worth 1,000+ GP, such as a crystal ball, mirror, or water-filled font",
        "cost": 100000
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
      "You can see and hear a creature you choose that is on the same plane of existence as you. The target makes a Wisdom saving throw, which is modified (see the tables below) by how well you know the target and the sort of physical connection you have to it. The target doesn't know what it is making the save against, only that it feels uneasy.",
      {
        "type": "table",
        "colStyles": [
          "col-10",
          "col-2 text-center"
        ],
        "colLabels": [
          "Your Knowledge of the Target Is...",
          "Save Modifier"
        ],
        "rows": [
          [
            "Secondhand (heard of the target)",
            "+5"
          ],
          [
            "Firsthand (met the target)",
            "+0"
          ],
          [
            "Extensive (know the target well)",
            "-5"
          ]
        ]
      },
      {
        "type": "table",
        "colStyles": [
          "col-10",
          "col-2 text-center"
        ],
        "colLabels": [
          "You Have the Target's...",
          "Save Modifier"
        ],
        "rows": [
          [
            "Picture or other likeness",
            "-2"
          ],
          [
            "Garment or other possession",
            "-4"
          ],
          [
            "Body part, lock of hair, or bit of nail",
            "-10"
          ]
        ]
      },
      "On a successful save, the target isn't affected, and you can't use this spell on it again for 24 hours.",
      "On a failed save, the spell creates an {@condition Invisible|XPHB}, intangible sensor within 10 feet of the target. You can see and hear through the sensor as if you were there. The sensor moves with the target, remaining within 10 feet of it for the duration. If something can see the sensor, it appears as a luminous orb about the size of your fist.",
      "Instead of targeting a creature, you can target a location you have seen. When you do so, the sensor appears at that location and doesn't move."
    ],
    "savingThrow": [
      "wisdom"
    ],
    "hasFluffImages": true
  }
];
