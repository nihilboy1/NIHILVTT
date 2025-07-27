export const spellsLevel2 = [
  {
    id: "spell-aid",
    name: "Aid",
    description:
      "Choose up to three creatures within range. Each target's Hit Point maximum and current Hit Points increase by 5 for the duration.",
    source: "LDJ2024",
    page: 239,
    level: 2,
    school: "abjuration",
    components: {
      types: ["verbal", "somatic"],
      material: "a strip of white cloth",
    },
    duration: {
      unit: "hour",
      value: 8,
    },
    effects: [
      {
        type: "activatable_castSpell",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "action",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "creature",
            quantity: 3,
          },
          outcomes: [
            {
              id: "aid-hp-boost",
              type: "modifyVitals",
              on: "success",
              vitals: ["maxHp", "currentHp"],
              amount: 5,
            },
          ],
        },
        scaling: {
          type: "spellSlot",
          perLevel: {
            outcomeId: "aid-hp-boost",
            targetProperty: "amount",
            value: 5,
          },
        },
      },
    ],
  },
  {
    name: "Alter Self",
    source: "LDJ2024",
    page: 239,
    level: 2,
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
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You alter your physical form. Choose one of the following options. Its effects last for the duration, during which you can take a {@action Magic|XPHB} action to replace the option you chose with a different one.",
      {
        type: "entries",
        name: "Aquatic Adaptation",
        entries: [
          "You sprout gills and grow webs between your fingers. You can breathe underwater and gain a {@variantrule Swim Speed|XPHB} equal to your {@variantrule Speed|XPHB}.",
        ],
      },
      {
        type: "entries",
        name: "Change Appearance",
        entries: [
          "You alter your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and other distinguishing characteristics. You can make yourself appear as a member of another species, though none of your statistics change. You can't appear as a creature of a different size, and your basic shape stays the same; if you're bipedal, you can't use this spell to become quadrupedal, for instance. For the duration, you can take a {@action Magic|XPHB} action to change your appearance in this way again.",
        ],
      },
      {
        type: "entries",
        name: "Natural Weapons",
        entries: [
          "You grow claws (Slashing), fangs (Piercing), horns (Piercing), or hooves (Bludgeoning). When you use your {@variantrule Unarmed Strike|XPHB} to deal damage with that new growth, it deals {@damage 1d6} damage of the type in parentheses instead of dealing the normal damage for your {@variantrule Unarmed Strike|XPHB}, and you use your spellcasting ability modifier for the attack and damage rolls rather than using Strength.",
        ],
      },
    ],
    damageInflict: ["bludgeoning", "piercing", "slashing"],
  },
  {
    name: "Animal Messenger",
    source: "LDJ2024",
    page: 240,
    level: 2,
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
      m: "a morsel of food",
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
    meta: {
      ritual: true,
    },
    entries: [
      'A {@filter Tiny Beast|bestiary|size=T|type=beast|miscellaneous=!swarm} of your choice that you can see within range must succeed on a Charisma saving throw, or it attempts to deliver a message for you (if the target\'s {@variantrule Challenge Rating|XPHB} isn\'t 0, it automatically succeeds). You specify a location you have visited and a recipient who matches a general description, such as "a person dressed in the uniform of the town guard" or "a red-haired dwarf wearing a pointed hat." You also communicate a message of up to twenty-five words. The Beast travels for the duration toward the specified location, covering about 25 miles per 24 hours or 50 miles if the Beast can fly.',
      "When the Beast arrives, it delivers your message to the creature that you described, mimicking your communication. If the Beast doesn't reach its destination before the spell ends, the message is lost, and the Beast returns to where you cast the spell.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The spell's duration increases by 48 hours for each spell slot level above 2.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["beast"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Arcane Lock",
    source: "LDJ2024",
    page: 242,
    level: 2,
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
        text: "gold dust worth 25+ GP, which the spell consumes",
        cost: 2500,
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
      "You touch a closed door, window, gate, container, or hatch and magically lock it for the duration. This lock can't be unlocked by any nonmagical means. You and any creatures you designate when you cast the spell can open and close the object despite the lock. You can also set a password that, when spoken within 5 feet of the object, unlocks it for 1 minute.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Arcane Vigor",
    source: "LDJ2024",
    page: 242,
    level: 2,
    school: "abjuration",
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You tap into your life force to heal yourself. Roll one or two of your unexpended {@variantrule Hit Point Dice|XPHB}, and regain a number of {@variantrule Hit Points|XPHB} equal to the roll's total plus your spellcasting ability modifier. Those dice are then expended.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The number of unexpended Hit Dice you can roll increases by one for each spell slot level above 2.",
        ],
      },
    ],
    miscTags: ["HL"],
  },
  {
    name: "Augury",
    source: "LDJ2024",
    page: 244,
    level: 2,
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
        text: "specially marked sticks, bones, cards, or other divinatory tokens worth 25+ GP",
        cost: 2500,
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
      "You receive an omen from an otherworldly entity about the results of a course of action that you plan to take within the next 30 minutes. The DM chooses the omen from the Omens table.",
      {
        type: "table",
        caption: "Omens",
        colStyles: ["col-4", "col-8"],
        colLabels: ["Omen", "For Results That Will Be..."],
        rows: [
          ["Weal", "Good"],
          ["Woe", "Bad"],
          ["Weal and woe", "Good and bad"],
          ["Indifference", "Neither good nor bad"],
        ],
      },
      "The spell doesn't account for circumstances, such as other spells, that might change the results.",
      "If you cast the spell more than once before finishing a {@variantrule Long Rest|XPHB}, there is a cumulative {@chance 25|||Random reading!|Regular reading} chance for each casting after the first that you get no answer.",
    ],
  },
  {
    name: "Barkskin",
    source: "LDJ2024",
    page: 245,
    level: 2,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a handful of oak bark",
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
      "You touch a willing creature. Until the spell ends, the target's skin assumes a bark-like appearance, and the target has an {@variantrule Armor Class|XPHB} of 17 if its AC is lower than that.",
    ],
    miscTags: ["MAC"],
    areaTags: ["ST"],
  },
  {
    name: "Beast Sense",
    source: "LDJ2024",
    page: 245,
    level: 2,
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
    meta: {
      ritual: true,
    },
    entries: [
      "You touch a willing Beast. For the duration, you can perceive through the Beast's senses as well as your own. When perceiving through the Beast's senses, you benefit from any special senses it has.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Blindness/Deafness",
    source: "LDJ2024",
    page: 248,
    level: 2,
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
    entries: [
      "One creature that you can see within range must succeed on a Constitution saving throw, or it has the {@condition Blinded|XPHB} or {@condition Deafened|XPHB} condition (your choice) for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 2.",
        ],
      },
    ],
    conditionInflict: ["blinded", "deafened"],
    savingThrow: ["constitution"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Blur",
    source: "LDJ2024",
    page: 248,
    level: 2,
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
      "Your body becomes blurred. For the duration, any creature has {@variantrule Disadvantage|XPHB} on attack rolls against you. An attacker is immune to this effect if it perceives you with {@sense Blindsight|XPHB} or {@sense Truesight|XPHB}.",
    ],
  },
  {
    name: "Calm Emotions",
    source: "LDJ2024",
    page: 249,
    level: 2,
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
      "Each Humanoid in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range must succeed on a Charisma saving throw or be affected by one of the following effects (choose for each creature):",
      {
        type: "list",
        items: [
          "The creature has {@variantrule Immunity|XPHB} to the {@condition Charmed|XPHB} and {@condition Frightened|XPHB} conditions until the spell ends. If the creature was already {@condition Charmed|XPHB} or {@condition Frightened|XPHB}, those conditions are suppressed for the duration.",
          "The creature becomes {@variantrule Indifferent [Attitude]|XPHB|Indifferent} about creatures of your choice that it's {@variantrule Hostile [Attitude]|XPHB|Hostile} toward. This indifference ends if the target takes damage or witnesses its allies taking damage. When the spell ends, the creature's attitude returns to normal.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["humanoid"],
    areaTags: ["S"],
  },
  {
    name: "Cloud of Daggers",
    source: "LDJ2024",
    page: 251,
    level: 2,
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
      m: "a sliver of glass",
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
      "You conjure spinning daggers in a 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} centered on a point within range. Each creature in that area takes {@damage 4d4} Slashing damage. A creature also takes this damage if it enters the {@variantrule Cube [Area of Effect]|XPHB|Cube} or ends its turn there or if the {@variantrule Cube [Area of Effect]|XPHB|Cube} moves into its space. A creature takes this damage only once per turn.",
      "On your later turns, you can take a {@action Magic|XPHB} action to teleport the {@variantrule Cube [Area of Effect]|XPHB|Cube} up to 30 feet.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 4d4|2-9|2d4} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["slashing"],
    areaTags: ["C"],
  },
  {
    name: "Continual Flame",
    source: "LDJ2024",
    page: 256,
    level: 2,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "ruby dust worth 50+ GP, which the spell consumes",
        cost: 5000,
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
      "A flame springs from an object that you touch. The effect casts {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet. It looks like a regular flame, but it creates no heat and consumes no fuel. The flame can be covered or hidden but not smothered or quenched.",
    ],
    miscTags: ["LGT", "OBJ"],
  },
  {
    name: "Cordon of Arrows",
    source: "LDJ2024",
    page: 258,
    level: 2,
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
      m: "four or more arrows or bolts",
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
      "You touch up to four nonmagical Arrows or Bolts and plant them in the ground in your space. Until the spell ends, the ammunition can't be physically uprooted, and whenever a creature other than you enters a space within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take {@damage 2d4} Piercing damage. The piece of ammunition is then destroyed. The spell ends when none of the ammunition remains planted in the ground.",
      "When you cast this spell, you can designate any creatures you choose, and the spell ignores them.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The amount of ammunition that can be affected increases by two for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["piercing"],
    savingThrow: ["dexterity"],
    areaTags: ["S"],
  },
  {
    name: "Crown of Madness",
    source: "LDJ2024",
    page: 259,
    level: 2,
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
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "One creature that you can see within range must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. The creature succeeds automatically if it isn't Humanoid.",
      "A spectral crown appears on the {@condition Charmed|XPHB} target's head, and it must use its action before moving on each of its turns to make a melee attack against a creature other than itself that you mentally choose. The target can act normally on its turn if you choose no creature or if no creature is within its reach. The target repeats the save at the end of each of its turns, ending the spell on itself on a success.",
      "On your later turns, you must take the {@action Magic|XPHB} action to maintain control of the target, or the spell ends.",
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["humanoid"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Darkness",
    source: "LDJ2024",
    page: 260,
    level: 2,
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
      m: "bat fur and a piece of coal",
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
      "For the duration, magical {@variantrule Darkness|XPHB} spreads from a point within range and fills a 15-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. {@sense Darkvision|XPHB} can't see through it, and nonmagical light can't illuminate it.",
      "Alternatively, you cast the spell on an object that isn't being worn or carried, causing the {@variantrule Darkness|XPHB} to fill a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the {@variantrule Darkness|XPHB}.",
      "If any of this spell's area overlaps with an area of {@variantrule Bright Light|XPHB} or {@variantrule Dim Light|XPHB} created by a spell of level 2 or lower, that other spell is dispelled.",
    ],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Darkvision",
    source: "LDJ2024",
    page: 260,
    level: 2,
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
      m: "a dried carrot",
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
      "For the duration, a willing creature you touch has {@sense Darkvision|XPHB} with a range of 150 feet.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Detect Thoughts",
    source: "LDJ2024",
    page: 262,
    level: 2,
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
      m: "1 Copper Piece",
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
      "You activate one of the effects below. Until the spell ends, you can activate either effect as a {@action Magic|XPHB} action on your later turns.",
      {
        type: "entries",
        name: "Sense Thoughts",
        entries: [
          "You sense the presence of thoughts within 30 feet of yourself that belong to creatures that know languages or are telepathic. You don't read the thoughts, but you know that a thinking creature is present.",
          "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
        ],
      },
      {
        type: "entries",
        name: "Read Thoughts",
        entries: [
          "Target one creature you can see within 30 feet of yourself or one creature within 30 feet of yourself that you detected with the Sense Thoughts option. You learn what is most on the target's mind right now. If the target doesn't know any languages and isn't telepathic, you learn nothing.",
          "As a {@action Magic|XPHB} action on your next turn, you can try to probe deeper into the target's mind. If you probe deeper, the target makes a Wisdom saving throw. On a failed save, you discern the target's reasoning, emotions, and something that looms large in its mind (such as a worry, love, or hate). On a successful save, the spell ends. Either way, the target knows that you are probing into its mind, and until you shift your attention away from the target's mind, the target can take an action on its turn to make an Intelligence ({@skill Arcana|XPHB}) check against your spell save DC, ending the spell on a success.",
        ],
      },
    ],
    savingThrow: ["wisdom"],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
  },
  {
    name: "Dragon's Breath",
    source: "LDJ2024",
    page: 266,
    level: 2,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a hot pepper",
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
      "You touch one willing creature, and choose Acid, Cold, Fire, Lightning, or Poison. Until the spell ends, the target can take a {@action Magic|XPHB} action to exhale a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Each creature in that area makes a Dexterity saving throw, taking {@damage 3d6} damage of the chosen type on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d6|2-9|1d6} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning", "poison"],
    savingThrow: ["dexterity"],
    areaTags: ["N", "ST"],
  },
  {
    name: "Enhance Ability",
    source: "LDJ2024",
    page: 268,
    level: 2,
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
      m: "fur or a feather",
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
      "You touch a creature and choose Strength, Dexterity, Intelligence, Wisdom, or Charisma. For the duration, the target has {@variantrule Advantage|XPHB} on ability checks using the chosen ability.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 2. You can choose a different ability for each target.",
        ],
      },
    ],
    miscTags: ["ADV", "SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Enlarge/Reduce",
    source: "LDJ2024",
    page: 268,
    level: 2,
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
      m: "a pinch of powdered iron",
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
      "For the duration, the spell enlarges or reduces a creature or an object you can see within range (see the chosen effect below). A targeted object must be neither worn nor carried. If the target is an unwilling creature, it can make a Constitution saving throw. On a successful save, the spell has no effect.",
      "Everything that a targeted creature is wearing and carrying changes size with it. Any item it drops returns to normal size at once. A thrown weapon or piece of ammunition returns to normal size immediately after it hits or misses a target.",
      {
        type: "entries",
        name: "Enlarge",
        entries: [
          "The target's size increases by one category—from Medium to Large, for example. The target also has {@variantrule Advantage|XPHB} on Strength checks and Strength saving throws. The target's attacks with its enlarged weapons or Unarmed Strikes deal an extra {@damage 1d4} damage on a hit.",
        ],
      },
      {
        type: "entries",
        name: "Reduce",
        entries: [
          "The target's size decreases by one category—from Medium to Small, for example. The target also has {@variantrule Disadvantage|XPHB} on Strength checks and Strength saving throws. The target's attacks with its reduced weapons or Unarmed Strikes deal {@damage 1d4} less damage on a hit (this can't reduce the damage below 1).",
        ],
      },
    ],
    savingThrow: ["constitution"],
    miscTags: ["ADV", "OBJ", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Enthrall",
    source: "LDJ2024",
    page: 269,
    level: 2,
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
      },
    ],
    entries: [
      "You weave a distracting string of words, causing creatures of your choice that you can see within range to make a Wisdom saving throw. Any creature you or your companions are fighting automatically succeeds on this save. On a failed save, a target has a -10 penalty to Wisdom ({@skill Perception|XPHB}) checks and Passive {@skill Perception|XPHB} until the spell ends.",
    ],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Find Steed",
    source: "LDJ2024",
    page: 272,
    level: 2,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You summon an otherworldly being that appears as a loyal steed in an unoccupied space of your choice within range. This creature uses the {@creature Otherworldly Steed|XPHB} stat block. If you already have a steed from this spell, the steed is replaced by the new one.",
      "The steed resembles a Large, rideable animal of your choice, such as a horse, a camel, a dire wolf, or an elk. Whenever you cast the spell, choose the steed's creature type—Celestial, Fey, or Fiend—which determines certain traits in the stat block.",
      {
        type: "entries",
        name: "Combat",
        entries: [
          "The steed is an ally to you and your allies. In combat, it shares your {@variantrule Initiative|XPHB} count, and it functions as a controlled mount while you ride it (as defined in the rules on {@book mounted combat|XPHB|1|Mounted Combat}). If you have the {@condition Incapacitated|XPHB} condition, the steed takes its turn immediately after yours and acts independently, focusing on protecting you.",
        ],
      },
      {
        type: "entries",
        name: "Disappearance of the Steed",
        entries: [
          "The steed disappears if it drops to 0 {@variantrule Hit Points|XPHB} or if you die. When it disappears, it leaves behind anything it was wearing or carrying. If you cast this spell again, you decide whether you summon the steed that disappeared or a different one.",
        ],
      },
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
    miscTags: ["PRM", "SMN"],
  },
  {
    name: "Find Traps",
    source: "LDJ2024",
    page: 273,
    level: 2,
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
      "You sense any trap within range that is within line of sight. A trap, for the purpose of this spell, includes any object or mechanism that was created to cause damage or other danger. Thus, the spell would sense the {@spell Alarm|XPHB} or {@spell Glyph of Warding|XPHB} spell or a mechanical pit trap, but it wouldn't reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.",
      "This spell reveals that a trap is present but not its location. You do learn the general nature of the danger posed by a trap you sense.",
    ],
    miscTags: ["SGT"],
  },
  {
    name: "Flame Blade",
    source: "LDJ2024",
    page: 275,
    level: 2,
    school: "evocation",
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
      m: "a sumac leaf",
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
      "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke it again as a {@variantrule Bonus Action|XPHB}.",
      "As a {@action Magic|XPHB} action, you can make a melee spell attack with the fiery blade. On a hit, the target takes Fire damage equal to {@damage 3d6} plus your spellcasting ability modifier.",
      "The flaming blade sheds {@variantrule Bright Light|XPHB} in a 10-foot radius and {@variantrule Dim Light|XPHB} for an additional 10 feet.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d6|2-9|1d6} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["fire"],
    spellAttack: ["M"],
    miscTags: ["LGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Flaming Sphere",
    source: "LDJ2024",
    page: 275,
    level: 2,
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
      m: "a ball of wax",
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
      "You create a 5-foot-diameter sphere of fire in an unoccupied space on the ground within range. It lasts for the duration. Any creature that ends its turn within 5 feet of the sphere makes a Dexterity saving throw, taking {@damage 2d6} Fire damage on a failed save or half as much damage on a successful one.",
      "As a {@variantrule Bonus Action|XPHB}, you can move the sphere up to 30 feet, rolling it along the ground. If you move the sphere into a creature's space, that creature makes the save against the sphere, and the sphere stops moving for the turn.",
      "When you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. Flammable objects that aren't being worn or carried start {@hazard burning|XPHB} if touched by the sphere, and it sheds {@variantrule Bright Light|XPHB} in a 20-foot radius and {@variantrule Dim Light|XPHB} for an additional 20 feet.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d6|2-9|1d6} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["LGT", "OBJ", "UBA"],
    areaTags: ["S"],
  },
  {
    name: "Gentle Repose",
    source: "LDJ2024",
    page: 278,
    level: 2,
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
      m: {
        text: "2 Copper Pieces, which the spell consumes",
        consume: true,
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
    meta: {
      ritual: true,
    },
    entries: [
      "You touch a corpse or other remains. For the duration, the target is protected from decay and can't become Undead.",
      "The spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don't count against the time limit of spells such as {@spell Raise Dead|XPHB}.",
    ],
  },
  {
    name: "Gust of Wind",
    source: "LDJ2024",
    page: 282,
    level: 2,
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
      m: "a legume seed",
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
      "A {@variantrule Line [Area of Effect]|XPHB|Line} of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the duration. Each creature in the {@variantrule Line [Area of Effect]|XPHB|Line} must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the {@variantrule Line [Area of Effect]|XPHB|Line}. A creature that ends its turn in the {@variantrule Line [Area of Effect]|XPHB|Line} must make the same save.",
      "Any creature in the {@variantrule Line [Area of Effect]|XPHB|Line} must spend 2 feet of movement for every 1 foot it moves when moving closer to you.",
      "The gust disperses gas or vapor, and it extinguishes candles and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a {@chance 50|||Extinguished!|No effect} chance to extinguish them.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can change the direction in which the {@variantrule Line [Area of Effect]|XPHB|Line} blasts from you.",
    ],
    savingThrow: ["strength"],
    miscTags: ["FMV", "UBA"],
    areaTags: ["L"],
  },
  {
    name: "Heat Metal",
    source: "LDJ2024",
    page: 284,
    level: 2,
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
      m: "a piece of iron and a flame",
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
      "Choose a manufactured metal object, such as a metal weapon or a suit of Heavy or Medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes {@damage 2d8} Fire damage when you cast the spell. Until the spell ends, you can take a {@variantrule Bonus Action|XPHB} on each of your later turns to deal this damage again if the object is within range.",
      "If a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn't drop the object, it has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks until the start of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d8|2-9|1d8} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["constitution"],
    miscTags: ["OBJ", "SGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Hold Person",
    source: "LDJ2024",
    page: 286,
    level: 2,
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
      "Choose a Humanoid that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Paralyzed|XPHB} condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional Humanoid for each spell slot level above 2.",
        ],
      },
    ],
    conditionInflict: ["paralyzed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["humanoid"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Invisibility",
    source: "LDJ2024",
    page: 289,
    level: 2,
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
      m: "an eyelash in gum arabic",
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
      "A creature you touch has the {@condition Invisible|XPHB} condition until the spell ends. The spell ends early immediately after the target makes an attack roll, deals damage, or casts a spell.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 2.",
        ],
      },
    ],
    conditionInflict: ["invisible"],
    miscTags: ["SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Knock",
    source: "LDJ2024",
    page: 290,
    level: 2,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.",
      "A target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.",
      "If the target is held shut by {@spell Arcane Lock|XPHB}, that spell is suppressed for 10 minutes, during which time the target can be opened and closed.",
      "When you cast the spell, a loud knock, audible up to 300 feet away, emanates from the target.",
    ],
    miscTags: ["OBJ", "SGT"],
  },
  {
    name: "Lesser Restoration",
    source: "LDJ2024",
    page: 291,
    level: 2,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
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
        type: "instant",
      },
    ],
    entries: [
      "You touch a creature and end one condition on it: {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, {@condition Paralyzed|XPHB}, or {@condition Poisoned|XPHB}.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Levitate",
    source: "LDJ2024",
    page: 291,
    level: 2,
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
      m: "a metal spring",
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
      "One creature or loose object of your choice that you can see within range rises vertically up to 20 feet and remains suspended there for the duration. The spell can levitate an object that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.",
      "The target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can take a {@action Magic|XPHB} action to move the target, which must remain within the spell's range.",
      "When the spell ends, the target floats gently to the ground if it is still aloft.",
    ],
    savingThrow: ["constitution"],
    miscTags: ["OBJ", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Locate Animals or Plants",
    source: "LDJ2024",
    page: 292,
    level: 2,
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
        type: "instant",
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "Describe or name a specific kind of Beast, Plant creature, or nonmagical plant. You learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present.",
    ],
    affectsCreatureType: ["beast", "plant"],
  },
  {
    name: "Locate Object",
    source: "LDJ2024",
    page: 293,
    level: 2,
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
      m: "a forked twig",
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
      "Describe or name an object that is familiar to you. You sense the direction to the object's location if that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.",
      "The spell can locate a specific object known to you if you have seen it up close—within 30 feet—at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.",
      "This spell can't locate an object if any thickness of lead blocks a direct path between you and the object.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Magic Mouth",
    source: "LDJ2024",
    page: 295,
    level: 2,
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
      m: {
        text: "jade dust worth 10+ GP, which the spell consumes",
        cost: 1000,
        consume: true,
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
      "You implant a message within an object in range—a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn't being worn or carried by another creature. Then speak the message, which must be 25 words or fewer, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message.",
      "When that trigger occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there, so the words appear to come from the object's mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeat its message whenever the trigger occurs.",
      "The trigger can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it.",
    ],
    miscTags: ["OBJ", "SGT"],
  },
  {
    name: "Magic Weapon",
    source: "LDJ2024",
    page: 295,
    level: 2,
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
          amount: 1,
        },
      },
    ],
    entries: [
      "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls. The spell ends early if you cast it again.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The bonus increases to +2 with a level 3-5 spell slot. The bonus increases to +3 with a level 6+ spell slot.",
        ],
      },
    ],
  },
  {
    name: "Melf's Acid Arrow",
    source: "LDJ2024",
    page: 297,
    srd52: "Acid Arrow",
    level: 2,
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
      m: "powdered rhubarb leaf",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes {@damage 4d4} Acid damage and {@damage 2d4} Acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage only.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage (both initial and later) increases by {@scaledamage 4d4;2d4|2-9|1d4} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["acid"],
    spellAttack: ["R"],
    areaTags: ["ST"],
  },
  {
    name: "Mind Spike",
    source: "LDJ2024",
    page: 298,
    level: 2,
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
        amount: 120,
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
      "You drive a spike of psionic energy into the mind of one creature you can see within range. The target makes a Wisdom saving throw, taking {@damage 3d8} Psychic damage on a failed save or half as much damage on a successful one. On a failed save, you also always know the target's location until the spell ends, but only while the two of you are on the same plane of existence. While you have this knowledge, the target can't become hidden from you, and if it has the {@condition Invisible|XPHB} condition, it gains no benefit from that condition against you.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d8|2-9|1d8} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Mirror Image",
    source: "LDJ2024",
    page: 299,
    level: 2,
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
    entries: [
      "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real.",
      "Each time a creature hits you with an attack roll during the spell's duration, roll a {@dice d6} for each of your remaining duplicates. If any of the d6s rolls a 3 or higher, one of the duplicates is hit instead of you, and the duplicate is destroyed. The duplicates otherwise ignore all other damage and effects. The spell ends when all three duplicates are destroyed.",
      "A creature is unaffected by this spell if it has the {@condition Blinded|XPHB} condition, {@sense Blindsight|XPHB}, or {@sense Truesight|XPHB}.",
    ],
  },
  {
    name: "Misty Step",
    source: "LDJ2024",
    page: 299,
    level: 2,
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
      "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.",
    ],
    miscTags: ["SGT", "TP"],
  },
  {
    name: "Moonbeam",
    source: "LDJ2024",
    page: 300,
    level: 2,
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
      m: "a moonseed leaf",
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
      "A silvery beam of pale light shines down in a 5-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. Until the spell ends, {@variantrule Dim Light|XPHB} fills the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, and you can take a {@action Magic|XPHB} action on later turns to move the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} up to 60 feet.",
      "When the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} appears, each creature in it makes a Constitution saving throw. On a failed save, a creature takes {@damage 2d10} Radiant damage, and if the creature is shape-shifted (as a result of the {@spell Polymorph|XPHB} spell, for example), it reverts to its true form and can't shape-shift until it leaves the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}. On a successful save, a creature takes half as much damage only. A creature also makes this save when the spell's area moves into its space and when it enters the spell's area or ends its turn there. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d10|2-9|1d10} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    savingThrow: ["constitution"],
    miscTags: ["LGT"],
    areaTags: ["Y"],
  },
  {
    name: "Nystul's Magic Aura",
    source: "LDJ2024",
    page: 302,
    srd52: "Arcanist's Magic Aura",
    level: 2,
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
      m: "a small square of silk",
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
      "With a touch, you place an illusion on a willing creature or an object that isn't being worn or carried. A creature gains the Mask effect below, and an object gains the False Aura effect below. The effect lasts for the duration. If you cast the spell on the same target every day for 30 days, the illusion lasts until dispelled.",
      {
        type: "entries",
        name: "Mask (Creature)",
        entries: [
          "Choose a creature type other than the target's actual type. Spells and other magical effects treat the target as if it were a creature of the chosen type.",
        ],
      },
      {
        type: "entries",
        name: "False Aura (Object)",
        entries: [
          "You change the way the target appears to spells and magical effects that detect magical auras, such as {@spell Detect Magic|XPHB}. You can make a nonmagical object appear magical, make a magic item appear nonmagical, or change the object's aura so that it appears to belong to a school of magic you choose.",
        ],
      },
    ],
    miscTags: ["OBJ", "PIR", "PRM"],
    areaTags: ["ST"],
  },
  {
    name: "Pass without Trace",
    source: "LDJ2024",
    page: 303,
    level: 2,
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
      m: "ashes from burned mistletoe",
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
      "You radiate a concealing aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. While in the aura, you and each creature you choose have a +10 bonus to Dexterity ({@skill Stealth|XPHB}) checks and leave no tracks.",
    ],
    areaTags: ["MT"],
  },
  {
    name: "Phantasmal Force",
    source: "LDJ2024",
    page: 304,
    level: 2,
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
        amount: 60,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a bit of fleece",
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
      "You attempt to craft an illusion in the mind of a creature you can see within range. The target makes an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other phenomenon that is no larger than a 10-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} and that is perceivable only to the target for the duration. The phantasm includes sound, temperature, and other stimuli.",
      "The target can take a {@action Study|XPHB} action to examine the phantasm with an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If the check succeeds, the target realizes that the phantasm is an illusion, and the spell ends.",
      "While affected by the spell, the target treats the phantasm as if it were real and rationalizes any illogical outcomes from interacting with it. For example, if the target steps through a phantasmal bridge and survives the fall, it believes the bridge exists and something else caused it to fall.",
      "An affected target can even take damage from the illusion if the phantasm represents a dangerous creature or hazard. On each of your turns, such a phantasm can deal {@damage 2d8} Psychic damage to the target if it is in the phantasm's area or within 5 feet of the phantasm. The target perceives the damage as a type appropriate to the illusion.",
    ],
    damageInflict: ["psychic"],
    savingThrow: ["intelligence"],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
  },
  {
    name: "Prayer of Healing",
    source: "LDJ2024",
    page: 307,
    level: 2,
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
      "Up to five creatures of your choice who remain within range for the spell's entire casting gain the benefits of a {@variantrule Short Rest|XPHB} and also regain {@dice 2d8} {@variantrule Hit Points|XPHB}. A creature can't be affected by this spell again until that creature finishes a {@variantrule Long Rest|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 2d8|2-9|1d8} for each spell slot level above 2.",
        ],
      },
    ],
    miscTags: ["HL"],
    areaTags: ["MT"],
  },
  {
    name: "Protection from Poison",
    source: "LDJ2024",
    page: 310,
    level: 2,
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
          amount: 1,
        },
      },
    ],
    entries: [
      "You touch a creature and end the {@condition Poisoned|XPHB} condition on it. For the duration, the target has {@variantrule Advantage|XPHB} on saving throws to avoid or end the {@condition Poisoned|XPHB} condition, and it has {@variantrule Resistance|XPHB} to Poison damage.",
    ],
    damageResist: ["poison"],
    miscTags: ["ADV"],
    areaTags: ["ST"],
  },
  {
    name: "Ray of Enfeeblement",
    source: "LDJ2024",
    page: 311,
    level: 2,
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
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "A beam of enervating energy shoots from you toward a creature within range. The target must make a Constitution saving throw. On a successful save, the target has {@variantrule Disadvantage|XPHB} on the next attack roll it makes until the start of your next turn.",
      "On a failed save, the target has {@variantrule Disadvantage|XPHB} on Strength-based {@variantrule D20 Test|XPHB|D20 Tests} for the duration. During that time, it also subtracts {@dice 1d8} from all its damage rolls. The target repeats the save at the end of each of its turns, ending the spell on a success.",
    ],
    savingThrow: ["constitution"],
    areaTags: ["ST"],
  },
  {
    name: "Rope Trick",
    source: "LDJ2024",
    page: 312,
    level: 2,
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
      m: "a segment of rope",
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
      "You touch a rope. One end of it hovers upward until the rope hangs perpendicular to the ground or the rope reaches a ceiling. At the rope's upper end, an {@condition Invisible|XPHB} 3-foot-by-5-foot portal opens to an extradimensional space that lasts until the spell ends. That space can be reached by climbing the rope, which can be pulled into or dropped out of it.",
      "The space can hold up to eight Medium or smaller creatures. Attacks, spells, and other effects can't pass into or out of the space, but creatures inside it can see through the portal. Anything inside the space drops out when the spell ends.",
    ],
  },
  {
    name: "Scorching Ray",
    source: "LDJ2024",
    page: 313,
    level: 2,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You hurl three fiery rays. You can hurl them at one target within range or at several. Make a ranged spell attack for each ray. On a hit, the target takes {@damage 2d6} Fire damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You create one additional ray for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["fire"],
    spellAttack: ["R"],
    areaTags: ["MT", "ST"],
  },
  {
    name: "See Invisibility",
    source: "LDJ2024",
    page: 314,
    level: 2,
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
      m: "a pinch of talc",
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
      "For the duration, you see creatures and objects that have the {@condition Invisible|XPHB} condition as if they were visible, and you can see into the Ethereal Plane. Creatures and objects there appear ghostly.",
    ],
  },
  {
    name: "Shatter",
    source: "LDJ2024",
    page: 316,
    level: 2,
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
      m: "a chip of mica",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A loud noise erupts from a point of your choice within range. Each creature in a 10-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered there makes a Constitution saving throw, taking {@damage 3d8} Thunder damage on a failed save or half as much damage on a successful one. A Construct has {@variantrule Disadvantage|XPHB} on the save.",
      "A nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d8|2-9|1d8} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["thunder"],
    savingThrow: ["constitution"],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Shining Smite",
    source: "LDJ2024",
    page: 316,
    level: 2,
    school: "transmutation",
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
      "The target hit by the strike takes an extra {@damage 2d6} Radiant damage from the attack. Until the spell ends, the target sheds {@variantrule Bright Light|XPHB} in a 5-foot radius, attack rolls against it have {@variantrule Advantage|XPHB}, and it can't benefit from the {@condition Invisible|XPHB} condition.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d6|2-9|1d6} for each spell slot level above 2.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    miscTags: ["AAD", "ADV", "LGT"],
    areaTags: ["ST"],
  },
  {
    name: "Silence",
    source: "LDJ2024",
    page: 316,
    level: 2,
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
          amount: 10,
        },
        concentration: true,
      },
    ],
    meta: {
      ritual: true,
    },
    entries: [
      "For the duration, no sound can be created within or pass through a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point you choose within range. Any creature or object entirely inside the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} has {@variantrule Immunity|XPHB} to Thunder damage, and creatures have the {@condition Deafened|XPHB} condition while entirely inside it. Casting a spell that includes a Verbal component is impossible there.",
    ],
    damageImmune: ["thunder"],
    conditionInflict: ["deafened"],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Spider Climb",
    source: "LDJ2024",
    page: 319,
    level: 2,
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
      m: "a drop of bitumen and a spider",
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
      "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and along ceilings, while leaving its hands free. The target also gains a {@variantrule Climb Speed|XPHB} equal to its {@variantrule Speed|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 2.",
        ],
      },
    ],
    miscTags: ["SCT"],
  },
  {
    name: "Spike Growth",
    source: "LDJ2024",
    page: 319,
    level: 2,
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
        amount: 150,
      },
    },
    components: {
      v: true,
      s: true,
      m: "seven thorns",
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
      "The ground in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range sprouts hard spikes and thorns. The area becomes {@variantrule Difficult Terrain|XPHB} for the duration. When a creature moves into or within the area, it takes {@damage 2d4} Piercing damage for every 5 feet it travels.",
      "The transformation of the ground is camouflaged to look natural. Any creature that can't see the area when the spell is cast must take a {@action Search|XPHB} action and succeed on a Wisdom ({@skill Perception|XPHB} or {@skill Survival|XPHB}) check against your spell save DC to recognize the terrain as hazardous before entering it.",
    ],
    damageInflict: ["piercing"],
    abilityCheck: ["wisdom"],
    miscTags: ["DFT"],
    areaTags: ["S"],
  },
  {
    name: "Spiritual Weapon",
    source: "LDJ2024",
    page: 319,
    level: 2,
    school: "evocation",
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
      "You create a floating, spectral force that resembles a weapon of your choice and lasts for the duration. The force appears within range in a space of your choice, and you can immediately make one melee spell attack against one creature within 5 feet of the force. On a hit, the target takes Force damage equal to {@damage 1d8} plus your spellcasting ability modifier.",
      "As a {@variantrule Bonus Action|XPHB} on your later turns, you can move the force up to 20 feet and repeat the attack against a creature within 5 feet of it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 1d8|2-9|1d8} for every slot level above 2.",
        ],
      },
    ],
    damageInflict: ["force"],
    spellAttack: ["M"],
    miscTags: ["UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Suggestion",
    source: "LDJ2024",
    page: 321,
    level: 2,
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
      m: "a drop of honey",
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
      'You suggest a course of activity—described in no more than 25 words—to one creature you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to the target or its allies. For example, you could say, "Fetch the key to the cult\'s treasure vault, and give the key to me." Or you could say, "Stop fighting, leave this library peacefully, and don\'t return."',
      "The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration or until you or your allies deal damage to the target. The {@condition Charmed|XPHB} target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for the target upon completing it.",
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Summon Beast",
    source: "LDJ2024",
    page: 322,
    level: 2,
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
        text: "a feather, tuft of fur, and fish tail inside a gilded acorn worth 200+ GP",
        cost: 20000,
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
      "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Bestial Spirit|XPHB} stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Warding Bond",
    source: "LDJ2024",
    page: 340,
    level: 2,
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
        text: "a pair of platinum rings worth 50+ GP each, which you and the target must wear for the duration",
        cost: 5000,
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
      "You touch another creature that is willing and create a mystic connection between you and the target until the spell ends. While the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has {@variantrule Resistance|XPHB} to all damage. Also, each time it takes damage, you take the same amount of damage.",
      "The spell ends if you drop to 0 {@variantrule Hit Points|XPHB} or if you and the target become separated by more than 60 feet. It also ends if the spell is cast again on either of the connected creatures.",
    ],
    miscTags: ["MAC"],
    areaTags: ["ST"],
  },
  {
    name: "Web",
    source: "LDJ2024",
    page: 340,
    level: 2,
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
      m: "a bit of spiderweb",
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
      "You conjure a mass of sticky webbing at a point within range. The webs fill a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} there for the duration. The webs are {@variantrule Difficult Terrain|XPHB}, and the area within them is {@variantrule Lightly Obscured|XPHB}.",
      "If the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet.",
      "The first time a creature enters the webs on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the {@condition Restrained|XPHB} condition while in the webs or until it breaks free.",
      "A creature {@condition Restrained|XPHB} by the webs can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. If it succeeds, it is no longer {@condition Restrained|XPHB}.",
      "The webs are flammable. Any 5-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} of webs exposed to fire burns away in 1 round, dealing {@damage 2d4} Fire damage to any creature that starts its turn in the fire.",
    ],
    damageInflict: ["fire"],
    conditionInflict: ["restrained"],
    savingThrow: ["dexterity"],
    abilityCheck: ["strength"],
    miscTags: ["DFT", "OBS"],
    areaTags: ["C"],
  },
  {
    name: "Zone of Truth",
    source: "LDJ2024",
    page: 343,
    level: 2,
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
          amount: 10,
        },
      },
    ],
    entries: [
      "You create a magical zone that guards against deception in a 15-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range. Until the spell ends, a creature that enters the spell's area for the first time on a turn or starts its turn there makes a Charisma saving throw. On a failed save, a creature can't speak a deliberate lie while in the radius. You know whether a creature succeeds or fails on this save.",
      "An affected creature is aware of the spell and can avoid answering questions to which it would normally respond with a lie. Such a creature can be evasive yet must be truthful.",
    ],
    savingThrow: ["charisma"],
    areaTags: ["S"],
  },
];
