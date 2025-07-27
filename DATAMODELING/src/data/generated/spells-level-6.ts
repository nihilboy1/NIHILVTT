export const spellsLevel6 = [
  {
    name: "Arcane Gate",
    source: "LDJ2024",
    page: 242,
    level: 6,
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
        amount: 500,
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
      "You create linked teleportation portals. Choose two Large, unoccupied spaces on the ground that you can see, one space within range and the other one within 10 feet of you. A circular portal opens in each of those spaces and remains for the duration.",
      "The portals are two-dimensional glowing rings filled with mist that blocks sight. They hover inches from the ground and are perpendicular to it.",
      "A portal is open on only one side (you choose which). Anything entering the open side of a portal exits from the open side of the other portal as if the two were adjacent to each other. As a {@variantrule Bonus Action|XPHB}, you can change the facing of the open sides.",
    ],
    miscTags: ["OBJ", "SGT", "TP", "UBA"],
  },
  {
    name: "Blade Barrier",
    source: "LDJ2024",
    page: 247,
    level: 6,
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
        amount: 90,
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
      "You create a wall of whirling blades made of magical energy. The wall appears within range and lasts for the duration. You make a straight wall up to 100 feet long, 20 feet high, and 5 feet thick, or a ringed wall up to 60 feet in diameter, 20 feet high, and 5 feet thick. The wall provides Three-Quarters {@variantrule Cover|XPHB}, and its space is {@variantrule Difficult Terrain|XPHB}.",
      "Any creature in the wall's space makes a Dexterity saving throw, taking {@damage 6d10} Force damage on a failed save or half as much damage on a successful one. A creature also makes that save if it enters the wall's space or ends it turn there. A creature makes that save only once per turn.",
    ],
    damageInflict: ["force"],
    savingThrow: ["dexterity"],
    miscTags: ["DFT"],
    areaTags: ["W"],
  },
  {
    name: "Chain Lightning",
    source: "LDJ2024",
    page: 249,
    level: 6,
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
      m: "three silver pins",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You launch a lightning bolt toward a target you can see within range. Three bolts then leap from that target to as many as three other targets of your choice, each of which must be within 30 feet of the first target. A target can be a creature or an object and can be targeted by only one of the bolts.",
      "Each target makes a Dexterity saving throw, taking {@damage 10d8} Lightning damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "One additional bolt leaps from the first target to another target for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["lightning"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ", "SCT", "SGT"],
    areaTags: ["MT", "ST"],
  },
  {
    name: "Circle of Death",
    source: "LDJ2024",
    page: 250,
    level: 6,
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
        type: "feet",
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "the powder of a crushed black pearl worth 500+ GP",
        cost: 50000,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Negative energy ripples out in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} from a point you choose within range. Each creature in that area makes a Constitution saving throw, taking {@damage 8d8} Necrotic damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d8|6-9|2d8} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["constitution"],
    areaTags: ["S"],
  },
  {
    name: "Conjure Fey",
    source: "LDJ2024",
    page: 255,
    level: 6,
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
      "You conjure a Medium spirit from the Feywild in an unoccupied space you can see within range. The spirit lasts for the duration, and it looks like a Fey creature of your choice. When the spirit appears, you can make one melee spell attack against a creature within 5 feet of it. On a hit, the target takes Psychic damage equal to {@damage 3d12} plus your spellcasting ability modifier, and the target has the {@condition Frightened|XPHB} condition until the start of your next turn, with both you and the spirit as the source of the fear.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can teleport the spirit to an unoccupied space you can see within 30 feet of the space it left and make the attack against a creature within 5 feet of it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d12|6-9|1d12} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    conditionInflict: ["frightened"],
    miscTags: ["SGT", "UBA"],
  },
  {
    name: "Contingency",
    source: "LDJ2024",
    page: 256,
    level: 6,
    school: "abjuration",
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
        text: "a gem-encrusted statuette of yourself worth 1,500+ GP",
        cost: 150000,
      },
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
      "Choose a spell of level 5 or lower that you can cast, that has a casting time of an action, and that can target you. You cast that spell—called the contingent spell—as part of casting Contingency, expending spell slots for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain trigger occurs. You describe that trigger when you cast the two spells. For example, a Contingency cast with {@spell Water Breathing|XPHB} might stipulate that Water Breathing comes into effect when you are engulfed in water or a similar liquid.",
      "The contingent spell takes effect immediately after the trigger occurs for the first time, whether or not you want it to, and then Contingency ends.",
      "The contingent spell takes effect only on you, even if it can normally target others. You can use only one Contingency spell at a time. If you cast this spell again, the effect of another Contingency spell on you ends. Also, Contingency ends on you if its material component is ever not on your person.",
    ],
  },
  {
    name: "Create Undead",
    source: "LDJ2024",
    page: 258,
    level: 6,
    school: "necromancy",
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
      s: true,
      m: {
        text: "one 150+ GP black onyx stone for each corpse",
        cost: 15000,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You can cast this spell only at night. Choose up to three corpses of Medium or Small Humanoids within range. Each one becomes a {@creature Ghoul|XMM} under your control (see the {@book Monster Manual|XMM} for its stat block).",
      "As a {@variantrule Bonus Action|XPHB} on each of your turns, you can mentally command any creature you animated with this spell if the creature is within 120 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to them). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a particular place. If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. Once given an order, the creature continues to follow the order until its task is complete.",
      "The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature before the current 24-hour period ends. This use of the spell reasserts your control over up to three creatures you have animated with this spell rather than animating new ones.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "If you use a level 7 spell slot, you can animate or reassert control over four {@creature Ghoul|XMM|Ghouls}. If you use a level 8 spell slot, you can animate or reassert control over five {@creature Ghoul|XMM|Ghouls} or two {@creature Ghast|XMM|Ghasts} or {@creature Wight|XMM|Wights}. If you use a level 9 spell slot, you can animate or reassert control over six {@creature Ghoul|XMM|Ghouls}, three {@creature Ghast|XMM|Ghasts} or {@creature Wight|XMM|Wights}, or two {@creature Mummy|XMM|Mummies}. See the {@book Monster Manual|XMM} for these stat blocks.",
        ],
      },
    ],
    affectsCreatureType: ["humanoid"],
    miscTags: ["PRM", "SMN", "UBA"],
  },
  {
    name: "Disintegrate",
    source: "LDJ2024",
    page: 263,
    level: 6,
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
      m: "a lodestone and dust",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You launch a green ray at a target you can see within range. The target can be a creature, a nonmagical object, or a creation of magical force, such as the wall created by {@spell Wall of Force|XPHB}.",
      "A creature targeted by this spell makes a Dexterity saving throw. On a failed save, the target takes {@damage 10d6 + 40} Force damage. If this damage reduces it to 0 {@variantrule Hit Points|XPHB}, it and everything nonmagical it is wearing and carrying are disintegrated into gray dust. The target can be revived only by a {@spell True Resurrection|XPHB} or a {@spell Wish|XPHB} spell.",
      "This spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If such a target is Huge or larger, this spell disintegrates a 10-foot-{@variantrule Cube [Area of Effect]|XPHB|Cube} portion of it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 10d6 + 40|6-9|3d6} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["force"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Drawmij's Instant Summons",
    source: "LDJ2024",
    page: 266,
    srd52: "Instant Summons",
    level: 6,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a sapphire worth 1,000+ GP",
        cost: 100000,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel"],
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "You touch the sapphire used in the casting and an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an {@condition Invisible|XPHB} mark on that object and invisibly inscribes the object's name on the sapphire. Each time you cast this spell, you must use a different sapphire.",
      "Thereafter, you can take a {@action Magic|XPHB} action to speak the object's name and crush the sapphire. The object instantly appears in your hand regardless of physical or planar distances, and the spell ends.",
      "If another creature is holding or carrying the object, crushing the sapphire doesn't transport it, but instead you learn who that creature is and where that creature is currently located.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Eyebite",
    source: "LDJ2024",
    page: 270,
    level: 6,
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
      "For the duration, your eyes become an inky void. One creature of your choice within 60 feet of you that you can see must succeed on a Wisdom saving throw or be affected by one of the following effects of your choice for the duration.",
      "On each of your turns until the spell ends, you can take a {@action Magic|XPHB} action to target another creature but can't target a creature again if it has succeeded on a save against this casting of the spell.",
      {
        type: "entries",
        name: "Asleep",
        entries: [
          "The target has the {@condition Unconscious|XPHB} condition. It wakes up if it takes any damage or if another creature takes an action to shake it awake.",
        ],
      },
      {
        type: "entries",
        name: "Panicked",
        entries: [
          "The target has the {@condition Frightened|XPHB} condition. On each of its turns, the {@condition Frightened|XPHB} target must take the {@action Dash|XPHB} action and move away from you by the safest and shortest route available. If the target moves to a space at least 60 feet away from you where it can't see you, this effect ends.",
        ],
      },
      {
        type: "entries",
        name: "Sickened",
        entries: ["The target has the {@condition Poisoned|XPHB} condition."],
      },
    ],
    conditionInflict: ["frightened", "unconscious"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Find the Path",
    source: "LDJ2024",
    page: 273,
    level: 6,
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
      m: {
        text: "a set of divination tools—such as cards or runes—worth 100+ GP",
        cost: 10000,
      },
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "day",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      'You magically sense the most direct physical route to a location you name. You must be familiar with the location, and the spell fails if you name a destination on another plane of existence, a moving destination (such as a mobile fortress), or an unspecific destination (such as "a green dragon\'s lair").',
      "For the duration, as long as you are on the same plane of existence as the destination, you know how far it is and in what direction it lies. Whenever you face a choice of paths along the way there, you know which path is the most direct.",
    ],
  },
  {
    name: "Flesh to Stone",
    source: "LDJ2024",
    page: 275,
    level: 6,
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
      m: "a cockatrice feather",
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
      "You attempt to turn one creature that you can see within range into stone. The target makes a Constitution saving throw. On a failed save, it has the {@condition Restrained|XPHB} condition for the duration. On a successful save, its {@variantrule Speed|XPHB} is 0 until the start of your next turn. Constructs automatically succeed on the save.",
      "A {@condition Restrained|XPHB} target makes another Constitution saving throw at the end of each of its turns. If it successfully saves against this spell three times, the spell ends. If it fails its saves three times, it is turned to stone and has the {@condition Petrified|XPHB} condition for the duration. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind.",
      "If you maintain your {@status Concentration|XPHB} on this spell for the entire possible duration, the target is {@condition Petrified|XPHB} until the condition is ended by {@spell Greater Restoration|XPHB} or similar magic.",
    ],
    conditionInflict: ["petrified", "restrained"],
    savingThrow: ["constitution"],
    miscTags: ["PRM", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Forbiddance",
    source: "LDJ2024",
    page: 276,
    level: 6,
    school: "abjuration",
    castingTime: [
      {
        number: 10,
        unit: "minute",
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
        text: "ruby dust worth 1,000+ GP",
        cost: 100000,
      },
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "day",
          amount: 1,
        },
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "You create a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 30 feet above the floor. For the duration, creatures can't teleport into the area or use portals, such as those created by the {@spell Gate|XPHB} spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents creatures from accessing the area by way of the Astral Plane, the Ethereal Plane, the Feywild, the Shadowfell, or the {@spell Plane Shift|XPHB} spell.",
      "In addition, the spell damages types of creatures that you choose when you cast it. Choose one or more of the following: Aberrations, Celestials, Elementals, Fey, Fiends, and Undead. When a creature of a chosen type enters the spell's area for the first time on a turn or ends its turn there, the creature takes {@damage 5d10} Radiant or Necrotic damage (your choice when you cast this spell).",
      "You can designate a password when you cast the spell. A creature that speaks the password as it enters the area takes no damage from the spell.",
      "The spell's area can't overlap with the area of another Forbiddance spell. If you cast {@spell Forbiddance|XPHB} every day for 30 days in the same location, the spell lasts until it is dispelled, and the Material components are consumed on the last casting.",
    ],
    damageInflict: ["necrotic", "radiant"],
    affectsCreatureType: [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead",
    ],
    miscTags: ["PIR", "PRM"],
  },
  {
    name: "Globe of Invulnerability",
    source: "LDJ2024",
    page: 279,
    level: 6,
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
      m: "a glass bead",
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
      "An immobile, shimmering barrier appears in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} around you and remains for the duration.",
      "Any spell of level 5 or lower cast from outside the barrier can't affect anything within it. Such a spell can target creatures and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from areas of effect created by such spells.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The barrier blocks spells of 1 level higher for each spell slot level above 6.",
        ],
      },
    ],
    areaTags: ["S"],
  },
  {
    name: "Guards and Wards",
    source: "LDJ2024",
    page: 282,
    level: 6,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a silver rod worth 10+ GP",
        cost: 1000,
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
      "You create a ward that protects up to 2,500 square feet of floor space. The warded area can be up to 20 feet tall, and you shape it as one 50-foot square, one hundred 5-foot squares that are contiguous, or twenty-five 10-foot squares that are contiguous.",
      "When you cast this spell, you can specify individuals that are unaffected by the spell's effects. You can also specify a password that, when spoken aloud within 5 feet of the warded area, makes the speaker immune to its effects.",
      "The spell creates the effects below within the warded area. {@spell Dispel Magic|XPHB} has no effect on Guards and Wards itself, but each of the following effects can be dispelled. If all four are dispelled, Guards and Wards ends. If you cast the spell every day for 365 days on the same area, the spell thereafter lasts until all its effects are dispelled.",
      {
        type: "entries",
        name: "Corridors",
        entries: [
          "Fog fills all the warded corridors, making them {@variantrule Heavily Obscured|XPHB}. In addition, at each intersection or branching passage offering a choice of direction, there is a {@chance 50|||Disoriented!|No effect} chance that a creature other than you believes it is going in the opposite direction from the one it chooses.",
        ],
      },
      {
        type: "entries",
        name: "Doors",
        entries: [
          "All doors in the warded area are magically locked, as if sealed by the {@spell Arcane Lock|XPHB} spell. In addition, you can cover up to ten doors with an illusion to make them appear as plain sections of wall.",
        ],
      },
      {
        type: "entries",
        name: "Stairs",
        entries: [
          "Webs fill all stairs in the warded area from top to bottom, as in the {@spell Web|XPHB} spell. These strands regrow in 10 minutes if they are destroyed while Guards and Wards lasts.",
        ],
      },
      {
        type: "entries",
        name: "Other Spell Effect",
        entries: [
          "Place one of the following magical effects within the warded area:",
          {
            type: "list",
            items: [
              "{@spell Dancing Lights|XPHB} in four corridors, with a simple program that the lights repeat as long as Guards and Wards lasts",
              "{@spell Magic Mouth|XPHB} in two locations",
              "{@spell Stinking Cloud|XPHB} in two locations (the vapors return within 10 minutes if dispersed while Guards and Wards lasts)",
              "{@spell Gust of Wind|XPHB} in one corridor or room (the wind blows continuously while the spell lasts)",
              "{@spell Suggestion|XPHB} in one 5-foot square; any creature that enters that square receives the suggestion mentally",
            ],
          },
        ],
      },
    ],
    miscTags: ["OBS", "PIR"],
    areaTags: ["Q"],
  },
  {
    name: "Harm",
    source: "LDJ2024",
    page: 283,
    level: 6,
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
      "You unleash virulent magic on a creature you can see within range. The target makes a Constitution saving throw. On a failed save, it takes {@damage 14d6} Necrotic damage, and its {@variantrule Hit Points|XPHB|Hit Point} maximum is reduced by an amount equal to the Necrotic damage it took. On a successful save, it takes half as much damage only. This spell can't reduce a target's {@variantrule Hit Points|XPHB|Hit Point} maximum below 1.",
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["constitution"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Heal",
    source: "LDJ2024",
    page: 284,
    level: 6,
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
      "Choose a creature that you can see within range. Positive energy washes through the target, restoring 70 {@variantrule Hit Points|XPHB}. This spell also ends the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Poisoned|XPHB} conditions on the target.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 70|6-9|10} for each spell slot level above 6.",
        ],
      },
    ],
    miscTags: ["HL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Heroes' Feast",
    source: "LDJ2024",
    page: 284,
    level: 6,
    school: "conjuration",
    castingTime: [
      {
        number: 10,
        unit: "minute",
      },
    ],
    range: {
      type: "cube",
      distance: {
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a gem-encrusted bowl worth 1,000+ GP, which the spell consumes",
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
      "You conjure a feast that appears on a surface in an unoccupied 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} next to you. The feast takes 1 hour to consume and disappears at the end of that time, and the beneficial effects don't set in until this hour is over. Up to twelve creatures can partake of the feast.",
      "A creature that partakes gains several benefits, which last for 24 hours. The creature has {@variantrule Resistance|XPHB} to Poison damage, and it has {@variantrule Immunity|XPHB} to the {@condition Frightened|XPHB} and {@condition Poisoned|XPHB} conditions. Its {@variantrule Hit Points|XPHB|Hit Point} maximum also increases by {@dice 2d10}, and it gains the same number of {@variantrule Hit Points|XPHB}.",
    ],
    damageImmune: ["poison"],
    conditionImmune: ["frightened", "poisoned"],
    miscTags: ["HL"],
    areaTags: ["C", "MT"],
  },
  {
    name: "Magic Jar",
    source: "LDJ2024",
    page: 294,
    level: 6,
    school: "necromancy",
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
      m: {
        text: "a gem, crystal, or reliquary worth 500+ GP",
        cost: 50000,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel"],
      },
    ],
    entries: [
      "Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell's Material component. While your soul inhabits the container, you are aware of your surroundings as if you were in the container's space. You can't move or take Reactions. The only action you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a Humanoid's body.",
      "You can attempt to possess any Humanoid within 100 feet of you that you can see (creatures warded by a {@spell Protection from Evil and Good|XPHB} or {@spell Magic Circle|XPHB} spell can't be possessed). The target makes a Charisma saving throw. On a failed save, your soul enters the target's body, and the target's soul becomes trapped in the container. On a successful save, the target resists your efforts to possess it, and you can't attempt to possess it again for 24 hours.",
      "Once you possess a creature's body, you control it. Your {@variantrule Hit Points|XPHB}, {@variantrule Hit Point Dice|XPHB}, Strength, Dexterity, Constitution, {@variantrule Speed|XPHB}, and senses are replaced by the creature's. You otherwise keep your game statistics.",
      "Meanwhile, the possessed creature's soul can perceive from the container using its own senses, but it can't move and it is {@condition Incapacitated|XPHB}.",
      "While possessing a body, you can take a {@action Magic|XPHB} action to return from the host body to the container if it is within 100 feet of you, returning the host creature's soul to its body. If the host body dies while you're in it, the creature dies, and you make a Charisma saving throw against your own spellcasting DC. On a success, you return to the container if it is within 100 feet of you. Otherwise, you die.",
      "If the container is destroyed or the spell ends, your soul returns to your body. If your body is more than 100 feet away from you or if your body is dead, you die. If another creature's soul is in the container when it is destroyed, the creature's soul returns to its body if the body is alive and within 100 feet. Otherwise, that creature dies.",
      "When the spell ends, the container is destroyed.",
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["humanoid"],
    miscTags: ["SGT"],
  },
  {
    name: "Mass Suggestion",
    source: "LDJ2024",
    page: 296,
    level: 6,
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
      m: "a snake's tongue",
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
      'You suggest a course of activity—described in no more than 25 words—to twelve or fewer creatures you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to any of the targets or their allies. For example, you could say, "Walk to the village down that road, and help the villagers there harvest crops until sunset." Or you could say, "Now is not the time for violence. Drop your weapons, and dance! Stop in an hour."',
      "Each target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration or until you or your allies deal damage to the target. Each {@condition Charmed|XPHB} target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for a target upon completing it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The duration is longer with a spell slot of level 7 (10 days), 8 (30 days), or 9 (366 days).",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Move Earth",
    source: "LDJ2024",
    page: 302,
    level: 6,
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
      m: "a miniature shovel",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "hour",
          amount: 2,
        },
        concentration: true,
      },
    ],
    entries: [
      "Choose an area of terrain no larger than 40 feet on a side within range. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. For example, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutes for these changes to complete. Because the terrain's transformation occurs slowly, creatures in the area can't usually be trapped or injured by the ground's movement.",
      "At the end of every 10 minutes you spend {@status Concentration|XPHB|Concentrating} on the spell, you can choose a new area of terrain to affect within range.",
      "This spell can't manipulate natural stone or stone construction. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse.",
      "Similarly, this spell doesn't directly affect plant growth. The moved earth carries any plants along with it.",
    ],
    areaTags: ["Q"],
  },
  {
    name: "Otiluke's Freezing Sphere",
    source: "LDJ2024",
    page: 302,
    srd52: "Freezing Sphere",
    level: 6,
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
        amount: 300,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a miniature crystal sphere",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A frigid globe streaks from you to a point of your choice within range, where it explodes in a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. Each creature in that area makes a Constitution saving throw, taking {@damage 10d6} Cold damage on failed save or half as much damage on a successful one.",
      "If the globe strikes a body of water, it freezes the water to a depth of 6 inches over an area 30 feet square. This ice lasts for 1 minute. Creatures that were swimming on the surface of frozen water are trapped in the ice and have the {@condition Restrained|XPHB} condition. A trapped creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC to break free.",
      "You can refrain from firing the globe after completing the spell's casting. If you do so, a globe about the size of a sling bullet, cool to the touch, appears in your hand. At any time, you or a creature you give the globe to can throw the globe (to a range of 40 feet) or hurl it with a sling (to the sling's normal range). It shatters on impact, with the same effect as a normal casting of the spell. You can also set the globe down without shattering it. After 1 minute, if the globe hasn't already shattered, it explodes.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 10d6|6-9|1d6} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["cold"],
    savingThrow: ["constitution"],
    abilityCheck: ["strength"],
    areaTags: ["S"],
  },
  {
    name: "Otto's Irresistible Dance",
    source: "LDJ2024",
    page: 303,
    srd52: "Irresistible Dance",
    level: 6,
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
      "One creature that you can see within range must make a Wisdom saving throw. On a successful save, the target dances comically until the end of its next turn, during which it must spend all its movement to dance in place.",
      "On a failed save, the target has the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB}, the target dances comically, must use all its movement to dance in place, and has {@variantrule Disadvantage|XPHB} on Dexterity saving throws and attack rolls, and other creatures have {@variantrule Advantage|XPHB} on attack rolls against it. On each of its turns, the target can take an action to collect itself and repeat the save, ending the spell on itself on a success.",
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Planar Ally",
    source: "LDJ2024",
    page: 304,
    level: 6,
    school: "conjuration",
    castingTime: [
      {
        number: 10,
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
      s: true,
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You beseech an otherworldly entity for aid. The being must be known to you: a god, a demon prince, or some other being of cosmic power. That entity sends a {@filter Celestial|bestiary|type=celestial|miscellaneous=!swarm}, an {@filter Elemental|bestiary|type=elemental|miscellaneous=!swarm}, or a {@filter Fiend|bestiary|type=fiend|miscellaneous=!swarm} loyal to it to aid you, making the creature appear in an unoccupied space within range. If you know a specific creature's name, you can speak that name when you cast this spell to request that creature, though you might get a different creature anyway (DM's choice).",
      "When the creature appears, it is under no compulsion to behave a particular way. You can ask it to perform a service in exchange for payment, but it isn't obliged to do so. The requested task could range from simple (fly us across the chasm, or help us fight a battle) to complex (spy on our enemies, or protect us during our foray into the dungeon). You must be able to communicate with the creature to bargain for its services.",
      "Payment can take a variety of forms. A Celestial might require a sizable donation of gold or magic items to an allied temple, while a Fiend might demand a living sacrifice or a gift of treasure. Some creatures might exchange their service for a quest undertaken by you.",
      "A task that can be measured in minutes requires a payment worth 100 GP per minute. A task measured in hours requires 1,000 GP per hour. And a task measured in days (up to 10 days) requires 10,000 GP per day. The DM can adjust these payments based on the circumstances under which you cast the spell. If the task is aligned with the creature's ethos, the payment might be halved or even waived. Nonhazardous tasks typically require only half the suggested payment, while especially dangerous tasks might require a greater gift. Creatures rarely accept tasks that seem suicidal.",
      "After the creature completes the task, or when the agreed-upon duration of service expires, the creature returns to its home plane after reporting back to you if possible. If you are unable to agree on a price for the creature's service, the creature immediately returns to its home plane.",
    ],
    miscTags: ["SMN"],
  },
  {
    name: "Programmed Illusion",
    source: "LDJ2024",
    page: 309,
    level: 6,
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
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "jade dust worth 25+ GP",
        cost: 2500,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel"],
      },
    ],
    entries: [
      "You create an illusion of an object, a creature, or some other visible phenomenon within range that activates when a specific trigger occurs. The illusion is imperceptible until then. It must be no larger than a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}, and you decide when you cast the spell how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutes.",
      "When the trigger you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutes, after which the illusion can be activated again.",
      "The trigger can be as general or as detailed as you like, though it must be based on visual or audible phenomena that occur within 30 feet of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door.",
      "Physical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.",
    ],
    abilityCheck: ["intelligence"],
  },
  {
    name: "Summon Fiend",
    source: "LDJ2024",
    page: 326,
    level: 6,
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
        text: "a bloody vial worth 600+ GP",
        cost: 60000,
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
      "You call forth a fiendish spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Fiendish Spirit|XPHB} stat block. When you cast the spell, choose Demon, Devil, or Yugoloth. The creature resembles a Fiend of the chosen type, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Sunbeam",
    source: "LDJ2024",
    page: 329,
    level: 6,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "line",
      distance: {
        type: "feet",
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a magnifying glass",
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
      "You launch a sunbeam in a 5-foot-wide, 60-foot-long {@variantrule Line [Area of Effect]|XPHB|Line}. Each creature in the {@variantrule Line [Area of Effect]|XPHB|Line} makes a Constitution saving throw. On a failed save, a creature takes {@damage 6d8} Radiant damage and has the {@condition Blinded|XPHB} condition until the start of your next turn. On a successful save, it takes half as much damage only.",
      "Until the spell ends, you can take a {@action Magic|XPHB} action to create a new {@variantrule Line [Area of Effect]|XPHB|Line} of radiance.",
      "For the duration, a mote of brilliant radiance shines above you. It sheds {@variantrule Bright Light|XPHB} in a 30-foot radius and {@variantrule Dim Light|XPHB} for an additional 30 feet. This light is sunlight.",
    ],
    damageInflict: ["radiant"],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    miscTags: ["LGTS"],
    areaTags: ["L"],
  },
  {
    name: "Tasha's Bubbling Cauldron",
    source: "LDJ2024",
    page: 330,
    level: 6,
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
        amount: 5,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a gilded ladle worth 500 + GP",
    },
    duration: [
      {
        type: "timed",
        duration: {
          type: "minute",
          amount: 10,
        },
      },
    ],
    entries: [
      "You conjure a claw-footed cauldron filled with bubbling liquid. The cauldron appears in an unoccupied space on the ground within 5 feet of you and lasts for the duration. The cauldron can't be moved and disappears when the spell ends, along with the bubbling liquid inside it.",
      "The liquid in the cauldron duplicates the properties of a Common or an Uncommon potion of your choice (such as a {@item Potion of Healing|XDMG}). As a {@variantrule Bonus Action|XPHB}, you or an ally can reach into the cauldron and withdraw one potion of that kind. The potion is contained in a vial that disappears when the potion is consumed. The cauldron can produce a number of these potions equal to your spellcasting ability modifier (minimum 1). When the last of these potions is withdrawn from the cauldron, the cauldron disappears, and the spell ends.",
      "Potions obtained from the cauldron that aren't consumed disappear when you cast this spell again.",
    ],
    miscTags: ["HL", "UBA"],
  },
  {
    name: "Transport via Plants",
    source: "LDJ2024",
    page: 334,
    level: 6,
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
          type: "round",
          amount: 1,
        },
      },
    ],
    entries: [
      "This spell creates a magical link between a Large or larger inanimate plant within range and another plant, at any distance, on the same plane of existence. You must have seen or touched the destination plant at least once before. For the duration, any creature can step into the target plant and exit from the destination plant by using 5 feet of movement.",
    ],
    miscTags: ["TP"],
  },
  {
    name: "True Seeing",
    source: "LDJ2024",
    page: 336,
    level: 6,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "mushroom powder worth 25+ GP, which the spell consumes",
        cost: 2500,
        consume: true,
      },
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
      "For the duration, the willing creature you touch has {@sense Truesight|XPHB} with a range of 120 feet.",
    ],
  },
  {
    name: "Wall of Ice",
    source: "LDJ2024",
    page: 339,
    level: 6,
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
      m: "a piece of quartz",
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
      "You create a wall of ice on a solid surface within range. You can form it into a hemispherical dome or a globe with a radius of up to 10 feet, or you can shape a flat surface made up of ten 10-foot-square panels. Each panel must be contiguous with another panel. In any form, the wall is 1 foot thick and lasts for the duration.",
      "If the wall cuts through a creature's space when it appears, the creature is pushed to one side of the wall (you choose which side) and makes a Dexterity saving throw, taking {@damage 10d6} Cold damage on a failed save or half as much damage on a successful one.",
      "The wall is an object that can be damaged and thus breached. It has AC 12 and 30 {@variantrule Hit Points|XPHB} per 10-foot section, and it has {@variantrule Immunity|XPHB} to Cold, Poison, and Psychic damage and {@variantrule Vulnerability|XPHB} to Fire damage. Reducing a 10-foot section of wall to 0 {@variantrule Hit Points|XPHB} destroys it and leaves behind a sheet of frigid air in the space the wall occupied.",
      "A creature moving through the sheet of frigid air for the first time on a turn makes a Constitution saving throw, taking {@damage 5d6} Cold damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage the wall deals when it appears increases by {@scaledamage 10d6|6-9|2d6} and the damage from passing through the sheet of frigid air increases by {@scaledamage 5d6|6-9|1d6} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["cold"],
    savingThrow: ["dexterity", "constitution"],
    areaTags: ["W"],
  },
  {
    name: "Wall of Thorns",
    source: "LDJ2024",
    page: 339,
    level: 6,
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
      m: "a handful of thorns",
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
      "You create a wall of tangled brush bristling with needle-sharp thorns. The wall appears within range on a solid surface and lasts for the duration. You choose to make the wall up to 60 feet long, 10 feet high, and 5 feet thick or a circle that has a 20-foot diameter and is up to 20 feet high and 5 feet thick. The wall blocks line of sight.",
      "When the wall appears, each creature in its area makes a Dexterity saving throw, taking {@damage 7d8} Piercing damage on a failed save or half as much damage on a successful one.",
      "A creature can move through the wall, albeit slowly and painfully. For every 1 foot a creature moves through the wall, it must spend 4 feet of movement. Furthermore, the first time a creature enters a space in the wall on a turn or ends its turn there, the creature makes a Dexterity saving throw, taking {@damage 7d8} Slashing damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Both types of damage increase by {@scaledamage 7d8|6-9|1d8} for each spell slot level above 6.",
        ],
      },
    ],
    damageInflict: ["piercing", "slashing"],
    savingThrow: ["dexterity"],
    areaTags: ["W"],
  },
  {
    name: "Wind Walk",
    source: "LDJ2024",
    page: 341,
    level: 6,
    school: "transmutation",
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
      m: "a candle",
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
      "You and up to ten willing creatures of your choice within range assume gaseous forms for the duration, appearing as wisps of cloud. While in this cloud form, a target has a {@variantrule Fly Speed|XPHB} of 300 feet and can hover; it has {@variantrule Immunity|XPHB} to the {@condition Prone|XPHB} condition; and it has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage. The only actions a target can take in this form are the {@action Dash|XPHB} action or a {@action Magic|XPHB} action to begin reverting to its normal form. Reverting takes 1 minute, during which the target has the {@condition Stunned|XPHB} condition. Until the spell ends, the target can revert to cloud form, which also requires a {@action Magic|XPHB} action followed by a 1-minute transformation.",
      "If a target is in cloud form and flying when the effect ends, the target descends 60 feet per round for 1 minute until it lands, which it does safely. If it can't land after 1 minute, it falls the remaining distance.",
    ],
    conditionInflict: ["stunned"],
    areaTags: ["MT"],
  },
  {
    name: "Word of Recall",
    source: "LDJ2024",
    page: 343,
    level: 6,
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
        amount: 5,
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
      "You and up to five willing creatures within 5 feet of you instantly teleport to a previously designated sanctuary. You and any creatures that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect.",
      "You must designate a location, such as a temple, as a sanctuary by casting this spell there.",
    ],
    miscTags: ["PS", "TP"],
  },
];
