// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Azorius Functionary",
    "source": "GGR",
    "page": 33,
    "skillProficiencies": [
      {
        "insight": true,
        "intimidation": true
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
            "special": "Azorius insignia"
          },
          {
            "special": "scroll containing the text of a law important to you"
          },
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
          "fine clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "friends#c",
            "message#c"
          ],
          "s1": [
            "command",
            "ensnaring strike"
          ],
          "s2": [
            "arcane lock",
            "calm emotions",
            "hold person"
          ],
          "s3": [
            "clairvoyance",
            "counterspell"
          ],
          "s4": [
            "compulsion",
            "divination"
          ],
          "s5": [
            "dominate person"
          ]
        }
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
            "entry": "{@skill Insight}, {@skill Intimidation}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "An Azorius insignia, a scroll containing the text of a law important to you, a {@item Ink (1-ounce bottle)|phb|bottle of blue ink}, a {@item ink pen|phb|pen}, a set of {@item fine clothes|phb}, and a belt {@item pouch|phb} containing 10 gp (Azorius-minted 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Legal Authority",
        "entries": [
          "You have the authority to enforce the laws of Ravnica, and that status inspires a certain amount of respect and even fear in the populace. People mind their manners in your presence and avoid drawing your attention; they assume you have the right to be wherever you are. Showing your Azorius insignia gets you an audience with anyone you want to talk to (though it might cause more problems than it solves when you're dealing with incorrigible lawbreakers). If you abuse this privilege, though, you can get in serious trouble with your superiors and even be stripped of your position."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Azorius Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Azorius Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Azorius Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell friends}, {@spell message}"
              ],
              [
                "1st",
                "{@spell command}, {@spell ensnaring strike}"
              ],
              [
                "2nd",
                "{@spell arcane lock}, {@spell calm emotions}, {@spell hold person}"
              ],
              [
                "3rd",
                "{@spell clairvoyance}, {@spell counterspell}"
              ],
              [
                "4th",
                "{@spell compulsion}, {@spell divination}"
              ],
              [
                "5th",
                "{@spell dominate person}"
              ]
            ]
          },
          "Your magic often takes the form of blue or golden runes floating and glowing in the air in circular patterns or of shimmering azure barriers of magical energy. If you cast {@spell ensnaring strike}, for example, the vines created by the spell might appear as rune-inscribed glowing bands that wrap around the target and hold it in place."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Members of the Azorius Senate tend toward a demeanor of cold dignity and a pragmatic, orderly nature. Steeped in the law as they are, their ideals and priorities revolve around legal issues.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I try never to let my judgment become clouded by emotion."
              ],
              [
                "2",
                "I have infinite patience with the dolts and boors I'm forced to deal with every day."
              ],
              [
                "3",
                "When I give an order, I expect it to be obeyed."
              ],
              [
                "4",
                "I just want things the way I like them: neat, orderly, and clean."
              ],
              [
                "5",
                "No wrongdoing can escape my watchful gaze."
              ],
              [
                "6",
                "I always say exactly what I mean, no matter how many words it takes to communicate the particular nuance I am attempting to convey."
              ],
              [
                "7",
                "I'm very literal and don't appreciate metaphor or sarcasm."
              ],
              [
                "8",
                "I never change my mind once it's made up."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Order}. The law is meant to ensure that the gears of society turn smoothly and quietly. (Lawful)"
              ],
              [
                "3",
                "{@b Peace}. The ultimate object of the law is to remove violence from society. (Good)"
              ],
              [
                "4",
                "{@b Compliance}. Coercion is a fine way of ensuring that the laws are obeyed. (Lawful)"
              ],
              [
                "5",
                "{@b Legislation}. The law embodies excellence in its precision and detail. (Lawful)"
              ],
              [
                "6",
                "{@b Punishment}. A public display of consequences is an excellent deterrent for other criminals. (Evil)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I am beholden to an Azorius arrester who captured the criminal who killed my parents, saving me from the same fate."
              ],
              [
                "2",
                "I hope one day to write the laws, not just enforce them."
              ],
              [
                "3",
                "I tried and failed to prevent a murder, and I have sworn to find and arrest the perpetrator."
              ],
              [
                "4",
                "I successfully prevented a murder, and the would-be perpetrator wants me dead."
              ],
              [
                "5",
                "One of my parents was prominent in the guild, and I resent constantly being compared to that standard."
              ],
              [
                "6",
                "I've modeled my career after a highly respected lawmage or arrester, but I fear that my role model might be involved in something illegal."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm unable to distinguish between the letter and the spirit of the law."
              ],
              [
                "2",
                "I seem like a harsh judge to others, but I judge myself most harshly of all."
              ],
              [
                "3",
                "I have a secret, illegal vice."
              ],
              [
                "4",
                "I was traumatized by witnessing a crime as a child."
              ],
              [
                "5",
                "I'm incapable of deception."
              ],
              [
                "6",
                "I wish I had joined the Boros, but I fear they'd never accept me."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The Azorius Senate is a sprawling bureaucracy, and people in a variety of positions throughout the guild can pull strings to make things happen. Because of the guild's role in making and enforcing laws for the entire city, your place in the Azorius can easily bring you into contact with members of other guilds, for good or ill.",
          "Roll twice on the Azorius Contacts table (for an ally and a rival) and once on the Non-Azorius Contacts table.",
          {
            "type": "table",
            "caption": "Azorius Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "As a teenager, I was a page for a prominent judge."
              ],
              [
                "2",
                "One of my childhood friends is now a precognitive mage in service of the guild."
              ],
              [
                "3",
                "I joined the Azorius hoping to impress an arrester whom I admire."
              ],
              [
                "4",
                "My former mentor is now a warden at Udzec, the new Azorius prison."
              ],
              [
                "5",
                "I was second best at everything in my legal training, and now I work with the person who was always just a little bit better."
              ],
              [
                "6",
                "A good friend was promoted into work they can't tell me about."
              ],
              [
                "7",
                "I know a homunculus in the halls of New Prahv who can get things done behind the scenes."
              ],
              [
                "8",
                "I was once summoned to the presence of Supreme Judge Isperia, the guildmaster of the Azorius, who complimented me on my work."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Azorius Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Roll an additional Azorius contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "2",
                "The person who recruited me into the Azorius left and joined the Boros."
              ],
              [
                "3",
                "I have a friendship with a Dimir agent who sometimes funnels me secrets about Azorius activities."
              ],
              [
                "4",
                "A Golgari spore druid would love to see me slip up and break the law."
              ],
              [
                "5",
                "A lesser Gruul chieftain seems to think I could be useful."
              ],
              [
                "6",
                "The black sheep of my family is putting their maniacal genius to use in the Izzet."
              ],
              [
                "7",
                "I'm friends with an Orzhov advokist; we compare notes on different forms of law magic."
              ],
              [
                "8",
                "I was ridiculed once in a Rakdos performance; the performer was impressed with my good humor about it and now does me occasional favors."
              ],
              [
                "9",
                "I have a fanatical Selesnya cousin who keeps trying to recruit me and everyone else in the family."
              ],
              [
                "10",
                "While growing up, I was bullied by a brat who's now a hybrid in the Simic Combine."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "As a member of the Azorius Senate, you are probably engaged in the work of law enforcement (even if your background involved the legislative or judicial aspects of the senate's activities). Legislative aides and judges' clerks find little reason to venture beyond the Azorius guildhalls, but soldiers and lawmages patrol the streets daily.",
          "An Azorius soldier or lawmage is a force for order, charged with fighting crime on the streets—and in the halls of power. You might spend your time foiling thefts, putting a stop to Orzhov extortion, rooting out Dimir spies, or hunting down Golgari assassins. Perhaps you take your orders from a precognitive mage (or you are one yourself) who receives unpredictable and cryptic visions of future crimes that you and your allies must try to prevent."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Boros Legionnaire",
    "source": "GGR",
    "page": 40,
    "skillProficiencies": [
      {
        "athletics": true,
        "intimidation": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "celestial",
            "draconic",
            "goblin",
            "other"
          ]
        }
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
            "special": "Boros insignia"
          },
          {
            "special": "feather from an angel's wing"
          },
          {
            "special": "tattered piece of a Boros banner (a souvenir from a famous battle)"
          },
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 200
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "fire bolt#c",
            "sacred flame#c"
          ],
          "s1": [
            "guiding bolt",
            "heroism"
          ],
          "s2": [
            "aid",
            "scorching ray"
          ],
          "s3": [
            "beacon of hope",
            "blinding smite"
          ],
          "s4": [
            "death ward",
            "wall of fire"
          ],
          "s5": [
            "flame strike"
          ]
        }
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
            "entry": "One type of {@filter gaming set|items|source=phb|miscellaneous=mundane|type=gaming set}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose one of Celestial, Draconic, Goblin, or Minotaur"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Boros insignia, a feather from an angel's wing, a tattered piece of a Boros banner (a souvenir from a famous battle), a set of {@item common clothes|phb}, and a belt {@item pouch|phb} containing 2 gp (Boros-minted 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Legion Station",
        "entries": [
          "You have an established place in the hierarchy of the Boros Legion. You can requisition simple equipment for temporary use, and you can gain access to any Boros garrison in Ravnica, where you can rest in safety and receive the attention of medics. You are also paid a salary of 1 gp (a Boros-minted 1-zino coin) per week, which (combined with free lodging in your garrison) enables you to maintain a poor lifestyle between adventures."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Boros Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Boros Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Boros Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell fire bolt}, {@spell sacred flame}"
              ],
              [
                "1st",
                "{@spell guiding bolt}, {@spell heroism}"
              ],
              [
                "2nd",
                "{@spell aid}, {@spell scorching ray}"
              ],
              [
                "3rd",
                "{@spell beacon of hope}, {@spell blinding smite}"
              ],
              [
                "4th",
                "{@spell death ward}, {@spell wall of fire}"
              ],
              [
                "5th",
                "{@spell flame strike}"
              ]
            ]
          },
          "Your magic often features dramatic bursts of flame or radiance. When you cast beneficial spells on your allies, they appear momentarily surrounded with halos of bright fire."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "The Boros Legion is a zealous army, full of righteous energy tempered with military discipline. Its members share its leadership's devotion to the ideals of justice, or they find satisfaction in the more warfare-oriented aspects of the legion's work.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I approach every task with the same high degree of military precision."
              ],
              [
                "2",
                "I am always the first into the fray."
              ],
              [
                "3",
                "I bear any injury or indignity with stoic discipline."
              ],
              [
                "4",
                "My righteous wrath is easily inflamed by the slightest iniquity."
              ],
              [
                "5",
                "My honor is more important to me than my life."
              ],
              [
                "6",
                "Dangerous work is best accomplished by an orderly group working with common purpose."
              ],
              [
                "7",
                "I treat my weapons, uniform, and insignia with reverence, for they are gifts of the angels."
              ],
              [
                "8",
                "I pace when standing and fidget incessantly when forced to sit."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Justice}. Achieving justice requires establishing fair, equitable, and compassionate relationships within a community. (Good)"
              ],
              [
                "3",
                "{@b Protection}. It isn't right for innocents to suffer because of the arrogance of the powerful. (Good)"
              ],
              [
                "4",
                "{@b Solidarity}. It is most crucial to act with a single will, marching side by side in perfect accord. (Lawful)"
              ],
              [
                "5",
                "{@b Order}. Society functions only if people do their duty and respect the chain of command. (Lawful)"
              ],
              [
                "6",
                "{@b Conviction}. Anything worth doing is worth doing with your whole heart. (Lawful)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I would lay down my life for Aurelia and the angels."
              ],
              [
                "2",
                "I owe my life to the Boros captain who took me in when I was living on the streets."
              ],
              [
                "3",
                "My fellow legionnaires are my family."
              ],
              [
                "4",
                "I wield the same Boros weapon my grandparent did, for the honor of our family."
              ],
              [
                "5",
                "I ran with the Rakdos in my youth, and I'm striving to atone for my past misdeeds."
              ],
              [
                "6",
                "I do what I can to help out the spouse of a comrade who died in battle."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I act bravely when I'm in a group, but I'm a coward when I'm alone."
              ],
              [
                "2",
                "I see everything in clear-cut black and white."
              ],
              [
                "3",
                "I'm just a little fascinated by the ways of the Gruul."
              ],
              [
                "4",
                "I trust the chain of command more than anything—more even than my closest friends."
              ],
              [
                "5",
                "I'm slow to trust members of other guilds."
              ],
              [
                "6",
                "I've been known to turn a blind eye to injustice, with the help of a modest bribe."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The ordered structure of the Boros Legion offers abundant opportunities to make friends—and rivals—in higher places. You might have close friends in other guilds that share the Boros emphasis on order and community, or bitter enemies among the guilds that represent chaos and destruction.",
          "Roll twice on the Boros Contacts table (for an ally and a rival) and once on the Non-Boros Contacts table.",
          {
            "type": "table",
            "caption": "Boros Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "A former comrade in arms was promoted into the prestigious Sunhome Guard."
              ],
              [
                "2",
                "One of my parents is a ranking Boros officer."
              ],
              [
                "3",
                "A close friend serves aboard the {@i Parhelion II}, a flying fortress."
              ],
              [
                "4",
                "I had a tangled affair with a Boros garrison captain."
              ],
              [
                "5",
                "I have maintained a relationship with one of my instructors at Horizon Military Academy."
              ],
              [
                "6",
                "I competed with a fellow student for the attention of a mentor at Horizon Military Academy."
              ],
              [
                "7",
                "The person who recruited me into the legion changed the course of my life."
              ],
              [
                "8",
                "A Boros angel knows my name."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Boros Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "One of my siblings is an Azorius arrester."
              ],
              [
                "2",
                "Roll an additional Boros contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "3",
                "I showed mercy to an injured, now-grateful Dimir spy."
              ],
              [
                "4",
                "I suspect someone I know is a Golgari assassin, but I can't prove it."
              ],
              [
                "5",
                "An adolescent relative ran off to join the Gruul in an act of rebellion and has not yet returned."
              ],
              [
                "6",
                "I once befriended an Izzet scientist, and we're still cordial though the relationship ended messily."
              ],
              [
                "7",
                "I owe a monetary debt to an Orzhov syndic."
              ],
              [
                "8",
                "A Rakdos blood witch seems to enjoy harassing me."
              ],
              [
                "9",
                "I tried to recruit a friend who ended up joining the Selesnya."
              ],
              [
                "10",
                "I keep running into a particular Simic biomancer, and I enjoy the arguments that inevitably result."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "As a member of the Boros Legion, you are subject to the orders of your superior officers. You go where the angels tell you to go, and you do what they command you to do, to the best of your ability. If you enjoy some measure of independence, it's either because you have proven yourself capable of working without close supervision or because you're a rebellious sort who is willing to disobey orders now and face the consequences later.",
          "As a soldier on the street, you are tasked with bringing dangerous threats like the Rakdos and the Gruul in line. You might contend with Rakdos performances gone horribly out of control, Gruul raids on outlying neighborhoods, shipments of rot-infested vegetation from the Golgari undercity, and violent uprisings among the guildless. At the same time, you might have to worry about Dimir spies infiltrating your leadership, overzealous or corrupt Azorius senators abusing the law at the expense of justice, Izzet experiments leveling city blocks, and Simic creations that break out of laboratories and wreak havoc through the Tenth District.",
          {
            "type": "inset",
            "name": "Tajic, Blade of the Legion",
            "entries": [
              "Tajic is a firefist who carries the exalted title of Blade of the Legion, putting him just below the angels in rank. He maintains close communication with Aurelia, though recent events in the city have set them at odds. Tajic believes that the Boros can trust only the Boros. He is convinced that any effort at peace among the guilds is doomed to failure without the Guildpact. The Boros, he argues, would be better off spending their energy to make themselves stronger so they can uphold the fragile balance that exists now—and protect the innocent when the balance tilts. Aurelia feels that his negative attitude runs the risk of poisoning the hearts of the other Boros and undermining any peace efforts. For the most part, in deference to the angel, Tajic keeps his views to himself."
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Dimir Operative",
    "source": "GGR",
    "page": 46,
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
        "disguise kit": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "Dimir insignia"
          },
          {
            "special": "small knives",
            "quantity": 3
          },
          {
            "item": "common clothes|phb",
            "displayName": "dark-colored common clothes"
          },
          {
            "special": "the starting equipment of the background described in this chapter for your secondary guild"
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "encode thoughts|ggr#c",
            "mage hand#c"
          ],
          "s1": [
            "disguise self",
            "sleep"
          ],
          "s2": [
            "detect thoughts",
            "pass without trace"
          ],
          "s3": [
            "gaseous form",
            "meld into stone",
            "nondetection"
          ],
          "s4": [
            "arcane eye",
            "freedom of movement"
          ],
          "s5": [
            "modify memory"
          ]
        }
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
            "entry": "{@item Disguise kit|phb}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Dimir insignia, three small knives, a set of dark-colored {@item common clothes|phb}, and the starting equipment of the background described in this chapter for your secondary guild"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: False Identity",
        "entries": [
          "You have more than one identity. The one you wear most of the time makes you appear to be a member of a guild other than House Dimir. You have documentation, established acquaintances, and disguises that allow you to assume that persona and fit into the secondary guild.",
          "Whenever you choose, you can drop this identity and blend into the guildless masses of the city.",
          "Consider why you're embedded in the secondary guild. Create a story with your DM, inspired by rolling on the following table or choosing a reason that suits you.",
          {
            "type": "table",
            "colLabels": [
              "d8",
              "Reason for Infiltration"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My parents belong to this guild, and I let them think I'm following in their footsteps."
              ],
              [
                "2",
                "I've been assigned to track this guild's activities."
              ],
              [
                "3",
                "I've been assigned to get close to an individual in this guild and learn their secrets."
              ],
              [
                "4",
                "I've been assigned to recruit a new Dimir spy from the ranks of this guild."
              ],
              [
                "5",
                "I was a member of this guild before the Dimir recruited me."
              ],
              [
                "6",
                "I don't like what this guild stands for and want to destroy it from within."
              ],
              [
                "7",
                "I secretly wish I could leave the Dimir and join this guild, but there is no escaping the Dimir."
              ],
              [
                "8",
                "I chose this guild at random or on a lark."
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
        "name": "Dimir Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Dimir Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Dimir Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell encode thoughts|GGR}, {@spell mage hand}"
              ],
              [
                "1st",
                "{@spell disguise self}, {@spell sleep}"
              ],
              [
                "2nd",
                "{@spell detect thoughts}, {@spell pass without trace}"
              ],
              [
                "3rd",
                "{@spell gaseous form}, {@spell meld into stone}, {@spell nondetection}"
              ],
              [
                "4th",
                "{@spell arcane eye}, {@spell freedom of movement}"
              ],
              [
                "5th",
                "{@spell modify memory}"
              ]
            ]
          },
          "Your magic is meant to be subtle and undetectable, but it might pull shadows or clouds of mist around you as you cast your spells. Using the {@spell encode thoughts|GGR} cantrip described below, you can turn a creature's thoughts (including your own) into a thought strand that others can potentially read, share, or steal. These thought strands are treated as valuable currency among the Dimir."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Skilled at infiltration, disguise, and deception, members of House Dimir appear inscrutable. Your true personality and ideals might never manifest, or they might mark you as a quirky member of your secondary guild.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm good at hiding my true thoughts and feelings."
              ],
              [
                "2",
                "When I'm in doubt about revealing something, I assume it's a secret, and I don't share it."
              ],
              [
                "3",
                "I like to sound mysterious, because wisdom hidden grows deeper with time."
              ],
              [
                "4",
                "I have no patience with people who get in my way."
              ],
              [
                "5",
                "I love hearing about other people's nightmares."
              ],
              [
                "6",
                "Combat is meant to be quick, clean, and one-sided."
              ],
              [
                "7",
                "I like to stick to the shadows."
              ],
              [
                "8",
                "I never show my anger. I just plot my revenge."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My true guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Control}. I like pulling the strings. (Lawful)"
              ],
              [
                "3",
                "{@b Secrets}. I collect secrets and never reveal them. (Any)"
              ],
              [
                "4",
                "{@b Knowledge}. I want to know as much as I can about this city and how it works. (Any)"
              ],
              [
                "5",
                "{@b Independence}. I value the freedom to pursue my own goals without interference. (Chaotic)"
              ],
              [
                "6",
                "{@b Nihilism}. I don't believe in anything, and anyone who does is a fool. (Neutral)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I discovered a secret I can't let anyone else uncover—including my guild superiors."
              ],
              [
                "2",
                "I formed a close friendship or romance with someone in the guild I'm infiltrating."
              ],
              [
                "3",
                "The Dimir agent who recruited me was unmasked and killed. My revenge on the killers will be thorough and painful."
              ],
              [
                "4",
                "I spend as much time as I can in the Ismeri Library because I'm certain an information hub operates behind its facade. I want its secrets!"
              ],
              [
                "5",
                "I'm utterly loyal to my superior in the guild, more than to the guild or its guildmaster."
              ],
              [
                "6",
                "Someone has discovered my true identity."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I like secrets so much that I'm reluctant to share details of a plan even with those who need to know."
              ],
              [
                "2",
                "I would let my friends die rather than reveal my true identity."
              ],
              [
                "3",
                "I have trouble trusting anyone but myself."
              ],
              [
                "4",
                "I have a particular vice that puts all my secrets at risk if I'm not careful."
              ],
              [
                "5",
                "I'm pretty sure I've done something horrible that I can't remember because of the guild's mind magic."
              ],
              [
                "6",
                "I put too much trust in the people who give me orders."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "As an agent of House Dimir working undercover, you have limited contacts within your guild. Your relationships within your secondary guild, in the guise of your false identity, are usually more extensive.",
          "Roll once on the Dimir Contacts table, giving you an ally who serves as your contact in Dimir. Then roll twice on the table for your secondary guild. The first roll gives you an ally there, and the second roll gives you a rival.",
          {
            "type": "table",
            "caption": "Dimir Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I know a Dimir courier who relays messages to me from someone higher up the chain of command."
              ],
              [
                "2",
                "I get orders from a shapeshifter I recognize only through a series of code phrases we exchange."
              ],
              [
                "3",
                "An ostentatiously wealthy vampire is my secret guild superior, summoning me to a luxurious estate by means of coded messages."
              ],
              [
                "4",
                "I have never met my guild contact, but I receive telepathic messages, usually in my dreams."
              ],
              [
                "5",
                "I've never met my guild contact, but I get coded messages from a pattern of street lights and graffiti."
              ],
              [
                "6",
                "I didn't discover the identity of my guild contact until after we had begun a romantic relationship."
              ],
              [
                "7",
                "My superior maintains an elaborate identity as a young street urchin... unless it's all a lie, and I'm being sent on ridiculous missions by a twisted child."
              ],
              [
                "8",
                "My sibling and I both get telepathic orders from a mysterious contact, and I'm starting to question the authenticity of my sibling's orders."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "As a Dimir adventurer, you are a member of the guild's network of spies, thieves, assassins, and mind mages that lurks behind the facade of the public guild. On the surface, House Dimir presents the appearance of a network of couriers, investigators, media reporters, and archivists, dealing in information and spreading news. But you and your peers trade in secrets. You use secret symbols, runes, and signals to surreptitiously communicate with other Dimir agents, often in plain sight.",
          "Like any good spy, you have multiple identities: your true face as an agent of House Dimir; a guildless identity; and a role as a member of another guild. Within that secondary guild, you might already be on a mission for House Dimir, assigned to spy on the guild, collect information about a person, or recruit another spy from the ranks of the guild. Or that guild could be a launching point for your real mission. Perhaps, for example, you were ordered to infiltrate the Azorius in hopes of gaining access to a notorious inmate in an Azorius prison."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Golgari Agent",
    "source": "GGR",
    "page": 53,
    "skillProficiencies": [
      {
        "nature": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "elvish",
            "giant",
            "other"
          ]
        }
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
          {
            "special": "Golgari insignia"
          },
          "poisoner's kit|phb",
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      },
      {
        "a": [
          {
            "special": "pet beetle"
          }
        ],
        "b": [
          {
            "special": "pet spider"
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "dancing lights#c",
            "spare the dying#c"
          ],
          "s1": [
            "entangle",
            "ray of sickness"
          ],
          "s2": [
            "protection from poison",
            "ray of enfeeblement",
            "spider climb"
          ],
          "s3": [
            "animate dead",
            "plant growth"
          ],
          "s4": [
            "giant insect",
            "grasping vine"
          ],
          "s5": [
            "cloudkill",
            "insect plague"
          ]
        }
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
            "entry": "{@skill Nature}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Poisoner's kit|phb}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose one of Elvish, Giant, or Kraul"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Golgari insignia, a {@item poisoner's kit|phb}, a pet beetle or spider, a set of {@item common clothes|phb}, and a belt {@item pouch|phb} containing 10 gp worth of mixed coins"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Undercity Paths",
        "entries": [
          "You know hidden, underground pathways that you can use to bypass crowds, obstacles, and observation as you move through the city. When you aren't in combat, you and companions you lead can travel between any two locations in the city twice as fast as your speed would normally allow. The paths of the undercity are haunted by dangers that rarely brave the light of the surface world, so your journey isn't guaranteed to be safe."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Golgari Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Golgari Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Golgari Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell dancing lights}, {@spell spare the dying}"
              ],
              [
                "1st",
                "{@spell entangle}, {@spell ray of sickness}"
              ],
              [
                "2nd",
                "{@spell protection from poison}, {@spell ray of enfeeblement}, {@spell spider climb}"
              ],
              [
                "3rd",
                "{@spell animate dead}, {@spell plant growth}"
              ],
              [
                "4th",
                "{@spell giant insect}, {@spell grasping vine}"
              ],
              [
                "5th",
                "{@spell cloudkill}, {@spell insect plague}"
              ]
            ]
          },
          "Golgari magic is often accompanied by a sickly green glow and a rotting stench."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Members of the Golgari Swarm are unmistakably products of the undercity, ill at ease amid the comforts of civilization. They bring about the same discomfort in others by reminding them of death's inevitable approach.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Remember, I could kill you in your sleep. Or put centipedes in your bedroll."
              ],
              [
                "2",
                "I like to remind people of their inevitable demise."
              ],
              [
                "3",
                "Sometimes I give voice to the whispers of the rot, which I hear but no one else does."
              ],
              [
                "4",
                "I do my best to discourage anyone from approaching or talking to me."
              ],
              [
                "5",
                "I have accepted my death. Hence, I don't fear it."
              ],
              [
                "6",
                "Like roots growing through stone, I am relentless and determined in my action."
              ],
              [
                "7",
                "I put my knowledge of anatomy to use by narrating the injuries my enemies suffer in grisly detail."
              ],
              [
                "8",
                "Like a wild animal, I lash out viciously when I'm provoked—and I'm easily provoked."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Stoicism}. All of us are part of the cyclical march of nature, which will continue with or without us. (Neutral)"
              ],
              [
                "3",
                "{@b Nature}. The natural world is more important than the edifices of the city and civilization. (Neutral)"
              ],
              [
                "4",
                "{@b Interdependence}. We are all part of nature's web. (Lawful)"
              ],
              [
                "5",
                "{@b Ambition}. The time of Golgari ascendance is at hand, and I intend to have a prominent place in the new world order. (Evil)"
              ],
              [
                "6",
                "{@b Live and Let Live}. Meddling in the affairs of other guilds is a great way to get squashed like a bug. (Neutral)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I cherish the finger of a family member who was {@condition petrified} by a medusa."
              ],
              [
                "2",
                "I have an identical twin who is as different from me as any person could be."
              ],
              [
                "3",
                "I want to lead one faction of the guild to a new position of dominance."
              ],
              [
                "4",
                "I love spending time in the moss-covered building where I took part in my first reclamation mission."
              ],
              [
                "5",
                "I found something in the sewer that must never come to light."
              ],
              [
                "6",
                "I am forever grateful to the reclaimer who found me floating facedown in the sewer, moments from death."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Death comes for us all, so you can't expect me to take care of someone who can't fight it off."
              ],
              [
                "2",
                "I assume that anyone outside the Golgari looks down on me."
              ],
              [
                "3",
                "I feel a need for revenge against those who enjoy the privilege of living above ground."
              ],
              [
                "4",
                "I don't bother to couch my opinions in flattering words."
              ],
              [
                "5",
                "I can't help but pocket any trinket or coin I come across, no matter how worthless."
              ],
              [
                "6",
                "I'm convinced that I'm better and stronger than members of other guilds, isolated as they are from the realities of life and death."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "To the extent that the Golgari Swarm acts like a single organism, you are connected to every other member in some way or another. Convinced that the rest of the world is out to get you, you find it easy to form close bonds with your guild mates, and harder to make meaningful connections with others.",
          "Roll twice on the Golgari Contacts table (for an ally and a rival) and once on the Non-Golgari Contacts table.",
          {
            "type": "table",
            "caption": "Golgari Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "One of my parents is an elite assassin, a member of the Ochran."
              ],
              [
                "2",
                "I learned combat from a kraul."
              ],
              [
                "3",
                "I know a medusa who is stationed in the guildhall."
              ],
              [
                "4",
                "I had a torrid romance with a spore druid responsible for a large rot farm."
              ],
              [
                "5",
                "There's a troll in a remote area of the undercity who seems to find me interesting—and who knows more than you'd think."
              ],
              [
                "6",
                "An elf lich is determined to see me become a lich someday, too."
              ],
              [
                "7",
                "A medusa decided it would be more fun to recruit me into the guild than to kill me."
              ],
              [
                "8",
                "I know a findbroker who can locate just about anything, for the right price."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Golgari Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "An Azorius arrester I literally pulled out of the gutter will do anything for me."
              ],
              [
                "2",
                "Someone joined the Gruul in a battle against the Boros once, and the sergeant of that Boros squad would love to prove that it was me."
              ],
              [
                "3",
                "I had a romance with a Dimir agent whom I still feed secrets to."
              ],
              [
                "4",
                "Roll an additional Golgari contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "5",
                "I joined the Gruul in a battle against the Boros once, and the chief of that small clan thanks me for turning the tide."
              ],
              [
                "6",
                "An Izzet scientist resents that I sold a scrapped invention I found in the sewer."
              ],
              [
                "7",
                "My undercity explorations led me into an Orzhov vault, and a spirit thinks I stole something valuable."
              ],
              [
                "8",
                "I found a baby beast and sold it to a Rakdos wrangler who remains grateful to me."
              ],
              [
                "9",
                "A Selesnya druid and I share an interest in the same garden, and we have enjoyable arguments there."
              ],
              [
                "10",
                "I regularly pick up refuse from beneath a Simic laboratory, and sometimes I talk to the researcher who dumps it there."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "As part of the Golgari Swarm, you are a specialized instrument of the greater body. Your orders, when you have such, come from the guildmaster by way of his chancellors, who carry his messages throughout the guild. The swarm relies on you to advance the greater good by protecting some part, however small, of its teeming existence. That responsibility doesn't mean you're indispensable; your eventual death is part of your purpose and function, too, and you'll be replaced even as your body provides nutrients to further the swarm's growth.",
          "A classic adventuring role for a member of the Golgari involves crawling through dungeon-like environments—the sewers and ancient vaults of the undercity—in search of treasures left behind by the dead. Sometimes you might be sent to find a specific item believed lost in a dangerous part of the undercity. At other times, you could be asked to collect samples of a specific fungus, retrieve a body floating in the muck of the sewers, or bring back whatever booty you can to help fill the swarm's coffers.",
          "You might gain enough renown to become a member of the Ochran, assigned to a variety of tasks concerning thievery, assassination, or the protection of important figures in your guild. You might steal something because the guild needs it, or because its loss will bring harm to another guild, hastening that group's decline. You could be assigned to kill an outspoken and active enemy of the Golgari, such as an overzealous Boros captain whose raids into the undercity have approached dangerously close to the swarm's inner sanctum. Or you could serve as a bodyguard to one of Guildmaster Jarad's high chancellors, escorting this figure through the undercity while being ready to intervene at a moment's notice if things go wrong.",
          "The shamans of the Golgari use their magic to accelerate the cycle of decay and regrowth. You might be sent to spread spores throughout an area that the Golgari want to claim as their territory or to convince the inhabitants of such a territory to abandon it. You might also contend with the ever-present threat of hostile monsters encroaching into Golgari-controlled regions."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Gruul Anarch",
    "source": "GGR",
    "page": 60,
    "skillProficiencies": [
      {
        "animal handling": true,
        "athletics": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "draconic",
            "giant",
            "goblin",
            "sylvan"
          ]
        }
      }
    ],
    "toolProficiencies": [
      {
        "herbalism kit": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "Gruul insignia"
          },
          "hunting trap|phb",
          "herbalism kit|phb",
          {
            "special": "the skull of a boar"
          },
          {
            "special": "beast-hide cloak"
          },
          "traveler's clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "fire bolt#c",
            "produce flame#c"
          ],
          "s1": [
            "compelled duel",
            "speak with animals",
            "thunderwave"
          ],
          "s2": [
            "beast sense",
            "shatter"
          ],
          "s3": [
            "conjure animals",
            "conjure barrage"
          ],
          "s4": [
            "dominate beast",
            "stoneskin"
          ],
          "s5": [
            "destructive wave"
          ]
        }
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
            "entry": "{@skill Animal Handling}, {@skill Athletics}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Herbalism kit|phb}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose one of Draconic, Giant, Goblin, or Sylvan"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Gruul insignia, a {@item hunting trap|phb}, an {@item herbalism kit|phb}, the skull of a boar, a beast-hide cloak, a set of {@item traveler's clothes|phb}, and a belt {@item pouch|phb} containing 10 gp (Azorius 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Rubblebelt Refuge",
        "entries": [
          "You are intimately familiar with areas of the city that most people shun: ruined neighborhoods where wurms rampaged, overgrown parks that no hand has tended in decades, and the vast, sprawling rubblebelts of broken terrain that civilized folk have long abandoned. You can find a suitable place for you and your allies to hide or rest in these areas. In addition, you can find food and fresh water in these areas for yourself and up to five other people each day."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Gruul Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Gruul Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Gruul Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell fire bolt}, {@spell produce flame}"
              ],
              [
                "1st",
                "{@spell compelled duel}, {@spell speak with animals}, {@spell thunderwave}"
              ],
              [
                "2nd",
                "{@spell beast sense}, {@spell shatter}"
              ],
              [
                "3rd",
                "{@spell conjure animals}, {@spell conjure barrage}"
              ],
              [
                "4th",
                "{@spell dominate beast}, {@spell stoneskin}"
              ],
              [
                "5th",
                "{@spell destructive wave}"
              ]
            ]
          },
          "Fueled by the fire of rage burning in your heart, your magic is almost always accompanied by fiery effects, such as flames smoldering behind your eyes or dancing over your hands."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Gruul ways aren't the ways of civilized folk, and the Gruul have little patience for social niceties. But they do have cherished traditions and values, just as important to them as the different values held by the urban, cosmopolitan culture of Ravnica.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Unlike people, the beasts of the wild are friends who won't stab me in the back."
              ],
              [
                "2",
                "Go ahead and insult me—I dare you."
              ],
              [
                "3",
                "I scorn those who can't survive away from the comforts of the city."
              ],
              [
                "4",
                "Don't tell me I'm not allowed to do something."
              ],
              [
                "5",
                "Laws are for people who are afraid to face their inner beasts."
              ],
              [
                "6",
                "I smear the blood of my enemies over my skin."
              ],
              [
                "7",
                "I was, in fact, raised by maaka."
              ],
              [
                "8",
                "HarrRRAAGGHH! [I rarely form a coherent sentence and prefer to express myself by breaking things.]"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Clan}. My clan is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Anarchy}. No person or law or custom can tell another what to do. (Chaotic)"
              ],
              [
                "3",
                "{@b Nature}. We weren't born tame or domesticated, so we shouldn't have to live that way. (Neutral)"
              ],
              [
                "4",
                "{@b Might}. The strongest are meant to dominate the weak. (Evil)"
              ],
              [
                "5",
                "{@b Rage}. AAAAAARRRRggggh! [To live is to feel and express the rage burning in your belly.] (Chaotic)"
              ],
              [
                "6",
                "{@b Tradition}. The Old Ways must be preserved and upheld. (Any)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I am determined that one day I will lead my clan—or a new one."
              ],
              [
                "2",
                "I would give my life for my clan chieftain."
              ],
              [
                "3",
                "The chieftain of another clan has a grudge against me."
              ],
              [
                "4",
                "I am devoted to a sacred site in the midst of the rubblebelt."
              ],
              [
                "5",
                "My weapon is made from the first raktusk I ever hunted."
              ],
              [
                "6",
                "GrrrRRAAAAGGHH! [I will do anything to prove myself greater than my siblings or ancestors.]"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "If you question my courage, I will never back down."
              ],
              [
                "2",
                "HrrrGGGAAAARRuuuh! [My anger in battle led to the death of a loved one.]"
              ],
              [
                "3",
                "I'm as stubborn as a batterboar."
              ],
              [
                "4",
                "I'm so convinced of my superiority over soft, civilized people that I'll take great risks to prove it."
              ],
              [
                "5",
                "I'm easily manipulated by people I find attractive."
              ],
              [
                "6",
                "I'm not actually all that angry."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The members of the Gruul Clans rely on each other even as they vie for territory and glory. Their encounters with members of other guilds are more often violent than friendly, but occasional bonds do form.",
          "Roll twice on the Gruul Contacts table (for an ally and a rival) and once on the Non-Gruul Contacts table.",
          {
            "type": "table",
            "caption": "Gruul Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "One of my parents is a renowned warrior in my clan."
              ],
              [
                "2",
                "My sibling has the ear of the clan chief."
              ],
              [
                "3",
                "I have cousins in a different clan."
              ],
              [
                "4",
                "When we were younger, I was romantically involved with a prominent warrior in my clan."
              ],
              [
                "5",
                "A druid in my clan believes I have a destiny to fulfill."
              ],
              [
                "6",
                "The warrior who trained me remembers me for my exceptional potential."
              ],
              [
                "7",
                "My clan chief killed one of my parents, who had challenged the chief for leadership of the clan. Some combination of resentment and remorse stirs the clan chief to help me sometimes."
              ],
              [
                "8",
                "I made a strong impression on Borborygmos."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Gruul Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "An Azorius arrester thinks I can be reformed."
              ],
              [
                "2",
                "A Boros soldier gives me gifts in exchange for information about other clans' movements."
              ],
              [
                "3",
                "I once caught and released a Dimir spy."
              ],
              [
                "4",
                "I consult with a Golgari shaman for spiritual guidance at times."
              ],
              [
                "5",
                "Roll an additional Gruul contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "6",
                "An Izzet scientist blames the Gruul for the destruction of his life's work in a raid, but seems to think that I'm not like other Gruul."
              ],
              [
                "7",
                "I foolishly borrowed money from an Orzhov syndic to indulge a shameful vice."
              ],
              [
                "8",
                "A close friend left our clan and joined the Cult of Rakdos."
              ],
              [
                "9",
                "A distant relative is trying to recruit me into the Selesnya Conclave."
              ],
              [
                "10",
                "I stopped a Simic biomancer from trapping wild beasts to perform vile experiments on them."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "In service of a simple goal, you have a simple part to play: Fight. Unleash your rage. Flatten buildings and defeat those who stand in your way. Be Gruul, in your own way.",
          "You will frequently be summoned to participate in a raid your clan is launching against the city or against a group of its defenders. Your clan leader might also send you on a special mission, though it would almost certainly still qualify as a raid. You might join a small group of Gruul warriors on a dangerous charge deep into the settled streets to plunder a certain location, retrieve an item stolen from your clan, or assault a Boros garrison.",
          "Sometimes your objective might be more esoteric. With prophecies of the return of Ilharg the Raze-Boar spreading like wildfire among the Gruul druids, you might be asked to carry out some task that the druids believe will speed his coming. Such a task might involve collecting a sacred relic held in an Orzhov vault or collecting sacrifices for a grand ceremony in the Raze-Boar's honor."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Izzet Engineer",
    "source": "GGR",
    "page": 66,
    "skillProficiencies": [
      {
        "arcana": true,
        "investigation": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "draconic",
            "goblin",
            "other"
          ]
        }
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
            "special": "Izzet insignia"
          },
          {
            "equipmentType": "toolArtisan"
          },
          {
            "special": "the charred and twisted remains of a failed experiment"
          },
          "hammer|phb",
          "block and tackle|phb",
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "produce flame#c",
            "shocking grasp#c"
          ],
          "s1": [
            "chaos bolt|xge",
            "create or destroy water",
            "unseen servant"
          ],
          "s2": [
            "heat metal",
            "rope trick"
          ],
          "s3": [
            "call lightning",
            "elemental weapon",
            "glyph of warding"
          ],
          "s4": [
            "conjure minor elementals",
            "divination",
            "otiluke's resilient sphere"
          ],
          "s5": [
            "animate objects",
            "conjure elemental"
          ]
        }
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
            "entry": "{@skill Arcana}, {@skill Investigation}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose one of Draconic, Goblin, or Vedalken"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "An Izzet insignia, one set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}, the charred and twisted remains of a failed experiment, a {@item hammer|phb}, a {@item block and tackle|phb}, a set of {@item common clothes|phb}, and a belt {@item pouch|phb} containing 5 gp (Azorius 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Urban Infrastructure",
        "entries": [
          "The popular conception of the Izzet League is based on mad inventions, dangerous experiments, and explosive blasts. Much of that perception is accurate, but the league is also involved with mundane tasks of construction and architecture—primarily in crafting the infrastructure that allows Ravnicans to enjoy running water, levitating platforms, and other magical and technological wonders.",
          "You have a basic knowledge of the structure of buildings, including the stuff behind the walls. You can also find blueprints of a specific building in order to learn the details of its construction. Such blueprints might provide knowledge of entry points, structural weaknesses, or secret spaces. Your access to such information isn't unlimited. If obtaining or using the information gets you in trouble with the law, the guild can't shield you from the repercussions."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Izzet Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Izzet Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Izzet Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell produce flame}, {@spell shocking grasp}"
              ],
              [
                "1st",
                "{@spell chaos bolt|XGE}, {@spell create or destroy water}, {@spell unseen servant}"
              ],
              [
                "2nd",
                "{@spell heat metal}, {@spell rope trick}"
              ],
              [
                "3rd",
                "{@spell call lightning}, {@spell elemental weapon}, {@spell glyph of warding}"
              ],
              [
                "4th",
                "{@spell conjure minor elementals}, {@spell divination}, {@spell Otiluke's resilient sphere}"
              ],
              [
                "5th",
                "{@spell animate objects}, {@spell conjure elemental}"
              ]
            ]
          },
          "Your spells tend to be loud, flashy, or explosive, even when the effect is unremarkable. For example, when you open the portal of a {@spell rope trick} spell, the portal might be outlined by harmless, showy sparkles.",
          "If you use an arcane focus, it probably takes the form of an intricate device that could include metal gauntlets, glass canisters, copper tubing, and leather straps attaching it to your body. The {@item mizzium apparatus|GGR} described in {@book chapter 5|GGR|4|Mizzium Apparatus} is a magical version of this gear.",
          "The {@spell chaos bolt|XGE} spell is a favorite of Izzet spellcasters because of its unpredictable nature."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Members of the Izzet League embody some combination of chaotic, frenetic energy with intellectual curiosity, in varying proportions. Some are committed to academic pursuits, and others just like explosions.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I have a hard time staying focused on... oh, and my brain tends to jump from one... did I mention focus?"
              ],
              [
                "2",
                "I get really excited about my ideas and I can't wait to talk about them and start putting them into practice and tinkering with them and I want to tell you about how exciting it all is!"
              ],
              [
                "3",
                "It's not magic—or anything, really—if you do it only halfway. Whatever I do, I give it all I've got."
              ],
              [
                "4",
                "I do what my gut tells me."
              ],
              [
                "5",
                "Life's an experiment, and I can't wait to see what happens."
              ],
              [
                "6",
                "I pepper my speech with the incomprehensible jargon of my trade, like mizzium droplets inserted into a weird-field suspension."
              ],
              [
                "7",
                "Great ideas are fine, but great results are what counts."
              ],
              [
                "8",
                "If you can guess what I'm about to do, that means I've run out of imagination."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Creativity}. Half the world's troubles come from stodgy thinking, stuck in the past. We need innovative solutions. (Chaotic)"
              ],
              [
                "3",
                "{@b Discovery}. Every experiment has the potential to reveal more secrets of the multiverse. (Any)"
              ],
              [
                "4",
                "{@b Science}. A rigorous application of logical principles and protocols will lead us toward progress more surely than any belief system. (Lawful)"
              ],
              [
                "5",
                "{@b Fun}. I love my job! Despite the dangerous working conditions, there's nothing I'd rather do. (Chaotic)"
              ],
              [
                "6",
                "{@b Power}. Someday I'll find or create the magic that will make me the most powerful being in Ravnica. (Evil)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I have dedicated my life to finding a solution to a scientific problem."
              ],
              [
                "2",
                "I'll never forget the laboratory where I learned my skills, or the other attendants who learned alongside me."
              ],
              [
                "3",
                "I'm convinced it was sabotage that destroyed my first laboratory and killed many of my friends, and I seek revenge against whoever did it."
              ],
              [
                "4",
                "I have the schematics for an invention that I hope to build one day, once I have the necessary resources."
              ],
              [
                "5",
                "A fellow student and I are racing to solve the same scientific puzzle."
              ],
              [
                "6",
                "I would do anything the guildmaster told me to do."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "If there's a plan, I'll probably forget it. If I don't forget it, I'll probably ignore it."
              ],
              [
                "2",
                "I get bored easily, and if nothing is happening I'll make something happen."
              ],
              [
                "3",
                "Nothing is ever simple, and if it seems simple, I'll find a way to make it complicated."
              ],
              [
                "4",
                "I tend to ignore sleep for days when I'm conducting research, often at the expense of my own health and safety."
              ],
              [
                "5",
                "I'm convinced there's not a soul in Ravnica, except maybe the great Niv-Mizzet, who can match my boundless intellect."
              ],
              [
                "6",
                "I'm incapable of admitting a flaw in my logic."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The laboratories of the Izzet League are constantly starting up new projects and dissolving old ones, so it's easy for even the lowliest attendant to make friends (and enemies) in laboratories across Ravnica.",
          "Roll twice on the Izzet Contacts table (for an ally and a rival) and once on the Non-Izzet Contacts table.",
          {
            "type": "table",
            "caption": "Izzet Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "An older relative is a member of the guild's board of directors."
              ],
              [
                "2",
                "I know a sprite who carries important messages among the guild's laboratories."
              ],
              [
                "3",
                "A sibling is the head of a laboratory doing exotic research."
              ],
              [
                "4",
                "A former colleague is now an attendant in a laboratory in the central guildhall."
              ],
              [
                "5",
                "I'm in regular communication with an instructor who set me on the course of my life and research."
              ],
              [
                "6",
                "I had a romance with a chemister working in the Blistercoils."
              ],
              [
                "7",
                "As an attendant, I had a fierce rivalry with another attendant for our supervisor's attention."
              ],
              [
                "8",
                "The guildmaster, Niv-Mizzet, took note of one of my experiments!"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Izzet Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "An Azorius inspector seems interested in my work."
              ],
              [
                "2",
                "I was ready to join the Boros before I decided on Izzet, and I sometimes still hear from the sergeant who tried to recruit me."
              ],
              [
                "3",
                "One of my former assistants turned out to be a Dimir spy. We're not on friendly terms anymore, but we have a habit of running into each other."
              ],
              [
                "4",
                "A Golgari assassin killed a bitter rival of mine, leaving me with conflicted feelings."
              ],
              [
                "5",
                "I helped a minor Gruul chieftain acquire an Izzet weapon."
              ],
              [
                "6",
                "Roll an additional Izzet contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "7",
                "An Orzhov banker financed my laboratory's current work and expects great returns."
              ],
              [
                "8",
                "I have a cousin in the Cult of Rakdos, and we get along quite well."
              ],
              [
                "9",
                "A former attendant from the same laboratory ran off to join the Selesnya, and we get into a big argument every time we run into each other."
              ],
              [
                "10",
                "I compare notes and techniques with a Simic scientist over lunch sometimes."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "Whatever your role in the Izzet League, you are expected to contribute to its research in some way. That contribution might involve participating in tests, whether as an assistant, a researcher, or a subject. You might be one of the soldiers who protects a laboratory, or a laborer responsible for lifting heavy pieces of equipment into place. Everyone's contribution matters, even if the Izzet know that some matter more than others."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Orzhov Representative",
    "source": "GGR",
    "page": 72,
    "skillProficiencies": [
      {
        "intimidation": true,
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
          {
            "special": "Orzhov insignia"
          },
          {
            "special": "foot-long chain made of ten gold coins"
          },
          {
            "special": "vestments"
          },
          "fine clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "friends#c",
            "guidance#c"
          ],
          "s1": [
            "command",
            "illusory script"
          ],
          "s2": [
            "enthrall",
            "ray of enfeeblement",
            "zone of truth"
          ],
          "s3": [
            "bestow curse",
            "speak with dead",
            "spirit guardians"
          ],
          "s4": [
            "blight",
            "death ward",
            "leomund's secret chest"
          ],
          "s5": [
            "geas"
          ]
        }
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
            "entry": "{@skill Intimidation}, {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "An Orzhov insignia, a foot-long chain made of ten gold coins, vestments, a set of {@item fine clothes|phb}, and a belt {@item pouch|phb} containing 1 pp (an Orzhov-minted 10-zino coin)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Leverage",
        "entries": [
          "You can exert leverage over one or more individuals below you in the guild's hierarchy and demand their help as needs warrant. For example, you can have a message carried across a neighborhood, procure a short carriage ride without paying, or have others clean up a bloody mess you left in an alley. The DM decides if your demands are reasonable and if there are subordinates available to fulfill them. As your status in the guild improves, you gain influence over more people, including ones in greater positions of power."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Orzhov Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Orzhov Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Orzhov Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell friends}, {@spell guidance}"
              ],
              [
                "1st",
                "{@spell command}, {@spell illusory script}"
              ],
              [
                "2nd",
                "{@spell enthrall}, {@spell ray of enfeeblement}, {@spell zone of truth}"
              ],
              [
                "3rd",
                "{@spell bestow curse}, {@spell speak with dead}, {@spell spirit guardians}"
              ],
              [
                "4th",
                "{@spell blight}, {@spell death ward}, {@spell Leomund's secret chest}"
              ],
              [
                "5th",
                "{@spell geas}"
              ]
            ]
          },
          "Your magic tends to manifest as swirling shadows, brilliant light, or sometimes the momentary appearance of shadowy spirit forms. Your spells might draw the blood of your enemies, or even directly touch their souls."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Members of the Orzhov Syndicate range from the decadent nobility at the top of the oligarchy to the debt-ridden wretches at the bottom. You fall somewhere between those extremes, so you might behave with the arrogance of the very rich or the humility of the impoverished.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I am always willing to act in accordance with the financial incentive offered."
              ],
              [
                "2",
                "Debts are never meant to be forgiven."
              ],
              [
                "3",
                "I am accustomed to enjoying the finest pleasures money can buy."
              ],
              [
                "4",
                "No one could doubt that I am a cut above the masses of pitiful peasants that infest the city."
              ],
              [
                "5",
                "I can't stand to spend a zib more than necessary to purchase what I need."
              ],
              [
                "6",
                "I hate it when people try to make light of a serious situation."
              ],
              [
                "7",
                "I want to make sure everyone is aware of how wealthy, powerful, and important I am."
              ],
              [
                "8",
                "I can't think of anything to look forward to."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Wealth}. I will do whatever it takes to become as rich as the oligarchs. (Evil)"
              ],
              [
                "3",
                "{@b Power}. One day, I will be the one giving orders. (Evil)"
              ],
              [
                "4",
                "{@b Prestige}. I want to be admired, respected, feared, or even hated for my position and wealth. (Evil)"
              ],
              [
                "5",
                "{@b Stability}. The economy functions best when chaos is kept under control and everyone knows their place. (Lawful)"
              ],
              [
                "6",
                "{@b Eternity}. I want to live forever—in the flesh as long as possible, and as a spirit afterward. (Any)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "The unbearable weight of my debt has driven me to desperation."
              ],
              [
                "2",
                "I'm duty-bound to obey the dictates of an ancestor on the Ghost Council."
              ],
              [
                "3",
                "I value my worldly goods more highly than my mortal life."
              ],
              [
                "4",
                "An oligarch publicly humiliated me, and I will exact revenge on that whole family."
              ],
              [
                "5",
                "My faith in the Obzedat never wavers."
              ],
              [
                "6",
                "I want to prove myself more worthy than an older sibling and thereby ensure that I inherit a greater share of my parents' wealth."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I hold a scandalous secret that could ruin my family forever—but could also earn me the favor of the Ghost Council."
              ],
              [
                "2",
                "I'm convinced that everyone I know is plotting against me."
              ],
              [
                "3",
                "I'll brave any risk if the monetary reward is great enough."
              ],
              [
                "4",
                "I am convinced that I am far more important than anyone else is willing to acknowledge."
              ],
              [
                "5",
                "I have little respect for anyone who isn't wealthy."
              ],
              [
                "6",
                "I'll take any opportunity to steal from wealthier people, even for worthless trinkets."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The Orzhov Syndicate operates according to a strict hierarchy built on a network of connections among old, wealthy families. Your family might provide important contacts, while your family's activities in crime, banking, or debt collection could tie you to members of other guilds.",
          "Roll twice on the Orzhov Contacts table (for an ally and a rival) and once on the Non-Orzhov Contacts table.",
          {
            "type": "table",
            "caption": "Orzhov Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "The spirit of an ancestor has taken an interest in me."
              ],
              [
                "2",
                "An older cousin has the ear of a powerful oligarch."
              ],
              [
                "3",
                "I know a knight who is responsible for collecting debts from powerful people."
              ],
              [
                "4",
                "A vampire pontiff tried to use me as a pawn in past schemes."
              ],
              [
                "5",
                "A silent spirit follows me around."
              ],
              [
                "6",
                "A sibling has keys to parts of Vizkopa Bank."
              ],
              [
                "7",
                "A giant thinks I'm adorable."
              ],
              [
                "8",
                "I regularly offer tribute to an angel, and the angel has been kind to me in turn."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Orzhov Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "An Azorius arrester is always snooping into my family's business transactions."
              ],
              [
                "2",
                "A Boros paladin saved my life, to my everlasting shame."
              ],
              [
                "3",
                "I know a shopkeeper who is secretly a Dimir agent and tries to make sure that I keep that secret hidden."
              ],
              [
                "4",
                "I'm fascinated by the culture of the Golgari kraul, and I have formed a friendship with one of their death priests."
              ],
              [
                "5",
                "A Gruul druid hates me but would never dare to touch me."
              ],
              [
                "6",
                "I know an Izzet engineer who is desperate to pay off a debt accrued by a deceased relative."
              ],
              [
                "7",
                "Roll an additional Orzhov contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "8",
                "My childhood friend is now a Rakdos torturer. We still meet for drinks occasionally."
              ],
              [
                "9",
                "I have the key to a vault where a Selesnya druid is hiding an item of secret shame."
              ],
              [
                "10",
                "I was married to a Simic bioengineer."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "The structure of the Orzhov Syndicate means that you are always doing the bidding of someone higher up the ladder than you are. Ultimately, your role in the guild is defined by whatever the people (and spirits) above you decide for you.",
          "For most of your career, you can expect to engage in some aspect of the day-to-day criminal operations of the guild. That can mean throwing your weight around to enforce the will of the guild or using religious authority to extort offerings from the people. But it can also mean doing various errands for your superiors, from bearing messages to carrying out assassinations."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Rakdos Cultist",
    "source": "GGR",
    "page": 79,
    "skillProficiencies": [
      {
        "acrobatics": true,
        "performance": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "abyssal",
            "giant"
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
            "special": "Rakdos insignia"
          },
          {
            "equipmentType": "instrumentMusical"
          },
          "costume clothes|phb",
          {
            "item": "hooded lantern|phb",
            "displayName": "hooded lantern made of wrought iron"
          },
          {
            "special": "10-foot length of chain with sharply spiked links"
          },
          "tinderbox|phb",
          {
            "item": "torch|phb",
            "quantity": 10
          },
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 1000
          },
          {
            "special": "bottle of sweet, red juice"
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "fire bolt#c",
            "vicious mockery#c"
          ],
          "s1": [
            "burning hands",
            "dissonant whispers",
            "hellish rebuke"
          ],
          "s2": [
            "crown of madness",
            "enthrall",
            "flaming sphere"
          ],
          "s3": [
            "fear",
            "haste"
          ],
          "s4": [
            "confusion",
            "wall of fire"
          ],
          "s5": [
            "dominate person"
          ]
        }
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
            "entry": "{@skill Acrobatics}, {@skill Performance}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose either Abyssal or Giant"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Rakdos insignia, a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} (one of your choice), a {@item costume clothes|phb|costume}, a {@item hooded lantern|phb} made of wrought iron, a 10-foot length of chain with sharply spiked links, a {@item tinderbox|phb}, 10 {@item torch|phb|torches}, a set of {@item common clothes|phb}, a belt {@item pouch|phb} containing 10 gp (a mix of Azorius and Boros 1-zino coins), and a bottle of sweet, red juice"
          }
        ]
      },
      {
        "type": "entries",
        "name": "A Flair for the Dramatic",
        "entries": [
          "Rakdos performance styles typically fuse standard circus-style acrobatics with fire, wrought-iron spikes and hooks, and monsters. You can roll a {@dice d8} or choose from the options in the Performance Options table to determine your preferred style of performance.",
          {
            "type": "table",
            "caption": "Performance Options",
            "colLabels": [
              "d8",
              "Type of Performer"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Spikewheel acrobat"
              ],
              [
                "2",
                "Lampooning satirist"
              ],
              [
                "3",
                "Fire juggler"
              ],
              [
                "4",
                "Marionette puppeteer"
              ],
              [
                "5",
                "Pain artist"
              ],
              [
                "6",
                "Noise musician"
              ],
              [
                "7",
                "Nightmare clown"
              ],
              [
                "8",
                "Master of ceremonies"
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
        "name": "Feature: Fearsome Reputation",
        "entries": [
          "People recognize you as a member of the Cult of Rakdos, and they're careful not to draw your anger or ridicule. You can get away with minor criminal offenses, such as refusing to pay for food at a restaurant or breaking down a door at a local shop, if no legal authorities witness the crime. Most people are too daunted by you to report your wrongdoing to the Azorius."
        ]
      },
      {
        "type": "entries",
        "name": "Rakdos Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Rakdos Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Rakdos Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell fire bolt}, {@spell vicious mockery}"
              ],
              [
                "1st",
                "{@spell burning hands}, {@spell dissonant whispers}, {@spell hellish rebuke}"
              ],
              [
                "2nd",
                "{@spell crown of madness}, {@spell enthrall}, {@spell flaming sphere}"
              ],
              [
                "3rd",
                "{@spell fear}, {@spell haste}"
              ],
              [
                "4th",
                "{@spell confusion}, {@spell wall of fire}"
              ],
              [
                "5th",
                "{@spell dominate person}"
              ]
            ]
          },
          "Your magic often produces a flashy spectacle, wreathing you or your targets in a mixture of harmless flame and shadowy shapes. When you manipulate an opponent's mind, a flaming symbol of Rakdos might momentarily appear like a mask over the target's face."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Members of demonic cults aren't generally known as the kindest or most mentally stable individuals, so you're likely to have something in your nature that distinguishes you from the law-abiding citizens of Ravnica.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I revel in mayhem, the more destructive the better."
              ],
              [
                "2",
                "When violence breaks out, I lose myself in rage, and it's sometimes hard to stop."
              ],
              [
                "3",
                "Everything is funny to me, and the most hilarious and bloodiest things leave me cackling with sadistic glee."
              ],
              [
                "4",
                "I derive genuine pleasure from the pain of others."
              ],
              [
                "5",
                "I enjoy testing other people's patience."
              ],
              [
                "6",
                "I can't stand it when things are predictable, so I like to add a little chaos to every situation."
              ],
              [
                "7",
                "I throw my weight around to make sure I get my way."
              ],
              [
                "8",
                "I enjoy breaking delicate works of art. And fingers, which are sort of the same."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Hedonism}. Death comes for everyone, so take as much pleasure as you can from every moment of life. (Neutral)"
              ],
              [
                "3",
                "{@b Creativity}. I strive to find more ways to express my art through pain—my own as well as others'. (Chaotic)"
              ],
              [
                "4",
                "{@b Freedom}. No one tells me what to do. (Chaotic)"
              ],
              [
                "5",
                "{@b Equality}. I want to see Ravnica remade, with no guilds and no hierarchies. (Chaotic)"
              ],
              [
                "6",
                "{@b Spectacle}. People are inspired by the greatness they see in art. (Any)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I have belonged to the same performance troupe for years, and these people mean everything to me."
              ],
              [
                "2",
                "A blood witch told me I have a special destiny to fulfill, and I'm trying to figure out what it is."
              ],
              [
                "3",
                "I'm secretly hoping that I can change the cult from the inside, using my influence to help rein in the wanton violence."
              ],
              [
                "4",
                "I own something that Rakdos once touched (it's seared black at the spot), and I cherish it."
              ],
              [
                "5",
                "I want to be better at my chosen form of performance than any other member of my troupe."
              ],
              [
                "6",
                "I am devoted to Rakdos and live to impress him."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My family is prominent in another guild. I enjoy my wild life, but I don't want to embarrass them."
              ],
              [
                "2",
                "I couldn't hide my emotions and opinions even if I wanted to."
              ],
              [
                "3",
                "I throw caution to the wind."
              ],
              [
                "4",
                "I resent the rich and powerful."
              ],
              [
                "5",
                "When I'm angry, I lash out in violence."
              ],
              [
                "6",
                "There's no such thing as too much pleasure."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The Cult of Rakdos is anything but organized. Individuals frequently move from one performance troupe to another. Almost all members of the cult know former castmates now in different troupes, which allows for the possibility of a widespread network of contacts.",
          "Roll twice on the Rakdos Contacts table (for an ally and a rival) and once on the Non-Rakdos Contacts table.",
          {
            "type": "table",
            "caption": "Rakdos Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I was part of a two-person act until my former partner moved to a different troupe."
              ],
              [
                "2",
                "My sibling and I ran away from home and joined the Cult of Rakdos together. We're very close."
              ],
              [
                "3",
                "A childhood friend of mine is an attendant in Rix Maadi, the Rakdos guildhall."
              ],
              [
                "4",
                "My parents brought me into the guild and taught me my trade."
              ],
              [
                "5",
                "There's a lesser demon in the cult who thinks he owes me a favor, and who am I to argue?"
              ],
              [
                "6",
                "The master of ceremonies in my troupe is well connected with other troupes."
              ],
              [
                "7",
                "I had a romance with a pain artist in another troupe."
              ],
              [
                "8",
                "Rakdos himself has witnessed me perform."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Rakdos Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I know an Azorius elocutor who has a very amusing dark side."
              ],
              [
                "2",
                "A Boros captain really wants to \"redeem\" me."
              ],
              [
                "3",
                "I think a member of my troupe is a Dimir agent."
              ],
              [
                "4",
                "I once convinced a Golgari medusa to participate in a show. We've been on good terms ever since."
              ],
              [
                "5",
                "I came from the Gruul and still have relatives there."
              ],
              [
                "6",
                "An Izzet technician provides pyrotechnics for my performances."
              ],
              [
                "7",
                "An Orzhov oligarch has taken an interest in my career, like a patron of the arts."
              ],
              [
                "8",
                "Roll an additional Rakdos contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "9",
                "A Selesnya healer attends my performances regularly."
              ],
              [
                "10",
                "A Simic biomancer provides mutant monsters to add a taste of the bizarre to our shows."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "The Cult of Rakdos encourages independent action on the part of its members. Its goal is fomenting chaos, and it firmly believes in putting its own house in disorder before carrying that mission into the larger city. So your role is to execute your vision of grand satire and disruptive performance art, as you aspire to outdo your guild mates and attract the attention of Rakdos himself.",
          "You work as part of a troupe, with your artistic talents used in service to a ringmaster's vision. But your performance is your own, and no one expects you to follow a script. In fact, if you go through a performance without doing something you haven't done before, you're clearly not trying hard enough."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Selesnya Initiate",
    "source": "GGR",
    "page": 86,
    "skillProficiencies": [
      {
        "nature": true,
        "persuasion": true
      }
    ],
    "languageProficiencies": [
      {
        "choose": {
          "from": [
            "elvish",
            "other",
            "sylvan"
          ]
        }
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "anyArtisansTool",
            "musical instrument"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "Selesnya insignia"
          },
          "healer's kit|phb",
          "robes|phb",
          "common clothes|phb",
          {
            "item": "pouch|phb",
            "containsValue": 500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "druidcraft#c",
            "friends#c"
          ],
          "s1": [
            "animal friendship",
            "charm person"
          ],
          "s2": [
            "aid",
            "animal messenger",
            "calm emotions",
            "warding bond"
          ],
          "s3": [
            "plant growth",
            "speak with plants"
          ],
          "s4": [
            "aura of life",
            "conjure minor elementals"
          ],
          "s5": [
            "awaken",
            "commune with nature"
          ]
        }
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
            "entry": "{@skill Nature}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} or one {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose one of Elvish, Loxodon, or Sylvan"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Selesnya insignia, a {@item healer's kit|phb}, {@item robes|phb}, a set of {@item common clothes|phb}, and a belt {@item pouch|phb} containing 5 gp (Azorius 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Conclave's Shelter",
        "entries": [
          "As a member of the Selesnya Conclave, you can count on your guild mates to provide shelter and aid. You and your companions can find a place to hide or rest in any Selesnya enclave in the city, unless you have proven to be a danger to them. The members of the enclave will shield you from the law or anyone else searching for you, though they will not risk their lives in this effort.",
          "In addition, as a guild member you can receive free healing and care at a Selesnya enclave, though you must provide any material components needed for spells."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Selesnya Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Selesnya Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Selesnya Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell druidcraft}, {@spell friends}"
              ],
              [
                "1st",
                "{@spell animal friendship}, {@spell charm person}"
              ],
              [
                "2nd",
                "{@spell aid}, {@spell animal messenger}, {@spell calm emotions}, {@spell warding bond}"
              ],
              [
                "3rd",
                "{@spell plant growth}, {@spell speak with plants}"
              ],
              [
                "4th",
                "{@spell aura of life}, {@spell conjure minor elementals}"
              ],
              [
                "5th",
                "{@spell awaken}, {@spell commune with nature}"
              ]
            ]
          },
          "Members of the Selesnya Conclave refer to their magic as \"doruvati,\" a Sylvan word meaning \"gift.\" When you use these gifts of Mat'Selesnya, graceful swirls of green and silver light dance in the air around you, and phantasmal green leaves might waft through the air. A sensation of gentle warmth and the smell of spring flowers or autumn leaves might accompany your spells."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "Most members of the Selesnya Conclave are true believers—the tight-knit community allows little room for the cynical or disillusioned. They are spiritual, empathetic, and generally peaceful—unless roused to action. Their flaws and bonds alike grow naturally from their close ties to the community.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I never raise my voice or lose my temper."
              ],
              [
                "2",
                "I feel the pains and joys of everyone around me, friend or foe."
              ],
              [
                "3",
                "I would rather make a friend than thwart an enemy."
              ],
              [
                "4",
                "I'm always straining to peer into another reality that seems to be just beyond my senses."
              ],
              [
                "5",
                "I'm uneasy if I can't see plants growing or feel soil beneath my feet."
              ],
              [
                "6",
                "Seeing illness or injury in any creature saddens me."
              ],
              [
                "7",
                "I have much to be proud of, but I am still just one strand in the grand, interwoven tapestry of life."
              ],
              [
                "8",
                "Nature offers rich and abundant metaphors for understanding the complexities of life."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Harmony}. Nothing is more beautiful than voices and actions aligned in common purpose. (Good)"
              ],
              [
                "3",
                "{@b Order}. Like a well-pruned tree, society thrives when everything is kept in good order. (Lawful)"
              ],
              [
                "4",
                "{@b Life}. Preserving life and nature is always a worthwhile endeavor. (Good)"
              ],
              [
                "5",
                "{@b Humility}. Ambition and pride are the roots of strife. (Good)"
              ],
              [
                "6",
                "{@b Evangelism}. When all have joined the Selesnya Conclave, Ravnica will finally know peace. (Any)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I would give my life in the defense of the small enclave where I first encountered Mat'Selesnya."
              ],
              [
                "2",
                "I love beasts and plants of all kinds, and am loath to harm them."
              ],
              [
                "3",
                "A healer nursed me to recovery from a mortal illness."
              ],
              [
                "4",
                "I'll sing the invitation of Mat'Selesnya with my dying breath."
              ],
              [
                "5",
                "I cherish a leaf from Vitu-Ghazi that changes color with the seasons, even though it is no longer attached to the tree."
              ],
              [
                "6",
                "Every member of the conclave is my kin, and I would fight for any one of them."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm terrified of getting into a fight where my side is outnumbered."
              ],
              [
                "2",
                "I assume that people mean well until they prove otherwise."
              ],
              [
                "3",
                "I enjoy comfort and quiet, and prefer to avoid extra effort."
              ],
              [
                "4",
                "I have a fierce temper that doesn't reflect the inner calm I seek."
              ],
              [
                "5",
                "I'm convinced that everyone else in the conclave has a deeper connection to the Worldsoul than I do."
              ],
              [
                "6",
                "I'm trying to atone for the life of crime I led before I joined the Selesnya, but I find it hard to give up my bad habits."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The Selesnya Conclave is all about connections, so its members cultivate contacts throughout the guild. The guild also engages in energetic recruitment to draw converts from other guilds, and often these new guild members maintain friendships with former guild mates.",
          "Roll twice on the Selesnya Contacts table (for an ally and a rival) and once on the Non-Selesnya Contacts table.",
          {
            "type": "table",
            "caption": "Selesnya Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "A wise centaur trainer believed in me even though I was a terrible student."
              ],
              [
                "2",
                "A good friend has risen to become a Ledev guardian."
              ],
              [
                "3",
                "I left my former guild and joined the Selesnya along with a close friend."
              ],
              [
                "4",
                "The dryad at the head of my enclave has taken an interest in my activities."
              ],
              [
                "5",
                "A sibling is an instructor at the guild's training grounds."
              ],
              [
                "6",
                "One of my parents is a votary, tasked with protecting the temple gardens at the Vitu-Ghazi guildhall."
              ],
              [
                "7",
                "I had a romance with a well-known Selesnya healer."
              ],
              [
                "8",
                "Trostani, the head of the guild and the voice of Mat'Selesnya, once welcomed me into her presence."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Selesnya Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I left the Azorius, and a former colleague still resents me for that act."
              ],
              [
                "2",
                "A good friend, eager for action, left the Selesnya and joined the Boros."
              ],
              [
                "3",
                "I had a relationship with a guild mate who turned out to be a Dimir agent."
              ],
              [
                "4",
                "I know a disgruntled Golgari assassin who is ripe for recruitment."
              ],
              [
                "5",
                "I'm friendly with a Gruul centaur who almost joined us a few years back."
              ],
              [
                "6",
                "I once had a heated public argument with an Izzet chemister, and neither of us is allowed back into that restaurant."
              ],
              [
                "7",
                "I paid off my debt to the Orzhov Syndicate, but my good friend was not so lucky and remains indebted to that guild."
              ],
              [
                "8",
                "At a time of terrible grief in my life, a Rakdos performer made a mockery of my pain, leaving me with mixed feelings of sadness and humor."
              ],
              [
                "9",
                "Roll an additional Selesnya contact; you can decide if the contact is an ally or a rival."
              ],
              [
                "10",
                "I have a sibling in the Simic Combine, and we argue every time we see each other."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "Although the guild teaches the importance of subjugating the individual will to the good of the conclave, it also celebrates the diversity of individuals, in the same sense that a field that produces different crops is healthier than one that yields a single crop. That principle applies to your skills as an adventurer. As long as your efforts are directed toward advancing the goals of the guild rather than your private agenda, you're allowed to put your talents to work in your unique way.",
          "That said, you must never lose sight of the fact that you are part of a larger community. That includes the whole guild, of course, but your ties to community start with your vernadi (enclave) and its voda (dryad leader). The dryads want to know what you're doing and what purpose it serves, and they act to curtail your actions—or even expel you from the guild—if they determine that you aren't serving Selesnya's best interests."
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Simic Scientist",
    "source": "GGR",
    "page": 93,
    "skillProficiencies": [
      {
        "arcana": true,
        "medicine": true
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
            "special": "Simic insignia"
          },
          "common clothes|phb",
          {
            "item": "book|phb",
            "displayName": "book of research notes"
          },
          "ink pen|phb",
          "ink (1-ounce bottle)|phb",
          {
            "item": "oil (flask)|phb",
            "displayName": "flask of oil (made from blubber)"
          },
          {
            "item": "acid (vial)|phb",
            "displayName": "vial of acid (derived from digestive juices)"
          },
          {
            "special": "vial of fish scales"
          },
          {
            "special": "vial of seaweed"
          },
          {
            "special": "vial of jellyfish stingers"
          },
          {
            "special": "glass bottle of unidentified slime"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1000
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s0": [
            "acid splash#c",
            "druidcraft#c"
          ],
          "s1": [
            "detect poison and disease",
            "expeditious retreat",
            "jump"
          ],
          "s2": [
            "alter self",
            "enhance ability",
            "enlarge/reduce"
          ],
          "s3": [
            "gaseous form",
            "water breathing",
            "wind wall"
          ],
          "s4": [
            "freedom of movement",
            "polymorph"
          ],
          "s5": [
            "creation"
          ]
        }
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
            "entry": "{@skill Arcana}, {@skill Medicine}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A Simic insignia, a set of {@item common clothes|phb|commoner's clothes}, a {@item book|phb} of research notes, an {@item ink pen|phb}, a {@item Ink (1-ounce bottle)|phb|bottle of squid ink}, a {@item oil (flask)|phb|flask of oil} (made from blubber), a {@item acid (vial)|phb|vial of acid} (derived from digestive juices), a vial of fish scales, a vial of seaweed, a vial of jellyfish stingers, a glass bottle of unidentified slime, and a belt {@item pouch|phb} containing 10 gp (Azorius 1-zino coins)"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Clades and Projects",
        "entries": [
          "As a Simic researcher, you are part of a clade—a diverse group of individuals combining disparate talents in pursuit of a common goal—or a researcher on a specialized, short-term project focused on addressing an immediate need. You can roll a {@dice d6} or choose from the options in the Research Options table to determine your area of research.",
          {
            "type": "table",
            "caption": "Research Options",
            "colLabels": [
              "d6",
              "Clade/Project"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Hull Clade, focused on protection and durability"
              ],
              [
                "2",
                "Fin Clade, focused on movement"
              ],
              [
                "3",
                "Gyre Clade, focused on cyclical patterns and metamagic"
              ],
              [
                "4",
                "Guardian Project, focused on creating guard monsters and super soldiers"
              ],
              [
                "5",
                "Crypsis Project, focused on intelligence and counterintelligence"
              ],
              [
                "6",
                "Independent research in a new area"
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Researcher",
        "entries": [
          "When you attempt to learn or recall a magical or scientific fact, if you don't know that information, you know where and from whom you can obtain it. Usually, this information comes from a Simic laboratory, or sometimes from an Izzet facility, a library, a university, or an independent scholar or other learned person or creature. Knowing where the information can be found doesn't automatically enable you to learn it; you might need to offer bribes, favors, or other incentives to induce people to reveal their secrets.",
          "Your DM might rule that the knowledge you seek is secreted away in an inaccessible place, or that it simply can't be found. Unearthing the deepest secrets of the multiverse can require an adventure or even a whole campaign."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Simic Guild Spells",
        "entries": [
          "{@i Prerequisite: Spellcasting or Pact Magic class feature}",
          "For you, the spells on the Simic Guild Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Simic Guild Spells",
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "rows": [
              [
                "Cantrip",
                "{@spell acid splash}, {@spell druidcraft}"
              ],
              [
                "1st",
                "{@spell detect poison and disease}, {@spell expeditious retreat}, {@spell jump}"
              ],
              [
                "2nd",
                "{@spell alter self}, {@spell enhance ability}, {@spell enlarge/reduce}"
              ],
              [
                "3rd",
                "{@spell gaseous form}, {@spell water breathing}, {@spell wind wall}"
              ],
              [
                "4th",
                "{@spell freedom of movement}, {@spell polymorph}"
              ],
              [
                "5th",
                "{@spell creation}"
              ]
            ]
          },
          "When your magic causes physical alterations in yourself or others, the result often displays the characteristics of fish, amphibians, or other water-dwelling creatures. Blue-green eddies of magical energy sometimes accompany your spellcasting, forming spirals that reflect the mathematical perfection of nature."
        ]
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "entries": [
          "The bizarre science of the Simic Combine attracts a certain type of personality and encompasses a set of beliefs about the nature of life. Simic members' bonds and flaws derive from their scientific research—including their creation of new life forms, which they can become very attached to.",
          {
            "type": "table",
            "caption": "Personality Traits",
            "colLabels": [
              "d8",
              "Personality Trait"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I can't wait to see what I become next!"
              ],
              [
                "2",
                "I am convinced that everything inclines toward constant improvement."
              ],
              [
                "3",
                "I'm eager to explain every detail of my most intricate experiments and theories to anyone who shows the least bit of interest."
              ],
              [
                "4",
                "I assume that everyone needs even the most basic concepts explained to them."
              ],
              [
                "5",
                "I describe everything that happens as if it were going into my research notes (and it often is)."
              ],
              [
                "6",
                "I am insatiably curious about the seemingly infinite forms and adaptations of life."
              ],
              [
                "7",
                "I can't resist prying into anything forbidden, since it must be terribly interesting."
              ],
              [
                "8",
                "I employ a highly technical vocabulary to avoid imprecision and ambiguity in my communication."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Guild}. My guild is all that really matters. (Any)"
              ],
              [
                "2",
                "{@b Change}. All life is meant to progress toward perfection, and our work is to hurry it along—no matter what must be upended along the way. (Chaotic)"
              ],
              [
                "3",
                "{@b Knowledge}. Understanding the world is more important than what you do with your knowledge. (Neutral)"
              ],
              [
                "4",
                "{@b Greater Good}. I want to reshape the world into higher forms of life so that all can enjoy evolution. (Good)"
              ],
              [
                "5",
                "{@b Logic}. It's foolish to let emotions and principles interfere with the conclusions of logic. (Lawful)"
              ],
              [
                "6",
                "{@b Superiority}. My vast intellect and strength are directed toward increasing my sway over others. (Evil)"
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I helped create a krasis that I love like a pet and would carry with me everywhere... except it's the size of a building, and it might eat me."
              ],
              [
                "2",
                "In my laboratory, I discovered something that I think could eliminate half the life on Ravnica."
              ],
              [
                "3",
                "The other researchers in my clade are my family—a big, eccentric family including members and parts of many species."
              ],
              [
                "4",
                "The laboratory where I did my research contains everything that is precious to me."
              ],
              [
                "5",
                "I will get revenge on the shortsighted fool who killed my precious krasis creation."
              ],
              [
                "6",
                "Everything I do is an attempt to impress someone I love."
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
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I have a rather embarrassing mutation that I do everything I can to keep hidden."
              ],
              [
                "2",
                "I'm more interested in taking notes on monstrous anatomy than in fighting monsters."
              ],
              [
                "3",
                "Every social situation I'm in seems to lead to my asking rude personal questions."
              ],
              [
                "4",
                "I'm supremely confident in my ability to adapt to any situation and handle any danger."
              ],
              [
                "5",
                "I'll take any risk to earn recognition for my scientific brilliance."
              ],
              [
                "6",
                "I have a tendency to take shortcuts in my research and any other tasks I have to complete."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "Contacts",
        "entries": [
          "The fluid nature of clades, whose rosters span different laboratories and change as researchers discover new interests, creates abundant connections among the Simic. The guild members live in watery sinkholes called zonots, and their isolation shelters them from much contact with outsiders. Nonetheless, a fair number of Simic members are former members of other guilds.",
          "Roll twice on the Simic Contacts table (for an ally and a rival) and once on the Non-Simic Contacts table.",
          {
            "type": "table",
            "caption": "Simic Contacts",
            "colLabels": [
              "d8",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My research builds on my parents' work and takes it in interesting new directions."
              ],
              [
                "2",
                "If a serious problem confounds me, I can count on my mentor to provide clarity of thought."
              ],
              [
                "3",
                "A former laboratory colleague went on to work on the Guardian Project."
              ],
              [
                "4",
                "A former colleague has ventured into fields of research that are possibly immoral and almost certainly illegal."
              ],
              [
                "5",
                "A former lover is now the supervisor of a prominent clade."
              ],
              [
                "6",
                "My sibling has become an almost unrecognizable mutant."
              ],
              [
                "7",
                "An old friend has retreated into a secluded life as an ascetic deepsage, devoted to contemplating philosophical principles."
              ],
              [
                "8",
                "My former clade supervisor is now engaged in field research studying some of the largest beasts and monsters on Ravnica."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Non-Simic Contacts",
            "colLabels": [
              "d10",
              "Contact"
            ],
            "colStyles": [
              "text-center col-2",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My older sibling is upset that I didn't follow them into the Azorius."
              ],
              [
                "2",
                "A Boros sergeant is always asking questions about my work, but I suspect they're genuinely curious."
              ],
              [
                "3",
                "A friend in my clade thinks I don't know they're a Dimir agent."
              ],
              [
                "4",
                "I helped a Golgari spore druid with the fertilization and growth of their fungus field."
              ],
              [
                "5",
                "I can't fathom what could have made my childhood friend run off and join the Gruul."
              ],
              [
                "6",
                "I love comparing notes with my friend in the Izzet, though our fields of research are very different."
              ],
              [
                "7",
                "I borrowed a lot of money from an Orzhov syndic to help finance my research."
              ],
              [
                "8",
                "A Rakdos ringmaster has taken an interest in my research which, come to think of it, might make a nice sideshow act."
              ],
              [
                "9",
                "I left the Selesnya—and a lover—behind when I joined the Simic."
              ],
              [
                "10",
                "Roll an additional Simic contact; you can decide if the contact is an ally or a rival."
              ]
            ]
          }
        ]
      },
      {
        "type": "entries",
        "name": "How Do I Fit In?",
        "entries": [
          "As a Simic adventurer, your mission likely aligns with the Adaptationist philosophy; the disagreements and tensions among the guilds will soon erupt into open conflict, and your guild needs your help to ensure that the Simic survive. That help might come in the form of defending against Golgari incursions into Simic zonots or shielding Simic research from Azorius intrusion. It could also involve more subtle, diplomatic work to maintain balance among the guilds, or subterfuge aimed at undermining another guild's grab for power.",
          "Self-improvement is also an important part of your mission. Anything you can do to make yourself more capable—whether learning a new spell or adopting a new hybridizing mutation—gives the Simic a stronger weapon in its arsenal. The combine must change to survive, and that means individual members of the guild must grow and adapt as well."
        ]
      }
    ],
    "hasFluff": true
  }
];
