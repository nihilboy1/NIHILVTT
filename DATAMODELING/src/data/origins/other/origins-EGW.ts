// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Augen Trust (Spy)",
    "source": "EGW",
    "page": 203,
    "_copy": {
      "name": "Variant Criminal (Spy)",
      "source": "PHB"
    },
    "hasFluff": true
  },
  {
    "name": "Cobalt Scholar (Sage)",
    "source": "EGW",
    "page": 203,
    "_copy": {
      "name": "Sage",
      "source": "PHB"
    },
    "hasFluff": true
  },
  {
    "name": "Grinner",
    "source": "EGW",
    "page": 200,
    "skillProficiencies": [
      {
        "deception": true,
        "performance": true
      }
    ],
    "toolProficiencies": [
      {
        "thieves' tools": true,
        "anyMusicalInstrument": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "fine clothes|phb",
          "disguise kit|phb",
          {
            "equipmentType": "instrumentMusical"
          },
          {
            "special": "gold-plated ring depicting a smiling face"
          },
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
            "entry": "{@skill Deception}, {@skill Performance}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}, {@item thieves' tools|phb}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item fine clothes|phb}, a {@item disguise kit|phb}, a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} of your choice, a gold-plated ring depicting a smiling face, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "name": "Feature: Ballad of the Grinning Fool",
        "type": "entries",
        "entries": [
          "Like every Grinner, you know how to find a hideout. In any city of 10,000 people or more on the Menagerie Coast or in the lands of the Dwendalian Empire, you can play the \"Ballad of the Grinning Fool\" in a major tavern or inn. A member of the Golden Grin will find you and give shelter to you and any companions you vouch for. This shelter might be discontinued if it becomes too dangerous to hide you, at the DM's discretion.",
          "This feature must be used with caution, for not all who know the ballad are your friends. Some are traitors, counterspies, or agents of tyranny."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "Grinners are trained in the art of secrecy and innuendo, and are skilled at hiding in plain sight by being the loudest and brightest person in the room. Their skills in subterfuge and combat lend themselves well to an adventuring lifestyle, and traveling with mercenaries and treasure hunters creates a convenient excuse to journey through lands bent under tyranny.",
          {
            "type": "table",
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
                "I love the spotlight. Everyone, look at me!"
              ],
              [
                "2",
                "Give me a drink and I'm your friend."
              ],
              [
                "3",
                "Talk to me about yourself. I'm a hell of a listener."
              ],
              [
                "4",
                "I hate to start fights, but I love to finish them."
              ],
              [
                "5",
                "I can't sit still."
              ],
              [
                "6",
                "I'm always humming an old tune from my past."
              ],
              [
                "7",
                "When I don't have a reason to smile, I'm miserable."
              ],
              [
                "8",
                "I'm lucky like you wouldn't believe."
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
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Revolution. Tyrants must fall, no matter the cost. (Chaotic)"
              ],
              [
                "2",
                "Compassion. The only way to make a better world is to perform small kindnesses. (Good)"
              ],
              [
                "3",
                "Justice. A nation built upon just foundations will uphold freedom for all. (Law)"
              ],
              [
                "4",
                "Expression. Music, joy, and laughter are the keys to freedom. (Good)"
              ],
              [
                "5",
                "Self-Determination. People should be free to do as they please. (Chaotic)"
              ],
              [
                "6",
                "Vigilance. A free people must be carefully taught, lest they be misled. (Neutral)"
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
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I lost someone important to an agent of the Dwendalian Empire. That regime will fall."
              ],
              [
                "2",
                "The first people to be hurt by this war will be the common folk. I need to protect them."
              ],
              [
                "3",
                "Music helped me through a dark time in my life. Now, I'll use music to change the world."
              ],
              [
                "4",
                "I will be known as the greatest spy who ever lived."
              ],
              [
                "5",
                "All life is precious to me. I know I can change the world without taking a humanoid life."
              ],
              [
                "6",
                "The elite in their ivory towers don't understand how we suffer. I intend to show them."
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
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I've never lied once in my life. What? No, I'm not crossing my fingers!"
              ],
              [
                "2",
                "I do everything big! Subtlety? I don't know the meaning of subtlety! Oh, that's a problem?"
              ],
              [
                "3",
                "Being a spy in wartime is painful. I've seen so much suffering, I think I'm losing my mind."
              ],
              [
                "4",
                "I can't focus on my mission. I just want to carouse and sing and play!"
              ],
              [
                "5",
                "Yeah, that's my name. Yeah, I'm a Grinner spy. Who cares about staying undercover?"
              ],
              [
                "6",
                "I can't afford to trust anyone. Not. Anyone."
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
    "name": "Luxonborn (Acolyte)",
    "source": "EGW",
    "page": 203,
    "_copy": {
      "name": "Acolyte",
      "source": "PHB"
    },
    "hasFluff": true
  },
  {
    "name": "Myriad Operative (Criminal)",
    "source": "EGW",
    "page": 203,
    "_copy": {
      "name": "Criminal",
      "source": "PHB"
    },
    "hasFluff": true
  },
  {
    "name": "Revelry Pirate (Sailor)",
    "source": "EGW",
    "page": 203,
    "_copy": {
      "name": "Sailor",
      "source": "PHB"
    },
    "hasFluff": true
  },
  {
    "name": "Volstrucker Agent",
    "source": "EGW",
    "page": 202,
    "skillProficiencies": [
      {
        "deception": true,
        "stealth": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "toolProficiencies": [
      {
        "poisoner's kit": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "common clothes|phb",
          {
            "special": "black cloak with a hood"
          },
          "poisoner's kit|phb",
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
            "entry": "{@skill Deception}, {@skill Stealth}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Poisoner's kit|phb}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item common clothes|phb}, a black cloak with a hood, a {@item poisoner's kit|phb}, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Shadow Network",
        "type": "entries",
        "entries": [
          "You have access to the Volstrucker shadow network, which allows you to communicate with other members of the order over long distances. If you write a letter in a special arcane ink, address it to a member of the Volstrucker, and cast it into a fire, the letter will burn to cinders and materialize whole again on the person of the agent you addressed it to.",
          "The ink used to send a letter across the shadow network is the same as that used by a wizard to scribe spells in a spellbook. Writing a letter in this ink costs 10 gp per page."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Suggested Characteristics",
        "type": "entries",
        "entries": [
          "Agents of the Volstrucker are groomed to follow orders without question and to kill without mercy. The trauma that brings one into the order can fester even more strongly against the darkness of a Volstrucker agent's assignments. Officially, no one ever leaves the order—but those desperate enough do whatever it takes to gain some measure of freedom.",
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
                "I prefer to keep my thoughts to myself."
              ],
              [
                "2",
                "I indulge vice in excess to quiet my conscience."
              ],
              [
                "3",
                "I've left emotion behind me. I'm now perfectly placid."
              ],
              [
                "4",
                "Some event from the past keeps worming its way into my mind, making me restless."
              ],
              [
                "5",
                "I always keep my word—except when I'm commanded to break it."
              ],
              [
                "6",
                "I laugh off insults and never take them personally."
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
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Order. The will of the crown is absolute. (Law)"
              ],
              [
                "2",
                "True Loyalty. The Cerberus Assembly is greater than any power, even the crown. (Law)"
              ],
              [
                "3",
                "Death. The penalty for disloyalty is death. (Evil)"
              ],
              [
                "4",
                "Determination. I cannot fail. Not ever. (Neutral)"
              ],
              [
                "5",
                "Fear. People should not respect power. They should fear it. (Evil)"
              ],
              [
                "6",
                "Escape. The Volstrucker are pure evil! I can't atone for what I've done for them, but I can escape with my life. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "colLabels": [
              "d4",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "The job is all that matters. I will see it through."
              ],
              [
                "2",
                "My orders are important, but my comrades are worth more than anything. I would die for them."
              ],
              [
                "3",
                "Everything I've done, I've done to protect someone close to me."
              ],
              [
                "4",
                "If the empire falls, all of civilization falls with it. I will hold back chaos and barbarism at any cost."
              ]
            ]
          },
          {
            "type": "table",
            "colLabels": [
              "d4",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I drink to dull the pain in the back of my head."
              ],
              [
                "2",
                "I go a bit mad when I see blood."
              ],
              [
                "3",
                "I can hear the voices of everyone I've killed. I see their faces. I can't be free of these ghosts."
              ],
              [
                "4",
                "Fear is a powerful motivator. I will do whatever it takes to prevent those who know what I am from seeing me fail, and from those I care about from knowing what I am."
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
