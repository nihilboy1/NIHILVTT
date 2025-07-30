export const spellsLevel3 = [
  {
    name: "Animate Dead",
    source: "LDJ2024",
    page: 240,
    level: 3,
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
      m: "a drop of blood, a piece of flesh, and a pinch of bone dust",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Choose a pile of bones or a corpse of a Medium or Small Humanoid within range. The target becomes an Undead creature: a {@creature Skeleton|XMM} if you chose bones or a {@creature Zombie|XMM} if you chose a corpse.",
      "On each of your turns, you can take a {@variantrule Bonus Action|XPHB} to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move on its next turn, or you can issue a general command, such as to guard a chamber or corridor. If you issue no commands, the creature takes the {@action Dodge|XPHB} action and moves only to avoid harm. Once given an order, the creature continues to follow it until its task is complete.",
      "The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell rather than animating a new creature.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You animate or reassert control over two additional Undead creatures for each spell slot level above 3. Each of the creatures must come from a different corpse or pile of bones.",
        ],
      },
    ],
    affectsCreatureType: ["humanoid"],
    miscTags: ["PRM", "SMN", "UBA"],
  },
  {
    name: "Aura of Vitality",
    source: "LDJ2024",
    page: 244,
    level: 3,
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
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "An aura radiates from you in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. When you create the aura and at the start of each of your turns while it persists, you can restore {@dice 2d6} {@variantrule Hit Points|XPHB} to one creature in it.",
    ],
    miscTags: ["HL"],
    areaTags: ["S"],
  },
  {
    name: "Beacon of Hope",
    source: "LDJ2024",
    page: 245,
    level: 3,
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
      "Choose any number of creatures within range. For the duration, each target has {@variantrule Advantage|XPHB} on Wisdom saving throws and Death Saving Throws and regains the maximum number of {@variantrule Hit Points|XPHB} possible from any healing.",
    ],
    miscTags: ["ADV", "HL"],
    areaTags: ["MT"],
  },
  {
    name: "Bestow Curse",
    source: "LDJ2024",
    page: 246,
    level: 3,
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You touch a creature, which must succeed on a Wisdom saving throw or become cursed for the duration. Until the curse ends, the target suffers one of the following effects of your choice:",
      {
        type: "list",
        items: [
          "Choose one ability. The target has {@variantrule Disadvantage|XPHB} on ability checks and saving throws made with that ability.",
          "The target has {@variantrule Disadvantage|XPHB} on attack rolls against you.",
          "In combat, the target must succeed on a Wisdom saving throw at the start of each of its turns or be forced to take the {@action Dodge|XPHB} action on that turn.",
          "If you deal damage to the target with an attack roll or a spell, the target takes an extra {@damage 1d8} Necrotic damage.",
        ],
      },
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "If you cast this spell using a level 4 spell slot, you can maintain {@status Concentration|XPHB} on it for up to 10 minutes. If you use a level 5+ spell slot, the spell doesn't require {@status Concentration|XPHB}, and the duration becomes 8 hours (level 5-6 slot) or 24 hours (level 7-8 slot). If you use a level 9 spell slot, the spell lasts until dispelled.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["wisdom"],
    miscTags: ["PRM"],
    areaTags: ["ST"],
  },
  {
    name: "Blinding Smite",
    source: "LDJ2024",
    page: 247,
    level: 3,
    school: "evocation",
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
      },
    ],
    entries: [
      "The target hit by the strike takes an extra {@damage 3d8} Radiant damage from the attack, and the target has the {@condition Blinded|XPHB} condition until the spell ends. At the end of each of its turns, the {@condition Blinded|XPHB} target makes a Constitution saving throw, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The extra damage increases by {@scaledamage 3d8|3-9|1d8} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    miscTags: ["AAD"],
  },
  {
    name: "Blink",
    source: "LDJ2024",
    page: 248,
    level: 3,
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
          type: "minute",
          amount: 1,
        },
      },
    ],
    entries: [
      "Roll {@dice 1d6} at the end of each of your turns for the duration. On a roll of 4-6, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell ends instantly if you are already on that plane). While on the Ethereal Plane, you can perceive the plane you left, which is cast in shades of gray, but you can't see anything there more than 60 feet away. You can affect and be affected only by other creatures on the Ethereal Plane, and creatures on the other plane can't perceive you unless they have a special ability that lets them perceive things on the Ethereal Plane.",
      "You return to the other plane at the start of your next turn and when the spell ends if you are on the Ethereal Plane. You return to an unoccupied space of your choice that you can see within 10 feet of the space you left. If no unoccupied space is available within that range, you appear in the nearest unoccupied space.",
    ],
    miscTags: ["SGT"],
  },
  {
    name: "Call Lightning",
    source: "LDJ2024",
    page: 248,
    level: 3,
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
      "A storm cloud appears at a point within range that you can see above yourself. It takes the shape of a {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} that is 10 feet tall with a 60-foot radius.",
      "When you cast the spell, choose a point you can see under the cloud. A lightning bolt shoots from the cloud to that point. Each creature within 5 feet of that point makes a Dexterity saving throw, taking {@damage 3d10} Lightning damage on a failed save or half as much damage on a successful one.",
      "Until the spell ends, you can take a {@action Magic|XPHB} action to call down lightning in that way again, targeting the same point or a different one.",
      "If you're outdoors in a storm when you cast this spell, the spell gives you control over that storm instead of creating a new one. Under such conditions, the spell's damage increases by {@damage 1d10}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d10|3-9|1d10} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["lightning"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
    areaTags: ["S", "Y"],
  },
  {
    name: "Clairvoyance",
    source: "LDJ2024",
    page: 250,
    level: 3,
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
        type: "miles",
        amount: 1,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a focus worth 100+ GP, either a jeweled horn for hearing or a glass eye for seeing",
        cost: 10000,
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
      "You create an {@condition Invisible|XPHB} sensor within range in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, around a corner, or in a grove of trees). The intangible, invulnerable sensor remains in place for the duration.",
      "When you cast the spell, choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As a {@variantrule Bonus Action|XPHB}, you can switch between seeing and hearing.",
      "A creature that sees the sensor (such as a creature benefiting from {@spell See Invisibility|XPHB} or {@sense Truesight|XPHB}) sees a luminous orb about the size of your fist.",
    ],
    miscTags: ["UBA"],
  },
  {
    name: "Conjure Animals",
    source: "LDJ2024",
    page: 254,
    level: 3,
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
      "You conjure nature spirits that appear as a Large pack of spectral, intangible animals in an unoccupied space you can see within range. The pack lasts for the duration, and you choose the spirits' animal form, such as wolves, serpents, or birds.",
      "You have {@variantrule Advantage|XPHB} on Strength saving throws while you're within 5 feet of the pack, and when you move on your turn, you can also move the pack up to 30 feet to an unoccupied space you can see.",
      "Whenever the pack moves within 10 feet of a creature you can see and whenever a creature you can see enters a space within 10 feet of the pack or ends its turn there, you can force that creature to make a Dexterity saving throw. On a failed save, the creature takes {@damage 3d10} Slashing damage. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d10|3-9|1d10} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["slashing"],
    savingThrow: ["dexterity"],
    miscTags: ["ADV", "SGT"],
    areaTags: ["C"],
  },
  {
    name: "Conjure Barrage",
    source: "LDJ2024",
    page: 254,
    level: 3,
    school: "conjuration",
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
      "You brandish the weapon used to cast the spell and conjure similar spectral weapons (or ammunition appropriate to the weapon) that launch forward and then disappear. Each creature of your choice that you can see in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw, taking {@damage 5d8} Force damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 5d8|3-9|1d8} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["force"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
    areaTags: ["N"],
  },
  {
    name: "Counterspell",
    source: "LDJ2024",
    page: 258,
    level: 3,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "reaction",
        condition:
          "which you take when you see a creature within 60 feet of yourself casting a spell with Verbal, Somatic, or Material components",
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
        type: "instant",
      },
    ],
    entries: [
      "You attempt to interrupt a creature in the process of casting a spell. The creature makes a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, {@variantrule Bonus Action|XPHB}, or {@variantrule Reaction|XPHB} used to cast it is wasted. If that spell was cast with a spell slot, the slot isn't expended.",
    ],
    savingThrow: ["constitution"],
    miscTags: ["SGT"],
  },
  {
    name: "Create Food and Water",
    source: "LDJ2024",
    page: 258,
    level: 3,
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
      "You create 45 pounds of food and 30 gallons of fresh water on the ground or in containers within range—both useful in fending off the hazards of malnutrition and dehydration. The food is bland but nourishing and looks like a food of your choice, and the water is clean. The food spoils after 24 hours if uneaten.",
    ],
  },
  {
    name: "Crusader's Mantle",
    source: "LDJ2024",
    page: 259,
    level: 3,
    school: "evocation",
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
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You radiate a magical aura in a 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation}. While in the aura, you and your allies each deal an extra {@damage 1d4} Radiant damage when hitting with a weapon or an {@variantrule Unarmed Strike|XPHB}.",
    ],
    damageInflict: ["radiant"],
    miscTags: ["AAD"],
    areaTags: ["S"],
  },
  {
    name: "Daylight",
    source: "LDJ2024",
    page: 260,
    level: 3,
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
      "For the duration, sunlight spreads from a point within range and fills a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere}. The sunlight's area is {@variantrule Bright Light|XPHB} and sheds {@variantrule Dim Light|XPHB} for an additional 60 feet.",
      "Alternatively, you cast the spell on an object that isn't being worn or carried, causing the sunlight to fill a 60-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the sunlight.",
      "If any of this spell's area overlaps with an area of {@variantrule Darkness|XPHB} created by a spell of level 3 or lower, that other spell is dispelled.",
    ],
    miscTags: ["LGT", "LGTS", "OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Dispel Magic",
    source: "LDJ2024",
    page: 264,
    level: 3,
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
      "Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability ({@dc 10} plus that spell's level). On a successful check, the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You automatically end a spell on the target if the spell's level is equal to or less than the level of the spell slot you use.",
        ],
      },
    ],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Elemental Weapon",
    source: "LDJ2024",
    page: 267,
    level: 3,
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
      "A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra {@damage 1d4} damage of the chosen type when it hits.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "If you use a level 5-6 spell slot, the bonus to attack rolls increases to +2, and the extra damage increases to {@damage 2d4}. If you use a level 7+ spell slot, the bonus increases to +3, and the extra damage increases to {@damage 3d4}.",
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning", "thunder"],
    miscTags: ["AAD"],
  },
  {
    name: "Fear",
    source: "LDJ2024",
    page: 271,
    level: 3,
    school: "illusion",
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
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a white feather",
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
      "Each creature in a 30-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} must succeed on a Wisdom saving throw or drop whatever it is holding and have the {@condition Frightened|XPHB} condition for the duration.",
      "A {@condition Frightened|XPHB} creature takes the {@action Dash|XPHB} action and moves away from you by the safest route on each of its turns unless there is nowhere to move. If the creature ends its turn in a space where it doesn't have line of sight to you, the creature makes a Wisdom saving throw. On a successful save, the spell ends on that creature.",
    ],
    conditionInflict: ["frightened"],
    savingThrow: ["wisdom"],
    areaTags: ["N"],
  },
  {
    name: "Feign Death",
    source: "LDJ2024",
    page: 271,
    level: 3,
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
      m: "a pinch of graveyard dirt",
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
      "You touch a willing creature and put it into a cataleptic state that is indistinguishable from death.",
      "For the duration, the target appears dead to outward inspection and to spells used to determine the target's status. The target has the {@condition Blinded|XPHB} and {@condition Incapacitated|XPHB} conditions, and its {@variantrule Speed|XPHB} is 0.",
      "The target also has {@variantrule Resistance|XPHB} to all damage except Psychic damage, and it has {@variantrule Immunity|XPHB} to the {@condition Poisoned|XPHB} condition.",
    ],
    damageResist: [
      "acid",
      "bludgeoning",
      "cold",
      "fire",
      "force",
      "lightning",
      "necrotic",
      "piercing",
      "poison",
      "radiant",
      "slashing",
      "thunder",
    ],
    conditionImmune: ["poisoned"],
    conditionInflict: ["blinded", "incapacitated"],
    areaTags: ["ST"],
  },
  {
    name: "Fireball",
    source: "LDJ2024",
    page: 274,
    level: 3,
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
      m: "a ball of bat guano and sulfur",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A bright streak flashes from you to a point you choose within range and then blossoms with a low roar into a fiery explosion. Each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes a Dexterity saving throw, taking {@damage 8d6} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the area that aren't being worn or carried start {@hazard burning|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d6|3-9|1d6} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Fly",
    source: "LDJ2024",
    page: 276,
    level: 3,
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
      m: "a feather",
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
      "You touch a willing creature. For the duration, the target gains a {@variantrule Fly Speed|XPHB} of 60 feet and can hover. When the spell ends, the target falls if it is still aloft unless it can stop the fall.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 3.",
        ],
      },
    ],
    miscTags: ["SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Gaseous Form",
    source: "LDJ2024",
    page: 277,
    level: 3,
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
      m: "a bit of gauze",
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
      "A willing creature you touch shape-shifts, along with everything it's wearing and carrying, into a misty cloud for the duration. The spell ends on the target if it drops to 0 {@variantrule Hit Points|XPHB} or if it takes a {@action Magic|XPHB} action to end the spell on itself.",
      "While in this form, the target's only method of movement is a {@variantrule Fly Speed|XPHB} of 10 feet, and it can hover. The target can enter and occupy the space of another creature. The target has {@variantrule Resistance|XPHB} to Bludgeoning, Piercing, and Slashing damage; it has {@variantrule Immunity|XPHB} to the {@condition Prone|XPHB} condition; and it has {@variantrule Advantage|XPHB} on Strength, Dexterity, and Constitution saving throws. The target can pass through narrow openings, but it treats liquids as though they were solid surfaces.",
      "The target can't talk or manipulate objects, and any objects it was carrying or holding can't be dropped, used, or otherwise interacted with. Finally, the target can't attack or cast spells.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 3.",
        ],
      },
    ],
    conditionImmune: ["prone"],
    miscTags: ["ADV", "SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Glyph of Warding",
    source: "LDJ2024",
    page: 279,
    level: 3,
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
        text: "powdered diamond worth 200+ GP, which the spell consumes",
        cost: 20000,
        consume: true,
      },
    },
    duration: [
      {
        type: "permanent",
        ends: ["dispel", "trigger"],
      },
    ],
    entries: [
      "You inscribe a glyph that later unleashes a magical effect. You inscribe it either on a surface (such as a table or a section of floor) or within an object that can be closed (such as a book or chest) to conceal the glyph. The glyph can cover an area no larger than 10 feet in diameter. If the surface or object is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.",
      "The glyph is nearly imperceptible and requires a successful Wisdom ({@skill Perception|XPHB}) check against your spell save DC to notice.",
      "When you inscribe the glyph, you set its trigger and choose whether it's an explosive rune or a spell glyph, as explained below.",
      {
        type: "entries",
        name: "Set the Trigger",
        entries: [
          "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph. Once a glyph is triggered, this spell ends.",
          "You can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password.",
        ],
      },
      {
        type: "entries",
        name: "Explosive Rune",
        entries: [
          "When triggered, the glyph erupts with magical energy in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on the glyph. Each creature in the area makes a Dexterity saving throw. A creature takes {@damage 5d8} Acid, Cold, Fire, Lightning, or Thunder damage (your choice when you create the glyph) on a failed save or half as much damage on a successful one.",
        ],
      },
      {
        type: "entries",
        name: "Spell Glyph",
        entries: [
          "You can store a prepared spell of level 3 or lower in the glyph by casting it as part of creating the glyph. The spell must target a single creature or an area. The spell being stored has no immediate effect when cast in this way.",
          "When the glyph is triggered, the stored spell takes effect. If the spell has a target, it targets the creature that triggered the glyph. If the spell affects an area, the area is centered on that creature. If the spell summons {@variantrule Hostile [Attitude]|XPHB|Hostile} creatures or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires {@status Concentration|XPHB}, it lasts until the end of its full duration.",
        ],
      },
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage of an explosive rune increases by {@scaledamage 5d8|3-9|1d8} for each spell slot level above 3. If you create a spell glyph, you can store any spell of up to the same level as the spell slot you use for the Glyph of Warding.",
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning", "thunder"],
    savingThrow: ["dexterity"],
    abilityCheck: ["wisdom"],
    areaTags: ["S"],
  },
  {
    name: "Haste",
    source: "LDJ2024",
    page: 284,
    level: 3,
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
      m: "a shaving of licorice root",
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
      "Choose a willing creature that you can see within range. Until the spell ends, the target's {@variantrule Speed|XPHB} is doubled, it gains a +2 bonus to {@variantrule Armor Class|XPHB}, it has {@variantrule Advantage|XPHB} on Dexterity saving throws, and it gains an additional action on each of its turns. That action can be used to take only the {@action Attack|XPHB} (one attack only), {@action Dash|XPHB}, {@action Disengage|XPHB}, {@action Hide|XPHB}, or {@action Utilize|XPHB} action.",
      "When the spell ends, the target is {@condition Incapacitated|XPHB} and has a {@variantrule Speed|XPHB} of 0 until the end of its next turn, as a wave of lethargy washes over it.",
    ],
    conditionInflict: ["incapacitated"],
    miscTags: ["ADV", "MAC", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Hunger of Hadar",
    source: "LDJ2024",
    page: 286,
    level: 3,
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
      m: "a pickled tentacle",
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
      "You open a gateway to the Far Realm, a region infested with unspeakable horrors. A 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of {@variantrule Darkness|XPHB} appears, centered on a point with range and lasting for the duration. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is {@variantrule Difficult Terrain|XPHB}, and it is filled with strange whispers and slurping noises, which can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures fully within it have the {@condition Blinded|XPHB} condition.",
      "Any creature that starts its turn in the area takes {@damage 2d6} Cold damage. Any creature that ends its turn there must succeed on a Dexterity saving throw or take {@damage 2d6} Acid damage from otherworldly tentacles.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The Cold or Acid damage (your choice) increases by {@scaledamage 2d6|3-9|1d6} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["acid", "cold"],
    conditionInflict: ["blinded"],
    savingThrow: ["dexterity"],
    miscTags: ["DFT"],
    areaTags: ["S"],
  },
  {
    name: "Hypnotic Pattern",
    source: "LDJ2024",
    page: 287,
    level: 3,
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
      s: true,
      m: "a pinch of confetti",
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
      "You create a twisting pattern of colors in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range. The pattern appears for a moment and vanishes. Each creature in the area who can see the pattern must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. While {@condition Charmed|XPHB}, the creature has the {@condition Incapacitated|XPHB} condition and a {@variantrule Speed|XPHB} of 0.",
      "The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor.",
    ],
    conditionInflict: ["charmed", "incapacitated"],
    savingThrow: ["wisdom"],
    areaTags: ["C"],
  },
  {
    name: "Leomund's Tiny Hut",
    source: "LDJ2024",
    page: 291,
    srd52: "Tiny Hut",
    level: 3,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "minute",
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
      m: "a crystal bead",
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
    meta: {
      ritual: true,
    },
    entries: [
      "A 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} springs into existence around you and remains stationary for the duration. The spell fails when you cast it if the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} isn't big enough to fully encapsulate all creatures in its area.",
      "Creatures and objects within the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} when you cast the spell can move through it freely. All other creatures and objects are barred from passing through it. Spells of level 3 or lower can't be cast through it, and the effects of such spells can't extend into it.",
      "The atmosphere inside the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is comfortable and dry, regardless of the weather outside. Until the spell ends, you can command the interior to have {@variantrule Dim Light|XPHB} or {@variantrule Darkness|XPHB} (no action required). The {@variantrule Emanation [Area of Effect]|XPHB|Emanation} is opaque from the outside and of any color you choose, but it's transparent from the inside.",
      "The spell ends early if you leave the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or if you cast it again.",
    ],
    miscTags: ["LGT"],
    areaTags: ["S"],
  },
  {
    name: "Lightning Arrow",
    source: "LDJ2024",
    page: 292,
    level: 3,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting or missing a target with a ranged attack using a weapon",
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
      "As your attack hits or misses the target, the weapon or ammunition you're using transforms into a lightning bolt. Instead of taking any damage or other effects from the attack, the target takes {@damage 4d8} Lightning damage on a hit or half as much damage on a miss. Each creature within 10 feet of the target then makes a Dexterity saving throw, taking {@damage 2d8} Lightning damage on a failed save or half as much damage on a successful one.",
      "The weapon or ammunition then returns to its normal form.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage for both effects of the spell increases by {@scaledamage 4d8;2d8|3-9|1d8} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["lightning"],
    savingThrow: ["dexterity"],
    areaTags: ["S"],
  },
  {
    name: "Lightning Bolt",
    source: "LDJ2024",
    page: 292,
    level: 3,
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
        amount: 100,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a bit of fur and a crystal rod",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A stroke of lightning forming a 100-foot-long, 5-foot-wide {@variantrule Line [Area of Effect]|XPHB|Line} blasts out from you in a direction you choose. Each creature in the {@variantrule Line [Area of Effect]|XPHB|Line} makes a Dexterity saving throw, taking {@damage 8d6} Lightning damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 8d6|3-9|1d6} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["lightning"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["L"],
  },
  {
    name: "Magic Circle",
    source: "LDJ2024",
    page: 293,
    level: 3,
    school: "abjuration",
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
        text: "salt and powdered silver worth 100+ GP, which the spell consumes",
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
      },
    ],
    entries: [
      "You create a 10-foot-radius, 20-foot-tall {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} of magical energy centered on a point on the ground that you can see within range. Glowing runes appear wherever the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} intersects with the floor or other surface.",
      "Choose one or more of the following types of creatures: Celestials, Elementals, Fey, Fiends, or Undead. The circle affects a creature of the chosen type in the following ways:",
      {
        type: "list",
        items: [
          "The creature can't willingly enter the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} by nonmagical means. If the creature tries to use teleportation or interplanar travel to do so, it must first succeed on a Charisma saving throw.",
          "The creature has {@variantrule Disadvantage|XPHB} on attack rolls against targets within the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}.",
          "Targets within the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} can't be possessed by or gain the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} condition from the creature.",
        ],
      },
      "Each time you cast this spell, you can cause its magic to operate in the reverse direction, preventing a creature of the specified type from leaving the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} and protecting targets outside it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The duration increases by 1 hour for each spell slot level above 3.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    affectsCreatureType: ["celestial", "elemental", "fey", "fiend", "undead"],
    miscTags: ["SGT"],
    areaTags: ["Y"],
  },
  {
    name: "Major Image",
    source: "LDJ2024",
    page: 295,
    level: 3,
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
      m: "a bit of fleece",
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
      "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image appears at a spot that you can see within range and lasts for the duration. It seems real, including sounds, smells, and temperature appropriate to the thing depicted, but it can't deal damage or cause conditions.",
      "If you are within range of the illusion, you can take a {@action Magic|XPHB} action to cause the image to move to any other spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.",
      "Physical interaction with the image reveals it to be an illusion, for things can pass through it. A creature that takes a {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and its other sensory qualities become faint to the creature.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The spell lasts until dispelled, without requiring {@status Concentration|XPHB}, if cast with a level 4+ spell slot.",
        ],
      },
    ],
    abilityCheck: ["intelligence"],
    miscTags: ["PRM", "SGT"],
  },
  {
    name: "Mass Healing Word",
    source: "LDJ2024",
    page: 296,
    level: 3,
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
      "Up to six creatures of your choice that you can see within range regain {@variantrule Hit Points|XPHB} equal to {@dice 2d4} plus your spellcasting ability modifier.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 2d4|3-9|1d4} for each spell slot level above 3.",
        ],
      },
    ],
    miscTags: ["HL", "SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Meld into Stone",
    source: "LDJ2024",
    page: 296,
    level: 3,
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
    meta: {
      ritual: true,
    },
    entries: [
      "You step into a stone object or surface large enough to fully contain your body, merging yourself and your equipment with the stone for the duration. You must touch the stone to do so. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.",
      "While merged with the stone, you can't see what occurs outside it, and any Wisdom ({@skill Perception|XPHB}) checks you make to hear sounds outside it are made with {@variantrule Disadvantage|XPHB}. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use 5 feet of movement to leave the stone where you entered it, which ends the spell. You otherwise can't move.",
      "Minor physical damage to the stone doesn't harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals {@damage 6d6} Force damage to you. The stone's complete destruction (or transmutation into a different substance) expels you and deals 50 Force damage to you. If expelled, you move into an unoccupied space closest to where you first entered and have the {@condition Prone|XPHB} condition.",
    ],
    damageInflict: ["force"],
    conditionInflict: ["prone"],
  },
  {
    name: "Nondetection",
    source: "LDJ2024",
    page: 302,
    level: 3,
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
        text: "a pinch of diamond dust worth 25+ GP, which the spell consumes",
        cost: 2500,
        consume: true,
      },
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
      "For the duration, you hide a target that you touch from Divination spells. The target can be a willing creature, or it can be a place or an object no larger than 10 feet in any dimension. The target can't be targeted by any Divination spell or perceived through magical scrying sensors.",
    ],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Phantom Steed",
    source: "LDJ2024",
    page: 304,
    level: 3,
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
      "A Large, quasi-real, horselike creature appears on the ground in an unoccupied space of your choice within range. You decide the creature's appearance, and it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 10 feet away from the steed.",
      "For the duration, you or a creature you choose can ride the steed. The steed uses the {@creature Riding Horse|XMM} stat block, except it has a {@variantrule Speed|XPHB} of 100 feet and can travel 13 miles in an hour. When the spell ends, the steed gradually fades, giving the rider 1 minute to dismount. The spell ends early if the steed takes any damage.",
    ],
    miscTags: ["SMN"],
  },
  {
    name: "Plant Growth",
    source: "LDJ2024",
    page: 305,
    level: 3,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "action",
        note: "Overgrowth",
      },
      {
        number: 8,
        unit: "hour",
        note: "Enrichment",
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
        type: "instant",
      },
    ],
    entries: [
      "This spell channels vitality into plants. The casting time you use determines whether the spell has the Overgrowth or the Enrichment effect below.",
      {
        type: "entries",
        name: "Overgrowth",
        entries: [
          "Choose a point within range. All normal plants in a 100-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point become thick and overgrown. A creature moving through that area must spend 4 feet of movement for every 1 foot it moves. You can exclude one or more areas of any size within the spell's area from being affected.",
        ],
      },
      {
        type: "entries",
        name: "Enrichment",
        entries: [
          "All plants in a half-mile radius centered on a point within range become enriched for 365 days. The plants yield twice the normal amount of food when harvested. They can benefit from only one Plant Growth per year.",
        ],
      },
    ],
    miscTags: ["DFT"],
  },
  {
    name: "Protection from Energy",
    source: "LDJ2024",
    page: 309,
    level: 3,
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
        concentration: true,
      },
    ],
    entries: [
      "For the duration, the willing creature you touch has {@variantrule Resistance|XPHB} to one damage type of your choice: Acid, Cold, Fire, Lightning, or Thunder.",
    ],
    damageResist: ["acid", "cold", "fire", "lightning", "thunder"],
    areaTags: ["ST"],
  },
  {
    name: "Remove Curse",
    source: "LDJ2024",
    page: 312,
    level: 3,
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
        type: "instant",
      },
    ],
    entries: [
      "At your touch, all curses affecting one creature or object end. If the object is a cursed magic item, its curse remains, but the spell breaks its owner's {@variantrule Attunement|XPHB} to the object so it can be removed or discarded.",
    ],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Revivify",
    source: "LDJ2024",
    page: 312,
    level: 3,
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
        text: "a diamond worth 300+ GP, which the spell consumes",
        cost: 30000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You touch a creature that has died within the last minute. That creature revives with 1 {@variantrule Hit Points|XPHB|Hit Point}. This spell can't revive a creature that has died of old age, nor does it restore any missing body parts.",
    ],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Sending",
    source: "LDJ2024",
    page: 314,
    level: 3,
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
      m: "a copper wire",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You send a short message of 25 words or fewer to a creature you have met or a creature described to you by someone who has met it. The target hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables targets to understand the meaning of your message.",
      "You can send the message across any distance and even to other planes of existence, but if the target is on a different plane than you, there is a {@chance 5|||Message lost!|Message arrives} chance that the message doesn't arrive. You know if the delivery fails.",
      "Upon receiving your message, a creature can block your ability to reach it again with this spell for 8 hours. If you try to send another message during that time, you learn that you are blocked, and the spell fails.",
    ],
  },
  {
    name: "Sleet Storm",
    source: "LDJ2024",
    page: 317,
    level: 3,
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
      m: "a miniature umbrella",
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
      "Until the spell ends, sleet falls in a 40-foot-tall, 20-foot-radius {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point you choose within range. The area is {@variantrule Heavily Obscured|XPHB}, and exposed flames in the area are doused.",
      "Ground in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} is {@variantrule Difficult Terrain|XPHB}. When a creature enters the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the {@condition Prone|XPHB} condition and lose {@status Concentration|XPHB}.",
    ],
    conditionInflict: ["prone"],
    savingThrow: ["dexterity"],
    miscTags: ["DFT", "OBS"],
    areaTags: ["Y"],
  },
  {
    name: "Slow",
    source: "LDJ2024",
    page: 318,
    level: 3,
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
      m: "a drop of molasses",
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
      "You alter time around up to six creatures of your choice in a 40-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range. Each target must succeed on a Wisdom saving throw or be affected by this spell for the duration.",
      "An affected target's {@variantrule Speed|XPHB} is halved, it takes a -2 penalty to AC and Dexterity saving throws, and it can't take Reactions. On its turns, it can take either an action or a {@variantrule Bonus Action|XPHB}, not both, and it can make only one attack if it takes the {@action Attack|XPHB} action. If it casts a spell with a Somatic component, there is a {@chance 25|||The spell fails!|The spell does not fail.} chance the spell fails as a result of the target making the spell's gestures too slowly.",
      "An affected target repeats the save at the end of each of its turns, ending the spell on itself on a success.",
    ],
    savingThrow: ["wisdom"],
    miscTags: ["MAC"],
    areaTags: ["C", "MT"],
  },
  {
    name: "Speak with Dead",
    source: "LDJ2024",
    page: 318,
    level: 3,
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
        amount: 10,
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
          type: "minute",
          amount: 10,
        },
      },
    ],
    entries: [
      "You grant the semblance of life to a corpse of your choice within range, allowing it to answer questions you pose. The corpse must have a mouth, and this spell fails if the deceased creature was Undead when it died. The spell also fails if the corpse was the target of this spell within the past 10 days.",
      "Until the spell ends, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are antagonistic toward it or it recognizes you as an enemy. This spell doesn't return the creature's soul to its body, only its animating spirit. Thus, the corpse can't learn new information, doesn't comprehend anything that has happened since it died, and can't speculate about future events.",
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
  },
  {
    name: "Speak with Plants",
    source: "LDJ2024",
    page: 319,
    level: 3,
    school: "transmutation",
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
      "You imbue plants in an immobile 30-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances.",
      "You can also turn {@variantrule Difficult Terrain|XPHB} caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into {@variantrule Difficult Terrain|XPHB} that lasts for the duration.",
      "The spell doesn't enable plants to uproot themselves and move about, but they can move their branches, tendrils, and stalks for you.",
      "If a Plant creature is in the area, you can communicate with it as if you shared a common language.",
    ],
    affectsCreatureType: ["plant"],
    miscTags: ["DFT"],
  },
  {
    name: "Spirit Guardians",
    source: "LDJ2024",
    page: 319,
    level: 3,
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
      m: "a prayer scroll",
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
      "Protective spirits flit around you in a 15-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} for the duration. If you are good or neutral, their spectral form appears angelic or fey (your choice). If you are evil, they appear fiendish.",
      "When you cast this spell, you can designate creatures to be unaffected by it. Any other creature's {@variantrule Speed|XPHB} is halved in the {@variantrule Emanation [Area of Effect]|XPHB|Emanation}, and whenever the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} enters a creature's space and whenever a creature enters the {@variantrule Emanation [Area of Effect]|XPHB|Emanation} or ends its turn there, the creature must make a Wisdom saving throw. On a failed save, the creature takes {@damage 3d8} Radiant damage (if you are good or neutral) or {@damage 3d8} Necrotic damage (if you are evil). On a successful save, the creature takes half as much damage. A creature makes this save only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d8|3-9|1d8} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["necrotic", "radiant"],
    savingThrow: ["wisdom"],
    areaTags: ["S"],
  },
  {
    name: "Stinking Cloud",
    source: "LDJ2024",
    page: 321,
    level: 3,
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
      m: "a rotten egg",
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
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of yellow, nauseating gas centered on a point within range. The cloud is {@variantrule Heavily Obscured|XPHB}. The cloud lingers in the air for the duration or until a strong wind (such as the one created by {@spell Gust of Wind|XPHB}) disperses it.",
      "Each creature that starts its turn in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} must succeed on a Constitution saving throw or have the {@condition Poisoned|XPHB} condition until the end of the current turn. While {@condition Poisoned|XPHB} in this way, the creature can't take an action or a {@variantrule Bonus Action|XPHB}.",
    ],
    savingThrow: ["constitution"],
    miscTags: ["OBS"],
    areaTags: ["S"],
  },
  {
    name: "Summon Fey",
    source: "LDJ2024",
    page: 326,
    level: 3,
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
        text: "a gilded flower worth 300+ GP",
        cost: 30000,
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
      "You call forth a Fey spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Fey Spirit|XPHB} stat block. When you cast the spell, choose a mood: Fuming, Mirthful, or Tricksy. The creature resembles a Fey creature of your choice marked by the chosen mood, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Summon Undead",
    source: "LDJ2024",
    page: 328,
    level: 3,
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
        amount: 90,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a gilded skull worth 300+ GP",
        cost: 30000,
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
      "You call forth an Undead spirit. It manifests in an unoccupied space that you can see within range and uses the {@creature Undead Spirit|XPHB} stat block. When you cast the spell, choose the creature's form: Ghostly, Putrid, or Skeletal. The spirit resembles an Undead creature with the chosen form, which determines certain details in its stat block. The creature disappears when it drops to 0 {@variantrule Hit Points|XPHB} or when the spell ends.",
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
    name: "Tongues",
    source: "LDJ2024",
    page: 334,
    level: 3,
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
      m: "a miniature ziggurat",
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
      "This spell grants the creature you touch the ability to understand any spoken or signed language that it hears or sees. Moreover, when the target communicates by speaking or signing, any creature that knows at least one language can understand it if that creature can hear the speech or see the signing.",
    ],
    areaTags: ["ST"],
  },
  {
    name: "Vampiric Touch",
    source: "LDJ2024",
    page: 337,
    level: 3,
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
      "The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a melee spell attack against one creature within reach. On a hit, the target takes {@damage 3d6} Necrotic damage, and you regain {@variantrule Hit Points|XPHB} equal to half the amount of Necrotic damage dealt.",
      "Until the spell ends, you can make the attack again on each of your turns as a {@action Magic|XPHB} action, targeting the same creature or a different one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d6|3-9|1d6} for each spell slot level above 3.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    spellAttack: ["M"],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Water Breathing",
    source: "LDJ2024",
    page: 340,
    level: 3,
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
      m: "a short reed",
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
      "This spell grants up to ten willing creatures of your choice within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration.",
    ],
    areaTags: ["MT"],
  },
  {
    name: "Water Walk",
    source: "LDJ2024",
    page: 340,
    level: 3,
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
      m: "a piece of cork",
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
      "This spell grants the ability to move across any liquid surface—such as water, acid, mud, snow, quicksand, or lava—as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures of your choice within range gain this ability for the duration.",
      "An affected target must take a {@variantrule Bonus Action|XPHB} to pass from the liquid's surface into the liquid itself and vice versa, but if the target falls into the liquid, the target passes through the surface into the liquid below.",
    ],
    areaTags: ["MT"],
  },
  {
    name: "Wind Wall",
    source: "LDJ2024",
    page: 341,
    level: 3,
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
      m: "a fan and a feather",
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
      "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration.",
      "When the wall appears, each creature in its area makes a Strength saving throw, taking {@damage 4d8} Bludgeoning damage on a failed save or half as much damage on a successful one.",
      "The strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and miss automatically. Boulders hurled by Giants or siege engines, and similar projectiles, are unaffected. Creatures in {@spell gaseous form|XPHB} can't pass through it.",
    ],
    damageInflict: ["bludgeoning"],
    savingThrow: ["strength"],
    areaTags: ["W"],
  },
];
