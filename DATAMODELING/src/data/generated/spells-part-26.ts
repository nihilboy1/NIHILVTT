export const spellsPart26= [
  {
    "name": "Mass Heal",
    "source": "XPHB",
    "page": 296,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "A flood of healing energy flows from you into creatures around you. You restore up to 700 {@variantrule Hit Points|XPHB}, divided as you choose among any number of creatures that you can see within range. Creatures healed by this spell also have the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Poisoned|XPHB} conditions removed from them."
    ],
    "miscTags": [
      "HL",
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Mass Healing Word",
    "source": "XPHB",
    "page": 296,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "A",
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
      "v": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Up to six creatures of your choice that you can see within range regain {@variantrule Hit Points|XPHB} equal to {@dice 2d4} plus your spellcasting ability modifier."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 2d4|3-9|1d4} for each spell slot level above 3."
        ]
      }
    ],
    "miscTags": [
      "HL",
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Mass Suggestion",
    "source": "XPHB",
    "page": 296,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
      "m": "a snake's tongue"
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
      "You suggest a course of activity—described in no more than 25 words—to twelve or fewer creatures you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to any of the targets or their allies. For example, you could say, \"Walk to the village down that road, and help the villagers there harvest crops until sunset.\" Or you could say, \"Now is not the time for violence. Drop your weapons, and dance! Stop in an hour.\"",
      "Each target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration or until you or your allies deal damage to the target. Each {@condition Charmed|XPHB} target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for a target upon completing it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The duration is longer with a spell slot of level 7 (10 days), 8 (30 days), or 9 (366 days)."
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
      "MT"
    ]
  },
  {
    "name": "Maze",
    "source": "XPHB",
    "page": 296,
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
      "You banish a creature that you can see within range into a labyrinthine demiplane. The target remains there for the duration or until it escapes the maze.",
      "The target can take a {@action Study|XPHB} action to try to escape. When it does so, it makes a {@dc 20} Intelligence ({@skill Investigation|XPHB}) check. If it succeeds, it escapes, and the spell ends.",
      "When the spell ends, the target reappears in the space it left or, if that space is occupied, in the nearest unoccupied space."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Meld into Stone",
    "source": "XPHB",
    "page": 296,
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You step into a stone object or surface large enough to fully contain your body, merging yourself and your equipment with the stone for the duration. You must touch the stone to do so. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.",
      "While merged with the stone, you can't see what occurs outside it, and any Wisdom ({@skill Perception|XPHB}) checks you make to hear sounds outside it are made with {@variantrule Disadvantage|XPHB}. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use 5 feet of movement to leave the stone where you entered it, which ends the spell. You otherwise can't move.",
      "Minor physical damage to the stone doesn't harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals {@damage 6d6} Force damage to you. The stone's complete destruction (or transmutation into a different substance) expels you and deals 50 Force damage to you. If expelled, you move into an unoccupied space closest to where you first entered and have the {@condition Prone|XPHB} condition."
    ],
    "damageInflict": [
      "force"
    ],
    "conditionInflict": [
      "prone"
    ]
  },
  {
    "name": "Melf's Acid Arrow",
    "source": "XPHB",
    "page": 297,
    "srd52": "Acid Arrow",
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
        "type": "feet",
        "amount": 90
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "powdered rhubarb leaf"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes {@damage 4d4} Acid damage and {@damage 2d4} Acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage only."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage (both initial and later) increases by {@scaledamage 4d4;2d4|2-9|1d4} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "acid"
    ],
    "spellAttack": [
      "R"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Mending",
    "source": "XPHB",
    "page": 297,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
    "school": "T",
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
      "m": "two lodestones"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.",
      "This spell can physically repair a magic item, but it can't restore magic to such an object."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Message",
    "source": "XPHB",
    "page": 298,
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
        "amount": 120
      }
    },
    "components": {
      "s": true,
      "m": "a copper wire"
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
      "You point toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.",
      "You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence; 1 foot of stone, metal, or wood; or a thin sheet of lead blocks the spell."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Meteor Swarm",
    "source": "XPHB",
    "page": 298,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
        "type": "instant"
      }
    ],
    "entries": [
      "Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on each of those points makes a Dexterity saving throw. A creature takes {@damage 20d6} Fire damage and {@damage 20d6} Bludgeoning damage on a failed save or half as much damage on a successful one. A creature in the area of more than one fiery {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is affected only once.",
      "A nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area, and the object starts {@hazard burning|XPHB} if it's flammable."
    ],
    "damageInflict": [
      "bludgeoning",
      "fire"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "areaTags": [
      "S"
    ]
  }
];
