// Arquivo gerado automaticamente
export const species = [
  {
    name: "Aarakocra",
    source: "DMG",
    size: ["M"],
    speed: {
      walk: 20,
      fly: 50,
    },
    ability: [
      {
        dex: 2,
        wis: 2,
      },
    ],
    languageProficiencies: [
      {
        auran: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/aarakocra.mp3",
    },
    entries: [
      {
        name: "Dive Attack",
        entries: [
          "If you are flying and dive at least 30 ft. straight toward a target and then hit it with a melee weapon attack, the attack deals an extra {@damage 1d6} damage to the target.",
        ],
      },
      {
        name: "Talons",
        entries: [
          "You are proficient with your unarmed strikes, which deal {@damage 1d4} slashing damage on a hit.",
        ],
      },
      {
        name: "Language",
        entries: ["You can speak, read, and write Auran."],
      },
    ],
  },
  {
    name: "Aasimar",
    source: "DMG",
    reprintedAs: ["Aasimar|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        wis: 1,
        cha: 2,
      },
    ],
    age: {
      mature: 20,
      max: 100,
    },
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        celestial: true,
      },
    ],
    resist: ["necrotic", "radiant"],
    soundClip: {
      type: "internal",
      path: "races/aasimar.mp3",
    },
    additionalSpells: [
      {
        innate: {
          "3": {
            daily: {
              "1": ["lesser restoration"],
            },
          },
          "5": {
            daily: {
              "1": ["daylight"],
            },
          },
        },
        ability: "cha",
        known: {
          "1": ["light#c"],
        },
      },
    ],
    entries: [
      {
        name: "Age",
        entries: [
          "Aasimar mature at the same rate as humans but live a few years longer.",
        ],
      },
      {
        name: "Size",
        entries: [
          "Aasimar are built like well-proportioned humans. Your size is Medium.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Thanks to your celestial heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
        ],
      },
      {
        name: "Celestial Resistance",
        entries: ["You have resistance to necrotic and radiant damage."],
      },
      {
        name: "Celestial Legacy",
        entries: [
          "You know the {@spell light} cantrip. Once you reach 3rd level, you can cast the {@spell lesser restoration} spell once with this trait, and you regain the ability to do so when you finish a long rest. Once you reach 5th level, you can cast the {@spell daylight} spell once with this trait, and you regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.",
        ],
      },
      {
        name: "Language",
        entries: ["You can speak, read, and write Common and Celestial."],
      },
    ],
  },
  {
    name: "Bullywug",
    source: "DMG",
    size: ["M"],
    speed: {
      walk: 20,
      swim: 40,
    },
    ability: [
      {
        int: -2,
        cha: -2,
      },
    ],
    languageProficiencies: [
      {
        other: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/bullywug.mp3",
    },
    entries: [
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Speak with Frogs and Toads",
        entries: [
          "You can communicate simple concepts to frogs and toads when you speak in Bullywug.",
        ],
      },
      {
        name: "Swamp Camouflage",
        entries: [
          "You have advantage on Dexterity ({@skill Stealth}) checks made to hide in swampy terrain.",
        ],
      },
      {
        name: "Standing Leap",
        entries: [
          "Your long jump is up to 20 feet and your high jump is up to 10 feet, with or without a running start.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Bullywug."],
      },
    ],
  },
  {
    name: "Gnoll",
    source: "DMG",
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        int: -2,
      },
    ],
    darkvision: 60,
    soundClip: {
      type: "internal",
      path: "races/gnoll.mp3",
    },
    entries: [
      {
        name: "Bite",
        entries: [
          "Your fanged maw is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to {@damage 1d4} + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Rampage",
        entries: [
          "When you reduce a creature to 0 hit points with a melee attack on your turn, you can take a bonus action to move up to half your speed and make a bite attack.",
        ],
      },
    ],
  },
  {
    name: "Gnome (Deep)",
    source: "DMG",
    size: ["S"],
    speed: 20,
    ability: [
      {
        str: 1,
        dex: 2,
      },
    ],
    darkvision: 120,
    languageProficiencies: [
      {
        gnomish: true,
        terran: true,
        undercommon: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/gnome.mp3",
    },
    additionalSpells: [
      {
        ability: "int",
        known: {
          "1": ["nondetection", "blindness/deafness", "blur", "disguise self"],
        },
      },
    ],
    entries: [
      {
        name: "Innate Spellcasting",
        entries: [
          "You have an innate ability to cast the following spells, requiring no material components:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "itemSpell",
                name: "At will:",
                entry: "{@spell nondetection} (self only)",
              },
              {
                type: "itemSpell",
                name: "1/day each:",
                entry:
                  "{@spell blindness/deafness}, {@spell blur}, {@spell disguise self}",
              },
            ],
          },
          "Intelligence is your spellcasting ability for these spells.",
        ],
      },
      {
        name: "Stone Camouflage",
        entries: [
          "You have advantage on Dexterity ({@skill Stealth}) checks to hide in rocky terrain.",
        ],
      },
      {
        name: "Gnome Cunning",
        entries: [
          "You have advantage on Intelligence, Wisdom, and Charisma saving throws against magic.",
        ],
      },
      {
        name: "Superior Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
        data: {
          overwrite: "Darkvision",
        },
      },
      {
        name: "Languages",
        entries: [
          "You can speak, read, and write Gnomish, Terran, and Undercommon.",
        ],
      },
    ],
  },
  {
    name: "Goblin",
    source: "DMG",
    size: ["S"],
    speed: 30,
    ability: [
      {
        str: -2,
        dex: 2,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/goblin.mp3",
    },
    entries: [
      {
        name: "Nimble Escape",
        entries: [
          "You can take the {@action Disengage} or {@action Hide} action as a bonus action on each of your turns.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Grimlock",
    source: "DMG",
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        cha: -2,
      },
    ],
    blindsight: 30,
    languageProficiencies: [
      {
        undercommon: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/grimlock.mp3",
    },
    entries: [
      {
        name: "Blindsight",
        entries: [
          "You have no eyes, and cannot be {@condition blinded}. You can perceive your surroundings within 30 ft., or 10 ft. while {@condition deafened}. You are considered blind beyond this radius.",
        ],
      },
      {
        name: "Keen Hearing and Smell",
        entries: [
          "You have advantage on Wisdom ({@skill Perception}) checks that rely on hearing or smell.",
        ],
      },
      {
        name: "Stone Camouflage",
        entries: [
          "You have advantage on Dexterity ({@skill Stealth}) checks made to hide in rocky terrain.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Undercommon."],
      },
    ],
  },
  {
    name: "Hobgoblin",
    source: "DMG",
    size: ["M"],
    speed: 30,
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        goblin: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/hobgoblin.mp3",
    },
    entries: [
      {
        name: "Martial Advantage",
        entries: [
          "Once per turn, you can deal an extra {@damage 2d6} damage to a creature you hit with a weapon attack if that creature is within 5 ft. of an ally of yours that isn't {@condition incapacitated}.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Goblin."],
      },
    ],
  },
  {
    name: "Kenku",
    source: "DMG",
    size: ["M"],
    speed: 30,
    ability: [
      {
        dex: 2,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        auran: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kenku.mp3",
    },
    entries: [
      {
        name: "Ambusher",
        entries: [
          "In the first round of a combat, you have advantage on attack rolls against any creature who is {@status surprised}.",
        ],
      },
      {
        name: "Mimicry",
        entries: [
          "You can mimic any sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful {@dc 14} Wisdom ({@skill Insight}) check.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can read and write Common and Auran, but you can only speak using your Mimicry trait.",
        ],
      },
    ],
  },
  {
    name: "Kobold",
    source: "DMG",
    size: ["S"],
    speed: 30,
    ability: [
      {
        dex: 2,
        str: -4,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        draconic: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kobold.mp3",
    },
    entries: [
      {
        name: "Pack Tactics",
        entries: [
          "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't {@condition incapacitated}.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "You have disadvantage on attack rolls and on Wisdom ({@skill Perception}) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Draconic."],
      },
    ],
  },
  {
    name: "Kuo-Toa",
    source: "DMG",
    size: ["M"],
    speed: {
      walk: 30,
      swim: 30,
    },
    darkvision: 120,
    languageProficiencies: [
      {
        undercommon: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/kuo-toa.mp3",
    },
    entries: [
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Otherworldly Perception",
        entries: [
          "You can sense the presence of any creature within 30 feet of you that is {@condition invisible} or on the Ethereal Plane. You can pinpoint such a creature that is moving.",
        ],
      },
      {
        name: "Slippery",
        entries: [
          "You have advantage on ability checks and saving throws made to escape a grapple.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, you have disadvantage on attack rolls, as well as on Wisdom ({@skill Perception}) checks that rely on sight.",
        ],
      },
      {
        name: "Superior Darkvision",
        entries: [
          "You have superior vision in dark and dim conditions. You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Undercommon."],
      },
    ],
  },
  {
    name: "Lizardfolk",
    source: "DMG",
    size: ["M"],
    speed: {
      walk: 30,
      swim: 30,
    },
    ability: [
      {
        str: 2,
        int: -2,
      },
    ],
    languageProficiencies: [
      {
        draconic: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/lizardfolk.mp3",
    },
    entries: [
      {
        name: "Hold Breath",
        entries: ["You can hold your breath for up to 15 minutes at a time."],
      },
      {
        name: "Natural Armor",
        entries: [
          "Your scales function as natural armor, granting you a +3 bonus to Armor Class.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Draconic."],
      },
    ],
  },
  {
    name: "Merfolk",
    source: "DMG",
    size: ["M"],
    speed: {
      walk: 10,
      swim: 40,
    },
    languageProficiencies: [
      {
        common: true,
        aquan: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/merfolk.mp3",
    },
    entries: [
      {
        name: "Amphibious",
        entries: ["You can breathe air and water."],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Aquan."],
      },
    ],
  },
  {
    name: "Orc",
    source: "DMG",
    reprintedAs: ["Orc|XPHB"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        int: -2,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        common: true,
        orc: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/orc.mp3",
    },
    entries: [
      {
        name: "Aggressive",
        entries: [
          "As a bonus action, you can move up to your speed toward a hostile creature that you can see.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Common and Orc."],
      },
    ],
  },
  {
    name: "Skeleton",
    source: "DMG",
    creatureTypes: ["undead"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        dex: 2,
        int: -4,
        cha: -4,
      },
    ],
    darkvision: 60,
    immune: ["poison"],
    vulnerable: ["bludgeoning"],
    conditionImmune: ["exhaustion", "poisoned"],
    soundClip: {
      type: "internal",
      path: "races/skeleton.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: ["You are Undead."],
      },
      {
        name: "Brittle Bones",
        entries: ["You are vulnerable to bludgeoning damage."],
      },
      {
        name: "Undead Nature",
        entries: [
          "You are immune to poison damage and {@condition exhaustion}, and you can't be {@condition poisoned}. You don't require air, food, drink, or sleep.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can't speak, but you can understand the languages you knew in life.",
        ],
      },
    ],
  },
  {
    name: "Troglodyte",
    source: "DMG",
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 2,
        con: 2,
        int: -4,
        cha: -4,
      },
    ],
    darkvision: 60,
    languageProficiencies: [
      {
        other: true,
      },
    ],
    soundClip: {
      type: "internal",
      path: "races/troglodyte.mp3",
    },
    entries: [
      {
        name: "Chameleon Skin",
        entries: [
          "You have advantage on Dexterity ({@skill Stealth}) checks made to hide.",
        ],
      },
      {
        name: "Stench",
        entries: [
          "Any creature other than a troglodyte that starts its turn within 5 ft. of you must succeed on a {@dc 12} Constitution saving throw or be {@condition poisoned} until the start of the creature's next turn. On a successful saving throw, the creature is immune to the stench of all troglodytes for 1 hour.",
        ],
      },
      {
        name: "Sunlight Sensitivity",
        entries: [
          "While in sunlight, you have disadvantage on attack rolls, as well as on Wisdom ({@skill Perception}) checks that rely on sight.",
        ],
      },
      {
        name: "Natural Armor",
        entries: ["Your thick hide grants you a +1 bonus to Armor Class."],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: ["You can speak, read, and write Troglodyte."],
      },
    ],
  },
  {
    name: "Zombie",
    source: "DMG",
    creatureTypes: ["undead"],
    size: ["M"],
    speed: 30,
    ability: [
      {
        str: 1,
        con: 2,
        int: -6,
        wis: -4,
        cha: -4,
      },
    ],
    darkvision: 60,
    immune: ["poison"],
    conditionImmune: ["poisoned"],
    soundClip: {
      type: "internal",
      path: "races/zombie.mp3",
    },
    entries: [
      {
        name: "Creature Type",
        entries: ["You are Undead."],
      },
      {
        name: "Undead Fortitude",
        entries: [
          "If damage reduces you to 0 hit points, you must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, you drop to 1 hit point instead.",
        ],
      },
      {
        name: "Undead Nature",
        entries: [
          "You are immune to poison damage, and you can't be {@condition poisoned}. You don't require air, food, drink, or sleep.",
        ],
      },
      {
        name: "Darkvision",
        entries: [
          "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
        ],
      },
      {
        name: "Languages",
        entries: [
          "You can't speak, but you can understand the languages you knew in life.",
        ],
      },
    ],
  },
];
