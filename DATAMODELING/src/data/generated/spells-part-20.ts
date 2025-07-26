export const spellsPart20= [
  {
    "name": "Guidance",
    "source": "XPHB",
    "page": 282,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You touch a willing creature and choose a skill. Until the spell ends, the creature adds {@dice 1d4} to any ability check using the chosen skill."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Guiding Bolt",
    "source": "XPHB",
    "page": 282,
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
          "type": "round",
          "amount": 1
        }
      }
    ],
    "entries": [
      "You hurl a bolt of light toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes {@damage 4d6} Radiant damage, and the next attack roll made against it before the end of your next turn has {@variantrule Advantage|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 4d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Gust of Wind",
    "source": "XPHB",
    "page": 282,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a legume seed"
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
      "A {@variantrule Line [Area of Effect]|XPHB|Line} of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the duration. Each creature in the {@variantrule Line [Area of Effect]|XPHB|Line} must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the {@variantrule Line [Area of Effect]|XPHB|Line}. A creature that ends its turn in the {@variantrule Line [Area of Effect]|XPHB|Line} must make the same save.",
      "Any creature in the {@variantrule Line [Area of Effect]|XPHB|Line} must spend 2 feet of movement for every 1 foot it moves when moving closer to you.",
      "The gust disperses gas or vapor, and it extinguishes candles and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a {@chance 50|||Extinguished!|No effect} chance to extinguish them.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can change the direction in which the {@variantrule Line [Area of Effect]|XPHB|Line} blasts from you."
    ],
    "savingThrow": [
      "strength"
    ],
    "miscTags": [
      "FMV",
      "UBA"
    ],
    "areaTags": [
      "L"
    ]
  },
  {
    "name": "Hail of Thorns",
    "source": "XPHB",
    "page": 283,
    "level": 1,
    "school": "C",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a creature with a Ranged weapon"
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
      "As you hit the creature, this spell creates a rain of thorns that sprouts from your Ranged weapon or ammunition. The target of the attack and each creature within 5 feet of it make a Dexterity saving throw, taking {@damage 1d10} Piercing damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 1d10|1-9|1d10} for each spell slot level above 1."
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
    "name": "Hallow",
    "source": "XPHB",
    "page": 283,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "A",
    "time": [
      {
        "number": 24,
        "unit": "hour"
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
        "text": "incense worth 1,000+ GP, which the spell consumes",
        "cost": 100000,
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
      "You touch a point and infuse an area around it with holy or unholy power. The area can have a radius up to 60 feet, and the spell fails if the radius includes an area already under the effect of Hallow. The affected area has the following effects.",
      {
        "type": "entries",
        "name": "Hallowed Ward",
        "entries": [
          "Choose any of these creature types: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Creatures of the chosen types can't willingly enter the area, and any creature that is possessed by or that has the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from such creatures isn't possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by them while in the area."
        ]
      },
      {
        "type": "entries",
        "name": "Extra Effect",
        "entries": [
          "You bind an extra effect to the area from the list below:",
          {
            "type": "list",
            "style": "list-hang-notitle",
            "items": [
              {
                "type": "item",
                "name": "Courage",
                "entries": [
                  "Creatures of any types you choose can't gain the {@condition Frightened|XPHB} condition while in the area."
                ]
              },
              {
                "type": "item",
                "name": "Darkness",
                "entries": [
                  "{@variantrule Darkness|XPHB} fills the area. Normal light, as well as magical light created by spells of a level lower than this spell, can't illuminate the area."
                ]
              },
              {
                "type": "item",
                "name": "Daylight",
                "entries": [
                  "Bright light fills the area. Magical {@variantrule Darkness|XPHB} created by spells of a level lower than this spell can't extinguish the light."
                ]
              },
              {
                "type": "item",
                "name": "Peaceful Rest",
                "entries": [
                  "{@variantrule Dead|XPHB} bodies interred in the area can't be turned into Undead."
                ]
              },
              {
                "type": "item",
                "name": "Extradimensional Interference",
                "entries": [
                  "Creatures of any types you choose can't enter or exit the area using teleportation or interplanar travel."
                ]
              },
              {
                "type": "item",
                "name": "Fear",
                "entries": [
                  "Creatures of any types you choose have the {@condition Frightened|XPHB} condition while in the area."
                ]
              },
              {
                "type": "item",
                "name": "Resistance",
                "entries": [
                  "Creatures of any types you choose have {@variantrule Resistance|XPHB} to one damage type of your choice while in the area."
                ]
              },
              {
                "type": "item",
                "name": "Silence",
                "entries": [
                  "No sound can emanate from within the area, and no sound can reach into it."
                ]
              },
              {
                "type": "item",
                "name": "Tongues",
                "entries": [
                  "Creatures of any types you choose can communicate with any other creature in the area even if they don't share a common language."
                ]
              },
              {
                "type": "item",
                "name": "Vulnerability",
                "entries": [
                  "Creatures of any types you choose have {@variantrule Vulnerability|XPHB} to one damage type of your choice while in the area."
                ]
              }
            ]
          }
        ]
      }
    ],
    "damageResist": [
      "acid",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "poison",
      "psychic",
      "radiant",
      "thunder"
    ],
    "damageVulnerable": [
      "acid",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "poison",
      "psychic",
      "radiant",
      "thunder"
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
      "LGT"
    ]
  },
  {
    "name": "Hallucinatory Terrain",
    "source": "XPHB",
    "page": 283,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
        "type": "feet",
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a mushroom"
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
      "You make natural terrain in a 150-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} in range look, sound, and smell like another sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren't changed.",
      "The tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to notice the illusion. If the difference isn't obvious by touch, a creature examining the illusion can take the {@action Study|XPHB} action to make an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC to disbelieve it. If a creature discerns that the terrain is illusory, the creature sees a vague image superimposed on the real terrain."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Harm",
    "source": "XPHB",
    "page": 283,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
      "You unleash virulent magic on a creature you can see within range. The target makes a Constitution saving throw. On a failed save, it takes {@damage 14d6} Necrotic damage, and its {@variantrule Hit Points|XPHB|Hit Point} maximum is reduced by an amount equal to the Necrotic damage it took. On a successful save, it takes half as much damage only. This spell can't reduce a target's {@variantrule Hit Points|XPHB|Hit Point} maximum below 1."
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Haste",
    "source": "XPHB",
    "page": 284,
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
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a shaving of licorice root"
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
      "Choose a willing creature that you can see within range. Until the spell ends, the target's {@variantrule Speed|XPHB} is doubled, it gains a +2 bonus to {@variantrule Armor Class|XPHB}, it has {@variantrule Advantage|XPHB} on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used to take only the {@action Attack|XPHB} (one attack only), {@action Dash|XPHB}, {@action Disengage|XPHB}, {@action Hide|XPHB}, or {@action Utilize|XPHB} action.",
      "When the spell ends, the target is {@condition Incapacitated|XPHB} and has a {@variantrule Speed|XPHB} of 0 until the end of its next turn, as a wave of lethargy washes over it."
    ],
    "conditionInflict": [
      "incapacitated"
    ],
    "miscTags": [
      "ADV",
      "MAC",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Heal",
    "source": "XPHB",
    "page": 284,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
      "Choose a creature that you can see within range. Positive energy washes through the target, restoring 70 {@variantrule Hit Points|XPHB}. This spell also ends the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Poisoned|XPHB} conditions on the target."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 70|6-9|10} for each spell slot level above 6."
        ]
      }
    ],
    "miscTags": [
      "HL",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
