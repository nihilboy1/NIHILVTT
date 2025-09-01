// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Athlete",
    "source": "MOT",
    "page": 31,
    "skillProficiencies": [
      {
        "acrobatics": true,
        "athletics": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "vehicles (land)": true
      }
    ],
    "startingEquipment": [
      {
        "a": [
          {
            "special": "bronze discus"
          }
        ],
        "b": [
          {
            "special": "leather ball"
          }
        ]
      },
      {
        "a": [
          {
            "special": "lucky charm"
          }
        ],
        "b": [
          {
            "special": "past trophy"
          }
        ]
      },
      {
        "_": [
          "traveler's clothes|phb",
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
            "entry": "{@skill Acrobatics}, {@skill Athletics}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@filter Vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A bronze discus or leather ball, a lucky charm or past trophy, a set of {@item traveler's clothes|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Echoes of Victory",
        "type": "entries",
        "entries": [
          "You have attracted admiration among spectators, fellow athletes, and trainers in the region that hosted your past athletic victories. When visiting any settlement within 100 miles of where you grew up, there is a {@chance 50} chance you can find someone there who admires you and is willing to provide information or temporary shelter.",
          "Between adventures, you might compete in athletic events sufficient enough to maintain a comfortable lifestyle, as per the \"{@book Practicing a Profession|PHB|8|Practicing a Profession}\" downtime activity in chapter 8 of the {@book Player's Handbook|PHB}."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Favored Event",
        "entries": [
          "While many athletes practice various games and events, most excel at a single form of competition. Roll or choose from the options in the Favored Event table to determine the athletic event in which you excel.",
          {
            "type": "table",
            "caption": "Favored Event",
            "colLabels": [
              "d8",
              "Favored Event"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Marathon"
              ],
              [
                "2",
                "Long-distance running"
              ],
              [
                "3",
                "Wrestling"
              ],
              [
                "4",
                "Boxing"
              ],
              [
                "5",
                "Chariot or horse race"
              ],
              [
                "6",
                "Pankration (mixed unarmed combat)"
              ],
              [
                "7",
                "Hoplite race (racing in full armor with a unit)"
              ],
              [
                "8",
                "Pentathlon (running, long jump, discus, javelin, wrestling)"
              ]
            ]
          }
        ]
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "Competition can forge strong bonds between teammates and rivals or ignite bitter feuds that burn outside the arena. Athletes often apply lessons from their training to their lives in general.",
          {
            "type": "table",
            "caption": "Athlete Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I feel most at peace during physical exertion, be it exercise or battle."
              ],
              [
                "2",
                "I don't like to sit idle."
              ],
              [
                "3",
                "I have a daily exercise routine that I refuse to break."
              ],
              [
                "4",
                "Obstacles exist to be overcome."
              ],
              [
                "5",
                "When I see others struggling, I offer to help."
              ],
              [
                "6",
                "I love to trade banter and gibes."
              ],
              [
                "7",
                "Anything worth doing is worth doing best."
              ],
              [
                "8",
                "I get irritated if people praise someone else and not me."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Athlete Ideals",
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
                "Competition. I strive to test myself in all things. (Chaotic)"
              ],
              [
                "2",
                "Triumph. The best part of winning is seeing my rivals brought low. (Evil)"
              ],
              [
                "3",
                "Camaraderie. The strongest bonds are forged through struggle. (Good)"
              ],
              [
                "4",
                "People. I strive to inspire my spectators. (Neutral)"
              ],
              [
                "5",
                "Tradition. Every game has rules, and the playing field must be level. (Lawful)"
              ],
              [
                "6",
                "Growth. Lessons hide in victory and defeat. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Athlete Bonds",
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
                "My teammates are my family."
              ],
              [
                "2",
                "I will overcome a rival and prove myself their better."
              ],
              [
                "3",
                "My mistake got someone hurt. I'll never make that mistake again."
              ],
              [
                "4",
                "I will be the best for the honor and glory of my home."
              ],
              [
                "5",
                "The person who trained me is the most important person in my world."
              ],
              [
                "6",
                "I strive to live up to a specific hero's example."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Athlete Flaws",
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
                "I indulge in a habit that threatens my reputation or my health."
              ],
              [
                "2",
                "I'll do absolutely anything to win."
              ],
              [
                "3",
                "I ignore anyone who doesn't compete and anyone who loses to me."
              ],
              [
                "4",
                "I have lingering pain from old injuries."
              ],
              [
                "5",
                "Any defeat or failure on my part is because my opponent cheated."
              ],
              [
                "6",
                "I must be the captain of any group I join."
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
