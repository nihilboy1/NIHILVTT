export const spellsPart16= [
  {
    "name": "Find Familiar",
    "source": "XPHB",
    "page": 272,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "hour"
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
      "s": true,
      "m": {
        "text": "burning incense worth 10+ GP, which the spell consumes",
        "cost": 1000,
        "consume": true
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
      "You gain the service of a familiar, a spirit that takes an animal form you choose: {@creature Bat|XMM}, {@creature Cat|XMM}, {@creature Frog|XMM}, {@creature Hawk|XMM}, {@creature Lizard|XMM}, {@creature Octopus|XMM}, {@creature Owl|XMM}, {@creature Rat|XMM}, {@creature Raven|XMM}, {@creature Spider|XMM}, {@creature Weasel|XMM}, or another Beast that has a {@filter Challenge Rating of 0|bestiary|challenge rating=[&0]|type=beast|miscellaneous=!swarm}. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a Celestial, Fey, or Fiend (your choice) instead of a Beast. Your familiar acts independently of you, but it obeys your commands.",
      {
        "type": "entries",
        "name": "Telepathic Connection",
        "entries": [
          "While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as a {@variantrule Bonus Action|XPHB}, you can see through the familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses it has.",
          "Finally, when you cast a spell with a range of touch, your familiar can deliver the touch. Your familiar must be within 100 feet of you, and it must take a {@variantrule Reaction|XPHB} to deliver the touch when you cast the spell."
        ]
      },
      {
        "type": "entries",
        "name": "Combat",
        "entries": [
          "The familiar is an ally to you and your allies. It rolls its own {@variantrule Initiative|XPHB} and acts on its own turn. A familiar can't attack, but it can take other actions as normal."
        ]
      },
      {
        "type": "entries",
        "name": "Disappearance of the Familiar",
        "entries": [
          "When the familiar drops to 0 {@variantrule Hit Points|XPHB}, it disappears. It reappears after you cast this spell again. As a {@action Magic|XPHB} action, you can temporarily dismiss the familiar to a pocket dimension. Alternatively, you can dismiss it forever. As a {@action Magic|XPHB} action while it is temporarily dismissed, you can cause it to reappear in an unoccupied space within 30 feet of you. Whenever the familiar drops to 0 {@variantrule Hit Points|XPHB} or disappears into the pocket dimension, it leaves behind in its space anything it was wearing or carrying."
        ]
      },
      {
        "type": "entries",
        "name": "One Familiar Only",
        "entries": [
          "You can't have more than one familiar at a time. If you cast this spell while you have a familiar, you instead cause it to adopt a new eligible form."
        ]
      }
    ],
    "miscTags": [
      "PRM",
      "SMN"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Find Steed",
    "source": "XPHB",
    "page": 272,
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
        "amount": 30
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
      "You summon an otherworldly being that appears as a loyal steed in an unoccupied space of your choice within range. This creature uses the {@creature Otherworldly Steed|XPHB} stat block. If you already have a steed from this spell, the steed is replaced by the new one.",
      "The steed resembles a Large, rideable animal of your choice, such as a horse, a camel, a dire wolf, or an elk. Whenever you cast the spell, choose the steed's creature type—Celestial, Fey, or Fiend—which determines certain traits in the stat block.",
      {
        "type": "entries",
        "name": "Combat",
        "entries": [
          "The steed is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count, and it functions as a controlled mount while you ride it (as defined in the rules on {@book mounted combat|XPHB|1|Mounted Combat}). If you have the {@condition Incapacitated|XPHB} condition, the steed takes its turn immediately after yours and acts independently, focusing on protecting you."
        ]
      },
      {
        "type": "entries",
        "name": "Disappearance of the Steed",
        "entries": [
          "The steed disappears if it drops to 0 {@variantrule Hit Points|XPHB} or if you die. When it disappears, it leaves behind anything it was wearing or carrying. If you cast this spell again, you decide whether you summon the steed that disappeared or a different one."
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Use the spell slot's level for the spell's level in the stat block."
        ]
      }
    ],
    "miscTags": [
      "PRM",
      "SMN"
    ]
  },
  {
    "name": "Find the Path",
    "source": "XPHB",
    "page": 273,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a set of divination tools—such as cards or runes—worth 100+ GP",
        "cost": 10000
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
      "You magically sense the most direct physical route to a location you name. You must be familiar with the location, and the spell fails if you name a destination on another plane of existence, a moving destination (such as a mobile fortress), or an unspecific destination (such as \"a green dragon's lair\").",
      "For the duration, as long as you are on the same plane of existence as the destination, you know how far it is and in what direction it lies. Whenever you face a choice of paths along the way there, you know which path is the most direct."
    ]
  },
  {
    "name": "Find Traps",
    "source": "XPHB",
    "page": 273,
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
        "type": "instant"
      }
    ],
    "entries": [
      "You sense any trap within range that is within line of sight. A trap, for the purpose of this spell, includes any object or mechanism that was created to cause damage or other danger. Thus, the spell would sense the {@spell Alarm|XPHB} or {@spell Glyph of Warding|XPHB} spell or a mechanical pit trap, but it wouldn't reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.",
      "This spell reveals that a trap is present but not its location. You do learn the general nature of the danger posed by a trap you sense."
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Finger of Death",
    "source": "XPHB",
    "page": 273,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
      "You unleash negative energy toward a creature you can see within range. The target makes a Constitution saving throw, taking {@damage 7d8 + 30} Necrotic damage on a failed save or half as much damage on a successful one.",
      "A Humanoid killed by this spell rises at the start of your next turn as a {@creature Zombie|XMM} that follows your verbal orders."
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "PRM",
      "SGT",
      "SMN"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Fire Bolt",
    "alias": [
      "Firebolt"
    ],
    "source": "XPHB",
    "page": 274,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You hurl a mote of fire at a creature or an object within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d10} Fire damage. A flammable object hit by this spell starts {@hazard burning|XPHB} if it isn't being worn or carried."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d10} when you reach levels 5 ({@damage 2d10}), 11 ({@damage 3d10}), and 17 ({@damage 4d10})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Fire damage",
      "scaling": {
        "1": "1d10",
        "5": "2d10",
        "11": "3d10",
        "17": "4d10"
      }
    },
    "damageInflict": [
      "fire"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "OBJ",
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Fire Shield",
    "source": "XPHB",
    "page": 274,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of phosphorus or a firefly"
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
      "Wispy flames wreathe your body for the duration, shedding {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
      "The flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you {@variantrule Resistance|XPHB} to Cold damage, and the chill shield grants you {@variantrule Resistance|XPHB} to Fire damage.",
      "In addition, whenever a creature within 5 feet of you hits you with a melee attack roll, the shield erupts with flame. The attacker takes {@damage 2d8} Fire damage from a warm shield or {@damage 2d8} Cold damage from a chill shield."
    ],
    "damageResist": [
      "cold",
      "fire"
    ],
    "damageInflict": [
      "cold",
      "fire"
    ],
    "miscTags": [
      "LGT"
    ]
  },
  {
    "name": "Fire Storm",
    "source": "XPHB",
    "page": 275,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A storm of fire appears within range. The area of the storm consists of up to ten 10-foot Cubes, which you arrange as you like. Each {@variantrule Cube [Area of Effect]|XPHB|Cube} must be contiguous with at least one other {@variantrule Cube [Area of Effect]|XPHB|Cube}. Each creature in the area makes a Dexterity saving throw, taking {@damage 7d10} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the area that aren't being worn or carried start {@hazard burning|XPHB}."
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
      "C"
    ]
  },
  {
    "name": "Fireball",
    "source": "XPHB",
    "page": 274,
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
        "type": "instant"
      }
    ],
    "entries": [
      "A bright streak flashes from you to a point you choose within range and then blossoms with a low roar into a fiery explosion. Each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes a Dexterity saving throw, taking {@damage 8d6} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the area that aren't being worn or carried start {@hazard burning|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d6|3-9|1d6} for each spell slot level above 3."
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
    ],
    "hasFluffImages": true
  }
];
