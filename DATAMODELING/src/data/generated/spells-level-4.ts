export const spellsLevel4 = [
  {
    name: "Arcane Eye",
    source: "LDJ2024",
    page: 242,
    level: 4,
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
      m: "a bit of bat fur",
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
      "You create an {@condition Invisible|XPHB}, invulnerable eye within range that hovers for the duration. You mentally receive visual information from the eye, which can see in every direction. It also has {@sense Darkvision|XPHB} with a range of 30 feet.",
      "As a {@variantrule Bonus Action|XPHB}, you can move the eye up to 30 feet in any direction. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter.",
    ],
    miscTags: ["UBA"],
  },
  {
    name: "Aura of Life",
    source: "LDJ2024",
    page: 244,
    level: 4,
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
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Resistance|XPHB} to Necrotic damage, and your {@variantrule Hit Points|XPHB|Hit Point} maximums can't be reduced. If an ally with 0 {@variantrule Hit Points|XPHB} starts its turn in the aura, that ally regains 1 {@variantrule Hit Points|XPHB|Hit Point}.",
    ],
    damageResist: ["necrotic"],
    miscTags: ["HL"],
    areaTags: ["S"],
  },
  {
    name: "Aura of Purity",
    source: "LDJ2024",
    page: 244,
    level: 4,
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
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and your allies have {@variantrule Resistance|XPHB} to Poison damage and {@variantrule Advantage|XPHB} on saving throws to avoid or end effects that include the {@condition Blinded|XPHB}, {@condition Charmed|XPHB}, {@condition Deafened|XPHB}, {@condition Frightened|XPHB}, {@condition Paralyzed|XPHB}, {@condition Poisoned|XPHB}, or {@condition Stunned|XPHB} condition.",
    ],
    damageResist: ["poison"],
    miscTags: ["ADV"],
    areaTags: ["S"],
  },
  {
    name: "Banishment",
    source: "LDJ2024",
    page: 245,
    level: 4,
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
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pentacle",
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
      "One creature that you can see within range must succeed on a Charisma saving throw or be transported to a harmless demiplane for the duration. While there, the target has the {@condition Incapacitated|XPHB} condition. When the spell ends, the target reappears in the space it left or in the nearest unoccupied space if that space is occupied.",
      "If the target is an Aberration, a Celestial, an Elemental, a Fey, or a Fiend, the target doesn't return if the spell lasts for 1 minute. The target is instead transported to a random location on a plane (DM's choice) associated with its creature type.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 4.",
        ],
      },
    ],
    conditionInflict: ["incapacitated"],
    savingThrow: ["charisma"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Blight",
    source: "LDJ2024",
    page: 247,
    level: 4,
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
        amount: 30,
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
      "A creature that you can see within range makes a Constitution saving throw, taking {@damage 8d8} Necrotic damage on a failed save or half as much damage on a successful one. A Plant creature automatically fails the save.",
      "Alternatively, target a nonmagical plant that isn't a creature, such as a tree or shrub. It doesn't make a save; it simply withers and dies.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d8|4-9|1d8} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["constitution"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Charm Monster",
    source: "LDJ2024",
    page: 249,
    level: 4,
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
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "One creature you can see within range makes a Wisdom saving throw. It does so with {@variantrule Advantage|XPHB} if you or your allies are fighting it. On a failed save, the target has the {@condition Charmed|XPHB} condition until the spell ends or until you or your allies damage it. The {@condition Charmed|XPHB} creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you. When the spell ends, the target knows it was {@condition Charmed|XPHB} by you.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 4.",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Compulsion",
    source: "LDJ2024",
    page: 252,
    level: 4,
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
      "Each creature of your choice that you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition until the spell ends.",
      "For the duration, you can take a {@variantrule Bonus Action|XPHB} to designate a direction that is horizontal to you. Each {@condition Charmed|XPHB} target must use as much of its movement as possible to move in that direction on its next turn, taking the safest route. After moving in this way, a target repeats the save, ending the spell on itself on a success.",
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT", "UBA"],
    areaTags: ["MT"],
  },
  {
    name: "Confusion",
    source: "LDJ2024",
    page: 253,
    level: 4,
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
      m: "three nut shells",
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
      "Each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range must succeed on a Wisdom saving throw, or that target can't take Bonus Actions or Reactions and must roll {@dice 1d10} at the start of each of its turns to determine its behavior for that turn, consulting the table below.",
      {
        type: "table",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["1d10", "Behavior for the Turn"],
        rows: [
          [
            "1",
            "The target doesn't take an action, and it uses all its movement to move. Roll {@dice 1d4} for the direction: {@b 1}, north; {@b 2}, east; {@b 3}, south; or {@b 4}, west.",
          ],
          ["2-6", "The target doesn't move or take actions."],
          [
            "7-8",
            "The target doesn't move, and it takes the {@action Attack|XPHB} action to make one melee attack against a random creature within reach. If none are within reach, the target takes no action.",
          ],
          ["9-10", "The target chooses its behavior."],
        ],
      },
      "At the end of each of its turns, an affected target repeats the save, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The {@variantrule Sphere [Area of Effect]|XPHB|Sphere}'s radius increases by 5 feet for each spell slot level above 4.",
        ],
      },
    ],
    savingThrow: ["wisdom"],
    miscTags: ["RO"],
    areaTags: ["S"],
  },
  {
    name: "Conjure Minor Elementals",
    source: "LDJ2024",
    page: 255,
    level: 4,
    school: "conjuration",
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
        amount: 15,
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
      "You conjure spirits from the Elemental Planes that flit around you in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. Until the spell ends, any attack you make deals an extra {@damage 2d8} damage when you hit a creature in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. This damage is Acid, Cold, Fire, or Lightning (your choice when you make the attack).",
      "In addition, the ground in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is {@variantrule Difficult Terrain|XPHB} for your enemies.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d8|4-9|1d8} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning"],
    miscTags: ["AAD", "DFT"],
    areaTags: ["S"],
  },
  {
    name: "Conjure Woodland Beings",
    source: "LDJ2024",
    page: 255,
    level: 4,
    school: "conjuration",
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
          type: "minute",
          amount: 10,
        },
        concentration: true,
      },
    ],
    entries: [
      "You conjure nature spirits that flit around you in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. Whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters the space of a creature you can see and whenever a creature you can see enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, you can force that creature to make a Wisdom saving throw. The creature takes {@damage 5d8} Force damage on a failed save or half as much damage on a successful one. A creature makes this save only once per turn.",
      "In addition, you can take the {@action Disengage|XPHB} action as a {@variantrule Bonus Action|XPHB} for the spell's duration.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 5d8|4-9|1d8} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["force"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT", "UBA"],
  },
  {
    name: "Control Water",
    source: "LDJ2024",
    page: 256,
    level: 4,
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
        amount: 300,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a mixture of water and dust",
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
      "Until the spell ends, you control any water inside an area you choose that is a {@variantrule Cube [Area of Effect]|XPHB|Cube} up to 100 feet on a side, using one of the following effects. As a {@action Magic|XPHB} action on your later turns, you can repeat the same effect or choose a different one.",
      {
        type: "entries",
        name: "Flood",
        entries: [
          "You cause the water level of all standing water in the area to rise by as much as 20 feet. If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a {@chance 25|||Capsizes!|No effect} chance of capsizing.",
          "The water level remains elevated until the spell ends or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts.",
        ],
      },
      {
        type: "entries",
        name: "Part Water",
        entries: [
          "You part water in the area and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains until the spell ends or you choose a different effect. The water then slowly fills in the trench over the course of the next round until the normal water level is restored.",
        ],
      },
      {
        type: "entries",
        name: "Redirect Flow",
        entries: [
          "You cause flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell's area, it resumes its flow based on the terrain. The water continues to move in the direction you chose until the spell ends or you choose a different effect.",
        ],
      },
      {
        type: "entries",
        name: "Whirlpool",
        entries: [
          "You cause a whirlpool to form in the center of the area, which must be at least 50 feet square and 25 feet deep. The whirlpool lasts until you choose a different effect or the spell ends. The whirlpool is 5 feet wide at the base, up to 50 feet wide at the top, and 25 feet tall. Any creature in the water and within 25 feet of the whirlpool is pulled 10 feet toward it. When a creature enters the whirlpool for the first time on a turn or ends its turn there, it makes a Strength saving throw. On a failed save, the creature takes {@damage 2d8} Bludgeoning damage. On a successful save, the creature takes half as much damage. A creature can swim away from the whirlpool only if it first takes an action to pull away and succeeds on a Strength ({@skill Athletics|XPHB}) check against your spell save DC.",
        ],
      },
    ],
    damageInflict: ["bludgeoning"],
    savingThrow: ["strength"],
    abilityCheck: ["strength"],
    miscTags: ["FMV", "OBJ"],
    areaTags: ["C"],
  },
  {
    name: "Death Ward",
    source: "LDJ2024",
    page: 261,
    level: 4,
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
          amount: 8,
        },
      },
    ],
    entries: [
      "You touch a creature and grant it a measure of protection from death. The first time the target would drop to 0 {@variantrule Hit Points|XPHB} before the spell ends, the target instead drops to 1 {@variantrule Hit Points|XPHB|Hit Point}, and the spell ends.",
      "If the spell is still in effect when the target is subjected to an effect that would kill it instantly without dealing damage, that effect is negated against the target, and the spell ends.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Dimension Door",
    source: "LDJ2024",
    page: 262,
    level: 4,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      'You teleport to a location within range. You arrive at exactly the spot desired. It can be a place you can see, one you can visualize, or one you can describe by stating distance and direction, such as "200 feet straight downward" or "300 feet upward to the northwest at a 45-degree angle."',
      "You can also teleport one willing creature. The creature must be within 5 feet of you when you teleport, and it teleports to a space within 5 feet of your destination space.",
      "If you, the other creature, or both would arrive in a space occupied by a creature or completely filled by one or more objects, you and any creature traveling with you each take {@damage 4d6} Force damage, and the teleportation fails.",
    ],
    damageInflict: ["force"],
    miscTags: ["TP"],
  },
  {
    name: "Divination",
    source: "LDJ2024",
    page: 264,
    level: 4,
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
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "incense worth 25+ GP, which the spell consumes",
        cost: 2500,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "This spell puts you in contact with a god or a god's servants. You ask one question about a specific goal, event, or activity to occur within 7 days. The DM offers a truthful reply, which might be a short phrase or cryptic rhyme. The spell doesn't account for circumstances that might change the answer, such as the casting of other spells.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||Random reading!|Regular reading} chance for each casting after the first that you get no answer.",
    ],
  },
  {
    name: "Dominate Beast",
    source: "LDJ2024",
    page: 265,
    level: 4,
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
      "One Beast you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The target has {@variantrule Advantage|XPHB} on the save if you or your allies are fighting it. Whenever the target takes damage, it repeats the save, ending the spell on itself on a success.",
      'You have a telepathic link with the {@condition Charmed|XPHB} target while the two of you are on the same plane of existence. On your turn, you can use this link to issue commands to the target (no action required), such as "{@action Attack|XPHB} that creature," "Move over there," or "Fetch that object." The target does its best to obey on its turn. If it completes an order and doesn\'t receive further direction from you, it acts and moves as it likes, focusing on protecting itself.',
      "You can command the target to take a {@variantrule Reaction|XPHB} but must take your own {@variantrule Reaction|XPHB} to do so.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 5 (up to 10 minutes), 6 (up to 1 hour), or 7+ (up to 8 hours).",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["beast"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Evard's Black Tentacles",
    source: "LDJ2024",
    page: 270,
    srd52: "Black Tentacles",
    level: 4,
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
      m: "a tentacle",
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
      "Squirming, ebony tentacles fill a 20-foot square on ground that you can see within range. For the duration, these tentacles turn the ground in that area into {@variantrule Difficult Terrain|XPHB}.",
      "Each creature in that area makes a Strength saving throw. On a failed save, it takes {@damage 3d6} Bludgeoning damage, and it has the {@condition Restrained|XPHB} condition until the spell ends. A creature also makes that save if it enters the area or ends it turn there. A creature makes that save only once per turn.",
      "A {@condition Restrained|XPHB} creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC, ending the condition on itself on a success.",
    ],
    damageInflict: ["bludgeoning"],
    conditionInflict: ["restrained"],
    savingThrow: ["strength"],
    abilityCheck: ["strength"],
    miscTags: ["DFT", "SGT"],
    areaTags: ["Q"],
  },
  {
    name: "Fabricate",
    source: "LDJ2024",
    page: 271,
    level: 4,
    school: "transmutation",
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
      "You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, or clothes from flax or wool.",
      "Choose raw materials that you can see within range. You can fabricate a Large or smaller object (contained within a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} or eight connected 5-foot Cubes) given a sufficient quantity of material. If you're working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}). The quality of any fabricated objects is based on the quality of the raw materials.",
      "Creatures and magic items can't be created by this spell. You also can't use it to create items that require a high degree of skill—such as weapons and armor—unless you have proficiency with the type of {@item Artisan's Tools|XPHB} used to craft such objects.",
    ],
    miscTags: ["OBJ", "PRM", "SGT"],
  },
  {
    name: "Fire Shield",
    source: "LDJ2024",
    page: 274,
    level: 4,
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
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a bit of phosphorus or a firefly",
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
      "Wispy flames wreathe your body for the duration, shedding {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
      "The flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you {@variantrule Resistance|XPHB} to Cold damage, and the chill shield grants you {@variantrule Resistance|XPHB} to Fire damage.",
      "In addition, whenever a creature within 5 feet of you hits you with a melee attack roll, the shield erupts with flame. The attacker takes {@damage 2d8} Fire damage from a warm shield or {@damage 2d8} Cold damage from a chill shield.",
    ],
    damageResist: ["cold", "fire"],
    damageInflict: ["cold", "fire"],
    miscTags: ["LGT"],
  },
  {
    name: "Fount of Moonlight",
    source: "LDJ2024",
    page: 277,
    level: 4,
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
          amount: 10,
        },
        concentration: true,
      },
    ],
    entries: [
      "A cool light wreathes your body for the duration, emitting {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet.",
      "Until the spell ends, you have {@variantrule Resistance|XPHB} to Radiant damage, and your melee attacks deal an extra {@damage 2d6} Radiant damage on a hit.",
      "In addition, immediately after you take damage from a creature you can see within 60 feet of yourself, you can take a {@variantrule Reaction|XPHB} to force the creature to make a Constitution saving throw. On a failed save, the creature has the {@condition Blinded|XPHB} condition until the end of your next turn.",
    ],
    damageResist: ["radiant"],
    damageInflict: ["radiant"],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    miscTags: ["AAD", "LGT", "SGT"],
  },
  {
    name: "Freedom of Movement",
    source: "LDJ2024",
    page: 277,
    level: 4,
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
      m: "a leather strap",
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
      "You touch a willing creature. For the duration, the target's movement is unaffected by {@variantrule Difficult Terrain|XPHB}, and spells and other magical effects can neither reduce the target's {@variantrule Speed|XPHB} nor cause the target to have the {@condition Paralyzed|XPHB} or {@condition Restrained|XPHB} conditions. The target also has a {@variantrule Swim Speed|XPHB} equal to its {@variantrule Speed|XPHB}.",
      "In addition, the target can spend 5 feet of movement to automatically escape from nonmagical restraints, such as manacles or a creature imposing the {@condition Grappled|XPHB} condition on it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 4.",
        ],
      },
    ],
    conditionImmune: ["paralyzed", "restrained"],
    miscTags: ["SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Giant Insect",
    source: "LDJ2024",
    page: 279,
    level: 4,
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
      "You summon a giant centipede, spider, or wasp (chosen when you cast the spell). It manifests in an unoccupied space you can see within range and uses the {@creature Giant Insect|XPHB} stat block. The form you choose determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    miscTags: ["SMN"],
  },
  {
    name: "Grasping Vine",
    source: "LDJ2024",
    page: 280,
    level: 4,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
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
      "You conjure a vine that sprouts from a surface in an unoccupied space that you can see within range. The vine lasts for the duration.",
      "Make a melee spell attack against a creature within 30 feet of the vine. On a hit, the target takes {@damage 4d8} Bludgeoning damage and is pulled up to 30 feet toward the vine; if the target is Huge or smaller, it has the {@condition Grappled|XPHB} condition (escape DC equal to your spell save DC). The vine can grapple only one creature at a time, and you can cause the vine to release a {@condition Grappled|XPHB} creature (no action required).",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can repeat the attack against a creature within 30 feet of the vine.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The number of creatures the vine can grapple increases by one for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["bludgeoning"],
    conditionInflict: ["grappled"],
    spellAttack: ["M"],
    miscTags: ["FMV", "SGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Greater Invisibility",
    source: "LDJ2024",
    page: 281,
    level: 4,
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "A creature you touch has the {@condition Invisible|XPHB} condition until the spell ends.",
    ],
    conditionInflict: ["invisible"],
    areaTags: ["ST"],
  },
  {
    name: "Guardian of Faith",
    source: "LDJ2024",
    page: 281,
    level: 4,
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
      v: true,
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
      "A Large spectral guardian appears and hovers for the duration in an unoccupied space that you can see within range. The guardian occupies that space and is invulnerable, and it appears in a form appropriate for your deity or pantheon.",
      "Any enemy that moves to a space within 10 feet of the guardian for the first time on a turn or starts its turn there makes a Dexterity saving throw, taking 20 Radiant damage on a failed save or half as much damage on a successful one. The guardian vanishes when it has dealt a total of 60 damage.",
    ],
    damageInflict: ["radiant"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
  },
  {
    name: "Hallucinatory Terrain",
    source: "LDJ2024",
    page: 283,
    level: 4,
    school: "illusion",
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
        amount: 300,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a mushroom",
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
      "You make natural terrain in a 150-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} in range look, sound, and smell like another sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and creatures within the area aren't changed.",
      "The tactile characteristics of the terrain are unchanged, so creatures entering the area are likely to notice the illusion. If the difference isn't obvious by touch, a creature examining the illusion can take the {@action Study|XPHB} action to make an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC to disbelieve it. If a creature discerns that the terrain is illusory, the creature sees a vague image superimposed on the real terrain.",
    ],
    abilityCheck: ["intelligence"],
    areaTags: ["C"],
  },
  {
    name: "Ice Storm",
    source: "LDJ2024",
    page: 287,
    level: 4,
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
      m: "a mitten",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Hail falls in a 20-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. Each creature in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} makes a Dexterity saving throw. A creature takes {@damage 2d10} Bludgeoning damage and {@damage 4d6} Cold damage on a failed save or half as much damage on a successful one.",
      "Hailstones turn ground in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} into {@variantrule Difficult Terrain|XPHB} until the end of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The Bludgeoning damage increases by {@scaledamage 2d8|4-9|1d10} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "cold"],
    savingThrow: ["dexterity"],
    miscTags: ["DFT"],
    areaTags: ["Y"],
  },
  {
    name: "Leomund's Secret Chest",
    source: "LDJ2024",
    page: 290,
    srd52: "Secret Chest",
    level: 4,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a chest, 3 feet by 2 feet by 2 feet, constructed from rare materials worth 5,000+ GP, and a Tiny replica of the chest made from the same materials worth 50+ GP",
        cost: 500000,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel"],
      },
    ],
    entries: [
      "You hide a chest and all its contents on the Ethereal Plane. You must touch the chest and the miniature replica that serve as Material components for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet).",
      "While the chest remains on the Ethereal Plane, you can take a {@action Magic|XPHB} action and touch the replica to recall the chest. It appears in an unoccupied space on the ground within 5 feet of you. You can send the chest back to the Ethereal Plane by taking a {@action Magic|XPHB} action to touch the chest and the replica.",
      "After 60 days, there is a cumulative {@chance 5|||Effect ends!|Effect continues} chance at the end of each day that the spell ends. The spell also ends if you cast this spell again or if the Tiny replica chest is destroyed. If the spell ends and the larger chest is on the Ethereal Plane, the chest remains there for you or someone else to find.",
    ],
    miscTags: ["OBJ", "PRM"],
  },
  {
    name: "Locate Creature",
    source: "LDJ2024",
    page: 292,
    level: 4,
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
        type: "self",
      },
    },
    components: {
      v: true,
      s: true,
      m: "fur from a bloodhound",
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
      "Describe or name a creature that is familiar to you. You sense the direction to the creature's location if that creature is within 1,000 feet of you. If the creature is moving, you know the direction of its movement.",
      "The spell can locate a specific creature known to you or the nearest creature of a specific kind (such as a human or a unicorn) if you have seen such a creature up close—within 30 feet—at least once. If the creature you described or named is in a different form, such as under the effects of a {@spell Flesh to Stone|XPHB} or {@spell Polymorph|XPHB} spell, this spell doesn't locate the creature.",
      "This spell can't locate a creature if any thickness of lead blocks a direct path between you and the creature.",
    ],
  },
  {
    name: "Mordenkainen's Faithful Hound",
    source: "LDJ2024",
    page: 300,
    srd52: "Faithful Hound",
    level: 4,
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
      v: true,
      s: true,
      m: "a silver whistle",
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
      "You conjure a phantom watchdog in an unoccupied space that you can see within range. The hound remains for the duration or until the two of you are more than 300 feet apart from each other.",
      "No one but you can see the hound, and it is intangible and invulnerable. When a Small or larger creature comes within 30 feet of it without first speaking the password that you specify when you cast this spell, the hound starts barking loudly. The hound has {@sense Truesight|XPHB} with a range of 30 feet.",
      "At the start of each of your turns, the hound attempts to bite one enemy within 5 feet of it. That enemy must succeed on a Dexterity saving throw or take {@damage 4d8} Force damage.",
      "On your later turns, you can take a {@action Magic|XPHB} action to move the hound up to 30 feet.",
    ],
    damageInflict: ["force"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
  },
  {
    name: "Mordenkainen's Private Sanctum",
    source: "LDJ2024",
    page: 301,
    srd52: "Private Sanctum",
    level: 4,
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
        type: "feet",
        amount: 120,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a thin sheet of lead",
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
      "You make an area within range magically secure. The area is a {@variantrule Cube [Area of Effect]|XPHB|Cube} that can be as small as 5 feet to as large as 100 feet on each side. The spell lasts for the duration.",
      "When you cast the spell, you decide what sort of security the spell provides, choosing any of the following properties:",
      {
        type: "list",
        items: [
          "Sound can't pass through the barrier at the edge of the warded area.",
          "The barrier of the warded area appears dark and foggy, preventing vision (including {@sense Darkvision|XPHB}) through it.",
          "Sensors created by Divination spells can't appear inside the protected area or pass through the barrier at its perimeter.",
          "Creatures in the area can't be targeted by Divination spells.",
          "Nothing can teleport into or out of the warded area.",
          "Planar travel is blocked within the warded area.",
        ],
      },
      "Casting this spell on the same spot every day for 365 days makes the spell last until dispelled.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can increase the size of the {@variantrule Cube [Area of Effect]|XPHB|Cube} by 100 feet for each spell slot level above 4.",
        ],
      },
    ],
    miscTags: ["PIR", "PRM"],
    areaTags: ["C"],
  },
  {
    name: "Otiluke's Resilient Sphere",
    source: "LDJ2024",
    page: 303,
    srd52: "Resilient Sphere",
    level: 4,
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
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a glass sphere",
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
      "A shimmering sphere encloses a Large or smaller creature or object within range. An unwilling creature must succeed on a Dexterity saving throw or be enclosed for the duration.",
      "Nothing—not physical objects, energy, or other spell effects—can pass through the barrier, in or out, though a creature in the sphere can breathe there. The sphere is immune to all damage, and a creature or object inside can't be damaged by attacks or effects originating from outside, nor can a creature inside the sphere damage anything outside it.",
      "The sphere is weightless and just large enough to contain the creature or object inside. An enclosed creature can take an action to push against the sphere's walls and thus roll the sphere at up to half the creature's {@variantrule Speed|XPHB}. Similarly, the globe can be picked up and moved by other creatures.",
      "A {@spell Disintegrate|XPHB} spell targeting the globe destroys it without harming anything inside.",
    ],
    damageImmune: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "piercing",
      "poison",
      "psychic",
      "radiant",
      "slashing",
      "thunder",
    ],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Phantasmal Killer",
    source: "LDJ2024",
    page: 304,
    level: 4,
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
      "You tap into the nightmares of a creature you can see within range and create an illusion of its deepest fears, visible only to that creature. The target makes a Wisdom saving throw. On a failed save, the target takes {@damage 4d10} Psychic damage and has {@variantrule Disadvantage|XPHB} on ability checks and attack rolls for the duration. On a successful save, the target takes half as much damage, and the spell ends.",
      "For the duration, the target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes the Psychic damage again. On a successful save, the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 4d10|4-9|1d10} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Polymorph",
    source: "LDJ2024",
    page: 306,
    level: 4,
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
      m: "a caterpillar cocoon",
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
      "You attempt to transform a creature that you can see within range into a Beast. The target must succeed on a Wisdom saving throw or shape-shift into Beast form for the duration. That form can be any {@filter Beast|bestiary|type=beast|miscellaneous=!swarm} you choose that has a {@variantrule Challenge Rating|XPHB} equal to or less than the target's (or the target's level if it doesn't have a {@variantrule Challenge Rating|XPHB}). The target's game statistics are replaced by the stat block of the chosen Beast, but the target retains its alignment, personality, creature type, {@variantrule Hit Points|XPHB}, and {@variantrule Hit Point Dice|XPHB}.",
      "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the Beast form. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The spell ends early on the target if it has no {@variantrule Temporary Hit Points|XPHB} left.",
      "The target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.",
      "The target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment.",
    ],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Staggering Smite",
    source: "LDJ2024",
    page: 320,
    level: 4,
    school: "enchantment",
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
        type: "instant",
      },
    ],
    entries: [
      "The target takes an extra {@damage 4d6} Psychic damage from the attack, and the target must succeed on a Wisdom saving throw or have the {@condition Stunned|XPHB} condition until the end of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The extra damage increases by {@scaledamage 4d6|4-9|1d6} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    conditionInflict: ["stunned"],
    savingThrow: ["wisdom"],
    miscTags: ["AAD"],
  },
  {
    name: "Stone Shape",
    source: "LDJ2024",
    page: 321,
    level: 4,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "soft clay",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You touch a stone object of Medium size or smaller or a section of stone no more than 5 feet in any dimension and form it into any shape you like. For example, you could shape a large rock into a weapon, statue, or coffer, or you could make a small passage through a wall that is 5 feet thick. You could also shape a stone door or its frame to seal the door shut. The object you create can have up to two hinges and a latch, but finer mechanical detail isn't possible.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Stoneskin",
    source: "LDJ2024",
    page: 321,
    level: 4,
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
        type: "timed",
        duration: {
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "Until the spell ends, one willing creature you touch has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage.",
    ],
    damageResist: ["bludgeoning", "piercing", "slashing"],
    areaTags: ["ST"],
  },
  {
    name: "Summon Aberration",
    source: "LDJ2024",
    page: 322,
    level: 4,
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
        text: "a pickled tentacle and an eyeball in a platinum-inlaid vial worth 400+ GP",
        cost: 40000,
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
      "You call forth an aberrant spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Aberrant Spirit|XPHB} stat block. When you cast the spell, choose Beholderkin, Mind Flayer, or Slaad. The creature resembles an Aberration of that kind, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
      "The creature is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don't issue any, it takes the {@action Dodge|XPHB} action and uses its movement to avoid danger.",
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
    name: "Summon Construct",
    source: "LDJ2024",
    page: 324,
    level: 4,
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
        text: "a lockbox worth 400+ GP",
        cost: 40000,
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
      "You call forth the spirit of a Construct. It manifests in an unoccupied space that you can see within range and uses the {@creature Construct Spirit|XPHB} stat block. When you cast the spell, choose a material: Clay, Metal, or Stone. The creature resembles an animate statue (you determine the appearance) made of the chosen material, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Summon Elemental",
    source: "LDJ2024",
    page: 325,
    level: 4,
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
        text: "air, a pebble, ash, and water inside a gold-inlaid vial worth 400+ GP",
        cost: 40000,
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
      "You call forth an Elemental spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Elemental Spirit|XPHB} stat block. When you cast the spell, choose an element: Air, Earth, Fire, or Water. The creature resembles a bipedal form wreathed in the chosen element, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Vitriolic Sphere",
    source: "LDJ2024",
    page: 337,
    level: 4,
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
      m: "a drop of bile",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You point at a location within range, and a glowing, 1-foot-diameter ball of acid streaks there and explodes in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. Each creature in that area makes a Dexterity saving throw. On a failed save, a creature takes {@damage 10d4} Acid damage and another {@damage 5d4} Acid damage at the end of its next turn. On a successful save, a creature takes half the initial damage only.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The initial damage increases by {@scaledamage 10d4|4-9|2d4} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["acid"],
    savingThrow: ["dexterity"],
    areaTags: ["S"],
  },
  {
    name: "Wall of Fire",
    source: "LDJ2024",
    page: 338,
    level: 4,
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
      m: "a piece of charcoal",
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
      "You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.",
      "When the wall appears, each creature in its area makes a Dexterity saving throw, taking {@damage 5d8} Fire damage on a failed save or half as much damage on a successful one.",
      "One side of the wall, selected by you when you cast this spell, deals {@damage 5d8} Fire damage to each creature that ends its turn within 10 feet of that side or inside the wall. A creature takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 5d8|4-9|1d8} for each spell slot level above 4.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    areaTags: ["W"],
  },
];
