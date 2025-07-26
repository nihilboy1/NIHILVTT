export const spellsPart8= [
  {
    "name": "Confusion",
    "source": "XPHB",
    "page": 253,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "three nut shells"
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
      "Each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range must succeed on a Wisdom saving throw, or that target can't take Bonus Actions or Reactions and must roll {@dice 1d10} at the start of each of its turns to determine its behavior for that turn, consulting the table below.",
      {
        "type": "table",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "1d10",
          "Behavior for the Turn"
        ],
        "rows": [
          [
            "1",
            "The target doesn't take an action, and it uses all its movement to move. Roll {@dice 1d4} for the direction: {@b 1}, north; {@b 2}, east; {@b 3}, south; or {@b 4}, west."
          ],
          [
            "2-6",
            "The target doesn't move or take actions."
          ],
          [
            "7-8",
            "The target doesn't move, and it takes the {@action Attack|XPHB} action to make one melee attack against a random creature within reach. If none are within reach, the target takes no action."
          ],
          [
            "9-10",
            "The target chooses its behavior."
          ]
        ]
      },
      "At the end of each of its turns, an affected target repeats the save, ending the spell on itself on a success."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The {@variantrule Sphere [Area of Effect]|XPHB|Sphere}'s radius increases by 5 feet for each spell slot level above 4."
        ]
      }
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "RO"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Conjure Animals",
    "source": "XPHB",
    "page": 254,
    "srd52": true,
    "basicRules2024": true,
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
        },
        "concentration": true
      }
    ],
    "entries": [
      "You conjure nature spirits that appear as a Large pack of spectral, intangible animals in an unoccupied space you can see within range. The pack lasts for the duration, and you choose the spirits' animal form, such as wolves, serpents, or birds.",
      "You have {@variantrule Advantage|XPHB} on Strength saving throws while you're within 5 feet of the pack, and when you move on your turn, you can also move the pack up to 30 feet to an unoccupied space you can see.",
      "Whenever the pack moves within 10 feet of a creature you can see and whenever a creature you can see enters a space within 10 feet of the pack or ends its turn there, you can force that creature to make a Dexterity saving throw. On a failed save, the creature takes {@damage 3d10} Slashing damage. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d10|3-9|1d10} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "slashing"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "ADV",
      "SGT"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Conjure Barrage",
    "source": "XPHB",
    "page": 254,
    "level": 3,
    "school": "C",
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
      "s": true,
      "m": {
        "text": "a Melee or Ranged weapon worth at least 1 CP",
        "cost": 1
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You brandish the weapon used to cast the spell and conjure similar spectral weapons (or ammunition appropriate to the weapon) that launch forward and then disappear. Each creature of your choice that you can see in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw, taking {@damage 5d8} Force damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 5d8|3-9|1d8} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "N"
    ]
  },
  {
    "name": "Conjure Celestial",
    "source": "XPHB",
    "page": 254,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
      "You conjure a spirit from the Upper Planes, which manifests as a pillar of light in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. For each creature you can see in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, choose which of these lights shines on it:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Healing Light",
            "entries": [
              "The target regains {@variantrule Hit Points|XPHB} equal to {@dice 4d12} plus your spellcasting ability modifier."
            ]
          },
          {
            "type": "item",
            "name": "Searing Light",
            "entries": [
              "The target makes a Dexterity saving throw, taking {@damage 6d12} Radiant damage on a failed save or half as much damage on a successful one."
            ]
          }
        ]
      },
      "Until the spell ends, {@variantrule Bright Light|XPHB} fills the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, and when you move on your turn, you can also move the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} up to 30 feet.",
      "Whenever the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} moves into the space of a creature you can see and whenever a creature you can see enters the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} or ends its turn there, you can bathe it in one of the lights. A creature can be affected by this spell only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing and damage increase by {@scaledamage 6d12|7-9|1d12} for each spell slot level above 7."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "HL",
      "SGT"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Conjure Elemental",
    "source": "XPHB",
    "page": 254,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
      "You conjure a Large, intangible spirit from the Elemental Planes that appears in an unoccupied space within range. Choose the spirit's element, which determines its damage type: air (Lightning), earth (Thunder), fire (Fire), or water (Cold). The spirit lasts for the duration.",
      "Whenever a creature you can see enters the spirit's space or starts its turn within 5 feet of the spirit, you can force that creature to make a Dexterity saving throw if the spirit has no creature {@condition Restrained|XPHB}. On failed save, the target takes {@damage 8d8} damage of the spirit's type, and the target has the {@condition Restrained|XPHB} condition until the spell ends. At the start of each of its turns, the {@condition Restrained|XPHB} target repeats the save. On a failed save, the target takes {@damage 4d8} damage of the spirit's type. On a successful save, the target isn't {@condition Restrained|XPHB} by the spirit."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d8;4d8|5-9|1d8} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "lightning",
      "thunder",
      "fire",
      "cold"
    ],
    "conditionInflict": [
      "restrained"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Conjure Fey",
    "source": "XPHB",
    "page": 255,
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
        },
        "concentration": true
      }
    ],
    "entries": [
      "You conjure a Medium spirit from the Feywild in an unoccupied space you can see within range. The spirit lasts for the duration, and it looks like a Fey creature of your choice. When the spirit appears, you can make one melee spell attack against a creature within 5 feet of it. On a hit, the target takes Psychic damage equal to {@damage 3d12} plus your spellcasting ability modifier, and the target has the {@condition Frightened|XPHB} condition until the start of your next turn, with both you and the spirit as the source of the fear.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can teleport the spirit to an unoccupied space you can see within 30 feet of the space it left and make the attack against a creature within 5 feet of it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d12|6-9|1d12} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "psychic"
    ],
    "conditionInflict": [
      "frightened"
    ],
    "miscTags": [
      "SGT",
      "UBA"
    ]
  },
  {
    "name": "Conjure Minor Elementals",
    "source": "XPHB",
    "page": 255,
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
      "type": "emanation",
      "distance": {
        "type": "feet",
        "amount": 15
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
      "You conjure spirits from the Elemental Planes that flit around you in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. Until the spell ends, any attack you make deals an extra {@damage 2d8} damage when you hit a creature in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. This damage is Acid, Cold, Fire, or Lightning (your choice when you make the attack).",
      "In addition, the ground in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is {@variantrule Difficult Terrain|XPHB} for your enemies."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d8|4-9|1d8} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "lightning"
    ],
    "miscTags": [
      "AAD",
      "DFT"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Conjure Volley",
    "source": "XPHB",
    "page": 255,
    "level": 5,
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
      "m": {
        "text": "a Melee or Ranged weapon worth at least 1 CP",
        "cost": 1
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You brandish the weapon used to cast the spell and choose a point within range. Hundreds of similar spectral weapons (or ammunition appropriate to the weapon) fall in a volley and then disappear. Each creature of your choice that you can see in a 40-foot-radius, 20-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on that point makes a Dexterity saving throw. A creature takes {@damage 8d8} Force damage on a failed save or half as much damage on a successful one."
    ],
    "damageInflict": [
      "force"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Conjure Woodland Beings",
    "source": "XPHB",
    "page": 255,
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
      "type": "emanation",
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
          "type": "minute",
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "You conjure nature spirits that flit around you in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. Whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters the space of a creature you can see and whenever a creature you can see enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, you can force that creature to make a Wisdom saving throw. The creature takes {@damage 5d8} Force damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn.",
      "In addition, you can take the {@action Disengage|XPHB} action as a {@variantrule Bonus Action|XPHB} for the spell's duration."
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
      "force"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SGT",
      "UBA"
    ]
  }
];
