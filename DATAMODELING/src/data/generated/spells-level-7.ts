export const spellsLevel7 = [
  {
    name: "Conjure Celestial",
    source: "LDJ2024",
    page: 254,
    level: 7,
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
      "You conjure a spirit from the Upper Planes, which manifests as a pillar of light in a 10-foot-radius, 40-foot-high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. For each creature you can see in the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, choose which of these lights shines on it:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Healing Light",
            entries: [
              "The target regains {@variantrule Hit Points|XPHB} equal to {@dice 4d12} plus your spellcasting ability modifier.",
            ],
          },
          {
            type: "item",
            name: "Searing Light",
            entries: [
              "The target makes a Dexterity saving throw, taking {@damage 6d12} Radiant damage on a failed save or half as much damage on a successful one.",
            ],
          },
        ],
      },
      "Until the spell ends, {@variantrule Bright Light|XPHB} fills the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}, and when you move on your turn, you can also move the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} up to 30 feet.",
      "Whenever the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} moves into the space of a creature you can see and whenever a creature you can see enters the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} or ends its turn there, you can bathe it in one of the lights. A creature can be affected by this spell only once per turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing and damage increase by {@scaledamage 6d12|7-9|1d12} for each spell slot level above 7.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    savingThrow: ["dexterity"],
    miscTags: ["HL", "SGT"],
    areaTags: ["Y"],
  },
  {
    name: "Delayed Blast Fireball",
    source: "LDJ2024",
    page: 261,
    level: 7,
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
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "A beam of yellow light flashes from you, then condenses at a chosen point within range as a glowing bead for the duration. When the spell ends, the bead explodes, and each creature in a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on that point makes a Dexterity saving throw. A creature takes Fire damage equal to the total accumulated damage on a failed save or half as much damage on a successful one.",
      "The spell's base damage is {@damage 12d6}, and the damage increases by {@damage 1d6} whenever your turn ends and the spell hasn't ended.",
      "If a creature touches the glowing bead before the spell ends, that creature makes a Dexterity saving throw. On a failed save, the spell ends, causing the bead to explode. On a successful save, the creature can throw the bead up to 40 feet. If the thrown bead enters a creature's space or collides with a solid object, the spell ends, and the bead explodes.",
      "When the bead explodes, flammable objects in the explosion that aren't being worn or carried start {@hazard burning|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The base damage increases by {@scaledamage 12d6|7-9|1d6} for each spell slot level above 7.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Divine Word",
    source: "LDJ2024",
    page: 265,
    level: 7,
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
      "You utter a word imbued with power from the Upper Planes. Each creature of your choice in range makes a Charisma saving throw. On a failed save, a target that has 50 {@variantrule Hit Points|XPHB} or fewer suffers an effect based on its current {@variantrule Hit Points|XPHB}, as shown in the Divine Word Effects table. Regardless of its {@variantrule Hit Points|XPHB}, a Celestial, an Elemental, a Fey, or a Fiend target that fails its save is forced back to its plane of origin (if it isn't there already) and can't return to the current plane for 24 hours by any means short of a {@spell Wish|XPHB} spell.",
      {
        type: "table",
        caption: "Divine Word Effects",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["Hit Points", "Effect"],
        rows: [
          ["0-20", "The target dies."],
          [
            "21-30",
            "The target has the {@condition Blinded|XPHB}, {@condition Deafened|XPHB}, and {@condition Stunned|XPHB} conditions for 1 hour.",
          ],
          [
            "31-40",
            "The target has the {@condition Blinded|XPHB} and {@condition Deafened|XPHB} conditions for 10 minutes.",
          ],
          [
            "41-50",
            "The target has the {@condition Deafened|XPHB} condition for 1 minute.",
          ],
        ],
      },
    ],
    conditionInflict: ["blinded", "deafened", "stunned"],
    savingThrow: ["charisma"],
    areaTags: ["MT"],
  },
  {
    name: "Etherealness",
    source: "LDJ2024",
    page: 269,
    level: 7,
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
          type: "hour",
          amount: 8,
        },
      },
    ],
    entries: [
      "You step into the border regions of the Ethereal Plane, where it overlaps with your current plane. You remain in the Border Ethereal for the duration. During this time, you can move in any direction. If you move up or down, every foot of movement costs an extra foot. You can perceive the plane you left, which looks gray, and you can't see anything there more than 60 feet away.",
      "While on the Ethereal Plane, you can affect and be affected only by creatures, objects, and effects on that plane. Creatures that aren't on the Ethereal Plane can't perceive or interact with you unless a feature gives them the ability to do so.",
      "When the spell ends, you return to the plane you left in the spot that corresponds to your space in the Border Ethereal. If you appear in an occupied space, you are shunted to the nearest unoccupied space and take Force damage equal to twice the number of feet you are moved.",
      "This spell ends instantly if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target up to three willing creatures (including yourself) for each spell slot level above 7. The creatures must be within 10 feet of you when you cast the spell.",
        ],
      },
    ],
    damageInflict: ["force"],
    miscTags: ["PS", "SCT"],
  },
  {
    name: "Finger of Death",
    source: "LDJ2024",
    page: 273,
    level: 7,
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
      "You unleash negative energy toward a creature you can see within range. The target makes a Constitution saving throw, taking {@damage 7d8 + 30} Necrotic damage on a failed save or half as much damage on a successful one.",
      "A Humanoid killed by this spell rises at the start of your next turn as a {@creature Zombie|XMM} that follows your verbal orders.",
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["constitution"],
    miscTags: ["PRM", "SGT", "SMN"],
    areaTags: ["ST"],
  },
  {
    name: "Fire Storm",
    source: "LDJ2024",
    page: 275,
    level: 7,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "A storm of fire appears within range. The area of the storm consists of up to ten 10-foot Cubes, which you arrange as you like. Each {@variantrule Cube [Area of Effect]|XPHB|Cube} must be contiguous with at least one other {@variantrule Cube [Area of Effect]|XPHB|Cube}. Each creature in the area makes a Dexterity saving throw, taking {@damage 7d10} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the area that aren't being worn or carried start {@hazard burning|XPHB}.",
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["C"],
  },
  {
    name: "Forcecage",
    source: "LDJ2024",
    page: 276,
    level: 7,
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
        amount: 100,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "ruby dust worth 1,500+ GP, which the spell consumes",
        cost: 150000,
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
      "An immobile, {@condition Invisible|XPHB}, {@variantrule Cube [Area of Effect]|XPHB|Cube}-shaped prison composed of magical force springs into existence around an area you choose within range. The prison can be a cage or a solid box, as you choose.",
      "A prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2 inch apart. A prison in the shape of a box can be up to 10 feet on a side, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.",
      "When you cast the spell, any creature that is completely inside the cage's area is trapped. Creatures only partially within the area, or those too large to fit inside it, are pushed away from the center of the area until they are completely outside it.",
      "A creature inside the cage can't leave it by nonmagical means. If the creature tries to use teleportation or interplanar travel to leave, it must first make a Charisma saving throw. On a successful save, the creature can use that magic to exit the cage. On a failed save, the creature doesn't exit the cage and wastes the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel.",
      "This spell can't be dispelled by {@spell Dispel Magic|XPHB}.",
    ],
    savingThrow: ["charisma"],
    areaTags: ["C"],
  },
  {
    name: "Mirage Arcane",
    source: "LDJ2024",
    page: 299,
    level: 7,
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
        type: "sight",
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
          amount: 10,
        },
      },
    ],
    entries: [
      "You make terrain in an area up to 1 mile square look, sound, smell, and even feel like some other sort of terrain. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other rough or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road.",
      "Similarly, you can alter the appearance of structures or add them where none are present. The spell doesn't disguise, conceal, or add creatures.",
      "The illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear ground into {@variantrule Difficult Terrain|XPHB} (or vice versa) or otherwise impede movement through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately.",
      "Creatures with {@sense Truesight|XPHB} can see through the illusion to the terrain's true form; however, all other elements of the illusion remain, so while the creature is aware of the illusion's presence, the creature can still physically interact with the illusion.",
    ],
    miscTags: ["DFT"],
  },
  {
    name: "Mordenkainen's Magnificent Mansion",
    source: "LDJ2024",
    page: 300,
    srd52: "Magnificent Mansion",
    level: 7,
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
        amount: 300,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a miniature door worth 15+ GP",
        cost: 1500,
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
      "You conjure a shimmering door in range that lasts for the duration. The door leads to an extradimensional dwelling and is 5 feet wide and 10 feet tall. You and any creature you designate when you cast the spell can enter the extradimensional dwelling as long as the door remains open. You can open or close it (no action required) if you are within 30 feet of it. While closed, the door is imperceptible.",
      "Beyond the door is a magnificent foyer with numerous chambers beyond. The dwelling's atmosphere is clean, fresh, and warm.",
      "You can create any floor plan you like for the dwelling, but it can't exceed 50 contiguous 10-foot Cubes. The place is furnished and decorated as you choose. It contains sufficient food to serve a nine-course banquet for up to 100 people. Furnishings and other objects created by this spell dissipate into smoke if removed from it.",
      "A staff of 100 near-transparent servants attends all who enter. You determine the appearance of these servants and their attire. They are invulnerable and obey your commands. Each servant can perform tasks that a human could perform, but they can't attack or take any action that would directly harm another creature. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can't leave the dwelling.",
      "When the spell ends, any creatures or objects left inside the extradimensional space are expelled into the unoccupied spaces nearest to the entrance.",
    ],
    miscTags: ["OBJ"],
  },
  {
    name: "Mordenkainen's Sword",
    source: "LDJ2024",
    page: 302,
    srd52: "Arcane Sword",
    level: 7,
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
      m: {
        text: "a miniature sword worth 250+ GP",
        cost: 25000,
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
      "You create a spectral sword that hovers within range. It lasts for the duration.",
      "When the sword appears, you make a melee spell attack against a target within 5 feet of the sword. On a hit, the target takes Force damage equal to {@damage 4d12} plus your spellcasting ability modifier.",
      "On your later turns, you can take a {@variantrule Bonus Action|XPHB} to move the sword up to 30 feet to a spot you can see and repeat the attack against the same target or a different one.",
    ],
    damageInflict: ["force"],
    spellAttack: ["M"],
    miscTags: ["SGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Plane Shift",
    source: "LDJ2024",
    page: 305,
    level: 7,
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
        text: "a forked, metal rod worth 250+ GP and attuned to a plane of existence",
        cost: 25000,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You and up to eight willing creatures who link hands in a circle are transported to a different plane of existence. You can specify a target destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination, as determined by the DM.",
      "Alternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the creatures you transported, they appear in the closest unoccupied spaces next to the circle.",
    ],
    miscTags: ["PS", "TP"],
  },
  {
    name: "Power Word Fortify",
    source: "LDJ2024",
    page: 306,
    level: 7,
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
      "You fortify up to six creatures you can see within range. The spell bestows 120 {@variantrule Temporary Hit Points|XPHB}, which you divide among the spell's recipients.",
    ],
    miscTags: ["SGT", "THP"],
    areaTags: ["MT"],
  },
  {
    name: "Prismatic Spray",
    source: "LDJ2024",
    page: 307,
    level: 7,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "Eight rays of light flash from you in a 60-foot {@variantrule Cone [Area of Effect]|XPHB|Cone}. Each creature in the {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw. For each target, roll {@dice 1d8} to determine which color ray affects it, consulting the Prismatic Rays table.",
      {
        type: "table",
        caption: "Prismatic Rays",
        colStyles: ["col-2 text-center", "col-10"],
        colLabels: ["1d8", "Ray"],
        rows: [
          [
            "1",
            "{@b Red.} {@i Failed Save:} {@damage 12d6} Fire damage. {@i Successful Save:} Half as much damage.",
          ],
          [
            "2",
            "{@b Orange.} {@i Failed Save:} {@damage 12d6} Acid damage. {@i Successful Save:} Half as much damage.",
          ],
          [
            "3",
            "{@b Yellow.} {@i Failed Save:} {@damage 12d6} Lightning damage. {@i Successful Save:} Half as much damage.",
          ],
          [
            "4",
            "{@b Green.} {@i Failed Save:} {@damage 12d6} Poison damage. {@i Successful Save:} Half as much damage.",
          ],
          [
            "5",
            "{@b Blue.} {@i Failed Save:} {@damage 12d6} Cold damage. {@i Successful Save:} Half as much damage.",
          ],
          [
            "6",
            "{@b Indigo.} {@i Failed Save:} The target has the {@condition Restrained|XPHB} condition and makes a Constitution saving throw at the end of each of its turns. If it successfully saves three times, the condition ends. If it fails three times, it has the {@condition Petrified|XPHB} condition until it is freed by an effect like the {@spell Greater Restoration|XPHB} spell. The successes and failures needn't be consecutive; keep track of both until the target collects three of a kind.",
          ],
          [
            "7",
            "{@b Violet.} {@i Failed Save:} The target has the {@condition Blinded|XPHB} condition and makes a Wisdom saving throw at the start of your next turn. On a successful save, the condition ends. On a failed save, the condition ends, and the creature teleports to another plane of existence (DM's choice).",
          ],
          [
            "8",
            "{@b Special.} The target is struck by two rays. Roll twice, rerolling any 8.",
          ],
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning", "poison"],
    conditionInflict: ["blinded", "petrified", "restrained"],
    savingThrow: ["dexterity", "constitution", "wisdom"],
    miscTags: ["PRM"],
    areaTags: ["N"],
  },
  {
    name: "Project Image",
    source: "LDJ2024",
    page: 309,
    level: 7,
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
        type: "miles",
        amount: 500,
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "a statuette of yourself worth 5+ GP",
        cost: 500,
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
      "You create an illusory copy of yourself that lasts for the duration. The copy can appear at any location within range that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you, but it is intangible. If the illusion takes any damage, it disappears, and the spell ends.",
      "You can see through the illusion's eyes and hear through its ears as if you were in its space. As a {@action Magic|XPHB} action, you can move it up to 60 feet and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly.",
      "Physical interaction with the image reveals it to be illusory, since things can pass through it. A creature that takes the {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image, and any noise it makes sounds hollow to the creature.",
    ],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
  },
  {
    name: "Regenerate",
    source: "LDJ2024",
    page: 311,
    level: 7,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: "a prayer wheel",
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
      "A creature you touch regains {@dice 4d8 + 15} {@variantrule Hit Points|XPHB}. For the duration, the target regains 1 {@variantrule Hit Points|XPHB|Hit Point} at the start of each of its turns, and any severed body parts regrow after 2 minutes.",
    ],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Resurrection",
    source: "LDJ2024",
    page: 312,
    level: 7,
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
        text: "a diamond worth 1,000+ GP, which the spell consumes",
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
      "With a touch, you revive a dead creature that has been dead for no more than a century, didn't die of old age, and wasn't Undead when it died.",
      "The creature returns to life with all its {@variantrule Hit Points|XPHB}. This spell also neutralizes any poisons that affected the creature at the time of death. This spell closes all mortal wounds and restores any missing body parts.",
      "Coming back from the dead is an ordeal. The target takes a -4 penalty to {@variantrule D20 Test|XPHB|D20 Tests}. Every time the target finishes a {@variantrule Long Rest|XPHB}, the penalty is reduced by 1 until it becomes 0.",
      "Casting this spell to revive a creature that has been dead for 365 days or longer taxes you. Until you finish a {@variantrule Long Rest|XPHB}, you can't cast spells again, and you have {@variantrule Disadvantage|XPHB} on {@variantrule D20 Test|XPHB|D20 Tests}.",
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
    name: "Reverse Gravity",
    source: "LDJ2024",
    page: 312,
    level: 7,
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
        amount: 100,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a lodestone and iron filings",
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
      "This spell reverses gravity in a 50-foot-radius, 100-foot high {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder} centered on a point within range. All creatures and objects in that area that aren't anchored to the ground fall upward and reach the top of the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}. A creature can make a Dexterity saving throw to grab a fixed object it can reach, thus avoiding the fall upward.",
      "If a ceiling or an anchored object is encountered in this upward fall, creatures and objects strike it just as they would during a downward fall. If an affected creature or object reaches the {@variantrule Cylinder [Area of Effect]|XPHB|Cylinder}'s top without striking anything, it hovers there for the duration. When the spell ends, affected objects and creatures fall downward.",
    ],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["Y"],
  },
  {
    name: "Sequester",
    source: "LDJ2024",
    page: 315,
    level: 7,
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
        text: "gem dust worth 5,000+ GP, which the spell consumes",
        cost: 500000,
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
      "With a touch, you magically sequester an object or a willing creature. For the duration, the target has the {@condition Invisible|XPHB} condition and can't be targeted by Divination spells, detected by magic, or viewed remotely with magic.",
      "If the target is a creature, it enters a state of suspended animation; it has the {@condition Unconscious|XPHB} condition, doesn't age, and doesn't need food, water, or air.",
      'You can set a condition for the spell to end early. The condition can be anything you choose, but it must occur or be visible within 1 mile of the target. Examples include "after 1,000 years" or "when the tarrasque awakens." This spell also ends if the target takes any damage.',
    ],
    conditionInflict: ["invisible", "unconscious"],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Simulacrum",
    source: "LDJ2024",
    page: 317,
    level: 7,
    school: "illusion",
    castingTime: [
      {
        number: 12,
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
        text: "powdered ruby worth 1,500+ GP, which the spell consumes",
        cost: 150000,
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
      "You create a simulacrum of one Beast or Humanoid that is within 10 feet of you for the entire casting of the spell. You finish the casting by touching both the creature and a pile of ice or snow that is the same size as that creature, and the pile turns into the simulacrum, which is a creature. It uses the game statistics of the original creature at the time of casting, except it is a Construct, its {@variantrule Hit Points|XPHB|Hit Point} maximum is half as much, and it can't cast this spell.",
      "The simulacrum is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you and creatures you designate. It obeys your commands and acts on your turn in combat. The simulacrum can't gain levels, and it can't take Short or Long Rests.",
      "If the simulacrum takes damage, the only way to restore its {@variantrule Hit Points|XPHB} is to repair it as you take a {@variantrule Long Rest|XPHB}, during which you expend components worth 100 GP per {@variantrule Hit Points|XPHB|Hit Point} restored. The simulacrum must stay within 5 feet of you for the repair.",
      "The simulacrum lasts until it drops to 0 {@variantrule Hit Points|XPHB}, at which point it reverts to snow and melts away. If you cast this spell again, any simulacrum you created with this spell is instantly destroyed.",
    ],
    affectsCreatureType: ["beast", "humanoid"],
    areaTags: ["ST"],
  },
  {
    name: "Symbol",
    source: "LDJ2024",
    page: 329,
    level: 7,
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
        type: "touch",
      },
    },
    components: {
      v: true,
      s: true,
      m: {
        text: "powdered diamond worth 1,000+ GP, which the spell consumes",
        cost: 100000,
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
      "You inscribe a harmful glyph either on a surface (such as a section of floor or wall) or within an object that can be closed (such as a book or chest). The glyph can cover an area no larger than 10 feet in diameter. If you choose an object, it must remain in place; if it is moved more than 10 feet from where you cast this spell, the glyph is broken, and the spell ends without being triggered.",
      "The glyph is nearly imperceptible and requires a successful Wisdom ({@skill Perception|XPHB}) check against your spell save DC to notice.",
      "When you inscribe the glyph, you set its trigger and choose which effect the symbol bears: Death, Discord, Fear, Pain, Sleep, or Stunning. Each one is explained below.",
      {
        type: "entries",
        name: "Set the Trigger",
        entries: [
          "You decide what triggers the glyph when you cast the spell. For glyphs inscribed on a surface, common triggers include touching or stepping on the glyph, removing another object covering it, or approaching within a certain distance of it. For glyphs inscribed within an object, common triggers include opening that object or seeing the glyph.",
          "You can refine the trigger so that only creatures of certain types activate it (for example, the glyph could be set to affect Aberrations). You can also set conditions for creatures that don't trigger the glyph, such as those who say a certain password.",
          "Once triggered, the glyph glows, filling a 60-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} with {@variantrule Dim Light|XPHB} for 10 minutes, after which time the spell ends. Each creature in the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} when the glyph activates is targeted by its effect, as is a creature that enters the {@variantrule Sphere [Area of Effect]|XPHB|Sphere} for the first time on a turn or ends its turn there. A creature is targeted only once per turn.",
        ],
      },
      {
        type: "entries",
        name: "Death",
        entries: [
          "Each target makes a Constitution saving throw, taking {@damage 10d10} Necrotic damage on a failed save or half as much damage on a successful save.",
        ],
      },
      {
        type: "entries",
        name: "Discord",
        entries: [
          "Each target makes a Wisdom saving throw. On a failed save, a target argues with other creatures for 1 minute. During this time, it is incapable of meaningful communication and has {@variantrule Disadvantage|XPHB} on attack rolls and ability checks.",
        ],
      },
      {
        type: "entries",
        name: "Fear",
        entries: [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Frightened|XPHB} condition for 1 minute. While {@condition Frightened|XPHB}, the target must move at least 30 feet away from the glyph on each of its turns, if able.",
        ],
      },
      {
        type: "entries",
        name: "Pain",
        entries: [
          "Each target must succeed on a Constitution saving throw or have the {@condition Incapacitated|XPHB} condition for 1 minute.",
        ],
      },
      {
        type: "entries",
        name: "Sleep",
        entries: [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Unconscious|XPHB} condition for 10 minutes. A creature awakens if it takes damage or if someone takes an action to shake it awake.",
        ],
      },
      {
        type: "entries",
        name: "Stunning",
        entries: [
          "Each target must succeed on a Wisdom saving throw or have the {@condition Stunned|XPHB} condition for 1 minute.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    conditionInflict: ["frightened", "incapacitated", "stunned", "unconscious"],
    savingThrow: ["constitution", "wisdom", "intelligence"],
    abilityCheck: ["wisdom"],
    miscTags: ["LGT", "OBJ"],
    areaTags: ["S"],
  },
  {
    name: "Teleport",
    source: "LDJ2024",
    page: 331,
    level: 7,
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
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "This spell instantly transports you and up to eight willing creatures that you can see within range, or a single object that you can see within range, to a destination you select. If you target an object, it must be Large or smaller, and it can't be held or carried by an unwilling creature.",
      "The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The DM rolls {@dice 1d100} and consults the {@variantrule Teleportation|XPHB} Outcome table and the explanations after it.",
      {
        type: "table",
        caption: "Teleportation Outcome",
        colStyles: [
          "col-4",
          "col-2 text-center",
          "col-2 text-center",
          "col-2 text-center",
          "col-2 text-center",
        ],
        colLabels: [
          "Familiarity",
          "Mishap",
          "Similar Area",
          "Off Target",
          "On Target",
        ],
        rows: [
          ["Permanent circle", "—", "—", "—", "01-00"],
          ["Linked object", "—", "—", "—", "01-00"],
          ["Very familiar", "01-05", "06-13", "14-24", "25-00"],
          ["Seen casually", "01-33", "34-43", "44-53", "54-00"],
          ["Viewed once or described", "01-43", "44-53", "54-73", "74-00"],
          ["False destination", "01-50", "51-00", "—", "—"],
        ],
      },
      {
        type: "entries",
        name: "Familiarity",
        entries: [
          "Here are the meanings of the terms in the table's Familiarity column:",
          {
            type: "list",
            items: [
              '"Permanent circle" means a permanent teleportation circle whose sigil sequence you know.',
              '"Linked object" means you possess an object taken from the desired destination within the last six months, such as a book from a wizard\'s library.',
              '"Very familiar" is a place you have visited often, a place you have carefully studied, or a place you can see when you cast the spell.',
              '"Seen casually" is a place you have seen more than once but with which you aren\'t very familiar.',
              '"Viewed once or described" is a place you have seen once, possibly using magic, or a place you know through someone else\'s description, perhaps from a map.',
              "\"False destination\" is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a location that no longer exists.",
            ],
          },
        ],
      },
      {
        type: "entries",
        name: "Mishap",
        entries: [
          "The spell's unpredictable magic results in a difficult journey. Each teleporting creature (or the target object) takes {@damage 3d10} Force damage, and the DM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time).",
        ],
      },
      {
        type: "entries",
        name: "Similar Area",
        entries: [
          "You and your group (or the target object) appear in a different area that's visually or thematically similar to the target area. You appear in the closest similar place. If you are heading for your home laboratory, for example, you might appear in another person's laboratory in the same city.",
        ],
      },
      {
        type: "entries",
        name: "Off Target",
        entries: [
          "You and your group (or the target object) appear {@dice 2d12} miles away from the destination in a random direction. Roll {@dice 1d8} for the direction: 1, east; 2, southeast; 3, south; 4, southwest; 5, west; 6, northwest; 7, north; or 8, northeast.",
        ],
      },
      {
        type: "entries",
        name: "On Target",
        entries: [
          "You and your group (or the target object) appear where you intended.",
        ],
      },
    ],
    damageInflict: ["force"],
    miscTags: ["OBJ", "RO", "SGT", "TP"],
    areaTags: ["MT"],
  },
];
