export const spellsPart37= [
  {
    "name": "Staggering Smite",
    "source": "XPHB",
    "page": 320,
    "level": 4,
    "school": "E",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a creature with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
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
      "The target takes an extra {@damage 4d6} Psychic damage from the attack, and the target must succeed on a Wisdom saving throw or have the {@condition Stunned|XPHB} condition until the end of your next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The extra damage increases by {@scaledamage 4d6|4-9|1d6} for each spell slot level above 4."
        ]
      }
    ],
    "damageInflict": [
      "psychic"
    ],
    "conditionInflict": [
      "stunned"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Starry Wisp",
    "source": "XPHB",
    "page": 320,
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
      "You launch a mote of light at one creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d8} Radiant damage, and until the end of your next turn, it emits {@variantrule Dim Light|XPHB} in a 10-foot radius and can't benefit from the {@condition Invisible|XPHB} condition."
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
      "label": "Radiant damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "radiant"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "LGT",
      "OBJ",
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Steel Wind Strike",
    "source": "XPHB",
    "page": 320,
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
        "amount": 30
      }
    },
    "components": {
      "s": true,
      "m": {
        "text": "a Melee weapon worth 1+ SP",
        "cost": 10
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You flourish the weapon used in the casting and then vanish to strike like the wind. Choose up to five creatures you can see within range. Make a melee spell attack against each target. On a hit, a target takes {@damage 6d10} Force damage.",
      "You then teleport to an unoccupied space you can see within 5 feet of one of the targets."
    ],
    "damageInflict": [
      "force"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "SGT",
      "TP"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Stinking Cloud",
    "source": "XPHB",
    "page": 321,
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
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a rotten egg"
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
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of yellow, nauseating gas centered on a point within range. The cloud is {@variantrule Heavily Obscured|XPHB}. The cloud lingers in the air for the duration or until a strong wind (such as the one created by {@spell Gust of Wind|XPHB}) disperses it.",
      "Each creature that starts its turn in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} must succeed on a Constitution saving throw or have the {@condition Poisoned|XPHB} condition until the end of the current turn. While {@condition Poisoned|XPHB} in this way, the creature can't take an action or a {@variantrule Bonus Action|XPHB}."
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "OBS"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Stone Shape",
    "source": "XPHB",
    "page": 321,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "soft clay"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape you like. For example, you could shape a large rock into a weapon, statue, or coffer, or you could make a small passage through a wall that is 5 feet thick. You could also shape a stone door or its frame to seal the door shut. The object you create can have up to two hinges and a latch, but finer mechanical detail isn't possible."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Stoneskin",
    "source": "XPHB",
    "page": 321,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "diamond dust worth 100+ GP, which the spell consumes",
        "cost": 10000,
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
      "Until the spell ends, one willing creature you touch has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage."
    ],
    "damageResist": [
      "bludgeoning",
      "piercing",
      "slashing"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Storm of Vengeance",
    "source": "XPHB",
    "page": 321,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
        "type": "miles",
        "amount": 1
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
      "A churning storm cloud forms for the duration, centered on a point within range and spreading to a radius of 300 feet. Each creature under the cloud when it appears must succeed on a Constitution saving throw or take {@damage 2d6} Thunder damage and have the {@condition Deafened|XPHB} condition for the duration.",
      "At the start of each of your later turns, the storm produces different effects, as detailed below.",
      {
        "type": "entries",
        "name": "Turn 2",
        "entries": [
          "Acidic rain falls. Each creature and object under the cloud takes {@damage 4d6} Acid damage."
        ]
      },
      {
        "type": "entries",
        "name": "Turn 3",
        "entries": [
          "You call six bolts of lightning from the cloud to strike six different creatures or objects beneath it. Each target makes a Dexterity saving throw, taking {@damage 10d6} Lightning damage on a failed save or half as much damage on a successful one."
        ]
      },
      {
        "type": "entries",
        "name": "Turn 4",
        "entries": [
          "Hailstones rain down. Each creature under the cloud takes {@damage 2d6} Bludgeoning damage."
        ]
      },
      {
        "type": "entries",
        "name": "Turns 5-10",
        "entries": [
          "Gusts and freezing rain assail the area under the cloud. Each creature there takes {@damage 1d6} Cold damage. Until the spell ends, the area is {@variantrule Difficult Terrain|XPHB} and {@variantrule Heavily Obscured|XPHB}, ranged attacks with weapons are impossible there, and strong wind blows through the area."
        ]
      }
    ],
    "damageInflict": [
      "acid",
      "bludgeoning",
      "cold",
      "lightning",
      "thunder"
    ],
    "conditionInflict": [
      "deafened"
    ],
    "savingThrow": [
      "constitution",
      "dexterity"
    ],
    "miscTags": [
      "DFT",
      "OBJ",
      "OBS"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Suggestion",
    "source": "XPHB",
    "page": 321,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "m": "a drop of honey"
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
      "You suggest a course of activity—described in no more than 25 words—to one creature you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to the target or its allies. For example, you could say, \"Fetch the key to the cult's treasure vault, and give the key to me.\" Or you could say, \"Stop fighting, leave this library peacefully, and don't return.\"",
      "The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration or until you or your allies deal damage to the target. The {@condition Charmed|XPHB} target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for the target upon completing it."
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
    "name": "Summon Aberration",
    "source": "XPHB",
    "page": 322,
    "level": 4,
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
      "s": true,
      "m": {
        "text": "a pickled tentacle and an eyeball in a platinum-inlaid vial worth 400+ GP",
        "cost": 40000
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
      "You call forth an aberrant spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Aberrant Spirit|XPHB} stat block. When you cast the spell, choose Beholderkin, Mind Flayer, or Slaad. The creature resembles an Aberration of that kind, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
      "The creature is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the {@action Dodge|XPHB} action and uses its movement to avoid danger."
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
      "SGT",
      "SMN"
    ],
    "hasFluffImages": true
  }
];
