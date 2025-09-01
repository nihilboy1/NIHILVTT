// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Rewarded",
    "source": "BMT",
    "page": 57,
    "feats": [
      {
        "lucky|phb": true
      },
      {
        "magic initiate|phb": true
      },
      {
        "skilled|phb": true
      }
    ],
    "skillProficiencies": [
      {
        "insight": true,
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
        "anyGamingSet": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "bottle of black ink"
          },
          "ink pen|phb",
          {
            "special": "sheets of paper",
            "quantity": 5
          },
          {
            "item": "gaming set|phb",
            "displayName": "gaming set (matching your chosen proficiency)"
          },
          "signet ring|phb",
          "fine clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1800
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
            "entry": "{@skill Insight}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A bottle of black ink, an {@item ink pen|PHB}, five sheets of paper, a {@item gaming set|PHB} (matching your chosen proficiency), a {@item signet ring|PHB}, a set of {@item fine clothes|PHB}, and a {@item pouch|PHB} containing 18 gp"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entries": [
              "One {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} of your choice (such as {@item playing card set|phb|playing cards} or {@item three-dragon ante set|phb|three-dragon ante cards})"
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Fortune's Favor",
        "entries": [
          "Your unexpected good fortune is reflected by a minor boon. You gain the {@feat Lucky}, {@feat Magic Initiate}, or {@feat Skilled} feat (your choice). Your choice of feat reflects the transformation that changed your life. An encounter with a genie who gave you three wishes might have resulted in magical powers represented by Magic Initiate. If you paid off all your family debts with a fortuitous round of three-dragon ante, you might be Lucky instead. Alternatively, you could use the Skilled feat to reflect whatever trial you endured to secure your new destiny and to model the knowledge and abilities imparted to you by whatever force transformed your life."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Your character's perspective on life has changed thanks to their new destiny. The Rewarded Personality Traits table suggests traits you might adopt for your character and cards from the {@item Deck of Many Things} that might have prompted this trait.",
          {
            "type": "table",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "d6",
              "Personality Trait"
            ],
            "rows": [
              [
                "1",
                "A safe home is a foundation on which anything else can be built. (Key, Throne)"
              ],
              [
                "2",
                "I was elevated to heights I could never otherwise attain, and I won't waste my fortune. (Star, Sun)"
              ],
              [
                "3",
                "I try to be a source of inspiration and joy to others. Life is never as bad as you think! (Euryale, Jester)"
              ],
              [
                "4",
                "Courage and boldness can carry the day when all else fails. (Comet, Knight)"
              ],
              [
                "5",
                "My good fortune means I can lift others up as well. (Gem, Moon)"
              ],
              [
                "6",
                "Having the right answers is the first step to solving any problem, no matter how dire. (Fates, Sage)"
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Rewarded Character",
        "entries": [
          "Rewarded characters have varied histories, but they have one thing in common: they were down on their luck before their lives abruptly turned around. They might have given up all hope of a happier life, only to suddenly get a second chance. A rewarded character has often spent many years struggling to escape painful circumstances. Now, extricated from the (sometimes literal) prison that was their former life, they throw their cares to the wind and become adventurers.",
          "If your character's life was changed by a {@item Deck of Many Things}, consider which card was responsible. Perhaps the Fates card undid a tragic mistake your character made in their youth. The Gem card could have wiped out debts incurred over a lifetime. Maybe the Sage card provided the advice needed to escape a hopeless situation, the Star card increased an ability score to its current value, or a {@spell Wish} spell cast after drawing the Moon card transformed your character from a peddler to a fledgling sorcerer infused with magic and new knowledge and skills. If you're making a character at higher than 1st level, magic items they have could have been granted by the Key or Sun card."
        ]
      },
      {
        "type": "entries",
        "name": "Rewarded Trinkets",
        "entries": [
          "When you make your character, you can roll once on the Rewarded Trinkets table instead of on the Trinkets table in the {@book Player's Handbook|PHB} for your starting trinket.",
          {
            "type": "table",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "d6",
              "Trinket"
            ],
            "rows": [
              [
                "1",
                "A perfumed silk scarf from an admirer"
              ],
              [
                "2",
                "A crystal bead that glows like a candle in the dark"
              ],
              [
                "3",
                "A letter of introduction and invitation from an influential person in a far-off city"
              ],
              [
                "4",
                "A motto or symbol whose meaning eludes you, etched on a piece of your equipment"
              ],
              [
                "5",
                "A crisp playing card that never seems to tear or soil, depicting the card that affected you"
              ],
              [
                "6",
                "Half a medallion designed to be rejoined to its other half"
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
    "name": "Ruined",
    "source": "BMT",
    "page": 58,
    "feats": [
      {
        "alert|phb": true
      },
      {
        "skilled|phb": true
      },
      {
        "tough|phb": true
      }
    ],
    "skillProficiencies": [
      {
        "stealth": true,
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
        "anyGamingSet": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "hourglass|phb",
            "displayName": "cracked hourglass"
          },
          {
            "item": "manacles|phb",
            "displayName": "set of rusty manacles"
          },
          {
            "special": "half-empty bottle"
          },
          "hunting trap|phb",
          {
            "item": "gaming set|phb",
            "displayName": "gaming set (matching your chosen proficiency)"
          },
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1300
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
            "entry": "{@skill Stealth}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A cracked {@item hourglass|PHB}, a set of rusty {@item manacles|PHB}, a half-empty bottle, a {@item hunting trap|PHB}, a {@item gaming set|PHB} (matching your chosen proficiency), a set of {@item traveler's clothes|PHB}, and a {@item pouch|PHB} containing 13 gp"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entries": [
              "One {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set} of your choice (such as playing cards or three-dragon ante cards)"
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Still Standing",
        "entries": [
          "You have weathered ruinous misfortune, and you possess hidden reserves others don't expect. You gain the {@feat Alert}, {@feat Skilled}, or {@feat Tough} feat (your choice). Your choice of feat reflects how you've dealt with the terrible loss that changed your life forever. If you've kept your senses sharp for every opportunity and climbed your way out of misery by seizing the tiniest scrap of hope, choose Alert. If you've redoubled your efforts to reclaim what was once yours, choose Skilled. If you've stoically persevered through your misfortune, select Tough."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Rising above misfortune shapes one's perspective. The Ruined Personality Traits table suggests traits you might adopt for your character (and ruinous cards that might have prompted this trait).",
          {
            "type": "table",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "d6",
              "Personality Trait"
            ],
            "rows": [
              [
                "1",
                "I've changed from my past, and I work to live up to my new path. (Balance, Throne)"
              ],
              [
                "2",
                "Every moment is a gift I refuse to squander. (Euryale, Skull)"
              ],
              [
                "3",
                "Now that I've overcome having nothing, I can survive anything. (Fool, Ruin, Talons)"
              ],
              [
                "4",
                "I know enemies are set against me, and I always prepare for the worst. (Flames, Rogue)"
              ],
              [
                "5",
                "I interpret every event as part of a larger pattern I just haven't worked out yet. (Puzzle, Star)"
              ],
              [
                "6",
                "I must make up for so much time I've already lost. (Donjon, Void)"
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Ruined Character",
        "entries": [
          "Ruined characters were on top of the world before misfortune struck. Many were wealthy. Others come from modest backgrounds, but they were surrounded by friends, family, and loved ones. They might have been famous, or simply never encountered serious hardship before. Some were born to privilege or rose to prominence through trickery or a false reputation. Now a {@item Deck of Many Things}—or another calamity—has knocked them down like a house of cards.",
          "If your character's life was ruined by a {@item Deck of Many Things}, consider which card was responsible. Perhaps your character was imprisoned for years by the Donjon or Void card, and now everyone they knew has died. Maybe your character drew the Rogue card, and the person closest to them—a spouse, child, or parent—turned against them. A devil unleashed by the Flames card might have destroyed their life. The Ruin or Talons card might have stolen the character's material goods or saddled them with vast debt."
        ]
      },
      {
        "type": "entries",
        "name": "Ruined Trinkets",
        "entries": [
          "When you make your character, you can roll once on the Ruined Trinkets table instead of on the Trinkets table in the {@book Player's Handbook|PHB}.",
          {
            "type": "table",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "d6",
              "Trinket"
            ],
            "rows": [
              [
                "1",
                "A rusted scrap of a once-beloved family heirloom"
              ],
              [
                "2",
                "A land deed, but all the names and markings that once tied it to you have faded into obscurity"
              ],
              [
                "3",
                "A bauble once imbued with powerful magic"
              ],
              [
                "4",
                "A battered playing card with a hole pierced in it, its face depicting the card that affected you"
              ],
              [
                "5",
                "A yellowed Humanoid tooth that whispers eerily when placed under a pillow"
              ],
              [
                "6",
                "A keepsake from someone you were once close to but who is now your enemy"
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
