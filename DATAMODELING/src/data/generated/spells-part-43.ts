export const spellsPart43= [
  {
    "name": "Water Breathing",
    "source": "XPHB",
    "page": 340,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a short reed"
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "This spell grants up to ten willing creatures of your choice within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration."
    ],
    "areaTags": [
      "MT"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Water Walk",
    "source": "XPHB",
    "page": 340,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a piece of cork"
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
      "This spell grants the ability to move across any liquid surface—such as water, acid, mud, snow, quicksand, or lava—as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures of your choice within range gain this ability for the duration.",
      "An affected target must take a {@variantrule Bonus Action|XPHB} to pass from the liquid's surface into the liquid itself and vice versa, but if the target falls into the liquid, the target passes through the surface into the liquid below."
    ],
    "areaTags": [
      "MT"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Web",
    "source": "XPHB",
    "page": 340,
    "srd52": true,
    "basicRules2024": true,
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
      "m": "a bit of spiderweb"
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
      "You conjure a mass of sticky webbing at a point within range. The webs fill a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} there for the duration. The webs are {@variantrule Difficult Terrain|XPHB}, and the area within them is {@variantrule Lightly Obscured|XPHB}.",
      "If the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet.",
      "The first time a creature enters the webs on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the {@condition Restrained|XPHB} condition while in the webs or until it breaks free.",
      "A creature {@condition Restrained|XPHB} by the webs can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. If it succeeds, it is no longer {@condition Restrained|XPHB}.",
      "The webs are flammable. Any 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of webs exposed to fire burns away in 1 round, dealing {@damage 2d4} Fire damage to any creature that starts its turn in the fire."
    ],
    "damageInflict": [
      "fire"
    ],
    "conditionInflict": [
      "restrained"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "abilityCheck": [
      "strength"
    ],
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Weird",
    "source": "XPHB",
    "page": 341,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "You try to create illusory terrors in others' minds. Each creature of your choice in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range makes a Wisdom saving throw. On a failed save, a target takes {@damage 10d10} Psychic damage and has the {@condition Frightened|XPHB} condition for the duration. On a successful save, a target takes half as much damage only.",
      "A {@condition Frightened|XPHB} target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes {@damage 5d10} Psychic damage. On a successful save, the spell ends on that target."
    ],
    "damageInflict": [
      "psychic"
    ],
    "conditionInflict": [
      "frightened"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Wind Walk",
    "source": "XPHB",
    "page": 341,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a candle"
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
      "You and up to ten willing creatures of your choice within range assume gaseous forms for the duration, appearing as wisps of cloud. While in this cloud form, a target has a {@variantrule Fly Speed|XPHB} of 300 feet and can hover; it has {@variantrule Immunity|XPHB} to the {@condition Prone|XPHB} condition; and it has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage. The only actions a target can take in this form are the {@action Dash|XPHB} action or a {@action Magic|XPHB} action to begin reverting to its normal form. Reverting takes 1 minute, during which the target has the {@condition Stunned|XPHB} condition. Until the spell ends, the target can revert to cloud form, which also requires a {@action Magic|XPHB} action followed by a 1-minute transformation.",
      "If a target is in cloud form and flying when the effect ends, the target descends 60 feet per round for 1 minute until it lands, which it does safely. If it can't land after 1 minute, it falls the remaining distance."
    ],
    "conditionInflict": [
      "stunned"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Wind Wall",
    "source": "XPHB",
    "page": 341,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
      "m": "a fan and a feather"
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
      "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration.",
      "When the wall appears, each creature in its area makes a Strength saving throw, taking {@damage 4d8} Bludgeoning damage on a failed save or half as much damage on a successful one.",
      "The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and miss automatically. Boulders hurled by Giants or siege engines, and similar projectiles, are unaffected. Creatures in {@spell gaseous form|XPHB} can't pass through it."
    ],
    "damageInflict": [
      "bludgeoning"
    ],
    "savingThrow": [
      "strength"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Wish",
    "source": "XPHB",
    "page": 341,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
        "type": "self"
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
      "Wish is the mightiest spell a mortal can cast. By simply speaking aloud, you can alter reality itself.",
      "The basic use of this spell is to duplicate any other spell of level 8 or lower. If you use it this way, you don't need to meet any requirements to cast that spell, including costly components. The spell simply takes effect.",
      "Alternatively, you can create one of the following effects of your choice:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Object Creation",
            "entries": [
              "You create one object of up to 25,000 GP in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space that you can see on the ground."
            ]
          },
          {
            "type": "item",
            "name": "Instant Health",
            "entries": [
              "You allow yourself and up to twenty creatures that you can see to regain all {@variantrule Hit Points|XPHB}, and you end all effects on them listed in the {@spell Greater Restoration|XPHB} spell."
            ]
          },
          {
            "type": "item",
            "name": "Resistance",
            "entries": [
              "You grant up to ten creatures that you can see {@variantrule Resistance|XPHB} to one damage type that you choose. This {@variantrule Resistance|XPHB} is permanent."
            ]
          },
          {
            "type": "item",
            "name": "Spell Immunity",
            "entries": [
              "You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours."
            ]
          },
          {
            "type": "item",
            "name": "Sudden Learning",
            "entries": [
              "You replace one of your feats with another feat for which you are eligible. You lose all the benefits of the old feat and gain the benefits of the new one. You can't replace a feat that is a prerequisite for any of your other feats or features."
            ]
          },
          {
            "type": "item",
            "name": "Roll Redo",
            "entries": [
              "You undo a single recent event by forcing a reroll of any die roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a Wish spell could undo an ally's failed saving throw or a foe's {@variantrule Critical Hit|XPHB}. You can force the reroll to be made with {@variantrule Advantage|XPHB} or {@variantrule Disadvantage|XPHB}, and you choose whether to use the reroll or the original roll."
            ]
          },
          {
            "type": "item",
            "name": "Reshape Reality",
            "entries": [
              "You may wish for something not included in any of the other effects. To do so, state your wish to the DM as precisely as possible. The DM has great latitude in ruling what occurs in such an instance; the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might be achieved only in part, or you might suffer an unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a Legendary magic item or an Artifact might instantly transport you to the presence of the item's current owner. If your wish is granted and its effects have consequences for a whole community, region, or world, you are likely to attract powerful foes. If your wish would affect a god, the god's divine servants might instantly intervene to prevent it or to encourage you to craft the wish in a particular way. If your wish would undo the multiverse itself, threaten the City of Sigil, or affect the Lady of Pain in any way, you see an image of her in your mind for a moment; she shakes her head, and your wish fails."
            ]
          }
        ]
      },
      "The stress of casting Wish to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a {@variantrule Long Rest|XPHB}, you take {@damage 1d10} Necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength score becomes 3 for {@dice 2d4} days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a {@chance 33|||Unable to cast again!|Able to cast again} chance that you are unable to cast {@spell Wish|XPHB} ever again if you suffer this stress."
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
      "psychic",
      "radiant",
      "slashing",
      "thunder"
    ],
    "damageInflict": [
      "necrotic"
    ],
    "miscTags": [
      "ADV",
      "HL",
      "SGT"
    ]
  },
  {
    "name": "Witch Bolt",
    "source": "XPHB",
    "page": 343,
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
      "v": true,
      "s": true,
      "m": "a twig struck by lightning"
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
      "A beam of crackling energy lances toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against it. On a hit, the target takes {@damage 2d12} Lightning damage.",
      "On each of your subsequent turns, you can take a {@variantrule Bonus Action|XPHB} to deal {@damage 1d12} Lightning damage to the target automatically, even if the first attack missed.",
      "The spell ends if the target is ever outside the spell's range or if it has Total {@variantrule Cover|XPHB} from you."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The initial damage increases by {@scaledamage 2d12|1-9|1d12} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "lightning"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "UBA"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Word of Radiance",
    "source": "XPHB",
    "page": 343,
    "level": 0,
    "school": "V",
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
        "amount": 5
      }
    },
    "components": {
      "v": true,
      "m": "a sunburst token"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Burning radiance erupts from you in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Each creature of your choice that you can see in it must succeed on a Constitution saving throw or take {@damage 1d6} Radiant damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d6} when you reach levels 5 ({@damage 2d6}), 11 ({@damage 3d6}), and 17 ({@damage 4d6})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Radiant damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "damageInflict": [
      "radiant"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  }
];
