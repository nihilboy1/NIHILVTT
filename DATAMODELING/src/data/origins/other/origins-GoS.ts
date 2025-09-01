// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Fisher",
    "source": "GoS",
    "page": 29,
    "skillProficiencies": [
      {
        "history": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "fishing tackle|phb",
          "net|phb",
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
            "special": "favorite fishing lure"
          }
        ],
        "b": [
          {
            "special": "oiled leather wading boots"
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
            "entry": "{@skill History}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "{@item Fishing tackle|phb}, a {@item net|phb}, a favorite fishing lure or oiled leather wading boots, a set of {@item traveler's clothes|phb}, and a belt {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Harvest the Water",
        "entries": [
          "You gain advantage on ability checks made using fishing tackle. If you have access to a body of water that sustains marine life, you can maintain a moderate lifestyle while working as a fisher, and you can catch enough food to feed yourself and up to ten other people each day."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Fishing Tale",
        "entries": [
          "You can tell a compelling tale, whether tall or true, to impress and entertain others. Once a day, you can tell your story to willing listeners. At the DM's discretion, a number of those listeners become friendly toward you; this is not a magical effect, and continued amicability on their part depends on your actions. You can roll on the following table to help determine the theme of your tale or choose one that best fits your character. Alternatively, work with your DM to create your own fishing tale.",
          {
            "type": "table",
            "colLabels": [
              "d8",
              "Tale"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Lobster Wrestling. You fought in hand-to-hand combat with an immense lobster."
              ],
              [
                "2",
                "It Dragged the Boat. You nearly caught a fish of monstrous size that pulled your boat for miles."
              ],
              [
                "3",
                "Fins of Pure Gold. You caught a sea animal whose fins were made of pure gold, but another fisher stole it."
              ],
              [
                "4",
                "Ghost Fish. You are haunted by a ghostly fish that only you can see."
              ],
              [
                "5",
                "Nemesis Clam. A large clam containing a pearl the size of your head claimed one of your fingers before jetting away; one day, you'll find that clam."
              ],
              [
                "6",
                "It Swallowed the Sun. You once saw a fish leap from the water and turn day into night."
              ],
              [
                "7",
                "Dive into the Abyss. You found yourself in an underwater cave leading to the Abyss, and your luck has been sour ever since."
              ],
              [
                "8",
                "Love Story. You fell in love with a creature of pure water, but your brief romance ended tragically."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Fishers succeed only if they spend time at their jobs. As such, most fishers have a strong work ethic, and they admire others who earn their living honestly. Fishers tend to be superstitious, forming attachments to particular fishing lures or special fishing spots. They have a connection to the bodies of water in which they fish, and they think poorly of those whose actions adversely affect their livelihood.",
          {
            "type": "table",
            "caption": "Fisher Personality Traits",
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
                "I am unmoved by the wrath of nature."
              ],
              [
                "2",
                "My friends are my crew; we sink or float together."
              ],
              [
                "3",
                "I need long stretches of quiet to clear my head."
              ],
              [
                "4",
                "Rich folk don't know the satisfaction of hard work."
              ],
              [
                "5",
                "I laugh heartily, feel deeply, and fear nothing."
              ],
              [
                "6",
                "I work hard; nature offers no handouts."
              ],
              [
                "7",
                "I dislike bargaining; state your price and mean it."
              ],
              [
                "8",
                "Luck favors me, and I take risks others might not."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Fisher Ideals",
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
                "{@b Camaraderie.} Good people make even the longest voyage bearable. (Good)"
              ],
              [
                "2",
                "{@b Luck.} Our luck depends on respecting its rules—now throw this salt over your shoulder. (Lawful)"
              ],
              [
                "3",
                "{@b Daring.} The richest bounty goes to those who risk everything. (Chaotic)"
              ],
              [
                "4",
                "{@b Plunder.} Take all that you can and leave nothing for the scavengers. (Evil)"
              ],
              [
                "5",
                "{@b Balance.} Do not fish the same spot twice in a row; suppress your greed, and nature will reward you. (Neutral)"
              ],
              [
                "6",
                "{@b Hard Work.} No wave can move a soul hard at work. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Fisher Bonds",
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
                "I lost something important in the deep sea, and I intend to find it."
              ],
              [
                "2",
                "Someone else's greed destroyed my livelihood, and I will be compensated."
              ],
              [
                "3",
                "I will fish the many famous waters of this land."
              ],
              [
                "4",
                "The gods saved me during a terrible storm, and I will honor their gift."
              ],
              [
                "5",
                "My destiny awaits me at the bottom of a particular pond in the Feywild."
              ],
              [
                "6",
                "I must repay my village's debt."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Fisher Flaws",
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
                "I am judgmental, especially of those I deem homebodies or otherwise lazy."
              ],
              [
                "2",
                "I become depressed and anxious if I'm away from the sea too long."
              ],
              [
                "3",
                "I have lived a hard life and find it difficult to empathize with others."
              ],
              [
                "4",
                "I am inclined to tell long-winded stories at inopportune times."
              ],
              [
                "5",
                "I work hard, but I play harder."
              ],
              [
                "6",
                "I am obsessed with catching an elusive aquatic beast, often to the detriment of other pursuits."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Marine",
    "source": "GoS",
    "page": 31,
    "skillProficiencies": [
      {
        "athletics": true,
        "survival": true
      }
    ],
    "toolProficiencies": [
      {
        "vehicles (water)": true,
        "vehicles (land)": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "dagger|phb",
            "displayName": "dagger that belonged to a fallen comrade"
          },
          {
            "special": "folded flag emblazoned with the symbol of your ship or company"
          },
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
            "entry": "{@skill Athletics}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@filter Vehicles (water, land)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (land);vehicle (water)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item dagger|phb} that belonged to a fallen comrade, a folded flag emblazoned with the symbol of your ship or company, a set of {@item traveler's clothes|phb}, and a belt {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Steady",
        "entries": [
          "You can move twice the normal amount of time (up to 16 hours) each day before being subject to the effect of a forced march (see \"Travel Pace\" in chapter 8 of the Player's Handbook). Additionally, you can automatically find a safe route to land a boat on shore, provided such a route exists."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Hardship Endured",
        "entries": [
          "Hardship in your past has forged you into an unstoppable living weapon. This hardship is essential to you and is at the heart of a personal philosophy or ethos that often guides your actions. You can roll on the following table to determine this hardship or choose one that best fits your character.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Hardship"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Nearly Drowned. You hid underwater to avoid detection by enemies and held your breath for an extremely long time. Just before you would have died, you had a revelation about your existence."
              ],
              [
                "2",
                "Captured. You spent months enduring thirst, starvation, and torture at the hands of your enemy, but you never broke."
              ],
              [
                "3",
                "Sacrifice. You enabled the escape of your fellow soldiers, but at great cost to yourself. Some of your past comrades may think you're dead."
              ],
              [
                "4",
                "Juggernaut. No reasonable explanation can explain how you survived a particular battle. Every arrow and bolt missed you. You slew scores of enemies single-handedly and led your comrades to victory."
              ],
              [
                "5",
                "Stowaway. For days, you hid in the bilge of an enemy ship, surviving on brackish water and foolhardy rats. At the right moment, you crept up to the deck and took over the ship on your own."
              ],
              [
                "6",
                "Leave None Behind. You carried an injured marine for miles to avoid capture and death."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Marines are looked up to by other soldiers and respected by their superiors. They are veteran warriors who rarely lose composure on the battlefield. Marines who leave the service tend to work as mercenaries, but their combat experience also makes them excellent adventurers. Though they are self-reliant, marines tend to operate best in groups, valuing camaraderie and the companionship of like-minded individuals.",
          {
            "type": "table",
            "caption": "Marine Personality Traits",
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
                "I speak rarely but mean every word I say."
              ],
              [
                "2",
                "I laugh loudly and see the humor in stressful situations."
              ],
              [
                "3",
                "I prefer to solve problems without violence, but I finish fights decisively."
              ],
              [
                "4",
                "I enjoy being out in nature; poor weather never sours my mood."
              ],
              [
                "5",
                "I am dependable."
              ],
              [
                "6",
                "I am always working on some project or other."
              ],
              [
                "7",
                "I become cantankerous and quiet in the rain."
              ],
              [
                "8",
                "When the sea is within my sight, my mood is jovial and optimistic."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Marine Ideals",
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
                "{@b Teamwork.} Success depends on cooperation and communication. (Good)"
              ],
              [
                "2",
                "{@b Code.} The marines' code provides a solution for every problem, and following it is imperative. (Lawful)"
              ],
              [
                "3",
                "{@b Embracing.} Life is messy. Throwing yourself into the worst of it is necessary to get the job done. (Chaotic)"
              ],
              [
                "4",
                "{@b Might.} The strong train so that they might rule those who are weak. (Evil)"
              ],
              [
                "5",
                "{@b Bravery.} To act when others quake in fear—this is the essence of the warrior. (Any)"
              ],
              [
                "6",
                "{@b Perseverance.} No injury or obstacle can turn me from my goal. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Marine Bonds",
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
                "I face danger and evil to offset an unredeemable act in my past."
              ],
              [
                "2",
                "I. Will. Finish. The. Job."
              ],
              [
                "3",
                "I must set an example of hope for those who have given up."
              ],
              [
                "4",
                "I'm searching for a fellow marine captured by an elusive enemy."
              ],
              [
                "5",
                "Fear leads to tyranny, and both must be eradicated."
              ],
              [
                "6",
                "My commander betrayed my unit, and I will have revenge."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Marine Flaws",
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
                "I grow combative and unpredictable when I drink."
              ],
              [
                "2",
                "I find civilian life difficult and struggle to say the right thing in social situations."
              ],
              [
                "3",
                "My intensity can drive others away."
              ],
              [
                "4",
                "I hold grudges and have difficulty forgiving others."
              ],
              [
                "5",
                "I become irrational when innocent people are hurt."
              ],
              [
                "6",
                "I sometimes stay up all night listening to the ghosts of my fallen enemies."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Shipwright",
    "source": "GoS",
    "page": 33,
    "skillProficiencies": [
      {
        "history": true,
        "perception": true
      }
    ],
    "toolProficiencies": [
      {
        "carpenter's tools": true,
        "vehicles (water)": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "carpenter's tools|phb",
            "displayName": "set of well-loved carpenter's tools"
          },
          {
            "item": "book|phb",
            "displayName": "blank book"
          },
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
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
            "entry": "{@skill History}, {@skill Perception}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Carpenter's tools|phb}, {@filter Vehicles (water)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (water)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of well-loved {@item carpenter's tools|phb}, a blank {@item book|phb}, {@item Ink (1-ounce bottle)|phb|1 ounce of ink}, an {@item ink pen|phb}, a set of {@item traveler's clothes|phb}, and a leather {@item pouch|phb} with 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: I'll Patch It!",
        "entries": [
          "Provided you have carpenter's tools and wood, you can perform repairs on a water vehicle. When you use this ability, you restore a number of hit points to the hull of a water vehicle equal to 5 × your proficiency modifier. A vehicle cannot be patched by you in this way again until after it has been pulled ashore and fully repaired."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Life at Sea",
        "entries": [
          "Your life at sea and in port has shaped you; you can roll on the following table to determine its impact or choose an element that best fits your character.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Sea's Influence"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Grand Designs.} You are working on plans and schematics for a new, very fast ship. You must examine as many different kinds of vessels as possible to help ensure the success of your design."
              ],
              [
                "2",
                "{@b Solid and Sound.} You patched up a war galley and prevented it from sinking. The local navy regards you as a friend."
              ],
              [
                "3",
                "{@b Favored.} You insisted on thicker planking for a merchant vessel's hull, which saved it from sinking when it smashed against a reef. You have a standing invitation to visit the merchant's distant mansion."
              ],
              [
                "4",
                "{@b Master of Armaments.} You specialized in designing and mounting defenses for the navy. You easily recognize and determine the quality of such items."
              ],
              [
                "5",
                "{@b Low Places.} You have contacts in the smuggling outfits along the coast; you occasionally repair the criminals' ships in exchange for coin and favors."
              ],
              [
                "6",
                "{@b Mysteries of the Deep.} You experienced an encounter with a possibly divine being while sailing alone. Work with your DM to determine the secret about the deep waters of the sea that this entity revealed to you."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Shipwrights are resourceful carpenters and designers. They often have a dedicated spot at the local tavern, since shipwrights are invaluable to coastal communities. Some travel with naval fleets and might serve as officers if their temperament suits it. Shipwrights have an affinity for working with their hands and often perform feats of carpentry that others might deem miraculous.",
          {
            "type": "table",
            "caption": "Shipwright Personality Traits",
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
                "I love talking and being heard more than I like to listen."
              ],
              [
                "2",
                "I'm extremely fond of puzzles."
              ],
              [
                "3",
                "I thrive under pressure."
              ],
              [
                "4",
                "I love sketching and designing objects, especially boats."
              ],
              [
                "5",
                "I'm not afraid of hard work—in fact, I prefer it."
              ],
              [
                "6",
                "A pipe, an ale, and the smell of the sea: paradise."
              ],
              [
                "7",
                "I have an endless supply of cautionary tales related to the sea."
              ],
              [
                "8",
                "I don't mind getting my hands dirty."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Shipwright Ideals",
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
                "Crew. If everyone on deck pitches in, we'll never sink. (Good)"
              ],
              [
                "2",
                "Careful Lines. A ship must be balanced according to the laws of the universe. (Lawful)"
              ],
              [
                "3",
                "Invention. Make what you need out of whatever is at hand. (Chaotic)"
              ],
              [
                "4",
                "Perfection. To measure a being and find it lacking is the greatest disappointment. (Evil)"
              ],
              [
                "5",
                "Reflection. Muddied water always clears in time. (Any)"
              ],
              [
                "6",
                "Hope. The horizon at sea holds the greatest promise. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Shipwright Bonds",
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
                "I must visit all the oceans of the world and behold the ships that sail there."
              ],
              [
                "2",
                "Much of the treasure I claim will be used to enrich my community."
              ],
              [
                "3",
                "I must find a kind of wood rumored to possess magical qualities."
              ],
              [
                "4",
                "I repair broken things to redeem what's broken in myself."
              ],
              [
                "5",
                "I will craft a boat capable of sailing through the most dangerous of storms."
              ],
              [
                "6",
                "A kraken destroyed my masterpiece; its teeth shall adorn my hearth."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Shipwright Flaws",
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
                "I don't know when to throw something away. You never know when it might be useful again."
              ],
              [
                "2",
                "I get frustrated to the point of distraction by shoddy craftsmanship."
              ],
              [
                "3",
                "Though I am an excellent crafter, my work tends to look as though it belongs on a ship."
              ],
              [
                "4",
                "I am so obsessed with sketching my ideas for elaborate inventions that I sometimes forget little thing like eating and sleeping."
              ],
              [
                "5",
                "I'm judgmental of those who are not skilled with tools of some kind."
              ],
              [
                "6",
                "I sometimes take things that don't belong to me, especially if they are very well made."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Smuggler",
    "source": "GoS",
    "page": 34,
    "skillProficiencies": [
      {
        "athletics": true,
        "deception": true
      }
    ],
    "toolProficiencies": [
      {
        "vehicles (water)": true
      }
    ],
    "startingEquipment": [
      {
        "a": [
          {
            "special": "fancy leather vest"
          }
        ],
        "b": [
          {
            "special": "pair of leather boots"
          }
        ]
      },
      {
        "_": [
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
            "entry": "{@skill Athletics}, {@skill Deception}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@filter Vehicles (water)|items|source=phb;dmg|miscellaneous=mundane|type=vehicle (water)}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A fancy leather vest or a pair of leather boots, a set of {@item common clothes|phb}, and a leather {@item pouch|phb} with 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Down Low",
        "entries": [
          "You are acquainted with a network of smugglers who are willing to help you out of tight situations. While in a particular town, city, or other similarly sized community (DM's discretion), you and your companions can stay for free in safe houses. Safe houses provide a poor lifestyle. While staying at a safe house, you can choose to keep your presence (and that of your companions) a secret."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Claim to Fame",
        "entries": [
          "Every smuggler has that one tale that sets them apart from common criminals. By wits, sailing skill, or a silver tongue, you lived to tell the story—and you tell it often. You can roll on the following table to determine your claim or choose one that best fits your character.",
          {
            "type": "table",
            "colLabels": [
              "d6",
              "Accomplishment"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Spirit of the Whale. You smuggled stolen dwarven spirits in the body of a dead whale being pulled behind a fishing boat. When you delivered the goods, the corpse suddenly exploded, sending whale meat and whiskey bottles for half a mile."
              ],
              [
                "2",
                "Cart and Sword. You drove a cart filled with stolen art through the middle of a battlefield while singing sea shanties to confuse the combatants."
              ],
              [
                "3",
                "The Recruit. You enlisted in another nation's navy for the purpose of smuggling stolen jewels to a distant port. You attained a minor rank before disappearing from the navy and making your way here."
              ],
              [
                "4",
                "River of Shadows. Your riverboat accidentally slipped through the veil into the Shadowfell for several hours. While you were there, you sold some stolen dragonborn artifacts before returning to this plane and paddling home."
              ],
              [
                "5",
                "Gold-Hearted. You agreed to transport a family escaping a war. The baby began to cry at a checkpoint, and you gave the guards all your gold to let you pass. The family never found out about this gesture."
              ],
              [
                "6",
                "Playing Both Sides. You once smuggled crates of crossbow bolts and bundles of arrows, each destined for an opposing side in a regional war, at the same time. The buyers arrived within moments of each other but did not discover your trickery."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "In general, smugglers value survival, and then profit, above other things. One could be a part of a larger organization, or might run a small smuggling vessel of their own. Smugglers live the lies they have told, and they have a natural ability to recall all the falsehoods and half-truths they have ever spouted.",
          {
            "type": "table",
            "caption": "Smuggler Personality Traits",
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
                "I love being on the water but hate fishing."
              ],
              [
                "2",
                "I think of everything in terms of monetary value."
              ],
              [
                "3",
                "I never stop smiling."
              ],
              [
                "4",
                "Nothing rattles me; I have a lie for every occasion."
              ],
              [
                "5",
                "I love gold but won't cheat a friend."
              ],
              [
                "6",
                "I enjoy doing things others believe to be impossible."
              ],
              [
                "7",
                "I become wistful when I see the sun rise over the ocean."
              ],
              [
                "8",
                "I am no common criminal; I am a mastermind."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Smuggler Ideals",
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
                "{@b Wealth} Heaps of coins in a secure vault is all I dream of. (Any)"
              ],
              [
                "2",
                "{@b Smuggler's Code} I uphold the unwritten rules of the smugglers, who do not cheat one another or directly harm innocents. (Lawful)"
              ],
              [
                "3",
                "{@b All for a Coin} I'll do nearly anything if it means I turn a profit. (Evil)"
              ],
              [
                "4",
                "{@b Peace and Prosperity} I smuggle only to achieve a greater goal that benefits my community. (Good)"
              ],
              [
                "5",
                "{@b People} For all my many lies, I place a high value on friendship. (Any)"
              ],
              [
                "6",
                "{@b Daring} I am most happy when risking everything. (Any)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Smuggler Bonds",
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
                "My vessel was stolen from me, and I burn with the desire to recover it."
              ],
              [
                "2",
                "I intend to become the leader of the network of smugglers that I belong to."
              ],
              [
                "3",
                "I owe a debt that cannot be repaid in gold."
              ],
              [
                "4",
                "After one last job, I will retire from the business."
              ],
              [
                "5",
                "I was tricked by a fellow smuggler who stole something precious from me. I will find that thief."
              ],
              [
                "6",
                "I give most of my profits to a charitable cause, and I don't like to brag about it."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Smuggler Flaws",
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
                "Lying is reflexive, and I sometimes engage in it without realizing."
              ],
              [
                "2",
                "I tend to assess my relationships in terms of profit and loss."
              ],
              [
                "3",
                "I believe everyone has a price and am cynical toward those who present themselves as virtuous."
              ],
              [
                "4",
                "I struggle to trust the words of others."
              ],
              [
                "5",
                "Few people know the real me."
              ],
              [
                "6",
                "Though I act charming, I feel nothing for others and don't know what friendship is."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  }
];
