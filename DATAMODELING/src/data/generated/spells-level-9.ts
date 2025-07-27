export const spellsLevel9 = [
  {
    name: "Astral Projection",
    source: "LDJ2024",
    page: 243,
    level: 9,
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
        type: "feet",
        amount: 10,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "for each of the spell's targets, one jacinth worth 1,000+ GP and one silver bar worth 100+ GP, all of which the spell consumes",
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
      "You and up to eight willing creatures within range project your astral bodies into the Astral Plane (the spell ends instantly if you are already on that plane). Each target's body is left behind in a state of suspended animation; it has the {@condition Unconscious|XPHB} condition, doesn't need food or air, and doesn't age.",
      "A target's astral form resembles its body in almost every way, replicating its game statistics and possessions. The principal difference is the addition of a silvery cord that trails from between the shoulder blades of the astral form. The cord fades from view after 1 foot. If the cord is cut—which happens only when an effect states that it does so—the target's body and astral form both die.",
      "A target's astral form can travel through the Astral Plane. The moment an astral form leaves that plane, the target's body and possessions travel along the silver cord, causing the target to re-enter its body on the new plane.",
      "Any damage or other effects that apply to an astral form have no effect on the target's body and vice versa. If a target's body or astral form drops to 0 {@variantrule Hit Points|XPHB}, the spell ends for that target. The spell ends for all the targets if you take a {@action Magic|XPHB} action to dismiss it.",
      "When the spell ends for a target who isn't dead, the target reappears in its body and exits the state of suspended animation.",
    ],
    conditionInflict: ["unconscious"],
    miscTags: ["PRM", "PS"],
    areaTags: ["MT"],
  },
  {
    name: "Foresight",
    source: "LDJ2024",
    page: 276,
    level: 9,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a hummingbird feather",
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
      "You touch a willing creature and bestow a limited ability to see into the immediate future. For the duration, the target has {@variantrule Advantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}, and other creatures have {@variantrule Disadvantage|XPHB} on attack rolls against it. The spell ends early if you cast it again.",
    ],
    miscTags: ["ADV"],
    areaTags: ["ST"],
  },
  {
    name: "Gate",
    source: "LDJ2024",
    page: 277,
    level: 9,
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
        text: "a diamond worth 5,000+ GP",
        cost: 500000,
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
      "You conjure a portal linking an unoccupied space you can see within range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration, and the portal's destination is visible through it.",
      "The portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.",
      "Deities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.",
      "When you cast this spell, you can speak the name of a specific creature (a pseudonym, title, or nickname doesn't work). If that creature is on a plane other than the one you are on, the portal opens next to the named creature and transports it to the nearest unoccupied space on your side of the portal. You gain no special power over the creature, and it is free to act as the DM deems appropriate. It might leave, attack you, or help you.",
    ],
    miscTags: ["PS", "SGT", "TP"],
  },
  {
    name: "Imprisonment",
    source: "LDJ2024",
    page: 288,
    level: 9,
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
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a statuette of the target worth 5,000+ GP",
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
      "You create a magical restraint to hold a creature that you can see within range. The target must make a Wisdom saving throw. On a successful save, the target is unaffected, and it is immune to this spell for the next 24 hours. On a failed save, the target is imprisoned. While imprisoned, the target doesn't need to breathe, eat, or drink, and it doesn't age. Divination spells can't locate or perceive the imprisoned target, and the target can't teleport.",
      "Until the spell ends, the target is also affected by one of the following effects of your choice:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Burial",
            entries: [
              "The target is entombed beneath the earth in a hollow globe of magical force that is just large enough to contain the target. Nothing can pass into or out of the globe.",
            ],
          },
          {
            type: "item",
            name: "Chaining",
            entries: [
              "Chains firmly rooted in the ground hold the target in place. The target has the {@condition Restrained|XPHB} condition and can't be moved by any means.",
            ],
          },
          {
            type: "item",
            name: "Hedged Prison",
            entries: [
              "The target is trapped in a demiplane that is warded against teleportation and planar travel. The demiplane is your choice of a labyrinth, a cage, a tower, or the like.",
            ],
          },
          {
            type: "item",
            name: "Minimus Containment",
            entries: [
              "The target becomes 1 inch tall and is trapped inside an indestructible gemstone or a similar object. Light can pass through the gemstone (allowing the target to see out and other creatures to see in), but nothing else can pass through by any means.",
            ],
          },
          {
            type: "item",
            name: "Slumber",
            entries: [
              "The target has the {@condition Unconscious|XPHB} condition and can't be awoken.",
            ],
          },
        ],
      },
      {
        type: "entries",
        name: "Ending the Spell",
        entries: [
          "When you cast the spell, specify a trigger that will end it. The trigger can be as simple or as elaborate as you choose, but the DM must agree that it has a high likelihood of happening within the next decade. The trigger must be an observable action, such as someone making a particular offering at the temple of your god, saving your true love, or defeating a specific monster.",
          "A {@spell Dispel Magic|XPHB} spell can end the spell only if it is cast with a level 9 spell slot, targeting either the prison or the component used to create it.",
        ],
      },
    ],
    conditionInflict: ["restrained", "unconscious"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Mass Heal",
    source: "LDJ2024",
    page: 296,
    level: 9,
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
      "A flood of healing energy flows from you into creatures around you. You restore up to 700 {@variantrule Hit Points|XPHB}, divided as you choose among any number of creatures that you can see within range. Creatures healed by this spell also have the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Poisoned|XPHB} conditions removed from them.",
    ],
    miscTags: ["HL", "SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Meteor Swarm",
    source: "LDJ2024",
    page: 298,
    level: 9,
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
        type: "instant",
      },
    ],
    entries: [
      "Blazing orbs of fire plummet to the ground at four different points you can see within range. Each creature in a 40-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on each of those points makes a Dexterity saving throw. A creature takes {@damage 20d6} Fire damage and {@damage 20d6} Bludgeoning damage on a failed save or half as much damage on a successful one. A creature in the area of more than one fiery {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is affected only once.",
      "A nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area, and the object starts {@hazard burning|XPHB} if it's flammable.",
    ],
    damageInflict: ["bludgeoning", "fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ", "SGT"],
    areaTags: ["S"],
  },
  {
    name: "Power Word Heal",
    source: "LDJ2024",
    page: 306,
    level: 9,
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
        type: "instant",
      },
    ],
    entries: [
      "A wave of healing energy washes over one creature you can see within range. The target regains all its {@variantrule Hit Points|XPHB}. If the creature has the {@condition Charmed|XPHB}, {@condition Frightened|XPHB}, {@condition Paralyzed|XPHB}, {@condition Poisoned|XPHB}, or {@condition Stunned|XPHB} condition, the condition ends. If the creature has the {@condition Prone|XPHB} condition, it can use its {@variantrule Reaction|XPHB} to stand up.",
    ],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Power Word Kill",
    source: "LDJ2024",
    page: 306,
    level: 9,
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
      "You compel one creature you can see within range to die. If the target has 100 {@variantrule Hit Points|XPHB} or fewer, it dies. Otherwise, it takes {@damage 12d12} Psychic damage.",
    ],
    damageInflict: ["psychic"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Prismatic Wall",
    source: "LDJ2024",
    page: 308,
    level: 9,
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
        type: "timed",
        duration: {
          type: "minute",
          amount: 10,
        },
      },
    ],
    entries: [
      "A shimmering, multicolored plane of light forms a vertical opaque wall—up to 90 feet long, 30 feet high, and 1 inch thick—centered on a point within range. Alternatively, you shape the wall into a globe up to 30 feet in diameter centered on a point within range. The wall lasts for the duration. If you position the wall in a space occupied by a creature, the spell ends instantly without effect.",
      "The wall sheds {@variantrule Bright Light|XPHB} within 100 feet and {@variantrule Dim Light|XPHB} for an additional 100 feet. You and creatures you designate when you cast the spell can pass through and be near the wall without harm. If another creature that can see the wall moves within 20 feet of it or starts its turn there, the creature must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition for 1 minute.",
      "The wall consists of seven layers, each with a different color. When a creature reaches into or passes through the wall, it does so one layer at a time through all the layers. Each layer forces the creature to make a Dexterity saving throw or be affected by that layer's properties as described in the Prismatic Layers table.",
      "The wall, which has AC 10, can be destroyed one layer at a time, in order from red to violet, by means specific to each layer. If a layer is destroyed, it is gone for the duration. {@spell Antimagic Field|XPHB} has no effect on the wall, and {@spell Dispel Magic|XPHB} can affect only the violet layer.",
      {
        type: "table",
        caption: "Prismatic Layers",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["Order", "Effects"],
        rows: [
          [
            "1",
            "{@b Red.} {@i Failed Save:} {@damage 12d6} Fire damage. {@i Successful Save:} Half as much damage. {@i Additional Effects}: Nonmagical ranged attacks can't pass through this layer, which is destroyed if it takes at least 25 Cold damage.",
          ],
          [
            "2",
            "{@b Orange.} {@i Failed Save:} {@damage 12d6} Acid damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} Magical ranged attacks can't pass through this layer, which is destroyed by a strong wind (such as the one created by {@spell Gust of Wind|XPHB}).",
          ],
          [
            "3",
            "{@b Yellow.} {@i Failed Save:} {@damage 12d6} Lightning damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} The layer is destroyed if it takes at least 60 Force damage.",
          ],
          [
            "4",
            "{@b Green.} {@i Failed Save:} {@damage 12d6} Poison damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} A {@spell Passwall|XPHB} spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer.",
          ],
          [
            "5",
            "{@b Blue.} {@i Failed Save:} {@damage 12d6} Cold damage. {@i Successful Save:} Half as much damage. {@i Additional Effects:} The layer is destroyed if it takes at least 25 Fire damage.",
          ],
          [
            "6",
            "{@b Indigo.} {@i Failed Save:} The target has the {@condition Restrained|XPHB} condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the {@condition Petrified|XPHB} condition until it is freed by an effect like the {@spell Greater Restoration|XPHB} spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind. {@i Additional Effects:} Spells can't be cast through this layer, which is destroyed by {@variantrule Bright Light|XPHB} shed by the {@spell Daylight|XPHB} spell.",
          ],
          [
            "7",
            "{@b Violet.} {@i Failed Save:} The target has the {@condition Blinded|XPHB} condition and makes a Wisdom saving throw at the start of your next turn. On a successful save, the condition ends. On a failed save, the condition ends, and the creature teleports to another plane of existence (DM's choice). {@i Additional Effects:} This layer is destroyed by {@spell Dispel Magic|XPHB}.",
          ],
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "force", "lightning", "poison"],
    conditionInflict: ["blinded", "petrified", "restrained"],
    savingThrow: ["constitution", "dexterity", "wisdom"],
    miscTags: ["LGT", "PRM"],
    areaTags: ["W"],
  },
  {
    name: "Shapechange",
    source: "LDJ2024",
    page: 315,
    level: 9,
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
      m: {
        text: "a jade circlet worth 1,500+ GP",
        cost: 150000,
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
      "You shape-shift into another creature for the duration or until you take a {@action Magic|XPHB} action to shape-shift into a different eligible form. The new form must be of a creature that has a {@variantrule Challenge Rating|XPHB} no higher than your level or {@variantrule Challenge Rating|XPHB}. You must have seen the sort of creature before, and it can't be a Construct or an Undead.",
      "When you cast the spell, you gain a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the first form into which you shape-shift. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends.",
      "Your game statistics are replaced by the stat block of the chosen form, but you retain your creature type; alignment; personality; Intelligence, Wisdom, and Charisma scores; {@variantrule Hit Points|XPHB}; {@variantrule Hit Point Dice|XPHB}; proficiencies; and ability to communicate. If you have the Spellcasting feature, you retain it too.",
      "Upon shape-shifting, you determine whether your equipment drops to the ground or changes in size and shape to fit the new form while you're in it.",
    ],
    miscTags: ["THP"],
  },
  {
    name: "Storm of Vengeance",
    source: "LDJ2024",
    page: 321,
    level: 9,
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
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "A churning storm cloud forms for the duration, centered on a point within range and spreading to a radius of 300 feet. Each creature under the cloud when it appears must succeed on a Constitution saving throw or take {@damage 2d6} Thunder damage and have the {@condition Deafened|XPHB} condition for the duration.",
      "At the start of each of your later turns, the storm produces different effects, as detailed below.",
      {
        type: "entries",
        name: "Turn 2",
        entries: [
          "Acidic rain falls. Each creature and object under the cloud takes {@damage 4d6} Acid damage.",
        ],
      },
      {
        type: "entries",
        name: "Turn 3",
        entries: [
          "You call six bolts of lightning from the cloud to strike six different creatures or objects beneath it. Each target makes a Dexterity saving throw, taking {@damage 10d6} Lightning damage on a failed save or half as much damage on a successful one.",
        ],
      },
      {
        type: "entries",
        name: "Turn 4",
        entries: [
          "Hailstones rain down. Each creature under the cloud takes {@damage 2d6} Bludgeoning damage.",
        ],
      },
      {
        type: "entries",
        name: "Turns 5-10",
        entries: [
          "Gusts and freezing rain assail the area under the cloud. Each creature there takes {@damage 1d6} Cold damage. Until the spell ends, the area is {@variantrule Difficult Terrain|XPHB} and {@variantrule Heavily Obscured|XPHB}, ranged attacks with weapons are impossible there, and strong wind blows through the area.",
        ],
      },
    ],
    damageInflict: ["acid", "bludgeoning", "cold", "lightning", "thunder"],
    conditionInflict: ["deafened"],
    savingThrow: ["constitution", "dexterity"],
    miscTags: ["DFT", "OBJ", "OBS"],
    areaTags: ["Y"],
  },
  {
    name: "Time Stop",
    source: "LDJ2024",
    page: 334,
    level: 9,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You briefly stop the flow of time for everyone but yourself. No time passes for other creatures, while you take {@dice 1d4 + 1} turns in a row, during which you can use actions and move as normal.",
      "This spell ends if one of the actions you use during this period, or any effects that you create during it, affects a creature other than you or an object being worn or carried by someone other than you. In addition, the spell ends if you move to a place more than 1,000 feet from the location where you cast it.",
    ],
  },
  {
    name: "True Polymorph",
    source: "LDJ2024",
    page: 335,
    level: 9,
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
      m: "a drop of mercury, a dollop of gum arabic, and a wisp of smoke",
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
      "Choose one creature or nonmagical object that you can see within range. The creature shape-shifts into a different creature or a nonmagical object, or the object shape-shifts into a creature (the object must be neither worn nor carried). The transformation lasts for the duration or until the target dies or is destroyed, but if you maintain {@status Concentration|XPHB} on this spell for the full duration, the spell lasts until dispelled.",
      "An unwilling creature can make a Wisdom saving throw, and if it succeeds, it isn't affected by this spell.",
      {
        type: "entries",
        name: "Creature into Creature",
        entries: [
          "If you turn a creature into another kind of creature, the new form can be any kind you choose that has a {@variantrule Challenge Rating|XPHB} equal to or less than the target's {@variantrule Challenge Rating|XPHB} or level. The target's game statistics are replaced by the stat block of the new form, but it retains its {@variantrule Hit Points|XPHB}, {@variantrule Hit Point Dice|XPHB}, alignment, and personality.",
          "The target gains a number of {@variantrule Temporary Hit Points|XPHB} equal to the {@variantrule Hit Points|XPHB} of the new form. These {@variantrule Temporary Hit Points|XPHB} vanish if any remain when the spell ends. The spell ends early on the target if it has no {@variantrule Temporary Hit Points|XPHB} left.",
          "The target is limited in the actions it can perform by the anatomy of its new form, and it can't speak or cast spells.",
          "The target's gear melds into the new form. The creature can't use or otherwise benefit from any of that equipment.",
        ],
      },
      {
        type: "entries",
        name: "Object into Creature",
        entries: [
          "You can turn an object into any kind of creature, as long as the creature's size is no larger than the object's size and the creature has a {@variantrule Challenge Rating|XPHB} of 9 or lower. The creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you and your allies. In combat, it takes its turns immediately after yours, and it obeys your commands.",
          "If the spell lasts more than an hour, you no longer control the creature. It might remain {@variantrule Friendly [Attitude]|XPHB|Friendly} to you, depending on how you have treated it.",
        ],
      },
      {
        type: "entries",
        name: "Creature into Object",
        entries: [
          "If you turn a creature into an object, it transforms along with whatever it is wearing and carrying into that form, as long as the object's size is no larger than the creature's size. The creature's statistics become those of the object, and the creature has no memory of time spent in this form after the spell ends and it returns to normal.",
        ],
      },
    ],
    savingThrow: ["wisdom"],
    miscTags: ["OBJ", "PRM", "SGT", "SMN", "THP"],
    areaTags: ["ST"],
  },
  {
    name: "True Resurrection",
    source: "LDJ2024",
    page: 336,
    level: 9,
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
        text: "diamonds worth 25,000+ GP, which the spell consumes",
        cost: 2500000,
        consume: true,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You touch a creature that has been dead for no longer than 200 years and that died for any reason except old age. The creature is revived with all its {@variantrule Hit Points|XPHB}.",
      "This spell closes all wounds, neutralizes any poison, cures all magical contagions, and lifts any curses affecting the creature when it died. The spell replaces damaged or missing organs and limbs. If the creature was Undead, it is restored to its non-Undead form.",
      "The spell can provide a new body if the original no longer exists, in which case you must speak the creature's name. The creature then appears in an unoccupied space you choose within 10 feet of you.",
    ],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Weird",
    source: "LDJ2024",
    page: 341,
    level: 9,
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
      "You try to create illusory terrors in others' minds. Each creature of your choice in a 30-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range makes a Wisdom saving throw. On a failed save, a target takes {@damage 10d10} Psychic damage and has the {@condition Frightened|XPHB} condition for the duration. On a successful save, a target takes half as much damage only.",
      "A {@condition Frightened|XPHB} target makes a Wisdom saving throw at the end of each of its turns. On a failed save, it takes {@damage 5d10} Psychic damage. On a successful save, the spell ends on that target.",
    ],
    damageInflict: ["psychic"],
    conditionInflict: ["frightened"],
    savingThrow: ["wisdom"],
    areaTags: ["S"],
  },
  {
    name: "Wish",
    source: "LDJ2024",
    page: 341,
    level: 9,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Wish is the mightiest spell a mortal can cast. By simply speaking aloud, you can alter reality itself.",
      "The basic use of this spell is to duplicate any other spell of level 8 or lower. If you use it this way, you don't need to meet any requirements to cast that spell, including costly components. The spell simply takes effect.",
      "Alternatively, you can create one of the following effects of your choice:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Object Creation",
            entries: [
              "You create one object of up to 25,000 GP in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space that you can see on the ground.",
            ],
          },
          {
            type: "item",
            name: "Instant Health",
            entries: [
              "You allow yourself and up to twenty creatures that you can see to regain all {@variantrule Hit Points|XPHB}, and you end all effects on them listed in the {@spell Greater Restoration|XPHB} spell.",
            ],
          },
          {
            type: "item",
            name: "Resistance",
            entries: [
              "You grant up to ten creatures that you can see {@variantrule Resistance|XPHB} to one damage type that you choose. This {@variantrule Resistance|XPHB} is permanent.",
            ],
          },
          {
            type: "item",
            name: "Spell Immunity",
            entries: [
              "You grant up to ten creatures you can see immunity to a single spell or other magical effect for 8 hours.",
            ],
          },
          {
            type: "item",
            name: "Sudden Learning",
            entries: [
              "You replace one of your feats with another feat for which you are eligible. You lose all the benefits of the old feat and gain the benefits of the new one. You can't replace a feat that is a prerequisite for any of your other feats or features.",
            ],
          },
          {
            type: "item",
            name: "Roll Redo",
            entries: [
              "You undo a single recent event by forcing a reroll of any die roll made within the last round (including your last turn). Reality reshapes itself to accommodate the new result. For example, a Wish spell could undo an ally's failed saving throw or a foe's {@variantrule Critical Hit|XPHB}. You can force the reroll to be made with {@variantrule Advantage|XPHB} or {@variantrule Disadvantage|XPHB}, and you choose whether to use the reroll or the original roll.",
            ],
          },
          {
            type: "item",
            name: "Reshape Reality",
            entries: [
              "You may wish for something not included in any of the other effects. To do so, state your wish to the DM as precisely as possible. The DM has great latitude in ruling what occurs in such an instance; the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might be achieved only in part, or you might suffer an unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a Legendary magic item or an Artifact might instantly transport you to the presence of the item's current owner. If your wish is granted and its effects have consequences for a whole community, region, or world, you are likely to attract powerful foes. If your wish would affect a god, the god's divine servants might instantly intervene to prevent it or to encourage you to craft the wish in a particular way. If your wish would undo the multiverse itself, threaten the City of Sigil, or affect the Lady of Pain in any way, you see an image of her in your mind for a moment; she shakes her head, and your wish fails.",
            ],
          },
        ],
      },
      "The stress of casting Wish to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a {@variantrule Long Rest|XPHB}, you take {@damage 1d10} Necrotic damage per level of that spell. This damage can't be reduced or prevented in any way. In addition, your Strength score becomes 3 for {@dice 2d4} days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a {@chance 33|||Unable to cast again!|Able to cast again} chance that you are unable to cast {@spell Wish|XPHB} ever again if you suffer this stress.",
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
      "psychic",
      "radiant",
      "slashing",
      "thunder",
    ],
    damageInflict: ["necrotic"],
    miscTags: ["ADV", "HL", "SGT"],
  },
];
