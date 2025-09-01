// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Gate Warden",
    "source": "SatO",
    "page": 7,
    "prerequisite": [
      {
        "campaign": [
          "Planescape"
        ]
      }
    ],
    "feats": [
      {
        "scion of the outer planes|sato": true
      }
    ],
    "skillProficiencies": [
      {
        "persuasion": true,
        "survival": true
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
            "special": "ring of keys to unknown locks"
          },
          {
            "item": "book|phb",
            "displayName": "blank book"
          },
          {
            "special": "bottle of black ink"
          },
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      },
      {
        "a": [
          "ink pen|phb"
        ],
        "b": [
          {
            "special": "quill"
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
            "entry": "{@skill Persuasion}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice (Abyssal, Celestial, or Infernal recommended)"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A ring of keys to unknown locks, a blank {@item book|PHB}, an {@item ink pen|PHB} or quill, a bottle of black ink, a set of {@item traveler's clothes|PHB}, and a {@item pouch|PHB} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Planar Infusion",
        "entries": [
          "Living in a gate-town or a similar location steeped you in planar energy. You gain the {@feat Scion of the Outer Planes|SatO} feat. In addition, you know where to find free, modest lodging and food in the community you grew up in."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "The influence of an Outer Plane shapes your perspective. The Gate Warden Personality Traits table suggests traits you might adopt for your character.",
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
                "Strange events and otherworldly creatures don't faze me."
              ],
              [
                "2",
                "I think in terms of exchange: something for something, nothing for nothing."
              ],
              [
                "3",
                "I speak with an unusual cadence."
              ],
              [
                "4",
                "I pepper my speech with words or curses borrowed from planar languages."
              ],
              [
                "5",
                "I've seen enough to know that you can't take anyone at face value, so I scrutinize everyone."
              ],
              [
                "6",
                "I have a superstitious habit I picked up from my gate-town, such as touching iron when I'm nervous or arranging objects in a specific order."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Gate Warden Character",
        "entries": [
          "Those who dwell for an extended time near a permanent portal to another plane absorb the essence radiating from the realm beyond. Those influenced by the same plane share similarities in behavior and even physical appearance.",
          {
            "type": "entries",
            "name": "Gate Warden Trinkets",
            "entries": [
              "When you make your character, you can roll once on the {@item Gate Warden Trinket|SatO|Gate Warden Trinkets} table, instead of on the {@item Trinket|PHB|Trinkets} table in the Player's Handbook, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Planar Philosopher",
    "source": "SatO",
    "page": 8,
    "prerequisite": [
      {
        "campaign": [
          "Planescape"
        ]
      }
    ],
    "feats": [
      {
        "scion of the outer planes|sato": true
      }
    ],
    "skillProficiencies": [
      {
        "arcana": true,
        "choose": {
          "from": [
            "religion",
            "insight",
            "nature",
            "intimidation",
            "history",
            "stealth",
            "perception",
            "medicine",
            "survival",
            "persuasion",
            "performance",
            "athletics"
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
            "special": "portal key (such as a bag of golden tea leaves or the tooth of a planar beast)"
          },
          {
            "special": "manifesto of your guiding philosophy"
          },
          {
            "item": "common clothes|phb",
            "displayName": "common clothes in your faction's style"
          },
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
            "entry": "{@skill Arcana}, the skill associated with your faction (see the Sigil Faction Affinities table) or one skill of your choice"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A portal key (such as a bag of golden tea leaves or the tooth of a planar beast), a manifesto of your guiding philosophy, a set of {@item common clothes|PHB} in your faction's style, and a {@item pouch|PHB} containing 10 gp worth of coins from different worlds and planes"
          }
        ]
      },
      {
        "type": "table",
        "caption": "Sigil Faction Affinities",
        "colStyles": [
          "col-6",
          "col-6"
        ],
        "colLabels": [
          "Faction",
          "Skill"
        ],
        "rows": [
          [
            "Athar",
            "{@skill Religion}"
          ],
          [
            "Bleak Cabal",
            "{@skill Insight}"
          ],
          [
            "Doomguard",
            "{@skill Nature}"
          ],
          [
            "Fated",
            "{@skill Intimidation}"
          ],
          [
            "Fraternity of Order",
            "{@skill History}"
          ],
          [
            "Hands of Havoc",
            "{@skill Stealth}"
          ],
          [
            "Harmonium",
            "{@skill Perception}"
          ],
          [
            "Heralds of Dust",
            "{@skill Medicine}"
          ],
          [
            "Mercykillers",
            "{@skill Survival}"
          ],
          [
            "Mind's Eye",
            "{@skill Persuasion}"
          ],
          [
            "Society of Sensation",
            "{@skill Performance}"
          ],
          [
            "Transcendent Order",
            "{@skill Athletics}"
          ]
        ]
      },
      {
        "type": "entries",
        "name": "Factions of Sigil",
        "entries": [
          "Twelve factions have risen to prominence in the City of Doors, though many more exist. Your character might belong to one of these groups or another ideological faction, perhaps one of your own creation.",
          "The primary factions of Sigil, which are further detailed in chapter 2, adhere to the following philosophies:",
          {
            "type": "list",
            "style": "list-hang-notitle",
            "items": [
              {
                "type": "item",
                "name": "Athar",
                "entries": [
                  "Deities are frauds and merely channel the might of a true, higher power."
                ]
              },
              {
                "type": "item",
                "name": "Bleak Cabal",
                "entries": [
                  "There is no greater truth to the multiverse. Each being must discover their own meaning."
                ]
              },
              {
                "type": "item",
                "name": "Doomguard",
                "entries": [
                  "Nothing lasts forever. The purpose of everything is to crumble and decay."
                ]
              },
              {
                "type": "item",
                "name": "Fated",
                "entries": [
                  "Everyone makes their own fate and is entitled to whatever they can take and hold."
                ]
              },
              {
                "type": "item",
                "name": "Fraternity of Order",
                "entries": [
                  "All of existence is governed by laws, and power comes from understanding and exploiting them."
                ]
              },
              {
                "type": "item",
                "name": "Hands of Havoc",
                "entries": [
                  "Those who try to impose a single order on the multiverse are doomed to fail."
                ]
              },
              {
                "type": "item",
                "name": "Harmonium",
                "entries": [
                  "The multiverse will be perfect only when everything is acting in harmony, whether it wants to or not."
                ]
              },
              {
                "type": "item",
                "name": "Heralds of Dust",
                "entries": [
                  "Everyone is already dead; the entirety of the multiverse is an afterlife. Undeath holds the key to the next stage of existence."
                ]
              },
              {
                "type": "item",
                "name": "Mercykillers",
                "entries": [
                  "Cold, relentless justice is absolute, and no one is above it."
                ]
              },
              {
                "type": "item",
                "name": "Mind's Eye",
                "entries": [
                  "The multiverse exists to be explored. It shapes us, and we shape it in turn."
                ]
              },
              {
                "type": "item",
                "name": "Society of Sensation",
                "entries": [
                  "Sensation is the proof of existence. By experiencing everything, we can understand the multiverse in all its complexity."
                ]
              },
              {
                "type": "item",
                "name": "Transcendent Order",
                "entries": [
                  "Thought clouds action. To fall in step with the multiverse, one must act on instinct alone."
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Conviction",
        "entries": [
          "You gain the {@feat Scion of the Outer Planes|SatO} feat. In addition, members of your organization provide you free, modest lodging and food at any of their holdings or the homes of other faction members."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Adventurers who dedicate themselves to a particular philosophy regarding the multiverse are welcomed among factions that embrace those beliefs. The Planar Philosopher Personality Traits table suggests various traits you might adopt for your character.",
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
                "I don't venerate any gods. With time, we can be as powerful as them or greater."
              ],
              [
                "2",
                "Experience is everything; live in the moment."
              ],
              [
                "3",
                "When things crumble, I find meaning in the dust."
              ],
              [
                "4",
                "Life thrives through order, and I seek to maintain that order."
              ],
              [
                "5",
                "When others make plans, the multiverse laughs and so do I."
              ],
              [
                "6",
                "I know what's right, and none will stand in my way."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Building a Planar Philosopher Character",
        "entries": [
          "Some groups of planar philosophers might prefer certain types of characters, but by and large any character who upholds and furthers the beliefs of such a group is welcome within its ranks.",
          {
            "type": "entries",
            "name": "Planar Philosopher Trinkets",
            "entries": [
              "When you make your character, you can roll once on the {@item Planar Philosopher Trinket|SatO|Planar Philosopher Trinkets} table, instead of on the {@item Trinket|PHB|Trinkets} table in the Player's Handbook, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  }
];
