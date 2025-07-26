export const spellsPart18= [
  {
    "name": "Fount of Moonlight",
    "source": "XPHB",
    "page": 277,
    "level": 4,
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
      "A cool light wreathes your body for the duration, emitting {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet.",
      "Until the spell ends, you have {@variantrule Resistance|XPHB} to Radiant damage, and your melee attacks deal an extra {@damage 2d6} Radiant damage on a hit.",
      "In addition, immediately after you take damage from a creature you can see within 60 feet of yourself, you can take a {@variantrule Reaction|XPHB} to force the creature to make a Constitution saving throw. On a failed save, the creature has the {@condition Blinded|XPHB} condition until the end of your next turn."
    ],
    "damageResist": [
      "radiant"
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
      "AAD",
      "LGT",
      "SGT"
    ]
  },
  {
    "name": "Freedom of Movement",
    "source": "XPHB",
    "page": 277,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
      "m": "a leather strap"
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
      "You touch a willing creature. For the duration, the target's movement is unaffected by {@variantrule Difficult Terrain|XPHB}, and spells and other magical effects can neither reduce the target's {@variantrule Speed|XPHB} nor cause the target to have the {@condition Paralyzed|XPHB} or {@condition Restrained|XPHB} conditions. The target also has a {@variantrule Swim Speed|XPHB} equal to its {@variantrule Speed|XPHB}.",
      "In addition, the target can spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature imposing the {@condition Grappled|XPHB} condition on it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 4."
        ]
      }
    ],
    "conditionImmune": [
      "paralyzed",
      "restrained"
    ],
    "miscTags": [
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Friends",
    "source": "XPHB",
    "page": 277,
    "level": 0,
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
        "amount": 10
      }
    },
    "components": {
      "s": true,
      "m": "some makeup"
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
      "You magically emanate a sense of friendship toward one creature you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target succeeds automatically if it isn't a Humanoid, if you're fighting it, or if you have cast this spell on it within the past 24 hours.",
      "The spell ends early if the target takes damage or if you make an attack roll, deal damage, or force anyone to make a saving throw. When the spell ends, the target knows it was {@condition Charmed|XPHB} by you."
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Gaseous Form",
    "source": "XPHB",
    "page": 277,
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
      "s": true,
      "m": "a bit of gauze"
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
      "A willing creature you touch shape-shifts, along with everything it's wearing and carrying, into a misty cloud for the duration. The spell ends on the target if it drops to 0 {@variantrule Hit Points|XPHB} or if it takes a {@action Magic|XPHB} action to end the spell on itself.",
      "While in this form, the target's only method of movement is a {@variantrule Fly Speed|XPHB} of 10 feet, and it can hover. The target can enter and occupy the space of another creature. The target has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage; it has {@variantrule Immunity|XPHB} to the {@condition Prone|XPHB} condition; and it has {@variantrule Advantage|XPHB} on Strength, Dexterity, and Constitution saving throws. The target can pass through narrow openings, but it treats liquids as though they were solid surfaces.",
      "The target can't talk or manipulate objects, and any objects it was carrying or holding can't be dropped, used, or otherwise interacted with. Finally, the target can't attack or cast spells."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You can target one additional creature for each spell slot level above 3."
        ]
      }
    ],
    "conditionImmune": [
      "prone"
    ],
    "miscTags": [
      "ADV",
      "SCT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Gate",
    "source": "XPHB",
    "page": 277,
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
        "type": "feet",
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "a diamond worth 5,000+ GP",
        "cost": 500000
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
      "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration, and the portal's destination is visible through it.",
      "The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.",
      "Deities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.",
      "When you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens next to the named creature and transports it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the DM deems appropriate. It might leave, attack you, or help you."
    ],
    "miscTags": [
      "PS",
      "SGT",
      "TP"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Geas",
    "source": "XPHB",
    "page": 278,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "E",
    "time": [
      {
        "number": 1,
        "unit": "minute"
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
        "type": "timed",
        "duration": {
          "type": "day",
          "amount": 30
        }
      }
    ],
    "entries": [
      "You give a verbal command to a creature that you can see within range, ordering it to carry out some service or refrain from an action or a course of activity as you decide. The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target automatically succeeds if it can't understand your command.",
      "While {@condition Charmed|XPHB}, the creature takes {@damage 5d10} Psychic damage if it acts in a manner directly counter to your command. It takes this damage no more than once each day.",
      "You can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends.",
      "A {@spell Remove Curse|XPHB}, {@spell Greater Restoration|XPHB}, or {@spell Wish|XPHB} spell ends this spell."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "If you use a level 7 or 8 spell slot, the duration is 365 days. If you use a level 9 spell slot, the spell lasts until it is ended by one of the spells mentioned above."
        ]
      }
    ],
    "damageInflict": [
      "psychic"
    ],
    "conditionInflict": [
      "charmed"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "PRM",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Gentle Repose",
    "source": "XPHB",
    "page": 278,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "s": true,
      "m": {
        "text": "2 Copper Pieces, which the spell consumes",
        "consume": true
      }
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You touch a corpse or other remains. For the duration, the target is protected from decay and can't become Undead.",
      "The spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don't count against the time limit of spells such as {@spell Raise Dead|XPHB}."
    ]
  },
  {
    "name": "Giant Insect",
    "source": "XPHB",
    "page": 279,
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
      "You summon a giant centipede, spider, or wasp (chosen when you cast the spell). It manifests in an unoccupied space you can see within range and uses the {@creature Giant Insect|XPHB} stat block. The form you choose determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
      "The creature is an ally to you and your allies. In combat, the creature shares your {@variantrule Initiative|XPHB} count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the {@action Dodge|XPHB} action and uses its movement to avoid danger."
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
      "SMN"
    ]
  },
  {
    "name": "Glibness",
    "source": "XPHB",
    "page": 279,
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
        "type": "self"
      }
    },
    "components": {
      "v": true
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
      "Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful."
    ]
  }
];
