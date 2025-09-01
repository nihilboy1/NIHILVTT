// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Astral Drifter",
    "source": "AAG",
    "page": 7,
    "feats": [
      {
        "magic initiate|phb": true
      }
    ],
    "skillProficiencies": [
      {
        "insight": true,
        "religion": true
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
          "traveler's clothes|phb",
          {
            "special": "diary"
          },
          "ink pen|phb",
          "ink (1-ounce bottle)|phb",
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
            "entry": "{@skill Insight}, {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice ({@language Celestial} or {@language Gith|MM} recommended)"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item traveler's clothes|PHB}, a diary, an {@item ink pen|PHB}, a {@item Ink (1-ounce bottle)|PHB|bottle of ink}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Longevity",
        "entries": [
          "You are {@dice 20d6} years older than you look, because you have spent that much time in the Astral Sea without aging."
        ]
      },
      {
        "name": "Feature: Divine Contact",
        "type": "entries",
        "entries": [
          "You gain the {@feat Magic Initiate||Magic Initiate feat} from the {@book Player's Handbook|PHB} and must choose cleric for the feat.",
          "In the Astral Sea, you crossed paths with a wandering deity. The encounter was brief and nonviolent, yet it made a lasting impression on you. This deity saw fit to share one secret or obscure bit of cosmic lore with you. Work with your DM to determine the details of this knowledge and its impact on the campaign.",
          "Roll on the Divine Contact table to determine which deity you encountered, or work with your DM to identify a more suitable choice.",
          {
            "type": "table",
            "caption": "Divine Contact",
            "colLabels": [
              "d10",
              "Wandering Deity"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Corellon, god of art and magic (chaotic good)"
              ],
              [
                "2",
                "Tymora, god of good fortune (chaotic good)"
              ],
              [
                "3",
                "Fharlanghn, god of horizons and travel (neutral good)"
              ],
              [
                "4",
                "Istus, god of fate and destiny (neutral)"
              ],
              [
                "5",
                "Nuada, god of war and warriors (neutral)"
              ],
              [
                "6",
                "Zivilyn, god of wisdom (neutral)"
              ],
              [
                "7",
                "Arawn, god of life and death (neutral evil)"
              ],
              [
                "8",
                "Hecate, god of magic and moons (chaotic evil)"
              ],
              [
                "9",
                "Celestian, god of stars and wanderers (neutral)"
              ],
              [
                "10",
                "Ptah, god of knowledge and secrets (lawful neutral)"
              ]
            ]
          }
        ],
        "data": {
          "isFeature": true
        }
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Wildspacer",
    "source": "AAG",
    "page": 8,
    "feats": [
      {
        "tough|phb": true
      }
    ],
    "skillProficiencies": [
      {
        "athletics": true,
        "survival": true
      }
    ],
    "toolProficiencies": [
      {
        "navigator's tools": true,
        "vehicles (space)": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "club|phb",
            "displayName": "belaying pin"
          },
          "traveler's clothes|phb",
          "grappling hook|phb",
          "hempen rope (50 feet)|phb",
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
            "entry": "{@skill Athletics}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Navigator's tools|phb}, {@filter vehicles (space)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (space)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A belaying pin ({@item club|phb}), a set of {@item traveler's clothes|PHB}, a {@item grappling hook|PHB}, {@item Hempen Rope (50 feet)|PHB|50 feet of hempen rope}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Close Encounter",
        "entries": [
          "You had a harrowing encounter with one of Wildspace's many terrors. You escaped with your life, but the encounter left you with a scar or two, or perhaps a recurring nightmare. Roll on the Close Encounter table to determine which creature nearly got the best of you. Creatures marked with an asterisk appear in {@book Boo's Astral Menagerie|BAM}; the others are described in the {@book Monster Manual|MM}.",
          {
            "type": "table",
            "caption": "Close Encounter",
            "colLabels": [
              "d10",
              "Creature"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@creature Beholder}"
              ],
              [
                "2",
                "{@creature Cosmic horror|BAM}*"
              ],
              [
                "3",
                "{@creature Feyr|BAM}*"
              ],
              [
                "4",
                "{@filter Lunar dragon|bestiary|source=BAM|search=lunar dragon}*"
              ],
              [
                "5",
                "{@creature Mind flayer}"
              ],
              [
                "6",
                "{@creature Neh-thalggu|BAM}*"
              ],
              [
                "7",
                "{@creature Neogi|MPMM}*"
              ],
              [
                "8",
                "{@creature Space clown|BAM}*"
              ],
              [
                "9",
                "{@creature Vampirate|BAM}*"
              ],
              [
                "10",
                "{@creature Void scavver|BAM}*"
              ]
            ]
          }
        ]
      },
      {
        "name": "Feature: Wildspace Adaptation",
        "type": "entries",
        "entries": [
          "You gain the {@feat Tough||Tough feat} from the {@book Player's Handbook|PHB}. In addition, you learned how to adapt to zero gravity. Being weightless doesn't give you disadvantage on any of your melee attack rolls (see \"{@book Weightlessness|AAG|2|Weightlessness}\" in {@book chapter 2|AAG|2})."
        ],
        "data": {
          "isFeature": true
        }
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  }
];
