export const spellsPart39= [
  {
    "name": "Sunburst",
    "source": "XPHB",
    "page": 329,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a piece of sunstone"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "Brilliant sunlight flashes in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} makes a Constitution saving throw. On a failed save, a creature takes {@damage 12d6} Radiant damage and has the {@condition Blinded|XPHB} condition for 1 minute. On a successful save, it takes half as much damage only.",
      "A creature {@condition Blinded|XPHB} by this spell makes another Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.",
      "This spell dispels {@variantrule Darkness|XPHB} in its area that was created by any spell."
    ],
    "damageInflict": [
      "radiant"
    ],
    "conditionInflict": [
      "blinded"
    ],
    "savingThrow": [
      "constitution"
    ],
    "miscTags": [
      "LGT",
      "LGTS"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Swift Quiver",
    "source": "XPHB",
    "page": 329,
    "level": 5,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a Quiver worth 1+ GP",
        "cost": 100
      }
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
      "When you cast the spell and as a {@variantrule Bonus Action|XPHB} until it ends, you can make two attacks with a weapon that fires Arrows or Bolts, such as a Longbow or a Light Crossbow. The spell magically creates the ammunition needed for each attack. Each Arrow or Bolt created by the spell deals damage like a nonmagical piece of ammunition of its kind and disintegrates immediately after it hits or misses."
    ],
    "miscTags": [
      "UBA"
    ]
  },
  {
    "name": "Symbol",
    "source": "XPHB",
    "page": 329,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
    "school": "A",
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
        "text": "powdered diamond worth 1,000+ GP, which the spell consumes",
        "cost": 100000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "permanent",
        "ends": [
          "dispel",
          "trigger"
        ]
      }
    ],
    "entries": [
      "You inscribe a harmful glyph either on a surface (such as a section of floor or wall) or within an object that can be closed (such as a book or chest). The glyph can cover an area no larger than 10 feet in diameter. If you choose an object, it must remain in place; if it is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.",
      "The glyph is nearly imperceptible and requires a successful Wisdom ({@skill Perception|XPHB}) check against your spell save DC to notice.",
      "When you inscribe the glyph, you set its trigger and choose which effect the symbol bears: Death, Discord, Fear, Pain, Sleep, or Stunning. Each one is explained below.",
      {
        "type": "entries",
        "name": "Set the Trigger",
        "entries": [
          "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph.",
          "You can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password.",
          "Once triggered, the glyph glows, filling a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} with {@variantrule Dim Light|XPHB} for 10 minutes, after which time the spell ends. Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} when the glyph activates is targeted by its effect, as is a creature that enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} for the first time on a turn or ends its turn there. A creature is targeted only once per turn."
        ]
      },
      {
        "type": "entries",
        "name": "Death",
        "entries": [
          "Each target makes a Constitution saving throw, taking {@damage 10d10} Necrotic damage on a failed save or half as much damage on a successful save."
        ]
      },
      {
        "type": "entries",
        "name": "Discord",
        "entries": [
          "Each target makes a Wisdom saving throw. On a failed save, a target argues with other creatures for 1 minute. During this time, it is incapable of meaningful communication and has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks."
        ]
      },
      {
        "type": "entries",
        "name": "Fear",
        "entries": [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Frightened|XPHB} condition for 1 minute. While {@condition Frightened|XPHB}, the target must move at least 30 feet away from the glyph on each of its turns, if able."
        ]
      },
      {
        "type": "entries",
        "name": "Pain",
        "entries": [
          "Each target must succeed on a Constitution saving throw or have the {@condition Incapacitated|XPHB} condition for 1 minute."
        ]
      },
      {
        "type": "entries",
        "name": "Sleep",
        "entries": [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Unconscious|XPHB} condition for 10 minutes. A creature awakens if it takes damage or if someone takes an action to shake it awake."
        ]
      },
      {
        "type": "entries",
        "name": "Stunning",
        "entries": [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Stunned|XPHB} condition for 1 minute."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "conditionInflict": [
      "frightened",
      "incapacitated",
      "stunned",
      "unconscious"
    ],
    "savingThrow": [
      "constitution",
      "wisdom",
      "intelligence"
    ],
    "abilityCheck": [
      "wisdom"
    ],
    "miscTags": [
      "LGT",
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Synaptic Static",
    "source": "XPHB",
    "page": 330,
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
      "You cause psychic energy to erupt at a point within range. Each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes an Intelligence saving throw, taking {@damage 8d6} Psychic damage on a failed save or half as much damage on a successful one.",
      "On a failed save, a target also has muddled thoughts for 1 minute. During that time, it subtracts {@dice 1d6} from all its attack rolls and ability checks, as well as any Constitution saving throws to maintain {@status Concentration|XPHB}. The target makes an Intelligence saving throw at the end of each of its turns, ending the effect on itself on a success."
    ],
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "intelligence",
      "constitution"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Tasha's Bubbling Cauldron",
    "source": "XPHB",
    "page": 330,
    "level": 6,
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
        "amount": 5
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a gilded ladle worth 500 + GP"
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
      "You conjure a claw-footed cauldron filled with bubbling liquid. The cauldron appears in an unoccupied space on the ground within 5 feet of you and lasts for the duration. The cauldron can't be moved and disappears when the spell ends, along with the bubbling liquid inside it.",
      "The liquid in the cauldron duplicates the properties of a Common or an Uncommon potion of your choice (such as a {@item Potion of Healing|XDMG}). As a {@variantrule Bonus Action|XPHB}, you or an ally can reach into the cauldron and withdraw one potion of that kind. The potion is contained in a vial that disappears when the potion is consumed. The cauldron can produce a number of these potions equal to your spellcasting ability modifier (minimum 1). When the last of these potions is withdrawn from the cauldron, the cauldron disappears, and the spell ends.",
      "Potions obtained from the cauldron that aren't consumed disappear when you cast this spell again."
    ],
    "miscTags": [
      "HL",
      "UBA"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Tasha's Hideous Laughter",
    "source": "XPHB",
    "page": 331,
    "srd52": "Hideous Laughter",
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a tart and a feather"
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
      "One creature of your choice that you can see within range makes a Wisdom saving throw. On a failed save, it has the {@condition Prone|XPHB} and {@condition Incapacitated|XPHB} conditions for the duration. During that time, it laughs uncontrollably if it's capable of laughter, and it can't end the {@condition Prone|XPHB} condition on itself.",
      "At the end of each of its turns and each time it takes damage, it makes another Wisdom saving throw. The target has {@variantrule Advantage|XPHB} on the save if the save is triggered by damage. On a successful save, the spell ends."
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
    "conditionInflict": [
      "incapacitated",
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
    "name": "Telekinesis",
    "source": "XPHB",
    "page": 331,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
      "You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell and as a {@action Magic|XPHB} action on your later turns before the spell ends, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell.",
      {
        "type": "entries",
        "name": "Creature",
        "entries": [
          "You can try to move a Huge or smaller creature. The target must succeed on a Strength saving throw, or you move it up to 30 feet in any direction within the spell's range. Until the end of your next turn, the creature has the {@condition Restrained|XPHB} condition, and if you lift it into the air, it is suspended there. It falls at the end of your next turn unless you use this option on it again and it fails the save."
        ]
      },
      {
        "type": "entries",
        "name": "Object",
        "entries": [
          "You can try to move a Huge or smaller object. If the object isn't being worn or carried, you automatically move it up to 30 feet in any direction within the spell's range.",
          "If the object is worn or carried by a creature, that creature must succeed on a Strength saving throw, or you pull the object away and move it up to 30 feet in any direction within the spell's range.",
          "You can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool, opening a door or a container, stowing or retrieving an item from an open container, or pouring the contents from a vial."
        ]
      }
    ],
    "conditionInflict": [
      "restrained"
    ],
    "savingThrow": [
      "strength"
    ],
    "miscTags": [
      "FMV",
      "OBJ",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Telepathy",
    "source": "XPHB",
    "page": 331,
    "level": 8,
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
        "type": "unlimited"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pair of linked silver rings"
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
      "You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can be anywhere on the same plane of existence as you. The spell ends if you or the target are no longer on the same plane.",
      "Until the spell ends, you and the target can instantly share words, images, sounds, and other sensory messages with each other through the link, and the target recognizes you as the creature it is communicating with. The spell enables a creature to understand the meaning of your words and any sensory messages you send to it."
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Teleport",
    "source": "XPHB",
    "page": 331,
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
        "type": "feet",
        "amount": 10
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
      "This spell instantly transports you and up to eight willing creatures that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be Large or smaller, and it can't be held or carried by an unwilling creature.",
      "The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The DM rolls {@dice 1d100} and consults the {@variantrule Teleportation|XPHB} Outcome table and the explanations after it.",
      {
        "type": "table",
        "caption": "Teleportation Outcome",
        "colStyles": [
          "col-4",
          "col-2 text-center",
          "col-2 text-center",
          "col-2 text-center",
          "col-2 text-center"
        ],
        "colLabels": [
          "Familiarity",
          "Mishap",
          "Similar Area",
          "Off Target",
          "On Target"
        ],
        "rows": [
          [
            "Permanent circle",
            "—",
            "—",
            "—",
            "01-00"
          ],
          [
            "Linked object",
            "—",
            "—",
            "—",
            "01-00"
          ],
          [
            "Very familiar",
            "01-05",
            "06-13",
            "14-24",
            "25-00"
          ],
          [
            "Seen casually",
            "01-33",
            "34-43",
            "44-53",
            "54-00"
          ],
          [
            "Viewed once or described",
            "01-43",
            "44-53",
            "54-73",
            "74-00"
          ],
          [
            "False destination",
            "01-50",
            "51-00",
            "—",
            "—"
          ]
        ]
      },
      {
        "type": "entries",
        "name": "Familiarity",
        "entries": [
          "Here are the meanings of the terms in the table's Familiarity column:",
          {
            "type": "list",
            "items": [
              "\"Permanent circle\" means a permanent teleportation circle whose sigil sequence you know.",
              "\"Linked object\" means you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library.",
              "\"Very familiar\" is a place you have visited often, a place you have carefully studied, or a place you can see when you cast the spell.",
              "\"Seen casually\" is a place you have seen more than once but with which you aren't very familiar.",
              "\"Viewed once or described\" is a place you have seen once, possibly using magic, or a place you know through someone else's description, perhaps from a map.",
              "\"False destination\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a location that no longer exists."
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Mishap",
        "entries": [
          "The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes {@damage 3d10} Force damage, and the DM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time)."
        ]
      },
      {
        "type": "entries",
        "name": "Similar Area",
        "entries": [
          "You and your group (or the target object) appear in a different area that's visually or thematically similar to the target area. You appear in the closest similar place. If you are heading for your home laboratory, for example, you might appear in another person's laboratory in the same city."
        ]
      },
      {
        "type": "entries",
        "name": "Off Target",
        "entries": [
          "You and your group (or the target object) appear {@dice 2d12} miles away from the destination in a random direction. Roll {@dice 1d8} for the direction: 1, east; 2, southeast; 3, south; 4, southwest; 5, west; 6, northwest; 7, north; or 8, northeast."
        ]
      },
      {
        "type": "entries",
        "name": "On Target",
        "entries": [
          "You and your group (or the target object) appear where you intended."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "miscTags": [
      "OBJ",
      "RO",
      "SGT",
      "TP"
    ],
    "areaTags": [
      "MT"
    ]
  }
];
