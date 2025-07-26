export const spellsPart31= [
  {
    "name": "Prestidigitation",
    "source": "XPHB",
    "page": 307,
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
        "amount": 10
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
      "You create a magical effect within range. Choose the effect from the options below. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time.",
      {
        "type": "entries",
        "name": "Sensory Effect",
        "entries": [
          "You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor."
        ]
      },
      {
        "type": "entries",
        "name": "Fire Play",
        "entries": [
          "You instantaneously light or snuff out a candle, a torch, or a small campfire."
        ]
      },
      {
        "type": "entries",
        "name": "Clean or Soil",
        "entries": [
          "You instantaneously clean or soil an object no larger than 1 cubic foot."
        ]
      },
      {
        "type": "entries",
        "name": "Minor Sensation",
        "entries": [
          "You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour."
        ]
      },
      {
        "type": "entries",
        "name": "Magic Mark",
        "entries": [
          "You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour."
        ]
      },
      {
        "type": "entries",
        "name": "Minor Creation",
        "entries": [
          "You create a nonmagical trinket or an illusory image that can fit in your hand. It lasts until the end of your next turn. A trinket can deal no damage and has no monetary worth."
        ]
      }
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Prismatic Spray",
    "source": "XPHB",
    "page": 307,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
    "school": "V",
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
      "Eight rays of light flash from you in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Each creature in the {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw. For each target, roll {@dice 1d8} to determine which color ray affects it, consulting the Prismatic Rays table.",
      {
        "type": "table",
        "caption": "Prismatic Rays",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "1d8",
          "Ray"
        ],
        "rows": [
          [
            "1",
            "{@b Red.} {@i Failed Save:} {@damage 12d6} Fire damage. {@i Successful Save:} Half as much damage."
          ],
          [
            "2",
            "{@b Orange.} {@i Failed Save:} {@damage 12d6} Acid damage. {@i Successful Save:} Half as much damage."
          ],
          [
            "3",
            "{@b Yellow.} {@i Failed Save:} {@damage 12d6} Lightning damage. {@i Successful Save:} Half as much damage."
          ],
          [
            "4",
            "{@b Green.} {@i Failed Save:} {@damage 12d6} Poison damage. {@i Successful Save:} Half as much damage."
          ],
          [
            "5",
            "{@b Blue.} {@i Failed Save:} {@damage 12d6} Cold damage. {@i Successful Save:} Half as much damage."
          ],
          [
            "6",
            "{@b Indigo.} {@i Failed Save:} The target has the {@condition Restrained|XPHB} condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the {@condition Petrified|XPHB} condition until it is freed by an effect like the {@spell Greater Restoration|XPHB} spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind."
          ],
          [
            "7",
            "{@b Violet.} {@i Failed Save:} The target has the {@condition Blinded|XPHB} condition and makes a Wisdom saving throw at the start of your next turn. On a successful save, the condition ends. On a failed save, the condition ends, and the creature teleports to another plane of existence (DM's choice)."
          ],
          [
            "8",
            "{@b Special.} The target is struck by two rays. Roll twice, rerolling any 8."
          ]
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "poison"
    ],
    "conditionInflict": [
      "blinded",
      "petrified",
      "restrained"
    ],
    "savingThrow": [
      "dexterity",
      "constitution",
      "wisdom"
    ],
    "miscTags": [
      "PRM"
    ],
    "areaTags": [
      "N"
    ]
  },
  {
    "name": "Prismatic Wall",
    "source": "XPHB",
    "page": 308,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "A shimmering, multicolored plane of light forms a vertical opaque wall—up to 90 feet long, 30 feet high, and 1 inch thick—centered on a point within range. Alternatively, you shape the wall into a globe up to 30 feet in diameter centered on a point within range. The wall lasts for the duration. If you position the wall in a space occupied by a creature, the spell ends instantly without effect.",
      "The wall sheds {@variantrule Bright Light|XPHB} within 100 feet and {@variantrule Dim Light|XPHB} for an additional 100 feet. You and creatures you designate when you cast the spell can pass through and be near the wall without harm. If another creature that can see the wall moves within 20 feet of it or starts its turn there, the creature must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition for 1 minute.",
      "The wall consists of seven layers, each with a different color. When a creature reaches into or passes through the wall, it does so one layer at a time through all the layers. Each layer forces the creature to make a Dexterity saving throw or be affected by that layer's properties as described in the Prismatic Layers table.",
      "The wall, which has AC 10, can be destroyed one layer at a time, in order from red to violet, by means specific to each layer. If a layer is destroyed, it is gone for the duration. {@spell Antimagic Field|XPHB} has no effect on the wall, and {@spell Dispel Magic|XPHB} can affect only the violet layer.",
      {
        "type": "table",
        "caption": "Prismatic Layers",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "Order",
          "Effects"
        ],
        "rows": [
          [
            "1",
            "{@b Red.} {@i Failed Save:} {@damage 12d6} Fire damage. {@i Successful Save:} Half as much damage. {@i Additional Effects}: Nonmagical ranged attacks can't pass through this layer, which is destroyed if it takes at least 25 Cold damage."
          ],
          [
            "2",
            "{@b Orange.} {@i Failed Save:} {@damage 12d6} Acid damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} Magical ranged attacks can't pass through this layer, which is destroyed by a strong wind (such as the one created by {@spell Gust of Wind|XPHB})."
          ],
          [
            "3",
            "{@b Yellow.} {@i Failed Save:} {@damage 12d6} Lightning damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} The layer is destroyed if it takes at least 60 Force damage."
          ],
          [
            "4",
            "{@b Green.} {@i Failed Save:} {@damage 12d6} Poison damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} A {@spell Passwall|XPHB} spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer."
          ],
          [
            "5",
            "{@b Blue.} {@i Failed Save:} {@damage 12d6} Cold damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} The layer is destroyed if it takes at least 25 Fire damage."
          ],
          [
            "6",
            "{@b Indigo.} {@i Failed Save:} The target has the {@condition Restrained|XPHB} condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the {@condition Petrified|XPHB} condition until it is freed by an effect like the {@spell Greater Restoration|XPHB} spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind. {@i Additional Effects:} Spells can't be cast through this layer, which is destroyed by {@variantrule Bright Light|XPHB} shed by the {@spell Daylight|XPHB} spell."
          ],
          [
            "7",
            "{@b Violet.} {@i Failed Save:} The target has the {@condition Blinded|XPHB} condition and makes a Wisdom saving throw at the start of your next turn. On a successful save, the condition ends. On a failed save, the condition ends, and the creature teleports to another plane of existence (DM's choice). {@i Additional Effects:} This layer is destroyed by {@spell Dispel Magic|XPHB}."
          ]
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "force",
      "lightning",
      "poison"
    ],
    "conditionInflict": [
      "blinded",
      "petrified",
      "restrained"
    ],
    "savingThrow": [
      "constitution",
      "dexterity",
      "wisdom"
    ],
    "miscTags": [
      "LGT",
      "PRM"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Produce Flame",
    "source": "XPHB",
    "page": 308,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
    "school": "C",
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
        }
      }
    ],
    "entries": [
      "A flickering flame appears in your hand and remains there for the duration. While there, the flame emits no heat and ignites nothing, and it sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. The spell ends if you cast it again.",
      "Until the spell ends, you can take a {@action Magic|XPHB} action to hurl fire at a creature or an object within 60 feet of you. Make a ranged spell attack. On a hit, the target takes {@damage 1d8} Fire damage."
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
      "label": "Fire damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "fire"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "LGT",
      "OBJ",
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Programmed Illusion",
    "source": "XPHB",
    "page": 309,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "jade dust worth 25+ GP",
        "cost": 2500
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
      "You create an illusion of an object, a creature, or some other visible phenomenon within range that activates when a specific trigger occurs. The illusion is imperceptible until then. It must be no larger than a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}, and you decide when you cast the spell how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutes.",
      "When the trigger you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutes, after which the illusion can be activated again.",
      "The trigger can be as general or as detailed as you like, though it must be based on visual or audible phenomena that occur within 30 feet of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door.",
      "Physical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Project Image",
    "source": "XPHB",
    "page": 309,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
        "type": "miles",
        "amount": 500
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a statuette of yourself worth 5+ GP",
        "cost": 500
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "day",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You create an illusory copy of yourself that lasts for the duration. The copy can appear at any location within range that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you, but it is intangible. If the illusion takes any damage, it disappears, and the spell ends.",
      "You can see through the illusion's eyes and hear through its ears as if you were in its space. As a {@action Magic|XPHB} action, you can move it up to 60 feet and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly.",
      "Physical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Protection from Energy",
    "source": "XPHB",
    "page": 309,
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
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "For the duration, the willing creature you touch has {@variantrule Resistance|XPHB} to one damage type of your choice: Acid, Cold, Fire, Lightning, or Thunder."
    ],
    "damageResist": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "thunder"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Protection from Evil and Good",
    "source": "XPHB",
    "page": 309,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "s": true,
      "m": {
        "text": "a flask of Holy Water worth 25+ GP, which the spell consumes",
        "cost": 2500,
        "consume": true
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
      "Until the spell ends, one willing creature you touch is protected against creatures that are Aberrations, Celestials, Elementals, Fey, Fiends, or Undead. The protection grants several benefits. Creatures of those types have {@variantrule Disadvantage|XPHB} on attack rolls against the target. The target also can't be possessed by or gain the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} conditions from them. If the target is already possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by such a creature, the target has {@variantrule Advantage|XPHB} on any new saving throw against the relevant effect."
    ],
    "affectsCreatureType": [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead"
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Protection from Poison",
    "source": "XPHB",
    "page": 310,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "entries": [
      "You touch a creature and end the {@condition Poisoned|XPHB} condition on it. For the duration, the target has {@variantrule Advantage|XPHB} on saving throws to avoid or end the {@condition Poisoned|XPHB} condition, and it has {@variantrule Resistance|XPHB} to Poison damage."
    ],
    "damageResist": [
      "poison"
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
