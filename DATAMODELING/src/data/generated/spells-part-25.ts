export const spellsPart25= [
  {
    "name": "Mage Armor",
    "source": "XPHB",
    "page": 293,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "m": "a piece of cured leather"
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
    "entries": [
      "You touch a willing creature who isn't wearing armor. Until the spell ends, the target's base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor."
    ],
    "miscTags": [
      "MAC"
    ],
    "areaTags": [
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Mage Hand",
    "source": "XPHB",
    "page": 293,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
        }
      }
    ],
    "entries": [
      "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.",
      "When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial.",
      "As a {@action Magic|XPHB} action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet.",
      "The hand can't attack, activate magic items, or carry more than 10 pounds."
    ],
    "miscTags": [
      "OBJ"
    ]
  },
  {
    "name": "Magic Circle",
    "source": "XPHB",
    "page": 293,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "salt and powdered silver worth 100+ GP, which the spell consumes",
        "cost": 10000,
        "consume": true
      }
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
      "You create a 10-foot-radius, 20-foot-tall {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} intersects with the floor or other surface.",
      "Choose one or more of the following types of creatures: Celestials, Elementals, Fey, Fiends, or Undead. The circle affects a creature of the chosen type in the following ways:",
      {
        "type": "list",
        "items": [
          "The creature can't willingly enter the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw.",
          "The creature has {@variantrule Disadvantage|XPHB} on attack rolls against targets within the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}.",
          "Targets within the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} can't be possessed by or gain the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from the creature."
        ]
      },
      "Each time you cast this spell, you can cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} and protecting targets outside it."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The duration increases by 1 hour for each spell slot level above 3."
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
      "Y"
    ]
  },
  {
    "name": "Magic Jar",
    "source": "XPHB",
    "page": 294,
    "srd52": true,
    "basicRules2024": true,
    "level": 6,
    "school": "N",
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
        "text": "a gem, crystal, or reliquary worth 500+ GP",
        "cost": 50000
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
      "Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell's Material component. While your soul inhabits the container, you are aware of your surroundings as if you were in the container's space. You can't move or take Reactions. The only action you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a Humanoid's body.",
      "You can attempt to possess any Humanoid within 100 feet of you that you can see (creatures warded by a {@spell Protection from Evil and Good|XPHB} or {@spell Magic Circle|XPHB} spell can't be possessed). The target makes a Charisma saving throw. On a failed save, your soul enters the target's body, and the target's soul becomes trapped in the container. On a successful save, the target resists your efforts to possess it, and you can't attempt to possess it again for 24 hours.",
      "Once you possess a creature's body, you control it. Your {@variantrule Hit Points|XPHB}, {@variantrule Hit Point Dice|XPHB}, Strength, Dexterity, Constitution, {@variantrule Speed|XPHB}, and senses are replaced by the creature's. You otherwise keep your game statistics.",
      "Meanwhile, the possessed creature's soul can perceive from the container using its own senses, but it can't move and it is {@condition Incapacitated|XPHB}.",
      "While possessing a body, you can take a {@action Magic|XPHB} action to return from the host body to the container if it is within 100 feet of you, returning the host creature's soul to its body. If the host body dies while you're in it, the creature dies, and you make a Charisma saving throw against your own spellcasting DC. On a success, you return to the container if it is within 100 feet of you. Otherwise, you die.",
      "If the container is destroyed or the spell ends, your soul returns to your body. If your body is more than 100 feet away from you or if your body is dead, you die. If another creature's soul is in the container when it is destroyed, the creature's soul returns to its body if the body is alive and within 100 feet. Otherwise, that creature dies.",
      "When the spell ends, the container is destroyed."
    ],
    "savingThrow": [
      "charisma"
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "miscTags": [
      "SGT"
    ]
  },
  {
    "name": "Magic Missile",
    "source": "XPHB",
    "page": 295,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You create three glowing darts of magical force. Each dart strikes a creature of your choice that you can see within range. A dart deals {@damage 1d4 + 1} Force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The spell creates one more dart for each spell slot level above 1."
        ]
      }
    ],
    "damageInflict": [
      "force"
    ],
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "MT",
      "ST"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Magic Mouth",
    "source": "XPHB",
    "page": 295,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "s": true,
      "m": {
        "text": "jade dust worth 10+ GP, which the spell consumes",
        "cost": 1000,
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "You implant a message within an object in range—a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn't being worn or carried by another creature. Then speak the message, which must be 25 words or fewer, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message.",
      "When that trigger occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there, so the words appear to come from the object's mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeat its message whenever the trigger occurs.",
      "The trigger can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it."
    ],
    "miscTags": [
      "OBJ",
      "SGT"
    ]
  },
  {
    "name": "Magic Weapon",
    "source": "XPHB",
    "page": 295,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
      "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls. The spell ends early if you cast it again."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The bonus increases to +2 with a level 3-5 spell slot. The bonus increases to +3 with a level 6+ spell slot."
        ]
      }
    ]
  },
  {
    "name": "Major Image",
    "source": "XPHB",
    "page": 295,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
      "s": true,
      "m": "a bit of fleece"
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
      "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image appears at a spot that you can see within range and lasts for the duration. It seems real, including sounds, smells, and temperature appropriate to the thing depicted, but it can't deal damage or cause conditions.",
      "If you are within range of the illusion, you can take a {@action Magic|XPHB} action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.",
      "Physical interaction with the image reveals it to be an illusion, for things can pass through it. A creature that takes a {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The spell lasts until dispelled, without requiring {@status Concentration|XPHB}, if cast with a level 4+ spell slot."
        ]
      }
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "miscTags": [
      "PRM",
      "SGT"
    ]
  },
  {
    "name": "Mass Cure Wounds",
    "source": "XPHB",
    "page": 296,
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
      "A wave of healing energy washes out from a point you can see within range. Choose up to six creatures in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point. Each target regains {@variantrule Hit Points|XPHB} equal to {@dice 5d8} plus your spellcasting ability modifier."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 5d8|5-9|1d8} for each spell slot level above 5."
        ]
      }
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "MT",
      "S"
    ]
  }
];
