export const spellsPart3= [
  {
    "name": "Astral Projection",
    "source": "XPHB",
    "page": 243,
    "srd52": true,
    "basicRules2024": true,
    "level": 9,
    "school": "N",
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
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "for each of the spell's targets, one jacinth worth 1,000+ GP and one silver bar worth 100+ GP, all of which the spell consumes",
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
      "You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell ends instantly if you are already on that plane). Each target's body is left behind in a state of suspended animation; it has the {@condition Unconscious|XPHB} condition, doesn't need food or air, and doesn't age.",
      "A target's astral form resembles its body in almost every way, replicating its game statistics and possessions. The principal difference is the addition of a silvery cord that trails from between the shoulder blades of the astral form. The cord fades from view after 1 foot. If the cord is cut—which happens only when an effect states that it does so—the target's body and astral form both die.",
      "A target's astral form can travel through the Astral Plane. The moment an astral form leaves that plane, the target's body and possessions travel along the silver cord, causing the target to re-enter its body on the new plane.",
      "Any damage or other effects that apply to an astral form have no effect on the target's body and vice versa. If a target's body or astral form drops to 0 {@variantrule Hit Points|XPHB}, the spell ends for that target. The spell ends for all the targets if you take a {@action Magic|XPHB} action to dismiss it.",
      "When the spell ends for a target who isn't dead, the target reappears in its body and exits the state of suspended animation."
    ],
    "conditionInflict": [
      "unconscious"
    ],
    "miscTags": [
      "PRM",
      "PS"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Augury",
    "source": "XPHB",
    "page": 244,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "m": {
        "text": "specially marked sticks, bones, cards, or other divinatory tokens worth 25+ GP",
        "cost": 2500
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
      "You receive an omen from an otherworldly entity about the results of a course of action that you plan to take within the next 30 minutes. The DM chooses the omen from the Omens table.",
      {
        "type": "table",
        "caption": "Omens",
        "colStyles": [
          "col-4",
          "col-8"
        ],
        "colLabels": [
          "Omen",
          "For Results That Will Be..."
        ],
        "rows": [
          [
            "Weal",
            "Good"
          ],
          [
            "Woe",
            "Bad"
          ],
          [
            "Weal and woe",
            "Good and bad"
          ],
          [
            "Indifference",
            "Neither good nor bad"
          ]
        ]
      },
      "The spell doesn't account for circumstances, such as other spells, that might change the results.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||Random reading!|Regular reading} chance for each casting after the first that you get no answer."
    ]
  },
  {
    "name": "Aura of Life",
    "source": "XPHB",
    "page": 244,
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
      "type": "emanation",
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
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Resistance|XPHB} to Necrotic damage, and your {@variantrule Hit Points|XPHB|Hit Point} maximums can't be reduced. If an ally with 0 {@variantrule Hit Points|XPHB} starts its turn in the aura, that ally regains 1 {@variantrule Hit Points|XPHB|Hit Point}."
    ],
    "damageResist": [
      "necrotic"
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Aura of Purity",
    "source": "XPHB",
    "page": 244,
    "level": 4,
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
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Resistance|XPHB} to Poison damage and {@variantrule Advantage|XPHB} on saving throws to avoid or end effects that include the {@condition Blinded|XPHB}, {@condition Charmed|XPHB}, {@condition Deafened|XPHB}, {@condition Frightened|XPHB}, {@condition Paralyzed|XPHB}, {@condition Poisoned|XPHB}, or {@condition Stunned|XPHB} condition."
    ],
    "damageResist": [
      "poison"
    ],
    "miscTags": [
      "ADV"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Aura of Vitality",
    "source": "XPHB",
    "page": 244,
    "level": 3,
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
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. When you create the aura and at the start of each of your turns while it persists, you can restore {@dice 2d6} {@variantrule Hit Points|XPHB} to one creature in it."
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Awaken",
    "source": "XPHB",
    "page": 244,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "T",
    "time": [
      {
        "number": 8,
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
        "text": "an agate worth 1,000+ GP, which the spell consumes",
        "cost": 100000,
        "consume": true
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You spend the casting time tracing magical pathways within a precious gemstone, and then touch the target. The target must be either a {@filter Beast|bestiary|type=beast|intelligence=[0;3]|miscellaneous=!swarm} or {@filter Plant|bestiary|type=plant|intelligence=[0;3]|miscellaneous=!swarm} creature with an Intelligence of 3 or less or a natural plant that isn't a creature. The target gains an Intelligence of 10 and the ability to speak one language you know. If the target is a natural plant, it becomes a Plant creature and gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human's. The DM chooses statistics appropriate for the awakened Plant, such as the statistics for the {@creature Awakened Shrub|XMM} or {@creature Awakened Tree|XMM} in the {@book Monster Manual|XMM}.",
      "The awakened target has the {@condition Charmed|XPHB} condition for 30 days or until you or your allies deal damage to it. When that condition ends, the awakened creature chooses its attitude toward you."
    ],
    "conditionInflict": [
      "charmed"
    ],
    "affectsCreatureType": [
      "beast",
      "plant"
    ],
    "miscTags": [
      "PRM"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Bane",
    "source": "XPHB",
    "page": 245,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a drop of blood"
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
      "Up to three creatures of your choice that you can see within range must each make a Charisma saving throw. Whenever a target that fails this save makes an attack roll or a saving throw before the spell ends, the target must subtract {@dice 1d4} from the attack roll or save."
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
    "savingThrow": [
      "charisma"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Banishing Smite",
    "source": "XPHB",
    "page": 245,
    "level": 5,
    "school": "C",
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
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "The target hit by the attack roll takes an extra {@damage 5d10} Force damage from the attack. If the attack reduces the target to 50 {@variantrule Hit Points|XPHB} or fewer, the target must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the {@condition Incapacitated|XPHB} condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied."
    ],
    "damageInflict": [
      "force"
    ],
    "conditionInflict": [
      "incapacitated"
    ],
    "miscTags": [
      "AAD"
    ]
  },
  {
    "name": "Banishment",
    "source": "XPHB",
    "page": 245,
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
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pentacle"
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
      "One creature that you can see within range must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the {@condition Incapacitated|XPHB} condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
      "If the target is an Aberration, a Celestial, an Elemental, a Fey, or a Fiend, the target doesn't return if the spell lasts for 1 minute. The target is instead transported to a random location on a plane (DM's choice) associated with its creature type."
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
    "conditionInflict": [
      "incapacitated"
    ],
    "savingThrow": [
      "charisma"
    ],
    "miscTags": [
      "SCT",
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
