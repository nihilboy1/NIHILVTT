export const spellsPart7= [
  {
    "name": "Cloudkill",
    "source": "XPHB",
    "page": 251,
    "srd52": true,
    "basicRules2024": true,
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
          "type": "minute",
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of yellow-green fog centered on a point within range. The fog lasts for the duration or until strong wind (such as the one created by {@spell Gust of Wind|XPHB}) disperses it, ending the spell. Its area is {@variantrule Heavily Obscured|XPHB}.",
      "Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} makes a Constitution saving throw, taking {@damage 5d8} Poison damage on a failed save or half as much damage on a successful one. A creature must also make this save when the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves into its space and when it enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} or ends its turn there. A creature makes this save only once per turn.",
      "The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves 10 feet away from you at the start of each of your turns."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 5d8|5-9|1d8} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "poison"
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
    "name": "Color Spray",
    "source": "XPHB",
    "page": 251,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "I",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "cone",
      "distance": {
        "type": "feet",
        "amount": 15
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pinch of colorful sand"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You launch a dazzling array of flashing, colorful light. Each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} originating from you must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition until the end of your next turn."
    ],
    "conditionInflict": [
      "blinded"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "N"
    ]
  },
  {
    "name": "Command",
    "source": "XPHB",
    "page": 251,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. Choose the command from these options:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Approach",
            "entries": [
              "The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you."
            ]
          },
          {
            "type": "item",
            "name": "Drop",
            "entries": [
              "The target drops whatever it is holding and then ends its turn."
            ]
          },
          {
            "type": "item",
            "name": "Flee",
            "entries": [
              "The target spends its turn moving away from you by the fastest available means."
            ]
          },
          {
            "type": "item",
            "name": "Grovel",
            "entries": [
              "The target has the {@condition Prone|XPHB} condition and then ends its turn."
            ]
          },
          {
            "type": "item",
            "name": "Halt",
            "entries": [
              "On its turn, the target doesn't move and takes no action or {@variantrule Bonus Action|XPHB}."
            ]
          }
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can affect one additional creature for each spell slot level above 1."
        ]
      }
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Commune",
    "source": "XPHB",
    "page": 251,
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
      "v": true,
      "s": true,
      "m": "incense"
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
      "You contact a deity or a divine proxy and ask up to three questions that can be answered with yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question.",
      "Divine beings aren't necessarily omniscient, so you might receive \"unclear\" as an answer if a question pertains to information that lies beyond the deity's knowledge. In a case where a one-word answer could be misleading or contrary to the deity's interests, the DM might offer a short phrase as an answer instead.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||No answer!|Answer} chance for each casting after the first that you get no answer."
    ]
  },
  {
    "name": "Commune with Nature",
    "source": "XPHB",
    "page": 252,
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You commune with nature spirits and gain knowledge of the surrounding area. In the outdoors, the spell gives you knowledge of the area within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by construction, such as in castles and settlements.",
      "Choose three of the following facts; you learn those facts as they pertain to the spell's area:",
      {
        "type": "list",
        "items": [
          "Locations of settlements",
          "Locations of portals to other planes of existence",
          "Location of one {@variantrule Challenge Rating|XPHB} 10+ creature (DM's choice) that is a Celestial, an Elemental, a Fey, a Fiend, or an Undead",
          "The most prevalent kind of plant, mineral, or Beast (you choose which to learn)",
          "Locations of bodies of water"
        ]
      },
      "For example, you could determine the location of a powerful monster in the area, the locations of bodies of water, and the locations of any towns."
    ]
  },
  {
    "name": "Compelled Duel",
    "source": "XPHB",
    "page": 252,
    "level": 1,
    "school": "E",
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
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You try to compel a creature into a duel. One creature that you can see within range makes a Wisdom saving throw. On a failed save, the target has {@variantrule Disadvantage|XPHB} on attack rolls against creatures other than you, and it can't willingly move to a space that is more than 30 feet away from you.",
      "The spell ends if you make an attack roll against a creature other than the target, if you cast a spell on an enemy other than the target, if an ally of yours damages the target, or if you end your turn more than 30 feet away from the target."
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
    "name": "Comprehend Languages",
    "source": "XPHB",
    "page": 252,
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
      "s": true,
      "m": "a pinch of soot and salt"
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
      "For the duration, you understand the literal meaning of any language that you hear or see signed. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text. This spell doesn't decode symbols or secret messages."
    ]
  },
  {
    "name": "Compulsion",
    "source": "XPHB",
    "page": 252,
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
      "Each creature of your choice that you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition until the spell ends.",
      "For the duration, you can take a {@variantrule Bonus Action|XPHB} to designate a direction that is horizontal to you. Each {@condition Charmed|XPHB} target must use as much of its movement as possible to move in that direction on its next turn, taking the safest route. After moving in this way, a target repeats the save, ending the spell on itself on a success."
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "SGT",
      "UBA"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Cone of Cold",
    "source": "XPHB",
    "page": 253,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "action"
      }
    ],
    "range": {
      "type": "cone",
      "distance": {
        "type": "feet",
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a small crystal or glass cone"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You unleash a blast of cold air. Each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} originating from you makes a Constitution saving throw, taking {@damage 8d8} Cold damage on a failed save or half as much damage on a successful one. A creature killed by this spell becomes a frozen statue until it thaws."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 8d8|5-9|1d8} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "cold"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "N"
    ],
    "hasFluffImages": true
  }
];
