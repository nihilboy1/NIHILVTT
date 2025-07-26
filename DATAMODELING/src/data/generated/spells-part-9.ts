export const spellsPart9= [
  {
    "name": "Contact Other Plane",
    "source": "XPHB",
    "page": 255,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You mentally contact a demigod, the spirit of a long-dead sage, or some other knowledgeable entity from another plane. Contacting this otherworldly intelligence can break your mind. When you cast this spell, make a {@dc 15} Intelligence saving throw. On a successful save, you can ask the entity up to five questions. You must ask your questions before the spell ends. The DM answers each question with one word, such as \"yes,\" \"no,\" \"maybe,\" \"never,\" \"irrelevant,\" or \"unclear\" (if the entity doesn't know the answer to the question). If a one-word answer would be misleading, the DM might instead offer a short phrase as an answer.",
      "On a failed save, you take {@damage 6d6} Psychic damage and have the {@condition Incapacitated|XPHB} condition until you finish a {@variantrule Long Rest|XPHB}. A {@spell Greater Restoration|XPHB} spell cast on you ends this effect."
    ],
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "intelligence"
    ]
  },
  {
    "name": "Contagion",
    "source": "XPHB",
    "page": 256,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
          "type": "day",
          "amount": 7
        }
      }
    ],
    "entries": [
      "Your touch inflicts a magical contagion. The target must succeed on a Constitution saving throw or take {@damage 11d8} Necrotic damage and have the {@condition Poisoned|XPHB} condition. Also, choose one ability when you cast the spell. While {@condition Poisoned|XPHB}, the target has {@variantrule Disadvantage|XPHB} on saving throws made with the chosen ability.",
      "The target must repeat the saving throw at the end of each of its turns until it gets three successes or failures. If the target succeeds on three of these saves, the spell ends on the target. If the target fails three of the saves, the spell lasts for 7 days on it.",
      "Whenever the {@condition Poisoned|XPHB} target receives an effect that would end the {@condition Poisoned|XPHB} condition, the target must succeed on a Constitution saving throw, or the {@condition Poisoned|XPHB} condition doesn't end on it."
    ],
    "damageInflict": [
      "necrotic"
    ],
    "conditionInflict": [
      "poisoned"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Contingency",
    "source": "XPHB",
    "page": 256,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a gem-encrusted statuette of yourself worth 1,500+ GP",
        "cost": 150000
      }
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
      "Choose a spell of level 5 or lower that you can cast, that has a casting time of an action, and that can target you. You cast that spell—called the contingent spell—as part of casting Contingency, expending spell slots for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain trigger occurs. You describe that trigger when you cast the two spells. For example, a Contingency cast with {@spell Water Breathing|XPHB} might stipulate that Water Breathing comes into effect when you are engulfed in water or a similar liquid.",
      "The contingent spell takes effect immediately after the trigger occurs for the first time, whether or not you want it to, and then Contingency ends.",
      "The contingent spell takes effect only on you, even if it can normally target others. You can use only one Contingency spell at a time. If you cast this spell again, the effect of another Contingency spell on you ends. Also, Contingency ends on you if its material component is ever not on your person."
    ]
  },
  {
    "name": "Continual Flame",
    "source": "XPHB",
    "page": 256,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "ruby dust worth 50+ GP, which the spell consumes",
        "cost": 5000,
        "consume": true
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
    "entries": [
      "A flame springs from an object that you touch. The effect casts {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. It looks like a regular flame, but it creates no heat and consumes no fuel. The flame can be covered or hidden but not smothered or quenched."
    ],
    "miscTags": [
      "LGT",
      "OBJ"
    ]
  },
  {
    "name": "Control Water",
    "source": "XPHB",
    "page": 256,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a mixture of water and dust"
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
      "Until the spell ends, you control any water inside an area you choose that is a {@variantrule Cube [Area of Effect]|XPHB|Cube} up to 100 feet on a side, using one of the following effects. As a {@action Magic|XPHB} action on your later turns, you can repeat the same effect or choose a different one.",
      {
        "type": "entries",
        "name": "Flood",
        "entries": [
          "You cause the water level of all standing water in the area to rise by as much as 20 feet. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a {@chance 25|||Capsizes!|No effect} chance of capsizing.",
          "The water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts."
        ]
      },
      {
        "type": "entries",
        "name": "Part Water",
        "entries": [
          "You part water in the area and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored."
        ]
      },
      {
        "type": "entries",
        "name": "Redirect Flow",
        "entries": [
          "You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell's area, it resumes its flow based on the terrain. The water continues to move in the direction you chose until the spell ends or you choose a different effect."
        ]
      },
      {
        "type": "entries",
        "name": "Whirlpool",
        "entries": [
          "You cause a whirlpool to form in the center of the area, which must be at least 50 feet square and 25 feet deep. The whirlpool lasts until you choose a different effect or the spell ends. The whirlpool is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature in the water and within 25 feet of the whirlpool is pulled 10 feet toward it. When a creature enters the whirlpool for the first time on a turn or ends its turn there, it makes a Strength saving throw. On a failed save, the creature takes {@damage 2d8} Bludgeoning damage. On a successful save, the creature takes half as much damage. A creature can swim away from the whirlpool only if it first takes an action to pull away and succeeds on a Strength ({@skill Athletics|XPHB}) check against your spell save DC."
        ]
      }
    ],
    "damageInflict": [
      "bludgeoning"
    ],
    "savingThrow": [
      "strength"
    ],
    "abilityCheck": [
      "strength"
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
    "name": "Control Weather",
    "source": "XPHB",
    "page": 257,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
    "school": "T",
    "time": [
      {
        "number": 10,
        "unit": "minute"
      }
    ],
    "range": {
      "type": "sphere",
      "distance": {
        "type": "miles",
        "amount": 5
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "burning incense"
    },
    "duration": [
      {
        "type": "timed",
        "duration": {
          "type": "hour",
          "amount": 8
        },
        "concentration": true
      }
    ],
    "entries": [
      "You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell, and it ends early if you go indoors.",
      "When you cast the spell, you change the current weather conditions, which are determined by the DM. You can change precipitation, temperature, and wind. It takes {@dice 1d4 × 10} minutes for the new conditions to take effect. Once they do so, you can change the conditions again. When the spell ends, the weather gradually returns to normal.",
      "When you change the weather conditions, find a current condition on the following tables and change its stage by one, up or down. When changing the wind, you can change its direction.",
      {
        "type": "table",
        "caption": "Precipitation",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "Stage",
          "Condition"
        ],
        "rows": [
          [
            "1",
            "Clear"
          ],
          [
            "2",
            "Light clouds"
          ],
          [
            "3",
            "Overcast or ground fog"
          ],
          [
            "4",
            "Rain, hail, or snow"
          ],
          [
            "5",
            "Torrential rain, driving hail, or blizzard"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Temperature",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "Stage",
          "Condition"
        ],
        "rows": [
          [
            "1",
            "Heat wave"
          ],
          [
            "2",
            "Hot"
          ],
          [
            "3",
            "Warm"
          ],
          [
            "4",
            "Cool"
          ],
          [
            "5",
            "Cold"
          ],
          [
            "6",
            "Freezing"
          ]
        ]
      },
      {
        "type": "table",
        "caption": "Wind",
        "colStyles": [
          "col-2 text-center",
          "col-10"
        ],
        "colLabels": [
          "Stage",
          "Condition"
        ],
        "rows": [
          [
            "1",
            "Calm"
          ],
          [
            "2",
            "Moderate wind"
          ],
          [
            "3",
            "Strong wind"
          ],
          [
            "4",
            "Gale"
          ],
          [
            "5",
            "Storm"
          ]
        ]
      }
    ],
    "hasFluffImages": true
  },
  {
    "name": "Cordon of Arrows",
    "source": "XPHB",
    "page": 258,
    "level": 2,
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
      "m": "four or more arrows or bolts"
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
      "You touch up to four nonmagical Arrows or Bolts and plant them in the ground in your space. Until the spell ends, the ammunition can't be physically uprooted, and whenever a creature other than you enters a space within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take {@damage 2d4} Piercing damage. The piece of ammunition is then destroyed. The spell ends when none of the ammunition remains planted in the ground.",
      "When you cast this spell, you can designate any creatures you choose, and the spell ignores them."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The amount of ammunition that can be affected increases by two for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "piercing"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Counterspell",
    "source": "XPHB",
    "page": 258,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "A",
    "time": [
      {
        "number": 1,
        "unit": "reaction",
        "condition": "which you take when you see a creature within 60 feet of yourself casting a spell with Verbal, Somatic, or Material components"
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
        "type": "instant"
      }
    ],
    "entries": [
      "You attempt to interrupt a creature in the process of casting a spell. The creature makes a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, {@variantrule Bonus Action|XPHB}, or {@variantrule Reaction|XPHB} used to cast it is wasted. If that spell was cast with a spell slot, the slot isn't expended."
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Create Food and Water",
    "source": "XPHB",
    "page": 258,
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
      "You create 45 pounds of food and 30 gallons of fresh water on the ground or in containers within range—both useful in fending off the hazards of malnutrition and dehydration. The food is bland but nourishing and looks like a food of your choice, and the water is clean. The food spoils after 24 hours if uneaten."
    ]
  }
];
