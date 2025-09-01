// Arquivo gerado automaticamente
export const species = [
  {
    name: "Aarakocra",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: {
      walk: 30,
      fly: true,
    },
    soundClip: {
      type: "internal",
      path: "races/aarakocra.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "3": ["gust of wind"],
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
    ],
    entries: [
      {
        name: "Flight",
        entries: [
          "Because of your wings, you have a flying speed equal to your walking speed. You can't use this flying speed if you're wearing medium or heavy armor.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "You have talons that you can use to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier slashing damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Wind Caller",
        entries: [
          "Starting at 3rd level, you can cast the {@spell gust of wind} spell with this trait, without requiring a material component. Once you cast the spell with this trait, you can't do so again until you finish a long rest. You can also cast the spell using any spell slots you have of 2nd level or higher.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for when you cast {@spell gust of wind} with this trait (choose when you select this race).",
        ],
      },
    ],
  },
  {
    name: "Aasimar",
    source: "MPMM",
    reprintedAs: ["Aasimar|XPHB"],
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    age: {
      max: 180,
    },
    darkvision: 60,
    resist: ["necrotic", "radiant"],
    soundClip: {
      type: "internal",
      path: "races/aasimar.mp3",
    },
    additionalSpells: [
      {
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["light#c"],
        },
      },
    ],
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Celestial Resistance",
        entries: ["You have resistance to necrotic damage and radiant damage."],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Healing Hands",
        entries: [
          "As an action, you can touch a creature and roll a number of d4s equal to your proficiency bonus. The creature regains a number of hit points equal to the total rolled. Once you use this trait, you can't use it again until you finish a long rest.",
        ],
      },
      {
        name: "Light Bearer",
        entries: [
          "You know the {@spell light} cantrip. Charisma is your spellcasting ability for it.",
        ],
      },
      {
        name: "Celestial Revelation",
        entries: [
          "When you reach 3rd level, choose one of the revelation options below. Thereafter, you can use a bonus action to unleash the celestial energy within yourself, gaining the benefits of that revelation. Your transformation lasts for 1 minute or until you end it as a bonus action. Once you transform using your revelation below, you can't use it again until you finish a long rest.",
          {
            type: "list",
            items: [
              {
                type: "item",
                name: "Necrotic Shroud",
                entry:
                  "Your eyes briefly become pools of darkness, and ghostly, flightless wings sprout from your back temporarily. Creatures other than your allies within 10 feet of you that can see you must succeed on a Charisma saving throw ({@dc 8} + your proficiency bonus + your Charisma modifier) or become {@condition frightened} of you until the end of your next turn. Until the transformation ends, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              },
              {
                type: "item",
                name: "Radiant Consumption",
                entry:
                  "Searing light temporarily radiates from your eyes and mouth. For the duration, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, each creature within 10 feet of you takes radiant damage equal to your proficiency bonus. Until the transformation ends, once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              },
              {
                type: "item",
                name: "Radiant Soul",
                entry:
                  "Two luminous, spectral wings sprout from your back temporarily. Until the transformation ends, you have a flying speed equal to your walking speed, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              },
            ],
            style: "list-hang-notitle",
          },
        ],
      },
    ],
    _versions: [
      {
        name: "Aasimar; Necrotic Shroud",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Celestial Revelation",
            items: {
              name: "Celestial Revelation (Necrotic Shroud)",
              entries: [
                "When you reach 3rd level, you can use a bonus action to transform yourself. Your transformation lasts for 1 minute or until you end it as a bonus action. Once you transform using your revelation, you can't use it again until you finish a long rest.",
                "Your eyes briefly become pools of darkness, and ghostly, flightless wings sprout from your back temporarily. Creatures other than your allies within 10 feet of you that can see you must succeed on a Charisma saving throw ({@dc 8} + your proficiency bonus + your Charisma modifier) or become {@condition frightened} of you until the end of your next turn. Until the transformation ends, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              ],
            },
          },
        },
      },
      {
        name: "Aasimar; Radiant Consumption",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Celestial Revelation",
            items: {
              name: "Celestial Revelation (Radiant Consumption)",
              entries: [
                "When you reach 3rd level, you can use a bonus action to transform yourself. Your transformation lasts for 1 minute or until you end it as a bonus action. Once you transform using your revelation, you can't use it again until you finish a long rest.",
                "Searing light temporarily radiates from your eyes and mouth. For the duration, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, each creature within 10 feet of you takes radiant damage equal to your proficiency bonus. Until the transformation ends, once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              ],
            },
          },
        },
      },
      {
        name: "Aasimar; Radiant Soul",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Celestial Revelation",
            items: {
              name: "Celestial Revelation (Radiant Soul)",
              entries: [
                "When you reach 3rd level, you can use a bonus action to transform yourself. Your transformation lasts for 1 minute or until you end it as a bonus action. Once you transform using your revelation, you can't use it again until you finish a long rest.",
                "Two luminous, spectral wings sprout from your back temporarily. Until the transformation ends, you have a flying speed equal to your walking speed, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra damage equals your proficiency bonus.",
              ],
            },
          },
        },
      },
    ],
  },
  {
    name: "Bugbear",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["goblinoid"],
    size: ["M"],
    speed: 30,
    darkvision: 60,
    skillProficiencies: [
      {
        stealth: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/bugbear.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered a goblinoid for any prerequisite or effect that requires you to be a goblinoid.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Long-Limbed",
        entries: [
          "When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Sneaky",
        entries: [
          "You are proficient in the {@skill Stealth} skill. In addition, without squeezing, you can move through and stop in a space large enough for a Small creature.",
        ],
      },
      {
        name: "Surprise Attack",
        entries: [
          "If you hit a creature with an attack roll, the creature takes an extra {@damage 2d6} damage if it hasn't taken a turn yet in the current combat.",
        ],
      },
    ],
  },
  {
    name: "Centaur",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["M"],
    speed: 40,
    skillProficiencies: [
      {
        choose: {
          from: ["animal handling", "medicine", "nature", "survival"],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/centaur.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Charge",
        entries: [
          "If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a bonus action, making one attack against the target with your hooves.",
        ],
      },
      {
        name: "Equine Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push or drag.",
          "In addition, any climb that requires hands and feet is especially difficult for you because of your equine legs. When you make such a climb, each foot of movement costs you 4 extra feet instead of the normal 1 extra foot.",
        ],
      },
      {
        name: "Hooves",
        entries: [
          "You have hooves that you can use to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier bludgeoning damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Natural Affinity",
        entries: [
          "Your fey connection to nature gives you an intuitive connection to the natural world and the animals within it. You therefore have proficiency in one of the following skills of your choice: {@skill Animal Handling}, {@skill Medicine}, {@skill Nature}, or {@skill Survival}.",
        ],
      },
    ],
  },
  {
    name: "Changeling",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["S", "M"],
    speed: 30,
    skillProficiencies: [
      {
        choose: {
          from: [
            "deception",
            "insight",
            "intimidation",
            "performance",
            "persuasion",
          ],
          count: 2,
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Changeling Instincts",
        entries: [
          "Thanks to your connection to the fey realm, you gain proficiency with two of the following skills of your choice: {@skill Deception}, {@skill Insight}, {@skill Intimidation}, {@skill Performance}, or {@skill Persuasion}.",
        ],
      },
      {
        name: "Shapechanger",
        entries: [
          "As an action, you change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height between Medium and Small. You can make yourself appear as a member of another race, though none of your game statistics change. You can't duplicate the appearance of an individual you've never seen, and you must adopt a form that has the same basic arrangement of limbs that you have. Your clothing and equipment aren't changed by this trait.",
          "You stay in the new form until you use an action to revert to your true form or until you die.",
        ],
      },
    ],
  },
  {
    name: "Deep Gnome",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["gnome"],
    size: ["S"],
    speed: 30,
    age: {
      max: 500,
    },
    darkvision: 120,
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["disguise self"],
            },
          },
          "5": {
            daily: {
              "1": ["nondetection"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered a gnome for any prerequisite or effect that requires you to be a gnome.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 120 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Gift of the Svirfneblin",
        entries: [
          "Starting at 3rd level, you can cast the {@spell disguise self} spell with this trait. Starting at 5th level, you can also cast the {@spell nondetection} spell with it, without requiring a material component. Once you cast either of these spells with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast these using spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
      {
        name: "Gnomish Magic Resistance",
        entries: [
          "You have advantage on Intelligence, Wisdom, and Charisma saving throws against spells.",
        ],
      },
      {
        name: "Svirfneblin Camouflage",
        entries: [
          "When you make a Dexterity ({@skill Stealth}) check, you can make the check with advantage. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Duergar",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["dwarf"],
    size: ["M"],
    speed: 30,
    age: {
      max: 350,
    },
    darkvision: 120,
    resist: ["poison"],
    soundClip: {
      type: "internal",
      path: "races/duergar.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["enlarge/reduce"],
            },
          },
          "5": {
            daily: {
              "1": ["invisibility"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered a dwarf for any prerequisite or effect that requires you to be a dwarf.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 120 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Duergar Magic",
        entries: [
          "Starting at 3rd level, you can cast the {@spell enlarge/reduce} spell on yourself with this trait, without requiring a material component. Starting at 5th level, you can also cast the {@spell invisibility} spell on yourself with this trait, without requiring a material component. Once you cast either of these spells with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
      {
        name: "Dwarven Resilience",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition poisoned} condition on yourself. You also have resistance to poison damage.",
        ],
      },
      {
        name: "Psionic Fortitude",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} or {@condition stunned} condition on yourself.",
        ],
      },
    ],
  },
  {
    name: "Eladrin",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["elf"],
    size: ["M"],
    speed: 30,
    age: {
      max: 750,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    entries: [
      '{@i Choose your eladrin\'s season: autumn, winter, spring, or summer. When finishing a long rest, you can change your season. See the "Info" tab for more information.}',
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Fey Step",
        entries: [
          "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          "When you reach 3rd level, your Fey Step gain an additional effect based on your season; if the effect requires a saving throw, the DC equals 8 + your proficiency bonus + your Intelligence, Wisdom, or Charisma modifier (choose when you select this race):",
          {
            type: "list",
            items: [
              {
                type: "item",
                name: "Autumn",
                entry:
                  "Immediately after you use your Fey Step, up to two creatures of your choice that you can see within 10 feet of you must succeed on a Wisdom saving throw or be {@condition charmed} by you for 1 minute, or until you or your companions deal any damage to the creatures.",
              },
              {
                type: "item",
                name: "Winter",
                entry:
                  "When you use your Fey Step, one creature of your choice that you can see within 5 feet of you before you teleport must succeed on a Wisdom saving throw or be {@condition frightened} of you until the end of your next turn.",
              },
              {
                type: "item",
                name: "Spring",
                entry:
                  "When you use your Fey Step, you can touch one willing creature within 5 feet of you. That creature then teleports instead of you, appearing in an unoccupied space of your choice that you can see within 30 feet of you.",
              },
              {
                type: "item",
                name: "Summer",
                entry:
                  "Immediately after you use your Fey Step, each creature of your choice that you can see within 5 feet of you takes fire damage equal to your proficiency bonus.",
              },
            ],
            style: "list-hang-notitle",
          },
        ],
      },
      {
        name: "Keen Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Trance",
        entries: [
          "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness.",
          "Whenever you finish this trance, you can change your season, and you can gain two proficiencies that you don't have, each one with a {@book weapon|phb|5|weapons} or a {@book tool|phb|5|tools} of your choice selected from the Player's Handbook. You mystically acquire these proficiencies by drawing them from shared elven memory, and you retain them until you finish your next long rest.",
        ],
      },
    ],
  },
  {
    name: "Fairy",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["S"],
    speed: {
      walk: 30,
      fly: true,
    },
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["faerie fire"],
            },
          },
          "5": {
            daily: {
              "1": ["enlarge/reduce"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["druidcraft#c"],
        },
      },
    ],
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Fairy Magic",
        entries: [
          "You know the {@spell druidcraft} cantrip. Starting at 3rd level, you can cast the {@spell faerie fire} spell with this trait. Starting at 5th level, you can also cast the {@spell enlarge/reduce} spell with this trait. Once you cast {@spell faerie fire} or {@spell enlarge/reduce} with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
      {
        name: "Flight",
        entries: [
          "Because of your wings, you have a flying speed equal to your walking speed. You can't use this flying speed if you're wearing medium or heavy armor.",
        ],
      },
    ],
  },
  {
    name: "Firbolg",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    age: {
      max: 500,
    },
    soundClip: {
      type: "internal",
      path: "races/firbolg.mp3",
    },
    additionalSpells: [
      {
        ability: {
          choose: ["int", "wis", "cha"],
        },
        innate: {
          "1": ["detect magic", "disguise self"],
        },
      },
    ],
    entries: [
      {
        name: "Firbolg Magic",
        entries: [
          "You can cast {@spell detect magic} and {@spell disguise self} spells with this trait. When you use this version of {@spell disguise self}, you can seem up to 3 feet shorter or taller. Once you cast either of these spells with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast these spells using any spell slots you have.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
      {
        name: "Hidden Step",
        entries: [
          "As a bonus action, you can magically turn {@condition invisible} until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Speech of Beast and Leaf",
        entries: [
          "You have the ability to communicate in a limited manner with Beasts, Plants, and vegetation. They can understand the meaning of your words, though you have no special ability to understand them in return. You have advantage on all Charisma checks you make to influence them.",
        ],
      },
    ],
  },
  {
    name: "Genasi",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    age: {
      max: 120,
    },
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/genasi.mp3",
    },
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
    ],
  },
  {
    name: "Githyanki",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    skillProficiencies: [
      {
        any: 1,
      },
    ],
    toolProficiencies: [
      {
        any: 1,
      },
    ],
    resist: ["psychic"],
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["jump"],
            },
          },
          "5": {
            daily: {
              "1": ["misty step"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["mage hand#c"],
        },
      },
    ],
    entries: [
      {
        name: "Astral Knowledge",
        entries: [
          "You can mystically access a reservoir of experiences of entities connected to the Astral Plane. Whenever you finish a long rest, you gain proficiency in one skill of your choice and with one weapon or tool of your choice, selected from the Player's Handbook, as you momentarily project your consciousness into the Astral Plane. These proficiencies last until the end of your next long rest.",
        ],
      },
      {
        name: "Githyanki Psionics",
        entries: [
          "You know the {@spell mage hand} cantrip, and the hand is {@condition invisible} when you cast the cantrip with this trait.",
          "Starting at 3rd level, you can cast the {@spell jump} spell with this trait. Starting at 5th level, you can also cast {@spell misty step} with it. Once you cast {@spell jump} or {@spell misty step} with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race). None of these spells require spell components when you cast them with this trait.",
        ],
      },
      {
        name: "Psychic Resilience",
        entries: ["You have resistance to psychic damage."],
      },
    ],
  },
  {
    name: "Githzerai",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    resist: ["psychic"],
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["shield"],
            },
          },
          "5": {
            daily: {
              "1": ["detect thoughts"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["mage hand#c"],
        },
      },
    ],
    entries: [
      {
        name: "Githzerai Psionics",
        entries: [
          "You know the {@spell mage hand} cantrip, and the hand is {@condition invisible} when you cast the cantrip with this trait.",
          "Starting at 3rd level, you can cast the {@spell shield} spell with this trait. Starting at 5th level, you can also cast the {@spell detect thoughts} spell with it. Once you cast {@spell shield} or {@spell detect thoughts} spell with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race). None of these spells require spell components when you cast them with this trait.",
        ],
      },
      {
        name: "Mental Discipline",
        entries: [
          "Your innate psychic defenses grant you advantage on saving throws you make to avoid or end the {@condition charmed} and {@condition frightened} conditions on yourself.",
        ],
      },
      {
        name: "Psychic Resilience",
        entries: ["You have resistance to psychic damage."],
      },
    ],
  },
  {
    name: "Goblin",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["goblinoid"],
    size: ["S"],
    speed: 30,
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered a goblinoid for any prerequisite or effect that requires you to be a goblinoid.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were in dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Fury of the Small",
        entries: [
          "When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your proficiency bonus.",
          "You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a long rest, and you can use it no more than once per turn.",
        ],
      },
      {
        name: "Nimble Escape",
        entries: [
          "You can take the {@action Disengage} or {@action Hide} action as a bonus action on each of your turns.",
        ],
      },
    ],
  },
  {
    name: "Goliath",
    source: "MPMM",
    reprintedAs: ["Goliath|XPHB"],
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    skillProficiencies: [
      {
        athletics: true,
      },
    ],
    resist: ["cold"],
    soundClip: {
      type: "internal",
      path: "races/goliath.mp3",
    },
    entries: [
      {
        name: "Little Giant",
        entries: [
          "You have proficiency in the {@skill Athletics} skill, and you count as one size larger when determining your carrying weight and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Mountain Born",
        entries: [
          "You have resistance to cold damage. You also naturally acclimate to high altitudes, even if you've never been to one. This includes elevations above 20,000 feet.",
        ],
      },
      {
        name: "Stone's Endurance",
        entries: [
          "You can supernaturally draw on unyielding stone to shrug off harm. When you take damage, you can use your reaction to roll a {@dice d12}. Add your Constitution modifier to the number rolled and reduce the damage by that total.",
          "You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Harengon",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Hare-Trigger",
        entries: [
          "You can add your proficiency bonus to your initiative rolls.",
        ],
      },
      {
        name: "Leporine Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Lucky Footwork",
        entries: [
          "When you fail a Dexterity saving throw, you can use your reaction to roll a {@dice d4} and add it to the save, potentially turning the failure into a success. You can't use this reaction if you're {@condition prone} or your speed is 0.",
        ],
      },
      {
        name: "Rabbit Hop",
        entries: [
          "As a bonus action, you can jump a number of feet equal to five times your proficiency bonus, without provoking opportunity attacks. You can use this trait only if your speed is greater than 0. You can use it a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Hobgoblin",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["goblinoid"],
    size: ["M"],
    speed: 30,
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/hobgoblin.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered a goblinoid for any prerequisite or effect that requires you to be a goblinoid.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Fey Gift",
        entries: [
          "You can use this trait to take the {@action Help} action as a bonus action, and you can do so a number of times equal to your proficiency bonus. You regain all expended uses when you finish a long rest.",
          "Starting at 3rd level, choose one of the options below each time you take the {@action Help} action with this trait:",
          {
            type: "list",
            items: [
              {
                type: "item",
                name: "Hospitality",
                entry:
                  "You and the creature you help each gain a number of temporary hit points equal to {@dice 1d6} plus your proficiency bonus.",
              },
              {
                type: "item",
                name: "Passage",
                entry:
                  "You and the creature you help each increase your walking speeds by 10 feet until the start of your next turn.",
              },
              {
                type: "item",
                name: "Spite",
                entry:
                  "Until the start of your next turn, the first time the creature you help hits a target with an attack roll, that target has disadvantage on the next attack roll it makes within the next minute.",
              },
            ],
            style: "list-hang-notitle",
          },
        ],
      },
      {
        name: "Fortune from the Many",
        entries: [
          "If you miss with an attack roll or fail an ability check or a saving throw, you can draw on your bonds of reciprocity to gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +3). You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Kenku",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    skillProficiencies: [
      {
        any: 2,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kenku.mp3",
    },
    entries: [
      {
        name: "Size",
        entries: [
          "Your size is Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Expert Duplication",
        entries: [
          "When you copy writing or craftwork produced by yourself or someone else, you have advantage on any ability checks you make to produce an exact duplicate.",
        ],
      },
      {
        name: "Kenku Recall",
        entries: [
          "Thanks to your supernaturally good memory, you have proficiency in two skills of your choice.",
          "Moreover, when you make an ability check using any skill in which you have proficiency, you can give yourself advantage on the check before rolling the {@dice d20}. You can give yourself advantage in this way a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Mimicry",
        entries: [
          "You can accurately mimic sounds you have heard, including voices. A creature that hears the sounds you make can tell they are imitations only with a successful Wisdom ({@skill Insight}) check against a DC of 8 + your proficiency bonus + your Charisma modifier.",
        ],
      },
    ],
  },
  {
    name: "Kobold",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S"],
    speed: 30,
    darkvision: 60,
    skillProficiencies: [
      {
        choose: {
          from: [
            "arcana",
            "investigation",
            "medicine",
            "sleight of hand",
            "survival",
          ],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kobold.mp3",
    },
    additionalSpells: [
      {
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          _: [
            {
              choose: "level=0|class=Sorcerer",
              count: 1,
            },
          ],
        },
      },
    ],
    entries: [
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were in dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Draconic Cry",
        entries: [
          "As a bonus action, you let out a cry at your enemies within 10 feet of you. Until the start of your next turn, you and your allies have advantage on attack rolls against any of those enemies who could hear you. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Kobold Legacy",
        entries: [
          "Kobold's connections to dragons can manifest in unpredictable ways in an individual kobold. Choose one of the following legacy options for your kobold.",
          {
            type: "list",
            items: [
              {
                type: "item",
                name: "Craftiness",
                entry:
                  "You have proficiency in one of the following skills of your choice: {@skill Arcana}, {@skill Investigation}, {@skill Medicine}, {@skill Sleight of Hand}, or {@skill Survival}.",
              },
              {
                type: "item",
                name: "Defiance",
                entry:
                  "You have advantage on saving throws to avoid or end the {@condition frightened} condition on yourself.",
              },
              {
                type: "item",
                name: "Draconic Sorcery",
                entry:
                  "You know one {@filter cantrip of your choice from the sorcerer spell list|spells|level=0|class=Sorcerer}. Intelligence, Wisdom, or Charisma is your spellcasting ability for that cantrip (choose when you select this race).",
              },
            ],
            style: "list-hang-notitle",
          },
        ],
      },
    ],
    _versions: [
      {
        name: "Kobold; Craftiness",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Kobold Legacy",
            items: {
              name: "Kobold Legacy (Craftiness)",
              entries: [
                "You have proficiency in one of the following skills of your choice: {@skill Arcana}, {@skill Investigation}, {@skill Medicine}, {@skill Sleight of Hand}, or {@skill Survival}.",
              ],
            },
          },
        },
        additionalSpells: null,
      },
      {
        name: "Kobold; Defiance",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Kobold Legacy",
            items: {
              name: "Kobold Legacy (Defiance)",
              entries: [
                "You have advantage on saving throws to avoid or end the {@condition frightened} condition on yourself.",
              ],
            },
          },
        },
        skillProficiencies: null,
        additionalSpells: null,
      },
      {
        name: "Kobold; Draconic Sorcery",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Kobold Legacy",
            items: {
              name: "Kobold Legacy (Draconic Sorcery)",
              entries: [
                "You know one {@filter cantrip of your choice from the sorcerer spell list|spells|level=0|class=Sorcerer}. Intelligence, Wisdom, or Charisma is your spellcasting ability for that cantrip (choose when you select this race).",
              ],
            },
          },
        },
        skillProficiencies: null,
      },
    ],
  },
  {
    name: "Lizardfolk",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: {
      walk: 30,
      swim: true,
    },
    skillProficiencies: [
      {
        choose: {
          from: [
            "animal handling",
            "medicine",
            "nature",
            "perception",
            "stealth",
            "survival",
          ],
          count: 2,
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/lizardfolk.mp3",
    },
    entries: [
      {
        name: "Speed",
        entries: [
          "Your walking speed is 30 feet, and you have a swimming speed equal to your walking speed.",
        ],
      },
      {
        name: "Bite",
        entries: [
          "You have a fanged maw that you can use to make unarmed strikes. When you hit with it, the strike deals {@damage 1d6} + your Strength modifier slashing damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Hold Breath",
        entries: ["You can hold your breath for up to 15 minutes at a time."],
      },
      {
        name: "Hungry Jaws",
        entries: [
          "You can throw yourself into a feeding frenzy. As a bonus action, you can make a special attack with your Bite. If the attack hits, it deals its normal damage, and you gain temporary hit points equal to your proficiency bonus. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
        ],
      },
      {
        name: "Natural Armor",
        entries: [
          "You have tough, scaly skin. When you aren't wearing armor, your base AC is 13 + Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor.",
        ],
      },
      {
        name: "Nature's Intuition",
        entries: [
          "Thanks to your mystical connection to nature, you gain proficiency with two of the following skills of your choice: {@skill Animal Handling}, {@skill Medicine}, {@skill Nature}, {@skill Perception}, {@skill Stealth}, or {@skill Survival}.",
        ],
      },
    ],
  },
  {
    name: "Minotaur",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    soundClip: {
      type: "internal",
      path: "races/minotaur.mp3",
    },
    entries: [
      {
        name: "Horns",
        entries: [
          "You have horns that you can use to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier piercing damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Goring Rush",
        entries: [
          "Immediately after you take the {@action Dash} action on your turn and move at least 20 feet, you can make one melee attack with your Horns as a bonus action.",
        ],
      },
      {
        name: "Hammering Horns",
        entries: [
          "Immediately after you hit a creature with a melee attack as part of the {@action Attack} action on your turn, you can use a bonus action to attempt to push that target with your horns. The target must be within 5 feet of you and no more than one size larger than you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Strength modifier, you can push it up to 10 feet away from you.",
        ],
      },
      {
        name: "Labyrinthine Recall",
        entries: [
          "You always know which direction is north, and you have advantage on any Wisdom ({@skill Survival}) check you make to navigate or track.",
        ],
      },
    ],
  },
  {
    name: "Orc",
    source: "MPMM",
    reprintedAs: ["Orc|XPHB"],
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/orc.mp3",
    },
    entries: [
      {
        name: "Adrenaline Rush",
        entries: [
          "You can take the {@action Dash} action as a bonus action. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          "Whenever you use this trait, you gain a number of temporary hit points equal to your proficiency bonus.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Powerful Build",
        entries: [
          "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
        ],
      },
      {
        name: "Relentless Endurance",
        entries: [
          "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. Once you use this trait, you can't do so again until you finish a long rest.",
        ],
      },
    ],
  },
  {
    name: "Satyr",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["fey"],
    size: ["M"],
    speed: 35,
    skillProficiencies: [
      {
        performance: true,
        persuasion: true,
      },
    ],
    toolProficiencies: [
      {
        anyMusicalInstrument: 1,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/satyr.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: ["You are a Fey."],
      },
      {
        name: "Ram",
        entries: [
          "You can use your head and horns to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier bludgeoning damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: ["You have advantage on saving throws against spells."],
      },
      {
        name: "Mirthful Leaps",
        entries: [
          "Whenever you make a long jump or a high jump, you can roll a {@dice d8} and add the number rolled to the number of feet you cover, even when making a standing jump. This extra distance costs movement as usual.",
        ],
      },
      {
        name: "Reveler",
        entries: [
          "As an embodiment of revelry, you have proficiency in the {@skill Performance} and {@skill Persuasion} skills, and you have proficiency with one {@item musical instrument|PHB} of your choice.",
        ],
      },
    ],
  },
  {
    name: "Sea Elf",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["elf"],
    size: ["M"],
    speed: {
      walk: 30,
      swim: true,
    },
    age: {
      max: 750,
    },
    darkvision: 60,
    traitTags: [
      "Amphibious",
      "Improved Resting",
      "Tool Proficiency",
      "Weapon Proficiency",
    ],
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    resist: ["cold"],
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
        ],
      },
      {
        name: "Speed",
        entries: [
          "Your walking speed is 30 feet, and you have a swimming speed equal to your walking speed.",
        ],
      },
      {
        name: "Child of the Sea",
        entries: [
          "You can breathe air and water, and you have resistance to cold damage.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Friend of the Sea",
        entries: [
          "Aquatic animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that has a swimming speed. It can understand your words, though you have no special ability to understand it in return.",
        ],
      },
      {
        name: "Keen Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Trance",
        entries: [
          "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness.",
          "Whenever you finish this trance, you can gain two proficiencies that you don't have, each one with a {@book weapon|phb|5|weapons} or a {@book tool|phb|5|tools} of your choice selected from the Player's Handbook. You mystically acquire these proficiencies by drawing them from shared elven memory, and you retain them until you finish your next long rest.",
        ],
      },
    ],
  },
  {
    name: "Shadar-Kai",
    source: "MPMM",
    lineage: "VRGR",
    creatureTypes: ["humanoid"],
    creatureTypeTags: ["elf"],
    size: ["M"],
    speed: 30,
    age: {
      max: 750,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
      },
    ],
    resist: ["necrotic"],
    entries: [
      {
        name: "Creature Type",
        entries: [
          "You are a Humanoid. You are also considered an elf for any prerequisite or effect that requires you to be an elf.",
        ],
      },
      {
        name: "Blessing of the Raven Queen",
        entries: [
          "As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          "Starting at 3rd level, you also gain resistance to all damage when you teleport using this trait. The resistance lasts until the start of your next turn. During that time, you appear ghostly and translucent.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Fey Ancestry",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition charmed} condition on yourself.",
        ],
      },
      {
        name: "Keen Senses",
        entries: ["You have proficiency in the {@skill Perception} skill."],
      },
      {
        name: "Necrotic Resistance",
        entries: ["You have resistance to necrotic damage."],
      },
      {
        name: "Trance",
        entries: [
          "You don't need to sleep, and magic can't put you to sleep. You can finish a long rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness.",
          "Whenever you finish this trance, you can gain two proficiencies that you don't have, each one with a {@book weapon|phb|5|weapons} or a {@book tool|phb|5|tools} of your choice selected from the Player's Handbook. You mystically acquire these proficiencies by drawing them from shared elven memory, and you retain them until you finish your next long rest.",
        ],
      },
    ],
  },
  {
    name: "Shifter",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: 30,
    darkvision: 60,
    skillProficiencies: [
      {
        choose: {
          from: ["acrobatics", "athletics", "intimidation", "survival"],
        },
      },
    ],
    entries: [
      {
        name: "Bestial Instincts",
        entries: [
          "Channeling the beast within, you have proficiency in one of the following skills of your choice: {@skill Acrobatics}, {@skill Athletics}, {@skill Intimidation}, or {@skill Survival}.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were in dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Shifting",
        entries: [
          "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 2 × your proficiency bonus. You can shift a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          "Whenever you shift, you gain an additional benefit based on one of the following options (choose when you select this race):",
          {
            type: "list",
            items: [
              {
                type: "item",
                name: "Beasthide",
                entry:
                  "You gain {@dice 1d6} additional temporary hit points. While shifted, you have a +1 bonus to your Armor Class.",
              },
              {
                type: "item",
                name: "Longtooth",
                entry:
                  "When you shift and as a bonus action on your other turns while shifted, you can use your elongated fangs to make an unarmed strike. If you hit with your fangs, you can deal piercing damage equal to {@damage 1d6} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
              },
              {
                type: "item",
                name: "Swiftstride",
                entry:
                  "While shifted, your walking speed increases by 10 feet. Additionally, you can move up to 10 feet as a reaction when a creature ends its turn within 5 feet of you. This reactive movement doesn't provoke opportunity attacks.",
              },
              {
                type: "item",
                name: "Wildhunt",
                entry:
                  "While shifted, you have advantage on Wisdom checks, and no creature within 30 feet of you can make an attack roll with advantage against you unless you're {@condition incapacitated}.",
              },
            ],
            style: "list-hang-notitle",
          },
        ],
      },
    ],
    _versions: [
      {
        name: "Shifter; Beasthide",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Shifting",
            items: {
              name: "Shifting (Beasthide)",
              entries: [
                "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 2 × your proficiency bonus + {@dice 1d6}, and you regain all expended uses when you finish a long rest.",
                "While shifted, you have a +1 bonus to your Armor Class.",
              ],
            },
          },
        },
      },
      {
        name: "Shifter; Longtooth",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Shifting",
            items: {
              name: "Shifting (Longtooth)",
              entries: [
                "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 2 × your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                "When you shift and as a bonus action on your other turns while shifted, you can use your elongated fangs to make an unarmed strike. If you hit with your fangs, you can deal piercing damage equal to {@dice 1d6} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
              ],
            },
          },
        },
      },
      {
        name: "Shifter; Swiftstride",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Shifting",
            items: {
              name: "Shifting (Swiftstride)",
              entries: [
                "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 2 × your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                "While shifted, your walking speed increases by 10 feet. Additionally, you can move up to 10 feet as a reaction when a creature ends its turn within 5 feet of you. This reactive movement doesn't provoke opportunity attacks.",
              ],
            },
          },
        },
      },
      {
        name: "Shifter; Wildhunt",
        source: "MPMM",
        _mod: {
          entries: {
            mode: "replaceArr",
            replace: "Shifting",
            items: {
              name: "Shifting (Wildhunt)",
              entries: [
                "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 2 × your proficiency bonus, and you regain all expended uses when you finish a long rest.",
                "While shifted, you have advantage on Wisdom checks, and no creature within 30 feet of you can make an attack roll with advantage against you unless you're {@condition incapacitated}.",
              ],
            },
          },
        },
      },
    ],
  },
  {
    name: "Tabaxi",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: {
      walk: 30,
      climb: true,
    },
    darkvision: 60,
    skillProficiencies: [
      {
        perception: true,
        stealth: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/tabaxi.mp3",
    },
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Speed",
        entries: [
          "Your walking speed is 30 feet, and you have a climbing speed equal to your walking speed.",
        ],
      },
      {
        name: "Cat's Claws",
        entries: [
          "You can use your claws to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier slashing damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Cat's Talent",
        entries: [
          "You have proficiency in the {@skill Perception} and {@skill Stealth} skills.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Feline Agility",
        entries: [
          "Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns.",
        ],
      },
    ],
  },
  {
    name: "Tortle",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    skillProficiencies: [
      {
        choose: {
          from: [
            "animal handling",
            "medicine",
            "nature",
            "perception",
            "stealth",
            "survival",
          ],
        },
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/tortle.mp3",
    },
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Claws",
        entries: [
          "You have claws that you can use to make unarmed strikes. When you hit with them, the strike deals {@damage 1d6} + your Strength modifier slashing damage, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Hold Breath",
        entries: ["You can hold your breath for up to 1 hour."],
      },
      {
        name: "Natural Armor",
        entries: [
          "Your shell provides you a base AC of 17 (your Dexterity modifier doesn't affect this number). You can't wear light, medium, or heavy armor, but if you are using a shield, you can apply the shield's bonus as normal.",
        ],
      },
      {
        name: "Nature's Intuition",
        entries: [
          "Thanks to your mystical connection to nature, you gain proficiency with one of the following skills of your choice: {@skill Animal Handling}, {@skill Medicine}, {@skill Nature}, {@skill Perception}, {@skill Stealth}, or {@skill Survival}.",
        ],
      },
      {
        name: "Shell Defense",
        entries: [
          "You can withdraw into your shell as an action. Until you emerge, you gain a +4 bonus to your AC, and you have advantage on Strength and Constitution saving throws. While in your shell, you are {@condition prone}, your speed is 0 and can't increase, you have disadvantage on Dexterity saving throws, you can't take reactions, and the only action you can take is a bonus action to emerge from your shell.",
        ],
      },
    ],
  },
  {
    name: "Triton",
    source: "MPMM",
    lineage: "VRGR",
    size: ["M"],
    speed: {
      walk: 30,
      swim: true,
    },
    darkvision: 60,
    resist: ["cold"],
    soundClip: {
      type: "internal",
      path: "races/triton.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "1": {
            daily: {
              "1": ["fog cloud"],
            },
          },
          "3": {
            daily: {
              "1": ["gust of wind"],
            },
          },
          "5": {
            daily: {
              "1": ["water walk"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
      },
    ],
    entries: [
      {
        name: "Speed",
        entries: [
          "Your walking speed is 30 feet, and you have a swimming speed equal to your walking speed.",
        ],
      },
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Control Air and Water",
        entries: [
          "You can cast {@spell fog cloud} with this trait. Starting at 3rd level, you can cast the {@spell gust of wind} spell with this trait. Starting at 5th level, you can also cast the {@spell water walk} spell with it. Once you cast any of these spells with this trait, you can't cast that spell with it again until you finish a long rest. You can also cast these spells using any spell slots you have of the appropriate level.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Emissary of the Sea",
        entries: [
          "You can communicate simple ideas to any Beast, Elemental, or Monstrosity that has a swimming speed. It can understand your words, though you have no special ability to understand it in return.",
        ],
      },
      {
        name: "Guardian of the Depths",
        entries: [
          "Adapted to the frigid ocean depths, you have resistance to cold damage.",
        ],
      },
    ],
  },
  {
    name: "Yuan-Ti",
    source: "MPMM",
    lineage: "VRGR",
    size: ["S", "M"],
    speed: 30,
    darkvision: 60,
    resist: ["poison"],
    additionalSpells: [
      {
        innate: {
          "1": ["animal friendship"],
          "3": {
            daily: {
              "1": ["suggestion"],
            },
          },
        },
        ability: {
          choose: ["int", "wis", "cha"],
        },
        known: {
          "1": ["poison spray#c"],
        },
      },
    ],
    entries: [
      {
        name: "Size",
        entries: [
          "You are Medium or Small. You choose the size when you select this race.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light and in darkness as if it were dim light. You discern colors in that darkness only as shades of gray.",
        ],
      },
      {
        name: "Magic Resistance",
        entries: ["You have advantage on saving throws against spells."],
      },
      {
        name: "Poison Resilience",
        entries: [
          "You have advantage on saving throws you make to avoid or end the {@condition poisoned} condition on yourself. You also have resistance to poison damage.",
        ],
      },
      {
        name: "Serpentine Spellcasting",
        entries: [
          "You know the {@spell poison spray} cantrip. You can cast {@spell animal friendship} an unlimited number of times with this trait, but you can target only snakes with it. Starting at 3rd level, you can also cast {@spell suggestion} with this trait. Once you cast it, you can't do so again until you finish a long rest. You can also cast it using any spell slots you have of 2nd level or higher.",
          "Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).",
        ],
      },
    ],
  },
];
