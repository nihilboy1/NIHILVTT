// Arquivo gerado automaticamente
export const origins = [
  {
    "name": "Lorehold Student",
    "source": "SCC",
    "page": 31,
    "feats": [
      {
        "strixhaven initiate|scc": true
      }
    ],
    "skillProficiencies": [
      {
        "history": true,
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
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
          "hammer|phb",
          "hooded lantern|phb",
          "tinderbox|phb",
          {
            "special": "tome of history"
          },
          {
            "special": "school uniform"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s1": [
            "comprehend languages",
            "identify"
          ],
          "s2": [
            "borrowed knowledge|scc",
            "locate object"
          ],
          "s3": [
            "speak with dead",
            "spirit guardians"
          ],
          "s4": [
            "arcane eye",
            "stone shape"
          ],
          "s5": [
            "flame strike",
            "legend lore"
          ]
        }
      }
    ],
    "fromFeature": {
      "additionalSpells": true,
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
            "entry": "{@skill History}, {@skill Religion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item Ink (1-ounce bottle)|PHB|bottle of black ink}, an {@item ink pen|PHB}, a {@item hammer|PHB}, a {@item hooded lantern|PHB}, a {@item tinderbox|PHB}, a tome of history, a school uniform, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Lorehold Initiate",
        "entries": [
          "You gain the {@feat Strixhaven Initiate|SCC} feat and must choose Lorehold within it.",
          "In addition, if you have the Spellcasting or Pact Magic feature, the spells on the Lorehold Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Lorehold Spells",
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1st",
                "{@spell Comprehend Languages}, {@spell Identify}"
              ],
              [
                "2nd",
                "{@spell Borrowed Knowledge|SCC}, {@spell Locate Object}"
              ],
              [
                "3rd",
                "{@spell Speak with Dead}, {@spell Spirit Guardians}"
              ],
              [
                "4th",
                "{@spell Arcane Eye}, {@spell Stone Shape}"
              ],
              [
                "5th",
                "{@spell Flame Strike}, {@spell Legend Lore}"
              ]
            ]
          },
          "Consider customizing how your spells look when you cast them. Your Lorehold spells might create displays of golden light. You might use a tome or a scroll as a spellcasting focus, and your spell effects might reflect the appearance of the reference books you study."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Building a Lorehold Character",
        "entries": [
          "Any class or subclass that deals with knowledge of the past can be a good fit in Lorehold. Bards thrive in Lorehold, and wizards (particularly those of the {@class Wizard|PHB|School of Divination|Divination|PHB}) are numerous among its students. Clerics (often with the {@class Cleric|PHB|Knowledge|Knowledge|PHB} or {@class Cleric|PHB|Light|Light|PHB} domains) are also quite common.",
          "For a more unusual take on a Lorehold student, you could consider playing a barbarian with a primal connection to the past (perhaps adopting the {@class Barbarian|PHB|Path of the Ancestral Guardian|Ancestral Guardian|XGE} from {@book Xanathar's Guide to Everything|XGE}) or a paladin whose {@class Paladin|PHB|Oath of the Ancients|Ancients|PHB} gives a concrete link to history.",
          {
            "type": "entries",
            "name": "Suggested Characteristics",
            "entries": [
              "Methodical historians and daring adventurers alike can be found among the ranks of Lorehold college. The Lorehold Personality Traits table suggests a variety of traits you might adopt for your character.",
              {
                "type": "table",
                "caption": "Lorehold Personality Traits",
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
                    "I thrive on esoteric lore. The more obscure the historical references I can include in everyday conversation, the better."
                  ],
                  [
                    "2",
                    "By searching for these lost artifacts, I hope to find who I really am along the way."
                  ],
                  [
                    "3",
                    "I can barely go a minute without talking about my research. I have so much knowledge in my head, and it needs to be let out somewhere!"
                  ],
                  [
                    "4",
                    "The spirits of the dead are so much more interesting to talk with than living classmates."
                  ],
                  [
                    "5",
                    "I can speak eloquently about the historical ramifications of an ancient war. But ask me to add two-digit numbers together, and I'm a mess."
                  ],
                  [
                    "6",
                    "In the end, it's all just entropy. Everything falls apart someday."
                  ]
                ]
              }
            ]
          },
          {
            "type": "entries",
            "name": "Lorehold Trinkets",
            "entries": [
              "When you make your character, you may roll once on the {@item Lorehold Trinket|SCC|Lorehold Trinkets} table, instead of on the {@item trinket|phb|Trinkets table} in the {@book Player's Handbook|PHB}, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Prismari Student",
    "source": "SCC",
    "page": 32,
    "feats": [
      {
        "strixhaven initiate|scc": true
      }
    ],
    "skillProficiencies": [
      {
        "acrobatics": true,
        "performance": true
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
            "anyArtisansTool",
            "musical instrument"
          ]
        }
      }
    ],
    "startingEquipment": [
      {
        "_": [
          "ink (1-ounce bottle)|phb",
          "ink pen|phb"
        ]
      },
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
            "special": "school uniform"
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
          "s1": [
            "chromatic orb",
            "thunderwave"
          ],
          "s2": [
            "flaming sphere",
            "kinetic jaunt|scc"
          ],
          "s3": [
            "haste",
            "water walk"
          ],
          "s4": [
            "freedom of movement",
            "wall of fire"
          ],
          "s5": [
            "cone of cold",
            "conjure elemental"
          ]
        }
      }
    ],
    "fromFeature": {
      "additionalSpells": true,
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
            "entry": "{@skill Acrobatics}, {@skill Performance}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} or {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item Ink (1-ounce bottle)|PHB|bottle of black ink}, an {@item ink pen|PHB}, a set of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools} or a {@filter musical instrument|items|source=phb|miscellaneous=mundane|type=instrument} (one of your choice), a school uniform, and a {@item pouch|phb} containing 10 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Prismari Initiate",
        "entries": [
          "You gain the {@feat Strixhaven Initiate|SCC} feat and must choose Prismari within it.",
          "In addition, if you have the Spellcasting or Pact Magic feature, the spells on the Prismari Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Prismari Spells",
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1st",
                "{@spell Chromatic Orb}, {@spell Thunderwave}"
              ],
              [
                "2nd",
                "{@spell Flaming Sphere}, {@spell Kinetic Jaunt|SCC}"
              ],
              [
                "3rd",
                "{@spell Haste}, {@spell Water Walk}"
              ],
              [
                "4th",
                "{@spell Freedom of Movement}, {@spell Wall of Fire}"
              ],
              [
                "5th",
                "{@spell Cone of Cold}, {@spell Conjure Elemental}"
              ]
            ]
          },
          "Consider customizing how your spells look when you cast them. You might wield your Prismari spells with dynamic, gestural movement—as much dance as somatic component. Even a blast of fire in your hands is a sculpted work of art; elemental forces make grand designs as you hurl spells. These forces might linger on your body or in your clothes as decorative elements after your spells are dissipated, as sparks dance in your hair and your touch leaves tracings of frost on whatever you touch."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Building a Prismari Character",
        "entries": [
          "Any class or subclass that wields elemental forces of cold, fire, lightning, and wind can be a good fit in Prismari. Druids and sorcerers are common in Prismari, and wizards who study the Schools of {@class Wizard|PHB|Evocation|Evocation|PHB} or {@class Wizard|PHB|Transmutation|Transmutation|PHB} are also well represented. Clerics aren't very common in this school, but some with the {@class Cleric|PHB|Tempest domain|Tempest|PHB} end up here.",
          "Beyond the ranks of traditional spellcasters, Prismari students also include monks who follow the {@class Monk|PHB|Way of the Four Elements|Four Elements|PHB}. Some acrobatic rogues and fighters (including those who emulate the archetype of the {@class Fighter|PHB|Eldritch Knight|Eldritch Knight|PHB}) also delight in the athleticism of Prismari performance.",
          {
            "type": "entries",
            "name": "Suggested Characteristics",
            "entries": [
              "Though the curriculum of Prismari College attracts many outgoing and driven artists, the school has no shortage of shy scholars and lackadaisical blowhards among its ranks. The Prismari Personality Traits table suggests a variety of traits you might adopt for your character.",
              {
                "type": "table",
                "caption": "Prismari Personality Traits",
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
                    "I'm the life of the party, and I expect everyone's attention when I walk into a room."
                  ],
                  [
                    "2",
                    "Two weeks ago, I was enthralled with my latest project. Now, I think it's garbage and deserves to be destroyed."
                  ],
                  [
                    "3",
                    "I believe everyone has the ability to express their truest selves through art, and I'm happy to quietly push them in the right direction."
                  ],
                  [
                    "4",
                    "Everyone is a critic, and I work to win them all over."
                  ],
                  [
                    "5",
                    "I'm beset with such an overwhelming sense of ennui regarding my art. Nothing quite captures my attention anymore."
                  ],
                  [
                    "6",
                    "Instead of confronting my negative emotions, I channel them into explosive artistic displays."
                  ]
                ]
              }
            ]
          },
          {
            "type": "entries",
            "name": "Prismari Trinkets",
            "entries": [
              "When you make your character, you may roll once on the {@item Prismari Trinket|SCC|Prismari Trinkets} table, instead of on the {@item trinket|phb|Trinkets table} in the {@book Player's Handbook|PHB}, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Quandrix Student",
    "source": "SCC",
    "page": 33,
    "feats": [
      {
        "strixhaven initiate|scc": true
      }
    ],
    "skillProficiencies": [
      {
        "arcana": true,
        "nature": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
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
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
          "abacus|phb",
          {
            "special": "book of arcane theory"
          },
          {
            "special": "school uniform"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s1": [
            "entangle",
            "guiding bolt"
          ],
          "s2": [
            "enlarge/reduce",
            "vortex warp|scc"
          ],
          "s3": [
            "aura of vitality",
            "haste"
          ],
          "s4": [
            "control water",
            "freedom of movement"
          ],
          "s5": [
            "circle of power",
            "passwall"
          ]
        }
      }
    ],
    "fromFeature": {
      "additionalSpells": true,
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
            "entry": "{@skill Arcana}, {@skill Nature}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "One type of {@filter artisan's tools|items|source=phb|miscellaneous=mundane|type=artisan's tools}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item Ink (1-ounce bottle)|PHB|bottle of black ink}, an {@item ink pen|PHB}, an {@item abacus|PHB}, a book of arcane theory, a school uniform, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Quandrix Initiate",
        "entries": [
          "You gain the {@feat Strixhaven Initiate|SCC} feat and must choose Quandrix within it.",
          "In addition, if you have the Spellcasting or Pact Magic feature, the spells on the Quandrix Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Quandrix Spells",
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1st",
                "{@spell Entangle}, {@spell Guiding Bolt}"
              ],
              [
                "2nd",
                "{@spell Enlarge/Reduce}, {@spell Vortex Warp|SCC}"
              ],
              [
                "3rd",
                "{@spell Aura of Vitality}, {@spell Haste}"
              ],
              [
                "4th",
                "{@spell Control Water}, {@spell Freedom of Movement}"
              ],
              [
                "5th",
                "{@spell Circle of Power}, {@spell Passwall}"
              ]
            ]
          },
          "Consider customizing how your spells look when you cast them. Your Quandrix spells might manifest amid kaleidoscopic swirls of fractal patterns, amplifying the tiniest movements of your somatic components. When your magic creates or alters creatures, it might briefly surround the targets with shimmering fractal designs or tessellated patterns."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Building a Quandrix Character",
        "entries": [
          "Any spellcasting class or subclass can work well for a Quandrix character. Both the scholarly focus of wizards (especially those who study the Schools of {@class Wizard|PHB|Abjuration|Abjuration|PHB}, {@class Wizard|PHB|Illusion|Illusion|PHB}, or {@class Wizard|PHB|Transmutation|Transmutation|PHB}) and the metamagic manipulations of sorcerers are welcome in Quandrix, and many druids explore the patterns of nature in Quandrix as well. A few clerics, particularly those with the {@class Cleric|PHB|Knowledge|Knowledge|PHB} or {@class Cleric|PHB|Nature|Nature|PHB} domains, study in Quandrix as well.",
          "Aside from traditional spellcasters, a few characters of other classes find homes in Quandrix. Some fighters, monks, rangers, and rogues study here, using Quandrix principles to train their minds.",
          {
            "type": "entries",
            "name": "Suggested Characteristics",
            "entries": [
              "With subjects ranging from the physical and tangible to the paradoxical and strange, the student body of Quandrix College includes an eclectic mix of individuals. The Quandrix Personality Traits table suggests a variety of traits you might adopt for your character.",
              {
                "type": "table",
                "caption": "Quandrix Personality Traits",
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
                    "When I find a subject I'm interested in, I won't stop studying until I know everything about it. It keeps me up at night."
                  ],
                  [
                    "2",
                    "I hope this all makes sense to me one day. Until then, I'm going to keep faking it."
                  ],
                  [
                    "3",
                    "Equations and patterns come naturally to my mind. I wish friendship came just as easily."
                  ],
                  [
                    "4",
                    "I believe I'm always the smartest person in the room. And I'll prove it, even if no one asks me to."
                  ],
                  [
                    "5",
                    "If these classes have taught me anything, it's that reality is a lie, and nothing matters. So why bother?"
                  ],
                  [
                    "6",
                    "Before I graduate, I want to achieve something mathematically impossible. I must leave a legacy!"
                  ]
                ]
              }
            ]
          },
          {
            "type": "entries",
            "name": "Quandrix Trinkets",
            "entries": [
              "When you make your character, you may roll once on the {@item Quandrix Trinket|SCC|Quandrix Trinkets} table, instead of on the {@item trinket|phb|Trinkets table} in the {@book Player's Handbook|PHB}, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true,
    "hasFluffImages": true
  },
  {
    "name": "Silverquill Student",
    "source": "SCC",
    "page": 35,
    "feats": [
      {
        "strixhaven initiate|scc": true
      }
    ],
    "skillProficiencies": [
      {
        "intimidation": true,
        "persuasion": true
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
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
          {
            "special": "book of poetry"
          },
          {
            "special": "school uniform"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s1": [
            "dissonant whispers",
            "silvery barbs|scc"
          ],
          "s2": [
            "calm emotions",
            "darkness"
          ],
          "s3": [
            "beacon of hope",
            "daylight"
          ],
          "s4": [
            "compulsion",
            "confusion"
          ],
          "s5": [
            "dominate person",
            "rary's telepathic bond"
          ]
        }
      }
    ],
    "fromFeature": {
      "additionalSpells": true,
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
            "entry": "{@skill Intimidation}, {@skill Persuasion}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "Two of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item Ink (1-ounce bottle)|PHB|bottle of black ink}, an {@item ink pen|PHB}, a book of poetry, a school uniform, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Silverquill Initiate",
        "entries": [
          "You gain the {@feat Strixhaven Initiate|SCC} feat and must choose Silverquill within it.",
          "In addition, if you have the Spellcasting or Pact Magic feature, the spells on the Silverquill Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Silverquill Spells",
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1st",
                "{@spell Dissonant Whispers}, {@spell Silvery Barbs|SCC}"
              ],
              [
                "2nd",
                "{@spell Calm Emotions}, {@spell Darkness}"
              ],
              [
                "3rd",
                "{@spell Beacon of Hope}, {@spell Daylight}"
              ],
              [
                "4th",
                "{@spell Compulsion}, {@spell Confusion}"
              ],
              [
                "5th",
                "{@spell Dominate Person}, {@spell Rary's Telepathic Bond}"
              ]
            ]
          },
          "Consider customizing how your spells look when you cast them. Your Silverquill spells might be accompanied by visual effects resembling splotches of ink or radiating ripples of golden light. Any auditory effects of your spells often sound like amplified echoes of your own voice speaking the spells' verbal components—even amid the crash of lightning or a fiery eruption."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Building a Silverquill Character",
        "entries": [
          "Many bards find a home in Silverquill, putting the power of their voices to use with Silverquill magic. Wizards (especially those who study the Schools of {@class Wizard|PHB|Illusion|Illusion|PHB} and {@class Wizard|PHB|Enchantment|Enchantment|PHB}) are common in Silverquill, as are warlocks. Clerics with the Divine Domains of {@class Cleric|PHB|Light|Light|PHB} and {@class Cleric|PHB|Trickery|Trickery|PHB} also fit in well among the mages of Silverquill.",
          "A number of both paladins and rogues attend Silverquill College as well, highlighting the diversity of the student body.",
          {
            "type": "entries",
            "name": "Suggested Characteristics",
            "entries": [
              "With the college's intense standards looming over them, Silverquill students range from cocky and cutthroat to overwhelmed perfectionists. The Silverquill Personality Traits table suggests a variety of traits you might adopt for your character.",
              {
                "type": "table",
                "caption": "Silverquill Personality Traits",
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
                    "I'll say whatever I need to in order to maintain my high social status."
                  ],
                  [
                    "2",
                    "I prefer saying the blunt truth over a pretty lie, and I don't particularly care whose feelings I hurt."
                  ],
                  [
                    "3",
                    "I believe that uplifting my peers is the best way to succeed."
                  ],
                  [
                    "4",
                    "I've mastered the art of using humor as a defense, and I always have a charming joke ready."
                  ],
                  [
                    "5",
                    "I always wait before speaking, analyzing the situation for whichever angle is most advantageous to my goals."
                  ],
                  [
                    "6",
                    "No one knows about the all-nighters I've pulled to keep my magic looking effortless, and I'm going to keep it that way."
                  ]
                ]
              }
            ]
          },
          {
            "type": "entries",
            "name": "Silverquill Trinkets",
            "entries": [
              "When you make your character, you may roll once on the {@item Silverquill Trinket|SCC|Silverquill Trinkets} table, instead of on the {@item trinket|phb|Trinkets table} in the {@book Player's Handbook|PHB}, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  },
  {
    "name": "Witherbloom Student",
    "source": "SCC",
    "page": 36,
    "feats": [
      {
        "strixhaven initiate|scc": true
      }
    ],
    "skillProficiencies": [
      {
        "nature": true,
        "survival": true
      }
    ],
    "languageProficiencies": [
      {
        "anyStandard": 1
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
          "ink (1-ounce bottle)|phb",
          "ink pen|phb",
          {
            "special": "book about plant identification"
          },
          "iron pot|phb",
          "herbalism kit|phb",
          {
            "special": "school uniform"
          },
          {
            "item": "pouch|phb",
            "containsValue": 1500
          }
        ]
      }
    ],
    "additionalSpells": [
      {
        "expanded": {
          "s1": [
            "cure wounds",
            "inflict wounds"
          ],
          "s2": [
            "lesser restoration",
            "wither and bloom|scc"
          ],
          "s3": [
            "revivify",
            "vampiric touch"
          ],
          "s4": [
            "blight",
            "death ward"
          ],
          "s5": [
            "antilife shell",
            "greater restoration"
          ]
        }
      }
    ],
    "fromFeature": {
      "additionalSpells": true,
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
            "entry": "{@skill Nature}, {@skill Survival}"
          },
          {
            "type": "item",
            "name": "Tool Proficiencies:",
            "entry": "{@item Herbalism kit|phb}"
          },
          {
            "type": "item",
            "name": "Languages:",
            "entry": "One of your choice"
          },
          {
            "type": "item",
            "name": "Equipment:",
            "entry": "A {@item Ink (1-ounce bottle)|PHB|bottle of black ink}, an {@item ink pen|PHB}, a book about plant identification, an {@item iron pot|PHB}, an {@item herbalism kit|PHB}, a school uniform, and a {@item pouch|phb} containing 15 gp"
          }
        ]
      },
      {
        "type": "entries",
        "name": "Feature: Witherbloom Initiate",
        "entries": [
          "You gain the {@feat Strixhaven Initiate|SCC} feat and must choose Witherbloom within it.",
          "In addition, if you have the Spellcasting or Pact Magic feature, the spells on the Witherbloom Spells table are added to the spell list of your spellcasting class. (If you are a multiclass character with multiple spell lists, these spells are added to all of them.)",
          {
            "type": "table",
            "caption": "Witherbloom Spells",
            "colLabels": [
              "Spell Level",
              "Spells"
            ],
            "colStyles": [
              "col-2 text-center",
              "col-10"
            ],
            "rows": [
              [
                "1st",
                "{@spell Cure Wounds}, {@spell Inflict Wounds}"
              ],
              [
                "2nd",
                "{@spell Lesser Restoration}, {@spell Wither and Bloom|SCC}"
              ],
              [
                "3rd",
                "{@spell Revivify}, {@spell Vampiric Touch}"
              ],
              [
                "4th",
                "{@spell Blight}, {@spell Death Ward}"
              ],
              [
                "5th",
                "{@spell Antilife Shell}, {@spell Greater Restoration}"
              ]
            ]
          },
          "Consider customizing how your spells look when you cast them. Your Witherbloom spells might rely on material components or a spellcasting focus drawn from the swamp environment of Witherbloom, and your spells might take on an appearance suggesting those natural elements. Spectral shapes of swamp animals or plants might form amid your spell effects."
        ],
        "data": {
          "isFeature": true
        }
      },
      {
        "type": "entries",
        "name": "Building a Witherbloom Character",
        "entries": [
          "Druids and warlocks make up most of Witherbloom's student body. A few wizards (mostly those who study the {@class Wizard|PHB|School of Necromancy|Necromancy|PHB}) and clerics (including those with the Divine Domains of {@class Cleric|PHB|Life|Life|PHB} or {@class Cleric|PHB|Nature|Nature|PHB}) also find their home in Witherbloom.",
          "A number of rangers and barbarians study at Witherbloom as well, and some rogues learn how to create and use poisons during their studies at this college.",
          {
            "type": "entries",
            "name": "Suggested Characteristics",
            "entries": [
              "Students of Witherbloom College are equally likely to be found picking herbs for a healing tincture or riding zombified swamp beasts through the bayou. The Witherbloom Personality Traits table suggests a variety of traits you might adopt for your character.",
              {
                "type": "table",
                "caption": "Witherbloom Personality Traits",
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
                    "I love brewing up a new recipe, even if some might be repulsed by my choice of ingredients. Or the final product. Or both."
                  ],
                  [
                    "2",
                    "My fashion sense is like my garden: withered, black, and weird."
                  ],
                  [
                    "3",
                    "I'm going to befriend every single monster in this swamp if it's the last thing I do."
                  ],
                  [
                    "4",
                    "Everything in this world dies eventually. The question is, what will you do with the time you have left?"
                  ],
                  [
                    "5",
                    "I know we just met, but when you die, may I have your bones? For research."
                  ],
                  [
                    "6",
                    "Don't interrupt me; I'm brooding."
                  ]
                ]
              }
            ]
          },
          {
            "type": "entries",
            "name": "Witherbloom Trinkets",
            "entries": [
              "When you make your character, you may roll once on the {@item Witherbloom Trinket|SCC|Witherbloom Trinkets} table, instead of on the {@item trinket|phb|Trinkets table} in the {@book Player's Handbook|PHB}, for your starting trinket."
            ]
          }
        ]
      }
    ],
    "hasFluff": true
  }
];
