// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Giant Foundling",
    "source": "BGG",
    "page": 6,
    "feats": [
      {
        "strike of the giants|bgg": true
      }
    ],
    "skillProficiencies": [
      {
        "intimidation": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "giant": true,
        "anyStandard": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "backpack|phb",
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      },
      {
        "a": [
          {
            "special": "small stone that reminds you of home"
          }
        ],
        "b": [
          {
            "special": "sprig that reminds you of home"
          }
        ]
      }
    ],
    "fromFeature": {
      "feats": true
    },
    "entries": [
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Skill Proficiencies:",
            "entry": "{@skill Intimidation}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Giant and one other language of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item backpack|phb}, a set of {@item traveler's clothes|phb}, a small stone or sprig that reminds you of home, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Origin Stories",
        "entries": [
          "How you came to live among colossal creatures is up to you to determine, but the Foundling Origin table suggests a variety of possibilities.",
          {
            "type": "table",
            "caption": "Foundling Origin",
            "colLabels": [
              "d6",
              "Origin"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "You were found as a baby by a family of nomadic giants who raised you as one of their own."
              ],
              [
                "2",
                "A family of stone giants rescued you when you fell into a mountain chasm, and you have lived with them underground ever since."
              ],
              [
                "3",
                "You were lost or abandoned as a child in a jungle that teemed with ravenous dinosaurs. There, you found an equally lost frost giant; together, you survived."
              ],
              [
                "4",
                "Your farm was crushed and your family killed in a battle between warring groups of giants. Racked with guilt over the destruction, a sympathetic giant soldier promised to care for you."
              ],
              [
                "5",
                "After you had a series of strange dreams as a child, your superstitious parents sent you to study with a powerful but aloof storm giant oracle."
              ],
              [
                "6",
                "While playing hide-and-seek with your friends, you stumbled into the castle of a cloud giant, who immediately adopted you."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Giant Foundling Character",
        "entries": [
          "Your life among giants has given you a unique perspective. Though you are unusually large for your kind, you're no larger than a giant child, so you might be very mindful of your size."
        ]
      },
      {
        "name": "Feature: Strike of the Giants",
        "type": "entries",
        "entries": [
          "You gain the {@feat Strike of the Giants|BGG} feat."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "The Giant Foundling Personality Traits table suggests a variety of traits you might adopt for your character.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "What I lack in stature compared to giants, I make up for with sheer spite."
              ],
              [
                "2",
                "I insist on being taken seriously as a full-grown adult. Nobody talks down to me!"
              ],
              [
                "3",
                "Crowded spaces make me uncomfortable. I'd much rather be in an open field than a bustling tavern."
              ],
              [
                "4",
                "I embrace my shorter stature. It helps me stay unnoticed—and underestimated."
              ],
              [
                "5",
                "Every avalanche begins as a single pebble."
              ],
              [
                "6",
                "The world always feels too big, and I'm afraid I'll never find my place in it."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Rune Carver",
    "source": "BGG",
    "page": 12,
    "feats": [
      {
        "rune shaper|bgg": true
      }
    ],
    "skillProficiencies": [
      {
        "history": true,
        "perception": true
      }
    ],
    "languageProficiencies": [
      {
        "giant": true
      }
    ],
    "toolProficiencies": [
      {
        "anyArtisansTool": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "equipmentType": "toolArtisan"
          },
          {
            "special": "small knife"
          },
          "whetstone|phb",
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      }
    ],
    "fromFeature": {
      "feats": true
    },
    "entries": [
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Skill Proficiencies:",
            "entry": "{@skill History}, {@skill Perception}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Giant"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} (one of your choice), a small knife, a {@item whetstone|phb}, a set of {@item common clothes|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Rune Styles",
        "entries": [
          "Each rune carver has a unique style and preferred medium. To determine how you make your runes, you can roll on the Rune Style table.",
          {
            "type": "table",
            "caption": "Rune Style",
            "colLabels": [
              "d6",
              "Style"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "You inscribe runes in wax or clay with a fine metal needle."
              ],
              [
                "2",
                "You whittle pieces of wood into small figurines you mark with runes."
              ],
              [
                "3",
                "You engrave runes onto glass beads and thread them onto necklaces and bracelets."
              ],
              [
                "4",
                "You stitch runes into the hems of clothing."
              ],
              [
                "5",
                "You carve runes on a set of animal bones you can throw in different formations."
              ],
              [
                "6",
                "You draw runes into candles, melting the wax to smooth over the engravings."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Rune Carver Character",
        "entries": [
          "Scholarly pursuits, ancient mysteries, or a fateful encounter might inspire a character to pursue the secrets of a rune carver."
        ]
      },
      {
        "name": "Feature: Rune Shaper",
        "type": "entries",
        "entries": [
          "You gain the {@feat Rune Shaper|BGG} feat."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "The Rune Carver Personality Traits table suggests a variety of traits you might adopt for your character.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Is it practical to learn an ancient language that is rarely spoken? No. But is it fun? Very."
              ],
              [
                "2",
                "I learned one of my ancestors was a lauded rune carver whose story was lost to time. I seek to rekindle that legacy."
              ],
              [
                "3",
                "The old, traditional markings of runecraft look so boring. Why not give my runes some flair?"
              ],
              [
                "4",
                "In my studies of runes, I strive to understand how great civilizations of the past fell, so I can prevent it from happening to societies of the present."
              ],
              [
                "5",
                "Life may be a whirlwind of chaos, but whenever I create my runes, I feel at peace."
              ],
              [
                "6",
                "My brain struggles to process words written in ink, but the feeling of carved runes makes my mind sing."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  }
];
