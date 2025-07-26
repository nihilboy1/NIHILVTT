export const spellsPart13= [
  {
    "name": "Divine Word",
    "source": "XPHB",
    "page": 265,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
      "You utter a word imbued with power from the Upper Planes. Each creature of your choice in range makes a Charisma saving throw. On a failed save, a target that has 50 {@variantrule Hit Points|XPHB} or fewer suffers an effect based on its current {@variantrule Hit Points|XPHB}, as shown in the Divine Word Effects table. Regardless of its {@variantrule Hit Points|XPHB}, a Celestial, an Elemental, a Fey, or a Fiend target that fails its save is forced back to its plane of origin (if it isn't there already) and can't return to the current plane for 24 hours by any means short of a {@spell Wish|XPHB} spell.",
      {
        "type": "table",
        "caption": "Divine Word Effects",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "Hit Points",
          "Effect"
        ],
        "rows": [
          [
            "0-20",
            "The target dies."
          ],
          [
            "21-30",
            "The target has the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Stunned|XPHB} conditions for 1 hour."
          ],
          [
            "31-40",
            "The target has the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions for 10 minutes."
          ],
          [
            "41-50",
            "The target has the {@condition Deafened|XPHB} condition for 1 minute."
          ]
        ]
      }
    ],
    "conditionInflict": [
      "blinded",
      "deafened",
      "stunned"
    ],
    "savingThrow": [
      "charisma"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Dominate Beast",
    "source": "XPHB",
    "page": 265,
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
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "One Beast you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      "You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"{@action Attack|XPHB} that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.",
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 5 (up to 10 minutes), 6 (up to 1 hour), or 7+ (up to 8 hours)."
        ]
      }
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "affectsCreatureType": [
      "beast"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Dominate Monster",
    "source": "XPHB",
    "page": 265,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
      "One creature you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      "You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"{@action Attack|XPHB} that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.",
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Your {@status Concentration|XPHB} can last longer with a level 9 spell slot (up to 8 hours)."
        ]
      }
    ],
    "conditionInflict": [
      "charmed"
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
    "name": "Dominate Person",
    "source": "XPHB",
    "page": 266,
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
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "One Humanoid you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      "You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as \"{@action Attack|XPHB} that creature,\" \"Move over there,\" or \"Fetch that object.\" The target does its best to obey on its turn. If it completes an order and doesn't receive further direction from you, it acts and moves as it likes, focusing on protecting itself.",
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 6 (up to 10 minutes), 7 (up to 1 hour), or 8+ (up to 8 hours)."
        ]
      }
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Dragon's Breath",
    "source": "XPHB",
    "page": 266,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "bonus"
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
      "m": "a hot pepper"
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
      "You touch one willing creature, and choose Acid, Cold, Fire, Lightning, or Poison. Until the spell ends, the target can take a {@action Magic|XPHB} action to exhale a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Each creature in that area makes a Dexterity saving throw, taking {@damage 3d6} damage of the chosen type on a failed save or half as much damage on a successful one."
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
      "acid",
      "cold",
      "fire",
      "lightning",
      "poison"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "N",
      "ST"
    ]
  },
  {
    "name": "Drawmij's Instant Summons",
    "source": "XPHB",
    "page": 266,
    "srd52": "Instant Summons",
    "basicRules2024": true,
    "level": 6,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a sapphire worth 1,000+ GP",
        "cost": 100000
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You touch the sapphire used in the casting and an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an {@condition Invisible|XPHB} mark on that object and invisibly inscribes the object's name on the sapphire. Each time you cast this spell, you must use a different sapphire.",
      "Thereafter, you can take a {@action Magic|XPHB} action to speak the object's name and crush the sapphire. The object instantly appears in your hand regardless of physical or planar distances, and the spell ends.",
      "If another creature is holding or carrying the object, crushing the sapphire doesn't transport it, but instead you learn who that creature is and where that creature is currently located."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Dream",
    "source": "XPHB",
    "page": 266,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a handful of sand"
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
      "You target a creature you know on the same plane of existence. You or a willing creature you touch enters a trance state to act as a dream messenger. While in the trance, the messenger is {@condition Incapacitated|XPHB} and has a {@variantrule Speed|XPHB} of 0.",
      "If the target is asleep, the messenger appears in the target's dreams and can converse with the target as long as it remains asleep, through the spell's duration. The messenger can also shape the dream's environment, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the spell. The target recalls the dream perfectly upon waking.",
      "If the target is awake when you cast the spell, the messenger knows it and can either end the trance (and the spell) or wait for the target to sleep, at which point the messenger enters its dreams.",
      "You can make the messenger terrifying to the target. If you do so, the messenger can deliver a message of no more than ten words, and then the target makes a Wisdom saving throw. On a failed save, the target gains no benefit from its rest, and it takes {@damage 3d6} Psychic damage when it wakes up."
    ],
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Druidcraft",
    "source": "XPHB",
    "page": 266,
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
      "v": true,
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Whispering to the spirits of nature, you create one of the following effects within range.",
      {
        "type": "entries",
        "name": "Weather Sensor",
        "entries": [
          "You create a Tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round."
        ]
      },
      {
        "type": "entries",
        "name": "Bloom",
        "entries": [
          "You instantly make a flower blossom, a seed pod open, or a leaf bud bloom."
        ]
      },
      {
        "type": "entries",
        "name": "Sensory Effect",
        "entries": [
          "You create a harmless sensory effect, such as falling leaves, spectral dancing fairies, a gentle breeze, the sound of an animal, or the faint odor of skunk. The effect must fit in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}."
        ]
      },
      {
        "type": "entries",
        "name": "Fire Play",
        "entries": [
          "You light or snuff out a candle, a torch, or a campfire."
        ]
      }
    ],
    "hasFluffImages": true
  },
  {
    "name": "Earthquake",
    "source": "XPHB",
    "page": 267,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
        "amount": 500
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a fractured rock"
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
      "Choose a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot-radius circle centered on that point. The ground there is {@variantrule Difficult Terrain|XPHB}.",
      "When you cast this spell and at the end of each of your turns for the duration, each creature on the ground in the area makes a Dexterity saving throw. On a failed save, a creature has the {@condition Prone|XPHB} condition, and its {@status Concentration|XPHB} is broken.",
      "You can also cause the effects below.",
      {
        "type": "entries",
        "name": "Fissures",
        "entries": [
          "A total of {@dice 1d6} fissures open in the spell's area at the end of the turn you cast it. You choose the fissures' locations, which can't be under structures. Each fissure is {@dice 1d10 × 10} feet deep and 10 feet wide, and it extends from one edge of the spell's area to another edge. A creature in the same space as a fissure must succeed on a Dexterity saving throw or fall in. A creature that successfully saves moves with the fissure's edge as it opens."
        ]
      },
      {
        "type": "entries",
        "name": "Structures",
        "entries": [
          "The tremor deals 50 Bludgeoning damage to any structure in contact with the ground in the area when you cast the spell and at the end of each of your turns until the spell ends. If a structure drops to 0 {@variantrule Hit Points|XPHB}, it collapses.",
          "A creature within a distance from a collapsing structure equal to half the structure's height makes a Dexterity saving throw. On a failed save, the creature takes {@damage 12d6} Bludgeoning damage, has the {@condition Prone|XPHB} condition, and is buried in the rubble, requiring a {@dc 20} Strength ({@skill Athletics|XPHB}) check as an action to escape. On a successful save, the creature takes half as much damage only."
        ]
      }
    ],
    "damageInflict": [
      "bludgeoning"
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "constitution",
      "dexterity"
    ],
    "abilityCheck": [
      "strength"
    ],
    "miscTags": [
      "DFT",
      "SGT"
    ],
    "areaTags": [
      "R"
    ]
  }
];
