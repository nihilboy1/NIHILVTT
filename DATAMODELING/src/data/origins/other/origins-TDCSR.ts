// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Ashari",
    "source": "TDCSR",
    "page": 180,
    "skillProficiencies": [
      {
        "nature": true,
        "choose": {
          "from": [
            "arcana",
            "survival"
          ],
          "count": 1
        }
      }
    ],
    "languageProficiencies": [
      {
        "primordial": true,
        "choose": {
          "from": [
            "aquan",
            "auran",
            "ignan",
            "terran"
          ],
          "count": 1
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
            "item": "Traveler's Clothes|phb",
            "displayName": "A set of traveler's clothes"
          },
          {
            "special": "a staff carved with symbols of your tribe"
          },
          "herbalism kit|phb",
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
            "entry": "{@skill Nature}, plus your choice of {@skill Arcana} or {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Herbalism Kit|PHB}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "{@language Primordial} ({@language Primordial|PHB|Aquan}, {@language Primordial|PHB|Auran}, {@language Primordial|PHB|Ignan}, or {@language Primordial|PHB|Terran}, depending on the elemental affinity of your tribe)"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item traveler's clothes|phb}, a staff carved with symbols of your tribe, an {@item herbalism kit|PHB}, and a belt {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Elemental Harmony",
        "type": "entries",
        "page": 180,
        "entries": [
          "Growing up surrounded by wild elemental magics has attuned your senses to those chaotic forces, enabling you to subtly bend them to your will. As an action, you channel minor magic involving the element of your chosen Ashari order, giving you one of the following abilities:",
          {
            "type": "entries",
            "name": "Pyrah",
            "page": 180,
            "entries": [
              "You instantaneously create and control a burst of flame small enough to light a candle, a torch, or a small campfire. Alternatively, you snuff out a flame of the same size."
            ]
          },
          {
            "type": "entries",
            "name": "Terrah",
            "page": 180,
            "entries": [
              "You instantaneously create a small rock no larger than a {@item gold (gp)|PHB|gold coin}. The rock appears in your hand, then turns to dust after 1 minute."
            ]
          },
          {
            "type": "entries",
            "name": "Vesrah",
            "page": 180,
            "entries": [
              "You instantaneously create enough hot or cold water to fill a small drinking vessel."
            ]
          },
          {
            "type": "entries",
            "name": "Zephrah",
            "page": 180,
            "entries": [
              "You create an instantaneous puff of wind strong enough to blow papers off a desk or mess up someone's hair."
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
        "page": 180,
        "entries": [
          "{@book The Ashari|TDCSR|2|The Ashari} hold themselves removed from the rest of Tal'Dorei by their own choice. This makes many Ashari naive to the ways of the world beyond their homes—but it can also make them determined, steadfast, and tightly focused on their goals. Ever since {@creature Keyleth, Voice of the Tempest|TDCSR} and leader of the {@book Zephrah|TDCSR|3|Zephrah}, became a world-renowned hero, the Air Ashari at least have become more familiar to Tal'Dorei's other peoples. They are known to welcome outsiders to their mountaintop enclave, and to take on quests that force them to leave their isolated home.",
          "To learn more about your character's Ashari order, see \"{@book The Ashari|TDCSR|2|The Ashari}\".",
          {
            "type": "table",
            "caption": "Ashari Personality Traits",
            "colLabels": [
              "{@dice d8}",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I like to keep my hands busy, no matter where I am."
              ],
              [
                "2",
                "I love to explore new places and meet new people."
              ],
              [
                "3",
                "I meditate at dawn each day—and I can't stand it when my routine is interrupted."
              ],
              [
                "4",
                "I like noticing patterns in the world around me, whether or not they mean anything."
              ],
              [
                "5",
                "I don't let anything—or anyone—stand in the way of my mission."
              ],
              [
                "6",
                "I'm a plain talker, even with people who outrank me."
              ],
              [
                "7",
                "I've always got some of my native element with me in some form. (This might be modeling clay, pure water, special burning incense, or a bottled cloud.)"
              ],
              [
                "8",
                "I talk with everyone like I've known them all my life. Because most people I know, I have known all my life!"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ashari Ideals",
            "colLabels": [
              "{@dice d6}",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Destiny}. I believe that everyone has a role to play. Now I just have to find mine. (Neutral)"
              ],
              [
                "2",
                "{@b Community}. It's important to surround yourself with people you can count on, and who will support you. (Good)"
              ],
              [
                "3",
                "{@b Knowledge}. I want to learn everything I can about the Elemental Planes—and maybe even visit them myself. (Neutral)"
              ],
              [
                "4",
                "{@b Freedom}. I don't care what anyone says. Even if it causes problems, the elements must be free. And so should I. (Chaotic)"
              ],
              [
                "5",
                "{@b Structure}. The elements are in harmony when they are free to act as they will, within the safe boundaries set by {@book the Ashari|TDCSR|2|The Ashari}. People are much the same. (Lawful)"
              ],
              [
                "6",
                "{@b Virtuous Cycle}. If I see someone who needs help, I feel compelled to assist them. Surely they'll return the favor someday! (Good)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ashari Bonds",
            "colLabels": [
              "{@dice d6}",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I have a cousin in another Ashari tribe whom I've never met, but someday I want to visit my extended family."
              ],
              [
                "2",
                "The leader of my tribe thinks I could be their successor, but I worry that I don't have enough experience to lead my people."
              ],
              [
                "3",
                "A mysterious person killed a member of my family. I've left home to discover who the killer was—and to seek vengeance."
              ],
              [
                "4",
                "My older sibling set out on their Aramente a year ago, and I haven't seen them since."
              ],
              [
                "5",
                "When I was a baby, a {@creature giant eagle} brought me to {@book Zephrah|TDCSR|3|Zephrah}. I love my family, but I often wonder who my birth parents are."
              ],
              [
                "6",
                "I trust my animal friends more than any humanoid ally."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Ashari Flaws",
            "colLabels": [
              "{@dice d6}",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Big cities are overwhelming. I get nervous when surrounded by people I don't know."
              ],
              [
                "2",
                "I know all too well that elemental power is dangerous—but I like playing around with it anyway."
              ],
              [
                "3",
                "I get surly if I go too long without being in contact with my native element."
              ],
              [
                "4",
                "I think the mission of my people is a fool's errand. They should abandon isolation, let the elements be, and enjoy the pleasures of the world!"
              ],
              [
                "5",
                "I can't stand it when people say one thing and mean another! Just say what you mean!"
              ],
              [
                "6",
                "Ugh, I know it's not right, but I can't help but look down on people who can't manipulate the elements. It's not like it's hard!"
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Clasp Member",
    "source": "TDCSR",
    "page": 181,
    "skillProficiencies": [
      {
        "deception": true,
        "choose": {
          "from": [
            "sleight of hand",
            "stealth"
          ],
          "count": 1
        }
      }
    ],
    "languageProficiencies": [
      {
        "thieves' cant": true
      }
    ],
    "toolProficiencies": [
      {
        "choose": {
          "from": [
            "disguise kit",
            "forgery kit",
            "thieves' tools"
          ],
          "count": 1
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "common clothes|phb",
            "displayName": "A set of inconspicuous common clothes"
          },
          {
            "equipmentType": "toolArtisan"
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
            "entry": "{@skill Deception}, plus your choice of {@skill Sleight of Hand} or {@skill Stealth}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Disguise Kit|PHB}, {@item forgery kit|PHB}, or {@item thieves' tools|PHB} (one of your choice)"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "{@language Thieves' Cant}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of inconspicuous {@item common clothes|phb}, a set of {@filter tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} with which you're proficient, and a belt {@item pouch|PHB} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: A Favor in Turn",
        "page": 182,
        "entries": [
          "You have gained enough clout in the {@book Clasp|TDCSR|2|The Clasp} that you can call in a favor from your contacts whenever you're close enough to a center of syndicate activity. A request for a favor can be no longer than 20 words, and is passed up the chain to an undisclosed Spireling for approval. This favor can take on any form subject to the approval of the GM, who decides how it is fulfilled. If muscle is requested, an NPC member of the {@book Clasp|TDCSR|2|The Clasp} can temporarily aid your party. If money is needed, a small loan can be provided. If you've been imprisoned, {@book Clasp|TDCSR|2|The Clasp} operatives can look into breaking you out or paying off the jailer.",
          "At some point, the favor will be called in for repayment, often without warning. Refusing the call will result in your termination—literally. You might be called on to commit a specific burglary, or to pressure an {@book Emonian|TDCSR|3|Emon, the City of Fellowship} dignitary to reveal a secret at an upcoming ball. The {@book Clasp|TDCSR|2|The Clasp} might even demand that you assassinate a specific person, with no questions asked or answered. It's the GM's prerogative to ensure that the syndicate's request is proportionate to the favor they bestowed—or that they compensate you in other ways for a service that goes beyond the scope of repaying the initial favor."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "page": 182,
        "entries": [
          "The {@book Clasp|TDCSR|2|The Clasp} enjoys a strange status in Tal'Dorei. The syndicate is a feared group of thieves and killers, whose name is often invoked only in whispers. But at the same time, the organization has a reputation for guerilla heroism, in response to its members having saved countless lives when the {@book Chroma Conclave|TDCSR|1|The Chroma Conclave} attacked {@book Emon|TDCSR|3|Emon, the City of Fellowship}. And so like every {@book Clasp|TDCSR|2|The Clasp} member, your own reputation often swings between these two poles.",
          "Your bond is likely associated with your fellow {@book Clasp|TDCSR|2|The Clasp} members or the individual who introduced you to the syndicate. Your ideal probably involves establishing your importance and indispensability to the {@book Clasp|TDCSR|2|The Clasp}.",
          {
            "type": "table",
            "caption": "Clasp Member Personality Traits",
            "colLabels": [
              "{@dice d8}",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "What's life without risk? I'm always willing to take a risk if the reward seems worth it."
              ],
              [
                "2",
                "I only show my emotions around people I really trust."
              ],
              [
                "3",
                "I don't need friends; I need allies. When I do make \"friends,\" I only consider what they can do for me."
              ],
              [
                "4",
                "I look for simple solutions. The world's full of tough problems, but a well-placed knife is a one-size-fits-all answer."
              ],
              [
                "5",
                "Money talks. I don't. We've got an efficient relationship."
              ],
              [
                "6",
                "I used to have one rule—don't get involved in other people's problems. Why are things so complicated now?"
              ],
              [
                "7",
                "Crime is a game, and I play to win. I have no sympathy for players who don't get that."
              ],
              [
                "8",
                "This organization has a lot of folks who cling to ugly, brutal practices. I'm not like that. I'm a professional, and professionals have standards."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Clasp Member Ideals",
            "colLabels": [
              "{@dice d6}",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b By Any Means}. I complete jobs. Collateral damage isn't my problem. (Chaotic)"
              ],
              [
                "2",
                "{@b Ambition}. I will climb to the top of the ladder. Everything I do is a stepping-stone to a Spireling's position. (Neutral)"
              ],
              [
                "3",
                "{@b Decisiveness}. It's important to make up your mind so you can act swiftly and without delay. (Neutral)"
              ],
              [
                "4",
                "{@b Honor}. There's room in the {@book Clasp|TDCSR|2|The Clasp} for both good and evil. Every day, I awake and choose to do what's right. (Good)"
              ],
              [
                "5",
                "{@b Family}. The {@book Clasp|TDCSR|2|The Clasp} is family. Anything that's good for the family is good for me. (Lawful)"
              ],
              [
                "6",
                "{@b Self-Interest}. There are too many bleeding hearts in the {@book Clasp|TDCSR|2|The Clasp} these days. Doing the right thing means doing the thing that makes my life better. (Evil)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Clasp Member Bonds",
            "colLabels": [
              "{@dice d6}",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'd do anything—anything—to protect my comrades."
              ],
              [
                "2",
                "I'll always be grateful to the Spireling who took me in when I was an orphaned kid."
              ],
              [
                "3",
                "I was inspired to join the {@book Clasp|TDCSR|2|The Clasp} by the stories my parents told of being saved from the {@book Chroma Conclave's|TDCSR|1|The Chroma Conclave} attack on {@book Emon|TDCSR|3|Emon, the City of Fellowship}. I can look past the organization's flaws."
              ],
              [
                "4",
                "I was nearly killed by the {@book Myriad|TDCSR|2|The Myriad}. If the {@book Clasp|TDCSR|2|The Clasp} is the enemy of those villains, then the {@book Clasp|TDCSR|2|The Clasp} is my friend."
              ],
              [
                "5",
                "I've got family back in the old town who are counting on me for money. They don't know how I get it, but they don't need to know."
              ],
              [
                "6",
                "I joined the {@book Clasp|TDCSR|2|The Clasp} to become rich, powerful, and beloved. That's all there is to it."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Clasp Member Flaws",
            "colLabels": [
              "{@dice d6}",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm hopeless at organizing my belongings, and I'm always losing things."
              ],
              [
                "2",
                "I get bored whenever a plan is going too smoothly. A win is always more fun when it's by the skin of my teeth!"
              ],
              [
                "3",
                "I've seen Spirelings walk out among cheering crowds of thousands. Gods, I wish that were me. I need that to be me."
              ],
              [
                "4",
                "I'm rubbish with money, and never seem to leave town with a full purse. Keeps me coming back to the life, I suppose."
              ],
              [
                "5",
                "I can't work with shoddy, makeshift {@item thieves' tools|PHB}. I need everything involving my work to be perfect."
              ],
              [
                "6",
                "Any slight against me, no matter how small, is cause for revenge."
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
    "name": "Lyceum Scholar",
    "source": "TDCSR",
    "page": 183,
    "skillProficiencies": [
      {
        "choose": {
          "from": [
            "arcana",
            "history",
            "persuasion"
          ],
          "count": 2
        }
      }
    ],
    "languageProficiencies": [
      {
        "any": 2
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "item": "fine clothes|phb",
            "displayName": "A set of fine clothes"
          },
          {
            "special": "student uniform"
          },
          {
            "item": "writing kit|TDCSR"
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
            "entry": "Your choice of two of the following: {@skill Arcana}, {@skill History}, or {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A set of {@item fine clothes|phb}, a student uniform, a {@item writing kit|TDCSR} ({@item pouch|PHB|small pouch} with a quill, {@item Ink (1-ounce bottle)|PHB|ink}, {@item Parchment (one sheet)|PHB|folded parchment} and a penknife), and a belt {@item pouch|PHB} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Academic Requisition",
        "page": 184,
        "entries": [
          "You've cleared enough lessons—and have gained an ally or two among the staff—to enable access to certain private areas within the {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} and other allied universities. Whenever you're on {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} grounds or at another major academic institution, you can requisition any set of {@filter tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} found in the fifth edition rules. Each set of {@filter tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} is magically marked to sound an alarm if they are removed from the university's grounds.",
          "When you seek services such as spellcasting from an NPC at the {@book Alabaster Lyceum|TDCSR|3|5. Alabaster Lyceum} or a related institution, you can use those services at a 25 percent discount, at the GM's discretion."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "page": 184,
        "entries": [
          "The {@book Alabaster Lyceum|TDCSR|3|5. Alabaster Lyceum} accepts students of all major trades, the fine arts, and the magical arts. Pupils talented and privileged enough to be accepted travel to {@book Emon|TDCSR|3|Emon, the City of Fellowship} from all over Tal'Dorei, seeking to study among some of the greatest minds and most talented arcanists in the land. If you came from a smaller city, a rural area, or Tal'Dorei's relatively uncharted wilderness, studying at the {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} might have left you with a sense of culture shock, for good or for ill.",
          "Your bond is likely associated with your goals as a student or graduate. Your ideal probably involves your hopes in using the knowledge you've gained at the {@book Lyceum|TDCSR|3|5. Alabaster Lyceum}, and your travels as an adventurer, to tailor the world to your liking.",
          {
            "type": "table",
            "caption": "Lyceum Scholar Personality Traits",
            "colLabels": [
              "{@dice d8}",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I can't believe I'm here! At the {@book Alabaster Lyceum|TDCSR|3|5. Alabaster Lyceum}. Oh, gods, I've dreamed of this my whole life, and now I'm here!"
              ],
              [
                "2",
                "I can't believe I squandered all the opportunities I had at school. I was supposed to be learning good stuff, but I wasted it all daydreaming about fighting monsters."
              ],
              [
                "3",
                "Every night at school, I'd knock back a couple of meads and read with my pals! Just a bunch of nerds having fun, and I loved it."
              ],
              [
                "4",
                "Everyone at school was such a stick in the mud. Dressing the same, listening to the same bards...ugh, it's sad. Just be yourself."
              ],
              [
                "5",
                "I'm happiest when I've got my little party with me. At school, it was like we were a squad of heroes, slaying projects like monsters."
              ],
              [
                "6",
                "I'd really rather you didn't bother me. Can't you see I'm studying here?"
              ],
              [
                "7",
                "I don't care. I just don't care about it all. The dates I had to memorize, the formulae I learned...I just want to run away and live!"
              ],
              [
                "8",
                "I'm just...tired. All the time. Oh, adventuring, sure, that's fine, as long as I can find time to...nap...goodnight."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Lyceum Scholar Ideals",
            "colLabels": [
              "{@dice d6}",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Preparedness}. I can't go out into the world unless I know what I'm up against. Study first, act later. (Neutral)"
              ],
              [
                "2",
                "{@b Stardom}. Having a team is good and all, but you can't win a game of ball without the star charger, and you know that's me. (Evil)"
              ],
              [
                "3",
                "{@b Individuality}. The world keeps us down by trying to put us all into little boxes. I'm tired of living in my box, and I don't care what you think about it. (Chaotic)"
              ],
              [
                "4",
                "{@b Purpose}. I study because there are things I need to know. I'll find my place in the world, and I'll make the world better. (Good)"
              ],
              [
                "5",
                "{@b Code of Conduct}. The student code is there to benefit all students, you know. It's the same for laws! (Lawful)"
              ],
              [
                "6",
                "{@b Recreation}. All this studying crap wasn't worth anything if you weren't partying when you were done. Meet me down at the tavern, okay? (Chaotic)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Lyceum Scholar Bonds",
            "colLabels": [
              "{@dice d6}",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I came to the {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} with no one, but I fell in love with the city of {@book Emon|TDCSR|3|Emon, the City of Fellowship}. I've finally found a place that feels like home!"
              ],
              [
                "2",
                "Most of my professors drove me to frustration, but there's one who was kind and wise. I know they'll always have my back."
              ],
              [
                "3",
                "My family saved every copper piece to give me the opportunities I have now. I can't let them down."
              ],
              [
                "4",
                "I came to the {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} with a childhood friend, but we've long been drifting apart."
              ],
              [
                "5",
                "Discovery is the only thing that matters to me. The topic doesn't matter. Books keep me company on my loneliest days."
              ],
              [
                "6",
                "The {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} is my life. I'd give up anything—everything—to protect it from harm."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Lyceum Scholar Flaws",
            "colLabels": [
              "{@dice d6}",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "The {@book Lyceum|TDCSR|3|5. Alabaster Lyceum} taught me to never want to leave my room. The campus was so huge, and the crowds were so horrible."
              ],
              [
                "2",
                "You think you're so great just because you've got muscles, and endurance, and...shut up! Read a book sometime!"
              ],
              [
                "3",
                "Huh? What? Sorry, I was thinking about a test I need to retake when I get back to school...."
              ],
              [
                "4",
                "I spent too much time studying. Now I don't have any friends."
              ],
              [
                "5",
                "If you don't match my aesthetic, I'm not interested in you. We can work together, but we won't be friends. Got it?"
              ],
              [
                "6",
                "I'm always striving for perfection. I got top of my class, sure, but only with a 98 average. And that's. Not. Perfect."
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
    "name": "Reformed Cultist",
    "source": "TDCSR",
    "page": 185,
    "skillProficiencies": [
      {
        "deception": true,
        "religion": true
      }
    ],
    "languageProficiencies": [
      {
        "any": 1
      }
    ],
    "startingEquipment": [
      {
        "_": [
          {
            "special": "vestments"
          },
          {
            "item": "holy symbol|phb",
            "displayName": "a holy symbol of your previous cult"
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
            "entry": "{@skill Deception} and {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "Vestments and a {@item holy symbol|phb} of your previous cult, a set of {@item common clothes|phb}, a belt {@item pouch|PHB} containing 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Fell Teachings",
        "page": 186,
        "entries": [
          "You were inundated with knowledge about one of the {@book Betrayer Gods|TDCSR|2|Betrayer Gods}, and know by heart everything from their basic commandments to some of their most esoteric secrets. Choose one of the {@book Betrayer Gods|TDCSR|2|Betrayer Gods}. You have {@quickref Advantage and Disadvantage|PHB|2|0|advantage} on Intelligence ({@skill Religion}) checks to know information about their faith, including obscure secrets unknown to most worshipers.",
          "Additionally, you can work with your GM to create a secret that you learned during your time in the cult. This secret might be the seed of a conspiracy, a myth of a legendary hero whose true meaning has mutated over the years, or even the location of a fabled artifact of the gods."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Suggested Characteristics",
        "page": 186,
        "entries": [
          "The life of every former cultist is defined to some degree by the process of fleeing the past, and of trying to make a future away from the beliefs that once claimed them. Your bond is likely associated with those who gave you the insight and strength to flee your old ways. Your ideal might involve your desire to take down and destroy those who promote the evil you escaped, and perhaps finding new faith in a forgiving god.",
          {
            "type": "table",
            "caption": "Reformed Cultist Personality Traits",
            "colLabels": [
              "{@dice d8}",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I need a {@item dagger|phb} close at hand at all times. Just in case they find me."
              ],
              [
                "2",
                "I can't believe I'm out here fighting monsters. After everything I've been through, why can't I find a normal life?"
              ],
              [
                "3",
                "I need a stiff drink before I do anything stressful these days. I know it's a problem. Just...let me have this."
              ],
              [
                "4",
                "Murder is okay when it's for a good cause! I didn't tear my past out by the roots so I could let evil people cause more harm."
              ],
              [
                "5",
                "My past is filled with stories like you wouldn't believe. Ones that'll really make your skin crawl. Do you want to hear...?"
              ],
              [
                "6",
                "Yeah, I'm crying. I do that. Get over yourself."
              ],
              [
                "7",
                "I know you've told me your name twice already, but that's not good enough. How can I be sure you are who you say you are?"
              ],
              [
                "8",
                "My mind is always racing. I can't...I just need to...you have to give me a second—or else I can't...organize my thoughts."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Reformed Cultist Ideals",
            "colLabels": [
              "{@dice d6}",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Life}. I've spent too long shackled to an evil master. No matter what happened before, I deserve my freedom now. (Chaotic)"
              ],
              [
                "2",
                "{@b Redemption}. People can change, but redemption must be something they choose for themselves. If they do, it is my duty to help them along that path. (Good)"
              ],
              [
                "3",
                "{@b Power}. When I abandoned the cult, it wasn't out of some misguided sense of righteousness. That pathetic organization was merely a shackle on my potential. (Evil)"
              ],
              [
                "4",
                "{@b Vengeance}. The cult has poisoned my life. I will see all its followers suffer. (Any)"
              ],
              [
                "5",
                "{@b Hierarchy}. The cult was vile, but its strength was in stability and organization. As long as good folk lack unity, evil will always triumph. (Lawful)"
              ],
              [
                "6",
                "{@b Reparations}. As a cultist, I harmed people whose names I'll never know. I feel obligated to repay my debt by aiding others. (Good)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Reformed Cultist Bonds",
            "colLabels": [
              "{@dice d6}",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "My cousin escaped the cult with me. I lost track of them when we fled, but I know they're alive. I can feel it."
              ],
              [
                "2",
                "I was saved from the cult by a priest of one of the {@book Prime Deities|TDCSR|2|Prime Deities}. If not for that sign of faith, I would surely be lost."
              ],
              [
                "3",
                "I was told by the person who saved me that a sage once said: \"Life needs things to live.\" I don't know what that means, but I've dedicated my existence to finding out."
              ],
              [
                "4",
                "One of my cultist parents had a change of heart when I was a teenager, and we fled together in the dark of night. I didn't want to leave, but I understand now that their courage saved my life."
              ],
              [
                "5",
                "I was bested by a warrior when I fumbled a cult-ordered assassination. I don't know why that person took pity on me, but they gave me purpose when I was lost."
              ],
              [
                "6",
                "Now that I've saved myself, the only person important to me is my former cult leader—because I've sworn that they'll die by my hand."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Reformed Cultist Flaws",
            "colLabels": [
              "{@dice d6}",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I'm haunted by what I saw in those ritual chambers. Every time I see blood, I...oh, gods, I can't bear to even think about it."
              ],
              [
                "2",
                "I ran from the cult long ago. But deep down, there's a part of me that still thinks they were right about certain things."
              ],
              [
                "3",
                "I can't help but feel a rush whenever I see a life snuffed out before me. Just one more kill... just one more."
              ],
              [
                "4",
                "Organized religion terrifies me. {@book Betrayer Gods|TDCSR|2|Betrayer Gods} or {@book Prime Deities|TDCSR|2|Prime Deities}...it doesn't matter. The sight of the faithful freezes my blood cold."
              ],
              [
                "5",
                "Oh, I always tell the truth. Always. I've never had to keep a secret from anyone, so of course I'll be open with you."
              ],
              [
                "6",
                "I don't trust easily. If you grew up being lied to about every little thing? The fundamental nature of the world? You wouldn't, either."
              ]
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Variant Clasp Member (Myriad Operative)",
    "source": "TDCSR",
    "page": 182,
    "_copy": {
      "name": "Clasp Member",
      "source": "TDCSR",
      "_mod": {
        "entries": [
          {
            "mode": "insertArr",
            "index": 1,
            "items": {
              "type": "entries",
              "name": "Variant: Myriad Operative",
              "page": 182,
              "entries": [
                "Your skill set might be similar to that of many members of the {@book Clasp|TDCSR|2|The Clasp}, but you work for a criminal organization that is far more sophisticated—and even less scrupulous. As a {@book Myriad|TDCSR|2|The Myriad} operative in Tal'Dorei, you might have been given a specific task that furthers that syndicate's hunger to expand beyond Wildemount, or which gives them an edge in their rivalry with the {@book Clasp|TDCSR|2|The Clasp}. Moreover, you understand the wisdom of keeping your activities secret from fellow criminals as well as law enforcement, since the agents of the {@book Clasp|TDCSR|2|The Clasp} will show you no mercy if your true identity is ever revealed."
              ]
            }
          }
        ]
      }
    }
  },
  {
    "name": "Variant Whitestone Rifle Corps (Grey Hunter)",
    "source": "TDCSR",
    "page": 182,
    "_copy": {
      "name": "Whitestone Rifle Corps",
      "source": "TDCSR",
      "_mod": {
        "entries": [
          {
            "mode": "insertArr",
            "index": 1,
            "items": {
              "type": "entries",
              "name": "Variant: Grey Hunter",
              "page": 189,
              "entries": [
                "As elite as they are, the members of the {@book Whitestone Rifle Corps|TDCSR|3|Whitestone Rifle Corps} do not represent the apex of firearms skill in {@book Whitestone|TDCSR|3|Whitestone}. A clandestine group of elite soldiers and survivalists is drawn secretly from the Rifle Corps ranks. Called the {@book Grey Hunters|TDCSR|3|Grey Hunters}, these soldiers are special operatives of the de Rolo family, and loyally serve as spies, bodyguards, and even assassins when the job requires it. Though few officially know of them, rumors of the {@book Grey Hunters'|TDCSR|3|Grey Hunters} existence swirl constantly throughout the city-state, often in response to their activities after having been loaned out to protect {@book Whitestone's|TDCSR|3|Whitestone} allies.",
                "You are one of these {@book Grey Hunters|TDCSR|3|Grey Hunters}, even if just a trainee (if you're starting your campaign at low levels). You have the ear of the lord and lady of {@book Whitestone|TDCSR|3|Whitestone}, though you must exercise this privilege graciously lest you lose it."
              ],
              "data": {
                "isFeature": true
              }
            }
          }
        ]
      }
    }
  },
  {
    "name": "Whitestone Rifle Corps",
    "source": "TDCSR",
    "page": 187,
    "skillProficiencies": [
      {
        "choose": {
          "from": [
            "athletics",
            "perception",
            "survival"
          ],
          "count": 2
        }
      }
    ],
    "languageProficiencies": [
      {
        "any": 1
      }
    ],
    "weaponProficiencies": [
      {
        "firearms": true
      }
    ],
    "startingEquipment": [
      {
        "a": [
          "musket|dmg"
        ],
        "b": [
          "pistol|dmg"
        ]
      },
      {
        "_": [
          "common clothes|phb",
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
            "entry": "Your choice of two of the following: {@skill Athletics}, {@skill Perception}, or {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Weapon Proficiencies:",
            "entry": "{@filter Firearms|items|source=null|type=firearm}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "Your choice of a {@item musket} or a {@item pistol}, a set of {@item common clothes|phb}, and a {@item pouch|PHB} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Legacy of Secrecy",
        "page": 187,
        "entries": [
          "You have been entrusted with the use and care of a weapon both powerful and terrifying. The rifle you wield might transform the face of warfare and life in Tal'Dorei. It is a weapon that haunts the mind of its creator, {@creature Percival de Rolo|TDCSR}, manifesting as a pain that lives always behind his kind eyes.",
          "You were granted a {@item musket} or a {@item pistol} by your commander in the {@book Whitestone Rifle Corps|TDCSR|3|Whitestone Rifle Corps}. This weapon is a symbol of your status, and when you display it, other folk around you—particularly adventurers, mercenaries, guards, engineers, and weapons enthusiasts—treat you differently. You might be seen as a noble defender of the people, a selfish hoarder of power, or anything in between, at the GM's discretion."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Feature: Rifle Corps Relationship",
        "page": 187,
        "entries": [
          "You are—or were—a member of an elite and trusted band of {@book Whitestone's|TDCSR|3|Whitestone} staunchest defenders. Work with your GM to determine your current relationship with the Rifle Corps. If your campaign starts in {@book Whitestone|TDCSR|3|Whitestone}, you might be an active member of that unit. Otherwise, you can use the Rifle Corps Relationships table for suggestions.",
          {
            "type": "table",
            "caption": "Rifle Corps Relationships",
            "colLabels": [
              "{@dice d6}",
              "Current Relationship"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I retired honorably from the Rifle Corps—and now it's time for me to pursue my own adventures."
              ],
              [
                "2",
                "I'm on an important mission to protect {@book Whitestone|TDCSR|3|Whitestone} or guard one of our allies."
              ],
              [
                "3",
                "{@book Whitestone|TDCSR|3|Whitestone} is in trouble, and I was sent away to seek help."
              ],
              [
                "4",
                "I don't think firearms technology should be kept secret, so I escaped from the Rifle Corps with my weapon and am on the run."
              ],
              [
                "5",
                "I was on a mission with my company when I got separated from them. Now I need to find my way back home."
              ],
              [
                "6",
                "My weapon was stolen. I built a new one, but I can't return home until I've tracked down the thief and recovered the original. ({@book Whitestone Hunter|TDCSR|3|Grey Hunters} variant only)"
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
        "page": 188,
        "entries": [
          "Those who join the {@book Whitestone Rifle Corps|TDCSR|3|Whitestone Rifle Corps} become members of an elite and trusted band known as the city-state's staunchest defenders. But this means working with your GM to determine why you're not at home protecting {@book Whitestone|TDCSR|3|Whitestone}. Perhaps you took on a mission to guard someone on behalf of the de Rolo family, or you might have been separated from your company while on an assignment. Either way, you find yourself embroiled now in a series of new adventures as you try to make your way back home.",
          "Your bond is likely associated with your comrades-in-arms or with {@book Whitestone|TDCSR|3|Whitestone} itself. Your ideal could be tied to justice or protection, but could also be a secretive, selfish perversion of those virtues.",
          {
            "type": "table",
            "caption": "Rifle Corps Personality Traits",
            "colLabels": [
              "{@dice d8}",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I want to make a good impression at all times. That means keeping my clothes and gear clean and in top condition."
              ],
              [
                "2",
                "I don't like being the center of attention. I'd rather let someone else do the talking while I watch their back."
              ],
              [
                "3",
                "I feel safe only if I'm carrying my trusty rifle. And my dagger. And my concealed pistol. Oh, and of course my...."
              ],
              [
                "4",
                "I don't trust people with my secrets easily, so it feels like a big deal when someone else shares a secret with me."
              ],
              [
                "5",
                "I like coming up with solutions to problems using my esoteric knowledge of natural philosophy."
              ],
              [
                "6",
                "Everyone around me takes things so seriously. Sometimes I just want to let loose and have fun!"
              ],
              [
                "7",
                "Knowing things that other people don't know makes me feel special and important."
              ],
              [
                "8",
                "I'm most at home in woods and mountains, where everything feels at once familiar, always growing and changing."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Rifle Corps Ideals",
            "colLabels": [
              "{@dice d6}",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "{@b Responsibility}. I have a duty to protect the people of {@book Whitestone|TDCSR|3|Whitestone} and to uphold the trust placed in me by the de Rolos. (Lawful)"
              ],
              [
                "2",
                "{@b Militarization}. Everyone should have access to the most powerful weapons available, so they can defend themselves effectively. (Evil)"
              ],
              [
                "3",
                "{@b Cooperation}. Any problem can be solved as long as people are willing to work together. (Good)"
              ],
              [
                "4",
                "{@b Camaraderie}. It's important to have people you can trust to help out in a fight—and to uncork a bottle together afterward. (Any)"
              ],
              [
                "5",
                "{@b Context}. There are no universal rights or wrongs. Every choice depends on the details of the situation. (Chaotic)"
              ],
              [
                "6",
                "{@b Secrecy}. Information is valuable, but it can also be dangerous. I'll keep my mouth shut and gather as much intel as I can. (Neutral)"
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Rifle Corps Bons",
            "colLabels": [
              "{@dice d6}",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I never knew what to do with myself until I joined the Rifle Corps. Now I have a purpose and comrades to give me direction."
              ],
              [
                "2",
                "One of my fellow Rifle Corps soldiers saved my life—and then I saved theirs. That kind of bond lasts forever."
              ],
              [
                "3",
                "{@book Whitestone|TDCSR|3|Whitestone} is the best city in all of Tal'Dorei. Nowhere else has been blessed by the {@deity The Dawnfather|Exandria|TDCSR|Dawnfather} and has a clock that tracks the movement of the stars!"
              ],
              [
                "4",
                "My quick thinking saved a noble from assassination, and she showed me great kindness in return. I daren't say it, but I'm more loyal to her than I am to the de Rolos."
              ],
              [
                "5",
                "My weapon is my life. I clean it, repair it, and care for it—and it serves me loyally in return."
              ],
              [
                "6",
                "The people of {@book Whitestone|TDCSR|3|Whitestone} cared for my family when we had nothing. I promise to repay their compassion with my service."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Rifle Corps Flaws",
            "colLabels": [
              "{@dice d6}",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Who cares about keeping this gun safe? \"Don't let it fall into the wrong hands!\" Ha! It's only a matter of time before someone slips up and these weapons are everywhere."
              ],
              [
                "2",
                "I think being part of the Rifle Corps is so cool. I love telling people about my position so I can impress them."
              ],
              [
                "3",
                "My weapon was stolen. I built a new one, but I can't return home until I've tracked down the thief and recovered the original."
              ],
              [
                "4",
                "I'm tired of protecting spoiled people who don't know how to protect themselves."
              ],
              [
                "5",
                "I shoot first and ask questions later."
              ],
              [
                "6",
                "The first and only time I killed someone, it changed my life. I still dream about it, and I'll never be the carefree person I was before."
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
