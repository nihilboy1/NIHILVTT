export const spellsPart30= [
  {
    "name": "Plane Shift",
    "source": "XPHB",
    "page": 305,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a forked, metal rod worth 250+ GP and attuned to a plane of existence",
        "cost": 25000
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination, as determined by the DM.",
      "Alternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the creatures you transported, they appear in the closest unoccupied spaces next to the circle."
    ],
    "miscTags": [
      "PS",
      "TP"
    ]
  },
  {
    "name": "Plant Growth",
    "source": "XPHB",
    "page": 305,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "T",
    "time": [
      {
        "number": 1,
        "unit": "action",
        "note": "Overgrowth"
      },
      {
        "number": 8,
        "unit": "hour",
        "note": "Enrichment"
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
      "This spell channels vitality into plants. The casting time you use determines whether the spell has the Overgrowth or the Enrichment effect below.",
      {
        "type": "entries",
        "name": "Overgrowth",
        "entries": [
          "Choose a point within range. All normal plants in a 100-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point become thick and overgrown. A creature moving through that area must spend 4 feet of movement for every 1 foot it moves. You can exclude one or more areas of any size within the spell's area from being affected."
        ]
      },
      {
        "type": "entries",
        "name": "Enrichment",
        "entries": [
          "All plants in a half-mile radius centered on a point within range become enriched for 365 days. The plants yield twice the normal amount of food when harvested. They can benefit from only one Plant Growth per year."
        ]
      }
    ],
    "miscTags": [
      "DFT"
    ]
  },
  {
    "name": "Poison Spray",
    "source": "XPHB",
    "page": 306,
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
      "You spray toxic mist at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d12} Poison damage."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d12} when you reach levels 5 ({@damage 2d12}), 11 ({@damage 3d12}), and 17 ({@damage 4d12})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Poison damage",
      "scaling": {
        "1": "1d12",
        "5": "2d12",
        "11": "3d12",
        "17": "4d12"
      }
    },
    "damageInflict": [
      "poison"
    ],
    "spellAttack": [
      "R"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Polymorph",
    "source": "XPHB",
    "page": 306,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a caterpillar cocoon"
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
      "You attempt to transform a creature that you can see within range into a Beast. The target must succeed on a Wisdom saving throw or shape-shift into Beast form for the duration. That form can be any {@filter Beast|bestiary|type=beast|miscellaneous=!swarm} you choose that has a {@variantrule Challenge Rating|XPHB} equal to or less than the target's (or the target's level if it doesn't have a {@variantrule Challenge Rating|XPHB}). The target's game statistics are replaced by the stat block of the chosen Beast, but the target retains its alignment, personality, creature type, {@variantrule Hit Points|XPHB}, and {@variantrule Hit Point Dice|XPHB}.",
      "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the Beast form. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The spell ends early on the target if it has no {@variantrule Temporary Hit Points|XPHB} left.",
      "The target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.",
      "The target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment."
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
    "name": "Power Word Fortify",
    "source": "XPHB",
    "page": 306,
    "level": 7,
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
      "You fortify up to six creatures you can see within range. The spell bestows 120 {@variantrule Temporary Hit Points|XPHB}, which you divide among the spell's recipients."
    ],
    "miscTags": [
      "SGT",
      "THP"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Power Word Heal",
    "source": "XPHB",
    "page": 306,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
        "type": "instant"
      }
    ],
    "entries": [
      "A wave of healing energy washes over one creature you can see within range. The target regains all its {@variantrule Hit Points|XPHB}. If the creature has the {@condition Charmed|XPHB}, {@condition Frightened|XPHB}, {@condition Paralyzed|XPHB}, {@condition Poisoned|XPHB}, or {@condition Stunned|XPHB} condition, the condition ends. If the creature has the {@condition Prone|XPHB} condition, it can use its {@variantrule Reaction|XPHB} to stand up."
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Power Word Kill",
    "source": "XPHB",
    "page": 306,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
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
      "You compel one creature you can see within range to die. If the target has 100 {@variantrule Hit Points|XPHB} or fewer, it dies. Otherwise, it takes {@damage 12d12} Psychic damage."
    ],
    "damageInflict": [
      "psychic"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Power Word Stun",
    "source": "XPHB",
    "page": 306,
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
      "v": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You overwhelm the mind of one creature you can see within range. If the target has 150 {@variantrule Hit Points|XPHB} or fewer, it has the {@condition Stunned|XPHB} condition. Otherwise, its {@variantrule Speed|XPHB} is 0 until the start of your next turn.",
      "The {@condition Stunned|XPHB} target makes a Constitution saving throw at the end of each of its turns, ending the condition on itself on a success."
    ],
    "conditionInflict": [
      "stunned"
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
    "name": "Prayer of Healing",
    "source": "XPHB",
    "page": 307,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "Up to five creatures of your choice who remain within range for the spell's entire casting gain the benefits of a {@variantrule Short Rest|XPHB} and also regain {@dice 2d8} {@variantrule Hit Points|XPHB}. A creature can't be affected by this spell again until that creature finishes a {@variantrule Long Rest|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 2d8|2-9|1d8} for each spell slot level above 2."
        ]
      }
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "MT"
    ]
  }
];
