export const spellsPart40= [
  {
    "name": "Teleportation Circle",
    "source": "XPHB",
    "page": 332,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "m": {
        "text": "rare inks worth 50+ GP, which the spell consumes",
        "cost": 5000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "round",
          "amount": 1
        }
      }
    ],
    "entries": [
      "As you cast the spell, you draw a 5-foot-radius circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied.",
      "Many major temples, guildhalls, and other important places have permanent teleportation circles. Each circle includes a unique sigil sequence—a string of runes arranged in a particular pattern.",
      "When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the DM. You might learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute.",
      "You can create a permanent teleportation circle by casting this spell in the same location every day for 365 days."
    ],
    "miscTags": [
      "PIR",
      "PRM",
      "TP"
    ]
  },
  {
    "name": "Tenser's Floating Disk",
    "source": "XPHB",
    "page": 332,
    "srd52": "Floating Disk",
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a drop of mercury"
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
      "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.",
      "The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 10-foot-deep pit, nor could it leave such a pit if it was created at the bottom.",
      "If you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends."
    ],
    "miscTags": [
      "SGT"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Thaumaturgy",
    "source": "XPHB",
    "page": 333,
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
          "type": "minute",
          "amount": 1
        }
      }
    ],
    "entries": [
      "You manifest a minor wonder within range. You create one of the effects below within range. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time.",
      {
        "type": "entries",
        "name": "Altered Eyes",
        "entries": [
          "You alter the appearance of your eyes for 1 minute."
        ]
      },
      {
        "type": "entries",
        "name": "Booming Voice",
        "entries": [
          "Your voice booms up to three times as loud as normal for 1 minute. For the duration, you have {@variantrule Advantage|XPHB} on Charisma ({@skill Intimidation|XPHB}) checks."
        ]
      },
      {
        "type": "entries",
        "name": "Fire Play",
        "entries": [
          "You cause flames to flicker, brighten, dim, or change color for 1 minute."
        ]
      },
      {
        "type": "entries",
        "name": "Invisible Hand",
        "entries": [
          "You instantaneously cause an unlocked door or window to fly open or slam shut."
        ]
      },
      {
        "type": "entries",
        "name": "Phantom Sound",
        "entries": [
          "You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers."
        ]
      },
      {
        "type": "entries",
        "name": "Tremors",
        "entries": [
          "You cause harmless tremors in the ground for 1 minute."
        ]
      }
    ],
    "miscTags": [
      "ADV"
    ]
  },
  {
    "name": "Thorn Whip",
    "source": "XPHB",
    "page": 333,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "the stem of a plant with thorns"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You create a vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. On a hit, the target takes {@damage 1d6} Piercing damage, and if it is Large or smaller, you can pull it up to 10 feet closer to you."
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
      "label": "Piercing damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "damageInflict": [
      "piercing"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "FMV",
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Thunderclap",
    "source": "XPHB",
    "page": 333,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Each creature in a 5-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from you must succeed on a Constitution saving throw or take {@damage 1d6} Thunder damage. The spell's thunderous sound can be heard up to 100 feet away."
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
      "label": "Thunder damage",
      "scaling": {
        "1": "1d6",
        "5": "2d6",
        "11": "3d6",
        "17": "4d6"
      }
    },
    "damageInflict": [
      "thunder"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Thunderous Smite",
    "source": "XPHB",
    "page": 334,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
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
      "Your strike rings with thunder that is audible within 300 feet of you, and the target takes an extra {@damage 2d6} Thunder damage from the attack. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and have the {@condition Prone|XPHB} condition."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "thunder"
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "strength"
    ],
    "miscTags": [
      "AAD",
      "FMV"
    ]
  },
  {
    "name": "Thunderwave",
    "source": "XPHB",
    "page": 334,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "cube",
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
        "type": "instant"
      }
    ],
    "entries": [
      "You unleash a wave of thunderous energy. Each creature in a 15-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} originating from you makes a Constitution saving throw. On a failed save, a creature takes {@damage 2d8} Thunder damage and is pushed 10 feet away from you. On a successful save, a creature takes half as much damage only.",
      "In addition, unsecured objects that are entirely within the {@variantrule Cube [Area of Effect]|XPHB|Cube} are pushed 10 feet away from you, and a thunderous boom is audible within 300 feet."
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
      "thunder"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "FMV",
      "OBJ"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Time Stop",
    "source": "XPHB",
    "page": 334,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take {@dice 1d4 + 1} turns in a row, during which you can use actions and move as normal.",
      "This spell ends if one of the actions you use during this period, or any effects that you create during it, affects a creature other than you or an object being worn or carried by someone other than you. In addition, the spell ends if you move to a place more than 1,000 feet from the location where you cast it."
    ]
  },
  {
    "name": "Toll the Dead",
    "source": "XPHB",
    "page": 334,
    "level": 0,
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
      "You point at one creature you can see within range, and the single chime of a dolorous bell is audible within 10 feet of the target. The target must succeed on a Wisdom saving throw or take {@damage 1d8} Necrotic damage. If the target is missing any of its {@variantrule Hit Points|XPHB}, it instead takes {@damage 1d12} Necrotic damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by one die when you reach levels 5 ({@damage 2d8} or {@damage 2d12}), 11 ({@damage 3d8} or {@damage 3d12}), and 17 ({@damage 4d8} or {@damage 4d12})."
        ]
      }
    ],
    "scalingLevelDice": [
      {
        "label": "Necrotic damage",
        "scaling": {
          "1": "1d8",
          "5": "2d8",
          "11": "3d8",
          "17": "4d8"
        }
      },
      {
        "label": "Necrotic damage to wounded creature",
        "scaling": {
          "1": "1d12",
          "5": "2d12",
          "11": "3d12",
          "17": "4d12"
        }
      }
    ],
    "damageInflict": [
      "necrotic"
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
    ]
  }
];
