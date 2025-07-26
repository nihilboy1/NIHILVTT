export const spellsPart42= [
  {
    "name": "Vampiric Touch",
    "source": "XPHB",
    "page": 337,
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
      "The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a melee spell attack against one creature within reach. On a hit, the target takes {@damage 3d6} Necrotic damage, and you regain {@variantrule Hit Points|XPHB} equal to half the amount of Necrotic damage dealt.",
      "Until the spell ends, you can make the attack again on each of your turns as a {@action Magic|XPHB} action, targeting the same creature or a different one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d6|3-9|1d6} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Vicious Mockery",
    "source": "XPHB",
    "page": 337,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "v": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You unleash a string of insults laced with subtle enchantments at one creature you can see or hear within range. The target must succeed on a Wisdom saving throw or take {@damage 1d6} Psychic damage and have {@variantrule Disadvantage|XPHB} on the next attack roll it makes before the end of its next turn."
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
      "label": "Psychic damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Vitriolic Sphere",
    "source": "XPHB",
    "page": 337,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a drop of bile"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You point at a location within range, and a glowing, 1-foot-diameter ball of acid streaks there and explodes in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. Each creature in that area makes a Dexterity saving throw. On a failed save, a creature takes {@damage 10d4} Acid damage and another {@damage 5d4} Acid damage at the end of its next turn. On a successful save, a creature takes half the initial damage only."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The initial damage increases by {@scaledamage 10d4|4-9|2d4} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "acid"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "S"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Wall of Fire",
    "source": "XPHB",
    "page": 338,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a piece of charcoal"
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
      "You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.",
      "When the wall appears, each creature in its area makes a Dexterity saving throw, taking {@damage 5d8} Fire damage on a failed save or half as much damage on a successful one.",
      "One side of the wall, selected by you when you cast this spell, deals {@damage 5d8} Fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 5d8|4-9|1d8} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Wall of Force",
    "source": "XPHB",
    "page": 338,
    "srd52": true,
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
      "m": "a shard of glass"
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
      "An {@condition Invisible|XPHB} wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick and lasts for the duration. If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side).",
      "Nothing can physically pass through the wall. It is immune to all damage and can't be dispelled by {@spell Dispel Magic|XPHB}. A {@spell Disintegrate|XPHB} spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane and blocks ethereal travel through the wall."
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Wall of Ice",
    "source": "XPHB",
    "page": 339,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a piece of quartz"
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
      "You create a wall of ice on a solid surface within range. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-square panels. Each panel must be contiguous with another panel. In any form, the wall is 1 foot thick and lasts for the duration.",
      "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side) and makes a Dexterity saving throw, taking {@damage 10d6} Cold damage on a failed save or half as much damage on a successful one.",
      "The wall is an object that can be damaged and thus breached. It has AC 12 and 30 {@variantrule Hit Points|XPHB} per 10-foot section, and it has {@variantrule Immunity|XPHB} to Cold, Poison, and Psychic damage and {@variantrule Vulnerability|XPHB} to Fire damage. Reducing a 10-foot section of wall to 0 {@variantrule Hit Points|XPHB} destroys it and leaves behind a sheet of frigid air in the space the wall occupied.",
      "A creature moving through the sheet of frigid air for the first time on a turn makes a Constitution saving throw, taking {@damage 5d6} Cold damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage the wall deals when it appears increases by {@scaledamage 10d6|6-9|2d6} and the damage from passing through the sheet of frigid air increases by {@scaledamage 5d6|6-9|1d6} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "cold"
    ],
    "savingThrow": [
      "dexterity",
      "constitution"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Wall of Stone",
    "source": "XPHB",
    "page": 339,
    "srd52": true,
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
      "m": "a cube of granite"
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
      "A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. Alternatively, you can create 10-foot-by-20-foot panels that are only 3 inches thick.",
      "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its {@variantrule Reaction|XPHB} to move up to its {@variantrule Speed|XPHB} so that it is no longer enclosed by the wall.",
      "The wall can have any shape you desire, though it can't occupy the same space as a creature or object. The wall doesn't need to be vertical or rest on a firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.",
      "If you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create battlements and the like.",
      "The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 {@variantrule Hit Points|XPHB} per inch of thickness, and it has {@variantrule Immunity|XPHB} to Poison and Psychic damage. Reducing a panel to 0 {@variantrule Hit Points|XPHB} destroys it and might cause connected panels to collapse at the DM's discretion.",
      "If you maintain your {@status Concentration|XPHB} on this spell for its full duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the spell ends."
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ",
      "PRM"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Wall of Thorns",
    "source": "XPHB",
    "page": 339,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a handful of thorns"
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
      "You create a wall of tangled brush bristling with needle-sharp thorns. The wall appears within range on a solid surface and lasts for the duration. You choose to make the wall up to 60 feet long, 10 feet high, and 5 feet thick or a circle that has a 20-foot diameter and is up to 20 feet high and 5 feet thick. The wall blocks line of sight.",
      "When the wall appears, each creature in its area makes a Dexterity saving throw, taking {@damage 7d8} Piercing damage on a failed save or half as much damage on a successful one.",
      "A creature can move through the wall, albeit slowly and painfully. For every 1 foot a creature moves through the wall, it must spend 4 feet of movement. Furthermore, the first time a creature enters a space in the wall on a turn or ends its turn there, the creature makes a Dexterity saving throw, taking {@damage 7d8} Slashing damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Both types of damage increase by {@scaledamage 7d8|6-9|1d8} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "piercing",
      "slashing"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "W"
    ]
  },
  {
    "name": "Warding Bond",
    "source": "XPHB",
    "page": 340,
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
      "s": true,
      "m": {
        "text": "a pair of platinum rings worth 50+ GP each, which you and the target must wear for the duration",
        "cost": 5000
      }
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
      "You touch another creature that is willing and create a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has {@variantrule Resistance|XPHB} to all damage. Also, each time it takes damage, you take the same amount of damage.",
      "The spell ends if you drop to 0 {@variantrule Hit Points|XPHB} or if you and the target become separated by more than 60 feet. It also ends if the spell is cast again on either of the connected creatures."
    ],
    "miscTags": [
      "MAC"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
