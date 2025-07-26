export const spellsPart22= [
  {
    "name": "Hunger of Hadar",
    "source": "XPHB",
    "page": 286,
    "level": 3,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pickled tentacle"
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
      "You open a gateway to the Far Realm, a region infested with unspeakable horrors. A 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of {@variantrule Darkness|XPHB} appears, centered on a point with range and lasting for the duration. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is {@variantrule Difficult Terrain|XPHB}, and it is filled with strange whispers and slurping noises, which can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures fully within it have the {@condition Blinded|XPHB} condition.",
      "Any creature that starts its turn in the area takes {@damage 2d6} Cold damage. Any creature that ends its turn there must succeed on a Dexterity saving throw or take {@damage 2d6} Acid damage from otherworldly tentacles."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The Cold or Acid damage (your choice) increases by {@scaledamage 2d6|3-9|1d6} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold"
    ],
    "conditionInflict": [
      "blinded"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "S"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Hunter's Mark",
    "source": "XPHB",
    "page": 287,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "D",
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
      "v": true
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
      "You magically mark one creature you can see within range as your quarry. Until the spell ends, you deal an extra {@damage 1d6} Force damage to the target whenever you hit it with an attack roll. You also have {@variantrule Advantage|XPHB} on any Wisdom ({@skill Perception|XPHB} or {@skill Survival|XPHB}) check you make to find it.",
      "If the target drops to 0 {@variantrule Hit Points|XPHB} before this spell ends, you can take a {@variantrule Bonus Action|XPHB} to move the mark to a new creature you can see within range."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 3-4 (up to 8 hours) or 5+ (up to 24 hours)."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "miscTags": [
      "AAD",
      "ADV",
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Hypnotic Pattern",
    "source": "XPHB",
    "page": 287,
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
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 120
      }
    },
    "components": {
      "s": true,
      "m": "a pinch of confetti"
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
      "You create a twisting pattern of colors in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range. The pattern appears for a moment and vanishes. Each creature in the area who can see the pattern must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB}, the creature has the {@condition Incapacitated|XPHB} condition and a {@variantrule Speed|XPHB} of 0.",
      "The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor."
    ],
    "conditionInflict": [
      "charmed",
      "incapacitated"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Ice Knife",
    "source": "XPHB",
    "page": 287,
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
      "s": true,
      "m": "a drop of water or a piece of ice"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d10} Piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take {@damage 2d6} Cold damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The Cold damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "cold",
      "piercing"
    ],
    "spellAttack": [
      "R"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Ice Storm",
    "source": "XPHB",
    "page": 287,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a mitten"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Hail falls in a 20-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. Each creature in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} makes a Dexterity saving throw. A creature takes {@damage 2d10} Bludgeoning damage and {@damage 4d6} Cold damage on a failed save or half as much damage on a successful one.",
      "Hailstones turn ground in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} into {@variantrule Difficult Terrain|XPHB} until the end of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The Bludgeoning damage increases by {@scaledamage 2d8|4-9|1d10} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "bludgeoning",
      "cold"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Identify",
    "source": "XPHB",
    "page": 287,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "D",
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
      "m": {
        "text": "a pearl worth 100+ GP",
        "cost": 10000
      }
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
      "You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires {@variantrule Attunement|XPHB}, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name.",
      "If you instead touch a creature throughout the casting, you learn which ongoing spells, if any, are currently affecting it."
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Illusory Script",
    "source": "XPHB",
    "page": 288,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "I",
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
      "s": true,
      "m": {
        "text": "ink worth 10+ GP, which the spell consumes",
        "cost": 1000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "day",
          "amount": 10
        }
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "You write on parchment, paper, or another suitable material and imbue it with an illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, seems to be written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, the illusion can alter the meaning, handwriting, and language of the text, though the language must be one you know.",
      "If the spell is dispelled, the original script and the illusion both disappear.",
      "A creature that has {@sense Truesight|XPHB} can read the hidden message."
    ]
  },
  {
    "name": "Imprisonment",
    "source": "XPHB",
    "page": 288,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
    "school": "A",
    "time": [
      {
        "number": 1,
        "unit": "minute"
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
        "text": "a statuette of the target worth 5,000+ GP",
        "cost": 500000
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
      "You create a magical restraint to hold a creature that you can see within range. The target must make a Wisdom saving throw. On a successful save, the target is unaffected, and it is immune to this spell for the next 24 hours. On a failed save, the target is imprisoned. While imprisoned, the target doesn't need to breathe, eat, or drink, and it doesn't age. Divination spells can't locate or perceive the imprisoned target, and the target can't teleport.",
      "Until the spell ends, the target is also affected by one of the following effects of your choice:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Burial",
            "entries": [
              "The target is entombed beneath the earth in a hollow globe of magical force that is just large enough to contain the target. Nothing can pass into or out of the globe."
            ]
          },
          {
            "type": "item",
            "name": "Chaining",
            "entries": [
              "Chains firmly rooted in the ground hold the target in place. The target has the {@condition Restrained|XPHB} condition and can't be moved by any means."
            ]
          },
          {
            "type": "item",
            "name": "Hedged Prison",
            "entries": [
              "The target is trapped in a demiplane that is warded against teleportation and planar travel. The demiplane is your choice of a labyrinth, a cage, a tower, or the like."
            ]
          },
          {
            "type": "item",
            "name": "Minimus Containment",
            "entries": [
              "The target becomes 1 inch tall and is trapped inside an indestructible gemstone or a similar object. Light can pass through the gemstone (allowing the target to see out and other creatures to see in), but nothing else can pass through by any means."
            ]
          },
          {
            "type": "item",
            "name": "Slumber",
            "entries": [
              "The target has the {@condition Unconscious|XPHB} condition and can't be awoken."
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Ending the Spell",
        "entries": [
          "When you cast the spell, specify a trigger that will end it. The trigger can be as simple or as elaborate as you choose, but the DM must agree that it has a high likelihood of happening within the next decade. The trigger must be an observable action, such as someone making a particular offering at the temple of your god, saving your true love, or defeating a specific monster.",
          "A {@spell Dispel Magic|XPHB} spell can end the spell only if it is cast with a level 9 spell slot, targeting either the prison or the component used to create it."
        ]
      }
    ],
    "conditionInflict": [
      "restrained",
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
    "name": "Incendiary Cloud",
    "source": "XPHB",
    "page": 288,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
        "amount": 150
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
      "A swirling cloud of embers and smoke fills a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range. The cloud's area is {@variantrule Heavily Obscured|XPHB}. It lasts for the duration or until a strong wind (like that created by {@spell Gust of Wind|XPHB}) disperses it.",
      "When the cloud appears, each creature in it makes a Dexterity saving throw, taking {@damage 10d8} Fire damage on a failed save or half as much damage on a successful one. A creature must also make this save when the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves into its space and when it enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} or ends its turn there. A creature makes this save only once per turn.",
      "The cloud moves 10 feet away from you in a direction you choose at the start of each of your turns."
    ],
    "damageInflict": [
      "fire"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBS"
    ],
    "areaTags": [
      "S"
    ]
  }
];
