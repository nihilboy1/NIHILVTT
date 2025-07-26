export const spellsPart11= [
  {
    "name": "Daylight",
    "source": "XPHB",
    "page": 260,
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
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "entries": [
      "For the duration, sunlight spreads from a point within range and fills a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. The sunlight's area is {@variantrule Bright Light|XPHB} and sheds {@variantrule Dim Light|XPHB} for an additional 60 feet.",
      "Alternatively, you cast the spell on an object that isn't being worn or carried, causing the sunlight to fill a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the sunlight.",
      "If any of this spell's area overlaps with an area of {@variantrule Darkness|XPHB} created by a spell of level 3 or lower, that other spell is dispelled."
    ],
    "miscTags": [
      "LGT",
      "LGTS",
      "OBJ"
    ],
    "areaTags": [
      "S"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Death Ward",
    "source": "XPHB",
    "page": 261,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
          "amount": 8
        }
      }
    ],
    "entries": [
      "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 {@variantrule Hit Points|XPHB} before the spell ends, the target instead drops to 1 {@variantrule Hit Points|XPHB|Hit Point}, and the spell ends.",
      "If the spell is still in effect when the target is subjected to an effect that would kill it instantly without dealing damage, that effect is negated against the target, and the spell ends."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Delayed Blast Fireball",
    "source": "XPHB",
    "page": 261,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a ball of bat guano and sulfur"
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
      "A beam of yellow light flashes from you, then condenses at a chosen point within range as a glowing bead for the duration. When the spell ends, the bead explodes, and each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes a Dexterity saving throw. A creature takes Fire damage equal to the total accumulated damage on a failed save or half as much damage on a successful one.",
      "The spell's base damage is {@damage 12d6}, and the damage increases by {@damage 1d6} whenever your turn ends and the spell hasn't ended.",
      "If a creature touches the glowing bead before the spell ends, that creature makes a Dexterity saving throw. On a failed save, the spell ends, causing the bead to explode. On a successful save, the creature can throw the bead up to 40 feet. If the thrown bead enters a creature's space or collides with a solid object, the spell ends, and the bead explodes.",
      "When the bead explodes, flammable objects in the explosion that aren't being worn or carried start {@hazard burning|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The base damage increases by {@scaledamage 12d6|7-9|1d6} for each spell slot level above 7."
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
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Demiplane",
    "source": "XPHB",
    "page": 261,
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
        "amount": 60
      }
    },
    "components": {
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
      "You create a shadowy Medium door on a flat solid surface that you can see within range. This door can be opened and closed, and it leads to a demiplane that is an empty room 30 feet in each dimension, made of wood or stone (your choice).",
      "When the spell ends, the door vanishes, and any objects inside the demiplane remain there. Any creatures inside also remain unless they opt to be shunted through the door as it vanishes, landing with the {@condition Prone|XPHB} condition in the unoccupied spaces closest to the door's former space.",
      "Each time you cast this spell, you can create a new demiplane or connect the shadowy door to a demiplane you created with a previous casting of this spell. Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another creature, you can connect the shadowy door to that demiplane instead."
    ],
    "miscTags": [
      "OBJ",
      "PRM",
      "SGT"
    ]
  },
  {
    "name": "Destructive Wave",
    "source": "XPHB",
    "page": 261,
    "level": 5,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "sphere",
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
        "type": "instant"
      }
    ],
    "entries": [
      "Destructive energy ripples outward from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Each creature you choose in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} makes a Constitution saving throw. On a failed save, a target takes {@damage 5d6} Thunder damage and {@damage 5d6} Radiant or Necrotic damage (your choice) and has the {@condition Prone|XPHB} condition. On a successful save, a target takes half as much damage only."
    ],
    "damageInflict": [
      "necrotic",
      "radiant",
      "thunder"
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "MT",
      "S"
    ]
  },
  {
    "name": "Detect Evil and Good",
    "source": "XPHB",
    "page": 261,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "sphere",
      "distance": {
        "type": "feet",
        "amount": 30
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
      "For the duration, you sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet of yourself. You also sense whether the {@spell Hallow|XPHB} spell is active there and, if so, where.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
    ],
    "affectsCreatureType": [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead"
    ]
  },
  {
    "name": "Detect Magic",
    "source": "XPHB",
    "page": 262,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "sphere",
      "distance": {
        "type": "feet",
        "amount": 30
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the {@action Magic|XPHB} action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell's {@book school of magic|XPHB|7|Schools of Magic}.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
    ]
  },
  {
    "name": "Detect Poison and Disease",
    "source": "XPHB",
    "page": 262,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "D",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "sphere",
      "distance": {
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a yew leaf"
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "For the duration, you sense the location of poisons, poisonous or venomous creatures, and magical contagions within 30 feet of yourself. You sense the kind of poison, creature, or contagion in each case.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
    ]
  },
  {
    "name": "Detect Thoughts",
    "source": "XPHB",
    "page": 262,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "D",
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
      "s": true,
      "m": "1 Copper Piece"
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
      "You activate one of the effects below. Until the spell ends, you can activate either effect as a {@action Magic|XPHB} action on your later turns.",
      {
        "type": "entries",
        "name": "Sense Thoughts",
        "entries": [
          "You sense the presence of thoughts within 30 feet of yourself that belong to creatures that know languages or are telepathic. You don't read the thoughts, but you know that a thinking creature is present.",
          "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
        ]
      },
      {
        "type": "entries",
        "name": "Read Thoughts",
        "entries": [
          "Target one creature you can see within 30 feet of yourself or one creature within 30 feet of yourself that you detected with the Sense Thoughts option. You learn what is most on the target's mind right now. If the target doesn't know any languages and isn't telepathic, you learn nothing.",
          "As a {@action Magic|XPHB} action on your next turn, you can try to probe deeper into the target's mind. If you probe deeper, the target makes a Wisdom saving throw. On a failed save, you discern the target's reasoning, emotions, and something that looms large in its mind (such as a worry, love, or hate). On a successful save, the spell ends. Either way, the target knows that you are probing into its mind, and until you shift your attention away from the target's mind, the target can take an action on its turn to make an Intelligence ({@skill Arcana|XPHB}) check against your spell save DC, ending the spell on a success."
        ]
      }
    ],
    "savingThrow": [
      "wisdom"
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ]
  }
];
