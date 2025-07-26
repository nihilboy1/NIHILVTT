export const spellsPart23= [
  {
    "name": "Inflict Wounds",
    "source": "XPHB",
    "page": 288,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
        "type": "instant"
      }
    ],
    "entries": [
      "A creature you touch makes a Constitution saving throw, taking {@damage 2d10} Necrotic damage on a failed save or half as much damage on a successful one."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d10|1-9|1d10} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "constitution"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Insect Plague",
    "source": "XPHB",
    "page": 289,
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
        "amount": 300
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a locust"
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
      "Swarming locusts fill a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} remains for the duration, and its area is {@variantrule Lightly Obscured|XPHB} and {@variantrule Difficult Terrain|XPHB}.",
      "When the swarm appears, each creature in it makes a Constitution saving throw, taking {@damage 4d10} Piercing damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 4d10|5-9|1d10} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "piercing"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Invisibility",
    "source": "XPHB",
    "page": 289,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "an eyelash in gum arabic"
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
      "A creature you touch has the {@condition Invisible|XPHB} condition until the spell ends. The spell ends early immediately after the target makes an attack roll, deals damage, or casts a spell."
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
    "conditionInflict": [
      "invisible"
    ],
    "miscTags": [
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Jallarzi's Storm of Radiance",
    "source": "XPHB",
    "page": 289,
    "level": 5,
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
      "s": true,
      "m": "a pinch of phosphorus"
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
      "You unleash a storm of flashing light and raging thunder in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point you can see within range. While in this area, creatures have the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions, and they can't cast spells with a Verbal component.",
      "When the storm appears, each creature in it makes a Constitution saving throw, taking {@damage 2d10} Radiant damage and {@damage 2d10} Thunder damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The Radiant and Thunder damage increase by {@scaledamage 2d10|5-9|1d10} for each spell slot level above 5."
        ]
      }
    ],
    "damageInflict": [
      "radiant",
      "thunder"
    ],
    "conditionInflict": [
      "blinded",
      "deafened"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "Y"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Jump",
    "source": "XPHB",
    "page": 290,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "m": "a grasshopper's hind leg"
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
      "You touch a willing creature. Once on each of its turns until the spell ends, that creature can jump up to 30 feet by spending 10 feet of movement."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Knock",
    "source": "XPHB",
    "page": 290,
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
      "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.",
      "A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.",
      "If the target is held shut by {@spell Arcane Lock|XPHB}, that spell is suppressed for 10 minutes, during which time the target can be opened and closed.",
      "When you cast the spell, a loud knock, audible up to 300 feet away, emanates from the target."
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ]
  },
  {
    "name": "Legend Lore",
    "source": "XPHB",
    "page": 290,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "D",
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
        "text": "incense worth 250+ GP, which the spell consumes, and four ivory strips worth 50+ GP each",
        "cost": 25000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Name or describe a famous person, place, or object. The spell brings to your mind a brief summary of the significant lore about that famous thing, as described by the DM.",
      "The lore might consist of important details, amusing revelations, or even secret lore that has never been widely known. The more information you already know about the thing, the more precise and detailed the information you receive is. That information is accurate but might be couched in figurative language or poetry, as determined by the DM.",
      "If the famous thing you chose isn't actually famous, you hear sad musical notes played on a trombone, and the spell fails."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Leomund's Secret Chest",
    "source": "XPHB",
    "page": 290,
    "srd52": "Secret Chest",
    "basicRules2024": true,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth 5,000+ GP, and a Tiny replica of the chest made from the same materials worth 50+ GP",
        "cost": 500000
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
      "You hide a chest and all its contents on the Ethereal Plane. You must touch the chest and the miniature replica that serve as Material components for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet).",
      "While the chest remains on the Ethereal Plane, you can take a {@action Magic|XPHB} action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by taking a {@action Magic|XPHB} action to touch the chest and the replica.",
      "After 60 days, there is a cumulative {@chance 5|||Effect ends!|Effect continues} chance at the end of each day that the spell ends. The spell also ends if you cast this spell again or if the Tiny replica chest is destroyed. If the spell ends and the larger chest is on the Ethereal Plane, the chest remains there for you or someone else to find."
    ],
    "miscTags": [
      "OBJ",
      "PRM"
    ]
  },
  {
    "name": "Leomund's Tiny Hut",
    "source": "XPHB",
    "page": 291,
    "srd52": "Tiny Hut",
    "basicRules2024": true,
    "level": 3,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "minute"
      }
    ],
    "range": {
      "type": "emanation",
      "distance": {
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a crystal bead"
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
      "A 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} springs into existence around you and remains stationary for the duration. The spell fails when you cast it if the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} isn't big enough to fully encapsulate all creatures in its area.",
      "Creatures and objects within the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} when you cast the spell can move through it freely. All other creatures and objects are barred from passing through it. Spells of level 3 or lower can't be cast through it, and the effects of such spells can't extend into it.",
      "The atmosphere inside the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is comfortable and dry, regardless of the weather outside. Until the spell ends, you can command the interior to have {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB} (no action required). The {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is opaque from the outside and of any color you choose, but it's transparent from the inside.",
      "The spell ends early if you leave the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or if you cast it again."
    ],
    "miscTags": [
      "LGT"
    ],
    "areaTags": [
      "S"
    ]
  }
];
