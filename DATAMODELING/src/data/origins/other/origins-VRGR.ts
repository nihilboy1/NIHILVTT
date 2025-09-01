// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Haunted One",
    "source": "VRGR",
    "page": 34,
    "otherSources": [
      {
        "source": "CoS",
        "page": 209
      }
    ],
    "skillProficiencies": [
      {
        "choose": {
          "from": [
            "arcana",
            "investigation",
            "religion",
            "survival"
          ],
          "count": 2
        }
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1,
        "choose": {
          "from": [
            "abyssal",
            "celestial",
            "deep speech",
            "draconic",
            "infernal",
            "primordial",
            "sylvan",
            "undercommon"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "monster hunter's pack|vrgr",
          "common clothes|phb",
          {
            "item": "Horror Trinket|VRGR",
            "displayName": "trinket of special significance (choose one or roll on the Horror Trinkets table)"
          },
          {
            "value": 10
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
            "entry": "Choose two from among {@skill Arcana}, {@skill Investigation}, {@skill Religion}, or {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Choose two, one of which must be {@language Abyssal}, {@language Celestial}, {@language Deep Speech}, {@language Draconic}, {@language Infernal}, {@language Primordial}, {@language Sylvan}, or {@language Undercommon}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "{@item Monster hunter's pack|VRGR} (containing a {@item chest|PHB}, a {@item crowbar|PHB}, a {@item hammer|PHB}, three wooden stakes, a {@item holy symbol|PHB}, a {@item Holy Water (flask)|PHB|flask of holy water}, a {@item Manacles|PHB|set of manacles}, a {@item steel mirror|PHB}, a {@item Oil (flask)|PHB|flask of oil}, a {@item tinderbox|PHB}, and 3 {@item Torch|PHB|torches}), a set of {@item common clothes|phb}, one {@item trinket|CoS} of special significance (choose one or roll on the {@item Horror Trinket|VRGR|Horror Trinkets} table), and 1 sp"
          }
        ]
      },
      {
        "name": "Feature: Heart of Darkness",
        "type": "entries",
        "entries": [
          "Those who look into your eyes can see that you have faced unimaginable horror and that you are no stranger to darkness. Though they might fear you, commoners will extend you every courtesy and do their utmost to help you. Unless you have shown yourself to be a danger to them, they will even take up arms to fight alongside you, should you find yourself facing an enemy alone."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Harrowing Event",
        "type": "entries",
        "entries": [
          "Prior to becoming an adventurer, your path in life was defined by one dark moment, one fateful decision, or one tragedy. Now you feel a darkness threatening to consume you, and you fear there may be no hope of escape. Choose a harrowing event that haunts you, or roll one on the Harrowing Events table.",
          {
            "type": "table",
            "caption": "Harrowing Event",
            "colLabels": [
              "d10",
              "Event"
            ],
            "colStyles": [
              "col-1 text-center",
              "col-11"
            ],
            "rows": [
              [
                "1",
                "A monster that slaughtered dozens of innocent people spared your life, and you don't know why."
              ],
              [
                "2",
                "You were born under a dark star. You can feel it watching you, coldly and distantly. Sometimes it beckons you in the dead of night."
              ],
              [
                "3",
                "An apparition that has haunted your family for generations now haunts you. You don't know what it wants, and it won't leave you alone."
              ],
              [
                "4",
                "Your family has a history of practicing the dark arts. You dabbled once and felt something horrible clutch at your soul, whereupon you fled in terror."
              ],
              [
                "5",
                "An oni took your sibling one cold, dark night, and you were unable to stop it."
              ],
              [
                "6",
                "You were cursed with lycanthropy and later cured. You are now haunted by the innocents you slaughtered."
              ],
              [
                "7",
                "A hag kidnapped and raised you. You escaped, but the hag still has a magical hold over you and fills your mind with evil thoughts."
              ],
              [
                "8",
                "You opened an eldritch tome and saw things unfit for a sane mind. You burned the book, but its words and images are burned into your psyche."
              ],
              [
                "9",
                "A fiend possessed you as a child. You were locked away but escaped. The fiend is still inside you, but now you try to keep it bottled up."
              ],
              [
                "10",
                "You did terrible things to avenge the murder of someone you loved. You became a monster, and it haunts your waking dreams."
              ]
            ]
          }
        ]
      },
      {
        "type": "section",
        "name": "Horror Characteristics",
        "id": "0a4",
        "entries": [
          "Characters in a horror-focused campaign might have distinct motivations and characteristics. Use the following tables to supplement your background's suggested characteristics or to inspire those of your own design.",
          {
            "type": "table",
            "caption": "Horror Character Personality Traits",
            "colLabels": [
              "d12",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I had an encounter that I believe gives me a special affinity with a supernatural creature or event."
              ],
              [
                "2",
                "A signature piece of clothing or distinct weapon serves as an emblem of who I am."
              ],
              [
                "3",
                "I never accept that I'm out of my depth."
              ],
              [
                "4",
                "I must know the answer to every secret. No door remains unopened in my presence."
              ],
              [
                "5",
                "I let people underestimate me, revealing my full competency only to those close to me."
              ],
              [
                "6",
                "I compulsively seek to collect trophies of my travels and victories."
              ],
              [
                "7",
                "It doesn't matter if the whole world's against me. I'll always do what I think is right."
              ],
              [
                "8",
                "I have morbid interests and a macabre aesthetic."
              ],
              [
                "9",
                "I have a personal ritual, mantra, or relaxation method I use to deal with stress."
              ],
              [
                "10",
                "Nothing is more important than life, and I never leave anyone in danger."
              ],
              [
                "11",
                "I'm quick to jump to extreme solutions. Why risk a lesser option not working?"
              ],
              [
                "12",
                "I'm easily startled, but I'm not a coward."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Ideals",
            "colLabels": [
              "d12",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Adrenaline. I've experienced such strangeness that now I feel alive only in extreme situations."
              ],
              [
                "2",
                "Balance. I strive to counter the deeds of someone for whom I feel responsible."
              ],
              [
                "3",
                "Bound. I've wronged someone and must work their will to avoid their curse."
              ],
              [
                "4",
                "Escape. I believe there is something beyond the world I know, and I need to find it."
              ],
              [
                "5",
                "Legacy. I must do something great so that I'm remembered, and my time is running out."
              ],
              [
                "6",
                "Misdirection. I work vigorously to keep others from realizing my flaws or misdeeds."
              ],
              [
                "7",
                "Obsession. I've lived this way for so long that I can't imagine another way."
              ],
              [
                "8",
                "Obligation. I owe it to my people, faith, family, or teacher to continue a vaunted legacy."
              ],
              [
                "9",
                "Promise. My life is no longer my own. I must fulfill the dream of someone who's gone."
              ],
              [
                "10",
                "Revelation. I need to know what lies beyond the mysteries of death, the world, or the Mists."
              ],
              [
                "11",
                "Sanctuary. I know the forces at work in the world and strive to create islands apart from them."
              ],
              [
                "12",
                "Truth. I care about the truth above all else, even if it doesn't benefit anyone."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Bonds",
            "colLabels": [
              "d12",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I desperately need to get back to someone or someplace, but I lost them in the Mists."
              ],
              [
                "2",
                "Everything I do is in the service of a powerful master, one I must keep a secret from everyone."
              ],
              [
                "3",
                "I owe much to my vanished mentor. I seek to continue their work even as I search to find them."
              ],
              [
                "4",
                "I've seen great darkness, and I'm committed to being a light against it—the light of all lights."
              ],
              [
                "5",
                "Someone I love has become a monster, murderer, or other threat. It's up to me to redeem them."
              ],
              [
                "6",
                "The world has been convinced of a terrible lie. It's up to me to reveal the truth."
              ],
              [
                "7",
                "I deeply miss someone and am quick to adopt people who remind me of them."
              ],
              [
                "8",
                "A great evil dwells within me. I will fight against it and the world's other evils for as long as I can."
              ],
              [
                "9",
                "I'm desperately seeking a cure to an affliction or a curse, either for someone close to me for myself."
              ],
              [
                "10",
                "Spirits are drawn to me. I do all I can to help them find peace."
              ],
              [
                "11",
                "I use my cunning mind to solve mysteries and find justice for those who've been wronged."
              ],
              [
                "12",
                "I lost someone I care about, but I still see them in guilty visions, recurring dreams, or as a spirit."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Flaws",
            "colLabels": [
              "d12",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I believe doom follows me and that anyone who gets close to me will face a tragic end."
              ],
              [
                "2",
                "I'm convinced something is after me, appearing in mirrors, dreams, and places where no one could."
              ],
              [
                "3",
                "I'm especially superstitious and live life seeking to avoid bad luck, wicked spirits, or the Mists."
              ],
              [
                "4",
                "I've done unspeakable evil and will do anything to prevent others from finding out."
              ],
              [
                "5",
                "I am exceptionally credulous and believe any story or legend immediately."
              ],
              [
                "6",
                "I'm a skeptic and don't believe in the power of rituals, religion, superstition, or spirits."
              ],
              [
                "7",
                "I know my future is written and that anything I do will lead to a prophesied end."
              ],
              [
                "8",
                "I need to find the best in everyone and everything, even when that means denying obvious malice."
              ],
              [
                "9",
                "I've seen the evil of a type of place—like forests, cities, or graveyards—and resist going there."
              ],
              [
                "10",
                "I'm exceptionally cautious, planning laboriously and devising countless contingencies."
              ],
              [
                "11",
                "I have a reputation for defeating a great evil, but that's a lie and the wicked force knows."
              ],
              [
                "12",
                "I know the ends always justify the means and am quick to make sacrifices to attain my goals."
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
    "name": "Investigator",
    "source": "VRGR",
    "page": 35,
    "skillProficiencies": [
      {
        "choose": {
          "from": [
            "insight",
            "investigation",
            "perception"
          ],
          "count": 2
        }
      }
    ],
    "toolProficiencies": [
      {
        "disguise kit": true,
        "thieves' tools": true
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "magnifying glass|PHB",
          "common clothes|phb",
          {
            "item": "Horror Trinket|VRGR",
            "displayName": "evidence from a past case (choose one or roll for a trinket from the {@item Horror Trinket|VRGR|Horror Trinkets})"
          },
          {
            "value": 10
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
            "entry": "Choose two from among {@skill Insight}, {@skill Investigation}, or {@skill Perception}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Disguise kit|phb}, {@item Thieves' tools|phb}"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item magnifying glass|PHB}, evidence from a past case (choose one or roll for a trinket from the {@item Horror Trinket|VRGR|Horror Trinkets} later in this chapter), a {@item Common Clothes|PHB|set of common clothes}, and 10 gp"
          }
        ]
      },
      {
        "name": "Feature: Official Inquiry",
        "type": "entries",
        "entries": [
          "You're experienced at gaining access to people and places to get the information you need. Through a combination of fast-talking, determination, and official-looking documentation, you can gain access to a place or an individual related to a crime you're investigating. Those who aren't involved in your investigation avoid impeding you or pass along your requests. Additionally, local law enforcement has firm opinions about you, viewing you as either a nuisance or one of their own."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "name": "Path to Mystery",
        "type": "entries",
        "entries": [
          "Your first case influenced the types of mysteries you're interested in. Why was this case so impactful, personal, or traumatic? Whom did it affect besides you? Why and how did you get involved? Was it solved? How did it set you on the path to investigating other mysteries? Roll on or choose details from the First Case table to develop the mystery that started your career as an investigator.",
          {
            "type": "table",
            "caption": "First Case",
            "colLabels": [
              "d8",
              "Case"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "A friend was wrongfully accused of murder. You tracked down the actual killer, proving your friend's innocence and starting your career as a detective."
              ],
              [
                "2",
                "You're told you went missing for weeks. When you were found, you had no memory of being gone. Now you search to discover what happened to you."
              ],
              [
                "3",
                "You helped a spirit find peace by finding its missing corpse. Ever since, other spectral clients have sought you out to help them find rest."
              ],
              [
                "4",
                "You revealed that the monsters terrorizing your home were illusions created by a cruel mage. The magic-user escaped, but you've continued to uncover magical hoaxes."
              ],
              [
                "5",
                "You were wrongfully accused and convicted of a crime. You managed to escape and seek to help others avoid the experience you suffered, even while still being pursued by the law."
              ],
              [
                "6",
                "You survived the destructive use of a magic device that wiped out your home. Members of a secret organization found you. You now work with them, tracking down dangerous supernatural phenomena and preventing them from doing harm."
              ],
              [
                "7",
                "You found evidence of a conspiracy underpinning society. You tried to expose this mysterious cabal, but no one believed you. You're still trying to prove what you know is true."
              ],
              [
                "8",
                "You got a job with an agency that investigates crimes that local law enforcement can't solve. You often wonder which you value more, the truth or your pay."
              ]
            ]
          }
        ]
      },
      {
        "type": "section",
        "name": "Horror Characteristics",
        "id": "0a4",
        "entries": [
          "Characters in a horror-focused campaign might have distinct motivations and characteristics. Use the following tables to supplement your background's suggested characteristics or to inspire those of your own design.",
          {
            "type": "table",
            "caption": "Horror Character Personality Traits",
            "colLabels": [
              "d12",
              "Personality Trait"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I had an encounter that I believe gives me a special affinity with a supernatural creature or event."
              ],
              [
                "2",
                "A signature piece of clothing or distinct weapon serves as an emblem of who I am."
              ],
              [
                "3",
                "I never accept that I'm out of my depth."
              ],
              [
                "4",
                "I must know the answer to every secret. No door remains unopened in my presence."
              ],
              [
                "5",
                "I let people underestimate me, revealing my full competency only to those close to me."
              ],
              [
                "6",
                "I compulsively seek to collect trophies of my travels and victories."
              ],
              [
                "7",
                "It doesn't matter if the whole world's against me. I'll always do what I think is right."
              ],
              [
                "8",
                "I have morbid interests and a macabre aesthetic."
              ],
              [
                "9",
                "I have a personal ritual, mantra, or relaxation method I use to deal with stress."
              ],
              [
                "10",
                "Nothing is more important than life, and I never leave anyone in danger."
              ],
              [
                "11",
                "I'm quick to jump to extreme solutions. Why risk a lesser option not working?"
              ],
              [
                "12",
                "I'm easily startled, but I'm not a coward."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Ideals",
            "colLabels": [
              "d12",
              "Ideal"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "Adrenaline. I've experienced such strangeness that now I feel alive only in extreme situations."
              ],
              [
                "2",
                "Balance. I strive to counter the deeds of someone for whom I feel responsible."
              ],
              [
                "3",
                "Bound. I've wronged someone and must work their will to avoid their curse."
              ],
              [
                "4",
                "Escape. I believe there is something beyond the world I know, and I need to find it."
              ],
              [
                "5",
                "Legacy. I must do something great so that I'm remembered, and my time is running out."
              ],
              [
                "6",
                "Misdirection. I work vigorously to keep others from realizing my flaws or misdeeds."
              ],
              [
                "7",
                "Obsession. I've lived this way for so long that I can't imagine another way."
              ],
              [
                "8",
                "Obligation. I owe it to my people, faith, family, or teacher to continue a vaunted legacy."
              ],
              [
                "9",
                "Promise. My life is no longer my own. I must fulfill the dream of someone who's gone."
              ],
              [
                "10",
                "Revelation. I need to know what lies beyond the mysteries of death, the world, or the Mists."
              ],
              [
                "11",
                "Sanctuary. I know the forces at work in the world and strive to create islands apart from them."
              ],
              [
                "12",
                "Truth. I care about the truth above all else, even if it doesn't benefit anyone."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Bonds",
            "colLabels": [
              "d12",
              "Bond"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I desperately need to get back to someone or someplace, but I lost them in the Mists."
              ],
              [
                "2",
                "Everything I do is in the service of a powerful master, one I must keep a secret from everyone."
              ],
              [
                "3",
                "I owe much to my vanished mentor. I seek to continue their work even as I search to find them."
              ],
              [
                "4",
                "I've seen great darkness, and I'm committed to being a light against it—the light of all lights."
              ],
              [
                "5",
                "Someone I love has become a monster, murderer, or other threat. It's up to me to redeem them."
              ],
              [
                "6",
                "The world has been convinced of a terrible lie. It's up to me to reveal the truth."
              ],
              [
                "7",
                "I deeply miss someone and am quick to adopt people who remind me of them."
              ],
              [
                "8",
                "A great evil dwells within me. I will fight against it and the world's other evils for as long as I can."
              ],
              [
                "9",
                "I'm desperately seeking a cure to an affliction or a curse, either for someone close to me for myself."
              ],
              [
                "10",
                "Spirits are drawn to me. I do all I can to help them find peace."
              ],
              [
                "11",
                "I use my cunning mind to solve mysteries and find justice for those who've been wronged."
              ],
              [
                "12",
                "I lost someone I care about, but I still see them in guilty visions, recurring dreams, or as a spirit."
              ]
            ]
          },
          {
            "type": "table",
            "caption": "Horror Character Flaws",
            "colLabels": [
              "d12",
              "Flaw"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1",
                "I believe doom follows me and that anyone who gets close to me will face a tragic end."
              ],
              [
                "2",
                "I'm convinced something is after me, appearing in mirrors, dreams, and places where no one could."
              ],
              [
                "3",
                "I'm especially superstitious and live life seeking to avoid bad luck, wicked spirits, or the Mists."
              ],
              [
                "4",
                "I've done unspeakable evil and will do anything to prevent others from finding out."
              ],
              [
                "5",
                "I am exceptionally credulous and believe any story or legend immediately."
              ],
              [
                "6",
                "I'm a skeptic and don't believe in the power of rituals, religion, superstition, or spirits."
              ],
              [
                "7",
                "I know my future is written and that anything I do will lead to a prophesied end."
              ],
              [
                "8",
                "I need to find the best in everyone and everything, even when that means denying obvious malice."
              ],
              [
                "9",
                "I've seen the evil of a type of place—like forests, cities, or graveyards—and resist going there."
              ],
              [
                "10",
                "I'm exceptionally cautious, planning laboriously and devising countless contingencies."
              ],
              [
                "11",
                "I have a reputation for defeating a great evil, but that's a lie and the wicked force knows."
              ],
              [
                "12",
                "I know the ends always justify the means and am quick to make sacrifices to attain my goals."
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
