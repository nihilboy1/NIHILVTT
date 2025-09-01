// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "House Agent",
    "source": "ERLW",
    "page": 53,
    "skillProficiencies": [
      {
        "investigation": true,
        "persuasion": true
      }
    ],
    "toolProficiencies": [
      {
        "alchemist's supplies": true,
        "tinker's tools": true
      },
      {
        "anyGamingSet": 1,
        "vehicles (land)": true
      },
      {
        "brewer's supplies": true,
        "cook's utensils": true
      },
      {
        "alchemist's supplies": true,
        "herbalism kit": true
      },
      {
        "tinker's tools": true,
        "thieves' tools": true
      },
      {
        "vehicles (water)": true,
        "vehicles (air)": true,
        "navigator's tools": true
      },
      {
        "thieves' tools": true,
        "disguise kit": true
      },
      {
        "disguise kit": true,
        "anyMusicalInstrument": 1
      },
      {
        "calligrapher's supplies": true,
        "forgery kit": true
      },
      {
        "thieves' tools": true,
        "anyGamingSet": 1
      },
      {
        "poisoner's kit": true,
        "anyMusicalInstrument": 1
      },
      {
        "vehicles (land)": true,
        "herbalism kit": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "fine clothes|phb",
          {
            "item": "signet ring|phb",
            "displayName": "house signet ring"
          },
          {
            "special": "identification papers"
          },
          {
            "special": "purse",
            "containsValue": 2000
          }
        ]
      }
    ],
    "entries": [
      {
        "type": "list",
        "style": "list-hang-notitle",
        "items": [
          {
            "type": "item",
            "name": "Skill Proficiencies:",
            "entry": "{@skill Investigation}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entries": [
              "Two proficiencies from the House Tool Proficiencies table"
            ]
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item fine clothes|phb}, house {@item signet ring|phb}, identification papers, and a purse containing 20 gp."
          }
        ]
      },
      {
        "type": "table",
        "caption": "House Tool Proficiencies",
        "colLabels": [
          "Your House",
          "Proficiencies"
        ],
        "colStyles": [
          "col-2",
          "col-10"
        ],
        "rows": [
          [
            "Cannith",
            "{@item Alchemist's supplies|phb} and {@item tinker's tools|phb}"
          ],
          [
            "Deneith",
            "One {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} and {@filter vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          ],
          [
            "Ghallanda",
            "{@item Brewer's supplies|phb} and {@item cook's utensils|phb}"
          ],
          [
            "Jorasco",
            "{@item Alchemist's supplies|phb} and {@item herbalism kit|phb}"
          ],
          [
            "Kundarak",
            "{@item Thieves' tools|phb} and {@item tinker's tools|phb}"
          ],
          [
            "Lyrandar",
            "{@item Navigator's tools|phb} and {@filter vehicles (sea and air)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (water);vehicle (air)}"
          ],
          [
            "Medani",
            "{@item Disguise kit|phb} and {@item thieves' tools|phb}"
          ],
          [
            "Orien",
            "One {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} and {@filter vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          ],
          [
            "Phiarlan",
            "{@item Disguise kit|phb} and one {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          ],
          [
            "Sivis",
            "{@item Calligrapher's supplies|phb} and {@item forgery kit|phb}"
          ],
          [
            "Tharashk",
            "One {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} and {@item thieves' tools|phb}"
          ],
          [
            "Thuranni",
            "One {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} and {@item poisoner's kit|phb}"
          ],
          [
            "Vadalis",
            "{@item herbalism kit|phb} and {@filter vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          ]
        ]
      },
      {
        "type": "entries",
        "name": "Role",
        "entries": [
          "You always gather information for your house, but when a baron give you a specific mission, what sort of work do you do? The House Agent Role table gives possibilities.",
          {
            "type": "table",
            "caption": "House Agent Role",
            "colLabels": [
              "d8",
              "Role"
            ],
            "colStyles": [
              "col-6 text-center",
              "col-6 text-center"
            ],
            "rows": [
              [
                "1",
                "Acquisition"
              ],
              [
                "2",
                "Investigation"
              ],
              [
                "3",
                "Research & Development"
              ],
              [
                "4",
                "Security"
              ],
              [
                "5",
                "Intimidation"
              ],
              [
                "6",
                "Exploration"
              ],
              [
                "7",
                "Negotiation"
              ],
              [
                "8",
                "Covert Operations"
              ]
            ]
          }
        ]
      },
      {
        "name": "Feature: House Connections",
        "type": "entries",
        "entries": [
          "As an agent of your house, you can always get food and lodging for yourself and your friends at a house enclave. When the house assigns you a mission, it will usually provide you with the necessary supplies and transportation. Beyond this, you have many old friends, mentors, and rivals in your house, and you may encounter one of them when you interact with a house business. The degree to which such acquaintances are willing to help you depends on your current standing in your house."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "House agents are diverse. Consider the house you serve and the work you do when choosing characteristics.",
          {
            "type": "table",
            "caption": "Personality Traits",
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
                "I'm always looking to improve efficiency."
              ],
              [
                "2",
                "I love to share trivia about my house's business."
              ],
              [
                "3",
                "I never forget an insult against me or my house."
              ],
              [
                "4",
                "I'm enthusiastic about everything my house does."
              ],
              [
                "5",
                "I represent my house and take pride in my looks."
              ],
              [
                "6",
                "I'm critical of monarchies and limits on the houses."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ideals",
            "colLabels": [
              "d6",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Common Good}. My house serves a vital function, and its prosperity will help everyone. (Good)"
              ],
              [
                "2",
                "{@b Tradition}. I uphold traditions of my house and bring honor to my family. (Lawful)"
              ],
              [
                "3",
                "{@b Innovation}. Abandon old traditions and find better ways to do things. (Chaotic)"
              ],
              [
                "4",
                "{@b Power}. I want to ensure the prosperity of my house and wield its power myself. (Evil)"
              ],
              [
                "5",
                "{@b Discovery}. I want to learn all I can, both for my house and for my own curiosity. (Any)"
              ],
              [
                "6",
                "{@b Comfort}. I want to ensure that me and mine enjoy the best things in life. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Bonds",
            "colLabels": [
              "d6",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My house is my family. I would do anything for it."
              ],
              [
                "2",
                "I love someone from another house, but the relationship is forbidden."
              ],
              [
                "3",
                "Someone I love was killed by a rival faction within my house, and I will have revenge."
              ],
              [
                "4",
                "I don't care about the house as a whole, but I would do anything for my old mentor."
              ],
              [
                "5",
                "My house must evolve, and I'll lead the evolution."
              ],
              [
                "6",
                "I'm determined to impress the leaders of my house, and to become a leader myself."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Flaws",
            "colLabels": [
              "d6",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm fixated on following official protocols."
              ],
              [
                "2",
                "I'm obsessed with conspiracy theories and worried about secret societies and hidden demons."
              ],
              [
                "3",
                "My house and bloodline make me the best!"
              ],
              [
                "4",
                "My secret could get me expelled from my house."
              ],
              [
                "5",
                "My religious beliefs aren't widespread in my house."
              ],
              [
                "6",
                "I'm working for a hidden faction in my house that gives me secret assignments."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  }
];
