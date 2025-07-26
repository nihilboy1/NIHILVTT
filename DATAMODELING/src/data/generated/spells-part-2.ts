export const spellsPart2= [
  {
    "name": "Antilife Shell",
    "source": "XPHB",
    "page": 241,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "A",
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
        "amount": 10
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
      "An aura extends from you in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. The aura prevents creatures other than Constructs and Undead from passing or reaching through it. An affected creature can cast spells or make attacks with Ranged or Reach weapons through the barrier.",
      "If you move so that an affected creature is forced to pass through the barrier, the spell ends."
    ],
    "affectsCreatureType": [
      "aberration",
      "beast",
      "celestial",
      "dragon",
      "elemental",
      "fey",
      "fiend",
      "giant",
      "humanoid",
      "monstrosity",
      "ooze",
      "plant"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Antimagic Field",
    "source": "XPHB",
    "page": 241,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
    "school": "A",
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
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "iron filings"
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
      "An aura of antimagic surrounds you in 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. No one can cast spells, take {@action Magic|XPHB} actions, or create other magical effects inside the aura, and those things can't target or otherwise affect anything inside it. Magical properties of magic items don't work inside the aura or on anything inside it.",
      "Areas of effect created by spells or other magic can't extend into the aura, and no one can teleport into or out of it or use planar travel there. Portals close temporarily while in the aura.",
      "Ongoing spells, except those cast by an Artifact or a deity, are suppressed in the area. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration.",
      "{@spell Dispel Magic|XPHB} has no effect on the aura, and the auras created by different {@spell Antimagic Field|XPHB} spells don't nullify each other."
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Antipathy/Sympathy",
    "source": "XPHB",
    "page": 242,
    "srd52": true,
    "basicRules2024": true,
    "level": 8,
    "school": "E",
    "time": [
      {
        "number": 1,
        "unit": "hour"
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
      "m": "a mix of vinegar and honey"
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
      "As you cast the spell, choose whether it creates antipathy or sympathy, and target one creature or object that is Huge or smaller. Then specify a kind of creature, such as red dragons, goblins, or vampires. A creature of the chosen kind makes a Wisdom saving throw when it comes within 120 feet of the target. Your choice of antipathy or sympathy determines what happens to a creature when it fails that save:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Antipathy",
            "entries": [
              "The creature has the {@condition Frightened|XPHB} condition. The {@condition Frightened|XPHB} creature must use its movement on its turns to get as far away as possible from the target, moving by the safest route."
            ]
          },
          {
            "type": "item",
            "name": "Sympathy",
            "entries": [
              "The creature has the {@condition Charmed|XPHB} condition. The {@condition Charmed|XPHB} creature must use its movement on its turns to get as close as possible to the target, moving by the safest route. If the creature is within 5 feet of the target, the creature can't willingly move away. If the target damages the {@condition Charmed|XPHB} creature, that creature can make a Wisdom saving throw to end the effect, as described below."
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Ending the Effect",
        "entries": [
          "If the {@condition Frightened|XPHB} or {@condition Charmed|XPHB} creature ends its turn more than 120 feet away from the target, the creature makes a Wisdom saving throw. On a successful save, the creature is no longer affected by the target. A creature that successfully saves against this effect is immune to it for 1 minute, after which it can be affected again."
        ]
      }
    ],
    "conditionInflict": [
      "frightened",
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Arcane Eye",
    "source": "XPHB",
    "page": 242,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of bat fur"
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
      "You create an {@condition Invisible|XPHB}, invulnerable eye within range that hovers for the duration. You mentally receive visual information from the eye, which can see in every direction. It also has {@sense Darkvision|XPHB} with a range of 30 feet.",
      "As a {@variantrule Bonus Action|XPHB}, you can move the eye up to 30 feet in any direction. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter."
    ],
    "miscTags": [
      "UBA"
    ]
  },
  {
    "name": "Arcane Gate",
    "source": "XPHB",
    "page": 242,
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
        "amount": 500
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
      "You create linked teleportation portals. Choose two Large, unoccupied spaces on the ground that you can see, one space within range and the other one within 10 feet of you. A circular portal opens in each of those spaces and remains for the duration.",
      "The portals are two-dimensional glowing rings filled with mist that blocks sight. They hover inches from the ground and are perpendicular to it.",
      "A portal is open on only one side (you choose which). Anything entering the open side of a portal exits from the open side of the other portal as if the two were adjacent to each other. As a {@variantrule Bonus Action|XPHB}, you can change the facing of the open sides."
    ],
    "miscTags": [
      "OBJ",
      "SGT",
      "TP",
      "UBA"
    ]
  },
  {
    "name": "Arcane Lock",
    "source": "XPHB",
    "page": 242,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "gold dust worth 25+ GP, which the spell consumes",
        "cost": 2500,
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
      "You touch a closed door, window, gate, container, or hatch and magically lock it for the duration. This lock can't be unlocked by any nonmagical means. You and any creatures you designate when you cast the spell can open and close the object despite the lock. You can also set a password that, when spoken within 5 feet of the object, unlocks it for 1 minute."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Arcane Vigor",
    "source": "XPHB",
    "page": 242,
    "level": 2,
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
        "type": "self"
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
      "You tap into your life force to heal yourself. Roll one or two of your unexpended {@variantrule Hit Point Dice|XPHB}, and regain a number of {@variantrule Hit Points|XPHB} equal to the roll's total plus your spellcasting ability modifier. Those dice are then expended."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The number of unexpended Hit Dice you can roll increases by one for each spell slot level above 2."
        ]
      }
    ],
    "miscTags": [
      "HL"
    ]
  },
  {
    "name": "Armor of Agathys",
    "source": "XPHB",
    "page": 243,
    "level": 1,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a shard of blue glass"
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
    "entries": [
      "Protective magical frost surrounds you. You gain 5 {@variantrule Temporary Hit Points|XPHB}. If a creature hits you with a melee attack roll before the spell ends, the creature takes 5 Cold damage. The spell ends early if you have no {@variantrule Temporary Hit Points|XPHB}."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The {@variantrule Temporary Hit Points|XPHB} and the Cold damage both increase by 5 for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "cold"
    ],
    "miscTags": [
      "THP"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Arms of Hadar",
    "source": "XPHB",
    "page": 243,
    "level": 1,
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
        "amount": 10
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
      "Invoking Hadar, you cause tendrils to erupt from yourself. Each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from you makes a Strength saving throw. On a failed save, a target takes {@damage 2d6} Necrotic damage and can't take Reactions until the start of its next turn. On a successful save, a target takes half as much damage only."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "necrotic"
    ],
    "savingThrow": [
      "strength"
    ],
    "areaTags": [
      "S"
    ],
    "hasFluffImages": true
  }
];
