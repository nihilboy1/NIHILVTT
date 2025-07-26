export const spellsPart36= [
  {
    "name": "Sorcerous Burst",
    "source": "XPHB",
    "page": 318,
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
      "You cast sorcerous energy at one creature or object within range. Make a ranged attack roll against the target. On a hit, the target takes {@damage 1d8} damage of a type you choose: Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder.",
      "If you roll an 8 on a {@dice d8} for this spell, you can roll another {@dice d8}, and add it to the damage. When you cast this spell, the maximum number of these d8s you can add to the spell's damage equals your spellcasting ability modifier."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "acid",
      "cold",
      "fire",
      "lightning",
      "poison",
      "psychic",
      "thunder"
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
    "name": "Spare the Dying",
    "source": "XPHB",
    "page": 318,
    "srd52": true,
    "basicRules2024": true,
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
      "Choose a creature within range that has 0 {@variantrule Hit Points|XPHB} and isn't dead. The creature becomes {@variantrule Stable|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The range doubles when you reach levels 5 (30 feet), 11 (60 feet), and 17 (120 feet)."
        ]
      }
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Speak with Animals",
    "source": "XPHB",
    "page": 318,
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
          "amount": 10
        }
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "For the duration, you can comprehend and verbally communicate with Beasts, and you can use any of the {@action Influence|XPHB} action's skill options with them.",
      "Most Beasts have little to say about topics that don't pertain to survival or companionship, but at minimum, a Beast can give you information about nearby locations and monsters, including whatever it has perceived within the past day."
    ],
    "affectsCreatureType": [
      "beast"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Speak with Dead",
    "source": "XPHB",
    "page": 318,
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
        "type": "feet",
        "amount": 10
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
          "type": "minute",
          "amount": 10
        }
      }
    ],
    "entries": [
      "You grant the semblance of life to a corpse of your choice within range, allowing it to answer questions you pose. The corpse must have a mouth, and this spell fails if the deceased creature was Undead when it died. The spell also fails if the corpse was the target of this spell within the past 10 days.",
      "Until the spell ends, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are antagonistic toward it or it recognizes you as an enemy. This spell doesn't return the creature's soul to its body, only its animating spirit. Thus, the corpse can't learn new information, doesn't comprehend anything that has happened since it died, and can't speculate about future events."
    ],
    "affectsCreatureType": [
      "aberration",
      "beast",
      "celestial",
      "construct",
      "dragon",
      "elemental",
      "fey",
      "fiend",
      "giant",
      "humanoid",
      "monstrosity",
      "ooze",
      "plant"
    ]
  },
  {
    "name": "Speak with Plants",
    "source": "XPHB",
    "page": 319,
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
      "type": "emanation",
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
        }
      }
    ],
    "entries": [
      "You imbue plants in an immobile 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances.",
      "You can also turn {@variantrule Difficult Terrain|XPHB} caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into {@variantrule Difficult Terrain|XPHB} that lasts for the duration.",
      "The spell doesn't enable plants to uproot themselves and move about, but they can move their branches, tendrils, and stalks for you.",
      "If a Plant creature is in the area, you can communicate with it as if you shared a common language."
    ],
    "affectsCreatureType": [
      "plant"
    ],
    "miscTags": [
      "DFT"
    ]
  },
  {
    "name": "Spider Climb",
    "source": "XPHB",
    "page": 319,
    "srd52": true,
    "basicRules2024": true,
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
      "m": "a drop of bitumen and a spider"
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
      "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and along ceilings, while leaving its hands free. The target also gains a {@variantrule Climb Speed|XPHB} equal to its {@variantrule Speed|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 2."
        ]
      }
    ],
    "miscTags": [
      "SCT"
    ]
  },
  {
    "name": "Spike Growth",
    "source": "XPHB",
    "page": 319,
    "srd52": true,
    "basicRules2024": true,
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
        "type": "feet",
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "seven thorns"
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
      "The ground in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range sprouts hard spikes and thorns. The area becomes {@variantrule Difficult Terrain|XPHB} for the duration. When a creature moves into or within the area, it takes {@damage 2d4} Piercing damage for every 5 feet it travels.",
      "The transformation of the ground is camouflaged to look natural. Any creature that can't see the area when the spell is cast must take a {@action Search|XPHB} action and succeed on a Wisdom ({@skill Perception|XPHB} or {@skill Survival|XPHB}) check against your spell save DC to recognize the terrain as hazardous before entering it."
    ],
    "damageInflict": [
      "piercing"
    ],
    "abilityCheck": [
      "wisdom"
    ],
    "miscTags": [
      "DFT"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Spirit Guardians",
    "source": "XPHB",
    "page": 319,
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
      "type": "emanation",
      "distance": {
        "type": "feet",
        "amount": 15
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a prayer scroll"
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
      "Protective spirits flit around you in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice). If you are evil, they appear fiendish.",
      "When you cast this spell, you can designate creatures to be unaffected by it. Any other creature's {@variantrule Speed|XPHB} is halved in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation}, and whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters a creature's space and whenever a creature enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, the creature must make a Wisdom saving throw. On a failed save, the creature takes {@damage 3d8} Radiant damage (if you are good or neutral) or {@damage 3d8} Necrotic damage (if you are evil). On a successful save, the creature takes half as much damage. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d8|3-9|1d8} for each spell slot level above 3."
        ]
      }
    ],
    "damageInflict": [
      "necrotic",
      "radiant"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Spiritual Weapon",
    "source": "XPHB",
    "page": 319,
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
      "You create a floating, spectral force that resembles a weapon of your choice and lasts for the duration. The force appears within range in a space of your choice, and you can immediately make one melee spell attack against one creature within 5 feet of the force. On a hit, the target takes Force damage equal to {@damage 1d8} plus your spellcasting ability modifier.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can move the force up to 20 feet and repeat the attack against a creature within 5 feet of it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 1d8|2-9|1d8} for every slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "UBA"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  }
];
