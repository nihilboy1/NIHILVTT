export const spellsPart19= [
  {
    "name": "Globe of Invulnerability",
    "source": "XPHB",
    "page": 279,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a glass bead"
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
      "An immobile, shimmering barrier appears in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} around you and remains for the duration.",
      "Any spell of level 5 or lower cast from outside the barrier can't affect anything within it. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from areas of effect created by such spells."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The barrier blocks spells of 1 level higher for each spell slot level above 6."
        ]
      }
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Glyph of Warding",
    "source": "XPHB",
    "page": 279,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "A",
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
        "text": "powdered diamond worth 200+ GP, which the spell consumes",
        "cost": 20000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "permanent",
        "ends": [
          "dispel",
          "trigger"
        ]
      }
    ],
    "entries": [
      "You inscribe a glyph that later unleashes a magical effect. You inscribe it either on a surface (such as a table or a section of floor) or within an object that can be closed (such as a book or chest) to conceal the glyph. The glyph can cover an area no larger than 10 feet in diameter. If the surface or object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.",
      "The glyph is nearly imperceptible and requires a successful Wisdom ({@skill Perception|XPHB}) check against your spell save DC to notice.",
      "When you inscribe the glyph, you set its trigger and choose whether it's an explosive rune or a spell glyph, as explained below.",
      {
        "type": "entries",
        "name": "Set the Trigger",
        "entries": [
          "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph. Once a glyph is triggered, this spell ends.",
          "You can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password."
        ]
      },
      {
        "type": "entries",
        "name": "Explosive Rune",
        "entries": [
          "When triggered, the glyph erupts with magical energy in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on the glyph. Each creature in the area makes a Dexterity saving throw. A creature takes {@damage 5d8} Acid, Cold, Fire, Lightning, or Thunder damage (your choice when you create the glyph) on a failed save or half as much damage on a successful one."
        ]
      },
      {
        "type": "entries",
        "name": "Spell Glyph",
        "entries": [
          "You can store a prepared spell of level 3 or lower in the glyph by casting it as part of creating the glyph. The spell must target a single creature or an area. The spell being stored has no immediate effect when cast in this way.",
          "When the glyph is triggered, the stored spell takes effect. If the spell has a target, it targets the creature that triggered the glyph. If the spell affects an area, the area is centered on that creature. If the spell summons {@variantrule Hostile [Attitude]|XPHB|Hostile} creatures or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires {@status Concentration|XPHB}, it lasts until the end of its full duration."
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage of an explosive rune increases by {@scaledamage 5d8|3-9|1d8} for each spell slot level above 3. If you create a spell glyph, you can store any spell of up to the same level as the spell slot you use for the Glyph of Warding."
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
    "savingThrow": [
      "dexterity"
    ],
    "abilityCheck": [
      "wisdom"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Goodberry",
    "source": "XPHB",
    "page": 280,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a sprig of mistletoe"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 24
        }
      }
    ],
    "entries": [
      "Ten berries appear in your hand and are infused with magic for the duration. A creature can take a {@variantrule Bonus Action|XPHB} to eat one berry. Eating a berry restores 1 {@variantrule Hit Points|XPHB|Hit Point}, and the berry provides enough nourishment to sustain a creature for one day.",
      "Uneaten berries disappear when the spell ends."
    ],
    "miscTags": [
      "HL"
    ]
  },
  {
    "name": "Grasping Vine",
    "source": "XPHB",
    "page": 280,
    "level": 4,
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
      "You conjure a vine that sprouts from a surface in an unoccupied space that you can see within range. The vine lasts for the duration.",
      "Make a melee spell attack against a creature within 30 feet of the vine. On a hit, the target takes {@damage 4d8} Bludgeoning damage and is pulled up to 30 feet toward the vine; if the target is Huge or smaller, it has the {@condition Grappled|XPHB} condition (escape DC equal to your spell save DC). The vine can grapple only one creature at a time, and you can cause the vine to release a {@condition Grappled|XPHB} creature (no action required).",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can repeat the attack against a creature within 30 feet of the vine."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The number of creatures the vine can grapple increases by one for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "bludgeoning"
    ],
    "conditionInflict": [
      "grappled"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "FMV",
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Grease",
    "source": "XPHB",
    "page": 280,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of pork rind or butter"
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
      "Nonflammable grease covers the ground in a 10-foot square centered on a point within range and turns it into {@variantrule Difficult Terrain|XPHB} for the duration.",
      "When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or have the {@condition Prone|XPHB} condition. A creature that enters the area or ends its turn there must also succeed on that save or fall {@condition Prone|XPHB}."
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "Q"
    ]
  },
  {
    "name": "Greater Invisibility",
    "source": "XPHB",
    "page": 281,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
      "A creature you touch has the {@condition Invisible|XPHB} condition until the spell ends."
    ],
    "conditionInflict": [
      "invisible"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Greater Restoration",
    "source": "XPHB",
    "page": 281,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "text": "diamond dust worth 100+ GP, which the spell consumes",
        "cost": 10000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You touch a creature and magically remove one of the following effects from it:",
      {
        "type": "list",
        "items": [
          "1 {@condition Exhaustion|XPHB} level",
          "The {@condition Charmed|XPHB} or {@condition Petrified|XPHB} condition",
          "A curse, including the target's {@variantrule Attunement|XPHB} to a cursed magic item",
          "Any reduction to one of the target's ability scores",
          "Any reduction to the target's {@variantrule Hit Points|XPHB|Hit Point} maximum"
        ]
      }
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Guardian of Faith",
    "source": "XPHB",
    "page": 281,
    "srd52": true,
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
          "type": "hour",
          "amount": 8
        }
      }
    ],
    "entries": [
      "A Large spectral guardian appears and hovers for the duration in an unoccupied space that you can see within range. The guardian occupies that space and is invulnerable, and it appears in a form appropriate for your deity or pantheon.",
      "Any enemy that moves to a space within 10 feet of the guardian for the first time on a turn or starts its turn there makes a Dexterity saving throw, taking 20 Radiant damage on a failed save or half as much damage on a successful one. The guardian vanishes when it has dealt a total of 60 damage."
    ],
    "damageInflict": [
      "radiant"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Guards and Wards",
    "source": "XPHB",
    "page": 282,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "A",
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
        "text": "a silver rod worth 10+ GP",
        "cost": 1000
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 24
        }
      }
    ],
    "entries": [
      "You create a ward that protects up to 2,500 square feet of floor space. The warded area can be up to 20 feet tall, and you shape it as one 50-foot square, one hundred 5-foot squares that are contiguous, or twenty-five 10-foot squares that are contiguous.",
      "When you cast this spell, you can specify individuals that are unaffected by the spell's effects. You can also specify a password that, when spoken aloud within 5 feet of the warded area, makes the speaker immune to its effects.",
      "The spell creates the effects below within the warded area. {@spell Dispel Magic|XPHB} has no effect on Guards and Wards itself, but each of the following effects can be dispelled. If all four are dispelled, Guards and Wards ends. If you cast the spell every day for 365 days on the same area, the spell thereafter lasts until all its effects are dispelled.",
      {
        "type": "entries",
        "name": "Corridors",
        "entries": [
          "Fog fills all the warded corridors, making them {@variantrule Heavily Obscured|XPHB}. In addition, at each intersection or branching passage offering a choice of direction, there is a {@chance 50|||Disoriented!|No effect} chance that a creature other than you believes it is going in the opposite direction from the one it chooses."
        ]
      },
      {
        "type": "entries",
        "name": "Doors",
        "entries": [
          "All doors in the warded area are magically locked, as if sealed by the {@spell Arcane Lock|XPHB} spell. In addition, you can cover up to ten doors with an illusion to make them appear as plain sections of wall."
        ]
      },
      {
        "type": "entries",
        "name": "Stairs",
        "entries": [
          "Webs fill all stairs in the warded area from top to bottom, as in the {@spell Web|XPHB} spell. These strands regrow in 10 minutes if they are destroyed while Guards and Wards lasts."
        ]
      },
      {
        "type": "entries",
        "name": "Other Spell Effect",
        "entries": [
          "Place one of the following magical effects within the warded area:",
          {
            "type": "list",
            "items": [
              "{@spell Dancing Lights|XPHB} in four corridors, with a simple program that the lights repeat as long as Guards and Wards lasts",
              "{@spell Magic Mouth|XPHB} in two locations",
              "{@spell Stinking Cloud|XPHB} in two locations (the vapors return within 10 minutes if dispersed while Guards and Wards lasts)",
              "{@spell Gust of Wind|XPHB} in one corridor or room (the wind blows continuously while the spell lasts)",
              "{@spell Suggestion|XPHB} in one 5-foot square; any creature that enters that square receives the suggestion mentally"
            ]
          }
        ]
      }
    ],
    "miscTags": [
      "OBS",
      "PIR"
    ],
    "areaTags": [
      "Q"
    ]
  }
];
