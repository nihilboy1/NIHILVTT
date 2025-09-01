// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Initiate",
    "source": "PSA",
    "page": 8,
    "skillProficiencies": [
      {
        "athletics": true,
        "intimidation": true
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
            "special": "simple puzzle box"
          },
          {
            "special": "scroll containing the basic teachings of the five gods"
          },
          {
            "equipmentType": "setGaming"
          },
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1500
          },
          {
            "special": "any cartouches you have earned"
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
            "entry": "{@skill Athletics}, {@skill Intimidation}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set}, {@filter vehicles (land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A simple puzzle box, a scroll containing the basic teachings of the five gods, a {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set}, a set of {@item common clothes|phb}, and a belt {@item pouch|phb} containing 15 gp. If you have completed any trials before the start of the campaign, you also have any cartouches you have earned"
          }
        ]
      },
      {
        "name": "Feature: Trials of the Five Gods",
        "type": "entries",
        "entries": [
          "Your life is oriented around your participation in the five trials that will determine your worthiness in the afterlife. While you prepare for and undergo those trials, you have constant access to training. A comfortable place to live and regular meals are provided to you by servitor mummies (the anointed) under the supervision of viziers. You can enjoy these benefits only as long as you obey the societal norms of Naktamun—training for the trials (with or without your crop), obeying the orders of the gods, and following the instructions of their viziers. If you violate these norms, you risk being treated as a dissenter. See \"{@book Trials of the Five Gods|PS-A|3}\" for more information about undertaking the trials and their rewards."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "An initiate's life is focused on the trials, but it doesn't need to be all about the trials. Though some initiates are highly focused on their training, most undergo that training while also experiencing joy, sorrow, love, loss, anger, jealousy, hope, faith, delight—the whole range of mortal emotions and experience. The afterlife might be a constant presence in every initiate's mind, but it is the culmination of a life well-lived—not a replacement for it.",
          {
            "type": "table",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "I always have a joke on hand when the mood gets too serious."
              ],
              [
                "2",
                "I use sarcasm and insults to keep a distance between myself and my crop-mates, because I don't want to get attached to them."
              ],
              [
                "3",
                "I'll settle for nothing less than perfection—in myself, in my cropmates, in everything."
              ],
              [
                "4",
                "I'm so focused on the glorious afterlife that nothing in this life can shake my calm resolve."
              ],
              [
                "5",
                "I enjoy using my skills to help those who lack those same skills."
              ],
              [
                "6",
                "I train hard so that I can play hard at the end of the day. I fully expect to play even harder in the glorious afterlife, but I'm not in a hurry to get there."
              ],
              [
                "7",
                "I'm perfectly happy letting others pick up the slack for me while I take it easy."
              ],
              [
                "8",
                "I'm constantly sizing up everyone around me, thinking about what kind of opponent they'll be in the final trial."
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
                "{@b Solidarity.} The thing that matters most of all is that we're there for each other. (Lawful)"
              ],
              [
                "2",
                "{@b Knowledge.} The world is a puzzle—a mystery waiting to be solved. (Neutral)"
              ],
              [
                "3",
                "{@b Strength.} All that matters to me is my own perfection. Let everyone else seek that perfection in their own way. (Any)"
              ],
              [
                "4",
                "{@b Ambition.} I'm going to prove that I deserve only the best—of everything. (Evil)"
              ],
              [
                "5",
                "{@b Zeal.} Anything worth doing is worth throwing my whole self into. (Any)"
              ],
              [
                "6",
                "{@b Redemption.} I will train all the harder to make up for the doubt I entertained when I was younger. (Any)"
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
                "One of my crop-mates is my dearest friend, and I hope we will face each other in the final trial."
              ],
              [
                "2",
                "I am in love with a vizier."
              ],
              [
                "3",
                "I am particularly drawn to one of the five gods, and I want nothing more than to win that god's particular favor."
              ],
              [
                "4",
                "I am more devoted to Naktamun and its people than I am to any of the ideals of the gods."
              ],
              [
                "5",
                "My weapon was a gift from a beloved trainer who died in an accident."
              ],
              [
                "6",
                "I carry a memento of my time as an acolyte, and I treasure it above all other things."
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
                "I'm easily distracted by an attractive person, which could be the death of me in the trials."
              ],
              [
                "2",
                "I really wanted to be a vizier, and I'm angry at the god who didn't choose me."
              ],
              [
                "3",
                "Training for a lifetime to die in the end seems like a big waste of energy."
              ],
              [
                "4",
                "I'm not at all sure I'll be able to grant a glorified death to any of my crop-mates."
              ],
              [
                "5",
                "I have a lasting grudge against one of my crop-mates, and each of us wants to see the other fail."
              ],
              [
                "6",
                "I think I've figured out that this world is not what it seems. Something dark is going on here."
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
    "name": "Initiate (Dissenter)",
    "source": "PSA",
    "page": 11,
    "_copy": {
      "name": "Initiate",
      "source": "PSA",
      "_mod": {
        "entries": {
          "mode": "replaceArr",
          "replace": "Feature: Trials of the Five Gods",
          "items": {
            "name": "Feature: Shelter of Dissenters",
            "type": "entries",
            "entries": [
              "If they wish to have any hope of survival, whether hiding within the city or cast out into the desert, dissenters must help each other. You can find a place to hide, rest, or recuperate among other dissenters. They will help shield you from those who hunt you, possibly even risking their lives for you."
            ],
            "data": {
              "isFeature": true
            }
          }
        }
      }
    },
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Vizier",
    "source": "PSA",
    "page": 10,
    "skillProficiencies": [
      {
        "history": true,
        "religion": true
      }
    ],
    "toolProficiencies": [
      {
        "anyArtisansTool": 1,
        "anyMusicalInstrument": 1
      }
    ],
    "startingEquipment": [
      {
        "a": [
          {
            "equipmentType": "toolArtisan"
          }
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
            "special": "scroll of your god's teachings"
          },
          {
            "special": "vizier's cartouche"
          },
          "fine clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 2500
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
            "entry": "{@skill History}, {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}, one type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} or a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} (one of your choice), a scroll of your god's teachings, a vizier's cartouche, a set of {@item fine clothes|phb}, and a {@item pouch|phb} containing 25 gp"
          }
        ]
      },
      {
        "name": "Feature: Voice of Authority",
        "type": "entries",
        "entries": [
          "Your voice is the voice of your god, at least in theory. Your job might include training and instructing initiates, and they are required to obey you. In any circumstance, an initiate is expected to defer to your voice and obey your commands. If you abuse this authority, though, your god might personally punish you."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "A vizier's characteristics strongly reflect the ideals and personality of the god they serve.",
          {
            "type": "table",
            "colLabels": [
              "d10",
              "Personality Trait"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "Everything I do, I do gracefully and deliberately, and with complete confidence. (Oketra)"
              ],
              [
                "2",
                "Nothing can shake my rock-hard focus. (Oketra)"
              ],
              [
                "3",
                "When I am at peace, I am an oasis of perfect calm in the world. When I am roused to anger, I am an embodiment of terror. (Kefnet)"
              ],
              [
                "4",
                "I enjoy teasing acolytes and initiates with juicy tidbits of knowledge wrapped up in fiendishly difficult puzzles. (Kefnet)"
              ],
              [
                "5",
                "I have the utmost faith in myself and my abilities. (Rhonas)"
              ],
              [
                "6",
                "I get restless when life in the city feels too tame, too safe. (Rhonas)"
              ],
              [
                "7",
                "I enjoy solitude as an opportunity to plan my victory. (Bontu)"
              ],
              [
                "8",
                "I use satire as a way to undermine the teachings of the other gods. (Bontu)"
              ],
              [
                "9",
                "I love, fight, and feast with equal zeal. (Hazoret)"
              ],
              [
                "10",
                "I think of those in my care as my family, in a way that most people have trouble understanding. (Hazoret)"
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
                "{@b Solidarity.} The worthy must respect the worthy. In the afterlife, all will be united in goal and action. (Oketra)"
              ],
              [
                "2",
                "{@b Knowledge.} The worthy shall cultivate a nimble mind, so as to perceive the wonders beyond imagination that wait in the afterlife. (Kefnet)"
              ],
              [
                "3",
                "{@b Strength.} The worthy shall hone a strong body that can withstand the boundless energies of the afterlife. (Rhonas)"
              ],
              [
                "4",
                "{@b Ambition.} The worthy shall strive for greatness, for supremacy in life leads to supremacy in the afterlife. (Bontu)"
              ],
              [
                "5",
                "{@b Zeal.} The worthy shall rush to the God-Pharaoh's side with relentless passion, rising to overcome every obstacle in their way. (Hazoret)"
              ],
              [
                "6",
                "{@b Naktamun.} The life of the city is ordered according to the plan of the God-Pharaoh, and that order must be preserved at all costs."
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
                "My loyalty to my companions embodies the ideal of loyalty to my god. (Oketra)"
              ],
              [
                "2",
                "The teachings of my god are more precious to me than any possession. (Kefnet)"
              ],
              [
                "3",
                "I would do anything to defend the temple of my god from any harm or desecration. (Rhonas)"
              ],
              [
                "4",
                "I am committed to the service of my god—because it's my sure ticket into the afterlife. (Bontu)"
              ],
              [
                "5",
                "I love my god and never want my service to end. (Hazoret)"
              ],
              [
                "6",
                "I have a close friend or lover who is also a vizier."
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
                "I am in love with an initiate, and I want to shield this person from death in the trials."
              ],
              [
                "2",
                "I secretly wish I had not been chosen as a vizier, so I could participate in the trials as an initiate."
              ],
              [
                "3",
                "I secretly question whether the gods care at all about us or what we do."
              ],
              [
                "4",
                "A vizier of another god seeks my death in retribution for a past insult."
              ],
              [
                "5",
                "I am terrified of what lies beyond the Gate to the Afterlife."
              ],
              [
                "6",
                "I secretly believe the God-Pharaoh's return will not bring blessing to this world."
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
    "name": "Vizier (Dissenter)",
    "source": "PSA",
    "page": 11,
    "_copy": {
      "name": "Vizier",
      "source": "PSA",
      "_mod": {
        "entries": {
          "mode": "replaceArr",
          "replace": "Feature: Voice of Authority",
          "items": {
            "name": "Feature: Shelter of Dissenters",
            "type": "entries",
            "entries": [
              "If they wish to have any hope of survival, whether hiding within the city or cast out into the desert, dissenters must help each other. You can find a place to hide, rest, or recuperate among other dissenters. They will help shield you from those who hunt you, possibly even risking their lives for you."
            ],
            "data": {
              "isFeature": true
            }
          }
        }
      }
    },
    "hasFluff": true,
    "hasFluffImages": true
  }
];
