// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "City Watch",
    "source": "SCAG",
    "page": 145,
    "skillProficiencies": [
      {
        "athletics": true,
        "insight": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "uniform in the style of your unit and indicative of your rank"
          },
          {
            "item": "horn|phb",
            "displayName": "horn with which to summon help"
          },
          {
            "item": "manacles|phb",
            "displayName": "set of manacles"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
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
            "entry": "{@skill Athletics}, {@skill Insight}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A uniform in the style of your unit and indicative of your rank, a {@item horn|phb} with which to summon help, a set of {@item manacles|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Watcher's Eye",
        "type": "entries",
        "entries": [
          "Your experience in enforcing the law, and dealing with lawbreakers, gives you a feel for local laws and criminals. You can easily find the local outpost of the watch or a similar organization, and just as easily pick out the dens of criminal activity in a community, although you're more likely to be welcome in the former locations rather than the latter."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background soldier} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a member of the city watch.",
          "Your bond is likely associated with your fellow watch members or the watch organization itself and almost certainly concerns your community. Your ideal probably involves the fostering of peace and safety. An investigator is likely to have an ideal connected to achieving justice by successfully solving crimes."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Clan Crafter",
    "source": "SCAG",
    "page": 145,
    "skillProficiencies": [
      {
        "history": true,
        "insight": true
      }
    ],
    "languageProficiencies": [
      {
        "dwarvish": true
      },
      {
        "anyStandard": 1
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
            "special": "maker's mark chisel used to mark your handiwork with the symbol of the clan of crafters you learned your skill from"
          },
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1500
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
            "entry": "{@skill History}, {@skill Insight}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Dwarvish or one of your choice if you already speak Dwarvish"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} with which you are proficient, a maker's mark chisel used to mark your handiwork with the symbol of the clan of crafters you learned your skill from, a set of {@item traveler's clothes|phb}, and a {@item pouch|phb} containing 5 gp and a gem worth 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Respect of the Stout Folk",
        "type": "entries",
        "entries": [
          "As well respected as clan crafters are among outsiders, no one esteems them quite so highly as dwarves do. You always have free room and board in any place where shield dwarves or gold dwarves dwell, and the individuals in such a settlement might vie among themselves to determine who can offer you (and possibly your companions) the finest accommodations and assistance."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background guild artisan} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a clan crafter. (For instance, consider the words \"guild\" and \"clan\" to be interchangeable.)",
          "Your bond is almost certainly related to the master or the clan that taught you, or else to the work that you produce. Your ideal might have to do with maintaining the high quality of your work or preserving the dwarven traditions of craftsmanship."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Cloistered Scholar",
    "source": "SCAG",
    "page": 146,
    "skillProficiencies": [
      {
        "history": true,
        "choose": {
          "from": [
            "arcana",
            "nature",
            "religion"
          ]
        }
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "robes|phb",
            "displayName": "The scholar's robes of your cloister"
          },
          "pouch|phb",
          {
            "special": "quill"
          },
          {
            "special": "ink"
          },
          {
            "special": "folded parchment"
          },
          {
            "special": "small penknife"
          },
          {
            "item": "book|phb",
            "displayName": "borrowed book on the subject of your current study"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
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
            "entry": "{@skill History}, plus your choice of one from among {@skill Arcana}, {@skill Nature}, and {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "any two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "The scholar's {@item robes|phb} of your cloister, a writing kit (small {@item pouch|phb} with a quill, ink, folded parchment, and a small penknife), a borrowed {@item book|phb} on the subject of your current study, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Library Access",
        "type": "entries",
        "entries": [
          "Though others must often endure extensive interviews and significant fees to gain access to even the most common archives in your library, you have free and easy access to the majority of the library, though it might also have repositories of lore that are too valuable, magical, or secret to permit anyone immediate access.",
          "You have a working knowledge of your cloister's personnel and bureaucracy, and you know how to navigate those connections with some ease.",
          "Additionally, you are likely to gain preferential treatment at other libraries across the Realms, as professional courtesy to a fellow scholar."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background sage} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a cloistered scholar.",
          "Your bond is almost certainly associated either with the place where you grew up or with the knowledge you hope to acquire through adventuring. Your ideal is no doubt related to how you view the quest for knowledge and truth - perhaps as a worthy goal in itself, or maybe as a means to a desirable end."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Courtier",
    "source": "SCAG",
    "page": 146,
    "skillProficiencies": [
      {
        "insight": true,
        "persuasion": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "fine clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 500
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
            "entry": "{@skill Insight}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item fine clothes|phb} and a {@item pouch|phb} containing 5 gp"
          }
        ]
      },
      {
        "name": "Feature: Court Functionary",
        "type": "entries",
        "entries": [
          "Your knowledge of how bureaucracies function lets you gain access to the records and inner workings of any noble court or government you encounter. You know who the movers and shakers are, whom to go to for the favors you seek, and what the current intrigues of interest in the group are."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background guild artisan} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a courtier.",
          "The noble court or bureaucratic organization where you got your start is directly or indirectly associated with your bond (which could pertain to certain individuals in the group, such as your sponsor or mentor). Your ideal might be concerned with the prevailing philosophy of your court or organization."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Faction Agent",
    "source": "SCAG",
    "page": 147,
    "skillProficiencies": [
      {
        "insight": true,
        "choose": {
          "from": [
            "arcana",
            "animal handling",
            "deception",
            "history",
            "intimidation",
            "investigation",
            "medicine",
            "nature",
            "perception",
            "performance",
            "persuasion",
            "religion",
            "survival"
          ]
        }
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "Badge or emblem of your faction"
          },
          {
            "special": "copy of a seminal faction text (or code-book for a covert faction)"
          },
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1500
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
            "entry": "{@skill Insight} and one Intelligence, Wisdom, or Charisma skill of your choice, as appropriate to your faction"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "Badge or emblem of your faction, a copy of a seminal faction text (or code-book for a covert faction), a set of {@item common clothes|phb}, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "name": "Feature: Safe Haven",
        "type": "entries",
        "entries": [
          "As a faction agent, you have access to a secret network of supporters and operatives who can provide assistance on your adventures. You know a set of secret signs and passwords you can use to identify such operatives, who can provide you with access to a hidden safe house, free room and board, or assistance in finding information. These agents never risk their lives for you or risk revealing their true identities."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background acolyte} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a faction agent. (For instance, consider the words \"faith\" and \"faction\" to be interchangeable.)",
          "Your bond might be associated with other members of your faction, or a location or an object that is important to your faction. The ideal you strive for is probably in keeping with the tenets and principles of your faction, but might be more personal in nature."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Far Traveler",
    "source": "SCAG",
    "page": 148,
    "skillProficiencies": [
      {
        "insight": true,
        "perception": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "musical instrument",
            "gaming set"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "traveler's clothes|phb",
          {
            "special": "poorly wrought maps from your homeland that depict where you are in Faerûn"
          },
          {
            "special": "small piece of jewelry in the style of your homeland's craftsmanship",
            "worthValue": 1000
          },
          {
            "item": "pouch|phb",
            "containsValue": 500
          }
        ]
      },
      {
        "a": [
          {
            "equipmentType": "instrumentMusical"
          }
        ],
        "b": [
          {
            "equipmentType": "setGaming"
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
            "entry": "{@skill Insight}, {@skill Perception}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "Any one {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} or {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} of your choice, likely something native to your homeland"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any one of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "One set of {@item traveler's clothes|phb}, any one {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} or {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} you are proficient with, poorly wrought maps from your homeland that depict where you are in Faerûn, a small piece of jewelry worth 10 gp in the style of your homeland's craftsmanship, and a {@item pouch|phb} containing 5 gp"
          }
        ]
      },
      {
        "name": "Feature: All Eyes on You",
        "type": "entries",
        "entries": [
          "Your accent, mannerisms, figures of speech, and perhaps even your appearance all mark you as foreign. Curious glances are directed your way wherever you go, which can be a nuisance, but you also gain the friendly interest of scholars and others intrigued by far-off lands, to say nothing of everyday folk who are eager to hear stories of your homeland.",
          "You can parley this attention into access to people and places you might not otherwise have, for you and your traveling companions. Noble lords, scholars, and merchant princes, to name a few, might be interested in hearing about your distant homeland and people."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Why Are You Here?",
        "type": "entries",
        "entries": [
          "A far traveler might have set out on a journey for one of a number of reasons, and the departure from his or her homeland could have been voluntary or involuntary. To determine why you are so far from home, roll on the table below or choose from the options provided. The following section, discussing possible homelands, includes some suggested reasons that are appropriate for each location.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Reason"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "Emissary"
              ],
              [
                "2",
                "Exile"
              ],
              [
                "3",
                "Fugitive"
              ],
              [
                "4",
                "Pilgrim"
              ],
              [
                "5",
                "Sightseer"
              ],
              [
                "6",
                "Wanderer"
              ]
            ]
          }
        ]
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Personality Trait"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "I have different assumptions from those around me concerning personal space, blithely invading others' space in innocence, or reacting to ignorant invasion of my own."
              ],
              [
                "2",
                "I have my own ideas about what is and is not food, and I find the eating habits of those around me fascinating, confusing, or revolting."
              ],
              [
                "3",
                "I have a strong code of honor or sense of propriety that others don't comprehend."
              ],
              [
                "4",
                "I express affection or contempt in ways that are unfamiliar to others."
              ],
              [
                "5",
                "I honor my deities through practices that are foreign to this land."
              ],
              [
                "6",
                "I begin or end my day with small traditional rituals that are unfamiliar to those around me."
              ]
            ]
          },
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Ideal"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "Open. I have much to learn from the kindly folk I meet along my way. (Good)"
              ],
              [
                "2",
                "Reserved. As someone new to these strange lands, I am cautious and respectful in my dealings. (Lawful)"
              ],
              [
                "3",
                "Adventure. I'm far from home, and everything is strange and wonderful! (Chaotic)"
              ],
              [
                "4",
                "Cunning. Though I may not know their ways, neither do they know mine, which can be to my advantage. (Evil)"
              ],
              [
                "5",
                "Inquisitive. Everything is new, but I have a thirst to learn. (Neutral)"
              ],
              [
                "6",
                "Suspicious. I must be careful, for I have no way of telling friend from foe here. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Bond"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "So long as I have this token from my homeland, I can face any adversity in this strange land."
              ],
              [
                "2",
                "The gods of my people are a comfort to me so far away from home."
              ],
              [
                "3",
                "I hold no greater cause than my service to my people."
              ],
              [
                "4",
                "My freedom is my most precious possession. I'll never let anyone take it from me again."
              ],
              [
                "5",
                "I'm fascinated by the beauty and wonder of this new land."
              ],
              [
                "6",
                "Though I had no choice, I lament having to leave my loved one(s) behind. I hope to see them again one day."
              ]
            ]
          },
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Flaw"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "I am secretly (or not so secretly) convinced of the superiority of my own culture over that of this foreign land."
              ],
              [
                "2",
                "I pretend not to understand the local language in order to avoid interactions I would rather not have."
              ],
              [
                "3",
                "I have a weakness for the new intoxicants and other pleasures of this land."
              ],
              [
                "4",
                "I don't take kindly to some of the actions and motivations of the people of this land, because these folks are different from me."
              ],
              [
                "5",
                "I consider the adherents of other gods to be deluded innocents at best, or ignorant fools at worst."
              ],
              [
                "6",
                "I have a weakness for the exotic beauty of the people of these lands."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Inheritor",
    "source": "SCAG",
    "page": 150,
    "skillProficiencies": [
      {
        "survival": true,
        "choose": {
          "from": [
            "arcana",
            "history",
            "religion"
          ]
        }
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "musical instrument",
            "gaming set"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "Your inheritance"
          },
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      },
      {
        "a": [
          {
            "equipmentType": "setGaming"
          }
        ],
        "b": [
          {
            "equipmentType": "instrumentMusical"
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
            "entry": "{@skill Survival}, plus one from among {@skill Arcana}, {@skill History}, and {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any one of your choice"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "Your choice of a {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} or a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "Your inheritance, a set of {@item traveler's clothes|phb}, the tool you choose for this background's tool proficiency ({@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} or {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}), and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "name": "Feature: Inheritance",
        "type": "entries",
        "entries": [
          "Choose or randomly determine your inheritance from the possibilities in the table below. Work with your Dungeon Master to come up with details: Why is your inheritance so important, and what is its full story? You might prefer for the DM to invent these details as part of the game, allowing you to learn more about your inheritance as your character does.",
          "The Dungeon Master is free to use your inheritance as a story hook, sending you on quests to learn more about its history or true nature, or confronting you with foes who want to claim it for themselves or prevent you from learning what you seek. The DM also determines the properties of your inheritance and how they figure into the item's history and importance. For instance, the object might be a minor magic item, or one that begins with a modest ability and increases in potency with the passage of time. Or, the true nature of your inheritance might not be apparent at first and is revealed only when certain conditions are met.",
          "When you begin your adventuring career, you can decide whether to tell your companions about your inheritance right away. Rather than attracting attention to yourself, you might want to keep your inheritance a secret until you learn more about what it means to you and what it can do for you.",
          {
            "type": "table",
            "colLabels": [
              "d8",
              "Object or item:"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "A document such as a map, a letter, or a journal"
              ],
              [
                "2-3",
                "a trinket (see \"Trinkets\" in chapter 5 of the Player's Handbook)"
              ],
              [
                "4",
                "an article of clothing"
              ],
              [
                "5",
                "a piece of jewelry"
              ],
              [
                "6",
                "an arcane book or formulary"
              ],
              [
                "7",
                "a written story, song, poem, or secret"
              ],
              [
                "8",
                "a tattoo or other body marking"
              ]
            ]
          }
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background folk hero} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as an inheritor.",
          "Your bond might be directly related to your inheritance, or to the person from whom you received it. Your ideal might be influenced by what you know about your inheritance, or by what you intend to do with your gift once you realize what it is capable of."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Knight of the Order",
    "source": "SCAG",
    "page": 151,
    "skillProficiencies": [
      {
        "persuasion": true,
        "choose": {
          "from": [
            "arcana",
            "history",
            "nature",
            "religion"
          ]
        }
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "musical instrument",
            "gaming set"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "traveler's clothes|phb",
          {
            "special": "signet, banner, or seal representing your place or rank in the order"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
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
            "entry": "{@skill Persuasion}, plus one from among {@skill Arcana}, {@skill History}, {@skill Nature}, and {@skill Religion}, as appropriate for your order"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "Your choice of a {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} or a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any one of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "One set of {@item traveler's clothes|phb}, a signet, banner, or seal representing your place or rank in the order, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Knightly Regard",
        "type": "entries",
        "entries": [
          "You receive shelter and succor from members of your knightly order and those who are sympathetic to its aims. If your order is a religious one, you can gain aid from temples and other religious communities of your deity. Knights of civic orders can get help from the community—whether a lone settlement or a great nation—that they serve, and knights of philosophical orders can find help from those they have aided in pursuit of their ideals, and those who share their ideals.",
          "This help comes in the form of shelter and meals, and healing when appropriate, as well as occasionally risky assistance, such as a band of local citizens rallying to aid a sorely pressed knight, or those who support the order helping to smuggle a knight out of town when he or she is being hunted unjustly."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background soldier} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a knight of your order.",
          "Your bond almost always involves the order to which you belong (or at least key members of it), and it is highly unusual for a knight's ideal not to reflect the agenda, sentiment, or philosophy of one's order."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Mercenary Veteran",
    "source": "SCAG",
    "page": 152,
    "skillProficiencies": [
      {
        "athletics": true,
        "persuasion": true
      }
    ],
    "toolProficiencies": [
      {
        "anyGamingSet": 1,
        "vehicles (land)": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "traveler's clothes|phb",
            "displayName": "uniform of your company"
          },
          {
            "special": "insignia of your rank"
          },
          {
            "equipmentType": "setGaming"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
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
            "entry": "{@skill Athletics}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set}, {@filter vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A uniform of your company ({@item traveler's clothes|phb} in quality), an insignia of your rank, a {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} of your choice, and a {@item pouch|phb} containing the remainder of your last wages (10 gp)."
          }
        ]
      },
      {
        "name": "Feature: Mercenary Life",
        "type": "entries",
        "entries": [
          "You know the mercenary life as only someone who has experienced it can. You are able to identify mercenary companies by their emblems, and you know a little about any such company, including who has hired them recently. You can find the taverns and festhalls where mercenaries abide in any area, as long as you speak the language. You can find mercenary work between adventures sufficient to maintain a comfortable lifestyle (see \"{@book Practicing a Profession|PHB|8|Practicing a Profession}\" under \"Downtime Activities\" in chapter 8 of the Player's Handbook)."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background soldier} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a mercenary.",
          "Your bond could be associated with the company you traveled with previously, or with some of the comrades you served with. The ideal you embrace largely depends on your worldview and your motivation for fighting."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Urban Bounty Hunter",
    "source": "SCAG",
    "page": 153,
    "skillProficiencies": [
      {
        "choose": {
          "from": [
            "deception",
            "insight",
            "persuasion",
            "stealth"
          ],
          "count": 2
        }
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "gaming set",
            "musical instrument",
            "thieves' tools"
          ],
          "count": 2
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "pouch|phb",
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
            "entry": "Choose two from among {@skill Deception}, {@skill Insight}, {@skill Persuasion}, and {@skill Stealth}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "Choose two from among one type of {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set}, one {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}, and {@item thieves' tools|phb}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of clothes appropriate to your duties and a {@item pouch|phb} containing 20 gp"
          }
        ]
      },
      {
        "name": "Feature: Ear to the Ground",
        "type": "entries",
        "entries": [
          "You are in frequent contact with people in the segment of society that your chosen quarries move through. These people might be associated with the criminal underworld, the rough-and-tumble folk of the streets, or members of high society. This connection comes in the form of a contact in any city you visit, a person who provides information about the people and places of the local area."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background criminal} background in the Player's Handbook as the basis for your bounty hunter's traits and motivations, modifying the entries when appropriate to suit your identity as a bounty hunter.",
          "For instance, your bond might involve other bounty hunters or the organizations or individuals that employ you. Your ideal could be associated with your determination always to catch your quarry or your desire to maintain your reputation for being dependable."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Uthgardt Tribe Member",
    "source": "SCAG",
    "page": 153,
    "skillProficiencies": [
      {
        "athletics": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "musical instrument",
            "anyArtisansTool"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "hunting trap|phb",
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
            "special": "totemic token"
          }
        ],
        "b": [
          {
            "special": "set of tattoos marking your loyalty to Uthgar and your tribal totem"
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
            "entry": "{@skill Athletics}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any one of your choice"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} or {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item hunting trap|phb}, a totemic token or set of tattoos marking your loyalty to Uthgar and your tribal totem, a set of {@item traveler's clothes|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Uthgardt Heritage",
        "type": "entries",
        "entries": [
          "You have an excellent knowledge of not only your tribe's territory, but also the terrain and natural resources of the rest of the North. You are familiar enough with any wilderness area that you can find twice as much food and water as you normally would when you forage there.",
          "Additionally, you can call upon the hospitality of your people, and those allied with your tribe, often including members of the druid circles, tribes of nomadic elves, the Harpers, and the priesthoods devoted to the gods of the First Circle."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "section",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background outlander} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a member of an Uthgardt tribe.",
          "Even if you have left your tribe behind (at least for now), you hold to the traditions of your people. You will never cut down a still-living tree, and you may not countenance such an act being done in your presence. The Uthgardt ancestral mounds - great hills where the totem spirits were defeated by Uthgar and where the heroes of the tribes are interred - are sacred to you.",
          "Your bond is undoubtedly associated with your tribe or some aspect of Uthgardt philosophy or culture (perhaps even Uthgar himself). Your ideal is a personal choice that probably hews closely to the ethos of your people and certainly doesn't contradict or compromise what being an Uthgardt stands for."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Variant City Watch (Investigator)",
    "source": "SCAG",
    "page": 145,
    "skillProficiencies": [
      {
        "insight": true,
        "investigation": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "uniform in the style of your unit and indicative of your rank"
          },
          {
            "item": "horn|phb",
            "displayName": "horn with which to summon help"
          },
          {
            "item": "manacles|phb",
            "displayName": "set of manacles"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
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
            "entry": "{@skill Insight}, {@skill Investigation}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A uniform in the style of your unit and indicative of your rank, a {@item horn|phb} with which to summon help, a set of {@item manacles|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Watcher's Eye",
        "type": "entries",
        "entries": [
          "Your experience in enforcing the law, and dealing with lawbreakers, gives you a feel for local laws and criminals. You can easily find the local outpost of the watch or a similar organization, and just as easily pick out the dens of criminal activity in a community, although you're more likely to be welcome in the former locations rather than the latter."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background soldier} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a member of the city watch.",
          "Your bond is likely associated with your fellow watch members or the watch organization itself and almost certainly concerns your community. Your ideal probably involves the fostering of peace and safety. An investigator is likely to have an ideal connected to achieving justice by successfully solving crimes."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Waterdhavian Noble",
    "source": "SCAG",
    "page": 154,
    "skillProficiencies": [
      {
        "history": true,
        "persuasion": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "gaming set",
            "musical instrument"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "fine clothes|phb",
          {
            "special": "scroll of pedigree"
          },
          {
            "special": "skin of fine zzar or wine"
          },
          {
            "special": "purse",
            "containsValue": 2000
          }
        ]
      },
      {
        "a": [
          "signet ring|phb"
        ],
        "b": [
          {
            "special": "brooch"
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
            "entry": "{@skill History}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Any one of your choice"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} or {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item fine clothes|phb}, a {@item signet ring|phb} or brooch, a scroll of pedigree, a skin of fine zzar or wine, and a purse containing 20 gp"
          }
        ]
      },
      {
        "name": "Feature: Kept in Style",
        "type": "entries",
        "entries": [
          "While you are in Waterdeep or elsewhere in the North, your house sees to your everyday needs. Your name and signet are sufficient to cover most of your expenses; the inns, taverns, and festhalls you frequent are glad to record your debt and send an accounting to your family's estate in Waterdeep to settle what you owe.",
          "This advantage enables you to live a comfortable lifestyle without having to pay 2 gp a day for it, or reduces the cost of a wealthy or aristocratic lifestyle by that amount. You may not maintain a less affluent lifestyle and use the difference as income—the benefit is a line of credit, not an actual monetary reward."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "section",
        "name": "Suggested Characteristics",
        "entries": [
          "Use the tables for the {@background noble} background in the Player's Handbook as the basis for your traits and motivations, modifying the entries when appropriate to suit your identity as a member of a Waterdhavian family.",
          "Like other nobles, you were born and raised in a different world from the one that most folk know - one that grants you privilege but also calls you to fulfill a duty befitting your station. Your bond might be associated with your family alone, or it could be concerned with another noble house that sides with or opposes your own. Your ideal depends to some extent on how you view your role in the family, and how you intend to conduct yourself in the world at large as a representative of your house."
        ]
      }
    ],
    "hasFluff": true
  }
];
