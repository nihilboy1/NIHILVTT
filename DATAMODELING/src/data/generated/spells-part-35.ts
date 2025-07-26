export const spellsPart35= [
  {
    "name": "Shillelagh",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "m": "mistletoe"
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
      "A Club or Quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a {@dice d8}. If the attack deals damage, it can be Force damage or the weapon's normal damage type (your choice).",
      "The spell ends early if you cast it again or if you let go of the weapon."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage die changes when you reach levels 5 ({@damage d10}), 11 ({@damage d12}), and 17 ({@damage 2d6})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "damage",
      "scaling": {
        "1": "1d8",
        "5": "1d10",
        "11": "1d12",
        "17": "2d6"
      }
    },
    "miscTags": [
      "AAD",
      "SCL"
    ]
  },
  {
    "name": "Shining Smite",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
    "school": "T",
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
      "The target hit by the strike takes an extra {@damage 2d6} Radiant damage from the attack. Until the spell ends, the target sheds {@variantrule Bright Light|XPHB} in a 5-foot radius, attack rolls against it have {@variantrule Advantage|XPHB}, and it can't benefit from the {@condition Invisible|XPHB} condition."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The damage increases by {@scaledamage 2d6|2-9|1d6} for each spell slot level above 2."
        ]
      }
    ],
    "damageInflict": [
      "radiant"
    ],
    "miscTags": [
      "AAD",
      "ADV",
      "LGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Shocking Grasp",
    "source": "XPHB",
    "page": 316,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "Lightning springs from you to a creature that you try to touch. Make a melee spell attack against the target. On a hit, the target takes {@damage 1d8} Lightning damage, and it can't make {@action Opportunity Attack|XPHB|Opportunity Attacks} until the start of its next turn."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Cantrip Upgrade",
        "entries": [
          "The damage increases by {@damage 1d8} when you reach levels 5 ({@damage 2d8}), 11 ({@damage 3d8}), and 17 ({@damage 4d8})."
        ]
      }
    ],
    "scalingLevelDice": {
      "label": "Lightning damage",
      "scaling": {
        "1": "1d8",
        "5": "2d8",
        "11": "3d8",
        "17": "4d8"
      }
    },
    "damageInflict": [
      "lightning"
    ],
    "spellAttack": [
      "M"
    ],
    "miscTags": [
      "SCL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Silence",
    "source": "XPHB",
    "page": 316,
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
    "meta": {
      "ritual": true
    },
    "entries": [
      "For the duration, no sound can be created within or pass through a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. Any creature or object entirely inside the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} has {@variantrule Immunity|XPHB} to Thunder damage, and creatures have the {@condition Deafened|XPHB} condition while entirely inside it. Casting a spell that includes a Verbal component is impossible there."
    ],
    "damageImmune": [
      "thunder"
    ],
    "conditionInflict": [
      "deafened"
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Silent Image",
    "source": "XPHB",
    "page": 317,
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
          "amount": 10
        },
        "concentration": true
      }
    ],
    "entries": [
      "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.",
      "As a {@action Magic|XPHB} action, you can cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.",
      "Physical interaction with the image reveals it to be an illusion, since things can pass through it. A creature that takes a {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image."
    ],
    "abilityCheck": [
      "intelligence"
    ],
    "hasFluffImages": true
  },
  {
    "name": "Simulacrum",
    "source": "XPHB",
    "page": 317,
    "srd52": true,
    "basicRules2024": true,
    "level": 7,
    "school": "I",
    "time": [
      {
        "number": 12,
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
        "text": "powdered ruby worth 1,500+ GP, which the spell consumes",
        "cost": 150000,
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
      "You create a simulacrum of one Beast or Humanoid that is within 10 feet of you for the entire casting of the spell. You finish the casting by touching both the creature and a pile of ice or snow that is the same size as that creature, and the pile turns into the simulacrum, which is a creature. It uses the game statistics of the original creature at the time of casting, except it is a Construct, its {@variantrule Hit Points|XPHB|Hit Point} maximum is half as much, and it can't cast this spell.",
      "The simulacrum is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you and creatures you designate. It obeys your commands and acts on your turn in combat. The simulacrum can't gain levels, and it can't take Short or Long Rests.",
      "If the simulacrum takes damage, the only way to restore its {@variantrule Hit Points|XPHB} is to repair it as you take a {@variantrule Long Rest|XPHB}, during which you expend components worth 100 GP per {@variantrule Hit Points|XPHB|Hit Point} restored. The simulacrum must stay within 5 feet of you for the repair.",
      "The simulacrum lasts until it drops to 0 {@variantrule Hit Points|XPHB}, at which point it reverts to snow and melts away. If you cast this spell again, any simulacrum you created with this spell is instantly destroyed."
    ],
    "affectsCreatureType": [
      "beast",
      "humanoid"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Sleep",
    "source": "XPHB",
    "page": 317,
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
      "v": true,
      "s": true,
      "m": "a pinch of sand or rose petals"
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
      "Each creature of your choice in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range must succeed on a Wisdom saving throw or have the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it must repeat the save. If the target fails the second save, the target has the {@condition Unconscious|XPHB} condition for the duration. The spell ends on a target if it takes damage or someone within 5 feet of it takes an action to shake it out of the spell's effect.",
      "Creatures that don't sleep, such as elves, or that have {@variantrule Immunity|XPHB} to the {@condition Exhaustion|XPHB} condition automatically succeed on saves against this spell."
    ],
    "conditionInflict": [
      "incapacitated",
      "unconscious"
    ],
    "savingThrow": [
      "wisdom"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Sleet Storm",
    "source": "XPHB",
    "page": 317,
    "srd52": true,
    "basicRules2024": true,
    "level": 3,
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
        "amount": 150
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a miniature umbrella"
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
      "Until the spell ends, sleet falls in a 40-foot-tall, 20-foot-radius {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point you choose within range. The area is {@variantrule Heavily Obscured|XPHB}, and exposed flames in the area are doused.",
      "Ground in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} is {@variantrule Difficult Terrain|XPHB}. When a creature enters the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the {@condition Prone|XPHB} condition and lose {@status Concentration|XPHB}."
    ],
    "conditionInflict": [
      "prone"
    ],
    "savingThrow": [
      "dexterity"
    ],
    "miscTags": [
      "DFT",
      "OBS"
    ],
    "areaTags": [
      "Y"
    ]
  },
  {
    "name": "Slow",
    "source": "XPHB",
    "page": 318,
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
        "type": "feet",
        "amount": 120
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a drop of molasses"
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
      "You alter time around up to six creatures of your choice in a 40-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration.",
      "An affected target's {@variantrule Speed|XPHB} is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't take Reactions. On its turns, it can take either an action or a {@variantrule Bonus Action|XPHB}, not both, and it can make only one attack if it takes the {@action Attack|XPHB} action. If it casts a spell with a Somatic component, there is a {@chance 25|||The spell fails!|The spell does not fail.} chance the spell fails as a result of the target making the spell's gestures too slowly.",
      "An affected target repeats the save at the end of each of its turns, ending the spell on itself on a success."
    ],
    "savingThrow": [
      "wisdom"
    ],
    "miscTags": [
      "MAC"
    ],
    "areaTags": [
      "C",
      "MT"
    ]
  }
];
