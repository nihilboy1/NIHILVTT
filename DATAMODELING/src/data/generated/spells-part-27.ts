export const spellsPart27= [
  {
    "name": "Mind Blank",
    "source": "XPHB",
    "page": 298,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
          "amount": 24
        }
      }
    ],
    "entries": [
      "Until the spell ends, one willing creature you touch has {@variantrule Immunity|XPHB} to Psychic damage and the {@condition Charmed|XPHB} condition. The target is also unaffected by anything that would sense its emotions or alignment, read its thoughts, or magically detect its location, and no spell—not even {@spell Wish|XPHB}—can gather information about the target, observe it remotely, or control its mind."
    ],
    "damageImmune": [
      "psychic"
    ],
    "conditionImmune": [
      "charmed"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Mind Sliver",
    "source": "XPHB",
    "page": 298,
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
      "You try to temporarily sliver the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take {@damage 1d6} Psychic damage and subtract {@dice 1d4} from the next saving throw it makes before the end of your next turn."
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
      "intelligence"
    ],
    "miscTags": [
      "SCL",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Mind Spike",
    "source": "XPHB",
    "page": 298,
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
      "You drive a spike of psionic energy into the mind of one creature you can see within range. The target makes a Wisdom saving throw, taking {@damage 3d8} Psychic damage on a failed save or half as much damage on a successful one. On a failed save, you also always know the target's location until the spell ends, but only while the two of you are on the same plane of existence. While you have this knowledge, the target can't become hidden from you, and if it has the {@condition Invisible|XPHB} condition, it gains no benefit from that condition against you."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d8|2-9|1d8} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "psychic"
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
    "name": "Minor Illusion",
    "source": "XPHB",
    "page": 298,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
        "amount": 30
      }
    },
    "components": {
      "s": true,
      "m": "a bit of fleece"
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
      "You create a sound or an image of an object within range that lasts for the duration. See the descriptions below for the effects of each. The illusion ends if you cast this spell again.",
      "If a creature takes a {@action Study|XPHB} action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.",
      {
        "type": "entries",
        "name": "Sound",
        "entries": [
          "If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends."
        ]
      },
      {
        "type": "entries",
        "name": "Image",
        "entries": [
          "If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, since things can pass through it."
        ]
      }
    ],
    "abilityCheck": [
      "intelligence"
    ]
  },
  {
    "name": "Mirage Arcane",
    "source": "XPHB",
    "page": 299,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
    "school": "I",
    "time": [
      {
        "number": 10,
        "unit": "minute"
      }
    ],
    "range": {
      "type": "point",
      "distance": {
        "type": "sight"
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
          "type": "day",
          "amount": 10
        }
      }
    ],
    "entries": [
      "You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other rough or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road.",
      "Similarly, you can alter the appearance of structures or add them where none are present. The spell doesn't disguise, conceal, or add creatures.",
      "The illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into {@variantrule Difficult Terrain|XPHB} (or vice versa) or otherwise impede movement through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately.",
      "Creatures with {@sense Truesight|XPHB} can see through the illusion to the terrain's true form; however, all other elements of the illusion remain, so while the creature is aware of the illusion's presence, the creature can still physically interact with the illusion."
    ],
    "miscTags": [
      "DFT"
    ]
  },
  {
    "name": "Mirror Image",
    "source": "XPHB",
    "page": 299,
    "srd52": true,
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
        }
      }
    ],
    "entries": [
      "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real.",
      "Each time a creature hits you with an attack roll during the spell's duration, roll a {@dice d6} for each of your remaining duplicates. If any of the d6s rolls a 3 or higher, one of the duplicates is hit instead of you, and the duplicate is destroyed. The duplicates otherwise ignore all other damage and effects. The spell ends when all three duplicates are destroyed.",
      "A creature is unaffected by this spell if it has the {@condition Blinded|XPHB} condition, {@sense Blindsight|XPHB}, or {@sense Truesight|XPHB}."
    ]
  },
  {
    "name": "Mislead",
    "source": "XPHB",
    "page": 299,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "type": "self"
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
        },
        "concentration": true
      }
    ],
    "entries": [
      "You gain the {@condition Invisible|XPHB} condition at the same time that an illusory double of you appears where you are standing. The double lasts for the duration, but the invisibility ends immediately after you make an attack roll, deal damage, or cast a spell.",
      "As a {@action Magic|XPHB} action, you can move the illusory double up to twice your {@variantrule Speed|XPHB} and make it gesture, speak, and behave in whatever way you choose. It is intangible and invulnerable.",
      "You can see through its eyes and hear through its ears as if you were located where it is."
    ],
    "conditionInflict": [
      "invisible"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Misty Step",
    "source": "XPHB",
    "page": 299,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see."
    ],
    "miscTags": [
      "SGT",
      "TP"
    ]
  },
  {
    "name": "Modify Memory",
    "source": "XPHB",
    "page": 299,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You attempt to reshape another creature's memories. One creature that you can see within range makes a Wisdom saving throw. If you are fighting the creature, it has {@variantrule Advantage|XPHB} on the save. On a failed save, the target has the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB} in this way, the target also has the {@condition Incapacitated|XPHB} condition and is unaware of its surroundings, though it can hear you. If it takes any damage or is targeted by another spell, this spell ends, and no memories are modified.",
      "While this charm lasts, you can affect the target's memory of an event that it experienced within the last 24 hours and that lasted no more than 10 minutes. You can permanently eliminate all memory of the event, allow the target to recall the event with perfect clarity, change its memory of the event's details, or create a memory of some other event.",
      "You must speak to the target to describe how its memories are affected, and it must be able to understand your language for the modified memories to take root. Its mind fills in any gaps in the details of your description. If the spell ends before you finish describing the modified memories, the creature's memory isn't altered. Otherwise, the modified memories take hold when the spell ends.",
      "A modified memory doesn't necessarily affect how a creature behaves, particularly if the memory contradicts the creature's natural inclinations, alignment, or beliefs. An illogical modified memory, such as a false memory of how much the creature enjoyed swimming in acid, is dismissed as a bad dream. The DM might deem a modified memory too nonsensical to affect a creature.",
      "A {@spell Remove Curse|XPHB} or {@spell Greater Restoration|XPHB} spell cast on the target restores the creature's true memory."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can alter the target's memories of an event that took place up to 7 days ago (level 6 spell slot), 30 days ago (level 7 spell slot), 365 days ago (level 8 spell slot), or any time in the creature's past (level 9 spell slot)."
        ]
      }
    ],
    "conditionInflict": [
      "charmed",
      "incapacitated"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
