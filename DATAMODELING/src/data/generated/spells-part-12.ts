export const spellsPart12= [
  {
    "name": "Dimension Door",
    "source": "XPHB",
    "page": 262,
    "srd52": true,
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
        "type": "feet",
        "amount": 500
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
      "You teleport to a location within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as \"200 feet straight downward\" or \"300 feet upward to the northwest at a 45-degree angle.\"",
      "You can also teleport one willing creature. The creature must be within 5 feet of you when you teleport, and it teleports to a space within 5 feet of your destination space.",
      "If you, the other creature, or both would arrive in a space occupied by a creature or completely filled by one or more objects, you and any creature traveling with you each take {@damage 4d6} Force damage, and the teleportation fails."
    ],
    "damageInflict": [
      "force"
    ],
    "miscTags": [
      "TP"
    ]
  },
  {
    "name": "Disguise Self",
    "source": "XPHB",
    "page": 262,
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
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "entries": [
      "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends. You can seem 1 foot shorter or taller and can appear heavier or lighter. You must adopt a form that has the same basic arrangement of limbs as you have. Otherwise, the extent of the illusion is up to you.",
      "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing.",
      "To discern that you are disguised, a creature must take the {@action Study|XPHB} action to inspect your appearance and succeed on an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Disintegrate",
    "source": "XPHB",
    "page": 263,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
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
      "m": "a lodestone and dust"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You launch a green ray at a target you can see within range. The target can be a creature, a nonmagical object, or a creation of magical force, such as the wall created by {@spell Wall of Force|XPHB}.",
      "A creature targeted by this spell makes a Dexterity saving throw. On a failed save, the target takes {@damage 10d6 + 40} Force damage. If this damage reduces it to 0 {@variantrule Hit Points|XPHB}, it and everything nonmagical it is wearing and carrying are disintegrated into gray dust. The target can be revived only by a {@spell True Resurrection|XPHB} or a {@spell Wish|XPHB} spell.",
      "This spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If such a target is Huge or larger, this spell disintegrates a 10-foot-{@variantrule Cube [Area of Effect]|XPHB|Cube} portion of it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 10d6 + 40|6-9|3d6} for each spell slot level above 6."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Dispel Evil and Good",
    "source": "XPHB",
    "page": 263,
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
      "type": "point",
      "distance": {
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "powdered silver and iron"
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
      "For the duration, Celestials, Elementals, Fey, Fiends, and Undead have {@variantrule Disadvantage|XPHB} on attack rolls against you. You can end the spell early by using either of the following special functions.",
      {
        "type": "entries",
        "name": "Break Enchantment",
        "entries": [
          "As a {@action Magic|XPHB} action, you touch a creature that is possessed by or has the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from one or more creatures of the types above. The target is no longer possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by such creatures."
        ]
      },
      {
        "type": "entries",
        "name": "Dismissal",
        "entries": [
          "As a {@action Magic|XPHB} action, you target one creature you can see within 5 feet of you that has one of the creature types above. The target must succeed on a Charisma saving throw or be sent back to its home plane if it isn't there already. If they aren't on their home plane, Undead are sent to the Shadowfell, and Fey are sent to the Feywild."
        ]
      }
    ],
    "savingThrow": [
      "charisma"
    ],
    "affectsCreatureType": [
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Dispel Magic",
    "source": "XPHB",
    "page": 264,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
      "Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability ({@dc 10} plus that spell's level). On a successful check, the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You automatically end a spell on the target if the spell's level is equal to or less than the level of the spell slot you use."
        ]
      }
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Dissonant Whispers",
    "source": "XPHB",
    "page": 264,
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
      "One creature of your choice that you can see within range hears a discordant melody in its mind. The target makes a Wisdom saving throw. On a failed save, it takes {@damage 3d6} Psychic damage and must immediately use its {@variantrule Reaction|XPHB}, if available, to move as far away from you as it can, using the safest route. On a successful save, the target takes half as much damage only."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 3d6|1-9|1d6} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "psychic"
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
    "name": "Divination",
    "source": "XPHB",
    "page": 264,
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
        "type": "self"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "incense worth 25+ GP, which the spell consumes",
        "cost": 2500,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "This spell puts you in contact with a god or a god's servants. You ask one question about a specific goal, event, or activity to occur within 7 days. The DM offers a truthful reply, which might be a short phrase or cryptic rhyme. The spell doesn't account for circumstances that might change the answer, such as the casting of other spells.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||Random reading!|Regular reading} chance for each casting after the first that you get no answer."
    ]
  },
  {
    "name": "Divine Favor",
    "source": "XPHB",
    "page": 265,
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
    "entries": [
      "Until the spell ends, your attacks with weapons deal an extra {@damage 1d4} Radiant damage on a hit."
    ],
    "damageInflict": [
      "radiant"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Divine Smite",
    "source": "XPHB",
    "page": 265,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
    "school": "V",
    "time": [
      {
        "number": 1,
        "unit": "bonus",
        "condition": "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}"
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
      "The target takes an extra {@damage 2d8} Radiant damage from the attack. The damage increases by {@damage 1d8} if the target is a Fiend or an Undead."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d8|1-9|1d8} for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "miscTags": [
      "AAD"
    ],
    "hasFluffImages": true
  }
];
