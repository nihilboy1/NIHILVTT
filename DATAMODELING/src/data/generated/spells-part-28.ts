export const spellsPart28= [
  {
    "name": "Moonbeam",
    "source": "XPHB",
    "page": 300,
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
      "s": true,
      "m": "a moonseed leaf"
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
      "A silvery beam of pale light shines down in a 5-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. Until the spell ends, {@variantrule Dim Light|XPHB} fills the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, and you can take a {@action Magic|XPHB} action on later turns to move the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} up to 60 feet.",
      "When the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} appears, each creature in it makes a Constitution saving throw. On a failed save, a creature takes {@damage 2d10} Radiant damage, and if the creature is shape-shifted (as a result of the {@spell Polymorph|XPHB} spell, for example), it reverts to its true form and can't shape-shift until it leaves the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}. On a successful save, a creature takes half as much damage only. A creature also makes this save when the spell's area moves into its space and when it enters the spell's area or ends its turn there. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d10|2-9|1d10} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "LGT"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Mordenkainen's Faithful Hound",
    "source": "XPHB",
    "page": 300,
    "srd52": "Faithful Hound",
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
      "v": true,
      "s": true,
      "m": "a silver whistle"
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
      "You conjure a phantom watchdog in an unoccupied space that you can see within range. The hound remains for the duration or until the two of you are more than 300 feet apart from each other.",
      "No one but you can see the hound, and it is intangible and invulnerable. When a Small or larger creature comes within 30 feet of it without first speaking the password that you specify when you cast this spell, the hound starts barking loudly. The hound has {@sense Truesight|XPHB} with a range of 30 feet.",
      "At the start of each of your turns, the hound attempts to bite one enemy within 5 feet of it. That enemy must succeed on a Dexterity saving throw or take {@damage 4d8} Force damage.",
      "On your later turns, you can take a {@action Magic|XPHB} action to move the hound up to 30 feet."
    ],
    "damageInflict": [
      "force"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Mordenkainen's Magnificent Mansion",
    "source": "XPHB",
    "page": 300,
    "srd52": "Magnificent Mansion",
    "basicRules2024": true,
    "level": 7,
    "school": "C",
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
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a miniature door worth 15+ GP",
        "cost": 1500
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
      "You conjure a shimmering door in range that lasts for the duration. The door leads to an extradimensional dwelling and is 5 feet wide and 10 feet tall. You and any creature you designate when you cast the spell can enter the extradimensional dwelling as long as the door remains open. You can open or close it (no action required) if you are within 30 feet of it. While closed, the door is imperceptible.",
      "Beyond the door is a magnificent foyer with numerous chambers beyond. The dwelling's atmosphere is clean, fresh, and warm.",
      "You can create any floor plan you like for the dwelling, but it can't exceed 50 contiguous 10-foot Cubes. The place is furnished and decorated as you choose. It contains sufficient food to serve a nine-course banquet for up to 100 people. Furnishings and other objects created by this spell dissipate into smoke if removed from it.",
      "A staff of 100 near-transparent servants attends all who enter. You determine the appearance of these servants and their attire. They are invulnerable and obey your commands. Each servant can perform tasks that a human could perform, but they can't attack or take any action that would directly harm another creature. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can't leave the dwelling.",
      "When the spell ends, any creatures or objects left inside the extradimensional space are expelled into the unoccupied spaces nearest to the entrance."
    ],
    "miscTags": [
      "OBJ"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Mordenkainen's Private Sanctum",
    "source": "XPHB",
    "page": 301,
    "srd52": "Private Sanctum",
    "basicRules2024": true,
    "level": 4,
    "school": "A",
    "time": [
      {
        "number": 10,
        "unit": "minute"
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
      "m": "a thin sheet of lead"
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
      "You make an area within range magically secure. The area is a {@variantrule Cube [Area of Effect]|XPHB|Cube} that can be as small as 5 feet to as large as 100 feet on each side. The spell lasts for the duration.",
      "When you cast the spell, you decide what sort of security the spell provides, choosing any of the following properties:",
      {
        "type": "list",
        "items": [
          "Sound can't pass through the barrier at the edge of the warded area.",
          "The barrier of the warded area appears dark and foggy, preventing vision (including {@sense Darkvision|XPHB}) through it.",
          "Sensors created by Divination spells can't appear inside the protected area or pass through the barrier at its perimeter.",
          "Creatures in the area can't be targeted by Divination spells.",
          "Nothing can teleport into or out of the warded area.",
          "Planar travel is blocked within the warded area."
        ]
      },
      "Casting this spell on the same spot every day for 365 days makes the spell last until dispelled."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can increase the size of the {@variantrule Cube [Area of Effect]|XPHB|Cube} by 100 feet for each spell slot level above 4."
        ]
      }
    ],
    "miscTags": [
      "PIR",
      "PRM"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Mordenkainen's Sword",
    "source": "XPHB",
    "page": 302,
    "srd52": "Arcane Sword",
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
        "text": "a miniature sword worth 250+ GP",
        "cost": 25000
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
      "You create a spectral sword that hovers within range. It lasts for the duration.",
      "When the sword appears, you make a melee spell attack against a target within 5 feet of the sword. On a hit, the target takes Force damage equal to {@damage 4d12} plus your spellcasting ability modifier.",
      "On your later turns, you can take a {@variantrule Bonus Action|XPHB} to move the sword up to 30 feet to a spot you can see and repeat the attack against the same target or a different one."
    ],
    "damageInflict": [
      "force"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Move Earth",
    "source": "XPHB",
    "page": 302,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a miniature shovel"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 2
        },
        "concentration": true
      }
    ],
    "entries": [
      "Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. For example, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutes for these changes to complete. Because the terrain's transformation occurs slowly, creatures in the area can't usually be trapped or injured by the ground's movement.",
      "At the end of every 10 minutes you spend {@status Concentration|XPHB|Concentrating} on the spell, you can choose a new area of terrain to affect within range.",
      "This spell can't manipulate natural stone or stone construction. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse.",
      "Similarly, this spell doesn't directly affect plant growth. The moved earth carries any plants along with it."
    ],
    "areaTags": [
      "Q"
    ]
  },
  {
    "name": "Nondetection",
    "source": "XPHB",
    "page": 302,
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
      "s": true,
      "m": {
        "text": "a pinch of diamond dust worth 25+ GP, which the spell consumes",
        "cost": 2500,
        "consume": true
      }
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
      "For the duration, you hide a target that you touch from Divination spells. The target can be a willing creature, or it can be a place or an object no larger than 10 feet in any dimension. The target can't be targeted by any Divination spell or perceived through magical scrying sensors."
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Nystul's Magic Aura",
    "source": "XPHB",
    "page": 302,
    "srd52": "Arcanist's Magic Aura",
    "basicRules2024": true,
    "level": 2,
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
      "s": true,
      "m": "a small square of silk"
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
      "With a touch, you place an illusion on a willing creature or an object that isn't being worn or carried. A creature gains the Mask effect below, and an object gains the False Aura effect below. The effect lasts for the duration. If you cast the spell on the same target every day for 30 days, the illusion lasts until dispelled.",
      {
        "type": "entries",
        "name": "Mask (Creature)",
        "entries": [
          "Choose a creature type other than the target's actual type. Spells and other magical effects treat the target as if it were a creature of the chosen type."
        ]
      },
      {
        "type": "entries",
        "name": "False Aura (Object)",
        "entries": [
          "You change the way the target appears to spells and magical effects that detect magical auras, such as {@spell Detect Magic|XPHB}. You can make a nonmagical object appear magical, make a magic item appear nonmagical, or change the object's aura so that it appears to belong to a school of magic you choose."
        ]
      }
    ],
    "miscTags": [
      "OBJ",
      "PIR",
      "PRM"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Otiluke's Freezing Sphere",
    "source": "XPHB",
    "page": 302,
    "srd52": "Freezing Sphere",
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
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a miniature crystal sphere"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A frigid globe streaks from you to a point of your choice within range, where it explodes in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. Each creature in that area makes a Constitution saving throw, taking {@damage 10d6} Cold damage on failed save or half as much damage on a successful one.",
      "If the globe strikes a body of water, it freezes the water to a depth of 6 inches over an area 30 feet square. This ice lasts for 1 minute. Creatures that were swimming on the surface of frozen water are trapped in the ice and have the {@condition Restrained|XPHB} condition. A trapped creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC to break free.",
      "You can refrain from firing the globe after completing the spell's casting. If you do so, a globe about the size of a sling bullet, cool to the touch, appears in your hand. At any time, you or a creature you give the globe to can throw the globe (to a range of 40 feet) or hurl it with a sling (to the sling's normal range). It shatters on impact, with the same effect as a normal casting of the spell. You can also set the globe down without shattering it. After 1 minute, if the globe hasn't already shattered, it explodes."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 10d6|6-9|1d6} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "cold"
    ],
    "savingThrow": [
      "constitution"
    ],
    "abilityCheck": [
      "strength"
    ],
    "areaTags": [
      "S"
    ]
  }
];
