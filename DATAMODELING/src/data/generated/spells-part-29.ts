export const spellsPart29= [
  {
    "name": "Otiluke's Resilient Sphere",
    "source": "XPHB",
    "page": 303,
    "srd52": "Resilient Sphere",
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
      "m": "a glass sphere"
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
      "A shimmering sphere encloses a Large or smaller creature or object within range. An unwilling creature must succeed on a Dexterity saving throw or be enclosed for the duration.",
      "Nothing—not physical objects, energy, or other spell effects—can pass through the barrier, in or out, though a creature in the sphere can breathe there. The sphere is immune to all damage, and a creature or object inside can't be damaged by attacks or effects originating from outside, nor can a creature inside the sphere damage anything outside it.",
      "The sphere is weightless and just large enough to contain the creature or object inside. An enclosed creature can take an action to push against the sphere's walls and thus roll the sphere at up to half the creature's {@variantrule Speed|XPHB}. Similarly, the globe can be picked up and moved by other creatures.",
      "A {@spell Disintegrate|XPHB} spell targeting the globe destroys it without harming anything inside."
    ],
    "damageImmune": [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "piercing",
      "poison",
      "psychic",
      "radiant",
      "slashing",
      "thunder"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Otto's Irresistible Dance",
    "source": "XPHB",
    "page": 303,
    "srd52": "Irresistible Dance",
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
      "One creature that you can see within range must make a Wisdom saving throw. On a successful save, the target dances comically until the end of its next turn, during which it must spend all its movement to dance in place.",
      "On a failed save, the target has the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB}, the target dances comically, must use all its movement to dance in place, and has {@variantrule Disadvantage|XPHB} on Dexterity saving throws and attack rolls, and other creatures have {@variantrule Advantage|XPHB} on attack rolls against it. On each of its turns, the target can take an action to collect itself and repeat the save, ending the spell on itself on a success."
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
    "name": "Pass without Trace",
    "source": "XPHB",
    "page": 303,
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
      "type": "emanation",
      "distance": {
        "type": "feet",
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "ashes from burned mistletoe"
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
      "You radiate a concealing aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and each creature you choose have a +10 bonus to Dexterity ({@skill Stealth|XPHB}) checks and leave no tracks."
    ],
    "areaTags": [
      "MT"
    ]
  },
  {
    "name": "Passwall",
    "source": "XPHB",
    "page": 304,
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
        "amount": 30
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a pinch of sesame seeds"
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
      "A passage appears at a point that you can see on a wooden, plaster, or stone surface (such as a wall, ceiling, or floor) within range and lasts for the duration. You choose the opening's dimensions: up to 5 feet wide, 8 feet tall, and 20 feet deep. The passage creates no instability in a structure surrounding it.",
      "When the opening disappears, any creatures or objects still in the passage created by the spell are safely ejected to an unoccupied space nearest to the surface on which you cast the spell."
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ]
  },
  {
    "name": "Phantasmal Force",
    "source": "XPHB",
    "page": 304,
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
        "type": "feet",
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a bit of fleece"
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
      "You attempt to craft an illusion in the mind of a creature you can see within range. The target makes an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other phenomenon that is no larger than a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} and that is perceivable only to the target for the duration. The phantasm includes sound, temperature, and other stimuli.",
      "The target can take a {@action Study|XPHB} action to examine the phantasm with an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If the check succeeds, the target realizes that the phantasm is an illusion, and the spell ends.",
      "While affected by the spell, the target treats the phantasm as if it were real and rationalizes any illogical outcomes from interacting with it. For example, if the target steps through a phantasmal bridge and survives the fall, it believes the bridge exists and something else caused it to fall.",
      "An affected target can even take damage from the illusion if the phantasm represents a dangerous creature or hazard. On each of your turns, such a phantasm can deal {@damage 2d8} Psychic damage to the target if it is in the phantasm's area or within 5 feet of the phantasm. The target perceives the damage as a type appropriate to the illusion."
    ],
    "damageInflict": [
      "psychic"
    ],
    "savingThrow": [
      "intelligence"
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Phantasmal Killer",
    "source": "XPHB",
    "page": 304,
    "srd52": true,
    "basicRules2024": true,
    "level": 4,
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
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "You tap into the nightmares of a creature you can see within range and create an illusion of its deepest fears, visible only to that creature. The target makes a Wisdom saving throw. On a failed save, the target takes {@damage 4d10} Psychic damage and has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls for the duration. On a successful save, the target takes half as much damage, and the spell ends.",
      "For the duration, the target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes the Psychic damage again. On a successful save, the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 4d10|4-9|1d10} for each spell slot level above 4."
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
    "name": "Phantom Steed",
    "source": "XPHB",
    "page": 304,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
    "school": "I",
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
          "type": "hour",
          "amount": 1
        }
      }
    ],
    "meta": {
      "ritual": true
    },
    "entries": [
      "A Large, quasi-real, horselike creature appears on the ground in an unoccupied space of your choice within range. You decide the creature's appearance, and it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 10 feet away from the steed.",
      "For the duration, you or a creature you choose can ride the steed. The steed uses the {@creature Riding Horse|XMM} stat block, except it has a {@variantrule Speed|XPHB} of 100 feet and can travel 13 miles in an hour. When the spell ends, the steed gradually fades, giving the rider 1 minute to dismount. The spell ends early if the steed takes any damage."
    ],
    "miscTags": [
      "SMN"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Planar Ally",
    "source": "XPHB",
    "page": 304,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "C",
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
      "You beseech an otherworldly entity for aid. The being must be known to you: a god, a demon prince, or some other being of cosmic power. That entity sends a {@filter Celestial|bestiary|type=celestial|miscellaneous=!swarm}, an {@filter Elemental|bestiary|type=elemental|miscellaneous=!swarm}, or a {@filter Fiend|bestiary|type=fiend|miscellaneous=!swarm} loyal to it to aid you, making the creature appear in an unoccupied space within range. If you know a specific creature's name, you can speak that name when you cast this spell to request that creature, though you might get a different creature anyway (DM's choice).",
      "When the creature appears, it is under no compulsion to behave a particular way. You can ask it to perform a service in exchange for payment, but it isn't obliged to do so. The requested task could range from simple (fly us across the chasm, or help us fight a battle) to complex (spy on our enemies, or protect us during our foray into the dungeon). You must be able to communicate with the creature to bargain for its services.",
      "Payment can take a variety of forms. A Celestial might require a sizable donation of gold or magic items to an allied temple, while a Fiend might demand a living sacrifice or a gift of treasure. Some creatures might exchange their service for a quest undertaken by you.",
      "A task that can be measured in minutes requires a payment worth 100 GP per minute. A task measured in hours requires 1,000 GP per hour. And a task measured in days (up to 10 days) requires 10,000 GP per day. The DM can adjust these payments based on the circumstances under which you cast the spell. If the task is aligned with the creature's ethos, the payment might be halved or even waived. Nonhazardous tasks typically require only half the suggested payment, while especially dangerous tasks might require a greater gift. Creatures rarely accept tasks that seem suicidal.",
      "After the creature completes the task, or when the agreed-upon duration of service expires, the creature returns to its home plane after reporting back to you if possible. If you are unable to agree on a price for the creature's service, the creature immediately returns to its home plane."
    ],
    "miscTags": [
      "SMN"
    ]
  },
  {
    "name": "Planar Binding",
    "source": "XPHB",
    "page": 305,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
    "school": "A",
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
      "m": {
        "text": "a jewel worth 1,000+ GP, which the spell consumes",
        "cost": 100000,
        "consume": true
      }
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
      "You attempt to bind a Celestial, an Elemental, a Fey, or a Fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of the inverted version of the {@spell Magic Circle|XPHB} spell to trap it while this spell is cast.) At the completion of the casting, the target must succeed on a Charisma saving throw or be bound to serve you for the duration. If the creature was summoned or created by another spell, that spell's duration is extended to match the duration of this spell.",
      "A bound creature must follow your commands to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. If the creature is {@variantrule Hostile [Attitude]|XPHB|Hostile}, it strives to twist your commands to achieve its own objectives. If the creature carries out your commands completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane, it returns to the place where you bound it and remains there until the spell ends."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The duration increases with a spell slot of level 6 (10 days), 7 (30 days), 8 (180 days), and 9 (366 days)."
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
      "fiend"
    ],
    "miscTags": [
      "SMN"
    ],
    "areaTags": [
      "ST"
    ]
  }
];
