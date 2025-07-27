export const spellsLevel8 = [
  {
    name: "Animal Shapes",
    source: "LDJ2024",
    page: 240,
    level: 8,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    entries: [
      "Choose any number of willing creatures that you can see within range. Each target shape-shifts into a Large or smaller Beast of your choice that has a {@variantrule Challenge Rating|XPHB} of 4 or lower. You can choose a different form for each target. On later turns, you can take a {@action Magic|XPHB} action to transform the targets again.",
      "A target's game statistics are replaced by the chosen Beast's statistics, but the target retains its creature type; {@variantrule Hit Points|XPHB}; {@variantrule Hit Point Dice|XPHB}; alignment; ability to communicate; and Intelligence, Wisdom, and Charisma scores. The target's actions are limited by the Beast form's anatomy, and it can't cast spells. The target's equipment melds into the new form, and the target can't use any of that equipment while in that form.",
      "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the first form into which it shape-shifts. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The transformation lasts for the duration or until the target ends it as a {@variantrule Bonus Action|XPHB}.",
    ],
    miscTags: ["SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Antimagic Field",
    source: "LDJ2024",
    page: 241,
    level: 8,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "emanation",
      distance: {
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      s: true,
      m: "iron filings",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "An aura of antimagic surrounds you in 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. No one can cast spells, take {@action Magic|XPHB} actions, or create other magical effects inside the aura, and those things can't target or otherwise affect anything inside it. Magical properties of magic items don't work inside the aura or on anything inside it.",
      "Areas of effect created by spells or other magic can't extend into the aura, and no one can teleport into or out of it or use planar travel there. Portals close temporarily while in the aura.",
      "Ongoing spells, except those cast by an Artifact or a deity, are suppressed in the area. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration.",
      "{@spell Dispel Magic|XPHB} has no effect on the aura, and the auras created by different {@spell Antimagic Field|XPHB} spells don't nullify each other.",
    ],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Antipathy/Sympathy",
    source: "LDJ2024",
    page: 242,
    level: 8,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "hour",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a mix of vinegar and honey",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "day",
          amount: 10,
        },
      },
    ],
    entries: [
      "As you cast the spell, choose whether it creates antipathy or sympathy, and target one creature or object that is Huge or smaller. Then specify a kind of creature, such as red dragons, goblins, or vampires. A creature of the chosen kind makes a Wisdom saving throw when it comes within 120 feet of the target. Your choice of antipathy or sympathy determines what happens to a creature when it fails that save:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Antipathy",
            entries: [
              "The creature has the {@condition Frightened|XPHB} condition. The {@condition Frightened|XPHB} creature must use its movement on its turns to get as far away as possible from the target, moving by the safest route.",
            ],
          },
          {
            type: "item",
            name: "Sympathy",
            entries: [
              "The creature has the {@condition Charmed|XPHB} condition. The {@condition Charmed|XPHB} creature must use its movement on its turns to get as close as possible to the target, moving by the safest route. If the creature is within 5 feet of the target, the creature can't willingly move away. If the target damages the {@condition Charmed|XPHB} creature, that creature can make a Wisdom saving throw to end the effect, as described below.",
            ],
          },
        ],
      },
      {
        type: "entries",
        name: "Ending the Effect",
        entries: [
          "If the {@condition Frightened|XPHB} or {@condition Charmed|XPHB} creature ends its turn more than 120 feet away from the target, the creature makes a Wisdom saving throw. On a successful save, the creature is no longer affected by the target. A creature that successfully saves against this effect is immune to it for 1 minute, after which it can be affected again.",
        ],
      },
    ],
    conditionInflict: ["frightened", "charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Befuddlement",
    source: "LDJ2024",
    page: 245,
    level: 8,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a key ring with no keys",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You blast the mind of a creature that you can see within range. The target makes an Intelligence saving throw.",
      "On a failed save, the target takes {@damage 10d12} Psychic damage and can't cast spells or take the {@action Magic|XPHB} action. At the end of every 30 days, the target repeats the save, ending the effect on a success. The effect can also be ended by the {@spell Greater Restoration|XPHB}, {@spell Heal|XPHB}, or {@spell Wish|XPHB} spell.",
      "On a successful save, the target takes half as much damage only.",
    ],
    damageInflict: ["psychic"],
    savingThrow: ["intelligence"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Clone",
    source: "LDJ2024",
    page: 251,
    level: 8,
    school: "necromancy",
    castingTime: [
      {
        number: 1,
        unit: "hour",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a diamond worth 1,000+ GP, which the spell consumes, and a sealable vessel worth 2,000+ GP that is large enough to hold the creature being cloned",
        cost: 100000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You touch a creature or at least 1 cubic inch of its flesh. An inert duplicate of that creature forms inside the vessel used in the spell's casting and finishes growing after 120 days; you choose whether the finished clone is the same age as the creature or younger. The clone remains inert and endures indefinitely while its vessel remains undisturbed.",
      "If the original creature dies after the clone finishes forming, the creature's soul transfers to the clone if the soul is free and willing to return. The clone is physically identical to the original and has the same personality, memories, and abilities, but none of the original's equipment. The creature's original remains, if any, become inert and can't be revived, since the creature's soul is elsewhere.",
    ],
    miscTags: ["PRM"],
  },
  {
    name: "Control Weather",
    source: "LDJ2024",
    page: 257,
    level: 8,
    school: "transmutation",
    castingTime: [
      {
        number: 10,
        unit: "minute",
      },
    ],
    range: {
      type: "sphere",
      distance: {
        type: "miles",
        amount: 5,
      },
    },
    components: {
      v: true,
      s: true,
      m: "burning incense",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 8,
        },
        concentration: true,
      },
    ],
    entries: [
      "You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell, and it ends early if you go indoors.",
      "When you cast the spell, you change the current weather conditions, which are determined by the DM. You can change precipitation, temperature, and wind. It takes {@dice 1d4 × 10} minutes for the new conditions to take effect. Once they do so, you can change the conditions again. When the spell ends, the weather gradually returns to normal.",
      "When you change the weather conditions, find a current condition on the following tables and change its stage by one, up or down. When changing the wind, you can change its direction.",
      {
        type: "table",
        caption: "Precipitation",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["Stage", "Condition"],
        rows: [
          ["1", "Clear"],
          ["2", "Light clouds"],
          ["3", "Overcast or ground fog"],
          ["4", "Rain, hail, or snow"],
          ["5", "Torrential rain, driving hail, or blizzard"],
        ],
      },
      {
        type: "table",
        caption: "Temperature",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["Stage", "Condition"],
        rows: [
          ["1", "Heat wave"],
          ["2", "Hot"],
          ["3", "Warm"],
          ["4", "Cool"],
          ["5", "Cold"],
          ["6", "Freezing"],
        ],
      },
      {
        type: "table",
        caption: "Wind",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["Stage", "Condition"],
        rows: [
          ["1", "Calm"],
          ["2", "Moderate wind"],
          ["3", "Strong wind"],
          ["4", "Gale"],
          ["5", "Storm"],
        ],
      },
    ],
  },
  {
    name: "Demiplane",
    source: "LDJ2024",
    page: 261,
    level: 8,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "You create a shadowy Medium door on a flat solid surface that you can see within range. This door can be opened and closed, and it leads to a demiplane that is an empty room 30 feet in each dimension, made of wood or stone (your choice).",
      "When the spell ends, the door vanishes, and any objects inside the demiplane remain there. Any creatures inside also remain unless they opt to be shunted through the door as it vanishes, landing with the {@condition Prone|XPHB} condition in the unoccupied spaces closest to the door's former space.",
      "Each time you cast this spell, you can create a new demiplane or connect the shadowy door to a demiplane you created with a previous casting of this spell. Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another creature, you can connect the shadowy door to that demiplane instead.",
    ],
    miscTags: ["OBJ", "PRM", "SGT"],
  },
  {
    name: "Dominate Monster",
    source: "LDJ2024",
    page: 265,
    level: 8,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "One creature you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      'You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as "{@action Attack|XPHB} that creature," "Move over there," or "Fetch that object." The target does its best to obey on its turn. If it completes an order and doesn\'t receive further direction from you, it acts and moves as it likes, focusing on protecting itself.',
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Your {@status Concentration|XPHB} can last longer with a level 9 spell slot (up to 8 hours).",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Earthquake",
    source: "LDJ2024",
    page: 267,
    level: 8,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 500,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a fractured rock",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "Choose a point on the ground that you can see within range. For the duration, an intense tremor rips through the ground in a 100-foot-radius circle centered on that point. The ground there is {@variantrule Difficult Terrain|XPHB}.",
      "When you cast this spell and at the end of each of your turns for the duration, each creature on the ground in the area makes a Dexterity saving throw. On a failed save, a creature has the {@condition Prone|XPHB} condition, and its {@status Concentration|XPHB} is broken.",
      "You can also cause the effects below.",
      {
        type: "entries",
        name: "Fissures",
        entries: [
          "A total of {@dice 1d6} fissures open in the spell's area at the end of the turn you cast it. You choose the fissures' locations, which can't be under structures. Each fissure is {@dice 1d10 × 10} feet deep and 10 feet wide, and it extends from one edge of the spell's area to another edge. A creature in the same space as a fissure must succeed on a Dexterity saving throw or fall in. A creature that successfully saves moves with the fissure's edge as it opens.",
        ],
      },
      {
        type: "entries",
        name: "Structures",
        entries: [
          "The tremor deals 50 Bludgeoning damage to any structure in contact with the ground in the area when you cast the spell and at the end of each of your turns until the spell ends. If a structure drops to 0 {@variantrule Hit Points|XPHB}, it collapses.",
          "A creature within a distance from a collapsing structure equal to half the structure's height makes a Dexterity saving throw. On a failed save, the creature takes {@damage 12d6} Bludgeoning damage, has the {@condition Prone|XPHB} condition, and is buried in the rubble, requiring a {@dc 20} Strength ({@skill Athletics|XPHB}) check as an action to escape. On a successful save, the creature takes half as much damage only.",
        ],
      },
    ],
    damageInflict: ["bludgeoning"],
    conditionInflict: ["prone"],
    savingThrow: ["constitution", "dexterity"],
    abilityCheck: ["strength"],
    miscTags: ["DFT", "SGT"],
    areaTags: ["R"],
  },
  {
    name: "Glibness",
    source: "LDJ2024",
    page: 279,
    level: 8,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "self",
      },
    },
    components: {
      v: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "Until the spell ends, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful.",
    ],
  },
  {
    name: "Holy Aura",
    source: "LDJ2024",
    page: 286,
    level: 8,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "emanation",
      distance: {
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a reliquary worth 1,000+ GP",
        cost: 100000,
      },
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "For the duration, you emit an aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. While in the aura, creatures of your choice have {@variantrule Advantage|XPHB} on all saving throws, and other creatures have {@variantrule Disadvantage|XPHB} on attack rolls against them. In addition, when a Fiend or an Undead hits an affected creature with a melee attack roll, the attacker must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition until the end of its next turn.",
    ],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    miscTags: ["ADV"],
    areaTags: ["S"],
  },
  {
    name: "Incendiary Cloud",
    source: "LDJ2024",
    page: 288,
    level: 8,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "A swirling cloud of embers and smoke fills a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range. The cloud's area is {@variantrule Heavily Obscured|XPHB}. It lasts for the duration or until a strong wind (like that created by {@spell Gust of Wind|XPHB}) disperses it.",
      "When the cloud appears, each creature in it makes a Dexterity saving throw, taking {@damage 10d8} Fire damage on a failed save or half as much damage on a successful one. A creature must also make this save when the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves into its space and when it enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} or ends its turn there. A creature makes this save only once per turn.",
      "The cloud moves 10 feet away from you in a direction you choose at the start of each of your turns.",
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBS"],
    areaTags: ["S"],
  },
  {
    name: "Maze",
    source: "LDJ2024",
    page: 296,
    level: 8,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 10,
        },
        concentration: true,
      },
    ],
    entries: [
      "You banish a creature that you can see within range into a labyrinthine demiplane. The target remains there for the duration or until it escapes the maze.",
      "The target can take a {@action Study|XPHB} action to try to escape. When it does so, it makes a {@dc 20} Intelligence ({@skill Investigation|XPHB}) check. If it succeeds, it escapes, and the spell ends.",
      "When the spell ends, the target reappears in the space it left or, if that space is occupied, in the nearest unoccupied space.",
    ],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Mind Blank",
    source: "LDJ2024",
    page: 298,
    level: 8,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    entries: [
      "Until the spell ends, one willing creature you touch has {@variantrule Immunity|XPHB} to Psychic damage and the {@condition Charmed|XPHB} condition. The target is also unaffected by anything that would sense its emotions or alignment, read its thoughts, or magically detect its location, and no spell—not even {@spell Wish|XPHB}—can gather information about the target, observe it remotely, or control its mind.",
    ],
    damageImmune: ["psychic"],
    conditionImmune: ["charmed"],
    areaTags: ["ST"],
  },
  {
    name: "Power Word Stun",
    source: "LDJ2024",
    page: 306,
    level: 8,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You overwhelm the mind of one creature you can see within range. If the target has 150 {@variantrule Hit Points|XPHB} or fewer, it has the {@condition Stunned|XPHB} condition. Otherwise, its {@variantrule Speed|XPHB} is 0 until the start of your next turn.",
      "The {@condition Stunned|XPHB} target makes a Constitution saving throw at the end of each of its turns, ending the condition on itself on a success.",
    ],
    conditionInflict: ["stunned"],
    savingThrow: ["constitution"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Sunburst",
    source: "LDJ2024",
    page: 329,
    level: 8,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a piece of sunstone",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Brilliant sunlight flashes in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} makes a Constitution saving throw. On a failed save, a creature takes {@damage 12d6} Radiant damage and has the {@condition Blinded|XPHB} condition for 1 minute. On a successful save, it takes half as much damage only.",
      "A creature {@condition Blinded|XPHB} by this spell makes another Constitution saving throw at the end of each of its turns, ending the effect on itself on a success.",
      "This spell dispels {@variantrule Darkness|XPHB} in its area that was created by any spell.",
    ],
    damageInflict: ["radiant"],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    miscTags: ["LGT", "LGTS"],
    areaTags: ["S"],
  },
  {
    name: "Telepathy",
    source: "LDJ2024",
    page: 331,
    level: 8,
    school: "divination",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "unlimited",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pair of linked silver rings",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 24,
        },
      },
    ],
    entries: [
      "You create a telepathic link between yourself and a willing creature with which you are familiar. The creature can be anywhere on the same plane of existence as you. The spell ends if you or the target are no longer on the same plane.",
      "Until the spell ends, you and the target can instantly share words, images, sounds, and other sensory messages with each other through the link, and the target recognizes you as the creature it is communicating with. The spell enables a creature to understand the meaning of your words and any sensory messages you send to it.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Tsunami",
    source: "LDJ2024",
    page: 336,
    level: 8,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "minute",
      },
    ],
    range: {
      type: "point",
      distance: {
        type: "miles",
        amount: 1,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "round",
          amount: 6,
        },
        concentration: true,
      },
    ],
    entries: [
      "A wall of water springs into existence at a point you choose within range. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick. The wall lasts for the duration.",
      "When the wall appears, each creature in its area makes a Strength saving throw, taking {@damage 6d10} Bludgeoning damage on a failed save or half as much damage on a successful one.",
      "At the start of each of your turns after the wall appears, the wall, along with any creatures in it, moves 50 feet away from you. Any Huge or smaller creature inside the wall or whose space the wall enters when it moves must succeed on a Strength saving throw or take {@damage 5d10} Bludgeoning damage. A creature can take this damage only once per round. At the end of the turn, the wall's height is reduced by 50 feet, and the damage the wall deals on later rounds is reduced by {@dice 1d10}. When the wall reaches 0 feet in height, the spell ends.",
      "A creature caught in the wall can move by swimming. Because of the wave's force, though, the creature must succeed on a Strength ({@skill Athletics|XPHB}) check against your spell save DC to move at all. If it fails the check, it can't move. A creature that moves out of the wall falls to the ground.",
    ],
    damageInflict: ["bludgeoning"],
    savingThrow: ["strength"],
    abilityCheck: ["strength"],
    areaTags: ["W"],
  },
];
