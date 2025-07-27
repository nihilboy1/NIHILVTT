export const spellsLevel1 = [
  {
    id: "spell-alarme",
    name: "Alarme",
    description:
      "Você prepara um alarme contra invasões. Escolha uma porta, uma janela ou uma área dentro do alcance que não seja maior que um cubo de 6 metros (20 pés). Até o fim da magia, um alarme alerta você sempre que uma criatura designada tocar ou entrar na área protegida. Ao conjurar a magia, você pode designar criaturas que não ativarão o alarme. Você também escolhe se o alarme será audível ou mental.",
    source: "LDJ2024",
    page: 239,
    level: 1,
    school: "abjuration",
    isRitual: true,
    components: {
      types: ["verbal", "somatic", "material"],
      material: "Um sininho e um fio de prata que são consumidos pela magia.",
    },
    duration: {
      unit: "hour",
      value: 8,
    },
    effects: [
      {
        type: "createNarrativeTrigger",
        actionId: "action-cast-spell",
        parameters: {
          activation: {
            type: "special",
            trigger: "1 minuto de conjuração",
          },
          range: {
            normal: 30,
            unit: "ft",
          },
          target: {
            type: "descriptive",
            text: "Uma porta, janela ou ponto no espaço que se torna o centro da área protegida.",
          },
          area: {
            shape: "cube",
            size: 20,
          },
          outcomes: [
            {
              type: "customMechanic",
              on: "success",
              mechanic: "createAlarmWard",
              details: {
                duration: {
                  unit: "hour",
                  value: 8,
                },
                area: {
                  shape: "cube",
                  size: 20,
                },
                actions: [
                  {
                    id: "trigger-audible-alarm",
                    name: "Ativar Alarme Audível",
                    outcome: {
                      type: "playSound",
                      details: {
                        soundId: "sfx-handbell",
                        durationSec: 10,
                        rangeFt: 60,
                      },
                    },
                  },
                  {
                    id: "trigger-mental-alarm",
                    name: "Ativar Alarme Mental",
                    outcome: {
                      type: "notifyPlayer",
                      details: {
                        message: "Seu alarme foi ativado!",
                        target: "caster",
                        rangeFt: 5280,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    name: "Animal Friendship",
    source: "LDJ2024",
    page: 239,
    level: 1,
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
    entries: [
      "Target a Beast that you can see within range. The target must succeed on a Wisdom saving throw or have the {@condition Charmed|XPHB} condition for the duration. If you or one of your allies deals damage to the target, the spells ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional Beast for each spell slot level above 1.",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["beast"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Armor of Agathys",
    source: "LDJ2024",
    page: 243,
    level: 1,
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
      m: "a shard of blue glass",
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
      "Protective magical frost surrounds you. You gain 5 {@variantrule Temporary Hit Points|XPHB}. If a creature hits you with a melee attack roll before the spell ends, the creature takes 5 Cold damage. The spell ends early if you have no {@variantrule Temporary Hit Points|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The {@variantrule Temporary Hit Points|XPHB} and the Cold damage both increase by 5 for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["cold"],
    miscTags: ["THP"],
  },
  {
    name: "Arms of Hadar",
    source: "LDJ2024",
    page: 243,
    level: 1,
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
        type: "instant",
      },
    ],
    entries: [
      "Invoking Hadar, you cause tendrils to erupt from yourself. Each creature in a 10-foot {@variantrule Emanation [Area of Effect]|XPHB|Emanation} originating from you makes a Strength saving throw. On a failed save, a target takes {@damage 2d6} Necrotic damage and can't take Reactions until the start of its next turn. On a successful save, a target takes half as much damage only.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["strength"],
    areaTags: ["S"],
  },
  {
    name: "Bane",
    source: "LDJ2024",
    page: 245,
    level: 1,
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
      m: "a drop of blood",
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
      "Up to three creatures of your choice that you can see within range must each make a Charisma saving throw. Whenever a target that fails this save makes an attack roll or a saving throw before the spell ends, the target must subtract {@dice 1d4} from the attack roll or save.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    savingThrow: ["charisma"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["MT"],
  },
  {
    name: "Bless",
    source: "LDJ2024",
    page: 247,
    level: 1,
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
      m: {
        text: "a Holy Symbol worth 5+ GP",
        cost: 500,
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
      "You bless up to three creatures within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target adds {@dice 1d4} to the attack roll or save.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["SCT"],
    areaTags: ["MT"],
  },
  {
    name: "Burning Hands",
    source: "LDJ2024",
    page: 248,
    level: 1,
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
        amount: 15,
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
      "A thin sheet of flames shoots forth from you. Each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} makes a Dexterity saving throw, taking {@damage 3d6} Fire damage on a failed save or half as much damage on a successful one.",
      "Flammable objects in the {@variantrule Cone [Area of Effect]|XPHB|Cone} that aren't being worn or carried start {@hazard burning|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["OBJ"],
    areaTags: ["N"],
  },
  {
    name: "Charm Person",
    source: "LDJ2024",
    page: 249,
    level: 1,
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
      "One Humanoid you can see within range makes a Wisdom saving throw. It does so with {@variantrule Advantage|XPHB} if you or your allies are fighting it. On a failed save, the target has the {@condition Charmed|XPHB} condition until the spell ends or until you or your allies damage it. The {@condition Charmed|XPHB} creature is {@variantrule Friendly [Attitude]|XPHB|Friendly} to you. When the spell ends, the target knows it was {@condition Charmed|XPHB} by you.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    conditionInflict: ["charmed"],
    savingThrow: ["wisdom"],
    affectsCreatureType: ["humanoid"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Chromatic Orb",
    source: "LDJ2024",
    page: 249,
    level: 1,
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
        text: "a diamond worth 50+ GP",
        cost: 5000,
      },
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You hurl an orb of energy at a target within range. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder for the type of orb you create, and then make a ranged spell attack against the target. On a hit, the target takes {@damage 3d8} damage of the chosen type.",
      "If you roll the same number on two or more of the d8s, the orb leaps to a different target of your choice within 30 feet of the target. Make an attack roll against the new target, and make a new damage roll. The orb can't leap again unless you cast the spell with a level 2+ spell slot.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d8|1-9|1d8} for each spell slot level above 1. The orb can leap a maximum number of times equal to the level of the slot expended, and a creature can be targeted only once by each casting of this spell.",
        ],
      },
    ],
    damageInflict: ["acid", "cold", "fire", "lightning", "poison", "thunder"],
    spellAttack: ["R"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Color Spray",
    source: "LDJ2024",
    page: 251,
    level: 1,
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
        amount: 15,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a pinch of colorful sand",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You launch a dazzling array of flashing, colorful light. Each creature in a 15-foot {@variantrule Cone [Area of Effect]|XPHB|Cone} originating from you must succeed on a Constitution saving throw or have the {@condition Blinded|XPHB} condition until the end of your next turn.",
    ],
    conditionInflict: ["blinded"],
    savingThrow: ["constitution"],
    areaTags: ["N"],
  },
  {
    name: "Command",
    source: "LDJ2024",
    page: 251,
    level: 1,
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
      "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. Choose the command from these options:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Approach",
            entries: [
              "The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.",
            ],
          },
          {
            type: "item",
            name: "Drop",
            entries: [
              "The target drops whatever it is holding and then ends its turn.",
            ],
          },
          {
            type: "item",
            name: "Flee",
            entries: [
              "The target spends its turn moving away from you by the fastest available means.",
            ],
          },
          {
            type: "item",
            name: "Grovel",
            entries: [
              "The target has the {@condition Prone|XPHB} condition and then ends its turn.",
            ],
          },
          {
            type: "item",
            name: "Halt",
            entries: [
              "On its turn, the target doesn't move and takes no action or {@variantrule Bonus Action|XPHB}.",
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
          "You can affect one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    conditionInflict: ["prone"],
    savingThrow: ["wisdom"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Compelled Duel",
    source: "LDJ2024",
    page: 252,
    level: 1,
    school: "enchantment",
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
        type: "timed",
        duration: {
          type: "minute",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You try to compel a creature into a duel. One creature that you can see within range makes a Wisdom saving throw. On a failed save, the target has {@variantrule Disadvantage|XPHB} on attack rolls against creatures other than you, and it can't willingly move to a space that is more than 30 feet away from you.",
      "The spell ends if you make an attack roll against a creature other than the target, if you cast a spell on an enemy other than the target, if an ally of yours damages the target, or if you end your turn more than 30 feet away from the target.",
    ],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Comprehend Languages",
    source: "LDJ2024",
    page: 252,
    level: 1,
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
      m: "a pinch of soot and salt",
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
      "For the duration, you understand the literal meaning of any language that you hear or see signed. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text. This spell doesn't decode symbols or secret messages.",
    ],
  },
  {
    name: "Create or Destroy Water",
    source: "LDJ2024",
    page: 258,
    level: 1,
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
      m: "a mix of water and sand",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You do one of the following:",
      {
        type: "list",
        style: "list-hang-notitle",
        items: [
          {
            type: "item",
            name: "Create Water",
            entries: [
              "You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range, extinguishing exposed flames there.",
            ],
          },
          {
            type: "item",
            name: "Destroy Water",
            entries: [
              "You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range.",
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
          "You create or destroy 10 additional gallons of water, or the size of the {@variantrule Cube [Area of Effect]|XPHB|Cube} increases by 5 feet, for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["PRM"],
    areaTags: ["C"],
  },
  {
    name: "Cure Wounds",
    source: "LDJ2024",
    page: 259,
    level: 1,
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
      "A creature you touch regains a number of {@variantrule Hit Points|XPHB} equal to {@dice 2d8} plus your spellcasting ability modifier.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 2d8|1-9|2d8} for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["HL"],
    areaTags: ["ST"],
  },
  {
    name: "Detect Evil and Good",
    source: "LDJ2024",
    page: 261,
    level: 1,
    school: "divination",
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
      "For the duration, you sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet of yourself. You also sense whether the {@spell Hallow|XPHB} spell is active there and, if so, where.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
    ],
    affectsCreatureType: [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead",
    ],
  },
  {
    name: "Detect Magic",
    source: "LDJ2024",
    page: 262,
    level: 1,
    school: "divination",
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
      "For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the {@action Magic|XPHB} action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell's {@book school of magic|XPHB|7|Schools of Magic}.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
    ],
  },
  {
    name: "Detect Poison and Disease",
    source: "LDJ2024",
    page: 262,
    level: 1,
    school: "divination",
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
      s: true,
      m: "a yew leaf",
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
      "For the duration, you sense the location of poisons, poisonous or venomous creatures, and magical contagions within 30 feet of yourself. You sense the kind of poison, creature, or contagion in each case.",
      "The spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead.",
    ],
  },
  {
    name: "Disguise Self",
    source: "LDJ2024",
    page: 262,
    level: 1,
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
          type: "hour",
          amount: 1,
        },
      },
    ],
    entries: [
      "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends. You can seem 1 foot shorter or taller and can appear heavier or lighter. You must adopt a form that has the same basic arrangement of limbs as you have. Otherwise, the extent of the illusion is up to you.",
      "The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing.",
      "To discern that you are disguised, a creature must take the {@action Study|XPHB} action to inspect your appearance and succeed on an Intelligence ({@skill Investigation|XPHB}) check against your spell save DC.",
    ],
    abilityCheck: ["intelligence"],
    miscTags: ["SGT"],
  },
  {
    name: "Dissonant Whispers",
    source: "LDJ2024",
    page: 264,
    level: 1,
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
      "One creature of your choice that you can see within range hears a discordant melody in its mind. The target makes a Wisdom saving throw. On a failed save, it takes {@damage 3d6} Psychic damage and must immediately use its {@variantrule Reaction|XPHB}, if available, to move as far away from you as it can, using the safest route. On a successful save, the target takes half as much damage only.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 3d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["psychic"],
    savingThrow: ["wisdom"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Divine Favor",
    source: "LDJ2024",
    page: 265,
    level: 1,
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
      "Until the spell ends, your attacks with weapons deal an extra {@damage 1d4} Radiant damage on a hit.",
    ],
    damageInflict: ["radiant"],
    miscTags: ["AAD"],
  },
  {
    name: "Divine Smite",
    source: "LDJ2024",
    page: 265,
    level: 1,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}",
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
      "The target takes an extra {@damage 2d8} Radiant damage from the attack. The damage increases by {@damage 1d8} if the target is a Fiend or an Undead.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d8|1-9|1d8} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    miscTags: ["AAD"],
  },
  {
    name: "Ensnaring Strike",
    source: "LDJ2024",
    page: 268,
    level: 1,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a creature with a weapon",
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
      "As you hit the target, grasping vines appear on it, and it makes a Strength saving throw. A Large or larger creature has {@variantrule Advantage|XPHB} on this save. On a failed save, the target has the {@condition Restrained|XPHB} condition until the spell ends. On a successful save, the vines shrivel away, and the spell ends.",
      "While {@condition Restrained|XPHB}, the target takes {@damage 1d6} Piercing damage at the start of each of its turns. The target or a creature within reach of it can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. On a success, the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 1d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["piercing"],
    conditionInflict: ["restrained"],
    savingThrow: ["strength"],
    abilityCheck: ["strength"],
  },
  {
    name: "Entangle",
    source: "LDJ2024",
    page: 268,
    level: 1,
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
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "Grasping plants sprout from the ground in a 20-foot square within range. For the duration, these plants turn the ground in the area into {@variantrule Difficult Terrain|XPHB}. They disappear when the spell ends.",
      "Each creature (other than you) in the area when you cast the spell must succeed on a Strength saving throw or have the {@condition Restrained|XPHB} condition until the spell ends. A {@condition Restrained|XPHB} creature can take an action to make a Strength ({@skill Athletics|XPHB}) check against your spell save DC. On a success, it frees itself from the grasping plants and is no longer {@condition Restrained|XPHB} by them.",
    ],
    conditionInflict: ["restrained"],
    savingThrow: ["strength"],
    abilityCheck: ["strength"],
    miscTags: ["DFT"],
    areaTags: ["Q"],
  },
  {
    name: "Expeditious Retreat",
    source: "LDJ2024",
    page: 270,
    level: 1,
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
      "You take the {@action Dash|XPHB} action, and until the spell ends, you can take that action again as a {@variantrule Bonus Action|XPHB}.",
    ],
    miscTags: ["UBA"],
  },
  {
    name: "Faerie Fire",
    source: "LDJ2024",
    page: 271,
    level: 1,
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
      "Objects in a 20-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} within range are outlined in blue, green, or violet light (your choice). Each creature in the {@variantrule Cube [Area of Effect]|XPHB|Cube} is also outlined if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed {@variantrule Dim Light|XPHB} in a 10-foot radius and can't benefit from the {@condition Invisible|XPHB} condition.",
      "{@action Attack|XPHB} rolls against an affected creature or object have {@variantrule Advantage|XPHB} if the attacker can see it.",
    ],
    savingThrow: ["dexterity"],
    miscTags: ["ADV", "LGT"],
    areaTags: ["C"],
  },
  {
    name: "False Life",
    source: "LDJ2024",
    page: 271,
    level: 1,
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
      m: "a drop of alcohol",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You gain {@dice 2d4 + 4} {@variantrule Temporary Hit Points|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You gain 5 additional {@variantrule Temporary Hit Points|XPHB} for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["THP"],
  },
  {
    name: "Feather Fall",
    source: "LDJ2024",
    page: 271,
    level: 1,
    school: "transmutation",
    castingTime: [
      {
        number: 1,
        unit: "reaction",
        condition:
          "which you take when you or a creature you can see within 60 feet of you falls",
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
      m: "a small feather or piece of down",
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
      "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If a creature lands before the spell ends, the creature takes no damage from the fall, and the spell ends for that creature.",
    ],
    areaTags: ["MT"],
  },
  {
    name: "Find Familiar",
    source: "LDJ2024",
    page: 272,
    level: 1,
    school: "conjuration",
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
        text: "burning incense worth 10+ GP, which the spell consumes",
        cost: 1000,
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
      "You gain the service of a familiar, a spirit that takes an animal form you choose: {@creature Bat|XMM}, {@creature Cat|XMM}, {@creature Frog|XMM}, {@creature Hawk|XMM}, {@creature Lizard|XMM}, {@creature Octopus|XMM}, {@creature Owl|XMM}, {@creature Rat|XMM}, {@creature Raven|XMM}, {@creature Spider|XMM}, {@creature Weasel|XMM}, or another Beast that has a {@filter Challenge Rating of 0|bestiary|challenge rating=[&0]|type=beast|miscellaneous=!swarm}. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a Celestial, Fey, or Fiend (your choice) instead of a Beast. Your familiar acts independently of you, but it obeys your commands.",
      {
        type: "entries",
        name: "Telepathic Connection",
        entries: [
          "While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as a {@variantrule Bonus Action|XPHB}, you can see through the familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses it has.",
          "Finally, when you cast a spell with a range of touch, your familiar can deliver the touch. Your familiar must be within 100 feet of you, and it must take a {@variantrule Reaction|XPHB} to deliver the touch when you cast the spell.",
        ],
      },
      {
        type: "entries",
        name: "Combat",
        entries: [
          "The familiar is an ally to you and your allies. It rolls its own {@variantrule Initiative|XPHB} and acts on its own turn. A familiar can't attack, but it can take other actions as normal.",
        ],
      },
      {
        type: "entries",
        name: "Disappearance of the Familiar",
        entries: [
          "When the familiar drops to 0 {@variantrule Hit Points|XPHB}, it disappears. It reappears after you cast this spell again. As a {@action Magic|XPHB} action, you can temporarily dismiss the familiar to a pocket dimension. Alternatively, you can dismiss it forever. As a {@action Magic|XPHB} action while it is temporarily dismissed, you can cause it to reappear in an unoccupied space within 30 feet of you. Whenever the familiar drops to 0 {@variantrule Hit Points|XPHB} or disappears into the pocket dimension, it leaves behind in its space anything it was wearing or carrying.",
        ],
      },
      {
        type: "entries",
        name: "One Familiar Only",
        entries: [
          "You can't have more than one familiar at a time. If you cast this spell while you have a familiar, you instead cause it to adopt a new eligible form.",
        ],
      },
    ],
    miscTags: ["PRM", "SMN"],
  },
  {
    name: "Fog Cloud",
    source: "LDJ2024",
    page: 276,
    level: 1,
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
          type: "hour",
          amount: 1,
        },
        concentration: true,
      },
    ],
    entries: [
      "You create a 20-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} of fog centered on a point within range. The {@variantrule Sphere [Area of Effect]|XPHB|Sphere} is {@variantrule Heavily Obscured|XPHB}. It lasts for the duration or until a strong wind (such as one created by {@spell Gust of Wind|XPHB}) disperses it.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The fog's radius increases by 20 feet for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["OBS"],
    areaTags: ["S"],
  },
  {
    name: "Goodberry",
    source: "LDJ2024",
    page: 280,
    level: 1,
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
      m: "a sprig of mistletoe",
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
      "Ten berries appear in your hand and are infused with magic for the duration. A creature can take a {@variantrule Bonus Action|XPHB} to eat one berry. Eating a berry restores 1 {@variantrule Hit Points|XPHB|Hit Point}, and the berry provides enough nourishment to sustain a creature for one day.",
      "Uneaten berries disappear when the spell ends.",
    ],
    miscTags: ["HL"],
  },
  {
    name: "Grease",
    source: "LDJ2024",
    page: 280,
    level: 1,
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
      m: "a bit of pork rind or butter",
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
      "Nonflammable grease covers the ground in a 10-foot square centered on a point within range and turns it into {@variantrule Difficult Terrain|XPHB} for the duration.",
      "When the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or have the {@condition Prone|XPHB} condition. A creature that enters the area or ends its turn there must also succeed on that save or fall {@condition Prone|XPHB}.",
    ],
    conditionInflict: ["prone"],
    savingThrow: ["dexterity"],
    miscTags: ["DFT"],
    areaTags: ["Q"],
  },
  {
    name: "Guiding Bolt",
    source: "LDJ2024",
    page: 282,
    level: 1,
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
        type: "timed",
        duration: {
          type: "round",
          amount: 1,
        },
      },
    ],
    entries: [
      "You hurl a bolt of light toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes {@damage 4d6} Radiant damage, and the next attack roll made against it before the end of your next turn has {@variantrule Advantage|XPHB}.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 4d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["radiant"],
    spellAttack: ["R"],
    miscTags: ["ADV"],
    areaTags: ["ST"],
  },
  {
    name: "Hail of Thorns",
    source: "LDJ2024",
    page: 283,
    level: 1,
    school: "conjuration",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a creature with a Ranged weapon",
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
      "As you hit the creature, this spell creates a rain of thorns that sprouts from your Ranged weapon or ammunition. The target of the attack and each creature within 5 feet of it make a Dexterity saving throw, taking {@damage 1d10} Piercing damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 1d10|1-9|1d10} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["piercing"],
    savingThrow: ["dexterity"],
    areaTags: ["S"],
  },
  {
    name: "Healing Word",
    source: "LDJ2024",
    page: 284,
    level: 1,
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
      "A creature of your choice that you can see within range regains {@variantrule Hit Points|XPHB} equal to {@dice 2d4} plus your spellcasting ability modifier.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The healing increases by {@scaledice 2d4|1-9|2d4} for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["HL", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Hellish Rebuke",
    source: "LDJ2024",
    page: 284,
    level: 1,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "reaction",
        condition:
          "which you take in response to taking damage from a creature that you can see within 60 feet of yourself",
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
      "The creature that damaged you is momentarily surrounded by green flames. It makes a Dexterity saving throw, taking {@damage 2d10} Fire damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d10|1-9|1d10} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["dexterity"],
    miscTags: ["SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Heroism",
    source: "LDJ2024",
    page: 285,
    level: 1,
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
      "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to the {@condition Frightened|XPHB} condition and gains {@variantrule Temporary Hit Points|XPHB} equal to your spellcasting ability modifier at the start of each of its turns.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    conditionImmune: ["frightened"],
    miscTags: ["SCT", "THP"],
    areaTags: ["ST"],
  },
  {
    name: "Hex",
    source: "LDJ2024",
    page: 285,
    level: 1,
    school: "enchantment",
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
        amount: 90,
      },
    },
    components: {
      v: true,
      s: true,
      m: "the petrified eye of a newt",
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
      "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra {@damage 1d6} Necrotic damage to the target whenever you hit it with an attack roll. Also, choose one ability when you cast the spell. The target has {@variantrule Disadvantage|XPHB} on ability checks made with the chosen ability.",
      "If the target drops to 0 {@variantrule Hit Points|XPHB} before this spell ends, you can take a {@variantrule Bonus Action|XPHB} on a later turn to curse a new creature.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 2 (up to 4 hours), 3-4 (up to 8 hours), or 5+ (24 hours).",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    miscTags: ["AAD", "SGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Hunter's Mark",
    source: "LDJ2024",
    page: 287,
    level: 1,
    school: "divination",
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
        amount: 90,
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
        concentration: true,
      },
    ],
    entries: [
      "You magically mark one creature you can see within range as your quarry. Until the spell ends, you deal an extra {@damage 1d6} Force damage to the target whenever you hit it with an attack roll. You also have {@variantrule Advantage|XPHB} on any Wisdom ({@skill Perception|XPHB} or {@skill Survival|XPHB}) check you make to find it.",
      "If the target drops to 0 {@variantrule Hit Points|XPHB} before this spell ends, you can take a {@variantrule Bonus Action|XPHB} to move the mark to a new creature you can see within range.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "Your {@status Concentration|XPHB} can last longer with a spell slot of level 3-4 (up to 8 hours) or 5+ (up to 24 hours).",
        ],
      },
    ],
    damageInflict: ["force"],
    miscTags: ["AAD", "ADV", "SGT", "UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Ice Knife",
    source: "LDJ2024",
    page: 287,
    level: 1,
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
      m: "a drop of water or a piece of ice",
    },
    duration: [
      {
        type: "instant",
      },
    ],
    entries: [
      "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d10} Piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take {@damage 2d6} Cold damage.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The Cold damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["cold", "piercing"],
    spellAttack: ["R"],
    savingThrow: ["dexterity"],
    areaTags: ["ST"],
  },
  {
    name: "Identify",
    source: "LDJ2024",
    page: 287,
    level: 1,
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
      m: {
        text: "a pearl worth 100+ GP",
        cost: 10000,
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
      "You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires {@variantrule Attunement|XPHB}, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name.",
      "If you instead touch a creature throughout the casting, you learn which ongoing spells, if any, are currently affecting it.",
    ],
    miscTags: ["OBJ"],
    areaTags: ["ST"],
  },
  {
    name: "Illusory Script",
    source: "LDJ2024",
    page: 288,
    level: 1,
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
        type: "touch",
      },
    },
    components: {
      s: true,
      m: {
        text: "ink worth 10+ GP, which the spell consumes",
        cost: 1000,
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
      "You write on parchment, paper, or another suitable material and imbue it with an illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, seems to be written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, the illusion can alter the meaning, handwriting, and language of the text, though the language must be one you know.",
      "If the spell is dispelled, the original script and the illusion both disappear.",
      "A creature that has {@sense Truesight|XPHB} can read the hidden message.",
    ],
  },
  {
    name: "Inflict Wounds",
    source: "LDJ2024",
    page: 288,
    level: 1,
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
        type: "instant",
      },
    ],
    entries: [
      "A creature you touch makes a Constitution saving throw, taking {@damage 2d10} Necrotic damage on a failed save or half as much damage on a successful one.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d10|1-9|1d10} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    savingThrow: ["constitution"],
    areaTags: ["ST"],
  },
  {
    name: "Jump",
    source: "LDJ2024",
    page: 290,
    level: 1,
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
      m: "a grasshopper's hind leg",
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
      "You touch a willing creature. Once on each of its turns until the spell ends, that creature can jump up to 30 feet by spending 10 feet of movement.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Longstrider",
    source: "LDJ2024",
    page: 293,
    level: 1,
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
      m: "a pinch of dirt",
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
      "You touch a creature. The target's {@variantrule Speed|XPHB} increases by 10 feet until the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    miscTags: ["SCT"],
    areaTags: ["ST"],
  },
  {
    name: "Mage Armor",
    source: "LDJ2024",
    page: 293,
    level: 1,
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
      m: "a piece of cured leather",
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
      "You touch a willing creature who isn't wearing armor. Until the spell ends, the target's base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor.",
    ],
    miscTags: ["MAC"],
    areaTags: ["ST"],
  },
  {
    name: "Magic Missile",
    source: "LDJ2024",
    page: 295,
    level: 1,
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
      "You create three glowing darts of magical force. Each dart strikes a creature of your choice that you can see within range. A dart deals {@damage 1d4 + 1} Force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The spell creates one more dart for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["force"],
    miscTags: ["SGT"],
    areaTags: ["MT", "ST"],
  },
  {
    name: "Protection from Evil and Good",
    source: "LDJ2024",
    page: 309,
    level: 1,
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
        text: "a flask of Holy Water worth 25+ GP, which the spell consumes",
        cost: 2500,
        consume: true,
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
      "Until the spell ends, one willing creature you touch is protected against creatures that are Aberrations, Celestials, Elementals, Fey, Fiends, or Undead. The protection grants several benefits. Creatures of those types have {@variantrule Disadvantage|XPHB} on attack rolls against the target. The target also can't be possessed by or gain the {@condition Charmed|XPHB} or {@condition Frightened|XPHB} conditions from them. If the target is already possessed, {@condition Charmed|XPHB}, or {@condition Frightened|XPHB} by such a creature, the target has {@variantrule Advantage|XPHB} on any new saving throw against the relevant effect.",
    ],
    affectsCreatureType: [
      "aberration",
      "celestial",
      "elemental",
      "fey",
      "fiend",
      "undead",
    ],
    miscTags: ["ADV"],
    areaTags: ["ST"],
  },
  {
    name: "Purify Food and Drink",
    source: "LDJ2024",
    page: 310,
    level: 1,
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
        amount: 10,
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
    meta: {
      ritual: true,
    },
    entries: [
      "You remove poison and rot from nonmagical food and drink in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range.",
    ],
    areaTags: ["S"],
  },
  {
    name: "Ray of Sickness",
    source: "LDJ2024",
    page: 311,
    level: 1,
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
      "You shoot a greenish ray at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 2d8} Poison damage and has the {@condition Poisoned|XPHB} condition until the end of your next turn.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d8|1-9|1d8} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["poison"],
    conditionInflict: ["poisoned"],
    spellAttack: ["R"],
    areaTags: ["ST"],
  },
  {
    name: "Sanctuary",
    source: "LDJ2024",
    page: 313,
    level: 1,
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
        amount: 30,
      },
    },
    components: {
      v: true,
      s: true,
      m: "a shard of glass from a mirror",
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
      "You ward a creature within range. Until the spell ends, any creature who targets the warded creature with an attack roll or a damaging spell must succeed on a Wisdom saving throw or either choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from areas of effect.",
      "The spell ends if the warded creature makes an attack roll, casts a spell, or deals damage.",
    ],
    savingThrow: ["wisdom"],
    areaTags: ["ST"],
  },
  {
    name: "Searing Smite",
    source: "LDJ2024",
    page: 314,
    level: 1,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}",
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
      "As you hit the target, it takes an extra {@damage 1d6} Fire damage from the attack. At the start of each of its turns until the spell ends, the target takes {@damage 1d6} Fire damage and then makes a Constitution saving throw. On a failed save, the spell continues. On a successful save, the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "All the damage increases by {@scaledamage 1d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["fire"],
    savingThrow: ["constitution"],
    miscTags: ["AAD"],
  },
  {
    name: "Shield",
    source: "LDJ2024",
    page: 316,
    level: 1,
    school: "abjuration",
    castingTime: [
      {
        number: 1,
        unit: "reaction",
        condition:
          "which you take when you are hit by an attack roll or targeted by the Magic Missile spell",
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
          type: "round",
          amount: 1,
        },
      },
    ],
    entries: [
      "An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from {@spell Magic Missile|XPHB}.",
    ],
    miscTags: ["MAC"],
  },
  {
    name: "Shield of Faith",
    source: "LDJ2024",
    page: 316,
    level: 1,
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
      "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
    ],
    miscTags: ["MAC"],
    areaTags: ["ST"],
  },
  {
    name: "Silent Image",
    source: "LDJ2024",
    page: 317,
    level: 1,
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
          amount: 10,
        },
        concentration: true,
      },
    ],
    entries: [
      "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot {@variantrule Cube [Area of Effect]|XPHB|Cube}. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects.",
      "As a {@action Magic|XPHB} action, you can cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.",
      "Physical interaction with the image reveals it to be an illusion, since things can pass through it. A creature that takes a {@action Study|XPHB} action to examine the image can determine that it is an illusion with a successful Intelligence ({@skill Investigation|XPHB}) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.",
    ],
    abilityCheck: ["intelligence"],
  },
  {
    name: "Sleep",
    source: "LDJ2024",
    page: 317,
    level: 1,
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
      m: "a pinch of sand or rose petals",
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
      "Each creature of your choice in a 5-foot-radius {@variantrule Sphere [Area of Effect]|XPHB|Sphere} centered on a point within range must succeed on a Wisdom saving throw or have the {@condition Incapacitated|XPHB} condition until the end of its next turn, at which point it must repeat the save. If the target fails the second save, the target has the {@condition Unconscious|XPHB} condition for the duration. The spell ends on a target if it takes damage or someone within 5 feet of it takes an action to shake it out of the spell's effect.",
      "Creatures that don't sleep, such as elves, or that have {@variantrule Immunity|XPHB} to the {@condition Exhaustion|XPHB} condition automatically succeed on saves against this spell.",
    ],
    conditionInflict: ["incapacitated", "unconscious"],
    savingThrow: ["wisdom"],
    areaTags: ["S"],
  },
  {
    name: "Speak with Animals",
    source: "LDJ2024",
    page: 318,
    level: 1,
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
    meta: {
      ritual: true,
    },
    entries: [
      "For the duration, you can comprehend and verbally communicate with Beasts, and you can use any of the {@action Influence|XPHB} action's skill options with them.",
      "Most Beasts have little to say about topics that don't pertain to survival or companionship, but at minimum, a Beast can give you information about nearby locations and monsters, including whatever it has perceived within the past day.",
    ],
    affectsCreatureType: ["beast"],
  },
  {
    name: "Tasha's Hideous Laughter",
    source: "LDJ2024",
    page: 331,
    srd52: "Hideous Laughter",
    level: 1,
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
      m: "a tart and a feather",
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
      "One creature of your choice that you can see within range makes a Wisdom saving throw. On a failed save, it has the {@condition Prone|XPHB} and {@condition Incapacitated|XPHB} conditions for the duration. During that time, it laughs uncontrollably if it's capable of laughter, and it can't end the {@condition Prone|XPHB} condition on itself.",
      "At the end of each of its turns and each time it takes damage, it makes another Wisdom saving throw. The target has {@variantrule Advantage|XPHB} on the save if the save is triggered by damage. On a successful save, the spell ends.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "You can target one additional creature for each spell slot level above 1.",
        ],
      },
    ],
    conditionInflict: ["incapacitated", "prone"],
    savingThrow: ["wisdom"],
    miscTags: ["SCT", "SGT"],
    areaTags: ["ST"],
  },
  {
    name: "Tenser's Floating Disk",
    source: "LDJ2024",
    page: 332,
    srd52: "Floating Disk",
    level: 1,
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
      m: "a drop of mercury",
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
      "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.",
      "The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 10-foot-deep pit, nor could it leave such a pit if it was created at the bottom.",
      "If you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends.",
    ],
    miscTags: ["SGT"],
  },
  {
    name: "Thunderous Smite",
    source: "LDJ2024",
    page: 334,
    level: 1,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "bonus",
        condition:
          "which you take immediately after hitting a target with a Melee weapon or an {@variantrule Unarmed Strike|XPHB}",
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
      "Your strike rings with thunder that is audible within 300 feet of you, and the target takes an extra {@damage 2d6} Thunder damage from the attack. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and have the {@condition Prone|XPHB} condition.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["thunder"],
    conditionInflict: ["prone"],
    savingThrow: ["strength"],
    miscTags: ["AAD", "FMV"],
  },
  {
    name: "Thunderwave",
    source: "LDJ2024",
    page: 334,
    level: 1,
    school: "evocation",
    castingTime: [
      {
        number: 1,
        unit: "action",
      },
    ],
    range: {
      type: "cube",
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
        type: "instant",
      },
    ],
    entries: [
      "You unleash a wave of thunderous energy. Each creature in a 15-foot {@variantrule Cube [Area of Effect]|XPHB|Cube} originating from you makes a Constitution saving throw. On a failed save, a creature takes {@damage 2d8} Thunder damage and is pushed 10 feet away from you. On a successful save, a creature takes half as much damage only.",
      "In addition, unsecured objects that are entirely within the {@variantrule Cube [Area of Effect]|XPHB|Cube} are pushed 10 feet away from you, and a thunderous boom is audible within 300 feet.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 2d8|1-9|1d8} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["thunder"],
    savingThrow: ["constitution"],
    miscTags: ["FMV", "OBJ"],
    areaTags: ["C"],
  },
  {
    name: "Unseen Servant",
    source: "LDJ2024",
    page: 336,
    level: 1,
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
      m: "a bit of string and of wood",
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
      "This spell creates an {@condition Invisible|XPHB}, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 {@variantrule Hit Points|XPHB|Hit Point}, and a Strength of 2, and it can't attack. If it drops to 0 {@variantrule Hit Points|XPHB}, the spell ends.",
      "Once on each of your turns as a {@variantrule Bonus Action|XPHB}, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring drinks. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.",
      "If you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends.",
    ],
    miscTags: ["SMN", "UBA"],
  },
  {
    name: "Witch Bolt",
    source: "LDJ2024",
    page: 343,
    level: 1,
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
      m: "a twig struck by lightning",
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
      "A beam of crackling energy lances toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against it. On a hit, the target takes {@damage 2d12} Lightning damage.",
      "On each of your subsequent turns, you can take a {@variantrule Bonus Action|XPHB} to deal {@damage 1d12} Lightning damage to the target automatically, even if the first attack missed.",
      "The spell ends if the target is ever outside the spell's range or if it has Total {@variantrule Cover|XPHB} from you.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The initial damage increases by {@scaledamage 2d12|1-9|1d12} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["lightning"],
    spellAttack: ["R"],
    miscTags: ["UBA"],
    areaTags: ["ST"],
  },
  {
    name: "Wrathful Smite",
    source: "LDJ2024",
    page: 343,
    level: 1,
    school: "necromancy",
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
      "The target takes an extra {@damage 1d6} Necrotic damage from the attack, and it must succeed on a Wisdom saving throw or have the {@condition Frightened|XPHB} condition until the spell ends. At the end of each of its turns, the {@condition Frightened|XPHB} target repeats the save, ending the spell on itself on a success.",
    ],
    entriesHigherLevel: [
      {
        type: "entries",
        name: "Using a Higher-Level Spell Slot",
        entries: [
          "The damage increases by {@scaledamage 1d6|1-9|1d6} for each spell slot level above 1.",
        ],
      },
    ],
    damageInflict: ["necrotic"],
    conditionInflict: ["frightened"],
    savingThrow: ["wisdom"],
    miscTags: ["AAD"],
  },
];
