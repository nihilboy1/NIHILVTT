export const spellsLevel5 = [
  {
    name: "Animate Objects",
    source: "LDJ2024",
    page: 240,
    level: 5,
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
        amount: 120,
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
      "Objects animate at your command. Choose a number of nonmagical objects within range that aren't being worn or carried, aren't fixed to a surface, and aren't Gargantuan. The maximum number of objects is equal to your spellcasting ability modifier; for this number, a Medium or smaller target counts as one object, a Large target counts as two, and a Huge target counts as three.",
      "Each target animates, sprouts legs, and becomes a Construct that uses the {@creature Animated Object|XPHB} stat block; this creature is under your control until the spell ends or until it is reduced to 0 {@variantrule Hit Points|XPHB}. Each creature you make with this spell is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count and takes its turn immediately after yours.",
      "Until the spell ends, you can take a {@variantrule Bonus Action|XPHB} to mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. When the creature drops to 0 {@variantrule Hit Points|XPHB}, it reverts to its object form, and any remaining damage carries over to that form.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The creature's Slam damage increases by {@damage 1d4} (Medium or smaller), {@damage 1d6} (Large), or {@damage 1d12} (Huge) for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "piercing", "slashing"],
    miscTags: ["OBJ", "SMN", "UBA"],
    areaTags: ["MT"],
  },
  {
    name: "Antilife Shell",
    source: "LDJ2024",
    page: 241,
    level: 5,
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
      "An aura extends from you in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. The aura prevents creatures other than Constructs and Undead from passing or reaching through it. An affected creature can cast spells or make attacks with Ranged or Reach weapons through the barrier.",
      "If you move so that an affected creature is forced to pass through the barrier, the spell ends.",
    ],
    affectsCreatureType: [
      "aberration",
      "beast",
      "celestial",
      "dragon",
      "elemental",
      "fey",
      "fiend",
      "giant",
      "humanoid",
      "monstrosity",
      "ooze",
      "plant",
    ],
    areaTags: ["S"],
  },
  {
    name: "Awaken",
    source: "LDJ2024",
    page: 244,
    level: 5,
    school: "transmutation",
    castingTime: [
      {
        number: 8,
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
        text: "an agate worth 1,000+ GP, which the spell consumes",
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
      "You spend the casting time tracing magical pathways within a precious gemstone, and then touch the target. The target must be either a {@filter Beast|bestiary|type=beast|intelligence=[0;3]|miscellaneous=!swarm} or {@filter Plant|bestiary|type=plant|intelligence=[0;3]|miscellaneous=!swarm} creature with an Intelligence of 3 or less or a natural plant that isn't a creature. The target gains an Intelligence of 10 and the ability to speak one language you know. If the target is a natural plant, it becomes a Plant creature and gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human's. The DM chooses statistics appropriate for the awakened Plant, such as the statistics for the {@creature Awakened Shrub|XMM} or {@creature Awakened Tree|XMM} in the {@book Monster Manual|XMM}.",
      "The awakened target has the {@condition Charmed|XPHB} condition for 30 days or until you or your allies deal damage to it. When that condition ends, the awakened creature chooses its attitude toward you.",
    ],
    conditionInflict: ["charmed"],
    affectsCreatureType: ["beast", "plant"],
    miscTags: ["PRM"],
    areaTags: ["ST"],
  },
  {
    name: "Banishing Smite",
    source: "LDJ2024",
    page: 245,
    level: 5,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a creature with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}",
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "The target hit by the attack roll takes an extra {@damage 5d10} Force damage from the attack. If the attack reduces the target to 50 {@variantrule Hit Points|XPHB} or fewer, the target must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the {@condition Incapacitated|XPHB} condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
    ],
    damageInflict: ["force"],
    conditionInflict: ["incapacitated"],
    miscTags: ["AAD"],
  },
  {
    name: "Bigby's Hand",
    source: "LDJ2024",
    page: 246,
    srd52: "Arcane Hand",
    level: 5,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: "an eggshell and a glove",
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
      "You create a Large hand of shimmering magical energy in an unoccupied space that you can see within range. The hand lasts for the duration, and it moves at your command, mimicking the movements of your own hand.",
      "The hand is an object that has AC 20 and {@variantrule Hit Points|XPHB} equal to your {@variantrule Hit Points|XPHB|Hit Point} maximum. If it drops to 0 {@variantrule Hit Points|XPHB}, the spell ends. The hand doesn't occupy its space.",
      "When you cast the spell and as a {@variantrule Bonus Action|XPHB} on your later turns, you can move the hand up to 60 feet and then cause one of the following effects:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Clenched Fist",
            entries: [
              "The hand strikes a target within 5 feet of it. Make a melee spell attack. On a hit, the target takes {@damage 5d8} Force damage.",
            ],
          },
          {
            type: "item",
            name: "Forceful Hand",
            entries: [
              "The hand attempts to push a Huge or smaller creature within 5 feet of it. The target must succeed on a Strength saving throw, or the hand pushes the target up to 5 feet plus a number of feet equal to five times your spellcasting ability modifier. The hand moves with the target, remaining within 5 feet of it.",
            ],
          },
          {
            type: "item",
            name: "Grasping Hand",
            entries: [
              "The hand attempts to grapple a Huge or smaller creature within 5 feet of it. The target must succeed on a Dexterity saving throw, or the target has the {@condition Grappled|XPHB} condition, with an escape DC equal to your spell save DC. While the hand grapples the target, you can take a {@variantrule Bonus Action|XPHB} to cause the hand to crush it, dealing Bludgeoning damage to the target equal to {@damage 4d6} plus your spellcasting ability modifier.",
            ],
          },
          {
            type: "item",
            name: "Interposing Hand",
            entries: [
              "The hand grants you Half {@variantrule Cover|XPHB} against attacks and other effects that originate from its space or that pass through it. In addition, its space counts as {@variantrule Difficult Terrain|XPHB} for your enemies.",
            ],
          },
        ],
      },
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage of the Clenched Fist increases by {@scaledamage 4d8|5-9|2d8} and the damage of the Grasping Hand increases by {@scaledamage 2d6|5-9|2d6} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "force"],
    conditionInflict: ["grappled"],
    spellAttack: ["M"],
    savingThrow: ["dexterity", "strength"],
    miscTags: ["DFT", "FMV", "OBJ", "SGT", "UBA"],
  },
  {
    name: "Circle of Power",
    source: "LDJ2024",
    page: 250,
    level: 5,
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
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Advantage|XPHB} on saving throws against spells and other magical effects. When an affected creature makes a saving throw against a spell or magical effect that allows a save to take only half damage, it takes no damage if it succeeds on the save.",
    ],
    miscTags: ["ADV"],
    areaTags: ["S"],
  },
  {
    name: "Cloudkill",
    source: "LDJ2024",
    page: 251,
    level: 5,
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
        amount: 120,
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
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of yellow-green fog centered on a point within range. The fog lasts for the duration or until strong wind (such as the one created by {@spell Gust of Wind|XPHB}) disperses it, ending the spell. Its area is {@variantrule Heavily Obscured|XPHB}.",
      "Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} makes a Constitution saving throw, taking {@damage 5d8} Poison damage on a failed save or half as much damage on a successful one. A creature must also make this save when the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves into its space and when it enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} or ends its turn there. A creature makes this save only once per turn.",
      "The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} moves 10 feet away from you at the start of each of your turns.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 5d8|5-9|1d8} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["poison"],
    savingThrow: ["constitution"],
    miscTags: ["OBS"],
    areaTags: ["S"],
  },
  {
    name: "Commune",
    source: "LDJ2024",
    page: 251,
    level: 5,
    school: "divination",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
      s: true,
      m: "incense",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "You contact a deity or a divine proxy and ask up to three questions that can be answered with yes or no. You must ask your questions before the spell ends. You receive a correct answer for each question.",
      "Divine beings aren't necessarily omniscient, so you might receive \"unclear\" as an answer if a question pertains to information that lies beyond the deity's knowledge. In a case where a one-word answer could be misleading or contrary to the deity's interests, the DM might offer a short phrase as an answer instead.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||No answer!|Answer} chance for each casting after the first that you get no answer.",
    ],
  },
  {
    name: "Commune with Nature",
    source: "LDJ2024",
    page: 252,
    level: 5,
    school: "divination",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
      s: true,
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "You commune with nature spirits and gain knowledge of the surrounding area. In the outdoors, the spell gives you knowledge of the area within 3 miles of you. In caves and other natural underground settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by construction, such as in castles and settlements.",
      "Choose three of the following facts; you learn those facts as they pertain to the spell's area:",
      {
        type: "list",
        items: [
          "Locations of settlements",
          "Locations of portals to other planes of existence",
          "Location of one {@variantrule Challenge Rating|XPHB} 10+ creature (DM's choice) that is a Celestial, an Elemental, a Fey, a Fiend, or an Undead",
          "The most prevalent kind of plant, mineral, or Beast (you choose which to learn)",
          "Locations of bodies of water",
        ],
      },
      "For example, you could determine the location of a powerful monster in the area, the locations of bodies of water, and the locations of any towns.",
    ],
  },
  {
    name: "Cone of Cold",
    source: "LDJ2024",
    page: 253,
    level: 5,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "cone",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a small crystal or glass cone",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You unleash a blast of cold air. Each creature in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} originating from you makes a Constitution saving throw, taking {@damage 8d8} Cold damage on a failed save or half as much damage on a successful one. A creature killed by this spell becomes a frozen statue until it thaws.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d8|5-9|1d8} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["cold"],
    savingThrow: ["constitution"],
    areaTags: ["N"],
  },
  {
    name: "Conjure Elemental",
    source: "LDJ2024",
    page: 254,
    level: 5,
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
      "You conjure a Large, intangible spirit from the Elemental Planes that appears in an unoccupied space within range. Choose the spirit's element, which determines its damage type: air (Lightning), earth (Thunder), fire (Fire), or water (Cold). The spirit lasts for the duration.",
      "Whenever a creature you can see enters the spirit's space or starts its turn within 5 feet of the spirit, you can force that creature to make a Dexterity saving throw if the spirit has no creature {@condition Restrained|XPHB}. On failed save, the target takes {@damage 8d8} damage of the spirit's type, and the target has the {@condition Restrained|XPHB} condition until the spell ends. At the start of each of its turns, the {@condition Restrained|XPHB} target repeats the save. On a failed save, the target takes {@damage 4d8} damage of the spirit's type. On a successful save, the target isn't {@condition Restrained|XPHB} by the spirit.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d8;4d8|5-9|1d8} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["lightning", "thunder", "fire", "cold"],
    conditionInflict: ["restrained"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
  },
  {
    name: "Conjure Volley",
    source: "LDJ2024",
    page: 255,
    level: 5,
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
      m: {
        text: "a Melee or Ranged weapon worth at least 1 CP",
        cost: 1,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You brandish the weapon used to cast the spell and choose a point within range. Hundreds of similar spectral weapons (or ammunition appropriate to the weapon) fall in a volley and then disappear. Each creature of your choice that you can see in a 40-foot-radius, 20-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on that point makes a Dexterity saving throw. A creature takes {@damage 8d8} Force damage on a failed save or half as much damage on a successful one.",
    ],
    damageInflict: ["force"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
    areaTags: ["Y"],
  },
  {
    name: "Contact Other Plane",
    source: "LDJ2024",
    page: 255,
    level: 5,
    school: "divination",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
          type: "minute",
          amount: 1,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      'You mentally contact a demigod, the spirit of a long-dead sage, or some other knowledgeable entity from another plane. Contacting this otherworldly intelligence can break your mind. When you cast this spell, make a {@dc 15} Intelligence saving throw. On a successful save, you can ask the entity up to five questions. You must ask your questions before the spell ends. The DM answers each question with one word, such as "yes," "no," "maybe," "never," "irrelevant," or "unclear" (if the entity doesn\'t know the answer to the question). If a one-word answer would be misleading, the DM might instead offer a short phrase as an answer.',
      "On a failed save, you take {@damage 6d6} Psychic damage and have the {@condition Incapacitated|XPHB} condition until you finish a {@variantrule Long Rest|XPHB}. A {@spell Greater Restoration|XPHB} spell cast on you ends this effect.",
    ],
    damageInflict: ["psychic"],
    savingThrow: ["intelligence"],
  },
  {
    name: "Contagion",
    source: "LDJ2024",
    page: 256,
    level: 5,
    school: "necromancy",
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
          type: "day",
          amount: 7,
        },
      },
    ],
    entries: [
      "Your touch inflicts a magical contagion. The target must succeed on a Constitution saving throw or take {@damage 11d8} Necrotic damage and have the {@condition Poisoned|XPHB} condition. Also, choose one ability when you cast the spell. While {@condition Poisoned|XPHB}, the target has {@variantrule Disadvantage|XPHB} on saving throws made with the chosen ability.",
      "The target must repeat the saving throw at the end of each of its turns until it gets three successes or failures. If the target succeeds on three of these saves, the spell ends on the target. If the target fails three of the saves, the spell lasts for 7 days on it.",
      "Whenever the {@condition Poisoned|XPHB} target receives an effect that would end the {@condition Poisoned|XPHB} condition, the target must succeed on a Constitution saving throw, or the {@condition Poisoned|XPHB} condition doesn't end on it.",
    ],
    damageInflict: ["necrotic"],
    conditionInflict: ["poisoned"],
    savingThrow: ["constitution"],
    areaTags: ["ST"],
  },
  {
    name: "Creation",
    source: "LDJ2024",
    page: 259,
    level: 5,
    school: "illusion",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
      m: "a paintbrush",
    },
    duration: [
      {
        type: "special",
      },
    ],
    entries: [
      "You pull wisps of shadow material from the Shadowfell to create an object within range. It is either an object of vegetable matter (soft goods, rope, wood, and the like) or mineral matter (stone, crystal, metal, and the like). The object must be no larger than a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}, and the object must be of a form and material that you have seen.",
      "The spell's duration depends on the object's material, as shown in the Materials table. If the object is composed of multiple materials, use the shortest duration. Using any object created by this spell as another spell's Material component causes the other spell to fail.",
      {
        type: "table",
        caption: "Materials",
        colStyles: ["col-6", "col-6"],
        colLabels: ["Material", "Duration"],
        rows: [
          ["Vegetable matter", "24 hours"],
          ["Stone or crystal", "12 hours"],
          ["Precious metals", "1 hour"],
          ["Gems", "10 minutes"],
          ["Adamantine or mithral", "1 minute"],
        ],
      },
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The {@variantrule Cube [Area of Effect]|XPHB|Cube} increases by 5 feet for each spell slot level above 5.",
        ],
      },
    ],
  },
  {
    name: "Destructive Wave",
    source: "LDJ2024",
    page: 261,
    level: 5,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "sphere",
      distance: {
        type: "feet",
        amount: 30,
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
      "Destructive energy ripples outward from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Each creature you choose in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} makes a Constitution saving throw. On a failed save, a target takes {@damage 5d6} Thunder damage and {@damage 5d6} Radiant or Necrotic damage (your choice) and has the {@condition Prone|XPHB} condition. On a successful save, a target takes half as much damage only.",
    ],
    damageInflict: ["necrotic", "radiant", "thunder"],
    conditionInflict: ["prone"],
    savingThrow: ["constitution"],
    areaTags: ["MT", "S"],
  },
  {
    name: "Dispel Evil and Good",
    source: "LDJ2024",
    page: 263,
    level: 5,
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
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
      m: "powdered silver and iron",
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
      "For the duration, Celestials, Elementals, Fey, Fiends, and Undead have {@variantrule Disadvantage|XPHB} on attack rolls against you. You can end the spell early by using either of the following special functions.",
      {
        type: "entries",
        name: "Break Enchantment",
        entries: [
          "As a {@action Magic|XPHB} action, you touch a creature that is possessed by or has the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from one or more creatures of the types above. The target is no longer possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by such creatures.",
        ],
      },
      {
        type: "entries",
        name: "Dismissal",
        entries: [
          "As a {@action Magic|XPHB} action, you target one creature you can see within 5 feet of you that has one of the creature types above. The target must succeed on a Charisma saving throw or be sent back to its home plane if it isn't there already. If they aren't on their home plane, Undead are sent to the Shadowfell, and Fey are sent to the Feywild.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["celestial", "elemental", "fey", "fiend", "undead"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Dominate Person",
    source: "LDJ2024",
    page: 266,
    level: 5,
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "One Humanoid you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      'You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as "{@action Attack|XPHB} that creature," "Move over there," or "Fetch that object." The target does its best to obey on its turn. If it completes an order and doesn\'t receive further direction from you, it acts and moves as it likes, focusing on protecting itself.',
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 6 (up to 10 minutes), 7 (up to 1 hour), or 8+ (up to 8 hours).",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["humanoid"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Dream",
    source: "LDJ2024",
    page: 266,
    level: 5,
    school: "illusion",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
      s: true,
      m: "a handful of sand",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 8,
        },
      },
    ],
    entries: [
      "You target a creature you know on the same plane of existence. You or a willing creature you touch enters a trance state to act as a dream messenger. While in the trance, the messenger is {@condition Incapacitated|XPHB} and has a {@variantrule Speed|XPHB} of 0.",
      "If the target is asleep, the messenger appears in the target's dreams and can converse with the target as long as it remains asleep, through the spell's duration. The messenger can also shape the dream's environment, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the spell. The target recalls the dream perfectly upon waking.",
      "If the target is awake when you cast the spell, the messenger knows it and can either end the trance (and the spell) or wait for the target to sleep, at which point the messenger enters its dreams.",
      "You can make the messenger terrifying to the target. If you do so, the messenger can deliver a message of no more than ten words, and then the target makes a Wisdom saving throw. On a failed save, the target gains no benefit from its rest, and it takes {@damage 3d6} Psychic damage when it wakes up.",
    ],
    damageInflict: ["psychic"],
    savingThrow: ["wisdom"],
    areaTags: ["ST"],
  },
  {
    name: "Flame Strike",
    source: "LDJ2024",
    page: 275,
    level: 5,
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
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pinch of sulfur",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A vertical column of brilliant fire roars down from above. Each creature in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range makes a Dexterity saving throw, taking {@damage 5d6} Fire damage and {@damage 5d6} Radiant damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The Fire damage and the Radiant damage increase by {@scaledamage 5d6|5-9|1d6} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["fire", "radiant"],
    savingThrow: ["dexterity"],
    areaTags: ["Y"],
  },
  {
    name: "Geas",
    source: "LDJ2024",
    page: 278,
    level: 5,
    school: "enchantment",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
        type: "timed",
        duration: {
          type: "day",
          amount: 30,
        },
      },
    ],
    entries: [
      "You give a verbal command to a creature that you can see within range, ordering it to carry out some service or refrain from an action or a course of activity as you decide. The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target automatically succeeds if it can't understand your command.",
      "While {@condition Charmed|XPHB}, the creature takes {@damage 5d10} Psychic damage if it acts in a manner directly counter to your command. It takes this damage no more than once each day.",
      "You can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the spell ends.",
      "A {@spell Remove Curse|XPHB}, {@spell Greater Restoration|XPHB}, or {@spell Wish|XPHB} spell ends this spell.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "If you use a level 7 or 8 spell slot, the duration is 365 days. If you use a level 9 spell slot, the spell lasts until it is ended by one of the spells mentioned above.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["PRM", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Greater Restoration",
    source: "LDJ2024",
    page: 281,
    level: 5,
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
      m: {
        text: "diamond dust worth 100+ GP, which the spell consumes",
        cost: 10000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You touch a creature and magically remove one of the following effects from it:",
      {
        type: "list",
        items: [
          "1 {@condition Exhaustion|XPHB} level",
          "The {@condition Charmed|XPHB} or {@condition Petrified|XPHB} condition",
          "A curse, including the target's {@variantrule Attunement|XPHB} to a cursed magic item",
          "Any reduction to one of the target's ability scores",
          "Any reduction to the target's {@variantrule Hit Points|XPHB|Hit Point} maximum",
        ],
      },
    ],
    areaTags: ["ST"],
  },
  {
    name: "Hallow",
    source: "LDJ2024",
    page: 283,
    level: 5,
    school: "abjuration",
    castingTime: [
      {
        number: 24,
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
        text: "incense worth 1,000+ GP, which the spell consumes",
        cost: 100000,
        consume: true,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel"],
      },
    ],
    entries: [
      "You touch a point and infuse an area around it with holy or unholy power. The area can have a radius up to 60 feet, and the spell fails if the radius includes an area already under the effect of Hallow. The affected area has the following effects.",
      {
        type: "entries",
        name: "Hallowed Ward",
        entries: [
          "Choose any of these creature types: Aberration, Celestial, Elemental, Fey, Fiend, or Undead. Creatures of the chosen types can't willingly enter the area, and any creature that is possessed by or that has the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from such creatures isn't possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by them while in the area.",
        ],
      },
      {
        type: "entries",
        name: "Extra Effect",
        entries: [
          "You bind an extra effect to the area from the list below:",
          {
            type: "list",
            style: "list-hang-notitle",
            items: [
              {
                type: "item",
                name: "Courage",
                entries: [
                  "Creatures of any types you choose can't gain the {@condition Frightened|XPHB} condition while in the area.",
                ],
              },
              {
                type: "item",
                name: "Darkness",
                entries: [
                  "{@variantrule Darkness|XPHB} fills the area. Normal light, as well as magical light created by spells of a level lower than this spell, can't illuminate the area.",
                ],
              },
              {
                type: "item",
                name: "Daylight",
                entries: [
                  "Bright light fills the area. Magical {@variantrule Darkness|XPHB} created by spells of a level lower than this spell can't extinguish the light.",
                ],
              },
              {
                type: "item",
                name: "Peaceful Rest",
                entries: [
                  "{@variantrule Dead|XPHB} bodies interred in the area can't be turned into Undead.",
                ],
              },
              {
                type: "item",
                name: "Extradimensional Interference",
                entries: [
                  "Creatures of any types you choose can't enter or exit the area using teleportation or interplanar travel.",
                ],
              },
              {
                type: "item",
                name: "Fear",
                entries: [
                  "Creatures of any types you choose have the {@condition Frightened|XPHB} condition while in the area.",
                ],
              },
              {
                type: "item",
                name: "Resistance",
                entries: [
                  "Creatures of any types you choose have {@variantrule Resistance|XPHB} to one damage type of your choice while in the area.",
                ],
              },
              {
                type: "item",
                name: "Silence",
                entries: [
                  "No sound can emanate from within the area, and no sound can reach into it.",
                ],
              },
              {
                type: "item",
                name: "Tongues",
                entries: [
                  "Creatures of any types you choose can communicate with any other creature in the area even if they don't share a common language.",
                ],
              },
              {
                type: "item",
                name: "Vulnerability",
                entries: [
                  "Creatures of any types you choose have {@variantrule Vulnerability|XPHB} to one damage type of your choice while in the area.",
                ],
              },
            ],
          },
        ],
      },
    ],
    damageResist: [
      "acid",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "poison",
      "psychic",
      "radiant",
      "thunder",
    ],
    damageVulnerable: [
      "acid",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "poison",
      "psychic",
      "radiant",
      "thunder",
    ],
    affectsCreatureType: [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead",
    ],
    miscTags: ["LGT"],
  },
  {
    name: "Hold Monster",
    source: "LDJ2024",
    page: 285,
    level: 5,
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
        amount: 90,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a straight piece of iron",
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
      "Choose a creature that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Paralyzed|XPHB} condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 5.",
        ],
      },
    ],
    conditionInflict: ["paralyzed"],
    savingThrow: ["wisdom"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Insect Plague",
    source: "LDJ2024",
    page: 289,
    level: 5,
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
        amount: 300,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a locust",
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
      "Swarming locusts fill a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} remains for the duration, and its area is {@variantrule Lightly Obscured|XPHB} and {@variantrule Difficult Terrain|XPHB}.",
      "When the swarm appears, each creature in it makes a Constitution saving throw, taking {@damage 4d10} Piercing damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 4d10|5-9|1d10} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["piercing"],
    savingThrow: ["constitution"],
    miscTags: ["DFT", "OBS"],
    areaTags: ["S"],
  },
  {
    name: "Jallarzi's Storm of Radiance",
    source: "LDJ2024",
    page: 289,
    level: 5,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pinch of phosphorus",
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
      "You unleash a storm of flashing light and raging thunder in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point you can see within range. While in this area, creatures have the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions, and they can't cast spells with a Verbal component.",
      "When the storm appears, each creature in it makes a Constitution saving throw, taking {@damage 2d10} Radiant damage and {@damage 2d10} Thunder damage on a failed save or half as much damage on a successful one. A creature also makes this save when it enters the spell's area for the first time on a turn or ends its turn there. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The Radiant and Thunder damage increase by {@scaledamage 2d10|5-9|1d10} for each spell slot level above 5.",
        ],
      },
    ],
    damageInflict: ["radiant", "thunder"],
    conditionInflict: ["blinded", "deafened"],
    savingThrow: ["constitution"],
    miscTags: ["SGT"],
    areaTags: ["Y"],
  },
  {
    name: "Legend Lore",
    source: "LDJ2024",
    page: 290,
    level: 5,
    school: "divination",
    castingTime: [
      {
        number: 10,
        unit: "minute",
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
      s: true,
      m: {
        text: "incense worth 250+ GP, which the spell consumes, and four ivory strips worth 50+ GP each",
        cost: 25000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Name or describe a famous person, place, or object. The spell brings to your mind a brief summary of the significant lore about that famous thing, as described by the DM.",
      "The lore might consist of important details, amusing revelations, or even secret lore that has never been widely known. The more information you already know about the thing, the more precise and detailed the information you receive is. That information is accurate but might be couched in figurative language or poetry, as determined by the DM.",
      "If the famous thing you chose isn't actually famous, you hear sad musical notes played on a trombone, and the spell fails.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Mass Cure Wounds",
    source: "LDJ2024",
    page: 296,
    level: 5,
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
        type: "instant",
      },
    ],
    entries: [
      "A wave of healing energy washes out from a point you can see within range. Choose up to six creatures in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point. Each target regains {@variantrule Hit Points|XPHB} equal to {@dice 5d8} plus your spellcasting ability modifier.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 5d8|5-9|1d8} for each spell slot level above 5.",
        ],
      },
    ],
    miscTags: ["HL"],
    areaTags: ["MT", "S"],
  },
  {
    name: "Mislead",
    source: "LDJ2024",
    page: 299,
    level: 5,
    school: "illusion",
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
      "You gain the {@condition Invisible|XPHB} condition at the same time that an illusory double of you appears where you are standing. The double lasts for the duration, but the invisibility ends immediately after you make an attack roll, deal damage, or cast a spell.",
      "As a {@action Magic|XPHB} action, you can move the illusory double up to twice your {@variantrule Speed|XPHB} and make it gesture, speak, and behave in whatever way you choose. It is intangible and invulnerable.",
      "You can see through its eyes and hear through its ears as if you were located where it is.",
    ],
    conditionInflict: ["invisible"],
    miscTags: ["SGT"],
  },
  {
    name: "Modify Memory",
    source: "LDJ2024",
    page: 299,
    level: 5,
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You attempt to reshape another creature's memories. One creature that you can see within range makes a Wisdom saving throw. If you are fighting the creature, it has {@variantrule Advantage|XPHB} on the save. On a failed save, the target has the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB} in this way, the target also has the {@condition Incapacitated|XPHB} condition and is unaware of its surroundings, though it can hear you. If it takes any damage or is targeted by another spell, this spell ends, and no memories are modified.",
      "While this charm lasts, you can affect the target's memory of an event that it experienced within the last 24 hours and that lasted no more than 10 minutes. You can permanently eliminate all memory of the event, allow the target to recall the event with perfect clarity, change its memory of the event's details, or create a memory of some other event.",
      "You must speak to the target to describe how its memories are affected, and it must be able to understand your language for the modified memories to take root. Its mind fills in any gaps in the details of your description. If the spell ends before you finish describing the modified memories, the creature's memory isn't altered. Otherwise, the modified memories take hold when the spell ends.",
      "A modified memory doesn't necessarily affect how a creature behaves, particularly if the memory contradicts the creature's natural inclinations, alignment, or beliefs. An illogical modified memory, such as a false memory of how much the creature enjoyed swimming in acid, is dismissed as a bad dream. The DM might deem a modified memory too nonsensical to affect a creature.",
      "A {@spell Remove Curse|XPHB} or {@spell Greater Restoration|XPHB} spell cast on the target restores the creature's true memory.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can alter the target's memories of an event that took place up to 7 days ago (level 6 spell slot), 30 days ago (level 7 spell slot), 365 days ago (level 8 spell slot), or any time in the creature's past (level 9 spell slot).",
        ],
      },
    ],
    conditionInflict: ["charmed", "incapacitated"],
    savingThrow: ["wisdom"],
    miscTags: ["PRM", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Passwall",
    source: "LDJ2024",
    page: 304,
    level: 5,
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
      m: "a pinch of sesame seeds",
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
      "A passage appears at a point that you can see on a wooden, plaster, or stone surface (such as a wall, ceiling, or floor) within range and lasts for the duration. You choose the opening's dimensions: up to 5 feet wide, 8 feet tall, and 20 feet deep. The passage creates no instability in a structure surrounding it.",
      "When the opening disappears, any creatures or objects still in the passage created by the spell are safely ejected to an unoccupied space nearest to the surface on which you cast the spell.",
    ],
    miscTags: ["OBJ", "SGT"],
  },
  {
    name: "Planar Binding",
    source: "LDJ2024",
    page: 305,
    level: 5,
    school: "abjuration",
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
      m: {
        text: "a jewel worth 1,000+ GP, which the spell consumes",
        cost: 100000,
        consume: true,
      },
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
      "You attempt to bind a Celestial, an Elemental, a Fey, or a Fiend to your service. The creature must be within range for the entire casting of the spell. (Typically, the creature is first summoned into the center of the inverted version of the {@spell Magic Circle|XPHB} spell to trap it while this spell is cast.) At the completion of the casting, the target must succeed on a Charisma saving throw or be bound to serve you for the duration. If the creature was summoned or created by another spell, that spell's duration is extended to match the duration of this spell.",
      "A bound creature must follow your commands to the best of its ability. You might command the creature to accompany you on an adventure, to guard a location, or to deliver a message. If the creature is {@variantrule Hostile [Attitude]|XPHB|Hostile}, it strives to twist your commands to achieve its own objectives. If the creature carries out your commands completely before the spell ends, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane, it returns to the place where you bound it and remains there until the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The duration increases with a spell slot of level 6 (10 days), 7 (30 days), 8 (180 days), and 9 (366 days).",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["celestial", "elemental", "fey", "fiend"],
    miscTags: ["SMN"],
    areaTags: ["ST"],
  },
  {
    name: "Raise Dead",
    source: "LDJ2024",
    page: 310,
    level: 5,
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
        text: "a diamond worth 500+ GP, which the spell consumes",
        cost: 50000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "With a touch, you revive a dead creature if it has been dead no longer than 10 days and it wasn't Undead when it died.",
      "The creature returns to life with 1 {@variantrule Hit Points|XPHB|Hit Point}. This spell also neutralizes any poisons that affected the creature at the time of death.",
      "This spell closes all mortal wounds, but it doesn't restore missing body parts. If the creature is lacking body parts or organs integral for its survival—its head, for instance—the spell automatically fails.",
      "Coming back from the dead is an ordeal. The target takes a -4 penalty to {@variantrule D20 Test|XPHB|D20 Tests}. Every time the target finishes a {@variantrule Long Rest|XPHB}, the penalty is reduced by 1 until it becomes 0.",
    ],
    affectsCreatureType: [
      "aberration",
      "beast",
      "celestial",
      "construct",
      "dragon",
      "elemental",
      "fey",
      "fiend",
      "giant",
      "humanoid",
      "monstrosity",
      "ooze",
      "plant",
    ],
    miscTags: ["HL"],
  },
  {
    name: "Rary's Telepathic Bond",
    source: "LDJ2024",
    page: 311,
    srd52: "Telepathic Bond",
    level: 5,
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
        type: "feet",
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "two eggs",
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
    meta: {
      ritual: true,
    },
    entries: [
      "You forge a telepathic link among up to eight willing creatures of your choice within range, psychically linking each creature to all the others for the duration. Creatures that can't communicate in any languages aren't affected by this spell.",
      "Until the spell ends, the targets can communicate telepathically through the bond whether or not they share a language. The communication is possible over any distance, though it can't extend to other planes of existence.",
    ],
    areaTags: ["MT"],
  },
  {
    name: "Reincarnate",
    source: "LDJ2024",
    page: 311,
    level: 5,
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
        text: "rare oils worth 1,000+ GP, which the spell consumes",
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
      "You touch a dead Humanoid or a piece of one. If the creature has been dead no longer than 10 days, the spell forms a new body for it and calls the soul to enter that body. Roll {@dice 1d10} and consult the table below to determine the body's species, or the DM chooses another playable species.",
      {
        type: "table",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["1d10", "Species"],
        rows: [
          ["1", "{@race Aasimar|XPHB}"],
          ["2", "{@race Dragonborn|XPHB}"],
          ["3", "{@race Dwarf|XPHB}"],
          ["4", "{@race Elf|XPHB}"],
          ["5", "{@race Gnome|XPHB}"],
          ["6", "{@race Goliath|XPHB}"],
          ["7", "{@race Halfling|XPHB}"],
          ["8", "{@race Human|XPHB}"],
          ["9", "{@race Orc|XPHB}"],
          ["10", "{@race Tiefling|XPHB}"],
        ],
      },
      "The reincarnated creature makes any choices that a species' description offers, and the creature recalls its former life. It retains the capabilities it had in its original form, except it loses the traits of its previous species and gains the traits of its new one.",
    ],
    affectsCreatureType: ["humanoid"],
    miscTags: ["HL", "RO"],
  },
  {
    name: "Scrying",
    source: "LDJ2024",
    page: 313,
    level: 5,
    school: "divination",
    castingTime: [
      {
        number: 10,
        unit: "minute",
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
      s: true,
      m: {
        text: "a focus worth 1,000+ GP, such as a crystal ball, mirror, or water-filled font",
        cost: 100000,
      },
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
      "You can see and hear a creature you choose that is on the same plane of existence as you. The target makes a Wisdom saving throw, which is modified (see the tables below) by how well you know the target and the sort of physical connection you have to it. The target doesn't know what it is making the save against, only that it feels uneasy.",
      {
        type: "table",
        colStyles: ["col-10", "col-2 text-center"],
        colLabels: ["Your Knowledge of the Target Is...", "Save Modifier"],
        rows: [
          ["Secondhand (heard of the target)", "+5"],
          ["Firsthand (met the target)", "+0"],
          ["Extensive (know the target well)", "-5"],
        ],
      },
      {
        type: "table",
        colStyles: ["col-10", "col-2 text-center"],
        colLabels: ["You Have the Target's...", "Save Modifier"],
        rows: [
          ["Picture or other likeness", "-2"],
          ["Garment or other possession", "-4"],
          ["Body part, lock of hair, or bit of nail", "-10"],
        ],
      },
      "On a successful save, the target isn't affected, and you can't use this spell on it again for 24 hours.",
      "On a failed save, the spell creates an {@condition Invisible|XPHB}, intangible sensor within 10 feet of the target. You can see and hear through the sensor as if you were there. The sensor moves with the target, remaining within 10 feet of it for the duration. If something can see the sensor, it appears as a luminous orb about the size of your fist.",
      "Instead of targeting a creature, you can target a location you have seen. When you do so, the sensor appears at that location and doesn't move.",
    ],
    savingThrow: ["wisdom"],
  },
  {
    name: "Seeming",
    source: "LDJ2024",
    page: 314,
    level: 5,
    school: "illusion",
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
          amount: 8,
        },
      },
    ],
    entries: [
      "You give an illusory appearance to each creature of your choice that you can see within range. An unwilling target can make a Charisma saving throw, and if it succeeds, it is unaffected by this spell.",
      "You can give the same appearance or different ones to the targets. The spell can change the appearance of the targets' bodies and equipment. You can make each creature seem 1 foot shorter or taller and appear heavier or lighter. A target's new appearance must have the same basic arrangement of limbs as the target, but the extent of the illusion is otherwise up to you. The spell lasts for the duration.",
      "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a creature's outfit, objects pass through the hat.",
      "A creature that takes the {@action Study|XPHB} action to examine a target can make an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If it succeeds, it becomes aware that the target is disguised.",
    ],
    savingThrow: ["charisma"],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Steel Wind Strike",
    source: "LDJ2024",
    page: 320,
    level: 5,
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
        amount: 30,
      },
    },
    components: {
      s: true,
      m: {
        text: "a Melee weapon worth 1+ SP",
        cost: 10,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You flourish the weapon used in the casting and then vanish to strike like the wind. Choose up to five creatures you can see within range. Make a melee spell attack against each target. On a hit, a target takes {@damage 6d10} Force damage.",
      "You then teleport to an unoccupied space you can see within 5 feet of one of the targets.",
    ],
    damageInflict: ["force"],
    spellAttack: ["M"],
    miscTags: ["SGT", "TP"],
    areaTags: ["MT"],
  },
  {
    name: "Summon Celestial",
    source: "LDJ2024",
    page: 323,
    level: 5,
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
        amount: 90,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a reliquary worth 500+ GP",
        cost: 50000,
      },
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
      "You call forth a Celestial spirit. It manifests in an angelic form in an unoccupied space that you can see within range and uses the {@creature Celestial Spirit|XPHB} stat block. When you cast the spell, choose Avenger or Defender. Your choice determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
      "The creature is an ally to you and your allies. In combat, the creature shares your {@variantrule Initiative|XPHB} count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the {@action Dodge|XPHB} action and uses its movement to avoid danger.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Use the spell slot's level for the spell's level in the stat block.",
        ],
      },
    ],
    miscTags: ["SGT", "SMN"],
  },
  {
    name: "Summon Dragon",
    source: "LDJ2024",
    page: 324,
    level: 5,
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
      m: {
        text: "an object with the image of a dragon engraved on it worth 500+ GP",
        cost: 50000,
      },
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
      "You call forth a Dragon spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Draconic Spirit|XPHB} stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
      "The creature is an ally to you and your allies. In combat, the creature shares your {@variantrule Initiative|XPHB} count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the {@action Dodge|XPHB} action and uses its movement to avoid danger.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Use the spell slot's level for the spell's level in the stat block.",
        ],
      },
    ],
    miscTags: ["SGT", "SMN"],
  },
  {
    name: "Swift Quiver",
    source: "LDJ2024",
    page: 329,
    level: 5,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
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
      s: true,
      m: {
        text: "a Quiver worth 1+ GP",
        cost: 100,
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
      "When you cast the spell and as a {@variantrule Bonus Action|XPHB} until it ends, you can make two attacks with a weapon that fires Arrows or Bolts, such as a Longbow or a Light Crossbow. The spell magically creates the ammunition needed for each attack. Each Arrow or Bolt created by the spell deals damage like a nonmagical piece of ammunition of its kind and disintegrates immediately after it hits or misses.",
    ],
    miscTags: ["UBA"],
  },
  {
    name: "Synaptic Static",
    source: "LDJ2024",
    page: 330,
    level: 5,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You cause psychic energy to erupt at a point within range. Each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes an Intelligence saving throw, taking {@damage 8d6} Psychic damage on a failed save or half as much damage on a successful one.",
      "On a failed save, a target also has muddled thoughts for 1 minute. During that time, it subtracts {@dice 1d6} from all its attack rolls and ability checks, as well as any Constitution saving throws to maintain {@status Concentration|XPHB}. The target makes an Intelligence saving throw at the end of each of its turns, ending the effect on itself on a success.",
    ],
    damageInflict: ["psychic"],
    savingThrow: ["intelligence", "constitution"],
    areaTags: ["S"],
  },
  {
    name: "Telekinesis",
    source: "LDJ2024",
    page: 331,
    level: 5,
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
      "You gain the ability to move or manipulate creatures or objects by thought. When you cast the spell and as a {@action Magic|XPHB} action on your later turns before the spell ends, you can exert your will on one creature or object that you can see within range, causing the appropriate effect below. You can affect the same target round after round or choose a new one at any time. If you switch targets, the prior target is no longer affected by the spell.",
      {
        type: "entries",
        name: "Creature",
        entries: [
          "You can try to move a Huge or smaller creature. The target must succeed on a Strength saving throw, or you move it up to 30 feet in any direction within the spell's range. Until the end of your next turn, the creature has the {@condition Restrained|XPHB} condition, and if you lift it into the air, it is suspended there. It falls at the end of your next turn unless you use this option on it again and it fails the save.",
        ],
      },
      {
        type: "entries",
        name: "Object",
        entries: [
          "You can try to move a Huge or smaller object. If the object isn't being worn or carried, you automatically move it up to 30 feet in any direction within the spell's range.",
          "If the object is worn or carried by a creature, that creature must succeed on a Strength saving throw, or you pull the object away and move it up to 30 feet in any direction within the spell's range.",
          "You can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool, opening a door or a container, stowing or retrieving an item from an open container, or pouring the contents from a vial.",
        ],
      },
    ],
    conditionInflict: ["restrained"],
    savingThrow: ["strength"],
    miscTags: ["FMV", "OBJ", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Teleportation Circle",
    source: "LDJ2024",
    page: 332,
    level: 5,
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
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      m: {
        text: "rare inks worth 50+ GP, which the spell consumes",
        cost: 5000,
        consume: true,
      },
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "round",
          amount: 1,
        },
      },
    ],
    entries: [
      "As you cast the spell, you draw a 5-foot-radius circle on the ground inscribed with sigils that link your location to a permanent teleportation circle of your choice whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any creature that enters the portal instantly appears within 5 feet of the destination circle or in the nearest unoccupied space if that space is occupied.",
      "Many major temples, guildhalls, and other important places have permanent teleportation circles. Each circle includes a unique sigil sequence—a string of runes arranged in a particular pattern.",
      "When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the DM. You might learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minute.",
      "You can create a permanent teleportation circle by casting this spell in the same location every day for 365 days.",
    ],
    miscTags: ["PIR", "PRM", "TP"],
  },
  {
    name: "Tree Stride",
    source: "LDJ2024",
    page: 335,
    level: 5,
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
        type: "self",
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
      "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 5 feet of movement to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice within 5 feet of the destination tree, using another 5 feet of movement. If you have no movement left, you appear within 5 feet of the tree you entered.",
      "You can use this transportation ability only once on each of your turns. You must end each turn outside a tree.",
    ],
    miscTags: ["TP"],
  },
  {
    name: "Wall of Force",
    source: "LDJ2024",
    page: 338,
    level: 5,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a shard of glass",
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
      "An {@condition Invisible|XPHB} wall of force springs into existence at a point you choose within range. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick and lasts for the duration. If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side).",
      "Nothing can physically pass through the wall. It is immune to all damage and can't be dispelled by {@spell Dispel Magic|XPHB}. A {@spell Disintegrate|XPHB} spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane and blocks ethereal travel through the wall.",
    ],
    areaTags: ["W"],
  },
  {
    name: "Wall of Stone",
    source: "LDJ2024",
    page: 339,
    level: 5,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a cube of granite",
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
      "A nonmagical wall of solid stone springs into existence at a point you choose within range. The wall is 6 inches thick and is composed of ten 10-foot-by-10-foot panels. Each panel must be contiguous with another panel. Alternatively, you can create 10-foot-by-20-foot panels that are only 3 inches thick.",
      "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side). If a creature would be surrounded on all sides by the wall (or the wall and another solid surface), that creature can make a Dexterity saving throw. On a success, it can use its {@variantrule Reaction|XPHB} to move up to its {@variantrule Speed|XPHB} so that it is no longer enclosed by the wall.",
      "The wall can have any shape you desire, though it can't occupy the same space as a creature or object. The wall doesn't need to be vertical or rest on a firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.",
      "If you create a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create battlements and the like.",
      "The wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 {@variantrule Hit Points|XPHB} per inch of thickness, and it has {@variantrule Immunity|XPHB} to Poison and Psychic damage. Reducing a panel to 0 {@variantrule Hit Points|XPHB} destroys it and might cause connected panels to collapse at the DM's discretion.",
      "If you maintain your {@status Concentration|XPHB} on this spell for its full duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the spell ends.",
    ],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ", "PRM"],
    areaTags: ["W"],
  },
  {
    name: "Yolande's Regal Presence",
    source: "LDJ2024",
    page: 343,
    level: 5,
    school: "enchantment",
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
      m: "a miniature tiara",
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
      "You surround yourself with unearthly majesty in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. Whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters the space of a creature you can see and whenever a creature you can see enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, you can force that creature to make a Wisdom saving throw. On a failed save, the target takes {@damage 4d6} Psychic damage and has the {@condition Prone|XPHB} condition, and you can push it up to 10 feet away. On a successful save, the target takes half as much damage only. A creature makes this save only once per turn.",
    ],
    damageInflict: ["psychic"],
    conditionInflict: ["prone"],
    savingThrow: ["wisdom"],
    miscTags: ["FMV", "SGT"],
    areaTags: ["S"],
  },
];
