export const spellsPart10= [
  {
    "name": "Create or Destroy Water",
    "source": "XPHB",
    "page": 258,
    "srd52": true,
    "basicRules2024": true,
    "level": 1,
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
      "m": "a mix of water and sand"
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You do one of the following:",
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Create Water",
            "entries": [
              "You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range, extinguishing exposed flames there."
            ]
          },
          {
            "type": "item",
            "name": "Destroy Water",
            "entries": [
              "You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range."
            ]
          }
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "You create or destroy 10 additional gallons of water, or the size of the {@variantrule Cube [Area of Effect]|XPHB|Cube} increases by 5 feet, for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "PRM"
    ],
    "areaTags": [
      "C"
    ]
  },
  {
    "name": "Create Undead",
    "source": "XPHB",
    "page": 258,
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
        "type": "feet",
        "amount": 10
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": {
        "text": "one 150+ GP black onyx stone for each corpse",
        "cost": 15000
      }
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "You can cast this spell only at night. Choose up to three corpses of Medium or Small Humanoids within range. Each one becomes a {@creature Ghoul|XMM} under your control (see the {@book Monster Manual|XMM} for its stat block).",
      "As a {@variantrule Bonus Action|XPHB} on each of your turns, you can mentally command any creature you animated with this spell if the creature is within 120 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to them). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a particular place. If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. Once given an order, the creature continues to follow the order until its task is complete.",
      "The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature before the current 24-hour period ends. This use of the spell reasserts your control over up to three creatures you have animated with this spell rather than animating new ones."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "If you use a level 7 spell slot, you can animate or reassert control over four {@creature Ghoul|XMM|Ghouls}. If you use a level 8 spell slot, you can animate or reassert control over five {@creature Ghoul|XMM|Ghouls} or two {@creature Ghast|XMM|Ghasts} or {@creature Wight|XMM|Wights}. If you use a level 9 spell slot, you can animate or reassert control over six {@creature Ghoul|XMM|Ghouls}, three {@creature Ghast|XMM|Ghasts} or {@creature Wight|XMM|Wights}, or two {@creature Mummy|XMM|Mummies}. See the {@book Monster Manual|XMM} for these stat blocks."
        ]
      }
    ],
    "affectsCreatureType": [
      "humanoid"
    ],
    "miscTags": [
      "PRM",
      "SMN",
      "UBA"
    ]
  },
  {
    "name": "Creation",
    "source": "XPHB",
    "page": 259,
    "srd52": true,
    "basicRules2024": true,
    "level": 5,
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
      "m": "a paintbrush"
    },
    "duration": [
      {
        "type": "special"
      }
    ],
    "entries": [
      "You pull wisps of shadow material from the Shadowfell to create an object within range. It is either an object of vegetable matter (soft goods, rope, wood, and the like) or mineral matter (stone, crystal, metal, and the like). The object must be no larger than a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}, and the object must be of a form and material that you have seen.",
      "The spell's duration depends on the object's material, as shown in the Materials table. If the object is composed of multiple materials, use the shortest duration. Using any object created by this spell as another spell's Material component causes the other spell to fail.",
      {
        "type": "table",
        "caption": "Materials",
        "colStyles": [
          "col-6",
          "col-6"
        ],
        "colLabels": [
          "Material",
          "Duration"
        ],
        "rows": [
          [
            "Vegetable matter",
            "24 hours"
          ],
          [
            "Stone or crystal",
            "12 hours"
          ],
          [
            "Precious metals",
            "1 hour"
          ],
          [
            "Gems",
            "10 minutes"
          ],
          [
            "Adamantine or mithral",
            "1 minute"
          ]
        ]
      }
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The {@variantrule Cube [Area of Effect]|XPHB|Cube} increases by 5 feet for each spell slot level above 5."
        ]
      }
    ]
  },
  {
    "name": "Crown of Madness",
    "source": "XPHB",
    "page": 259,
    "level": 2,
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
        "type": "timed",
        "duration": {
          "type": "minute",
          "amount": 1
        },
        "concentration": true
      }
    ],
    "entries": [
      "One creature that you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The creature succeeds automatically if it isn't Humanoid.",
      "A spectral crown appears on the {@condition Charmed|XPHB} target's head, and it must use its action before moving on each of its turns to make a melee attack against a creature other than itself that you mentally choose. The target can act normally on its turn if you choose no creature or if no creature is within its reach. The target repeats the save at the end of each of its turns, ending the spell on itself on a success.",
      "On your later turns, you must take the {@action Magic|XPHB} action to maintain control of the target, or the spell ends."
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
    "miscTags": [
      "SGT"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Crusader's Mantle",
    "source": "XPHB",
    "page": 259,
    "level": 3,
    "school": "V",
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
      "You radiate a magical aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. While in the aura, you and your allies each deal an extra {@damage 1d4} Radiant damage when hitting with a weapon or an {@variantrule Unarmed Strike|XPHB}."
    ],
    "damageInflict": [
      "radiant"
    ],
    "miscTags": [
      "AAD"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Cure Wounds",
    "source": "XPHB",
    "page": 259,
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
      "s": true
    },
    "duration": [
      {
        "type": "instant"
      }
    ],
    "entries": [
      "A creature you touch regains a number of {@variantrule Hit Points|XPHB} equal to {@dice 2d8} plus your spellcasting ability modifier."
    ],
    "entriesHigherLevel": [
      {
        "type": "entries",
        "name": "Using a Higher-Level Spell Slot",
        "entries": [
          "The healing increases by {@scaledice 2d8|1-9|2d8} for each spell slot level above 1."
        ]
      }
    ],
    "miscTags": [
      "HL"
    ],
    "areaTags": [
      "ST"
    ]
  },
  {
    "name": "Dancing Lights",
    "source": "XPHB",
    "page": 259,
    "srd52": true,
    "basicRules2024": true,
    "level": 0,
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
      "m": "a bit of phosphorus"
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
      "You create up to four torch-size lights within range, making them appear as torches, lanterns, or glowing orbs that hover for the duration. Alternatively, you combine the four lights into one glowing Medium form that is vaguely humanlike. Whichever form you choose, each light sheds {@variantrule Dim Light|XPHB} in a 10-foot radius.",
      "As a {@variantrule Bonus Action|XPHB}, you can move the lights up to 60 feet to a space within range. A light must be within 20 feet of another light created by this spell, and a light vanishes if it exceeds the spell's range."
    ],
    "miscTags": [
      "LGT",
      "UBA"
    ]
  },
  {
    "name": "Darkness",
    "source": "XPHB",
    "page": 260,
    "srd52": true,
    "basicRules2024": true,
    "level": 2,
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
        "amount": 60
      }
    },
    "components": {
      "v": true,
      "m": "bat fur and a piece of coal"
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
      "For the duration, magical {@variantrule Darkness|XPHB} spreads from a point within range and fills a 15-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. {@sense Darkvision|XPHB} can't see through it, and nonmagical light can't illuminate it.",
      "Alternatively, you cast the spell on an object that isn't being worn or carried, causing the {@variantrule Darkness|XPHB} to fill a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the {@variantrule Darkness|XPHB}.",
      "If any of this spell's area overlaps with an area of {@variantrule Bright Light|XPHB} or {@variantrule Dim Light|XPHB} created by a spell of level 2 or lower, that other spell is dispelled."
    ],
    "miscTags": [
      "OBJ"
    ],
    "areaTags": [
      "S"
    ]
  },
  {
    "name": "Darkvision",
    "source": "XPHB",
    "page": 260,
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
        "type": "touch"
      }
    },
    "components": {
      "v": true,
      "s": true,
      "m": "a dried carrot"
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
      "For the duration, a willing creature you touch has {@sense Darkvision|XPHB} with a range of 150 feet."
    ],
    "areaTags": [
      "ST"
    ]
  }
];
