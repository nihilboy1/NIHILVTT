// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Feylost",
    "source": "WBtW",
    "page": 9,
    "skillProficiencies": [
      {
        "deception": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1,
        "choose": {
          "from": [
            "elvish",
            "gnomish",
            "goblin",
            "sylvan"
          ]
        }
      }
    ],
    "toolProficiencies": [
      {
        "anyMusicalInstrument": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "equipmentType": "instrumentMusical"
          },
          "traveler's clothes|phb",
          {
            "item": "feywild trinket|wbtw",
            "quantity": 3
          },
          {
            "item": "pouch|phb",
            "containsValue": 800
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
            "entry": "{@skill Deception}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice of {@language Elvish}, {@language Gnomish}, {@language Goblin}, or {@language Sylvan}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} (one of your choice), a {@item Traveler's Clothes|PHB|set of traveler's clothes}, three trinkets (each determined by rolling on the {@item Feywild Trinket|WBtW|Feywild Trinkets} table), and a {@item pouch|phb} containing 8 gp"
          }
        ]
      },
      {
        "name": "Feature: Feywild Connection",
        "type": "entries",
        "entries": [
          "Your mannerisms and knowledge of fey customs are recognized by natives of the Feywild, who see you as one of their own. Because of this, friendly Fey creatures are inclined to come to your aid if you are lost or need help in the Feywild."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Fey Mark",
        "entries": [
          "You were transformed in some small way by your stay in the Feywild and gained a fey mark, determined by rolling on the Fey Mark table.",
          {
            "type": "table",
            "caption": "Fey Mark",
            "colLabels": [
              "d8",
              "Fey Mark"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Your eyes swirl with iridescent colors."
              ],
              [
                "2",
                "You have a sweet scent, like that of nectar or honey."
              ],
              [
                "3",
                "You have long whiskers like those of a cat."
              ],
              [
                "4",
                "Your ears are covered with soft tufts of fur."
              ],
              [
                "5",
                "Your skin sparkles in moonlight."
              ],
              [
                "6",
                "Flowers either bloom or wilt (your choice) in your presence."
              ],
              [
                "7",
                "Your hair is made of vines or brambles and grows back to normal length within 1 hour of being cut."
              ],
              [
                "8",
                "You have a tail like that of a dog or another animal."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feywild Visitor",
        "entries": [
          "Whenever you're sound asleep or in a deep trance during a long rest, a spirit of the Feywild might pay you a visit, if the DM wishes it. Determine the spirit's form by rolling on the Feywild Visitor table. No harm ever comes to you as a result of such visits, which can last for minutes or hours, and you remember each visit when you wake up. Conversations that occur with a visitor can contain any number of things, from messages and insights to nonsense and red herrings, at the DM's discretion. Such conversations are always conducted in a language you can understand, even if the Feywild visitor can't speak that language normally.",
          {
            "type": "table",
            "caption": "Feywild Visitor",
            "colLabels": [
              "d8",
              "Visitor"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Awakened creature (a Beast or an ordinary plant that has had the {@spell awaken} spell cast on it)"
              ],
              [
                "2",
                "{@creature Centaur}"
              ],
              [
                "3",
                "{@creature Dryad}"
              ],
              [
                "4",
                "{@creature Faerie Dragon (Violet)||Faerie dragon}"
              ],
              [
                "5",
                "{@creature Pixie}"
              ],
              [
                "6",
                "{@creature Satyr}"
              ],
              [
                "7",
                "{@creature Sprite}"
              ],
              [
                "8",
                "{@creature Unicorn}"
              ]
            ]
          }
        ]
      },
      {
        "type": "section",
        "name": "Character Traits",
        "entries": [
          "As the players choose backgrounds for their characters, they can use the following tables to help determine their characters' personality traits, ideals, bonds, and flaws. Players can use these tables instead of the ones that appear in the {@book Player's Handbook|PHB}, or they can mix and match them. If a rolled result doesn't make sense for a character, the player can roll again or choose a more appropriate entry on the table.",
          "These tables, while optional, are well suited to Feywild-themed adventures and are ideal for any character who has the feylost or Witchlight hand background.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm haunted by fey laughter that only I can hear, though I know it's just my mind playing tricks on me."
              ],
              [
                "2",
                "Like a nomad, I can't settle down in one place for very long."
              ],
              [
                "3",
                "Good music makes me weep like a baby."
              ],
              [
                "4",
                "Wherever I go, I try to bring a little of the warmth and tranquility of home with me."
              ],
              [
                "5",
                "I have never lost my childlike sense of wonder."
              ],
              [
                "6",
                "When I have a new idea, I get wildly excited about it until I come up with another, better idea."
              ],
              [
                "7",
                "I live by my own set of weird and wonderful rules."
              ],
              [
                "8",
                "I can't bring myself to trust most adults."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ideals",
            "colLabels": [
              "d8",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Friendship. I never leave a friend behind. (Good)"
              ],
              [
                "2",
                "Empathy. No creature should be made to suffer. (Good)"
              ],
              [
                "3",
                "Wanderlust. I prefer to take the less traveled path. (Chaotic)"
              ],
              [
                "4",
                "Changeability. Change is good, which is why I live by an ever-changing set of rules. (Chaotic)"
              ],
              [
                "5",
                "Honor. A deal is a deal, and I would never break one. (Lawful)"
              ],
              [
                "6",
                "Rule of Three. Everything in the multiverse happens in threes. I see the \"rule of three\" everywhere. (Lawful)"
              ],
              [
                "7",
                "Obsession. I won't let go of a grudge. (Evil)"
              ],
              [
                "8",
                "Greed. I will do whatever it takes to get what I want, regardless of the harm it might cause. (Evil)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Bonds",
            "colLabels": [
              "d8",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I would never break my word."
              ],
              [
                "2",
                "I find magic in all its forms to be compelling. The more magical a place, the more I am drawn to it."
              ],
              [
                "3",
                "I do what I can to protect the natural world."
              ],
              [
                "4",
                "A trusted friend is the most important thing in the multiverse to me."
              ],
              [
                "5",
                "I can't bring myself to harm a Fey creature, either because I consider myself one or because I fear the repercussions."
              ],
              [
                "6",
                "The Witchlight Carnival feels like home to me."
              ],
              [
                "7",
                "I'm drawn to the Feywild and long to return there, if only for a short while."
              ],
              [
                "8",
                "I feel indebted to {@creature Mister Witch|WBtW} and {@creature Mister Light|WBtW} for giving me a home and a purpose."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Flaws",
            "colLabels": [
              "d8",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I easily lose track of time. My poor sense of time means I'm always late."
              ],
              [
                "2",
                "I think the whole multiverse is out to get me."
              ],
              [
                "3",
                "I'm always operating under a tight timeline, and I'm obsessed with keeping everything on schedule."
              ],
              [
                "4",
                "I'm a kleptomaniac who covets shiny, sparkling treasure."
              ],
              [
                "5",
                "I'm forgetful. Sometimes I can't remember even the simplest things."
              ],
              [
                "6",
                "I never give away anything for free and always expect something in return."
              ],
              [
                "7",
                "I have many vices and tend to indulge them."
              ],
              [
                "8",
                "I'm always changing my mind—well, almost always."
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
    "name": "Witchlight Hand",
    "source": "WBtW",
    "page": 11,
    "skillProficiencies": [
      {
        "performance": true,
        "sleight of hand": true
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
            "disguise kit",
            "musical instrument"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "a": [
          "disguise kit|phb"
        ],
        "b": [
          {
            "equipmentType": "instrumentMusical"
          }
        ]
      },
      {
        "_": [
          {
            "special": "deck of cards"
          },
          "costume clothes|phb",
          "feywild trinket|wbtw",
          {
            "item": "pouch|phb",
            "containsValue": 800
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
            "entry": "{@skill Performance}, {@skill Sleight of Hand}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Disguise kit|phb} or one type of {@filter musical Instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item disguise kit|PHB} or a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} of your choice, a deck of cards, a carnival uniform or {@item costume clothes|phb|costume}, one trinket (determined by rolling on the {@item Feywild Trinket|WBtW|Feywild Trinkets}), and a {@item pouch|phb} containing 8 gp"
          }
        ]
      },
      {
        "name": "Feature: Carnival Fixture",
        "type": "entries",
        "entries": [
          "The Witchlight Carnival provides you with free, modest lodging and food. In addition, you may wander about the carnival and partake of its many wonders at no cost to you, provided you don't disrupt its shows or cause any other trouble."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Carnival Companion",
        "entries": [
          "Over the years, you have earned the friendship of another carnival fixture. Roll a {@dice d8} and consult the Carnival Companion table to determine whom or what you've befriended, or you can choose an option that you like. Work with your DM to flesh out this friendship. This companion hangs around you while you're in the carnival, but it won't voluntarily leave the carnival.",
          "The DM can use the {@creature Witchlight Hand (Medium)|WBtW|Witchlight hand} stat block in {@adventure chapter 1|WBtW|1} to represent hands, performers, and animal trainers who serve as carnival companions. Statistics for the other companions appear in the {@book Monster Manual|MM}.",
          {
            "type": "table",
            "caption": "Carnival Companion",
            "colLabels": [
              "d8",
              "Companion"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Old, cantankerous Witchlight hand"
              ],
              [
                "2",
                "Young, impressionable Witchlight hand"
              ],
              [
                "3",
                "Performer (such as an acrobat, a clown, or a musician)"
              ],
              [
                "4",
                "Retired performer"
              ],
              [
                "5",
                "Seasoned animal trainer"
              ],
              [
                "6",
                "Old {@creature blink dog}"
              ],
              [
                "7",
                "Cheery {@creature sprite}"
              ],
              [
                "8",
                "Harmless, magical wisp of light (no stat block required) that has a flying speed of 30 feet, can hover, and sheds bright light in a 5-foot radius and dim light for an additional 5 feet"
              ]
            ]
          }
        ]
      },
      {
        "type": "section",
        "name": "Character Traits",
        "entries": [
          "As the players choose backgrounds for their characters, they can use the following tables to help determine their characters' personality traits, ideals, bonds, and flaws. Players can use these tables instead of the ones that appear in the {@book Player's Handbook|PHB}, or they can mix and match them. If a rolled result doesn't make sense for a character, the player can roll again or choose a more appropriate entry on the table.",
          "These tables, while optional, are well suited to Feywild-themed adventures and are ideal for any character who has the feylost or Witchlight hand background.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm haunted by fey laughter that only I can hear, though I know it's just my mind playing tricks on me."
              ],
              [
                "2",
                "Like a nomad, I can't settle down in one place for very long."
              ],
              [
                "3",
                "Good music makes me weep like a baby."
              ],
              [
                "4",
                "Wherever I go, I try to bring a little of the warmth and tranquility of home with me."
              ],
              [
                "5",
                "I have never lost my childlike sense of wonder."
              ],
              [
                "6",
                "When I have a new idea, I get wildly excited about it until I come up with another, better idea."
              ],
              [
                "7",
                "I live by my own set of weird and wonderful rules."
              ],
              [
                "8",
                "I can't bring myself to trust most adults."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ideals",
            "colLabels": [
              "d8",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Friendship. I never leave a friend behind. (Good)"
              ],
              [
                "2",
                "Empathy. No creature should be made to suffer. (Good)"
              ],
              [
                "3",
                "Wanderlust. I prefer to take the less traveled path. (Chaotic)"
              ],
              [
                "4",
                "Changeability. Change is good, which is why I live by an ever-changing set of rules. (Chaotic)"
              ],
              [
                "5",
                "Honor. A deal is a deal, and I would never break one. (Lawful)"
              ],
              [
                "6",
                "Rule of Three. Everything in the multiverse happens in threes. I see the \"rule of three\" everywhere. (Lawful)"
              ],
              [
                "7",
                "Obsession. I won't let go of a grudge. (Evil)"
              ],
              [
                "8",
                "Greed. I will do whatever it takes to get what I want, regardless of the harm it might cause. (Evil)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Bonds",
            "colLabels": [
              "d8",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I would never break my word."
              ],
              [
                "2",
                "I find magic in all its forms to be compelling. The more magical a place, the more I am drawn to it."
              ],
              [
                "3",
                "I do what I can to protect the natural world."
              ],
              [
                "4",
                "A trusted friend is the most important thing in the multiverse to me."
              ],
              [
                "5",
                "I can't bring myself to harm a Fey creature, either because I consider myself one or because I fear the repercussions."
              ],
              [
                "6",
                "The Witchlight Carnival feels like home to me."
              ],
              [
                "7",
                "I'm drawn to the Feywild and long to return there, if only for a short while."
              ],
              [
                "8",
                "I feel indebted to {@creature Mister Witch|WBtW} and {@creature Mister Light|WBtW} for giving me a home and a purpose."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Flaws",
            "colLabels": [
              "d8",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I easily lose track of time. My poor sense of time means I'm always late."
              ],
              [
                "2",
                "I think the whole multiverse is out to get me."
              ],
              [
                "3",
                "I'm always operating under a tight timeline, and I'm obsessed with keeping everything on schedule."
              ],
              [
                "4",
                "I'm a kleptomaniac who covets shiny, sparkling treasure."
              ],
              [
                "5",
                "I'm forgetful. Sometimes I can't remember even the simplest things."
              ],
              [
                "6",
                "I never give away anything for free and always expect something in return."
              ],
              [
                "7",
                "I have many vices and tend to indulge them."
              ],
              [
                "8",
                "I'm always changing my mind—well, almost always."
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
