export const spellsPart17= [
  {
    "name": "Flame Blade",
    "source": "XPHB",
    "page": 275,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "V",
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
      "s": true,
      "m": "a sumac leaf"
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
      "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke it again as a {@variantrule Bonus Action|XPHB}.",
      "As a {@action Magic|XPHB} action, you can make a melee spell attack with the fiery blade. On a hit, the target takes Fire damage equal to {@damage 3d6} plus your spellcasting ability modifier.",
      "The flaming blade sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d6|2-9|1d6} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "fire"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "LGT",
      "UBA"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Flame Strike",
    "source": "XPHB",
    "page": 275,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pinch of sulfur"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A vertical column of brilliant fire roars down from above. Each creature in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range makes a Dexterity saving throw, taking {@damage 5d6} Fire damage and {@damage 5d6} Radiant damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The Fire damage and the Radiant damage increase by {@scaledamage 5d6|5-9|1d6} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "fire",
      "radiant"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Flaming Sphere",
    "source": "XPHB",
    "page": 275,
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
      "m": "a ball of wax"
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
      "You create a 5-foot-diameter sphere of fire in an unoccupied space on the ground within range. It lasts for the duration. Any creature that ends its turn within 5 feet of the sphere makes a Dexterity saving throw, taking {@damage 2d6} Fire damage on a failed save or half as much damage on a successful one.",
      "As a {@variantrule Bonus Action|XPHB}, you can move the sphere up to 30 feet, rolling it along the ground. If you move the sphere into a creature's space, that creature makes the save against the sphere, and the sphere stops moving for the turn.",
      "When you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. Flammable objects that aren't being worn or carried start {@hazard burning|XPHB} if touched by the sphere, and it sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d6|2-9|1d6} for each spell slot level above 2."
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
      "LGT",
      "OBJ",
      "UBA"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Flesh to Stone",
    "source": "XPHB",
    "page": 275,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a cockatrice feather"
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
      "You attempt to turn one creature that you can see within range into stone. The target makes a Constitution saving throw. On a failed save, it has the {@condition Restrained|XPHB} condition for the duration. On a successful save, its {@variantrule Speed|XPHB} is 0 until the start of your next turn. Constructs automatically succeed on the save.",
      "A {@condition Restrained|XPHB} target makes another Constitution saving throw at the end of each of its turns. If it successfully saves against this spell three times, the spell ends. If it fails its saves three times, it is turned to stone and has the {@condition Petrified|XPHB} condition for the duration. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind.",
      "If you maintain your {@status Concentration|XPHB} on this spell for the entire possible duration, the target is {@condition Petrified|XPHB} until the condition is ended by {@spell Greater Restoration|XPHB} or similar magic."
    ],
    "conditionInflict": [
      "petrified",
      "restrained"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Fly",
    "source": "XPHB",
    "page": 276,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a feather"
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
      "You touch a willing creature. For the duration, the target gains a {@variantrule Fly Speed|XPHB} of 60 feet and can hover. When the spell ends, the target falls if it is still aloft unless it can stop the fall."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 3."
        ]
      }
    ],
    "miscTags": [
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Fog Cloud",
    "source": "XPHB",
    "page": 276,
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
          "type": "hour",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of fog centered on a point within range. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is {@variantrule Heavily Obscured|XPHB}. It lasts for the duration or until a strong wind (such as one created by {@spell Gust of Wind|XPHB}) disperses it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The fog's radius increases by 20 feet for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "OBS"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Forbiddance",
    "source": "XPHB",
    "page": 276,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "ruby dust worth 1,000+ GP",
        "cost": 100000
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "day",
          "amount": 1
        }
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can't teleport into the area or use portals, such as those created by the {@spell Gate|XPHB} spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, the Ethereal Plane, the Feywild, the Shadowfell, or the {@spell Plane Shift|XPHB} spell.",
      "In addition, the spell damages types of creatures that you choose when you cast it. Choose one or more of the following: Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. When a creature of a chosen type enters the spell's area for the first time on a turn or ends its turn there, the creature takes {@damage 5d10} Radiant or Necrotic damage (your choice when you cast this spell).",
      "You can designate a password when you cast the spell. A creature that speaks the password as it enters the area takes no damage from the spell.",
      "The spell's area can't overlap with the area of another Forbiddance spell. If you cast {@spell Forbiddance|XPHB} every day for 30 days in the same location, the spell lasts until it is dispelled, and the Material components are consumed on the last casting."
    ],
    "damageInflict": [
      "necrotic",
      "radiant"
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
      "PIR",
      "PRM"
    ]
  },
  {
    "name": "Forcecage",
    "source": "XPHB",
    "page": 276,
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
      "type": "point",
      "distance": {
        "type": "feet",
        "amount": 100
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "ruby dust worth 1,500+ GP, which the spell consumes",
        "cost": 150000,
        "consume": true
      }
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
      "An immobile, {@condition Invisible|XPHB}, {@variantrule Cube [Area of Effect]|XPHB|Cube}-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box, as you choose.",
      "A prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2 inch apart. A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.",
      "When you cast the spell, any creature that is completely inside the cage's area is trapped. Creatures only partially within the area, or those too large to fit inside it, are pushed away from the center of the area until they are completely outside it.",
      "A creature inside the cage can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave, it must first make a Charisma saving throw. On a successful save, the creature can use that magic to exit the cage. On a failed save, the creature doesn't exit the cage and wastes the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel.",
      "This spell can't be dispelled by {@spell Dispel Magic|XPHB}."
    ],
    "savingThrow": [
      "charisma"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Foresight",
    "source": "XPHB",
    "page": 276,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "m": "a hummingbird feather"
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
      "You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target has {@variantrule Advantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}, and other creatures have {@variantrule Disadvantage|XPHB} on attack rolls against it. The spell ends early if you cast it again."
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
